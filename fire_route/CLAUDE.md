# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single-property vacation rental marketing site (72 Fire Rte 98, Trent Lakes, ON) built as a static React SPA. No backend — content is either hardcoded in JSX or fetched at runtime from static JSON manifests + a CDN.

## Commands

Run from the `fire_route/` subdirectory (this is the actual project root; there's a wrapping `fire_route/fire_route/` directory structure from how the repo was cloned).

- `npm run dev` — start Vite dev server
- `npm run build` — production build to `/dist`
- `npm run deploy` — build and publish `/dist` to the `gh-pages` branch (publishes live)
- `npm run lint` — run oxlint
- `npm run preview` — preview the production build locally

There is no test suite configured in this project.

## Architecture

**Routing**: `HashRouter` (main.jsx) wraps `App.jsx`, which defines three routes — `/` (Home), `/gallery` (Gallery), `/iguide` (IGuide) — plus a persistent `Navbar`. Hash routing is used because the site is deployed to GitHub Pages.

**Image/video hosting (CDN, not bundled)**: All property photos and the background hero video live in an S3 bucket served through CloudFront, not in the repo. Two things drive what gets fetched at runtime:
1. A local JSON manifest in `public/images/*.json` (e.g. `72-Fire-Rte-98-1.json`) listing `{ filename, tag }` entries.
2. `VITE_CDN_BASE` / `VITE_CDN_BASE_BACKGROUND_VIDEO` env vars (`.env`) that get prepended to each `filename` to build the full CDN URL.

Both `Carousel.jsx` (home page) and `Gallery.jsx` fetch the *same* image manifest independently and build their own CDN URLs — there's no shared data-fetching hook. `tag` in the manifest can be a string or array of strings; consumers normalize it with `[item.tag].flat().filter(Boolean)`. Gallery uses tags to drive its filter buttons; Carousel ignores them entirely.

To point at a different CDN/property, edit `.env` (keep the trailing slash) and rebuild — there's no runtime config.

**Component/page split**:
- `src/components/` — reusable pieces used across pages: `Navbar` (top nav + slide-in hamburger sidebar + scroll-triggered visibility), `Carousel` (auto-advancing coverflow slider with manual image preloading via a hidden `<img>`), `BookingModal` (links out to Airbnb/VRBO/Booking.com/Direct — hrefs are currently placeholders `#`).
- `src/pages/` — route-level views: `Home`, `Gallery` (tag-filterable grid + keyboard-navigable lightbox), `IGuide` (embeds an external 3D tour iframe, no local logic).

`BookingModal` is rendered independently from both `Navbar` and `Home` (each owns its own `bookingOpen` state) — when changing its props/behavior, update both call sites.

**Styling**: Plain CSS per component/page (`X.css` next to `X.jsx`), no CSS-in-JS or Tailwind. `index.css` holds resets/variables/base typography; `App.css` holds shared/global layout (modals, etc.).

**Deployment**: GitHub Pages via `gh-pages` package, custom domain configured through `public/CNAME`. `vite.config.js` sets `base: '/'`.
