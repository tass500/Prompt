# 04 – Next Steps
_A platform-core-engine és domain-szolgáltatások következő iterációi (részletes roadmap)._

Ez a dokumentum a teljes rendszer következő fejlesztési fázisait tartalmazza, a már lefektetett ADR-ekre (0001–0023) építve.  
A roadmap szigorúan a `truth/` mappa alapján halad, és minden sprint eredménye után a dokumentáció frissítendő (SoT elv).

---

# Sprint 1 – Zero‑Trust alapok & Infrastruktúra

### 🎯 Célok
- Service Mesh (Istio/Linkerd) telepítése
- mTLS Required policy
- API Gateway első konfigurációja
- Tenant Resolver + Schema Router első verziója

### 📌 Feladatok
- Sidecar injection engedélyezése
- SPIFFE/SPIRE workload identity alap bevezetése
- API Gateway → Engine → Domain route-ok létrehozása
- Edge-en kötelező header enforcement:
  - `X-Tenant-Id`
  - `X-Correlation-Id`
  - `Authorization` (OIDC)

---

# Sprint 2 – Policy Registry (OPA/Cedar) & PBAC

### 🎯 Célok
- PBAC/ABAC központi szabálytár működő állapotban
- Domain API-k döntési pontjainak összekötése a registry-vel

### 📌 Feladatok
- Policy repository (Rego + Cedar) kialakítása
- Policy bundle server
- Domain policy adapter generikus bevezetése
- “Deny-by-default” baseline bevezetése minden write műveletre

---

# Sprint 3 – Event Mesh & Outbox Pattern

### 🎯 Célok
- Domain-szintű CloudEvents publikálás egységesítése
- Outbox → Publisher worker implementálása

### 📌 Feladatok
- Outbox tábla domainenként
- Retry + idempotencia
- Kafka/EventHubs/NATS csatornák kialakítása
- Domain események sémájának rögzítése:
  - `PartyCreated`, `PartyUpdated`, `PartyMerged`
  - `ItemChanged`
  - `InvoicePosted`, stb.

---

# Sprint 4 – Observability (OTel) & SIEM integráció

### 🎯 Célok
- End‑to‑end megfigyelhetőség biztosítása
- Minden domain szolgáltatás átlátható trace- és log-mintát adjon

### 📌 Feladatok
- OpenTelemetry Collector telepítése
- Trace/Metric/Log exporter beállítása
- SIEM forwarder integráció (Splunk/Sentinel)
- Mandatory correlation-id propagation

---

# Sprint 5 – API Quality Gates & Developer Experience

### 🎯 Célok
- API szerződés-minőség automatikus ellenőrzése
- Fejlesztői portál (Backstage) inicializálása

### 📌 Feladatok
- Spectral OpenAPI lint GitHub Actions-ben
- Pact Contract Tests (consumer → provider)
- Schemathesis fuzz & stateful API tesztek
- Backstage integráció:
  - service catalog
  - API docs
  - scorecards

---

# Sprint 6 – Low‑Code Engine (MVP)

### 🎯 Célok
A runtime most már képes legyen JSON-ból:

- képernyőket generálni  
- workflow-kat értelmezni  
- menüt összeállítani  
- i18n-ből fordítani  

### 📌 Feladatok
- Dynamic Angular renderer alapverzió
- JSON schema validátor beépítése
- Workflow executor első verziója
- Low-code storage API (CRUD) bevezetése
- UI preview mód

---

# Sprint 7 – Extensibility (Base → Tenant → Effective)

### 🎯 Célok
- A platform SaaS-képességének alapja: tenantonkénti testreszabás
- Domain BASE + Tenant Override + Effective runtime config működjön

### 📌 Feladatok
- JSON merge engine (strategies: merge/replace/append/remove)
- Override validation guard (compliance megőrzése)
- Tenant config storage
- Base → Tenant → Effective pipeline implementálása
- Low-code editor tenant-aware működése

---

# Sprint 8 – Master Data Domain (MVP)

### 🎯 Célok
- Canonical adatforrás (Party, Item, Warehouse)
- Domain API + eseménypublisholás

### 📌 Feladatok
- Party API
- Item API
- Warehouse API
- SCD2 versioning (validFrom/validTo)
- External ID mapping
- Duplicate detection
- Merge workflow

---

# Sprint 9 – Warehouse Domain (MVP)

### 🎯 Célok
- Raktári folyamatok támogatása
- CloudEvents alapú integráció a Finance és MasterData felé

### 📌 Feladatok
- Items list + form + workflow
- Stock movement (GI/GR) API
- Reservation workflow
- Domain események: StockMoved, ItemChanged

---

# Sprint 10 – Finance Domain (MVP)

### 🎯 Célok
- Pénzügyi folyamatok alapjai
- Integráció raktár és törzsadat domainnel

### 📌 Feladatok
- Chart of Accounts
- Journal Entry workflow
- Invoice Issue → Approve → Post
- Domain események: InvoiceCreated/Posted/Cancelled

---

# Sprint 11 – Security Hardening & Compliance

### 🎯 Célok
- Teljes Zero-Trust megfelelés
- Audit- és compliance-követelmények lezárása

### 📌 Feladatok
- SPIFFE/SPIRE teljes bevezetése
- JWT JTI replay-védelem
- TLS1.3 enforcement
- Digitálisan aláírt audit chain teljes implementációja
- PII redaction és DLP szabályok

---

# Sprint 12 – Production Readiness

### 🎯 Célok
- A platform-core-engine és a domain-ek készen álljanak éles használatra

### 📌 Feladatok
- Canary rollout szabályok finomítása (Argo Rollouts)
- Backup/Restore és DR tesztek
- Full performance baseline
- Multi-tenant load test
- Posture & compliance audit (ISO/SOX/NIST)

---

## Zárás

A fenti iterációk lefedik a teljes:

- platform-core-engine funkcióhalmazt,
- multi-domain kommunikációt,
- low-code motort,
- SaaS extensibility stratégiát,
- biztonsági és compliance elvárásokat,
- domain-szolgáltatások működő MVP-jét.

A roadmap **kötelezően frissítendő** minden sprint lezárása után.