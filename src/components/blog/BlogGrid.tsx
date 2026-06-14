'use client';

import { useState, useMemo } from 'react';
import { Search, BookOpen } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/ui/Reveal';
import { PostCard } from '@/components/blog/PostCard';
import type { Post } from '@/lib/blog';

interface BlogGridProps {
  posts: Post[];
}

type SortMode = 'newest' | 'oldest' | 'az' | 'za';

export function BlogGrid({ posts }: BlogGridProps) {
  const [search, setSearch] = useState('');

  // Collect unique tags from all posts for filtering
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    posts.forEach((p) => p.frontmatter.tags?.forEach((t) => tagSet.add(t)));
    return Array.from(tagSet).sort();
  }, [posts]);

  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [sortMode, setSortMode] = useState<SortMode>('newest');

  const filteredPosts = useMemo(() => {
    let result = [...posts];

    // Tag filter
    if (activeTag) {
      result = result.filter(
        (p) => p.frontmatter.tags?.includes(activeTag)
      );
    }

    // Search filter
    if (search.trim()) {
      const query = search.toLowerCase();
      result = result.filter((post) => {
        const searchFields = [
          post.frontmatter.title,
          post.frontmatter.excerpt,
          ...(post.frontmatter.tags || []),
        ];
        return searchFields.some((field) => field.toLowerCase().includes(query));
      });
    }

    // Sort
    switch (sortMode) {
      case 'newest':
        result.sort(
          (a, b) =>
            new Date(b.frontmatter.date).getTime() -
            new Date(a.frontmatter.date).getTime()
        );
        break;
      case 'oldest':
        result.sort(
          (a, b) =>
            new Date(a.frontmatter.date).getTime() -
            new Date(b.frontmatter.date).getTime()
        );
        break;
      case 'az':
        result.sort((a, b) =>
          a.frontmatter.title.localeCompare(b.frontmatter.title)
        );
        break;
      case 'za':
        result.sort((a, b) =>
          b.frontmatter.title.localeCompare(a.frontmatter.title)
        );
        break;
    }

    return result;
  }, [posts, search, activeTag, sortMode]);

  return (
    <div className="space-y-8">
      {/* Search + Sort Bar */}
      <Reveal>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-secondary" />
            <Input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-foreground-secondary">Sort:</span>
            {(
              [
                { value: 'newest', label: 'Newest' },
                { value: 'oldest', label: 'Oldest' },
                { value: 'az', label: 'A-Z' },
                { value: 'za', label: 'Z-A' },
              ] as { value: SortMode; label: string }[]
            ).map((option) => (
              <Button
                key={option.value}
                variant={sortMode === option.value ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSortMode(option.value)}
                className="text-xs"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Tag filter pills */}
      {allTags.length > 0 && (
        <Reveal>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTag(null)}
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                !activeTag
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-surface text-foreground-secondary hover:bg-surface/80'
              }`}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium capitalize transition-colors ${
                  activeTag === tag
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-surface text-foreground-secondary hover:bg-surface/80'
                }`}
              >
                {tag.replace(/-/g, ' ')}
              </button>
            ))}
          </div>
        </Reveal>
      )}

      {/* Results */}
      {filteredPosts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <BookOpen className="h-12 w-12 text-foreground-secondary/50" />
          <p className="mt-4 text-foreground-secondary">
            {search
              ? `No articles found for "${search}"`
              : 'No articles in this category yet'}
          </p>
          {search && (
            <Button variant="link" onClick={() => setSearch('')}>
              Clear search
            </Button>
          )}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post, index) => (
            <Reveal key={post.frontmatter.slug} delayMs={(index % 3) * 100}>
              <PostCard post={post} />
            </Reveal>
          ))}
        </div>
      )}

      {/* Count */}
      <div className="text-center text-xs text-foreground-secondary">
        Showing {filteredPosts.length} of {posts.length} articles
      </div>
    </div>
  );
}
