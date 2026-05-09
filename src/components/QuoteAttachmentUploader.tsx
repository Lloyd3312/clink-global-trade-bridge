import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Upload, FileText, Trash2 } from "lucide-react";

const QuoteAttachmentUploader = ({ quoteId }: { quoteId: string }) => {
  const [items, setItems] = useState<any[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [notes, setNotes] = useState("");
  const [busy, setBusy] = useState(false);

  const load = async () => {
    const { data } = await supabase.from("quote_attachments").select("*").eq("quote_id", quoteId).order("created_at", { ascending: false });
    setItems(data ?? []);
  };

  useEffect(() => { load(); }, [quoteId]);

  const upload = async () => {
    if (!file) return;
    setBusy(true);
    const path = `${quoteId}/${Date.now()}-${file.name}`;
    const { error: upErr } = await supabase.storage.from("quote-attachments").upload(path, file);
    if (upErr) { setBusy(false); return toast.error(upErr.message); }
    const { data: pub } = supabase.storage.from("quote-attachments").getPublicUrl(path);
    const { error } = await supabase.from("quote_attachments").insert({
      quote_id: quoteId, url: pub.publicUrl, file_name: file.name, mime_type: file.type, notes: notes || null,
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Attachment uploaded");
    setFile(null); setNotes("");
    load();
  };

  const remove = async (id: string) => {
    await supabase.from("quote_attachments").delete().eq("id", id);
    load();
  };

  return (
    <div className="space-y-3">
      <Label className="flex items-center gap-2"><FileText className="h-4 w-4" />Quotation Attachments</Label>
      {items.length > 0 && (
        <div className="space-y-2">
          {items.map((a) => (
            <div key={a.id} className="flex items-center justify-between text-sm p-2 border rounded">
              <a href={a.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline truncate flex-1">{a.file_name || "file"}</a>
              <Button size="icon" variant="ghost" onClick={() => remove(a.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
            </div>
          ))}
        </div>
      )}
      <Input type="file" accept=".pdf,image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
      <Input placeholder="Note (optional)" value={notes} onChange={(e) => setNotes(e.target.value)} maxLength={200} />
      <Button onClick={upload} disabled={!file || busy} className="w-full" variant="outline">
        {busy ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Upload className="h-4 w-4 mr-2" />}Upload Quotation
      </Button>
    </div>
  );
};

export default QuoteAttachmentUploader;
