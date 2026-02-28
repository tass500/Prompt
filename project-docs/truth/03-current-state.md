# 03 – Current State
_A platform-core-engine és a hozzá kapcsolódó domain-szolgáltatások jelenlegi, egységesített állapota._

Ez a dokumentum összefoglalja, hol áll a projekt a tervezés és architektúra szempontjából.  
A cél az, hogy a `truth/` mappa alapján *egyértelműen lehessen követni* a rendszer fejlettségét és a következő teendőket.

---

## 1. A platform-core-engine architektúrája teljes mértékben definiálva

A következő nagy komponensek terve elkészült:

- Identity Provider Mesh (runtime-switchable multi‑IdP)
- PBAC/ABAC/RBAC policy rendszer (OPA + Cedar)
- Multi-tenant modell (Default: Tenant‑per‑Schema)
- Low‑code engine (JSON‑vezérelt UI + workflow + i18n + menu)
- Extensibility Model (Base → Tenant Override → Effective Runtime Config)
- Service Mesh (mTLS + SPIFFE/SPIRE workload identity)
- API Gateway réteg (rate limit, schema validation, WAF, mTLS)
- Event Mesh (CloudEvents 1.0 + Outbox pattern)
- Observability baseline (OTel trace, metric, log, SIEM forwarders)
- DevSecOps baseline (SAST/DAST/SBOM/Argo Rollouts)

Ezek mind rendelkeznek részletes ADR‑rel (ADR‑0001 … ADR‑0023).

---

## 2. A domain-ek logikai elválasztása kész

Mindhárom alapvető domain modul terve meghatározva:

### **Master Data Domain**
- Party, Item, Warehouse, Tax canonical törzsadatok  
- Golden Record + Duplicate Merge workflow  
- SCD Type‑2 versioning  
- External ID Mapping  
- CloudEvents event publishing  
- REST API más domain-ek számára  

### **Finance Domain**
- Ledger, Journal Entry, Invoice Issue/Post  
- Workflow: Draft → Approved → Posted  
- Integráció MasterData és Engine felé  
- REST + event publishing  

### **Warehouse Domain**
- Item, Stock Movement, Reservation  
- Workflow: Draft → Approved → Completed  
- REST + event publishing  

Mindhárom domain **külön projektként** működik → csak REST + Events kommunikáció van.

---

## 3. Low‑code engine funkcionalitása definiálva

A platform low‑code képességei **rögzítve**:

- Screen Editor
- Workflow Editor
- Menu Editor
- i18n Editor
- Assets Manager
- JSON schema alapú form/grid generálás
- JSON state machine workflow értelmezés
- JSON menu tree runtime render
- JSON i18n namespace override

A dynamic Angular renderer architektúrája kidolgozott.

---

## 4. Base → Tenant öröklési modell részletesen specifikálva

A rendszer képes:

1. Domain BASE (gyári) konfigurációt tárolni
2. Tenant override‑okat kezelni
3. Ezeket merge‑elni JSON‑szabályok szerint:

- merge  
- replace  
- append  
- remove  
- overrideIfExists  
- baseIfMissing  

Ez a modell a platform SaaS‑képességének alapja.

---

## 5. Biztonsági modell teljes körűen meghatározva

A Zero‑Trust és vállalati biztonsági követelmények rögzítve:

- minden hívás OIDC‑n vagy mTLS‑en keresztül hitelesített  
- workload identity SPIFFE/SPIRE  
- PBAC decision minden kritikus action esetén  
- TLS 1.3 mindenhol  
- digitálisan aláírt audit log  
- JTI‑alapú replay‑védelem  
- policy‑based request filtering (gateway szinten)

---

## 6. Event‑driven architektúra kialakítva

- CloudEvents 1.0 formátum  
- Event Mesh (Kafka/EventHubs/NATS)  
- Outbox pattern  
- Inbox/idempotency pattern előkészítve  
- Domain események listája meghatározva  
- Event versioning stratégia definiálva  

---

## 7. DevSecOps pipeline tervek meghatározva

A CI/CD rendszer követelményei:

- GitHub Actions  
- OpenAPI lint (Spectral)  
- Pact contract tests  
- Schemathesis fuzzing  
- Docker build & scan  
- SBOM generálás (CycloneDX)  
- Progressive delivery (Argo Rollouts)  
- Kubernetes base manifests  

---

## 8. A dokumentáció teljes struktúrája összeállítva

A teljes `truth/` és `docs/adr/` mappa kész, lefedi:

- Vision  
- Modules  
- Decisions (ADR Summary)  
- Current State (ez a dokumentum)  
- Next Steps (detailed sprint roadmap)  
- Principles  
- OpenAPI baseline  
- 24 darab ADR (0001–0023)

---

## 9. Jelenlegi állapot röviden

A teljes architektúra:

- **megtervezve**,  
- **struktúráltan dokumentálva**,  
- **koherensen összefésülve**.

A rendszer készen áll a következő nagy lépésre:

> **Megkezdődhet a platform-core-engine és a domain-szolgáltatások generálása és implementációja a truth alapján.**