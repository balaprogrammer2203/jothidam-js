import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEOHead from '../../../components/common/SEOHead';
import Breadcrumbs from '../../../components/common/Breadcrumbs';
import HeroBanner from '../components/HeroBanner';
import HoroscopeForm from '../components/HoroscopeForm/HoroscopeForm';
import ChartViewContainer from '../components/ChartView/ChartViewContainer';
import UserLoginModal from '../../auth/components/UserLoginModal';
import { useHoroscopeForm } from '../hooks/useHoroscopeForm';
import { useHoroscope } from '../hooks/useHoroscope';
import { useAuth } from '../../../app/providers/AuthContext';
import savedProfilesService from '../../saved-horoscopes/services/savedProfiles.service';
import { localizeSavedProfile } from '../../../utils/astrologyLocalization';
import { formatIndianDate, formatTime12Hour } from '../../../utils/dateUtils';
import { ROUTES } from '../../../config/routes.config';

export default function HoroscopeViewAnalyzePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation(['saved', 'horoscope', 'common']);
  const currentLang = i18n.language || 'ta';
  const { isAuthenticated } = useAuth();
  
  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [profileError, setProfileError] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const formState = useHoroscopeForm();
  const {
    chartResult,
    setChartResult,
    loading: calcLoading,
    saving,
    saveMessage,
    setSaveMessage,
    calculateChart,
    saveHoroscope
  } = useHoroscope();

  // 1. Fetch saved horoscope profile from backend MongoDB
  useEffect(() => {
    if (!id || id === ':id') {
      navigate(ROUTES.ACCOUNT, { replace: true });
      return;
    }
    fetchProfile(id);
  }, [id, navigate]);

  const fetchProfile = async (profileId) => {
    setLoadingProfile(true);
    setProfileError(null);
    try {
      const data = await savedProfilesService.getSavedHoroscopeById(profileId);
      if (!data) {
        throw new Error(t('saved:profileNotFound', 'Horoscope profile not found.'));
      }
      setProfile(data);
    } catch (err) {
      setProfileError(err.message || 'Failed to load horoscope profile.');
    } finally {
      setLoadingProfile(false);
    }
  };

  // 2. Reactively localize the saved database profile across all supported languages
  const localizedProfile = useMemo(() => {
    if (!profile) return null;
    return localizeSavedProfile(profile, currentLang);
  }, [profile, currentLang]);

  // 3. Prepopulate formState with the loaded saved profile
  useEffect(() => {
    if (!profile) return;

    const person = profile.personDetails || {};
    const loc = profile.location || {};
    const astro = profile.astronomicalDetails || {};
    const prefs = profile.chartPreferences || profile.calculationParams || {};

    if (person.fullName) formState.setFullName(person.fullName);

    // Normalize and pre-fill gender matching GENDERS select options ('Male' | 'Female' | 'Other')
    const rawGender = person.gender || profile.gender;
    if (rawGender) {
      const gLower = String(rawGender).toLowerCase();
      const formattedGender = (gLower.startsWith('f') || gLower.includes('fem') || gLower.includes('பெண்'))
        ? 'Female'
        : (gLower.startsWith('o') || gLower.includes('oth') || gLower.includes('மற்றவை'))
          ? 'Other'
          : 'Male';
      formState.setGender(formattedGender);
    }

    // Parse & populate Date of Birth
    if (person.birthYear) formState.setBirthYear(Number(person.birthYear));
    if (person.birthMonth) formState.setBirthMonth(Number(person.birthMonth));
    if (person.birthDay) formState.setBirthDay(Number(person.birthDay));

    if (person.dob && (!person.birthYear || !person.birthMonth || !person.birthDay)) {
      const parts = person.dob.split('-');
      if (parts[0]) formState.setBirthYear(parseInt(parts[0], 10));
      if (parts[1]) formState.setBirthMonth(parseInt(parts[1], 10));
      if (parts[2]) formState.setBirthDay(parseInt(parts[2], 10));
    }

    // Parse & populate Time of Birth
    if (person.birthHour) formState.setBirthHour(String(person.birthHour).padStart(2, '0'));
    if (person.birthMinute) formState.setBirthMinute(String(person.birthMinute).padStart(2, '0'));
    if (person.birthSecond) formState.setBirthSecond(String(person.birthSecond || '00').padStart(2, '0'));
    if (person.birthAmPm) formState.setBirthAmPm(person.birthAmPm.toLowerCase());

    if (person.tob && (!person.birthHour || !person.birthMinute)) {
      const parts = person.tob.split(':');
      const h24 = parseInt(parts[0] || '12', 10);
      const ampm = person.birthAmPm || (h24 >= 12 ? 'pm' : 'am');
      const h12 = h24 % 12 || 12;
      formState.setBirthHour(String(h12).padStart(2, '0'));
      formState.setBirthMinute(String(parts[1] || '00').padStart(2, '0'));
      formState.setBirthSecond(String(parts[2] || '00').padStart(2, '0'));
      formState.setBirthAmPm(ampm);
    }

    // Populate Location & Coordinates
    const addr = loc.formattedAddress || loc.placeName || '';
    if (addr) formState.setPlaceQuery(addr);
    if (loc.placeId) formState.setSelectedPlaceId(loc.placeId);
    if (loc.latitude !== undefined && loc.latitude !== null && loc.latitude !== '') {
      formState.updateLatFromDecimal(Number(loc.latitude).toFixed(4));
    }
    if (loc.longitude !== undefined && loc.longitude !== null && loc.longitude !== '') {
      formState.updateLngFromDecimal(Number(loc.longitude).toFixed(4));
    }

    // Exact DMS coordinates
    if (loc.dms) {
      if (loc.dms.latDeg) formState.setLatDeg(String(loc.dms.latDeg));
      if (loc.dms.latMin) formState.setLatMin(String(loc.dms.latMin));
      if (loc.dms.latSec) formState.setLatSec(String(loc.dms.latSec));
      if (loc.dms.latDir) formState.setLatDir(loc.dms.latDir);
      if (loc.dms.lngDeg) formState.setLngDeg(String(loc.dms.lngDeg));
      if (loc.dms.lngMin) formState.setLngMin(String(loc.dms.lngMin));
      if (loc.dms.lngSec) formState.setLngSec(String(loc.dms.lngSec));
      if (loc.dms.lngDir) formState.setLngDir(loc.dms.lngDir);
    }

    // Timezone, GMT, DST
    const tz = person.timeZone || loc.timezone || 'Asia/Kolkata';
    formState.setTimezone(tz);
    formState.setGmt(person.gmt || '+05:30');

    let dType = 'standard';
    if (person.dstType) {
      const dtLower = person.dstType.toLowerCase();
      if (dtLower.includes('double')) dType = 'double_daylight_saving';
      else if (dtLower.includes('daylight') || dtLower.includes('dst')) dType = 'daylight_saving';
    }
    formState.setDstType(dType);
    formState.setDst(person.dst || '+00:00');

    // Ayanamsa & Chart Type
    const ayan = astro.ayanamsaMode || 'lahiri';
    formState.setAyanamsa(ayan);

    const cType = prefs.chartType || 'south';
    formState.setChartType(cType);
  }, [profile]);

  // Recalculate chart whenever active language changes, ONLY if chart has already been manually recalculated
  useEffect(() => {
    if (chartResult) {
      const payload = formState.getPayload(formState.chartType);
      calculateChart(payload).catch((err) => console.error('Chart fetch error on language change:', err));
    }
  }, [currentLang]);

  // Active chart result: newly recalculated chart or localized saved profile chart
  const activeChartResult = chartResult || localizedProfile?.chartResult || null;

  // Handle recalculation submission
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    const isValid = formState.validateForm(currentLang);
    if (!isValid) {
      const firstErrorRow = document.querySelector('.epanchang-row.has-error');
      if (firstErrorRow) {
        firstErrorRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    const payload = formState.getPayload(formState.chartType);
    await calculateChart(payload);

    setTimeout(() => {
      const resultsElement = document.getElementById('horoscope-results-section');
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  const executeSaveHoroscope = async () => {
    let activeChart = activeChartResult;
    if (!activeChart) {
      try {
        const calcPayload = formState.getPayload(formState.chartType);
        activeChart = await calculateChart(calcPayload);
      } catch (calcErr) {
        console.warn('Auto-calculation before save encountered an issue:', calcErr);
      }
    }

    const maandiPlanet = activeChart?.planets?.find(p => p.name === 'Maandi' || p.name === 'Mandi') || null;
    const maandiDetails = activeChart?.maandiDetails || maandiPlanet?.maandiDetails || null;

    const payload = {
      ...formState.getPayload(formState.chartType),
      maandi: maandiPlanet,
      maandiDetails
    };
    await saveHoroscope(payload);
  };

  const handleSave = async () => {
    const isValid = formState.validateForm(currentLang);
    if (!isValid) {
      const firstErrorRow = document.querySelector('.epanchang-row.has-error');
      if (firstErrorRow) {
        firstErrorRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }

    await executeSaveHoroscope();
  };

  const person = localizedProfile?.personDetails || profile?.personDetails || {};
  const locationDetails = localizedProfile?.location || profile?.location || {};
  const astro = localizedProfile?.astronomicalDetails || profile?.astronomicalDetails || {};
  const birthDisplay = localizedProfile?.birthAstrologyDisplay || {};

  const breadcrumbItems = [
    { label: t('common:nav.home', 'Home'), link: ROUTES.HOME },
    { label: currentLang === 'ta' ? 'எனது கணக்கு' : 'My Account', link: `${ROUTES.ACCOUNT}?tab=horoscopes` },
    {
      label: person.fullName
        ? `${person.fullName} - ${currentLang === 'ta' ? 'ஜாதக பார்வை & கணிப்பு ஆய்வு' : 'View & Analyze Horoscope'}`
        : (currentLang === 'ta' ? 'ஜாதக பார்வை & ஆய்வு' : 'Horoscope View & Analyze'),
      active: true
    }
  ];

  const profileTitle = person.fullName
    ? `${person.fullName} - ${currentLang === 'ta' ? 'ஜாதக பார்வை & கணிப்பு ஆய்வு' : 'View & Analyze Horoscope'} | Jothidam Portal`
    : `${currentLang === 'ta' ? 'ஜாதக பார்வை & ஆய்வு' : 'Horoscope View & Analyze'} | Jothidam Portal`;

  if (loadingProfile) {
    return (
      <>
        <SEOHead pageKey="saved" customTitle={t('saved:detailsTitle', 'Horoscope Details')} noIndex={true} />
        <Breadcrumbs items={breadcrumbItems} />
        <div className="loading-box" style={{ padding: '60px 20px', textAlign: 'center' }}>
          <div className="spinner"></div>
          <p style={{ marginTop: '16px', color: '#64748b' }}>
            {currentLang === 'ta' ? 'சேமிக்கப்பட்ட ஜாதக விவரங்கள் ஏற்றப்படுகின்றன...' : 'Loading saved horoscope details...'}
          </p>
        </div>
      </>
    );
  }

  if (profileError || !profile) {
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
              {profileError || t('saved:notFoundDesc', 'We could not locate this horoscope record in the database.')}
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => navigate(`${ROUTES.ACCOUNT}?tab=horoscopes`)}
                className="epanchang-submit-btn"
                style={{ cursor: 'pointer' }}
              >
                ← {currentLang === 'ta' ? 'சேமித்த ஜாதகங்கள்' : 'Back to Saved Horoscopes'}
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
      {/* Enterprise SEO Head Meta */}
      <SEOHead
        pageKey="saved"
        customTitle={profileTitle}
        noIndex={true}
        breadcrumbs={[
          { name: 'Home', path: ROUTES.HOME },
          { name: 'Saved Horoscopes', path: `${ROUTES.ACCOUNT}?tab=horoscopes` },
          { name: person.fullName || 'Profile Details', path: ROUTES.HOROSCOPE.viewAnalyzePath(id) }
        ]}
      />

      {/* Breadcrumbs Navigation */}
      <Breadcrumbs items={breadcrumbItems} />

      <div className="saved-horoscope-detail-page">
        {/* Official Print Header */}
        <div className="print-only-report-header">
          <h1 className="print-title">{t('common:portalTitle', 'Jothidam Portal')}</h1>
          <div className="print-subtitle">{t('common:portalSubtitle', 'Vedic Astrology Horoscope Report')}</div>
        </div>

        {/* Top Action Bar */}
        <div className="saved-detail-top-action-bar">
          <button
            type="button"
            onClick={() => navigate(`${ROUTES.ACCOUNT}?tab=horoscopes`)}
            className="back-btn"
          >
            ← {currentLang === 'ta' ? 'எனது சேமித்த ஜாதகங்கள்' : 'Back to Saved Horoscopes'}
          </button>

          <div className="detail-top-controls">
            {/* Quick jump to charts or form */}
            <button
              type="button"
              onClick={() => {
                const chartEl = document.getElementById('horoscope-results-section');
                if (chartEl) chartEl.scrollIntoView({ behavior: 'smooth' });
              }}
              className="chart-style-segmented-btn"
              style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}
            >
              📊 {currentLang === 'ta' ? 'வரைபடம் காண்க' : 'View Charts'}
            </button>

            <button
              type="button"
              onClick={() => {
                const formEl = document.getElementById('birth-details-form');
                if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
              }}
              className="chart-style-segmented-btn"
              style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}
            >
              ⚙️ {currentLang === 'ta' ? 'விவரங்களை திருத்து' : 'Edit Details'}
            </button>

            {/* Segmented Pill Switcher for Chart Style */}
            <div className="chart-style-pill-group">
              <button
                type="button"
                className={`chart-style-segmented-btn ${formState.chartType === 'south' ? 'active' : ''}`}
                onClick={() => formState.setChartType('south')}
              >
                {t('horoscope:form.southIndian', 'South Indian')}
              </button>
              <button
                type="button"
                className={`chart-style-segmented-btn ${formState.chartType === 'north' ? 'active' : ''}`}
                onClick={() => formState.setChartType('north')}
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
              <span className="profile-badge-saved-tag" style={{
                fontSize: '11px',
                fontWeight: '600',
                padding: '2px 8px',
                borderRadius: '12px',
                background: '#e0f2fe',
                color: '#0369a1',
                border: '1px solid #bae6fd'
              }}>
                {currentLang === 'ta' ? 'சேமிக்கப்பட்ட ஜாதகம்' : 'Saved Horoscope'}
              </span>
            </div>

            {/* Clean Key-Value Tile Grid for Multi-language alignment */}
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
                <span className="meta-card-val">{locationDetails.placeName || locationDetails.formattedAddress || '-'}</span>
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

        {/* 1. Hero Title, Social Sharing & Visual Banner */}
        <HeroBanner
          chartType={formState.chartType}
          onSelectChartType={formState.setChartType}
        />

        {/* 2. Interactive Birth Details Input Form (Pre-populated from Saved Horoscope) */}
        <div id="birth-details-form" className="form-card-wrapper">
          <div className="form-card-header">
            <div className="form-header-title-box">
              <span className="gear-icon">⚙️</span>
              <h2 className="form-card-heading">
                {currentLang === 'ta' ? 'பிறப்பு விவரங்கள் & கணிப்பு திருத்தம்' : 'Birth Details & Calculation Parameters'}
              </h2>
            </div>
            <span className="form-header-hint">
              {currentLang === 'ta'
                ? 'நேரம் அல்லது ஊரை மாற்றி "Calculate Horoscope" கிளிக் செய்து புதிய பலனை உடனடியாக ஆய்வு செய்யலாம்'
                : 'Tweak birth time, location or ayanamsa and recalculate to test astrological variations'}
            </span>
          </div>

          <HoroscopeForm
            formState={formState}
            loading={calcLoading}
            saving={saving}
            saveMessage={saveMessage}
            onClearToast={() => setSaveMessage(null)}
            onSubmit={handleSubmit}
            onSave={handleSave}
          />
        </div>

        {/* 3. Horoscope Results: D1 Rasi & D9 Navamsa Charts + Planetary & Basic Details Tables */}
        {activeChartResult && (
          <div id="horoscope-results-section" className="horoscope-results-wrapper">
            <ChartViewContainer
              chartResult={activeChartResult}
              fullName={formState.fullName || person.fullName}
              placeQuery={formState.placeQuery || locationDetails.formattedAddress || locationDetails.placeName}
              latitude={formState.latitude || locationDetails.latitude}
              longitude={formState.longitude || locationDetails.longitude}
              dob={formState.getDobString ? formState.getDobString() : person.dob}
              tob={formState.getTobString ? formState.getTobString() : person.tob}
              chartType={formState.chartType}
            />
          </div>
        )}

        {/* User Login Popup Modal for saving/updating */}
        <UserLoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onSuccess={() => {
            setShowLoginModal(false);
            executeSaveHoroscope();
          }}
          title={currentLang === 'ta' ? 'ஜாதகத்தை சேமிக்க உள்நுழையவும்' : 'Sign In to Save Horoscope'}
          subtitle={currentLang === 'ta'
            ? 'உங்கள் கணக்கில் இந்த ஜாதகத்தை பாதுகாப்பாக சேமித்து எப்போது வேண்டுமானாலும் "My Account" பக்கத்தில் ஆய்வு செய்யலாம்.'
            : 'Login or create a free account to store this birth chart in your library for future analysis.'}
        />
      </div>
    </>
  );
}
