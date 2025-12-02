/**
 * Edge Function: send-lead-notification
 * 
 * Envoie un email de notification à info@tekio.be lorsqu'un nouveau lead est créé.
 * Utilise l'API Resend pour l'envoi d'emails.
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface LeadNotificationRequest {
  contact_name: string | null;
  email: string;
  company_name: string | null;
  phone: string | null;
  message: string | null;
  source: string;
  language: string;
  nb_users_estimate: string | null;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!RESEND_API_KEY) {
      console.error("[send-lead-notification] RESEND_API_KEY non configurée");
      throw new Error("RESEND_API_KEY is not configured");
    }

    const lead: LeadNotificationRequest = await req.json();
    
    console.log("[send-lead-notification] Nouveau lead reçu:", lead.email, "source:", lead.source);

    // Construire le contenu de l'email
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #1a365d 0%, #2563eb 100%); padding: 30px; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">🎯 Nouveau Lead Tekio</h1>
          <p style="color: rgba(255,255,255,0.8); margin: 10px 0 0 0;">Un prospect vient de remplir un formulaire sur tekio.be</p>
        </div>
        
        <div style="background: #f8fafc; padding: 30px; border: 1px solid #e2e8f0; border-top: none;">
          <h2 style="color: #1e40af; margin-top: 0; font-size: 18px;">📋 Informations du contact</h2>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #64748b; width: 140px;">Nom</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${lead.contact_name || 'Non renseigné'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #64748b;">Email</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;"><a href="mailto:${lead.email}" style="color: #2563eb;">${lead.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #64748b;">Entreprise</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${lead.company_name || 'Non renseigné'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #64748b;">Téléphone</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${lead.phone || 'Non renseigné'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #64748b;">Nb employés</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${lead.nb_users_estimate || 'Non renseigné'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #64748b;">Source</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;"><span style="background: #dbeafe; color: #1e40af; padding: 4px 8px; border-radius: 4px; font-size: 12px;">${lead.source}</span></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #64748b;">Langue</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${lead.language}</td>
            </tr>
          </table>
          
          ${lead.message ? `
            <h3 style="color: #1e40af; margin-top: 25px; font-size: 16px;">💬 Message</h3>
            <div style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 15px; color: #374151;">
              ${lead.message}
            </div>
          ` : ''}
        </div>
        
        <div style="background: #1e293b; padding: 20px; border-radius: 0 0 10px 10px; text-align: center;">
          <p style="color: #94a3b8; margin: 0; font-size: 12px;">
            Cette notification a été envoyée automatiquement par Tekio
          </p>
        </div>
      </div>
    `;

    // Envoyer l'email via l'API Resend
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Tekio Leads <onboarding@resend.dev>", // Changer vers notifications@tekio.be après vérification du domaine
        to: ["info@tekio.be"],
        subject: `🎯 Nouveau lead: ${lead.contact_name || lead.email} - ${lead.company_name || 'Particulier'}`,
        html: emailHtml,
      }),
    });

    const emailData = await emailResponse.json();

    if (!emailResponse.ok) {
      console.error("[send-lead-notification] Erreur Resend:", emailData);
      throw new Error(emailData.message || "Failed to send email");
    }

    console.log("[send-lead-notification] Email envoyé avec succès:", emailData);

    return new Response(JSON.stringify({ success: true, emailData }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("[send-lead-notification] Erreur:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
