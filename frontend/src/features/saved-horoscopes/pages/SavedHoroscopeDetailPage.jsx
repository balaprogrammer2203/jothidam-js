import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import savedProfilesService from '../services/savedProfiles.service';
import SEOHead from '../../../components/common/SEOHead';
import ChartViewContainer from '../../horoscope/components/ChartView/ChartViewContainer';
import Breadcrumbs from '../../../components/common/Breadcrumbs';
import Toast from '../../../components/common/Toast';
import { formatDmsString } from '../../../utils/coordinateUtils';
import { formatIndianDate, formatTime12Hour } from '../../../utils/dateUtils';
import { localizeSavedProfile } from '../../../utils/astrologyLocalization';
import { ROUTES } from '../../../config/routes.config';

export default function SavedHoroscopeDetailPage() {
  const { t, i18n } = useTranslation(['saved', 'common', 'horoscope']);
  const currentLang = i18n.language || 'ta';
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartType, setChartType] = useState('south');

  useEffect(() => {
    if (!id || id === ':id') {
      navigate(ROUTES.HOROSCOPE.SAVED, { replace: true });
      return;
    }
    fetchProfile(id);
  }, [id, navigate]);

  const fetchProfile = async (profileId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await savedProfilesService.getSavedHoroscopeById(profileId);
      if (!data) {
        throw new Error(t('saved:profileNotFound', 'Horoscope profile not found.'));
      }
      setProfile(data);
      const preferredChart = data.chartPreferences?.chartType || data.calculationParams?.chartType || 'south';
      setChartType(preferredChart);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickSidebarSubmit = (quickData) => {
    navigate('/', { state: { quickData } });
  };

  // Reactively localizes database profile (stored in English) across all 6 languages
  const localizedProfile = useMemo(() => {
    if (!profile) return null;
    return localizeSavedProfile(profile, currentLang);
  }, [profile, currentLang]);

  const person = localizedProfile?.personDetails || profile?.personDetails || {};
  const location = localizedProfile?.location || profile?.location || {};
  const astro = localizedProfile?.astronomicalDetails || profile?.astronomicalDetails || {};
  const birthAstro = localizedProfile?.birthAstrology || profile?.birthAstrology || {};
  const birthDisplay = localizedProfile?.birthAstrologyDisplay || {};
  const chartResult = localizedProfile?.chartResult || null;

  const breadcrumbItems = [
    { label: t('common:nav.home', 'Home'), link: ROUTES.HOME },
    { label: t('common:nav.saved', 'Saved Horoscopes'), link: ROUTES.HOROSCOPE.SAVED },
    { label: person.fullName ? `${person.fullName} - ${t('saved:detailsTitle', 'Horoscope Details')}` : t('saved:detailsTitle', 'Horoscope Details'), active: true }
  ];

  const profileTitle = person.fullName
    ? `${person.fullName} - ${t('saved:detailsTitle', 'Horoscope Details')} | Jothidam Portal`
    : `${t('saved:detailsTitle', 'Horoscope Details')} | Jothidam Portal`;

  if (loading) {
    return (
      <>
        <SEOHead pageKey="saved" customTitle={t('saved:detailsTitle', 'Horoscope Details')} noIndex={true} />
        <Breadcrumbs items={breadcrumbItems} />
        <div className="loading-box" style={{ padding: '60px 20px' }}>
          <div className="spinner"></div>
          <p>{t('common:status.loading', 'Loading horoscope details...')}</p>
        </div>
      </>
    );
  }

  if (error || !profile) {
    return (
      <>
        <SEOHead pageKey="saved" customTitle={t('saved:profileNotFound', 'Horoscope Not Found')} noIndex={true} />
        <Breadcrumbs items={breadcrumbItems} />
        <div className="saved-horoscope-detail-page">
          <div style={{
            maxWidth: '600px',
            margin: '40px auto',
            padding: '40px 28px',
            background: '#ffffff',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            textAlign: 'center',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: '#fef2f2',
              color: '#ef4444',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto',
              fontSize: '26px'
            }}>
              ⚠️
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1e293b', marginBottom: '8px' }}>
              {t('saved:profileNotFound', 'Horoscope Profile Not Found')}
            </h2>
            <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px', lineHeight: '1.6' }}>
              {error ? (error.includes('ObjectId') ? t('saved:invalidId', 'The requested horoscope ID is invalid or does not exist.') : error) : t('saved:notFoundDesc', 'We could not locate this horoscope record in the database.')}
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => navigate(ROUTES.HOROSCOPE.SAVED)}
                className="epanchang-submit-btn"
                style={{ cursor: 'pointer' }}
              >
                ← {t('saved:backToList', 'Back to Saved List')}
              </button>
              <button
                type="button"
                onClick={() => navigate(ROUTES.HOME)}
                className="back-btn"
                style={{ cursor: 'pointer' }}
              >
                {t('common:nav.home', 'Home')}
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  const starDisplay = birthDisplay.starName || '-';
  const padaDisplay = birthDisplay.padaStr || '';

  return (
    <>
      {/* Enterprise SEO Meta & Structured Data */}
      <SEOHead
        pageKey="saved"
        customTitle={profileTitle}
        noIndex={true}
        breadcrumbs={[
          { name: 'Home', path: ROUTES.HOME },
          { name: 'Saved Horoscopes', path: ROUTES.HOROSCOPE.SAVED },
          { name: person.fullName || 'Profile Details', path: ROUTES.HOROSCOPE.savedDetailPath(id) }
        ]}
      />

      {/* Breadcrumbs Navigation */}
      <Breadcrumbs items={breadcrumbItems} />

      <div className="saved-horoscope-detail-page">
            {/* Official Print Header (Visible only when printing/saving PDF) */}
            <div className="print-only-report-header">
              <h1 className="print-title">{t('common:portalTitle', 'Jothidam Portal')}</h1>
              <div className="print-subtitle">{t('common:portalSubtitle', 'Vedic Astrology Horoscope Report')}</div>
            </div>

            {/* Top Action Bar */}
            <div className="saved-detail-top-action-bar">
              <button
                type="button"
                onClick={() => navigate(ROUTES.HOROSCOPE.SAVED)}
                className="back-btn"
              >
                ← {t('saved:backToList', 'Back to Saved List')}
              </button>

              <div className="detail-top-controls">
                {/* Segmented Pill Switcher for Chart Style */}
                <div className="chart-style-pill-group">
                  <button
                    type="button"
                    className={`chart-style-segmented-btn ${chartType === 'south' ? 'active' : ''}`}
                    onClick={() => setChartType('south')}
                  >
                    {t('horoscope:form.southIndian', 'South Indian')}
                  </button>
                  <button
                    type="button"
                    className={`chart-style-segmented-btn ${chartType === 'north' ? 'active' : ''}`}
                    onClick={() => setChartType('north')}
                  >
                    {t('horoscope:form.northIndian', 'North Indian')}
                  </button>
                </div>

                <span className="profile-id-badge">ID: {profile._id?.slice(-8)}</span>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="print-btn"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 6 2 18 2 18 9"></polyline>
                    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                    <rect x="6" y="14" width="12" height="8"></rect>
                  </svg>
                  {t('common:buttons.print', 'Print')}
                </button>
              </div>
            </div>

            {/* Person Summary Card */}
            <div className="saved-detail-profile-banner">
              <div className="profile-avatar-large">
                {person.fullName?.charAt(0) || '🕉️'}
              </div>
              <div className="banner-info-content">
                <div className="banner-title-row">
                  <h2 className="banner-name">{person.fullName}</h2>
                  <span className="profile-gender-badge">{person.genderDisplay || person.gender?.toUpperCase() || 'NATIVE'}</span>
                </div>

                {/* Clean Key-Value Tile Grid for Tamil & Multi-language alignment */}
                <div className="banner-meta-grid">
                  <div className="meta-card-tile">
                    <span className="meta-card-label">{t('saved:dob', 'Date of Birth')}</span>
                    <span className="meta-card-val">{formatIndianDate(person.dob)}</span>
                  </div>

                  <div className="meta-card-tile">
                    <span className="meta-card-label">{t('saved:tob', 'Time of Birth')}</span>
                    <span className="meta-card-val">{formatTime12Hour(person.tob)}</span>
                  </div>

                  <div className="meta-card-tile">
                    <span className="meta-card-label">{t('saved:place', 'Birth Place')}</span>
                    <span className="meta-card-val">{location.placeName || location.formattedAddress || '-'}</span>
                  </div>

                  <div className="meta-card-tile">
                    <span className="meta-card-label">{t('saved:ayanamsa', 'Ayanamsa')}</span>
                    <span className="meta-card-val">{astro.ayanamsaName || astro.ayanamsaType} ({Number(astro.ayanamsa || 0).toFixed(4)}°)</span>
                  </div>

                  <div className="meta-card-tile">
                    <span className="meta-card-label">{t('horoscope:chart.sign', 'Rasi')}</span>
                    <span className="meta-card-val">{birthDisplay.rasiName || '-'}</span>
                  </div>

                  <div className="meta-card-tile highlight-tile">
                    <span className="meta-card-label">{t('saved:star', 'Star')}</span>
                    <span className="meta-card-val text-star">
                      {starDisplay}{padaDisplay}
                    </span>
                  </div>

                  {birthDisplay.maandiRasiName && (
                    <div className="meta-card-tile highlight-tile maandi-meta-tile" style={{ borderColor: '#d8b4fe', background: '#faf5ff' }}>
                      <span className="meta-card-label" style={{ color: '#7e22ce' }}>{t('saved:maandi', 'Maandi')}</span>
                      <span className="meta-card-val text-maandi" style={{ color: '#6b21a8', fontWeight: '700' }}>
                        {birthDisplay.maandiRasiName} {birthDisplay.maandiDegree ? `(${birthDisplay.maandiDegree})` : ''}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Complete Chart View (Rasi D1, Navamsa D9, Planetary Positions Table, Basic Details Table) */}
            <ChartViewContainer
              chartResult={chartResult}
              fullName={person.fullName}
              placeQuery={location.formattedAddress || location.placeName}
              latitude={location.latitude}
              longitude={location.longitude}
              dob={person.dob}
              tob={person.tob}
              chartType={chartType}
            />
          </div>
    </>
  );
}
