# Blog Routing Specification

## Purpose

Defines the route structure, navigation, and component layout for the blog section, ensuring SSG compatibility with `trailingSlash: true` and a consistent site shell.

## Requirements

### Requirement: Blog Listing Route (`/blog`)

The system MUST provide a `/blog` page rendering all 15 posts as cards in a responsive grid, sorted by `order` ascending (order 1 first). Each card SHALL display title, excerpt, formatted date, and reading time.

#### Scenario: Listing page renders all posts sorted

- GIVEN 15 posts exist with order 1–15
- WHEN a user navigates to `/blog`
- THEN all 15 posts appear as cards sorted by order ascending

#### Scenario: Empty posts state

- GIVEN no posts exist
- WHEN a user navigates to `/blog`
- THEN the page displays an empty-state message

### Requirement: Post Detail Route (`/blog/[slug]`)

The system MUST provide a `/blog/[slug]` route rendering a single post with full markdown body. `generateStaticParams()` SHALL return all 15 slugs for static export. Invalid slugs MUST return 404.

#### Scenario: Valid post rendered

- GIVEN a post with slug "resume-tips" exists
- WHEN a user navigates to `/blog/resume-tips`
- THEN the full post content renders with title, author, date, and HTML body

#### Scenario: Invalid slug

- GIVEN no post exists with slug "nonexistent"
- WHEN a user navigates to `/blog/nonexistent`
- THEN the page returns 404

### Requirement: Consistent Site Shell

Blog routes MUST use the same layout as existing pages: Header + `<main>` content + Footer. Navigation SHALL use `next-view-transitions` `<Link>`.

#### Scenario: Full shell present

- GIVEN a user is on any blog route
- WHEN the page renders
- THEN Header, main content area, and Footer are all present

### Requirement: Footer Post Recommendations

The Footer on blog routes SHALL recommend at least 2 specific posts by title and link, rather than a generic `/blog` link.

#### Scenario: Footer shows recommended posts

- GIVEN a user is on any blog page
- WHEN the Footer renders
- THEN at least 2 specific post recommendations are displayed with titles and links
