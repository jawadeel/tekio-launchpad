import { useState } from 'react';
import { CheckCircle, Shield, Search, FileText, ArrowRight } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { useCreateLead, LeadLanguage } from '@/hooks/useLeads';

const Audit = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const createLead = useCreateLead();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const languageMap: Record<string, LeadLanguage> = {
    fr: 'FR',
    nl: 'NL',
    en: 'EN',
  };

  const benefits = [
    {
      icon: Search,
      text: t('audit.benefit1'),
    },
    {
      icon: Shield,
      text: t('audit.benefit2'),
    },
    {
      icon: CheckCircle,
      text: t('audit.benefit3'),
    },
    {
      icon: FileText,
      text: t('audit.benefit4'),
    },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const company = formData.get('company') as string;
    const phone = formData.get('phone') as string;
    const employees = formData.get('employees') as string;
    const needs = formData.get('needs') as string;

    try {
      await createLead.mutateAsync({
        contact_name: `${firstName} ${lastName}`.trim(),
        email,
        company_name: company,
        phone: phone || undefined,
        nb_users_estimate: employees || undefined,
        message: needs || undefined,
        language: languageMap[language],
        source: 'audit_page',
      });
      
      toast({
        title: language === 'fr' ? "Demande envoyée !" :
               language === 'nl' ? "Aanvraag verzonden!" :
               "Request sent!",
        description: language === 'fr' ? "Nous vous contacterons sous 24h pour planifier votre audit." :
                     language === 'nl' ? "We nemen binnen 24 uur contact met u op om uw audit te plannen." :
                     "We will contact you within 24h to schedule your audit.",
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
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-tekio-lime/20 text-tekio-lime px-4 py-2 rounded-full text-sm font-medium mb-6">
              <CheckCircle className="h-4 w-4" />
              100% Gratuit
            </div>
            <h1 className="tekio-heading-1 text-accent-foreground mb-6">
              {t('audit.title')}
            </h1>
            <p className="text-lg md:text-xl text-accent-foreground/70">
              {t('audit.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Audit Form */}
      <section className="tekio-section bg-background">
        <div className="tekio-container">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Benefits */}
            <div>
              <h2 className="tekio-heading-3 text-foreground mb-8">
                Ce que comprend notre audit
              </h2>
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="pt-2">
                      <p className="font-medium text-foreground">{benefit.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Process */}
              <div className="mt-12 p-6 bg-secondary rounded-xl">
                <h3 className="font-semibold text-foreground mb-4">Comment ça marche ?</h3>
                <ol className="space-y-3">
                  <li className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">1</span>
                    <span className="text-sm text-muted-foreground">Remplissez le formulaire</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">2</span>
                    <span className="text-sm text-muted-foreground">Nous planifions un appel de 30 min</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">3</span>
                    <span className="text-sm text-muted-foreground">Recevez votre rapport personnalisé</span>
                  </li>
                </ol>
              </div>
            </div>

            {/* Form */}
            <div className="tekio-card">
              <h2 className="tekio-heading-3 text-foreground mb-6">
                Demander mon audit gratuit
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">
                      Prénom *
                    </label>
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      placeholder="Jean"
                      className="h-11"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-2">
                      Nom *
                    </label>
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      placeholder="Dupont"
                      className="h-11"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email professionnel *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="jean@entreprise.be"
                    className="h-11"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                    Entreprise *
                  </label>
                  <Input
                    id="company"
                    name="company"
                    type="text"
                    required
                    placeholder="Nom de votre entreprise"
                    className="h-11"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                    Téléphone
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+32 XXX XX XX XX"
                    className="h-11"
                  />
                </div>

                <div>
                  <label htmlFor="employees" className="block text-sm font-medium text-foreground mb-2">
                    Nombre d'employés
                  </label>
                  <select
                    id="employees"
                    name="employees"
                    className="w-full h-11 px-3 rounded-lg border border-input bg-background text-sm"
                  >
                    <option value="">Sélectionnez</option>
                    <option value="1-5">1-5</option>
                    <option value="6-10">6-10</option>
                    <option value="11-25">11-25</option>
                    <option value="26-50">26-50</option>
                    <option value="50+">50+</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="needs" className="block text-sm font-medium text-foreground mb-2">
                    Vos besoins principaux
                  </label>
                  <Textarea
                    id="needs"
                    name="needs"
                    rows={3}
                    placeholder="Décrivez brièvement votre situation IT actuelle..."
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
                    'Envoi en cours...'
                  ) : (
                    <>
                      {t('audit.cta')}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  En soumettant ce formulaire, vous acceptez d'être contacté par Tekio.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Audit;
