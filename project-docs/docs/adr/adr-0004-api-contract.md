# ADR‑0004 – API Contract (OpenAPI First)

## Context
A szolgáltatások közötti kommunikáció kizárólag REST + események alapján történik.  
Ezért elengedhetetlen a konzisztens API‑szerződés.

## Decision
- minden REST API → **OpenAPI 3.0** szerint definiált  
- kötelező API contract lint (Spectral)  
- kötelező contract testing (Pact)  
- API verziózás: `/api/v1/...`  
- minden breaking change új verziót igényel

## Consequences
### Positive
- előre ismert interfészek
- jobb integrációs stabilitás
- automatizálható API minőség

### Negative
- extra governance szükséges

## Status
Accepted