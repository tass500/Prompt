# Biztonsági irányelv

## Támogatott verziók

Ez a repository jelenleg aktív fejlesztés alatt áll.

- Biztonsági javítások a `main` branchen kerülnek alkalmazásra.
- A taggelt release-ek (ha bevezetésre kerülnek) a támogatási időablakukat a `CHANGELOG.md` fájlban rögzítik.

## Sérülékenység bejelentése

Biztonsági szempontból érzékeny jelentéshez kérlek ne nyiss nyilvános issue-t.

- Preferált: vedd fel privátban a kapcsolatot a karbantartókkal (belső csatornán).
- Ha nincs belső csatornád, nyiss egy minimális issue-t **exploit részletek nélkül**, és kérj privát kapcsolati lehetőséget.

Kérlek, ezt tartalmazza:

- A hiba és a hatás egyértelmű leírása
- Érintett komponensek (Engine API, domain API-k, contractok, scriptek)
- Reprodukciós lépések (szükség esetén anonimizálva/kitakarva)
- Javasolt javítás/mitigáció (ha ismert)

## Dependency sérülékenységek kezelése

- High/Critical severity találatokat **stop-ship** kategóriának tekintünk, amikor a CI release gate-ek engedélyezve vannak.
- Amíg nincs formális gate, **célzott** kezelést alkalmazunk:
  - Update/patch közvetlen dependency verzióemeléssel, amikor lehetséges
  - Pin/override csak egyértelmű indoklással és későbbi eltávolítási follow-up feladattal

## Titkok (secrets)

- Soha ne commitolj titkokat (API key-eket, tokeneket, jelszavakat) a repository-ba.
- Lokális fejlesztéshez és CI-hez környezeti változókat / secret store-okat használj.

