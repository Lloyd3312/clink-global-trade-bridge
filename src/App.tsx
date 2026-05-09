import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import AIAssistant from "./components/AIAssistant";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import HowItWorksPage from "./pages/HowItWorksPage";
import Contact from "./pages/Contact";
import Quote from "./pages/Quote";
import QuoteConfirmation from "./pages/QuoteConfirmation";
import QuoteTracking from "./pages/QuoteTracking";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import SteelIron from "./pages/products/SteelIron";
import IndustrialMachinery from "./pages/products/IndustrialMachinery";
import FurnitureFabrics from "./pages/products/FurnitureFabrics";
import SecurityDoors from "./pages/products/SecurityDoors";
import BabyProducts from "./pages/products/BabyProducts";
import CeramicsPOP from "./pages/products/CeramicsPOP";
import SolarPanels from "./pages/products/SolarPanels";
import WhiteLabelFabrics from "./pages/products/WhiteLabelFabrics";
import WhiteLabelCarpets from "./pages/products/WhiteLabelCarpets";
import WhiteLabelCottons from "./pages/products/WhiteLabelCottons";
import WhiteLabelCosmetics from "./pages/products/WhiteLabelCosmetics";
import WhiteLabelTurkishCloths from "./pages/products/WhiteLabelTurkishCloths";
import WhiteLabelTurkishOil from "./pages/products/WhiteLabelTurkishOil";
import PharmaceuticalProducts from "./pages/products/PharmaceuticalProducts";
import FashionAccessories from "./pages/products/FashionAccessories";
import Auth from "./pages/Auth";
import ProductUpload from "./pages/ProductUpload";
import SellerApply from "./pages/SellerApply";
import AdminCatalog from "./pages/AdminCatalog";
import { AuthProvider } from "./hooks/useAuth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
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
                <Route path="/products/white-label-fabrics" element={<WhiteLabelFabrics />} />
                <Route path="/products/white-label-carpets" element={<WhiteLabelCarpets />} />
                <Route path="/products/white-label-cottons" element={<WhiteLabelCottons />} />
                <Route path="/products/white-label-cosmetics" element={<WhiteLabelCosmetics />} />
                <Route path="/products/white-label-turkish-cloths" element={<WhiteLabelTurkishCloths />} />
                <Route path="/products/white-label-turkish-oil" element={<WhiteLabelTurkishOil />} />
                <Route path="/products/pharmaceutical-products" element={<PharmaceuticalProducts />} />
                <Route path="/products/fashion-accessories" element={<FashionAccessories />} />
                <Route path="/how-it-works" element={<HowItWorksPage />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/quote" element={<Quote />} />
                <Route path="/quote-confirmation" element={<QuoteConfirmation />} />
                <Route path="/quote-tracking" element={<QuoteTracking />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/seller/apply" element={<SellerApply />} />
                <Route path="/seller/products" element={<ProductUpload />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/products" element={<ProductUpload />} />
                <Route path="/admin/catalog" element={<AdminCatalog />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
            <WhatsAppButton />
            <AIAssistant />
          </div>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
