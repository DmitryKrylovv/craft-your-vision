import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Categories from '@/components/Categories';
import HostingProviders from '@/components/sections/HostingProviders';
import CloudProviders from '@/components/sections/CloudProviders';
import DataCenterProviders from '@/components/sections/DataCenterProviders';
import DomainProviders from '@/components/sections/DomainProviders';
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
        <HostingProviders />
        <CloudProviders />
        <DataCenterProviders />
        <DomainProviders />
        <Benefits />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
