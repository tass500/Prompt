# ADR‑0019 – Observability & Runtime Telemetry (OpenTelemetry)

## Context
A platform számos komponensből áll (engine + domain szolgáltatások).
Különösen fontos, hogy a hibák, teljesítményromlások, integrációs problémák
gyorsan és pontosan diagnosztizálhatók legyenek.

## Decision
**OpenTelemetry alapú megfigyelhetőség** bevezetése:

### Trace
- W3C TraceContext kötelező
- minden API hívás egy trace része
- mesh telemetry (Istio/Envoy) integrálva

### Metrics
- RED metrikák (Rate, Errors, Duration)
- USE metrikák (Utilization, Saturation, Errors)

### Logs
- JSON structured logs
- kötelező mezők:
  - `trace_id`
  - `correlation_id`
  - `tenant_id`
  - `user_id`

### SIEM Forwarding
- Splunk vagy Azure Sentinel integráció
- audit trace-ek külön streamen

## Consequences

### Positive
- gyors hibakeresés
- vállalati audit megfelelés
- SLO/SI alapú monitoring

### Negative
- OTel collector üzemeltetés szükséges
- több napló és metrika adat → storage igény nő

## Status
Accepted

## Related
ADR‑0010 (Service Mesh), ADR‑0015 (API Gateway)