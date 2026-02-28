# ADR‑0001 – Technology Stack

## Context
A platform-core-engine és a domain-szolgáltatások hosszan fenntartható, moduláris, skálázható, cloud-native megoldást igényelnek.  
Olyan technológiai stack szükséges, amely:
- erős ökoszisztémával rendelkezik,
- támogatja az enterprise-grade biztonságot,
- alkalmas low‑code runtime és szerkesztői funkciók kezelésére,
- multi‑project és multi‑team környezetben működik.

## Decision
- **Backend**: .NET 8 / C#  
- **Frontend**: Angular 17 + Angular Material + Tailwind CSS  
- **Architectural Pattern**: Clean Architecture + DDD  
- **Runtime**: Linux Containers  
- **Packaging**: Docker  
- **Orchestration**: Kubernetes  
- **CI/CD**: GitHub Actions  
- **IaC‑ready**: Terraform / Bicep / Pulumi támogatott  
- **API Style**: OpenAPI 3.0 / REST, Events: CloudEvents 1.0

## Consequences
### Positive
- stabil és vállalati körökben elterjedt
- erős tooling mind FE/BE oldalon
- konténeres architektúra elsőosztályú támogatása
- hosszútávú LTS támogatás .NET és Angular részéről

### Negative
- Angular + Material + Tailwind egyszerre nagy fegyelmet kíván
- FE/BE fejlesztői kompetencia kettős

## Status
Accepted