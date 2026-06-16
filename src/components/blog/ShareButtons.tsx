'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link2, Twitter, Linkedin, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ShareButtonsProps {
  title: string;
  slug: string;
  layout?: 'sidebar' | 'inline';
}

export function ShareButtons({ title, slug, layout = 'sidebar' }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const t = useTranslations('blog');

  const url = typeof window !== 'undefined'
    ? `${window.location.origin}/blog/${slug}`
    : `/blog/${slug}`;

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      name: 'Twitter',
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      icon: Twitter,
      label: t('shareOnTwitter'),
    },
    {
      name: 'LinkedIn',
      href: `https://linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: Linkedin,
      label: t('shareOnLinkedIn'),
    },
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = url;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (layout === 'sidebar') {
    return (
      <div className="flex flex-col items-center gap-3">
        <span className="text-xs font-medium uppercase tracking-wider text-foreground-secondary">
          {t('share')}
        </span>
        <div className="flex flex-col gap-2">
          {shareLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-foreground-secondary transition-all hover:border-primary/40 hover:text-primary hover:shadow-sm"
              >
                <Icon className="h-4 w-4" />
              </a>
            );
          })}
          <button
            onClick={copyToClipboard}
            aria-label={t('copyLink')}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-foreground-secondary transition-all hover:border-primary/40 hover:text-primary hover:shadow-sm"
          >
            {copied ? (
              <Check className="h-4 w-4 text-primary" />
            ) : (
              <Link2 className="h-4 w-4" />
            )}
          </button>
        </div>
        {/* Vertical line */}
        <div className="h-8 w-px bg-border" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-foreground-secondary">{t('share')}:</span>
      {shareLinks.map((link) => {
        const Icon = link.icon;
        return (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-full border border-border',
              'text-foreground-secondary transition-all hover:border-primary/40 hover:text-primary'
            )}
          >
            <Icon className="h-3.5 w-3.5" />
          </a>
        );
      })}
      <button
        onClick={copyToClipboard}
        aria-label="Copy link to clipboard"
        className={cn(
          'flex h-8 w-8 items-center justify-center rounded-full border border-border',
          'text-foreground-secondary transition-all hover:border-primary/40 hover:text-primary'
        )}
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-primary" />
        ) : (
          <Link2 className="h-3.5 w-3.5" />
        )}
      </button>
    </div>
  );
}
