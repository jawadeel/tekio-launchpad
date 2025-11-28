import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'fr' | 'nl' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.services': 'Services',
    'nav.pricing': 'Tarifs',
    'nav.method': 'Méthode & IA',
    'nav.about': 'À propos',
    'nav.contact': 'Contact',
    'nav.audit': 'Audit gratuit',
    
    // Hero
    'hero.title': "L'IT managée.",
    'hero.title2': 'Moderne. Efficace.',
    'hero.subtitle': 'Tekio simplifie et centralise votre IT. C\'est simple, clair, sans prise de tête.',
    'hero.cta1': 'Audit gratuit',
    'hero.cta2': 'Parler à un expert',
    
    // Why Tekio
    'why.title': 'Pourquoi Tekio ?',
    'why.subtitle': 'Une approche moderne de la gestion IT pour les PME.',
    'why.support.title': 'Support rapide',
    'why.support.desc': 'Réponse en moins de 15 minutes. Votre équipe ne reste jamais bloquée.',
    'why.security.title': 'Sécurité 24/7',
    'why.security.desc': 'Monitoring continu et protection proactive de votre infrastructure.',
    'why.automation.title': 'Automatisation & IA',
    'why.automation.desc': 'L\'intelligence artificielle au service de votre productivité.',
    
    // Services
    'services.title': 'Nos services',
    'services.subtitle': 'Tout ce dont votre entreprise a besoin, centralisé.',
    'services.support.title': 'Support & Helpdesk',
    'services.support.desc': 'Assistance technique réactive pour vos équipes.',
    'services.cloud.title': 'Microsoft 365 & Cloud',
    'services.cloud.desc': 'Migration, configuration et gestion de vos outils cloud.',
    'services.security.title': 'Sécurité & Backup',
    'services.security.desc': 'Protection avancée et sauvegarde de vos données.',
    'services.telecom.title': 'Télécom & VoIP',
    'services.telecom.desc': 'Solutions de communication modernes et flexibles.',
    'services.projects.title': 'Projets & Migrations',
    'services.projects.desc': 'Accompagnement sur vos projets de transformation.',
    
    // Technology
    'tech.title': 'Notre technologie',
    'tech.subtitle': 'Des outils modernes pour une IT performante.',
    'tech.ai.title': 'IA intégrée',
    'tech.ai.desc': 'Résolution intelligente des incidents.',
    'tech.automation.title': 'Automatisations',
    'tech.automation.desc': 'Processus optimisés et tâches automatisées.',
    'tech.dashboard.title': 'Dashboards',
    'tech.dashboard.desc': 'Visibilité complète sur votre infrastructure.',
    'tech.reporting.title': 'Reporting clair',
    'tech.reporting.desc': 'Rapports mensuels détaillés et compréhensibles.',
    
    // Pricing
    'pricing.title': 'Nos offres MSP',
    'pricing.subtitle': 'Des formules adaptées à vos besoins.',
    'pricing.setup': 'Setup offert avec contrat 12 mois',
    'pricing.per.user': '/utilisateur/mois',
    'pricing.cta': 'Commencer',
    'pricing.popular': 'Populaire',
    'pricing.bronze.name': 'Bronze',
    'pricing.silver.name': 'Silver',
    'pricing.gold.name': 'Gold',
    'pricing.bronze.price': '29€',
    'pricing.silver.price': '49€',
    'pricing.gold.price': '79€',
    'pricing.feature.support': 'Support helpdesk',
    'pricing.feature.monitoring': 'Monitoring',
    'pricing.feature.backup': 'Backup cloud',
    'pricing.feature.security': 'Sécurité avancée',
    'pricing.feature.m365': 'Gestion Microsoft 365',
    'pricing.feature.voip': 'VoIP inclus',
    'pricing.feature.ai': 'IA & automatisation',
    'pricing.feature.dedicated': 'Ingénieur dédié',
    
    // CTA Final
    'cta.title': 'Faites passer votre IT au niveau supérieur.',
    'cta.subtitle': 'Contactez-nous pour un audit gratuit de votre infrastructure.',
    'cta.button': 'Demander un audit',
    
    // Footer
    'footer.tagline': 'L\'IT managée. Moderne. Efficace.',
    'footer.rights': 'Tous droits réservés.',
    'footer.company': 'Entreprise',
    'footer.legal': 'Mentions légales',
    'footer.privacy': 'Confidentialité',
    
    // About
    'about.title': 'À propos de Tekio',
    'about.mission.title': 'Notre mission',
    'about.mission.desc': 'Simplifier l\'IT des PME pour qu\'elles se concentrent sur leur cœur de métier.',
    'about.vision.title': 'Notre vision',
    'about.vision.desc': 'Devenir le MSP de référence pour les micro-PME grâce à l\'automatisation et l\'IA.',
    'about.founder.title': 'Fondateur',
    'about.founder.name': 'Jawade El Hadouchi',
    'about.founder.desc': 'Plus de 15 ans d\'expérience en IT et infrastructure.',
    'about.values.title': 'Nos valeurs',
    'about.values.simple': 'Simple',
    'about.values.clear': 'Clair',
    'about.values.efficient': 'Efficace',
    
    // Contact
    'contact.title': 'Contactez-nous',
    'contact.subtitle': 'Une question ? Un projet ? Parlons-en.',
    'contact.name': 'Nom',
    'contact.email': 'Email',
    'contact.company': 'Entreprise',
    'contact.message': 'Message',
    'contact.send': 'Envoyer',
    'contact.info.title': 'Coordonnées',
    'contact.info.address': 'Bruxelles, Belgique',
    
    // Audit
    'audit.title': 'Audit IT gratuit',
    'audit.subtitle': 'Découvrez les points d\'amélioration de votre infrastructure.',
    'audit.benefit1': 'Analyse complète de votre parc',
    'audit.benefit2': 'Identification des risques',
    'audit.benefit3': 'Recommandations personnalisées',
    'audit.benefit4': 'Rapport détaillé offert',
    'audit.cta': 'Demander mon audit',
    
    // Method
    'method.title': 'Notre méthode',
    'method.subtitle': 'Une approche structurée et innovante.',
    'method.itil.title': 'ITIL',
    'method.itil.desc': 'Processus basés sur les meilleures pratiques ITIL.',
    'method.automation.title': 'Automatisation',
    'method.automation.desc': 'Tâches répétitives automatisées pour plus d\'efficacité.',
    'method.ai.title': 'Intelligence artificielle',
    'method.ai.desc': 'IA pour la détection et résolution proactive des incidents.',
    'method.reporting.title': 'Reporting',
    'method.reporting.desc': 'Visibilité totale avec des rapports mensuels clairs.',
  },
  nl: {
    // Navigation
    'nav.home': 'Home',
    'nav.services': 'Diensten',
    'nav.pricing': 'Prijzen',
    'nav.method': 'Methode & AI',
    'nav.about': 'Over ons',
    'nav.contact': 'Contact',
    'nav.audit': 'Gratis audit',
    
    // Hero
    'hero.title': 'Managed IT.',
    'hero.title2': 'Modern. Efficiënt.',
    'hero.subtitle': 'Tekio vereenvoudigt en centraliseert uw IT. Eenvoudig, duidelijk, zonder gedoe.',
    'hero.cta1': 'Gratis audit',
    'hero.cta2': 'Met een expert spreken',
    
    // Why Tekio
    'why.title': 'Waarom Tekio?',
    'why.subtitle': 'Een moderne aanpak van IT-beheer voor KMO\'s.',
    'why.support.title': 'Snelle support',
    'why.support.desc': 'Reactie binnen 15 minuten. Uw team blijft nooit vastzitten.',
    'why.security.title': 'Beveiliging 24/7',
    'why.security.desc': 'Continue monitoring en proactieve bescherming van uw infrastructuur.',
    'why.automation.title': 'Automatisering & AI',
    'why.automation.desc': 'Kunstmatige intelligentie ten dienste van uw productiviteit.',
    
    // Services
    'services.title': 'Onze diensten',
    'services.subtitle': 'Alles wat uw bedrijf nodig heeft, gecentraliseerd.',
    'services.support.title': 'Support & Helpdesk',
    'services.support.desc': 'Reactieve technische ondersteuning voor uw teams.',
    'services.cloud.title': 'Microsoft 365 & Cloud',
    'services.cloud.desc': 'Migratie, configuratie en beheer van uw cloud-tools.',
    'services.security.title': 'Beveiliging & Backup',
    'services.security.desc': 'Geavanceerde bescherming en back-up van uw gegevens.',
    'services.telecom.title': 'Telecom & VoIP',
    'services.telecom.desc': 'Moderne en flexibele communicatieoplossingen.',
    'services.projects.title': 'Projecten & Migraties',
    'services.projects.desc': 'Begeleiding bij uw transformatieprojecten.',
    
    // Technology
    'tech.title': 'Onze technologie',
    'tech.subtitle': 'Moderne tools voor performante IT.',
    'tech.ai.title': 'Geïntegreerde AI',
    'tech.ai.desc': 'Intelligente incidentoplossing.',
    'tech.automation.title': 'Automatiseringen',
    'tech.automation.desc': 'Geoptimaliseerde processen en geautomatiseerde taken.',
    'tech.dashboard.title': 'Dashboards',
    'tech.dashboard.desc': 'Volledige zichtbaarheid op uw infrastructuur.',
    'tech.reporting.title': 'Duidelijke rapportage',
    'tech.reporting.desc': 'Gedetailleerde en begrijpelijke maandelijkse rapporten.',
    
    // Pricing
    'pricing.title': 'Onze MSP-aanbiedingen',
    'pricing.subtitle': 'Formules aangepast aan uw behoeften.',
    'pricing.setup': 'Setup gratis bij 12-maanden contract',
    'pricing.per.user': '/gebruiker/maand',
    'pricing.cta': 'Starten',
    'pricing.popular': 'Populair',
    'pricing.bronze.name': 'Bronze',
    'pricing.silver.name': 'Silver',
    'pricing.gold.name': 'Gold',
    'pricing.bronze.price': '29€',
    'pricing.silver.price': '49€',
    'pricing.gold.price': '79€',
    'pricing.feature.support': 'Helpdesk support',
    'pricing.feature.monitoring': 'Monitoring',
    'pricing.feature.backup': 'Cloud backup',
    'pricing.feature.security': 'Geavanceerde beveiliging',
    'pricing.feature.m365': 'Microsoft 365 beheer',
    'pricing.feature.voip': 'VoIP inbegrepen',
    'pricing.feature.ai': 'AI & automatisering',
    'pricing.feature.dedicated': 'Toegewijde engineer',
    
    // CTA Final
    'cta.title': 'Breng uw IT naar het volgende niveau.',
    'cta.subtitle': 'Neem contact met ons op voor een gratis audit van uw infrastructuur.',
    'cta.button': 'Audit aanvragen',
    
    // Footer
    'footer.tagline': 'Managed IT. Modern. Efficiënt.',
    'footer.rights': 'Alle rechten voorbehouden.',
    'footer.company': 'Bedrijf',
    'footer.legal': 'Juridische informatie',
    'footer.privacy': 'Privacy',
    
    // About
    'about.title': 'Over Tekio',
    'about.mission.title': 'Onze missie',
    'about.mission.desc': 'De IT van KMO\'s vereenvoudigen zodat zij zich kunnen concentreren op hun kernactiviteit.',
    'about.vision.title': 'Onze visie',
    'about.vision.desc': 'De referentie MSP worden voor micro-KMO\'s dankzij automatisering en AI.',
    'about.founder.title': 'Oprichter',
    'about.founder.name': 'Jawade El Hadouchi',
    'about.founder.desc': 'Meer dan 15 jaar ervaring in IT en infrastructuur.',
    'about.values.title': 'Onze waarden',
    'about.values.simple': 'Eenvoudig',
    'about.values.clear': 'Duidelijk',
    'about.values.efficient': 'Efficiënt',
    
    // Contact
    'contact.title': 'Contacteer ons',
    'contact.subtitle': 'Een vraag? Een project? Laten we praten.',
    'contact.name': 'Naam',
    'contact.email': 'E-mail',
    'contact.company': 'Bedrijf',
    'contact.message': 'Bericht',
    'contact.send': 'Verzenden',
    'contact.info.title': 'Contactgegevens',
    'contact.info.address': 'Brussel, België',
    
    // Audit
    'audit.title': 'Gratis IT-audit',
    'audit.subtitle': 'Ontdek de verbeterpunten van uw infrastructuur.',
    'audit.benefit1': 'Volledige analyse van uw IT-park',
    'audit.benefit2': 'Identificatie van risico\'s',
    'audit.benefit3': 'Gepersonaliseerde aanbevelingen',
    'audit.benefit4': 'Gedetailleerd rapport gratis',
    'audit.cta': 'Mijn audit aanvragen',
    
    // Method
    'method.title': 'Onze methode',
    'method.subtitle': 'Een gestructureerde en innovatieve aanpak.',
    'method.itil.title': 'ITIL',
    'method.itil.desc': 'Processen gebaseerd op ITIL best practices.',
    'method.automation.title': 'Automatisering',
    'method.automation.desc': 'Geautomatiseerde repetitieve taken voor meer efficiëntie.',
    'method.ai.title': 'Kunstmatige intelligentie',
    'method.ai.desc': 'AI voor proactieve detectie en oplossing van incidenten.',
    'method.reporting.title': 'Rapportage',
    'method.reporting.desc': 'Totale zichtbaarheid met duidelijke maandelijkse rapporten.',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.pricing': 'Pricing',
    'nav.method': 'Method & AI',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.audit': 'Free audit',
    
    // Hero
    'hero.title': 'Managed IT.',
    'hero.title2': 'Modern. Efficient.',
    'hero.subtitle': 'Tekio simplifies and centralizes your IT. Simple, clear, hassle-free.',
    'hero.cta1': 'Free audit',
    'hero.cta2': 'Talk to an expert',
    
    // Why Tekio
    'why.title': 'Why Tekio?',
    'why.subtitle': 'A modern approach to IT management for SMEs.',
    'why.support.title': 'Fast support',
    'why.support.desc': 'Response within 15 minutes. Your team never stays stuck.',
    'why.security.title': '24/7 Security',
    'why.security.desc': 'Continuous monitoring and proactive protection of your infrastructure.',
    'why.automation.title': 'Automation & AI',
    'why.automation.desc': 'Artificial intelligence at the service of your productivity.',
    
    // Services
    'services.title': 'Our services',
    'services.subtitle': 'Everything your business needs, centralized.',
    'services.support.title': 'Support & Helpdesk',
    'services.support.desc': 'Responsive technical support for your teams.',
    'services.cloud.title': 'Microsoft 365 & Cloud',
    'services.cloud.desc': 'Migration, configuration and management of your cloud tools.',
    'services.security.title': 'Security & Backup',
    'services.security.desc': 'Advanced protection and backup of your data.',
    'services.telecom.title': 'Telecom & VoIP',
    'services.telecom.desc': 'Modern and flexible communication solutions.',
    'services.projects.title': 'Projects & Migrations',
    'services.projects.desc': 'Support for your transformation projects.',
    
    // Technology
    'tech.title': 'Our technology',
    'tech.subtitle': 'Modern tools for efficient IT.',
    'tech.ai.title': 'Integrated AI',
    'tech.ai.desc': 'Intelligent incident resolution.',
    'tech.automation.title': 'Automations',
    'tech.automation.desc': 'Optimized processes and automated tasks.',
    'tech.dashboard.title': 'Dashboards',
    'tech.dashboard.desc': 'Complete visibility of your infrastructure.',
    'tech.reporting.title': 'Clear reporting',
    'tech.reporting.desc': 'Detailed and understandable monthly reports.',
    
    // Pricing
    'pricing.title': 'Our MSP plans',
    'pricing.subtitle': 'Plans tailored to your needs.',
    'pricing.setup': 'Free setup with 12-month contract',
    'pricing.per.user': '/user/month',
    'pricing.cta': 'Get started',
    'pricing.popular': 'Popular',
    'pricing.bronze.name': 'Bronze',
    'pricing.silver.name': 'Silver',
    'pricing.gold.name': 'Gold',
    'pricing.bronze.price': '€29',
    'pricing.silver.price': '€49',
    'pricing.gold.price': '€79',
    'pricing.feature.support': 'Helpdesk support',
    'pricing.feature.monitoring': 'Monitoring',
    'pricing.feature.backup': 'Cloud backup',
    'pricing.feature.security': 'Advanced security',
    'pricing.feature.m365': 'Microsoft 365 management',
    'pricing.feature.voip': 'VoIP included',
    'pricing.feature.ai': 'AI & automation',
    'pricing.feature.dedicated': 'Dedicated engineer',
    
    // CTA Final
    'cta.title': 'Take your IT to the next level.',
    'cta.subtitle': 'Contact us for a free audit of your infrastructure.',
    'cta.button': 'Request an audit',
    
    // Footer
    'footer.tagline': 'Managed IT. Modern. Efficient.',
    'footer.rights': 'All rights reserved.',
    'footer.company': 'Company',
    'footer.legal': 'Legal notice',
    'footer.privacy': 'Privacy',
    
    // About
    'about.title': 'About Tekio',
    'about.mission.title': 'Our mission',
    'about.mission.desc': 'Simplify IT for SMEs so they can focus on their core business.',
    'about.vision.title': 'Our vision',
    'about.vision.desc': 'Become the reference MSP for micro-SMEs through automation and AI.',
    'about.founder.title': 'Founder',
    'about.founder.name': 'Jawade El Hadouchi',
    'about.founder.desc': 'Over 15 years of experience in IT and infrastructure.',
    'about.values.title': 'Our values',
    'about.values.simple': 'Simple',
    'about.values.clear': 'Clear',
    'about.values.efficient': 'Efficient',
    
    // Contact
    'contact.title': 'Contact us',
    'contact.subtitle': 'A question? A project? Let\'s talk.',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.company': 'Company',
    'contact.message': 'Message',
    'contact.send': 'Send',
    'contact.info.title': 'Contact details',
    'contact.info.address': 'Brussels, Belgium',
    
    // Audit
    'audit.title': 'Free IT audit',
    'audit.subtitle': 'Discover the improvement areas of your infrastructure.',
    'audit.benefit1': 'Complete analysis of your IT assets',
    'audit.benefit2': 'Risk identification',
    'audit.benefit3': 'Personalized recommendations',
    'audit.benefit4': 'Detailed report included',
    'audit.cta': 'Request my audit',
    
    // Method
    'method.title': 'Our method',
    'method.subtitle': 'A structured and innovative approach.',
    'method.itil.title': 'ITIL',
    'method.itil.desc': 'Processes based on ITIL best practices.',
    'method.automation.title': 'Automation',
    'method.automation.desc': 'Automated repetitive tasks for more efficiency.',
    'method.ai.title': 'Artificial intelligence',
    'method.ai.desc': 'AI for proactive detection and resolution of incidents.',
    'method.reporting.title': 'Reporting',
    'method.reporting.desc': 'Total visibility with clear monthly reports.',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('fr');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
