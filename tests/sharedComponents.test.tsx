import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { LanguageArc } from '@/components/templates/shared/LanguageArc';
import { SkillDotList } from '@/components/templates/shared/SkillDotList';
import { ContactIconList } from '@/components/templates/shared/ContactIconList';
import { ContactItem } from '@/components/templates/shared/ContactIconList';
import { EducationTimeline } from '@/components/templates/shared/EducationTimeline';
import { Education } from '@/types/resume';
import { CustomIconPicker } from '@/components/templates/shared/CustomIconPicker';

describe('shared template primitives', () => {
  it('renders language percentage and label', () => {
    render(<LanguageArc label="English" value={92} />);
    expect(screen.getByText('English')).toBeInTheDocument();
    expect(screen.getByText('92%')).toBeInTheDocument();
  });

  it('renders filled and empty skill dots', () => {
    render(<SkillDotList label="Web Development" filled={4} dots={6} accentColor="#ff6600" />);
    const dots = screen.getAllByTestId('skill-dot');
    expect(dots).toHaveLength(6);
    expect(dots[0]).toHaveStyle({ backgroundColor: '#ff6600' });
    expect(dots[4]).toHaveStyle({ backgroundColor: '#4b3832' });
  });

  it('lists contact items with labels', () => {
    const items: ContactItem[] = [
      { id: 'email', type: 'email', label: 'Email', value: 'test@example.com' },
      { id: 'phone', type: 'phone', label: 'Phone', value: '123' },
    ];
    render(<ContactIconList items={items} />);
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByText('Phone')).toBeInTheDocument();
  });

  it('renders education timeline entries', () => {
    const entries: Education[] = [
      {
        id: 'edu-1',
        institution: 'University A',
        degree: 'B.S. Computer Science',
        field: 'CS',
        location: 'City',
        startDate: '2018',
        endDate: '2022',
        current: false,
        gpa: '4.0',
        achievements: '',
      },
    ];
    render(<EducationTimeline entries={entries} />);
    expect(screen.getByText('B.S. Computer Science')).toBeInTheDocument();
    expect(screen.getByText('University A • City')).toBeInTheDocument();
  });

  describe('CustomIconPicker', () => {
    const originalFileReader = globalThis.FileReader;

    beforeEach(() => {
      class MockFileReader {
        onload: ((this: MockFileReader, ev: ProgressEvent<FileReader>) => void) | null = null;
        readAsDataURL() {
          if (this.onload) {
            this.onload({
              target: { result: 'data:image/png;base64,mocked' },
            } as unknown as ProgressEvent<FileReader>);
          }
        }
      }
      globalThis.FileReader = MockFileReader as unknown as typeof FileReader;
    });

    afterEach(() => {
      globalThis.FileReader = originalFileReader;
    });

    it('calls onIconSelect with previewed data', () => {
      const onIconSelect = vi.fn();
      render(<CustomIconPicker onIconSelect={onIconSelect} />);

      const fileInput = screen.getByLabelText('Upload icon') as HTMLInputElement;
      const labelInput = screen.getByPlaceholderText('Label (e.g., React logo)') as HTMLInputElement;
      fireEvent.change(labelInput, { target: { value: 'Custom Logo' } });
      const file = new File(['hello'], 'logo.png', { type: 'image/png' });
      fireEvent.change(fileInput, { target: { files: [file] } });

      fireEvent.click(screen.getByRole('button', { name: /Add icon/i }));
      expect(onIconSelect).toHaveBeenCalledWith(
        expect.objectContaining({
          label: 'Custom Logo',
          url: 'data:image/png;base64,mocked',
        })
      );
    });
  });
});
