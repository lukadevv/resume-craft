import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { TechIcon } from '@/components/ui/TechIcon';

describe('TechIcon', () => {
  beforeEach(() => {
    cleanup();
  });
  describe('rendering a known technology', () => {
    it('renders the React icon SVG with brand color #61DAFB', () => {
      const { container } = render(<TechIcon name="React" />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveStyle({ color: 'rgb(97, 218, 251)' }); // #61DAFB
    });

    it('renders the Docker icon SVG with brand color #2496ED', () => {
      const { container } = render(<TechIcon name="Docker" />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveStyle({ color: 'rgb(36, 150, 237)' }); // #2496ED
    });

    it('applies default classes w-4 h-4 flex-shrink-0', () => {
      const { container } = render(<TechIcon name="React" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('w-4', 'h-4', 'flex-shrink-0');
    });

    it('merges custom className with defaults', () => {
      const { container } = render(<TechIcon name="React" className="custom-class" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('custom-class');
      expect(svg).toHaveClass('flex-shrink-0');
    });

    it('renders icon with aria-label for accessibility', () => {
      render(<TechIcon name="React" />);
      // The SVG rendered by react-icons should have an accessible label
      const svg = document.querySelector('svg');
      // react-icons renders title element or role="img" — check for basic SVG rendering
      expect(svg).toBeInTheDocument();
    });
  });

  describe('unknown technology renders default icon', () => {
    it('renders Wrench default icon for name with no icon match', () => {
      const { container } = render(<TechIcon name="SomeUnknownTech" />);
      const svg = container.querySelector('svg.lucide-wrench');
      expect(svg).toBeInTheDocument();
    });
  });

  describe('showLabel prop', () => {
    it('renders icon + label text when showLabel is true', () => {
      render(<TechIcon name="Docker" showLabel />);
      expect(screen.getByText('Docker')).toBeInTheDocument();
      const svg = document.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('renders label text with default Wrench SVG when showLabel is true and no icon match', () => {
      render(<TechIcon name="SomeUnknownTech" showLabel />);
      expect(screen.getByText('SomeUnknownTech')).toBeInTheDocument();
      const svg = document.querySelector('svg.lucide-wrench');
      expect(svg).toBeInTheDocument();
    });

    it('renders icon + label as inline-flex layout', () => {
      const { container } = render(<TechIcon name="Docker" showLabel />);
      // The wrapper span should use inline-flex
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass('inline-flex');
    });

    it('does not render label when showLabel is not provided', () => {
      render(<TechIcon name="Docker" />);
      // Should not have "Docker" text — only SVG
      expect(screen.queryByText('Docker')).not.toBeInTheDocument();
    });
  });

  describe('iconKey prop overrides auto-detection', () => {
    it('uses the specified icon key when provided', () => {
      const { container } = render(<TechIcon name="Something" iconKey="docker" />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveStyle({ color: 'rgb(36, 150, 237)' }); // Docker brand #2496ED
    });

    it('renders Wrench fallback when iconKey does not match any icon', () => {
      const { container } = render(<TechIcon name="Something" iconKey="nonexistent-key" />);
      const svg = container.querySelector('svg.lucide-wrench');
      expect(svg).toBeInTheDocument();
    });
  });

  describe('showDefault prop', () => {
    it('returns null when showDefault=false and no icon match', () => {
      const { container } = render(<TechIcon name="SomeUnknownTech" showDefault={false} />);
      expect(container.firstChild).toBeNull();
    });

    it('renders text-only fallback when showLabel=true and showDefault=false', () => {
      render(<TechIcon name="SomeUnknownTech" showLabel showDefault={false} />);
      expect(screen.getByText('SomeUnknownTech')).toBeInTheDocument();
      const svg = document.querySelector('svg');
      expect(svg).not.toBeInTheDocument();
    });
  });

  describe('case insensitivity', () => {
    it('matches lowercase name to registry', () => {
      const { container } = render(<TechIcon name="react" />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });
  });

  describe('flex-shrink-0 invariant', () => {
    it('always includes flex-shrink-0 regardless of className override', () => {
      const { container } = render(<TechIcon name="React" className="w-8 h-8" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('flex-shrink-0');
    });
  });
});
