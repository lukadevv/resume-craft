import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { SearchAndSortBar } from '@/components/my-resumes/SearchAndSortBar';

describe('SearchAndSortBar', () => {
  beforeEach(() => {
    cleanup();
  });

  describe('search input', () => {
    it('renders a search input with placeholder', () => {
      render(
        <SearchAndSortBar
          searchQuery=""
          onSearchChange={vi.fn()}
          sortBy="updatedAt"
          onSortChange={vi.fn()}
        />
      );
      const input = screen.getByPlaceholderText(/search/i);
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
      const input = screen.getByPlaceholderText(/search/i) as HTMLInputElement;
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
      const input = screen.getByPlaceholderText(/search/i);
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
    it('includes sort by name option', () => {
      render(
        <SearchAndSortBar
          searchQuery=""
          onSearchChange={vi.fn()}
          sortBy="updatedAt"
          onSortChange={vi.fn()}
        />
      );
      expect(screen.getByText('Name')).toBeInTheDocument();
    });

    it('includes sort by date option', () => {
      render(
        <SearchAndSortBar
          searchQuery=""
          onSearchChange={vi.fn()}
          sortBy="updatedAt"
          onSortChange={vi.fn()}
        />
      );
      expect(screen.getByText('Last updated')).toBeInTheDocument();
    });

    it('includes sort by template option', () => {
      render(
        <SearchAndSortBar
          searchQuery=""
          onSearchChange={vi.fn()}
          sortBy="updatedAt"
          onSortChange={vi.fn()}
        />
      );
      expect(screen.getByText('Template')).toBeInTheDocument();
    });
  });
});
