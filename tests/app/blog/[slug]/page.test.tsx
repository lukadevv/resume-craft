import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import React from 'react';
import type { Post } from '@/lib/blog';

const { mockGetPostBySlug, mockGetAllPosts } = vi.hoisted(() => ({
  mockGetPostBySlug: vi.fn(),
  mockGetAllPosts: vi.fn(),
}));

vi.mock('@/lib/blog', () => ({
  getPostBySlug: mockGetPostBySlug,
  getAllPosts: mockGetAllPosts,
}));

vi.mock('next-view-transitions', () => ({
  Link: ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) =>
    React.createElement('a', { href, ...props }, children),
}));

vi.mock('@/components/layout/Header', () => ({
  Header: () => React.createElement('header', { 'data-testid': 'mock-header' }, 'Header'),
}));

vi.mock('@/components/layout/Footer', () => ({
  Footer: () => React.createElement('footer', { 'data-testid': 'mock-footer' }, 'Footer'),
}));

vi.mock('@/components/blog/ReadingProgress', () => ({
  ReadingProgress: () => null,
}));

vi.mock('@/components/blog/TableOfContents', () => ({
  TableOfContents: () => null,
}));

vi.mock('@/components/blog/ShareButtons', () => ({
  ShareButtons: () => React.createElement('div', { 'data-testid': 'share-buttons' }),
}));

vi.mock('@/components/blog/AuthorBio', () => ({
  AuthorBio: () => React.createElement('div', { 'data-testid': 'author-bio' }),
}));

import BlogPostPage from '@/app/[locale]/blog/[slug]/page';

const mockPost: Post = {
  frontmatter: {
    title: 'How to Write a Resume',
    slug: 'how-to-write',
    excerpt: 'A comprehensive guide.',
    date: '2026-06-12',
    author: 'ResumeCraft Team',
    order: 1,
  },
  content: '<p>Full article content here.</p>',
  readingTime: '5 min read',
};

function makeParams(locale = 'en', slug = 'how-to-write') {
  return Promise.resolve({ locale, slug });
}

describe('BlogPostPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetAllPosts.mockResolvedValue([]);
  });

  afterEach(() => {
    cleanup();
  });

  it('renders post title', async () => {
    mockGetPostBySlug.mockResolvedValue(mockPost);

    render(await BlogPostPage({ params: makeParams() }));

    expect(screen.getByRole('heading', { name: 'How to Write a Resume' })).toBeInTheDocument();
  });

  it('renders post content as HTML', async () => {
    mockGetPostBySlug.mockResolvedValue(mockPost);

    render(await BlogPostPage({ params: makeParams() }));

    expect(screen.getByText('Full article content here.')).toBeInTheDocument();
  });

  it('renders author and date metadata', async () => {
    mockGetPostBySlug.mockResolvedValue(mockPost);

    render(await BlogPostPage({ params: makeParams() }));

    expect(screen.getAllByText(/ResumeCraft Team/).length).toBeGreaterThanOrEqual(1);
  });

  it('renders JSON-LD BlogPosting schema', async () => {
    mockGetPostBySlug.mockResolvedValue(mockPost);

    const { container } = render(await BlogPostPage({ params: makeParams() }));
    const scripts = container.querySelectorAll('script[type="application/ld+json"]');
    const allJson = Array.from(scripts).map((s) => JSON.parse(s.textContent || ''));
    const blogPosting = allJson.find((j: Record<string, unknown>) => j['@type'] === 'BlogPosting');
    expect(blogPosting).toBeDefined();
    expect(blogPosting!.headline).toBe('How to Write a Resume');
  });
});
