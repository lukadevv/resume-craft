# Tasks: Blog Section with 15 SEO Posts

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~2800+ (15 posts × ~150 + infrastructure) |
| 400-line budget risk | High |
| Chained PRs recommended | No |
| Suggested split | Single batch (user D3 — unlimited budget) |
| Delivery strategy | exception-ok |
| Chain strategy | size-exception |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: size-exception
400-line budget risk: High

## Phase 1: Foundation (dependencies + utilities)

- [x] 1.1 Install `gray-matter`, `remark`, `remark-html` in `package.json` as dependencies
- [x] 1.2 Create `src/lib/reading-time.ts` — pure function `calculateReadingTime(text: string): string`, 225 wpm, `Math.ceil(wordCount / 225)`, returns `"N min read"`
- [x] 1.3 Create `src/lib/blog.ts` — `PostFrontmatter`/`Post` types, `getAllPosts(): Post[]`, `getPostBySlug(slug: string): Post | null` using `fs` + `gray-matter` + `remark`; sort by `order` ASC

## Phase 2: Components

- [x] 2.1 Create `src/components/blog/PostCard.tsx` — Server Component wrapping `Card`/`CardHeader`/`CardTitle`/`CardDescription`/`CardFooter`, shows title, excerpt, date, reading time; wraps in `<Link href="/blog/{slug}">`
- [x] 2.2 Create `src/components/blog/FooterRecommendations.tsx` — Server Component, accepts `posts: Post[]`, renders 2–3 featured post links with title and href

## Phase 3: Routes

- [x] 3.1 Create `src/app/blog/page.tsx` — listing page with `Header`+`<main>` grid of `PostCard`s+`Footer`; `generateMetadata()` returning title "Blog — ResumeCraft" + description; JSON-LD `CollectionPage`/`ItemList` with all 15 posts; empty state when no posts
- [x] 3.2 Create `src/app/blog/[slug]/page.tsx` — detail page with `generateStaticParams()` returning all slugs; `generateMetadata()` per post (title + " — ResumeCraft", description, openGraph, canonical); JSON-LD `BlogPosting` + `BreadcrumbList`; `Header`+`<main>` with `<article>` containing rendered HTML body+`Footer`; `notFound()` on invalid slug

## Phase 4: Content

- [x] 4.1 Write 15 markdown files at `src/content/blog/*.md` with YAML frontmatter and full post body (~14,400 words total, evergreen resume topics)

## Phase 5: Testing

- [x] 5.1 Write `tests/lib/blog.test.ts` — unit tests: `getAllPosts()` returns sorted posts, `getPostBySlug()` returns post or null, `calculateReadingTime()` handles 0/100/450/2000 words, missing frontmatter field throws, empty directory returns `[]`
- [x] 5.2 Write `tests/app/blog/page.test.tsx` — RTL tests: listing renders 15 cards, empty state when no posts, detail page renders post body, invalid slug triggers `notFound()`

## Phase 6: Verification

- [x] 6.1 Run `pnpm run build` — static export succeeded, 30 pages including 16 blog routes
- [x] 6.2 Run `pnpm test` — 487 tests pass, 42 files, zero regressions
