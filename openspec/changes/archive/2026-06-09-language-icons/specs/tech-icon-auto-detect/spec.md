# Delta for Tech Icon Auto-Detect

## MODIFIED Requirements

### Requirement: R6 — Match scope expanded to 6 categories

`autoDetectIcon` MUST match against all 6 icon categories: `programming-language`, `framework`, `database`, `cloud`, `tool`, and `country-flag`.

(Previously: matched against 5 categories — `programming-language`, `framework`, `database`, `cloud`, `tool` — without `country-flag`.)

No code change required; `autoDetectIcon` calls `getAllIcons()` which will include country-flag icons once the registry import is added.

#### Scenario: Spanish language auto-detects ES flag

- **GIVEN** the ES country flag has `searchTerms` including `'spanish'`
- **WHEN** `autoDetectIcon('Spanish')` is called
- **THEN** returns the ES flag `IconDefinition`

#### Scenario: English language auto-detects US flag

- **GIVEN** the US country flag has `label: 'English'` and `searchTerms` including `'english'`
- **WHEN** `autoDetectIcon('English')` is called
- **THEN** returns the US flag `IconDefinition`

#### Scenario: Unknown language returns undefined

- **GIVEN** no country flag has `'esperanto'` in its label or search terms
- **WHEN** `autoDetectIcon('Esperanto')` is called
- **THEN** returns `undefined`

#### Scenario: Existing tech icon auto-detection unchanged

- **GIVEN** "React" has a framework icon registered
- **WHEN** `autoDetectIcon('React')` is called
- **THEN** returns the React `IconDefinition` (no regression from country-flag addition)

All other existing scenarios from the base spec remain valid and unchanged.
