# template-shell-components Specification

## Purpose

Four layout shells that consume `TemplateDefinition` to render resume content with correct accent colors, section ordering, background gradients, and emphasis components. Each shell is a pure function of `TemplateDefinition` and `Resume`.

## Requirements

### Requirement: Shell Contract

Every shell MUST accept `{ resume: Resume }` as its sole top-level prop. On mount, each shell MUST call `getTemplateDefinition(resume.template)` and render:
- Background gradient via `definition.background`
- Accent color from `definition.accentColor` passed to children
- Sections from `definition.primarySections` and `definition.sidebarSections`
- Emphasis components from `definition.emphasisComponents` array
- All output constrained to A4 dimensions (794×1123px)

#### Scenario: Shell reads template definition on mount

- GIVEN `resume.template` is `'dataScientist'`
- WHEN any shell mounts with this resume
- THEN `getTemplateDefinition('dataScientist')` SHALL be called
- AND accent color `#0ea5e9` SHALL be extracted from the definition

### Requirement: TwoColumnShell

`TwoColumnShell` SHALL render a left sidebar (30% width) and a right main column (70% width). Sidebar SHALL render `sidebarSections`; main column SHALL render `primarySections`. Both columns SHALL share `accentColor`.

#### Scenario: TwoColumnShell renders sidebar and main sections

- GIVEN a template definition with `primarySections: ['summary','workExperience']` and `sidebarSections: ['skills','education']`
- WHEN `TwoColumnShell` renders
- THEN a 30%-width sidebar SHALL contain `skills` and `education` sections
- AND a 70%-width main column SHALL contain `summary` and `workExperience` sections

#### Scenario: TwoColumnShell with emphasis components

- GIVEN a template definition with `emphasisComponents: ['skillBars','metricsCallout']`
- WHEN `TwoColumnShell` renders
- THEN `SkillBars` SHALL render in the sidebar area with `accentColor` prop
- AND `MetricsCallout` SHALL render in the main column area with `accentColor` prop

### Requirement: SplitShell

`SplitShell` SHALL render two equal-width columns (50%/50%). Left column SHALL render `primarySections`. Right column SHALL render `sidebarSections`.

#### Scenario: SplitShell renders equal columns

- GIVEN a split-type template definition
- WHEN `SplitShell` renders
- THEN two columns each take 50% width
- AND `primarySections` render in left column, `sidebarSections` in right

### Requirement: SingleColumnShell

`SingleColumnShell` SHALL render one centered column. It SHALL render `primarySections` first, then `sidebarSections` below as secondary content.

#### Scenario: SingleColumnShell stacks sections vertically

- GIVEN `primarySections: ['summary']` and `sidebarSections: ['languages']`
- WHEN `SingleColumnShell` renders
- THEN summary SHALL appear above languages in a single centered column

### Requirement: TimelineShell

`TimelineShell` SHALL render a single column with `TimelineGraphic` as the primary visual element. `primarySections` SHALL render around the timeline.

#### Scenario: TimelineShell renders timeline as primary element

- GIVEN emphasisComponents includes `timelineGraphic`
- WHEN `TimelineShell` renders
- THEN `TimelineGraphic` SHALL occupy the main content area
- AND `primarySections` SHALL render above/below the timeline

### Requirement: A4 Dimension Constraint

Every shell SHALL produce output no larger than A4 (794×1123px). Overflow content that would exceed 1123px height MAY be clipped or the shell MAY limit the number of items rendered per section.

#### Scenario: Shell output fits A4

- GIVEN a resume with 10 work experiences and 15 skills
- WHEN any shell renders
- THEN the rendered DOM height SHALL NOT exceed 1123px

## Non-Functional Requirements

- All shells SHALL be pure functions — derive everything from props and `getTemplateDefinition()`
- Shells SHALL NOT access Zustand store directly
- A4 size SHALL be enforced via CSS `@page` and fixed width/height container
- Each shell SHALL handle missing optional sections gracefully (render empty placeholder or skip)
