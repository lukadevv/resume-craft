# AI Architecture

This directory contains the AI infrastructure for the project.

## Structure

```
.opencode/
├── agents/           # AI agents for code tasks
├── skills/           # Domain-specific skills
├── prompts/         # Prompt templates
├── memory/          # Context & memory management
├── docs/            # Documentation
└── config.ts        # Configuration
```

## Agents

- **Analysis Agent** - Analyzes code structure
- **Generation Agent** - Generates new code
- **Refactoring Agent** - Refactors existing code
- **Bugfix Agent** - Fixes bugs

## Skills

### Coding Skills

- `analyze` - Analyze code
- `generate` - Generate code
- `refactor` - Refactor code
- `fix` - Fix bugs

### Frontend Skills

- `ui` - UI development (TailwindCSS, CSS animations)
- `seo` - SEO optimization (JSON-LD, metadata)
- `nextjs-ssg` - Next.js SSG
- `accessibility` - Accessibility (a11y)
- `performance` - Performance optimization
- `state` - State management (Zustand)
- `testing` - Testing (Vitest)

## Memory

File-based persistent storage for maintaining context across sessions.

## Configuration

Edit `config.ts` to configure the LLM provider and other settings.
