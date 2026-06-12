# Blog Content Specification

## Purpose

Defines the content model, storage format, and build-time rendering pipeline for blog posts in the resume-craft static export.

## Requirements

### Requirement: Markdown Content Files

Blog posts MUST be stored as Markdown files with YAML frontmatter in `src/content/blog/`. Each file MUST include fields: `title`, `slug`, `excerpt`, `date`, `author`, `order`, and optional `tags`.

#### Scenario: Valid post file parsed

- GIVEN a `.md` file with valid YAML frontmatter containing all required fields
- WHEN the build runs
- THEN frontmatter is parsed as structured metadata and the markdown body is rendered to HTML

#### Scenario: Missing required frontmatter field

- GIVEN a `.md` file missing the `slug` field
- WHEN the build runs
- THEN the build MUST fail with a clear error identifying the missing field and file

### Requirement: Reading Time Calculation

The system MUST auto-calculate reading time for each post. Reading time SHALL be word count / 225, rounded up to the nearest minute, displayed on post cards.

#### Scenario: Standard-length post

- GIVEN a post with 450 words
- WHEN reading time is calculated
- THEN the result is "2 min read"

#### Scenario: Short post rounds up

- GIVEN a post with 100 words
- WHEN reading time is calculated
- THEN the result is "1 min read"

### Requirement: Build-Time Only Rendering

Markdown parsing and HTML rendering MUST happen at build time. No client-side markdown library SHALL be bundled.

#### Scenario: Static export includes rendered HTML

- GIVEN all 15 posts exist
- WHEN the build completes
- THEN each post page contains pre-rendered HTML with no client-side markdown parser in the bundle

### Requirement: 15 Evergreen Posts

The project MUST ship with 15 complete posts covering resume-crafting topics. All posts SHALL use date `2026-06-12` and author `ResumeCraft Team`.

#### Scenario: All posts available

- GIVEN the `src/content/blog/` directory
- WHEN the build runs
- THEN exactly 15 posts are available with consistent date and author metadata
