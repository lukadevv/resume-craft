# OpenCode Bridge (canonical standards)

This repository previously used OpenCode and already has high-quality, project-specific standards.

Codex should **reference these files** instead of re-creating competing standards:

- Project overview and constraints: `.opencode/docs/PROJECT_README.md`
- Coding conventions (TypeScript/React patterns + mandatory testing): `.opencode/skills/coding.md`
- Testing standards (Vitest/RTL patterns): `.opencode/skills/testing.md`

If a Codex task conflicts with these standards, treat the `.opencode/` guidance as the source of truth unless the user explicitly overrides it.

