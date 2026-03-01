# Dokumentáció karbantartás (docs drift)

## Cél

A dokumentáció legyen pontos és használható: mozogjon együtt a kóddal és a contractokkal.

## Alapértelmezett működés

- Ha egy változtatás és egy dokumentum kapcsolata **egyértelmű**, a dokumentumot ugyanabban a PR-ban frissítsd.
- Ha a kapcsolat **nem egyértelmű**, írj megjegyzést a PR-ba és adj opciókat; az owner/reviewer dönt.

Ügynök-asszisztált fejlesztésnél az alapértelmezett működés:

- Az ügynök figyelmeztet a várható dokumentáció drift-re, és
- az ügynök automatikusan frissíti a dokumentációt, amikor a kapcsolat egyértelmű.

## Ownership

- `SECURITY.md` és `project-docs/security/**`: platform security owner (vagy security champion)
- `CONTRIBUTING.md`, PR template: platform engineering enablement owner
- `CODEOWNERS`: tech lead / engineering manager
- `project-docs/ops/**`: service owner-ök (Engine / domainok)
- `project-docs/governance/**`: platform governance owner
- `project-docs/diagrams/**`: platform architecture owner

## Frissítési triggerek (gyakorlatban)

### Contracts

Ha a `contracts/**` változik:

- Frissítsd a `project-docs/governance/versioning.md` fájlt, ha breaking change történt vagy új kompatibilitási szabályt vezetsz be.
- A PR leírás tartalmazzon kompatibilitási / migrációs megjegyzéseket (PR template).

### Cross-cutting viselkedés

Ha a correlation/tenant/idempotency/observability viselkedés változik:

- Frissítsd a `project-docs/security/threat-model.md` fájlt (attack surface / mitigációk).
- Frissítsd a `project-docs/ops/incident-runbook.md` fájlt, ha új hibamód jelenik meg.

### CI policy-k / gate-ek

Ha a build/lint/audit viselkedés változik:

- Frissítsd a `CONTRIBUTING.md` fájlt (lokális ellenőrzések / elvárások).
- Frissítsd a `SECURITY.md` fájlt, ha az audit policy változik.

### Service topológia

Ha új domain/service/module kerül be:

- Frissítsd a `CODEOWNERS` fájlt.
- Frissítsd a `project-docs/ops/slo-sli.md` fájlt, hogy tartalmazza az új service-t.
- Frissítsd a `project-docs/diagrams/mermaid/*` diagramokat, ha az architektúra/folyamatok változnak.

## Javasolt PR checklist elemek

- Dokumentáció frissítve (egyértelmű kapcsolat)
- Docs drift megjegyzés hozzáadva (nem egyértelmű kapcsolat)
- Ownerök review-zták, amikor releváns
