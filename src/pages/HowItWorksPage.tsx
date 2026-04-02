import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight,
  Clock,
  Shield,
  Globe,
  CheckCircle
} from "lucide-react";
import { Link } from "react-router-dom";
import howSubmitRequest from "@/assets/how-submit-request.jpg";
import howSourceVerify from "@/assets/how-source-verify.jpg";
import howNegotiate from "@/assets/how-negotiate.jpg";
import howLogistics from "@/assets/how-logistics.jpg";
import valueQuality from "@/assets/value-quality.jpg";
import valueTeam from "@/assets/value-team.jpg";
import valueGlobal from "@/assets/value-global.jpg";

const HowItWorksPage = () => {
  const detailedSteps = [
    {
      number: "1",
      image: howSubmitRequest,
      title: "Share Your Requirements",
      description: "Tell us exactly what you need and we'll guide you through the process",
      details: [
        "Product specifications and quantities",
        "Quality standards and certifications needed",
        "Delivery timeline and destination",
        "Budget considerations"
      ],
      timeline: "Day 1"
    },
    {
      number: "2", 
      icon: Search,
      title: "Sourcing & Verification",
      description: "We identify the best suppliers and verify their credentials",
      details: [
        "Identify qualified Turkish manufacturers",
        "Verify certifications and quality standards",
        "Request samples and technical documentation",
        "Compare pricing and capabilities"
      ],
      timeline: "Days 2-5"
    },
    {
      number: "3",
      icon: Handshake,
      title: "Negotiation & Finalization",
      description: "We secure the best terms and finalize all agreements",
      details: [
        "Negotiate competitive pricing",
        "Finalize technical specifications",
        "Agree on delivery terms and schedules",
        "Secure contracts and payment terms"
      ],
      timeline: "Days 6-8"
    },
    {
      number: "4",
      icon: Truck,
      title: "Logistics & Delivery",
      description: "We handle all shipping and ensure safe delivery to your destination",
      details: [
        "Arrange export documentation",
        "Coordinate shipping and logistics",
        "Track shipment progress",
        "Ensure customs clearance"
      ],
      timeline: "Days 9-30"
    }
  ];

  const benefits = [
    {
      icon: Clock,
      title: "Time Efficient",
      description: "Save weeks of research and verification with our established network"
    },
    {
      icon: Shield,
      title: "Risk Mitigation",
      description: "Verified suppliers and quality checks reduce your business risks"
    },
    {
      icon: Globe,
      title: "Global Expertise",
      description: "Handle international trade complexities with experienced professionals"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-ocean-blue/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            How It Works
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Our proven 4-step process makes importing Turkish goods simple, 
            efficient, and risk-free for your business.
          </p>
          <Badge variant="outline" className="bg-success-green/10 text-success-green border-success-green/20 text-base px-4 py-2">
            <CheckCircle className="h-4 w-4 mr-2" />
            99% Success Rate
          </Badge>
        </div>
      </section>

      {/* Detailed Process Steps */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {detailedSteps.map((step, index) => (
              <div key={index} className="grid lg:grid-cols-2 gap-12 items-center">
                <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <Card className="h-full">
                    <CardHeader>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">
                          {step.number}
                        </div>
                        <div>
                          <Badge variant="outline" className="mb-2">{step.timeline}</Badge>
                          <CardTitle className="text-2xl">{step.title}</CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-lg mb-6">{step.description}</p>
                      <ul className="space-y-3">
                        {step.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-success-green mt-0.5 flex-shrink-0" />
                            <span className="text-foreground">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''} flex items-center justify-center`}>
                  <div className="h-64 w-64 bg-primary/10 rounded-full flex items-center justify-center">
                    <step.icon className="h-24 w-24 text-primary" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Process */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Our Process?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our streamlined approach saves you time, reduces risks, and ensures successful outcomes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="h-16 w-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Overview */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Typical Timeline
            </h2>
            <p className="text-lg text-muted-foreground">
              From inquiry to delivery at your destination
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20"></div>
            
            <div className="space-y-12">
              {detailedSteps.map((step, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                    <Card className="inline-block max-w-sm">
                      <CardContent className="p-4">
                        <div className="font-semibold text-primary mb-1">{step.timeline}</div>
                        <div className="font-medium text-foreground">{step.title}</div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="w-4 h-4 bg-primary rounded-full relative z-10"></div>
                  
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-ocean-blue text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Import Journey?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Let's begin with step 1 - share your requirements and get a personalized quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" asChild>
              <Link to="/quote" className="inline-flex items-center gap-2">
                Start Process - Get Quote
                <ArrowRight className="h-5 w-5" />
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

export default HowItWorksPage;