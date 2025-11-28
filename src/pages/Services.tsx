import { Link } from 'react-router-dom';
import { Headphones, Cloud, Lock, Phone, FolderKanban, ArrowRight } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const Services = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: Headphones,
      titleKey: 'services.support.title',
      descKey: 'services.support.desc',
      details: [
        'Réponse en moins de 15 minutes',
        'Support multicanal (téléphone, email, chat)',
        'Base de connaissances accessible 24/7',
        'Suivi des tickets en temps réel',
      ],
    },
    {
      icon: Cloud,
      titleKey: 'services.cloud.title',
      descKey: 'services.cloud.desc',
      details: [
        'Migration Office 365 complète',
        'Configuration et optimisation',
        'Formation des utilisateurs',
        'Gestion des licences',
      ],
    },
    {
      icon: Lock,
      titleKey: 'services.security.title',
      descKey: 'services.security.desc',
      details: [
        'Antivirus et anti-malware managé',
        'Backup automatisé cloud',
        'Test de récupération mensuel',
        'Monitoring des menaces 24/7',
      ],
    },
    {
      icon: Phone,
      titleKey: 'services.telecom.title',
      descKey: 'services.telecom.desc',
      details: [
        'Téléphonie VoIP professionnelle',
        'Intégration Teams / Microsoft',
        'Numéros locaux et internationaux',
        'Portabilité garantie',
      ],
    },
    {
      icon: FolderKanban,
      titleKey: 'services.projects.title',
      descKey: 'services.projects.desc',
      details: [
        'Migration infrastructure complète',
        'Déploiement de nouveaux sites',
        'Audit et conseil technique',
        'Gestion de projet dédiée',
      ],
    },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-accent py-20 md:py-28">
        <div className="tekio-container">
          <div className="max-w-3xl">
            <h1 className="tekio-heading-1 text-accent-foreground mb-6">
              {t('services.title')}
            </h1>
            <p className="text-lg md:text-xl text-accent-foreground/70">
              {t('services.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Services Detail */}
      <section className="tekio-section bg-background">
        <div className="tekio-container">
          <div className="space-y-8">
            {services.map((service, index) => (
              <div
                key={service.titleKey}
                className={`grid md:grid-cols-2 gap-8 items-center p-8 rounded-2xl ${
                  index % 2 === 0 ? 'bg-secondary' : 'bg-background'
                }`}
              >
                <div className={index % 2 !== 0 ? 'md:order-2' : ''}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10">
                      <service.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h2 className="tekio-heading-3 text-foreground">{t(service.titleKey)}</h2>
                  </div>
                  <p className="text-muted-foreground mb-6">{t(service.descKey)}</p>
                  <ul className="space-y-3">
                    {service.details.map((detail, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`aspect-video bg-gradient-to-br from-primary/10 to-tekio-sky/10 rounded-xl flex items-center justify-center ${
                  index % 2 !== 0 ? 'md:order-1' : ''
                }`}>
                  <service.icon className="h-24 w-24 text-primary/30" />
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <Link to="/audit">
              <Button variant="cta" size="xl">
                {t('hero.cta1')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
