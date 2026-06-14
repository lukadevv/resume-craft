# i18n-seo-metadata Specification

## Purpose

Per-locale SEO metadata via Next.js `generateMetadata` API. hreflang alternates, canonical URLs, localized Open Graph, and JSON-LD for all 5 locales.

## Requirements

| # | Requirement | Strength |
|---|-------------|----------|
| R1 | Each page exports `generateMetadata({ params })` reading locale from params | MUST |
| R2 | Root layout includes `<link rel="alternate" hreflang="x" href="..."/>` for all 5 locales | MUST |
| R3 | `x-default` hreflang points to English root (`/`) | MUST |
| R4 | Canonical URL per locale (`/es/resume/abc` → canonical `/es/resume/abc`) | MUST |
| R5 | `html lang` attribute set to active locale value (`en`, `es`, `de`, `fr`, `pt`) | MUST |
| R6 | Open Graph `og:locale` tag set per locale | MUST |
| R7 | JSON-LD structured data localized: `@context`, names, descriptions translated | MUST |
| R8 | Meta `description`, `keywords`, `title` translated per locale | MUST |
| R9 | Brand name "Resume Craft" in title template: `"%s — Resume Craft"` (NOT translated) | MUST |

### Scenarios

#### Scenario: Spanish page has correct hreflang

- GIVEN user is on `/es/templates/`
- WHEN inspecting `<head>`
- THEN `<link rel="alternate" hreflang="es" href="/es/templates/">` is present
- AND `<link rel="alternate" hreflang="en" href="/templates/">` is present
- AND `x-default` points to `/templates/`

#### Scenario: Canonical URL per locale

- GIVEN blog post `/es/blog/resume-tips`
- WHEN inspecting `<head>`
- THEN `<link rel="canonical" href="/es/blog/resume-tips"/>` is present (NOT the English URL)

#### Scenario: JSON-LD in Spanish

- GIVEN blog listing page in Spanish locale
- WHEN inspecting `<script type="application/ld+json">`
- THEN CollectionPage `name` and `description` are in Spanish

### Responsive Resilience

- Meta tags are head-only — no visual layout concerns. hreflang generation MUST not increase build CSR bundle.
- `og:title` length MUST stay within 60 chars per locale (truncate with `titleTemplate` if needed)

**Status**: New
