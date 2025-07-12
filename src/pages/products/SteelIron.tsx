import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle, MessageCircle, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import steelIronImage from "@/assets/steel-iron.jpg";

const SteelIron = () => {
  const products = [
    "Structural Steel Beams",
    "Steel Sheets & Plates", 
    "Steel Pipes & Tubes",
    "Reinforcement Bars",
    "Galvanized Steel Products",
    "Steel Wire & Mesh",
    "Angle Bars & Channels",
    "Round & Square Bars"
  ];

  const benefits = [
    "Construction Grade Quality",
    "Various Steel Grades Available", 
    "Custom Cutting Services",
    "International Standards Compliance",
    "Competitive Pricing",
    "Fast Delivery Times",
    "Quality Certificates Included",
    "24/7 Customer Support"
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-steel-gray/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                  Premium Quality Steel
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                  Turkish Steel & Iron Products
                </h1>
                <p className="text-lg text-muted-foreground">
                  High-grade steel bars, sheets, pipes, and structural steel products from leading Turkish mills. 
                  Trusted by construction companies and industrial manufacturers worldwide.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="cta" size="lg" asChild>
                  <Link to="/quote" className="flex items-center gap-2">
                    Get Steel Quote
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

            {/* Image Gallery */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="/lovable-uploads/9d5cceed-00f6-4c42-8fee-e23702878296.png" 
                  alt="Turkish Steel Coils" 
                  className="rounded-lg shadow-xl w-full h-[190px] object-cover"
                />
                <img 
                  src="/lovable-uploads/704c3595-cd19-4f18-8619-f61f51d232c3.png" 
                  alt="Turkish Steel Bars and Rods" 
                  className="rounded-lg shadow-xl w-full h-[190px] object-cover"
                />
                <img 
                  src="/lovable-uploads/d98b2527-c629-4dea-a14a-73d94344a8ad.png" 
                  alt="Turkish Steel Pipes" 
                  className="rounded-lg shadow-xl w-full h-[190px] object-cover"
                />
                <img 
                  src="/lovable-uploads/d631cef6-e297-4184-9668-d02b49daf9f5.png" 
                  alt="Turkish Steel Sheets and Plates" 
                  className="rounded-lg shadow-xl w-full h-[190px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Available Products */}
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="text-2xl">Available Steel Products</CardTitle>
                <CardDescription>
                  Wide range of steel and iron products for various applications
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

            {/* Benefits */}
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="text-2xl">Why Choose Our Steel</CardTitle>
                <CardDescription>
                  Quality assurance and professional service guaranteed
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
            Ready to Source Turkish Steel?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Get competitive quotes for bulk steel orders with fast delivery worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" asChild>
              <Link to="/quote">
                Request Steel Quote
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

export default SteelIron;