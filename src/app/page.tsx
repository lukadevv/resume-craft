import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection, FeaturesSection, TemplatesSection, CTASection } from '@/components/landing';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <TemplatesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
