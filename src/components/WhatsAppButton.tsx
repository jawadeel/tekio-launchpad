/**
 * Bouton flottant WhatsApp
 * 
 * Ce composant affiche un bouton flottant en bas à droite de l'écran
 * qui ouvre une conversation WhatsApp avec Tekio.
 * 
 * Numéro WhatsApp Business: +32 470 97 29 21
 */

import { MessageCircle } from 'lucide-react';

const WHATSAPP_NUMBER = '32470972921';
const WHATSAPP_MESSAGE = encodeURIComponent(
  'Bonjour Tekio, je souhaite parler avec un expert MSP pour un audit gratuit de mon environnement IT.'
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

const WhatsAppButton = () => {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#20bd5a] hover:scale-110 transition-all duration-200 group"
      aria-label="Contacter sur WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
      
      {/* Tooltip on hover */}
      <span className="absolute right-full mr-3 px-3 py-2 bg-foreground text-background text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Parler sur WhatsApp
      </span>
      
      {/* Pulse animation */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />
    </a>
  );
};

export default WhatsAppButton;
