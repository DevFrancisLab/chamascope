# ChamaScope

A trust layer companion for the ChamaConnect platform. Surfaces silent API failures, reconciles dashboard totals, audits configuration, and reports on production hygiene.

[Proposal](./docs/proposal.pdf)

## Why

Built for the **ChamaConnect Virtual Hackathon** (April 2026). During testing on April 24 to 26 we documented 21 issues affecting reliability, security, and trust. ChamaScope is the diagnostic tool we wished MUIAA had during their release process.

## Features

* **Silent API Failure Monitor.** Pings chamaconnect.io endpoints and shows the 4xx and 5xx errors the platform's UI silently ignores.
* **Dashboard Reconciliation.** Worksheet that recomputes contribution totals and surfaces the gap between what the dashboard reports and what the transaction log shows.
* **Configuration Audit.** Production ready feature checklist (M-Pesa STK Push, bulk import, flexible meeting cadence, validation) with current status per item.
* **Production Hygiene Scanner.** Live audit against any chamaconnect.io URL: copyright year, HMR cookies, CSP header, HSTS, localhost references, payload size.

## Prerequisites

* Node.js 20 or newer
* npm 10 or newer

## Setup

```bash
git clone https://github.com/EndrexAkoto/chamascope.git
cd chamascope
npm install
npm run dev
```

Open <http://localhost:3000>.

## Verify the production build

```bash
npm run build
```

The build should complete with no errors and prerender the four content tabs.

## Usage

* **`/`** Overview. Severity counts and links to each audit pillar.
* **`/api-failures`** Live HTTP probe runner. Enter any chamaconnect.io URL and click Probe to see status, latency, and headers.
* **`/reconciliation`** Worksheet. Enter the dashboard reported total and the transactions you observed; the delta is computed live.
* **`/config-audit`** Production ready feature checklist with status per item.
* **`/hygiene`** Live hygiene scan. Enter a chamaconnect.io URL and click Run scan to see six checks against the response.

## Stack

* Next.js 16 (App Router), React 19, TypeScript
* Tailwind CSS v4

## Project structure

```
app/
├── _data/findings.ts          21 typed audit findings (single source of truth)
├── _components/               Shared UI: Nav, FindingCard, SeverityBadge
├── api/probe/route.ts         Server side HTTP probe used by the live audits
├── api-failures/              Silent API Failures tab
├── reconciliation/            Dashboard Reconciliation tab
├── config-audit/              Config Audit tab
├── hygiene/                   Production Hygiene tab
├── layout.tsx                 Sidebar + footer (year auto updates)
└── page.tsx                   Overview: severity counts + audit cards

docs/
└── proposal.pdf               Hackathon proposal (submitted PDF)
```

## Findings documented

See [docs/proposal.pdf](./docs/proposal.pdf) Appendix A for the full inventory of 21 issues identified during testing, categorized by severity (critical, high, medium, low, security) and pillar.

## Author

FRANCIS KIOKO MASILA

## License

MIT
