import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { CTASection } from "@/components/home/CTASection";
import { FeaturedModelsSection } from "@/components/home/FeaturedModelsSection";
import { PartnersSection } from "@/components/home/PartnersSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { StatsSection } from "@/components/home/StatsSection";
import { ValuesSection } from "@/components/home/ValuesSection";

const HomePage = () => {
  return (
    <Layout>
      <HeroSection />
      <StatsSection />
      <ValuesSection />
      <FeaturedModelsSection />
      <ServicesSection />
      <PartnersSection />
      <CTASection />
    </Layout>
  );
};

export default HomePage;
