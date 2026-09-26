import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  JAMAKKOL_RASIS,
  JAMAKKOL_UI_STRINGS,
  getLocalizedPlanetCode,
  getLocalizedCityName,
  calculateJamakkolCenterInfo,
  getLocalizedCenterInfo
} from '../../../utils/jamakkol.utils';
import {
  PRASANNAM_RASIS,
  RASI_CONSTITUENT_STARS,
  getLocalizedPrasannamRasiName,
  getLocalizedPrasannamRasiLord,
  enrichPlanetAstrology
} from '../../../utils/kadikaraPrasannam';

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

function getOuterTooltipPos(key) {
  switch (key) {
    case 'topLeft': return 'pos-top-left';
    case 'topCenter': return 'pos-top-mid';
    case 'topRight': return 'pos-top-right';
    case 'leftCenter': return 'pos-left-mid';
    case 'rightCenter': return 'pos-right-mid';
    case 'bottomLeft': return 'pos-bottom-left';
    case 'bottomCenter': return 'pos-bottom-mid';
    case 'bottomRight': return 'pos-bottom-right';
    default: return 'pos-top-mid';
  }
}

const TOOLTIP_LABELS = {
  ta: {
    rasi: 'ராசி:',
    rasiLord: 'ராசி அதிபதி:',
    nakshatra: 'நட்சத்திரம்:',
    nakshatraLord: 'நட்சத்திர அதிபதி:',
    pada: 'நட்சத்திர பாதம்:',
    padaLord: 'நட்சத்திர பாத அதிபதி:',
    retrograde: 'வக்ரம்',
    starsAndPadas: 'நட்சத்திரங்கள் & பாதங்கள்:',
    padaLords: 'பாத அதிபதிகள்:',
    lord: 'அதிபதி'
  },
  en: {
    rasi: 'Rasi:',
    rasiLord: 'Rasi Lord:',
    nakshatra: 'Nakshatra:',
    nakshatraLord: 'Nakshatra Lord:',
    pada: 'Pada:',
    padaLord: 'Pada Lord:',
    retrograde: 'Retrograde',
    starsAndPadas: 'Constituent Stars & Padas:',
    padaLords: 'Pada Lords:',
    lord: 'Lord'
  },
  hi: {
    rasi: 'राशि:',
    rasiLord: 'राशि स्वामी:',
    nakshatra: 'नक्षत्र:',
    nakshatraLord: 'नक्षत्र स्वामी:',
    pada: 'चरण / पद:',
    padaLord: 'पद स्वामी:',
    retrograde: 'वक्री',
    starsAndPadas: 'नक्षत्र और पद:',
    padaLords: 'पद स्वामी:',
    lord: 'स्वामी'
  },
  te: {
    rasi: 'రాశి:',
    rasiLord: 'రాశి అధిపతి:',
    nakshatra: 'నక్షత్రం:',
    nakshatraLord: 'నక్షత్ర అధిపతి:',
    pada: 'పాదం:',
    padaLord: 'పాద అధిపతి:',
    retrograde: 'వక్ర',
    starsAndPadas: 'నక్షత్రాలు మరియు పాదాలు:',
    padaLords: 'పాద అధిపతులు:',
    lord: 'అధిపతి'
  },
  kn: {
    rasi: 'ರಾಶಿ:',
    rasiLord: 'ರಾಶಿ ಅಧಿಪತಿ:',
    nakshatra: 'ನಕ್ಷತ್ರ:',
    nakshatraLord: 'ನಕ್ಷತ್ರ ಅಧಿಪತಿ:',
    pada: 'ಪಾದ:',
    padaLord: 'ಪಾದ ಅಧಿಪತಿ:',
    retrograde: 'ವಕ್ರ',
    starsAndPadas: 'ನಕ್ಷತ್ರಗಳು ಮತ್ತು ಪಾದಗಳು:',
    padaLords: 'ಪಾದ ಅಧಿಪತಿಗಳು:',
    lord: 'ಅಧಿಪತಿ'
  },
  ml: {
    rasi: 'രാശി:',
    rasiLord: 'രാശി അധിപൻ:',
    nakshatra: 'നക്ഷത്രം:',
    nakshatraLord: 'നക്ഷത്ര അധിപൻ:',
    pada: 'പാദം:',
    padaLord: 'പാദ അധിപൻ:',
    retrograde: 'വക്രം',
    starsAndPadas: 'നക്ഷത്രങ്ങളും പാദങ്ങളും:',
    padaLords: 'പാദ അധിപന്മാർ:',
    lord: 'അധിപൻ'
  }
};

/**
 * JamakolChartCard
 * Recreates the exact screenshot design:
 * - Warm parchment cream background
 * - 2px golden-ochre borders
 * - 8 Outer brown cards with transit degrees
 * - Red La (Lagna), Mo (Moon), Bold Ud, Ar, Kv with distinct highlights
 * - Center cell with "Jamakol Aarudam", "D1-Rasi", City, Date · Time
 * - Rich hover tooltips for each planet and Rasi header (Stars & Padas)
 * - Complete 6-language translation (Tamil, English, Hindi, Telugu, Kannada, Malayalam)
 */
export default function JamakolChartCard({
  chartData = {},
  dateTimeStr = '',
  cityName = 'Chennai',
  onChangeCity = () => {},
  lang = 'ta'
}) {
  const { i18n } = useTranslation(['astrology', 'common']);
  const activeLang = (lang || i18n.language || 'ta').split('-')[0].toLowerCase();
  const [chartStyle, setChartStyle] = useState('south'); // 'south' | 'north'

  const {
    innerChart = {},
    outerBoxes = {},
    lagnaRasiIndex: propLagnaRasiIndex,
    pillars = {}
  } = chartData;

  // Dynamically localized Panchangam & Horary center info across all 6 languages
  const rawCenterInfo = chartData.centerInfo || chartData.panchangam;
  const centerInfo = getLocalizedCenterInfo(rawCenterInfo, activeLang, chartData);

  const udhayam = pillars?.udhayam || chartData?.udhayam || { signIndex: 8, formattedDegree: "18°25'" };
  const aarudam = pillars?.aarudam || chartData?.aarudam || { signIndex: 3, formattedDegree: "24°19'" };
  const kavippu = pillars?.kavippu || chartData?.kavippu || { signIndex: 6, formattedDegree: "06°08'" };

  const rasiGrid = chartData.rasiGrid || innerChart?.rasiGrid || Array.from({ length: 12 }, () => []);

  // Determine true Lagna Rasi Index (prioritize finding in rasiGrid, fallback to prop or 6 - Libra)
  let foundLagnaRasi = -1;
  for (let r = 0; r < 12; r++) {
    const list = rasiGrid[r] || [];
    if (list.some((p) => p && (p.isLagna || (p.name || '').toLowerCase() === 'lagna' || (p.symbol || '').toLowerCase() === 'la'))) {
      foundLagnaRasi = r;
      break;
    }
  }
  const effectiveLagnaRasi = foundLagnaRasi !== -1
    ? foundLagnaRasi
    : (propLagnaRasiIndex ?? chartData.lagnaRasiIndex ?? innerChart.lagnaRasiIndex ?? chartData.lagna?.rasiIndex ?? 6);

  // Prepare normalized 8 outer cards with proper fallback symbols
  const outerCards = [
    { key: 'topLeft', box: outerBoxes?.topLeft, posClass: 'jk-box-pisces jk-badge-pisces', fallbackSymbol: 'Me', fallbackDeg: "19°27'" },
    { key: 'topCenter', box: outerBoxes?.topCenter, posClass: 'jk-box-aries jk-badge-aries-taurus', fallbackSymbol: 'Ju', fallbackDeg: "23°09'" },
    { key: 'topRight', box: outerBoxes?.topRight, posClass: 'jk-box-gemini jk-badge-gemini', fallbackSymbol: 'Ma', fallbackDeg: "0°25'" },
    { key: 'rightCenter', box: outerBoxes?.rightCenter, posClass: 'jk-box-cancer jk-badge-cancer-leo', fallbackSymbol: 'Su', fallbackDeg: "2°01'" },
    { key: 'bottomRight', box: outerBoxes?.bottomRight, posClass: 'jk-box-virgo jk-badge-virgo', fallbackSymbol: 'Sn', fallbackDeg: "4°07'" },
    { key: 'bottomCenter', box: outerBoxes?.bottomCenter, posClass: 'jk-box-libra jk-badge-libra-scorpio', fallbackSymbol: 'Mo', fallbackDeg: "5°14'" },
    { key: 'bottomLeft', box: outerBoxes?.bottomLeft, posClass: 'jk-box-sagittarius jk-badge-sagittarius', fallbackSymbol: 'Sa', fallbackDeg: "18°15'" },
    { key: 'leftCenter', box: outerBoxes?.leftCenter, posClass: 'jk-box-capricorn jk-badge-capricorn-aquarius', fallbackSymbol: 'Ve', fallbackDeg: "10°45'" }
  ];

  /**
   * Render Rasi details hover tooltip showing sign lord + constituent stars & padas
   */
  const renderRasiTooltip = (rasiId, displayName) => {
    const rasiObj = PRASANNAM_RASIS[rasiId] || {};
    const rasiLordName = getLocalizedPrasannamRasiLord(rasiId, activeLang);
    const houseStars = RASI_CONSTITUENT_STARS[rasiId] || [];
    const tooltipClass = getTooltipPos(rasiId);
    const labels = TOOLTIP_LABELS[activeLang] || TOOLTIP_LABELS.ta;

    return (
      <div className={`kadikara-tooltip-card kadikara-rasi-tooltip ${tooltipClass}`}>
        <div className="tooltip-header">
          <span className="tooltip-planet-name">{displayName} ({rasiObj.nameEn || ''})</span>
          <span className="tooltip-deg-badge">{activeLang === 'ta' ? 'ராசி' : 'Rasi'}</span>
        </div>
        <div className="tooltip-body">
          <div className="tooltip-item">
            <span className="tooltip-lbl">{labels.rasi}</span>
            <span className="tooltip-val">{displayName}</span>
          </div>
          <div className="tooltip-item">
            <span className="tooltip-lbl">{labels.rasiLord}</span>
            <span className="tooltip-val">{rasiLordName}</span>
          </div>
          <div className="tooltip-stars-divider">
            <span>{labels.starsAndPadas}</span>
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
                    <span className="star-lord-badge">({labels.lord}: {sLord})</span>
                  </div>
                  <div className="star-padas-row">
                    <span className="star-pada-lbl">{labels.padaLords}</span>
                    <span className="star-pada-val">{padasFormatted}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  /**
   * Render rich floating tooltip card for individual planet or special point
   */
  const renderPlanetTooltip = (rawItem, rasiId) => {
    const planet = enrichPlanetAstrology(rawItem, rasiId, activeLang);
    if (!planet) return null;

    const labels = TOOLTIP_LABELS[activeLang] || TOOLTIP_LABELS.ta;
    const tooltipClass = getTooltipPos(rasiId);
    const degStr = planet.formattedDegree || rawItem.formattedDegree || '';
    const isRetro = !!planet.isRetrograde && rawItem.type !== 'lagna' && planet.name !== 'Rahu' && planet.name !== 'Ketu';

    let displayName = planet.planetFullName;
    if (rawItem.type === 'lagna') {
      displayName = activeLang === 'ta' ? 'லக்னம் (Lagna)' : 'Lagna (Ascendant)';
    } else if (rawItem.type === 'udhayam') {
      displayName = activeLang === 'ta' ? 'உதயம் (Udhayam)' : 'Udhayam';
    } else if (rawItem.type === 'aarudam') {
      displayName = activeLang === 'ta' ? 'ஆரூடம் (Aarudam)' : 'Aarudam';
    } else if (rawItem.type === 'kavippu') {
      displayName = activeLang === 'ta' ? 'கவிப்பு (Kavippu)' : 'Kavippu';
    } else if (rawItem.type === 'yamakandam') {
      const names = {
        ta: 'எமகண்டம் (Yamakandam)',
        en: 'Yamakandam',
        hi: 'यमगण्ड (Yamakandam)',
        te: 'యమగండం (Yamakandam)',
        kn: 'ಯಮಗಂಡ (Yamakandam)',
        ml: 'യമകണ്ടം (Yamakandam)'
      };
      displayName = names[activeLang] || names.ta;
    } else if (rawItem.type === 'rahukalam') {
      const names = {
        ta: 'இராகு காலம் (Rahu Kalam)',
        en: 'Rahu Kalam',
        hi: 'राहु काल (Rahu Kalam)',
        te: 'రాహు కాలం (Rahu Kalam)',
        kn: 'ರಾಹು ಕಾಲ (Rahu Kalam)',
        ml: 'രാഹു കാലം (Rahu Kalam)'
      };
      displayName = names[activeLang] || names.ta;
    } else if (rawItem.type === 'maandi') {
      const names = {
        ta: 'மாந்தி (Maandi)',
        en: 'Maandi',
        hi: 'मांदी (Maandi)',
        te: 'మాంది (Maandi)',
        kn: 'ಮಾಂದಿ (Maandi)',
        ml: 'മാന്തി (Maandi)'
      };
      displayName = names[activeLang] || names.ta;
    } else if (rawItem.type === 'mrityu') {
      const names = {
        ta: 'மிருத்யு (Mrityu)',
        en: 'Mrityu',
        hi: 'मृत्यु (Mrityu)',
        te: 'మృత్యు (Mrityu)',
        kn: 'ಮೃತ್ಯು (Mrityu)',
        ml: 'മൃത്യു (Mrityu)'
      };
      displayName = names[activeLang] || names.ta;
    }

    return (
      <div className={`kadikara-tooltip-card ${tooltipClass}`}>
        <div className="tooltip-header">
          <span className="tooltip-planet-name">{displayName}</span>
          {degStr && <span className="tooltip-deg-badge">{degStr}</span>}
          {isRetro && (
            <span className="tooltip-retro-badge">
              {labels.retrograde}
            </span>
          )}
        </div>
        <div className="tooltip-body">
          <div className="tooltip-item">
            <span className="tooltip-lbl">{labels.rasi}</span>
            <span className="tooltip-val">{planet.rasiName}</span>
          </div>
          <div className="tooltip-item">
            <span className="tooltip-lbl">{labels.rasiLord}</span>
            <span className="tooltip-val">{planet.rasiLordName}</span>
          </div>
          <div className="tooltip-item">
            <span className="tooltip-lbl">{labels.nakshatra}</span>
            <span className="tooltip-val">{planet.nakshatraName}</span>
          </div>
          <div className="tooltip-item">
            <span className="tooltip-lbl">{labels.nakshatraLord}</span>
            <span className="tooltip-val">{planet.nakshatraLordName}</span>
          </div>
          <div className="tooltip-item">
            <span className="tooltip-lbl">{labels.pada}</span>
            <span className="tooltip-val">{planet.padaText}</span>
          </div>
          <div className="tooltip-item">
            <span className="tooltip-lbl">{labels.padaLord}</span>
            <span className="tooltip-val">{planet.padamLordName}</span>
          </div>
        </div>
      </div>
    );
  };

  /**
   * Render rich tooltip card for perimeter 8 Jama planet boxes
   */
  const renderOuterTooltip = (item) => {
    const outerSign = item.box?.sign !== undefined ? item.box.sign : (item.box?.rasiIndex ?? 0);
    const rawItem = {
      name: item.box?.name || item.fallbackSymbol,
      formattedDegree: item.box?.formattedDegree || item.fallbackDeg,
      isRetrograde: item.box?.isRetrograde
    };
    const planet = enrichPlanetAstrology(rawItem, outerSign, activeLang);
    if (!planet) return null;

    const labels = TOOLTIP_LABELS[activeLang] || TOOLTIP_LABELS.ta;
    const tooltipClass = getOuterTooltipPos(item.key);
    const degStr = planet.formattedDegree || rawItem.formattedDegree || '';
    const isRetro = !!planet.isRetrograde && planet.name !== 'Rahu' && planet.name !== 'Ketu';

    return (
      <div className={`kadikara-tooltip-card ${tooltipClass}`}>
        <div className="tooltip-header">
          <span className="tooltip-planet-name">{planet.planetFullName}</span>
          {degStr && <span className="tooltip-deg-badge">{degStr}</span>}
          {isRetro && (
            <span className="tooltip-retro-badge">
              {labels.retrograde}
            </span>
          )}
        </div>
        <div className="tooltip-body">
          <div className="tooltip-item">
            <span className="tooltip-lbl">{labels.rasi}</span>
            <span className="tooltip-val">{planet.rasiName}</span>
          </div>
          <div className="tooltip-item">
            <span className="tooltip-lbl">{labels.rasiLord}</span>
            <span className="tooltip-val">{planet.rasiLordName}</span>
          </div>
          <div className="tooltip-item">
            <span className="tooltip-lbl">{labels.nakshatra}</span>
            <span className="tooltip-val">{planet.nakshatraName}</span>
          </div>
          <div className="tooltip-item">
            <span className="tooltip-lbl">{labels.nakshatraLord}</span>
            <span className="tooltip-val">{planet.nakshatraLordName}</span>
          </div>
          <div className="tooltip-item">
            <span className="tooltip-lbl">{labels.pada}</span>
            <span className="tooltip-val">{planet.padaText}</span>
          </div>
          <div className="tooltip-item">
            <span className="tooltip-lbl">{labels.padaLord}</span>
            <span className="tooltip-val">{planet.padamLordName}</span>
          </div>
        </div>
      </div>
    );
  };

  /**
   * Render individual South Indian Rasi House with 100% accurate localized symbols and sign names
   */
  const renderSouthCell = (rasiId) => {
    const rasiInfo = JAMAKKOL_RASIS[rasiId] || {};
    const housePlanets = rasiGrid[rasiId] || [];

    const isLagnaHouse = rasiId === effectiveLagnaRasi;
    const isUdhayamHouse = rasiId === (udhayam.signIndex !== undefined ? udhayam.signIndex : udhayam.rasiIndex);
    const isAarudamHouse = rasiId === (aarudam.signIndex !== undefined ? aarudam.signIndex : aarudam.rasiIndex);
    const isKavippuHouse = rasiId === (kavippu.signIndex !== undefined ? kavippu.signIndex : kavippu.rasiIndex);

    // Localized Sign Name (e.g. மேஷம் in Tamil, Aries in English)
    const displayName = rasiInfo[activeLang] || rasiInfo.ta || rasiInfo.en || '';

    // Collect all entities in this house without duplication
    const items = [];

    // Helper to check existing
    const hasType = (t) => items.some((it) => it.type === t);

    // 1. Process explicit housePlanets from grid
    housePlanets.forEach((p) => {
      if (!p) return;
      const pName = (p.name || '').toLowerCase();
      const sym = (p.symbol || p.shortCode || p.name || '').toLowerCase();

      if (p.isLagna || pName === 'lagna' || pName === 'ascendant' || sym === 'la') {
        if (!hasType('lagna')) {
          items.push({
            type: 'lagna',
            name: 'Lagna',
            symbol: 'La',
            formattedDegree: p.formattedDegree || innerChart?.lagnaDegreeFormatted || '',
            isLagna: true
          });
        }
      } else if (p.isUdhayam || pName === 'udhayam' || sym === 'ud') {
        if (!hasType('udhayam')) {
          items.push({
            type: 'udhayam',
            name: 'Udhayam',
            symbol: 'Ud',
            formattedDegree: p.formattedDegree || udhayam.formattedDegree || '',
            isSpecial: true
          });
        }
      } else if (p.isAarudam || pName === 'aarudam' || sym === 'ar' || sym === 'aa') {
        if (!hasType('aarudam')) {
          items.push({
            type: 'aarudam',
            name: 'Aarudam',
            symbol: 'Ar',
            formattedDegree: p.formattedDegree || aarudam.formattedDegree || '',
            isSpecial: true
          });
        }
      } else if (p.isKavippu || pName === 'kavippu' || sym === 'kv' || sym === 'ka') {
        if (!hasType('kavippu')) {
          items.push({
            type: 'kavippu',
            name: 'Kavippu',
            symbol: 'Kv',
            formattedDegree: p.formattedDegree || kavippu.formattedDegree || '',
            isSpecial: true
          });
        }
      } else if (p.type === 'yamakandam' || pName === 'yamakandam' || sym === 'yk' || sym === 'எம') {
        if (!hasType('yamakandam')) {
          items.push({
            type: 'yamakandam',
            name: 'Yamakandam',
            symbol: 'Yk',
            formattedDegree: p.formattedDegree || '',
            degreeInRasi: p.degreeInRasi,
            color: '#8b0000',
            isSubPlanet: true
          });
        }
      } else if (p.type === 'rahukalam' || pName === 'rahukalam' || pName === 'rahu kalam' || sym === 'rk' || sym === 'ரா.கா') {
        if (!hasType('rahukalam')) {
          items.push({
            type: 'rahukalam',
            name: 'Rahu Kalam',
            symbol: 'Rk',
            formattedDegree: p.formattedDegree || '',
            degreeInRasi: p.degreeInRasi,
            color: '#8b0000',
            isSubPlanet: true
          });
        }
      } else if (p.type === 'maandi' || pName === 'maandi' || pName === 'mandi' || sym === 'mnd' || sym === 'மாந்') {
        if (!hasType('maandi')) {
          items.push({
            type: 'maandi',
            name: 'Maandi',
            symbol: 'Mnd',
            formattedDegree: p.formattedDegree || '',
            degreeInRasi: p.degreeInRasi,
            color: '#8b0000',
            isSubPlanet: true
          });
        }
      } else if (p.type === 'mrityu' || pName === 'mrityu' || pName === 'miruthyu' || sym === 'mrt' || sym === 'மிருத்யு') {
        if (!hasType('mrityu')) {
          items.push({
            type: 'mrityu',
            name: 'Mrityu',
            symbol: 'Mrt',
            formattedDegree: p.formattedDegree || '',
            degreeInRasi: p.degreeInRasi,
            color: '#800080',
            isSubPlanet: true
          });
        }
      } else {
        const isMoon = pName === 'moon' || sym === 'mo';
        items.push({
          type: isMoon ? 'moon' : 'planet',
          name: p.name || p.symbol || '',
          symbol: p.symbol || p.shortCode || p.name || '',
          formattedDegree: p.formattedDegree || '',
          isRetrograde: !!p.isRetrograde
        });
      }
    });

    // Also verify if chartData.subPlanets provides sub-planets directly
    const subPlanetsData = chartData.subPlanets || innerChart?.subPlanets;
    if (subPlanetsData) {
      if (subPlanetsData.yamakandam?.rasiIndex === rasiId && !hasType('yamakandam')) {
        items.push(subPlanetsData.yamakandam);
      }
      if (subPlanetsData.rahukalam?.rasiIndex === rasiId && !hasType('rahukalam')) {
        items.push(subPlanetsData.rahukalam);
      }
      if (subPlanetsData.maandi?.rasiIndex === rasiId && !hasType('maandi')) {
        items.push(subPlanetsData.maandi);
      }
      if (subPlanetsData.mrityu?.rasiIndex === rasiId && !hasType('mrityu')) {
        items.push(subPlanetsData.mrityu);
      }
    }


    // 2. Ensure Lagna, Udhayam, Aarudam, Kavippu exist if this house is designated
    if (isLagnaHouse && !hasType('lagna')) {
      items.unshift({
        type: 'lagna',
        name: 'Lagna',
        symbol: 'La',
        formattedDegree: chartData.lagna?.formattedDegree || innerChart?.lagnaDegreeFormatted || '',
        isLagna: true
      });
    }
    if (isUdhayamHouse && !hasType('udhayam')) {
      items.push({
        type: 'udhayam',
        name: 'Udhayam',
        symbol: 'Ud',
        formattedDegree: udhayam.formattedDegree || '',
        isSpecial: true
      });
    }
    if (isAarudamHouse && !hasType('aarudam')) {
      items.push({
        type: 'aarudam',
        name: 'Aarudam',
        symbol: 'Ar',
        formattedDegree: aarudam.formattedDegree || '',
        isSpecial: true
      });
    }
    if (isKavippuHouse && !hasType('kavippu')) {
      items.push({
        type: 'kavippu',
        name: 'Kavippu',
        symbol: 'Kv',
        formattedDegree: kavippu.formattedDegree || '',
        isSpecial: true
      });
    }

    return (
      <div key={rasiId} className={`jk-rasi-cell rasi-${rasiId}`}>
        <div className="jk-cell-header kadikara-rasi-header">
          <span className="jk-rasi-title">{displayName}</span>
          <span className="kadikara-rasi-info-pill" title={activeLang === 'ta' ? 'ராசி & நட்சத்திர விபரம்' : 'Rasi & Star Details'}>
            ⓘ
          </span>
          {renderRasiTooltip(rasiId, displayName)}
        </div>

        <div className="jk-cell-planets">
          {items.map((it, idx) => {
            const isRetro = it.isRetrograde;
            const retroStar = isRetro ? '*' : '';
            const cleanDeg = it.formattedDegree ? String(it.formattedDegree).replace(/[()]/g, '').trim() : '';
            const degDisplay = cleanDeg ? `(${cleanDeg})` : '';

            if (it.type === 'lagna') {
              const code = getLocalizedPlanetCode('La', activeLang);
              return (
                <div key={idx} className="jk-planet-entry jk-planet-lagna">
                  <span className="jk-sym-code">{code}</span>
                  {degDisplay && <span className="jk-planet-deg">{degDisplay}</span>}
                  {renderPlanetTooltip(it, rasiId)}
                </div>
              );
            }

            if (it.type === 'moon') {
              const code = getLocalizedPlanetCode('Mo', activeLang);
              return (
                <div key={idx} className="jk-planet-entry jk-planet-moon">
                  <span className="jk-sym-code">{code}</span>
                  {degDisplay && <span className="jk-planet-deg">{degDisplay}</span>}
                  {renderPlanetTooltip(it, rasiId)}
                </div>
              );
            }

            if (it.type === 'udhayam') {
              const code = getLocalizedPlanetCode('Ud', activeLang);
              return (
                <div key={idx} className="jk-planet-entry jk-point-udhayam">
                  <span className="jk-sym-code">{code}</span>
                  {degDisplay && <span className="jk-planet-deg">{degDisplay}</span>}
                  {renderPlanetTooltip(it, rasiId)}
                </div>
              );
            }

            if (it.type === 'aarudam') {
              const code = getLocalizedPlanetCode('Ar', activeLang);
              return (
                <div key={idx} className="jk-planet-entry jk-point-aarudam">
                  <span className="jk-sym-code">{code}</span>
                  {degDisplay && <span className="jk-planet-deg">{degDisplay}</span>}
                  {renderPlanetTooltip(it, rasiId)}
                </div>
              );
            }

            if (it.type === 'kavippu') {
              const code = getLocalizedPlanetCode('Kv', activeLang);
              return (
                <div key={idx} className="jk-planet-entry jk-point-kavippu">
                  <span className="jk-sym-code">{code}</span>
                  {degDisplay && <span className="jk-planet-deg">{degDisplay}</span>}
                  {renderPlanetTooltip(it, rasiId)}
                </div>
              );
            }

            // Sub-Planets: Yamakandam (எம), Rahu Kalam (ரா.கா), Maandi (மாந்)
            if (it.type === 'yamakandam' || it.type === 'rahukalam' || it.type === 'maandi') {
              const code = getLocalizedPlanetCode(it.symbol || it.name, activeLang);
              return (
                <div key={idx} className={`jk-planet-entry jk-sub-${it.type}`}>
                  <span className="jk-sym-code">{code}</span>
                  {degDisplay && <span className="jk-planet-deg">{degDisplay}</span>}
                  {renderPlanetTooltip(it, rasiId)}
                </div>
              );
            }

            // Sub-Planet: Mrityu (மிருத்யு)
            if (it.type === 'mrityu') {
              const code = getLocalizedPlanetCode(it.symbol || it.name, activeLang);
              return (
                <div key={idx} className="jk-planet-entry jk-sub-mrityu">
                  <span className="jk-sym-code">{code}</span>
                  {degDisplay && <span className="jk-planet-deg">{degDisplay}</span>}
                  {renderPlanetTooltip(it, rasiId)}
                </div>
              );
            }

            // Regular planet
            const code = getLocalizedPlanetCode(it.name || it.symbol, activeLang);
            return (
              <div key={idx} className="jk-planet-entry">
                <span>
                  {code}
                  {retroStar && <span className="jk-retro-star">*</span>}
                </span>
                {degDisplay && <span className="jk-planet-deg">{degDisplay}</span>}
                {renderPlanetTooltip(it, rasiId)}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  /**
   * Render North Indian Diamond Kundali SVG with 6-language translation
   */
  const renderNorthIndianChart = () => {
    const lagna = effectiveLagnaRasi;
    const getHouseRasi = (houseNum) => (lagna + (houseNum - 1)) % 12;

    const housePositions = [
      { num: 1, cx: 200, cy: 110 },
      { num: 2, cx: 100, cy: 50 },
      { num: 3, cx: 50, cy: 100 },
      { num: 4, cx: 110, cy: 200 },
      { num: 5, cx: 50, cy: 300 },
      { num: 6, cx: 100, cy: 350 },
      { num: 7, cx: 200, cy: 290 },
      { num: 8, cx: 300, cy: 350 },
      { num: 9, cx: 350, cy: 300 },
      { num: 10, cx: 290, cy: 200 },
      { num: 11, cx: 350, cy: 100 },
      { num: 12, cx: 300, cy: 50 }
    ];

    const localizedLa = getLocalizedPlanetCode('La', activeLang);
    const localizedUd = getLocalizedPlanetCode('Ud', activeLang);
    const localizedAr = getLocalizedPlanetCode('Ar', activeLang);
    const localizedKv = getLocalizedPlanetCode('Kv', activeLang);

    return (
      <div className="jamakol-north-chart-container">
        <svg viewBox="0 0 400 400" className="jk-north-svg">
          {/* Diamond Kundali Frame Lines */}
          <rect x="10" y="10" width="380" height="380" fill="#fffdf5" stroke="#caa254" strokeWidth="2" />
          <line x1="10" y1="10" x2="390" y2="390" stroke="#caa254" strokeWidth="2" />
          <line x1="390" y1="10" x2="10" y2="390" stroke="#caa254" strokeWidth="2" />
          <polygon points="200,10 390,200 200,390 10,200" fill="none" stroke="#caa254" strokeWidth="2" />

          {/* House Labels & Planets */}
          {housePositions.map((h) => {
            const rasiId = getHouseRasi(h.num);
            const planets = rasiGrid[rasiId] || [];
            const isUd = rasiId === (udhayam.signIndex !== undefined ? udhayam.signIndex : udhayam.rasiIndex);
            const isAr = rasiId === (aarudam.signIndex !== undefined ? aarudam.signIndex : aarudam.rasiIndex);
            const isKv = rasiId === (kavippu.signIndex !== undefined ? kavippu.signIndex : kavippu.rasiIndex);

            return (
              <g key={h.num} transform={`translate(${h.cx}, ${h.cy})`}>
                {/* Sign Number */}
                <text
                  x="0"
                  y="-15"
                  fontSize="11"
                  fontWeight="bold"
                  fill="#b45309"
                  textAnchor="middle"
                >
                  {rasiId + 1}
                </text>

                {/* Planets listing */}
                <text x="0" y="2" fontSize="9" textAnchor="middle" fill="#1e293b">
                  {h.num === 1 && <tspan fill="#dc2626" fontWeight="bold">{localizedLa} </tspan>}
                  {isUd && <tspan fill="#6d28d9" fontWeight="bold">{localizedUd} </tspan>}
                  {isAr && <tspan fill="#0284c7" fontWeight="bold">{localizedAr} </tspan>}
                  {isKv && <tspan fill="#dc2626" fontWeight="bold">{localizedKv} </tspan>}
                  {planets.map((p) => {
                    const name = (p.name || '').toLowerCase();
                    const isSpecial = name === 'lagna' || name === 'udhayam' || name === 'aarudam' || name === 'kavippu';
                    if (isSpecial) return null;

                    const isSub = p.type === 'yamakandam' || p.type === 'rahukalam' || p.type === 'maandi' || p.type === 'mrityu';
                    const code = getLocalizedPlanetCode(p.symbol || p.name, activeLang);
                    const fill = (p.type === 'mrityu') ? '#800080' : (isSub ? '#8b0000' : '#334155');
                    const weight = isSub ? 'bold' : 'normal';

                    return (
                      <tspan
                        key={p.name || p.symbol}
                        fill={fill}
                        textDecoration="none"
                        fontWeight={weight}
                      >
                        {code}{p.isRetrograde ? '*' : ''}{' '}
                      </tspan>
                    );
                  })}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    );
  };

  // Localized UI strings for the current active language
  const chartTitle = JAMAKKOL_UI_STRINGS.chartCenterTitle[activeLang] || JAMAKKOL_UI_STRINGS.chartCenterTitle.en;
  const chartSubtitle = JAMAKKOL_UI_STRINGS.chartCenterSubtitle[activeLang] || JAMAKKOL_UI_STRINGS.chartCenterSubtitle.en;
  const locationLabel = JAMAKKOL_UI_STRINGS.locationLabel[activeLang] || JAMAKKOL_UI_STRINGS.locationLabel.en;
  const changeCityText = JAMAKKOL_UI_STRINGS.changeCityLink[activeLang] || JAMAKKOL_UI_STRINGS.changeCityLink.en;
  const southIndianText = JAMAKKOL_UI_STRINGS.southIndian[activeLang] || JAMAKKOL_UI_STRINGS.southIndian.en;
  const northIndianText = JAMAKKOL_UI_STRINGS.northIndian[activeLang] || JAMAKKOL_UI_STRINGS.northIndian.en;
  const localizedCity = getLocalizedCityName(cityName, activeLang);

  return (
    <div className="jamakol-chart-block">
      <div className="jamakol-chart-frame-card">
        <div className="jamakol-outer-chart-wrapper">
          {/* Chart View Toggle: South Indian or North Indian */}
          {chartStyle === 'south' ? (
            <div className="jamakol-south-container">
              {/* 8 Outer Brown Square Boxes matching exact user screenshot */}
              {outerCards.map((item) => {
                const rawSym = item.box?.symbol || item.fallbackSymbol;
                const localizedSym = getLocalizedPlanetCode(rawSym, activeLang);
                const deg = item.box?.formattedDegree || item.fallbackDeg;
                const isRetro = item.box?.isRetrograde;
                const retroStar = isRetro ? '*' : '';
                const isLong = (localizedSym || '').length >= 3;
                return (
                  <div
                    key={item.key}
                    className={`jk-outer-box ${item.posClass}`}
                  >
                    <span className={`jk-box-sym ${isLong ? 'is-long' : ''}`}>
                      {localizedSym}{retroStar}
                    </span>
                    <span className="jk-box-deg">{deg}</span>
                    {renderOuterTooltip(item)}
                  </div>
                );
              })}

              <div className="jamakol-grid-south">
                {/* ROW 1: Pisces (11), Aries (0), Taurus (1), Gemini (2) */}
                {renderSouthCell(11)}
                {renderSouthCell(0)}
                {renderSouthCell(1)}
                {renderSouthCell(2)}

                {/* ROW 2: Aquarius (10), Center Cell, Cancer (3) */}
                {renderSouthCell(10)}

                {/* Center 2x2 Cell with Panchangam & Horary Info matching user screenshot */}
                <div className="jk-chart-center-cell">
                  {/* Row 1: Timestamp */}
                  <div className="jk-center-panchangam-header">
                    <span className="jk-center-time-text">{centerInfo.queryDateTimeStr}</span>
                  </div>

                  {/* Row 2: Vaaram */}
                  <div className="jk-center-row">
                    <span className="jk-center-label">{centerInfo.vaaram?.label}: </span>
                    <span className="jk-center-val">{centerInfo.vaaram?.value}</span>
                  </div>

                  {/* Row 3: Nakshatram */}
                  <div className="jk-center-row">
                    <span className="jk-center-label">{centerInfo.nakshatram?.label}: </span>
                    <span className="jk-center-val">{centerInfo.nakshatram?.value}</span>
                  </div>

                  {/* Row 4: Thithi */}
                  <div className="jk-center-row">
                    <span className="jk-center-label">{centerInfo.thithi?.label}: </span>
                    <span className="jk-center-val">{centerInfo.thithi?.value}</span>
                  </div>

                  {/* Row 5: Karanam */}
                  <div className="jk-center-row">
                    <span className="jk-center-label">{centerInfo.karanam?.label}: </span>
                    <span className="jk-center-val">{centerInfo.karanam?.value}</span>
                  </div>

                  {/* Row 6: Yogam */}
                  <div className="jk-center-row">
                    <span className="jk-center-label">{centerInfo.yogam?.label}: </span>
                    <span className="jk-center-val">{centerInfo.yogam?.value}</span>
                  </div>

                  {/* Row 7: Horai */}
                  <div className="jk-center-row">
                    <span className="jk-center-label">{centerInfo.horai?.label}: </span>
                    <span className="jk-center-val jk-val-horai">
                      {centerInfo.horai?.value}
                    </span>
                  </div>

                  {/* Row 8: Gowri */}
                  <div className="jk-center-row">
                    <span className="jk-center-label">{centerInfo.gowri?.label}: </span>
                    <span className={`jk-center-val jk-val-gowri ${centerInfo.gowri?.isAuspicious ? 'auspicious' : (centerInfo.gowri?.key === 'Uthi' ? 'neutral' : 'inauspicious')}`}>
                      {centerInfo.gowri?.value}
                    </span>
                  </div>

                  {/* Row 9: Sunrise */}
                  <div className="jk-center-row">
                    <span className="jk-center-icon">🌅 : </span>
                    <span className="jk-center-val">{centerInfo.sunrise?.value}</span>
                  </div>

                  {/* Row 10: Sunset */}
                  <div className="jk-center-row">
                    <span className="jk-center-icon">🌇 : </span>
                    <span className="jk-center-val">{centerInfo.sunset?.value}</span>
                  </div>

                  {/* Row 11: Location */}
                  <div className="jk-center-row">
                    <span className="jk-center-label">{centerInfo.location?.label}: </span>
                    <span className="jk-center-val">{centerInfo.location?.value}</span>
                  </div>
                </div>

                {renderSouthCell(3)}

                {/* ROW 3: Capricorn (9), Leo (4) */}
                {renderSouthCell(9)}
                {renderSouthCell(4)}

                {/* ROW 4: Sagittarius (8), Scorpio (7), Libra (6), Virgo (5) */}
                {renderSouthCell(8)}
                {renderSouthCell(7)}
                {renderSouthCell(6)}
                {renderSouthCell(5)}
              </div>
            </div>
          ) : (
            <div className="jamakol-north-container">
              {outerCards.map((item) => {
                const rawSym = item.box?.symbol || item.fallbackSymbol;
                const localizedSym = getLocalizedPlanetCode(rawSym, activeLang);
                const deg = item.box?.formattedDegree || item.fallbackDeg;
                const isRetro = item.box?.isRetrograde;
                const retroStar = isRetro ? '*' : '';
                const isLong = (localizedSym || '').length >= 3;
                return (
                  <div
                    key={item.key}
                    className={`jk-outer-box ${item.posClass}`}
                  >
                    <span className={`jk-box-sym ${isLong ? 'is-long' : ''}`}>
                      {localizedSym}{retroStar}
                    </span>
                    <span className="jk-box-deg">{deg}</span>
                    {renderOuterTooltip(item)}
                  </div>
                );
              })}
              {renderNorthIndianChart()}
            </div>
          )}
        </div>
      </div>

      {/* Outside & Below Chart: [South / North Indian] Toggle */}
      <div className="jamakol-chart-outer-footer">
        <div className="jk-chart-style-toggle" role="group" aria-label="Chart Style">
          <button
            type="button"
            className={`jk-toggle-btn ${chartStyle === 'south' ? 'active' : ''}`}
            onClick={() => setChartStyle('south')}
          >
            {southIndianText}
          </button>
          <button
            type="button"
            className={`jk-toggle-btn ${chartStyle === 'north' ? 'active' : ''}`}
            onClick={() => setChartStyle('north')}
          >
            {northIndianText}
          </button>
        </div>
      </div>
    </div>
  );
}
