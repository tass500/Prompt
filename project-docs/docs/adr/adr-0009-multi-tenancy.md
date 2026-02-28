# ADR‑0009 – Multi‑Tenant Strategy

## Context
A platform multi‑tenant SaaS vagy enterprise környezetben működik.  
Az adatizoláció, compliance, teljesítmény és költségoptimalizálás miatt
a tenant kezelése kritikus tervezési pont.

## Decision
A default multi‑tenant stratégia: **Tenant‑per‑Schema**.

Opciók:
- **Tenant‑per‑Schema** → default (biztonság + költség optimális)
- **DB‑per‑Tenant** → GovCloud / Finance kritikus
- **RLS** → lightweight tenants / non-sensitive adatok

Tenant identification:
- `X-Tenant-Id` header
- JWT tenant claim
- subdomain alapján: `{tenant}.example.com`

Tenant override modell:
- Domain BASE JSON
- Tenant Override JSON
- Effective merged runtime config

## Consequences
### Positive
- magas izolációs szint
- gyors migráció és rollback
- low‑code tenant testreszabás egyszerű

### Negative
- schema router implementáció szükséges

## Status
Accepted

## Related
ADR‑0014, ADR‑0023