import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  MONTHS,
  getLocalizedPlanet,
  getLocalizedRasiName,
  getRasiLordName,
  getNakshatraLordName
} from '../../../../config/constants';
import { formatDmsCompact, formatDmsShort } from '../../../../utils/coordinateUtils';
import { getLocalizedNakshatra } from '../../../../utils/astrologyLocalization';

function formatProkeralaDate(dob) {
  if (!dob) return '';
  const [year, month, day] = dob.split('-').map(Number);
  const mName = MONTHS[month - 1]?.name || '';
  return `${day} - ${mName} - ${year}`;
}

function formatProkeralaTime(tob) {
  if (!tob) return '';
  const [hourStr, minStr, secStr] = tob.split(':');
  const hour = parseInt(hourStr, 10);
  const min = parseInt(minStr, 10);
  const sec = parseInt(secStr || '0', 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(hour12)} : ${pad(min)} : ${pad(sec)} ${ampm}`;
}

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

export default function VedicChartCard({
  gridData = [],
  title,
  centerLabel,
  showDegrees = false,
  dob = '',
  tob = '',
  nakshatra = '',
  lagnaRasiId = null,
  place = '',
  latitude = '',
  longitude = '',
  ayanamsaName = '',
  ayanamsaNameTa = '',
  ayanamsaValue = null
}) {
  const { t, i18n } = useTranslation(['horoscope', 'astrology', 'common']);
  const currentLang = i18n.language || 'ta';

  const chartTitle = title || t('horoscope:chart.rasiChartTitle', 'Rasi Chart');
  const centerText = centerLabel || t('horoscope:chart.rasiCenterLabel', 'Rasi');

  const formattedDate = formatProkeralaDate(dob);
  const formattedTime = formatProkeralaTime(tob);

  // Short place name for compact center box view (e.g. "Dindigul" instead of "Dindigul, Dindigul District, Tamil Nadu, India")
  const shortPlace = place
    ? (place.split(',')[0] || place).trim()
    : '';

  // Compact DMS Coordinate Display for Center Box
  const latCompact = latitude !== undefined && latitude !== null && latitude !== ''
    ? formatDmsCompact(latitude, 'lat')
    : '';
  const lngCompact = longitude !== undefined && longitude !== null && longitude !== ''
    ? formatDmsCompact(longitude, 'lng')
    : '';

  const latShort = latitude !== undefined && latitude !== null && latitude !== ''
    ? formatDmsShort(latitude, 'lat')
    : '';
  const lngShort = longitude !== undefined && longitude !== null && longitude !== ''
    ? formatDmsShort(longitude, 'lng')
    : '';

  const shortCoordDisplay = (latShort && lngShort)
    ? `${latShort} • ${lngShort}`
    : (latCompact && lngCompact
      ? `${latCompact} • ${lngCompact}`
      : (latitude && longitude ? `${Number(latitude).toFixed(2)}°, ${Number(longitude).toFixed(2)}°` : ''));

  // Ayanamsa Details: clean, compact display for chart center
  const rawAyanamsaName = (currentLang === 'ta' && ayanamsaNameTa)
    ? ayanamsaNameTa
    : (ayanamsaName || 'Lahiri');
  const shortAyanamsaName = rawAyanamsaName
    .replace(/\s*\(Chitra Paksha\)/i, '')
    .replace(/\s*\(சித்ரபக்ஷம்\)/i, '')
    .replace(/\s*Ayanamsa/i, '')
    .replace(/\s*அயனாம்சம்/i, '')
    .trim() || rawAyanamsaName;

  const ayanamsaDegreeStr = typeof ayanamsaValue === 'number'
    ? `${ayanamsaValue.toFixed(2)}°`
    : (ayanamsaValue ? (isNaN(Number(ayanamsaValue)) ? `${ayanamsaValue}` : `${Number(ayanamsaValue).toFixed(2)}°`) : '');

  const shortAyanamsaDisplay = ayanamsaDegreeStr
    ? `${shortAyanamsaName}: ${ayanamsaDegreeStr}`
    : shortAyanamsaName;

  const ayanamsaFullTitle = ayanamsaDegreeStr
    ? `${rawAyanamsaName} (${ayanamsaDegreeStr})`
    : rawAyanamsaName;

  const ayanamsaLabel = currentLang === 'ta' ? 'அயனாம்சம்' : 'Ayanamsa';

  const getPlanetShort = (p) => {
    const loc = getLocalizedPlanet(p.name, currentLang);
    return loc.short || p.shortNameTa || p.name;
  };

  const isLagnaPlanet = (p) => p.name === 'Lagna' || p.nameTa === 'லக்னம்';
  const isMaandiPlanet = (p) => p.name === 'Maandi' || p.name === 'Mandi' || p.nameTa === 'மாந்தி';

  const renderHouseCell = (rasiIndex) => {
    const rawPlanets = gridData[rasiIndex] || [];
    const planetsInHouse = [...rawPlanets].sort((a, b) => (a.degreeInRasi || 0) - (b.degreeInRasi || 0));
    const houseNumber = rasiIndex + 1;
    const isLagnaHouse = rasiIndex === lagnaRasiId;
    const tooltipClass = getTooltipPos(rasiIndex);
    const rasiName = getLocalizedRasiName(rasiIndex, currentLang);

    return (
      <div
        key={rasiIndex}
        className={`rasi-cell house-${rasiIndex} ${isLagnaHouse ? 'lagna-cell' : ''}`}
      >
        <div className="cell-header-bar">
          <span className="house-number">{houseNumber}</span>
          <span className="rasi-name-label">{rasiName}</span>
        </div>

        <div className="planet-group">
          {planetsInHouse.map((p, pIdx) => {
            const isLagna = isLagnaPlanet(p);
            const isMaandi = isMaandiPlanet(p);
            const shortName = getPlanetShort(p);
            const locPlanet = getLocalizedPlanet(p.name, currentLang);
            const planetFullName = currentLang === 'en'
              ? (p.name || locPlanet.name)
              : (locPlanet.name || p[`name${currentLang.charAt(0).toUpperCase() + currentLang.slice(1)}`] || p.nameTa || p.name);
            // 1. Rasi Lord (ராசி அதிபதி)
            const rasiLordName = (p.rasiAthipathi?.name && p.rasiAthipathi.name !== '-')
              ? (getLocalizedPlanet(p.rasiAthipathi.name, currentLang).name || p.rasiAthipathi.name)
              : (p.rasiId !== undefined ? getRasiLordName(p.rasiId, currentLang) : '-');

            // 2. Nakshatra Lord (நட்சத்திர அதிபதி)
            const nakshatraLordName = (p.nakshatraAthipathi?.name && p.nakshatraAthipathi.name !== '-')
              ? (getLocalizedPlanet(p.nakshatraAthipathi.name, currentLang).name || p.nakshatraAthipathi.name)
              : (p.nakshatraId !== undefined ? getNakshatraLordName(p.nakshatraId, currentLang) : '-');

            // 3. Pada Lord (பாத அதிபதி)
            const padamLordName = (p.padamAthipathi?.name && p.padamAthipathi.name !== '-')
              ? (getLocalizedPlanet(p.padamAthipathi.name, currentLang).name || p.padamAthipathi.name)
              : (p.navamsaRasiId !== undefined ? getRasiLordName(p.navamsaRasiId, currentLang) : '-');

            const nakshatraName = getLocalizedNakshatra(p.nakshatraId ?? p.nakshatraName, currentLang) || p.nakshatraName || '-';

            return (
              <div
                key={pIdx}
                className={`planet-badge ${isLagna ? 'lagna-badge' : ''} ${isMaandi ? 'maandi-badge' : ''}`}
              >
                <span className="planet-name">{shortName}</span>
                {p.isRetrograde && !isLagna && !isMaandi && (
                  <span className="retro-indicator">
                    {t('horoscope:chart.retrogradeShort', '(R)')}
                  </span>
                )}
                {showDegrees && p.formattedDegree && (
                  <span className="planet-degree">{p.formattedDegree}</span>
                )}

                {/* Floating Tooltip Card */}
                <div className={`planet-tooltip-card ${tooltipClass}`}>
                  <div className="tooltip-header">
                    <span className="tooltip-planet-name">{planetFullName}</span>
                    {p.formattedDegree && <span className="tooltip-deg-badge">{p.formattedDegree}</span>}
                    {p.isRetrograde && !isLagna && (
                      <span className="tooltip-retro-badge">{t('horoscope:chart.retrograde', 'Retrograde')}</span>
                    )}
                  </div>
                  <div className="tooltip-body">
                    <div className="tooltip-item">
                      <span className="tooltip-lbl">{t('horoscope:chart.sign', 'Rasi')}:</span>
                      <span className="tooltip-val">{rasiName}</span>
                    </div>
                    <div className="tooltip-item">
                      <span className="tooltip-lbl">{t('horoscope:chart.rasiLord', 'Rasi Lord')}:</span>
                      <span className="tooltip-val">{rasiLordName}</span>
                    </div>
                    <div className="tooltip-item">
                      <span className="tooltip-lbl">{t('horoscope:chart.star', 'Nakshatra')}:</span>
                      <span className="tooltip-val">
                        {nakshatraName}{p.pada ? ` (${t('horoscope:chart.pada', 'Pada')} ${p.pada})` : ''}
                      </span>
                    </div>
                    <div className="tooltip-item">
                      <span className="tooltip-lbl">{t('horoscope:chart.nakshatraLord', 'Nakshatra Lord')}:</span>
                      <span className="tooltip-val">{nakshatraLordName}</span>
                    </div>
                    <div className="tooltip-item">
                      <span className="tooltip-lbl">{t('horoscope:chart.padaLord', 'Pada Lord')}:</span>
                      <span className="tooltip-val">{padamLordName}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="astrology-card">
      <div className="card-header">
        <span className="header-icon">🕉️</span>
        <span>{chartTitle}</span>
      </div>

      <div className="chart-grid-container">
        {/* Row 1: Houses 11, 0, 1, 2 */}
        {renderHouseCell(11)}
        {renderHouseCell(0)}
        {renderHouseCell(1)}
        {renderHouseCell(2)}

        {/* Row 2: House 10, Center Cell, House 3 */}
        {renderHouseCell(10)}
        <div className="center-cell">
          <div className="center-info-container">
            <div className="center-chart-name">{centerText}</div>
            {formattedDate && <div className="center-date">{formattedDate}</div>}
            {formattedTime && <div className="center-time">{formattedTime}</div>}


            {/* Additional details: location, lat/long coordinates, ayanamsa in compact small font view */}
            <div className="center-meta-details">
              {shortPlace && (
                <div className="center-meta-row center-meta-place" title={place}>
                  <span className="center-meta-icon">📍</span>
                  <span className="center-meta-val">{shortPlace}</span>
                </div>
              )}
              {shortCoordDisplay && (
                <div className="center-meta-row center-meta-coords" title={`Lat: ${latCompact} | Long: ${lngCompact}`}>
                  <span className="center-meta-icon">🌐</span>
                  <span className="center-meta-val">{shortCoordDisplay}</span>
                </div>
              )}
              {shortAyanamsaDisplay && (
                <div className="center-meta-row center-meta-ayanamsa" title={`${ayanamsaLabel}: ${ayanamsaFullTitle}`}>
                  <span className="center-meta-icon">🌌</span>
                  <span className="center-meta-val">{shortAyanamsaDisplay}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        {renderHouseCell(3)}

        {/* Row 3: House 9, House 4 */}
        {renderHouseCell(9)}
        {renderHouseCell(4)}

        {/* Row 4: Houses 8, 7, 6, 5 */}
        {renderHouseCell(8)}
        {renderHouseCell(7)}
        {renderHouseCell(6)}
        {renderHouseCell(5)}
      </div>
    </div>
  );
}
