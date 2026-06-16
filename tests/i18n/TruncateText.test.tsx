import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { TruncateText } from '@/components/ui/TruncateText';

describe('TruncateText', () => {
  afterEach(() => {
    cleanup();
  });

  const germanLongText =
    'Lebenslauf erstellen mit professionellen Vorlagen und Export-Funktionen für PDF und DOCX';

  describe('rendering', () => {
    it('renders text content', () => {
      render(<TruncateText text="Hello World" />);
      expect(screen.getByText('Hello World')).toBeInTheDocument();
    });

    it('renders text with the data-truncate attribute', () => {
      render(<TruncateText text="Home" />);
      const element = screen.getByText('Home');
      expect(element).toBeInTheDocument();
      expect(element).toHaveAttribute('data-truncate');
    });

    it('renders long German text', () => {
      render(<TruncateText text={germanLongText} maxLines={2} />);
      const element = screen.getByText(germanLongText);
      expect(element).toBeInTheDocument();
      expect(element).toHaveAttribute('data-truncate');
    });

    it('renders empty string without crashing', () => {
      render(<TruncateText text="" />);
      const el = document.querySelector('[data-truncate]');
      expect(el).not.toBeNull();
    });
  });

  describe('maxLines prop', () => {
    it('defaults to 1 line when not specified', () => {
      const shortText = 'MaxLines Default Test';
      render(<TruncateText text={shortText} />);
      const element = screen.getByText(shortText);
      expect(element).toBeInTheDocument();
      expect(element.className).toContain('line-clamp-1');
    });

    it('accepts custom maxLines=3', () => {
      const customText = 'Custom MaxLines Test with Line Clamp 3';
      render(<TruncateText text={customText} maxLines={3} />);
      const element = screen.getByText(customText);
      expect(element).toBeInTheDocument();
      expect(element.className).toContain('line-clamp-3');
    });
  });

  describe('as prop', () => {
    it('renders as span by default', () => {
      render(<TruncateText text="Test" />);
      const element = screen.getByText('Test');
      expect(element.tagName).toBe('SPAN');
    });

    it('renders as p when as="p"', () => {
      render(<TruncateText text="Paragraph" as="p" />);
      const element = screen.getByText('Paragraph');
      expect(element.tagName).toBe('P');
    });

    it('renders as h2 when as="h2"', () => {
      render(<TruncateText text="Heading" as="h2" />);
      const element = screen.getByText('Heading');
      expect(element.tagName).toBe('H2');
    });
  });

  describe('className prop', () => {
    it('applies additional className', () => {
      render(<TruncateText text="Styled" className="custom-class" />);
      const element = screen.getByText('Styled');
      expect(element.className).toContain('custom-class');
    });
  });
});
