import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';

export const dynamic = 'force-static';

const BASE_URL = 'https://resume.lukadevv.com';
const LOCALES = ['es', 'de', 'fr', 'pt'] as const;

interface PageDef {
  path: string;
  priority: number;
  changeFrequency: 'always' | 'daily' | 'hourly' | 'monthly' | 'never' | 'weekly' | 'yearly';
}

const staticPages: PageDef[] = [
  { path: '', priority: 1.0, changeFrequency: 'monthly' },
  { path: '/create', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/my-resumes', priority: 0.3, changeFrequency: 'monthly' },
  { path: '/templates', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/blog', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/faq', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/privacy', priority: 0.4, changeFrequency: 'yearly' },
  { path: '/terms', priority: 0.4, changeFrequency: 'yearly' },
  { path: '/accessibility', priority: 0.4, changeFrequency: 'yearly' },
  { path: '/resume/new', priority: 0.2, changeFrequency: 'monthly' },
  { path: '/resume/preview', priority: 0.2, changeFrequency: 'monthly' },
  { path: '/resume/edit', priority: 0.2, changeFrequency: 'monthly' },
  { path: '/resume/wizard', priority: 0.3, changeFrequency: 'monthly' },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  // 1. English (root) static pages
  for (const page of staticPages) {
    entries.push({
      url: `${BASE_URL}${page.path}`,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    });
  }

  // 2. English blog posts
  const enPosts = await getAllPosts('en');
  for (const post of enPosts) {
    entries.push({
      url: `${BASE_URL}/blog/${post.frontmatter.slug}`,
      lastModified: new Date(post.frontmatter.date),
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  }

  // 3. Localized pages (es, de, fr, pt)
  for (const locale of LOCALES) {
    for (const page of staticPages) {
      entries.push({
        url: `${BASE_URL}/${locale}${page.path}`,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: +(page.priority * 0.9).toFixed(2),
      });
    }

    // Locale-specific blog posts
    const localePosts = await getAllPosts(locale);
    for (const post of localePosts) {
      entries.push({
        url: `${BASE_URL}/${locale}/blog/${post.frontmatter.slug}`,
        lastModified: new Date(post.frontmatter.date),
        changeFrequency: 'monthly',
        priority: 0.65,
      });
    }
  }

  return entries;
}
