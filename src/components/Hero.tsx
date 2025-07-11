import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Shield, Truck, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center bg-gradient-to-br from-primary/5 via-background to-ocean-blue/5">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-transparent"
        style={{
          backgroundImage: "url('/lovable-uploads/bf677d37-467e-40a8-9074-58b9ac0be463.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="space-y-8">
            {/* Trust Badge */}
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-success-green/10 text-success-green border-success-green/20">
                <CheckCircle className="h-3 w-3 mr-1" />
                Trusted Export Partner
              </Badge>
              <Badge variant="outline" className="bg-trust-blue/10 text-trust-blue border-trust-blue/20">
                <Shield className="h-3 w-3 mr-1" />
                Quality Guaranteed
              </Badge>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Your Reliable
                <span className="text-primary block">Turkish Export Partner</span>
                <span className="text-steel-gray">for Steel, Machinery, Fabrics & More</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
                Connecting international buyers with the finest Turkish products. 
                From steel and industrial machinery to furniture and fabrics - 
                we source, verify, and deliver quality goods worldwide.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="cta" size="xl" asChild>
                <Link to="/quote" className="flex items-center gap-2">
                  Request a Quote
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="cta-outline" size="xl" asChild>
                <Link to="/contact">
                  Contact & Quote
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">250+</div>
                <div className="text-sm text-muted-foreground">Shipments</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">1M+</div>
                <div className="text-sm text-muted-foreground">Tons Sourced</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">99%</div>
                <div className="text-sm text-muted-foreground">Client Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Hero Visual - Service Highlights */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              {/* Service Cards */}
              <div className="bg-card/80 backdrop-blur-sm rounded-lg p-6 border border-border/50 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Fast Response</h3>
                    <p className="text-sm text-muted-foreground">Quick quotes within 24 hours</p>
                  </div>
                </div>
              </div>

              <div className="bg-card/80 backdrop-blur-sm rounded-lg p-6 border border-border/50 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 bg-ocean-blue/10 rounded-lg flex items-center justify-center">
                    <Truck className="h-6 w-6 text-ocean-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Global Shipping</h3>
                    <p className="text-sm text-muted-foreground">Worldwide logistics solutions</p>
                  </div>
                </div>
              </div>

              <div className="bg-card/80 backdrop-blur-sm rounded-lg p-6 border border-border/50 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 bg-success-green/10 rounded-lg flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-success-green" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Quality Sourcing</h3>
                    <p className="text-sm text-muted-foreground">Verified Turkish suppliers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;