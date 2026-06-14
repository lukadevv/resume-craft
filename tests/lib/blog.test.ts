import { describe, it, expect } from 'vitest';
import { join } from 'node:path';
import { getAllPosts, getPostBySlug, getFeaturedPosts } from '@/lib/blog';

const FIXTURES_DIR = join(__dirname, '..', 'fixtures', 'blog');

describe('getAllPosts', () => {
  it('returns posts sorted by order ascending', async () => {
    const posts = await getAllPosts(FIXTURES_DIR);
    expect(posts).toHaveLength(3);
    expect(posts[0].frontmatter.slug).toBe('post-a');
    expect(posts[1].frontmatter.slug).toBe('post-b');
    expect(posts[2].frontmatter.slug).toBe('post-c');
    expect(posts[0].frontmatter.order).toBe(1);
    expect(posts[1].frontmatter.order).toBe(2);
    expect(posts[2].frontmatter.order).toBe(3);
  });

  it('populates readingTime as a string', async () => {
    const posts = await getAllPosts(FIXTURES_DIR);
    for (const post of posts) {
      expect(post.readingTime).toMatch(/^\d+ min read$/);
    }
  });

  it('renders markdown content to HTML', async () => {
    const posts = await getAllPosts(FIXTURES_DIR);
    expect(posts[0].content).toContain('<p>');
  });

  it('returns empty array when directory does not exist', async () => {
    const posts = await getAllPosts('/nonexistent/dir');
    expect(posts).toEqual([]);
  });
});

describe('getPostBySlug', () => {
  it('returns null when no posts match the slug', async () => {
    const result = await getPostBySlug('missing-slug', FIXTURES_DIR);
    expect(result).toBeNull();
  });

  it('returns the matching post when slug matches', async () => {
    const result = await getPostBySlug('post-b', FIXTURES_DIR);
    expect(result).not.toBeNull();
    expect(result!.frontmatter.slug).toBe('post-b');
    expect(result!.frontmatter.title).toBe('Post B');
    expect(result!.content).toContain('<p>');
  });
});

describe('getFeaturedPosts', () => {
  it('returns top N posts by order', async () => {
    const featured = await getFeaturedPosts(2, FIXTURES_DIR);
    expect(featured).toHaveLength(2);
    expect(featured[0].frontmatter.order).toBe(1);
    expect(featured[1].frontmatter.order).toBe(2);
  });

  it('returns fewer than N if not enough posts', async () => {
    const featured = await getFeaturedPosts(10, FIXTURES_DIR);
    expect(featured).toHaveLength(3);
  });
});
