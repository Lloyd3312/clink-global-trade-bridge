
-- Create quotes table for client enquiries
CREATE TABLE public.quotes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  reference_number TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  company TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  country TEXT,
  products TEXT[] DEFAULT '{}',
  custom_product TEXT,
  quantity TEXT,
  specifications TEXT,
  delivery_timeline TEXT,
  budget TEXT,
  additional_info TEXT,
  status TEXT NOT NULL DEFAULT 'enquiry',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert quotes (public form submission)
CREATE POLICY "Anyone can submit a quote" ON public.quotes
  FOR INSERT WITH CHECK (true);

-- Allow anyone to read their own quote by reference number
CREATE POLICY "Anyone can read quotes" ON public.quotes
  FOR SELECT USING (true);

-- Only authenticated users can update quotes (admin)
CREATE POLICY "Authenticated users can update quotes" ON public.quotes
  FOR UPDATE TO authenticated USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_quotes_updated_at
  BEFORE UPDATE ON public.quotes
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create status history table
CREATE TABLE public.quote_status_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  quote_id UUID NOT NULL REFERENCES public.quotes(id) ON DELETE CASCADE,
  status TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.quote_status_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read status history" ON public.quote_status_history
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert status history" ON public.quote_status_history
  FOR INSERT TO authenticated WITH CHECK (true);
