'use client';

import { type CSSProperties, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { useInView } from '@/lib/useInView';
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion';

type RevealProps = {
  children: ReactNode;
  className?: string;
  delayMs?: number;
};

export function Reveal({ children, className, delayMs = 0 }: RevealProps) {
  const reducedMotion = usePrefersReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>();

  const style: CSSProperties | undefined =
    delayMs > 0 ? { transitionDelay: `${delayMs}ms` } : undefined;

  const isVisible = reducedMotion || inView;

  return (
    <div
      ref={ref}
      style={style}
      className={cn(
        'transition-all duration-700 ease-out will-change-transform',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
        reducedMotion && 'transition-none transform-none will-change-auto',
        className,
      )}
    >
      {children}
    </div>
  );
}

