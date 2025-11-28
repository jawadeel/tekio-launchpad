import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const PricingSection = () => {
  const { t } = useLanguage();

  const plans = [
    {
      name: t('pricing.bronze.name'),
      price: t('pricing.bronze.price'),
      features: [
        'pricing.feature.support',
        'pricing.feature.monitoring',
        'pricing.feature.backup',
      ],
      popular: false,
    },
    {
      name: t('pricing.silver.name'),
      price: t('pricing.silver.price'),
      features: [
        'pricing.feature.support',
        'pricing.feature.monitoring',
        'pricing.feature.backup',
        'pricing.feature.security',
        'pricing.feature.m365',
      ],
      popular: true,
    },
    {
      name: t('pricing.gold.name'),
      price: t('pricing.gold.price'),
      features: [
        'pricing.feature.support',
        'pricing.feature.monitoring',
        'pricing.feature.backup',
        'pricing.feature.security',
        'pricing.feature.m365',
        'pricing.feature.voip',
        'pricing.feature.ai',
        'pricing.feature.dedicated',
      ],
      popular: false,
    },
  ];

  return (
    <section className="tekio-section bg-secondary">
      <div className="tekio-container">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="tekio-heading-2 text-foreground mb-4">{t('pricing.title')}</h2>
          <p className="tekio-body max-w-2xl mx-auto">{t('pricing.subtitle')}</p>
          <p className="mt-4 text-sm text-tekio-lime font-medium">{t('pricing.setup')}</p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative tekio-card flex flex-col ${
                plan.popular
                  ? 'border-primary shadow-tekio-hover scale-105 md:scale-110'
                  : ''
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-semibold px-4 py-1.5 rounded-full">
                  {t('pricing.popular')}
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground text-sm">{t('pricing.per.user')}</span>
                </div>
              </div>

              <ul className="space-y-3 flex-1 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-tekio-lime/20 flex items-center justify-center">
                      <Check className="h-3 w-3 text-tekio-lime" />
                    </div>
                    <span className="text-sm text-muted-foreground">{t(feature)}</span>
                  </li>
                ))}
              </ul>

              <Link to="/contact" className="mt-auto">
                <Button
                  variant={plan.popular ? 'cta' : 'outline'}
                  className="w-full"
                >
                  {t('pricing.cta')}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
