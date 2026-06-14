# i18n-responsive-resilience Specification

## Purpose

Cross-cutting overflow and layout safety patterns that prevent German/Spanish/French text expansion from breaking the UI at any viewport. This spec defines the testing protocol and reusable protection patterns.

## Requirements

| # | Requirement | Strength |
|---|-------------|----------|
| R1 | All text-bearing components MUST pass visual regression at 375px viewport with German locale | MUST |
| R2 | Navigation items MUST use `whitespace-nowrap` + `text-ellipsis` overflow when needed | MUST |
| R3 | Buttons with translated text MUST have `min-width` sufficient for longest locale variant | SHOULD |
| R4 | Card grid columns MUST degrade from 3→2→1 as text content lengthens at narrow widths | MUST |
| R5 | Mobile hamburger menu items MUST not overflow or wrap at 375px in German | MUST |
| R6 | Blog post cards MUST truncate excerpts at 3 lines across all locales | MUST |
| R7 | Header/footer MUST be smoke-tested per locale via Vitest snapshot or DOM assertion | SHOULD |
| R8 | `TruncateText` or equivalent utility SHALL be available for any component rendering translated strings | SHOULD |
| R9 | Build output for German locale MUST be validated: no horizontal scrollbar at 375px, no text clipping | MUST |

### Scenarios

#### Scenario: German nav fits mobile at 375px

- GIVEN locale is `de`
- WHEN page renders at 375px viewport width
- THEN mobile hamburger menu items "Vorlagen", "Blog", "Meine Lebensläufe" all fit without overflow
- AND no horizontal scrollbar appears

#### Scenario: Template cards degrade gracefully

- GIVEN template grid with German descriptions
- WHEN viewport is 640px wide
- THEN grid shows 2 columns (not 3) to accommodate longer text
- AND cards show full title without truncation

#### Scenario: Button text never clips

- GIVEN a CTA button labeled "Lebenslauf erstellen" (German, 20 chars)
- WHEN rendered at any viewport ≥320px
- THEN full button text is visible — no ellipsis unless intentional by design

### Responsive Resilience

This spec IS the responsive resilience definition. All other i18n specs reference these requirements for their domain-specific overflow safety.

**Status**: New
