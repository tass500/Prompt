# ADR‑0006 – Low‑Code Editor Layer

## Context
A platform-core-engine célja, hogy gyorsítsa az alkalmazásfejlesztést, és lehetővé tegye, hogy a képernyők, workflow-k és menük **JSON metaadatból** generálódjanak.  
A felhasználói felület és üzleti logika jelentős része deklaratívan írható le.

A domain-szolgáltatások NEM tartalmaznak UI‑t vagy workflow‑t — ez a motor feladata.

## Decision
Bevezetjük a következő low‑code szerkesztőket és motorfunkciókat:

- **Screen Editor** → űrlapok, listák, layout JSON‑sémából
- **Workflow Editor** → state machine modellek JSON‑ban
- **Menu Editor** → navigációs fájú JSON-ból
- **i18n Editor** → nyelvi kulcsok tenant‑onként
- **Assets / Media Manager**
- **SCHEMA STORAGE**: domain/base + tenant/override rétegek

Runtime komponensek:
- Dynamic Angular renderer
- JSON schema validator
- Workflow engine
- Tenant-aware schema loader
- Effective config merger (Base → Tenant → Effective)

## Consequences
### Positive
- fejlesztési sebesség radikálisan nő
- JSON metaadat vezérli a UI-t és folyamatokat
- bármikor testreszabható (tenant override)
- domain-szolgáltatások UI-függetlenek

### Negative
- összetett editor UI-k fejlesztése
- minőségi JSON-modellek és séma-validálás szükséges

## Status
Accepted

## Related
ADR‑0023 (Extensibility Model)