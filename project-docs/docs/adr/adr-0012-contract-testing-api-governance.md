# ADR‑0012 – API Governance & Contract Testing

## Context
A domain-szolgáltatások és a motor kizárólag REST + Events alapon integrálódnak. A szerződés (contract) megsértése láncreakciós hibákat okozhat. A minőség biztosítására egységes ellenőrzőpontok kellenek.

## Decision
API minőségkapuk (CI) bevezetése:
- **OpenAPI lint** – Spectral szabályrendszer kötelező.
- **Consumer‑Driven Contract Testing** – Pact (consumer ↔ provider).
- **Schemathesis** – fuzz és property‑based vizsgálatok az OpenAPI alapján.
- **Semantic Versioning** – breaking change → új fő/minor verzió.
- **Automatikus changelog** – generálás release‑kor.

## Consequences
**Positive**
- Megelőzi a breaking integrációkat.
- Verifikálja a szerződés kompatibilitását még merge előtt.
- Automatikus minőségi jelzők (scorecardok).

**Negative**
- Hosszabb CI futás.
- Tanulási görbe a csapatoknál (Pact, Spectral, Schemathesis).

## Status
Accepted

## Related
ADR‑0004 (OpenAPI first), ADR‑0022 (REST + Events), ADR‑0016 (Developer Portal)