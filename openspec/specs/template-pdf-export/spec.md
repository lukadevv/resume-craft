# template-pdf-export Specification

## Purpose

Resolve the correct React template component for PDF export based on `TemplateType`. 19 of 25 templates currently fall through a hardcoded switch to ModernTemplate. This spec defines the two-tier resolution that fixes the silent fallback.

## Requirements

### Requirement: Template Resolution via Shells

`getTemplateComponent()` SHALL resolve via: dedicated component match (2 entries) → shell match by layoutType (4 shells) → `ModernTemplate` (safe default). The function SHALL import shell components and `templateDefinitionMap` from `@/lib/templates`.

(Previously: Two-tier resolution: direct → layoutType fallback via 4 layout components → ModernTemplate)

#### Scenario: Direct component match for standalone templates

- GIVEN resume `template` is `'technical'` or `'softwareDeveloper'`
- WHEN `getTemplateComponent(template)` is called
- THEN SHALL return `TechnicalTemplate` or `SoftwareDeveloperTemplate` respectively

#### Scenario: Shell resolution via layoutType for role-based templates

- GIVEN resume `template` is `'dataScientist'` (layoutType: `two-column`)
- WHEN `getTemplateComponent(template)` is called
- THEN SHALL resolve via `layoutType` → `TwoColumnShell`

#### Scenario: All layoutTypes map to correct shell

- GIVEN `layoutType` `two-column`, `split`, `single-column`, or `timeline`
- WHEN `getTemplateComponent()` resolves
- THEN SHALL map to `TwoColumnShell`, `SplitShell`, `SingleColumnShell`, or `TimelineShell` respectively

#### Scenario: Unknown ID safe default

- GIVEN an unrecognized template string
- WHEN `getTemplateComponent(template)` is called
- THEN SHALL return `ModernTemplate` and emit `console.warn`

### Requirement: Dedicated Component Map — Two Standalone Entries

Two templates have dedicated components that bypass shell routing. These SHALL match directly:

| TemplateType | Component |
|---|---|
| technical | TechnicalTemplate |
| softwareDeveloper | SoftwareDeveloperTemplate |

(Previously: Six templates had dedicated components: modern→ModernTemplate, classic→ClassicTemplate, minimal→MinimalTemplate, creative→CreativeTemplate, technical→TechnicalTemplate, softwareDeveloper→SoftwareDeveloperTemplate)

#### Scenario: Dedicated component bypasses shell resolution

- GIVEN `template` is `'softwareDeveloper'` (has dedicated component; layoutType is `split`)
- WHEN `getTemplateComponent(template)` is called
- THEN SHALL return `SoftwareDeveloperTemplate` directly, NOT via `SplitShell`

#### Scenario: Former dedicated templates now route through shells

- GIVEN `template` is `'modern'`, `'classic'`, `'minimal'`, or `'creative'`
- WHEN `getTemplateComponent(template)` is called
- THEN SHALL resolve via their respective `layoutType` through the corresponding shell

### Requirement: Single Source of Truth

`layoutType` values SHALL only be read from `templateDefinitionMap`. No hardcoded layoutType mappings SHALL exist in `ExportMenu.tsx`.

### Non-Functional Requirements

- Resolution SHALL be O(1) lookup
- All maps SHALL use typed `Record<>` with `satisfies` constraints
- Unknown template IDs SHALL warn but not throw

## Test Scenarios

| # | Group | Template | Expected Component |
|---|---|---|---|
| 1 | direct | technical | TechnicalTemplate |
| 2 | direct | softwareDeveloper | SoftwareDeveloperTemplate |
| 3 | shell | modern | SingleColumnShell |
| 4 | shell | classic | TimelineShell |
| 5 | shell | minimal | SingleColumnShell |
| 6 | shell | creative | SplitShell |
| 7 | shell | dataScientist | TwoColumnShell |
| 8 | shell | uxDesigner | TwoColumnShell |
| 9 | shell | graphicDesigner | SplitShell |
| 10 | shell | productManager | TwoColumnShell |
| 11 | shell | projectManager | TimelineShell |
| 12 | shell | marketing | TwoColumnShell |
| 13 | shell | sales | SplitShell |
| 14 | shell | accountant | TwoColumnShell |
| 15 | shell | nurse | TwoColumnShell |
| 16 | shell | teacher | TwoColumnShell |
| 17 | shell | academic | SingleColumnShell |
| 18 | shell | lawyer | TwoColumnShell |
| 19 | shell | engineer | TwoColumnShell |
| 20 | shell | executive | SplitShell |
| 21 | shell | hr | TwoColumnShell |
| 22 | shell | consultant | TwoColumnShell |
| 23 | shell | itSupport | TwoColumnShell |
| 24 | shell | military | TwoColumnShell |
| 25 | shell | federal | SingleColumnShell |
| 26 | edge | unknown (e.g. `'bogus'`) | ModernTemplate + console.warn |
| 27 | regression | all 25 resolve non-null | any component |

### Edge Cases

- **Invalid ID**: Returns ModernTemplate + console.warn; no throw
- **Unrecognized layoutType**: TypeScript compile error ensures all 4 layoutTypes are covered
- **TemplateDefinition missing layoutType**: TS error — `layoutType` is non-optional on `TemplateDefinition`
