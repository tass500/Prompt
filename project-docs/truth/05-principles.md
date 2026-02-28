# 05 – Principles
_A platform-core-engine és a domain-szolgáltatások tervezésének és működésének alapelvei._

Ez a dokumentum tartalmazza azokat a **nem megkerülhető alapelveket**, amelyek a projekt architektúráját, működését, biztonságát és fenntarthatóságát meghatározzák.  
Minden új komponensnek, domainnek vagy funkciónak ezeket az elveket kell követnie.

---

# 1. Single Source of Truth (SoT)

- A **truth/** mappa a fejlesztési folyamat *egyetlen hiteles igazságforrása*.  
- Minden döntés, változtatás, feature vagy követelmény először ide kerül rögzítésre, majd azt követi a kód.  
- A kódban nem jelenhet meg olyan logika, amit a SoT nem támaszt alá.

---

# 2. Domain-Driven Design (DDD)

- A domain-szolgáltatások **szigorúan elkülönülnek** egymástól.  
- Nincs közös modell, közös DB vagy közös repository.  
- Minden domain önálló bounded context.  
- A platform-core-engine **nem tartalmaz domain logikát**.

---

# 3. Clean Architecture rétegzettség

- A domain réteg **nem függhet** sem Application-től, sem Infrastructure-től.  
- A Presentation réteg (API) nem tartalmazhat üzleti logikát.  
- Infrastruktúra modulok cserélhetőek.

---

# 4. Zero-Trust Security Model

- Minden hívás hitelesítést és engedélyezést igényel.  
- Minden komponens „**deny-by-default**” módon működik.  
- mTLS és workload identity (SPIFFE/SPIRE) az alap.  
- Policy-as-code (OPA/Cedar) minden kritikus műveletre.

---

# 5. Multi-Tenancy alapelvek

- Default: **Tenant-per-Schema**.  
- Tenant adatainak teljes izolációja kötelező.  
- Tenant azonosítás:  
  - `X-Tenant-Id` fejléc  
  - vagy JWT claim  
  - vagy host‑based routing  

Tenant override szabályok:
- BASE domain JSON → gyári konfiguráció  
- TENANT override JSON → bővíthet / szűkíthet  
- Effective config runtime merge eredménye  
- Tenant nem írhat felül compliance-kritikus elemeket.

---

# 6. Low-Code First

- A platform-core-engine UI-ját, workflow-jait, menüit és i18n-jét **JSON metaadatból generálja**.  
- Minden UI képernyő, grid, layout *declarative JSON-ból* áll elő.  
- Minden workflow state machine modell JSON-ból generálódik.  
- A low-code szerkesztők teljeskörűen tenant‑aware működést használnak.

---

# 7. REST + Events Only (No Shared DB Ever)

- Domain szolgáltatások közti kommunikáció:
  - REST (lekérdezések)
  - CloudEvents 1.0 (állapotváltozás)
- Soha nincs:
  - közös adatbázis  
  - közös táblák  
  - közvetlen DB‑hívás domain-ek között  
  - shared code repository domain logikára  

Ezt az elvet az ADR‑0022 rögzíti.

---

# 8. Eventual Consistency by Design

- A rendszer vállalja az eventual consistency modellt.  
- Minden domain saját adatot kezel és saját eseményeket publikál.  
- Outbox pattern kötelező minden state-changing domain eseményre.  
- Inbox/idempotency kötelező minden eseményfogyasztóra.

---

# 9. Observability Everywhere

- OpenTelemetry (trace/metric/log) integráció minden szolgáltatásban.  
- Egységes log formátum: JSON structured logs.  
- TraceID és CorrelationID kötelezően propagálva minden API és event hívásban.  
- Minden domainhez SLO/SI meghatározva.

---

# 10. Idempotency Everywhere

- Minden POST/PUT/PATCH hívás kötelezően:  
  - `Idempotency-Key` header  
  - idempotens végrehajtás  
- Ketelszabály: „Idempotent API = Safe API”.

---

# 11. Compliance by Design

- Audit log minden műveletről (digitálisan aláírt hash‑chain).  
- GDPR/Schrems III kompatibilis adattárolás.  
- PII kezelése szabályozott (maszkolás / redakció).  
- SOX/NIST/ISO 27001 alapkövetelmények beépítve.

---

# 12. Extensibility Without Fragility

- Bővíthető architektúra, de a stabilitás megőrzése mellett.
- BASE konfiguráció sérthetetlen.
- Tenant override réteg korlátozott, ellenőrzött.
- Minden bővítés verziózott, auditált és rollback‑képes.

---

# 13. No Magic, No Hidden Logic

- Minden működési logika dokumentálva van a truth/ mappában.  
- Sem a frontend, sem a backend nem tartalmazhat rejtett hardkodeolt viselkedést, ha az JSON-ból konfigurálható.

---

# 14. Automation Over Manual Work

- Minden folyamat és pipeline automatizálható (CI/CD, governance, testing, compliance).  
- A kézi beavatkozás minimális.

---

# 15. Developer Experience (DX) Excellence

- A platform célja: gyors fejlesztés, gyors bővítés.  
- Tiszta projektszerkezet, jól dokumentált API-k, Backstage portal, automatikus minőségkapuk.

---

# 16. Strict Versioning

- Minden API, esemény, schema, workflow és policy verziózott.  
- Semantic versioning ajánlott.  
- Breaking change → kizárólag új verzió.