# i18n-blog-content Specification

## Purpose

Locale-specific blog content directories with markdown files. `getAllPosts` and `getPostBySlug` accept a locale-aware directory parameter. `generateStaticParams` covers locale × slug combinations.

## Requirements

| # | Requirement | Strength |
|---|-------------|----------|
| R1 | Blog content stored at `src/content/blog/{locale}/` — one subdirectory per locale | MUST |
| R2 | English (`en`) blog posts remain at `src/content/blog/en/` (no changes to existing files) | MUST |
| R3 | `getAllPosts(blogDir)` accepts locale-specific path: `src/content/blog/{locale}/` | MUST |
| R4 | `generateStaticParams` for `(en)/blog/[slug]` and `[locale]/blog/[slug]` generate locale+slug combos | MUST |
| R5 | Untranslated posts fall back to English — if `es/` is missing a slug, render English version | SHOULD |
| R6 | Blog listing page renders per-locale metadata (title, excerpt, reading time) from locale `frontmatter` | MUST |
| R7 | "Featured post" selection uses locale-specific posts | MUST |
| R8 | JSON-LD BlogPosting uses locale-specific URLs and translated author/headline | MUST |
| R9 | Reading time calculated from locale content word count | MUST |

### Scenarios

#### Scenario: Spanish blog listing shows translated posts

- GIVEN `src/content/blog/es/` contains 15 translated `.md` files
- WHEN user navigates to `/es/blog/`
- THEN page renders with Spanish titles, excerpts, and "min de lectura" reading time

#### Scenario: Missing Spanish post falls back to English

- GIVEN `src/content/blog/es/` is missing `common-resume-mistakes.md`
- WHEN user navigates to `/es/blog/common-resume-mistakes`
- THEN the English version from `src/content/blog/en/` is rendered

#### Scenario: generateStaticParams covers all locale+slug combos

- GIVEN 15 posts in `en/`, 15 in `es/`, 10 in `de/`, 10 in `fr/`, 5 in `pt/`
- WHEN `pnpm build` runs
- THEN static HTML is generated for all 55 locale+slug combinations

### Responsive Resilience

- Blog card grids MUST not overflow with German post titles (avg 30% longer) at 375px
- Post card excerpts in German MUST truncate gracefully at 3 lines max
- "Featured post" card layout MUST accommodate longest German title without breaking

**Status**: New
