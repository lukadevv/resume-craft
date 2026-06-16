# Archive Report: i18n-feature

**Change**: i18n-feature
**Archived**: 2026-06-14
**Mode**: hybrid (OpenSpec + Engram)
**Status**: success — intentional archive with stale-checkbox reconciliation

## Summary

5-language internationalization for Resume Craft using `next-intl` with static export (`output: 'export'`). English serves at root `/` via `(en)/` route group; `[locale]/` serves `es|de|fr|pt` with locale-prefixed URLs.

## What Was Delivered

| Capability | Status | Details |
|------------|--------|---------|
| i18n-routing | ✅ Complete | `(en)/` + `[locale]/` route groups, `createNextIntlPlugin()`, `setRequestLocale()` |
| i18n-translation-messages | ✅ Complete | 30 JSON files (5 locales × 6 namespaces), English fallback |
| i18n-language-switcher | ✅ Complete | Globe icon + country flags dropdown, localStorage persistence |
| i18n-resume-form-labels | ✅ Complete | Wizard labels via `useTranslations('resume-form')`, user content untouched |
| i18n-seo-metadata | ✅ Complete | `generateMetadata` with per-locale hreflang, canonical, OG, JSON-LD |
| i18n-blog-content | ✅ Complete | Locale-specific content directories, `generateStaticParams` for locale×slug |
| i18n-responsive-resilience | ✅ Complete | TruncateText utility, 375px German smoke test, responsive grid degradation |

## Key Metrics

| Metric | Value |
|--------|-------|
| Locales | 5 (en, es, de, fr, pt) |
| Translation files | 30 (5 locales × 6 namespaces) |
| Implementation tasks | 23/23 completed |
| Test files | 47 (including i18n-specific tests) |
| Tests passing | 518 passed, 4 skipped |
| Build output | 146 static pages across all 5 locales |
| Build warnings | 0 MISSING_MESSAGE errors |
| Files changed (estimate) | ~2750 lines across 27+ files |

## Specs Synced to Main

All 7 delta specs were NEW (no existing main specs for these domains), so each was copied directly:

| Domain | Action | File |
|--------|--------|------|
| i18n-routing | Created (10 reqs, 4 scenarios) | `openspec/specs/i18n-routing/spec.md` |
| i18n-translation-messages | Created (7 reqs, 3 scenarios) | `openspec/specs/i18n-translation-messages/spec.md` |
| i18n-language-switcher | Created (9 reqs, 3 scenarios) | `openspec/specs/i18n-language-switcher/spec.md` |
| i18n-resume-form-labels | Created (8 reqs, 3 scenarios) | `openspec/specs/i18n-resume-form-labels/spec.md` |
| i18n-seo-metadata | Created (8 reqs, 3 scenarios) | `openspec/specs/i18n-seo-metadata/spec.md` |
| i18n-blog-content | Created (9 reqs, 3 scenarios) | `openspec/specs/i18n-blog-content/spec.md` |
| i18n-responsive-resilience | Created (9 reqs, 3 scenarios) | `openspec/specs/i18n-responsive-resilience/spec.md` |

## Stale-Checkbox Reconciliation

The Engram observation `sdd/i18n-feature/tasks` (obs #128) contained stale unchecked task boxes (`- [ ]`) because the original Engram save occurred before `sdd-apply` updated the filesystem copy. The OpenSpec `tasks.md` on disk correctly showed all 23 tasks as `[x]`.

Reconciliation was performed per user/orchestrator instruction: the apply-progress (obs #130) and verify-report (obs #131) confirm every task is complete. The Engram observation was NOT re-saved (the filesystem tasks.md is the source of truth for checkbox state).

## Known Limitations & Future Work (non-blocking)

| # | Area | Issue |
|---|------|-------|
| W1 | Templates page | IdealFor/keyFeatures loaded from English regardless of locale (data exists in all locale files) |
| W2 | TemplateGrid | Hardcoded English labels: "Search templates...", "Ideal For", "Key Features", "Use Template" |
| W3 | Static page body | FAQ Q&A, privacy sections, terms sections, accessibility cards — hardcoded English |
| W4 | Translation types | No TypeScript type safety for translation keys (string-typed) |
| W5 | LocaleSwitcher a11y | Missing explicit Arrow key / Escape key handlers in dropdown |
| S1 | /create wizard | Language switcher visible on wizard flow (spec R9 says SHOULD NOT) |
| S2 | Blog post page | "Back to Blog" / "Related Posts" labels hardcoded in `[locale]/blog/[slug]/page.tsx` |
| S3 | Blog post JSON-LD | English breadcrumb "Home"/"Blog" hardcoded (English-only page) |

## Engram Observation IDs (Traceability)

| Artifact | Engram ID |
|----------|-----------|
| Proposal | #125 |
| Spec | #126 |
| Design | #127 |
| Tasks | #128 |
| Apply Progress (sweep) | #130 |
| Verify Report | #131 |
| Archive Report | (this entry) |

## Verification Status

- **Build**: PASS (146 pages, 5 locales, 0 MISSING_MESSAGE errors)
- **Tests**: PASS (47 files, 518 passed, 4 skipped)
- **Type-check**: PASS (included in build)
- **CRITICAL issues**: 0 (all 6 previously resolved)
- **Source of truth updated**: 7 new spec files in `openspec/specs/`

## SDD Cycle Complete

The change has been fully planned, implemented, verified, and archived. Ready for the next change.
