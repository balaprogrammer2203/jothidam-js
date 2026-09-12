import React from 'react';
import SEOHead from '../components/common/SEOHead';
import Breadcrumbs from '../components/common/Breadcrumbs';
import SavedHoroscopesList from '../features/saved-horoscopes/components/SavedHoroscopesList';
import { useTranslation } from 'react-i18next';

export default function SavedHoroscopesPage() {
  const { t } = useTranslation(['common', 'saved']);

  const breadcrumbItems = [
    { label: t('common:nav.home', 'Home'), link: '/' },
    { label: t('common:nav.saved', 'Saved Horoscopes (சேமிக்கப்பட்ட ஜாதகங்கள்)'), active: true }
  ];

  return (
    <>
      {/* Enterprise SEO Meta & Structured Data */}
      <SEOHead
        pageKey="saved"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Saved Horoscopes', path: '/saved' }
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

