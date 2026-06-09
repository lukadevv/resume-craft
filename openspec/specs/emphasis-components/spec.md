# emphasis-components Specification

## Purpose

Four shared presentational components that render role-specific visual emphasis from resume data. Each is a pure function of props — no internal state, no store access. Shells conditionally render them based on `TemplateDefinition.emphasisComponents`.

## Requirements

### Requirement: SkillBars Component

`SkillBars` SHALL render a list of horizontal progress bars labeled by skill name and filled proportional to proficiency level. It MUST accept `skills: Skill[]` and `accentColor: string` as props.

#### Scenario: Renders skill bars in descending proficiency order

- GIVEN skills `[{name:'React',level:'expert'},{name:'CSS',level:'intermediate'}]`
- WHEN `SkillBars` renders
- THEN SHALL display "React" with 100% bar fill and "CSS" with 66% bar fill
- AND bars SHALL use `accentColor` for the fill

#### Scenario: Empty skill list renders nothing

- GIVEN `skills` prop is `[]`
- WHEN `SkillBars` renders
- THEN SHALL return `null` (no DOM output)

### Requirement: MetricsCallout Component

`MetricsCallout` SHALL render achievement strings as large-number callout cards. It MUST accept `achievements: string[]` and `accentColor: string` as props.

#### Scenario: Renders achievements as callout cards

- GIVEN `achievements` is `['40% revenue growth','15 team members led']`
- WHEN `MetricsCallout` renders
- THEN SHALL display each achievement in a bordered card styled with `accentColor`

#### Scenario: Empty achievements renders nothing

- GIVEN `achievements` is `[]`
- WHEN `MetricsCallout` renders
- THEN SHALL return `null`

### Requirement: TimelineGraphic Component

`TimelineGraphic` SHALL render work experience entries as a vertical timeline with connecting line and dots. It MUST accept `experiences: WorkExperience[]` and `accentColor: string` as props.

#### Scenario: Renders chronological timeline

- GIVEN two work experiences sorted by date descending
- WHEN `TimelineGraphic` renders
- THEN SHALL display a vertical line with colored dots for each entry and position/company labels

#### Scenario: Single entry still renders timeline structure

- GIVEN exactly one work experience
- WHEN `TimelineGraphic` renders
- THEN SHALL render a single dot with label — no dangling line

#### Scenario: Empty experiences renders nothing

- GIVEN `experiences` is `[]`
- WHEN `TimelineGraphic` renders
- THEN SHALL return `null`

### Requirement: CertificationBadge Component

`CertificationBadge` SHALL render certifications as horizontal badge chips. It MUST accept `certifications: Certification[]` and `accentColor: string` as props.

#### Scenario: Renders certification badges

- GIVEN `certifications` is `[{name:'PMP',issuer:'PMI'},{name:'AWS SA',issuer:'Amazon'}]`
- WHEN `CertificationBadge` renders
- THEN SHALL display each certification name and issuer in a badge styled with `accentColor`

#### Scenario: Empty certifications renders nothing

- GIVEN `certifications` is `[]`
- WHEN `CertificationBadge` renders
- THEN SHALL return `null`

## Non-Functional Requirements

- All components SHALL be pure functions — no hooks, no store access, no side effects
- All components SHALL accept `accentColor: string` and apply it via inline style or Tailwind bound className
- Each component SHALL return `null` when its data array is empty
