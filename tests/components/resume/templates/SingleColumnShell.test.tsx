import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { SingleColumnShell } from '@/components/resume/templates/SingleColumnShell';
import { createEmptyResume } from '@/types/resume';
import type { Resume } from '@/types/resume';

describe('SingleColumnShell', () => {
  beforeEach(() => {
    cleanup();
  });

  const buildResume = (overrides: Partial<Resume> = {}): Resume => ({
    ...createEmptyResume(),
    template: 'minimal',
    personalInfo: {
      ...createEmptyResume().personalInfo,
      firstName: 'Sam',
      lastName: 'Rivera',
      email: 'sam@example.com',
      phone: '555-0300',
      location: 'Denver, CO',
      summary: 'Minimalist designer',
    },
    summary: 'Design-focused professional with clean aesthetic.',
    workExperience: [
      {
        id: 'w1',
        company: 'Minimal Co',
        position: 'Lead Designer',
        location: 'Denver',
        startDate: '2020',
        endDate: '2024',
        current: false,
        description: 'Simplified user experiences.',
      },
    ],
    education: [
      {
        id: 'e1',
        institution: 'Design Institute',
        degree: 'MFA Design',
        field: '',
        location: '',
        startDate: '2016',
        endDate: '2018',
        current: false,
        gpa: '',
        achievements: '',
      },
    ],
    skills: [
      { id: 's1', name: 'Typography', level: 'expert', category: 'Design' },
      { id: 's2', name: 'Layout', level: 'advanced', category: 'Design' },
    ],
    projects: [
      {
        id: 'p1',
        name: 'Minimal UI Kit',
        description: 'Open-source design system.',
        url: '',
        technologies: ['Figma'],
        startDate: '2023',
        endDate: '',
        current: true,
      },
    ],
    certifications: [
      {
        id: 'c1',
        name: 'Certified Design Thinker',
        issuer: 'IDEO',
        date: '2022',
        expiryDate: '',
        credentialId: '',
        url: '',
      },
    ],
    languages: [
      { id: 'l1', name: 'English', proficiency: 'native' },
    ],
    ...overrides,
  });

  describe('structural', () => {
    it('renders the shell container inside a bg-white wrapper', () => {
      render(<SingleColumnShell resume={buildResume()} />);
      expect(screen.getByTestId('single-column-shell')).toBeInTheDocument();
    });

    it('contains an A4 fixed-size container', () => {
      render(<SingleColumnShell resume={buildResume()} />);
      const a4 = screen.getByTestId('a4-container');
      expect(a4).toBeInTheDocument();
    });
  });

  describe('single column layout', () => {
    it('renders sections in a single flow (no sidebar/primary split)', () => {
      render(<SingleColumnShell resume={buildResume()} />);

      // minimal primarySections: summary, workExperience, skills, education
      expect(screen.getByTestId('section-summary')).toBeInTheDocument();
      expect(screen.getByTestId('section-workExperience')).toBeInTheDocument();
      expect(screen.getByTestId('section-skills')).toBeInTheDocument();
      expect(screen.getByTestId('section-education')).toBeInTheDocument();

      // minimal sidebarSections: languages, projects, certifications — also rendered
      expect(screen.getByTestId('section-languages')).toBeInTheDocument();
      expect(screen.getByTestId('section-projects')).toBeInTheDocument();
      expect(screen.getByTestId('section-certifications')).toBeInTheDocument();
    });
  });

  describe('section content rendering', () => {
    it('renders summary text', () => {
      render(<SingleColumnShell resume={buildResume()} />);
      expect(
        screen.getByText('Design-focused professional with clean aesthetic.')
      ).toBeInTheDocument();
    });

    it('renders work experience with company', () => {
      render(<SingleColumnShell resume={buildResume()} />);
      expect(screen.getByText('Lead Designer')).toBeInTheDocument();
      expect(screen.getByText(/Minimal Co/)).toBeInTheDocument();
    });

    it('renders education', () => {
      render(<SingleColumnShell resume={buildResume()} />);
      expect(screen.getByText('MFA Design')).toBeInTheDocument();
    });
  });

  describe('accent color', () => {
    it('uses definition accentColor, not resume.themeColor', () => {
      const resume = buildResume({ themeColor: '#00FF00' });
      render(<SingleColumnShell resume={resume} />);

      // minimal accentColor is #111827
      const header = screen.getByTestId('section-summary').querySelector('h2');
      expect(header).toHaveStyle({ color: 'rgb(17, 24, 39)' });
    });
  });

  describe('dark/light theme', () => {
    it('detects light theme for minimal template', () => {
      render(<SingleColumnShell resume={buildResume({ template: 'minimal' })} />);
      expect(screen.getByTestId('single-column-shell')).toHaveAttribute(
        'data-theme',
        'light'
      );
    });
  });

  describe('empty state', () => {
    it('renders structure with empty resume', () => {
      const empty = createEmptyResume();
      empty.template = 'minimal';
      render(<SingleColumnShell resume={empty} />);
      expect(screen.getByTestId('single-column-shell')).toBeInTheDocument();
      expect(screen.getByTestId('a4-container')).toBeInTheDocument();
    });
  });
});
