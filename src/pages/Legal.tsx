import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';

const Legal = () => {
  const { t } = useLanguage();

  return (
    <Layout>
      <div className="tekio-container py-16 md:py-24">
        <article className="prose prose-slate dark:prose-invert max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            {t('legal.title')}
          </h1>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              {t('legal.editor.title')}
            </h2>
            <p className="text-muted-foreground mb-4">
              {t('legal.editor.intro')}
            </p>
            <div className="bg-muted/50 p-4 rounded-lg text-muted-foreground">
              <p className="font-semibold">HDC-AZG SRL</p>
              <p>{t('legal.editor.address')}: Leuvensestraat 131 B2, 3300 Tienen, Belgique</p>
              <p>{t('legal.editor.bce')}: 0792.916.084</p>
              <p>{t('legal.editor.vat')}: BE0792916084</p>
              <p>{t('legal.editor.email')}: info@tekio.be</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              {t('legal.publisher.title')}
            </h2>
            <p className="text-muted-foreground mb-2">
              {t('legal.publisher.intro')}
            </p>
            <p className="text-muted-foreground">
              <strong>El Hadouchi Jawade</strong>, {t('legal.publisher.role')}
            </p>
            <p className="text-muted-foreground">
              Contact: info@tekio.be
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              {t('legal.host.title')}
            </h2>
            <div className="bg-muted/50 p-4 rounded-lg text-muted-foreground">
              <p className="font-semibold">OVH</p>
              <p>2 rue Kellermann</p>
              <p>59100 Roubaix, France</p>
              <p>
                <a href="https://www.ovh.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  https://www.ovh.com
                </a>
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              {t('legal.purpose.title')}
            </h2>
            <p className="text-muted-foreground mb-4">
              {t('legal.purpose.intro')}
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>{t('legal.purpose.service1')}</li>
              <li>{t('legal.purpose.service2')}</li>
              <li>{t('legal.purpose.service3')}</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              {t('legal.purpose.disclaimer')}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              {t('legal.ip.title')}
            </h2>
            <p className="text-muted-foreground mb-4">
              {t('legal.ip.content1')}
            </p>
            <p className="text-muted-foreground">
              {t('legal.ip.content2')}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              {t('legal.links.title')}
            </h2>
            <p className="text-muted-foreground mb-4">
              {t('legal.links.content1')}
            </p>
            <p className="text-muted-foreground mb-4">
              {t('legal.links.content2')}
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>{t('legal.links.condition1')}</li>
              <li>{t('legal.links.condition2')}</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              {t('legal.links.content3')}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              {t('legal.liability.title')}
            </h2>
            <p className="text-muted-foreground mb-4">
              {t('legal.liability.content1')}
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>{t('legal.liability.point1')}</li>
              <li>{t('legal.liability.point2')}</li>
              <li>{t('legal.liability.point3')}</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              {t('legal.liability.content2')}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              {t('legal.jurisdiction.title')}
            </h2>
            <p className="text-muted-foreground mb-4">
              {t('legal.jurisdiction.content1')}
            </p>
            <p className="text-muted-foreground">
              {t('legal.jurisdiction.content2')}
            </p>
          </section>
        </article>
      </div>
    </Layout>
  );
};

export default Legal;
