# Resume Craft 🎯

> A highly customizable resume builder with professional templates for creating stunning CVs. Built as a **static** Progressive Web App — no backend, no server, just your browser.

![CI](https://github.com/lukadevv/resume-craft/actions/workflows/ci.yml/badge.svg)
![License](https://img.shields.io/badge/license-MIT-blue)
![Node](https://img.shields.io/badge/node-%3E%3D24-brightgreen)
![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen)

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎨 **25 Templates** | 5 base layouts + 20 role-specific designs (Software Developer, Data Scientist, Lawyer, Nurse, Executive, and more) |
| 📄 **4 Layout Types** | Single-column, two-column, split, and timeline |
| 🌙 **Dark Mode** | Full light/dark theme support |
| 📤 **Export Formats** | PDF, DOCX, HTML, JSON, Plain Text |
| 📱 **PWA** | Installable on mobile/desktop, works offline |
| 💾 **Local Storage** | All data stays in your browser — no account needed |
| 🧭 **Wizard** | Step-by-step guided resume creation |
| 🔄 **CRUD** | Create, duplicate, edit, and delete resumes |
| 🏷️ **Role-Specific Fields** | Custom sections for different professions (publications, clinical skills, bar admission, security clearance, etc.) |
| 🖼️ **Tech Icon Registry** | Auto-detected technology icons for skills |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, SSG) |
| **UI Library** | [React 19](https://react.dev/) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) (via `@tailwindcss/vite`) |
| **State** | [Zustand 5](https://zustand.docs.pmnd.rs/) with localStorage persistence |
| **UI Primitives** | [Radix UI](https://www.radix-ui.com/) + [class-variance-authority](https://cva.style/) |
| **Icons** | [Lucide React](https://lucide.dev/) + [React Icons](https://react-icons.github.io/react-icons/) |
| **PDF Export** | [jsPDF](https://github.com/parallax/jsPDF) + [html2canvas-pro](https://github.com/niklasvh/html2canvas-pro) |
| **Dark Mode** | [next-themes](https://github.com/pacocoursey/next-themes) |
| **Package Manager** | [pnpm](https://pnpm.io/) (exact versions) |
| **Testing** | [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) |
| **Linting** | ESLint + Prettier |
| **Git Hooks** | Husky + Commitlint (conventional commits) |
| **CI** | GitHub Actions (`type-check` → `lint` → `test`) |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 24 (check `.nvmrc`)
- **pnpm** >= 9 (install with `npm install -g pnpm`)

### Install

```bash
git clone https://github.com/lukadevv/resume-craft.git
cd resume-craft
pnpm install
```

### Development

```bash
pnpm run dev
```

Opens at [http://localhost:3000](http://localhost:3000).

### Build

```bash
pnpm run build
```

Generates a fully static export in `out/`.

### Preview Production Build

```bash
pnpm run start
```

---

## 📋 Available Commands

| Command | Purpose |
|---|---|
| `pnpm run dev` | Start development server |
| `pnpm run build` | Static export to `out/` |
| `pnpm run start` | Serve the production build |
| `pnpm run type-check` | Run TypeScript type checking (`tsc --noEmit`) |
| `pnpm run lint` | Run ESLint |
| `pnpm test` | Run all tests (Vitest) |
| `pnpm run test:watch` | Run tests in watch mode |
| `pnpm run gen:icons` | Generate PWA icons |

CI runs: **type-check** → **lint** → **test** (in that order).

---

## 🗺️ Routes

| Route | Type | Description |
|---|---|---|
| `/` | Static | Landing page with hero, features, and template showcase |
| `/create` | Client | Create a new resume from scratch |
| `/resume/[id]` | Client | View or edit a specific resume |
| `/resume/edit` | Client | Edit resume form |
| `/resume/wizard` | Client | Step-by-step guided resume creation |
| `/my-resumes` | Client | List and manage all your resumes |
| `/templates` | Client | Browse all 25 available templates |

> All resume pages are client-only — data lives in `localStorage`, no backend required.

---

## 🏗️ Architecture

```
src/
├── app/               Next.js App Router pages
│   ├── create/        Create resume flow
│   ├── resume/        View, edit, and wizard
│   ├── my-resumes/    Resume list
│   ├── templates/     Template browser
│   ├── layout.tsx     Root layout (fonts, theme provider)
│   └── page.tsx       Landing page
├── components/        UI and feature components
│   ├── landing/       Landing page sections
│   ├── layout/        Header, Footer
│   ├── resume/        Resume display components
│   ├── templates/     Template cards and renderers
│   ├── theme/         Dark mode toggle and provider
│   ├── ui/            Reusable UI primitives
│   └── wizard/        Guided creation wizard
├── lib/               Utilities, export, templates
│   ├── export/        resume-export.ts (Text, HTML, JSON, PDF, DOCX)
│   ├── icons/         Tech icon registry
│   ├── templates.ts   25 template definitions
│   └── utils.ts       Shared utilities
├── store/             Zustand store (single store, localStorage)
├── styles/            globals.css (Tailwind v4 theme)
├── types/             TypeScript interfaces
└── utils/             Date, string, random helpers

tests/                 Vitest tests
```

### Key Design Decisions

- **Static Export Only** — `next.config.ts` sets `output: 'export'`. No `'use server'`, `cookies()`, or `headers()`.
- **Single Zustand Store** — `src/store/resume.ts` manages all resume CRUD, persisted to `localStorage` under `resume-craft-storage`.
- **25 Templates** — 5 base templates (Modern, Classic, Minimal, Creative, Technical) + 20 role-based templates for specific professions.
- **Path Alias** — `@/` maps to `./src/*` (works in tests too).

---

## 🧩 Templates

### Base Templates

| Template | Layout | Best For |
|---|---|---|
| **Modern** | Two-column | General purpose, clean design |
| **Classic** | Timeline | Traditional, formal roles |
| **Minimal** | Single-column | Recruiters who love whitespace |
| **Creative** | Split | Design and creative roles |
| **Technical** | Two-column | Engineering and IT roles |

### Role-Based Templates (20)

Software Developer, Data Scientist, UX/UI Designer, Graphic Designer, Product Manager, Project Manager, Marketing Manager, Sales Executive, Accountant, Nurse/Healthcare, Teacher/Educator, Academic/Researcher, Lawyer/Attorney, Engineer, Executive/C-Level, HR/Recruiter, Management Consultant, IT Support, Military Transition, Federal/Government.

Each template features role-specific sections (e.g., `clinicalSkills` for healthcare, `barAdmission` for lawyers, `securityClearance` for military transition).

---

## 🧪 Testing

```bash
pnpm test          # Run all tests
pnpm run test:watch  # Watch mode
```

Tests live in `tests/` and use Vitest with `jsdom` environment and `@/` path alias. Setup file at `tests/setup.ts`.

---

## 🤝 Contributing

PRs are welcome! Please keep changes small and targeted.

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Commit using [conventional commits](https://www.conventionalcommits.org/)
4. Push and open a PR

All PRs run: `type-check` → `lint` → `test`. Make sure they pass.

---

## 📄 License

[MIT](LICENSE) © 2026 [Luka](https://github.com/lukadevv)
