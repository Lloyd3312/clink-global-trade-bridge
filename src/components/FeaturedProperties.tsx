import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Bed, Bath, Maximize, MapPin, Building2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import propertyImage from "@/assets/istanbul-trade-hero.jpg";
import type { Tables } from "@/integrations/supabase/types";

const FeaturedProperties = () => {
  const [properties, setProperties] = useState<Tables<"properties">[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("properties")
        .select("*")
        .eq("status", "published")
        .order("created_at", { ascending: false })
        .limit(6);
      setProperties(data ?? []);
      setLoading(false);
    })();
  }, []);

  const formatPrice = (price: number | null, currency: string | null, listingType: string) => {
    if (!price) return "Price on request";
    const formatted = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "USD",
      maximumFractionDigits: 0,
    }).format(Number(price));
    return listingType === "rent" ? `${formatted}/mo` : formatted;
  };

  return (
    <section className="py-14 md:py-20 bg-secondary/20 border-t border-border">
      {/* Decorative ribbon */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">
              Real Estate
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-display">
              Properties for Sale & Rent
            </h2>
            <p className="text-lg text-muted-foreground">
              Verified listings from trusted owners — apartments, villas, commercial spaces and more.
            </p>
          </div>
          <Button variant="cta-outline" size="lg" asChild>
            <Link to="/real-estate" className="inline-flex items-center gap-2">
              View All Properties
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-96 rounded-md bg-muted animate-pulse" />
            ))}
          </div>
        ) : properties.length === 0 ? (
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <img src={propertyImage} alt="Modern waterfront architecture in Türkiye" loading="lazy" width={768} height={512} className="w-full aspect-[16/9] object-cover rounded-md" />
            <div><p className="text-primary text-xs uppercase mb-4">Property sourcing</p><h3 className="text-2xl font-semibold mb-4">Find your place in Türkiye.</h3><p className="text-muted-foreground text-sm leading-relaxed mb-6">Explore residential and commercial property opportunities. Contact our team to discuss your location, budget and requirements.</p><Button variant="cta" asChild><Link to="/real-estate">Explore Real Estate <ArrowRight /></Link></Button></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <Link
                key={property.id}
                to={`/real-estate/${property.slug}`}
                className="group relative overflow-hidden rounded-md bg-card border border-border/60 hover:border-primary/60 transition-all duration-500 hover:-translate-y-1"
              >
                <div className="relative h-56 overflow-hidden bg-muted">
                  {property.cover_image ? (
                    <img
                      src={property.cover_image}
                      alt={property.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                      <Building2 className="h-12 w-12" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />
                  <Badge className="absolute top-4 left-4 bg-background/90 text-foreground border-0 backdrop-blur-sm capitalize">
                    For {property.listing_type}
                  </Badge>
                  {property.badge && (
                    <Badge className="absolute top-4 right-4 bg-primary/90 text-primary-foreground border-0 backdrop-blur-sm">
                      {property.badge}
                    </Badge>
                  )}
                </div>

                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="text-xl font-bold text-foreground font-display leading-tight group-hover:text-primary transition-colors line-clamp-1">
                      {property.title}
                    </h3>
                    {(property.city || property.country) && (
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {[property.city, property.country].filter(Boolean).join(", ")}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    {property.bedrooms != null && (
                      <span className="flex items-center gap-1"><Bed className="h-4 w-4" /> {property.bedrooms}</span>
                    )}
                    {property.bathrooms != null && (
                      <span className="flex items-center gap-1"><Bath className="h-4 w-4" /> {property.bathrooms}</span>
                    )}
                    {property.area_sqm != null && (
                      <span className="flex items-center gap-1"><Maximize className="h-4 w-4" /> {property.area_sqm}m²</span>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-border/60">
                    <span className="text-lg font-bold text-primary font-display">
                      {formatPrice(property.price ? Number(property.price) : null, property.currency, property.listing_type)}
                    </span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProperties;
