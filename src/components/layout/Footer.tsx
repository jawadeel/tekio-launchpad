import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import tekioLogo from '@/assets/tekio-logo.jpeg';
const Footer = () => {
  const {
    t
  } = useLanguage();
  const currentYear = new Date().getFullYear();
  return <footer className="bg-accent text-accent-foreground">
      <div className="tekio-container py-12 md:py-16 rounded-md opacity-100 shadow-tekio-hover bg-accent text-secondary">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <img alt="Tekio" src="/lovable-uploads/e5889e34-5d65-438b-82b4-2d24d8a97019/lovable_image-1.png" className="h-10 w-auto mb-4 brightness-0 invert border-0 border-destructive rounded-2xl shadow-[tekio] opacity-85 object-contain" />
            <p className="text-accent-foreground/70 text-sm max-w-md">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">{t('footer.company')}</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-accent-foreground/70 hover:text-accent-foreground transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-sm text-accent-foreground/70 hover:text-accent-foreground transition-colors">
                  {t('nav.services')}
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-sm text-accent-foreground/70 hover:text-accent-foreground transition-colors">
                  {t('nav.pricing')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-accent-foreground/70 hover:text-accent-foreground transition-colors">
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">{t('footer.legal')}</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-sm text-accent-foreground/70 hover:text-accent-foreground transition-colors">
                  {t('footer.privacy')}
                </Link>
              </li>
              <li>
                <Link to="/legal" className="text-sm text-accent-foreground/70 hover:text-accent-foreground transition-colors">
                  {t('footer.legal')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-accent-foreground/10">
          <p className="text-sm text-accent-foreground/50 text-center">
            © {currentYear} Tekio. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;