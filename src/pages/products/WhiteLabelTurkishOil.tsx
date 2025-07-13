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
  Droplets,
  Leaf,
  Target
} from "lucide-react";
import { Link } from "react-router-dom";
import oilImage from "@/assets/white-label-turkish-oil.jpg";

const WhiteLabelTurkishOil = () => {
  const features = [
    "Premium Turkish olive oil",
    "Cold-pressed extraction methods",
    "Organic and natural options",
    "Custom blending available",
    "Private label packaging",
    "International quality certifications"
  ];

  const specifications = [
    { label: "Oil Types", value: "Olive, Argan, Sunflower, Hazelnut, Essential" },
    { label: "Extraction", value: "Cold-pressed, First pressing" },
    { label: "Acidity Level", value: "0.2% - 0.8% (Extra Virgin)" },
    { label: "Packaging", value: "250ml - 5L bottles, custom sizes" },
    { label: "Minimum Order", value: "500L per type" },
    { label: "Shelf Life", value: "18-24 months" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-ocean-blue/5">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">
                <Leaf className="h-4 w-4 mr-2" />
                White Label Products
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Premium White Label Turkish Oil
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Finest Turkish oils with your custom branding. From extra virgin olive oil to specialty 
                essential oils, we provide premium quality oils ready for your market.
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
                  <span>Premium Quality</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-success-green" />
                  <span>Organic Certified</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <img 
                src={oilImage} 
                alt="Premium White Label Turkish Oil" 
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
              Why Choose Our White Label Turkish Oil?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Authentic Turkish oils from the finest sources with complete customization for your brand
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
                Our oil production facilities use traditional methods combined with modern 
                technology to ensure the highest quality and purity standards.
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
                  <Droplets className="h-5 w-5 text-primary" />
                  Oil Categories
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Olive Oil</h4>
                  <p className="text-sm text-muted-foreground">Extra virgin, virgin, and refined olive oil from Turkish groves</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Specialty Oils</h4>
                  <p className="text-sm text-muted-foreground">Argan, hazelnut, sunflower, and other regional oils</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Essential Oils</h4>
                  <p className="text-sm text-muted-foreground">Rose, lavender, pine, and other aromatic essential oils</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Custom Blends</h4>
                  <p className="text-sm text-muted-foreground">Unique oil blends created to your specifications</p>
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
            Launch Your Premium Oil Brand
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Turkish oil excellence with your custom branding. Pure, natural, and ready for global markets.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" asChild>
              <Link to="/quote">
                Request Oil Samples
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

export default WhiteLabelTurkishOil;