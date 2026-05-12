CREATE TABLE public.quote_invoices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_id uuid NOT NULL,
  amount numeric NOT NULL,
  currency text NOT NULL DEFAULT 'USD',
  pdf_url text,
  pdf_name text,
  notes text,
  status text NOT NULL DEFAULT 'pending',
  stripe_session_id text,
  crypto_payment_id text,
  payment_method text,
  paid_at timestamptz,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_quote_invoices_quote_id ON public.quote_invoices(quote_id);
CREATE INDEX idx_quote_invoices_stripe_session ON public.quote_invoices(stripe_session_id);

ALTER TABLE public.quote_invoices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read invoices"
  ON public.quote_invoices FOR SELECT
  USING (true);

CREATE POLICY "Admins manage invoices"
  ON public.quote_invoices FOR ALL
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_quote_invoices_updated_at
  BEFORE UPDATE ON public.quote_invoices
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();