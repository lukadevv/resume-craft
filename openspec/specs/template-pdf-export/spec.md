# template-pdf-export Specification

## Purpose

Resolve the correct React template component for PDF export based on `TemplateType`. 19 of 25 templates currently fall through a hardcoded switch to ModernTemplate. This spec defines the two-tier resolution that fixes the silent fallback.

## Requirements

### Requirement: Two-Tier Template Resolution

`getTemplateComponent()` SHALL resolve via: direct component match → layoutType fallback → ModernTemplate (safe default). The function SHALL import `templateDefinitionMap` from `@/lib/templates` for layoutType lookups.

#### Scenario: Direct component match

- GIVEN resume `template` is `'softwareDeveloper'`
- WHEN `getTemplateComponent(template)` is called
- THEN SHALL return `SoftwareDeveloperTemplate`

#### Scenario: LayoutType fallback for role-based

- GIVEN resume `template` is `'dataScientist'` (layoutType: `two-column`)
- WHEN `getTemplateComponent(template)` is called
- THEN SHALL resolve via `layoutComponentMap['two-column']` → `ModernTemplate`

#### Scenario: Unknown ID safe default

- GIVEN an unrecognized template string
- WHEN `getTemplateComponent(template)` is called
- THEN SHALL return `ModernTemplate` and emit `console.warn`

### Requirement: Layout-to-Component Contract

`layoutComponentMap` SHALL map each `LayoutType` to exactly one component:

| LayoutType | Component | Count |
|---|---|---|
| `single-column` | MinimalTemplate | 3 |
| `two-column` | ModernTemplate | 15 |
| `split` | CreativeTemplate | 5 |
| `timeline` | ClassicTemplate | 2 |

#### Scenario: All 25 TemplateType values resolve

- GIVEN every member of the `TemplateType` union
- WHEN passed to `getTemplateComponent()`
- THEN SHALL return a component (never `undefined`/`null`)

### Requirement: Dedicated Component Map — No Regressions

Six templates have dedicated components. These SHALL match directly, never through layout fallback:

| TemplateType | Component |
|---|---|
| modern | ModernTemplate |
| classic | ClassicTemplate |
| minimal | MinimalTemplate |
| creative | CreativeTemplate |
| technical | TechnicalTemplate |
| softwareDeveloper | SoftwareDeveloperTemplate |

#### Scenario: Dedicated component bypasses layout fallback

- GIVEN `template` is `'creative'` (has dedicated component; layoutType is `split`)
- WHEN `getTemplateComponent(template)` is called
- THEN SHALL return `CreativeTemplate` directly, NOT via layout fallback

### Requirement: Single Source of Truth

`layoutType` values SHALL only be read from `templateDefinitionMap`. No hardcoded layoutType mappings SHALL exist in `ExportMenu.tsx`.

### Non-Functional Requirements

- Resolution SHALL be O(1) lookup
- All maps SHALL use typed `Record<>` with `satisfies` constraints
- Unknown template IDs SHALL warn but not throw

## Test Scenarios

| # | Group | Template | Expected Component |
|---|---|---|---|
| 1 | direct | modern | ModernTemplate |
| 2 | direct | classic | ClassicTemplate |
| 3 | direct | minimal | MinimalTemplate |
| 4 | direct | creative | CreativeTemplate |
| 5 | direct | technical | TechnicalTemplate |
| 6 | direct | softwareDeveloper | SoftwareDeveloperTemplate |
| 7 | layout | dataScientist | ModernTemplate |
| 8 | layout | uxDesigner | ModernTemplate |
| 9 | layout | graphicDesigner | CreativeTemplate |
| 10 | layout | productManager | ModernTemplate |
| 11 | layout | projectManager | ClassicTemplate |
| 12 | layout | marketing | ModernTemplate |
| 13 | layout | sales | CreativeTemplate |
| 14 | layout | accountant | ModernTemplate |
| 15 | layout | nurse | ModernTemplate |
| 16 | layout | teacher | ModernTemplate |
| 17 | layout | academic | MinimalTemplate |
| 18 | layout | lawyer | ModernTemplate |
| 19 | layout | engineer | ModernTemplate |
| 20 | layout | executive | CreativeTemplate |
| 21 | layout | hr | ModernTemplate |
| 22 | layout | consultant | ModernTemplate |
| 23 | layout | itSupport | ModernTemplate |
| 24 | layout | military | ModernTemplate |
| 25 | layout | federal | MinimalTemplate |
| 26 | edge | unknown (e.g. `'bogus'`) | ModernTemplate + console.warn |
| 27 | regression | all 25 resolve non-null | any component |

### Edge Cases

- **Invalid ID**: Returns ModernTemplate + console.warn; no throw
- **LayoutType missing from map**: TypeScript compile error ensures all 4 layoutTypes are covered
- **TemplateDefinition missing layoutType**: TS error — `layoutType` is non-optional on `TemplateDefinition`
