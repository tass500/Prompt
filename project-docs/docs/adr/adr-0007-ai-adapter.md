# ADR‑0007 – AI Adapter

## Context
A low‑code szerkesztés, képernyőgenerálás és workflow‑építés során rengeteg ismétlődő feladat merül fel.  
A modern enterprise rendszerekben AI-asszisztencia jelentősen növeli a fejlesztői és üzleti felhasználók produktivitását.

## Decision
Létrehozunk egy **AI provider‑agnosztikus adaptert**, amely:
- támogatja a főbb AI modelleket (Azure OpenAI, OpenAI, Anthropic, HF)
- képernyő-, workflow- és menüjavaslatokat generál
- JSON‑sémákat tud előállítani a low-code engine számára
- minden AI-hívást auditál (kérés + válasz)
- AI funkciók feature-flag mögött érhetők el

## Consequences
### Positive
- gyors űrlap/workflow generálás
- üzleti felhasználók is tudnak gyorsan szerkeszteni
- innováció és termelékenység növekedése

### Negative
- prompt injection elleni védelem szükséges
- PII‑maszkolás és biztonsági kontroll kötelező

## Status
Accepted

## Related
ADR‑0006, ADR‑0019