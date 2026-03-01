# Decision Trigger Playbook (3–5 fős csapatra)

A cél, hogy a platform/core fejlesztés során mindig **a legjobb időpillanatban** hozzatok meg bizonyos döntéseket.
A lista úgy van sorrendbe rakva, hogy **a legnagyobb későbbi fájdalmat** (refaktor, káosz, integrációs törések) **a leghamarabb** csökkentse, miközben a döntések **minél kevésbé kötik meg a kezeteket**.

Minden pontban:

- Trigger: mikor aktuális
- Default döntés: javasolt alapértelmezett válasz 3–5 fős csapatra
- Miért ez az előnyös: rövid indok

---

## 1) CI gate minimum + Branch-per-PR (repo higiénia)

- Trigger
  - Amint 2 ember/ügynök párhuzamosan commitol a repo-ba, vagy
  - Amint a main (vagy a build) akár egyszer is törik.
- Default döntés
  - Branch-per-PR kötelező.
  - Merge csak zöld CI után:
    - `dotnet build platform-core.sln`
    - `npm run lint:contracts`
    - `npm run lint:contracts:changed:strict`
- Miért ez az előnyös
  - Minimális process mellett stabil main és kiszámítható integráció.

---

## 2) Contract governance (minőségkapu fokozatosan)

- Trigger
  - `contracts/**` módosul 3+ alkalommal 1 héten belül, vagy
  - UI/partner fogyasztó megjelenik.
- Default döntés
  - Soft gate:
    - globál lint warningokkal
    - strict csak a változott contractokra (`operationId` + `info.contact`).
  - Breaking change esetén kötelező migration notes a PR-ben.
- Miért ez az előnyös
  - Minőséget épít, de nem kényszerít azonnali nagy átírásra.

---

## 3) Observability standard (OpenTelemetry baseline + tag-ek)

- Trigger
  - Első komolyabb integrációs hiba / performance kérdés, vagy
  - konténer/CI környezet felé lépés.
- Default döntés
  - OpenTelemetry kötelező minden service-ben (tracing + metrics).
  - Kötelező tagek:
    - `correlation_id`
    - `tenant_id`
  - OTLP exporter default; dev-ben opcionális console exporter.
- Miért ez az előnyös
  - Nincs vak hibakeresés; később sokszorosan megtérül.

---

## 4) API hibakezelés standardizálás (ProblemDetails)

- Trigger
  - 2+ service-t ugyanaz a kliens fogyaszt (UI/aggregator), vagy
  - API-kat más csapat kezdi integrálni.
- Default döntés
  - RFC7807 ProblemDetails egységesítés.
  - Egységes error kódok + `X-Correlation-Id` visszaadása minden hibánál.
- Miért ez az előnyös
  - A kliensek nem fognak service-specifikus if-else erdőt építeni.

---

## 5) AuthN/AuthZ baseline (amint külső a kliens)

- Trigger
  - Amint nem csak local dev használja, vagy
  - a tenant header/identity külső forrásból érkezik (nem trusted).
- Default döntés
  - JWT validation (OIDC) bevezetése.
  - Tenant mapping claim-ből (nem pusztán headerből bizalom alapján).
  - Policy decision integráció később, de authn baseline legyen meg.
- Miért ez az előnyös
  - A security debt exponenciálisan drágul, ha későn kezditek.

---

## 6) Multi-tenancy enforcement mélysége

- Trigger
  - Tenantonként külön adatszeparáció igény (nem csak header), vagy
  - compliance/ügyfél kérdez rá tenant isolation-re.
- Default döntés
  - Tenant enforcement nem csak middleware:
    - domain/repository rétegben is kötelező tenant scope.
  - Minden entity tenant-aware (legalább `TenantId` kulccsal).
- Miért ez az előnyös
  - Tenant leakage kockázatot a lehető legkorábban csökkenti.

---

## 7) Idempotency + Outbox productionizálás (in-memory → DB)

- Trigger
  - 2 instance/pod futtatás, vagy
  - restart után sem veszíthet eseményt igény.
- Default döntés
  - EF Core + Outbox tábla + background publisher.
  - Idempotency store DB-ben (kulcs: tenant + route + idempotency-key).
- Miért ez az előnyös
  - Skálázás és megbízhatóság csak így lesz enterprise szintű.

---

## 8) Docker hello world + compose smoke (CI/CD alap)

- Trigger
  - első pipeline / preview env igény, vagy
  - integráció más csapattal.
- Default döntés
  - Dockerfile mindkét API-hoz.
  - `docker-compose.yml`:
    - engine + masterdata
    - healthcheck alapú smoke.
- Miért ez az előnyös
  - Reprodukálható futás fejlesztői gép és CI között.

---

## 9) Dependency / supply-chain hygiene (npm audit, dotnet vuln)

- Trigger
  - bármilyen high severity audit jelzés, vagy
  - release/CI bevezetése.
- Default döntés
  - Audit policy:
    - később: "no high severity" gate
    - addig: célzott fix/pin/override kontrolláltan.
- Miért ez az előnyös
  - Enterprise környezetben ez gyorsan stop-ship tényező.

---

## 10) Code ownership (CODEOWNERS) + review policy (csapat skálázás)

- Trigger
  - 2+ aktív fejlesztő/ügynök tartósan, vagy
  - heti 2+ merge konfliktus, vagy
  - contract change viták.
- Default döntés
  - CODEOWNERS útvonal szerint:
    - `src/engine/**` → engine owner
    - `src/domains/masterdata/**` → masterdata owner
    - `contracts/**` → platform/contracts owner
  - 1 kötelező reviewer ownership alapján.
- Miért ez az előnyös
  - Megakadályozza, hogy "senki földje" legyen a platform.

---

## 11) Dokumentáció karbantartás (docs drift) – figyelmeztetés + automatikus frissítés

- Trigger
  - Bármely alábbi terület érdemben változik:
    - `contracts/**`
    - cross-cutting standardok (tenant, correlation, idempotency, observability)
    - CI policy / gate (lint, audit, build)
    - új service/domain/folder ownership
- Default döntés
  - A fejlesztést végző fél a PR-ban:
    - jelzi, hogy mely doksik érintettek, és
    - frissíti is őket ugyanabban a PR-ban, ha egyértelmű a kapcsolat.
  - Ügynökös fejlesztésnél az alapértelmezés:
    - ügynök figyelmeztet a szükséges frissítésekre, és
    - automatikusan módosítja a kapcsolódó doksikat, amikor egyértelmű a kapcsolat.
  - Ha nem egyértelmű:
    - csak figyelmeztetés + 1–2 opció/javaslat,
    - és a döntést a reviewer/owner hozza meg.
- Miért ez az előnyös
  - Megelőzi a "docs drift" jelenséget úgy, hogy a dokumentáció auditálhatóan együtt mozog a kóddal.
