-- Create enum types for leads
CREATE TYPE public.lead_language AS ENUM ('FR', 'NL', 'EN');
CREATE TYPE public.lead_status AS ENUM ('new', 'contacted', 'proposal', 'won', 'lost');

-- Create leads table
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT,
  contact_name TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  language lead_language NOT NULL DEFAULT 'FR',
  source TEXT NOT NULL,
  nb_users_estimate TEXT,
  message TEXT,
  notes TEXT,
  status lead_status NOT NULL DEFAULT 'new',
  ai_suggestion TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  CONSTRAINT contact_required CHECK (company_name IS NOT NULL OR contact_name IS NOT NULL)
);

-- Enable Row Level Security
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for admin access (we'll use a simple approach for now)
-- For Sprint 1, we allow all authenticated operations since admin auth comes later
CREATE POLICY "Allow public insert for lead capture" 
ON public.leads 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow authenticated read" 
ON public.leads 
FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "Allow authenticated update" 
ON public.leads 
FOR UPDATE 
TO authenticated
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_leads_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_leads_updated_at
BEFORE UPDATE ON public.leads
FOR EACH ROW
EXECUTE FUNCTION public.update_leads_updated_at();

-- Create index for common queries
CREATE INDEX idx_leads_status ON public.leads(status);
CREATE INDEX idx_leads_created_at ON public.leads(created_at DESC);
CREATE INDEX idx_leads_source ON public.leads(source);