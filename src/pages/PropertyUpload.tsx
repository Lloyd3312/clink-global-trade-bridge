import { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Loader2, Upload, Trash2 } from "lucide-react";

interface Category { id: string; name: string; slug: string }
interface Property { id: string; title: string; status: string; cover_image: string | null; reference_number: string }

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80);

export default function PropertyUpload() {
  const { user, loading, isSeller, isAdmin } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [busy, setBusy] = useState(false);
  const [photos, setPhotos] = useState<File[]>([]);
  const [videos, setVideos] = useState<File[]>([]);
  const [panoramas, setPanoramas] = useState<File[]>([]);
  const [vrEmbedUrl, setVrEmbedUrl] = useState("");
  const [tourSteps, setTourSteps] = useState<{ file: File; caption: string }[]>([]);
  const [form, setForm] = useState({
    title: "", description: "", category_id: "", listing_type: "sale",
    price: "", currency: "USD", city: "", country: "Türkiye", location: "",
    bedrooms: "", bathrooms: "", area_sqm: "", amenities: "", badge: "", status: "published",
  });

  const reload = async () => {
    const { data: cats } = await supabase.from("categories").select("id,name,slug").eq("kind", "property").eq("is_visible", true).order("sort_order");
    setCategories(cats ?? []);
    const q = supabase.from("properties").select("id,title,status,cover_image,reference_number").order("created_at", { ascending: false });
    const { data: rows } = isAdmin ? await q : await q.eq("seller_id", user!.id);
    setProperties(rows ?? []);
  };
  useEffect(() => { if (user) reload(); /* eslint-disable-next-line */ }, [user, isAdmin]);

  if (loading) return <div className="p-12 text-center"><Loader2 className="h-6 w-6 animate-spin mx-auto" /></div>;
  if (!user) return <Navigate to="/auth" replace />;
  if (!isSeller) return (
    <div className="max-w-xl mx-auto p-8 text-center space-y-4">
      <h2 className="text-2xl font-bold">Seller access required</h2>
      <p className="text-muted-foreground">Apply to become a verified seller to upload properties.</p>
      <Button asChild variant="cta"><Link to="/seller/apply">Apply as Seller</Link></Button>
    </div>
  );

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      const slug = `${slugify(form.title)}-${Date.now().toString(36)}`;
      const { data: prop, error } = await supabase.from("properties").insert({
        title: form.title, slug, description: form.description,
        category_id: form.category_id || null, seller_id: user.id,
        listing_type: form.listing_type,
        price: form.price ? Number(form.price) : null, currency: form.currency,
        city: form.city || null, country: form.country || null, location: form.location || null,
        bedrooms: form.bedrooms ? Number(form.bedrooms) : null,
        bathrooms: form.bathrooms ? Number(form.bathrooms) : null,
        area_sqm: form.area_sqm ? Number(form.area_sqm) : null,
        amenities: form.amenities ? form.amenities.split(",").map((a) => a.trim()).filter(Boolean) : [],
        badge: form.badge || null, status: form.status,
      }).select().single();
      if (error) throw error;

      const mediaRows: any[] = [];
      let cover: string | null = null;
      let order = 0;
      const upload = async (file: File, type: string) => {
        const path = `${user.id}/${prop.id}/${Date.now()}-${order}-${file.name}`;
        const { error: up } = await supabase.storage.from("property-media").upload(path, file);
        if (up) { toast.error(up.message); return; }
        const { data: { publicUrl } } = supabase.storage.from("property-media").getPublicUrl(path);
        mediaRows.push({ property_id: prop.id, url: publicUrl, media_type: type, sort_order: order });
        if (type === "image" && !cover) cover = publicUrl;
        order++;
      };
      for (const f of photos) await upload(f, "image");
      for (const f of videos) await upload(f, "video");
      for (const f of panoramas) await upload(f, "panorama");
      if (vrEmbedUrl.trim()) mediaRows.push({ property_id: prop.id, url: vrEmbedUrl.trim(), media_type: "vr_embed", sort_order: order++ });

      if (mediaRows.length) await supabase.from("property_media").insert(mediaRows);
      if (cover) await supabase.from("properties").update({ cover_image: cover }).eq("id", prop.id);

      toast.success("Property published");
      setForm({ title: "", description: "", category_id: "", listing_type: "sale", price: "", currency: "USD", city: "", country: "Türkiye", location: "", bedrooms: "", bathrooms: "", area_sqm: "", amenities: "", badge: "", status: "published" });
      setPhotos([]); setVideos([]); setPanoramas([]); setVrEmbedUrl("");
      reload();
    } catch (err: any) {
      toast.error(err.message ?? "Failed");
    } finally { setBusy(false); }
  };

  const del = async (id: string) => {
    if (!confirm("Delete this property?")) return;
    const { error } = await supabase.from("properties").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted"); reload();
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Upload Property</h1>
        <p className="text-muted-foreground">{isAdmin ? "Admin" : "Seller"} — list a property with photos, videos & 360° tours</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader><CardTitle>New Property</CardTitle><CardDescription>Add media: regular photos, videos, 360° equirectangular panoramas, or paste a Matterport/Kuula embed URL.</CardDescription></CardHeader>
          <CardContent>
            <form onSubmit={submit} className="space-y-4">
              <div><Label>Title *</Label><Input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
              <div><Label>Description</Label><Textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Category</Label>
                  <Select value={form.category_id} onValueChange={(v) => setForm({ ...form, category_id: v })}>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>{categories.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Listing Type</Label>
                  <Select value={form.listing_type} onValueChange={(v) => setForm({ ...form, listing_type: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sale">For Sale</SelectItem>
                      <SelectItem value="rent">For Rent</SelectItem>
                      <SelectItem value="sold">Sold</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2"><Label>Price</Label><Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} /></div>
                <div><Label>Currency</Label><Input value={form.currency} onChange={(e) => setForm({ ...form, currency: e.target.value })} /></div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div><Label>City</Label><Input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="Istanbul" /></div>
                <div><Label>Country</Label><Input value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} /></div>
              </div>
              <div><Label>Location / Neighborhood</Label><Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="Beşiktaş, Levent" /></div>

              <div className="grid grid-cols-3 gap-3">
                <div><Label>Bedrooms</Label><Input type="number" value={form.bedrooms} onChange={(e) => setForm({ ...form, bedrooms: e.target.value })} /></div>
                <div><Label>Bathrooms</Label><Input type="number" value={form.bathrooms} onChange={(e) => setForm({ ...form, bathrooms: e.target.value })} /></div>
                <div><Label>Area (m²)</Label><Input type="number" value={form.area_sqm} onChange={(e) => setForm({ ...form, area_sqm: e.target.value })} /></div>
              </div>

              <div><Label>Amenities (comma separated)</Label><Input value={form.amenities} onChange={(e) => setForm({ ...form, amenities: e.target.value })} placeholder="Pool, Sea View, Gym, Parking" /></div>
              <div><Label>Badge</Label><Input value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} placeholder="New / Featured / Reduced" /></div>

              <div>
                <Label>Photos</Label>
                <div className="border-2 border-dashed rounded-lg p-3 text-center">
                  <Upload className="h-6 w-6 mx-auto text-muted-foreground" />
                  <Input type="file" multiple accept="image/*" className="mt-2" onChange={(e) => setPhotos(Array.from(e.target.files ?? []))} />
                  {photos.length > 0 && <p className="text-xs mt-1">{photos.length} photo(s)</p>}
                </div>
              </div>
              <div>
                <Label>Videos</Label>
                <Input type="file" multiple accept="video/*" onChange={(e) => setVideos(Array.from(e.target.files ?? []))} />
                {videos.length > 0 && <p className="text-xs mt-1">{videos.length} video(s)</p>}
              </div>
              <div>
                <Label>360° Panorama Photos (equirectangular)</Label>
                <Input type="file" multiple accept="image/*" onChange={(e) => setPanoramas(Array.from(e.target.files ?? []))} />
                <p className="text-xs text-muted-foreground mt-1">Use a 360° camera or Google Street View app to capture equirectangular images.</p>
              </div>
              <div>
                <Label>VR Tour Embed URL (Matterport / Kuula)</Label>
                <Input value={vrEmbedUrl} onChange={(e) => setVrEmbedUrl(e.target.value)} placeholder="https://my.matterport.com/show/?m=..." />
              </div>

              <Button type="submit" variant="cta" className="w-full" disabled={busy}>
                {busy && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}Publish Property
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Your Properties ({properties.length})</CardTitle></CardHeader>
          <CardContent className="space-y-3 max-h-[800px] overflow-auto">
            {properties.length === 0 && <p className="text-muted-foreground text-sm">No properties yet.</p>}
            {properties.map((p) => (
              <div key={p.id} className="flex items-center gap-3 p-3 border rounded-lg">
                {p.cover_image ? <img src={p.cover_image} alt="" className="w-16 h-16 object-cover rounded" /> : <div className="w-16 h-16 bg-muted rounded" />}
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{p.title}</p>
                  <p className="text-xs text-muted-foreground">{p.reference_number}</p>
                  <Badge variant={p.status === "published" ? "default" : "secondary"} className="text-xs mt-1">{p.status}</Badge>
                </div>
                <Button size="icon" variant="ghost" onClick={() => del(p.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
