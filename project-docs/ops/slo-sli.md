# SLO/SLI baseline

## Service-ek

- Engine API
- MasterData API

## Rendelkezésre állás (availability)

- **SLI**: Sikeres kérések aránya (2xx/3xx) az összes kéréshez képest.
- **SLO (kezdeti)**: 99.5% havi szinten service-enként.

## Késleltetés (latency)

- **SLI**: p95 request duration endpoint csoportonként.
- **SLO (kezdeti)**:
  - p95 < 500ms read endpointokra
  - p95 < 1000ms write endpointokra

## Hibák (errors)

- **SLI**: 5xx arány service-enként.
- **SLO (kezdeti)**: < 0.5% 5xx.

## Multi-tenancy helyesség

- **SLI**: Hiányzó/érvénytelen `X-Tenant-Id` miatt elutasított kérések (prod környezetben alacsony, teszt harness-ben magas érték várható).
- **SLO (kezdeti)**: 0 cross-tenant leakage incident.

## Telemetria követelmények

- A correlation és tenant tagek jelen vannak a span-eken.
- Trace-ek/metric-ek OTLP-n keresztül exportálódnak, ha konfigurálva van.
