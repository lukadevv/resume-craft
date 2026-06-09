import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { WizardClient } from '@/app/resume/wizard/WizardClient';
import { useResumeStore } from '@/store/resume';

// Track the resume ID created during setup for the searchParams mock
let testResumeId = '';

// Mock next/navigation with dynamic ID
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
  useSearchParams: () => {
    return new URLSearchParams(`id=${testResumeId}`);
  },
  usePathname: () => '/resume/wizard',
}));

// Mock next/link since Header renders navigation links
vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

// Mock next/image 
vi.mock('next/image', () => ({
  default: (props: any) => <img {...props} />,
}));

// Mock next-themes
vi.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'light', setTheme: vi.fn() }),
}));

// Mock child components to isolate WizardClient logic
vi.mock('@/components/wizard/StepSidebar', () => ({
  StepSidebar: ({ steps, currentStep, completedSteps, onStepClick }: any) => (
    <div data-testid="step-sidebar">
      <span data-testid="current-step">{currentStep}</span>
      <span data-testid="completed-count">{completedSteps.size}</span>
      {steps.map((s: any) => (
        <button key={s.id} data-testid={`sidebar-${s.id}`} onClick={() => onStepClick(s.id)}>
          {s.label}
        </button>
      ))}
    </div>
  ),
}));

vi.mock('@/components/wizard/StepForm', () => ({
  StepForm: ({ step, resume, onUpdate: _onUpdate }: any) => (
    <div data-testid="step-form">
      <span data-testid="active-step">{step}</span>
      <span data-testid="resume-name">{resume.name}</span>
    </div>
  ),
}));

vi.mock('@/components/wizard/StepPreview', () => ({
  StepPreview: ({ resume }: any) => (
    <div data-testid="step-preview">Preview: {resume.name}</div>
  ),
}));

vi.mock('@/components/wizard/ReviewExport', () => ({
  ReviewExport: ({ resume, onEditStep }: any) => (
    <div data-testid="review-export">
      Review: {resume.name}
      <button data-testid="edit-personal" onClick={() => onEditStep('personal')}>
        Edit Personal
      </button>
    </div>
  ),
}));

vi.mock('@/lib/sampleData', () => ({
  getSampleDataForTemplate: () => ({
    personalInfo: {
      firstName: 'Sample',
      lastName: 'User',
      email: 'sample@test.com',
      phone: '',
      location: '',
      website: '',
      linkedin: '',
      portfolio: '',
      summary: '',
    },
    summary: 'Sample summary',
    workExperience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    languages: [],
  }),
}));

describe('WizardClient', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    cleanup();
    useResumeStore.setState({ resumes: [] });

    // Create a resume and store the ID
    const resume = useResumeStore.getState().createResume({
      template: 'modern',
      name: 'Wizard Test Resume',
    });
    testResumeId = resume.id;
  });

  describe('rendering', () => {
    it('renders the 3-panel layout', () => {
      render(<WizardClient />);

      expect(screen.getByTestId('step-sidebar')).toBeInTheDocument();
      // Desktop + mobile layout renders StepForm twice (hidden by CSS)
      expect(screen.getAllByTestId('step-form').length).toBeGreaterThanOrEqual(1);
      expect(screen.getByTestId('step-preview')).toBeInTheDocument();
    });

    it('starts at step 0 (Personal Info)', () => {
      render(<WizardClient />);

      expect(screen.getByTestId('current-step').textContent).toBe('0');
      // Desktop + mobile renders active-step twice
      const activeSteps = screen.getAllByTestId('active-step');
      expect(activeSteps[0].textContent).toBe('personal');
    });

    it('passes resume name to child components', () => {
      render(<WizardClient />);

      const names = screen.getAllByTestId('resume-name');
      expect(names[0].textContent).toBe('Wizard Test Resume');
    });
  });

  describe('step navigation', () => {
    it('navigates forward and backward', () => {
      render(<WizardClient />);

      expect(screen.getByTestId('current-step').textContent).toBe('0');

      // Click Next using wizard's own button
      fireEvent.click(screen.getByTestId('wizard-next'));
      expect(screen.getByTestId('current-step').textContent).toBe('1');

      // Click Back using wizard's own button
      fireEvent.click(screen.getByTestId('wizard-back'));
      expect(screen.getByTestId('current-step').textContent).toBe('0');
    });

    it('shows ReviewExport at last step', () => {
      render(<WizardClient />);

      // Navigate to step 7 (review) — click Next/Review & Export 7 times
      for (let i = 0; i < 6; i++) {
        fireEvent.click(screen.getByTestId('wizard-next'));
      }
      // At step 6, button text changes to "Review & Export" but testid stays
      fireEvent.click(screen.getByTestId('wizard-next'));

      expect(screen.getAllByTestId('review-export').length).toBeGreaterThanOrEqual(1);
    });

    it('Back is disabled on first step', () => {
      render(<WizardClient />);

      expect(screen.getByTestId('wizard-back')).toBeDisabled();
    });
  });

  describe('completed steps tracking', () => {
    it('marks step as completed after advancing past it', () => {
      render(<WizardClient />);

      expect(screen.getByTestId('completed-count').textContent).toBe('0');

      fireEvent.click(screen.getByTestId('wizard-next'));

      expect(screen.getByTestId('completed-count').textContent).toBe('1');
    });
  });

  describe('sidebar click navigation', () => {
    it('navigates to completed step via sidebar click', () => {
      render(<WizardClient />);

      // Advance past step 0
      fireEvent.click(screen.getByTestId('wizard-next'));

      // Click completed step in sidebar
      fireEvent.click(screen.getByTestId('sidebar-personal'));

      // Should navigate back to step 0
      expect(screen.getByTestId('current-step').textContent).toBe('0');
    });
  });

  describe('load sample data', () => {
    it('renders Load Sample Data button', () => {
      render(<WizardClient />);

      expect(screen.getByTestId('wizard-load-sample')).toBeInTheDocument();
    });
  });
});
