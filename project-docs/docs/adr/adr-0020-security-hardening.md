# ADR‑0020 – Security Hardening & Secretless Architecture

## Context
A modern Zero‑Trust környezetben a statikus titkok tárolása,
a nem titkosított kommunikáció és a hosszú élettartamú tokenek
jelentős biztonsági kockázatot jelentenek.

## Decision
A platform teljes biztonsági rétegét megerősítjük:

### 1) Workload Identity
- SPIFFE/SPIRE ID minden mikroszolgáltatáshoz
- felhasználás: mesh, DB, KMS, titok nélküli autentikáció

### 2) TLS 1.3 Everywhere
- mesh
- gateway
- domain API-k
- engine API-k

### 3) mTLS Enforcement
- service-to-service hívások
- certificate rotation automatizálva

### 4) Secretless Architecture
- titkok kiváltása workload identity + KMS segítségével
- Azure Key Vault / AWS KMS integráció
- runtime key provisioning

### 5) JWT Safety
- JTI replay védelem
- clock skew kezelése
- rövid élettartamú tokenek

## Consequences

### Positive
- vállalati biztonsági megfelelés
- titokszivárgás kockázata minimális
- erős runtime izoláció

### Negative
- komplex PKI / KMS integráció
- mesh + gateway + auth stack együttműködésének beállítása szükséges

## Status
Accepted

## Related
ADR‑0010 (Service Mesh)  
ADR‑0019 (Observability)