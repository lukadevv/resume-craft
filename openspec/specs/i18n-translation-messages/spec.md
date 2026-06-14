# i18n-translation-messages Specification

## Purpose

Namespace-organized JSON translation files under `messages/{locale}/` with English fallback for missing keys. TypeScript type safety for all translation keys.

## Requirements

| # | Requirement | Strength |
|---|-------------|----------|
| R1 | Translation files at `messages/{locale}/` with namespaces: `common`, `templates`, `resume-form`, `blog`, `seo`, `landing` | MUST |
| R2 | English (`en`) is the fallback locale — missing keys in any locale fall back to `en` | MUST |
| R3 | Message loading in `src/i18n/request.ts` without `headers()`, `cookies()`, or server APIs | MUST |
| R4 | `NextIntlClientProvider` wraps children in each locale layout with correct messages | MUST |
| R5 | TypeScript types generated or maintained for all translation keys | SHOULD |
| R6 | Brand name "Resume Craft" hardcoded, never sourced from translation files | MUST |
| R7 | `en` messages use English text; all other locales use translated text | MUST |
| R8 | Missing key at runtime SHALL log console warning in dev, render English fallback in prod | MUST |

### Scenarios

#### Scenario: All namespaces load for a locale

- GIVEN locale is `es`
- WHEN `request.ts` loads messages
- THEN messages from all 6 namespaces (`common`, `templates`, `resume-form`, `blog`, `seo`, `landing`) are merged and available

#### Scenario: English fallback for missing key

- GIVEN `es/templates.json` is missing the key `description.modern`
- WHEN a component calls `t('description.modern')`
- THEN the English value from `en/templates.json` is rendered

#### Scenario: Brand name stays English

- GIVEN locale is `de`
- WHEN any component renders the brand name
- THEN "Resume Craft" appears — never "Lebenslauf Handwerk" or any translated variant

### Responsive Resilience

- Translation text length MUST NOT be assumed equal across locales — each UI component allocates space for German-length strings
- All visible translated strings MUST fit without overflow at 375px viewport with German locale

**Status**: New
