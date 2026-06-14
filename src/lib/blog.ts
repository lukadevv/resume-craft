import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';
import { renderMarkdown } from './markdown';
import { calculateReadingTime } from './reading-time';

export interface PostFrontmatter {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  author: string;
  order: number;
  tags?: string[];
  tagKeys?: string[];
  coverImage?: string;
}

export interface Post {
  frontmatter: PostFrontmatter;
  content: string;
  readingTime: string;
}

const BLOG_BASE = join(process.cwd(), 'src', 'content', 'blog');
const DEFAULT_LOCALE = 'en';

/**
 * Get the blog directory for a specific locale.
 * Falls back to English if the locale directory doesn't exist or is empty.
 */
export function getBlogDir(locale?: string): string {
  const localeDir = join(BLOG_BASE, locale || DEFAULT_LOCALE);
  return localeDir;
}

/**
 * Resolve the best blog directory for a given locale or explicit path.
 * - If the parameter looks like a directory path (contains /), use it directly.
 * - Otherwise, treat it as a locale and look under BLOG_BASE/{locale}.
 * - Falls back to English if the locale directory is empty or missing.
 */
function resolveBlogDir(localeOrDir?: string): string {
  if (!localeOrDir) {
    return join(BLOG_BASE, DEFAULT_LOCALE);
  }

  // If it looks like a filesystem path (contains path separator), use it directly
  if (localeOrDir.includes('/') || localeOrDir.includes('\\')) {
    return localeOrDir;
  }

  // Otherwise, treat as locale
  const localeDir = join(BLOG_BASE, localeOrDir);

  try {
    const files = readdirSync(localeDir).filter((f) => f.endsWith('.md'));
    if (files.length > 0) return localeDir;
  } catch {
    // Directory doesn't exist — fall back to English
  }

  return join(BLOG_BASE, DEFAULT_LOCALE);
}

export async function getAllPosts(locale?: string): Promise<Post[]> {
  const dir = resolveBlogDir(locale);
  let files: string[] = [];
  try {
    files = readdirSync(dir).filter((f) => f.endsWith('.md'));
  } catch {
    return [];
  }

  const posts = await Promise.all(
    files.map(async (filename) => {
      const rawContent = readFileSync(join(dir, filename), 'utf-8');
      const { data, content } = matter(rawContent);
      const html = await renderMarkdown(content);
      const readingMinutes = calculateReadingTime(content);

      return {
        frontmatter: data as PostFrontmatter,
        content: html,
        readingTime: `${readingMinutes} min read`,
      };
    })
  );

  return posts.sort((a, b) => a.frontmatter.order - b.frontmatter.order);
}

export async function getPostBySlug(slug: string, locale?: string): Promise<Post | null> {
  const posts = await getAllPosts(locale);
  return posts.find((post) => post.frontmatter.slug === slug) ?? null;
}

export async function getFeaturedPosts(count: number, locale?: string): Promise<Post[]> {
  const posts = await getAllPosts(locale);
  return posts.slice(0, count);
}
