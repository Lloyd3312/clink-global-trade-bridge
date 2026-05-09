import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const STATUSES = ["pending", "shipped", "delivered", "cancelled"];

const SampleRequestsAdmin = () => {
  const [items, setItems] = useState<any[]>([]);

  const load = async () => {
    const { data } = await supabase.from("sample_requests").select("*").order("created_at", { ascending: false });
    setItems(data ?? []);
  };
  useEffect(() => { load(); }, []);

  const setStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("sample_requests").update({ status }).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Updated");
    load();
  };

  return (
    <Card className="mt-6">
      <CardHeader><CardTitle>Sample Requests ({items.length})</CardTitle></CardHeader>
      <CardContent className="space-y-3">
        {items.length === 0 && <p className="text-sm text-muted-foreground">No sample requests yet.</p>}
        {items.map((s) => (
          <div key={s.id} className="border rounded-lg p-4 grid md:grid-cols-4 gap-3 text-sm">
            <div>
              <p className="font-mono text-xs text-muted-foreground">{s.reference_number}</p>
              <p className="font-medium">{s.product_title || "Custom"}</p>
              <p className="text-xs text-muted-foreground">{new Date(s.created_at).toLocaleString()}</p>
            </div>
            <div>
              <p className="font-medium">{s.name}</p>
              <p className="text-xs">{s.email}</p>
              <p className="text-xs">{s.phone}</p>
              <p className="text-xs text-muted-foreground">{s.country}</p>
            </div>
            <div className="text-xs"><p className="font-medium mb-1">Address</p><p className="whitespace-pre-line">{s.shipping_address}</p>{s.notes && <p className="mt-2 italic">"{s.notes}"</p>}</div>
            <div className="flex flex-col gap-2 items-end">
              <Badge>{s.status}</Badge>
              <Select value={s.status} onValueChange={(v) => setStatus(s.id, v)}>
                <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
                <SelectContent>{STATUSES.map(st => <SelectItem key={st} value={st}>{st}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default SampleRequestsAdmin;
