# i18n-routing Specification

## Purpose

Locale-prefixed static routing architecture using `next-intl` with `output: 'export'`. English served at root `/`; es/de/fr/pt at `/[locale]/`.

## Requirements

| # | Requirement | Strength |
|---|-------------|----------|
| R1 | Route group `(en)/` serves English without URL prefix | MUST |
| R2 | Segment `[locale]/` serves es, de, fr, pt with prefix | MUST |
| R3 | `generateStaticParams` in `[locale]/layout.tsx` returns `['es','de','fr','pt']` only | MUST |
| R4 | `createNextIntlPlugin()` wraps `next.config.ts` | MUST |
| R5 | `setRequestLocale(locale)` called in every layout + page | MUST |
| R6 | Shared page components — route files import and re-export, ≤ 5 lines each | MUST |
| R7 | Root `app/layout.tsx` detects locale from params for `html lang` attribute | MUST |
| R8 | All route segments duplicated under both `(en)/` and `[locale]/` | MUST |
| R9 | `next-view-transitions` `<Link>` replaced with `next-intl` locale-aware links | MUST |
| R10 | `pnpm build` produces static HTML for all 5 locales | MUST |

### Scenarios

#### Scenario: Root `/` renders in English

- GIVEN the build is complete
- WHEN user navigates to `https://resumecraft.com/`
- THEN the page renders in English with no `/en/` URL prefix

#### Scenario: `/es/` renders Spanish

- GIVEN the build is complete
- WHEN user navigates to `https://resumecraft.com/es/`
- THEN the page renders in Spanish with all UI text translated

#### Scenario: Unknown locale returns 404

- GIVEN the build is complete
- WHEN user navigates to `https://resumecraft.com/it/`
- THEN a 404 page is returned

#### Scenario: Static export includes all locale HTML files

- GIVEN `pnpm build` runs
- WHEN the build completes
- THEN `out/` contains `index.html`, `es/index.html`, `de/index.html`, `fr/index.html`, `pt/index.html`

### Responsive Resilience

- Navigation links MUST use `min-width` sufficient for longest locale variant at 375px
- Layout shell (Header/Footer) MUST test with German locale at 375px viewport
- Blog listing grid MUST not overflow with German post titles

**Status**: New
