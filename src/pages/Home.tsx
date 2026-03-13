import Hero from "@/components/Hero";
import ProductsSection from "@/components/ProductsSection";
import HowItWorks from "@/components/HowItWorks";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <ProductsSection />
      <HowItWorks />
    </div>
  );
};

export default Home;