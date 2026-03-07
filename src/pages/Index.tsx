import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Categories from '@/components/Categories';
import { HostingSection, CloudSection, DataCenterSection, DomainsSection } from '@/components/TopProviders';
import Benefits from '@/components/Benefits';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Categories />
      <HostingSection />
      <CloudSection />
      <DataCenterSection />
      <DomainsSection />
      <Benefits />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
