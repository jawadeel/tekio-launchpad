import { Sparkles, Cog, LayoutDashboard, FileText } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const TechnologySection = () => {
  const { t } = useLanguage();

  const technologies = [
    {
      icon: Sparkles,
      titleKey: 'tech.ai.title',
      descKey: 'tech.ai.desc',
      gradient: 'from-tekio-lime/20 to-tekio-lime/5',
    },
    {
      icon: Cog,
      titleKey: 'tech.automation.title',
      descKey: 'tech.automation.desc',
      gradient: 'from-primary/20 to-primary/5',
    },
    {
      icon: LayoutDashboard,
      titleKey: 'tech.dashboard.title',
      descKey: 'tech.dashboard.desc',
      gradient: 'from-tekio-sky/20 to-tekio-sky/5',
    },
    {
      icon: FileText,
      titleKey: 'tech.reporting.title',
      descKey: 'tech.reporting.desc',
      gradient: 'from-tekio-navy/20 to-tekio-navy/5',
    },
  ];

  return (
    <section className="tekio-section bg-background">
      <div className="tekio-container">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="tekio-heading-2 text-foreground mb-4">{t('tech.title')}</h2>
          <p className="tekio-body max-w-2xl mx-auto">{t('tech.subtitle')}</p>
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {technologies.map((tech, index) => (
            <div
              key={tech.titleKey}
              className={`relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br ${tech.gradient} border border-border hover:shadow-tekio-hover transition-all duration-300 group`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative z-10">
                <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-card shadow-sm group-hover:scale-110 transition-transform">
                  <tech.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{t(tech.titleKey)}</h3>
                <p className="text-sm text-muted-foreground">{t(tech.descKey)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;
