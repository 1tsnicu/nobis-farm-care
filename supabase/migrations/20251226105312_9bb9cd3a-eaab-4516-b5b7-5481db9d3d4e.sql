-- Create page_sections table for structured content
CREATE TABLE IF NOT EXISTS public.page_sections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_name TEXT NOT NULL,
  section_key TEXT NOT NULL,
  section_data JSONB NOT NULL,
  section_order INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(page_name, section_key)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_page_sections_page ON public.page_sections(page_name);
CREATE INDEX IF NOT EXISTS idx_page_sections_order ON public.page_sections(page_name, section_order);

-- Enable RLS
ALTER TABLE public.page_sections ENABLE ROW LEVEL SECURITY;

-- Public can read visible sections
CREATE POLICY "Public can read visible sections"
ON public.page_sections FOR SELECT
USING (is_visible = true);

-- Admins can do everything (using has_role function)
CREATE POLICY "Admins can insert sections"
ON public.page_sections FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update sections"
ON public.page_sections FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete sections"
ON public.page_sections FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Admins can read all sections (including hidden)
CREATE POLICY "Admins can read all sections"
ON public.page_sections FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_page_sections_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER update_page_sections_updated_at
BEFORE UPDATE ON public.page_sections
FOR EACH ROW
EXECUTE FUNCTION public.update_page_sections_updated_at();

-- Insert initial data for About page
INSERT INTO public.page_sections (page_name, section_key, section_data, section_order) VALUES
('about', 'hero', '{
  "title": "Povestea Noastră de 8 Ani",
  "subtitle": "Despre Farmacia Nobis Farm",
  "description": "Suntem mai mult decât o farmacie – suntem partenerul tău de încredere pentru o viață sănătoasă, dedicați îngrijirii și bunăstării familiei tale.",
  "image": "",
  "achievements": [
    {"number": "8+", "label": "Ani de experiență"},
    {"number": "25,000+", "label": "Clienți mulțumiți"},
    {"number": "5,000+", "label": "Produse certificate"},
    {"number": "4.9★", "label": "Rating Google Reviews"}
  ]
}', 1),
('about', 'story', '{
  "title": "O călătorie dedicată sănătății tale",
  "content": [
    {"type": "paragraph", "text": "Farmacia Nobis Farm a fost fondată în 2009 cu o viziune clară: să oferim comunității noastre din Moldova acces la produse farmaceutice de cea mai înaltă calitate, însoțite de consiliere profesionistă și personalizată."},
    {"type": "paragraph", "text": "De-a lungul acestor 8 ani de activitate, am crescut constant, evoluând de la o farmacie locală la o rețea de încredere care servește peste 25.000 de familii în toată Moldova. Fiecare zi ne-a adus mai aproape de clienții noștri și ne-a întărit convingerea că sănătatea este cea mai prețioasă avere."},
    {"type": "paragraph", "text": "Succesul nostru se bazează pe încrederea pe care ne-o acordă clienții zi de zi, pe dedicarea echipei noastre de farmaciști calificați și pe angajamentul nostru constant de a oferi servicii farmaceutice de excelență."}
  ],
  "image": ""
}', 2),
('about', 'mission_vision', '{
  "mission": {
    "title": "Misiunea Noastră",
    "description": "Să oferim servicii farmaceutice de excepție prin asigurarea accesului la medicamente și produse de sănătate de calitate superioară, împreună cu consiliere profesionistă personalizată pentru fiecare client."
  },
  "vision": {
    "title": "Viziunea Noastră",
    "description": "Să devenim cea mai de încredere rețea de farmacii din Moldova, recunoscută pentru excelența serviciilor, inovație în domeniul farmaceutic și contribuția activă la promovarea unui stil de viață sănătos."
  }
}', 3),
('about', 'values', '{
  "title": "Principiile care ne ghidează fiecare zi",
  "subtitle": "Valorile noastre fundamentale definesc modul în care interacționăm cu clienții și comunitatea",
  "items": [
    {"icon": "heart", "title": "Grijă pentru Clienți", "description": "Fiecare client este unic și merită atenție personalizată pentru nevoile sale de sănătate"},
    {"icon": "shield", "title": "Calitate Garantată", "description": "Doar produse certificate și verificate de la producători autorizați și de încredere"},
    {"icon": "stethoscope", "title": "Profesionalism", "description": "Echipă de farmaciști calificați cu experiență vastă în domeniul farmaceutic"},
    {"icon": "award", "title": "Inovație Continuă", "description": "Adoptăm cele mai noi tehnologii și practici pentru servicii farmaceutice superioare"}
  ]
}', 4),
('about', 'team', '{
  "title": "Farmaciști dedicați sănătății tale",
  "subtitle": "Echipa noastră de profesioniști este pregătită să îți ofere cea mai bună consiliere farmaceutică",
  "members": [
    {"name": "Dr. Elena Popescu", "role": "Farmacist Șef", "experience": "20+ ani experiență", "image": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400", "description": "Specializată în farmacie clinică și consiliere pentru boli cronice", "specialties": ["Diabet", "Hipertensiune", "Cardiologie"]},
    {"name": "Dr. Maria Ionescu", "role": "Farmacist Senior", "experience": "8+ ani experiență", "image": "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400", "description": "Expert în dermato-cosmetică și produse pentru îngrijirea pielii", "specialties": ["Dermatologie", "Cosmetică", "Alergii"]},
    {"name": "Dr. Andrei Moraru", "role": "Farmacist", "experience": "12+ ani experiență", "image": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400", "description": "Specialist în suplimente nutritive și medicina naturistă", "specialties": ["Nutriție", "Naturiste", "Wellness"]},
    {"name": "Dr. Ana Rusu", "role": "Farmacist", "experience": "8+ ani experiență", "image": "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400", "description": "Specializată în îngrijirea mamei și copilului", "specialties": ["Pediatrie", "Maternitate", "Familie"]}
  ]
}', 5)
ON CONFLICT (page_name, section_key) DO NOTHING;