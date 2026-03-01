# Incidens runbook (baseline)

## Triage ellenőrzőlista

- Erősítsd meg a scope-ot: Engine API, MasterData API, vagy mindkettő.
- Azonosítsd az érintett tenantokat (logok/telemetria `X-Tenant-Id` alapján).
- Gyűjts correlation ID-kat néhány hibás mintakéréshez.

## Gyakori scenariók

### Emelkedett 5xx

- Ellenőrizd a legutóbbi deploy/merge eseményeket.
- Trace-ek segítségével azonosítsd a hibázó endpointot és exception-t.
- Ha van rollback, részesítsd előnyben a rollback-et a hotfix-szel szemben.

### Idempotency konfliktusok (409 spike)

- Ellenőrizd a kliens viselkedést: ugyanaz az `Idempotency-Key` különböző payload-dal lett újrahasználva.
- Erősítsd meg a hash-elés működését és a store retention policy-t (MVP: in-memory).

### Outbox backlog / publisher nem halad

- Ellenőrizd, hogy a background worker fut-e.
- Nézd meg az outbox queue méretét (MVP: in-memory).
- Ha beragadt, indítsd újra a service-t (MVP) és mentsd el a logokat.

### Tenant header hibák

- Ellenőrizd, hogy a gateway/kliens küldi-e az `X-Tenant-Id` header-t.
- Erősítsd meg, hogy a kizárt útvonalak (health/swagger) a vártnak megfelelően működnek.

## Kommunikáció

- Küldj egy első státusz update-et az alábbiakkal:
  - észlelés ideje
  - érintett service-ek
  - érintett tenantok (ha ismert)
  - következő update várható ideje (ETA)

## Incidens utáni teendők

- Készíts rövid postmortem bejegyzést:
  - trigger
  - root cause
  - mitigation
  - follow-up feladatok (tesztek, monitorok, doksi)
