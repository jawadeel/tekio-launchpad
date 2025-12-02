import { useState } from 'react';
import { MapPin, Mail, Phone, Send } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { useCreateLead, LeadLanguage } from '@/hooks/useLeads';

const Contact = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const createLead = useCreateLead();
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    const message = formData.get('message') as string;

    try {
      await createLead.mutateAsync({
        contact_name: name,
        email,
        company_name: company || undefined,
        message,
        language: languageMap[language],
        source: 'contact_page',
      });
      
      toast({
        title: t('contact.toast.success.title'),
        description: t('contact.toast.success.desc'),
      });
      
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      // Error is handled in the hook
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-accent py-20 md:py-28">
        <div className="tekio-container">
          <div className="max-w-3xl">
            <h1 className="tekio-heading-1 text-accent-foreground mb-6">
              {t('contact.title')}
            </h1>
            <p className="text-lg md:text-xl text-accent-foreground/70">
              {t('contact.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="tekio-section bg-background">
        <div className="tekio-container">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Form */}
            <div className="tekio-card">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    {t('contact.name')} *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder={t('contact.form.placeholder.name')}
                    className="h-12"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    {t('contact.email')} *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder={t('contact.form.placeholder.email')}
                    className="h-12"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                    {t('contact.company')}
                  </label>
                  <Input
                    id="company"
                    name="company"
                    type="text"
                    placeholder={t('contact.form.placeholder.company')}
                    className="h-12"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    {t('contact.message')} *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder={t('contact.form.placeholder.message')}
                    className="resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  variant="cta"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    t('contact.form.submit.sending')
                  ) : (
                    <>
                      {t('contact.send')}
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="tekio-heading-3 text-foreground mb-8">{t('contact.info.title')}</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">{t('contact.info.address.label')}</h4>
                    <p className="text-muted-foreground">
                      {t('contact.info.address')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">{t('contact.info.email.label')}</h4>
                    <a href="mailto:info@tekio.be" className="text-primary hover:underline">
                      info@tekio.be
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">{t('contact.info.phone.label')}</h4>
                    <a href="tel:+3225551234" className="text-primary hover:underline">
                      +32 2 555 12 34
                    </a>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="mt-8 aspect-video bg-secondary rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-muted-foreground/50 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Brussels, Belgium</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
