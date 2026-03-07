import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Categories from '@/components/Categories';
import TopProviders from '@/components/TopProviders';

import Benefits from '@/components/Benefits';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Categories />
        <TopProviders />
        
        <Benefits />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
