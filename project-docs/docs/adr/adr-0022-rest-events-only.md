# ADR‑0022 – REST + Events Only Domain Communications

## Context
A platform moduláris, több domain-szolgáltatásból álló architektúra.
A követelmény egy:
- teljesen laza csatolású,
- skálázható,
- auditálható,
- multi-tenant-ready
integrációs modell.

A közös adatbázis vagy közös repository súlyosan megsérti a domain-határokat (DDD), növeli a couplingot és a hibák kockázatát.

## Decision
A domain-szolgáltatások közötti kommunikáció **kizárólag**:

### 1. REST API
- lekérdezésekre (GET)
- strukturált write műveletekre (POST/PUT/PATCH)
- strong consistency = request/response

### 2. CloudEvents 1.0 események
- állapotváltozásokra (domain events)
- async kommunikáció, eventual consistency
- event versioning + transactional outbox

**Tilos:**
- shared database
- shared tables
- shared repository
- shared DTO/model
- direct DB access domain-ek között

## Consequences
### Positive
- abszolút domain izoláció
- hibák izoláltak, nem terjednek át
- horizontálisan és szervezetileg jól skálázható
- világos integrációs protokoll

### Negative
- többször kell entitásokat replikálni (read-model)
- komplexebb event modellezés

## Status
Accepted

## Related
ADR‑0013 (Events & Outbox), ADR‑0004 (API Contract), ADR‑0009/0014 (Multi‑Tenant)