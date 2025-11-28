import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const CTASection = () => {
  const { t } = useLanguage();

  return (
    <section className="tekio-section bg-accent relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-tekio-sky rounded-full blur-3xl" />
      </div>

      <div className="tekio-container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="tekio-heading-2 text-accent-foreground mb-4">
            {t('cta.title')}
          </h2>
          <p className="text-lg text-accent-foreground/70 mb-8">
            {t('cta.subtitle')}
          </p>
          <Link to="/audit">
            <Button variant="hero" size="xl">
              {t('cta.button')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
