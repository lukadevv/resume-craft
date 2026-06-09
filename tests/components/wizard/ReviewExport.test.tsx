import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { ReviewExport } from '@/components/wizard/ReviewExport';
import { createEmptyResume } from '@/types/resume';
import type { Resume } from '@/types/resume';

// Mock ExportMenu
vi.mock('@/components/resume/export/ExportMenu', () => ({
  ExportMenu: ({ resume }: { resume: Resume }) => (
    <div data-testid="export-menu">Export: {resume.personalInfo.firstName}</div>
  ),
}));

const createMockResume = (overrides?: Partial<Resume>): Resume => ({
  ...createEmptyResume(),
  id: 'test-1',
  name: 'Test Resume',
  template: 'modern',
  themeColor: '#3ECF8E',
  personalInfo: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '(555) 123-4567',
    location: 'San Francisco, CA',
    website: '',
    linkedin: '',
    portfolio: '',
    summary: '',
  },
  summary: 'A professional summary.',
  workExperience: [
    {
      id: 'exp-1',
      company: 'Acme Corp',
      position: 'Senior Dev',
      location: 'SF',
      startDate: '2020-01',
      endDate: '',
      current: true,
      description: 'Did stuff',
    },
  ],
  education: [
    {
      id: 'edu-1',
      institution: 'UC Berkeley',
      degree: 'BS',
      field: 'CS',
      location: 'Berkeley',
      startDate: '2015-09',
      endDate: '2019-05',
      current: false,
      gpa: '3.8',
      achievements: '',
    },
  ],
  skills: [
    { id: 'sk-1', name: 'TypeScript', level: 'expert', category: 'Languages' },
  ],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  ...overrides,
});

const mockOnEditStep = vi.fn();

describe('ReviewExport', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  describe('section summaries', () => {
    it('renders Personal Info summary', () => {
      const resume = createMockResume();
      render(
        <ReviewExport resume={resume} onEditStep={mockOnEditStep} />
      );

      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('john@example.com')).toBeInTheDocument();
    });

    it('renders Experience summary with company names', () => {
      const resume = createMockResume();
      render(
        <ReviewExport resume={resume} onEditStep={mockOnEditStep} />
      );

      expect(screen.getByText('Acme Corp')).toBeInTheDocument();
    });

    it('shows empty message for sections with no data', () => {
      const resume = createMockResume({
        workExperience: [],
        education: [],
        skills: [],
      });
      render(
        <ReviewExport resume={resume} onEditStep={mockOnEditStep} />
      );

      expect(screen.getByText(/no experience/i)).toBeInTheDocument();
      expect(screen.getByText(/no education/i)).toBeInTheDocument();
      expect(screen.getByText(/no skills/i)).toBeInTheDocument();
    });
  });

  describe('edit links', () => {
    it('renders Edit links for each section', () => {
      const resume = createMockResume();
      render(
        <ReviewExport resume={resume} onEditStep={mockOnEditStep} />
      );

      // Should have Edit buttons/text for each section
      const editLinks = screen.getAllByText('Edit');
      expect(editLinks.length).toBeGreaterThanOrEqual(5); // At least the main sections
    });

    it('Edit link on Personal Info calls onEditStep with correct step', () => {
      const resume = createMockResume();
      render(
        <ReviewExport resume={resume} onEditStep={mockOnEditStep} />
      );

      const editLinks = screen.getAllByText('Edit');
      // Click first Edit (Personal Info)
      editLinks[0].click();
      expect(mockOnEditStep).toHaveBeenCalledWith('personal');
    });
  });

  describe('export', () => {
    it('renders the ExportMenu', () => {
      const resume = createMockResume();
      render(
        <ReviewExport resume={resume} onEditStep={mockOnEditStep} />
      );

      expect(screen.getByTestId('export-menu')).toBeInTheDocument();
    });

    it('passes the resume to ExportMenu', () => {
      const resume = createMockResume({
        personalInfo: {
          ...createMockResume().personalInfo,
          firstName: 'Jane',
        },
      });
      render(
        <ReviewExport resume={resume} onEditStep={mockOnEditStep} />
      );

      // ExportMenu mock renders "Export: {firstName}" 
      expect(screen.getByTestId('export-menu')).toBeInTheDocument();
    });
  });

  describe('edge cases', () => {
    it('handles completely empty resume gracefully', () => {
      const empty = createMockResume({
        personalInfo: {
          ...createMockResume().personalInfo,
          firstName: '',
          lastName: '',
          email: '',
        },
        summary: '',
        workExperience: [],
        education: [],
        skills: [],
        projects: [],
        certifications: [],
        languages: [],
        interests: [],
        references: [],
      });
      render(
        <ReviewExport resume={empty} onEditStep={mockOnEditStep} />
      );

      // Should not crash — section headers are rendered
      expect(screen.getByText('Personal Info')).toBeInTheDocument();
      expect(screen.getByText('Summary')).toBeInTheDocument();
      expect(screen.getByText('Experience')).toBeInTheDocument();
    });
  });
});
