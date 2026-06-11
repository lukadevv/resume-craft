import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Pagination } from '@/components/my-resumes/Pagination';

describe('Pagination', () => {
  beforeEach(() => {
    cleanup();
  });

  describe('rendering', () => {
    it('shows the current page and total pages', () => {
      render(
        <Pagination
          currentPage={1}
          totalPages={3}
          onPageChange={vi.fn()}
        />
      );
      expect(screen.getByText(/page 1 of 3/i)).toBeInTheDocument();
    });

    it('renders Previous and Next buttons', () => {
      render(
        <Pagination
          currentPage={1}
          totalPages={5}
          onPageChange={vi.fn()}
        />
      );
      expect(screen.getByText(/previous/i)).toBeInTheDocument();
      expect(screen.getByText(/next/i)).toBeInTheDocument();
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
      const prevButton = screen.getByText(/previous/i).closest('button')!;
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
      const nextButton = screen.getByText(/next/i).closest('button')!;
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
      const prevButton = screen.getByText(/previous/i).closest('button')!;
      const nextButton = screen.getByText(/next/i).closest('button')!;
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
      fireEvent.click(screen.getByText(/previous/i));
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
      fireEvent.click(screen.getByText(/next/i));
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
      // Should show page numbers: 1, 2, 3, 4, 5
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

    it('shows the current page in the page indicator text', () => {
      render(
        <Pagination
          currentPage={3}
          totalPages={5}
          onPageChange={vi.fn()}
        />
      );
      // "Page 3 of 5" should be visible — this verifies the current page is tracked
      expect(screen.getByText(/page 3 of 5/i)).toBeInTheDocument();
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
      // Both buttons should be disabled
      const prevButton = screen.getByText(/previous/i).closest('button')!;
      const nextButton = screen.getByText(/next/i).closest('button')!;
      expect(prevButton).toBeDisabled();
      expect(nextButton).toBeDisabled();
      expect(screen.getByText(/page 1 of 1/i)).toBeInTheDocument();
    });

    it('handles zero total pages gracefully', () => {
      render(
        <Pagination
          currentPage={1}
          totalPages={0}
          onPageChange={vi.fn()}
        />
      );
      expect(screen.getByText(/page 1 of 0/i)).toBeInTheDocument();
    });
  });
});
