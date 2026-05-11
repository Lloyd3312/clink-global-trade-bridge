-- Properties table
CREATE TABLE public.properties (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  reference_number TEXT NOT NULL DEFAULT ('PRP-' || to_char(now(),'YYYY') || '-' || upper(substr(gen_random_uuid()::text, 1, 6))),
  seller_id UUID,
  category_id UUID,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  listing_type TEXT NOT NULL DEFAULT 'sale', -- sale | rent | sold
  status TEXT NOT NULL DEFAULT 'draft', -- draft | published
  price NUMERIC,
  currency TEXT DEFAULT 'USD',
  location TEXT,
  city TEXT,
  country TEXT,
  bedrooms INTEGER,
  bathrooms INTEGER,
  area_sqm NUMERIC,
  amenities TEXT[] DEFAULT '{}',
  cover_image TEXT,
  badge TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published properties public read" ON public.properties
FOR SELECT USING (status = 'published' OR auth.uid() = seller_id OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Sellers/admins create properties" ON public.properties
FOR INSERT TO authenticated
WITH CHECK (auth.uid() = seller_id AND (has_role(auth.uid(),'seller') OR has_role(auth.uid(),'admin')));

CREATE POLICY "Owners/admins update properties" ON public.properties
FOR UPDATE TO authenticated
USING (auth.uid() = seller_id OR has_role(auth.uid(),'admin'));

CREATE POLICY "Owners/admins delete properties" ON public.properties
FOR DELETE TO authenticated
USING (auth.uid() = seller_id OR has_role(auth.uid(),'admin'));

CREATE TRIGGER update_properties_updated_at
BEFORE UPDATE ON public.properties
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Property media (images, video, panorama, vr_embed)
CREATE TABLE public.property_media (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID NOT NULL,
  url TEXT NOT NULL,
  media_type TEXT NOT NULL DEFAULT 'image', -- image | video | panorama | vr_embed
  caption TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.property_media ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Property media public read" ON public.property_media
FOR SELECT USING (true);

CREATE POLICY "Owners/admins manage property media" ON public.property_media
FOR ALL TO authenticated
USING (EXISTS (SELECT 1 FROM properties p WHERE p.id = property_media.property_id AND (p.seller_id = auth.uid() OR has_role(auth.uid(),'admin'))))
WITH CHECK (EXISTS (SELECT 1 FROM properties p WHERE p.id = property_media.property_id AND (p.seller_id = auth.uid() OR has_role(auth.uid(),'admin'))));

-- Storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('property-media','property-media', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Property media public read storage" ON storage.objects
FOR SELECT USING (bucket_id = 'property-media');

CREATE POLICY "Sellers/admins upload property media" ON storage.objects
FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'property-media' AND (has_role(auth.uid(),'seller') OR has_role(auth.uid(),'admin')));

CREATE POLICY "Owners/admins update property media storage" ON storage.objects
FOR UPDATE TO authenticated
USING (bucket_id = 'property-media' AND (has_role(auth.uid(),'seller') OR has_role(auth.uid(),'admin')));

CREATE POLICY "Owners/admins delete property media storage" ON storage.objects
FOR DELETE TO authenticated
USING (bucket_id = 'property-media' AND (has_role(auth.uid(),'seller') OR has_role(auth.uid(),'admin')));

-- Seed real estate categories
INSERT INTO public.categories (name, slug, kind, sort_order, is_visible) VALUES
('Apartments','apartments','property',1,true),
('Villas','villas','property',2,true),
('Commercial','commercial','property',3,true),
('Land','land','property',4,true),
('Off-plan','off-plan','property',5,true)
ON CONFLICT DO NOTHING;