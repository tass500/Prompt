# ADR‑0011 – Central Policy Registry (OPA / Cedar)

## Context
A platform több, egymástól független domain-szolgáltatásból áll, amelyekben az engedélyezés (AuthZ) döntési pontok sokasága jelenik meg (CRUD műveletek, workflow-tranzíciók, exportok, adatszintű hozzáférések). Ha a szabályok domainenként lokálisan élnének, az inkonzisztenciához, auditálhatatlan változásokhoz és magas üzemeltetési kockázathoz vezetne.

## Decision
Központi **Policy Registry** bevezetése a platform‑core‑engine részeként:
- **OPA (Rego)** – általános PBAC/ABAC szabályokhoz.
- **Cedar** – kritikus, nagy biztonsági igényű döntésekhez.
- **Bundle szolgáltatás** – verziózott policy csomagok szállítása, edge cache‑elés.
- **Audit** – minden policy kiadás változása naplózva.
- **API** – `POST /api/policy/decision` egységes bemenettel: `user`, `resource`, `action`, `context`.

## Consequences
**Positive**
- Egységes döntéshozatal minden domainben.
- Részletes és visszakereshető audit.
- Policy rollback és staged rollout lehetősége.
- Deny-by-default alapállapot.

**Negative**
- Központi komponens: bevezetés + üzemeltetés költsége.
- Kisebb extra latencia (cache mérsékli).

## Status
Accepted

## Related
ADR‑0006 (Low‑code), ADR‑0009/0014 (Multi‑tenancy), ADR‑0012 (API governance), ADR‑0021 (Idempotency)