import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import WhyTekioSection from '@/components/home/WhyTekioSection';
import ServicesSection from '@/components/home/ServicesSection';
import TechnologySection from '@/components/home/TechnologySection';
import PricingSection from '@/components/home/PricingSection';
import CTASection from '@/components/home/CTASection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <WhyTekioSection />
      <ServicesSection />
      <TechnologySection />
      <PricingSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
