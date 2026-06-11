import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import React from 'react';
import { ResumeCard } from '@/components/my-resumes/ResumeCard';
import { Resume } from '@/types/resume';

vi.mock('next/link', () => ({
  default: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: { src: string; alt: string }) => (
    <img src={src} alt={alt} {...props} />
  ),
}));

const mockResume: Resume = {
  id: 'resume-1',
  name: 'Software Engineer CV',
  template: 'modern',
  themeColor: '#3ECF8E',
  personalInfo: {
    firstName: 'John',
    lastName: 'Doe',
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
  projects: [],
  certifications: [],
  languages: [],
  interests: [],
  references: [],
  customIcons: [],
  customSections: [],
  tools: [],
  coreCompetencies: [],
  achievements: [],
  portfolio: '',
  awards: [],
  affiliations: [],
  publications: [],
  grantsFellowships: [],
  conferences: [],
  clinicalSkills: [],
  licenses: [],
  barAdmission: [],
  practiceAreas: [],
  securityClearance: '',
  teachingPhilosophy: '',
  classroomExperience: '',
  teachingExperience: [],
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-06-01T00:00:00.000Z',
};

describe('ResumeCard', () => {
  beforeEach(() => {
    cleanup();
  });

  describe('rendering', () => {
    it('displays the resume name', () => {
      render(
        <ResumeCard resume={mockResume} />
      );
      expect(screen.getByText('Software Engineer CV')).toBeInTheDocument();
    });

    it('displays the template name', () => {
      render(
        <ResumeCard resume={mockResume} />
      );
      expect(screen.getByText(/Modern/)).toBeInTheDocument();
    });

    it('displays a formatted date', () => {
      render(
        <ResumeCard resume={mockResume} />
      );
      // updatedAt: 2026-06-01 → "Jun 1, 2026"
      expect(screen.getByText(/Jun 1, 2026/)).toBeInTheDocument();
    });

    it('renders a checkbox for multi-select', () => {
      render(
        <ResumeCard resume={mockResume} />
      );
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeInTheDocument();
    });
  });

  describe('template-derived styles', () => {
    it('applies inline style with --accent custom property from template', () => {
      const { container } = render(
        <ResumeCard resume={mockResume} />
      );
      const cardElement = container.firstElementChild;
      expect(cardElement).toBeInTheDocument();
      expect(cardElement!.getAttribute('style')).toContain('--accent');
    });

    it('applies --card-bg-light custom property', () => {
      const { container } = render(
        <ResumeCard resume={mockResume} />
      );
      const cardElement = container.firstElementChild;
      expect(cardElement!.getAttribute('style')).toContain('--card-bg-light');
    });

    it('renders a mini preview area', () => {
      const { container } = render(
        <ResumeCard resume={mockResume} />
      );
      // Mini preview is a div with abstract shapes
      const previewElements = container.querySelectorAll('[class*="h-20"]');
      expect(previewElements.length).toBeGreaterThan(0);
    });
  });

  describe('checkbox behavior', () => {
    it('calls onSelect with resume id when checkbox is toggled', () => {
      const onSelect = vi.fn();
      render(
        <ResumeCard resume={mockResume} onSelect={onSelect} />
      );
      const checkbox = screen.getByRole('checkbox');
      fireEvent.click(checkbox);
      expect(onSelect).toHaveBeenCalledWith('resume-1', true);
    });

    it('marks checkbox as checked when selected prop is true', () => {
      render(
        <ResumeCard resume={mockResume} selected={true} />
      );
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.checked).toBe(true);
    });
  });

  describe('actions dropdown', () => {
    it('opens dropdown menu when more button is clicked', () => {
      render(
        <ResumeCard resume={mockResume} />
      );
      const moreButton = screen.getByRole('button', { name: /more/i });
      fireEvent.click(moreButton);
      // Edit, Duplicate, Delete should be visible in dropdown
      const editLinks = screen.getAllByText('Edit');
      // At least one Edit appears in dropdown (the Link component)
      expect(editLinks.length).toBeGreaterThanOrEqual(2);
      expect(screen.getByText('Duplicate')).toBeInTheDocument();
      expect(screen.getByText('Delete')).toBeInTheDocument();
    });

    it('has Edit link pointing to resume edit page', () => {
      render(
        <ResumeCard resume={mockResume} />
      );
      const moreButton = screen.getByRole('button', { name: /more/i });
      fireEvent.click(moreButton);
      // The dropdown Edit link has href attribute
      const editLinks = screen.getAllByText('Edit');
      // Find the one that's a Link (has closest 'a' with href)
      const dropdownEdit = editLinks
        .map((el) => el.closest('a'))
        .find((a) => a?.getAttribute('href')?.includes('resume/edit'));
      expect(dropdownEdit).toHaveAttribute('href', '/resume/edit?id=resume-1');
    });

    it('calls onDuplicate when Duplicate is clicked', () => {
      const onDuplicate = vi.fn();
      render(
        <ResumeCard resume={mockResume} onDuplicate={onDuplicate} />
      );
      const moreButton = screen.getByRole('button', { name: /more/i });
      fireEvent.click(moreButton);
      fireEvent.click(screen.getByText('Duplicate'));
      expect(onDuplicate).toHaveBeenCalledWith('resume-1');
    });

    it('calls onDelete when Delete is clicked', () => {
      const onDelete = vi.fn();
      render(
        <ResumeCard resume={mockResume} onDelete={onDelete} />
      );
      const moreButton = screen.getByRole('button', { name: /more/i });
      fireEvent.click(moreButton);
      fireEvent.click(screen.getByText('Delete'));
      expect(onDelete).toHaveBeenCalledWith('resume-1');
    });
  });

  describe('edge cases', () => {
    it('handles a template that is not in the definition map gracefully', () => {
      const unknownResume = {
        ...mockResume,
        template: 'nonexistent' as Resume['template'],
      };
      expect(() =>
        render(<ResumeCard resume={unknownResume} />)
      ).not.toThrow();
    });
  });
});
