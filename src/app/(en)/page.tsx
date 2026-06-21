import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection, FeaturesSection, PrivacySection, TemplatesSection, CTASection } from '@/components/landing';
import enSeo from '../../../messages/en/seo.json';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: enSeo.home.title,
    description: enSeo.home.description,
    keywords: ['resume', 'cv', 'builder', 'job', 'career', 'resume builder', 'free resume builder'],
    openGraph: {
      title: enSeo.home.title,
      description: enSeo.home.description,
      type: 'website',
      locale: 'en_US',
    },
    alternates: {
      canonical: '/',
      languages: {
        en: '/',
        es: '/es',
        de: '/de',
        fr: '/fr',
        pt: '/pt',
      },
    },
  };
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <PrivacySection />
        <TemplatesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
