import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Loader2, Plus, EyeOff, Eye, Check, X } from "lucide-react";

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80);

export default function AdminCatalog() {
  const { user, loading, isAdmin } = useAuth();
  const [cats, setCats] = useState<any[]>([]);
  const [apps, setApps] = useState<any[]>([]);
  const [newCat, setNewCat] = useState("");
  const [kind, setKind] = useState<"product" | "property">("product");

  const reload = async () => {
    const { data: c } = await supabase.from("categories").select("*").order("kind").order("sort_order");
    setCats(c ?? []);
    const { data: a } = await supabase.from("seller_applications").select("*").order("created_at", { ascending: false });
    setApps(a ?? []);
  };

  useEffect(() => { if (isAdmin) reload(); }, [isAdmin]);

  if (loading) return <div className="p-12 text-center"><Loader2 className="h-6 w-6 animate-spin mx-auto" /></div>;
  if (!user) return <Navigate to="/auth" replace />;
  if (!isAdmin) return <div className="p-12 text-center text-muted-foreground">Admins only.</div>;

  const addCat = async () => {
    if (!newCat.trim()) return;
    const { error } = await supabase.from("categories").insert({ name: newCat.trim(), slug: slugify(newCat), kind, sort_order: 500 });
    if (error) return toast.error(error.message);
    setNewCat("");
    reload();
  };

  const toggleCat = async (id: string, vis: boolean) => {
    await supabase.from("categories").update({ is_visible: !vis }).eq("id", id);
    reload();
  };

  const decideApp = async (app: any, decision: "approved" | "rejected") => {
    const { error } = await supabase.from("seller_applications").update({ status: decision, reviewed_by: user.id, reviewed_at: new Date().toISOString() }).eq("id", app.id);
    if (error) return toast.error(error.message);
    if (decision === "approved") {
      await supabase.from("user_roles").insert({ user_id: app.user_id, role: "seller" }).then(() => {});
    }
    toast.success(`Application ${decision}`);
    reload();
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">Admin · Catalog & Sellers</h1>
      <Tabs defaultValue="categories">
        <TabsList>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="sellers">Seller Applications ({apps.filter(a => a.status === "pending").length})</TabsTrigger>
        </TabsList>

        <TabsContent value="categories">
          <Card>
            <CardHeader><CardTitle>Manage Categories</CardTitle><CardDescription>Add, hide, or organise product and property categories.</CardDescription></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input placeholder="New category name" value={newCat} onChange={(e) => setNewCat(e.target.value)} />
                <select className="border rounded-md px-3 text-sm" value={kind} onChange={(e) => setKind(e.target.value as any)}>
                  <option value="product">Product</option>
                  <option value="property">Property</option>
                </select>
                <Button onClick={addCat}><Plus className="h-4 w-4 mr-1" />Add</Button>
              </div>
              <div className="space-y-2">
                {cats.map((c) => (
                  <div key={c.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{c.name} <Badge variant="outline" className="ml-2 text-xs">{c.kind}</Badge></p>
                      <p className="text-xs text-muted-foreground">/{c.slug}</p>
                    </div>
                    <Button size="sm" variant="ghost" onClick={() => toggleCat(c.id, c.is_visible)}>
                      {c.is_visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4 text-muted-foreground" />}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sellers">
          <Card>
            <CardHeader><CardTitle>Seller Applications</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {apps.length === 0 && <p className="text-muted-foreground text-sm">No applications yet.</p>}
              {apps.map((a) => (
                <div key={a.id} className="p-4 border rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{a.company_name}</p>
                      <p className="text-xs text-muted-foreground">{a.business_type} {a.website && `· ${a.website}`}</p>
                    </div>
                    <Badge variant={a.status === "approved" ? "default" : a.status === "rejected" ? "destructive" : "secondary"}>{a.status}</Badge>
                  </div>
                  {a.description && <p className="text-sm text-muted-foreground">{a.description}</p>}
                  {a.status === "pending" && (
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" variant="default" onClick={() => decideApp(a, "approved")}><Check className="h-4 w-4 mr-1" />Approve</Button>
                      <Button size="sm" variant="outline" onClick={() => decideApp(a, "rejected")}><X className="h-4 w-4 mr-1" />Reject</Button>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
