# Contributing

## Ways of working

- Changes flow through Pull Requests.
- Prefer small, reviewable PRs.
- Contracts (`contracts/**`) are treated as first-class artifacts.

## Branching

- Default branch: `main`
- Create feature branches from `main`.

## Local checks (recommended)

### Build

- `dotnet build platform-core.sln`

### Contracts lint

- `npm run lint:contracts`
- For strict linting on changed files: `npm run lint:contracts:changed:strict`

### Docs drift reminder

- `npm run docs:drift:reminder`

## Pull Request expectations

- Update contracts when you change externally visible API behavior.
- Keep API writes idempotent where required.
- Ensure correlation and tenant headers are preserved.
- Include a short validation note (how you tested).

## Commit messages

Use concise, imperative messages.

- Good: "Add idempotency conflict handling"
- Avoid: "wip" / "fix" without context
