import type { Metadata } from 'next';
import { CreatePageClient } from './CreatePageClient';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import enSeo from '../../../../messages/en/seo.json';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: enSeo.create.title,
    description: enSeo.create.description,
    keywords: ['create resume', 'build resume', 'resume wizard', 'CV builder', 'free resume'],
    openGraph: {
      title: enSeo.create.title,
      description: enSeo.create.description,
      type: 'website',
      locale: 'en_US',
    },
    alternates: {
      canonical: '/create',
      languages: {
        en: '/create',
        es: '/es/create',
        de: '/de/create',
        fr: '/fr/create',
        pt: '/pt/create',
      },
    },
  };
}

export default function CreatePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: '/' },
          { name: 'Create Resume', href: '/create' },
        ]}
      />
      <CreatePageClient />
    </>
  );
}
