import React from 'react';
import { useTranslation } from 'react-i18next';
import SEOHead from '../../../components/common/SEOHead';
import Breadcrumbs from '../../../components/common/Breadcrumbs';
import SavedHoroscopesList from '../components/SavedHoroscopesList';
import { ROUTES } from '../../../config/routes.config';

export default function SavedHoroscopesPage() {
  const { t } = useTranslation(['common', 'saved']);

  const breadcrumbItems = [
    { label: t('common:nav.home', 'Home'), link: ROUTES.HOME },
    { label: t('common:nav.saved', 'Saved Horoscopes (சேமிக்கப்பட்ட ஜாதகங்கள்)'), active: true }
  ];

  return (
    <>
      {/* Enterprise SEO Meta & Structured Data */}
      <SEOHead
        pageKey="saved"
        breadcrumbs={[
          { name: 'Home', path: ROUTES.HOME },
          { name: 'Saved Horoscopes', path: ROUTES.HOROSCOPE.SAVED }
        ]}
      />

      {/* Breadcrumbs Navigation */}
      <Breadcrumbs items={breadcrumbItems} />

      <div className="saved-horoscopes-page-content">
        <SavedHoroscopesList />
      </div>
    </>
  );
}
