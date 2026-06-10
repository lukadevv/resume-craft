# Language Icon Editor Specification

## Purpose

Icon picker in the LanguagesForm editor for manual flag selection and override per language row. Mirrors the SkillsForm icon picker pattern using Popover + IconPicker + undo auto-detect.

## Requirements

| # | Requirement | Strength |
|---|-------------|----------|
| R1 | Each language row includes a Popover containing an IconPicker filtered to `category="country-flag"` | MUST |
| R2 | Popover trigger button displays the current or auto-detected flag via `<TechIcon name={lang.name} iconKey={lang.iconKey} showDefault={false} />` | MUST |
| R3 | When `lang.iconKey` is set, the Popover shows an "Auto-detect from name" button that calls `clearIconKey` to reset to auto-detection | MUST |
| R4 | IconPicker `onSelect` updates `lang.iconKey` via `updateLanguage(id, 'iconKey', key)` | MUST |
| R5 | Icon column layout mirrors SkillsForm: Popover in first grid column, icon button `h-10 w-10` | MUST |

### Scenarios

#### Scenario: Select a custom flag
- **GIVEN** LanguagesForm with a "English" row and auto-detected US flag showing in the trigger
- **WHEN** user opens the Popover, searches, and clicks a different flag (e.g., UK)
- **THEN** `lang.iconKey` is updated to the selected key
- **AND** the Popover trigger now shows the UK flag
- **AND** an "Auto-detect from name" undo button appears

#### Scenario: Reset to auto-detect
- **GIVEN** a language has `iconKey: 'es'` manually set
- **WHEN** user clicks the "Auto-detect from name" button inside the Popover
- **THEN** `lang.iconKey` is set to `undefined`
- **AND** the trigger button reverts to showing the auto-detected flag from `lang.name`
- **AND** the undo button disappears

#### Scenario: Empty icon key on new language
- **GIVEN** a newly added language row with empty name and no iconKey
- **WHEN** the row renders
- **THEN** the Popover trigger shows nothing (no flag, no broken image — TechIcon with showDefault=false returns null)
