# ADR‑0003 – Database Strategy & Data Providers

## Context
A domain-szolgáltatások teljesen szeparált adatbázist használnak.  
A különböző telepítési környezetek különböző DB backendet igényelhetnek.

## Decision
EF Core-t alkalmazunk DB-agnosztikus ORM rétegként.

Támogatott adatbázisok:
- **MSSQL** (default)
- **PostgreSQL**
- **InMemory** (development)
- **MongoDB** (read model)

DB provider választása:
- `DB_PROVIDER=mssql|postgres|inmem|mongodb`

## Consequences
### Positive
- széles DB kompatibilitás
- multi-cloud támogatás
- domain-szintű DB szétválasztás

### Negative
- provider különbségek kezelése extra feladat

## Status
Accepted