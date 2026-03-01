# Documentation maintenance (docs drift)

## Goal

Keep documentation accurate and useful by ensuring it changes together with code and contracts.

## Default operating mode

- When a change has a **clear relationship** to a document, update the document in the same PR.
- When the relationship is **not clear**, add a note in the PR and propose options; the owner/reviewer decides.

In agent-assisted development, the default behavior is:

- The agent warns about likely documentation drift, and
- The agent updates documentation automatically when the relationship is clear.

## Ownership

- `SECURITY.md` and `project-docs/security/**`: platform security owner (or security champion)
- `CONTRIBUTING.md`, PR template: platform engineering enablement owner
- `CODEOWNERS`: tech lead / engineering manager
- `project-docs/ops/**`: service owners (Engine / domains)
- `project-docs/governance/**`: platform governance owner
- `project-docs/diagrams/**`: platform architecture owner

## Update triggers (practical)

### Contracts

If you change `contracts/**`:

- Update `project-docs/governance/versioning.md` if the change is breaking or introduces a new compatibility rule.
- Ensure PR description includes compatibility/migration notes (PR template).

### Cross-cutting behavior

If you change correlation/tenant/idempotency/observability behavior:

- Update `project-docs/security/threat-model.md` (attack surface / mitigations).
- Update `project-docs/ops/incident-runbook.md` if a new failure mode is introduced.

### CI policies / gates

If you change build/lint/audit behavior:

- Update `CONTRIBUTING.md` (local checks / expectations).
- Update `SECURITY.md` if audit policy changes.

### Service topology

If you add a new domain/service/module:

- Update `CODEOWNERS`.
- Update `project-docs/ops/slo-sli.md` to include the new service.
- Update `project-docs/diagrams/mermaid/*` if architecture/flows change.

## Suggested PR checklist items

- Docs updated (clear relationship)
- Docs drift note added (unclear relationship)
- Owners reviewed changes when applicable
