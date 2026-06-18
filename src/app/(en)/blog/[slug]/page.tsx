import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Link } from '@/components/ui/Link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ReadingProgress } from '@/components/blog/ReadingProgress';
import { PostCard } from '@/components/blog/PostCard';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { ShareButtons } from '@/components/blog/ShareButtons';
import { AuthorBio } from '@/components/blog/AuthorBio';
import { getAllPosts, getPostBySlug } from '@/lib/blog';
import { ArrowLeft, Clock, User, Calendar } from 'lucide-react';
import enBlog from '../../../../../messages/en/blog.json';

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
    title: `${post.frontmatter.title} - ResumeCraft`,
    description: post.frontmatter.excerpt,
    keywords: [
      'resume tips',
      'career advice',
      post.frontmatter.title,
      'resume builder',
    ],
    openGraph: {
      title: `${post.frontmatter.title} - ResumeCraft`,
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

  const formattedDate = formatDate(post.frontmatter.date);

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

        {/* Article header - refined, editorial feel */}
        <div
          className="relative border-b border-border"
          style={{
            backgroundImage: [
              'radial-gradient(ellipse at top, rgba(62, 207, 142, 0.05), transparent 60%)',
              'linear-gradient(to right, #80808009 1px, transparent 1px)',
              'linear-gradient(to bottom, #80808009 1px, transparent 1px)',
            ].join(', '),
            backgroundSize: '100% 100%, 24px 24px, 24px 24px',
          }}
        >
          <div className="mx-auto max-w-3xl px-6 pt-24 pb-12 md:pt-28 md:pb-16 lg:max-w-4xl">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-foreground-secondary transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              {enBlog.backToArticles}
            </Link>

            {/* Tags */}
            {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {post.frontmatter.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-surface px-3 py-1 text-xs font-medium capitalize text-foreground-secondary ring-1 ring-border"
                  >
                    {tag.replace(/-/g, ' ')}
                  </span>
                ))}
              </div>
            )}

            <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl lg:leading-tight">
              {post.frontmatter.title}
            </h1>

            <p className="mt-4 text-lg text-foreground-secondary md:text-xl">
              {post.frontmatter.excerpt}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-foreground-secondary">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {formattedDate}
              </span>
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4" />
                {post.frontmatter.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {enBlog.readingTime.replace('{minutes}', String(post.readingMinutes))}
              </span>
            </div>
          </div>
        </div>

        {/* Article body - editorial reading experience */}
        <div className="mx-auto max-w-3xl px-6 pb-16 md:pb-24 lg:grid lg:max-w-6xl lg:grid-cols-[1fr_minmax(0,720px)_1fr] lg:gap-8">
          {/* Desktop share sidebar */}
          <aside className="hidden lg:block lg:pt-8">
            <div className="sticky top-28">
              <ShareButtons
                title={post.frontmatter.title}
                slug={post.frontmatter.slug}
                layout="sidebar"
              />
            </div>
          </aside>

          {/* Main article content */}
          <main className="min-w-0 pt-8 md:pt-12">
            <article
              data-testid={`blog-post-${post.frontmatter.slug}`}
              className="prose prose-neutral dark:prose-invert max-w-none
                prose-headings:font-bold prose-headings:tracking-tight
                prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:scroll-mt-24
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:scroll-mt-24
                prose-p:leading-relaxed prose-p:text-[17px] md:prose-p:text-[18px] prose-p:leading-[1.75]
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-strong:text-foreground
                prose-code:rounded prose-code:bg-surface prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:font-mono
                prose-li:marker:text-foreground-secondary
                prose-blockquote:border-l-primary prose-blockquote:text-foreground-secondary prose-blockquote:text-[17px] md:prose-blockquote:text-[18px]
                prose-img:rounded-xl prose-img:my-8
                prose-hr:border-border
                prose-ul:my-6 prose-ol:my-6
                prose-li:my-2"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Inline share (mobile) */}
            <div className="mt-10 lg:hidden">
              <ShareButtons
                title={post.frontmatter.title}
                slug={post.frontmatter.slug}
                layout="inline"
              />
            </div>

            {/* Author bio */}
            <div className="mt-10">
              <AuthorBio
                author={post.frontmatter.author}
                date={formattedDate}
                readingMinutes={post.readingMinutes}
              />
            </div>
          </main>

          {/* Desktop right sidebar - Table of Contents */}
          <aside className="hidden lg:block lg:pt-8">
            <div className="sticky top-28">
              <TableOfContents />
            </div>
          </aside>
        </div>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <section className="border-t border-border bg-surface/30 py-16 md:py-20">
            <div className="mx-auto max-w-7xl px-6">
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                {enBlog.continueReading}
              </h2>
              <p className="mt-2 text-foreground-secondary">
                {enBlog.continueReadingDesc}
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
