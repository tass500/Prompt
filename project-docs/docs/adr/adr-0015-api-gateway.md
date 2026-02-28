# ADR‑0015 – API Gateway & Edge Security

## Context
A szolgáltatások a külvilággal és egymással egy arculati és biztonsági peremen (edge) érintkeznek. A cross‑cutting szabályok (rate limit, auth header, schema validation, WAF) nem tolhatók le minden mikroszolgáltatásra külön.

## Decision
**API Gateway** bevezetése (Kong / Apigee / NGINX / KrakenD – környezetfüggő döntés):
- **Rate Limiting / Quotas**
- **Schema validation** (OpenAPI alapján)
- **mTLS enforcement / TLS termination**
- **Auth header enforcement** (`Authorization`, `X‑Tenant‑Id`, `X‑Correlation‑Id`)
- **WAF szabályok** a tipikus támadások ellen
- **Circuit breaker / retry** minták

A gateway **nem** váltja ki a service mesh‑t; együtt működnek:
- Mesh: service‑to‑service mTLS, workload‑identity, policy.
- Gateway: edge policy és traffic management.

## Consequences
**Positive**
- Központi védelem és következetesség.
- Domain API-k egyszerűbben maradhatnak.
- Jobb láthatóság és audit a peremen.

**Negative**
- Plusz hálózati hop és üzemeltetés.
- Gateway konfigurációk karbantartása szükséges.

## Status
Accepted

## Related
ADR‑0010 (Service Mesh), ADR‑0012 (API Governance), ADR‑0019 (Observability)