import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Globe, 
  Users, 
  Award, 
  Target,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const values = [
    {
      icon: Award,
      title: "Quality First",
      description: "We partner only with verified Turkish manufacturers who meet international quality standards."
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Our experienced team understands both Turkish manufacturing and global trade requirements."
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Serving clients worldwide with reliable shipping and logistics solutions."
    },
    {
      icon: Target,
      title: "Results Driven",
      description: "Committed to delivering on time, within budget, and exceeding expectations."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-ocean-blue/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              About Clink Global Services
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Connecting international buyers with the finest Turkish products
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-foreground">
                Your Trusted Export Partner
              </h2>
              <p className="text-muted-foreground text-lg">
                Clink Global Services is a trusted export brokerage company based in Turkey. 
                We specialize in sourcing and delivering top-quality Turkish goods to clients worldwide. 
                Our experienced team is dedicated to providing seamless, end-to-end solutions, 
                ensuring our clients find efficiency.
              </p>
              
              {/* Intro Video Section */}
              <div className="mt-8">
                <video 
                  autoPlay 
                  muted 
                  loop 
                  playsInline
                  className="w-full h-64 object-cover rounded-lg shadow-lg"
                >
                  <source src="/src/assets/clink-shipping-video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-success-green" />
                  <span className="text-foreground">Established export network in Turkey</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-success-green" />
                  <span className="text-foreground">Verified supplier partnerships</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-success-green" />
                  <span className="text-foreground">Global logistics expertise</span>
                </div>
              </div>
              <Button variant="cta" size="lg" asChild>
                <Link to="/contact" className="inline-flex items-center gap-2">
                  Start Working With Us
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>

            <div 
              className="rounded-lg h-96 bg-cover bg-center"
              style={{
                backgroundImage: "url('/lovable-uploads/b81098cd-482f-499f-b723-468ab7d7bef3.png')"
              }}
            />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Makes Us Different
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our commitment to excellence and deep understanding of Turkish manufacturing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="h-16 w-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Our Track Record
            </h2>
            <p className="text-muted-foreground">
              Numbers that speak to our success
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">250+</div>
              <div className="text-muted-foreground">Successful Shipments</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">1M+</div>
              <div className="text-muted-foreground">Tons Sourced</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">99%</div>
              <div className="text-muted-foreground">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Countries Served</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-ocean-blue text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Source Premium Turkish Products?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Let's discuss your requirements and find the perfect solutions for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" asChild>
              <Link to="/quote">
                Request a Quote
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary" asChild>
              <Link to="/contact">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;