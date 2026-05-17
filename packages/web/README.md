# Kalkulator Leasingu Web App

This package contains the production-facing web experience for Kalkulator Leasingu: the calculator interface, result summary, lead form, and API structure used by the monorepo.

## Main Pieces

- `src/web/pages/index.tsx` wires the calculator, result summary, lead magnet, benefits, FAQ, and contact form into one flow.
- `src/web/lib/calculations.ts` contains the leasing estimate model used by the UI.
- `src/web/components/LeasingCalculator.tsx` manages user inputs for asset value, VAT, down payment, lease period, buyout, rate, and add-ons.
- `src/web/components/ResultSummary.tsx` presents the monthly payment, total cost, breakdown, and printable summary.
- `src/web/components/ContactForm.tsx` validates lead details and posts them to `/api/leads`.

## Run

```bash
bun run dev
```

## Build

```bash
bun run build
```

## Typecheck

```bash
bun run typecheck
```
