# Security Policy

## Supported versions

This repository is currently in active development.

- Security fixes are applied on the `main` branch.
- Tagged releases (when introduced) will list their support window in `CHANGELOG.md`.

## Reporting a vulnerability

Please do not open a public issue for security-sensitive reports.

- Preferred: contact the maintainers privately (internal channel).
- If you do not have an internal channel, open a minimal issue with **no exploit details** and ask for a private contact path.

Include:

- A clear description of the issue and impact
- Affected component(s) (Engine API, domain APIs, contracts, scripts)
- Steps to reproduce (redacted if needed)
- Suggested remediation (if known)

## Dependency vulnerability handling

- High/Critical severity findings are treated as **stop-ship** when CI release gates are enabled.
- Until a formal gate is enabled, we apply **targeted** remediation:
  - Update/patch via direct dependency bump when possible
  - Pin/override only with explicit rationale and follow-up removal task

## Secrets

- Never commit secrets (API keys, tokens, passwords) to the repository.
- Use environment variables / secret stores for local dev and CI.
