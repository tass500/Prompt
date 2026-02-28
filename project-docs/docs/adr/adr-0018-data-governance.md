# ADR‑0018 – Data Governance: Golden Record & External ID Mapping

## Context
A platform egyik kulcsdomainje a **Master Data Domain**, amely
a vállalat vagy tenant canonical, hiteles törzsadatait kezeli:

- Partner (Party)
- Termék (Item)
- Raktár (Warehouse)
- Adók (Tax)
- Ország, deviza, egységek

Ezek több rendszerből származhatnak, duplikációkkal és eltérésekkel.

## Decision
Bevezetjük a Master Data Governance komponenseket:

### 1) Golden Record modell
- minden entitás rendelkezik canonical ID-vel
- duplikált rekordok összefésülése (merge workflow)
- PartyMerged események

### 2) External ID Mapping
- több rendszerbeli (ERP, CRM, webshop, WMS) ID összekötése
- explicit mapping tábla (system → externalId → canonicalId)

### 3) SCD Type‑2 versioning
- `validFrom` / `validTo`
- teljes változástörténet megőrzése

### 4) Data Quality
- kötelező mezők és validációk
- adattisztítási pipeline
- auditálható merge workflow

## Consequences

### Positive
- canonical törzsadat minden domain számára
- domain-szolgáltatások közti konzisztencia stabil
- tenantonként konfigurálható golden record szabályok
- auditált adatkonszolidáció

### Negative
- komplex SCD logika
- törzsadat-kezelés dedikált domain kompetenciát igényel

## Status
Accepted

## Related
ADR‑0013 (Events), ADR‑0022 (REST + Events), ADR‑0023 (Extensibility Model)