import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle, MessageCircle, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import machineryImage from "@/assets/industrial-machinery.jpg";

const IndustrialMachinery = () => {
  const products = [
    "Manufacturing Equipment",
    "Construction Machinery",
    "Agricultural Machinery",
    "Textile Machinery",
    "Food Processing Equipment",
    "Packaging Machines",
    "Metalworking Tools",
    "Heavy Duty Equipment"
  ];

  const benefits = [
    "CE Certification",
    "Technical Documentation",
    "After-Sales Support",
    "Spare Parts Availability",
    "Installation Assistance",
    "Operator Training",
    "Warranty Coverage",
    "Global Shipping"
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
                  Advanced Machinery
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                  Turkish Industrial Machinery
                </h1>
                <p className="text-lg text-muted-foreground">
                  Advanced machinery and equipment from Turkish manufacturers. From heavy construction equipment to precision manufacturing tools, sourced from verified suppliers with international certifications.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="cta" size="lg" asChild>
                  <Link to="/quote" className="flex items-center gap-2">
                    Get Machinery Quote
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

            {/* Image */}
            <div className="relative">
              <img 
                src={machineryImage} 
                alt="Turkish Industrial Machinery" 
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
            {/* Available Products */}
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="text-2xl">Available Machinery</CardTitle>
                <CardDescription>
                  Professional industrial equipment for various industries
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
                <CardTitle className="text-2xl">Service Benefits</CardTitle>
                <CardDescription>
                  Complete support from purchase to operation
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
            Need Industrial Equipment?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Source advanced machinery from Turkish manufacturers with full technical support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" asChild>
              <Link to="/quote">
                Request Machinery Quote
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

export default IndustrialMachinery;