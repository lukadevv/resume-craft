import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import React from 'react';
import type { Post } from '@/lib/blog';

const { mockGetPostBySlug } = vi.hoisted(() => ({
  mockGetPostBySlug: vi.fn(),
}));

vi.mock('@/lib/blog', () => ({
  getPostBySlug: mockGetPostBySlug,
  getAllPosts: vi.fn().mockResolvedValue([]),
}));

vi.mock('@/components/layout/Header', () => ({
  Header: () => React.createElement('header', { 'data-testid': 'mock-header' }, 'Header'),
}));

vi.mock('@/components/layout/Footer', () => ({
  Footer: () => React.createElement('footer', { 'data-testid': 'mock-footer' }, 'Footer'),
}));

import BlogPostPage from '@/app/blog/[slug]/page';

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

describe('BlogPostPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders post title', async () => {
    mockGetPostBySlug.mockResolvedValue(mockPost);

    render(await BlogPostPage({ params: Promise.resolve({ slug: 'how-to-write' }) }));

    expect(screen.getByRole('heading', { name: 'How to Write a Resume' })).toBeInTheDocument();
  });

  it('renders post content as HTML', async () => {
    mockGetPostBySlug.mockResolvedValue(mockPost);

    render(await BlogPostPage({ params: Promise.resolve({ slug: 'how-to-write' }) }));

    expect(screen.getByText('Full article content here.')).toBeInTheDocument();
  });

  it('renders author and date metadata', async () => {
    mockGetPostBySlug.mockResolvedValue(mockPost);

    render(await BlogPostPage({ params: Promise.resolve({ slug: 'how-to-write' }) }));

    expect(screen.getByText(/ResumeCraft Team/)).toBeInTheDocument();
    expect(screen.getByText(/June 12, 2026/)).toBeInTheDocument();
  });

  it('renders reading time', async () => {
    mockGetPostBySlug.mockResolvedValue(mockPost);

    render(await BlogPostPage({ params: Promise.resolve({ slug: 'how-to-write' }) }));

    expect(screen.getByText(/5 min read/)).toBeInTheDocument();
  });

  it('renders JSON-LD BlogPosting schema', async () => {
    mockGetPostBySlug.mockResolvedValue(mockPost);

    const { container } = render(await BlogPostPage({ params: Promise.resolve({ slug: 'how-to-write' }) }));
    const scripts = container.querySelectorAll('script[type="application/ld+json"]');
    const allJson = Array.from(scripts).map((s) => JSON.parse(s.textContent || ''));
    const blogPosting = allJson.find((j) => j['@type'] === 'BlogPosting');
    expect(blogPosting).toBeDefined();
    expect(blogPosting.headline).toBe('How to Write a Resume');
  });

  it('has test ID on the article element', async () => {
    mockGetPostBySlug.mockResolvedValue(mockPost);

    render(await BlogPostPage({ params: Promise.resolve({ slug: 'how-to-write' }) }));

    expect(screen.getByTestId('blog-post-how-to-write')).toBeInTheDocument();
  });
});
