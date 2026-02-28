# 02 – Decisions (ADR Summary)

Ez a dokumentum tartalmazza a platform‑core‑engine és a hozzá kapcsolódó
domain-szolgáltatások összes architekturális döntésének (ADR) összefoglalóját.

A teljes részletek a `docs/adr/` mappában érhetők el.

---

## ADR‑0001 – Tech Stack
Backend: .NET 8, C#  
Frontend: Angular 17 + Material + Tailwind  
Architecture style: Clean Architecture + DDD  
Deployment: Docker + Kubernetes  
DevOps: GitHub Actions  
*→ részletek:* `adr-0001-tech-stack.md`

---

## ADR‑0002 – Architecture Style (DDD + Clean Architecture)
DDD + Clean Architecture rétegezés (Domain → Application → Infrastructure → Presentation).  
Szabály: domain réteg soha nem függhet kifelé.  
*→ részletek:* `adr-0002-architecture-style.md`

---

## ADR‑0003 – Database Strategy
DB providers:
- MSSQL (default)
- PostgreSQL
- InMemory (dev)
- MongoDB (read-model adapter)
Env: `DB_PROVIDER`  
*→ részletek:* `adr-0003-database-strategy.md`

---

## ADR‑0004 – API Contracting (OpenAPI First)
REST API = OpenAPI 3.0 szerződés szerint.  
Breaking change csak új API verzióval lehetséges.  
*→ részletek:* `adr-0004-api-contract.md`

---

## ADR‑0005 – CI/CD Strategy
GitHub Actions:
- build
- test
- Docker build/push
- K8s manifest lint  
GitOps kompatibilis.  
*→ részletek:* `adr-0005-ci-cd.md`

---

## ADR‑0006 – Low‑Code Editor Layer
A UI képernyők (form/grid), workflow-k, menük, i18n, actions JSON‑sémából generálódnak.  
Szerkesztők: Screen / Workflow / Menu / i18n / Assets.  
*→ részletek:* `adr-0006-lowcode-editor.md`

---

## ADR‑0007 – AI Adapter
AI provider‑agnosztikus adapter a low‑code javaslatokhoz.  
Auditált AI hívások.  
Feature flag mögött.  
*→ részletek:* `adr-0007-ai-adapter.md`

---

## ADR‑0008 – DB-Agnostic Layer
EF Core + provider abstraction.  
DB választása környezeti változóból.  
*→ részletek:* `adr-0008-db-agnostic.md`

---

## ADR‑0009 – Multi‑Tenancy
Default stratégia: **Tenant‑per‑Schema**  
Fallback: DB‑per‑Tenant (kritikus), RLS (nem ajánlott)  
Tenant routing: header/claim/host alapján.  
*→ részletek:* `adr-0009-multi-tenancy.md`

---

## ADR‑0010 – Service Mesh + Workload Identity
Istio/Linkerd + mTLS  
SPIFFE/SPIRE workload identity  
Zero‑Trust hálózati modell  
*→ részletek:* `adr-0010-service-mesh-zero-trust.md`

---

## ADR‑0011 – Central Policy Registry (OPA/Cedar)
Központi PBAC/ABAC policy tár.  
OPA Rego + Cedar engine.  
Verziózott policy bundlék.  
*→ részletek:* `adr-0011-central-policy-registry.md`

---

## ADR‑0012 – API Governance & Contract Testing
Spectral lint  
Pact consumer-driven contract testing  
Schemathesis fuzz testing  
Semantic versioning  
*→ részletek:* `adr-0012-contract-testing-api-governance.md`

---

## ADR‑0013 – Event Mesh & Outbox Pattern
CloudEvents 1.0  
Event Mesh: Kafka / EventHubs / NATS  
Transactional Outbox  
Idempotens event fogyasztók  
*→ részletek:* `adr-0013-event-mesh-outbox.md`

---

## ADR‑0014 – Schema‑per‑Tenant Multi‑Tenant Model
A Tenant‑per‑Schema stratégia megerősítése (alapértelmezett).  
*→ részletek:* `adr-0014-schema-per-tenant.md`

---

## ADR‑0015 – API Gateway & Edge Security
Kong / Apigee / NGINX Gateway.  
Rate limiting, schema validation, mTLS enforcement, WAF.  
*→ részletek:* `adr-0015-api-gateway.md`

---

## ADR‑0016 – Developer Portal (Backstage)
Service Catalog  
OpenAPI/AsyncAPI docs  
Golden Path sablonok  
Scorecardok  
*→ részletek:* `adr-0016-developer-portal.md`

---

## ADR‑0017 – Progressive Delivery (Argo Rollouts)
Canary és Blue/Green kiadás  
SLO/SI metrika‑alapú rollout  
Automatikus rollback  
*→ részletek:* `adr-0017-progressive-delivery.md`

---

## ADR‑0018 – Data Governance (Golden Record)
Master Data Governance:
- Golden Record
- SCD Type‑2
- External ID Mapping
- Merge Workflow  
*→ részletek:* `adr-0018-data-governance.md`

---

## ADR‑0019 – Observability (OTel)
OTel trace, metric, log  
SIEM forwarders (Splunk, Sentinel)  
W3C TraceContext  
*→ részletek:* `adr-0019-observability.md`

---

## ADR‑0020 – Security Hardening & Secretless Architecture
SPIFFE/SPIRE  
mTLS  
TLS 1.3  
KeyVault/KMS  
JTI replay védelem  
*→ részletek:* `adr-0020-security-hardening.md`

---

## ADR‑0021 – Idempotency Everywhere
`Idempotency-Key` header minden író (POST/PUT/PATCH) művelethez  
TTL alapú idempotency store  
*→ részletek:* `adr-0021-idempotency-everywhere.md`

---

## ADR‑0022 – REST + Events Only Domain Communications
REST → lekérdezések  
CloudEvents → állapotváltozások  
Tilos: shared DB, shared repo, shared code  
*→ részletek:* `adr-0022-rest-events-only.md`

---

## ADR‑0023 – Base → Tenant → Effective Config Extensibility
Háromrétegű öröklési modell:
1. Domain BASE (gyári JSON)
2. Tenant Override JSON
3. Runtime Effective Merged JSON  

Merge stratégiák: replace, merge, append, remove, overrideIfExists  
Biztonsági korlátok: tenant nem írhat felül compliance kritikus elemeket  
*→ részletek:* `adr-0023-extensibility-model.md`

---

# Teljes ADR könyvtár összesen:
**24 darab ADR**, amelyek lefedik a teljes:

- architektúrát  
- multi‑tenant stratégiát  
- low‑code engine működését  
- biztonsági réteget  
- eventing‑et  
- PBAC/ABAC/RBAC modellt  
- observability-t  
- AI integrációt  
- extensibility modellt  
- API minőségkapukat  