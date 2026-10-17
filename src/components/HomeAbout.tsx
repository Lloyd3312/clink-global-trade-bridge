import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import aboutImage from "@/assets/how-source-verify.jpg";

export default function HomeAbout() {
  return <section className="border-b border-border">
    <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-[1fr_1.2fr_.8fr]">
      <img src={aboutImage} alt="Professional sourcing and supplier consultation" loading="lazy" width={640} height={480} className="w-full h-64 md:h-full object-cover" />
      <div className="py-10 px-6 md:px-10">
        <p className="text-primary text-xs uppercase mb-4">About Clink Global</p>
        <h2 className="text-2xl md:text-3xl font-semibold leading-tight mb-4">Local knowledge.<br />Global opportunity.</h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-6">We connect international buyers with Turkish products, suppliers and property opportunities — with personal guidance throughout the process.</p>
        <Button variant="cta" asChild><Link to="/about">About Us</Link></Button>
      </div>
      <div className="px-6 py-10 lg:border-l border-border md:col-span-2 lg:col-span-1">
        <p className="text-primary text-xs uppercase mb-5">Our approach</p>
        <ul className="space-y-4 text-sm"><li className="border-b border-border pb-4">Supplier sourcing & verification</li><li className="border-b border-border pb-4">Clear quotations & follow-up</li><li>Coordinated export logistics</li></ul>
      </div>
    </div>
  </section>;
}