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
