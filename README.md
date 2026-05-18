# Kalkulator Leasingu

Kalkulator Leasingu is a business calculator demo for Polish companies that need an indicative leasing cost estimate before moving into a finance offer conversation.

PL: Kalkulator ma charakter informacyjny. Nie jest ofertą finansową, a wyniki mogą różnić się od rzeczywistych propozycji leasingowych.

## Live demo

https://kalkulator-leasingu-1-desktop.vercel.app

## Screenshots

Screenshots should be added to `docs/screenshots/`. Placeholder links are not included.

## Features

- Leasing calculation for cars, vans, trucks, machinery and custom asset types.
- Net/gross value handling and VAT conversion.
- Down payment, leasing period, buyout and annual rate inputs.
- Optional simplified insurance, GAP and service cost estimates.
- Monthly net/gross rate, financed amount, total installments and financing cost summary.
- Scenario presets for quick comparison.
- Print/save-friendly result summary.
- Lead capture form and Vercel serverless endpoint.

## Calculation logic

Core logic lives in `packages/web/src/web/lib/calculations.ts`.

- Gross values are converted to net when `isGross` is enabled.
- Down payment and buyout are calculated as percentages of net value.
- Financed amount is `net value - down payment - buyout`.
- Monthly payment uses a simplified annuity formula: `PMT = PV * r * (1+r)^n / ((1+r)^n - 1)`.
- Optional monthly costs are simplified annual percentages split into monthly values.

These formulas are intentionally simplified and should not be treated as financial advice.

## Tech stack

- React
- TypeScript
- Vite
- Bun workspaces
- Turborepo
- Hono
- Drizzle
- Tailwind CSS
- Vercel
- Vitest

## Project structure

- `packages/web/` — main calculator web app and API code.
- `packages/web/src/web/lib/calculations.ts` — calculation logic.
- `packages/web/src/web/components/` — calculator, result summary and form UI.
- `packages/mobile/` — Expo shell prepared for future mobile work.
- `packages/desktop/` — Electron shell prepared for future desktop packaging.
- `api/leads.js` — Vercel lead endpoint.
- `docs/` — roadmap, changelog, issue backlog and screenshots folder.

## Getting started

```bash
git clone https://github.com/ft4k696bk6-prog/kalkulator.leasingu-1.git
cd kalkulator.leasingu-1
bun install
bun run dev
```

Quality checks:

```bash
bun run lint
bun run typecheck
bun run test
bun run build
```

## Environment variables

Create `.env` from `.env.example`.

```bash
LEADS_WEBHOOK_URL=
DATABASE_URL=
DATABASE_AUTH_TOKEN=
```

`LEADS_WEBHOOK_URL` is optional. Without it, lead payloads are validated and logged by the endpoint.

## What I learned

- Separating calculation logic from UI.
- Designing a result summary for business users.
- Handling indicative financial copy responsibly.
- Building a lead-generation flow around a useful calculator.
- Working with a monorepo-style Vite/Bun project.

## Roadmap

- Add more calculation scenarios and edge-case tests.
- Improve lead persistence instead of webhook-only forwarding.
- Add analytics for calculator usage.
- Improve accessibility of form controls.
- Add screenshots and browser smoke checks.

## Status

Production-like business tool demo.

## License

MIT.
