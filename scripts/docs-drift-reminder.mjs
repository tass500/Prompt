import { execSync } from "node:child_process";

function run(cmd) {
  return execSync(cmd, { encoding: "utf8" }).trim();
}

function tryRun(cmd) {
  try {
    return run(cmd);
  } catch {
    return "";
  }
}

function parseArgValue(argv, name) {
  const prefix = `--${name}=`;
  const hit = argv.find((a) => a.startsWith(prefix));
  return hit ? hit.slice(prefix.length) : "";
}

function resolveLocalBaseRef() {
  // Prefer remote-tracking main if available.
  const hasOriginMain = tryRun("git show-ref --verify --quiet refs/remotes/origin/main && echo yes") === "yes";
  if (hasOriginMain) return "origin/main";

  const hasMain = tryRun("git show-ref --verify --quiet refs/heads/main && echo yes") === "yes";
  if (hasMain) return "main";

  // Fall back to the current branch name; merge-base with HEAD will be HEAD.
  return "HEAD";
}

function resolveDiffRange({ baseSha, headSha }) {
  if (baseSha && headSha) {
    return { baseSha, headSha, reason: "explicit" };
  }

  const localBaseRef = resolveLocalBaseRef();
  const mergeBase = tryRun(`git merge-base ${localBaseRef} HEAD`);
  if (mergeBase) {
    return { baseSha: mergeBase, headSha: "HEAD", reason: `merge-base(${localBaseRef},HEAD)` };
  }

  return { baseSha: "", headSha: "", reason: "unresolved" };
}

function getChangedFiles({ baseSha, headSha }) {
  if (!baseSha || !headSha) {
    return [];
  }

  const out = run(`git diff --name-only ${baseSha}..${headSha}`);
  if (!out) return [];
  return out.split("\n").map((s) => s.trim()).filter(Boolean);
}

function warn(message) {
  // GitHub Actions annotation format. Falls back to plain output in other environments.
  console.log(`::warning::${message}`);
}

function fail(message) {
  console.log(`::error::${message}`);
  process.exitCode = 1;
}

function anyMatch(files, predicate) {
  return files.some(predicate);
}

function startsWithAny(path, prefixes) {
  return prefixes.some((p) => path.startsWith(p));
}

const argv = process.argv.slice(2);
const args = new Set(argv);
const strict = args.has("--fail");

const baseShaArg = parseArgValue(argv, "base");
const headShaArg = parseArgValue(argv, "head");

const envBaseSha = process.env.GITHUB_BASE_SHA || "";
const envHeadSha = process.env.GITHUB_HEAD_SHA || "";

const range = resolveDiffRange({
  baseSha: baseShaArg || envBaseSha,
  headSha: headShaArg || envHeadSha,
});

const changed = getChangedFiles({ baseSha: range.baseSha, headSha: range.headSha });

if (changed.length === 0) {
  console.log(
    `No changed files detected (diff range: ${range.reason}). Skipping docs drift reminder.`
  );
  process.exit(0);
}

const docsTouched = new Set(changed.filter((f) => f === "SECURITY.md" || f === "CONTRIBUTING.md" || f === "CODEOWNERS" || f === "CHANGELOG.md" || f.startsWith("project-docs/") || f === ".github/pull_request_template.md"));

function requireAnyDoc(reason, requiredDocs) {
  const ok = requiredDocs.some((d) => docsTouched.has(d));
  if (ok) return;

  const msg = `${reason}. Consider updating one of: ${requiredDocs.join(", ")}`;
  if (strict) fail(msg);
  else warn(msg);
}

// Rule 1: Contracts change => versioning/changelog or PR template note.
if (anyMatch(changed, (f) => f.startsWith("contracts/"))) {
  requireAnyDoc(
    "Detected changes under contracts/ (possible compatibility impact)",
    ["project-docs/governance/versioning.md", "CHANGELOG.md", ".github/pull_request_template.md"]
  );
}

// Rule 2: Cross-cutting behavior change => threat model + runbook.
const crossCuttingIndicators = [
  "CorrelationIdMiddleware.cs",
  "TenantIdMiddleware.cs",
  "Idempotency",
  "OpenTelemetry",
];

if (
  anyMatch(changed, (f) =>
    startsWithAny(f, ["src/engine/", "src/domains/"]) &&
    crossCuttingIndicators.some((k) => f.includes(k))
  )
) {
  requireAnyDoc(
    "Detected cross-cutting change (correlation/tenant/idempotency/observability)",
    ["project-docs/security/threat-model.md", "project-docs/ops/incident-runbook.md"]
  );
}

// Rule 3: CI / lint / audit policy changes => contributing/security.
if (
  anyMatch(changed, (f) =>
    f.startsWith("scripts/") ||
    f === "package.json" ||
    f.startsWith(".spectral")
  )
) {
  requireAnyDoc(
    "Detected CI/dev tooling change (scripts/package.json/spectral)",
    ["CONTRIBUTING.md", "SECURITY.md"]
  );
}

// Rule 4: New service/module top-level changes => ownership + ops.
if (anyMatch(changed, (f) => f.startsWith("src/domains/"))) {
  requireAnyDoc(
    "Detected changes under src/domains/ (service/domain surface may have changed)",
    ["CODEOWNERS", "project-docs/ops/slo-sli.md"]
  );
}

console.log(`Docs drift reminder completed. Changed files: ${changed.length}. Docs touched: ${docsTouched.size}.`);
