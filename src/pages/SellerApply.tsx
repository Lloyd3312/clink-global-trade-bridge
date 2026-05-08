import { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function SellerApply() {
  const { user, loading, isSeller } = useAuth();
  const [busy, setBusy] = useState(false);
  const [existing, setExisting] = useState<any>(null);
  const [form, setForm] = useState({ company_name: "", business_type: "", description: "", website: "" });

  useEffect(() => {
    if (!user) return;
    supabase.from("seller_applications").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(1).maybeSingle().then(({ data }) => setExisting(data));
  }, [user]);

  if (loading) return <div className="p-12 text-center"><Loader2 className="h-6 w-6 animate-spin mx-auto" /></div>;
  if (!user) return <Navigate to="/auth" replace />;

  if (isSeller) return (
    <div className="max-w-xl mx-auto p-8 text-center space-y-4">
      <h2 className="text-2xl font-bold">You're a verified seller</h2>
      <Button asChild variant="cta"><Link to="/seller/products">Go to Product Upload</Link></Button>
    </div>
  );

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.from("seller_applications").insert({ ...form, user_id: user.id });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Application submitted. We'll review and notify you.");
    setExisting({ ...form, status: "pending" });
  };

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle>Become a Verified Seller</CardTitle>
          <CardDescription>Apply once. After admin approval you can upload products.</CardDescription>
        </CardHeader>
        <CardContent>
          {existing ? (
            <div className="space-y-3">
              <p>Application status: <Badge>{existing.status}</Badge></p>
              <p className="text-sm text-muted-foreground">Company: {existing.company_name}</p>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <div><Label>Company Name *</Label><Input required value={form.company_name} onChange={(e) => setForm({ ...form, company_name: e.target.value })} /></div>
              <div><Label>Business Type</Label><Input value={form.business_type} onChange={(e) => setForm({ ...form, business_type: e.target.value })} placeholder="e.g. Manufacturer, Distributor" /></div>
              <div><Label>Website</Label><Input type="url" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} /></div>
              <div><Label>Tell us about your business</Label><Textarea rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
              <Button type="submit" variant="cta" className="w-full" disabled={busy}>
                {busy && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}Submit Application
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
