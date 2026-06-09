# wizard-review-export Specification

## Purpose

Final-review step after all 7 sections. Renders a read-only summary of all resume data with export actions for all 5 supported output formats.

## Requirements

### Requirement: Read-Only Section Summaries

The review step SHALL render a read-only summary of each section in a scrollable list. Each summary SHALL include a section label, a count of items (where applicable), and an "Edit" link that navigates back to that section's form step.

#### Scenario: Review shows all completed sections

- GIVEN user filled Personal Info and 2 Experience entries
- WHEN user reaches Review & Export
- THEN Personal Info summary SHALL display fullName, email, phone
- AND Experience summary SHALL display "2 entries" with company names

#### Scenario: Edit link jumps to form step

- GIVEN user is on Review & Export viewing Personal Info
- WHEN user clicks "Edit" on Personal Info summary
- THEN wizard SHALL navigate to step 1 (Personal Info) in edit mode

### Requirement: Export Actions

The review step SHALL expose 5 export actions: PDF, DOCX, HTML, JSON, and TXT. Each action SHALL trigger the corresponding export function from `src/lib/export/resume-export.ts`. The SHALL use the current template selection and all resume data.

#### Scenario: Export PDF generates valid output

- GIVEN resume has name, experience, and education filled
- WHEN user clicks "Export as PDF"
- THEN `exportResumeToPdf()` SHALL be called with current resume data
- AND a file download SHALL be initiated

#### Scenario: Export JSON includes all fields

- GIVEN resume has all sections partially filled
- WHEN user clicks "Export as JSON"
- THEN the exported JSON SHALL contain all non-empty sections
- AND the JSON SHALL conform to the `Resume` type schema

#### Scenario: Export with missing data warns but proceeds

- GIVEN resume has only fullName filled (all other sections empty)
- WHEN user clicks any export action
- THEN export SHALL proceed with available data
- AND no error or crash SHALL occur

### Requirement: Back Navigation from Review

The review step SHALL include a Back button that returns to step 7 (Additional). The Next button SHALL be hidden or replaced with export actions.

### Non-Functional Requirements

- Export SHALL be synchronous for HTML/JSON/TXT, async for PDF/DOCX
- PDF export SHALL use existing `html2pdf` dynamic import (no new dependency)
- Export buttons SHALL be rendered in a row with clear visual hierarchy
