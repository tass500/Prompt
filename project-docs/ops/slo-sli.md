# SLO/SLI baseline

## Services

- Engine API
- MasterData API

## Availability

- **SLI**: Successful request ratio (2xx/3xx) over total requests.
- **SLO (initial)**: 99.5% monthly per service.

## Latency

- **SLI**: p95 request duration per endpoint group.
- **SLO (initial)**:
  - p95 < 500ms for read endpoints
  - p95 < 1000ms for write endpoints

## Errors

- **SLI**: 5xx rate per service.
- **SLO (initial)**: < 0.5% 5xx.

## Multi-tenancy correctness

- **SLI**: Requests rejected due to missing/invalid `X-Tenant-Id` (should be low in prod, high in test harness).
- **SLO (initial)**: 0 cross-tenant leakage incidents.

## Telemetry requirements

- Correlation and tenant tags are present on spans.
- Traces/metrics exported via OTLP when configured.
