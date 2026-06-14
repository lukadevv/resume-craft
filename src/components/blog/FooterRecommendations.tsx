import { Link } from 'next-view-transitions';
import type { Post } from '@/lib/blog';

interface FooterRecommendationsProps {
  posts: Post[];
}

export function FooterRecommendations({ posts }: FooterRecommendationsProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <div data-testid="footer-recommendations">
      <h4 className="text-sm font-semibold">Recommended Reading</h4>
      <ul className="mt-4 space-y-3">
        {posts.map((post) => (
          <li key={post.frontmatter.slug}>
            <Link
              href={`/blog/${post.frontmatter.slug}`}
              className="text-sm text-foreground-secondary transition-colors hover:text-foreground"
            >
              {post.frontmatter.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
