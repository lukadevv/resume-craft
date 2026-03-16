import { TemplateType } from '@/types/resume';

export type TemplateSection =
  | 'summary'
  | 'workExperience'
  | 'education'
  | 'skills'
  | 'projects'
  | 'certifications'
  | 'languages'
  | 'contact'
  | 'references'
  | 'customSections';

export type LayoutType = 'single-column' | 'two-column' | 'split' | 'timeline';

export type EmphasisComponent =
  | 'languageArc'
  | 'skillDots'
  | 'contactBadges'
  | 'educationTimeline'
  | 'backgroundAccent';

export type ThemeMode = 'light' | 'dark';

export type ThemedValue<T> = Record<ThemeMode, T>;

export interface TemplateBackground {
  imageUrl?: string;
  gradient?: string;
  overlayColor?: string;
}

export interface TemplateLandingPresentation {
  /**
   * Landing page card background (outside the preview frame).
   * We keep this separate from TemplateBackground because TemplateBackground
   * is also used inside the resume templates themselves.
   */
  cardBackground: ThemedValue<string>;
  /**
   * Hover overlay shown on top of the preview frame.
   */
  hoverOverlay: ThemedValue<string>;
}

export interface TemplateDefinition {
  id: TemplateType;
  name: string;
  description: string;
  layoutType: LayoutType;
  accentColor: string;
  primarySections: TemplateSection[];
  sidebarSections: TemplateSection[];
  emphasisComponents: EmphasisComponent[];
  background?: TemplateBackground;
  landingPresentation?: TemplateLandingPresentation;
}

const baseSummary = 'Professional layout with balanced whitespace and clean typography.';

export const getLandingPresentation = (accentColor: string): TemplateLandingPresentation => {
  // Theme-aware overlays that pick up the app's current palette via CSS vars, but
  // keep a gentle accent glow per template.
  const accentGlow = (strengthPercent: number) =>
    `radial-gradient(circle at 18% 12%, color-mix(in srgb, ${accentColor} ${strengthPercent}%, transparent) 0%, transparent 60%)`;

  const layers = (...values: string[]) => values.join(', ');

  return {
    cardBackground: {
      light: layers(
        [
          'linear-gradient(180deg,',
          'color-mix(in srgb, var(--color-background) 92%, transparent) 0%,',
          'color-mix(in srgb, var(--color-surface) 78%, transparent) 100%)',
        ].join(' '),
        accentGlow(18),
      ),
      dark: layers(
        [
          'linear-gradient(180deg,',
          'color-mix(in srgb, var(--color-surface) 72%, transparent) 0%,',
          'color-mix(in srgb, var(--color-background) 88%, transparent) 100%)',
        ].join(' '),
        accentGlow(22),
      ),
    },
    hoverOverlay: {
      light: layers(
        [
          'linear-gradient(180deg,',
          'color-mix(in srgb, var(--color-background) 10%, transparent) 0%,',
          'color-mix(in srgb, var(--color-foreground) 45%, transparent) 55%,',
          'color-mix(in srgb, var(--color-foreground) 72%, transparent) 100%)',
        ].join(' '),
        `radial-gradient(circle at 50% 0%, color-mix(in srgb, ${accentColor} 24%, transparent) 0%, transparent 62%)`,
      ),
      dark: layers(
        [
          'linear-gradient(180deg,',
          'color-mix(in srgb, var(--color-background) 12%, transparent) 0%,',
          'color-mix(in srgb, #000000 58%, transparent) 62%,',
          'color-mix(in srgb, #000000 80%, transparent) 100%)',
        ].join(' '),
        `radial-gradient(circle at 50% 0%, color-mix(in srgb, ${accentColor} 18%, transparent) 0%, transparent 62%)`,
      ),
    },
  };
};

export const templateDefinitions: TemplateDefinition[] = [
  {
    id: 'modern',
    name: 'Modern',
    description: `${baseSummary} Stakes the experience timeline while keeping a light sidebar.`,
    layoutType: 'two-column',
    accentColor: '#3ECF8E',
    primarySections: ['summary', 'workExperience', 'projects'],
    sidebarSections: ['skills', 'languages', 'certifications', 'education'],
    emphasisComponents: ['backgroundAccent'],
    background: {
      gradient: 'linear-gradient(135deg, #f9fafb, #ffffff)',
      overlayColor: 'rgba(255,255,255,0.6)',
    },
    landingPresentation: getLandingPresentation('#3ECF8E'),
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional resume flow with stacked sections and serif typography.',
    layoutType: 'timeline',
    accentColor: '#2563eb',
    primarySections: ['summary', 'workExperience'],
    sidebarSections: ['education', 'skills', 'languages'],
    emphasisComponents: [],
    background: {
      gradient: 'linear-gradient(180deg, #f8fafc, #eef2ff)',
      overlayColor: 'rgba(15,23,42,0.55)',
    },
    landingPresentation: getLandingPresentation('#2563eb'),
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Single-column whitespace-first template for recruiters who love clarity.',
    layoutType: 'single-column',
    accentColor: '#111827',
    primarySections: ['summary', 'workExperience', 'skills', 'education'],
    sidebarSections: ['languages', 'projects', 'certifications'],
    emphasisComponents: [],
    background: {
      gradient: 'linear-gradient(180deg, #ffffff, #f1f5f9)',
      overlayColor: 'rgba(255,255,255,0.8)',
    },
    landingPresentation: getLandingPresentation('#111827'),
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold column-split template with accent imagery and feature cards.',
    layoutType: 'split',
    accentColor: '#a855f7',
    primarySections: ['summary', 'projects', 'workExperience'],
    sidebarSections: ['skills', 'languages', 'contact'],
    emphasisComponents: ['backgroundAccent', 'skillDots'],
    background: {
      gradient: 'linear-gradient(180deg, #1f1c2c, #3a1c71)',
      overlayColor: 'rgba(10,10,10,0.65)',
    },
    landingPresentation: getLandingPresentation('#a855f7'),
  },
  {
    id: 'technical',
    name: 'Technical',
    description: 'Skills-heavy layout with a sidebar that highlights languages and certifications.',
    layoutType: 'two-column',
    accentColor: '#059669',
    primarySections: ['summary', 'workExperience'],
    sidebarSections: ['skills', 'projects', 'languages', 'certifications'],
    emphasisComponents: ['skillDots', 'educationTimeline'],
    background: {
      gradient: 'linear-gradient(135deg, #0f172a, #111827)',
      overlayColor: 'rgba(15,23,42,0.85)',
    },
    landingPresentation: getLandingPresentation('#059669'),
  },
  {
    id: 'programming',
    name: 'Programming',
    description:
      'Balanced split layout with hero arcs, skill dots, and a timeline-style education column.',
    layoutType: 'split',
    accentColor: '#F97316',
    primarySections: ['summary', 'workExperience', 'projects', 'certifications'],
    sidebarSections: ['skills', 'languages', 'education', 'contact'],
    emphasisComponents: ['languageArc', 'skillDots', 'contactBadges', 'educationTimeline'],
    background: {
      imageUrl:
        'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80',
      gradient: 'linear-gradient(135deg, #1b1d24, #3e2417)',
      overlayColor: 'rgba(16, 16, 16, 0.85)',
    },
    landingPresentation: getLandingPresentation('#F97316'),
  },
];

export const templateDefinitionMap = templateDefinitions.reduce<Record<TemplateType, TemplateDefinition>>(
  (acc, definition) => {
    acc[definition.id] = definition;
    return acc;
  },
  {} as Record<TemplateType, TemplateDefinition>
);

export const getTemplateDefinition = (id: TemplateType) => templateDefinitionMap[id];
