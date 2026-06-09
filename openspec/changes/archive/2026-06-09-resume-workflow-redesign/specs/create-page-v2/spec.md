# create-page-v2 Specification

## Purpose

Replace the `/create` page modal flow with an inline template picker and resume name input. The "Start Building" button SHALL be disabled until a name is entered. No modal dialog is used.

## Requirements

### Requirement: Inline Template Picker

The page SHALL render all 25 templates as selectable cards in a grid. Each card SHALL display the template name and a representative thumbnail or color swatch. The selected template SHALL receive a highlighted border or ring.

#### Scenario: User selects a template card

- GIVEN the create page renders with 25 template cards
- WHEN user clicks "Modern" template card
- THEN the Modern card SHALL show a highlighted border
- AND previously selected card (if any) SHALL lose its highlight

#### Scenario: Default template is preselected

- GIVEN user visits `/create` for the first time
- WHEN the page loads
- THEN the first template (Modern) SHALL be preselected

### Requirement: Resume Name Input

The page SHALL include a text input for the resume name. The placeholder SHALL read "Enter resume name" or equivalent. The input SHALL have a default value of empty string.

#### Scenario: Name input accepts user text

- GIVEN the create page is loaded
- WHEN user types "My Software Dev Resume" in the name input
- THEN the input SHALL display "My Software Dev Resume"

#### Scenario: Empty name input shows default state

- GIVEN user visits `/create`
- WHEN the page loads
- THEN the name input SHALL be empty
- AND the "Start Building" button SHALL be disabled

### Requirement: Start Building Button

The CTA button SHALL read "Start Building" (not "Create Resume"). It SHALL be disabled when the name input is empty. On click with a valid name, it SHALL: (1) create a resume in Zustand with the selected template and name, (2) navigate to `/resume/wizard?id={newId}`.

#### Scenario: Button disabled when name is empty

- GIVEN template is selected but name input is empty
- WHEN the page renders
- THEN the "Start Building" button SHALL have `disabled` attribute
- AND clicking it SHALL produce no navigation

#### Scenario: Button enabled and navigates on click

- GIVEN user selected "Creative" template and typed "Design Portfolio"
- WHEN user clicks "Start Building"
- THEN a resume SHALL be created in Zustand via `createResume`
- AND browser SHALL navigate to `/resume/wizard?id={newId}`

#### Scenario: Whitespace-only name treated as empty

- GIVEN name input contains only spaces ("   ")
- WHEN user clicks "Start Building"
- THEN button SHALL remain disabled or form validation SHALL reject

### Requirement: No Modal Dialog

The `/create` page SHALL NOT render `EditDetailsPanel` or any modal overlay. All create-flow interaction SHALL happen inline on the page.

### Non-Functional Requirements

- Template grid SHALL be responsive: 2 col mobile, 3 col tablet, 5 col desktop
- Page SHALL remain statically exportable (no `'use server'`, no cookies)
- `createResume` SHALL NOT auto-fill sample data (wizard starts empty)
