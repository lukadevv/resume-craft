import { describe, expect, it, vi } from 'vitest';
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { Button, buttonVariants, type ButtonProps } from '@/components/ui/button';

const renderButtonElement = (props: Partial<ButtonProps> = {}): React.ReactElement<ButtonProps> => {
  const renderFn = (Button as typeof Button & {
    render: React.ForwardRefRenderFunction<HTMLButtonElement, ButtonProps>;
  }).render;

  const node = renderFn(
    {
      variant: 'default',
      size: 'default',
      children: props.children ?? 'Click me',
      ...props,
    } as ButtonProps,
    null
  );

  if (!React.isValidElement(node)) {
    throw new Error('Expected Button.render to return a React element');
  }

  return node as React.ReactElement<ButtonProps>;
};

describe('Button Component', () => {
  it('sets the default class name and children', () => {
    const element = renderButtonElement();
    expect(element.props.children).toBe('Click me');
    expect(element.props.className).toContain('gradient-primary');
  });

  it('applies the variant classes derived from buttonVariants', () => {
    const element = renderButtonElement({ variant: 'ghost' });
    expect(element.props.className).toContain('text-[#16A085]');
    const secondaryClass = buttonVariants({ variant: 'secondary' });
    expect(secondaryClass).toContain('bg-surface');
  });

  it('applies size modifiers via buttonVariants', () => {
    const element = renderButtonElement({ size: 'lg' });
    expect(element.props.className).toContain('h-11');
    expect(buttonVariants({ size: 'icon' })).toContain('w-10');
  });

  it('forwards onClick handlers and disabled state', () => {
    const handleClick = vi.fn();
    const element = renderButtonElement({ onClick: handleClick, disabled: true });
    expect(element.props.onClick).toBe(handleClick);
    expect(element.props.disabled).toBe(true);
  });

  it('uses Slot when asChild is true', () => {
    const element = renderButtonElement({ asChild: true });
    expect(element.type).toBe(Slot);
  });
});
