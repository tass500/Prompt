# 00 – Vision

## A projekt víziója

A rendszer célja, hogy létrehozzon egy **jövőálló, domain‑független, moduláris, enterprise szintű “platform-core-engine” low‑code motort**, amelyre bármilyen üzleti domain (Finance, Warehouse, CRM, HR, SCM stb.) ráépíthető **különálló projektek formájában**, kizárólag **API-n keresztül kommunikálva**.

A platform nem csak egy keretrendszer, hanem egy **dobozos vállalati motor**, amely támogatja:

- a modern 2026-os enterprise architektúrát,
- a teljesen leválasztott domain-szolgáltatásokat,
- a Zero‑Trust + PBAC/ABAC/RBAC biztonsági modellt,
- a multi‑tenant működést (`Tenant-per-Schema` alapértelmezéssel),
- a low‑code UI + workflow generálást,
- a Base → Tenant → Effective öröklési modellt,
- az auditálhatóságot, megfigyelhetőséget, compliance-t,
- a több IdP‑t támogató identitás-mesh modellt (OIDC/SAML/WebAuthn/mTLS),
- az eseményvezérelt kommunikációt (CloudEvents + Outbox),
- a gyors fejlesztést és testreszabást bármely üzleti igényre.

A platform úgy működik, mint a modern low‑code rendszerek (ServiceNow, Outsystems, Mendix, SAP BTP), de **nyíltabb, modulárisabb és jobban szabályozható**.

---

## Mit építünk pontosan?

Egy olyan **low‑code enterprise motort**, amely:

### ✔ JSON‑ból generálja a képernyőket  
A UI komponensek, űrlapok, listák és menük mind JSON-ból generálódnak:

- Form schema
- Grid schema
- Layout schema
- Menu schema
- Validation schema
- Action schema

A frontend pedig egy dinamikus Angular rendererből áll.

### ✔ JSON‑ból generálja a workflow-kat  
- State machine
- Transition rules
- PBAC decision point-ek
- Event trigger-ek (CloudEvents)

### ✔ Domain szolgáltatások nincsenek beintegrálva  
Ehelyett:

- külön projektben futnak,
- saját adatbázissal,
- saját eseményekkel,
- saját OpenAPI-val,
- és a platform-core-engine csak API-kat hív és fogad.

### ✔ Multi‑IdP támogatás (runtime-switchable)  
Egyszerre támogatja:

- Microsoft Entra ID
- Okta / Auth0
- Keycloak
- Custom OIDC
- SAML2 bridge
- mTLS / API key
- WebAuthn / FIDO2

Központi Identity Provider Mesh réteggel.

### ✔ Multi‑tenant működés  
- Alapértelmezés: **Tenant-per-Schema**
- Támogatott: DB-per-Tenant, RLS (nem default)
- Tenant Resolver + Schema Router

### ✔ Extensibility Model (öröklődés)  
A platform támogatja:

1. **Domain BASE réteg** (gyári konfiguráció)
2. **Tenant override réteg** (testreszabás)
3. **Effective merged configuration** (runtime merge)

Ez biztosítja, hogy:

- minden tenant egyedi képernyőt/workflow-t kaphat,
- de nem sérül a domain és compliance alaplogika.

---

## A platform hosszú távú céljai

### 🎯 1. Egy központi, újrafelhasználható, low‑code engine  
Olyan motor, amely minimális fejlesztéssel képes:

- új modulokat megjeleníteni,
- új workflow-kat kezelni,
- új űrlapokat készíteni,
- új menüket renderelni,
- nyelvi kulcsokat kezelni.

### 🎯 2. Bármilyen domain gyors kiépítése  
A platformra bármi ráépíthető önálló domain-szolgáltatásként:

- Finance (Ledger, Invoice, Payment)
- Warehouse (Items, Stock Movements)
- Master Data (Party, Item, Location)
- HR (Employee, Payroll)
- CRM (Contacts, Opportunities)
- SCM (Shipping, Procurement)

### 🎯 3. Zero‑Trust és teljes auditálhatóság  
A platform minden döntést auditál:

- ki, mikor, milyen workflow transziót indított,
- milyen JSON sémát töltött be vagy módosított,
- milyen policy döntés született,
- mikor milyen domain szolgáltatást hívott.

### 🎯 4. Eszköz a vállalati digitalizációhoz  
A motor képes:

- vállalati belső alkalmazások gyors összerakására,
- B2B SaaS termék alapjaként működni,
- országonkénti vagy tenantonkénti szabályozások kezelésére,
- AI-alapú képernyőjavaslatokra (low‑code AI).

---

## Rövid összefoglaló

**A platform-core-engine egy olyan, vállalati low‑code motor**, amely:

- domainfüggetlen,
- multi-tenant,
- Zero‑Trust alapú,
- PBAC/ABAC/RBAC vezérelt,
- runtime IdP‑váltást támogató,
- JSON-vezérelt UI/Workflow rendszert működtet,
- domain-szolgáltatásokkal REST+Event alapú integrációban működik,
- szabványosított OpenAPI/AsyncAPI szerződés szerint kommunikál,
- auditált és compliance-ready.

A projektünk célja:

> **Egy olyan új generációs enterprise low‑code platform létrehozása, amely minden jövőbeli üzleti megoldás vállalati alapját adja.**