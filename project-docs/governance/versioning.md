# Verziózási irányelv

## Hatókör

- API contractok a `contracts/**` alatt
- Események (ha formalizálásra kerülnek)

## Alapelvek

- Részesítsd előnyben az additív változtatásokat.
- A breaking change-ek explicit verziózást igényelnek.
- A contractok review-zva és lintelve vannak CI-ben.

## API verziózás (kezdeti)

- A jelenlegi MVP útvonal szinten verziótlan.
- Külső fogyasztók által használt endpointok breaking change-e esetén az alábbiak egyike kötelező:
  - új endpoint/path, vagy
  - explicit verzió szegmens bevezetése az érintett részre.

## Contract változtatási kategóriák

- **Patch**: elírás/doksi javítás, séma pontosítás, viselkedés nem változik.
- **Minor**: additív mezők/endpointok, visszafelé kompatibilis.
- **Major**: eltávolítás, viselkedés változás, olyan validáció-szigorítás, ami kliens oldalon törést okoz.

## Deprecation

- Jelöld a deprecálást a contractokban, és dokumentáld az eltávolítás ütemezését.
- Adj migrációs megjegyzéseket a PR leírásban.
