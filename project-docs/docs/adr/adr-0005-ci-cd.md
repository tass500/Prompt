# ADR‑0005 – CI/CD Strategy

## Context
A platform-core-engine és a domain-szolgáltatások több repositoryból épülnek, és konténeres környezetben futnak.

## Decision
CI: GitHub Actions  
- build (FE+BE)  
- test  
- lint (OpenAPI, code)  
- contract tests  
- Docker build & push  
- vulnerability scan  
- SBOM generation (CycloneDX)  

CD:
- Kubernetes deployment  
- ArgoCD / FluxCD → GitOps-ready  
- Argo Rollouts → progressive delivery

## Consequences
### Positive
- uniform pipeline minden komponenshez
- automatizált minőség
- rollbacks minimális kockázattal

### Negative
- multi-repo pipeline-ok komplexitása nő

## Status
Accepted