# Incident runbook (baseline)

## Triage checklist

- Confirm scope: Engine API, MasterData API, or both.
- Identify impacted tenants (from `X-Tenant-Id` in logs/telemetry).
- Capture correlation IDs for sample failing requests.

## Common scenarios

### Elevated 5xx

- Check recent deployments/merges.
- Use traces to find the failing endpoint and exception.
- If rollback is available, prefer rollback over hotfix.

### Idempotency conflicts (409 spikes)

- Validate client behavior: same `Idempotency-Key` reused with different payload.
- Confirm hashing behavior and store retention policy (MVP is in-memory).

### Outbox backlog / publisher not advancing

- Confirm background worker is running.
- Inspect outbox queue size (MVP in-memory).
- If stuck, restart service (MVP) and capture logs.

### Tenant header errors

- Verify gateway/client is sending `X-Tenant-Id`.
- Confirm excluded paths (health/swagger) behave as expected.

## Communications

- Post an initial status update with:
  - time detected
  - impacted services
  - impacted tenants (if known)
  - next update ETA

## Post-incident

- Create a short postmortem entry:
  - trigger
  - root cause
  - mitigation
  - follow-ups (tests, monitors, docs)
