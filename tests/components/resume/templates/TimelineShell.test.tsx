import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { TimelineShell } from '@/components/resume/templates/TimelineShell';
import { createEmptyResume } from '@/types/resume';
import type { Resume } from '@/types/resume';

describe('TimelineShell', () => {
  beforeEach(() => {
    cleanup();
  });

  const buildResume = (overrides: Partial<Resume> = {}): Resume => ({
    ...createEmptyResume(),
    template: 'classic',
    personalInfo: {
      ...createEmptyResume().personalInfo,
      firstName: 'Pat',
      lastName: 'Johnson',
      email: 'pat@example.com',
      phone: '555-0400',
      location: 'Chicago, IL',
      summary: 'Seasoned project leader',
    },
    summary: 'Experienced professional with a track record of delivery.',
    workExperience: [
      {
        id: 'w1',
        company: 'BigCorp',
        position: 'Project Manager',
        location: 'Chicago',
        startDate: '2018',
        endDate: '2024',
        current: false,
        description: 'Managed $5M portfolio.',
      },
      {
        id: 'w2',
        company: 'Startup Inc',
        position: 'Team Lead',
        location: 'Remote',
        startDate: '2015',
        endDate: '2018',
        current: false,
        description: 'Led engineering team of 8.',
      },
    ],
    education: [
      {
        id: 'e1',
        institution: 'University of Chicago',
        degree: 'MBA',
        field: '',
        location: '',
        startDate: '2013',
        endDate: '2015',
        current: false,
        gpa: '',
        achievements: '',
      },
    ],
    skills: [
      { id: 's1', name: 'Leadership', level: 'expert', category: 'Management' },
      { id: 's2', name: 'Agile', level: 'advanced', category: 'Methodology' },
    ],
    projects: [],
    certifications: [
      {
        id: 'c1',
        name: 'PMP',
        issuer: 'PMI',
        date: '2019',
        expiryDate: '',
        credentialId: '',
        url: '',
      },
      {
        id: 'c2',
        name: 'CSM',
        issuer: 'Scrum Alliance',
        date: '2020',
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
      render(<TimelineShell resume={buildResume()} />);
      expect(screen.getByTestId('timeline-shell')).toBeInTheDocument();
    });

    it('contains an A4 fixed-size container', () => {
      render(<TimelineShell resume={buildResume()} />);
      const a4 = screen.getByTestId('a4-container');
      expect(a4).toBeInTheDocument();
    });
  });

  describe('sections from template definition', () => {
    it('renders primary sections in sequence', () => {
      render(<TimelineShell resume={buildResume()} />);

      // classic primarySections: summary, workExperience
      expect(screen.getByTestId('section-summary')).toBeInTheDocument();
      expect(screen.getByTestId('section-workExperience')).toBeInTheDocument();
    });

    it('renders sidebar sections in sequence', () => {
      render(<TimelineShell resume={buildResume()} />);

      // classic sidebarSections: education, skills, languages
      expect(screen.getByTestId('section-education')).toBeInTheDocument();
      expect(screen.getByTestId('section-skills')).toBeInTheDocument();
      expect(screen.getByTestId('section-languages')).toBeInTheDocument();
    });
  });

  describe('section content', () => {
    it('renders summary text', () => {
      render(<TimelineShell resume={buildResume()} />);
      expect(
        screen.getByText('Experienced professional with a track record of delivery.')
      ).toBeInTheDocument();
    });

    it('renders work experience entries', () => {
      render(<TimelineShell resume={buildResume()} />);
      expect(screen.getByText('Project Manager')).toBeInTheDocument();
      expect(screen.getByText('Team Lead')).toBeInTheDocument();
    });

    it('renders multiple experience entries', () => {
      render(<TimelineShell resume={buildResume()} />);
      // Both positions should appear
      expect(screen.getByText(/BigCorp/)).toBeInTheDocument();
      expect(screen.getByText(/Startup Inc/)).toBeInTheDocument();
    });
  });

  describe('timelineGraphic emphasis', () => {
    it('renders TimelineGraphic when emphasis includes timelineGraphic', () => {
      // projectManager has timelineGraphic in emphasisComponents
      const resume = buildResume({ template: 'projectManager' });
      render(<TimelineShell resume={resume} />);
      expect(screen.getByTestId('emphasis-timelineGraphic')).toBeInTheDocument();
    });

    it('does not render TimelineGraphic when not in emphasis', () => {
      // classic has no emphasis components
      render(<TimelineShell resume={buildResume({ template: 'classic' })} />);
      expect(
        screen.queryByTestId('emphasis-timelineGraphic')
      ).not.toBeInTheDocument();
    });
  });

  describe('certificationBadge emphasis', () => {
    it('renders CertificationBadge when emphasis includes certificationBadge', () => {
      const resume = buildResume({ template: 'projectManager' });
      render(<TimelineShell resume={resume} />);
      expect(screen.getByTestId('emphasis-certificationBadge')).toBeInTheDocument();
    });
  });

  describe('accent color', () => {
    it('uses definition accentColor', () => {
      render(<TimelineShell resume={buildResume({ template: 'classic' })} />);
      // classic accentColor is #2563eb
      const header = screen.getByTestId('section-summary').querySelector('h2');
      expect(header).toHaveStyle({ color: 'rgb(37, 99, 235)' });
    });
  });

  describe('dark/light theme', () => {
    it('detects dark theme for projectManager', () => {
      // projectManager gradient: #1e1b4b → dark
      render(<TimelineShell resume={buildResume({ template: 'projectManager' })} />);
      expect(screen.getByTestId('timeline-shell')).toHaveAttribute(
        'data-theme',
        'dark'
      );
    });

    it('detects light theme for classic', () => {
      // classic gradient: #f8fafc → light
      render(<TimelineShell resume={buildResume({ template: 'classic' })} />);
      expect(screen.getByTestId('timeline-shell')).toHaveAttribute(
        'data-theme',
        'light'
      );
    });
  });

  describe('empty state', () => {
    it('renders structure with empty resume', () => {
      const empty = createEmptyResume();
      empty.template = 'classic';
      render(<TimelineShell resume={empty} />);
      expect(screen.getByTestId('timeline-shell')).toBeInTheDocument();
      expect(screen.getByTestId('a4-container')).toBeInTheDocument();
    });
  });
});
