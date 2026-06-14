# i18n-resume-form-labels Specification

## Purpose

Translated wizard section labels driven by the active locale. Zustand store tracks locale for export labeling. User-entered content (names, descriptions, skills) stays untouched.

## Requirements

| # | Requirement | Strength |
|---|-------------|----------|
| R1 | Wizard section labels (Personal Info, Summary, Experience, etc.) rendered via `useTranslations('resume-form')` | MUST |
| R2 | Field labels (fullName, email, phone, etc.) translated per active locale | MUST |
| R3 | Validation error messages translated per locale | MUST |
| R4 | User-entered content (name, summaries, descriptions) SHALL NOT be modified by locale switch | MUST |
| R5 | Zustand store `locale` field added to `ResumeState` (no persistence in resume data — locale is session/global) | MUST |
| R6 | Export uses translated section headers for the export locale, not the user's data | MUST |
| R7 | `required-field` indicator label translated (e.g., "Required" → "Obligatorio") | MUST |
| R8 | Placeholder text in form fields translated | SHOULD |

### Scenarios

#### Scenario: Form labels change on locale switch

- GIVEN user is on step 1 (Personal Info) in English
- WHEN user switches locale to German
- THEN field labels update to German (e.g., "Full Name" → "Vollständiger Name")

#### Scenario: User data preserved across locale switch

- GIVEN user typed "Jane Doe" as fullName in English
- WHEN user switches to Spanish
- THEN "Jane Doe" remains unchanged in the fullName field

#### Scenario: Export uses translated header

- GIVEN user exports a resume in Spanish locale
- WHEN the PDF renders
- THEN section headers appear in Spanish (e.g., "Experiencia Laboral" not "Work Experience")
- AND user-entered content (job titles, descriptions) remains as typed

### Responsive Resilience

- Form labels in German (e.g., "Berufserfahrung", "Bildungsweg") MUST fit in single-column layout at 375px
- Required-field indicator MUST not wrap or overlap label text at any viewport width
- Input field widths MUST accommodate label growth without layout shift

**Status**: New
