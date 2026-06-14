# Design: Blog Section with 15 SEO Posts

## Technical Approach

Build-time Server Components read `src/content/blog/*.md` via Node `fs`, parse YAML frontmatter with `gray-matter`, and render markdown to HTML with `remark` + `remark-html`. All 16 routes (1 listing + 15 posts) are statically exported via `generateStaticParams()`. JSON-LD, OpenGraph tags, and canonical URLs are injected at build time — zero client-side JS for blog pages.

Follows the templates page pattern: `Header` + `<main>` content + `Footer` shell, `next-view-transitions` `<Link>`, JSON-LD via `<script type="application/ld+json" dangerouslySetInnerHTML>`.

## Architecture Decisions

| Decision | Option | Tradeoff | Verdict |
|----------|--------|----------|---------|
| Markdown → HTML | `dangerouslySetInnerHTML` with build-time `remark` | **vs MDX**: heavier setup, needs compilation. **vs rehype-react**: adds client bundle. Build-time rendering eliminates XSS risk — HTML is generated at `next build`, not user input. | `dangerouslySetInnerHTML` |
| Content source | `fs.readFileSync` in Server Components | **vs API fetch**: no backend to fetch from in SSG-only app. **vs webpack `raw-loader`**: doesn't parse frontmatter. `fs` works at SSG build time; Next.js tree-shakes it from client bundle. | `fs` + `gray-matter` |
| Post card rendering | Reuse `Card` primitives | **vs custom `PostList` component**: more code, no benefit. Card primitives (`Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardFooter`) already styled and tested. PostCard wraps them with `<Link>`. | Reuse `Card` primitives |
| Post ordering | Explicit `order` field (1–15) | **vs `date`-based**: all posts share same publish date. **vs filename-based**: fragile, doesn't scale. Explicit `order` is deterministic and author-controlled. | `order` field, ascending |
| Reading time | Pure function: `Math.ceil(wordCount / 225)` | **vs hook**: no browser API needed — word count is known at build time. No `useMemo` or `useEffect` needed. | Pure function in `src/lib/reading-time.ts` |

## Data Flow

```
next build
  │
  ├─ getAllPosts()
  │    ├─ fs.readdirSync("src/content/blog/") → 15 .md files
  │    ├─ gray-matter(frontmatter) + remark().use(html).process(body)
  │    └─ sort by order ASC → Post[]
  │
  ├─ generateStaticParams() → [{ slug: "post-1" }, ...]
  │
  └─ Static export (/blog/index.html, /blog/post-1/index.html, ...)
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/lib/blog.ts` | Create | `getAllPosts()`, `getPostBySlug()` — build-time markdown parser |
| `src/lib/reading-time.ts` | Create | `calculateReadingTime(text: string): string` |
| `src/app/blog/page.tsx` | Create | Listing page — post grid + CollectionPage JSON-LD |
| `src/app/blog/[slug]/page.tsx` | Create | Detail page — markdown body + BlogPosting/BreadcrumbList JSON-LD |
| `src/components/blog/PostCard.tsx` | Create | Card wrapper with title, excerpt, date, reading time |
| `src/components/blog/FooterRecommendations.tsx` | Create | Server Component showing 2–3 featured post links |
| `src/content/blog/*.md` | Create | 15 SEO-optimized posts (title, slug, excerpt, date, author, order, tags) |
| `package.json` | Modify | Add `gray-matter`, `remark`, `remark-html` |
| `tests/lib/blog.test.ts` | Create | Unit tests: parsing, sorting, missing fields |
| `tests/app/blog/page.test.tsx` | Create | Route tests: rendering, metadata, JSON-LD, 404 |

## Interfaces

```typescript
interface PostFrontmatter {
  title: string;
  slug: string;
  excerpt: string;
  date: string;       // "2026-06-12"
  author: string;     // "ResumeCraft Team"
  order: number;      // 1–15, ascending
  tags?: string[];    // optional, for future category/tag support
}

interface Post {
  frontmatter: PostFrontmatter;
  content: string;       // rendered HTML
  readingTime: string;   // "5 min read"
}
```

Utility signatures: `getAllPosts(): Post[]`, `getPostBySlug(slug: string): Post | null`.

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Unit | `getAllPosts()` parsing, sort order, reading time calculation | Vitest with fs mock; test valid/invalid frontmatter |
| Unit | `getPostBySlug()` — found/not found | Vitest; verify null for missing slug |
| Integration | `/blog` page renders 15 cards, JSON-LD present | RTL render, assert card count, check `<script>` content |
| Integration | `/blog/[slug]` renders post body, metadata, BlogPosting JSON-LD | RTL render, assert title, `<article>` content, `<script>` |
| Integration | Invalid slug returns 404 | RTL render, assert `notFound()` handled |
| Edge case | Missing required frontmatter field | Mock fs output; assert build-time error |
| Edge case | Empty `src/content/blog/` directory | `getAllPosts()` returns `[]`, listing shows empty state |

## Migration / Rollout

No migration required. `package.json` additions do not affect existing functionality. Blog routes are net-new.

## Open Questions

None — all product assumptions from the proposal are resolved (single author, single publish date, `order`-based sorting, reading time included).
