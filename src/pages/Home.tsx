import HomeAbout from "@/components/HomeAbout";
import Hero from "@/components/Hero";
import ProductsSection from "@/components/ProductsSection";
import FeaturedProperties from "@/components/FeaturedProperties";
import HowItWorks from "@/components/HowItWorks";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <HomeAbout />
      <ProductsSection />
      <FeaturedProperties />
      <HowItWorks />
    </div>
  );
};

export default Home;
