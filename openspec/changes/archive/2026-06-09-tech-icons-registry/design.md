# Design: Tech Icons Registry Expansion

## Technical Approach

Add 4 icon category files to `src/lib/icons/categories/`, an auto-detection module, and a `TechIcon` component. Integrate icons into every template path that renders skill/technology names — replacing plain text with `flex-shrink-0` icon + text pairs. Graceful fallback: unknown names render nothing.

## Architecture Overview

```
categories/{frameworks,databases,cloud-infra,tools}.ts  (NEW, ~85 icons total)
auto-detect.ts      (NEW: fuzzy name → IconDefinition)
TechIcon.tsx         (NEW: component rendering brand icon)
registry.tsx         (MODIFIED: imports all 5 categories)
SectionRenderer.tsx  (MODIFIED: skills/projects/tools cases)
SkillBars.tsx        (MODIFIED: add icon to bar rows)
5 direct templates   (MODIFIED: per-template integration)
```

## Architecture Decisions

| Decision | Option | Tradeoff | Verdict |
|----------|--------|----------|---------|
| `'use client'` on TechIcon | Yes vs No | Required for dynamic component rendering. All templates already client. | `'use client'` |
| SectionRenderer as multiplier | Modify shared renderer vs each shell | SectionRenderer covers `skills`/`projects`/`tools` → 4 shells. Direct templates still need per-file changes. | Modify SectionRenderer + templates |
| Unknown → null | Return null vs text fallback | Existing label already shows the name. Null avoids duplicate text, broken layout. | `null` |
| SkillDotList integration | Enhance vs defer | Uses separate `getSkillIcon` (lucide). SoftwareDeveloperTemplate groups by category, not individual skills. | Defer |

## Data Flow

```
Template: skill.name="React"
→ <TechIcon name="React" />
  → autoDetectIcon("react")
    1. trim + lowercase → "react"
    2. exact label match (case-insensitive) → IconDefinition found
    3. return { key:'react', color:'#61DAFB', Component:SiReact }
  → getIconComponent('react', className, color) → <SiReact />
```

Match priority: exact label = exact searchTerm > starts-with > includes. Tie-break: shortest label.

## File Map

| File | Action | Icons/Changes |
|------|--------|--------------|
| `categories/frameworks.ts` | Create | 20 icons: React, Angular, Vue, Svelte, Next.js, Nuxt, NestJS, Express, Django, Rails, Spring Boot, Laravel, FastAPI, Flask, Gatsby, Remix, Astro, SolidJS, Qwik, Nx |
| `categories/databases.ts` | Create | 19 icons: PostgreSQL, MySQL, SQLite, MongoDB, Redis, Elasticsearch, Cassandra, MariaDB, Supabase, Firebase, Prisma, DynamoDB, Neo4j, ClickHouse, CockroachDB, PlanetScale, Fauna, Drizzle, SQLAlchemy |
| `categories/cloud-infra.ts` | Create | 16 icons: AWS, Azure, GCP, Cloudflare, Vercel, Netlify, Heroku, DigitalOcean, Railway, Fly.io, Lambda, S3, EC2, GCP Functions, Cloud Run, Firebase |
| `categories/tools.ts` | Create | 30 icons: Git, Docker, Kubernetes, GitHub Actions, GitLab CI, Webpack, Vite, pnpm, npm, Yarn, Gradle, Maven, Terraform, Ansible, VS Code, Neovim, Postman, Figma, ESLint, Prettier, Husky, Nginx, Apache, Grafana, Prometheus, Datadog, Sentry, Jira, Notion, Turbopack |
| `auto-detect.ts` | Create | Exports `autoDetectIcon(name: string): IconDefinition \| undefined` |
| `TechIcon.tsx` | Create | Props: `name`, `className?`, `showLabel?`. Returns null on no match. `aria-label` on icon. |
| `registry.tsx` | Modify | Import+spread 4 new arrays into `allIcons` |
| `SectionRenderer.tsx` | Modify | `skills`: `<span>` pill → `inline-flex` + `<TechIcon w-3.5>`; `projects`: comma-join → flex-wrapped `<TechIcon>` per tech; `tools`: add `<TechIcon>` per item |
| `SkillBars.tsx` | Modify | Add `<TechIcon w-4>` before skill name span |
| `ModernTemplate.tsx` | Modify | Skills pills + projects tech rows |
| `CreativeTemplate.tsx` | Modify | Skills bar labels + projects tech pills |
| `ClassicTemplate.tsx` | Modify | Skills text: `•`-join → icon+label flex rows |
| `MinimalTemplate.tsx` | Modify | Skills `<p>` → flex row per skill; projects: per-tech `<TechIcon>` |
| `TechnicalTemplate.tsx` | Modify | Skills by category: `<TechIcon>` before each `•` item |
| `SoftwareDeveloperTemplate.tsx` | — | Deferred: uses SkillDotList with group-level rendering |

## CSS/Layout Strategy

**Invariant**: `flex-shrink-0 w-4 h-4` (pills: `w-3.5 h-3.5`). Text wraps, icon stays fixed.

```tsx
// Pill (ModernTemplate, SectionRenderer skills):
<span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border">
  <TechIcon name={skill.name} className="flex-shrink-0 w-3.5 h-3.5" />
  {skill.name}
</span>

// Row (ClassicTemplate, MinimalTemplate):
<div className="flex items-center gap-1.5">
  <TechIcon name={skill.name} className="flex-shrink-0 w-4 h-4" />
  <span className="text-xs">{skill.name}</span>
</div>
```

## Test Strategy

| Layer | What | Where |
|-------|------|-------|
| Unit | `autoDetectIcon`: exact, searchTerm, substring, empty, no-match, tie-break | `tests/auto-detect.test.ts` |
| Unit | `TechIcon`: renders icon, returns null, `showLabel`, `aria-label`, `flex-shrink-0` | `tests/components/ui/TechIcon.test.tsx` |
| Integration | Registry: 5 categories in `getAllIcons()`, no duplicates, category filter works | Extend `tests/iconRegistry.test.ts` |
| Integration | Templates render icons without layout regression | Per-template assertions in existing shell tests |

## Open Questions

- [ ] Enhance `SkillDotList` to use `TechIcon` as fallback? (Deferred — separate icon system.)
- [ ] PDF/DOCX export: embed SVGs or skip? (Current: render as-is; SVGs work in browser-based export.)
