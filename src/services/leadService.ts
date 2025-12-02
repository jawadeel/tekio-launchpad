/**
 * Lead Service - Service d'envoi de leads vers n8n
 * 
 * Ce service centralise tous les envois de leads vers le webhook n8n.
 * n8n se charge ensuite de créer le lead dans HubSpot et d'envoyer un email.
 * 
 * Configuration requise dans .env:
 * VITE_N8N_LEAD_WEBHOOK_URL=https://votre-instance-n8n.com/webhook/xxx
 */

export type LeadType = 'audit' | 'expert' | 'contact';

export interface LeadPayload {
  type: LeadType;
  source: string;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  company?: string | null;
  message?: string | null;
  nb_users_estimate?: string | null;
  language?: string;
}

interface N8nPayload extends LeadPayload {
  website: string;
  timestamp: string;
}

// URL du webhook n8n - doit être définie dans .env
const webhookUrl = import.meta.env.VITE_N8N_LEAD_WEBHOOK_URL as string | undefined;

/**
 * Envoie un lead vers le webhook n8n
 * 
 * @param payload - Les données du lead à envoyer
 * @returns Promise<void>
 * @throws Error si l'URL n'est pas configurée ou si l'envoi échoue
 */
export async function sendLead(payload: LeadPayload): Promise<void> {
  // Vérification de la configuration
  if (!webhookUrl) {
    console.warn(
      '[LeadService] VITE_N8N_LEAD_WEBHOOK_URL n\'est pas définie. ' +
      'Les leads ne seront pas envoyés vers n8n. ' +
      'Configurez cette variable dans votre fichier .env'
    );
    // On ne throw pas d'erreur pour ne pas bloquer l'UX si n8n n'est pas configuré
    // Le lead sera quand même sauvegardé dans Supabase
    return;
  }

  const n8nPayload: N8nPayload = {
    ...payload,
    website: 'tekio.be',
    timestamp: new Date().toISOString(),
  };

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(n8nPayload),
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status} ${response.statusText}`);
    }

    console.log('[LeadService] Lead envoyé avec succès vers n8n:', payload.type, payload.source);
  } catch (error) {
    console.error('[LeadService] Erreur lors de l\'envoi du lead vers n8n:', error);
    // On ne re-throw pas pour ne pas bloquer l'UX - le lead est déjà dans Supabase
  }
}

/**
 * Envoie un lead de type "audit" (demande d'audit gratuit)
 */
export async function sendAuditLead(source: string, data?: Partial<LeadPayload>): Promise<void> {
  return sendLead({
    type: 'audit',
    source,
    message: data?.message || 'Audit gratuit demandé depuis le CTA',
    ...data,
  });
}

/**
 * Envoie un lead de type "expert" (parler à un expert)
 */
export async function sendExpertLead(source: string, data?: Partial<LeadPayload>): Promise<void> {
  return sendLead({
    type: 'expert',
    source,
    message: data?.message || 'Demande pour parler à un expert Tekio',
    ...data,
  });
}

/**
 * Envoie un lead de type "contact" (formulaire de contact)
 */
export async function sendContactLead(source: string, data: Partial<LeadPayload>): Promise<void> {
  return sendLead({
    type: 'contact',
    source,
    ...data,
  });
}
