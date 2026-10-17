import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { productCatalog } from "@/lib/product-catalog";

export default function ProductsSection({ full = false }: { full?: boolean }) {
  const products = full ? productCatalog : productCatalog.slice(0, 9);
  return <section className="py-14 md:py-20 bg-background">
    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-9">
        <div><p className="text-xs text-primary uppercase mb-3">Our catalogue</p><h2 className="text-3xl md:text-4xl font-semibold">Premium Turkish Products</h2></div>
        {!full && <Button variant="ghost" className="text-primary justify-start" asChild><Link to="/products">All categories <ArrowRight /></Link></Button>}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {products.map((product) => <Link key={product.slug} to={`/products/${product.slug}`} className="group border border-border rounded-md overflow-hidden bg-card transition-colors hover:border-primary/60">
          <div className="aspect-[16/10] overflow-hidden bg-muted"><img src={product.image} alt={product.title} width={640} height={400} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" /></div>
          <div className="p-5"><div className="flex items-start justify-between gap-3"><h3 className="text-lg font-semibold group-hover:text-primary">{product.title}</h3><ArrowRight className="w-4 h-4 text-primary shrink-0 mt-1" /></div><p className="text-sm text-muted-foreground leading-relaxed mt-2">{product.description}</p></div>
        </Link>)}
      </div>
    </div>
  </section>;
}
