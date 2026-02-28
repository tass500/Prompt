# ADR‑0014 – Schema‑per‑Tenant Multi‑Tenancy

## Context
A platform multi‑tenant; fontos a biztonság, költség, teljesítmény egyensúlya. A DB‑per‑Tenant túl drága és komplex, az RLS pedig nem minden üzleti/biztonsági elvárásnak felel meg.

## Decision
**Alapértelmezett stratégia: Tenant‑per‑Schema.**
- Minden tenantnak külön séma ugyanazon adatbázis‑példányban.
- Tenant feloldás (resolver) a `X‑Tenant‑Id`/JWT/host alapján.
- Séma‑routing (connection/schema választás) központi komponenssel.

**Alternatívák (nem default):**
- **DB‑per‑Tenant** – kritikus pénzügy/gov eset.
- **RLS** – csak kis kockázatú, lightweight tenantokra.

## Consequences
**Positive**
- Jó izolációs szint vs. költség arány.
- Könnyebb migráció és rollback tenant szinten.
- Tenant‑specifikus audit és retention.

**Negative**
- Séma‑routing implementáció és üzemeltetés.

## Status
Accepted

## Related
ADR‑0009 (Multi‑tenancy), ADR‑0023 (Extensibility Model)