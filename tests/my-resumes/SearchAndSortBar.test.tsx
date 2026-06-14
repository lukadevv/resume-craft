import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { SearchAndSortBar } from '@/components/my-resumes/SearchAndSortBar';

describe('SearchAndSortBar', () => {
  beforeEach(() => {
    cleanup();
  });

  describe('search input', () => {
    it('renders a search input with translated placeholder', () => {
      render(
        <SearchAndSortBar
          searchQuery=""
          onSearchChange={vi.fn()}
          sortBy="updatedAt"
          onSortChange={vi.fn()}
        />
      );
      const input = screen.getByPlaceholderText('common.myResumes.search.placeholder');
      expect(input).toBeInTheDocument();
    });

    it('displays the current search query value', () => {
      render(
        <SearchAndSortBar
          searchQuery="engineer"
          onSearchChange={vi.fn()}
          sortBy="updatedAt"
          onSortChange={vi.fn()}
        />
      );
      const input = screen.getByPlaceholderText('common.myResumes.search.placeholder') as HTMLInputElement;
      expect(input.value).toBe('engineer');
    });

    it('calls onSearchChange when user types', () => {
      const onSearchChange = vi.fn();
      render(
        <SearchAndSortBar
          searchQuery=""
          onSearchChange={onSearchChange}
          sortBy="updatedAt"
          onSortChange={vi.fn()}
        />
      );
      const input = screen.getByPlaceholderText('common.myResumes.search.placeholder');
      fireEvent.change(input, { target: { value: 'dev' } });
      expect(onSearchChange).toHaveBeenCalledWith('dev');
    });
  });

  describe('sort dropdown', () => {
    it('renders a sort dropdown', () => {
      render(
        <SearchAndSortBar
          searchQuery=""
          onSearchChange={vi.fn()}
          sortBy="updatedAt"
          onSortChange={vi.fn()}
        />
      );
      const select = screen.getByRole('combobox');
      expect(select).toBeInTheDocument();
    });

    it('calls onSortChange when sort option changes', () => {
      const onSortChange = vi.fn();
      render(
        <SearchAndSortBar
          searchQuery=""
          onSearchChange={vi.fn()}
          sortBy="updatedAt"
          onSortChange={onSortChange}
        />
      );
      const select = screen.getByRole('combobox');
      fireEvent.change(select, { target: { value: 'name' } });
      expect(onSortChange).toHaveBeenCalledWith('name');
    });

    it('shows the currently selected sort option', () => {
      render(
        <SearchAndSortBar
          searchQuery=""
          onSearchChange={vi.fn()}
          sortBy="template"
          onSortChange={vi.fn()}
        />
      );
      const select = screen.getByRole('combobox') as HTMLSelectElement;
      expect(select.value).toBe('template');
    });
  });

  describe('sort options', () => {
    it('includes translated sort by name option', () => {
      render(
        <SearchAndSortBar
          searchQuery=""
          onSearchChange={vi.fn()}
          sortBy="updatedAt"
          onSortChange={vi.fn()}
        />
      );
      expect(screen.getByText('common.myResumes.search.sortOptions.name')).toBeInTheDocument();
    });

    it('includes translated sort by date option', () => {
      render(
        <SearchAndSortBar
          searchQuery=""
          onSearchChange={vi.fn()}
          sortBy="updatedAt"
          onSortChange={vi.fn()}
        />
      );
      expect(screen.getByText('common.myResumes.search.sortOptions.updatedAt')).toBeInTheDocument();
    });

    it('includes translated sort by template option', () => {
      render(
        <SearchAndSortBar
          searchQuery=""
          onSearchChange={vi.fn()}
          sortBy="updatedAt"
          onSortChange={vi.fn()}
        />
      );
      expect(screen.getByText('common.myResumes.search.sortOptions.template')).toBeInTheDocument();
    });

    it('renders the sort by label from translations', () => {
      render(
        <SearchAndSortBar
          searchQuery=""
          onSearchChange={vi.fn()}
          sortBy="updatedAt"
          onSortChange={vi.fn()}
        />
      );
      expect(screen.getByText('common.myResumes.search.sortBy')).toBeInTheDocument();
    });
  });
});
