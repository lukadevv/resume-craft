# Tech Icon Display Specification

## Purpose

`TechIcon` component (`src/components/ui/TechIcon.tsx`) auto-detects a technology name and renders its brand icon with optional label alongside. Used by resume templates to display visual technology badges.

## Requirements

| # | Requirement | Strength |
|---|-------------|----------|
| R1 | Accepts `name: string`, `className?: string`, `showLabel?: boolean` props | MUST |
| R2 | Calls `autoDetectIcon(name)` internally to resolve icon | MUST |
| R3 | Renders icon SVG with its brand color when match found | MUST |
| R4 | Icon container uses `flex-shrink-0` with `w-4 h-4` fixed dimensions | MUST |
| R5 | Icon never shrinks — fixed size regardless of text wrapping | MUST |
| R6 | When `showLabel` is true, renders icon + name text side by side | MUST |
| R7 | When no icon match, renders nothing (no broken UI, no empty div) | MUST |
| R8 | Rendered icon includes `aria-label` for accessibility | MUST |
| R9 | Compatible with static export (`output: 'export'`) — no server features | MUST |

### Scenarios

#### Scenario: Renders icon with brand color for known technology
- **GIVEN** "React" is registered with brand color `#61DAFB`
- **WHEN** `<TechIcon name="React" />` is rendered
- **THEN** the React icon SVG is displayed with `color: #61DAFB`
- **AND** the icon container has classes `w-4 h-4 flex-shrink-0`

#### Scenario: Renders icon + label when showLabel is true
- **GIVEN** "Docker" is registered
- **WHEN** `<TechIcon name="Docker" showLabel={true} />` is rendered
- **THEN** the Docker icon appears followed by the text "Docker"
- **AND** icon maintains `flex-shrink-0`, text wraps normally

#### Scenario: Renders nothing for unknown technology
- **GIVEN** "SomeUnknownTool" has no icon match
- **WHEN** `<TechIcon name="SomeUnknownTool" />` is rendered
- **THEN** the component returns `null` (no DOM output)

#### Scenario: Icon never shrinks when text wraps
- **GIVEN** a narrow container causing the label to wrap
- **WHEN** `<TechIcon name="Kubernetes" showLabel={true} />` is rendered inside the container
- **THEN** the icon maintains its `w-4 h-4` size
- **AND** the label text wraps to the next line while the icon stays fixed

#### Scenario: Accessible icon
- **GIVEN** "AWS" is registered
- **WHEN** `<TechIcon name="AWS" />` is rendered
- **THEN** the icon element has an `aria-label="AWS"` attribute
