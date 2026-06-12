import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import { calculateReadingTime } from './reading-time';

export interface PostFrontmatter {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  author: string;
  order: number;
  tags?: string[];
  coverImage?: string;
}

export interface Post {
  frontmatter: PostFrontmatter;
  content: string;
  readingTime: string;
}

const BLOG_DIR = join(process.cwd(), 'src', 'content', 'blog');

export async function getAllPosts(blogDir?: string): Promise<Post[]> {
  const dir = blogDir ?? BLOG_DIR;
  let files: string[] = [];
  try {
    files = readdirSync(dir).filter((f) => f.endsWith('.md'));
  } catch {
    return [];
  }

  const markdownProcessor = remark().use(remarkHtml);

  const posts = await Promise.all(
    files.map(async (filename) => {
      const rawContent = readFileSync(join(dir, filename), 'utf-8');
      const { data, content } = matter(rawContent);
      const processed = await markdownProcessor.process(content);
      const readingMinutes = calculateReadingTime(content);

      return {
        frontmatter: data as PostFrontmatter,
        content: String(processed.value),
        readingTime: `${readingMinutes} min read`,
      };
    })
  );

  return posts.sort((a, b) => a.frontmatter.order - b.frontmatter.order);
}

export async function getPostBySlug(slug: string, blogDir?: string): Promise<Post | null> {
  const posts = await getAllPosts(blogDir);
  return posts.find((post) => post.frontmatter.slug === slug) ?? null;
}

export async function getFeaturedPosts(count: number, blogDir?: string): Promise<Post[]> {
  const posts = await getAllPosts(blogDir);
  return posts.slice(0, count);
}
