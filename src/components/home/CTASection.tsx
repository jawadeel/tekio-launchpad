import { useState } from 'react';
import { ArrowRight, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { useCreateLead, LeadLanguage } from '@/hooks/useLeads';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const CTASection = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const createLead = useCreateLead();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);

  const languageMap: Record<string, LeadLanguage> = {
    fr: 'FR',
    nl: 'NL',
    en: 'EN',
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const company = formData.get('company') as string;

    try {
      await createLead.mutateAsync({
        contact_name: name,
        email,
        company_name: company || undefined,
        language: languageMap[language],
        source: 'home',
      });
      
      toast({
        title: language === 'fr' ? "Demande envoyée !" :
               language === 'nl' ? "Aanvraag verzonden!" :
               "Request sent!",
        description: language === 'fr' ? "Nous vous contacterons sous 24h." :
                     language === 'nl' ? "We nemen binnen 24 uur contact met u op." :
                     "We will contact you within 24 hours.",
      });
      
      setOpen(false);
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      // Error is handled in the hook
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="tekio-section bg-accent relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-tekio-sky rounded-full blur-3xl" />
      </div>

      <div className="tekio-container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="tekio-heading-2 text-accent-foreground mb-4">
            {t('cta.title')}
          </h2>
          <p className="text-lg text-accent-foreground/70 mb-8">
            {t('cta.subtitle')}
          </p>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="hero" size="xl">
                {t('cta.button')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {language === 'fr' ? 'Demander un audit gratuit' :
                   language === 'nl' ? 'Vraag een gratis audit aan' :
                   'Request a free audit'}
                </DialogTitle>
                <DialogDescription>
                  {language === 'fr' ? 'Remplissez ce formulaire et nous vous contacterons sous 24h.' :
                   language === 'nl' ? 'Vul dit formulier in en we nemen binnen 24 uur contact met u op.' :
                   'Fill out this form and we will contact you within 24 hours.'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="cta-name" className="block text-sm font-medium text-foreground mb-1">
                    {language === 'fr' ? 'Nom *' : language === 'nl' ? 'Naam *' : 'Name *'}
                  </label>
                  <Input
                    id="cta-name"
                    name="name"
                    type="text"
                    required
                    placeholder={language === 'fr' ? 'Votre nom' : language === 'nl' ? 'Uw naam' : 'Your name'}
                  />
                </div>
                <div>
                  <label htmlFor="cta-email" className="block text-sm font-medium text-foreground mb-1">
                    Email *
                  </label>
                  <Input
                    id="cta-email"
                    name="email"
                    type="email"
                    required
                    placeholder="vous@entreprise.be"
                  />
                </div>
                <div>
                  <label htmlFor="cta-company" className="block text-sm font-medium text-foreground mb-1">
                    {language === 'fr' ? 'Entreprise' : language === 'nl' ? 'Bedrijf' : 'Company'}
                  </label>
                  <Input
                    id="cta-company"
                    name="company"
                    type="text"
                    placeholder={language === 'fr' ? 'Nom de votre entreprise' : language === 'nl' ? 'Uw bedrijfsnaam' : 'Your company name'}
                  />
                </div>
                <Button
                  type="submit"
                  variant="cta"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    language === 'fr' ? 'Envoi...' : language === 'nl' ? 'Verzenden...' : 'Sending...'
                  ) : (
                    <>
                      {language === 'fr' ? 'Envoyer' : language === 'nl' ? 'Verzenden' : 'Send'}
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
