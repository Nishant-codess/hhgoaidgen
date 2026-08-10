# HH Goa 2026 — Verified Asset & Info Sources

This document details the exact provenance of all event information, branding assets, and partner lists used in the Builder Pass Generator.

---

## 1. Official Event Information

- **Event Name:** Hacker House Goa 2026
- **Dates:** 28–31 October 2026
- **Location:** Goa, India
- **Hashtag:** `#FrameInGoa`
- **Primary Source:** [hhgoa.com](https://hhgoa.com/)
- **Secondary Source:** [Hacker House Goa 2026 Devfolio](https://hacker-house-goa-2026.devfolio.co/)
- **Organizer:** 2:47PM Studio (APAC & MENA Web3 Growth Studio)
- **Scale:** 247 selected builders, $50,000+ in bounties

---

## 2. Confirmed Sponsors & Local Vector Assets

All sponsor logos are stored locally as clean vector SVG assets in `public/assets/sponsors/`:

| Sponsor | Tier | Local SVG Asset Path | Verified |
|---|---|---|---|
| **Diamante Blockchain** | Title Sponsor | `public/assets/sponsors/diamante.svg` | YES |
| **Nillion** | Title Sponsor | `public/assets/sponsors/nillion.svg` | YES |
| **CoinEx** | Diamond Sponsor | `public/assets/sponsors/coinex.svg` | YES |
| **Aptos** | Gold Sponsor | `public/assets/sponsors/aptos.svg` | YES |
| **The Graph** | Gold Sponsor | `public/assets/sponsors/thegraph.svg` | YES |
| **Core DAO** | Gold Sponsor | `public/assets/sponsors/coredao.svg` | YES |
| **Polygon** | Silver Sponsor | `public/assets/sponsors/polygon.svg` | YES |
| **Devfolio** | Silver Sponsor | `public/assets/sponsors/devfolio.svg` | YES |
| **ETHIndia** | Silver Sponsor | `public/assets/sponsors/ethindia.svg` | YES |

---

## 3. Brand & Design Assets

- **Fonts:**
  - `Fraunces` (Google Fonts) - Warm display serif for name & title
  - `Space Mono` (Google Fonts) - Monospace technical metadata & barcode values
  - `Outfit` (Google Fonts) - Clean UI sans-serif
- **Illustrations:** Custom flat vector SVGs (`Palm`, `Wave`, `Sun`, `Cocktail`, `SunsetBeachIllustration`, `PassportStamp`, `Surfboard`, `DevanagariLogo`) — 100% deterministic rendering.
- **Barcodes:** CODE128 standard dynamically generated via `bwip-js`.
- **QR Codes:** Standard SVG/Canvas rendering generated via `qrcode`.
