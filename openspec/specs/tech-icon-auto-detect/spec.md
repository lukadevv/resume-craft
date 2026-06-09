# Tech Icon Auto-Detect Specification

## Purpose

Provides `autoDetectIcon(name: string): IconDefinition | undefined` — a fuzzy, case-insensitive lookup that matches a technology name string against all registered icons' labels and search terms, returning the best match.

## Requirements

| # | Requirement | Strength |
|---|-------------|----------|
| R1 | Matches exact label (case-insensitive), e.g. `autoDetectIcon('React')` → React icon | MUST |
| R2 | Matches via search terms with same priority as exact label, e.g. `autoDetectIcon('js')` → JavaScript icon | MUST |
| R3 | Falls back to substring match when no exact match: `autoDetectIcon('next')` within 'Next.js' label → Next.js icon | SHOULD |
| R4 | Returns `undefined` when no match exists across any registered icon | MUST |
| R5 | Prefers exact match over partial match when both possible | MUST |
| R6 | Matches against all 5 categories (programming-language, framework, database, cloud, tool) | MUST |
| R7 | Has no external dependencies beyond the icon registry | MUST |

### Scenarios

#### Scenario: Exact label match (case-insensitive)
- **GIVEN** icons are registered for "TypeScript" and "React"
- **WHEN** `autoDetectIcon('typescript')` is called
- **THEN** returns the TypeScript `IconDefinition` with key `'typescript'`

#### Scenario: Search term match
- **GIVEN** the JavaScript icon has `searchTerms: ['js', 'ecmascript']`
- **WHEN** `autoDetectIcon('ecmascript')` is called
- **THEN** returns the JavaScript `IconDefinition`

#### Scenario: Substring partial match
- **GIVEN** "Next.js" is registered but "next" is only in its label (not searchTerms)
- **WHEN** `autoDetectIcon('next')` is called
- **THEN** returns the Next.js `IconDefinition`

#### Scenario: Exact match beats partial match
- **GIVEN** "React" label exists, and "React Native" also exists with searchTerm "react"
- **WHEN** `autoDetectIcon('react')` is called
- **THEN** returns the React icon (exact label match) not React Native

#### Scenario: No match returns undefined
- **GIVEN** no icon has label or searchTerms containing "foobar"
- **WHEN** `autoDetectIcon('foobar')` is called
- **THEN** returns `undefined`

#### Scenario: Empty string returns undefined
- **GIVEN** an empty string is passed
- **WHEN** `autoDetectIcon('')` is called
- **THEN** returns `undefined`
