import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Categories from '@/components/Categories';
import Benefits from '@/components/Benefits';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

const TestSection = () => (
  <section className="py-24 bg-red-100">
    <div className="container">
      <h2 className="text-4xl font-bold">TEST SECTION</h2>
      <p>If you can see this, sections work.</p>
    </div>
  </section>
);

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Categories />
        <TestSection />
        <Benefits />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
