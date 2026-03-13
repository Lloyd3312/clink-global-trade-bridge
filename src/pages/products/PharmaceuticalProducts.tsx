import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle, MessageCircle, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import pharmaImage from "@/assets/pharmaceutical-products.jpg";

const PharmaceuticalProducts = () => {
  const products = [
    "Over-the-Counter Medicines",
    "Prescription Pharmaceuticals",
    "Vitamins & Supplements",
    "Medical Devices & Equipment",
    "Surgical Supplies",
    "Dermatological Products",
    "Veterinary Pharmaceuticals",
    "Herbal & Natural Remedies"
  ];

  const benefits = [
    "GMP Certified Manufacturing",
    "WHO Prequalified Products",
    "EU & FDA Compliance",
    "Cold Chain Logistics Support",
    "Batch Traceability",
    "Quality Control Testing",
    "Regulatory Documentation",
    "Competitive Export Pricing"
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-ocean-blue/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                  GMP Certified
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                  Turkish Pharmaceutical Products
                </h1>
                <p className="text-lg text-muted-foreground">
                  High-quality pharmaceutical products from GMP-certified Turkish manufacturers. 
                  Trusted medicines, supplements, and medical supplies for global markets.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="cta" size="lg" asChild>
                  <Link to="/quote" className="flex items-center gap-2">
                    Get Pharma Quote
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="cta-outline" size="lg" asChild>
                  <a href="https://wa.me/905395815283" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    WhatsApp Chat
                  </a>
                </Button>
              </div>
            </div>

            <div className="relative">
              <img 
                src={pharmaImage} 
                alt="Turkish Pharmaceutical Products" 
                className="rounded-lg shadow-xl w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="text-2xl">Pharmaceutical Products</CardTitle>
                <CardDescription>
                  Comprehensive range of medicines and medical supplies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-3">
                  {products.map((product, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30">
                      <CheckCircle className="h-5 w-5 text-success-green" />
                      <span className="text-foreground font-medium">{product}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="text-2xl">Quality & Compliance</CardTitle>
                <CardDescription>
                  Meeting the highest international pharmaceutical standards
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-primary rounded-full mt-2" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </div>
                  ))}
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
            Source Quality Pharmaceuticals from Turkey
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Get GMP-certified pharmaceutical products with full regulatory documentation and cold chain logistics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" asChild>
              <Link to="/quote">
                Request Pharma Quote
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary" asChild>
              <a href="tel:+905395815283" className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Call Now
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PharmaceuticalProducts;
