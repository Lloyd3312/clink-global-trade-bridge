import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Package, Loader2, CheckCircle2 } from "lucide-react";

interface Props {
  productId?: string;
  productTitle?: string;
  trigger?: React.ReactNode;
}

const SampleRequestDialog = ({ productId, productTitle, trigger }: Props) => {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", company: "", country: "",
    shipping_address: "", notes: "",
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { data, error } = await supabase
      .from("sample_requests")
      .insert({
        product_id: productId ?? null,
        product_title: productTitle ?? null,
        ...form,
      })
      .select("reference_number")
      .single();
    setBusy(false);
    if (error) return toast.error(error.message);
    setDone(data.reference_number);
    toast.success("Sample request submitted");
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) setDone(null); }}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button size="sm" variant="outline">
            <Package className="h-4 w-4 mr-1" />Request Sample
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Request a Sample{productTitle ? `: ${productTitle}` : ""}</DialogTitle>
          <DialogDescription>We'll arrange shipping and confirm via email.</DialogDescription>
        </DialogHeader>

        {done ? (
          <div className="text-center py-6 space-y-3">
            <CheckCircle2 className="h-12 w-12 text-success-green mx-auto" />
            <h3 className="font-semibold">Request received!</h3>
            <p className="text-sm text-muted-foreground">Your reference number:</p>
            <p className="font-mono font-bold text-lg">{done}</p>
            <p className="text-xs text-muted-foreground">Save this to track your sample.</p>
            <Button onClick={() => setOpen(false)} className="w-full">Close</Button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Full Name *</Label><Input required maxLength={100} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
              <div><Label>Email *</Label><Input type="email" required maxLength={255} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
              <div><Label>Phone</Label><Input maxLength={30} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
              <div><Label>Company</Label><Input maxLength={100} value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} /></div>
              <div className="col-span-2"><Label>Country</Label><Input maxLength={80} value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} /></div>
            </div>
            <div><Label>Shipping Address *</Label><Textarea required maxLength={500} rows={3} value={form.shipping_address} onChange={(e) => setForm({ ...form, shipping_address: e.target.value })} /></div>
            <div><Label>Notes</Label><Textarea maxLength={500} rows={2} placeholder="Specs, color, size preference..." value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} /></div>
            <Button type="submit" variant="cta" className="w-full" disabled={busy}>
              {busy && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}Submit Sample Request
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SampleRequestDialog;
