# Resume Craft - AI Skills

This folder contains AI skills and agents for building the Resume Craft application.

## Installed Skills

### Framework Skills

- **nextjs-ssg** - Next.js Static Site Generation (SSG) for PWA
- **pwa-development** - Progressive Web App development
- **tailwind-design-system** - Tailwind CSS v4 design system

### State Management

- **zustand** - Zustand state management

## Project Structure

```
.opencode/
├── agents/           # AI agents for code tasks
├── skills/           # Domain-specific skills (this folder)
│   ├── coding/       # Code generation/modification
│   ├── frontend/    # Frontend development
│   └── nextjs-ssg/  # Next.js SSG (NEW)
├── prompts/          # Prompt templates
├── memory/           # Context & memory management
├── config.ts        # Configuration
└── index.ts         # Exports
```

## Usage

These skills are loaded by the AI coding assistant to help build the Resume Craft application:

- Next.js PWA with SSG
- Form-based resume input
- Multiple templates
- Export to PDF/DOCX
- Local storage (no backend)
