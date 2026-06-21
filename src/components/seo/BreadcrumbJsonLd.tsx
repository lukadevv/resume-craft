export interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbJsonLdProps {
  items: BreadcrumbItem[];
}

/**
 * Renders JSON-LD BreadcrumbList structured data.
 *
 * Usage:
 * ```tsx
 * <BreadcrumbJsonLd
 *   items={[
 *     { name: 'Home', href: '/' },
 *     { name: 'FAQ', href: '/faq' },
 *   ]}
 * />
 * ```
 */
export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://resume.lukadevv.com${item.href}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
