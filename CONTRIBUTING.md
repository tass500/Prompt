# Közreműködés

## Munkamódszer

- A változtatások Pull Requesteken keresztül mennek.
- Részesítsd előnyben a kicsi, könnyen review-zható PR-eket.
- A contractok (`contracts/**`) első osztályú artefaktok.

## Branching

- Alapértelmezett branch: `main`
- Feature brancheket a `main`-ből hozz létre.

## Lokális ellenőrzések (ajánlott)

### Build

- `dotnet build platform-core.sln`

### Contract lint

- `npm run lint:contracts`
- Szigorú lint csak a változott fájlokra: `npm run lint:contracts:changed:strict`

### Dokumentáció drift emlékeztető

- `npm run docs:drift:reminder`

## Pull Request elvárások

- Frissítsd a contractokat, ha a külsőleg látható API viselkedés változik.
- Tartsd meg az idempotens írási működést ott, ahol kötelező.
- Biztosítsd, hogy a correlation és tenant headerek megmaradjanak.
- Adj rövid validációs leírást (hogyan tesztelted).

## Commit üzenetek

Használj rövid, felszólító módú üzeneteket.

- Jó: "Add idempotency conflict handling"
- Kerüld: "wip" / "fix" kontextus nélkül
