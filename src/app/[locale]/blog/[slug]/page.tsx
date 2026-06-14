import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Link } from 'next-view-transitions';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ReadingProgress } from '@/components/blog/ReadingProgress';
import { PostCard } from '@/components/blog/PostCard';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { ShareButtons } from '@/components/blog/ShareButtons';
import { AuthorBio } from '@/components/blog/AuthorBio';
import { getAllPosts, getPostBySlug } from '@/lib/blog';
import { ArrowLeft, Clock, User, Calendar } from 'lucide-react';

interface BlogPostPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  // Generate locale×slug combos for non-en locales
  // English posts are handled by the (en)/ route group
  const locales = ['es', 'de', 'fr', 'pt'];

  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    const posts = await getAllPosts(locale);
    for (const post of posts) {
      params.push({ locale, slug: post.frontmatter.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPostBySlug(slug, locale !== 'en' ? locale : undefined);

  if (!post) {
    return {};
  }

  return {
    title: `${post.frontmatter.title} — Resume Craft`,
    description: post.frontmatter.excerpt,
    keywords: ['resume tips', 'career advice', post.frontmatter.title, 'resume builder'],
    openGraph: {
      title: `${post.frontmatter.title} — Resume Craft`,
      description: post.frontmatter.excerpt,
      type: 'article',
      publishedTime: post.frontmatter.date,
      authors: [post.frontmatter.author],
    },
    alternates: {
      canonical: `/${locale}/blog/${post.frontmatter.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;
  const post = await getPostBySlug(slug, locale !== 'en' ? locale : undefined);

  if (!post) notFound();

  const allPosts = await getAllPosts(locale !== 'en' ? locale : undefined);
  const relatedPosts = allPosts
    .filter((p) => p.frontmatter.slug !== slug)
    .slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.frontmatter.title,
    description: post.frontmatter.excerpt,
    url: `/${locale}/blog/${post.frontmatter.slug}`,
    datePublished: post.frontmatter.date,
    author: {
      '@type': 'Person',
      name: post.frontmatter.author,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ReadingProgress />
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-[72px]">
          <article className="mx-auto max-w-3xl px-6 py-12">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-foreground-secondary hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>

            <header className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                {post.frontmatter.title}
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-foreground-secondary">
                <span className="inline-flex items-center gap-1.5">
                  <User className="h-4 w-4" />
                  {post.frontmatter.author}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {post.frontmatter.date}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {post.readingTime}
                </span>
              </div>
            </header>

            <div
              className="prose prose-lg dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <ShareButtons
              slug={post.frontmatter.slug}
              title={post.frontmatter.title}
            />

            <AuthorBio
              author={post.frontmatter.author}
              date={post.frontmatter.date}
              readingTime={post.readingTime}
            />
          </article>

          {relatedPosts.length > 0 && (
            <section className="border-t border-border bg-surface/20 py-16">
              <div className="mx-auto max-w-7xl px-6">
                <h2 className="mb-8 text-2xl font-bold">Related Posts</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {relatedPosts.map((related) => (
                    <PostCard key={related.frontmatter.slug} post={related} />
                  ))}
                </div>
              </div>
            </section>
          )}
        </main>
        <Footer />
      </div>
    </>
  );
}
