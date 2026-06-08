import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { IconPicker } from '@/components/ui/IconPicker';

describe('IconPicker', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders search input and icon grid', () => {
    render(<IconPicker onSelect={vi.fn()} />);
    expect(screen.getByPlaceholderText('Search icons...')).toBeInTheDocument();
    // Should render at least one icon button from the registry
    expect(screen.getAllByRole('button').length).toBeGreaterThan(0);
  });

  it('calls onSelect when an icon is clicked', () => {
    const onSelect = vi.fn();
    render(<IconPicker onSelect={onSelect} />);

    // Find the first icon button and click it
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);

    fireEvent.click(buttons[0]);
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(typeof onSelect.mock.calls[0][0]).toBe('string');
  });

  it('shows "No icons found" for a query that matches nothing', () => {
    render(<IconPicker onSelect={vi.fn()} />);
    const input = screen.getByPlaceholderText('Search icons...');

    fireEvent.change(input, { target: { value: 'xyznonexistent' } });
    expect(screen.getByText('No icons found')).toBeInTheDocument();
  });

  it('filters icons by search query', () => {
    render(<IconPicker onSelect={vi.fn()} />);
    const input = screen.getByPlaceholderText('Search icons...');

    // Search for javascript
    fireEvent.change(input, { target: { value: 'javascript' } });
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThanOrEqual(1);

    // Search for something that doesn't exist
    fireEvent.change(input, { target: { value: 'notanicon12345' } });
    expect(screen.getByText('No icons found')).toBeInTheDocument();
  });

  it('applies selected state when value matches an icon key', () => {
    const { container } = render(
      <IconPicker value="javascript" onSelect={vi.fn()} />
    );

    // The selected button gets ring classes and a title matching the icon label
    const selectedButton = container.querySelector('button[title="JavaScript"]');
    expect(selectedButton).toBeInTheDocument();
    expect(selectedButton?.className).toContain('ring-2');
  });

  it('applies custom className to the root element', () => {
    const { container } = render(
      <IconPicker onSelect={vi.fn()} className="my-custom-class" />
    );

    const root = container.firstChild as HTMLElement;
    expect(root.className).toContain('my-custom-class');
  });

  it('filters by category when provided', () => {
    // programming-language category should have icons
    const { container: withCategory } = render(
      <IconPicker onSelect={vi.fn()} category="programming-language" />
    );

    const buttonsWithCategory = withCategory.querySelectorAll('button');
    expect(buttonsWithCategory.length).toBeGreaterThanOrEqual(1);
  });
});
