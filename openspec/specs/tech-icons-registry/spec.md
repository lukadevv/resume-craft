# Tech Icons Registry Specification

## Purpose

Defines 4 new icon categories (framework, database, cloud, tool) extending the existing icon registry at `src/lib/icons/`. Each category follows the pattern established by `programming-language` icons: `IconDefinition[]` with `react-icons/si` components, brand colors, and search terms. All categories aggregate into `allIcons` in `registry.tsx`.

## Requirements

| # | Requirement | Strength |
|---|-------------|----------|
| R1 | Category files export `IconDefinition[]` with key, category, label, Component, color, searchTerms | MUST |
| R2 | Framework icons include React, Angular, Vue, Svelte, Next.js, Nuxt, NestJS, Express, Django, Rails, Spring Boot, Laravel, FastAPI, Flask, Gatsby, Remix, Astro, SolidJS, Qwik, Nx | MUST |
| R3 | Database icons include PostgreSQL, MySQL, SQLite, MongoDB, Redis, Elasticsearch, Cassandra, MariaDB, Supabase, Firebase, Prisma, DynamoDB, Neo4j, ClickHouse, CockroachDB, PlanetScale, Fauna, Drizzle, SQLAlchemy | MUST |
| R4 | Cloud icons include AWS, Azure, GCP, Cloudflare, Vercel, Netlify, Heroku, DigitalOcean, Railway, Fly.io, AWS Lambda, S3, EC2, GCP Functions, Cloud Run, Firebase | MUST |
| R5 | Tool icons include Git, Docker, Kubernetes, GitHub Actions, GitLab CI, Webpack, Vite, Turbopack, pnpm, npm, Yarn, Gradle, Maven, Terraform, Ansible, VS Code, Neovim, Postman, Figma, ESLint, Prettier, Husky, Nginx, Apache, Grafana, Prometheus, Datadog, Sentry, Jira, Notion | MUST |
| R6 | `registry.tsx` spreads all 4 new arrays into `allIcons` alongside existing `programmingLanguageIcons` | MUST |
| R7 | Existing types in `types.ts` (`IconCategory`, `IconDefinition`) remain unchanged | MUST |
| R8 | `countryFlagIcons: IconDefinition[]` exported from `src/lib/icons/categories/country-flags.tsx` with 28 country flag definitions | MUST |
| R9 | Each flag entry: `key` (ISO 3166-1 alpha-2), `category: 'country-flag'`, `label` (country name), `color` (accent), `searchTerms` (language name + common variants), inline SVG `Component` | MUST |
| R10 | Flag Components use simple recognizable SVG shapes (circles, rectangles, stripes) — no `react-icons/si` dependency, no pixel-perfect accuracy required | MUST |
| R11 | `registry.tsx` imports and spreads `countryFlagIcons` into the `allIcons` array | MUST |
| R12 | `getIconsByCategory('country-flag')` returns at least 28 icons | MUST |
| R13 | Language-to-flag coverage includes: English (US), Spanish (ES), French (FR), German (DE), Italian (IT), Portuguese (PT), Russian (RU), Japanese (JP), Chinese/Simplified (CN), Korean (KR), Arabic (SA), Hindi (IN), Dutch (NL), Polish (PL), Turkish (TR), Swedish (SE), Danish (DK), Norwegian (NO), Finnish (FI), Greek (GR), Hebrew (IL), Thai (TH), Vietnamese (VN), Czech (CZ), Romanian (RO), Hungarian (HU), Ukrainian (UA), Indonesian (ID) | MUST |

### Scenarios

#### Scenario: Framework category loads all defined icons
- **GIVEN** the framework category file exists at `src/lib/icons/categories/frameworks.ts`
- **WHEN** `getAllIcons()` is called
- **THEN** the result includes at least the icons for React, Next.js, Django, and Svelte
- **AND** each has a `Si*` Component, `color` hex, and `category: 'framework'`

#### Scenario: Database category includes search term aliases
- **GIVEN** the database category file exists
- **WHEN** `searchIcons('postgres', 'database')` is called
- **THEN** the PostgreSQL icon is returned (matching via searchTerms `['postgres', 'pg']`)

#### Scenario: Cloud category includes platform and service icons
- **GIVEN** the cloud category file exists
- **WHEN** `getIconsByCategory('cloud')` is called
- **THEN** the result includes both platform-level entries (AWS, Vercel) and service-level entries (S3, Lambda)

#### Scenario: Registry merges all 5 categories into allIcons
- **GIVEN** all 4 new category files are created and imported into `registry.tsx`
- **WHEN** `getAllIcons()` is called
- **THEN** the returned array includes icons from `programming-language`, `framework`, `database`, `cloud`, and `tool` categories
- **AND** the array has no duplicates

#### Scenario: Static export build succeeds with new imports
- **GIVEN** all new category files import from `react-icons/si`
- **WHEN** `pnpm run build` is executed
- **THEN** the static export completes without error (no server-only imports introduced)

#### Scenario: Country-flag category loads 28+ icons
- **GIVEN** `country-flags.tsx` exists with flag definitions
- **WHEN** `getIconsByCategory('country-flag')` is called
- **THEN** returns an array of length >= 28
- **AND** every entry has `category: 'country-flag'` and an inline SVG `Component`

#### Scenario: Registry includes 6 categories
- **GIVEN** `countryFlagIcons` merged into `allIcons`
- **WHEN** `getAllIcons()` is called
- **THEN** the set of unique categories includes `'country-flag'` alongside the existing 5 categories

#### Scenario: US flag search terms match English variants
- **GIVEN** US flag entry has `searchTerms: ['english', 'united states', 'english (us)', 'american']`
- **WHEN** `searchIcons('english', 'country-flag')` is called
- **THEN** the result includes the US flag definition

#### Scenario: All flag keys are unique
- **GIVEN** the 28 country flag definitions
- **WHEN** examining all keys
- **THEN** no duplicate keys exist
