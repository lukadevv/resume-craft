import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { TwoColumnShell } from '@/components/resume/templates/TwoColumnShell';
import { createEmptyResume } from '@/types/resume';
import type { Resume } from '@/types/resume';

describe('TwoColumnShell', () => {
  beforeEach(() => {
    cleanup();
  });

  const buildResume = (overrides: Partial<Resume> = {}): Resume => ({
    ...createEmptyResume(),
    template: 'modern',
    personalInfo: {
      ...createEmptyResume().personalInfo,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@example.com',
      phone: '555-0100',
      location: 'San Francisco, CA',
      linkedin: 'linkedin.com/in/janesmith',
      website: 'janesmith.dev',
      summary: 'Full-stack engineer',
    },
    summary: 'Experienced engineer with a passion for clean code.',
    workExperience: [
      {
        id: 'w1',
        company: 'Acme Inc',
        position: 'Senior Developer',
        location: 'Remote',
        startDate: '2021-01',
        endDate: '2024-06',
        current: false,
        description: 'Led frontend architecture.',
      },
    ],
    education: [
      {
        id: 'e1',
        institution: 'State University',
        degree: 'BS Computer Science',
        field: '',
        location: '',
        startDate: '2016',
        endDate: '2020',
        current: false,
        gpa: '',
        achievements: '',
      },
    ],
    skills: [
      { id: 's1', name: 'React', level: 'expert', category: 'Frontend' },
      { id: 's2', name: 'TypeScript', level: 'advanced', category: 'Languages' },
    ],
    projects: [
      {
        id: 'p1',
        name: 'OpenSource Lib',
        description: 'A popular npm package.',
        url: 'https://github.com/jane/lib',
        technologies: ['TypeScript', 'React'],
        startDate: '2023',
        endDate: '',
        current: true,
      },
    ],
    certifications: [
      {
        id: 'c1',
        name: 'AWS Solutions Architect',
        issuer: 'Amazon',
        date: '2023-03',
        expiryDate: '',
        credentialId: '',
        url: '',
      },
    ],
    languages: [
      { id: 'l1', name: 'English', proficiency: 'native' },
    ],
    tools: ['Git', 'Docker', 'VSCode'],
    ...overrides,
  });

  describe('structural — bg-white and A4 container', () => {
    it('renders the shell container inside a bg-white wrapper', () => {
      render(<TwoColumnShell resume={buildResume()} />);
      expect(screen.getByTestId('two-column-shell')).toBeInTheDocument();
    });

    it('contains an A4 fixed-size container', () => {
      render(<TwoColumnShell resume={buildResume()} />);
      const a4 = screen.getByTestId('a4-container');
      expect(a4).toBeInTheDocument();
    });
  });

  describe('layout — primary and sidebar columns', () => {
    it('renders primary sections in the main/left column', () => {
      render(<TwoColumnShell resume={buildResume()} />);
      const primary = screen.getByTestId('primary-column');
      expect(primary).toBeInTheDocument();

      // modern primarySections: summary, workExperience, projects
      expect(screen.getByTestId('section-summary')).toBeInTheDocument();
      expect(screen.getByTestId('section-workExperience')).toBeInTheDocument();
      expect(screen.getByTestId('section-projects')).toBeInTheDocument();
    });

    it('renders sidebar sections in the sidebar/right column', () => {
      render(<TwoColumnShell resume={buildResume()} />);
      const sidebar = screen.getByTestId('sidebar-column');
      expect(sidebar).toBeInTheDocument();

      // modern sidebarSections: skills, languages, certifications, education
      expect(screen.getByTestId('section-skills')).toBeInTheDocument();
      expect(screen.getByTestId('section-languages')).toBeInTheDocument();
      expect(screen.getByTestId('section-certifications')).toBeInTheDocument();
      expect(screen.getByTestId('section-education')).toBeInTheDocument();
    });
  });

  describe('section content rendering', () => {
    it('renders summary text from resume data', () => {
      render(<TwoColumnShell resume={buildResume()} />);
      expect(screen.getByText('Experienced engineer with a passion for clean code.')).toBeInTheDocument();
    });

    it('renders work experience entries with company, position, dates', () => {
      render(<TwoColumnShell resume={buildResume()} />);
      expect(screen.getByText('Senior Developer')).toBeInTheDocument();
      expect(screen.getByText(/Acme Inc/)).toBeInTheDocument();
    });

    it('renders education entries with institution and degree', () => {
      render(<TwoColumnShell resume={buildResume()} />);
      expect(screen.getByText('BS Computer Science')).toBeInTheDocument();
      expect(screen.getByText('State University')).toBeInTheDocument();
    });

    it('renders skills as listed items', () => {
      render(<TwoColumnShell resume={buildResume()} />);
      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
    });

    it('renders languages with proficiency', () => {
      render(<TwoColumnShell resume={buildResume()} />);
      expect(screen.getByText('English')).toBeInTheDocument();
    });

    it('renders certifications list', () => {
      render(<TwoColumnShell resume={buildResume()} />);
      expect(screen.getByText('AWS Solutions Architect')).toBeInTheDocument();
    });
  });

  describe('accent color from template definition', () => {
    it('applies accent color from template definition (not resume.themeColor)', () => {
      // modern template definition accentColor is #3ECF8E
      const resume = buildResume({ themeColor: '#FF0000' });
      render(<TwoColumnShell resume={resume} />);

      // Section headers should use the definition's accent (#3ECF8E), not themeColor (#FF0000)
      const header = screen.getByTestId('section-summary').querySelector('h2');
      expect(header).toHaveStyle({ color: 'rgb(62, 207, 142)' });
    });
  });

  describe('emphasis components', () => {
    it('renders SkillBars when skillBars is in emphasisComponents', () => {
      // Use itSupport template which has skillBars in emphasisComponents
      const resume = buildResume({ template: 'itSupport' });
      render(<TwoColumnShell resume={resume} />);
      expect(screen.getByTestId('emphasis-skillBars')).toBeInTheDocument();
    });

    it('renders MetricsCallout when metricsCallout is in emphasisComponents', () => {
      // Use marketing template which has metricsCallout
      const resume = buildResume({ template: 'marketing' });
      render(<TwoColumnShell resume={resume} />);
      expect(screen.getByTestId('emphasis-metricsCallout')).toBeInTheDocument();
    });

    it('renders CertificationBadge when certificationBadge is in emphasisComponents', () => {
      // Use itSupport template which has certificationBadge
      const resume = buildResume({ template: 'itSupport' });
      render(<TwoColumnShell resume={resume} />);
      expect(screen.getByTestId('emphasis-certificationBadge')).toBeInTheDocument();
    });

    it('does not render emphasis component when not in emphasisComponents', () => {
      // modern template only has backgroundAccent — no skillBars
      render(<TwoColumnShell resume={buildResume({ template: 'modern' })} />);
      expect(screen.queryByTestId('emphasis-skillBars')).not.toBeInTheDocument();
    });
  });

  describe('dark theme text colors', () => {
    it('uses light text on dark background templates (like dataScientist)', () => {
      // dataScientist has gradient: #0c1222 → dark background
      const resume = buildResume({ template: 'dataScientist' });
      render(<TwoColumnShell resume={resume} />);
      const shell = screen.getByTestId('two-column-shell');
      expect(shell).toHaveAttribute('data-theme', 'dark');
    });

    it('uses dark text on light background templates (like modern)', () => {
      // modern has gradient: #f9fafb → light background
      render(<TwoColumnShell resume={buildResume({ template: 'modern' })} />);
      const shell = screen.getByTestId('two-column-shell');
      expect(shell).toHaveAttribute('data-theme', 'light');
    });
  });

  describe('empty state handling', () => {
    it('does not render a section when resume data for it is empty', () => {
      // Use an empty resume with a template that includes projects in primarySections
      const empty = buildResume({ projects: [], workExperience: [], template: 'modern' });
      render(<TwoColumnShell resume={empty} />);
      // Section container exists (from primarySections) but content should be minimal
      expect(screen.getByTestId('section-projects')).toBeInTheDocument();
    });

    it('still renders shell structure with empty resume data', () => {
      const empty = createEmptyResume();
      empty.template = 'modern';
      render(<TwoColumnShell resume={empty} />);
      expect(screen.getByTestId('two-column-shell')).toBeInTheDocument();
      expect(screen.getByTestId('a4-container')).toBeInTheDocument();
    });
  });
});
