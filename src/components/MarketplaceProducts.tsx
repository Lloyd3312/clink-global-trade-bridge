import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Package } from "lucide-react";
import SampleRequestDialog from "./SampleRequestDialog";

interface Product {
  id: string;
  title: string;
  description: string | null;
  cover_image: string | null;
  badge: string | null;
  features: string[] | null;
  price_min: number | null;
  price_max: number | null;
  category: { name: string; slug: string } | null;
}

export default function MarketplaceProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("products")
      .select("id,title,description,cover_image,badge,features,price_min,price_max,category:categories(name,slug)")
      .eq("status", "published")
      .order("created_at", { ascending: false })
      .limit(24)
      .then(({ data }) => {
        setProducts((data as any) ?? []);
        setLoading(false);
      });
  }, []);

  if (loading) return null;
  if (products.length === 0) return null;

  return (
    <section className="py-16 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <Badge variant="outline" className="mb-3">Marketplace</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Latest from Verified Sellers</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Fresh listings uploaded by our verified Turkish suppliers.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((p) => (
            <Card key={p.id} className="group overflow-hidden hover:shadow-lg transition-all border-border/40">
              <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                {p.cover_image ? (
                  <img src={p.cover_image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground"><Package className="h-10 w-10" /></div>
                )}
                {p.badge && <Badge className="absolute top-3 right-3">{p.badge}</Badge>}
              </div>
              <CardHeader className="pb-2">
                {p.category && <p className="text-xs text-primary font-medium uppercase tracking-wide">{p.category.name}</p>}
                <CardTitle className="text-lg leading-snug line-clamp-2">{p.title}</CardTitle>
                {p.description && <CardDescription className="line-clamp-2">{p.description}</CardDescription>}
              </CardHeader>
              <CardContent className="pt-0">
                {(p.price_min || p.price_max) && (
                  <p className="text-sm font-semibold text-foreground mb-3">
                    {p.price_min && `$${p.price_min}`}{p.price_min && p.price_max && " – "}{p.price_max && `$${p.price_max}`}
                  </p>
                )}
                <div className="flex gap-2">
                  <SampleRequestDialog productId={p.id} productTitle={p.title} trigger={
                    <Button variant="outline" size="sm" className="flex-1"><Package className="h-3 w-3 mr-1" />Sample</Button>
                  } />
                  <Button size="sm" className="flex-1" asChild>
                    <Link to="/quote">Quote<ArrowRight className="h-3 w-3 ml-1" /></Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
