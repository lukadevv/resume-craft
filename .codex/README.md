# Codex in this repo

This repo is configured so Codex can work effectively without changing unrelated app code.

## Quick start

- Node version: see `.nvmrc` (project expects **Node 24+**; `package.json` enforces `engines.node >=24`).
- Common commands:
  - `npm run dev`
  - `npm run build`
  - `npm run type-check`
  - `npm run lint`
  - `npm test`

## What to mention in prompts

When asking Codex to do work, include:

- The user-visible goal and acceptance criteria.
- Whether it is a **feature**, **bugfix**, or **refactor**.
- Any constraints that matter (especially the SSG-only rule).
- Which command(s) should pass when done (usually `type-check`, `lint`, `test`).

## Hard constraints for this project

- **SSG-only:** do not introduce Server Actions or SSR-only APIs.
- **Testing is mandatory:** new behavior must have tests in `tests/`.

## Workflows

See:

- `workflows/feature.md`
- `workflows/bugfix.md`
- `workflows/refactor.md`

## Existing standards (OpenCode bridge)

This repo already contains detailed coding/testing standards under `.opencode/`. Codex should treat those as canonical:

- See `opencode-bridge.md`.

## Troubleshooting

- If `npm test` fails with temp-dir write errors, try running with a writable temp directory:
  - `TMPDIR=/tmp TMP=/tmp TEMP=/tmp npm test`

