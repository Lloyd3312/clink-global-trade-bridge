import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bed, Bath, Maximize, MapPin, Home as HomeIcon, Loader2 } from "lucide-react";
import { useWebMCP } from "use-webmcp-tool";
import { runWebMCPTool } from "@/lib/webmcp-telemetry";

interface Property {
  id: string; reference_number: string; title: string; slug: string; description: string | null;
  listing_type: string; price: number | null; currency: string | null;
  city: string | null; country: string | null; location: string | null;
  bedrooms: number | null; bathrooms: number | null; area_sqm: number | null;
  cover_image: string | null; badge: string | null; category_id: string | null;
}
interface Category { id: string; name: string; slug: string }

export default function RealEstate() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState<string>("all");
  const [type, setType] = useState<string>("all");

  useEffect(() => {
    (async () => {
      const [{ data: cats }, { data: props }] = await Promise.all([
        supabase.from("categories").select("id,name,slug").eq("kind", "property").eq("is_visible", true).order("sort_order"),
        supabase.from("properties").select("*").eq("status", "published").order("created_at", { ascending: false }),
      ]);
      setCategories(cats ?? []);
      setProperties(props ?? []);
      setLoading(false);
    })();
  }, []);

  const filtered = properties.filter((p) => {
    if (cat !== "all" && p.category_id !== cat) return false;
    if (type !== "all" && p.listing_type !== type) return false;
    if (search && !`${p.title} ${p.city ?? ""} ${p.country ?? ""}`.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  function changeSearch(value: string) {
    if (typeof value !== "string") throw new Error("Search must be text.");
    setSearch(value);
  }

  useWebMCP({
    name: "read_visible_properties",
    description: "Read properties shown on this screen, respecting its search and filters.",
    annotations: { readOnlyHint: true, untrustedContentHint: true },
    execute: () => runWebMCPTool("read_visible_properties", () => loading ? "Properties are loading." : filtered.length === 0 ? "No properties match the current filters." : filtered.map((p) => `${p.id}: ${p.title} — ${p.city ?? "Türkiye"} — ${p.listing_type}`).join("\n")),
  });
  useWebMCP({
    name: "search_visible_properties",
    description: "Update the visible property search field; category and listing-type filters stay unchanged.",
    inputSchema: {
      type: "object",
      properties: { search: { type: "string", description: "Text to put in the search field; empty text clears search." } },
      required: ["search"],
      additionalProperties: false,
    },
    execute: ({ search }: { search: string }) => runWebMCPTool("search_visible_properties", () => {
      changeSearch(search);
      return "Property search updated.";
    }),
  });

  return (
    <div>
      <section className="bg-gradient-to-br from-primary/10 via-background to-ocean-blue/10 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Premium Real Estate in Türkiye</h1>
            <p className="text-lg text-muted-foreground">Apartments, villas, commercial properties, land — explore properties with photos, videos, and immersive 360° tours.</p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-4 gap-3 mb-8">
          <Input placeholder="Search city, name…" value={search} onChange={(e) => changeSearch(e.target.value)} />
          <Select value={cat} onValueChange={setCat}>
            <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger><SelectValue placeholder="Listing type" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">For Sale & Rent</SelectItem>
              <SelectItem value="sale">For Sale</SelectItem>
              <SelectItem value="rent">For Rent</SelectItem>
              <SelectItem value="sold">Sold</SelectItem>
            </SelectContent>
          </Select>
          <Button asChild variant="cta"><Link to="/quote">Inquire about a Property</Link></Button>
        </div>

        {loading ? (
          <div className="text-center py-20"><Loader2 className="h-8 w-8 animate-spin mx-auto" /></div>
        ) : filtered.length === 0 ? (
          <Card><CardContent className="py-16 text-center text-muted-foreground">
            <HomeIcon className="h-12 w-12 mx-auto mb-3 opacity-40" />
            No properties match your search yet. Check back soon — verified sellers are listing daily.
          </CardContent></Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <Link key={p.id} to={`/real-estate/${p.slug}`}>
                <Card className="overflow-hidden hover:shadow-lg transition group h-full">
                  <div className="aspect-video bg-muted relative overflow-hidden">
                    {p.cover_image ? (
                      <img src={p.cover_image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
                    ) : <div className="w-full h-full flex items-center justify-center text-muted-foreground"><HomeIcon className="h-12 w-12" /></div>}
                    {p.badge && <Badge className="absolute top-3 left-3">{p.badge}</Badge>}
                    <Badge variant="secondary" className="absolute top-3 right-3 capitalize">{p.listing_type}</Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg line-clamp-1">{p.title}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1"><MapPin className="h-3 w-3" />{[p.city, p.country].filter(Boolean).join(", ") || p.location || "Türkiye"}</p>
                    {p.price && <p className="text-xl font-bold text-primary mt-2">{p.currency ?? "USD"} {Number(p.price).toLocaleString()}</p>}
                    <div className="flex gap-4 mt-3 text-sm text-muted-foreground">
                      {p.bedrooms != null && <span className="flex items-center gap-1"><Bed className="h-4 w-4" />{p.bedrooms}</span>}
                      {p.bathrooms != null && <span className="flex items-center gap-1"><Bath className="h-4 w-4" />{p.bathrooms}</span>}
                      {p.area_sqm != null && <span className="flex items-center gap-1"><Maximize className="h-4 w-4" />{p.area_sqm} m²</span>}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
