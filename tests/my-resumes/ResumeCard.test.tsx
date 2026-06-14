import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import React from 'react';
import { ResumeCard } from '@/components/my-resumes/ResumeCard';
import { Resume } from '@/types/resume';

vi.mock('next-view-transitions', () => ({
  Link: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
    [key: string]: unknown;
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
      const moreButton = screen.getByRole('button', { name: 'common.myResumes.card.moreActions' });
      fireEvent.click(moreButton);
      // Edit appears twice (dropdown + bottom button), use getAllByText
      expect(screen.getAllByText('common.myResumes.card.edit').length).toBeGreaterThanOrEqual(2);
      expect(screen.getByText('common.myResumes.card.duplicate')).toBeInTheDocument();
      expect(screen.getByText('common.myResumes.card.delete')).toBeInTheDocument();
    });

    it('has Edit link pointing to resume edit page', () => {
      render(
        <ResumeCard resume={mockResume} />
      );
      const moreButton = screen.getByRole('button', { name: 'common.myResumes.card.moreActions' });
      fireEvent.click(moreButton);
      // Edit appears in both dropdown and bottom button — find the one that's an <a>
      const editLinks = screen.getAllByText('common.myResumes.card.edit');
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
      const moreButton = screen.getByRole('button', { name: 'common.myResumes.card.moreActions' });
      fireEvent.click(moreButton);
      fireEvent.click(screen.getByText('common.myResumes.card.duplicate'));
      expect(onDuplicate).toHaveBeenCalledWith('resume-1');
    });

    it('calls onDelete when Delete is clicked', () => {
      const onDelete = vi.fn();
      render(
        <ResumeCard resume={mockResume} onDelete={onDelete} />
      );
      const moreButton = screen.getByRole('button', { name: 'common.myResumes.card.moreActions' });
      fireEvent.click(moreButton);
      fireEvent.click(screen.getByText('common.myResumes.card.delete'));
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
