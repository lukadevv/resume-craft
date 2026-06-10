# Design: Language Country Flag Icons

## Technical Approach

Add a `country-flag` icon category with inline SVG components, extend the `Language` type with optional `iconKey`, integrate IconPicker into `LanguagesForm`, and render flags via `TechIcon` in all template language sections. Mirrors the existing skill-icon pattern exactly.

## Architecture Decisions

| # | Choice | Rationale |
|---|--------|-----------|
| 1 | Inline SVG components (not `react-icons`) | No npm dependency; simple geometric flags (~300 bytes each); existing categories already use inline SVGs for react-icons — same ComponentType contract |
| 2 | `iconKey?: string` on Language, mirroring `Skill.iconKey` | Consistent data model; `TechIcon` already handles `iconKey || autoDetect`; optional field means zero migration for existing localStorage data |
| 3 | Flag colors hardcoded in SVG `fill` attributes, not via `IconDefinition.color` | Flags must show true national colors, not get tinted; `color` field acts as CSS fallback only |
| 4 | Auto-detect via existing `autoDetectIcon()` + `searchTerms` | No new lookup code needed; language names like `"Spanish"` go into searchTerms of the ES flag; `findIconKeyByLabel` in registry maps labels+terms → keys |
| 5 | `showLabel` on TechIcon for template use | `showLabel={true}` renders `inline-flex` wrapper with icon + name; one component call replaces both icon and text |

## Data Flow

```
LanguagesForm                  Zustand store                 Template render
┌──────────────┐    onUpdate   ┌──────────────┐   subscribe  ┌──────────────────┐
│ IconPicker → │──────────────→│ languages[]   │─────────────→│ SectionRenderer   │
│ iconKey      │               │ .iconKey      │              │ / Modern / etc.   │
│ Popover      │               └──────────────┘              │ TechIcon({        │
│ category=    │                     │                       │   name=lang.name, │
│ country-flag │              localStorage                   │   iconKey,        │
└──────────────┘                     │                       │   showLabel       │
                                     ▼                       │ })                │
                              ┌──────────────┐              └──────────────────┘
                              │ resume-craft-│                     │
                              │ storage      │          autoDetectIcon(name)
                              └──────────────┘              if !iconKey
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/types/resume.ts` | Modify | Add `iconKey?: string` to `Language` (line 73) |
| `src/lib/icons/categories/country-flags.ts` | **Create** | ~28 `IconDefinition[]` entries with inline SVG components; keys use ISO 3166 (e.g. `us`, `es`, `fr`); searchTerms include language names in English, native names, country aliases |
| `src/lib/icons/registry.tsx` | Modify | Import + spread `countryFlagIcons` into `allIcons` (lines 5, 9-15); `labelByKey` auto-populated |
| `src/components/resume/editor/LanguagesForm.tsx` | Modify | Add Popover + IconPicker column per row (ported from SkillsForm lines 69-105); `category="country-flag"` on IconPicker; "Auto-detect from name" button when `iconKey` set; `updateLanguage` extended to accept `'iconKey'` field |
| `src/components/templates/shared/SectionRenderer.tsx` | Modify | Languages case (lines 236-239): wrap `lang.name` in `<TechIcon name={lang.name} iconKey={lang.iconKey} showLabel />` inside a `<span className="inline-flex items-center gap-1.5">` |
| `src/components/resume/templates/ModernTemplate.tsx` | Modify | Line 143-145: replace plain `<span>{lang.name}</span>` with TechIcon pattern |
| `src/components/resume/templates/ClassicTemplate.tsx` | Modify | Line 197: restructure from `.join(' • ')` to JSX `.map()` loop with `<TechIcon>` per language; this is the only template that needs structural change |
| `src/components/resume/templates/MinimalTemplate.tsx` | Modify | Line 193-194: add TechIcon before `{lang.name}` |
| `src/components/resume/templates/CreativeTemplate.tsx` | Modify | Line 153-154: add TechIcon before `{lang.name}` |
| `src/components/resume/templates/TechnicalTemplate.tsx` | Modify | Line 142-143: add TechIcon before `{lang.name}` |
| `src/components/resume/preview/ResumePreview.tsx` | Modify | Line 149-151: add TechIcon before `{lang.name}` |
| `tests/iconRegistry.test.ts` | Modify | Line 47-50: change `toEqual([])` to expect `> 0`; add `country-flag` to "all 5 categories" test (line 293) → "all 6 categories" |
| `tests/languageFlags.test.tsx` | **Create** | Rendering tests (flag appears, no flag for unknown, auto-detect Spanish→es), editor tests (icon picker opens, selecting sets iconKey), localStorage backward compat |

## Flag SVG Strategy

- Every flag is a functional React component: `(props) => <svg viewBox="0 0 36 24" {...props}>...</svg>` with hardcoded `fill` colors on `<rect>`, `<circle>`, `<polygon>` elements
- ViewBox: 36×24 (3:2 ratio, standard flag proportion)
- **Color approach**: SVG fills carry true colors (e.g. French tricolor: `#002395`, `#FFFFFF`, `#ED2939`). `IconDefinition.color` set to `'#666'` as neutral fallback — never tints the flag
- **Naming**: Keys use ISO 3166-1 alpha-2 lowercase: `us`, `gb`, `de`, `fr`, `es`, `it`, `pt`, `br`, `ru`, `cn`, `jp`, `kr`, `in`, `ar`, `mx`, `nl`, `se`, `pl`, `tr`, `sa`, `ae`, `eg`, `za`, `ng`, `ph`, `vn`, `th`, `id`
- **searchTerms** for each: language name(s) in English + countries where it's spoken. E.g. `es` → `['spanish', 'español', 'castellano', 'spain', 'españa']`; `pt` → `['portuguese', 'português', 'portugal', 'brazil', 'brasil']`

## Template Integration Pattern

```
<span className="inline-flex items-center gap-1.5">
  <TechIcon name={lang.name} iconKey={lang.iconKey} showDefault={false} />
  <span>{lang.name}</span>
</span>
```

`showDefault={false}` prevents Wrench fallback for unknown languages (no flag = no broken UI). Applies identically to all 7 render locations (SectionRenderer + 5 templates + ResumePreview).

## Testing Strategy

| Layer | What | Approach |
|-------|------|----------|
| Unit | Registry includes country-flag | Update `iconRegistry.test.ts`: `getIconsByCategory('country-flag')` returns 28+, merge test covers 6 categories |
| Unit | autoDetectIcon maps language → flag | Test `autoDetectIcon('Spanish')` resolves to `es`, `autoDetectIcon('English')` to `us`, unknown `'Klingon'` returns undefined |
| Component | Flag renders in template language rows | New `languageFlags.test.tsx`: render templates with language array, assert flag SVG present, assert text still visible |
| Component | Editor icon picker | IconPicker popover opens, selecting flag sets iconKey, reset clears to undefined |
| Integration | localStorage backward compat | Language objects without `iconKey` render with auto-detect; existing stored data unaffected |
