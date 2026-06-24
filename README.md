# EA Intelligence Platform

An Enterprise Architecture Data Product dashboard built with TOGAF 10 and ArchiMate 3.2 — transforming EA from static documentation into a living, governed intelligence platform.

## Overview

This platform demonstrates how treating Enterprise Architecture as a Data Product can automate data collection, enforce governance SLAs, and deliver real-time insights across the enterprise.

**Key Results:**
- Application Coverage: 40% → 95%
- Data Freshness: 4–8 weeks → < 4 hours
- Error Rate: 18% → 2%
- EAIMM Score: 9/25 (Level 1) → 22/25 (Level 4)
- FTE Reduction: 60% ($360K annual savings)
- 186% three-year ROI

## Getting Started

```bash
npm install
npm run dev
```

**Live:** [https://initiate-ea-platform.vercel.app](https://initiate-ea-platform.vercel.app/)

## Tech Stack

- **Next.js 16** with TypeScript
- **Tailwind CSS 4** (dark theme)
- **ECharts** and **Recharts** for data visualization
- **Framer Motion** for animations
- **Lucide React** for icons

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with animated metrics |
| `/dashboard` | KPI overview with trend sparklines |
| `/dashboard/applications` | Searchable application portfolio (20+ apps) |
| `/dashboard/analytics` | EAIMM radar, steward SLA compliance |
| `/dashboard/architecture` | Interactive 5-layer architecture, As-Is vs To-Be, integration patterns |
| `/dashboard/maturity` | EAIMM maturity evolution stepper |
| `/dashboard/quality` | Anomaly detection, data validation, synthetic data explorer |
| `/dashboard/roi` | Investment breakdown and ROI analysis |

## Deployment

Deploy on [Vercel](https://vercel.com) — auto-detects Next.js with zero configuration.

```bash
npm run build
npm run start
```

## License

Built for the Accenture INITIATE 2026 EA Competition (The Open Group).
