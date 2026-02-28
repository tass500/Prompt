# ADR‑0013 – Event Mesh & Outbox Pattern

## Context
A domének közti laza csatolás, skálázhatóság és audit igény megköveteli, hogy állapotváltozásokat aszinkron eseményként közöljünk. A double‑write és elveszett üzenetek elkerülésére tartós, tranzakcionális mintára van szükség.

## Decision
- **CloudEvents 1.0** – egységes eseményburkolat (type, source, id, time, data).
- **Event Mesh** – Kafka / Azure Event Hubs / NATS JetStream (környezetfüggően).
- **Transactional Outbox** – a domain DB‑ben outbox tábla; háttér publisher szállítja.
- **Idempotencia** – fogyasztói oldalon deduplikáció (inbox/kv store).
- **Replay védelem** – event ID és correlation‑id alapú védelem.
- **Event versioning** – kompatibilis evolúció (v1, v2…).

## Consequences
**Positive**
- Laza csatolás és horizontális skálázás.
- Elveszett események és double‑write kockázat csökken.
- Auditra és hibakeresésre jól használható (trace‑lánc).

**Negative**
- Több komponens (mesh, publisher, schema registry).
- Szemléletváltás: eventual consistency kezelése.

## Status
Accepted

## Related
ADR‑0022 (REST + Events), ADR‑0019 (Observability), ADR‑0018 (Master Data Governance)