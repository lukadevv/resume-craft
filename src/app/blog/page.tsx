import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BlogGrid } from '@/components/blog/BlogGrid';
import { PostCard } from '@/components/blog/PostCard';
import { getAllPosts } from '@/lib/blog';
import { Newspaper } from 'lucide-react';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Blog - ResumeCraft',
    description:
      'Expert resume writing tips, career advice, and job search strategies to help you land your dream job.',
    keywords: [
      'resume tips',
      'career advice',
      'job search',
      'resume builder blog',
      'CV writing',
      'interview tips',
    ],
    openGraph: {
      title: 'Blog - ResumeCraft',
      description:
        'Expert resume writing tips, career advice, and job search strategies.',
      type: 'website',
    },
    alternates: {
      canonical: '/blog',
    },
  };
}

export default async function BlogPage() {
  const posts = await getAllPosts();
  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Blog - ResumeCraft',
    description:
      'Expert resume writing tips, career advice, and job search strategies.',
    url: '/blog',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: posts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'BlogPosting',
          headline: post.frontmatter.title,
          url: `/blog/${post.frontmatter.slug}`,
          description: post.frontmatter.excerpt,
          datePublished: post.frontmatter.date,
          author: {
            '@type': 'Person',
            name: post.frontmatter.author,
          },
        },
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-[72px]">
          {/* Hero Section - refined editorial feel */}
          <div
            className="relative overflow-hidden"
            style={{
              backgroundImage: [
                'radial-gradient(ellipse at top, rgba(62, 207, 142, 0.08), transparent 60%)',
                'radial-gradient(ellipse at bottom right, rgba(62, 207, 142, 0.04), transparent 50%)',
                'linear-gradient(to right, #80808009 1px, transparent 1px)',
                'linear-gradient(to bottom, #80808009 1px, transparent 1px)',
              ].join(', '),
              backgroundSize: '100% 100%, 100% 100%, 24px 24px, 24px 24px',
            }}
          >
            <section className="relative py-16 md:py-20 lg:py-24">
              <div className="mx-auto max-w-7xl px-6">
                <div className="mx-auto max-w-3xl text-center">
                  <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-4 py-1.5 text-sm text-foreground-secondary">
                    <Newspaper className="h-4 w-4 text-primary" />
                    {posts.length} Resume Guides
                  </div>
                  <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                    Resume Advice You Can{' '}
                    <span className="gradient-text">Actually Use</span>
                  </h1>
                  <p className="mt-4 text-lg text-foreground-secondary md:text-xl">
                    Expert tips, career strategies, and job search advice
                    written by people who have reviewed thousands of resumes.
                  </p>
                </div>
              </div>
            </section>

            {/* Featured post - bigger card */}
            {featuredPost && (
              <section className="pb-8 md:pb-12">
                <div className="mx-auto max-w-7xl px-6">
                  <PostCard post={featuredPost} featured />
                </div>
              </section>
            )}

            {/* Grid section with search and filters */}
            <section className="border-t border-border bg-surface/20 pb-16 md:pb-20">
              <div className="mx-auto max-w-7xl px-6 pt-12 md:pt-16">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                    All Articles
                  </h2>
                  <p className="mt-1 text-foreground-secondary">
                    Browse our complete collection of resume and career advice.
                  </p>
                </div>
                <BlogGrid posts={remainingPosts} />
              </div>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
