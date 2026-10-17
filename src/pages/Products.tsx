import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProductsSection from "@/components/ProductsSection";
import MarketplaceProducts from "@/components/MarketplaceProducts";

export default function Products() {
  return <div>
    <section className="border-b border-border bg-secondary/40 py-14 md:py-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <p className="text-xs text-primary uppercase mb-4">Sourced in Türkiye</p>
        <h1 className="text-4xl md:text-5xl font-semibold mb-5">Products for your next opportunity.</h1>
        <p className="text-muted-foreground max-w-2xl leading-relaxed mb-7">Explore our export categories, from construction materials and machinery to fashion and private-label collections. Tell us what you need — we’ll help you source it.</p>
        <Button variant="cta" asChild><Link to="/quote">Request a Product Quote</Link></Button>
      </div>
    </section>
    <ProductsSection full />
    <MarketplaceProducts />
    <section className="border-y border-border bg-secondary/30 py-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid md:grid-cols-3 gap-8">
        {[['Supplier Verification','Manufacturer sourcing and supporting documentation.'],['Quality Coordination','Product specifications and checks before shipment.'],['Export Support','Quotations, documentation and shipping coordination.']].map(([title,copy]) => <div key={title}><h2 className="text-lg font-semibold mb-3">{title}</h2><p className="text-sm text-muted-foreground leading-relaxed">{copy}</p></div>)}
      </div>
    </section>
    <section className="py-14"><div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"><div><h2 className="text-2xl font-semibold mb-3">Looking for something specific?</h2><p className="text-muted-foreground">Custom products, branding and bulk orders — let’s discuss your requirements.</p></div><Button variant="cta" asChild><Link to="/quote">Request a Custom Quote</Link></Button></div></section>
  </div>;
}
