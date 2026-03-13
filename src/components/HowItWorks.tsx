import { Card, CardContent } from "@/components/ui/card";
import { 
  MessageSquare, 
  Search, 
  Handshake, 
  Truck,
  ArrowRight 
} from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      number: "1",
      icon: MessageSquare,
      title: "Submit Request",
      description: "Tell us what products you need, quantities, specifications, and delivery destination.",
      color: "bg-primary"
    },
    {
      number: "2", 
      icon: Search,
      title: "We Source & Verify",
      description: "Our team identifies the best Turkish suppliers and verifies product quality and certifications.",
      color: "bg-ocean-blue"
    },
    {
      number: "3",
      icon: Handshake,
      title: "Negotiate & Confirm",
      description: "We negotiate the best prices and terms, then finalize contracts with transparent pricing.",
      color: "bg-success-green"
    },
    {
      number: "4",
      icon: Truck,
      title: "Logistics & Shipping",
      description: "We handle all export documentation, shipping arrangements, and track your goods to destination.",
      color: "bg-warning-orange"
    },
    {
      number: "5",
      icon: ArrowRight,
      title: "Delivery to Destination",
      description: "Your products arrive safely at your destination with full tracking and delivery confirmation.",
      color: "bg-deep-green"
    }
  ];

  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
            Our streamlined process for importing Turkish goods - from initial inquiry to delivery at your port
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="text-center h-full hover:shadow-lg transition-all duration-300 border-border/50 bg-gradient-to-br from-card to-card/80">
                <CardContent className="p-4 md:p-6">
                  {/* Step Number */}
                  <div className={`${step.color} text-white w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center text-lg md:text-xl font-bold mx-auto mb-4 shadow-lg`}>
                    {step.number}
                  </div>
                  
                  {/* Icon */}
                  <div className="h-12 w-12 md:h-14 md:w-14 bg-secondary rounded-lg flex items-center justify-center mx-auto mb-4 shadow-md">
                    <step.icon className="h-6 w-6 md:h-7 md:w-7 text-primary" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-base md:text-lg font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
              
              {/* Arrow between steps - hidden on mobile and last item */}
              {index < steps.length - 1 && (
                <div className="hidden lg:flex absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                  <div className="bg-white rounded-full p-2 shadow-md">
                    <ArrowRight className="h-4 w-4 text-primary" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-20 bg-gradient-to-r from-primary/5 to-ocean-blue/5 rounded-xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-2">
              Proven Track Record
            </h3>
            <p className="text-muted-foreground">
              Our streamlined process delivers results
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">250+</div>
              <div className="text-sm text-muted-foreground">Successful Shipments</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">1M+</div>
              <div className="text-sm text-muted-foreground">Tons Sourced</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">99%</div>
              <div className="text-sm text-muted-foreground">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;