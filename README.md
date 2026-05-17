# Kalkulator Leasingu

Kalkulator Leasingu is a lead-generation web app for Polish companies that want a quick estimate of leasing costs before talking to a finance advisor. It combines a practical calculator, clear cost breakdowns, printable summaries, and a contact form that can forward leads to an external webhook.

Live demo: https://kalkulator-leasingu-1-desktop.vercel.app

## What It Does

- Calculates estimated leasing payments for cars, vans, trucks, machinery, and custom asset types.
- Supports net and gross values, VAT, down payment, lease period, buyout value, annual rate, and optional costs such as insurance, GAP, and service.
- Shows monthly net and gross rates, financed amount, total installments, buyout, and estimated financing cost.
- Includes ready-made scenario presets so users can compare common financing setups quickly.
- Lets users print or save a clean PDF-style calculation summary from the browser.
- Captures qualified leads through a validated contact form and a Vercel serverless endpoint.
- Works as a responsive landing page, with the calculator and lead form kept close together on desktop and mobile.

## Why This Project Matters

The goal was to build a small business tool that feels useful immediately, not just a marketing page. The calculator handles the core leasing variables, the result panel explains the numbers clearly, and the form turns a finished calculation into a sales conversation.

Recent work focused on deployment readiness: cleaner validation, a production lead endpoint, Vercel configuration, clearer result summaries, and copy that makes the product easier to understand for real users.

## Tech Stack

- React 19 and TypeScript
- Vite
- Bun workspaces and Turborepo
- Tailwind CSS
- Hono API structure inside the web package
- Vercel serverless function for lead capture
- lucide-react icons

## Repository Structure

```text
packages/web/       Main calculator web app and API code
packages/mobile/    Expo shell prepared for mobile expansion
packages/desktop/   Electron shell prepared for desktop packaging
api/leads.js        Vercel lead capture endpoint
design.md           Product and layout notes
```

## Running Locally

```bash
bun install
bun run dev
```

Build all workspace packages:

```bash
bun run build
```

Run type checks:

```bash
bun run typecheck
```

## Environment

Lead submissions can be forwarded to another system by setting:

```bash
LEADS_WEBHOOK_URL=https://example.com/your-webhook
```

Without this variable, the endpoint validates the lead and logs the payload, which keeps local development simple.

## Current Status

This is a functional portfolio version of a leasing calculator and lead capture flow. The next strongest improvements would be CRM integration, stored lead history, analytics on calculator usage, and more detailed leasing rules per asset category.
