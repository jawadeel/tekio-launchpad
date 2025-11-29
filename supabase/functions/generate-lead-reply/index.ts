import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { lead } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Generating reply for lead:", lead.id);

    const languageMap: Record<string, string> = {
      FR: 'French',
      NL: 'Dutch',
      EN: 'English',
    };

    const language = languageMap[lead.language] || 'French';

    const systemPrompt = `You are a sales assistant for Tekio, a modern MSP (Managed Service Provider) for micro SMEs in Belgium.
Your role is to help prepare professional and personalized email responses to potential leads.

Tekio offers three plans:
- Bronze (€29/user/month): Helpdesk support, Monitoring, Cloud backup
- Silver (€49/user/month): All Bronze features + Advanced security + Microsoft 365 management (Most popular)
- Gold (€79/user/month): All Silver features + VoIP included + AI & automation + Dedicated engineer

Our key selling points:
- Response time under 15 minutes
- 24/7 security monitoring
- AI-powered automation
- Free IT audit for new prospects

Always be polite, professional, and concise. Focus on the value we bring to small businesses.`;

    const userPrompt = `Based on the following lead information, please:
1. Provide a brief 2-3 line summary of the lead
2. Recommend one of our plans (Bronze, Silver, or Gold) with a short explanation of why it fits their needs
3. Draft a polite, concise email reply in ${language} suggesting a short call and mentioning our free IT audit

Lead Information:
- Company: ${lead.company_name || 'Not provided'}
- Contact: ${lead.contact_name || 'Not provided'}
- Email: ${lead.email}
- Phone: ${lead.phone || 'Not provided'}
- Number of users estimate: ${lead.nb_users_estimate || 'Not provided'}
- Source: ${lead.source}
- Message: ${lead.message || 'No message provided'}
- Language preference: ${lead.language}

Please format your response clearly with sections for Summary, Recommended Plan, and Email Draft.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits to continue." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const generatedReply = data.choices?.[0]?.message?.content;

    console.log("Successfully generated reply for lead:", lead.id);

    return new Response(JSON.stringify({ reply: generatedReply }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error generating lead reply:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
