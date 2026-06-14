# i18n-language-switcher Specification

## Purpose

Locale dropdown in Header, positioned next to the theme toggle. Uses a globe icon trigger, `country-flag-icons/react/3x2` for flag display, and persists selection to `localStorage`.

## Requirements

| # | Requirement | Strength |
|---|-------------|----------|
| R1 | Dropdown trigger: globe icon (Lucide `Globe`) next to theme toggle in Header actions bar | MUST |
| R2 | Each option shows country flag + locale name in native language | MUST |
| R3 | Flags from `country-flag-icons/react/3x2`: `FlagUS`, `FlagES`, `FlagDE`, `FlagFR`, `FlagBR` | MUST |
| R4 | Selected locale persisted to `localStorage` key `resume-craft-locale` | MUST |
| R5 | Active locale highlighted in dropdown | MUST |
| R6 | Switching locale navigates to equivalent page in target locale via `createNavigation` | MUST |
| R7 | Globe icon accessible: `aria-label`, keyboard navigation, focus ring | MUST |
| R8 | Mobile: dropdown adapts to mobile menu width, no overflow at 375px | MUST |
| R9 | Language switcher SHALL NOT appear on `/create` wizard flow | SHOULD |

### Scenarios

#### Scenario: Switch from English to Spanish

- GIVEN user is on `/templates/` viewing English content
- WHEN user opens language switcher and selects Spanish
- THEN page navigates to `/es/templates/` with Spanish translations

#### Scenario: Locale persists across sessions

- GIVEN user selected German locale
- WHEN user closes and reopens the browser
- THEN the site loads in German (via `localStorage` key `resume-craft-locale`)

#### Scenario: Keyboard accessibility

- GIVEN user tabs to the globe icon
- WHEN user presses Enter
- THEN dropdown opens; Arrow keys navigate options; Escape closes; Enter selects

### Responsive Resilience

- Locale names in native language (e.g., "Deutsch") MUST fit within mobile dropdown at 375px
- Globe icon + language switcher MUST NOT push theme toggle or CTA button off-screen at 375px
- Dropdown options MUST handle German-length labels without truncation or overflow
- Header actions bar flex-wrap or reduced gap at narrow viewports

**Status**: New
