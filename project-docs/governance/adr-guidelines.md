# ADR irányelvek

## Mikor írjunk ADR-t?

Készíts ADR-t, ha az alábbiak közül bármit bevezetsz vagy érdemben módosítasz:

- Cross-cutting témák (authentikáció, multi-tenancy, idempotencia, megfigyelhetőség)
- Eventing stratégia (outbox, séma, mesh)
- Szerződési irányítási szabályok és CI kapuk
- Tárolási döntések (in-memory -> adatbázis)
- Telepítési modell (konténerek, átjáró, szolgáltatási mesh)

## Minimális tartalom

- Kontextus
- Döntés
- Állapot
- Következmények
- Megfontolt alternatívák (röviden)

## Ownership

- A javaslatot az implementáló hozza.
- Review: érintett ownerök (Engine/Domain/Contracts).
