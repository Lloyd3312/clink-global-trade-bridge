import Hero from "@/components/Hero";
import ProductsSection from "@/components/ProductsSection";
import StudyIntro from "@/components/StudyIntro";
import StudySupportCards from "@/components/StudySupportCards";
import FeaturedProperties from "@/components/FeaturedProperties";
import HowItWorks from "@/components/HowItWorks";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <ProductsSection />
      <StudyIntro />
      <StudySupportCards />
      <FeaturedProperties />
      <HowItWorks />
    </div>
  );
};

export default Home;
