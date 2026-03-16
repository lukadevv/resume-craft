import Link from 'next/link';
import { FileText, Github, Twitter, Linkedin } from 'lucide-react';

const footerLinks = {
  product: [
    { href: '/templates', label: 'Templates' },
    { href: '/create', label: 'Create Resume' },
    { href: '/my-resumes', label: 'My Resumes' },
  ],
  company: [
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/privacy', label: 'Privacy' },
    { href: '/terms', label: 'Terms' },
  ],
  resources: [
    { href: '/help', label: 'Help Center' },
    { href: '/blog', label: 'Blog' },
    { href: '/careers', label: 'Careers' },
  ],
};

const socialLinks = [
  { href: 'https://x.com/lukadevv', icon: Twitter, label: 'Twitter' },
  { href: 'https://lukadevv.com', icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://github.com', icon: Github, label: 'GitHub' },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">Resume Craft</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-foreground-secondary">
              Create professional, customizable resumes in minutes. Choose from 5 templates and
              export to PDF, DOCX, and more.
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
            <h4 className="text-sm font-semibold">Product</h4>
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
            <h4 className="text-sm font-semibold">Company</h4>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((link) => (
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

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold">Resources</h4>
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
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-foreground-secondary">
            © {new Date().getFullYear()} Resume Craft •{' '}
            <a
              href="https://github.com/lukadevv"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground-secondary underline underline-offset-4 hover:text-foreground"
            >
              lukadevv
            </a>
          </p>
          <p className="text-sm text-foreground-secondary">
            Made with passion for job seekers worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}
