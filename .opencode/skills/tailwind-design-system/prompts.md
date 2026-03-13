# Tailwind Design System Skill

Set up Tailwind CSS v4 with design tokens, component variants, and dark mode.

## Installation

```bash
pnpm add tailwindcss @tailwindcss/vite
pnpm add -D @types/node tw-animate-css
pnpm dlx shadcn@latest init
```

## Vite Configuration

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { alias: { '@': path.resolve(__dirname, './src') } }
})
```

## CSS Architecture (4 Steps)

### Step 1: Define CSS Variables

```css
/* src/index.css */
@import "tailwindcss";
@import "tw-animate-css";

:root {
  --background: hsl(0 0% 100%);
  --foreground: hsl(222.2 84% 4.9%);
  --primary: hsl(221.2 83.2% 53.3%);
  --primary-foreground: hsl(210 40% 98%);
  --muted: hsl(210 40% 96.1%);
  --muted-foreground: hsl(215.4 16.3% 46.9%);
  --card: hsl(0 0% 100%);
  --card-foreground: hsl(222.2 84% 4.9%);
  --border: hsl(214.3 31.8% 91.4%);
  --input: hsl(214.3 31.8% 91.4%);
  --ring: hsl(221.2 83.2% 53.3%);
  --radius: 0.5rem;
}

.dark {
  --background: hsl(222.2 84% 4.9%);
  --foreground: hsl(210 40% 98%);
  --primary: hsl(217.2 91.2% 59.8%);
  --primary-foreground: hsl(222.2 47.4% 11.2%);
  --muted: hsl(217.2 32.6% 17.5%);
  --muted-foreground: hsl(215 20.2% 65.1%);
  --card: hsl(222.2 84% 4.9%);
  --card-foreground: hsl(210 40% 98%);
  --border: hsl(217.2 32.6% 17.5%);
  --input: hsl(217.2 32.6% 17.5%);
  --ring: hsl(224.3 76.3% 48%);
}
```

### Step 2: Map Variables to Tailwind

```css
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --radius-sm: calc(var(--radius) - 0.25rem);
  --radius-md: calc(var(--radius) - 0.125rem);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 0.25rem);
}
```

### Step 3: Apply Base Styles

```css
@layer base {
  body {
    background-color: var(--background);
    color: var(--foreground);
  }
  * {
    border-color: var(--border);
  }
}
```

## Dark Mode

Wrap app in ThemeProvider:

```tsx
import { ThemeProvider } from '@/components/theme-provider'

<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
  <App />
</ThemeProvider>
```

## Utility Classes

Use semantic utilities (auto dark mode via CSS variables):

```tsx
// Works in both light and dark mode
<div className="bg-background text-foreground">
  <button className="bg-primary text-primary-foreground hover:bg-primary/90">
    Click me
  </button>
  <div className="text-muted-foreground">Secondary text</div>
  <div className="border-border">Bordered element</div>
</div>
```

## shadcn/ui Components

```bash
pnpm dlx shadcn@latest add button card input form dialog dropdown-menu
```

## Common Errors

| Symptom | Cause | Fix |
|---------|-------|-----|
| bg-primary doesn't work | Missing @theme inline | Add @theme block |
| Colours all black/white | Double hsl() wrapping | Use var(--colour) not hsl(var(--colour)) |
| Dark mode not switching | Missing ThemeProvider | Wrap app in ThemeProvider |
| @apply fails on custom class | v4 breaking change | Use @utility instead |

## Key Rules

- Use @tailwindcss/vite plugin (NOT PostCSS)
- Delete tailwind.config.ts if exists (v4 doesn't use it)
- Put :root/.dark at top level (NOT inside @layer base)
- Use @theme inline to map CSS variables to Tailwind utilities
