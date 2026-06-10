# Language Flag Display Specification

## Purpose

Country flag icons rendered alongside language names in resume templates, using the existing `TechIcon` component. Auto-detects flag from language name; supports manual `iconKey` override. Unmatched languages show no icon.

## Requirements

| # | Requirement | Strength |
|---|-------------|----------|
| R1 | Language rows render `<TechIcon name={lang.name} iconKey={lang.iconKey} showDefault={false} />` before the name text | MUST |
| R2 | Icon resolved via `autoDetectIcon(name)` when no `iconKey`; via `getIconDefinition(iconKey)` when set | MUST |
| R3 | Languages with no matching flag show no icon — no broken image, no wrench fallback | MUST |
| R4 | Icon rendering applied in `SectionRenderer.tsx` `case 'languages'` | MUST |
| R5 | Icon rendering applied in ModernTemplate, ClassicTemplate, MinimalTemplate, CreativeTemplate, TechnicalTemplate language sections | MUST |
| R6 | Icon rendering applied in `ResumePreview.tsx` languages section | MUST |
| R7 | TechIcon `className="flex-shrink-0 w-4 h-4"` (consistent with existing icon sizing) | MUST |
| R8 | `SoftwareDeveloperTemplate` NOT modified (uses LanguageArc circular chart, no text-row labels) | MUST |

### Scenarios

#### Scenario: Flag renders for known language
- **GIVEN** language name "Spanish" auto-detects to ES country flag
- **WHEN** a template renders the languages section
- **THEN** the flag icon appears to the left of the language name
- **AND** the icon uses `flex-shrink-0 w-4 h-4` sizing

#### Scenario: No flag for unknown language
- **GIVEN** language name "Esperanto" has no matching flag icon in the registry
- **WHEN** a template renders the languages section
- **THEN** only the language name text appears
- **AND** there is no broken image, empty icon container, or Wrench fallback

#### Scenario: Manual iconKey override honored
- **GIVEN** a language entry has `iconKey: 'fr'` explicitly set
- **WHEN** a template renders the language
- **THEN** the French flag renders regardless of the language name field

#### Scenario: Old resume without iconKey works
- **GIVEN** a resume loaded from localStorage has Language entries with no `iconKey` field
- **WHEN** a template renders the languages section
- **THEN** auto-detection runs from `lang.name` and no error occurs
