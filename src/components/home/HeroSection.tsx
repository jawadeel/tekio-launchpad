import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-accent min-h-[90vh] flex items-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-tekio-sky rounded-full blur-3xl" />
      </div>

      <div className="tekio-container relative z-10 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Title */}
          <h1 className="tekio-heading-1 text-accent-foreground mb-4 animate-fade-up">
            {t('hero.title')}
            <br />
            <span className="bg-gradient-to-r from-primary to-tekio-sky bg-clip-text text-transparent">
              {t('hero.title2')}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-accent-foreground/70 max-w-2xl mx-auto mb-10 animate-fade-up animation-delay-100">
            {t('hero.subtitle')}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up animation-delay-200">
            <Link to="/audit">
              <Button variant="hero" size="xl">
                {t('hero.cta1')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="heroOutline" size="xl">
                <MessageCircle className="mr-2 h-5 w-5" />
                {t('hero.cta2')}
              </Button>
            </Link>
          </div>

          {/* Video */}
          <div className="mt-16 animate-fade-up animation-delay-300">
            <div className="aspect-video max-w-2xl mx-auto rounded-xl overflow-hidden shadow-2xl">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/J2icSM2EfgI?si=AXGgDqCKSbxVJcez&start=19" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(var(--background))"/>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
