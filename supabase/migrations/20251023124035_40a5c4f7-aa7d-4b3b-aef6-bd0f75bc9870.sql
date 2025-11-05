-- Create categories table
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  icon TEXT,
  description TEXT,
  display_order INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create manufacturers table
CREATE TABLE public.manufacturers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  country TEXT,
  products_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
  manufacturer_id UUID REFERENCES public.manufacturers(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  manufacturer TEXT,
  country TEXT,
  price DECIMAL(10,2) NOT NULL CHECK (price > 0),
  stock_quantity INTEGER DEFAULT 0 CHECK (stock_quantity >= 0),
  sku TEXT UNIQUE,
  description TEXT,
  image_url TEXT,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.manufacturers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Read access for everyone
CREATE POLICY "Categories are viewable by everyone" 
ON public.categories FOR SELECT USING (true);

CREATE POLICY "Manufacturers are viewable by everyone" 
ON public.manufacturers FOR SELECT USING (true);

CREATE POLICY "Products are viewable by everyone" 
ON public.products FOR SELECT USING (true);

-- Indexes for better performance
CREATE INDEX idx_products_category_id ON public.products(category_id);
CREATE INDEX idx_products_manufacturer_id ON public.products(manufacturer_id);
CREATE INDEX idx_products_name ON public.products(name);
CREATE INDEX idx_products_sku ON public.products(sku);

-- Trigger for updated_at
CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert categories in order
INSERT INTO public.categories (name, slug, icon, description, display_order) VALUES
('Sănătate - Medicamente OTC', 'medicamente-otc', '💊', 'Medicamente', 1),
('Vitamine și Minerale', 'vitamine-minerale', '🌟', 'Suplimente nutritive și vitamine', 2),
('Sănătate - Parafarmaceutice', 'parafarmaceutice', '⚕️', 'Produse de sănătate fără prescripție', 3),
('Mamă și Copil', 'mama-copil', '👶', 'Produse pentru copii și mame', 4),
('Sănătate - Echipamente Medicale', 'echipamente-medicale', '🩺', 'Echipamente și dispozitive medicale', 5),
('Sănătate - Plante Medicinale', 'plante-medicinale', '🌿', 'Remedii naturale pe bază de plante', 6),
('Frumusețe și Igienă - Îngrijire Corp/Față', 'ingrijire-corp-fata', '✨', 'Produse de îngrijire corporală', 7),
('Frumusețe și Igienă - Igienă Personală', 'igiena-personala', '🧴', 'Produse de igienă zilnică', 8),
('Frumusețe și Igienă - Protecție Solară', 'protectie-solara', '☀️', 'Produse de protecție solară', 9),
('Frumusețe și Igienă - Îngrijire Păr', 'ingrijire-par', '💇', 'Produse pentru îngrijirea părului', 10),
('Dermato-Cosmetică', 'dermatocosmetica', '💄', 'Produse dermato-cosmetice', 11),
('Frumusețe și Igienă - Cosmetică Decorativă', 'cosmetica-decorativa', '💅', 'Produse de machiaj', 12);