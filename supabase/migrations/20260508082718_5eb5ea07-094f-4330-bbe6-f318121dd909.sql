-- ============ ROLES ============
CREATE TYPE public.app_role AS ENUM ('admin', 'seller', 'user');

CREATE TABLE public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "Users view own roles" ON public.user_roles
  FOR SELECT TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage roles" ON public.user_roles
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- ============ PROFILES ============
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  email TEXT,
  company TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Profiles viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users insert own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name, email)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.email), NEW.email);
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user');
  RETURN NEW;
END; $$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============ SELLER APPLICATIONS ============
CREATE TABLE public.seller_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  business_type TEXT,
  description TEXT,
  website TEXT,
  status TEXT NOT NULL DEFAULT 'pending', -- pending, approved, rejected
  reviewed_by UUID REFERENCES auth.users(id),
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.seller_applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own applications" ON public.seller_applications FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Users create own application" ON public.seller_applications FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins update applications" ON public.seller_applications FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- ============ CATEGORIES ============
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  parent_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  kind TEXT NOT NULL DEFAULT 'product', -- 'product' or 'property'
  sort_order INT NOT NULL DEFAULT 0,
  is_visible BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Categories public read" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Admins manage categories" ON public.categories FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- ============ PRODUCTS ============
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  specifications TEXT,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  seller_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  price_min NUMERIC,
  price_max NUMERIC,
  currency TEXT DEFAULT 'USD',
  moq TEXT,
  features TEXT[] DEFAULT '{}',
  badge TEXT,
  cover_image TEXT,
  status TEXT NOT NULL DEFAULT 'draft', -- draft, published
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published products public read" ON public.products FOR SELECT
  USING (status = 'published' OR auth.uid() = seller_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Sellers/admins create products" ON public.products FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = seller_id AND (public.has_role(auth.uid(), 'seller') OR public.has_role(auth.uid(), 'admin')));
CREATE POLICY "Owners/admins update products" ON public.products FOR UPDATE TO authenticated
  USING (auth.uid() = seller_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Owners/admins delete products" ON public.products FOR DELETE TO authenticated
  USING (auth.uid() = seller_id OR public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.product_media (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  media_type TEXT NOT NULL DEFAULT 'image', -- image, video
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.product_media ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Product media public read" ON public.product_media FOR SELECT USING (true);
CREATE POLICY "Owners/admins manage media" ON public.product_media FOR ALL TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.products p WHERE p.id = product_id AND (p.seller_id = auth.uid() OR public.has_role(auth.uid(), 'admin')))
  ) WITH CHECK (
    EXISTS (SELECT 1 FROM public.products p WHERE p.id = product_id AND (p.seller_id = auth.uid() OR public.has_role(auth.uid(), 'admin')))
  );

-- ============ TRIGGERS ============
CREATE TRIGGER trg_categories_updated BEFORE UPDATE ON public.categories
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER trg_products_updated BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER trg_profiles_updated BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============ STORAGE BUCKET ============
INSERT INTO storage.buckets (id, name, public) VALUES ('product-media', 'product-media', true)
  ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Product media public read" ON storage.objects FOR SELECT
  USING (bucket_id = 'product-media');
CREATE POLICY "Authenticated upload product media" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'product-media' AND (public.has_role(auth.uid(),'seller') OR public.has_role(auth.uid(),'admin')));
CREATE POLICY "Owners update product media" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'product-media' AND (auth.uid()::text = (storage.foldername(name))[1] OR public.has_role(auth.uid(),'admin')));
CREATE POLICY "Owners delete product media" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'product-media' AND (auth.uid()::text = (storage.foldername(name))[1] OR public.has_role(auth.uid(),'admin')));

-- ============ SEED CATEGORIES ============
INSERT INTO public.categories (name, slug, kind, sort_order) VALUES
  ('Steel & Iron', 'steel-iron', 'product', 10),
  ('Industrial Machinery', 'industrial-machinery', 'product', 20),
  ('Furniture & Fabrics', 'furniture-fabrics', 'product', 30),
  ('Security Doors', 'security-doors', 'product', 40),
  ('Baby Products', 'baby-products', 'product', 50),
  ('Ceramics & POP', 'ceramics-pop', 'product', 60),
  ('Solar Panels', 'solar-panels', 'product', 70),
  ('Pharmaceutical Products', 'pharmaceutical-products', 'product', 80),
  ('Fashion & Accessories', 'fashion-accessories', 'product', 90),
  ('Other', 'other', 'product', 999);