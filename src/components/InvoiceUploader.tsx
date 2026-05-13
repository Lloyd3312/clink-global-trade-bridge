import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload, FileText, CheckCircle2 } from "lucide-react";

export default function InvoiceUploader({ quoteId }: { quoteId: string }) {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [notes, setNotes] = useState("");
  const [busy, setBusy] = useState(false);
  const { toast } = useToast();

  const reload = async () => {
    const { data } = await supabase.from("quote_invoices")
      .select("*").eq("quote_id", quoteId).order("created_at", { ascending: false });
    setInvoices(data ?? []);
  };
  useEffect(() => { reload(); /* eslint-disable-next-line */ }, [quoteId]);

  const submit = async () => {
    if (!file || !amount) { toast({ title: "PDF + amount required", variant: "destructive" }); return; }
    setBusy(true);
    try {
      const path = `invoices/${quoteId}/${Date.now()}-${file.name}`;
      const { error: upErr } = await supabase.storage.from("quote-attachments").upload(path, file);
      if (upErr) throw upErr;
      const { data: { publicUrl } } = supabase.storage.from("quote-attachments").getPublicUrl(path);
      const { data: { user } } = await supabase.auth.getUser();
      const { error } = await supabase.from("quote_invoices").insert({
        quote_id: quoteId, amount: Number(amount), currency,
        pdf_url: publicUrl, pdf_name: file.name, notes: notes || null,
        created_by: user?.id ?? null,
      });
      if (error) throw error;
      toast({ title: "Invoice sent", description: "Client can now pay from the tracking page." });
      setFile(null); setAmount(""); setNotes("");
      reload();
    } catch (e: any) {
      toast({ title: "Upload failed", description: e.message, variant: "destructive" });
    } finally { setBusy(false); }
  };

  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-medium mb-2 flex items-center gap-2"><FileText className="h-4 w-4" />Consultation Invoice</h4>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div><Label>Amount *</Label><Input type="number" step="0.01" value={amount} onChange={e => setAmount(e.target.value)} placeholder="250.00" /></div>
        <div><Label>Currency</Label>
          <select className="w-full h-10 px-3 border rounded-md bg-background" value={currency} onChange={e => setCurrency(e.target.value)}>
            <option>USD</option><option>EUR</option><option>GBP</option><option>TRY</option>
          </select>
        </div>
      </div>
      <div>
        <Label>Invoice PDF *</Label>
        <Input type="file" accept="application/pdf" onChange={e => setFile(e.target.files?.[0] ?? null)} />
      </div>
      <div><Label>Notes (optional)</Label><Textarea rows={2} value={notes} onChange={e => setNotes(e.target.value)} /></div>
      <Button onClick={submit} disabled={busy} className="w-full">
        {busy ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Upload className="h-4 w-4 mr-2" />}
        Send Invoice
      </Button>

      {invoices.length > 0 && (
        <div className="space-y-2 pt-2">
          <Label className="text-xs text-muted-foreground">Sent Invoices</Label>
          {invoices.map(inv => (
            <div key={inv.id} className="flex items-center justify-between p-2 border rounded text-sm">
              <div>
                <p className="font-medium">{inv.currency} {Number(inv.amount).toFixed(2)}</p>
                <p className="text-xs text-muted-foreground">{new Date(inv.created_at).toLocaleString()}</p>
              </div>
              {inv.status === 'pending' ? (
                <Badge variant="secondary">Pending</Badge>
              ) : (
                <Badge className="bg-success-green text-white"><CheckCircle2 className="h-3 w-3 mr-1" />Paid</Badge>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
