# Design: i18n for Resume Craft

## Technical Approach

Add 5-locale i18n via `next-intl` with static export. English serves at root `/` via `(en)/` route group; `[locale]/` segment serves `es|de|fr|pt`. `createNextIntlPlugin()` wraps next.config.ts. All pages become thin route shells importing shared components; `NextIntlClientProvider` loads per-locale messages. `next-view-transitions` `<Link>` replaced with `next-intl` locale-aware navigation. German text (30-40% longer than English) drives responsive boundaries: all components tested at 375px viewport.

## Architecture Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Route structure | `(en)/` group at root + `[locale]/` segment | Keeps English URL-clean; no redirects. Route files thin shells (≤5 lines) importing shared components. |
| Locale persistence | Separate `useLocaleStore` (localStorage key `resume-craft-locale`) | Locale is app-level, not resume data. No `locale` field in `Resume` type. |
| Message loading | `src/i18n/request.ts` imports JSON statically — no `headers()`, no `cookies()` | Must work with `output: 'export'`. All messages bundled at build. |
| Blog content | `src/content/blog/{locale}/` subdirs; `getAllPosts()` accepts directory | Existing API already supports optional directory param. English stays at `src/content/blog/en/`. |
| Template descriptions | Move `idealFor`/`keyFeatures` from `templates/page.tsx` into `messages/{locale}/templates.json` | Values were already hardcoded in page; translation files are the natural home. |
| View Transitions | Keep `next-view-transitions` wrapping; replace `<Link>` with `next-intl` `<Link>` | `ViewTransitions` wrapper is at root layout; locale-aware navigation works inside it. |
| German overflow defense | `TruncateText` utility + `text-safe`/`overflow-safe` CSS classes + 375px smoke test | Not per-component ad-hoc; shared utilities prevent duplication. |

## Data Flow

```
URL: /es/blog/resume-tips
     │
     ▼
[locale]/layout.tsx
  setRequestLocale('es')
  ──→ NextIntlClientProvider(messages=es)
         │
         ▼
blog/[slug]/page.tsx  ← shared component
  useTranslations('blog')
  getAllPosts('src/content/blog/es/')
  getPostBySlug('resume-tips', 'src/content/blog/es/')
         │
         ▼
PostCard / BlogGrid  ← shared UI components
  useTranslations('common')
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/app/(en)/` + all sub-routes | Create | Route group for English at root (14 thin page files importing shared components) |
| `src/app/[locale]/` + all sub-routes | Create | Locale segment mirrors `(en)/` (14 thin page files + layout w/ setRequestLocale) |
| `src/app/layout.tsx` | Modify | Remove hardcoded `lang="en"`; keep ViewTransitions+ThemeProvider |
| `src/i18n/request.ts` | Create | Message loader: imports JSON statically |
| `src/i18n/routing.ts` | Create | Locale list, default locale config |
| `src/i18n/navigation.ts` | Create | Locale-aware Link, useRouter, usePathname |
| `messages/{en,es,de,fr,pt}/*.json` | Create | 30 namespace files (5 locales × 6 namespaces) |
| `src/components/layout/Header.tsx` | Modify | Replace `next-view-transitions` Link; add `LocaleSwitcher`; translate `navItems` |
| `src/components/layout/LocaleSwitcher.tsx` | Create | Globe icon dropdown with flag icons |
| `src/components/ui/TruncateText.tsx` | Create | Shared overflow-safe text component |
| `src/components/shared/` | Create dir | Extracted page components: HomePage, BlogPage, BlogPostPage, TemplatesPage, CreatePage |
| `src/lib/blog.ts` | Modify | `BLOG_DIR` points to `src/content/blog/en/` default |
| `src/store/locale.ts` | Create | `useLocaleStore` with `localStorage` persistence |
| `next.config.ts` | Modify | Wrap with `createNextIntlPlugin()` |
| `package.json` | Modify | Add `next-intl` dependency |
| `src/content/blog/en/` | Create/Move | Migrate existing blog posts from `src/content/blog/` |
| `src/content/blog/{es,de,fr,pt}/` | Create dirs | Locale-specific blog content |
| `tests/i18n/` | Create dir | i18n-specific test files |

## Interfaces / Contracts

```typescript
// src/i18n/routing.ts
export const locales = ['en', 'es', 'de', 'fr', 'pt'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

// src/i18n/request.ts — static import, no server APIs
export default async function getRequestConfig({ locale }: {
  locale: string;
}) {
  return {
    messages: {
      ...(await import(`../../messages/${locale}/common.json`)).default,
      ...(await import(`../../messages/${locale}/templates.json`)).default,
      // ... 4 more namespaces merged
    },
  };
}

// src/store/locale.ts
interface LocaleState {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}
```

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Unit | `LocaleSwitcher` renders 5 options with flags | RTL, mock `useLocaleStore` |
| Unit | `TruncateText` truncates at specified max lines | RTL, test with German-length strings |
| Unit | `getAllPosts(localeDir)` returns locale-specific posts | Vitest, temp filesystem fixtures |
| Integration | Route generation: `generateStaticParams` for all locale+route combos | Vitest, verify param arrays |
| Integration | Header nav translates per locale | RTL + `NextIntlClientProvider` wrapper |
| Smoke | German locale at 375px: no horizontal scrollbar | Vitest + jsdom viewport assertion |
| E2E | `pnpm build` succeeds for all 5 locales | CI step |

## Migration / Rollout

1. Install `next-intl`, scaffold `messages/` and `src/i18n/`.
2. Migrate blog: `src/content/blog/*.md` → `src/content/blog/en/*.md`.
3. Extract shared page components; create thin shells in `(en)/` and `[locale]/`.
4. Add `LocaleSwitcher` to Header; wire `useLocaleStore`.
5. Write translations; smoke-test German at 375px.
6. CI: verify `pnpm build` produces all locale HTML files.

**Rollback**: Remove `(en)/`, `[locale]/`, `src/i18n/`, `messages/`; restore flat `src/app/`; remove `next-intl`. No data loss.

## Open Questions

- [ ] Should untranslated blog posts redirect to English version or render English with locale chrome? (Spec says "render English version" — needs user confirmation)
- [ ] Are `idealFor` and `keyFeatures` translation-ready, or should they stay code-defined in `templates.ts`?
