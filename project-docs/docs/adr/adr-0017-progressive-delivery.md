# ADR‑0017 – Progressive Delivery (Argo Rollouts)

## Context
A platform több microservice-ből áll, és ezek külön‑külön deployolhatók.
A hagyományos "big bang" release túl kockázatos ilyen architektúránál.
A modern gyakorlat a progressive delivery, ahol a forgalom fokozatosan kerül rá az új verzióra.

## Decision
**Argo Rollouts** bevezetése a Kubernetes környezetbe.

### Funkciók:
- Canary release (1% → 10% → 50% → 100%)
- Blue/Green deployment mintázat
- Automatic rollback SLO/SI metrikák alapján
- Metric gates:
  - 95p latency
  - error rate
  - saturation / load
- Web UI + GitOps integráció

## Consequences

### Positive
- minimális kockázat deploy során
- élő ellenőrzés a teljesítményről és hibaarányról
- gyors visszaállás probléma esetén
- CI/CD pipeline-ok minőségbiztosítása nő

### Negative
- kifinomult K8s konfiguráció szükséges
- SRE/DevOps kompetencia kell hozzá

## Status
Accepted

## Related
ADR‑0005 (CI/CD)  
ADR‑0019 (Observability)