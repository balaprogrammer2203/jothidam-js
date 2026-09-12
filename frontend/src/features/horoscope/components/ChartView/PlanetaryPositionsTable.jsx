import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  DISPLAY_PLANET_ORDER,
  PLANET_SYMBOLS,
  ZODIAC_SYMBOLS
} from '../../../../config/constants';
import {
  getLocalizedPlanet,
  getLocalizedRasi,
  getLocalizedNakshatra
} from '../../../../utils/astrologyLocalization';

function formatDegMin(degree) {
  if (degree === undefined || degree === null || isNaN(degree)) return '-';
  const deg = Math.floor(degree);
  const min = Math.floor((degree - deg) * 60);
  return `${deg}° ${min < 10 ? '0' : ''}${min}'`;
}

export default function PlanetaryPositionsTable({ planets = [] }) {
  const { t, i18n } = useTranslation(['horoscope', 'astrology', 'common']);
  const currentLang = i18n.language || 'ta';

  if (!planets || planets.length === 0) return null;

  // Sort planets according to standard Vedic order
  const sortedPlanets = [...planets].sort((a, b) => {
    const idxA = DISPLAY_PLANET_ORDER.indexOf(a.name);
    const idxB = DISPLAY_PLANET_ORDER.indexOf(b.name);
    const orderA = idxA === -1 ? 99 : idxA;
    const orderB = idxB === -1 ? 99 : idxB;
    return orderA - orderB;
  });

  return (
    <div className="planetary-positions-section">
      {/* Enterprise Card Header */}
      <div className="table-card-header-bar">
        <div className="table-card-title-box">
          <span className="table-card-icon">🪐</span>
          <div>
            <h3 className="planetary-title">{t('horoscope:planetaryTable.title', 'Planetary Positions')}</h3>
            <p className="planetary-subtitle">
              {t('horoscope:planetaryTable.subtitle', 'Precise astronomical positions of planets at the given birth time.')}
            </p>
          </div>
        </div>
      </div>

      <div className="table-responsive-container">
        <table className="planetary-table">
          <thead>
            <tr>
              <th className="col-planet">{t('horoscope:planetaryTable.colPlanet', 'Planets')}</th>
              <th className="col-position">{t('horoscope:planetaryTable.colPosition', 'Position')}</th>
              <th className="col-degrees">{t('horoscope:planetaryTable.colDegrees', 'Degrees')}</th>
              <th className="col-rasi">{t('horoscope:planetaryTable.colRasi', 'Rasi')}</th>
              <th className="col-rasi-lord">{t('horoscope:planetaryTable.colRasiLord', 'Rasi Lord')}</th>
              <th className="col-nakshatra">{t('horoscope:planetaryTable.colNakshatra', 'Nakshatra')}</th>
              <th className="col-nakshatra-lord">{t('horoscope:planetaryTable.colNakshatraLord', 'Nakshatra Lord')}</th>
            </tr>
          </thead>
          <tbody>
            {sortedPlanets.map((p, idx) => {
              const meta = PLANET_SYMBOLS[p.name] || {
                symbol: '•',
                color: '#475569'
              };
              const zodiacMeta = ZODIAC_SYMBOLS[p.rasiId] || { symbol: '', color: '#475569' };

              // Localized planet name across all 6 languages
              const locPlanet = getLocalizedPlanet(p.name, currentLang);
              const planetDisplayName = locPlanet.name || p.name;

              // Localized Rasi name across all 6 languages
              const rasiDisplayName = getLocalizedRasi(p.rasiId ?? p.rasiName, currentLang) || p.rasiName;

              // Localized Lords across all 6 languages
              const rasiLordName = p.rasiAthipathi?.name ? getLocalizedPlanet(p.rasiAthipathi.name, currentLang).name : '-';
              const nakshatraLordName = p.nakshatraAthipathi?.name ? getLocalizedPlanet(p.nakshatraAthipathi.name, currentLang).name : '-';

              // Localized Nakshatra name across all 6 languages
              const nakshatraDisplayName = getLocalizedNakshatra(p.nakshatraId ?? p.nakshatraName, currentLang) || p.nakshatraName || '-';
              const isLagna = p.name === 'Lagna' || p.name === 'Ascendant';
              const isMaandi = p.name === 'Maandi' || p.name === 'Mandi';

              return (
                <tr key={idx} className={isLagna ? 'lagna-row-highlight' : (isMaandi ? 'maandi-row-highlight' : '')}>
                  {/* 1. Planet */}
                  <td className="cell-planet">
                    <div className="planet-cell-wrapper">
                      {isMaandi ? (
                        <span className="maandi-table-badge" style={{ background: '#f3e8ff', color: '#7e22ce', border: '1px solid #d8b4fe', padding: '1px 6px', borderRadius: '3px', fontSize: '11px', fontWeight: '700' }}>
                          {currentLang === 'ta' ? 'மா' : 'Maa'}
                        </span>
                      ) : isLagna ? (
                        <span className="asc-badge">Asc</span>
                      ) : (
                        <span className="astro-glyph" style={{ color: meta.color }}>
                          {meta.symbol}
                        </span>
                      )}
                      <span className="planet-title-bold">
                        {planetDisplayName}
                        {p.isRetrograde && (
                          <span className="retro-tag">
                            {t('horoscope:chart.retrogradeShort', '(R)')}
                          </span>
                        )}
                      </span>
                    </div>
                  </td>

                  {/* 2. Absolute Longitude 0-360° */}
                  <td className="cell-position deg-mono">
                    {formatDegMin(p.longitude)}
                  </td>

                  {/* 3. Degrees (Degree in Rasi 0-30°) */}
                  <td className="cell-degrees deg-mono font-bold">
                    {formatDegMin(p.degreeInRasi)}
                  </td>

                  {/* 4. Rasi */}
                  <td className="cell-rasi">
                    <div className="rasi-cell-wrapper">
                      <span className="zodiac-glyph-badge" style={{ color: zodiacMeta.color }}>
                        {zodiacMeta.symbol}
                      </span>
                      <span className="rasi-title">
                        {rasiDisplayName}
                      </span>
                    </div>
                  </td>

                  {/* 5. Rasi Lord */}
                  <td className="cell-rasi-lord">
                    <span className="lord-name">
                      {rasiLordName}
                    </span>
                  </td>

                  {/* 6. Nakshatra with Pada */}
                  <td className="cell-nakshatra">
                    <div className="nakshatra-cell-wrapper">
                      <span className="nakshatra-name">
                        {nakshatraDisplayName}
                      </span>
                      {p.pada && (
                        <span className="pada-badge">
                          {t('horoscope:chart.pada', 'Pada')} {p.pada}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* 7. Nakshatra Lord */}
                  <td className="cell-nakshatra-lord">
                    <span className="lord-name lord-highlight">
                      {nakshatraLordName}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
