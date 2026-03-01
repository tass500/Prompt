# ADR guidelines

## When to write an ADR

Write an ADR when introducing or changing:

- Cross-cutting concerns (auth, multi-tenancy, idempotency, observability)
- Eventing strategy (outbox, schema, mesh)
- Contract governance rules and CI gates
- Storage choices (in-memory -> database)
- Deployment model (containers, gateway, service mesh)

## Minimum content

- Context
- Decision
- Status
- Consequences
- Alternatives considered (brief)

## Ownership

- Proposed by the implementer.
- Reviewed by affected owners (Engine/Domain/Contracts).
