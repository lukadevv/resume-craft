# resume-type-expansion Specification

## Purpose

Add 14 role-specific fields to the `Resume` interface so template shells and emphasis components can render role-aware content (licenses, publications, metrics, tools) without breaking existing forms or storage.

## Requirements

### Requirement: Additive Field Expansion

The `Resume` interface SHALL gain the following fields. All SHALL be additive — no existing field MAY be removed or renamed. Each field SHALL default to an empty value in `createEmptyResume()`.

| Field | Type | Default |
|---|---|---|
| tools | `Skill[]` (string array alias) | `[]` |
| coreCompetencies | `string[]` | `[]` |
| achievements | `string[]` | `[]` |
| portfolio | `Project[]` | `[]` |
| awards | `string[]` | `[]` |
| affiliations | `string[]` | `[]` |
| publications | `string[]` | `[]` |
| grantsFellowships | `string[]` | `[]` |
| conferences | `string[]` | `[]` |
| clinicalSkills | `string[]` | `[]` |
| licenses | `Certification[]` | `[]` |
| barAdmission | `string` | `''` |
| practiceAreas | `string[]` | `[]` |
| securityClearance | `string` | `''` |
| teachingPhilosophy | `string` | `''` |
| classroomExperience | `string[]` | `[]` |
| teachingExperience | `string[]` | `[]` |

#### Scenario: New resume starts with empty role fields

- GIVEN `createEmptyResume()` is called
- WHEN the returned `Resume` object is inspected
- THEN all 17 new fields SHALL be present with their default empty values

#### Scenario: Existing localStorage data loads without breakage

- GIVEN a `Resume` object persisted before this expansion (missing new fields)
- WHEN Zustand hydrates the store from localStorage
- THEN the merged state SHALL include all new fields with their defaults
- AND no field ever SHALL be `undefined` after hydration

#### Scenario: Form components render without errors

- GIVEN any existing resume form component (e.g. PersonalInfo form)
- WHEN it receives a `Resume` object that includes the new fields
- THEN the component SHALL render without TypeScript errors or runtime exceptions

### Requirement: Backward-Compatible State Type

The updated `Resume` type SHALL satisfy `extends Partial<Resume>` for deserialization so old persisted data can hydrate without migration. The store's `persist` middleware partialize/merge SHALL NOT require manual migration.

#### Scenario: Old resume schema hydrates cleanly

- GIVEN localStorage contains a JSON `Resume` without `barAdmission` or `teachingPhilosophy`
- WHEN Zustand store hydrates
- THEN `resume.barAdmission` SHALL be `''` (default)
- AND `resume.tools` SHALL be `[]`

### Scenario: TypeScript strict mode passes

- GIVEN the project's `tsconfig.json` with `strict: true`
- WHEN `tsc --noEmit` runs
- THEN no type errors SHALL originate from the expanded `Resume` interface

## Non-Functional Requirements

- All new fields SHALL use existing or structurally identical sub-types (`string[]`, `Project[]`, `Certification[]`, `Skill[]`)
- No custom serialization logic SHALL be introduced
- Field names SHALL match `TemplateSection` union members in `templates.ts` for direct section-to-field mapping
