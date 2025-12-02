-- Supprimer toutes les politiques existantes
DROP POLICY IF EXISTS "Allow public insert for lead capture" ON public.leads;
DROP POLICY IF EXISTS "Allow authenticated read" ON public.leads;
DROP POLICY IF EXISTS "Allow authenticated update" ON public.leads;

-- Recréer les politiques avec les bons rôles
-- INSERT: permettre aux utilisateurs anonymes (anon) et authentifiés
CREATE POLICY "leads_insert_policy"
ON public.leads
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- SELECT: uniquement pour les utilisateurs authentifiés
CREATE POLICY "leads_select_policy"
ON public.leads
FOR SELECT
TO authenticated
USING (true);

-- UPDATE: uniquement pour les utilisateurs authentifiés  
CREATE POLICY "leads_update_policy"
ON public.leads
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);