-- Drop and recreate the INSERT policy to ensure it's properly applied
DROP POLICY IF EXISTS "Allow public insert for lead capture" ON public.leads;

-- Recreate with explicit PUBLIC access
CREATE POLICY "Allow public insert for lead capture"
ON public.leads
FOR INSERT
TO public
WITH CHECK (true);