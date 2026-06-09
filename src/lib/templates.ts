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
  | 'customSections'
  // Role-specific sections
  | 'publications'
  | 'grantsFellowships'
  | 'conferences'
  | 'licenses'
  | 'clinicalSkills'
  | 'barAdmission'
  | 'practiceAreas'
  | 'securityClearance'
  | 'teachingPhilosophy'
  | 'classroomExperience'
  | 'tools'
  | 'portfolio'
  | 'achievements'
  | 'affiliations'
  | 'coreCompetencies'
  | 'awards'
  | 'teachingExperience';

export type LayoutType = 'single-column' | 'two-column' | 'split' | 'timeline';

export type EmphasisComponent =
  | 'languageArc'
  | 'skillDots'
  | 'contactBadges'
  | 'educationTimeline'
  | 'backgroundAccent'
  | 'skillBars'
  | 'metricsCallout'
  | 'timelineGraphic'
  | 'certificationBadge';

export type ThemeMode = 'light' | 'dark';

export type ThemedValue<T> = Record<ThemeMode, T>;

export interface TemplateBackground {
  imageUrl?: string;
  gradient?: string;
  overlayColor?: string;
}

export interface TemplateLandingPresentation {
  cardBackground: ThemedValue<string>;
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
        accentGlow(18)
      ),
      dark: layers(
        [
          'linear-gradient(180deg,',
          'color-mix(in srgb, var(--color-surface) 72%, transparent) 0%,',
          'color-mix(in srgb, var(--color-background) 88%, transparent) 100%)',
        ].join(' '),
        accentGlow(22)
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
        `radial-gradient(circle at 50% 0%, color-mix(in srgb, ${accentColor} 24%, transparent) 0%, transparent 62%)`
      ),
      dark: layers(
        [
          'linear-gradient(180deg,',
          'color-mix(in srgb, var(--color-background) 12%, transparent) 0%,',
          'color-mix(in srgb, #000000 58%, transparent) 62%,',
          'color-mix(in srgb, #000000 80%, transparent) 100%)',
        ].join(' '),
        `radial-gradient(circle at 50% 0%, color-mix(in srgb, ${accentColor} 18%, transparent) 0%, transparent 62%)`
      ),
    },
  };
};

export const templateDefinitions: TemplateDefinition[] = [
  // Base templates (5)
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
    primarySections: ['summary', 'workExperience'],
    sidebarSections: ['skills', 'projects', 'languages', 'contact'],
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

  // Role-based templates (15) - Market demand order
  // 1. Software Developer
  {
    id: 'softwareDeveloper',
    name: 'Software Developer',
    description:
      'Tech-focused layout emphasizing skills, projects, and tools. Features technology icons and GitHub/portfolio links.',
    layoutType: 'split',
    accentColor: '#F97316',
    primarySections: ['summary', 'workExperience', 'projects', 'certifications'],
    sidebarSections: ['skills', 'tools', 'languages', 'education', 'contact'],
    emphasisComponents: ['skillDots', 'skillBars', 'contactBadges', 'backgroundAccent'],
    background: {
      gradient: 'linear-gradient(135deg, #1b1d24, #3e2417)',
      overlayColor: 'rgba(16, 16, 16, 0.85)',
    },
    landingPresentation: getLandingPresentation('#F97316'),
  },

  // 2. Data Scientist
  {
    id: 'dataScientist',
    name: 'Data Scientist',
    description:
      'Data-driven template with skills charts, GitHub links, and emphasis on projects with quantifiable impact.',
    layoutType: 'two-column',
    accentColor: '#0ea5e9',
    primarySections: ['summary', 'workExperience', 'projects', 'education'],
    sidebarSections: ['skills', 'tools', 'certifications'],
    emphasisComponents: ['skillBars', 'backgroundAccent'],
    background: {
      gradient: 'linear-gradient(135deg, #0c1222, #1e3a5f)',
      overlayColor: 'rgba(12, 18, 34, 0.85)',
    },
    landingPresentation: getLandingPresentation('#0ea5e9'),
  },

  // 3. UX/UI Designer
  {
    id: 'uxDesigner',
    name: 'UX/UI Designer',
    description:
      'Clean, modern layout showcasing design projects and portfolio links. Emphasizes design skills and tools.',
    layoutType: 'two-column',
    accentColor: '#ec4899',
    primarySections: ['summary', 'workExperience', 'projects', 'portfolio'],
    sidebarSections: ['skills', 'tools', 'certifications', 'education', 'contact'],
    emphasisComponents: ['skillDots', 'backgroundAccent'],
    background: {
      gradient: 'linear-gradient(135deg, #1f1f2e, #2d1b3d)',
      overlayColor: 'rgba(20, 20, 30, 0.75)',
    },
    landingPresentation: getLandingPresentation('#ec4899'),
  },

  // 4. Graphic Designer
  {
    id: 'graphicDesigner',
    name: 'Graphic Designer',
    description:
      'Visual-first template for creative professionals. Showcases design sensibility with bold typography.',
    layoutType: 'split',
    accentColor: '#f43f5e',
    primarySections: ['summary', 'workExperience', 'portfolio'],
    sidebarSections: ['skills', 'tools', 'projects', 'awards', 'education'],
    emphasisComponents: ['backgroundAccent', 'skillDots'],
    background: {
      gradient: 'linear-gradient(180deg, #1a1a2e, #16213e)',
      overlayColor: 'rgba(22, 33, 62, 0.7)',
    },
    landingPresentation: getLandingPresentation('#f43f5e'),
  },

  // 5. Product Manager
  {
    id: 'productManager',
    name: 'Product Manager',
    description:
      'Strategy-focused template highlighting product launches, metrics, and roadmap experience.',
    layoutType: 'two-column',
    accentColor: '#6366f1',
    primarySections: ['summary', 'workExperience', 'coreCompetencies', 'education'],
    sidebarSections: ['skills', 'tools', 'certifications'],
    emphasisComponents: ['metricsCallout', 'backgroundAccent'],
    background: {
      gradient: 'linear-gradient(135deg, #1e1b4b, #312e81)',
      overlayColor: 'rgba(30, 27, 75, 0.8)',
    },
    landingPresentation: getLandingPresentation('#6366f1'),
  },

  // 6. Project Manager
  {
    id: 'projectManager',
    name: 'Project Manager',
    description:
      'Leadership-focused template with timeline graphics and emphasis on certifications (PMP, CSM).',
    layoutType: 'timeline',
    accentColor: '#8b5cf6',
    primarySections: ['summary', 'workExperience', 'coreCompetencies', 'education'],
    sidebarSections: ['skills', 'certifications'],
    emphasisComponents: ['timelineGraphic', 'certificationBadge'],
    background: {
      gradient: 'linear-gradient(180deg, #1e1b4b, #4c1d95)',
      overlayColor: 'rgba(30, 27, 75, 0.75)',
    },
    landingPresentation: getLandingPresentation('#8b5cf6'),
  },

  // 7. Marketing Manager
  {
    id: 'marketing',
    name: 'Marketing Manager',
    description:
      'Campaign-focused template emphasizing metrics, digital skills, and creative achievements.',
    layoutType: 'two-column',
    accentColor: '#f59e0b',
    primarySections: ['summary', 'workExperience', 'achievements', 'education'],
    sidebarSections: ['skills', 'tools', 'certifications'],
    emphasisComponents: ['metricsCallout', 'backgroundAccent'],
    background: {
      gradient: 'linear-gradient(135deg, #1f2018, #3d3208)',
      overlayColor: 'rgba(31, 32, 24, 0.75)',
    },
    landingPresentation: getLandingPresentation('#f59e0b'),
  },

  // 8. Sales Representative
  {
    id: 'sales',
    name: 'Sales Executive',
    description:
      'Results-driven template highlighting quota attainment, revenue metrics, and CRM skills.',
    layoutType: 'split',
    accentColor: '#14b8a6',
    primarySections: ['summary', 'workExperience', 'achievements', 'education'],
    sidebarSections: ['skills', 'tools', 'certifications'],
    emphasisComponents: ['metricsCallout', 'backgroundAccent'],
    background: {
      gradient: 'linear-gradient(135deg, #0f2922, #134e4a)',
      overlayColor: 'rgba(15, 41, 34, 0.8)',
    },
    landingPresentation: getLandingPresentation('#14b8a6'),
  },

  // 9. Accountant
  {
    id: 'accountant',
    name: 'Accountant',
    description:
      'Finance-focused template emphasizing certifications (CPA, CFA), numerical achievements, and compliance skills.',
    layoutType: 'two-column',
    accentColor: '#64748b',
    primarySections: ['summary', 'workExperience', 'certifications', 'education'],
    sidebarSections: ['skills', 'tools', 'affiliations'],
    emphasisComponents: ['certificationBadge'],
    background: {
      gradient: 'linear-gradient(180deg, #1e293b, #334155)',
      overlayColor: 'rgba(30, 41, 59, 0.75)',
    },
    landingPresentation: getLandingPresentation('#64748b'),
  },

  // 10. Nurse / Healthcare
  {
    id: 'nurse',
    name: 'Nurse / Healthcare',
    description:
      'Healthcare-focused template highlighting licenses, clinical skills, and patient care achievements.',
    layoutType: 'two-column',
    accentColor: '#22c55e',
    primarySections: ['summary', 'workExperience', 'clinicalSkills', 'education'],
    sidebarSections: ['licenses', 'certifications', 'skills'],
    emphasisComponents: ['certificationBadge', 'backgroundAccent'],
    background: {
      gradient: 'linear-gradient(180deg, #f0fdf4, #dcfce7)',
      overlayColor: 'rgba(255,255,255,0.7)',
    },
    landingPresentation: getLandingPresentation('#22c55e'),
  },

  // 11. Teacher / Educator
  {
    id: 'teacher',
    name: 'Teacher / Educator',
    description:
      'Education-focused template emphasizing certifications, subjects taught, and classroom achievements.',
    layoutType: 'two-column',
    accentColor: '#0d9488',
    primarySections: ['summary', 'workExperience', 'classroomExperience', 'education'],
    sidebarSections: ['certifications', 'skills', 'teachingPhilosophy'],
    emphasisComponents: ['timelineGraphic', 'backgroundAccent'],
    background: {
      gradient: 'linear-gradient(180deg, #f0fdfa, #ccfbf1)',
      overlayColor: 'rgba(255,255,255,0.75)',
    },
    landingPresentation: getLandingPresentation('#0d9488'),
  },

  // 12. Academic / Researcher (CV)
  {
    id: 'academic',
    name: 'Academic / Researcher',
    description:
      'Multi-page CV template emphasizing publications, grants, research interests, and academic appointments.',
    layoutType: 'single-column',
    accentColor: '#78350f',
    primarySections: [
      'summary',
      'education',
      'workExperience',
      'publications',
      'grantsFellowships',
      'conferences',
    ],
    sidebarSections: ['teachingExperience', 'awards', 'skills', 'affiliations'],
    emphasisComponents: [],
    background: {
      gradient: 'linear-gradient(180deg, #fffbeb, #fef3c7)',
      overlayColor: 'rgba(255, 251, 235, 0.8)',
    },
    landingPresentation: getLandingPresentation('#78350f'),
  },

  // 13. Lawyer / Attorney
  {
    id: 'lawyer',
    name: 'Lawyer / Attorney',
    description:
      'Formal legal template emphasizing bar admission, practice areas, and legal experience.',
    layoutType: 'two-column',
    accentColor: '#1e293b',
    primarySections: ['summary', 'workExperience', 'practiceAreas', 'education'],
    sidebarSections: ['barAdmission', 'skills', 'affiliations'],
    emphasisComponents: ['certificationBadge'],
    background: {
      gradient: 'linear-gradient(180deg, #0f172a, #1e293b)',
      overlayColor: 'rgba(15, 23, 42, 0.8)',
    },
    landingPresentation: getLandingPresentation('#1e293b'),
  },

  // 14. Engineer (Civil/Mechanical)
  {
    id: 'engineer',
    name: 'Engineer',
    description:
      'Technical template highlighting projects, CAD/software tools, and engineering certifications (PE).',
    layoutType: 'two-column',
    accentColor: '#475569',
    primarySections: ['summary', 'workExperience', 'projects', 'education'],
    sidebarSections: ['skills', 'tools', 'certifications'],
    emphasisComponents: ['skillBars', 'timelineGraphic'],
    background: {
      gradient: 'linear-gradient(135deg, #1e293b, #334155)',
      overlayColor: 'rgba(30, 41, 59, 0.75)',
    },
    landingPresentation: getLandingPresentation('#475569'),
  },

  // 15. Executive / C-Level
  {
    id: 'executive',
    name: 'Executive / C-Level',
    description:
      'Polished leadership template with executive summary, core competencies, and board-level achievements.',
    layoutType: 'split',
    accentColor: '#0f172a',
    primarySections: ['summary', 'workExperience'],
    sidebarSections: ['education', 'coreCompetencies', 'affiliations', 'certifications'],
    emphasisComponents: ['metricsCallout', 'backgroundAccent'],
    background: {
      gradient: 'linear-gradient(180deg, #020617, #0f172a)',
      overlayColor: 'rgba(2, 6, 23, 0.85)',
    },
    landingPresentation: getLandingPresentation('#0f172a'),
  },

  // 16. HR / Recruiter
  {
    id: 'hr',
    name: 'HR / Recruiter',
    description:
      'People-focused template highlighting talent acquisition metrics, HR certifications, and recruiting tools.',
    layoutType: 'two-column',
    accentColor: '#7c3aed',
    primarySections: ['summary', 'workExperience', 'achievements'],
    sidebarSections: ['skills', 'certifications', 'education'],
    emphasisComponents: ['metricsCallout', 'backgroundAccent'],
    background: {
      gradient: 'linear-gradient(135deg, #1e1b4b, #4c1d95)',
      overlayColor: 'rgba(30, 27, 75, 0.75)',
    },
    landingPresentation: getLandingPresentation('#7c3aed'),
  },

  // 17. Management Consultant
  {
    id: 'consultant',
    name: 'Management Consultant',
    description:
      'Strategy-focused template emphasizing case studies, client impact, and analytical skills.',
    layoutType: 'two-column',
    accentColor: '#2563eb',
    primarySections: ['summary', 'workExperience', 'coreCompetencies', 'education'],
    sidebarSections: ['skills', 'tools', 'certifications'],
    emphasisComponents: ['metricsCallout', 'timelineGraphic'],
    background: {
      gradient: 'linear-gradient(135deg, #1e3a8a, #1e40af)',
      overlayColor: 'rgba(30, 58, 138, 0.75)',
    },
    landingPresentation: getLandingPresentation('#2563eb'),
  },

  // 18. IT Support / SysAdmin
  {
    id: 'itSupport',
    name: 'IT Support',
    description:
      'Technical template highlighting help desk experience, systems administration, and IT certifications.',
    layoutType: 'two-column',
    accentColor: '#0891b2',
    primarySections: ['summary', 'workExperience', 'skills'],
    sidebarSections: ['tools', 'certifications', 'education'],
    emphasisComponents: ['skillBars', 'certificationBadge'],
    background: {
      gradient: 'linear-gradient(135deg, #164e63, #0e7490)',
      overlayColor: 'rgba(22, 78, 99, 0.75)',
    },
    landingPresentation: getLandingPresentation('#0891b2'),
  },

  // 19. Military-to-Civilian Transition
  {
    id: 'military',
    name: 'Military Transition',
    description:
      'Veteran-focused template translating military experience to civilian terms with security clearance emphasis.',
    layoutType: 'two-column',
    accentColor: '#374151',
    primarySections: ['summary', 'workExperience', 'securityClearance', 'education'],
    sidebarSections: ['skills', 'certifications', 'achievements'],
    emphasisComponents: ['certificationBadge', 'timelineGraphic'],
    background: {
      gradient: 'linear-gradient(180deg, #1f2937, #374151)',
      overlayColor: 'rgba(31, 41, 55, 0.75)',
    },
    landingPresentation: getLandingPresentation('#374151'),
  },

  // 20. Federal / Government
  {
    id: 'federal',
    name: 'Federal / Government',
    description:
      'USAJOBS-optimized template with detailed position information, GS grade, and KSA narratives.',
    layoutType: 'single-column',
    accentColor: '#4b5563',
    primarySections: ['summary', 'workExperience', 'education', 'certifications'],
    sidebarSections: ['skills', 'achievements'],
    emphasisComponents: [],
    background: {
      gradient: 'linear-gradient(180deg, #f9fafb, #f3f4f6)',
      overlayColor: 'rgba(249, 250, 251, 0.8)',
    },
    landingPresentation: getLandingPresentation('#4b5563'),
  },
];

export const templateDefinitionMap = templateDefinitions.reduce<
  Record<TemplateType, TemplateDefinition>
>(
  (acc, definition) => {
    acc[definition.id] = definition;
    return acc;
  },
  {} as Record<TemplateType, TemplateDefinition>
);

export const getTemplateDefinition = (id: TemplateType) => templateDefinitionMap[id];
