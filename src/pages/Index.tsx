import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import QuickLinks from "@/components/home/QuickLinks";
import NewsSection from "@/components/home/NewsSection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <QuickLinks />
      <NewsSection />
    </Layout>
  );
};

export default Index;
