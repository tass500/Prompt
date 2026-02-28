# 01 – Modules
_A platform-core-engine és a kapcsolódó domain-szolgáltatások teljes moduláris felépítése._

## 1. Platform-Core-Engine (Low-Code Enterprise Motor)

A platform célja egy **domainfüggetlen, újrafelhasználható**, API‑centrikus low‑code motor biztosítása, amelyre bármilyen üzleti domain ráépíthető.  
A motor több magas szintű modulból áll:

---

## 1.1 Identity & Access (IAM Mesh)

- Runtime-switchable Multi-IdP támogatás:
  - Microsoft Entra ID
  - Okta / Auth0
  - Keycloak
  - Custom OIDC
  - SAML 2.0
  - FIDO2 / WebAuthn
  - mTLS / Client Certificate
  - API Key (gépi integrációhoz)
- Identity Provider Mesh absztrakció
- Claim normalizálás és context injection
- RBAC, ABAC és PBAC (OPA / Cedar) támogatás
- Policy-as-Code integráció
- SCIM 2.0 provisioning előkészítve

---

## 1.2 Tenant Management

**Default stratégia:** Tenant‑per‑Schema  
**Fallback:** DB‑per‑Tenant, RLS (nem ajánlott)

Fő komponensek:

- Tenant Registry  
- Tenant Resolver  
- Schema Router  
- Tenant-isolated audit, retention, backup  
- Tenant-level customization (Base → Tenant Override → Effective)

---

## 1.3 Low-Code Engine

A motor egyik legfontosabb pillére.  
Minden vizuális, üzleti és felhasználói logika JSON sémákból generálódik:

### Low-code szerkesztők:
- **Screen Editor** (űrlap + lista generálás)
- **Workflow Editor** (state machine)
- **Menu Editor** (navigáció)
- **i18n Editor** (nyelvi kulcsok)
- **Assets/Media Manager**

### Low-code JSON alapok:
- JSON schema alapú form- és grid-modellek  
- JSON workflow model  
- JSON menu tree  
- JSON i18n namespace-ek  

### Extensibility modell:
- **Domain BASE** → gyári JSON  
- **Tenant Override** → bővítés / szűkítés  
- **Effective Config** → runtime merge  
- Merge policy támogatás:
  - replace  
  - merge  
  - append  
  - remove  
  - overrideIfExists  
  - baseIfMissing  

---

## 1.4 Observability

- OpenTelemetry (OTel) trace, metric, log  
- W3C TraceContext  
- Distributed tracing a domain-szolgáltatások között  
- SIEM forwarders (Splunk, Sentinel)  
- Dashboard template-k (latency / SLO / error budget)

---

## 1.5 Audit & Compliance

A platform teljesen auditált és megfelel a modern vállalati követelményeknek:

- Digitális aláírt audit log (hash‑chain)  
- Minden state transition auditálva  
- API call audit  
- Low-code módosítások audit trail  
- GDPR, Schrems III kompatibilitás  
- SOX / ISO 27001 / NIST 800‑53 baseline  
- Data residency szabályok tenant szinten

---

## 1.6 DevSecOps

- GitHub Actions CI/CD  
- SAST → CodeQL / SonarQube  
- DAST → OWASP ZAP  
- Container scanning → Trivy  
- SBOM → CycloneDX  
- GitOps-ready → ArgoCD / FluxCD  
- Progressive delivery → Argo Rollouts

---

## 1.7 Eventing System

**Kommunikáció domain-szolgáltatások között: REST + CloudEvents**

- CloudEvents 1.0  
- Event Mesh → Kafka / Event Hubs / NATS  
- Transactional Outbox Pattern  
- Inbox pattern (consumer idempotencia)  
- Replay protection  
- Event versioning

---

## 1.8 API Layer

- OpenAPI 3.0 szerződés  
- AsyncAPI az eseményekhez  
- Contract Testing (Pact)  
- Semantic versioning szabályok  
- API Gateway integráció:
  - rate limiting  
  - schema validation  
  - mTLS enforcement  
  - WAF szabályok  

---

## 2. Domain Services

A domain-ek **NEM részei a platform-core-engine-nek**:  
külön projektekként működnek, saját adatbázissal, saját ser vice‑logikával.

A domain-ek kizárólag **REST** és **CloudEvents** alapon kommunikálnak a motorral:

- Master Data Domain  
- Finance Domain  
- Warehouse Domain  
- (opcionális) CRM Domain  
- (opcionális) HR Domain  
- (opcionális) Shipping / SCM Domain  

### Domain funkcionalitás:
- Domain entitások  
- Domain logika  
- Domain események  
- OpenAPI szerződés  
- saját DB  
- saját audit és observability réteg  
- engine integráció PBAC + IdP + multi‑tenant szerint

---

## 3. Master Data Domain (kötelező)

A rendszer canonical adatforrása (Partner, Item, Warehouse, Tax):

- Party / Partner törzs  
- Item törzs  
- Warehouse / Location törzs  
- Tax, Currency  
- Duplicate detection & Merge workflow  
- External ID Mapping  
- Golden Record  
- SCD Type‑2 versioning  
- CloudEvents publikálás  
- REST API más domain-ek felé

---

## 4. Finance Domain (példa)

- Ledger / Chart of Accounts  
- Journal Entries  
- Invoice issuing  
- Payment processing  
- Workflow: Draft → Approved → Posted  
- CloudEvents: InvoiceCreated, Posted, Cancelled  
- REST endpoints kapcsolódás MasterData + Engine felé

---

## 5. Warehouse Domain (példa)

- Items  
- Stock Movements (GI/GR)  
- Reservations  
- Bins / Locations  
- Workflow: Draft → Approved → Completed  
- Események: StockMoved, ItemChanged  
- REST endpoints + event publishing

---

## Összegzés

A moduláris architektúra úgy épül fel, hogy:

- a **platform-core-engine** biztosítja a low‑code, security, tenant, event és audit képességeket,  
- a **domain szolgáltatások** ezekre épülve, teljesen izoláltan működnek,  
- a kommunikáció **REST + Events**,  
- a konfiguráció **Base → Tenant → Effective** módon öröklődik,  
- a UI és workflow-k **JSON metaadatból generálódnak**.

Ez a platform egy **generikus, jövőálló low‑code enterprise ökoszisztéma** alapja.