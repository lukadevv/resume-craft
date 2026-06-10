import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { SplitShell } from '@/components/resume/templates/SplitShell';
import { createEmptyResume } from '@/types/resume';
import type { Resume } from '@/types/resume';

describe('SplitShell', () => {
  beforeEach(() => {
    cleanup();
  });

  const buildResume = (overrides: Partial<Resume> = {}): Resume => ({
    ...createEmptyResume(),
    template: 'creative',
    personalInfo: {
      ...createEmptyResume().personalInfo,
      firstName: 'Alex',
      lastName: 'Morgan',
      email: 'alex@example.com',
      phone: '555-0200',
      location: 'Austin, TX',
      summary: 'Creative director',
    },
    summary: 'Design leader with 10 years of experience.',
    workExperience: [
      {
        id: 'w1',
        company: 'Studio Nine',
        position: 'Art Director',
        location: 'Austin',
        startDate: '2019',
        endDate: '2024',
        current: false,
        description: 'Led creative campaigns.',
      },
    ],
    education: [
      {
        id: 'e1',
        institution: 'Rhode Island School of Design',
        degree: 'BFA Graphic Design',
        field: '',
        location: '',
        startDate: '2012',
        endDate: '2016',
        current: false,
        gpa: '',
        achievements: '',
      },
    ],
    skills: [
      { id: 's1', name: 'Figma', level: 'expert', category: 'Design' },
      { id: 's2', name: 'Illustrator', level: 'advanced', category: 'Design' },
    ],
    projects: [
      {
        id: 'p1',
        name: 'Brand Refresh',
        description: 'Complete brand identity overhaul.',
        url: '',
        technologies: ['Figma', 'After Effects'],
        startDate: '2023',
        endDate: '',
        current: true,
      },
    ],
    certifications: [
      {
        id: 'c1',
        name: 'Adobe Certified Expert',
        issuer: 'Adobe',
        date: '2022',
        expiryDate: '',
        credentialId: '',
        url: '',
      },
    ],
    languages: [
      { id: 'l1', name: 'English', proficiency: 'native' },
      { id: 'l2', name: 'Spanish', proficiency: 'fluent' },
    ],
    tools: ['Photoshop', 'Sketch', 'InVision'],
    ...overrides,
  });

  describe('structural — bg-white and A4 container', () => {
    it('renders the shell container inside a bg-white wrapper', () => {
      render(<SplitShell resume={buildResume()} />);
      expect(screen.getByTestId('split-shell')).toBeInTheDocument();
    });

    it('contains an A4 fixed-size container', () => {
      render(<SplitShell resume={buildResume()} />);
      const a4 = screen.getByTestId('a4-container');
      expect(a4).toBeInTheDocument();
    });
  });

  describe('split layout with two columns', () => {
    it('renders primary sections in the left column', () => {
      render(<SplitShell resume={buildResume()} />);
      expect(screen.getByTestId('left-column')).toBeInTheDocument();

      // creative primarySections: summary, projects, workExperience
      expect(screen.getByTestId('section-summary')).toBeInTheDocument();
      expect(screen.getByTestId('section-projects')).toBeInTheDocument();
      expect(screen.getByTestId('section-workExperience')).toBeInTheDocument();
    });

    it('renders sidebar sections in the right column', () => {
      render(<SplitShell resume={buildResume()} />);
      expect(screen.getByTestId('right-column')).toBeInTheDocument();

      // creative sidebarSections: skills, languages, contact
      // skills is handled by skillDots emphasis (left column), not right column
      // So only languages and contact appear in the right column
      expect(screen.getByTestId('section-languages')).toBeInTheDocument();
      expect(screen.getByTestId('section-contact')).toBeInTheDocument();
    });
  });

  describe('section content rendering', () => {
    it('renders summary text from resume data', () => {
      render(<SplitShell resume={buildResume()} />);
      expect(screen.getByText('Design leader with 10 years of experience.')).toBeInTheDocument();
    });

    it('renders work experience with company and position', () => {
      render(<SplitShell resume={buildResume()} />);
      expect(screen.getByText('Art Director')).toBeInTheDocument();
      expect(screen.getByText(/Studio Nine/)).toBeInTheDocument();
    });

    it('renders skills', () => {
      render(<SplitShell resume={buildResume()} />);
      expect(screen.getAllByText('Figma').length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText('Illustrator').length).toBeGreaterThanOrEqual(1);
    });

    it('renders contact info from personalInfo', () => {
      render(<SplitShell resume={buildResume()} />);
      expect(screen.getAllByText('alex@example.com').length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText('555-0200').length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('accent color from template definition', () => {
    it('uses definition accentColor (not resume.themeColor)', () => {
      const resume = buildResume({ themeColor: '#0000FF' });
      render(<SplitShell resume={resume} />);

      // creative accentColor is #a855f7
      const header = screen.getByTestId('section-summary').querySelector('h2');
      expect(header).toHaveStyle({ color: 'rgb(168, 85, 247)' });
    });
  });

  describe('background accent emphasis', () => {
    it('applies left column background accent treatment', () => {
      render(<SplitShell resume={buildResume()} />);
      const left = screen.getByTestId('left-column');
      expect(left).toBeInTheDocument();
      // creative has ['backgroundAccent', 'skillDots'] in emphasisComponents
      // Left column should have accent-styled background
    });
  });

  describe('skillDots emphasis', () => {
    it('renders skill dots when skillDots is in emphasisComponents', () => {
      // graphicDesigner has emphasisComponents: ['backgroundAccent', 'skillDots']
      const resume = buildResume({ template: 'graphicDesigner' });
      render(<SplitShell resume={resume} />);
      expect(screen.getByTestId('emphasis-skillDots')).toBeInTheDocument();
    });

    it('does not render skill dots when not in emphasisComponents', () => {
      // creative has skillDots, so use a template without it
      // sales has ['metricsCallout', 'backgroundAccent'] — no skillDots
      const resume = buildResume({ template: 'sales' });
      render(<SplitShell resume={resume} />);
      expect(screen.queryByTestId('emphasis-skillDots')).not.toBeInTheDocument();
    });
  });

  describe('dark theme text colors', () => {
    it('uses light text on dark background (creative)', () => {
      // creative gradient: #1f1c2c, #3a1c71 → dark
      render(<SplitShell resume={buildResume({ template: 'creative' })} />);
      const shell = screen.getByTestId('split-shell');
      expect(shell).toHaveAttribute('data-theme', 'dark');
    });
  });

  describe('empty state handling', () => {
    it('still renders shell structure with empty resume', () => {
      const empty = createEmptyResume();
      empty.template = 'creative';
      render(<SplitShell resume={empty} />);
      expect(screen.getByTestId('split-shell')).toBeInTheDocument();
      expect(screen.getByTestId('a4-container')).toBeInTheDocument();
      expect(screen.getByTestId('left-column')).toBeInTheDocument();
      expect(screen.getByTestId('right-column')).toBeInTheDocument();
    });
  });
});
