# Resume Craft - AI Architecture

This directory contains the AI infrastructure for building the **Resume Craft** application.

## Project Overview

**Resume Craft** is a Next.js PWA (SSG) resume builder for job seekers with:

- Form-based resume input
- Multiple templates
- AI-powered content suggestions
- Export to PDF/DOCX
- Local storage (no backend required)

## Installed Skills

### Core Framework (from skills.sh)

| Skill                    | Purpose                                           |
| ------------------------ | ------------------------------------------------- |
| `nextjs-ssg`             | Next.js Static Site Generation - SSG only, no SSR |
| `pwa-development`        | Progressive Web App with service workers          |
| `tailwind-design-system` | Tailwind CSS v4 with design tokens                |
| `zustand`                | State management                                  |

### External Skills (global install)

- `nextjs-app-router-patterns` - Next.js App Router patterns
- `nextjs-best-practices` - Next.js best practices

## Structure

```
.opencode/
├── agents/              # AI agents for code tasks
│   ├── analysis/        # Code analysis
│   ├── generation/      # Code generation
│   ├── refactoring/     # Code refactoring
│   └── bugfix/          # Bug fixing
├── skills/              # Domain-specific skills
│   ├── coding/          # Generic coding skills
│   ├── frontend/         # Frontend development
│   └── nextjs-ssg/     # SSG-specific (NEW)
├── prompts/             # Prompt templates
│   ├── coding/          # Code prompts
│   └── frontend/        # Frontend prompts
├── memory/              # Session context management
├── docs/                # Documentation
├── config.ts            # AI configuration
└── index.ts             # Exports
```

## SSG Requirements

> **Important**: This project uses **SSG only** - no SSR or dynamic rendering.

### Allowed

- Static page generation
- Client components (`'use client'`)
- generateStaticParams
- LocalStorage for persistence

### Not Allowed

- Server Actions (`'use server'`)
- `cookies()` or `headers()`
- Dynamic rendering
- ISR revalidation

## Skills Usage

### Next.js SSG

Use `nextjs-ssg` skill for:

- Creating static pages
- Configuring static export
- PWA manifest
- Service workers

### Tailwind CSS

Use `tailwind-design-system` skill for:

- Design tokens and theming
- Component variants with CVA
- Dark mode
- Animations

### Zustand

Use `zustand` skill for:

- Client-side state
- Persistent storage
- Store slices pattern

## Memory

File-based persistent storage for maintaining context across sessions.

## Configuration

Edit `config.ts` to configure:

- LLM provider (openai, anthropic, google, ollama, custom)
- Memory storage type (file, database, memory)
- Agent timeouts and retries

## Development Notes

- All pages are static (generated at build time)
- State stored in localStorage (no backend)
- Use client components only when needed
- Test with `npm run build` before deployment
