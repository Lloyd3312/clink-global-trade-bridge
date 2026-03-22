import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle, MessageCircle, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import fashionImage from "@/assets/fashion-accessories.jpg";

const FashionAccessories = () => {
  const products = [
    "Designer Leather Bags",
    "Men's & Women's Shoes",
    "Luxury Clutch Purses",
    "Designer Sunglasses",
    "Premium Wristwatches",
    "Woven Hand Bands & Bracelets",
    "Stylish Hats & Caps",
    "Cloth Materials & Textiles",
    "Customized T-Shirts & Apparel"
  ];

  const benefits = [
    "Premium Turkish Craftsmanship",
    "Men's & Women's Collections",
    "Custom Branding Available",
    "Bulk Order Discounts",
    "Genuine Leather Products",
    "Trendy & Classic Designs",
    "White Label Options",
    "Quality Certified Materials"
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/5 via-background to-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                <CheckCircle className="h-3 w-3 mr-1" />
                Premium Turkish Fashion
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                Fashion & Accessories
              </h1>
              <p className="text-lg text-muted-foreground">
                Discover premium Turkish fashion for men and women — from luxury leather bags and designer shoes to 
                custom T-shirts and stylish accessories. Sourced from Turkey's finest fashion manufacturers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="cta" size="lg" asChild>
                  <Link to="/quote" className="inline-flex items-center gap-2">
                    Request Fashion Quote
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="cta-outline" size="lg" asChild>
                  <Link to="/contact">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Contact Us
                  </Link>
                </Button>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img src={fashionImage} alt="Premium Turkish fashion accessories including bags, shoes, watches, and sunglasses" className="w-full h-80 object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Available Products</h2>
              <div className="grid grid-cols-1 gap-3">
                {products.map((product, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
                    <CheckCircle className="h-5 w-5 text-success-green flex-shrink-0" />
                    <span className="text-foreground">{product}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Why Choose Our Fashion</h2>
              <div className="grid grid-cols-1 gap-3">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-accent/50 hover:bg-accent transition-colors">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-dark text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Source Turkish Fashion?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Whether you need bulk orders for retail or custom-branded fashion items, we connect you with Turkey's best manufacturers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" asChild>
              <Link to="/quote">Request Custom Quote</Link>
            </Button>
            <Button variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
              <Link to="/contact">
                <Phone className="h-4 w-4 mr-2" />
                Speak to Expert
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FashionAccessories;
