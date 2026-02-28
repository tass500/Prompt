# ADR‑0010 – Service Mesh & Zero‑Trust Workload Identity

## Context
A domain-szolgáltatások és a platform-core-engine közötti kommunikációnak
mindig erős titkosítással, hitelesítéssel és policy enforcement-tel kell működnie.  
A Zero‑Trust alapelv: „Never trust, always verify”.

## Decision
Service Mesh (Istio / Linkerd) bevezetése:

- **mTLS enforcement** minden service → service hívásra
- **SPIFFE/SPIRE** workload‑identity
- dinamikus cert‑rotáció
- mesh‑szintű policy enforcement
- mesh telemetry → OpenTelemetry

Ez NEM váltja ki az API Gateway-t, hanem kiegészíti.

## Consequences
### Positive
- vállalati Zero‑Trust megfelelőség
- nincs szükség app‑szintű TLS kezelésre
- erős workload identity
- jobb observability (mesh telemetry)

### Negative
- bevezetése és üzemeltetése komplex
- mesh operátor tudás szükséges

## Status
Accepted

## Related
ADR‑0020 (Security Hardening)  
ADR‑0019 (Observability)