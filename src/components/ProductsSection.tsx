import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import steelImage from "@/assets/steel-iron.jpg";
import machineryImage from "@/assets/industrial-machinery.jpg";
import furnitureImage from "@/assets/furniture-fabrics.jpg";
import securityDoorsImage from "@/assets/security-doors.jpg";
import babyImage from "@/assets/baby-products.jpg";
import ceramicsImage from "@/assets/ceramics-pop.jpg";
import solarImage from "@/assets/solar-panels.jpg";
import pharmaImage from "@/assets/pharmaceutical-products.jpg";
import fashionImage from "@/assets/fashion-accessories.jpg";

const products = [
  { title: "Steel & Iron", image: steelImage, badge: "CE Certified", link: "/products/steel-iron",
    description: "Construction-grade steel bars, sheets, pipes & structural beams from leading Turkish mills." },
  { title: "Industrial Machinery", image: machineryImage, badge: "ISO Quality", link: "/products/industrial-machinery",
    description: "Heavy equipment, manufacturing lines and precision tools — CE-certified, warranty included." },
  { title: "Furniture & Fabrics", image: furnitureImage, badge: "Export Grade", link: "/products/furniture-fabrics",
    description: "Premium furniture, home textiles and curated fabrics from skilled Turkish artisans." },
  { title: "Security Doors", image: securityDoorsImage, badge: "Bulletproof", link: "/products/security-doors",
    description: "High-security bulletproof, blast and fire-resistant doors with custom security levels." },
  { title: "Baby Products & Wears", image: babyImage, badge: "Safety Certified", link: "/products/baby-products",
    description: "Organic baby clothing, accessories and childcare goods meeting European safety standards." },
  { title: "Ceramics & POP", image: ceramicsImage, badge: "Quality Assured", link: "/products/ceramics-pop",
    description: "Decorative tiles, sanitary ceramics and plaster of Paris in a wide range of finishes." },
  { title: "Solar Panels", image: solarImage, badge: "25-Year Warranty", link: "/products/solar-panels",
    description: "High-efficiency mono & polycrystalline panels, inverters and complete renewable systems." },
  { title: "Pharmaceuticals", image: pharmaImage, badge: "GMP Certified", link: "/products/pharmaceutical-products",
    description: "GMP-certified medicines, supplements and medical supplies with cold-chain logistics." },
  { title: "Fashion & Accessories", image: fashionImage, badge: "Premium Quality", link: "/products/fashion-accessories",
    description: "Designer leather bags, shoes, watches, eyewear and custom branded apparel — men & women." },
];

const ProductsSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background via-secondary/30 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <Badge variant="outline" className="mb-4 bg-primary/5 text-primary border-primary/20">
            Curated Catalogue
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-display">
            Premium Turkish Products
          </h2>
          <p className="text-lg text-muted-foreground">
            Handpicked from verified manufacturers across Turkey — delivered to your door, anywhere in the world.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link
              key={product.title}
              to={product.link}
              className="group relative overflow-hidden rounded-2xl bg-card border border-border/60 shadow-[0_1px_2px_hsla(0_0%_0%/0.04),0_4px_16px_hsla(0_0%_0%/0.05)] hover:shadow-[0_8px_28px_hsla(14_72%_52%/0.18)] transition-all duration-500 hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/20 to-transparent" />
                <Badge className="absolute top-4 left-4 bg-background/90 text-foreground hover:bg-background border-0 backdrop-blur-sm">
                  <CheckCircle className="h-3 w-3 mr-1 text-success-green" />
                  {product.badge}
                </Badge>
                <Badge className="absolute top-4 right-4 bg-primary/90 text-primary-foreground border-0 backdrop-blur-sm text-[10px]">
                  Made in Türkiye
                </Badge>
                {/* Title sits over image */}
                <h3 className="absolute bottom-4 left-5 right-5 text-2xl font-bold text-white font-display leading-tight">
                  {product.title}
                </h3>
              </div>

              {/* Body */}
              <div className="p-5">
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between text-primary text-sm font-medium">
                  <span>Explore category</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-14">
          <Button variant="cta" size="xl" asChild>
            <Link to="/products" className="inline-flex items-center gap-2">
              Browse Full Catalogue
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
