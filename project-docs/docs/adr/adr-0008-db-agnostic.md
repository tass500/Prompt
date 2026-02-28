# ADR‑0008 – DB‑Agnostic Data Access

## Context
A platform-core-engine és a domain-ek különböző DB backendekre kerülhetnek.  
A DB választás vállalati, költség- vagy telepítési döntés függvénye lehet.

## Decision
DB‑agnosztikus réteg biztosítása EF Core segítségével.

Támogatott adatbázisok:
- MSSQL
- PostgreSQL
- InMemory (dev/test)
- MongoDB (read-model adapter, opcionális)

Konfiguráció:
- `DB_PROVIDER=mssql|postgres|inmem|mongodb`
- Minden provider külön adapterbe szervezve

## Consequences
### Positive
- platform és domain telepítési rugalmasság
- cloud‑agnosztikus architektúra
- unit/integration tesztek egyszerűsödése

### Negative
- provider edge-case-ek tesztelése több munkát igényel

## Status
Accepted

## Related
ADR‑0003, ADR‑0009