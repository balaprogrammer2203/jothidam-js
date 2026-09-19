import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEOHead from '../components/common/SEOHead';
import { ROUTES } from '../config/routes.config';

export default function NotFoundPage() {
  const { t, i18n } = useTranslation(['common', 'horoscope']);
  const currentLang = i18n.language || 'ta';

  const quickLinks = [
    { title: currentLang === 'ta' ? 'ஜாதகம் கணிப்பு (Kundli)' : 'Birth Chart Calculator', path: ROUTES.HOME, icon: '🕉️' },
    { title: currentLang === 'ta' ? 'கடிகார பிரசன்னம்' : 'Kadikara Prasannam', path: ROUTES.PRASANNAM.KADIKARA, icon: '🕰️' },
    { title: currentLang === 'ta' ? '12 ராசிகள்' : '12 Zodiac Signs', path: ROUTES.ZODIAC.RASIS, icon: '♈' },
    { title: currentLang === 'ta' ? 'KP ஹோரரி 1-249' : 'KP Horary 1-249', path: ROUTES.KP_ASTROLOGY.HORARY, icon: '🔮' },
    { title: currentLang === 'ta' ? '30 திதிகள்' : '30 Lunar Tithis', path: ROUTES.PANCHANGAM.TITHIS, icon: '🌕' }
  ];

  return (
    <div className="portal-404-container" style={{
      maxWidth: '800px',
      margin: '60px auto',
      padding: '40px 24px',
      textAlign: 'center',
      backgroundColor: 'var(--bg-surface, #1e150b)',
      border: '1px solid var(--border-color, rgba(245, 158, 11, 0.2))',
      borderRadius: '16px',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)'
    }}>
      <SEOHead
        customTitle="404 - பக்கம் கிடைக்கவில்லை | Page Not Found | Jothidam Portal"
        customDescription="The requested astrological page does not exist or has been moved."
        noIndex={true}
      />

      <div style={{ fontSize: '56px', marginBottom: '12px' }}>🕉️</div>

      <h1 style={{ fontSize: '36px', fontWeight: '800', color: '#f59e0b', margin: '0 0 12px 0' }}>
        404 - {currentLang === 'ta' ? 'பக்கம் கிடைக்கவில்லை' : 'Page Not Found'}
      </h1>

      <p style={{ fontSize: '15px', color: 'var(--text-secondary, #d97706)', marginBottom: '8px' }}>
        {currentLang === 'ta'
          ? 'நீங்கள் தேடும் ஜோதிட பக்கம் மாற்றப்பட்டிருக்கலாம் அல்லது கிடைக்கவில்லை.'
          : 'The astrological page you are looking for has been relocated or does not exist.'}
      </p>

      <p style={{ fontSize: '13px', color: 'var(--text-muted, #a8a29e)', marginBottom: '32px' }}>
        Please check the URL or explore our featured Vedic astrology services below:
      </p>

      {/* Quick Navigation Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '12px',
        marginBottom: '32px',
        textAlign: 'left'
      }}>
        {quickLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 14px',
              backgroundColor: 'rgba(245, 158, 11, 0.06)',
              border: '1px solid rgba(245, 158, 11, 0.2)',
              borderRadius: '8px',
              color: 'var(--text-primary, #fef3c7)',
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: '500',
              transition: 'all 0.2s ease'
            }}
          >
            <span style={{ fontSize: '20px' }}>{link.icon}</span>
            <span>{link.title}</span>
          </Link>
        ))}
      </div>

      <Link
        to={ROUTES.HOME}
        style={{
          display: 'inline-block',
          padding: '12px 28px',
          backgroundColor: '#f59e0b',
          color: '#100b05',
          borderRadius: '8px',
          fontWeight: '700',
          textDecoration: 'none',
          fontSize: '14px',
          boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)'
        }}
      >
        {t('common:nav.home', 'முகப்பு செல்ல / Go to Home')}
      </Link>
    </div>
  );
}
