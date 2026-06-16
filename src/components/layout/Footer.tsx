'use client';

import { Link } from 'next-view-transitions';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Github, Twitter, Linkedin, ExternalLink } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { locales } from '@/i18n/routing';

const socialLinks = [
  { href: 'https://x.com/lukadevv', icon: Twitter, label: 'Twitter' },
  { href: 'https://lukadevv.com', icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://github.com/lukadevv/resume-craft', icon: Github, label: 'Source Code' },
];

function getCurrentLocale(path: string): string {
  const first = path.split('/')[1];
  if (first && first !== 'en' && (locales as readonly string[]).includes(first)) {
    return first;
  }
  return 'en';
}

function localizeHref(href: string, locale: string): string {
  if (locale === 'en') return href;
  const prefix = `/${locale}`;
  return href === '/' ? prefix : `${prefix}${href}`;
}

export function Footer() {
  const t = useTranslations('common');
  const pathname = usePathname();
  const locale = getCurrentLocale(pathname.replace(/\/$/, '') || '/');
  const lh = (href: string) => localizeHref(href, locale);

  const footerLinks = {
    product: [
      { href: lh('/templates'), label: t('footer.templates') },
      { href: lh('/create'), label: t('footer.createResume') },
      { href: lh('/my-resumes'), label: t('footer.myResumes') },
    ],
    company: [
      { href: lh('/privacy'), label: t('footer.privacy') },
      { href: lh('/terms'), label: t('footer.terms') },
      { href: lh('/accessibility'), label: t('footer.accessibility') },
      { href: 'https://github.com/lukadevv', label: t('footer.contact'), external: true },
    ],
    resources: [
      { href: lh('/faq'), label: t('footer.faq') },
      { href: lh('/blog'), label: t('footer.blog') },
      { href: lh('/create'), label: t('footer.gettingStarted') },
    ],
    community: [
      { href: 'https://github.com/lukadevv/resume-craft/issues', label: t('footer.reportBug'), external: true },
      { href: 'https://github.com/lukadevv/resume-craft/issues/new', label: t('footer.featureRequest'), external: true },
      { href: 'https://github.com/lukadevv/resume-craft', label: t('footer.starOnGitHub'), external: true },
    ],
  };

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-6">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href={lh('/')} className="flex items-center gap-2 hover:-translate-y-[1px] hover:opacity-80 transition-all">
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
            <p className="mt-4 max-w-xs text-sm text-foreground-secondary">
              {t('footer.tagline')}
            </p>
            <div className="mt-6 flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-foreground-secondary transition-colors hover:bg-surface hover:text-foreground"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold">{t('footer.product')}</h4>
            <ul className="mt-4 space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground-secondary transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold">{t('footer.company')}</h4>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((link) =>
                link.external ? (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-foreground-secondary transition-colors hover:text-foreground"
                    >
                      {link.label}
                      <ExternalLink className="h-3 w-3 shrink-0 opacity-60" />
                    </a>
                  </li>
                ) : (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground-secondary transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold">{t('footer.resources')}</h4>
            <ul className="mt-4 space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground-secondary transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-sm font-semibold">{t('footer.community')}</h4>
            <ul className="mt-4 space-y-3">
              {footerLinks.community.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-foreground-secondary transition-colors hover:text-foreground"
                  >
                    {link.label}
                    <ExternalLink className="h-3 w-3 shrink-0 opacity-60" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-foreground-secondary">
            {t('footer.copyright', { year: new Date().getFullYear() })}
            {' • '}
            <a
              href="https://github.com/lukadevv"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground-secondary underline underline-offset-4 hover:text-foreground"
            >
              lukadevv
            </a>
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/lukadevv/resume-craft"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-foreground-secondary underline underline-offset-4 hover:text-foreground transition-colors"
            >
              <Github className="h-4 w-4" />
              {t('footer.sourceCode')}
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
