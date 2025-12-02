import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';

const Privacy = () => {
  const { t } = useLanguage();

  return (
    <Layout>
      <div className="tekio-container py-16 md:py-24">
        <article className="prose prose-slate dark:prose-invert max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            {t('privacy.title')}
          </h1>

          {/* Section 1: Data Controller */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              {t('privacy.controller.title')}
            </h2>
            <p className="text-muted-foreground mb-4">
              {t('privacy.controller.intro')}
            </p>
            <div className="bg-muted/50 p-4 rounded-lg text-muted-foreground">
              <p className="font-semibold">HDC-AZG SRL</p>
              <p>Leuvensestraat 131 B2</p>
              <p>3300 Tienen, Belgique</p>
              <p className="mt-2">{t('privacy.controller.email')}: <strong>info@tekio.be</strong></p>
            </div>
            <p className="text-muted-foreground mt-4">
              {t('privacy.controller.dpo')}
            </p>
          </section>

          {/* Section 2: Data Collected */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              {t('privacy.data.title')}
            </h2>
            
            <h3 className="text-lg font-medium text-foreground mb-3">
              {t('privacy.data.user.title')}
            </h3>
            <p className="text-muted-foreground mb-2">
              {t('privacy.data.user.intro')}
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
              <li>{t('privacy.data.user.item1')}</li>
              <li>{t('privacy.data.user.item2')}</li>
              <li>{t('privacy.data.user.item3')}</li>
              <li>{t('privacy.data.user.item4')}</li>
              <li>{t('privacy.data.user.item5')}</li>
              <li>{t('privacy.data.user.item6')}</li>
            </ul>

            <h3 className="text-lg font-medium text-foreground mb-3">
              {t('privacy.data.auto.title')}
            </h3>
            <p className="text-muted-foreground mb-2">
              {t('privacy.data.auto.intro')}
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
              <li>{t('privacy.data.auto.item1')}</li>
              <li>{t('privacy.data.auto.item2')}</li>
              <li>{t('privacy.data.auto.item3')}</li>
              <li>{t('privacy.data.auto.item4')}</li>
              <li>{t('privacy.data.auto.item5')}</li>
            </ul>

            <h3 className="text-lg font-medium text-foreground mb-3">
              {t('privacy.data.msp.title')}
            </h3>
            <p className="text-muted-foreground mb-2">
              {t('privacy.data.msp.intro')}
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
              <li>{t('privacy.data.msp.item1')}</li>
              <li>{t('privacy.data.msp.item2')}</li>
              <li>{t('privacy.data.msp.item3')}</li>
              <li>{t('privacy.data.msp.item4')}</li>
            </ul>
            <p className="text-muted-foreground">
              {t('privacy.data.msp.disclaimer')}
            </p>
          </section>

          {/* Section 3: Purposes and Legal Bases */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              {t('privacy.purposes.title')}
            </h2>
            <p className="text-muted-foreground mb-4">
              {t('privacy.purposes.intro')}
            </p>
            <ol className="list-decimal list-inside text-muted-foreground space-y-4">
              <li>
                <strong>{t('privacy.purposes.purpose1.title')}</strong>
                <p className="ml-6">{t('privacy.purposes.purpose1.desc')}</p>
                <p className="ml-6 text-sm italic">{t('privacy.purposes.purpose1.basis')}</p>
              </li>
              <li>
                <strong>{t('privacy.purposes.purpose2.title')}</strong>
                <p className="ml-6">{t('privacy.purposes.purpose2.desc')}</p>
                <p className="ml-6 text-sm italic">{t('privacy.purposes.purpose2.basis')}</p>
              </li>
              <li>
                <strong>{t('privacy.purposes.purpose3.title')}</strong>
                <p className="ml-6">{t('privacy.purposes.purpose3.desc')}</p>
                <p className="ml-6 text-sm italic">{t('privacy.purposes.purpose3.basis')}</p>
              </li>
              <li>
                <strong>{t('privacy.purposes.purpose4.title')}</strong>
                <p className="ml-6">{t('privacy.purposes.purpose4.desc')}</p>
                <p className="ml-6 text-sm italic">{t('privacy.purposes.purpose4.basis')}</p>
              </li>
              <li>
                <strong>{t('privacy.purposes.purpose5.title')}</strong>
                <p className="ml-6">{t('privacy.purposes.purpose5.desc')}</p>
                <p className="ml-6 text-sm italic">{t('privacy.purposes.purpose5.basis')}</p>
              </li>
            </ol>
          </section>

          {/* Section 4: Data Recipients */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              {t('privacy.recipients.title')}
            </h2>
            <p className="text-muted-foreground mb-4">
              {t('privacy.recipients.intro')}
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>{t('privacy.recipients.item1')}</li>
              <li>{t('privacy.recipients.item2')}</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              {t('privacy.recipients.disclaimer')}
            </p>
          </section>

          {/* Section 5: International Transfers */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              {t('privacy.transfers.title')}
            </h2>
            <p className="text-muted-foreground mb-4">
              {t('privacy.transfers.intro')}
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>{t('privacy.transfers.item1')}</li>
              <li>{t('privacy.transfers.item2')}</li>
              <li>{t('privacy.transfers.item3')}</li>
            </ul>
          </section>

          {/* Section 6: Retention Period */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              {t('privacy.retention.title')}
            </h2>
            <p className="text-muted-foreground mb-4">
              {t('privacy.retention.intro')}
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>{t('privacy.retention.item1')}</li>
              <li>{t('privacy.retention.item2')}</li>
              <li>{t('privacy.retention.item3')}</li>
              <li>{t('privacy.retention.item4')}</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              {t('privacy.retention.disclaimer')}
            </p>
          </section>

          {/* Section 7: Cookies */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              {t('privacy.cookies.title')}
            </h2>
            <p className="text-muted-foreground mb-4">
              {t('privacy.cookies.intro')}
            </p>
            
            <h3 className="text-lg font-medium text-foreground mb-3">
              {t('privacy.cookies.essential.title')}
            </h3>
            <p className="text-muted-foreground mb-4">
              {t('privacy.cookies.essential.desc')}
            </p>

            <h3 className="text-lg font-medium text-foreground mb-3">
              {t('privacy.cookies.analytics.title')}
            </h3>
            <p className="text-muted-foreground mb-4">
              {t('privacy.cookies.analytics.desc')}
            </p>

            <h3 className="text-lg font-medium text-foreground mb-3">
              {t('privacy.cookies.consent.title')}
            </h3>
            <p className="text-muted-foreground">
              {t('privacy.cookies.consent.desc')}
            </p>
          </section>

          {/* Section 8: MSP Confidentiality */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              {t('privacy.confidentiality.title')}
            </h2>
            <p className="text-muted-foreground mb-4">
              {t('privacy.confidentiality.content1')}
            </p>
            <p className="text-muted-foreground">
              {t('privacy.confidentiality.content2')}
            </p>
          </section>

          {/* Section 9: Your Rights */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              {t('privacy.rights.title')}
            </h2>
            <p className="text-muted-foreground mb-4">
              {t('privacy.rights.intro')}
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>{t('privacy.rights.item1')}</li>
              <li>{t('privacy.rights.item2')}</li>
              <li>{t('privacy.rights.item3')}</li>
              <li>{t('privacy.rights.item4')}</li>
              <li>{t('privacy.rights.item5')}</li>
              <li>{t('privacy.rights.item6')}</li>
            </ul>
            <div className="bg-muted/50 p-4 rounded-lg text-muted-foreground mt-4">
              <p className="font-semibold">HDC-AZG SRL – {t('privacy.rights.contact')}</p>
              <p>E-mail: <strong>info@tekio.be</strong></p>
            </div>
            <p className="text-muted-foreground mt-4">
              {t('privacy.rights.identity')}
            </p>
          </section>

          {/* Section 10: Complaints */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              {t('privacy.complaint.title')}
            </h2>
            <p className="text-muted-foreground mb-4">
              {t('privacy.complaint.intro')}
            </p>
            <div className="bg-muted/50 p-4 rounded-lg text-muted-foreground">
              <p className="font-semibold">Autorité de protection des données (APD / GBA)</p>
              <p>Rue de la Presse 35</p>
              <p>1000 Bruxelles, Belgique</p>
              <p>
                <a href="https://www.autoriteprotectiondonnees.be/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  https://www.autoriteprotectiondonnees.be/
                </a>
              </p>
            </div>
          </section>

          {/* Section 11: Updates */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              {t('privacy.updates.title')}
            </h2>
            <p className="text-muted-foreground">
              {t('privacy.updates.content')}
            </p>
          </section>
        </article>
      </div>
    </Layout>
  );
};

export default Privacy;
