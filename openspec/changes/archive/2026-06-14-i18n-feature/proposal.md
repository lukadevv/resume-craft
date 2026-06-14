# Proposal: i18n for Resume Craft

## Intent

Add 5-language internationalization with locale-prefixed URLs for SEO. English serves at root `/`; other locales use path prefixes (`/es/`, `/de/`, `/fr/`, `/pt/`). All UI, template metadata, resume form labels, SEO metadata, and blog articles translatable. "Resume Craft" brand name stays untranslated.

## Scope

### In Scope
- 5 locales: en (default, root), es, de, fr, pt
- All UI: Header nav, Footer, Hero, Features, CTA, static pages
- Template metadata: descriptions, idealFor, keyFeatures
- Resume form section labels (not user-entered content)
- SEO: per-locale metadata, hreflang alternates, canonical URLs
- Blog: full translations in locale-specific content directories
- Language switcher: globe icon + country flag in Header
- English fallback for untranslated message keys

### Out of Scope
- RTL support, date/number formatting, browser auto-detection, CMS integration
- User-content translation (resume data stays as-is)
- More languages beyond initial 5

## Capabilities

### New Capabilities
- `i18n-routing`: Locale-prefixed static routing with next-intl + `output: 'export'`
- `i18n-translation-messages`: Namespace-organized JSON under `messages/{locale}/`
- `i18n-language-switcher`: Header dropdown with globe icon + country flag icons
- `i18n-resume-form-labels`: Translated wizard labels via Zustand locale state
- `i18n-seo-metadata`: Per-locale generateMetadata, hreflang, canonical URLs
- `i18n-blog-content`: Locale-specific markdown directories for blog posts

### Modified Capabilities
- None

## Approach

**Routing**: Route group `(en)/` serves English at root (no URL prefix). `[locale]/` segment serves es/de/fr/pt. `generateStaticParams` in `[locale]/layout.tsx` returns only non-English locales. Both layouts provide `NextIntlClientProvider` — shared page components use `useTranslations()` uniformly. Route files are thin shells importing shared components.

**Translation files**: Organized by namespace under `messages/{locale}/`:
- `common.json` (header, footer), `home.json` (landing), `templates.json` (metadata)
- `resume-form.json` (wizard labels), `seo.json` (meta strings), `blog.json` (listing)

Missing keys fall back to English.

**next-intl config**: `createNextIntlPlugin()` wraps `next.config.ts`. `src/i18n/request.ts` loads messages without `headers()`. `setRequestLocale()` called in every layout/page enabling static rendering.

**Language switcher**: Dropdown in Header using existing `country-flag-icons`. Selected locale persisted to `localStorage`. Uses `createNavigation` for locale-aware `<Link>` components.

**Resume form**: `locale` field added to Zustand store. Labels via `useTranslations('resume-form')`. Export uses translated section headers; user content untouched.

**SEO**: Each page exports `generateMetadata` reading locale from params. Root layout includes `<link rel="alternate" hreflang="..."/>` for 5 locales.

## Affected Areas

| Area | Impact |
|------|--------|
| `src/app/` | Restructured: add `(en)/` group, `[locale]/` segment |
| `src/messages/` | New: 30 JSON files (5 locales × 6 namespaces) |
| `src/i18n/` | New: request.ts, routing.ts, navigation.ts |
| `components/layout/` | Modified: add switcher, useTranslations |
| `components/landing/` | Modified: replace hardcoded text |
| `components/wizard/` | Modified: replace form labels |
| `src/store/resume.ts` | Modified: add locale field |
| `src/content/blog/` | Restructured: locale subdirectories |
| `src/lib/templates.ts` | Modified: extract descriptions to messages |
| `package.json` | Modified: add next-intl |
| `next.config.ts` | Modified: createNextIntlPlugin |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| next-intl + `output: 'export'` compat | Low | Verified: next-intl 4 + Next 16 work with static export |
| Duplicate route maintenance | Medium | Shared components; each page.tsx ≤ 5 lines |
| Missing translations break pages | Low | English fallback; CI lint for missing keys |
| Build time growth (5 locales) | Low | Modest locale count; static export is CI-only |

## Rollback Plan

Remove `[locale]/` and `(en)/` dirs, restore `src/app/`. Remove `next-intl`. Revert components to hardcoded English.

## Dependencies

- `next-intl` (install via pnpm)
- `country-flag-icons/react/3x2` (already installed)
- Blog post translations (content authoring, not code)

## Success Criteria

- [ ] `pnpm build` produces static HTML for all 5 locales
- [ ] Language switcher changes locale; page content updates
- [ ] SEO meta includes correct hreflang and canonical per locale
- [ ] Resume form labels translate; user content untouched
- [ ] Blog renders per-locale from locale directories
- [ ] All new code has passing tests under `tests/`
- [ ] No server-only APIs violated (`output: 'export'` constraint)
