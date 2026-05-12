import Hero from "@/components/Hero";
import ProductsSection from "@/components/ProductsSection";
import FeaturedProperties from "@/components/FeaturedProperties";
import HowItWorks from "@/components/HowItWorks";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <ProductsSection />
      <FeaturedProperties />
      <HowItWorks />
    </div>
  );
};

export default Home;
