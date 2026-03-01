# Mermaid diagrams

This folder contains Mermaid source files describing the target architecture and key flows.

Files:
- `01-system-context.mmd` - system context diagram
- `02-container-modules.mmd` - container/module view (monorepo)
- `03-request-dataflow.mmd` - request processing flow (headers, idempotency, traces)
- `04-event-outbox-flow.mmd` - outbox/event flow (MVP -> target evolution)
- `05-contract-governance-flow.mmd` - contracts + CI governance flow

---

## 01 – System context

Source: `01-system-context.mmd`

```mermaid
flowchart LR
  user["End User"]
  admin["Tenant Admin"]
  dev["Platform Developer"]

  ui["Low-Code UI (Generated Web App)"]
  gateway["API Gateway / Edge (future)"]

  engine["Platform Core Engine API\n(Identity, Tenants, Policy, Lowcode, Events)"]

  md["MasterData Domain API\n(Party CRUD + Domain Events)"]
  fin["Finance Domain API (future)"]
  wh["Warehouse Domain API (future)"]

  mesh["Event Mesh\n(Kafka / EventHubs / NATS) (future)"]

  idp["Identity Provider Mesh\n(Entra/Okta/Keycloak/...) (future)"]
  otel["Observability Stack\n(OTel Collector + Traces/Metrics/Logs)"]

  user --> ui
  admin --> ui

  dev --> engine
  dev --> md

  ui --> gateway --> engine
  ui --> gateway --> md

  engine <--> idp

  engine <--> mesh
  md <--> mesh
  fin <--> mesh
  wh <--> mesh

  engine --> otel
  md --> otel
  fin --> otel
  wh --> otel
```

---

## 02 – Container / modules

Source: `02-container-modules.mmd`

```mermaid
flowchart TB
  subgraph Repo["Monorepo"]
    subgraph Contracts["contracts/"]
      c_engine["engine/openapi.yaml"]
      c_md["domains/masterdata/openapi.yaml"]
    end

    subgraph Engine["src/engine/Engine.Api"]
      e_api["API Endpoints"]
      e_mid["Middleware\nX-Correlation-Id, X-Tenant-Id"]
      e_idem["Idempotency (in-memory)"]
      e_policy["Policy Decision\n(configurable deny-by-default)"]
      e_lowcode["Lowcode Schemas\n(base + tenant overrides)"]
      e_events["Event Schema Registry\n(loaded from contracts/domains/*)"]
      e_otel["OpenTelemetry\n(trace+metrics, OTLP)"]
    end

    subgraph MasterData["src/domains/masterdata/MasterData.Api"]
      md_api["API Endpoints\nParty CRUD"]
      md_mid["Middleware\nX-Correlation-Id, X-Tenant-Id"]
      md_idem["Idempotency (in-memory)"]
      md_outbox["Event Outbox (in-memory)"]
      md_worker["Outbox Publisher Worker\n(simulated publish)"]
      md_pub["Published Event Log (in-memory)"]
      md_otel["OpenTelemetry\n(trace+metrics, OTLP)"]
    end

    subgraph Docs["project-docs/"]
      truth["truth/*"]
      adr["docs/adr/*"]
      playbooks["playbooks/*"]
      diagrams["diagrams/mermaid/*"]
    end
  end

  c_md --> e_events
  truth --> Engine
  truth --> MasterData
  adr --> Engine
  adr --> MasterData

  e_mid --> e_api
  e_idem --> e_api
  e_policy --> e_api
  e_lowcode --> e_api
  e_events --> e_api
  e_otel --> e_api

  md_mid --> md_api
  md_idem --> md_api
  md_outbox --> md_worker --> md_pub
  md_otel --> md_api
```

---

## 03 – Request dataflow

Source: `03-request-dataflow.mmd`

```mermaid
sequenceDiagram
  autonumber
  participant Client as Client/UI
  participant API as Service API
  participant Corr as CorrelationIdMiddleware
  participant Tenant as TenantIdMiddleware
  participant OTel as OpenTelemetry (AspNetCore instr.)
  participant Idem as Idempotency Store (in-memory)
  participant Handler as Endpoint Handler

  Client->>API: HTTP Request
  activate API
  API->>OTel: Start server span
  API->>Corr: Invoke
  Corr->>Corr: Ensure X-Correlation-Id (generate if missing)
  Corr-->>Client: (later) Response header X-Correlation-Id

  Corr->>Tenant: Invoke
  Tenant->>Tenant: Validate X-Tenant-Id (except health/swagger)
  Tenant->>OTel: Tag Activity tenant_id

  Tenant->>Handler: Invoke

  alt Write endpoint (POST/PUT/PATCH)
    Handler->>Idem: Check Idempotency-Key + request hash
    alt Existing entry, same hash
      Idem-->>Handler: Stored response
      Handler-->>Client: Replay response (200/201)
    else Existing entry, different hash
      Handler-->>Client: 409 Conflict
    else New
      Handler->>Handler: Execute command
      Handler->>Idem: Store response (status/body/location)
      Handler-->>Client: Normal response
    end
  else Read endpoint (GET)
    Handler->>Handler: Execute query
    Handler-->>Client: 200 OK
  end

  API->>OTel: End server span
  deactivate API
```

---

## 04 – Event / outbox flow

Source: `04-event-outbox-flow.mmd`

```mermaid
flowchart LR
  subgraph MD["MasterData.Api"]
    cmd["Party write endpoint\n(Create/Update/Delete)"]
    outbox["Outbox (EventLog queue)\nMVP: in-memory"]
    worker["OutboxPublisherWorker\nMVP: background move+log"]
    published["PublishedEventLog\nMVP: in-memory"]

    cmd --> outbox --> worker --> published
  end

  subgraph Target["Target (enterprise)"]
    db[("Domain DB")]
    outboxTbl[("Outbox Table")]
    publisher["Outbox Publisher\n(retry, backoff)"]
    mesh["Event Mesh\n(Kafka/EventHubs/NATS)"]
    consumers["Consumers\n(Engine/Other Domains)"]
    inbox[("Inbox/Dedupe Store")]

    db --- outboxTbl
    publisher --> mesh --> consumers --> inbox
  end

  outbox -.evolves to.-> outboxTbl
  worker -.evolves to.-> publisher
  published -.observability/audit.-> mesh
```

---

## 05 – Contract governance flow

Source: `05-contract-governance-flow.mmd`

```mermaid
flowchart TB
  dev["Developer / Agent"] --> edit["Edit code + contracts/**/*.yaml"]
  edit --> pr["Pull Request"]

  pr --> ci["CI"]

  subgraph Checks["Checks"]
    build["dotnet build platform-core.sln"]
    lintAll["npm run lint:contracts\n(global ruleset, warnings)"]
    lintChangedStrict["npm run lint:contracts:changed:strict\n(strict ruleset on changed files)"]
  end

  ci --> build
  ci --> lintAll
  ci --> lintChangedStrict

  build --> gate{All required checks green?}
  lintAll --> gate
  lintChangedStrict --> gate

  gate -- Yes --> merge["Merge to main"]
  gate -- No --> fix["Fix & push updates"] --> ci

  merge --> deploy["(future) Build container + deploy preview/prod"]
```
