# wizard-form Specification

## Purpose

Step-based forms with Back/Next navigation, inline field validation, and required-field indicators. One form panel per wizard section, driven by the active step. All changes persist to Zustand store on blur or debounce.

## Requirements

### Requirement: Section Forms

Each of the 7 sections SHALL render its own form panel with fields for that section only. The form panel SHALL include a section heading and optional description text. Field requirements SHALL follow the existing `Resume` type schema.

| Section | Key Fields | Min Required |
|---------|-----------|--------------|
| Personal Info | fullName, email, phone, location, links | fullName |
| Summary | professionalSummary (textarea) | none |
| Experience | workExperience[] (company, role, dates, description) | none |
| Education | education[] (school, degree, field, dates) | none |
| Skills | skills[] (name, level) | none |
| Projects | projects[] (name, description, url) | none |
| Additional | certifications[], languages[], interests[], references[] | none |

#### Scenario: Personal Info requires fullName before advance

- GIVEN user is on step 1 (Personal Info)
- WHEN fullName is empty and user clicks Next
- THEN an inline error SHALL appear below the field
- AND navigation SHALL NOT advance

#### Scenario: Fields populate from Zustand on step change

- GIVEN user filled "Jane Doe" as fullName on step 1 and advanced to step 2
- WHEN user navigates back to step 1
- THEN the fullName field SHALL still display "Jane Doe"

### Requirement: Navigation Controls

Each form panel SHALL include Back and Next buttons. Back on step 1 SHALL be hidden or disabled. Next on step 7 SHALL read "Review & Export" and navigate to the review step. Every Next click for steps 1-7 SHALL validate required fields for that section.

#### Scenario: Next validates and advances

- GIVEN user is on step 1 with fullName filled
- WHEN user clicks Next
- THEN navigation SHALL advance to step 2
- AND step 1 SHALL show completed state

#### Scenario: Back preserves unsaved work

- GIVEN user typed data in step 3 but did not advance
- WHEN user clicks Back
- THEN step 3 form data SHALL persist to Zustand before navigating to step 2

### Requirement: Required-Field Indicators

Fields marked required in the schema SHALL display a red asterisk or "(required)" label. The label SHALL be visible before any interaction.

#### Scenario: Required indicator visible on empty field

- GIVEN user lands on step 1
- WHEN the form renders
- THEN the fullName field SHALL display a required indicator immediately

### Non-Functional Requirements

- All form state mutations SHALL go through Zustand actions
- Validation SHALL be synchronous and schema-driven
- Layout SHALL be single-column with max-width 640px on desktop
