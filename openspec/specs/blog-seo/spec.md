# Blog SEO Specification

## Purpose

Defines metadata, OpenGraph tags, and JSON-LD structured data for blog pages to maximize search engine visibility and social sharing previews. All metadata SHALL be statically generated at build time.

## Requirements

### Requirement: Listing Page Metadata

The `/blog` page MUST export `generateMetadata()` returning: `<title>Blog — ResumeCraft</title>`, a meta description, and relevant keywords.

#### Scenario: Listing metadata present

- GIVEN the `/blog` page is built
- WHEN a crawler fetches the page
- THEN `<title>` is "Blog — ResumeCraft" and `<meta name="description">` is present

### Requirement: Detail Page Metadata

Each `/blog/[slug]` page MUST export `generateMetadata()` returning: per-post title, excerpt as description, OpenGraph tags (`og:title`, `og:description`, `og:type`, `og:url`), and a canonical URL.

#### Scenario: Post page full metadata

- GIVEN a post titled "10 Resume Tips" with slug "resume-tips"
- WHEN the page is built
- THEN `<title>` is "10 Resume Tips — ResumeCraft" and all OpenGraph tags plus canonical URL are present

### Requirement: JSON-LD Structured Data — Listing

The `/blog` page MUST include `<script type="application/ld+json">` with `CollectionPage` schema containing an `ItemList` of `ListItem` entries (one per post).

#### Scenario: CollectionPage schema rendered

- GIVEN 15 posts exist
- WHEN `/blog` is rendered
- THEN JSON-LD contains `@type: "CollectionPage"` with `ItemList` and 15 `ListItem` entries

### Requirement: JSON-LD Structured Data — Detail

Each `/blog/[slug]` page MUST include JSON-LD with `BlogPosting` schema (headline, datePublished, author, description) and `BreadcrumbList` schema (Home → Blog → Post).

#### Scenario: BlogPosting schema rendered

- GIVEN a post with title, date, and author
- WHEN the post page is rendered
- THEN JSON-LD contains `@type: "BlogPosting"` with headline, datePublished, and author fields
- AND a `BreadcrumbList` with Home, Blog, and current post items
