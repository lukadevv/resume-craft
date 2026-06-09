# Delta for template-pdf-export

## MODIFIED Requirements

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

## REMOVED Requirements

### Requirement: Layout-to-Component Contract

(Reason: `layoutComponentMap` is replaced by shell components. The 4-entry fallback map (single-column→MinimalTemplate, two-column→ModernTemplate, split→CreativeTemplate, timeline→ClassicTemplate) no longer exists. Role-based templates now resolve directly to their layout-specific shell.)
(Migration: Replace `layoutComponentMap` references with shell imports. All 23 shell-routed templates will resolve to `TwoColumnShell`, `SplitShell`, `SingleColumnShell`, or `TimelineShell`.)
