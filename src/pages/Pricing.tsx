import { Link } from 'react-router-dom';
import { Check, X } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const Pricing = () => {
  const { t } = useLanguage();

  const plans = [
    {
      name: t('pricing.bronze.name'),
      price: t('pricing.bronze.price'),
      description: 'Pour les petites équipes qui démarrent',
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
      description: 'L\'équilibre parfait pour les PME',
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
      description: 'Service premium tout inclus',
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

                <Link to="/contact" className="mt-auto">
                  <Button
                    variant={plan.popular ? 'cta' : 'outline'}
                    className="w-full"
                    size="lg"
                  >
                    {t('pricing.cta')}
                  </Button>
                </Link>
              </div>
            ))}
          </div>

          {/* FAQ or additional info */}
          <div className="mt-20 max-w-3xl mx-auto text-center">
            <h3 className="tekio-heading-3 text-foreground mb-4">Des questions sur nos offres ?</h3>
            <p className="text-muted-foreground mb-6">
              Chaque entreprise est unique. Contactez-nous pour une offre personnalisée adaptée à vos besoins.
            </p>
            <Link to="/contact">
              <Button variant="outline" size="lg">
                {t('hero.cta2')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Pricing;
