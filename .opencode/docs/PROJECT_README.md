# Resume Craft - AI Architecture

This directory contains AI infrastructure for building **Resume Craft**, a Next.js SSG PWA.

## Project Overview

A resume builder app for job seekers:

- Form-based resume input
- Multiple templates
- Export to PDF/DOCX
- Local storage (no backend)
- PWA (installable, works offline)

## Tech Stack

- **Next.js** - SSG only (no SSR)
- **React** - UI framework
- **Tailwind CSS** - Styling
- **Zustand** - State management (localStorage)
- **TypeScript** - Type safety

## Routes

| Route          | Type   | Description         |
| -------------- | ------ | ------------------- |
| `/`            | Static | Landing page        |
| `/create`      | Client | Create new resume   |
| `/resume/[id]` | Client | View/edit resume    |
| `/my-resumes`  | Client | List user's resumes |
| `/privacy`     | Static | Privacy policy      |
| `/terms`       | Static | Terms of use        |

> **Note:** All resume pages are client-only (stored in localStorage). No backend required.

## Installed Skills

### Core Skills (local)

| Skill                     | Purpose                              |
| ------------------------- | ------------------------------------ |
| `coding.md`               | TypeScript, React, project structure |
| `testing.md`              | Unit testing with Vitest             |
| `qa-testing/`             | E2E testing with Playwright          |
| `pwa-development/`        | Service workers, manifest, offline   |
| `tailwind-design-system/` | Tailwind v4, dark mode, theming      |
| `zustand/`                | State management, persistence        |
| `image-processing/`       | Profile photo processing             |
| `conventions/`            | jsdoc, naming conventions            |

### Frontend Skills

| Skill                     | Purpose                                 |
| ------------------------- | --------------------------------------- |
| `frontend/ui/`            | Component patterns, responsive design   |
| `frontend/nextjs-ssg/`    | Static generation, generateStaticParams |
| `frontend/seo/`           | Meta tags, Open Graph                   |
| `frontend/accessibility/` | a11y best practices                     |
| `frontend/performance/`   | Core Web Vitals                         |
| `frontend/testing/`       | Component testing                       |

## Directory Structure

```
.opencode/
├── agents/
│   └── orchestrator.md           # Task routing
├── skills/
│   ├── coding.md                  # Coding standards
│   ├── testing.md                 # Unit testing
│   ├── qa-testing/               # E2E testing
│   ├── pwa-development/          # PWA features
│   ├── tailwind-design-system/    # Tailwind v4
│   ├── zustand/                  # State management
│   ├── image-processing/         # Photo handling
│   ├── conventions/              # jsdoc, naming
│   └── frontend/
│       ├── ui/
│       ├── nextjs-ssg/
│       ├── seo/
│       ├── accessibility/
│       ├── performance/
│       └── testing/
├── prompts/
│   ├── base.md
│   ├── coding/
│   └── frontend/
└── docs/
    ├── PROJECT_README.md          # This file
    └── README.md
```

## How to Use Skills

### Starting a Task

1. **Describe what you need** - OpenCode will route to appropriate skill
2. **Skill auto-loads** - Based on keywords in your request

### Example Prompts

```
"Add a new form field for work experience"
→ Uses: zustand, frontend/ui

"Make the app work offline"
→ Uses: pwa-development

"Add a new resume template"
→ Uses: tailwind-design-system, frontend/ui

"Fix the login bug"
→ Uses: qa-testing, coding

"Add tests for the resume form"
→ Uses: testing, qa-testing
```

## SSG Requirements

> **Important:** This project uses SSG only.

### Allowed

- Static page generation
- Client components (`'use client'`)
- `generateStaticParams`
- LocalStorage for persistence

### Not Allowed

- Server Actions (`'use server'`)
- `cookies()` or `headers()`
- Dynamic rendering
- ISR revalidation

## Development Commands

```bash
# Development
npm run dev

# Build (SSG)
npm run build

# Test
npm test

# E2E tests
npm run test:e2e
```

## Configuration

No special config needed. OpenCode automatically:

- Loads skills from `.opencode/skills/`
- Routes tasks to appropriate agents
- Uses TypeScript/React patterns from skills
