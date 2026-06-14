import { cn } from '@/lib/utils';

type TruncateElement = 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4';

interface TruncateTextProps {
  /** The text content to render. */
  text: string;
  /** Maximum number of visible lines before truncation (default: 1). */
  maxLines?: number;
  /** HTML element to render (default: 'span'). */
  as?: TruncateElement;
  /** Additional CSS classes. */
  className?: string;
}

const lineClampMap: Record<number, string> = {
  1: 'line-clamp-1',
  2: 'line-clamp-2',
  3: 'line-clamp-3',
  4: 'line-clamp-4',
  5: 'line-clamp-5',
};

/**
 * Shared overflow-safe text component.
 * Truncates text at a configurable number of lines with ellipsis.
 * Uses CSS line-clamp for performance (no JS measurement).
 *
 * Designed for German text (30-40% longer than English) at narrow viewports.
 */
export function TruncateText({
  text,
  maxLines = 1,
  as: Component = 'span',
  className,
}: TruncateTextProps) {
  const clampClass = lineClampMap[maxLines] ?? 'line-clamp-1';

  return (
    <Component
      data-truncate
      className={cn('overflow-hidden text-ellipsis', clampClass, className)}
    >
      {text}
    </Component>
  );
}
