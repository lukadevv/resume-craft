# Proposal: Blog Section with 15 SEO Posts

## Intent

The Footer already links to `/blog` but the route doesn't exist — a dead link. Adding 15 evergreen resume-advice posts improves SEO crawl frequency, domain authority, and provides top-of-funnel content for organic search traffic.

## Scope

### In Scope
- `/blog` route: listing page with post cards using existing Card primitives
- `/blog/[slug]` route: individual post with `generateStaticParams()`
- Markdown content system: `gray-matter` + `remark`/`remark-html` for build-time rendering
- 15 markdown posts in `src/content/blog/` with YAML frontmatter
- JSON-LD structured data: BlogPosting, BreadcrumbList, CollectionPage
- Full `generateMetadata()` per post (title, description, openGraph, canonical)
- Tests for both routes (Vitest + RTL)

### Out of Scope
- Blog CMS or admin interface
- Comments, social sharing widgets
- Search, categories, tags filtering (deferred)
- RSS feed (deferred)

## Capabilities

### New Capabilities
- `blog-content`: Markdown parsing with YAML frontmatter, 15 evergreen posts, build-time HTML rendering via `remark`
- `blog-routing`: `/blog` listing with card grid, `/blog/[slug]` with `generateStaticParams`, trailing slashes, next-view-transitions Link
- `blog-seo`: `generateMetadata` per post, JSON-LD schemas (BlogPosting, BreadcrumbList, CollectionPage), openGraph tags

### Modified Capabilities
None

## Approach

Server Components with build-time markdown rendering. Follow the templates page pattern: `Header` + main content + `Footer` shell per page. A shared `getAllPosts()`/`getPostBySlug()` utility reads `src/content/blog/*.md` via `fs`, parses frontmatter with `gray-matter`, and renders body with `remark`. The listing page maps posts to Card components in a responsive grid. Individual post pages use `generateStaticParams` to pre-render all 15 slugs for static export.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/app/blog/page.tsx` | New | Blog listing (posts grid + JSON-LD) |
| `src/app/blog/[slug]/page.tsx` | New | Individual post (markdown body + SEO + JSON-LD) |
| `src/lib/blog.ts` | New | `getAllPosts()`, `getPostBySlug()` utilities |
| `src/content/blog/*.md` | New | 15 markdown posts with YAML frontmatter |
| `src/components/blog/PostCard.tsx` | New | Post card reusing Card primitives |
| `package.json` | Modified | Add `gray-matter`, `remark`, `remark-html` |
| `tests/lib/blog.test.ts` | New | Unit tests for content utilities |
| `tests/app/blog/page.test.tsx` | New | Route tests (listing + individual post) |
| `src/components/layout/Footer.tsx` | Existing | Already links to `/blog` — becomes functional |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Build time increase from 15 posts | Low | Markdown parsing is fast; 15 files trivial for SSG |
| Content quality inconsistent across 15 posts | Medium | Draft all posts first, review reading level and keyword targeting |
| `fs` module imports in client components | Low | All content loading stays in Server Components; `gray-matter` never bundled client-side |

## Rollback Plan

1. Remove `src/app/blog/` directory
2. Remove `src/content/blog/` directory
3. Remove `src/lib/blog.ts` and `src/components/blog/`
4. Remove `gray-matter`, `remark`, `remark-html` from `package.json`
5. Remove blog test files under `tests/`
6. Revert Footer `/blog` link (or keep as planned feature teaser)
7. Run `pnpm run build` to confirm clean static export

## Dependencies

- `gray-matter` — YAML frontmatter parsing
- `remark` — markdown processing
- `remark-html` — remark plugin to convert markdown AST to HTML

## Success Criteria

- [ ] `/blog` renders all 15 posts as cards with title, date, excerpt
- [ ] `/blog/[slug]` renders individual post with formatted markdown body
- [ ] JSON-LD structured data present on both pages
- [ ] `generateMetadata()` returns title + description + openGraph per post
- [ ] All tests pass (`pnpm test`)
- [ ] `pnpm run build` produces static HTML for all 16 routes (1 listing + 15 posts)

## Proposal Assumptions

These product decisions need validation before specs proceed:

1. **Publish date strategy**: Posts show placeholder dates or a single "publication" date. Real publish dates require a CMS or git-based date tracking. Which approach for v1?

2. **Author attribution**: Single corporate author ("Resume Craft Team") or individual bylines? Multi-author needs author profiles in frontmatter.

3. **Post ordering**: Chronological (newest first) or curated manual order? Manual order requires an `order` field in frontmatter.

4. **Reading time**: Show estimated reading time on cards? Adds a small utility but improves UX for long-form posts.

5. **Footer blog link**: Keep as-is post-launch, or replace with a CTA to a featured post?
