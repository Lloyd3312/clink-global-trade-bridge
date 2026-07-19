import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, ArrowRight } from "lucide-react";

const StudyIntro = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-[4/3] order-2 lg:order-1">
            <img
              src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1400&q=70"
              alt="International students at a Turkish university"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary mb-4">
              <GraduationCap className="h-4 w-4" />
              New service
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground font-display mb-4">
              Study in Türkiye with the Right Guidance
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Planning to study in Türkiye? Clink Global Trade Bridge provides
              free initial consultation to help international students identify
              suitable universities, affordable programmes, scholarship
              opportunities, and the correct application pathway. We can also
              support students throughout the admission, initial tuition-deposit,
              documentation, and visa-application preparation process.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="cta" size="lg" asChild>
                <Link to="/quote?service=university-consultation" className="inline-flex items-center gap-2">
                  Get Free Consultation <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="cta-outline" size="lg" asChild>
                <Link to="/study-in-turkiye">Explore Study Services</Link>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-5 leading-relaxed">
              Admission timelines, scholarships, visa decisions, and university
              offers remain subject to each institution's and authority's
              requirements. Clink Global does not guarantee admission,
              scholarships, or visa approval.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudyIntro;
