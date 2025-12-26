-- Create page_content table for storing editable page content
CREATE TABLE IF NOT EXISTS public.page_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_key TEXT UNIQUE NOT NULL,
  title TEXT,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_page_content_key ON public.page_content(page_key);
CREATE INDEX IF NOT EXISTS idx_page_content_updated_at ON public.page_content(updated_at DESC);

-- Enable Row Level Security
ALTER TABLE public.page_content ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Public can read all page content
CREATE POLICY "Page content is viewable by everyone" 
ON public.page_content FOR SELECT 
USING (true);

-- Only admins can insert page content (using has_role function)
CREATE POLICY "Only admins can insert page content" 
ON public.page_content FOR INSERT 
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Only admins can update page content
CREATE POLICY "Only admins can update page content" 
ON public.page_content FOR UPDATE 
USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can delete page content
CREATE POLICY "Only admins can delete page content" 
ON public.page_content FOR DELETE 
USING (public.has_role(auth.uid(), 'admin'));

-- Trigger to auto-update updated_at and updated_by
CREATE OR REPLACE FUNCTION public.update_page_content_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  NEW.updated_by = auth.uid();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER update_page_content_updated_at
BEFORE UPDATE ON public.page_content
FOR EACH ROW
EXECUTE FUNCTION public.update_page_content_timestamp();