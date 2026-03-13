import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  CheckCircle, 
  Star, 
  Award,
  MessageCircle,
  Phone,
  Home,
  Palette,
  Target
} from "lucide-react";
import { Link } from "react-router-dom";
import carpetsImage from "@/assets/white-label-carpets.jpg";

const WhiteLabelCarpets = () => {
  const features = [
    "Traditional Turkish craftsmanship",
    "Custom patterns and designs",
    "Premium wool and silk materials",
    "Machine and hand-woven options",
    "Private label packaging",
    "Various sizes and shapes available"
  ];

  const specifications = [
    { label: "Materials", value: "Wool, Silk, Cotton, Synthetic blends" },
    { label: "Knot Density", value: "80-1000 knots per sq inch" },
    { label: "Standard Sizes", value: "2x3ft to 12x18ft (custom available)" },
    { label: "Thickness", value: "8mm - 25mm" },
    { label: "Minimum Order", value: "20 pieces per design" },
    { label: "Production Time", value: "30-90 days" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-ocean-blue/5">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">
                <Home className="h-4 w-4 mr-2" />
                White Label Products
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Luxury White Label Carpets
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Exquisite Turkish carpets and rugs with your custom branding. From traditional 
                handwoven masterpieces to modern machine-made designs, all ready for your market.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button variant="cta" size="lg" asChild>
                  <Link to="/quote">
                    <Target className="h-5 w-5 mr-2" />
                    Get Custom Quote
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a 
                    href="https://wa.me/905395815283" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="h-5 w-5 mr-2" />
                    WhatsApp Us
                  </a>
                </Button>
              </div>

              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-warning-yellow" />
                  <span>Handcrafted Quality</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-success-green" />
                  <span>Traditional Craftsmanship</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <img 
                src={carpetsImage} 
                alt="Luxury White Label Carpets" 
                className="rounded-lg shadow-xl w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Why Choose Our White Label Carpets?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Authentic Turkish carpets with centuries-old traditions, customized for your brand
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 p-4 rounded-lg bg-secondary/30">
                <CheckCircle className="h-5 w-5 text-success-green flex-shrink-0" />
                <span className="text-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Product Specifications
              </h2>
              <p className="text-muted-foreground mb-8">
                Our carpet collection combines traditional Turkish weaving techniques with 
                modern quality standards, perfect for luxury retailers and interior designers.
              </p>
              
              <div className="space-y-4">
                {specifications.map((spec, index) => (
                  <div key={index} className="flex justify-between py-3 border-b border-border">
                    <span className="font-medium text-foreground">{spec.label}:</span>
                    <span className="text-muted-foreground">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5 text-primary" />
                  Design Options
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Traditional Patterns</h4>
                  <p className="text-sm text-muted-foreground">Persian, Ottoman, Anatolian, and modern geometric designs</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Custom Designs</h4>
                  <p className="text-sm text-muted-foreground">Create unique patterns based on your brand requirements</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Color Schemes</h4>
                  <p className="text-sm text-muted-foreground">Traditional and contemporary color palettes available</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Branding</h4>
                  <p className="text-sm text-muted-foreground">Custom labels, certificates, and packaging solutions</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-ocean-blue text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Start Your Luxury Carpet Collection
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Premium Turkish carpets with your branding. Traditional craftsmanship meets modern business needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" asChild>
              <Link to="/quote">
                Request Catalog & Quote
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary" asChild>
              <a href="tel:+905395815283">
                <Phone className="h-5 w-5 mr-2" />
                Call Now: +90 539 581 5283
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhiteLabelCarpets;