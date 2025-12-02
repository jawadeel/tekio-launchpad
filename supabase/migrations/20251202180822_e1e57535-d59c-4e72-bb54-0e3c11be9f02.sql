-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Allow public insert for lead capture" ON public.leads;
DROP POLICY IF EXISTS "Allow authenticated read" ON public.leads;
DROP POLICY IF EXISTS "Allow authenticated update" ON public.leads;

-- Create PERMISSIVE policies (default behavior)
-- Allow anyone to insert leads (for public forms)
CREATE POLICY "Allow public insert for lead capture"
ON public.leads
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Allow authenticated users to read leads
CREATE POLICY "Allow authenticated read"
ON public.leads
FOR SELECT
TO authenticated
USING (true);

-- Allow authenticated users to update leads
CREATE POLICY "Allow authenticated update"
ON public.leads
FOR UPDATE
TO authenticated
USING (true);