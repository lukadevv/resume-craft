# Verify Report: i18n-feature

**Status**: FAIL — Archive BLOCKED

**Build**: PASS (static export, all locale HTML files in `out/`)
**Tests**: PASS (47 files, 519 passed, 4 skipped)
**Spec Coverage**: 5/7 spec areas have CRITICAL gaps

---

## Summary

The i18n infrastructure (routing, message loading, locale store, navigation, build pipeline) is correctly implemented. However, **the translation content layer is largely incomplete** — message files exist but most UI components and pages do NOT consume them. 6 CRITICAL issues block archival.

---

## 1. i18n-routing — PASS with Warnings

| # | Requirement | Result | Evidence |
|---|-------------|--------|----------|
| R1 | `(en)/` serves English at root | PASS | `out/index.html` serves English |
| R2 | `[locale]/` serves es/de/fr/pt with prefix | PASS | `out/es/index.html`, `out/de/index.html`, etc. exist |
| R3 | `generateStaticParams` returns non-en only | PASS | `[locale]/layout.tsx` filters `l !== 'en'` |
| R4 | `createNextIntlPlugin()` wraps next.config.ts | PASS | next.config.ts uses `withNextIntl` |
| R5 | `setRequestLocale` in every layout + page | WARNING | Called in both layouts but NOT in individual page files (FAQ, Privacy, etc.) |
| R6 | Shared components, ≤5 line route files | PASS | Route files import shared components (Home pages ≤19 lines, create/privacy/terms pages ≤5 lines) |
| R7 | Root layout detects locale for `lang` attr | PASS | `params.locale || 'en'` in root layout |
| R8 | Routes duplicated under both groups | PASS | Both `(en)/` and `[locale]/` have identical route structures |
| R9 | `next-view-transitions` Link replaced | PASS | Header/Footer use `@/i18n/navigation` Link |
| R10 | `pnpm build` produces all 5 locale HTML | PASS | `out/index.html`, `out/es/index.html`, etc. all present |

**WARNING R5**: `setRequestLocale` is only called in `(en)/layout.tsx` and `[locale]/layout.tsx`. Individual page files in `[locale]/` (blog, templates, FAQ, etc.) do not call it. This works for static generation when the layout sets it, but violated the spec as written.

---

## 2. i18n-translation-messages — PASS with Warnings

| # | Requirement | Result | Evidence |
|---|-------------|--------|----------|
| R1 | 6 namespaces per locale, 30 files total | PASS | 5 locales × 6 files = 30 JSON files present |
| R2 | English fallback for missing keys | PASS | `next-intl` default behavior with `en` as default |
| R3 | No server APIs in request.ts | PASS | Uses static dynamic `import()` only, no `headers()/cookies()` |
| R4 | `NextIntlClientProvider` wraps children | PASS | Both `(en)/layout.tsx` and `[locale]/layout.tsx` provide it |
| R5 | TypeScript types for translation keys | WARNING | No type definitions generated. `useTranslations()` returns `any` |
| R6 | Brand "Resume Craft" never translated | PASS | Brand used as JSX `Resume Craft` in header/footer, not from messages |
| R7 | Messages translated per locale | PASS | Files exist with translated content |
| R8 | Missing keys log warning in dev | PASS | `next-intl` default behavior |

**WARNING R5**: No `react-intl` typegen or manual `type-safe` message keys. This means translation keys are string-typed and typos won't be caught at compile time. (SHOULD strength)

---

## 3. i18n-language-switcher — FAIL (2 CRITICAL)

| # | Requirement | Result | Evidence |
|---|-------------|--------|----------|
| R1 | Globe icon trigger next to theme toggle | PASS | `Globe` from lucide-react in Header actions bar |
| R2 | Flag + native language name per option | PASS | Emoji flag + localeLabelMap display |
| R3 | Flags from `country-flag-icons/react/3x2` | **CRITICAL FAIL** | Uses emoji (`localeFlagEmoji`) instead of FlagUS, FlagES, FlagDE, FlagFR, FlagBR components |
| R4 | localStorage persistence key `resume-craft-locale` | PASS | `useLocaleStore` persists under correct key |
| R5 | Active locale highlighted | PASS | `bg-surface font-medium` on active item |
| R6 | createNavigation for navigation | PASS | Uses `useRouter`/`usePathname` from `@/i18n/navigation` |
| R7 | aria-label, keyboard nav, focus ring | WARNING | `aria-label` and `aria-expanded` present. No explicit Arrow/Escape key handlers |
| R8 | Mobile adapts at 375px | PASS | `w-48` dropdown, responsive Button sizing |
| R9 | Hidden on /create wizard | WARNING | Not implemented — switcher visible on /create |

**CRITICAL R3**: Spec requires `country-flag-icons/react/3x2` (FlagUS, FlagES, FlagDE, FlagFR, FlagBR). Implementation uses emoji characters (`localeFlagEmoji`). This is a MUST requirement.

**WARNING R7**: Dropdown opens on Enter/click but lacks explicit Arrow key navigation for option selection. Escape key requires a click on the backdrop. The `aria-haspopup="listbox"` and `role="listbox"`/`role="option"` are correctly applied.

**WARNING R9**: The language switcher is visible on the `/create` page. The spec says "SHOULD NOT appear on `/create` wizard flow".

---

## 4. i18n-resume-form-labels — PASS with Warning

| # | Requirement | Result | Evidence |
|---|-------------|--------|----------|
| R1 | Wizard labels via `useTranslations('resume-form')` | PASS | Messages loaded; WizardClient can access via `useTranslations` context |
| R2 | Field labels translated | PASS | `resume-form.json` has translations per locale |
| R3 | Validation messages translated | PASS | `validation.*` keys in resume-form.json |
| R4 | User content untouched by locale switch | PASS | No code modifies user data on locale switch |
| R5 | Zustand store locale field | PASS | `useLocaleStore` (separate store, not ResumeState) |
| R6 | Export uses translated headers | WARNING | Export menu uses `useTranslations` context; wizard export labels translate |
| R7 | Required-field indicator translated | PASS | `labels.required` in resume-form.json |
| R8 | Placeholders translated | WARNING | Placeholder keys exist in message files but some components may not consume them |

**WARNING R6**: The actual export functions (`exportToText`, `exportToHTML` etc.) in `src/lib/export/resume-export.ts` do not read locale state for section headers. Section headers in exported documents may remain in English.

---

## 5. i18n-seo-metadata — FAIL (2 CRITICAL)

| # | Requirement | Result | Evidence |
|---|-------------|--------|----------|
| R1 | generateMetadata with locale from params | FAIL | Only blog `[locale]` pages use locale in generateMetadata. FAQ, Templates, Privacy, Terms, Accessibility use `export const metadata` (static) |
| R2 | hreflang alternates for all 5 locales | WARNING | No root-level hreflang alternate links. Each page has static `alternates.canonical` |
| R3 | x-default hreflang | FAIL | Not present in any page |
| R4 | Canonical URL per locale | FAIL | `[locale]/templates/page.tsx` canonical is `/templates` not `/${locale}/templates` |
| R5 | html `lang` attribute | PASS | Root layout dynamically sets `lang` from `params` |
| R6 | `og:locale` tag | FAIL | Not set on any page |
| R7 | JSON-LD localized per locale | FAIL | Blog JSON-LD `url` is `/blog/${slug}` not `/${locale}/blog/${slug}` |
| R8 | Meta description/keywords/title translated | FAIL | Most pages use hardcoded English metadata, not from `seo.json` |
| R9 | Brand name in title template NOT translated | PASS | Brand name hardcoded in JSX |

**CRITICAL R1**: FAQ, Privacy, Terms, Accessibility all use `export const metadata` (static) which is NOT locale-aware. Only the `(en)/` versions render, the `[locale]/` versions render identical English metadata.

**CRITICAL R4**: `[locale]/templates/page.tsx` canonical is `/templates` not `/${locale}/templates`. Same for all other pages.

**CRITICAL R7**: Blog listing JSON-LD uses `url: '/blog'` and `url: /blog/${slug}` — missing locale prefix.

---

## 6. i18n-blog-content — FAIL (1 CRITICAL)

| # | Requirement | Result | Evidence |
|---|-------------|--------|----------|
| R1 | Blog content at `src/content/blog/{locale}/` | PASS | Subdirectories exist for all locales |
| R2 | English posts at `src/content/blog/en/` | PASS | Migrated from root |
| R3 | `getAllPosts` accepts locale path | PASS | `resolveBlogDir()` handles locale or path |
| R4 | generateStaticParams for locale×slug | PASS | `[locale]/blog/[slug]/page.tsx` generates locale+slug combos |
| R5 | Untranslated posts fall back to English | PASS | `resolveBlogDir()` falls back to `en` |
| R6 | Blog listing per-locale metadata from frontmatter | PASS | Uses `getAllPosts(locale)` |
| R7 | Featured post uses locale-specific posts | PASS | `posts[0]` from locale-specific posts |
| R8 | JSON-LD locale-aware URLs | **CRITICAL FAIL** | Blog listing `url: /blog/${slug}` not `/${locale}/blog/${slug}` |
| R9 | Reading time from locale content | PASS | `calculateReadingTime` using locale content |

**CRITICAL R8**: Blog listing page JSON-LD URLs are NOT locale-aware. They use `/blog/${post.frontmatter.slug}` regardless of locale, instead of `/${locale}/blog/${post.frontmatter.slug}`.

**Additional**: Blog page has hardcoded English text ("Resume Guides", "You Can Actually Use", "All Articles", "Browse our complete collection") not using `useTranslations('blog')`.

---

## 7. i18n-responsive-resilience — PASS with Warning

| # | Requirement | Result | Evidence |
|---|-------------|--------|----------|
| R1 | 375px German text visual regression | PASS | TruncateText component tests with German strings |
| R2 | Nav whitespace-nowrap + overflow | PASS | Header nav uses `whitespace-nowrap` |
| R3 | Buttons min-width for longest variant | N/A | No explicit `min-width` found but not critical |
| R4 | Card grid 3→2→1 columns | PASS | Blog grid uses `md:grid-cols-2 lg:grid-cols-3` |
| R5 | Mobile hamburger no overflow at 375px DE | PASS | `whitespace-nowrap` on mobile nav items |
| R6 | Blog excerpts truncate at 3 lines | PASS | TruncateText component supports maxLines |
| R7 | Header/footer smoke-tested per locale | WARNING | Tests exist for Header/Footer rendering but not exhaustive per-locale snapshot |
| R8 | TruncateText utility available | PASS | Created and tested |
| R9 | German locale validated at 375px | PASS | TruncateText tests with German string |

**WARNING R7**: No dedicated per-locale snapshot tests for Header/Footer. Existing tests mock translations.

---

## Strict TDD Verification

| Check | Result | Evidence |
|-------|--------|----------|
| Every task has test file | PASS | All i18n tasks have corresponding tests under `tests/i18n/` |
| TDD Cycle Evidence in apply-progress | PASS | Apply-progress Engram entry documents all 23 tasks |
| Tests written before implementation | N/A | No reliable timestamp data in this environment |
| Test coverage | PASS | 47 test files, 519 passing tests |

---

## Summary of Blocking Issues (CRITICAL)

| # | Spec Area | Issue | Spec Reference |
|---|-----------|-------|----------------|
| C1 | translation-messages | Landing components (Hero, Features, CTA, Privacy) use hardcoded English — message files exist but are unused | i18n-translation-messages R6/R7 |
| C2 | seo-metadata | FAQ, Privacy, Terms, Accessibility have static `export const metadata` — not locale-aware | i18n-seo-metadata R1 |
| C3 | seo-metadata | Canonical URLs on `[locale]/` pages don't include locale prefix | i18n-seo-metadata R4 |
| C4 | seo-metadata | Blog JSON-LD URLs not locale-aware on locale pages | i18n-seo-metadata R7, i18n-blog-content R8 |
| C5 | language-switcher | LocaleSwitcher uses emoji flags instead of `country-flag-icons/react/3x2` | i18n-language-switcher R3 |
| C6 | tasks | Templates page `idealFor`/`keyFeatures` still hardcoded — NOT migrated to translation files | Task T16, i18n-translation-messages R7 |

---

## Verdict

**Status**: FAIL
**Next**: fixes-required

Archive is BLOCKED until all 6 CRITICAL issues are resolved. The i18n infrastructure (routing, navigation, message loading, store, build) is solid and well-tested. However, the content layer (landing components, static pages, blog i18n, SEO metadata, flag components, template descriptions) is incomplete — translations exist only as message files, not as consumed UI.
