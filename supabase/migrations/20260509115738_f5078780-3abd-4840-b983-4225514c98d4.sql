-- Sample requests
CREATE TABLE public.sample_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  product_title TEXT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  country TEXT,
  shipping_address TEXT NOT NULL,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  reference_number TEXT NOT NULL DEFAULT ('SMP-' || to_char(now(), 'YYYY') || '-' || upper(substr(gen_random_uuid()::text, 1, 6))),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.sample_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit sample request" ON public.sample_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can read own sample by ref" ON public.sample_requests FOR SELECT USING (true);
CREATE POLICY "Admins update sample requests" ON public.sample_requests FOR UPDATE USING (has_role(auth.uid(), 'admin'));
CREATE TRIGGER trg_sample_requests_updated BEFORE UPDATE ON public.sample_requests FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Quote attachments (admin uploads PDF/image quotation reply)
CREATE TABLE public.quote_attachments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  quote_id UUID NOT NULL REFERENCES public.quotes(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  file_name TEXT,
  mime_type TEXT,
  uploaded_by UUID,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.quote_attachments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read quote attachments" ON public.quote_attachments FOR SELECT USING (true);
CREATE POLICY "Admins manage quote attachments" ON public.quote_attachments FOR ALL USING (has_role(auth.uid(), 'admin')) WITH CHECK (has_role(auth.uid(), 'admin'));

-- Storage bucket for quote attachments
INSERT INTO storage.buckets (id, name, public) VALUES ('quote-attachments', 'quote-attachments', true) ON CONFLICT (id) DO NOTHING;
CREATE POLICY "Quote attachments public read" ON storage.objects FOR SELECT USING (bucket_id = 'quote-attachments');
CREATE POLICY "Admins upload quote attachments" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'quote-attachments' AND has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update quote attachments" ON storage.objects FOR UPDATE USING (bucket_id = 'quote-attachments' AND has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete quote attachments" ON storage.objects FOR DELETE USING (bucket_id = 'quote-attachments' AND has_role(auth.uid(), 'admin'));