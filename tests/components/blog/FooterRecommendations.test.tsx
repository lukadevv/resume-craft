import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { FooterRecommendations } from '@/components/blog/FooterRecommendations';
import type { Post } from '@/lib/blog';

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
  {
    frontmatter: {
      title: 'Third Post',
      slug: 'third-post',
      excerpt: 'Third excerpt',
      date: '2026-06-12',
      author: 'Team',
      order: 3,
    },
    content: '<p>Third</p>',
    readingTime: '2 min read',
  },
];

describe('FooterRecommendations', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders recommended posts when posts exist', () => {
    render(<FooterRecommendations posts={mockPosts} />);

    expect(screen.getByText('First Post')).toBeInTheDocument();
    expect(screen.getByText('Second Post')).toBeInTheDocument();
    expect(screen.getByText('Third Post')).toBeInTheDocument();
  });

  it('renders links to each post', () => {
    render(<FooterRecommendations posts={mockPosts} />);

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(3);
    expect(links[0]).toHaveAttribute('href', '/blog/first-post');
  });

  it('renders nothing when no posts exist', () => {
    const { container } = render(<FooterRecommendations posts={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('has the correct test ID', () => {
    render(<FooterRecommendations posts={mockPosts} />);
    expect(screen.getByTestId('footer-recommendations')).toBeInTheDocument();
  });
});
