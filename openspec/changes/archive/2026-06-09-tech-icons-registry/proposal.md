# Proposal: Tech Icons Registry Expansion

## Intent

Technology lists in resume templates render as plain text — no visual differentiation. Add 4 icon categories (framework, database, cloud, tool) with brand icons auto-detected by name. Icons appear automatically alongside every technology reference.

## Scope

### In Scope
- 4 category files (~65 icons, `react-icons/si`): `framework`, `database`, `cloud`, `tool`
- Auto-detection API (`autoDetectIcon`) — fuzzy, case-insensitive, returns best match
- `TechIcon` component — fixed-size icon (`w-4 h-4 flex-shrink-0`) + optional label
- Template integration across 11 files (5 templates, 4 shells, 1 shared renderer)
- Registry aggregate of all 5 categories

### Out of Scope
- `country-flag` and `design` categories (deferred)
- IconPicker modifications; user-facing icon browser

## Capabilities

### New Capabilities
- **tech-icons-registry**: 4 new categories (framework, database, cloud, tool) in the existing icon registry
- **tech-icon-auto-detect**: `autoDetectIcon(name)` → `IconDefinition | undefined`
- **tech-icon-display**: `TechIcon` component for brand icon + label in templates

### Modified Capabilities
- None (additive — no existing spec changes)

## Approach

1. **Category files** — Follow `programming-languages.ts` pattern: `IconDefinition[]` with key, label, `Si*` component, color, searchTerms. Create at `src/lib/icons/categories/`.
2. **Auto-detect** — `src/lib/icons/auto-detect.ts`: match name against all icons' labels + searchTerms (case-insensitive partial), return best match or undefined.
3. **TechIcon** — `src/components/ui/TechIcon.tsx`: call `autoDetectIcon` → render via `getIconComponent`. Icon `w-4 h-4 flex-shrink-0`, text wraps. `showLabel` toggle.
4. **Registry** — Spread new arrays into `src/lib/icons/registry.tsx`.
5. **Templates** — Replace plain text with `<TechIcon>` in 11 files across templates, shells, and `SectionRenderer`.

## Affected Areas

| Area | Impact |
|------|--------|
| `src/lib/icons/categories/` | New 4 files |
| `src/lib/icons/auto-detect.ts` | New |
| `src/lib/icons/registry.tsx` | Modified |
| `src/components/ui/TechIcon.tsx` | New |
| `src/components/resume/templates/` | Modified 5 templates |
| `src/components/resume/templates/*Shell.tsx` | Modified 4 shells |
| `src/components/templates/shared/SectionRenderer.tsx` | Modified |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Layout regressions in 11 template files | Medium | Incremental per-template changes, build check each step |
| Name mismatch (e.g. "postgres" ↔ "PostgreSQL") | Medium | Rich searchTerms + fuzzy partial matching |
| Missing `react-icons/si` icon | Low | Graceful fallback — TechIcon renders text-only |

## Rollback Plan

Revert registry imports + template changes. New files are inert if not imported. Zero impact on existing code.

## Dependencies

- None (uses already-installed `react-icons/si`)

## Success Criteria

- [ ] 4 categories load via `getAllIcons()` and `getIconsByCategory()`
- [ ] `autoDetectIcon("react")` → match; `autoDetectIcon("unknown")` → undefined
- [ ] TechIcon renders icon+label; label-only fallback for unknown tech
- [ ] 11 templates show icons without layout breaks
- [ ] `pnpm test` passes (auto-detect + TechIcon tests)
- [ ] `pnpm run build` succeeds
