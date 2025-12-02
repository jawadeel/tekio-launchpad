import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, X, Send } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { useCreateLead, LeadLanguage } from '@/hooks/useLeads';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const Pricing = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const createLead = useCreateLead();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showContactDialog, setShowContactDialog] = useState(false);

  const languageMap: Record<string, LeadLanguage> = {
    fr: 'FR',
    nl: 'NL',
    en: 'EN',
  };

  const plans = [
    {
      name: t('pricing.bronze.name'),
      price: t('pricing.bronze.price'),
      description: t('pricing.plan.bronze.desc'),
      features: [
        { name: 'pricing.feature.support', included: true },
        { name: 'pricing.feature.monitoring', included: true },
        { name: 'pricing.feature.backup', included: true },
        { name: 'pricing.feature.security', included: false },
        { name: 'pricing.feature.m365', included: false },
        { name: 'pricing.feature.voip', included: false },
        { name: 'pricing.feature.ai', included: false },
        { name: 'pricing.feature.dedicated', included: false },
      ],
      popular: false,
    },
    {
      name: t('pricing.silver.name'),
      price: t('pricing.silver.price'),
      description: t('pricing.plan.silver.desc'),
      features: [
        { name: 'pricing.feature.support', included: true },
        { name: 'pricing.feature.monitoring', included: true },
        { name: 'pricing.feature.backup', included: true },
        { name: 'pricing.feature.security', included: true },
        { name: 'pricing.feature.m365', included: true },
        { name: 'pricing.feature.voip', included: false },
        { name: 'pricing.feature.ai', included: false },
        { name: 'pricing.feature.dedicated', included: false },
      ],
      popular: true,
    },
    {
      name: t('pricing.gold.name'),
      price: t('pricing.gold.price'),
      description: t('pricing.plan.gold.desc'),
      features: [
        { name: 'pricing.feature.support', included: true },
        { name: 'pricing.feature.monitoring', included: true },
        { name: 'pricing.feature.backup', included: true },
        { name: 'pricing.feature.security', included: true },
        { name: 'pricing.feature.m365', included: true },
        { name: 'pricing.feature.voip', included: true },
        { name: 'pricing.feature.ai', included: true },
        { name: 'pricing.feature.dedicated', included: true },
      ],
      popular: false,
    },
  ];

  const handlePlanClick = (planName: string) => {
    setSelectedPlan(planName);
    setShowContactDialog(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const company = formData.get('company') as string;
    const employees = formData.get('employees') as string;
    const message = formData.get('message') as string;

    try {
      await createLead.mutateAsync({
        contact_name: name,
        email,
        company_name: company || undefined,
        nb_users_estimate: employees || undefined,
        message: `${t('pricing.interest.prefix')} ${selectedPlan}\n\n${message || ''}`.trim(),
        language: languageMap[language],
        source: 'pricing_page',
      });
      
      toast({
        title: t('pricing.toast.success.title'),
        description: t('pricing.toast.success.desc'),
      });
      
      setShowContactDialog(false);
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
            <h1 className="tekio-heading-1 text-accent-foreground mb-6">
              {t('pricing.title')}
            </h1>
            <p className="text-lg md:text-xl text-accent-foreground/70">
              {t('pricing.subtitle')}
            </p>
            <div className="mt-6 inline-flex items-center gap-2 bg-tekio-lime/20 text-tekio-lime px-4 py-2 rounded-full text-sm font-medium">
              <Check className="h-4 w-4" />
              {t('pricing.setup')}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Table */}
      <section className="tekio-section bg-background">
        <div className="tekio-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative tekio-card flex flex-col ${
                  plan.popular
                    ? 'border-2 border-primary shadow-tekio-hover scale-105'
                    : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-semibold px-4 py-1.5 rounded-full">
                    {t('pricing.popular')}
                  </div>
                )}

                <div className="text-center mb-8 pb-8 border-b border-border">
                  <h3 className="text-2xl font-semibold text-foreground mb-2">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-5xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground">{t('pricing.per.user')}</span>
                  </div>
                </div>

                <ul className="space-y-4 flex-1 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature.name} className="flex items-center gap-3">
                      {feature.included ? (
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-tekio-lime/20 flex items-center justify-center">
                          <Check className="h-3 w-3 text-tekio-lime" />
                        </div>
                      ) : (
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-muted flex items-center justify-center">
                          <X className="h-3 w-3 text-muted-foreground" />
                        </div>
                      )}
                      <span className={`text-sm ${feature.included ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {t(feature.name)}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.popular ? 'cta' : 'outline'}
                  className="w-full mt-auto"
                  size="lg"
                  onClick={() => handlePlanClick(plan.name)}
                >
                  {t('pricing.cta')}
                </Button>
              </div>
            ))}
          </div>

          {/* FAQ or additional info */}
          <div className="mt-20 max-w-3xl mx-auto text-center">
            <h3 className="tekio-heading-3 text-foreground mb-4">{t('pricing.questions.title')}</h3>
            <p className="text-muted-foreground mb-6">
              {t('pricing.questions.desc')}
            </p>
            <Link to="/contact">
              <Button variant="outline" size="lg">
                {t('hero.cta2')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Dialog */}
      <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Demander un devis - {selectedPlan}</DialogTitle>
            <DialogDescription>
              Remplissez ce formulaire et nous vous contacterons avec une offre personnalisée.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="dialog-name" className="block text-sm font-medium text-foreground mb-1">
                Nom *
              </label>
              <Input
                id="dialog-name"
                name="name"
                type="text"
                required
                placeholder="Votre nom"
              />
            </div>
            <div>
              <label htmlFor="dialog-email" className="block text-sm font-medium text-foreground mb-1">
                Email *
              </label>
              <Input
                id="dialog-email"
                name="email"
                type="email"
                required
                placeholder="vous@entreprise.be"
              />
            </div>
            <div>
              <label htmlFor="dialog-company" className="block text-sm font-medium text-foreground mb-1">
                Entreprise
              </label>
              <Input
                id="dialog-company"
                name="company"
                type="text"
                placeholder="Nom de votre entreprise"
              />
            </div>
            <div>
              <label htmlFor="dialog-employees" className="block text-sm font-medium text-foreground mb-1">
                Nombre d'utilisateurs
              </label>
              <select
                id="dialog-employees"
                name="employees"
                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
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
              <label htmlFor="dialog-message" className="block text-sm font-medium text-foreground mb-1">
                Message (optionnel)
              </label>
              <Textarea
                id="dialog-message"
                name="message"
                rows={3}
                placeholder="Des besoins spécifiques ?"
                className="resize-none"
              />
            </div>
            <Button
              type="submit"
              variant="cta"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                'Envoi...'
              ) : (
                <>
                  Envoyer ma demande
                  <Send className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Pricing;
