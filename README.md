> **🇧🇷 Leia em Português** — [README.pt-BR.md](./README.pt-BR.md)

# Café Aube — Landing Page

A fictional coffee shop landing page based in Montréal, built with **Nuxt 4** and **Nuxt UI** as a portfolio project.

[Demo](https://aube-coffee.vercel.app/)

> **🔄 v2 — Rewrite** — This is a rewrite of a project I originally built in 2021 with Vue 2 + Vuetify. Same concept, new stack: Nuxt 4, TypeScript, Nuxt UI, and a fully tested codebase. See [the old version](https://github.com/Guilherme-px/coffee-page-v1).

## About the project

Café Aube is a **fictional** coffee shop in Montréal — a demo designed to feel like a real business. The brand, address, opening hours, and 340 daily cups are made up, but everything around them is built to production standards: a scalable component architecture, data-driven content, a comprehensive test suite, and SEO setup that a real business could use.

The entire experience is built from small, focused components — no templates, no purchased themes.

**Sections:**

* **Hero** — Full-screen carousel with autoplay, drag/swipe support, and responsive images with separate crops for mobile
* **About** — Overlapping images and editorial stats with count-up animations triggered when they enter the viewport
* **Menu** — Staggered reveals, hover effects, and 100% data-driven prices and descriptions
* **Visit** — Opening hours that highlight the current day, calculated using Montréal's actual timezone
* **Navbar** — Scrollspy, transparent-to-solid transition on scroll, and an open/closed status badge based on Montréal's real local time

The site is fully pre-rendered (SSG) and comes with built-in SEO: Open Graph, Twitter Cards, sitemap, robots.txt, and local business schema.org markup generated from the same data that powers the UI.

## Stack

| Layer        | Tools                                                  |
| ------------ | ------------------------------------------------------ |
| Framework    | Nuxt 4, Vue 3, TypeScript                              |
| UI           | Nuxt UI 4, Tailwind CSS 4, @nuxt/image                 |
| Testing      | Vitest 4, @nuxt/test-utils (two projects: unit + Nuxt) |
| Code Quality | ESLint (flat config), oxlint, oxfmt, @nuxt/a11y        |
| SEO          | @nuxtjs/seo (meta, sitemap, robots, schema.org)        |

## Architecture Notes

* **Small, focused components** — each piece of UI has its own file. `AppNavbar`, for example, composes `NavbarLogo`, `NavbarLinks`, `OpenStatusBadge`, and others, with each component following a single responsibility.

* **Data-driven** — all content (links, menu items, opening hours, contact information) lives in `app/app.config.ts`. Components receive this data through props, making it possible to add a menu item by editing a single file — or replace the entire brand for a real client.

* **Pure logic extracted** — timezone handling, price formatting, and opening-hour lookups live in `app/utils/` and `app/composables/` as pure, testable functions.

* **100% coverage enforced** — coverage thresholds fail the test suite if any regression occurs across statements, branches, functions, or lines.

## Running Locally

### Requirements

* Bun 1.2+ (or Node 20+ with npm/yarn/pnpm — the commands below use Bun)

### Installation

```bash
git clone https://github.com/Guilherme-px/coffee-page-v2
cd coffee-page-v2

bun install
```

### Local Development

```bash
bun run dev
```

Open http://localhost:3000.

### Tests

```bash
bun run test             # Run all tests once
bun run test:coverage    # Generate coverage report + enforce 100% thresholds
```

### Linting & Formatting

```bash
bun run lint              # oxlint + ESLint
bun run format            # oxfmt
```

### Production

```bash
bun run generate          # Pre-render the site as static HTML (.output/public)
bun run preview           # Serve the generated output locally
```

## The Old Version

This project is the successor to my first coffee shop landing page, built in 2021 with **Vue 2 + Vuetify**.

That project was my introduction to Vue.js and Vue 2. This rewrite applies everything I've learned since then: typed code, composables instead of mixins, design tokens instead of theme overrides, testing as a first-class concern, and deployment on Vercel instead of GitHub Pages.

What stayed the same: **the concept and attention to detail.**

What changed: **five years of technical learning, experimentation, and hands-on development distilled into a completely new implementation.**

## License

MIT
