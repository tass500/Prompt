# ADR‑0002 – Architecture Style (DDD + Clean Architecture)

## Context
A rendszer domain-szolgáltatásokra épül, melyeknek egymástól való erős elkülönítése létfontosságú.  
A low-code engine és a platform-core-engine csak alapfunkciókat tartalmazhat, domain logikát nem.

## Decision
- Elköteleződés a **Domain-Driven Design (DDD)** mellett  
- **Clean Architecture** rétegzés:
  - Domain
  - Application
  - Infrastructure
  - Presentation (API)
- A domain réteg *tiszta* (nincs függés más réteg irányába)
- A platform-core-engine NEM tartalmaz domain logikát

## Consequences
### Positive
- szerkezeti stabilitás
- jól karbantartható és bővíthető architektúra
- világos felelősségi körök

### Negative
- magasabb kezdeti komplexitás
- több boilerplate

## Status
Accepted