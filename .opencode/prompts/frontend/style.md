# Visual Design Style Guide

## Project Overview

A modern web-based Resume (CV) Maker that allows users to create highly customizable, professional resumes directly in the browser. The platform is designed for job seekers, students, and professionals who want full control over the layout, style, and content of their resumes without needing design skills.

The interface focuses on clarity, ease of use, and live customization, allowing users to quickly modify sections, typography, colors, and layout while previewing their resume in real time. The design combines modern SaaS aesthetics with a clean, professional look suitable for career-focused tools.

The goal is to provide a fast, intuitive editing experience with powerful customization options, while keeping the interface minimal and distraction-free so users can focus on building high-quality resumes.

---

## Color Palette

### Primary Colors

* Brand/Accent: #3ECF8E - Main action buttons, links, highlights
* Brand Hover: #2EB67D - Hover states for brand elements

### Gradient Accent

* Gradient Start: #16A085
* Gradient End: #3ECF8E
* Gradient Usage: linear-gradient(90deg, #16A085 0%, #3ECF8E 100%)

### Neutral Colors (Light Mode)

* Background: #FFFFFF - Page background
* Surface: #F7FAFC - Cards, modals, dropdowns
* Text Primary: #0F1724 - Main body text, headings
* Text Secondary: #52606D - Subtitles, captions, placeholder text
* Borders: #E6EDF2 - Input borders, dividers

### Semantic Colors

* Success: #22C55E - Success messages, confirmations
* Warning: #F59E0B - Warnings, alerts
* Error: #EF4444 - Error messages, destructive actions

### Dark Mode

* Background: #0B1220
* Surface: #0F1724
* Text Primary: #E6EEF5
* Text Secondary: #9DB4C2
* Borders: rgba(255,255,255,0.06)

---

## Typography

### Font Family

* Headings: Inter
* Body: Inter
* Monospace: JetBrains Mono

### Font Sizes

* Display: 56px - Hero text, large headlines
* H1: 36px - Page titles
* H2: 28px - Section headings
* H3: 20px - Card headings
* Body: 16px - Default text
* Small: 14px - Captions, metadata
* XS: 12px - Labels, tags

### Font Weights

* Regular: 400
* Medium: 500
* Semibold: 600
* Bold: 700

---

## Spacing System

### Base Unit

* Base: 8px

### Spacing Scale

* xs: 4px
* sm: 8px
* md: 16px
* lg: 24px
* xl: 32px
* 2xl: 48px
* 3xl: 64px

---

## Visual Effects

### Border Radius

* sm: 4px - Small elements, tags
* md: 8px - Buttons, inputs
* lg: 12px - Cards
* xl: 16px - Modals
* full: 9999px - Pills, avatars

### Shadows

* sm: 0 1px 2px rgba(12,22,30,0.04)
* md: 0 6px 20px rgba(12,22,30,0.08)
* lg: 0 20px 40px rgba(8,12,18,0.18)
* xl: 0 30px 60px rgba(8,12,18,0.25)

### Glass Effect

* backdrop-filter: blur(6px)
* background overlay (dark mode): rgba(255,255,255,0.04)

### Animations

* Default transition: 150ms ease
* Hover effects: transform translateY(-2px) scale(1.02) with subtle shadow increase
* Focus effects: box-shadow 0 0 0 4px rgba(62,207,142,0.12)
* Page transitions: fade-in 200ms

---

## Component Styles

### Buttons

Primary

* Background: linear-gradient(90deg, #16A085 0%, #3ECF8E 100%)
* Text color: #FFFFFF
* Border radius: 8px
* Hover: slight elevation and brightness increase

Secondary

* Background: #FFFFFF
* Text color: #0F1724
* Border: 1px solid #E6EDF2
* Hover background: #F1F7FA

Ghost

* Background: transparent
* Text color: #16A085
* Hover background: rgba(16,160,140,0.06)

Destructive

* Background: #EF4444
* Text color: #FFFFFF

---

### Cards

* Background: #FFFFFF
* Border: 1px solid #E6EDF2
* Shadow: md
* Padding: 16px or 24px depending on density
* Border radius: 12px

Dark Mode Cards

* Background: #0F1724
* Border: rgba(255,255,255,0.06)

---

### Forms

* Input height: 40px
* Input padding: 0 12px
* Border radius: 8px
* Border color: #CBD9E0
* Focus border: #3ECF8E
* Focus ring: box-shadow 0 0 0 4px rgba(62,207,142,0.12)
* Placeholder color: #9AA6B2
* Label style: font-weight 500, font-size 14px, color #52606D

---

### Navigation

* Header height: 72px

Nav Item

Default

* Font size: 16px
* Font weight: 500
* Color: #0F1724

Hover

* Teal accent underline or subtle highlight

Active

* Gradient accent or filled pill highlight

Mobile Navigation

* Slide-out drawer from left
* Backdrop blur enabled

---

### Icons

Library: Lucide React
Default size: 24px
Stroke width: 2
Color: inherit from parent text

Import example:

import { Home, Settings, User } from "lucide-react"

---

## Layout

### Container

* Max width: 1280px
* Horizontal padding: 24px desktop
* Horizontal padding mobile: 16px
* Center aligned

### Grid

* Columns: 12 column grid
* Gap: 24px
* Mobile gap: 16px

### Breakpoints

* sm: 640px
* md: 768px
* lg: 1024px
* xl: 1280px
* 2xl: 1536px

---

## Dark Mode

### Implementation

Use CSS variables with a `.dark` class.

Example:

:root {
--bg: #ffffff;
--surface: #f7fafc;
--text-primary: #0f1724;
--border: #e6edf2;
--accent-start: #16A085;
--accent-end: #3ECF8E;
}

.dark {
--bg: #0b1220;
--surface: #0f1724;
--text-primary: #e6eef5;
--border: rgba(255,255,255,0.06);
}

### Dark Mode Behavior

* Follow system preference by default
* Allow manual toggle in UI

---

## Accessibility Requirements

* Minimum contrast ratio: 4.5:1 for text
* Focus indicators: visible focus ring using accent color
* Reduced motion: respect prefers-reduced-motion
* Screen reader friendly: semantic HTML and proper labels

---

## Inspirations / References

Supabase
Modern SaaS dashboards
Crypto analytics platforms with green/teal gradient aesthetics

---

## Do's and Don'ts

### Do

* Use gradient green/teal for primary call-to-actions
* Keep consistent 8px spacing rhythm
* Maintain subtle shadows and glass effects
* Use Inter for UI and JetBrains Mono for technical content

### Don't

* Don't use more than three accent colors
* Avoid heavy shadows or overly strong gradients
* Don't remove focus states
* Don't mix too many font weights on a single screen

---

## Notes

This design system aims to balance clarity, developer-focused UI design, and modern SaaS aesthetics. The interface should feel lightweight, modern, and data-friendly while maintaining strong visual hierarchy and accessibility.

This style guide should evolve as the product grows.
