import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { sendLead, LeadType } from '@/services/leadService';

export type LeadLanguage = 'FR' | 'NL' | 'EN';
export type LeadStatus = 'new' | 'contacted' | 'proposal' | 'won' | 'lost';

export interface Lead {
  id: string;
  company_name: string | null;
  contact_name: string | null;
  email: string;
  phone: string | null;
  language: LeadLanguage;
  source: string;
  nb_users_estimate: string | null;
  message: string | null;
  notes: string | null;
  status: LeadStatus;
  ai_suggestion: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateLeadInput {
  company_name?: string;
  contact_name?: string;
  email: string;
  phone?: string;
  language: LeadLanguage;
  source: string;
  nb_users_estimate?: string;
  message?: string;
}

export function useLeads(statusFilter?: LeadStatus) {
  return useQuery({
    queryKey: ['leads', statusFilter],
    queryFn: async () => {
      let query = supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (statusFilter) {
        query = query.eq('status', statusFilter);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data as Lead[];
    },
  });
}

export function useLead(id: string) {
  return useQuery({
    queryKey: ['leads', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .eq('id', id)
        .maybeSingle();
      
      if (error) throw error;
      return data as Lead | null;
    },
    enabled: !!id,
  });
}

export function useCreateLead() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateLeadInput) => {
      // 1. Sauvegarde dans Supabase
      const { data, error } = await supabase
        .from('leads')
        .insert({
          company_name: input.company_name || null,
          contact_name: input.contact_name || null,
          email: input.email,
          phone: input.phone || null,
          language: input.language,
          source: input.source,
          nb_users_estimate: input.nb_users_estimate || null,
          message: input.message || null,
          status: 'new',
        })
        .select()
        .single();
      
      if (error) throw error;

      // 2. Envoi vers n8n (en parallèle, non-bloquant)
      // Détermine le type de lead basé sur la source
      const leadType: LeadType = input.source.includes('audit') ? 'audit' 
        : input.source.includes('expert') ? 'expert' 
        : 'contact';

      sendLead({
        type: leadType,
        source: input.source,
        name: input.contact_name,
        email: input.email,
        phone: input.phone,
        company: input.company_name,
        message: input.message,
        nb_users_estimate: input.nb_users_estimate,
        language: input.language,
      }).catch(err => {
        // Log silencieux - ne bloque pas l'UX
        console.warn('[useCreateLead] Erreur n8n (non-bloquante):', err);
      });

      return data as Lead;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
    },
    onError: (error) => {
      console.error('Error creating lead:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi du formulaire.",
        variant: "destructive",
      });
    },
  });
}

export function useUpdateLeadStatus() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: LeadStatus }) => {
      const { data, error } = await supabase
        .from('leads')
        .update({ status })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data as Lead;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      toast({
        title: "Statut mis à jour",
        description: "Le statut du lead a été mis à jour avec succès.",
      });
    },
    onError: (error) => {
      console.error('Error updating lead status:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour.",
        variant: "destructive",
      });
    },
  });
}

export function useUpdateLeadNotes() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, notes }: { id: string; notes: string }) => {
      const { data, error } = await supabase
        .from('leads')
        .update({ notes })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data as Lead;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      toast({
        title: "Notes sauvegardées",
        description: "Les notes ont été enregistrées avec succès.",
      });
    },
    onError: (error) => {
      console.error('Error updating lead notes:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la sauvegarde.",
        variant: "destructive",
      });
    },
  });
}

export function useUpdateLeadAISuggestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ai_suggestion }: { id: string; ai_suggestion: string }) => {
      const { data, error } = await supabase
        .from('leads')
        .update({ ai_suggestion })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data as Lead;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
    },
  });
}

export function useGenerateLeadReply() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (lead: Lead) => {
      const { data, error } = await supabase.functions.invoke('generate-lead-reply', {
        body: { lead },
      });
      
      if (error) throw error;
      if (data.error) throw new Error(data.error);
      
      return data.reply as string;
    },
    onError: (error) => {
      console.error('Error generating reply:', error);
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Impossible de générer la réponse.",
        variant: "destructive",
      });
    },
  });
}
