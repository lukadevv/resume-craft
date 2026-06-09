# Design: Template Layout Shells

## Technical Approach

Replace the 6-component + 4-layout-fallback system with 4 data-driven shells that read `getTemplateDefinition(resume.template)`. Each shell renders A4-fixed output (794×1123px) with the definition's accent color, background gradient, section ordering, and emphasis components. `TechnicalTemplate` and `SoftwareDeveloperTemplate` remain standalone — their terminal/glassmorphism aesthetics don't fit a generic shell.

## Architecture Decisions

### Decision: Data-driven shells over per-template components

| Option | Tradeoff | Decision |
|--------|----------|----------|
| Shells consuming `TemplateDefinition` | One shell per layout type; 23 templates gain full identity | **Chosen** — zero per-template boilerplate |
| Per-template components (current) | 19 templates share 4 generic fallbacks, losing accent/emphasis | Rejected — unscalable |

### Decision: A4 fixed-size, no responsive classes

**Choice**: Root `w-[794px] h-[1123px]`. Font scale `text-[10px]`–`text-xs`. No Tailwind breakpoints.

**Rationale**: Export captures off-screen DOM — responsive classes create mismatches with `html2pdf`. Fixed A4 ensures export fidelity.

### Decision: Emphasis rendered conditionally from definition array

Each shell imports all emphasis components and checks `definition.emphasisComponents.includes(comp)` before rendering. Tree-shaking removes unused imports at build time.

### Decision: Standalone components for `technical` and `softwareDeveloper` only

Two templates have irreducibly unique visuals (terminal window chrome, glassmorphism cards). Forcing them into shells would lose identity — the problem this change solves for the other 23.

## Data Flow

```
Resume.template → getTemplateComponent()
  ├── technical / softwareDeveloper → standalone (unchanged)
  └── all others → layoutType from definition
        ├── two-column → TwoColumnShell (14 templates)
        ├── split       → SplitShell (4 templates)
        ├── single-column → SingleColumnShell (3 templates)
        └── timeline    → TimelineShell (2 templates)
                │
       getTemplateDefinition(resume.template)
         ├── background gradient/overlay → BackgroundLayer
         ├── accentColor → prop to all children
         ├── primarySections[] → main area rendering
         ├── sidebarSections[] → sidebar/timeline panel
         └── emphasisComponents[] → conditional render
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/types/resume.ts` | Modify | Add 17 role-specific array fields (tools, coreCompetencies, achievements, portfolio, awards, affiliations, publications, grantsFellowships, conferences, clinicalSkills, licenses, barAdmission, practiceAreas, securityClearance, teachingPhilosophy, classroomExperience, teachingExperience). Each defaults to `[]`. |
| `src/components/resume/templates/TwoColumnShell.tsx` | Create | Left sidebar (35%) + main (65%). Sidebar reads `sidebarSections`, main reads `primarySections`. |
| `src/components/resume/templates/SplitShell.tsx` | Create | Full-width header, then 45/55 split. Uses BackgroundLayer. |
| `src/components/resume/templates/SingleColumnShell.tsx` | Create | Stacked `primarySections`. Sidebar sections appended after as collapsed. |
| `src/components/resume/templates/TimelineShell.tsx` | Create | Vertical timeline connector through `primarySections`. Sidebar in right panel. |
| `src/components/templates/shared/SkillBars.tsx` | Create | Horizontal bars: `{skills, accentColor, maxItems}`. |
| `src/components/templates/shared/MetricsCallout.tsx` | Create | Numeric KPIs: `{items: {label,value}[], accentColor}`. |
| `src/components/templates/shared/TimelineGraphic.tsx` | Create | Visual connector: `{entries: {date,title}[], accentColor}`. |
| `src/components/templates/shared/CertificationBadge.tsx` | Create | Badge display: `{certs: Certification[], accentColor}`. |
| `src/components/resume/templates/index.ts` | Modify | Export 4 shells + 2 standalones + re-export 6 originals. |
| `src/components/resume/export/ExportMenu.tsx` | Modify | `directComponentMap` keeps 2 standalones. `layoutComponentMap` → `shellComponentMap` pointing to 4 shells. |
| `src/store/resume.ts` | Modify | `createEmptyResume()` defaults for 17 new fields. |
| `tests/components/templates/*Shell.test.tsx` | Create | 4 files — render with mock Resume, assert A4 dimensions, accent color, section ordering, emphasis toggle. |
| `tests/components/shared/EmphasisComponents.test.tsx` | Create | 1 file — render + accent color + empty state for all 4 emphasis components. |

## Interfaces

```typescript
interface TemplateShellProps { resume: Resume; }
// Shells read resume.template internally via getTemplateDefinition()
// Emphasis components: { accentColor: string } base + data props
```

## Testing Strategy

| Layer | What | Approach |
|-------|------|----------|
| Unit (shells) | A4 dimensions, accent propagation, section ordering, emphasis toggle | RTL render mock Resume, assert `style` and section headings |
| Unit (emphasis) | Render with DOM structure, accent color, empty state | RTL render mock data |
| Unit (type) | 17 new fields default to `[]` | Pure function test `createEmptyResume()` |
| Integration | `getTemplateComponent()` routes all 25 IDs correctly | Import + assert component identity |
| Regression | 6 existing templates unchanged | Render test — no DOM changes |

## Migration / Rollout

No migration. New Resume fields are additive (`[]` defaults). Zustand localStorage deserializer handles missing keys automatically. Rollback: revert `getTemplateComponent()` to old `layoutComponentMap`, delete 8 new files.

## Open Questions

- [ ] Proposal says "14 role-specific fields" — `templates.ts` TemplateSection defines 17. Which subset?
- [ ] Should `PlaygroundPreview` be refactored to use shells in this change, or deferred?
