-- Add INSERT, UPDATE, DELETE policies for products table
-- Allow anyone to insert products (for admin import)
CREATE POLICY "Anyone can insert products" 
ON public.products 
FOR INSERT 
WITH CHECK (true);

-- Allow anyone to update products
CREATE POLICY "Anyone can update products" 
ON public.products 
FOR UPDATE 
USING (true);

-- Allow anyone to delete products
CREATE POLICY "Anyone can delete products" 
ON public.products 
FOR DELETE 
USING (true);

-- Add policies for manufacturers table
CREATE POLICY "Anyone can insert manufacturers" 
ON public.manufacturers 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update manufacturers" 
ON public.manufacturers 
FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can delete manufacturers" 
ON public.manufacturers 
FOR DELETE 
USING (true);