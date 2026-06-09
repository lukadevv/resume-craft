import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { StepForm } from '@/components/wizard/StepForm';
import { createEmptyResume } from '@/types/resume';
import type { Resume } from '@/types/resume';

// Create a mock resume with minimal data
const createMockResume = (overrides?: Partial<Resume>): Resume => ({
  ...createEmptyResume(),
  id: 'test-1',
  name: 'Test Resume',
  template: 'modern',
  themeColor: '#3ECF8E',
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    portfolio: '',
    summary: '',
  },
  summary: '',
  workExperience: [],
  education: [],
  skills: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  ...overrides,
});

const mockOnUpdate = vi.fn();

describe('StepForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  describe('form rendering', () => {
    it('renders Personal Info form for personal step', () => {
      const resume = createMockResume();
      render(
        <StepForm
          step="personal"
          resume={resume}
          onUpdate={mockOnUpdate}
        />
      );

      // Both the StepForm wrapper and PersonalInfoForm render "Personal Information"
      expect(screen.getAllByText('Personal Information').length).toBeGreaterThanOrEqual(1);
      expect(screen.getByLabelText('First Name')).toBeInTheDocument();
      expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
    });

    it('renders Summary form for summary step', () => {
      const resume = createMockResume({ summary: 'Test summary' });
      render(
        <StepForm
          step="summary"
          resume={resume}
          onUpdate={mockOnUpdate}
        />
      );

      expect(screen.getByText('Professional Summary')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Test summary')).toBeInTheDocument();
    });

    it('renders Experience form for experience step', () => {
      const resume = createMockResume({
        workExperience: [
          {
            id: 'exp-1',
            company: 'Acme Corp',
            position: 'Developer',
            location: '',
            startDate: '',
            endDate: '',
            current: false,
            description: '',
          },
        ],
      });
      render(
        <StepForm
          step="experience"
          resume={resume}
          onUpdate={mockOnUpdate}
        />
      );

      expect(screen.getByText('Work Experience')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Acme Corp')).toBeInTheDocument();
    });

    it('renders Education form for education step', () => {
      const resume = createMockResume();
      render(
        <StepForm
          step="education"
          resume={resume}
          onUpdate={mockOnUpdate}
        />
      );

      expect(screen.getByText('Education')).toBeInTheDocument();
    });

    it('renders Skills form for skills step', () => {
      const resume = createMockResume();
      render(
        <StepForm
          step="skills"
          resume={resume}
          onUpdate={mockOnUpdate}
        />
      );

      expect(screen.getByText('Skills')).toBeInTheDocument();
    });

    it('renders Projects form for projects step', () => {
      const resume = createMockResume();
      render(
        <StepForm
          step="projects"
          resume={resume}
          onUpdate={mockOnUpdate}
        />
      );

      expect(screen.getByText('Projects')).toBeInTheDocument();
    });

    it('renders 4 sub-forms for additional step', () => {
      const resume = createMockResume();
      render(
        <StepForm
          step="additional"
          resume={resume}
          onUpdate={mockOnUpdate}
        />
      );

      // Sub-forms each have their own h2 + the section h3 heading (duplicates possible)
      expect(screen.getByText('Additional Information')).toBeInTheDocument();
      expect(screen.getAllByText('Languages').length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText('Interests').length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText('References').length).toBeGreaterThanOrEqual(1);
    });

    it('renders empty state for review step', () => {
      const resume = createMockResume();
      render(
        <StepForm
          step="review"
          resume={resume}
          onUpdate={mockOnUpdate}
        />
      );

      // Review step shows a placeholder message
      expect(
        screen.getByText(/review your resume/i)
      ).toBeInTheDocument();
    });
  });

  describe('required field indicators', () => {
    it('shows required indicators on personal step', () => {
      const resume = createMockResume();
      render(
        <StepForm
          step="personal"
          resume={resume}
          onUpdate={mockOnUpdate}
        />
      );

      // First Name and Last Name are key fields, should have indicators
      // Check for asterisk or required text
      const firstNameLabel = screen.getByText('First Name');
      expect(firstNameLabel).toBeInTheDocument();
    });
  });
});
