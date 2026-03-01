# Versioning policy

## Scope

- API contracts in `contracts/**`
- Events (when formalized)

## Principles

- Prefer additive changes.
- Breaking changes require explicit versioning.
- Contracts are reviewed and linted in CI.

## API versioning (initial)

- Current MVP is versionless at the routing level.
- Breaking changes to externally consumed endpoints require one of:
  - new endpoint/path, or
  - explicit version segment introduction for the affected area.

## Contract change categories

- **Patch**: typo/docs fixes, schema clarifications, no behavior change.
- **Minor**: additive fields/endpoints, backward compatible.
- **Major**: removals, behavior changes, tightening validation that breaks clients.

## Deprecation

- Mark deprecations in contracts and document the removal timeline.
- Provide migration notes in PR description.
