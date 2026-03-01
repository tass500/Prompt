# Fenyegetési modell (MVP)

## Hatókör

- Platform Core Engine API (`src/engine/Engine.Api`)
- Domain API-k (kezdetben: `MasterData.Api`)
- API contractok (`contracts/**`)
- Cross-cutting headerek: `X-Correlation-Id`, `X-Tenant-Id`, `Idempotency-Key`
- Eventing (MVP outbox + published log; target: event mesh)

## Fő értékek (assetek)

- Tenant adatizoláció
- Identity/authorization döntések (policy decision endpoint)
- Idempotency store integritása
- Contract integritás (governed changes)
- Observability telemetria integritása (trace korreláció)

## Trust boundary-k

- Client/UI → API határ (publikus HTTP)
- Service-to-service határ (Engine <-> domainok)
- Storage határ (most in-memory; később DB/event mesh)

## Fő fenyegetések (magas szint)

- Tenant boundary megkerülése hiányzó/hamis `X-Tenant-Id` miatt
- Írások replay/duplikáció idempotency nélkül
- Jogosulatlan hozzáférés túl engedékeny default policy miatt
- Hibás/malformált payloadok injektálása API-kba/contractokba
- Event duplikáció és consumer oldali mellékhatások (nincs dedupe)
- Érzékeny adatok kiszivárgása logok/telemetria útján

## MVP mitigációk ebben a repo-ban

- Tenant header érvényesítés middleware-ben
- Correlation ID propagálás
- Idempotency key érvényesítés író endpointokon
- Deny-by-default policy decision (konfigurálható)
- Contract lint CI-ben (Spectral)
- OpenTelemetry konzisztens tagekkel (`correlation_id`, `tenant_id`)

## Nyitott tételek (MVP utáni lépések)

- In-memory store-ok lecserélése tartós perzisztenciára
- AuthN/AuthZ bevezetése (OIDC) és service-to-service identity
- Rate limiting / WAF / API gateway bevezetése
- Outbox perzisztencia + retry + DLQ stratégia
- Inbox/dedupe store az event consumer-ekhez
