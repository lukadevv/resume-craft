# wizard-navigation Specification

## Purpose

Step sidebar with progress bar, checkmarks, and disabled future steps that guides users through the 7-section resume wizard. SHALL provide navigation only — no form logic or state mutation.

## Requirements

### Requirement: Step Sidebar Layout

The wizard sidebar SHALL render 7 ordered steps: Personal Info → Summary → Experience → Education → Skills → Projects → Additional. Each step SHALL display its label, a step number, and a visual state indicator. The sidebar SHALL highlight the current step via a distinct visual treatment (e.g., filled background, bold label).

#### Scenario: First visit renders step 1 active

- GIVEN no wizard has been started
- WHEN the wizard page loads
- THEN step 1 (Personal Info) SHALL be the active step
- AND steps 2-7 SHALL be disabled

#### Scenario: Navigating to step 4 highlights it

- GIVEN user is on step 3
- WHEN user advances to step 4
- THEN step 4 SHALL receive active styling
- AND step 3 SHALL show a checkmark

### Requirement: Progress Indicator

The sidebar SHALL include a linear progress bar showing completed steps / total steps. Completed steps SHALL display a checkmark icon. Future steps SHALL be visually dimmed and non-interactive.

#### Scenario: All steps completed shows full progress

- GIVEN user has completed all 7 sections
- WHEN user reaches the Review & Export step
- THEN progress bar SHALL show 100%
- AND all 7 steps SHALL display checkmarks

#### Scenario: Clicking future step does nothing

- GIVEN user is on step 2
- WHEN user clicks step 5 in the sidebar
- THEN navigation SHALL NOT change
- AND step 2 SHALL remain active

### Requirement: Step Click Navigation (Completed Only)

The user MAY click a completed step (checkmark visible) to jump back and edit it. The user MUST NOT be able to click future or current steps to skip ahead.

#### Scenario: Clicking completed step jumps back

- GIVEN user is on step 4 with steps 1-3 completed
- WHEN user clicks step 1 in the sidebar
- THEN step 1 SHALL become the active step

### Non-Functional Requirements

- Sidebar SHALL render via pure presentational components with no Zustand imports
- Step state (active, completed, disabled) SHALL be derived from props
- Layout SHALL collapse to a horizontal step indicator on viewport < 768px
