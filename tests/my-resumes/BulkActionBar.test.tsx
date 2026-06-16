import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { BulkActionBar } from '@/components/my-resumes/BulkActionBar';

describe('BulkActionBar', () => {
  beforeEach(() => {
    cleanup();
  });

  describe('visibility', () => {
    it('renders nothing when no items are selected', () => {
      const { container } = render(
        <BulkActionBar
          selectedCount={0}
          totalCount={10}
          onSelectAll={vi.fn()}
          onDeleteSelected={vi.fn()}
          onExport={vi.fn()}
        />
      );
      expect(container.firstChild).toBeNull();
    });

    it('renders when items are selected', () => {
      const { container } = render(
        <BulkActionBar
          selectedCount={3}
          totalCount={10}
          onSelectAll={vi.fn()}
          onDeleteSelected={vi.fn()}
          onExport={vi.fn()}
        />
      );
      expect(container.firstChild).not.toBeNull();
    });
  });

  describe('selected count', () => {
    it('displays translated selected count text', () => {
      render(
        <BulkActionBar
          selectedCount={5}
          totalCount={10}
          onSelectAll={vi.fn()}
          onDeleteSelected={vi.fn()}
          onExport={vi.fn()}
        />
      );
      // Without provider, parameterized key renders as raw key
      expect(screen.getByText(/common\.myResumes\.bulk\.selectedCount/)).toBeInTheDocument();
    });
  });

  describe('select all checkbox', () => {
    it('renders a select all checkbox', () => {
      render(
        <BulkActionBar
          selectedCount={3}
          totalCount={10}
          onSelectAll={vi.fn()}
          onDeleteSelected={vi.fn()}
          onExport={vi.fn()}
        />
      );
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeInTheDocument();
    });

    it('checkbox is checked when all items are selected', () => {
      render(
        <BulkActionBar
          selectedCount={10}
          totalCount={10}
          onSelectAll={vi.fn()}
          onDeleteSelected={vi.fn()}
          onExport={vi.fn()}
        />
      );
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.checked).toBe(true);
    });

    it('calls onSelectAll when checkbox is toggled', () => {
      const onSelectAll = vi.fn();
      render(
        <BulkActionBar
          selectedCount={3}
          totalCount={10}
          onSelectAll={onSelectAll}
          onDeleteSelected={vi.fn()}
          onExport={vi.fn()}
        />
      );
      const checkbox = screen.getByRole('checkbox');
      fireEvent.click(checkbox);
      expect(onSelectAll).toHaveBeenCalled();
    });
  });

  describe('delete action', () => {
    it('renders translated delete button', () => {
      render(
        <BulkActionBar
          selectedCount={3}
          totalCount={10}
          onSelectAll={vi.fn()}
          onDeleteSelected={vi.fn()}
          onExport={vi.fn()}
        />
      );
      expect(screen.getByText('common.myResumes.bulk.delete')).toBeInTheDocument();
    });

    it('calls onDeleteSelected when delete button is clicked', () => {
      const onDeleteSelected = vi.fn();
      render(
        <BulkActionBar
          selectedCount={3}
          totalCount={10}
          onSelectAll={vi.fn()}
          onDeleteSelected={onDeleteSelected}
          onExport={vi.fn()}
        />
      );
      fireEvent.click(screen.getByText('common.myResumes.bulk.delete'));
      expect(onDeleteSelected).toHaveBeenCalled();
    });
  });

  describe('export dropdown', () => {
    it('renders translated export button', () => {
      render(
        <BulkActionBar
          selectedCount={3}
          totalCount={10}
          onSelectAll={vi.fn()}
          onDeleteSelected={vi.fn()}
          onExport={vi.fn()}
        />
      );
      expect(screen.getByText('common.myResumes.bulk.export')).toBeInTheDocument();
    });

    it('shows format options when export button is clicked', () => {
      render(
        <BulkActionBar
          selectedCount={3}
          totalCount={10}
          onSelectAll={vi.fn()}
          onDeleteSelected={vi.fn()}
          onExport={vi.fn()}
        />
      );
      fireEvent.click(screen.getByText('common.myResumes.bulk.export'));
      expect(screen.getByText('Text')).toBeInTheDocument();
      expect(screen.getByText('HTML')).toBeInTheDocument();
      expect(screen.getByText('JSON')).toBeInTheDocument();
      expect(screen.getByText('DOCX')).toBeInTheDocument();
    });

    it('shows PDF option as disabled with tooltip', () => {
      render(
        <BulkActionBar
          selectedCount={3}
          totalCount={10}
          onSelectAll={vi.fn()}
          onDeleteSelected={vi.fn()}
          onExport={vi.fn()}
        />
      );
      fireEvent.click(screen.getByText('common.myResumes.bulk.export'));
      const pdfOption = screen.getByText('PDF');
      expect(pdfOption).toBeInTheDocument();
      expect(pdfOption.closest('button')).toBeDisabled();
      expect(screen.getByText('common.myResumes.bulk.pdfTooltip')).toBeInTheDocument();
    });

    it('calls onExport with "text" format when Text is clicked', () => {
      const onExport = vi.fn();
      render(
        <BulkActionBar
          selectedCount={3}
          totalCount={10}
          onSelectAll={vi.fn()}
          onDeleteSelected={vi.fn()}
          onExport={onExport}
        />
      );
      fireEvent.click(screen.getByText('common.myResumes.bulk.export'));
      fireEvent.click(screen.getByText('Text'));
      expect(onExport).toHaveBeenCalledWith('text');
    });

    it('calls onExport with "html" format when HTML is clicked', () => {
      const onExport = vi.fn();
      render(
        <BulkActionBar
          selectedCount={3}
          totalCount={10}
          onSelectAll={vi.fn()}
          onDeleteSelected={vi.fn()}
          onExport={onExport}
        />
      );
      fireEvent.click(screen.getByText('common.myResumes.bulk.export'));
      fireEvent.click(screen.getByText('HTML'));
      expect(onExport).toHaveBeenCalledWith('html');
    });

    it('calls onExport with "docx" format when DOCX is clicked', () => {
      const onExport = vi.fn();
      render(
        <BulkActionBar
          selectedCount={3}
          totalCount={10}
          onSelectAll={vi.fn()}
          onDeleteSelected={vi.fn()}
          onExport={onExport}
        />
      );
      fireEvent.click(screen.getByText('common.myResumes.bulk.export'));
      fireEvent.click(screen.getByText('DOCX'));
      expect(onExport).toHaveBeenCalledWith('docx');
    });
  });
});
