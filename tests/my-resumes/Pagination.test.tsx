import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Pagination } from '@/components/my-resumes/Pagination';

describe('Pagination', () => {
  beforeEach(() => {
    cleanup();
  });

  describe('rendering', () => {
    it('shows the translated page info text', () => {
      render(
        <Pagination
          currentPage={1}
          totalPages={3}
          onPageChange={vi.fn()}
        />
      );
      // Without NextIntlClientProvider, parameterized keys render as raw key
      expect(screen.getByText(/common\.myResumes\.pagination\.pageInfo/)).toBeInTheDocument();
    });

    it('renders translated Previous and Next buttons', () => {
      render(
        <Pagination
          currentPage={1}
          totalPages={5}
          onPageChange={vi.fn()}
        />
      );
      expect(screen.getByText('common.myResumes.pagination.previous')).toBeInTheDocument();
      expect(screen.getByText('common.myResumes.pagination.next')).toBeInTheDocument();
    });
  });

  describe('pagination state', () => {
    it('disables Previous button on first page', () => {
      render(
        <Pagination
          currentPage={1}
          totalPages={5}
          onPageChange={vi.fn()}
        />
      );
      const prevButton = screen.getByText('common.myResumes.pagination.previous').closest('button')!;
      expect(prevButton).toBeDisabled();
    });

    it('disables Next button on last page', () => {
      render(
        <Pagination
          currentPage={5}
          totalPages={5}
          onPageChange={vi.fn()}
        />
      );
      const nextButton = screen.getByText('common.myResumes.pagination.next').closest('button')!;
      expect(nextButton).toBeDisabled();
    });

    it('enables both buttons on a middle page', () => {
      render(
        <Pagination
          currentPage={3}
          totalPages={5}
          onPageChange={vi.fn()}
        />
      );
      const prevButton = screen.getByText('common.myResumes.pagination.previous').closest('button')!;
      const nextButton = screen.getByText('common.myResumes.pagination.next').closest('button')!;
      expect(prevButton).not.toBeDisabled();
      expect(nextButton).not.toBeDisabled();
    });
  });

  describe('interactions', () => {
    it('calls onPageChange with previous page on Previous click', () => {
      const onPageChange = vi.fn();
      render(
        <Pagination
          currentPage={3}
          totalPages={5}
          onPageChange={onPageChange}
        />
      );
      fireEvent.click(screen.getByText('common.myResumes.pagination.previous'));
      expect(onPageChange).toHaveBeenCalledWith(2);
    });

    it('calls onPageChange with next page on Next click', () => {
      const onPageChange = vi.fn();
      render(
        <Pagination
          currentPage={3}
          totalPages={5}
          onPageChange={onPageChange}
        />
      );
      fireEvent.click(screen.getByText('common.myResumes.pagination.next'));
      expect(onPageChange).toHaveBeenCalledWith(4);
    });

    it('renders page number buttons for navigation', () => {
      render(
        <Pagination
          currentPage={2}
          totalPages={5}
          onPageChange={vi.fn()}
        />
      );
      for (const page of [1, 2, 3, 4, 5]) {
        expect(screen.getByText(String(page))).toBeInTheDocument();
      }
    });

    it('calls onPageChange with correct page when number is clicked', () => {
      const onPageChange = vi.fn();
      render(
        <Pagination
          currentPage={2}
          totalPages={5}
          onPageChange={onPageChange}
        />
      );
      fireEvent.click(screen.getByText('4'));
      expect(onPageChange).toHaveBeenCalledWith(4);
    });
  });

  describe('edge cases', () => {
    it('handles single page (no pagination needed)', () => {
      render(
        <Pagination
          currentPage={1}
          totalPages={1}
          onPageChange={vi.fn()}
        />
      );
      const prevButton = screen.getByText('common.myResumes.pagination.previous').closest('button')!;
      const nextButton = screen.getByText('common.myResumes.pagination.next').closest('button')!;
      expect(prevButton).toBeDisabled();
      expect(nextButton).toBeDisabled();
      expect(screen.getByText(/common\.myResumes\.pagination\.pageInfo/)).toBeInTheDocument();
    });
  });
});
