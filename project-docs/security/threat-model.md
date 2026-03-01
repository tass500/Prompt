# Threat model (MVP)

## Scope

- Platform Core Engine API (`src/engine/Engine.Api`)
- Domain APIs (initial: `MasterData.Api`)
- API contracts (`contracts/**`)
- Cross-cutting headers: `X-Correlation-Id`, `X-Tenant-Id`, `Idempotency-Key`
- Eventing (MVP outbox + published log; target event mesh)

## Key assets

- Tenant data isolation
- Identity/authorization decisions (policy decision endpoint)
- Idempotency store integrity
- Contract integrity (governed changes)
- Observability telemetry integrity (trace correlation)

## Trust boundaries

- Client/UI to API boundary (public HTTP)
- Inter-service boundary (Engine <-> domains)
- Storage boundary (in-memory now; DB/event mesh later)

## Primary threats (high-level)

- Tenant boundary bypass via missing/forged `X-Tenant-Id`
- Replay/duplication of writes without idempotency
- Unauthorized access due to permissive default policy
- Injection of malformed payloads into APIs/contracts
- Event duplication and consumer side effects (no dedupe)
- Sensitive data leakage via logs/telemetry

## MVP mitigations in this repo

- Tenant header enforcement middleware
- Correlation ID propagation
- Idempotency key enforcement on write endpoints
- Deny-by-default policy decision (configurable)
- Contract linting in CI (Spectral)
- OpenTelemetry with consistent tagging (`correlation_id`, `tenant_id`)

## Open items (when moving beyond MVP)

- Replace in-memory stores with durable persistence
- Introduce authN/authZ (OIDC) and service-to-service identity
- Add rate limiting / WAF / API gateway
- Add outbox persistence + retries + DLQ strategy
- Add inbox/dedupe store for event consumers
