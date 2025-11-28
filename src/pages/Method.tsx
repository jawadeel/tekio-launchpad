import { Link } from 'react-router-dom';
import { BookOpen, Cog, Brain, BarChart3, ArrowRight } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const Method = () => {
  const { t } = useLanguage();

  const methods = [
    {
      icon: BookOpen,
      titleKey: 'method.itil.title',
      descKey: 'method.itil.desc',
      color: 'from-primary/20 to-primary/5',
      details: 'Gestion des incidents, des changements et des problèmes selon les standards internationaux.',
    },
    {
      icon: Cog,
      titleKey: 'method.automation.title',
      descKey: 'method.automation.desc',
      color: 'from-tekio-sky/20 to-tekio-sky/5',
      details: 'Scripts automatisés, déploiements sans intervention, maintenance préventive.',
    },
    {
      icon: Brain,
      titleKey: 'method.ai.title',
      descKey: 'method.ai.desc',
      color: 'from-tekio-lime/20 to-tekio-lime/5',
      details: 'Analyse prédictive, résolution automatique des incidents récurrents, chatbot intelligent.',
    },
    {
      icon: BarChart3,
      titleKey: 'method.reporting.title',
      descKey: 'method.reporting.desc',
      color: 'from-tekio-navy/20 to-tekio-navy/5',
      details: 'Dashboards en temps réel, rapports mensuels détaillés, KPIs personnalisés.',
    },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-accent py-20 md:py-28">
        <div className="tekio-container">
          <div className="max-w-3xl">
            <h1 className="tekio-heading-1 text-accent-foreground mb-6">
              {t('method.title')}
            </h1>
            <p className="text-lg md:text-xl text-accent-foreground/70">
              {t('method.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Method Cards */}
      <section className="tekio-section bg-background">
        <div className="tekio-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {methods.map((method, index) => (
              <div
                key={method.titleKey}
                className={`relative overflow-hidden rounded-2xl p-8 bg-gradient-to-br ${method.color} border border-border`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-card shadow-sm flex items-center justify-center">
                    <method.icon className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="tekio-heading-3 text-foreground mb-2">{t(method.titleKey)}</h3>
                    <p className="text-muted-foreground mb-4">{t(method.descKey)}</p>
                    <p className="text-sm text-foreground/80">{method.details}</p>
                  </div>
                </div>

                {/* Decorative number */}
                <span className="absolute bottom-4 right-6 text-8xl font-bold text-foreground/5">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
            ))}
          </div>

          {/* AI Section Highlight */}
          <div className="mt-16 bg-gradient-to-br from-accent to-accent/80 rounded-2xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-tekio-lime/20 text-tekio-lime px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Brain className="h-4 w-4" />
                Intelligence Artificielle
              </div>
              <h2 className="tekio-heading-2 text-accent-foreground mb-4">
                L'IA au service de votre productivité
              </h2>
              <p className="text-accent-foreground/70 mb-8">
                Notre plateforme intègre des capacités d'intelligence artificielle pour anticiper les problèmes, 
                automatiser les tâches répétitives et vous offrir un support toujours plus rapide et pertinent.
              </p>
              <Link to="/audit">
                <Button variant="hero" size="lg">
                  Découvrir nos capacités IA
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Method;
