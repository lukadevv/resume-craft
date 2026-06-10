# Delta for Tech Icons Registry

## ADDED Requirements

| # | Requirement | Strength |
|---|-------------|----------|
| R8 | `countryFlagIcons: IconDefinition[]` exported from `src/lib/icons/categories/country-flags.ts` with 28 country flag definitions | MUST |
| R9 | Each flag entry: `key` (ISO 3166-1 alpha-2), `category: 'country-flag'`, `label` (country name), `color` (accent), `searchTerms` (language name + common variants), inline SVG `Component` | MUST |
| R10 | Flag Components use simple recognizable SVG shapes (circles, rectangles, stripes) — no `react-icons/si` dependency, no pixel-perfect accuracy required | MUST |
| R11 | `registry.tsx` imports and spreads `countryFlagIcons` into the `allIcons` array | MUST |
| R12 | `getIconsByCategory('country-flag')` returns at least 28 icons | MUST |
| R13 | Language-to-flag coverage includes: English (US), Spanish (ES), French (FR), German (DE), Italian (IT), Portuguese (PT), Russian (RU), Japanese (JP), Chinese/Simplified (CN), Korean (KR), Arabic (SA), Hindi (IN), Dutch (NL), Polish (PL), Turkish (TR), Swedish (SE), Danish (DK), Norwegian (NO), Finnish (FI), Greek (GR), Hebrew (IL), Thai (TH), Vietnamese (VN), Czech (CZ), Romanian (RO), Hungarian (HU), Ukrainian (UA), Indonesian (ID) | MUST |

### Scenarios

#### Scenario: Country-flag category loads 28+ icons
- **GIVEN** `country-flags.ts` exists with flag definitions
- **WHEN** `getIconsByCategory('country-flag')` is called
- **THEN** returns an array of length >= 28
- **AND** every entry has `category: 'country-flag'` and an inline SVG `Component`

#### Scenario: Registry includes 6 categories
- **GIVEN** `countryFlagIcons` merged into `allIcons`
- **WHEN** `getAllIcons()` is called
- **THEN** the set of unique categories includes `'country-flag'` alongside the existing 5 categories

#### Scenario: US flag search terms match English variants
- **GIVEN** US flag entry has `searchTerms: ['english', 'united states', 'english (us)', 'american']`
- **WHEN** `searchIcons('english', 'country-flag')` is called
- **THEN** the result includes the US flag definition

#### Scenario: All flag keys are unique
- **GIVEN** the 28 country flag definitions
- **WHEN** examining all keys
- **THEN** no duplicate keys exist
