import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Wrench, 
  Armchair, 
  Zap, 
  Building, 
  Cog,
  ArrowRight,
  Shield,
  Baby,
  CheckCircle,
  Award,
  Pill
} from "lucide-react";
import { Link } from "react-router-dom";

const ProductsSection = () => {
  const getProductLink = (title: string) => {
    switch(title) {
      case "Steel & Iron": return "/products/steel-iron";
      case "Industrial Machinery": return "/products/industrial-machinery";
      case "Furniture & Fabrics": return "/products/furniture-fabrics";
      case "Doors (Bulletproof)": return "/products/security-doors";
      case "Baby Things & Wears": return "/products/baby-products";
      case "Ceramics & POP": return "/products/ceramics-pop";
      case "Solar Panels": return "/products/solar-panels";
      case "Pharmaceutical Products": return "/products/pharmaceutical-products";
      default: return "/products";
    }
  };

  const products = [
    {
      icon: Building,
      title: "Steel & Iron",
      description: "High-grade steel bars, sheets, pipes, and structural steel products from leading Turkish mills.",
      features: ["Construction Grade", "Industrial Quality", "Custom Specifications"],
      badge: "CE Certified",
      trustIcon: CheckCircle
    },
    {
      icon: Cog,
      title: "Industrial Machinery",
      description: "Heavy equipment, manufacturing machinery, and precision tools from Turkish manufacturers.",
      features: ["CE Certified", "Global Warranty", "Technical Support"],
      badge: "ISO Quality",
      trustIcon: Award
    },
    {
      icon: Armchair,
      title: "Furniture & Fabrics",
      description: "Premium furniture, home textiles, and high-quality fabrics from Turkish artisans.",
      features: ["Export Quality", "Custom Designs", "Bulk Orders"],
      badge: "Export Grade",
      trustIcon: CheckCircle
    },
    {
      icon: Shield,
      title: "Doors (Bulletproof)",
      description: "High-security bulletproof doors and specialized security door systems from Turkish manufacturers.",
      features: ["Ballistic Protection", "Fire Resistant", "Custom Security Levels"],
      badge: "Security Grade",
      trustIcon: Shield
    },
    {
      icon: Baby,
      title: "Baby Things & Wears",
      description: "Premium baby clothing, accessories, and childcare products from certified Turkish suppliers.",
      features: ["Organic Materials", "Safety Certified", "European Standards"],
      badge: "Safety Certified",
      trustIcon: CheckCircle
    },
    {
      icon: Wrench,
      title: "Ceramics & POP",
      description: "Decorative ceramics, tiles, and plaster of Paris materials for construction and design.",
      features: ["Artistic Designs", "Durable Materials", "Various Sizes"],
      badge: "Quality Assured",
      trustIcon: Award
    },
    {
      icon: Zap,
      title: "Solar Panels",
      description: "High-efficiency solar panels and renewable energy equipment from Turkish manufacturers.",
      features: ["EU Standards", "25-Year Warranty", "Installation Support"],
      badge: "25-Year Warranty",
      trustIcon: CheckCircle
    },
    {
      icon: Pill,
      title: "Pharmaceutical Products",
      description: "GMP-certified medicines, supplements, and medical supplies from Turkish pharmaceutical manufacturers.",
      features: ["GMP Certified", "WHO Prequalified", "Cold Chain Logistics"],
      badge: "GMP Certified",
      trustIcon: Award
    }
  ];

  return (
    <section className="py-20 bg-secondary/30 relative">
      {/* Deep Green Lower Third */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-deep-green/10"></div>
      <div className="relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Premium Turkish Products
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Discover our comprehensive range of high-quality Turkish goods, 
            carefully sourced from verified manufacturers and suppliers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-border/50 bg-card/80 backdrop-blur-sm hover:bg-card/90 relative overflow-hidden">
              {/* Trust Badge */}
              <div className="absolute top-4 right-4 z-10">
                <Badge variant="secondary" className="bg-success-green/10 text-success-green border-success-green/30 text-xs">
                  <product.trustIcon className="h-3 w-3 mr-1" />
                  {product.badge}
                </Badge>
              </div>
              
              {/* Turkish Supplier Badge */}
              <div className="absolute top-4 left-4 z-10">
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 text-xs">
                  Trusted Turkish Supplier
                </Badge>
              </div>
              
              <CardHeader className="pt-16 pb-4">
                <div className="h-14 w-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors shadow-md">
                  <product.icon className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-xl text-foreground">{product.title}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {product.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {product.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                      <div className="h-1.5 w-1.5 bg-primary rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors shadow-sm" asChild>
                  <Link to={getProductLink(product.title)}>
                    Learn More
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Products CTA */}
        <div className="text-center mt-12">
          <Button variant="cta" size="lg" asChild>
            <Link to="/products" className="inline-flex items-center gap-2">
              View All Products
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
      </div>
    </section>
  );
};

export default ProductsSection;