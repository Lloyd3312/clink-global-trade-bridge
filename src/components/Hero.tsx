import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Shield, Truck, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import heroCollage1 from "@/assets/hero-products-collage-1.jpg";
import heroCollage2 from "@/assets/hero-products-collage-2.jpg";
import heroFashion from "@/assets/hero-fashion.jpg";
import fashionImage from "@/assets/fashion-accessories.jpg";
import ceramicsImage from "@/assets/ceramics-pop.jpg";
import solarPanelsImage from "@/assets/solar-panels.jpg";
import securityDoorsImage from "@/assets/security-doors.jpg";

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const backgroundImages = [
    heroCollage1,
    heroCollage2,
    heroFashion,
    fashionImage,
    ceramicsImage,
    solarPanelsImage,
    securityDoorsImage
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % backgroundImages.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  return (
    <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-center bg-gradient-to-br from-primary/5 via-background to-steel-gray/5">
      {/* Background Image Overlay with Rotation */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-transparent transition-all duration-1000"
        style={{
          backgroundImage: `url('${backgroundImages[currentImageIndex]}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Hero Content */}
          <div className="space-y-8">
            {/* Trust Badge */}
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-success-green/20 text-success-green border-success-green/30 backdrop-blur-sm drop-shadow-md">
                <CheckCircle className="h-3 w-3 mr-1" />
                Trusted Export Partner
              </Badge>
              <Badge variant="outline" className="bg-trust-blue/20 text-trust-blue border-trust-blue/30 backdrop-blur-sm drop-shadow-md">
                <Shield className="h-3 w-3 mr-1" />
                Quality Guaranteed
              </Badge>
            </div>

            {/* Main Heading */}
            <div className="space-y-4 md:space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] drop-shadow-lg font-display">
                <span className="text-foreground drop-shadow-md">From Türkiye,</span>{" "}
                <span className="text-primary drop-shadow-md italic">to your doorstep.</span>
                <span className="block text-foreground/90 text-2xl md:text-3xl lg:text-4xl mt-3 font-medium">
                  Premium goods. Verified suppliers. Worldwide delivery.
                </span>
              </h1>

              <p className="text-base md:text-lg text-muted-foreground max-w-2xl drop-shadow-md bg-background/40 backdrop-blur-sm rounded-xl p-4 border border-border/40">
                Whether you're sourcing steel, importing fashion, or investing in Turkish real estate — Clink Global is your trusted bridge.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Button variant="cta" size="lg" className="md:text-base" asChild>
                <Link to="/quote" className="flex items-center gap-2">
                  Request a Quote
                  <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
                </Link>
              </Button>
              <Button variant="cta-outline" size="lg" className="md:text-base" asChild>
                <Link to="/contact">
                  Contact & Quote
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border bg-background/30 backdrop-blur-sm rounded-lg p-6 drop-shadow-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary drop-shadow-md">250+</div>
                <div className="text-sm text-muted-foreground drop-shadow-sm">Shipments</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary drop-shadow-md">1M+</div>
                <div className="text-sm text-muted-foreground drop-shadow-sm">Tons Sourced</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary drop-shadow-md">99%</div>
                <div className="text-sm text-muted-foreground drop-shadow-sm">Client Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Hero Visual - Service Highlights */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              {/* Service Cards */}
              <div className="bg-card/90 backdrop-blur-md rounded-lg p-6 border border-border/50 hover:shadow-xl transition-all duration-300 drop-shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center drop-shadow-sm">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground drop-shadow-sm">Fast Response</h3>
                    <p className="text-sm text-muted-foreground drop-shadow-sm">Quick quotes within 24 hours</p>
                  </div>
                </div>
              </div>

              <div className="bg-card/90 backdrop-blur-md rounded-lg p-6 border border-border/50 hover:shadow-xl transition-all duration-300 drop-shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 bg-ocean-blue/10 rounded-lg flex items-center justify-center drop-shadow-sm">
                    <Truck className="h-6 w-6 text-ocean-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground drop-shadow-sm">Global Shipping</h3>
                    <p className="text-sm text-muted-foreground drop-shadow-sm">Worldwide logistics solutions</p>
                  </div>
                </div>
              </div>

              <div className="bg-card/90 backdrop-blur-md rounded-lg p-6 border border-border/50 hover:shadow-xl transition-all duration-300 drop-shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 bg-success-green/10 rounded-lg flex items-center justify-center drop-shadow-sm">
                    <CheckCircle className="h-6 w-6 text-success-green" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground drop-shadow-sm">Quality Sourcing</h3>
                    <p className="text-sm text-muted-foreground drop-shadow-sm">Verified Turkish suppliers</p>
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