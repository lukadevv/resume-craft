import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import React from 'react';
import type { Post } from '@/lib/blog';

const { mockGetAllPosts, mockGetFeaturedPosts } = vi.hoisted(() => ({
  mockGetAllPosts: vi.fn(),
  mockGetFeaturedPosts: vi.fn(),
}));

vi.mock('@/lib/blog', () => ({
  getAllPosts: mockGetAllPosts,
  getFeaturedPosts: mockGetFeaturedPosts,
}));

vi.mock('@/components/layout/Header', () => ({
  Header: () => React.createElement('header', { 'data-testid': 'mock-header' }, 'Header'),
}));

vi.mock('@/components/layout/Footer', () => ({
  Footer: () => React.createElement('footer', { 'data-testid': 'mock-footer' }, 'Footer'),
}));

import BlogPage from '@/app/blog/page';

const mockPosts: Post[] = [
  {
    frontmatter: {
      title: 'First Post',
      slug: 'first-post',
      excerpt: 'First excerpt',
      date: '2026-06-12',
      author: 'Team',
      order: 1,
    },
    content: '<p>First</p>',
    readingTime: '3 min read',
  },
  {
    frontmatter: {
      title: 'Second Post',
      slug: 'second-post',
      excerpt: 'Second excerpt',
      date: '2026-06-12',
      author: 'Team',
      order: 2,
    },
    content: '<p>Second</p>',
    readingTime: '5 min read',
  },
];

describe('BlogPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders post cards when posts exist', async () => {
    mockGetAllPosts.mockResolvedValue(mockPosts);
    mockGetFeaturedPosts.mockResolvedValue([]);

    render(await BlogPage());

    const elements = screen.getAllByText('First Post');
    expect(elements.length).toBe(1);
    expect(screen.getByText('Second Post')).toBeInTheDocument();
  });

  it('shows empty state when no posts exist', async () => {
    mockGetAllPosts.mockResolvedValue([]);
    mockGetFeaturedPosts.mockResolvedValue([]);

    render(await BlogPage());
    expect(screen.getByText(/no articles in this category yet/i)).toBeInTheDocument();
  });

  it('renders JSON-LD script', async () => {
    mockGetAllPosts.mockResolvedValue(mockPosts);
    mockGetFeaturedPosts.mockResolvedValue([]);

    const { container } = render(await BlogPage());
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).not.toBeNull();
    const parsed = JSON.parse(script!.textContent || '');
    expect(parsed['@type']).toBe('CollectionPage');
  });
});
