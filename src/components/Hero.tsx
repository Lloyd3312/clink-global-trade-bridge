import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/istanbul-trade-hero.jpg";

export default function Hero() {
  return (
    <section className="relative bg-hero-surface text-hero-ink overflow-hidden">
      <img src={heroImage} alt="Contemporary waterfront architecture in Istanbul at dusk" width={1536} height={1024} className="absolute inset-0 h-full w-full object-cover object-right" />
      <div className="absolute inset-0 hero-shade" />
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="max-w-xl border-l-2 border-primary pl-5 md:pl-8">
          <p className="text-xs text-primary font-semibold mb-5 uppercase">Türkiye. Connected to the world.</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl leading-[1.12] font-semibold mb-6">Clink Global<br /><span className="text-primary">Trade & Property</span></h1>
          <p className="text-lg text-hero-ink mb-3">Premium Turkish goods.<br />Trusted local connections.</p>
          <p className="text-sm md:text-base text-hero-muted leading-relaxed max-w-md mb-8">From sourcing the right products to exploring Turkish real estate — a clear path from your first enquiry to your next opportunity.</p>
          <div className="flex flex-wrap gap-3">
            <Button variant="cta" size="lg" asChild><Link to="/products">Explore Products <ArrowRight /></Link></Button>
            <Button variant="outline" size="lg" className="bg-transparent text-hero-ink border-hero-ink/40" asChild><Link to="/quote">Request a Quote</Link></Button>
          </div>
        </div>
      </div>
      <div className="relative border-t border-hero-ink/15 bg-hero-surface/90">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 px-6 sm:px-8 lg:px-12">
          {[
            ["01", "Product Sourcing", "Turkish manufacturers & goods", "/products"],
            ["02", "Private Label", "Products tailored to your brand", "/products/white-label-cosmetics"],
            ["03", "Real Estate", "Properties for sale & rent", "/real-estate"],
            ["04", "Export Coordination", "From enquiry to delivery", "/how-it-works"],
          ].map(([n,title,detail,path]) => <Link key={n} to={path} className="py-6 md:py-8 pr-4 md:pl-6 border-r border-hero-ink/15 last:border-r-0 group"><span className="text-primary text-xs">{n}</span><h2 className="text-sm md:text-base font-semibold mt-2 group-hover:text-primary">{title}</h2><p className="text-xs text-hero-muted mt-2 leading-relaxed">{detail}</p></Link>)}
        </div>
      </div>
    </section>
  );
}
