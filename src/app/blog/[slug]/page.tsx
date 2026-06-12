import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Link } from 'next-view-transitions';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ReadingProgress } from '@/components/blog/ReadingProgress';
import { PostCard } from '@/components/blog/PostCard';
import { getAllPosts, getPostBySlug, getFeaturedPosts } from '@/lib/blog';
import { ArrowLeft, Clock, User, Calendar } from 'lucide-react';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.frontmatter.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: `${post.frontmatter.title} — ResumeCraft`,
    description: post.frontmatter.excerpt,
    keywords: [
      'resume tips',
      'career advice',
      post.frontmatter.title,
      'resume builder',
    ],
    openGraph: {
      title: `${post.frontmatter.title} — ResumeCraft`,
      description: post.frontmatter.excerpt,
      type: 'article',
      publishedTime: post.frontmatter.date,
      authors: [post.frontmatter.author],
    },
    alternates: {
      canonical: `/blog/${post.frontmatter.slug}`,
    },
  };
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

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Get related posts (same tags, or just featured excluding current)
  const allPosts = await getAllPosts();
  const relatedPosts = allPosts
    .filter((p) => p.frontmatter.slug !== slug)
    .slice(0, 3);

  const jsonLdBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: '/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: '/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.frontmatter.title,
        item: `/blog/${post.frontmatter.slug}`,
      },
    ],
  };

  const jsonLdPost = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.frontmatter.title,
    description: post.frontmatter.excerpt,
    datePublished: post.frontmatter.date,
    author: {
      '@type': 'Person',
      name: post.frontmatter.author,
    },
    url: `/blog/${post.frontmatter.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPost) }}
      />
      <div className="min-h-screen bg-background">
        <Header />
        <ReadingProgress />

        {/* Article header */}
        <div
          className="relative"
          style={{
            backgroundImage: [
              'radial-gradient(ellipse at top, rgba(62, 207, 142, 0.06), transparent 60%)',
              'linear-gradient(to right, #80808009 1px, transparent 1px)',
              'linear-gradient(to bottom, #80808009 1px, transparent 1px)',
            ].join(', '),
            backgroundSize: '100% 100%, 24px 24px, 24px 24px',
          }}
        >
          <div className="mx-auto max-w-3xl px-6 pt-24 pb-8 md:pt-28 md:pb-12">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-foreground-secondary transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>

            {/* Tags */}
            {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {post.frontmatter.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-surface px-3 py-1 text-xs font-medium capitalize text-foreground-secondary"
                  >
                    {tag.replace(/-/g, ' ')}
                  </span>
                ))}
              </div>
            )}

            <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              {post.frontmatter.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-foreground-secondary">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {formatDate(post.frontmatter.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4" />
                {post.frontmatter.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {post.readingTime}
              </span>
            </div>
          </div>
        </div>

        {/* Article body */}
        <main className="mx-auto max-w-3xl px-6 pb-16 md:pb-24">
          <article
            data-testid={`blog-post-${post.frontmatter.slug}`}
            className="prose prose-neutral dark:prose-invert max-w-none
              prose-headings:font-bold prose-headings:tracking-tight
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:leading-relaxed prose-p:text-foreground-secondary
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-strong:text-foreground
              prose-code:rounded prose-code:bg-surface prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm
              prose-li:marker:text-foreground-secondary
              prose-blockquote:border-l-primary prose-blockquote:text-foreground-secondary
              prose-img:rounded-xl"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </main>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <section className="border-t border-border py-16 md:py-20">
            <div className="mx-auto max-w-7xl px-6">
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                Continue Reading
              </h2>
              <p className="mt-2 text-foreground-secondary">
                More articles to help you build a better resume.
              </p>
              <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((relatedPost) => (
                  <PostCard key={relatedPost.frontmatter.slug} post={relatedPost} />
                ))}
              </div>
            </div>
          </section>
        )}

        <Footer />
      </div>
    </>
  );
}
