import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  PRASANNAM_RASIS,
  RASI_CONSTITUENT_STARS,
  getLocalizedPrasannamRasiName,
  getLocalizedPrasannamRasiLord,
  enrichPlanetAstrology
} from '../utils/kadikaraPrasannam';

/**
 * Tooltip positioning helper based on South Indian 4x4 chart cell layout
 */
function getTooltipPos(rasiIndex) {
  switch (rasiIndex) {
    case 11: return 'pos-top-left';
    case 0:
    case 1: return 'pos-top-mid';
    case 2: return 'pos-top-right';
    case 10:
    case 9: return 'pos-left-mid';
    case 3:
    case 4: return 'pos-right-mid';
    case 8: return 'pos-bottom-left';
    case 7:
    case 6: return 'pos-bottom-mid';
    case 5: return 'pos-bottom-right';
    default: return 'pos-top-mid';
  }
}

/**
 * South Indian Rasi Chart customized for Kadikara Prasannam
 * Supports 6 Languages: Tamil, English, Hindi, Telugu, Kannada, Malayalam
 */
export default function KadikaraChartCard({
  chartData = {},
  rasiGrid = Array.from({ length: 12 }, () => []),
  dateTimeStr = '',
  placeName = 'Chennai',
  ayanamsaLabel = 'Lahiri',
  title = '',
  lang = 'ta'
}) {
  const { t, i18n } = useTranslation('astrology');
  const activeLang = lang || i18n.language || 'ta';

  const {
    udhayamIndex = 3, // Default Cancer (கடகம்)
    aarudamIndex = 0, // Default Aries (மேஷம்)
    udhayamDegreeInRasi,
    aarudamDegreeInRasi,
    udhayamFormattedDegree,
    aarudamFormattedDegree,
    udhayamToAarudam = 10,
    aarudamToUdhayam = 4,
    statusEn = 'Hard Luck',
    statusTa = 'அதமம்',
    statusLocalized = '',
    badgeBg = '#ff5b79',
    badgeText = '#ffffff'
  } = chartData || {};

  // Extract minute for degree calculation fallback if needed
  let parsedMin = chartData?.minute;
  if (parsedMin === undefined && dateTimeStr) {
    const mMatch = dateTimeStr.match(/:(\d{2})/);
    if (mMatch) parsedMin = parseInt(mMatch[1], 10);
  }
  const effectiveMin = (parsedMin !== undefined && !isNaN(parsedMin)) ? parsedMin : 0;

  // Udhayam degree: (minute / 60) * 30 -> 0.5 deg per min
  const uDegVal = udhayamDegreeInRasi !== undefined ? udhayamDegreeInRasi : ((effectiveMin / 60) * 30);
  const uDegFormatted = udhayamFormattedDegree || (() => {
    const ud = Math.floor(uDegVal);
    const um = Math.round((uDegVal - ud) * 60);
    return `${ud}°${String(um).padStart(2, '0')}'`;
  })();

  // Aarudam degree: ((minute % 5) / 5) * 30 -> 6 deg per min
  const aDegVal = aarudamDegreeInRasi !== undefined ? aarudamDegreeInRasi : ((effectiveMin % 5) * 6);
  const aDegFormatted = aarudamFormattedDegree || (() => {
    const ad = Math.floor(aDegVal);
    const am = Math.round((aDegVal - ad) * 60);
    return `${ad}°${String(am).padStart(2, '0')}'`;
  })();

  // Format date & time display for center cell
  const displayDateTime = dateTimeStr || '04/07/2025 15:03';
  const displayPlace = placeName || 'Chennai';
  const displayTitle = title || t('kadikara.chartTitle', 'கடிகார பிரசன்னம்');

  // Localized Udhayam (உத / Udh) and Aarudam (ஆரு / Aar) labels
  const getBadgeShort = (type) => {
    if (type === 'udhayam') {
      if (activeLang === 'en') return 'Udh';
      if (activeLang === 'hi') return 'उदय';
      if (activeLang === 'te') return 'ఉద';
      if (activeLang === 'kn') return 'ಉದ';
      if (activeLang === 'ml') return 'ഉദ';
      return 'உத';
    }
    if (type === 'aarudam') {
      if (activeLang === 'en') return 'Aar';
      if (activeLang === 'hi') return 'आरू';
      if (activeLang === 'te') return 'ఆరూ';
      if (activeLang === 'kn') return 'ಆರೂ';
      if (activeLang === 'ml') return 'ആരൂ';
      return 'ஆரு';
    }
    return '';
  };

  // Normalize planet short names across 6 languages
  const formatPlanetCode = (p) => {
    if (!p) return '';
    if (typeof p === 'string') return p;
    const name = (p.name || '').toLowerCase();
    const shortNameTa = p.shortNameTa || '';

    if (activeLang === 'en') {
      if (name === 'sun') return 'Sun';
      if (name === 'moon') return 'Mon';
      if (name === 'mars') return 'Mar';
      if (name === 'mercury') return 'Mer';
      if (name === 'jupiter') return 'Jup';
      if (name === 'venus') return 'Ven';
      if (name === 'saturn') return 'Sat';
      if (name === 'rahu') return 'Rah';
      if (name === 'ketu') return 'Ket';
      if (name === 'lagna') return 'Asc';
      if (name === 'maandi' || name === 'mandi') return 'Mnd';
      return p.shortName || p.name || '';
    }

    if (activeLang === 'hi') {
      if (name === 'sun') return 'सूर्य';
      if (name === 'moon') return 'चन्द्र';
      if (name === 'mars') return 'मंगल';
      if (name === 'mercury') return 'बुध';
      if (name === 'jupiter') return 'गुरु';
      if (name === 'venus') return 'शुक्र';
      if (name === 'saturn') return 'शनि';
      if (name === 'rahu') return 'राहु';
      if (name === 'ketu') return 'केतु';
      if (name === 'lagna') return 'लग्न';
      if (name === 'maandi' || name === 'mandi') return 'मांदी';
      return p.nameHi || p.name || '';
    }

    if (activeLang === 'te') {
      if (name === 'sun') return 'సూర్య';
      if (name === 'moon') return 'చంద్ర';
      if (name === 'mars') return 'కుజ';
      if (name === 'mercury') return 'బుధ';
      if (name === 'jupiter') return 'గురు';
      if (name === 'venus') return 'శుక్ర';
      if (name === 'saturn') return 'శని';
      if (name === 'rahu') return 'రాహు';
      if (name === 'ketu') return 'కేతు';
      if (name === 'lagna') return 'లగ్నం';
      return p.nameTe || p.name || '';
    }

    if (activeLang === 'kn') {
      if (name === 'sun') return 'ಸೂರ್ಯ';
      if (name === 'moon') return 'ಚಂದ್ರ';
      if (name === 'mars') return 'ಮಂಗಳ';
      if (name === 'mercury') return 'ಬುಧ';
      if (name === 'jupiter') return 'ಗುರು';
      if (name === 'venus') return 'ಶುಕ್ರ';
      if (name === 'saturn') return 'ಶನಿ';
      if (name === 'rahu') return 'ರಾಹು';
      if (name === 'ketu') return 'ಕೇತು';
      if (name === 'lagna') return 'ಲಗ್ನ';
      return p.nameKn || p.name || '';
    }

    if (activeLang === 'ml') {
      if (name === 'sun') return 'സൂര്യ';
      if (name === 'moon') return 'ചന്ദ്ര';
      if (name === 'mars') return 'ചൊവ്വ';
      if (name === 'mercury') return 'ബുധ';
      if (name === 'jupiter') return 'വ്യാഴം';
      if (name === 'venus') return 'ശുക്ര';
      if (name === 'saturn') return 'ശനി';
      if (name === 'rahu') return 'രാഹു';
      if (name === 'ketu') return 'കേതു';
      if (name === 'lagna') return 'ലഗ്നം';
      return p.nameMl || p.name || '';
    }

    // Default Tamil
    if (name === 'sun' || shortNameTa === 'சூ' || name === 'சூரியன்') return 'சூரி';
    if (name === 'moon' || shortNameTa === 'சந்' || name === 'சந்திரன்') return 'சந்த்';
    if (name === 'mars' || shortNameTa === 'செவ்' || name === 'செவ்வாய்') return 'செவ்';
    if (name === 'mercury' || shortNameTa === 'பு' || name === 'புதன்') return 'புத';
    if (name === 'jupiter' || shortNameTa === 'குரு') return 'குரு';
    if (name === 'venus' || shortNameTa === 'சுக்' || name === 'சுக்கிரன்') return 'சுக்';
    if (name === 'saturn' || shortNameTa === 'சனி') return 'சனி';
    if (name === 'rahu' || shortNameTa === 'ரா' || name === 'ராகு') return 'ராகு';
    if (name === 'ketu' || shortNameTa === 'கே' || name === 'கேது') return 'கேது';
    if (name === 'lagna' || shortNameTa === 'ல' || name === 'லக்னம்') return 'லக்';
    if (name === 'maandi' || name === 'mandi' || shortNameTa === 'மா' || name === 'மாந்தி') return 'மாந்தி';
    return p.shortName || p.name || '';
  };

  /**
   * Render individual Rasi house cell (0 to 11)
   */
  const renderRasiBox = (rasiId) => {
    const isUdhayam = rasiId === udhayamIndex;
    const isAarudam = rasiId === aarudamIndex;
    const rawPlanets = rasiGrid[rasiId] || [];

    // Filter out duplicate or null planets
    const housePlanets = rawPlanets.filter((p) => p && p.name !== 'Udhayam' && p.name !== 'Aarudam');
    const rasiName = getLocalizedPrasannamRasiName(rasiId, activeLang);
    const rasiLordName = getLocalizedPrasannamRasiLord(rasiId, activeLang);
    const rasiObj = PRASANNAM_RASIS[rasiId] || {};
    const houseStars = RASI_CONSTITUENT_STARS[rasiId] || [];
    const tooltipClass = getTooltipPos(rasiId);

    const udhayamAstro = isUdhayam ? enrichPlanetAstrology({
      name: 'Udhayam',
      planetFullName: activeLang === 'ta' ? 'உதயம் (Hour Ascendant)' : 'Udhayam (Hour)',
      degreeInRasi: uDegVal,
      formattedDegree: uDegFormatted
    }, rasiId, activeLang) : null;

    const aarudamAstro = isAarudam ? enrichPlanetAstrology({
      name: 'Aarudam',
      planetFullName: activeLang === 'ta' ? 'ஆரூடம் (Minute Sign)' : 'Aarudam (Minute)',
      degreeInRasi: aDegVal,
      formattedDegree: aDegFormatted
    }, rasiId, activeLang) : null;

    return (
      <div
        key={rasiId}
        className={`kadikara-rasi-box rasi-id-${rasiId} ${isUdhayam ? 'is-udhayam' : ''} ${isAarudam ? 'is-aarudam' : ''}`}
      >
        {/* Rasi Name Header with Interactive Info Tooltip */}
        <div className="kadikara-rasi-header">
          <span className="kadikara-rasi-name">{rasiName}</span>
          <span className="kadikara-rasi-info-pill" title={activeLang === 'ta' ? 'ராசி & நட்சத்திர விபரம்' : 'Rasi & Star Details'}>
            ⓘ
          </span>

          {/* Rasi Box Hover Tooltip (Showing Sign Lord + Stars & Padas in this Rasi) */}
          <div className={`kadikara-tooltip-card kadikara-rasi-tooltip ${tooltipClass}`}>
            <div className="tooltip-header">
              <span className="tooltip-planet-name">{rasiName} ({rasiObj.nameEn || ''})</span>
              <span className="tooltip-deg-badge">{activeLang === 'ta' ? 'ராசி' : 'Rasi'}</span>
            </div>
            <div className="tooltip-body">
              <div className="tooltip-item">
                <span className="tooltip-lbl">{activeLang === 'ta' ? 'ராசி:' : 'Rasi:'}</span>
                <span className="tooltip-val">{rasiName}</span>
              </div>
              <div className="tooltip-item">
                <span className="tooltip-lbl">{activeLang === 'ta' ? 'ராசி அதிபதி:' : 'Rasi Lord:'}</span>
                <span className="tooltip-val">{rasiLordName}</span>
              </div>
              <div className="tooltip-stars-divider">
                <span>{activeLang === 'ta' ? 'நட்சத்திரங்கள் & பாதங்கள்' : 'Constituent Stars & Padas'}:</span>
              </div>
              <div className="tooltip-stars-list">
                {houseStars.map((star, sIdx) => {
                  const sName = activeLang === 'ta' ? star.nameTa : star.nameEn;
                  const sLord = activeLang === 'ta' ? star.lordTa : star.lordEn;
                  const padasFormatted = star.padas.map((p, pI) => {
                    const pLord = activeLang === 'ta' ? star.padaLordsTa[pI] : star.padaLordsEn[pI];
                    return `${p} (${pLord})`;
                  }).join(', ');

                  return (
                    <div key={sIdx} className="tooltip-star-item">
                      <div className="star-title-row">
                        <span className="star-icon">✨</span>
                        <strong className="star-name">{sName}</strong>
                        <span className="star-lord-badge">({activeLang === 'ta' ? 'அதிபதி' : 'Lord'}: {sLord})</span>
                      </div>
                      <div className="star-padas-row">
                        <span className="star-pada-lbl">{activeLang === 'ta' ? 'பாத அதிபதிகள்' : 'Pada Lords'}:</span>
                        <span className="star-pada-val">{padasFormatted}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="rasi-box-content">
          {/* 1. Planets in this Rasi with Degrees & Rich Hover Tooltips */}
          {housePlanets.map((rawPlanet, pIdx) => {
            const planet = enrichPlanetAstrology(rawPlanet, rasiId, activeLang);
            const planetCode = formatPlanetCode(planet);
            const isLagna = planet.name === 'Lagna' || planet.nameTa === 'லக்னம்';
            const degStr = planet.formattedDegree || planet.degree || (planet.degreeInRasi !== undefined ? `${Math.floor(planet.degreeInRasi)}°${Math.floor((planet.degreeInRasi % 1) * 60).toString().padStart(2, '0')}'` : '');
            const isRetro = planet.isRetrograde && !isLagna && planet.name !== 'Rahu' && planet.name !== 'Ketu';

            return (
              <span
                key={pIdx}
                className={`kadikara-planet-item ${isLagna ? 'is-lagna' : ''}`}
              >
                <span className="kadikara-planet-name">{planetCode}</span>
                {degStr && <span className="kadikara-planet-deg">{degStr}</span>}
                {isRetro && <span className="kadikara-planet-retro" title={activeLang === 'ta' ? 'வக்ரம் (Retrograde)' : 'Retrograde'}>(வ)</span>}

                {/* Floating Tooltip Card with exact requested fields */}
                <div className={`kadikara-tooltip-card ${tooltipClass}`}>
                  <div className="tooltip-header">
                    <span className="tooltip-planet-name">{planet.planetFullName}</span>
                    {degStr && <span className="tooltip-deg-badge">{degStr}</span>}
                    {isRetro && (
                      <span className="tooltip-retro-badge">
                        {activeLang === 'ta' ? 'வக்ரம்' : 'Retrograde'}
                      </span>
                    )}
                  </div>
                  <div className="tooltip-body">
                    {/* 1. Raasi */}
                    <div className="tooltip-item">
                      <span className="tooltip-lbl">{activeLang === 'ta' ? 'ராசி:' : 'Rasi:'}</span>
                      <span className="tooltip-val">{planet.rasiName}</span>
                    </div>
                    {/* 2. Raasi Athipathi */}
                    <div className="tooltip-item">
                      <span className="tooltip-lbl">{activeLang === 'ta' ? 'ராசி அதிபதி:' : 'Rasi Lord:'}</span>
                      <span className="tooltip-val">{planet.rasiLordName}</span>
                    </div>
                    {/* 3. Natchathiram */}
                    <div className="tooltip-item">
                      <span className="tooltip-lbl">{activeLang === 'ta' ? 'நட்சத்திரம்:' : 'Nakshatra:'}</span>
                      <span className="tooltip-val">{planet.nakshatraName}</span>
                    </div>
                    {/* 4. Natch Athipathi */}
                    <div className="tooltip-item">
                      <span className="tooltip-lbl">{activeLang === 'ta' ? 'நட்சத்திர அதிபதி:' : 'Nakshatra Lord:'}</span>
                      <span className="tooltip-val">{planet.nakshatraLordName}</span>
                    </div>
                    {/* 5. Natchathira Padam */}
                    <div className="tooltip-item">
                      <span className="tooltip-lbl">{activeLang === 'ta' ? 'நட்சத்திர பாதம்:' : 'Pada:'}</span>
                      <span className="tooltip-val">{planet.padaText}</span>
                    </div>
                    {/* 6. Natch Pada Athipathi */}
                    <div className="tooltip-item">
                      <span className="tooltip-lbl">{activeLang === 'ta' ? 'நட்சத்திர பாத அதிபதி:' : 'Pada Lord:'}</span>
                      <span className="tooltip-val">{planet.padamLordName}</span>
                    </div>
                  </div>
                </div>
              </span>
            );
          })}

          {/* 2. Udhayam Highlight with Degree & Tooltip */}
          {isUdhayam && (
            <span className="prasannam-highlight-tag udhayam-badge">
              <span className="kadikara-planet-name">{getBadgeShort('udhayam')}</span>
              <span className="kadikara-planet-deg prasannam-deg">{uDegFormatted}</span>
              <div className={`kadikara-tooltip-card udhayam-tooltip ${tooltipClass}`}>
                <div className="tooltip-header">
                  <span className="tooltip-planet-name">
                    {activeLang === 'ta' ? 'உதயம் (Hour Ascendant)' : 'Udhayam (Hour)'}
                  </span>
                  <span className="tooltip-deg-badge" style={{ background: '#dc2626', color: '#fff' }}>
                    {uDegFormatted}
                  </span>
                </div>
                <div className="tooltip-body">
                  <div className="tooltip-item">
                    <span className="tooltip-lbl">{activeLang === 'ta' ? 'ராசி:' : 'Rasi:'}</span>
                    <span className="tooltip-val">{rasiName}</span>
                  </div>
                  <div className="tooltip-item">
                    <span className="tooltip-lbl">{activeLang === 'ta' ? 'ராசி அதிபதி:' : 'Rasi Lord:'}</span>
                    <span className="tooltip-val">{rasiLordName}</span>
                  </div>
                  {udhayamAstro && (
                    <>
                      <div className="tooltip-item">
                        <span className="tooltip-lbl">{activeLang === 'ta' ? 'நட்சத்திரம்:' : 'Nakshatra:'}</span>
                        <span className="tooltip-val">{udhayamAstro.nakshatraName}</span>
                      </div>
                      <div className="tooltip-item">
                        <span className="tooltip-lbl">{activeLang === 'ta' ? 'நட்சத்திர அதிபதி:' : 'Nakshatra Lord:'}</span>
                        <span className="tooltip-val">{udhayamAstro.nakshatraLordName}</span>
                      </div>
                      <div className="tooltip-item">
                        <span className="tooltip-lbl">{activeLang === 'ta' ? 'நட்சத்திர பாதம்:' : 'Pada:'}</span>
                        <span className="tooltip-val">{udhayamAstro.padaText}</span>
                      </div>
                      <div className="tooltip-item">
                        <span className="tooltip-lbl">{activeLang === 'ta' ? 'நட்சத்திர பாத அதிபதி:' : 'Pada Lord:'}</span>
                        <span className="tooltip-val">{udhayamAstro.padamLordName}</span>
                      </div>
                    </>
                  )}
                  <div className="tooltip-item">
                    <span className="tooltip-lbl">{activeLang === 'ta' ? 'நிலை:' : 'Role:'}</span>
                    <span className="tooltip-val">{activeLang === 'ta' ? 'கேள்வி கேட்ட நேரம் (மணி)' : 'Querent Indicator (Hour)'}</span>
                  </div>
                </div>
              </div>
            </span>
          )}

          {/* 3. Aarudam Highlight with Degree & Tooltip */}
          {isAarudam && (
            <span className="prasannam-highlight-tag aarudam-badge">
              <span className="kadikara-planet-name">{getBadgeShort('aarudam')}</span>
              <span className="kadikara-planet-deg prasannam-deg">{aDegFormatted}</span>
              <div className={`kadikara-tooltip-card aarudam-tooltip ${tooltipClass}`}>
                <div className="tooltip-header">
                  <span className="tooltip-planet-name">
                    {activeLang === 'ta' ? 'ஆரூடம் (Minute Sign)' : 'Aarudam (Minute)'}
                  </span>
                  <span className="tooltip-deg-badge" style={{ background: '#dc2626', color: '#fff' }}>
                    {aDegFormatted}
                  </span>
                </div>
                <div className="tooltip-body">
                  <div className="tooltip-item">
                    <span className="tooltip-lbl">{activeLang === 'ta' ? 'ராசி:' : 'Rasi:'}</span>
                    <span className="tooltip-val">{rasiName}</span>
                  </div>
                  <div className="tooltip-item">
                    <span className="tooltip-lbl">{activeLang === 'ta' ? 'ராசி அதிபதி:' : 'Rasi Lord:'}</span>
                    <span className="tooltip-val">{rasiLordName}</span>
                  </div>
                  {aarudamAstro && (
                    <>
                      <div className="tooltip-item">
                        <span className="tooltip-lbl">{activeLang === 'ta' ? 'நட்சத்திரம்:' : 'Nakshatra:'}</span>
                        <span className="tooltip-val">{aarudamAstro.nakshatraName}</span>
                      </div>
                      <div className="tooltip-item">
                        <span className="tooltip-lbl">{activeLang === 'ta' ? 'நட்சத்திர அதிபதி:' : 'Nakshatra Lord:'}</span>
                        <span className="tooltip-val">{aarudamAstro.nakshatraLordName}</span>
                      </div>
                      <div className="tooltip-item">
                        <span className="tooltip-lbl">{activeLang === 'ta' ? 'நட்சத்திர பாதம்:' : 'Pada:'}</span>
                        <span className="tooltip-val">{aarudamAstro.padaText}</span>
                      </div>
                      <div className="tooltip-item">
                        <span className="tooltip-lbl">{activeLang === 'ta' ? 'நட்சத்திர பாத அதிபதி:' : 'Pada Lord:'}</span>
                        <span className="tooltip-val">{aarudamAstro.padamLordName}</span>
                      </div>
                    </>
                  )}
                  <div className="tooltip-item">
                    <span className="tooltip-lbl">{activeLang === 'ta' ? 'நிலை:' : 'Role:'}</span>
                    <span className="tooltip-val">{activeLang === 'ta' ? 'காரிய வெற்றி நிலை (நிமிடம்)' : 'Outcome Indicator (Minute)'}</span>
                  </div>
                </div>
              </div>
            </span>
          )}
        </div>
      </div>
    );
  };

  const displayStatusSub = statusLocalized || (activeLang === 'en' ? statusEn : statusTa);

  return (
    <div className="kadikara-chart-wrapper">
      {/* Title above the chart */}
      <div className="kadikara-chart-title-bar">
        <h3 className="kadikara-chart-title">{displayTitle}</h3>
      </div>

      {/* South Indian 4x4 Grid with Hollow Center */}
      <div className="kadikara-chart-grid">
        {/* ROW 1 (Top): Pisces (11), Aries (0), Taurus (1), Gemini (2) */}
        {renderRasiBox(11)}
        {renderRasiBox(0)}
        {renderRasiBox(1)}
        {renderRasiBox(2)}

        {/* ROW 2: Aquarius (10), Center Cell (Spans 2 cols, 2 rows), Cancer (3) */}
        {renderRasiBox(10)}

        <div className="kadikara-chart-center-cell">
          <div className="kadikara-center-inner">
            {/* Chart Subheading & Heading */}
            <div className="center-chart-subheading">{t('kadikara.chartTransit', 'கோச்சாரம்')}</div>
            <div className="center-chart-heading">{t('kadikara.chartTitle', 'கடிகார பிரசன்னம்')}</div>

            {/* Date and Time */}
            <div className="center-datetime-text">{displayDateTime}</div>

            {/* Place / City & Ayanamsa */}
            <div className="center-place-text">
              {displayPlace} {ayanamsaLabel ? `(${ayanamsaLabel})` : ''}
            </div>

            {/* Status Rating Badge */}
            <div
              className="center-status-badge"
              style={{
                backgroundColor: badgeBg,
                color: badgeText
              }}
            >
              <div className="badge-line-en">{statusEn}</div>
              <div className="badge-line-ta">{displayStatusSub}</div>
            </div>

            {/* Distance Formulas */}
            <div className="center-formulas-wrap">
              <div className="formula-line">
                <span className="formula-label">{t('kadikara.udhayamAarudamFormula', 'உத->ஆரு=')}</span>
                <span className="formula-val">{udhayamToAarudam}</span>
              </div>
              <div className="formula-line">
                <span className="formula-label">{t('kadikara.aarudamUdhayamFormula', 'ஆரு->உத=')}</span>
                <span className="formula-val">{aarudamToUdhayam}</span>
              </div>
            </div>
          </div>
        </div>

        {renderRasiBox(3)}

        {/* ROW 3: Capricorn (9), Leo (4) */}
        {renderRasiBox(9)}
        {renderRasiBox(4)}

        {/* ROW 4 (Bottom): Sagittarius (8), Scorpio (7), Libra (6), Virgo (5) */}
        {renderRasiBox(8)}
        {renderRasiBox(7)}
        {renderRasiBox(6)}
        {renderRasiBox(5)}
      </div>
    </div>
  );
}
