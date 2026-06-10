# Proposal: Language Country Flag Icons

## Intent

Languages in resume templates render as plain text — no visual differentiation. Add country flag icons to the languages section, auto-detected by language name with manual override. Mirrors the existing skill-icon pattern: flag appears left of name, auto-detected by default, user can pick a different flag or clear to auto-detect.

## Scope

### In Scope
- `country-flag` icon category (~28 flags) at `src/lib/icons/categories/country-flags.ts`
- `Language.iconKey?: string` on the type (mirrors `Skill.iconKey`)
- Icon picker in `LanguagesForm` (Popover + IconPicker ported from SkillsForm pattern)
- Flag rendering in `SectionRenderer` languages case + 5 standalone template language sections
- Registry test update (country-flag no longer returns `[]`)

### Out of Scope
- Flag rendering in SoftwareDeveloperTemplate's LanguageArc (circular chart, no text-row position)
- Emoji fallback; PDF export flag consistency (html2pdf handles SVG same as existing icons)
- Language-to-flag mapping for edge cases with subnational flags (Catalan → ES, not unique flag)

## Capabilities

### New Capabilities
- **language-flag-display**: Country flag icons rendered alongside language names in templates
- **language-icon-editor**: Icon picker in LanguagesForm for manual flag selection/override per language

### Modified Capabilities
- **tech-icons-registry**: Adding `country-flag` category with ~28 flag `IconDefinition[]` entries
- **tech-icon-auto-detect**: R6 scope expands from "5 categories" to cover `country-flag` as well

## Approach

1. **Types** — Add `iconKey?: string` to `Language` interface (`src/types/resume.ts`). Exactly mirrors `Skill.iconKey`.
2. **Flag icons** — `src/lib/icons/categories/country-flags.ts`: `IconDefinition[]` with inline SVG components (no `react-icons` dependency for flags — not covered by `si`). Each entry: `key` (ISO 3166-1 alpha-2), `label` (country name), `color` (accent), `searchTerms` (language name + country aliases). 28 flags covering common resume languages.
3. **Registry** — Import + spread `countryFlagIcons` into `src/lib/icons/registry.tsx`. `autoDetectIcon` works immediately via existing label/searchTerms matching.
4. **Editor** — `LanguagesForm.tsx`: Add Popover + IconPicker column per language row, ported from SkillsForm pattern. IconPicker filtered to `category="country-flag"`. "Auto-detect from name" reset button when `iconKey` is set.
5. **Templates** — Replace plain-text `<span>{lang.name}</span>` with `<TechIcon name={lang.name} iconKey={lang.iconKey} showLabel />` in:
   - `SectionRenderer.tsx` languages case (used by all 4 shell templates)
   - 5 standalone templates: Modern, Classic, Minimal, Creative, Technical
   - SoftwareDeveloperTemplate: no change (LanguageArc circular chart)
6. **Tests** — Add `tests/languageFlags.test.tsx` (rendering, auto-detect, editor picker). Update `tests/iconRegistry.test.ts` line 47-50.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/types/resume.ts` | Modified | Add `iconKey?: string` to `Language` |
| `src/lib/icons/categories/country-flags.ts` | New | ~28 flag `IconDefinition[]` |
| `src/lib/icons/registry.tsx` | Modified | Import + spread countryFlagIcons |
| `src/components/resume/editor/LanguagesForm.tsx` | Modified | Add icon picker column |
| `src/components/templates/shared/SectionRenderer.tsx` | Modified | Wrap lang name in TechIcon |
| `src/components/resume/templates/ModernTemplate.tsx` | Modified | Flag icon in language row |
| `src/components/resume/templates/ClassicTemplate.tsx` | Modified | Flag icon in language row |
| `src/components/resume/templates/MinimalTemplate.tsx` | Modified | Flag icon in language row |
| `src/components/resume/templates/CreativeTemplate.tsx` | Modified | Flag icon in language row |
| `src/components/resume/templates/TechnicalTemplate.tsx` | Modified | Flag icon in language row |
| `tests/iconRegistry.test.ts` | Modified | country-flag assertion (line 47-50) |
| `tests/languageFlags.test.tsx` | New | Flag rendering + editor tests |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Inline SVG flags bloat bundle | Low | ~28 flags × ~300 bytes each ≈ 8.4KB gzipped. Acceptable for SSG. |
| Ambiguous language→flag mapping (English→US/UK) | Medium | Default to sensible choice (English→US), user can override via picker |
| LanguageArc in SoftwareDeveloperTemplate breaks if modified | Low | Exclude that template from scope — no flag needed in circular chart |
| IconPicker re-renders on every keystroke | Low | Existing `useMemo` with `searchIcons` already handles this efficiently |

## Rollback Plan

Remove `iconKey` from Language type, revert LanguagesForm to pre-icon state, remove country-flags category file + registry import. Templates fall back to plain text if TechIcon receives no iconKey and auto-detect returns undefined. No data migration needed — unknown `iconKey` values are inert.

## Dependencies

- None (no new npm packages; inline SVG flags)

## Success Criteria

- [ ] `getIconsByCategory('country-flag')` returns 28+ flag icons
- [ ] `autoDetectIcon('Spanish')` resolves to ES flag; `autoDetectIcon('English')` resolves to US flag
- [ ] LanguagesForm shows flag icon picker with country-flag category filter
- [ ] User can override flag (iconKey) or reset to auto-detect
- [ ] SectionRenderer + 5 templates show flag left of language name
- [ ] Unknown language name shows no flag (no broken UI)
- [ ] `pnpm test` passes with new tests
- [ ] `pnpm run build` succeeds (static export)

## Estimated Size

~600 lines total: flag definitions (~350), editor (~60), template integration (~40), type change (~2), registry (~3), tests (~150).
