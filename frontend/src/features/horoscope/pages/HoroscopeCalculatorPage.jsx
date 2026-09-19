import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEOHead from '../../../components/common/SEOHead';
import Breadcrumbs from '../../../components/common/Breadcrumbs';
import HeroBanner from '../components/HeroBanner';
import HoroscopeForm from '../components/HoroscopeForm/HoroscopeForm';
import ChartViewContainer from '../components/ChartView/ChartViewContainer';
import { useHoroscopeForm } from '../hooks/useHoroscopeForm';
import { useHoroscope } from '../hooks/useHoroscope';

export default function HoroscopeCalculatorPage() {
  const { t, i18n } = useTranslation(['horoscope', 'common']);
  const currentLang = i18n.language || 'en';
  const location = useLocation();
  const formState = useHoroscopeForm();
  const {
    chartResult,
    loading,
    saving,
    saveMessage,
    setSaveMessage,
    calculateChart,
    saveHoroscope
  } = useHoroscope();

  // Handle incoming quick submit state from other pages
  useEffect(() => {
    if (location.state?.quickData) {
      handleQuickSidebarSubmit(location.state.quickData);
    }
  }, [location.state]);

  // Handle quick submit event from common sidebar
  useEffect(() => {
    const handleQuickEvent = (e) => {
      if (e.detail) {
        handleQuickSidebarSubmit(e.detail);
      }
    };
    window.addEventListener('jothidam:quick-horoscope-submit', handleQuickEvent);
    return () => window.removeEventListener('jothidam:quick-horoscope-submit', handleQuickEvent);
  }, []);

  // Recalculate chart whenever active language changes, ONLY if chart has already been generated
  useEffect(() => {
    if (chartResult) {
      const payload = formState.getPayload();
      calculateChart(payload).catch((err) => console.error('Chart fetch error on language change:', err));
    }
  }, [currentLang]);

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
    const payload = formState.getPayload();
    await calculateChart(payload);
    
    // Smooth scroll to newly generated results
    setTimeout(() => {
      const resultsElement = document.getElementById('horoscope-results-section');
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
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

    // Ensure chart is generated if not yet present so that exact Maandi data is available
    let activeChart = chartResult;
    if (!activeChart) {
      try {
        const calcPayload = formState.getPayload(formState.chartType);
        activeChart = await calculateChart(calcPayload);
      } catch (calcErr) {
        console.warn('Auto-calculation before save encountered an issue:', calcErr);
      }
    }

    // Extract Maandi planet details from computed chart
    const maandiPlanet = activeChart?.planets?.find(p => p.name === 'Maandi' || p.name === 'Mandi') || null;
    const maandiDetails = activeChart?.maandiDetails || maandiPlanet?.maandiDetails || null;

    const payload = {
      ...formState.getPayload(formState.chartType),
      chartData: activeChart || null,
      maandi: maandiPlanet,
      maandiDetails
    };
    await saveHoroscope(payload);
  };

  const handleQuickSidebarSubmit = async (quickData) => {
    if (quickData.fullName) formState.setFullName(quickData.fullName);
    if (quickData.placeQuery) formState.setPlaceQuery(quickData.placeQuery);
    if (quickData.birthYear) formState.setBirthYear(quickData.birthYear);
    if (quickData.birthMonth) formState.setBirthMonth(quickData.birthMonth);
    if (quickData.birthDay) formState.setBirthDay(quickData.birthDay);
    if (quickData.birthHour) formState.setBirthHour(quickData.birthHour);
    if (quickData.birthMinute) formState.setBirthMinute(quickData.birthMinute);
    if (quickData.birthAmPm) formState.setBirthAmPm(quickData.birthAmPm);

    // Scroll to form and trigger calculation
    const formElement = document.getElementById('birth-details-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }

    const payload = {
      ...formState.getPayload(),
      fullName: quickData.fullName || formState.fullName,
      dob: `${quickData.birthYear}-${String(quickData.birthMonth).padStart(2, '0')}-${String(quickData.birthDay).padStart(2, '0')}`,
      tob: `${quickData.birthHour}:${quickData.birthMinute}:00`
    };
    await calculateChart(payload);
  };

  return (
    <>
      {/* Enterprise SEO Head Meta & Structured Data */}
      <SEOHead
        pageKey="home"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Horoscope Calculator', path: '/' }
        ]}
      />

      {/* Breadcrumb Navigation Trail */}
      <Breadcrumbs />

      {/* 1. Hero Title, Social Sharing & Visual Banner */}
      <HeroBanner
        chartType={formState.chartType}
        onSelectChartType={formState.setChartType}
      />

      {/* 2. Interactive Birth Details Input Form */}
      <div id="birth-details-form" className="form-card-wrapper">
        <div className="form-card-header">
          <div className="form-header-title-box">
            <span className="gear-icon">⚙️</span>
            <h2 className="form-card-heading">
              {t('horoscope:form.sectionTitle', 'Enter Birth Details')}
            </h2>
          </div>
          <span className="form-header-hint">
            {t('horoscope:form.accurateHint', 'Accurate birth time & location ensure exact planetary degrees')}
          </span>
        </div>

        <HoroscopeForm
          formState={formState}
          loading={loading}
          saving={saving}
          saveMessage={saveMessage}
          onClearToast={() => setSaveMessage(null)}
          onSubmit={handleSubmit}
          onSave={handleSave}
        />
      </div>

      {/* 3. Horoscope Results: D1 Rasi & D9 Navamsa Charts + Tables */}
      {chartResult && (
        <div id="horoscope-results-section" className="horoscope-results-wrapper">
          <ChartViewContainer
            chartResult={chartResult}
            fullName={formState.fullName}
            placeQuery={formState.placeQuery}
            latitude={formState.latitude}
            longitude={formState.longitude}
            dob={formState.getDobString()}
            tob={formState.getTobString()}
            chartType={formState.chartType}
          />
        </div>
      )}
    </>
  );
}
