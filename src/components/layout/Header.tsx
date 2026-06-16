'use client';

import { Link } from 'next-view-transitions';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Moon, Sun, Menu, X, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { LocaleSwitcher } from '@/components/layout/LocaleSwitcher';
import { cn } from '@/lib/utils';
import { locales } from '@/i18n/routing';

/**
 * Strip the locale prefix from a pathname so that
 * locale-aware paths match non-prefixed nav hrefs.
 * e.g. "/es/templates" → "/templates", "/de" → "/"
 */
const getBasePath = (href: string) => {
  const [path = '/'] = href.split('#');
  if (path === '' || path === '/') return '/';
  return path.replace(/\/$/, '');
};

/**
 * Extract the current locale from the pathname.
 * Returns 'en' if no locale prefix is found.
 */
function getCurrentLocale(path: string): string {
  const first = path.split('/')[1];
  if (first && first !== 'en' && (locales as readonly string[]).includes(first)) {
    return first;
  }
  return 'en';
}

/**
 * Prepend the locale prefix to a href for non-English locales.
 * e.g. locale='es', href='/templates' → '/es/templates'
 */
function localizeHref(href: string, locale: string): string {
  if (locale === 'en') return href;
  const prefix = `/${locale}`;
  return href === '/' ? prefix : `${prefix}${href}`;
}

function stripLocaleFromPath(path: string): string {
  const segments = path.split('/');
  const first = segments[1]; // '' for root, or 'es', 'de', etc.
  if (first && first !== 'en' && (locales as readonly string[]).includes(first)) {
    const rest = segments.slice(2).join('/');
    return rest ? `/${rest}` : '/';
  }
  return path;
}

export function Header() {
  const t = useTranslations('common');
  const pathname = usePathname();
  const normalizedPath = pathname.replace(/\/$/, '') || '/';
  const locale = getCurrentLocale(normalizedPath);
  const localePath = stripLocaleFromPath(normalizedPath);
  const isOnCreateFlow =
    localePath === '/create' || localePath.startsWith('/resume/wizard');
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeLoading, setThemeLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const lh = (href: string) => localizeHref(href, locale);

  // Nav items: href is the raw path, localizedHref is locale-prefixed for the Link
  const navItems = [
    { href: '/', localizedHref: lh('/'), label: t('nav.home') },
    { href: '/templates', localizedHref: lh('/templates'), label: t('nav.templates') },
    { href: '/blog', localizedHref: lh('/blog'), label: t('nav.blog') },
    { href: '/my-resumes', localizedHref: lh('/my-resumes'), label: t('nav.myResumes') },
  ];

  return (
    <header className="site-header fixed top-0 left-0 right-0 z-50 h-[72px] border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href={lh('/')}
          className="flex items-center gap-2 hover:-translate-y-[1px] hover:opacity-80 transition-all shrink-0"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-lg">
            <Image
              src="/logo.png"
              alt="Resume Craft"
              width={28}
              height={28}
              className="h-12 w-12"
              priority
            />
          </div>
          <div className="flex">
            <span className="text-md font-[200]">Resume </span>
            <span className="text-md font-bold gradient-text">Craft</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const targetPath = getBasePath(item.href);
            const isActive = localePath === targetPath;
            return (
              <Link
                key={item.href}
                href={item.localizedHref}
                className={cn(
                  'relative whitespace-nowrap px-3 py-2 text-sm font-medium transition-colors hover:text-foreground',
                  isActive ? 'text-foreground' : 'text-foreground-secondary'
                )}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 gradient-primary" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switcher */}
          <LocaleSwitcher />

          {/* Theme Toggle */}
          {mounted ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setThemeLoading(true);
                setTheme(theme === 'dark' ? 'light' : 'dark');
                setTimeout(() => setThemeLoading(false), 150);
              }}
              className="h-9 w-9 border border-border"
              disabled={themeLoading}
              aria-label={theme === 'dark' ? t('theme.toggleLight') : t('theme.toggleDark')}
            >
              {themeLoading ? (
                <LoadingSpinner size="h-5 w-5" />
              ) : theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          ) : (
            <div className="h-9 w-9" />
          )}

          {/* CTA Button — always same text to prevent layout shift */}
          {isOnCreateFlow ? (
            <Button disabled className="gap-2 hidden lg:inline-flex text-sm whitespace-nowrap">
              {t('header.createResume')}
              <ChevronRight className="h-4 w-4 hidden sm:inline" />
            </Button>
          ) : (
            <Link href={lh('/create')} className="hidden lg:block">
              <Button className="gap-2 text-sm whitespace-nowrap">
                {t('header.createResume')}
                <ChevronRight className="h-4 w-4 hidden sm:inline" />
              </Button>
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute left-0 right-0 top-[72px] border-b border-border bg-background p-4 md:hidden">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              const targetPath = getBasePath(item.href);
              const isActive = localePath === targetPath;
              return (
                <Link
                  key={item.href}
                  href={item.localizedHref}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'rounded-lg px-4 py-3 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-surface text-foreground'
                      : 'text-foreground-secondary hover:bg-surface'
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            {isOnCreateFlow ? (
              <Button disabled className="w-full gap-2 mt-2 text-sm">
                {t('header.createResume')}
              </Button>
            ) : (
              <Link href={lh('/create')} onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full gap-2 mt-2 text-sm">
                  {t('header.createResume')}
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
