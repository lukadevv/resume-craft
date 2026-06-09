import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { StepPreview } from '@/components/wizard/StepPreview';
import { createEmptyResume } from '@/types/resume';
import type { Resume } from '@/types/resume';

// Mock ResizeObserver for jsdom
class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.ResizeObserver = MockResizeObserver as unknown as typeof ResizeObserver;

// Mock getTemplateComponent to return a simple stub
vi.mock('@/components/resume/export/ExportMenu', () => ({
  getTemplateComponent: vi.fn(() =>
    ({ resume: r }: { resume: Resume }) =>
      <div data-testid="template-component" data-template={r.template}>
        {r.personalInfo?.firstName || 'No Data'}
      </div>
  ),
}));

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

describe('StepPreview', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  describe('rendering', () => {
    it('renders the template component when resume has data', () => {
      const resume = createMockResume({
        personalInfo: {
          ...createMockResume().personalInfo,
          firstName: 'Jane',
        },
      });
      render(<StepPreview resume={resume} />);

      expect(screen.getByTestId('template-component')).toBeInTheDocument();
    });

    it('passes the correct template to the component', () => {
      const resume = createMockResume({
        template: 'classic',
        personalInfo: {
          ...createMockResume().personalInfo,
          firstName: 'Jane',
        },
      });
      render(<StepPreview resume={resume} />);

      const preview = screen.getByTestId('template-component');
      expect(preview.dataset.template).toBe('classic');
    });
  });

  describe('empty state', () => {
    it('shows empty-state message when resume has no personal info data', () => {
      const resume = createMockResume();
      render(<StepPreview resume={resume} />);

      expect(screen.getByText(/start filling in your details/i)).toBeInTheDocument();
    });

    it('hides empty-state message when resume has data', () => {
      const resume = createMockResume({
        personalInfo: {
          ...createMockResume().personalInfo,
          firstName: 'Jane',
          lastName: 'Doe',
        },
      });
      render(<StepPreview resume={resume} />);

      expect(
        screen.queryByText(/start filling in your details/i)
      ).toBeNull();
    });
  });

  describe('layout', () => {
    it('has step-preview testid', () => {
      const resume = createMockResume();
      render(<StepPreview resume={resume} />);

      const container = screen.getByTestId('step-preview');
      expect(container).toBeInTheDocument();
    });

    it('is sticky positioned', () => {
      const resume = createMockResume();
      render(<StepPreview resume={resume} />);

      const container = screen.getByTestId('step-preview');
      expect(container.className).toContain('sticky');
    });
  });
});
