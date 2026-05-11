import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bed, Bath, Maximize, MapPin, Loader2, Check } from "lucide-react";
import PanoramaViewer from "@/components/PanoramaViewer";

interface Media { id: string; url: string; media_type: string; caption: string | null }
interface Property {
  id: string; reference_number: string; title: string; description: string | null;
  listing_type: string; price: number | null; currency: string | null;
  city: string | null; country: string | null; location: string | null;
  bedrooms: number | null; bathrooms: number | null; area_sqm: number | null;
  cover_image: string | null; amenities: string[] | null;
}

export default function PropertyDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | null>(null);
  const [media, setMedia] = useState<Media[]>([]);
  const [active, setActive] = useState<Media | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data: prop } = await supabase.from("properties").select("*").eq("slug", slug!).maybeSingle();
      if (!prop) { setLoading(false); return; }
      setProperty(prop as any);
      const { data: m } = await supabase.from("property_media").select("*").eq("property_id", prop.id).order("sort_order");
      setMedia(m ?? []);
      const images = (m ?? []).filter((x) => x.media_type === "image");
      setActive(images[0] ?? m?.[0] ?? null);
      setLoading(false);
    })();
  }, [slug]);

  if (loading) return <div className="p-20 text-center"><Loader2 className="h-8 w-8 animate-spin mx-auto" /></div>;
  if (!property) return <div className="p-20 text-center"><p>Property not found.</p><Button className="mt-4" asChild><Link to="/real-estate">Back to Real Estate</Link></Button></div>;

  const images = media.filter((m) => m.media_type === "image");
  const videos = media.filter((m) => m.media_type === "video");
  const panoramas = media.filter((m) => m.media_type === "panorama");
  const vrEmbeds = media.filter((m) => m.media_type === "vr_embed");

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <Link to="/real-estate" className="text-sm text-muted-foreground hover:text-primary">← Back to listings</Link>

      <div className="grid lg:grid-cols-3 gap-8 mt-4">
        <div className="lg:col-span-2 space-y-4">
          {/* Main viewer */}
          <div className="aspect-video bg-muted rounded-lg overflow-hidden">
            {active?.media_type === "image" && <img src={active.url} alt={property.title} className="w-full h-full object-cover" />}
            {active?.media_type === "video" && <video src={active.url} controls className="w-full h-full object-cover" />}
            {!active && property.cover_image && <img src={property.cover_image} alt={property.title} className="w-full h-full object-cover" />}
          </div>
          {images.length > 0 && (
            <div className="flex gap-2 overflow-x-auto">
              {[...images, ...videos].map((m) => (
                <button key={m.id} onClick={() => setActive(m)} className={`flex-shrink-0 w-24 h-20 rounded overflow-hidden border-2 ${active?.id === m.id ? "border-primary" : "border-transparent"}`}>
                  {m.media_type === "image" ? <img src={m.url} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full bg-black flex items-center justify-center text-white text-xs">▶ Video</div>}
                </button>
              ))}
            </div>
          )}

          {(panoramas.length > 0 || vrEmbeds.length > 0) && (
            <Tabs defaultValue={panoramas.length ? "pano" : "vr"} className="mt-6">
              <TabsList>
                {panoramas.length > 0 && <TabsTrigger value="pano">360° Tour</TabsTrigger>}
                {vrEmbeds.length > 0 && <TabsTrigger value="vr">Virtual Tour</TabsTrigger>}
              </TabsList>
              {panoramas.length > 0 && (
                <TabsContent value="pano" className="space-y-3">
                  {panoramas.map((p) => <div key={p.id}><PanoramaViewer src={p.url} />{p.caption && <p className="text-sm text-muted-foreground mt-1">{p.caption}</p>}</div>)}
                </TabsContent>
              )}
              {vrEmbeds.length > 0 && (
                <TabsContent value="vr" className="space-y-3">
                  {vrEmbeds.map((v) => (
                    <div key={v.id} className="aspect-video rounded-lg overflow-hidden bg-muted">
                      <iframe src={v.url} className="w-full h-full" allowFullScreen allow="xr-spatial-tracking; gyroscope; accelerometer" />
                    </div>
                  ))}
                </TabsContent>
              )}
            </Tabs>
          )}

          <Card><CardContent className="p-6 space-y-3">
            <h2 className="text-xl font-bold">About this property</h2>
            <p className="text-muted-foreground whitespace-pre-line">{property.description || "Contact us for full details."}</p>
            {property.amenities && property.amenities.length > 0 && (
              <div className="pt-3">
                <h3 className="font-semibold mb-2">Amenities</h3>
                <div className="grid grid-cols-2 gap-2">
                  {property.amenities.map((a) => <div key={a} className="flex items-center gap-2 text-sm"><Check className="h-4 w-4 text-success-green" />{a}</div>)}
                </div>
              </div>
            )}
          </CardContent></Card>
        </div>

        <div className="space-y-4">
          <Card><CardContent className="p-6 space-y-3">
            <Badge variant="secondary" className="capitalize">For {property.listing_type}</Badge>
            <h1 className="text-2xl font-bold">{property.title}</h1>
            <p className="text-sm text-muted-foreground flex items-center gap-1"><MapPin className="h-4 w-4" />{[property.city, property.country].filter(Boolean).join(", ") || property.location}</p>
            {property.price && <p className="text-3xl font-bold text-primary">{property.currency ?? "USD"} {Number(property.price).toLocaleString()}</p>}
            <div className="flex gap-4 pt-2 text-sm">
              {property.bedrooms != null && <span className="flex items-center gap-1"><Bed className="h-4 w-4" />{property.bedrooms} beds</span>}
              {property.bathrooms != null && <span className="flex items-center gap-1"><Bath className="h-4 w-4" />{property.bathrooms} baths</span>}
              {property.area_sqm != null && <span className="flex items-center gap-1"><Maximize className="h-4 w-4" />{property.area_sqm} m²</span>}
            </div>
            <p className="text-xs text-muted-foreground">Ref: {property.reference_number}</p>
            <Button variant="cta" className="w-full" onClick={() => navigate(`/quote?property=${encodeURIComponent(property.title)}&ref=${property.reference_number}`)}>
              Inquire / Request Quote
            </Button>
            <Button variant="outline" className="w-full" asChild><a href="https://wa.me/905395815283" target="_blank" rel="noreferrer">WhatsApp Us</a></Button>
          </CardContent></Card>
        </div>
      </div>
    </div>
  );
}
