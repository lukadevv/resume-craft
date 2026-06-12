import { Link } from 'next-view-transitions';
import { Clock, ArrowRight } from 'lucide-react';
import type { Post } from '@/lib/blog';

interface PostCardProps {
  post: Post;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString + 'T00:00:00Z');
  return date.toLocaleDateString('en-US', {
    timeZone: 'UTC',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

const categoryGradients: Record<string, string> = {
  'resume-tips': 'from-emerald-500 to-teal-500',
  'career-advice': 'from-blue-500 to-indigo-500',
  'job-search': 'from-violet-500 to-purple-500',
  'resume-formatting': 'from-orange-500 to-amber-500',
  'resume-writing': 'from-pink-500 to-rose-500',
  'recruiter-tips': 'from-cyan-500 to-sky-500',
  default: 'from-primary to-primary/60',
};

function getCategoryGradient(tags?: string[]): string {
  if (!tags || tags.length === 0) return categoryGradients.default;
  for (const tag of tags) {
    if (categoryGradients[tag]) return categoryGradients[tag];
  }
  return categoryGradients.default;
}

export function PostCard({ post }: PostCardProps) {
  const { frontmatter, readingTime } = post;
  const gradient = getCategoryGradient(frontmatter.tags);

  return (
    <Link
      href={`/blog/${frontmatter.slug}`}
      data-testid={`post-card-${frontmatter.slug}`}
      className="group block h-full"
    >
      <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface/50 transition-all hover:border-primary/50 hover:shadow-xl hover:shadow-black/10">
        {/* Gradient accent bar */}
        <div className={`h-1.5 w-full bg-gradient-to-r ${gradient}`} />

        <div className="flex flex-1 flex-col p-6">
          {/* Tags */}
          {frontmatter.tags && frontmatter.tags.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-1.5">
              {frontmatter.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex rounded-md bg-background px-2 py-0.5 text-xs font-medium text-foreground-secondary"
                >
                  {tag.replace(/-/g, ' ')}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h3 className="text-lg font-semibold leading-snug transition-colors group-hover:text-primary">
            {frontmatter.title}
          </h3>

          {/* Excerpt */}
          <p className="mt-2 line-clamp-2 text-sm text-foreground-secondary flex-1">
            {frontmatter.excerpt}
          </p>

          {/* Meta + CTA */}
          <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
            <div className="flex items-center gap-2 text-xs text-foreground-secondary">
              <span>{formatDate(frontmatter.date)}</span>
              <span aria-hidden="true">·</span>
              <Clock className="h-3 w-3" />
              <span>{readingTime}</span>
            </div>
            <ArrowRight className="h-4 w-4 text-foreground-secondary transition-all group-hover:translate-x-1 group-hover:text-primary" />
          </div>
        </div>
      </article>
    </Link>
  );
}
