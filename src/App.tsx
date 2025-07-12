import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import HowItWorksPage from "./pages/HowItWorksPage";
import Contact from "./pages/Contact";
import Quote from "./pages/Quote";
import NotFound from "./pages/NotFound";
import SteelIron from "./pages/products/SteelIron";
import IndustrialMachinery from "./pages/products/IndustrialMachinery";
import FurnitureFabrics from "./pages/products/FurnitureFabrics";
import SecurityDoors from "./pages/products/SecurityDoors";
import BabyProducts from "./pages/products/BabyProducts";
import CeramicsPOP from "./pages/products/CeramicsPOP";
import SolarPanels from "./pages/products/SolarPanels";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/steel-iron" element={<SteelIron />} />
              <Route path="/products/industrial-machinery" element={<IndustrialMachinery />} />
              <Route path="/products/furniture-fabrics" element={<FurnitureFabrics />} />
              <Route path="/products/security-doors" element={<SecurityDoors />} />
              <Route path="/products/baby-products" element={<BabyProducts />} />
              <Route path="/products/ceramics-pop" element={<CeramicsPOP />} />
              <Route path="/products/solar-panels" element={<SolarPanels />} />
              <Route path="/how-it-works" element={<HowItWorksPage />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/quote" element={<Quote />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
