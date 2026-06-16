import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { PostCard } from '@/components/blog/PostCard';
import type { Post } from '@/lib/blog';

const mockPost: Post = {
  frontmatter: {
    title: 'How to Write a Great Resume',
    slug: 'how-to-write',
    excerpt: 'Tips for crafting a standout resume.',
    date: '2026-06-12',
    author: 'ResumeCraft Team',
    order: 1,
  },
  content: '<p>Full post content here.</p>',
  readingTime: '5 min read',
  readingMinutes: 5,
};

describe('PostCard', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders post title', () => {
    render(<PostCard post={mockPost} />);
    expect(screen.getByRole('heading', { name: 'How to Write a Great Resume' })).toBeInTheDocument();
  });

  it('renders post excerpt', () => {
    render(<PostCard post={mockPost} />);
    expect(screen.getByText('Tips for crafting a standout resume.')).toBeInTheDocument();
  });

  it('renders formatted date', () => {
    render(<PostCard post={mockPost} />);
    expect(screen.getByText(/June 12, 2026/)).toBeInTheDocument();
  });

  it('renders reading time', () => {
    render(<PostCard post={mockPost} />);
    expect(screen.getByText(/blog\.readingTime.*"minutes":5/)).toBeInTheDocument();
  });

  it('links to the post slug', () => {
    render(<PostCard post={mockPost} />);
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(1);
    expect(links[0]).toHaveAttribute('href', '/blog/how-to-write');
  });

  it('has the correct test ID', () => {
    render(<PostCard post={mockPost} />);
    expect(screen.getByTestId('post-card-how-to-write')).toBeInTheDocument();
  });
});
