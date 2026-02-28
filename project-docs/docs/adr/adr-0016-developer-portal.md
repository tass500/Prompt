# ADR‑0016 – Developer Portal (Backstage)

## Context
A platform több domain-szolgáltatásból áll (Master Data, Finance, Warehouse, stb.).
A fejlesztők, integrátorok, DevOps és SRE csapatok akkor tudnak hatékonyan dolgozni,
ha minden szolgáltatás:

- megtalálható egy központi katalógusban,
- egységes módon dokumentált,
- automatikusan megjeleníti az OpenAPI/AsyncAPI szerződéseit,
- minőség- és governance mutatókkal rendelkezik,
- sablonok alapján gyorsan generálható.

Ez a modern enterprise architektúrák alapköve (DevEx-first szemlélet).

## Decision
Bevezetjük a **Backstage** alapú Developer Portal-t, amely:

### Core funkciók:
- Service Catalog (minden engine + domain service)
- OpenAPI/AsyncAPI automatikus import és vizualizáció
- TechDocs dokumentációk
- Golden Path sablonok (új domain vagy modul generálásához)
- Scorecard rendszer:
  - API lint státusz
  - contract test státusz
  - OTel implementáltság
  - security baseline megfelelés
- RBAC beállítások a szervezeten belül

### Integráció:
- GitHub Actions pipeline outputok vizualizálása
- ArgoCD/FluxCD deploy státusz
- Kubernetes cluster resource insights
- Szerződés-változás diff és changelog

## Consequences

### Positive
- jelentősen javul a developer experience
- könnyebb onboarding új csapatok számára
- minden szolgáltatás és dokumentáció egy helyen érhető el
- gyorsabb hibakeresés és governance lefedettség
- API konzisztencia növekszik

### Negative
- bevezetése kezdeti konfigurációt igényel
- dedikált karbantartás kell (plugin update, catalog rules)

## Status
Accepted

## Related
ADR‑0012 (API Governance)  
ADR‑0019 (Observability)  
ADR‑0020 (Security Hardening)