import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEOHead from '../components/common/SEOHead';

export default function NotFoundPage() {
  const { t } = useTranslation('common');

  return (
    <div className="not-found-container" style={{ textAlign: 'center', padding: '60px 20px' }}>
      <SEOHead
        customTitle="404 - பக்கம் கிடைக்கவில்லை | Page Not Found"
        customDescription="The requested astrological page does not exist."
        noIndex={true}
      />
      <h2 style={{ fontSize: '32px', color: '#f59e0b', marginBottom: '12px' }}>
        404 - {t('status.noData', 'Page Not Found')}
      </h2>
      <p style={{ color: '#a8a29e', marginBottom: '24px' }}>
        The requested page does not exist or has been moved.
      </p>
      <Link to="/" className="prokerala-submit-btn" style={{ textDecoration: 'none', display: 'inline-block', padding: '10px 24px' }}>
        {t('nav.home', 'Go to Home')}
      </Link>
    </div>
  );
}
