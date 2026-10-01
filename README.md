# Landrup Dans

En mobil-først webapplikation for en danseskole. Brugere kan finde hold, se holdoplysninger og administrere deres tilmeldinger. Instruktører kan se deres egne hold og deltagerlister.

Dette er mit afsluttende eksamensprojekt fra webudvikleruddannelsen hos Roskilde Tekniske Skole. Det er udviklet som et selvstændigt portfolio-projekt af [Christian Reed](https://github.com/ReedorReed).

![Forside for Landrup Dans](./app-billeder/hero.png)

## Funktioner

- Søgning og filtrering af aktiviteter efter navn eller ugedag
- Dynamiske detaljesider for hvert hold
- Login med rollebaseret adgang for medlemmer og instruktører
- Tilmelding og afmelding med validering af alder, kapacitet, dubletter og hold på samme ugedag
- Profilside med tilmeldte hold eller instruktørens deltagerlister
- Kontaktformular og tilmelding til nyhedsbrev med klientvalidering og tydelig feedback

## Teknologier

- Next.js 16 og React 19
- TypeScript
- Tailwind CSS 4
- Zod til formularvalidering
- Server Actions og httpOnly-cookie-baseret session
- REST API-integration

## Hvad projektet demonstrerer

Landrup Dans er bygget med Next.js App Router og skelner bevidst mellem server- og klientansvar. Data hentes asynkront fra API'et, og tilmeldingsregler håndhæves i Server Actions, før der kaldes til API'et. Sessionen læses fra en httpOnly-cookie, så profiler og instruktørvisninger kan beskyttes på serversiden.

## Udvalgte skærmbilleder

| Aktiviteter | Profil |
| --- | --- |
| ![Aktivitetsoversigt](./app-billeder/aktiviteter.png) | ![Profilside](./app-billeder/profil.png) |

## Lokal opsætning

Projektet bruger Bun som package manager og kræver adgang til det tilhørende API.

```bash
git clone https://github.com/ReedorReed/landrup-dans-web-app.git
cd landrup-dans-web-app
bun install
cp .env.example .env.local
bun dev
```

Åbn derefter [http://localhost:3000](http://localhost:3000).

### Miljøvariabler

Sæt begge værdier i `.env.local` til API'ets base-URL. `API_URL` bruges på serveren, mens `NEXT_PUBLIC_API_URL` bruges af kontakt- og nyhedsbrevsformularerne i browseren.

```env
API_URL=http://localhost:4000
NEXT_PUBLIC_API_URL=http://localhost:4000
```

## Kvalitet og videreudvikling

Projektet bruger TypeScript i strict mode og ESLint. Næste forbedringer er automatiske tests af forretningsreglerne for tilmelding, bedre håndtering af API-fejl og en production-deployment med en offentlig demo.

## Kommandoer

```bash
bun dev       # Start udviklingsserver
bun run lint  # Kør linting
bun run build # Opret production-build
```

## Licens

Dette repository er vist som portfolio. Kontakt ejeren, hvis du vil genbruge indholdet.
