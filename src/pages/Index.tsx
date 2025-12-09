import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import { FeaturedModelsSection } from "@/components/home/FeaturedModelsSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { ValuesSection } from "@/components/home/ValuesSection";
import { PartnersSection } from "@/components/home/PartnersSection";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <StatsSection />
      <FeaturedModelsSection />
      <ServicesSection />
      <ValuesSection />
      <PartnersSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
