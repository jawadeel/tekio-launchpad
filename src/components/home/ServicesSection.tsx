import { Link } from 'react-router-dom';
import { Headphones, Cloud, Lock, Phone, FolderKanban, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

const ServicesSection = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: Headphones,
      titleKey: 'services.support.title',
      descKey: 'services.support.desc',
    },
    {
      icon: Cloud,
      titleKey: 'services.cloud.title',
      descKey: 'services.cloud.desc',
    },
    {
      icon: Lock,
      titleKey: 'services.security.title',
      descKey: 'services.security.desc',
    },
    {
      icon: Phone,
      titleKey: 'services.telecom.title',
      descKey: 'services.telecom.desc',
    },
    {
      icon: FolderKanban,
      titleKey: 'services.projects.title',
      descKey: 'services.projects.desc',
    },
  ];

  return (
    <section className="tekio-section bg-secondary">
      <div className="tekio-container">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="tekio-heading-2 text-foreground mb-4">{t('services.title')}</h2>
          <p className="tekio-body max-w-2xl mx-auto">{t('services.subtitle')}</p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={service.titleKey}
              className="tekio-card group flex flex-col"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">{t(service.titleKey)}</h3>
              </div>
              <p className="text-muted-foreground text-sm flex-1">{t(service.descKey)}</p>
            </div>
          ))}

          {/* CTA Card */}
          <div className="tekio-card bg-primary text-primary-foreground flex flex-col justify-center items-center text-center">
            <p className="text-lg font-medium mb-4">Découvrez tous nos services</p>
            <Link to="/services">
              <Button variant="heroOutline" size="sm">
                En savoir plus
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
