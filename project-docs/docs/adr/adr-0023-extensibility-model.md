# ADR‑0023 – Extensibility Model (Base → Tenant Override → Effective)

## Context
A platform multi-tenant SaaS modellben működik, ahol a doménekhez tartozó képernyők,
workflow-k, menük és i18n definíciók egy központi "gyári" (BASE) rétegben léteznek,
de a tenantok testre szeretnék szabni a számukra releváns részeket.

Nem megoldható, hogy a domain logika tenantonként külön kódot használjon;
a testreszabásnak *konfigurációs szinten* kell megtörténnie.

Ez a modern low‑code rendszerek (ServiceNow, Mendix, Outsystems, SAP BTP) kulcsmodellje.

## Decision
3‑szintű öröklődési modellt vezetünk be:

### 1) Domain BASE Layer
- gyári JSON definíciók (képernyők, workflow-k, menük, i18n)
- ezek a domain által szállított standardok
- nem módosíthatók tenant szinten

### 2) Tenant Override Layer
Tenant‑szintű konfigurációk:
- mezők elrejtése / bővítése
- új mezők hozzáadása
- workflow tranzíciók bővítése
- menü módosítás
- i18n felülírás
- csak engedélyezett mezők/műveletek override-olhatók

### 3) Effective Merged Layer
Futásidőben a rendszer:
- beolvassa a BASE réteget,
- alkalmazza rá a TENANT override-ot,
- JSON merge szabályok alapján egy **Effective Config**-et állít elő.

Merge stratégiák:
- `merge`
- `replace`
- `append`
- `remove`
- `overrideIfExists`
- `baseIfMissing`

### Compliance védelem
- Tenant override **nem** írhat felül:
  - kötelező audit mezőket
  - compliance kritikus workflow állapotokat
  - rendszermezőket
  - PBAC által védett műveleteket

## Consequences
### Positive
- tenantonként teljes UI/workflow testreszabhatóság
- domain logika változatlan és stabil marad
- low‑code motor nagyon rugalmas lesz
- SaaS modellhez ideális (plug‑and‑play)

### Negative
- JSON merge engine összetett
- Tenant admin UI-t gondosan kell tervezni

## Status
Accepted

## Related
ADR‑0006 (Low‑Code Engine)  
ADR‑0009/0014 (Multi‑tenant)  
ADR‑0018 (Master Data Governance)