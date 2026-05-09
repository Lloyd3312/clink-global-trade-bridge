import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Package, ArrowRight } from "lucide-react";
import SampleRequestDialog from "./SampleRequestDialog";

interface P {
  id: string;
  title: string;
  cover_image: string | null;
  badge: string | null;
  category: { name: string } | null;
}

const RelatedProducts = ({ excludeId, categoryId, title = "You may also like" }: { excludeId?: string; categoryId?: string | null; title?: string }) => {
  const [items, setItems] = useState<P[]>([]);

  useEffect(() => {
    let q = supabase
      .from("products")
      .select("id,title,cover_image,badge,category:categories(name)")
      .eq("status", "published")
      .limit(8);
    if (categoryId) q = q.eq("category_id", categoryId);
    q.then(({ data }) => {
      const list = ((data as any) ?? []).filter((p: P) => p.id !== excludeId).slice(0, 4);
      setItems(list);
    });
  }, [excludeId, categoryId]);

  if (items.length === 0) return null;

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-2xl font-bold mb-6">{title}</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((p) => (
            <Card key={p.id} className="overflow-hidden group hover:shadow-md transition">
              <div className="aspect-[4/3] bg-muted relative">
                {p.cover_image ? (
                  <img src={p.cover_image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" loading="lazy" />
                ) : (
                  <div className="flex items-center justify-center h-full"><Package className="h-8 w-8 text-muted-foreground" /></div>
                )}
                {p.badge && <Badge className="absolute top-2 right-2 text-xs">{p.badge}</Badge>}
              </div>
              <CardHeader className="pb-2">
                {p.category && <p className="text-xs text-primary uppercase tracking-wide">{p.category.name}</p>}
                <CardTitle className="text-sm leading-snug line-clamp-2">{p.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 flex flex-col gap-2">
                <SampleRequestDialog productId={p.id} productTitle={p.title} trigger={
                  <Button variant="outline" size="sm" className="w-full text-xs"><Package className="h-3 w-3 mr-1" />Sample</Button>
                } />
                <Button asChild size="sm" className="w-full text-xs"><Link to="/quote">Quote<ArrowRight className="h-3 w-3 ml-1" /></Link></Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;
