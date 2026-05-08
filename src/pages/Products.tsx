import pharmaImage from "@/assets/pharmaceutical-products.jpg";
import ceramicsImage from "@/assets/ceramics-pop.jpg";
import securityDoorsImage from "@/assets/security-doors.jpg";
import babyProductsImage from "@/assets/baby-products.jpg";
import solarPanelsImage from "@/assets/solar-panels.jpg";
import fashionImage from "@/assets/fashion-accessories.jpg";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Building, 
  Cog, 
  Armchair, 
  Wrench, 
  Zap,
  ArrowRight,
  CheckCircle,
  Shield,
  Baby,
  Pill,
  ShoppingBag
} from "lucide-react";
import { Link } from "react-router-dom";
import MarketplaceProducts from "@/components/MarketplaceProducts";

const Products = () => {
  const productCategories = [
    {
      icon: Building,
      title: "Steel & Iron",
      description: "Premium quality steel products for construction and industrial applications",
      image: "/lovable-uploads/38216ba6-7de2-4cd6-a498-aaec379242e0.png",
      products: [
        "Structural Steel Beams",
        "Steel Sheets & Plates", 
        "Steel Pipes & Tubes",
        "Reinforcement Bars",
        "Galvanized Steel Products"
      ],
      features: [
        "Construction Grade Quality",
        "Various Steel Grades Available", 
        "Custom Cutting Services",
        "International Standards Compliance"
      ]
    },
    {
      icon: Cog,
      title: "Industrial Machinery",
      description: "Advanced machinery and equipment from Turkish manufacturers",
      image: "/lovable-uploads/7834c249-e488-42b6-aa9a-421411f82576.png",
      products: [
        "Manufacturing Equipment",
        "Construction Machinery",
        "Agricultural Machinery",
        "Textile Machinery",
        "Food Processing Equipment"
      ],
      features: [
        "CE Certification",
        "Technical Documentation",
        "After-Sales Support",
        "Spare Parts Availability"
      ]
    },
    {
      icon: Armchair,
      title: "Furniture & Fabrics",
      description: "High-quality furniture and premium textiles from Turkish artisans",
      image: "/lovable-uploads/fde866d3-9681-4917-995f-6596ab25307b.png",
      products: [
        "Home Furniture Sets",
        "Office Furniture",
        "Textile & Fabrics",
        "Carpets & Rugs",
        "Home Decor Items"
      ],
      features: [
        "Export Quality Standards",
        "Custom Design Options",
        "Sustainable Materials",
        "Competitive Pricing"
      ]
    },
    {
      icon: Wrench,
      title: "Ceramics & POP Materials",
      description: "Decorative and functional ceramic products and plaster materials",
      image: ceramicsImage,
      products: [
        "Ceramic Tiles",
        "Decorative Ceramics",
        "Plaster of Paris",
        "Bathroom Fixtures",
        "Kitchen Ceramics"
      ],
      features: [
        "Artistic Designs",
        "Water Resistant",
        "Easy Installation",
        "Bulk Order Discounts"
      ]
    },
    {
      icon: Shield,
      title: "Security Doors",
      description: "High-security bulletproof doors and specialized security systems",
      image: securityDoorsImage,
      products: [
        "Bulletproof Steel Doors",
        "Fire-Resistant Doors",
        "Blast-Resistant Doors",
        "Security Door Frames",
        "Access Control Systems"
      ],
      features: [
        "Ballistic Protection",
        "Fire Resistance",
        "Custom Security Levels",
        "International Standards"
      ]
    },
    {
      icon: Baby,
      title: "Baby Products & Wears",
      description: "Premium baby clothing, accessories, and childcare products",
      image: babyProductsImage,
      products: [
        "Baby Clothing Sets",
        "Infant Accessories",
        "Baby Care Products",
        "Childcare Equipment",
        "Organic Baby Wear"
      ],
      features: [
        "Organic Materials",
        "Safety Certified",
        "European Standards",
        "Hypoallergenic"
      ]
    },
    {
      icon: Zap,
      title: "Solar Panels & Renewable Energy",
      description: "Clean energy solutions and solar equipment",
      image: solarPanelsImage,
      products: [
        "Monocrystalline Solar Panels",
        "Polycrystalline Solar Panels",
        "Solar Inverters",
        "Battery Storage Systems",
        "Solar Mounting Systems"
      ],
      features: [
        "High Efficiency Ratings",
        "25-Year Warranty",
        "EU Standard Compliance",
        "Installation Support"
      ]
    },
    {
      icon: Pill,
      title: "Pharmaceutical Products",
      description: "GMP-certified medicines, supplements, and medical supplies from Turkish manufacturers",
      image: pharmaImage,
      products: [
        "Over-the-Counter Medicines",
        "Prescription Pharmaceuticals",
        "Vitamins & Supplements",
        "Medical Devices & Equipment",
        "Surgical Supplies"
      ],
      features: [
        "GMP Certified Manufacturing",
        "WHO Prequalified",
        "EU & FDA Compliance",
        "Cold Chain Logistics"
      ]
    },
    {
      icon: ShoppingBag,
      title: "Fashion & Accessories",
      description: "Premium Turkish fashion for men and women — bags, shoes, watches, and custom apparel",
      image: fashionImage,
      products: [
        "Designer Leather Bags",
        "Men's & Women's Shoes",
        "Luxury Clutch Purses",
        "Designer Sunglasses & Glasses",
        "Wristwatches & Hand Bands",
        "Stylish Hats & Caps",
        "Cloth Materials",
        "Customized T-Shirts"
      ],
      features: [
        "Premium Craftsmanship",
        "Custom Branding Available",
        "Genuine Leather",
        "Men's & Women's Collections"
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-ocean-blue/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Premium Turkish Products
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Discover our comprehensive range of high-quality Turkish goods, 
            carefully sourced from verified manufacturers and suppliers across Turkey.
          </p>
          <Button variant="cta" size="lg" asChild>
            <Link to="/quote" className="inline-flex items-center gap-2">
              Request Product Quote
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {productCategories.map((category, index) => (
              <div key={index} className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                {/* Image */}
                <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div 
                    className="rounded-lg h-80 bg-cover bg-center shadow-lg"
                    style={{ backgroundImage: `url('${category.image}')` }}
                  />
                </div>

                {/* Content */}
                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <category.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold text-foreground">{category.title}</h2>
                  </div>

                  <p className="text-lg text-muted-foreground">
                    {category.description}
                  </p>

                  {/* Products List */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Available Products:</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {category.products.map((product, productIndex) => (
                        <div key={productIndex} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-success-green" />
                          <span className="text-sm text-muted-foreground">{product}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Key Features:</h3>
                    <div className="flex flex-wrap gap-2">
                      {category.features.map((feature, featureIndex) => (
                        <Badge key={featureIndex} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button variant="cta-outline" size="lg">
                    Get Quote for {category.title}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Assurance Section */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Quality Assurance
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              All our products undergo rigorous quality checks and comply with international standards
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <CheckCircle className="h-12 w-12 text-success-green mx-auto mb-4" />
                <CardTitle>Certified Suppliers</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  All our partner manufacturers are verified and certified to international standards.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <CheckCircle className="h-12 w-12 text-success-green mx-auto mb-4" />
                <CardTitle>Quality Testing</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Comprehensive quality checks before shipment to ensure product excellence.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <CheckCircle className="h-12 w-12 text-success-green mx-auto mb-4" />
                <CardTitle>Documentation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Complete export documentation and certificates provided for all shipments.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-ocean-blue text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Need Custom Products or Bulk Orders?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Contact us for customized solutions and competitive pricing for bulk orders.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" asChild>
              <Link to="/quote">
                Request Custom Quote
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary" asChild>
              <Link to="/contact">
                Speak to Expert
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;