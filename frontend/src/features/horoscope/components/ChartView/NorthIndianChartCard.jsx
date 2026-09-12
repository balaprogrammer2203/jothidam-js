import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  MONTHS,
  getLocalizedPlanet,
  getLocalizedRasiName,
  getRasiLordName,
  getNakshatraLordName
} from '../../../../config/constants';

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

// 12 North Indian House Definitions (Bounding boxes for foreignObject and sign number positions in 420x420 SVG)
const NORTH_HOUSES_CONFIG = [
  {
    houseNum: 1,
    nameKey: 'house1',
    signPos: { x: 210, y: 194 },
    foRect: { x: 135, y: 40, width: 150, height: 110 },
    tooltipPos: 'pos-top-mid'
  },
  {
    houseNum: 2,
    nameKey: 'house2',
    signPos: { x: 185, y: 88 },
    foRect: { x: 30, y: 15, width: 140, height: 65 },
    tooltipPos: 'pos-top-left'
  },
  {
    houseNum: 3,
    nameKey: 'house3',
    signPos: { x: 88, y: 185 },
    foRect: { x: 15, y: 30, width: 65, height: 140 },
    tooltipPos: 'pos-top-left'
  },
  {
    houseNum: 4,
    nameKey: 'house4',
    signPos: { x: 194, y: 210 },
    foRect: { x: 40, y: 135, width: 110, height: 150 },
    tooltipPos: 'pos-left-mid'
  },
  {
    houseNum: 5,
    nameKey: 'house5',
    signPos: { x: 88, y: 235 },
    foRect: { x: 15, y: 250, width: 65, height: 140 },
    tooltipPos: 'pos-bottom-left'
  },
  {
    houseNum: 6,
    nameKey: 'house6',
    signPos: { x: 185, y: 332 },
    foRect: { x: 30, y: 340, width: 140, height: 65 },
    tooltipPos: 'pos-bottom-left'
  },
  {
    houseNum: 7,
    nameKey: 'house7',
    signPos: { x: 210, y: 226 },
    foRect: { x: 135, y: 270, width: 150, height: 110 },
    tooltipPos: 'pos-bottom-mid'
  },
  {
    houseNum: 8,
    nameKey: 'house8',
    signPos: { x: 235, y: 332 },
    foRect: { x: 250, y: 340, width: 140, height: 65 },
    tooltipPos: 'pos-bottom-right'
  },
  {
    houseNum: 9,
    nameKey: 'house9',
    signPos: { x: 332, y: 235 },
    foRect: { x: 340, y: 250, width: 65, height: 140 },
    tooltipPos: 'pos-bottom-right'
  },
  {
    houseNum: 10,
    nameKey: 'house10',
    signPos: { x: 226, y: 210 },
    foRect: { x: 270, y: 135, width: 110, height: 150 },
    tooltipPos: 'pos-right-mid'
  },
  {
    houseNum: 11,
    nameKey: 'house11',
    signPos: { x: 332, y: 185 },
    foRect: { x: 340, y: 30, width: 65, height: 140 },
    tooltipPos: 'pos-top-right'
  },
  {
    houseNum: 12,
    nameKey: 'house12',
    signPos: { x: 235, y: 88 },
    foRect: { x: 250, y: 15, width: 140, height: 65 },
    tooltipPos: 'pos-top-right'
  }
];

export default function NorthIndianChartCard({
  gridData = [],
  title,
  centerLabel,
  showDegrees = true,
  dob = '',
  tob = '',
  nakshatra = '',
  lagnaRasiId = 0
}) {
  const { t, i18n } = useTranslation(['horoscope', 'astrology', 'common']);
  const currentLang = i18n.language || 'ta';

  const chartTitle = title || t('horoscope:chart.rasiChartTitle', 'Rasi Chart (D1)');
  const centerText = centerLabel || t('horoscope:chart.rasiCenterLabel', 'Rasi');

  const formattedDate = formatProkeralaDate(dob);
  const formattedTime = formatProkeralaTime(tob);

  const getPlanetShort = (p) => {
    const loc = getLocalizedPlanet(p.name, currentLang);
    return loc.short || p.shortNameTa || p.name;
  };

  const isLagnaPlanet = (p) => p.name === 'Lagna' || p.nameTa === 'லக்னம்';
  const isMaandiPlanet = (p) => p.name === 'Maandi' || p.name === 'Mandi' || p.nameTa === 'மாந்தி';

  return (
    <div className="astrology-card north-indian-card">
      {/* Light Sunny Yellow Card Header */}
      <div className="card-header">
        <span className="header-icon">🕉️</span>
        <span>{chartTitle}</span>
        <span className="north-style-badge">{t('horoscope:form.northIndian', 'North Indian')}</span>
      </div>

      <div className="north-chart-wrapper">
        <svg
          viewBox="0 0 420 420"
          className="north-indian-svg"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background Canvas */}
          <rect x="10" y="10" width="400" height="400" className="north-canvas-bg" />

          {/* Cross Diagonals */}
          <line x1="10" y1="10" x2="410" y2="410" className="north-grid-line" />
          <line x1="410" y1="10" x2="10" y2="410" className="north-grid-line" />

          {/* Inscribed Diamond (Houses 1, 4, 7, 10) */}
          <polygon
            points="210,10 410,210 210,410 10,210"
            className="north-diamond-line"
          />

          {/* Outer Border */}
          <rect x="10" y="10" width="400" height="400" className="north-outer-border" />

          {/* Render 12 Houses Content */}
          {NORTH_HOUSES_CONFIG.map((cfg) => {
            // In North Indian chart: House 1 is always Lagna sign.
            // Rasi Index for house h is (lagnaRasiId + h - 1) % 12
            const rasiIndex = (lagnaRasiId + cfg.houseNum - 1) % 12;
            const signNumber = rasiIndex + 1; // 1-indexed Rasi number (1 = Aries, 12 = Pisces)
            const rasiName = getLocalizedRasiName(rasiIndex, currentLang);
            const rawPlanets = gridData[rasiIndex] || [];
            const planetsInHouse = [...rawPlanets].sort(
              (a, b) => (a.degreeInRasi || 0) - (b.degreeInRasi || 0)
            );

            return (
              <g key={cfg.houseNum} className={`north-house-group house-${cfg.houseNum}`}>
                {/* Rasi Zodiac Sign Number Badge in Apex */}
                <text
                  x={cfg.signPos.x}
                  y={cfg.signPos.y}
                  className="north-sign-number"
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  {signNumber}
                </text>

                {/* Planets Chips Container inside House */}
                <foreignObject
                  x={cfg.foRect.x}
                  y={cfg.foRect.y}
                  width={cfg.foRect.width}
                  height={cfg.foRect.height}
                  className="north-fo-container"
                >
                  <div className="north-house-planets-box" xmlns="http://www.w3.org/1999/xhtml">
                    {planetsInHouse.map((p, pIdx) => {
                      const isLagna = isLagnaPlanet(p);
                      const shortName = getPlanetShort(p);
                      const locPlanet = getLocalizedPlanet(p.name, currentLang);
                      const planetFullName =
                        currentLang === 'en'
                          ? p.name || locPlanet.name
                          : locPlanet.name ||
                            p[`name${currentLang.charAt(0).toUpperCase() + currentLang.slice(1)}`] ||
                            p.nameTa ||
                            p.name;
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

                      const nakshatraName =
                        currentLang === 'en'
                          ? p.nakshatraName || p.nakshatraNameEn || p.nakshatraNameTa || '-'
                          : p[`nakshatraName${currentLang.charAt(0).toUpperCase() + currentLang.slice(1)}`] ||
                            p.nakshatraNameTa ||
                            p.nakshatraName ||
                            '-';

                      const isMaandi = isMaandiPlanet(p);

                      return (
                        <div
                          key={pIdx}
                          className={`planet-badge north-planet-badge ${isLagna ? 'lagna-badge' : ''} ${isMaandi ? 'maandi-badge' : ''}`}
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

                          {/* Floating Tooltip */}
                          <div className={`planet-tooltip-card ${cfg.tooltipPos}`}>
                            <div className="tooltip-header">
                              <span className="tooltip-planet-name">{planetFullName}</span>
                              {p.formattedDegree && (
                                <span className="tooltip-deg-badge">{p.formattedDegree}</span>
                              )}
                              {p.isRetrograde && !isLagna && (
                                <span className="tooltip-retro-badge">
                                  {t('horoscope:chart.retrograde', 'Retrograde')}
                                </span>
                              )}
                            </div>
                            <div className="tooltip-body">
                              <div className="tooltip-item">
                                <span className="tooltip-lbl">{t('horoscope:chart.sign', 'Rasi')}:</span>
                                <span className="tooltip-val">{rasiName} ({signNumber})</span>
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
                </foreignObject>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Meta details footer bar */}
      <div className="north-chart-footer-strip">
        <div className="north-footer-info">
          {formattedDate && <span className="north-info-date">📅 {formattedDate}</span>}
          {formattedTime && <span className="north-info-time">⏰ {formattedTime}</span>}
          {nakshatra && (
            <span className="center-nakshatra-name">⭐ {nakshatra}</span>
          )}
        </div>
      </div>
    </div>
  );
}
