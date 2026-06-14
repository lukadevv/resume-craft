# Tasks: i18n Feature — Resume Craft

Decision needed before apply: Yes
Chained PRs recommended: Yes
Chain strategy: pending
400-line budget risk: High

Estimated: ~2750 lines (1035 code + 600 tests + 1115 messages/data). 3 batches suggested: ① Foundation infra, ② Route restructure, ③ Content & polish.

## Phase 1: Foundation & i18n Infrastructure

- [x] **T1** Install `next-intl`, wrap `next.config.ts` with plugin. Tests: plugin loads. Files: `next.config.ts`, `package.json`.
- [x] **T2** Create `src/i18n/routing.ts` (locales, types). Tests: exports. Deps: T1.
- [x] **T3** Create `src/store/locale.ts` (useLocaleStore, localStorage). Tests: set/get/persist. Deps: T1.
- [x] **T4** Create `src/i18n/request.ts` (static imports, no server APIs). Tests: loading. Deps: T2.
- [x] **T5** Create `src/i18n/navigation.ts` (locale-aware Link). Tests: href per locale. Deps: T2.
- [x] **T6** Create `src/components/ui/TruncateText.tsx`. Tests: German strings, 375px. Deps: none.
- [x] **T7** Create `messages/en/{common,templates,resume-form,blog,seo,landing}.json`. Tests: namespaces load, brand intact. Deps: none.
- [x] **T8** Create `messages/{es,de,fr,pt}/` (24 files). Tests: missing key fallback. Deps: T7.

## Phase 2: Route Restructure

- [x] **T9** Update root `layout.tsx` — dynamic `lang` attribute. Tests: lang per locale. Deps: T2, T5.
- [x] **T10** Create `(en)/` route group — layout + 13 thin page shells. Tests: root URLs, no prefix. Deps: T9.
- [x] **T11** Create `[locale]/` route group — layout + setRequestLocale + 13 shells. Tests: 4 locale routes, generateStaticParams. Deps: T9, T4.
- [x] **T12** Extract shared page components from route files to `src/components/shared/`. Tests: each renders with mocked translations. Deps: T10, T11.

## Phase 3: Components & Locale Switching

- [x] **T13** Update `Header.tsx` — next-intl Link, translated navItems. Tests: labels per locale. Deps: T5, T7.
- [x] **T14** Update `Footer.tsx` — translated link labels. Tests: per locale. Deps: T5, T7.
- [x] **T15** Create `LocaleSwitcher.tsx` — globe + flags dropdown, localStorage. Tests: 5 options, a11y, 375px. Deps: T3, T5.
- [x] **T16** Migrate idealFor/keyFeatures to `messages/{locale}/templates.json`. Tests: page reads from messages. Deps: T7, T12.

## Phase 4: Blog i18n

- [x] **T17** Move `src/content/blog/*.md` → `src/content/blog/en/`. Create locale dirs. Tests: existing tests pass.
- [x] **T18** Update `blog.ts` — default BLOG_DIR locale-aware. Tests: getAllPosts(localeDir). Deps: T17.
- [x] **T19** Blog pages use locale dir, generateStaticParams for locale×slug. Tests: 55 combos. Deps: T12, T18.

## Phase 5: Polish & Verification

- [x] **T20** generateMetadata on all pages — hreflang, canonical, OG, JSON-LD. Tests: hreflang/canonical per locale. Deps: T2, T7, T12.
- [x] **T21** Wizard labels via `useTranslations('resume-form')`. Tests: translate, user data unchanged. Deps: T3, T7.
- [x] **T22** 375px German smoke test — no scroll, no clipping. Tests: Vitest+jsdom. Deps: T13, T15, T19.
- [x] **T23** Build verify — `pnpm build` yields all 5 locale HTML files. Tests: CI step. Deps: all.
