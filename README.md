# PERSIB Bandung Website (Concept)

Unofficial, frontend-only concept website for PERSIB Bandung, built as a portfolio project.
Not affiliated with or endorsed by PERSIB Bandung or PT Persib Bandung Bermartabat.

## Features

- Home: live score card, match timeline, membership offer, featured news, app download, partners
- Team: shield-card carousel with animated player detail (shared layout transitions, count-up stats, progress rings, sparklines)
- News: category filters, pagination, article pages with related news and share buttons
- Fixtures: next match countdown, results, and Super League standings
- Membership: plans, benefit comparison, and FAQs
- About, Contact, and Terms

## Tech Stack

Next.js (App Router), TypeScript (strict), Tailwind CSS, Framer Motion, next/font, lucide-react

## Getting Started

    npm install
    npm run dev

The dev server runs on http://localhost:3002.

## Notes

All data lives in `data/` as typed static files. There is no backend or database.
Club names, logos, photos, and news summaries belong to their respective owners and are used for demonstration only.
Fixtures, standings, and some form data are sample or approximate and may be out of date.
