# Tasks: Language Country Flag Icons

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~550 (additions + deletions) |
| 400-line budget risk | High |
| Chained PRs recommended | Yes |
| Suggested split | PR 1 (Foundation + Tests) → PR 2 (Editor + Templates) |
| Delivery strategy | hybrid |
| Chain strategy | stacked-to-main |

Decision needed before apply: No
Chained PRs recommended: Yes
Chain strategy: stacked-to-main
400-line budget risk: High

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | Types + flag SVG icons + registry + registry tests | PR 1 | Zero risk; flags are pure data with no consumer yet; base = main |
| 2 | LanguagesForm icon picker + all template render updates + integration tests | PR 2 | Depends on PR 1 for flag icons to exist in registry; base = main |

## Phase 1: Foundation

- [x] **1.1** `src/types/resume.ts` — Add `iconKey?: string` to `Language` interface (line 73), mirroring `Skill.iconKey`
- [x] **1.2** `src/lib/icons/categories/country-flags.ts` — **Create** file with 28 flag `IconDefinition[]` entries; each entry: ISO 3166-1 alpha-2 key, `country-flag` category, language-aware searchTerms, `color: '#666'`, and an inline SVG component (36×24 viewBox, hardcoded fill colors)
- [x] **1.3** `src/lib/icons/registry.tsx` — Import `countryFlagIcons` and spread into `allIcons` array (between lines 6-15)
- [x] **1.4** `tests/iconRegistry.test.ts` — Update line 47-50: change `toEqual([])` to `toBeGreaterThanOrEqual(28)`; update line 284 from "all 5 categories" to "all 6 categories"; add `country-flag` assertions

## Phase 2: Editor

- [x] **2.1** `src/components/resume/editor/LanguagesForm.tsx` — Add Popover + IconPicker column per language row (ported from SkillsForm lines 69-105); `category="country-flag"` on IconPicker; "Auto-detect from name" reset button when `iconKey` set; import `TechIcon`, `Popover`, `IconPicker`, `Undo2`; add `iconKey` to `updateLanguage` typing

## Phase 3: Templates

- [x] **3.1** `src/components/templates/shared/SectionRenderer.tsx` — Wrap `lang.name` in `<TechIcon name={lang.name} iconKey={lang.iconKey} showDefault={false} />` inside the languages case (lines 236-239); change `<p>` wrapper to use `inline-flex items-center gap-1.5`
- [x] **3.2** `src/components/resume/templates/ModernTemplate.tsx` — Lines 143-145: replace `<span className="font-medium">{lang.name}</span>` with TechIcon + name
- [x] **3.3** `src/components/resume/templates/ClassicTemplate.tsx` — Lines 196-197: restructure from `.join(' • ')` to `.map()` loop rendering each language as `<span className="inline-flex items-center gap-1.5"><TechIcon ... />{l.name} ({l.proficiency})</span>`
- [x] **3.4** `src/components/resume/templates/MinimalTemplate.tsx` — Lines 193-194: add `<TechIcon name={lang.name} iconKey={lang.iconKey} showDefault={false} />` before `{lang.name}`
- [x] **3.5** `src/components/resume/templates/CreativeTemplate.tsx` — Lines 153-154: add TechIcon before `{lang.name}`
- [x] **3.6** `src/components/resume/templates/TechnicalTemplate.tsx` — Lines 142-143: add TechIcon before `{lang.name}: <span>...`
- [x] **3.7** `src/components/resume/preview/ResumePreview.tsx` — Lines 148-151: add TechIcon before `{lang.name}` in the `<span>` wrapper

## Phase 4: Tests

- [x] **4.1** `tests/iconRegistry.test.ts` — Updated: `getIconsByCategory('country-flag')` returns 28+ icons; `autoDetectIcon('Spanish')` resolves to `es`; `autoDetectIcon('English')` resolves to `us`; unknown `'Klingon'` returns undefined; all 28 flag keys are unique
- [x] **4.2** `tests/languageFlags.test.tsx` — Add rendering tests: render ModernTemplate with language `{ name: 'Spanish', proficiency: 'native' }`, assert flag SVG present in DOM; render with `{ name: 'Klingon', proficiency: 'beginner' }`, assert no broken UI; render language with `iconKey: 'fr'`, assert French flag appears regardless of name
- [x] **4.3** `tests/languageFlags.test.tsx` — Add editor tests: render LanguagesForm with languages state; simulate popover open; verify LanguagesForm renders with icon picker trigger

## Phase 5: Verification

- [x] **5.1** Confirm `SoftwareDeveloperTemplate` and `LanguageArc` need no changes (circular chart, no text-row position — out of scope)
- [x] **5.2** Run `pnpm run type-check && pnpm run lint && pnpm test` — verify all pass

### Flag Icons (28 entries for Task 1.2)

Each flag: `key` (ISO alpha-2), `label` (country name), `category: 'country-flag'`, `color: '#666'`, `searchTerms` (language names + country aliases), inline SVG component with 36×24 viewBox, hardcoded national colors.

| # | Key | Flag | Colors | searchTerms |
|---|-----|------|--------|-------------|
| 1 | `us` | US | stripes + blue canton | `['english', 'american english', 'united states', 'usa']` |
| 2 | `es` | Spain | 3 horiz: red, yellow, red | `['spanish', 'español', 'castellano', 'spain']` |
| 3 | `fr` | France | 3 vert: blue, white, red | `['french', 'français', 'france']` |
| 4 | `de` | Germany | 3 horiz: black, red, gold | `['german', 'deutsch', 'germany']` |
| 5 | `it` | Italy | 3 vert: green, white, red | `['italian', 'italiano', 'italy']` |
| 6 | `pt` | Portugal | 2 vert: green, red + shield | `['portuguese', 'português', 'portugal', 'brazil']` |
| 7 | `ru` | Russia | 3 horiz: white, blue, red | `['russian', 'русский', 'russia']` |
| 8 | `jp` | Japan | white + red circle | `['japanese', '日本語', 'japan']` |
| 9 | `cn` | China | red + 5 yellow stars | `['chinese', '中文', 'mandarin', 'china']` |
| 10 | `kr` | South Korea | white + red/blue circle | `['korean', '한국어', 'korea', 'south korea']` |
| 11 | `sa` | Saudi Arabia | green + white text | `['arabic', 'العربية', 'saudi arabia']` |
| 12 | `in` | India | saffron/white/green + wheel | `['hindi', 'हिन्दी', 'india']` |
| 13 | `nl` | Netherlands | 3 horiz: red, white, blue | `['dutch', 'nederlands', 'netherlands']` |
| 14 | `pl` | Poland | 2 horiz: white, red | `['polish', 'polski', 'poland']` |
| 15 | `tr` | Turkey | red + crescent + star | `['turkish', 'türkçe', 'turkey']` |
| 16 | `se` | Sweden | blue + yellow cross | `['swedish', 'svenska', 'sweden']` |
| 17 | `dk` | Denmark | red + white cross | `['danish', 'dansk', 'denmark']` |
| 18 | `no` | Norway | red + blue cross w/ white border | `['norwegian', 'norsk', 'norway']` |
| 19 | `fi` | Finland | white + blue cross | `['finnish', 'suomi', 'finland']` |
| 20 | `gr` | Greece | blue/white stripes + white cross | `['greek', 'ελληνικά', 'greece']` |
| 21 | `il` | Israel | white + 2 blue stripes + star | `['hebrew', 'עברית', 'israel']` |
| 22 | `th` | Thailand | 5 stripes: blue, red, white, red, blue | `['thai', 'ไทย', 'thailand']` |
| 23 | `vn` | Vietnam | red + yellow star | `['vietnamese', 'tiếng việt', 'vietnam']` |
| 24 | `cz` | Czech Republic | white/red + blue triangle | `['czech', 'čeština', 'czech republic']` |
| 25 | `ro` | Romania | 3 vert: blue, yellow, red | `['romanian', 'română', 'romania']` |
| 26 | `hu` | Hungary | 3 horiz: red, white, green | `['hungarian', 'magyar', 'hungary']` |
| 27 | `ua` | Ukraine | 2 horiz: blue, yellow | `['ukrainian', 'українська', 'ukraine']` |
| 28 | `id` | Indonesia | 2 horiz: red, white | `['indonesian', 'bahasa indonesia', 'indonesia']` |
