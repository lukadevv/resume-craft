'use client';

import { useEffect, useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { ListTree } from 'lucide-react';

interface TOCHeading {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<TOCHeading[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const t = useTranslations('blog');

  useEffect(() => {
    const article = document.querySelector('article');
    if (!article) return;

    const elements = article.querySelectorAll('h2, h3');
    const items: TOCHeading[] = [];

    elements.forEach((el) => {
      // Ensure each heading has an id
      if (!el.id) {
        el.id = el.textContent
          ?.toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '') ?? '';
      }

      items.push({
        id: el.id,
        text: el.textContent ?? '',
        level: el.tagName === 'H2' ? 2 : 3,
      });
    });

    setHeadings(items);
  }, []);

  const handleScroll = useCallback(() => {
    const article = document.querySelector('article');
    if (!article) return;

    const headingElements = article.querySelectorAll('h2, h3');
    let currentActive = '';

    headingElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      // Heading is considered "active" when it's near the top of the viewport
      if (rect.top <= 120) {
        currentActive = el.id;
      }
    });

    setActiveId(currentActive);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  if (headings.length < 2) {
    return null;
  }

  return (
    <nav
      className="relative"
      aria-label={t('tableOfContents')}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="flex w-full items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-primary"
      >
        <ListTree className="h-4 w-4" />
        {t('onThisPage')}
        <svg
          className={cn(
            'ml-auto h-3.5 w-3.5 transition-transform',
            !isCollapsed && 'rotate-180'
          )}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      <div
        className={cn(
          'mt-3 space-y-1 overflow-hidden transition-all duration-300',
          isCollapsed ? 'max-h-0 opacity-0' : 'max-h-[2000px] opacity-100'
        )}
      >
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById(heading.id);
              if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Update URL hash without scrolling
                window.history.pushState(null, '', `#${heading.id}`);
              }
            }}
            className={cn(
              'block text-sm transition-colors hover:text-foreground',
              heading.level === 3 ? 'pl-4' : 'pl-0',
              activeId === heading.id
                ? 'font-medium text-primary'
                : 'text-foreground-secondary'
            )}
          >
            {heading.text}
          </a>
        ))}
      </div>
    </nav>
  );
}
