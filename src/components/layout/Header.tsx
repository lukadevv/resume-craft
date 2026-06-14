'use client';

import { Link } from 'next-view-transitions';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Moon, Sun, Menu, X, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/templates/', label: 'Templates' },
  { href: '/blog/', label: 'Blog' },
  { href: '/my-resumes/', label: 'My Resumes' },
];

const getBasePath = (href: string) => {
  const [path = '/'] = href.split('#');
  if (path === '' || path === '/') return '/';
  return path.replace(/\/$/, '');
};

export function Header() {
  const pathname = usePathname();
  const normalizedPath = pathname.replace(/\/$/, '') || '/';
  const isOnCreateFlow = normalizedPath === '/create' || normalizedPath.startsWith('/resume/wizard');
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeLoading, setThemeLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="site-header fixed top-0 left-0 right-0 z-50 h-[72px] border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 hover:-translate-y-[1px] hover:opacity-80 transition-all">
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
            const isActive = normalizedPath === targetPath;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'relative px-4 py-2 text-sm font-medium transition-colors hover:text-foreground',
                  isActive ? 'text-foreground' : 'text-foreground-secondary'
                )}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 gradient-primary" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
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
              className="h-9 w-9"
              disabled={themeLoading}
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

          {/* CTA Button */}
          {isOnCreateFlow ? (
            <Button disabled className="gap-2 hidden md:inline-flex">
              Create Resume
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Link href="/create" className="hidden md:block">
              <Button className="gap-2">
                Create Resume
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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
              const isActive = normalizedPath === targetPath;
              return (
                <Link
                  key={item.href}
                  href={item.href}
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
              <Button disabled className="w-full gap-2 mt-2">
                Create Resume
                <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Link href="/create" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full gap-2 mt-2">
                  Create Resume
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
