import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Mail, 
  Phone, 
  MapPin, 
  MessageCircle,
  Clock,
  Globe
} from "lucide-react";

const Contact = () => {
  const contactMethods = [
    {
      icon: Phone,
      title: "Phone",
      description: "Speak directly with our export team",
      contact: "+905395815283",
      action: "tel:+905395815283",
      available: "Mon-Fri 9AM-6PM (Turkey Time)"
    },
    {
      icon: Mail,
      title: "Email",
      description: "Send us your detailed requirements",
      contact: "info@clinkglobal.com",
      action: "mailto:info@clinkglobal.com",
      available: "24/7 Response within 24 hours"
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      description: "Quick chat for instant responses",
      contact: "Chat with us on WhatsApp",
      action: "https://wa.me/905395815283",
      available: "Available for instant messaging"
    },
    {
      icon: MapPin,
      title: "Office",
      description: "Visit our export operations center",
      contact: "Istanbul, Turkey",
      action: "#",
      available: "Export Operations Hub"
    }
  ];

  const offices = [
    {
      city: "Istanbul",
      country: "Turkey",
      address: "Levent Business Center, Besiktas",
      description: "Main Export Operations"
    },
    {
      city: "Izmir",
      country: "Turkey", 
      address: "Alsancak Trade District",
      description: "Regional Sourcing Office"
    },
    {
      city: "Ankara",
      country: "Turkey",
      address: "Government Relations Office",
      description: "Compliance & Documentation"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-ocean-blue/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Ready to source premium Turkish products? Get in touch with our expert team 
            for personalized service and competitive quotes.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Get In Touch
            </h2>
            <p className="text-lg text-muted-foreground">
              Choose your preferred way to contact our team
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 group">
                <CardHeader>
                  <div className="h-16 w-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <method.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{method.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm">{method.description}</p>
                  <div className="font-semibold text-primary">{method.contact}</div>
                  <p className="text-xs text-muted-foreground">{method.available}</p>
                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    asChild
                  >
                    <a 
                      href={method.action}
                      target={method.title === "WhatsApp" ? "_blank" : undefined}
                      rel={method.title === "WhatsApp" ? "noopener noreferrer" : undefined}
                    >
                      Contact via {method.title}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Our Locations
            </h2>
            <p className="text-lg text-muted-foreground">
              Strategically located across Turkey for optimal sourcing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {offices.map((office, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <Globe className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle className="text-xl">{office.city}</CardTitle>
                  <p className="text-muted-foreground">{office.country}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground font-medium mb-2">{office.address}</p>
                  <p className="text-sm text-muted-foreground">{office.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Business Hours */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader className="text-center">
              <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle className="text-2xl">Business Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-foreground mb-4">Turkey Offices</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Monday - Friday:</span>
                      <span className="font-medium">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Saturday:</span>
                      <span className="font-medium">9:00 AM - 2:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sunday:</span>
                      <span className="font-medium">Closed</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Turkey Time (GMT+3)</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-foreground mb-4">Email Support</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Response Time:</span>
                      <span className="font-medium">Within 24 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Urgent Inquiries:</span>
                      <span className="font-medium">Within 4 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Availability:</span>
                      <span className="font-medium">24/7</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Check email regularly</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-20 bg-gradient-to-r from-primary to-ocean-blue text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            For the fastest response, request a quote or call us directly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" asChild>
              <a href="/quote">
                Request Quote
              </a>
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary" asChild>
              <a href="tel:+905395815283">
                Call Now: +905395815283
              </a>
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary" asChild>
              <a 
                href="https://wa.me/905395815283" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                WhatsApp Chat
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;