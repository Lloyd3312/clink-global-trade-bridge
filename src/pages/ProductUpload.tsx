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
import { Loader2, Upload, Trash2, Plus } from "lucide-react";

interface Category { id: string; name: string; slug: string }
interface Product { id: string; title: string; status: string; cover_image: string | null; category_id: string | null; }

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80);

export default function ProductUpload() {
  const { user, loading, isSeller, isAdmin } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [busy, setBusy] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [form, setForm] = useState({
    title: "", description: "", specifications: "",
    category_id: "", price_min: "", price_max: "", moq: "",
    features: "", badge: "", status: "published",
  });
  const [newCategory, setNewCategory] = useState("");

  const reload = async () => {
    const { data: cats } = await supabase.from("categories").select("id,name,slug").eq("kind", "product").eq("is_visible", true).order("sort_order");
    setCategories(cats ?? []);
    const q = supabase.from("products").select("id,title,status,cover_image,category_id").order("created_at", { ascending: false });
    const { data: prods } = isAdmin ? await q : await q.eq("seller_id", user!.id);
    setProducts(prods ?? []);
  };

  useEffect(() => { if (user) reload(); /* eslint-disable-next-line */ }, [user, isAdmin]);

  if (loading) return <div className="p-12 text-center"><Loader2 className="h-6 w-6 animate-spin mx-auto" /></div>;
  if (!user) return <Navigate to="/auth" replace />;
  if (!isSeller) return (
    <div className="max-w-xl mx-auto p-8 text-center space-y-4">
      <h2 className="text-2xl font-bold">Seller access required</h2>
      <p className="text-muted-foreground">Apply to become a verified seller to upload products.</p>
      <Button asChild variant="cta"><Link to="/seller/apply">Apply as Seller</Link></Button>
    </div>
  );

  const addCategory = async () => {
    if (!newCategory.trim()) return;
    if (!isAdmin) return toast.error("Only admins can create categories");
    const slug = slugify(newCategory);
    const { error } = await supabase.from("categories").insert({ name: newCategory.trim(), slug, kind: "product", sort_order: 500 });
    if (error) return toast.error(error.message);
    setNewCategory("");
    toast.success("Category added");
    reload();
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      // Default to "Other" if no category selected
      let categoryId = form.category_id;
      if (!categoryId) {
        const other = categories.find((c) => c.slug === "other");
        categoryId = other?.id || "";
      }
      const slug = `${slugify(form.title)}-${Date.now().toString(36)}`;
      const { data: product, error } = await supabase.from("products").insert({
        title: form.title,
        slug,
        description: form.description,
        specifications: form.specifications,
        category_id: categoryId || null,
        seller_id: user.id,
        price_min: form.price_min ? Number(form.price_min) : null,
        price_max: form.price_max ? Number(form.price_max) : null,
        moq: form.moq || null,
        features: form.features ? form.features.split(",").map((f) => f.trim()).filter(Boolean) : [],
        badge: form.badge || null,
        status: form.status,
      }).select().single();
      if (error) throw error;

      // Upload media
      const mediaRows: any[] = [];
      let coverUrl: string | null = null;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const path = `${user.id}/${product.id}/${Date.now()}-${i}-${file.name}`;
        const { error: upErr } = await supabase.storage.from("product-media").upload(path, file);
        if (upErr) { toast.error(`Upload failed: ${upErr.message}`); continue; }
        const { data: { publicUrl } } = supabase.storage.from("product-media").getPublicUrl(path);
        mediaRows.push({ product_id: product.id, url: publicUrl, media_type: file.type.startsWith("video") ? "video" : "image", sort_order: i });
        if (i === 0) coverUrl = publicUrl;
      }
      if (mediaRows.length) await supabase.from("product_media").insert(mediaRows);
      if (coverUrl) await supabase.from("products").update({ cover_image: coverUrl }).eq("id", product.id);

      toast.success("Product uploaded");
      setForm({ title: "", description: "", specifications: "", category_id: "", price_min: "", price_max: "", moq: "", features: "", badge: "", status: "published" });
      setFiles([]);
      reload();
    } catch (err: any) {
      toast.error(err.message ?? "Failed to upload");
    } finally {
      setBusy(false);
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    reload();
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Upload Products</h1>
        <p className="text-muted-foreground">{isAdmin ? "Admin" : "Seller"} dashboard — manage your catalog</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>New Product</CardTitle>
            <CardDescription>Fill the details below. Choose a category or leave blank to file under "Other".</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={submit} className="space-y-4">
              <div><Label>Title *</Label><Input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
              <div><Label>Description</Label><Textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
              <div><Label>Specifications</Label><Textarea rows={2} value={form.specifications} onChange={(e) => setForm({ ...form, specifications: e.target.value })} /></div>

              <div>
                <Label>Category</Label>
                <div className="flex gap-2">
                  <Select value={form.category_id} onValueChange={(v) => setForm({ ...form, category_id: v })}>
                    <SelectTrigger><SelectValue placeholder="Select category (or leave blank → Other)" /></SelectTrigger>
                    <SelectContent>{categories.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                {isAdmin && (
                  <div className="flex gap-2 mt-2">
                    <Input placeholder="Add new category…" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
                    <Button type="button" variant="outline" onClick={addCategory}><Plus className="h-4 w-4" /></Button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div><Label>Price Min (USD)</Label><Input type="number" value={form.price_min} onChange={(e) => setForm({ ...form, price_min: e.target.value })} /></div>
                <div><Label>Price Max (USD)</Label><Input type="number" value={form.price_max} onChange={(e) => setForm({ ...form, price_max: e.target.value })} /></div>
              </div>
              <div><Label>MOQ</Label><Input value={form.moq} onChange={(e) => setForm({ ...form, moq: e.target.value })} placeholder="e.g. 100 units" /></div>
              <div><Label>Features (comma separated)</Label><Input value={form.features} onChange={(e) => setForm({ ...form, features: e.target.value })} placeholder="CE Certified, Custom Designs" /></div>
              <div><Label>Badge</Label><Input value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} placeholder="Premium / ISO 9001 / Best Seller" /></div>

              <div>
                <Label>Photos / Videos</Label>
                <div className="border-2 border-dashed rounded-lg p-4 text-center">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                  <Input type="file" multiple accept="image/*,video/*" className="mt-2" onChange={(e) => setFiles(Array.from(e.target.files ?? []))} />
                  {files.length > 0 && <p className="text-sm mt-2">{files.length} file(s) selected</p>}
                </div>
              </div>

              <Button type="submit" variant="cta" className="w-full" disabled={busy}>
                {busy && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}Publish Product
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Your Products ({products.length})</CardTitle></CardHeader>
          <CardContent className="space-y-3 max-h-[700px] overflow-auto">
            {products.length === 0 && <p className="text-muted-foreground text-sm">No products yet.</p>}
            {products.map((p) => (
              <div key={p.id} className="flex items-center gap-3 p-3 border rounded-lg">
                {p.cover_image ? <img src={p.cover_image} alt="" className="w-16 h-16 object-cover rounded" /> : <div className="w-16 h-16 bg-muted rounded" />}
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{p.title}</p>
                  <Badge variant={p.status === "published" ? "default" : "secondary"} className="text-xs">{p.status}</Badge>
                </div>
                <Button size="icon" variant="ghost" onClick={() => deleteProduct(p.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
