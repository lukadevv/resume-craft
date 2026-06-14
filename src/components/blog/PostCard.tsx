'use client';

import { Link } from 'next-view-transitions';
import { Clock, ArrowRight } from 'lucide-react';
import type { Post } from '@/lib/blog';
import { useLocalizedHref } from '@/lib/locale-utils';

interface PostCardProps {
  post: Post;
  featured?: boolean;
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
  'resume-mistakes': 'from-red-500 to-rose-500',
  'job-search-strategy': 'from-indigo-500 to-violet-500',
  default: 'from-primary to-primary/60',
};

const categoryBgColors: Record<string, string> = {
  'resume-tips': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
  'career-advice': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  'job-search': 'bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300',
  'resume-formatting': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
  'resume-writing': 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300',
  'recruiter-tips': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300',
  'resume-mistakes': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
  'job-search-strategy': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300',
  default: 'bg-surface text-foreground-secondary',
};

function getCategoryGradient(tags?: string[]): string {
  if (!tags || tags.length === 0) return categoryGradients.default;
  for (const tag of tags) {
    if (categoryGradients[tag]) return categoryGradients[tag];
  }
  return categoryGradients.default;
}

function getPrimaryTag(tags?: string[]): string | null {
  if (!tags || tags.length === 0) return null;
  // Return the first tag that has a defined gradient/color
  for (const tag of tags) {
    if (categoryBgColors[tag]) return tag;
  }
  return tags[0];
}

function getTagColor(tag: string): string {
  return categoryBgColors[tag] || categoryBgColors.default;
}

export function PostCard({ post, featured = false }: PostCardProps) {
  const { frontmatter, readingTime } = post;
  const lh = useLocalizedHref();
  // Use tagKeys for color mapping (always English identifiers)
  // Fall back to tags if tagKeys isn't set
  const colorTags = frontmatter.tagKeys || frontmatter.tags;
  const gradient = getCategoryGradient(colorTags);
  const primaryTag = getPrimaryTag(colorTags);

  if (featured) {
    return (
      <Link
        href={lh(`/blog/${frontmatter.slug}`)}
        data-testid={`post-card-featured-${frontmatter.slug}`}
        className="group block"
      >
        <article className="relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface/50 transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-black/10 sm:flex-row">
          {/* Cover / Gradient area */}
          <div
            className={`relative flex h-48 w-full shrink-0 items-end overflow-hidden sm:h-auto sm:w-80 lg:w-96 ${frontmatter.coverImage ? '' : `bg-gradient-to-br ${gradient}`}`}
          >
            {frontmatter.coverImage ? (
              <img
                src={frontmatter.coverImage}
                alt={frontmatter.title}
                className="absolute inset-0 h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            )}
            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            {/* Tags on image */}
            {primaryTag && (
              <div className="relative z-10 p-5">
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium capitalize backdrop-blur-sm ${
                    frontmatter.coverImage
                      ? 'bg-white/20 text-white'
                      : 'bg-white/20 text-white'
                  }`}
                >
                  {primaryTag.replace(/-/g, ' ')}
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-1 flex-col justify-center p-6 lg:p-8">
            <h3 className="text-xl font-bold leading-snug tracking-tight transition-colors group-hover:text-primary lg:text-2xl">
              {frontmatter.title}
            </h3>
            <p className="mt-3 line-clamp-2 text-base text-foreground-secondary">
              {frontmatter.excerpt}
            </p>
            <div className="mt-5 flex items-center justify-between">
              <div className="flex items-center gap-3 text-sm text-foreground-secondary">
                <span>{formatDate(frontmatter.date)}</span>
                <span aria-hidden="true">·</span>
                <Clock className="h-3.5 w-3.5" />
                <span>{readingTime}</span>
              </div>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2">
                Read article
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link
      href={lh(`/blog/${frontmatter.slug}`)}
      data-testid={`post-card-${frontmatter.slug}`}
      className="group block h-full"
    >
      <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface/50 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-black/5">
        {/* Cover image or Gradient accent area */}
        <div
          className={`relative flex h-44 w-full items-end overflow-hidden ${frontmatter.coverImage ? '' : `bg-gradient-to-br ${gradient}`}`}
        >
          {frontmatter.coverImage ? (
            <img
              src={frontmatter.coverImage}
              alt={frontmatter.title}
              className="absolute inset-0 h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 opacity-15">
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          )}
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          {/* Category badge on image */}
          {primaryTag && (
            <div className="relative z-10 p-4">
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize backdrop-blur-sm ${
                  frontmatter.coverImage
                    ? 'bg-white/20 text-white'
                    : 'bg-white/20 text-white'
                }`}
              >
                {primaryTag.replace(/-/g, ' ')}
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-5">
          {/* Tags */}
          {frontmatter.tags && frontmatter.tags.length > 0 && (
            <div className="mb-2.5 flex flex-wrap gap-1.5">
              {frontmatter.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className={`inline-flex rounded-md px-2 py-0.5 text-xs font-medium capitalize ${getTagColor(tag)}`}
                >
                  {tag.replace(/-/g, ' ')}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h3 className="text-base font-semibold leading-snug transition-colors group-hover:text-primary">
            {frontmatter.title}
          </h3>

          {/* Excerpt */}
          <p className="mt-2 line-clamp-2 text-sm text-foreground-secondary flex-1">
            {frontmatter.excerpt}
          </p>

          {/* Meta + CTA */}
          <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
            <div className="flex items-center gap-1.5 text-xs text-foreground-secondary">
              <span>{formatDate(frontmatter.date)}</span>
              <span aria-hidden="true">·</span>
              <Clock className="h-3 w-3" />
              <span>{readingTime}</span>
            </div>
            <ArrowRight className="h-4 w-4 text-foreground-secondary transition-all group-hover:translate-x-0.5 group-hover:text-primary" />
          </div>
        </div>
      </article>
    </Link>
  );
}
