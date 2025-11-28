import { Zap, Shield, Bot } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const WhyTekioSection = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Zap,
      titleKey: 'why.support.title',
      descKey: 'why.support.desc',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      icon: Shield,
      titleKey: 'why.security.title',
      descKey: 'why.security.desc',
      color: 'text-tekio-navy',
      bgColor: 'bg-tekio-navy/10',
    },
    {
      icon: Bot,
      titleKey: 'why.automation.title',
      descKey: 'why.automation.desc',
      color: 'text-tekio-lime',
      bgColor: 'bg-tekio-lime/10',
    },
  ];

  return (
    <section className="tekio-section bg-background">
      <div className="tekio-container">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="tekio-heading-2 text-foreground mb-4">{t('why.title')}</h2>
          <p className="tekio-body max-w-2xl mx-auto">{t('why.subtitle')}</p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.titleKey}
              className="tekio-card group text-center"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${feature.bgColor} mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`h-8 w-8 ${feature.color}`} />
              </div>
              <h3 className="tekio-heading-3 text-foreground mb-3">{t(feature.titleKey)}</h3>
              <p className="text-muted-foreground">{t(feature.descKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyTekioSection;
