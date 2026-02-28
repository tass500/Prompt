# ADR‑0021 – Idempotency Everywhere

## Context
Minden domain-szolgáltatás REST API hívásokat fogad, amelyek hálózati hiba,
kliens újraküldés, retry mechanizmus vagy időzítési probléma miatt többször is megérkezhetnek.
A duplikált műveletek súlyos adatkövetkezetlenséget okozhatnak:

- duplán létrehozott számlák,
- duplán végrehajtott készletmozgások,
- többször publikált események,
- hibás audit trail.

Egy modern SaaS/enterprise rendszerben az idempotencia **kötelező**.

## Decision
A platform minden írási jellegű API műveletet idempotenssé tesz.

### Kötelező szabályok:
- Minden **POST/PUT/PATCH** kérés kötelezően tartalmaz:
  - `Idempotency-Key` headert (GUID vagy ULID)
- A szerver oldalon **idempotency store** kerül bevezetésre:
  - TTL alapú (pl. 24–72 óra)
  - tárolja: key + request hash + response hash
- Ha ugyanaz a kérés érkezik:
  - és a key + hash páros egyezik → a korábbi válasz visszaadása 200/201‑tel  
  - ha nem egyezik → HTTP **409 Conflict**

### API válasz viselkedés:
- Duplikált kérés → **201 (Created)** vagy **200 (OK)** (a művelettől függően)
- Más tartalmú kérés ugyanazzal a kulccsal → **409 Conflict**

## Consequences
### Positive
- Megszűnnek a dupla tranzakciók
- A hálózati hibák és retry-k biztonságosak lesznek
- Domain szolgáltatások konzisztenciája javul
- CloudEvents duplikáció elkerülhető

### Negative
- Extra storage szükséges az idempotency store-hoz
- Minden write endpoint extra logikát igényel

## Status
Accepted

## Related
ADR‑0013 (Outbox), ADR‑0022 (REST + Events), ADR‑0005 (CI/CD)