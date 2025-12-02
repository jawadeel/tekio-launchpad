import { Link } from 'react-router-dom';
import { Target, Eye, ArrowRight } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import founderImage from '@/assets/founder.jpg';

const About = () => {
  const { t } = useLanguage();

  const values = [
    { key: 'about.values.simple', icon: '✓', color: 'bg-primary/10 text-primary' },
    { key: 'about.values.clear', icon: '◯', color: 'bg-tekio-sky/10 text-tekio-sky' },
    { key: 'about.values.efficient', icon: '⚡', color: 'bg-tekio-lime/10 text-tekio-lime' },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-accent py-20 md:py-28">
        <div className="tekio-container">
          <div className="max-w-3xl">
            <h1 className="tekio-heading-1 text-accent-foreground mb-6">
              {t('about.title')}
            </h1>
            <p className="text-lg md:text-xl text-accent-foreground/70">
              {t('about.hero.tagline')}
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="tekio-section bg-background">
        <div className="tekio-container">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Mission */}
            <div className="tekio-card">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h2 className="tekio-heading-3 text-foreground">{t('about.mission.title')}</h2>
              </div>
              <p className="text-muted-foreground">
                {t('about.mission.desc')}
              </p>
            </div>

            {/* Vision */}
            <div className="tekio-card">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-tekio-sky/10 flex items-center justify-center">
                  <Eye className="h-6 w-6 text-tekio-sky" />
                </div>
                <h2 className="tekio-heading-3 text-foreground">{t('about.vision.title')}</h2>
              </div>
              <p className="text-muted-foreground">
                {t('about.vision.desc')}
              </p>
            </div>
          </div>

          {/* Founder */}
          <div className="bg-secondary rounded-2xl p-8 md:p-12 mb-16">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-1">
                <div className="relative w-48 h-48 mx-auto md:mx-0">
                  <img 
                    src={founderImage} 
                    alt="Fondateur Tekio"
                    className="w-full h-full object-cover rounded-2xl shadow-tekio-hover"
                  />
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-primary/10"></div>
                </div>
              </div>
              <div className="md:col-span-2 text-center md:text-left">
                <p className="text-sm text-primary font-medium mb-2">{t('about.founder.title')}</p>
                <h3 className="tekio-heading-2 text-foreground mb-4">{t('about.founder.name')}</h3>
                <p className="text-muted-foreground mb-4">
                  {t('about.founder.desc')}
                </p>
                <p className="text-foreground">
                  {t('about.founder.quote')}
                </p>
              </div>
            </div>
          </div>

          {/* Video */}
          <div className="bg-secondary rounded-2xl p-8 md:p-12 mb-16">
            <h2 className="tekio-heading-2 text-foreground mb-8 text-center">{t('about.video.title') || 'Découvrez Tekio'}</h2>
            <div className="aspect-video w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-tekio-hover">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/jdDFalruEFY?si=oc_Fmd7T85X4A4J-" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
                loading="lazy"
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Values */}
          <div className="text-center">
            <h2 className="tekio-heading-2 text-foreground mb-8">{t('about.values.title')}</h2>
            <div className="flex flex-wrap justify-center gap-6">
              {values.map((value) => (
                <div
                  key={value.key}
                  className={`px-8 py-6 rounded-2xl ${value.color} flex flex-col items-center gap-2`}
                >
                  <span className="text-2xl">{value.icon}</span>
                  <span className="font-semibold text-lg">{t(value.key)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-6">
              {t('about.cta.ready')}
            </p>
            <Link to="/contact">
              <Button variant="cta" size="xl">
                {t('about.cta.discuss')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
