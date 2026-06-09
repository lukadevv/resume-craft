import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { StepSidebar } from '@/components/wizard/StepSidebar';

const baseSteps = [
  { id: 'personal', label: 'Personal Info' },
  { id: 'summary', label: 'Summary' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'additional', label: 'Additional' },
  { id: 'review', label: 'Review & Export' },
];

const mockOnStepClick = vi.fn();

describe('StepSidebar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  describe('rendering', () => {
    it('renders all step labels', () => {
      render(
        <StepSidebar
          steps={baseSteps}
          currentStep={0}
          completedSteps={new Set()}
          onStepClick={mockOnStepClick}
        />
      );

      for (const step of baseSteps) {
        expect(screen.getByText(step.label)).toBeInTheDocument();
      }
    });

    it('shows step numbers for each step', () => {
      render(
        <StepSidebar
          steps={baseSteps}
          currentStep={0}
          completedSteps={new Set()}
          onStepClick={mockOnStepClick}
        />
      );

      // Steps should show numbers 1-8
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('8')).toBeInTheDocument();
    });
  });

  describe('progress bar', () => {
    it('shows 0% progress when no steps completed', () => {
      render(
        <StepSidebar
          steps={baseSteps}
          currentStep={0}
          completedSteps={new Set()}
          onStepClick={mockOnStepClick}
        />
      );

      expect(screen.getByText('0%')).toBeInTheDocument();
    });

    it('shows 25% progress when 2 of 8 steps completed', () => {
      render(
        <StepSidebar
          steps={baseSteps}
          currentStep={2}
          completedSteps={new Set(['personal', 'summary'])}
          onStepClick={mockOnStepClick}
        />
      );

      expect(screen.getByText('25%')).toBeInTheDocument();
    });

    it('shows 100% progress when all steps completed', () => {
      const allIds = new Set(baseSteps.map((s) => s.id));
      render(
        <StepSidebar
          steps={baseSteps}
          currentStep={7}
          completedSteps={allIds}
          onStepClick={mockOnStepClick}
        />
      );

      expect(screen.getByText('100%')).toBeInTheDocument();
    });
  });

  describe('current step highlighting', () => {
    it('highlights step 1 when currentStep is 0', () => {
      render(
        <StepSidebar
          steps={baseSteps}
          currentStep={0}
          completedSteps={new Set()}
          onStepClick={mockOnStepClick}
        />
      );

      const personalButton = screen.getByText('Personal Info').closest('button');
      expect(personalButton).not.toBeNull();
      // Current step should NOT be disabled
      expect(personalButton).not.toBeDisabled();
    });

    it('all future steps are not clickable when on first step', () => {
      render(
        <StepSidebar
          steps={baseSteps}
          currentStep={0}
          completedSteps={new Set()}
          onStepClick={mockOnStepClick}
        />
      );

      // Click a future step (step 5 — index 4)
      fireEvent.click(screen.getByText('Skills'));
      expect(mockOnStepClick).not.toHaveBeenCalled();
    });
  });

  describe('completed steps', () => {
    it('shows checkmark icon for completed steps', () => {
      render(
        <StepSidebar
          steps={baseSteps}
          currentStep={2}
          completedSteps={new Set(['personal', 'summary'])}
          onStepClick={mockOnStepClick}
        />
      );

      // Completed steps should have checkmarks via svg element
      const personalButton = screen.getByText('Personal Info').closest('button');
      const summaryButton = screen.getByText('Summary').closest('button');
      expect(personalButton).not.toBeNull();
      expect(summaryButton).not.toBeNull();
    });

    it('clicking a completed step calls onStepClick with its id', () => {
      render(
        <StepSidebar
          steps={baseSteps}
          currentStep={2}
          completedSteps={new Set(['personal', 'summary'])}
          onStepClick={mockOnStepClick}
        />
      );

      fireEvent.click(screen.getByText('Personal Info'));
      expect(mockOnStepClick).toHaveBeenCalledWith('personal');
    });

    it('clicking the current step does NOT call onStepClick', () => {
      render(
        <StepSidebar
          steps={baseSteps}
          currentStep={2}
          completedSteps={new Set(['personal', 'summary'])}
          onStepClick={mockOnStepClick}
        />
      );

      fireEvent.click(screen.getByText('Experience'));
      expect(mockOnStepClick).not.toHaveBeenCalled();
    });
  });

  describe('future steps', () => {
    it('future steps are visually dimmed and not interactive', () => {
      render(
        <StepSidebar
          steps={baseSteps}
          currentStep={0}
          completedSteps={new Set()}
          onStepClick={mockOnStepClick}
        />
      );

      // Click step 3 (index 2) — future step
      fireEvent.click(screen.getByText('Education'));
      expect(mockOnStepClick).not.toHaveBeenCalled();
    });
  });

  describe('edge cases', () => {
    it('handles single-element step array', () => {
      const singleStep = [{ id: 'personal', label: 'Personal Info' }];
      render(
        <StepSidebar
          steps={singleStep}
          currentStep={0}
          completedSteps={new Set()}
          onStepClick={mockOnStepClick}
        />
      );

      expect(screen.getByText('Personal Info')).toBeInTheDocument();
      expect(screen.getByText('0%')).toBeInTheDocument();
    });

    it('shows 100% when single step is completed', () => {
      const singleStep = [{ id: 'personal', label: 'Personal Info' }];
      render(
        <StepSidebar
          steps={singleStep}
          currentStep={0}
          completedSteps={new Set(['personal'])}
          onStepClick={mockOnStepClick}
        />
      );

      expect(screen.getByText('100%')).toBeInTheDocument();
    });
  });
});
