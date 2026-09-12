import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import masterDataService from '../services/masterData.service';
import SEOHead from '../components/common/SEOHead';
import Breadcrumbs from '../components/common/Breadcrumbs';
import { PLANET_SYMBOLS } from '../config/constants';
import { getLocalizedValue, getLocalizedCardTitles, getUIString } from '../utils/localizedContent';

export default function PlanetsPage() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'en';
  const navigate = useNavigate();

  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPlanets();
  }, []);

  const fetchPlanets = async () => {
    setLoading(true);
    try {
      const data = await masterDataService.getPlanets();
      setPlanets(data);
    } catch (err) {
      console.error('Failed to load planets:', err);
    } finally {
      setLoading(false);
    }
  };

  const breadcrumbItems = [
    { label: getUIString('home', currentLang, 'Home'), link: '/' },
    { label: getUIString('planetsTitle', currentLang, 'Navagraha (9 Planets) Directory'), active: true }
  ];

  const getOwnRasisDisplay = (p) => {
    if (Array.isArray(p.ownRasis) && p.ownRasis.length > 0) {
      return p.ownRasis
        .map((r) => getLocalizedValue(r, currentLang))
        .filter(Boolean)
        .join(', ');
    }
    if (p.ownSign) {
      return getLocalizedValue(p.ownSign, currentLang);
    }
    return '-';
  };

  const getExaltationDisplay = (p) => {
    if (p.exaltationRasi && (p.exaltationRasi.name || p.exaltationRasi.nameTa || p.exaltationRasi.nameMl)) {
      const signName = getLocalizedValue(p.exaltationRasi, currentLang);
      const deg =
        p.exaltationRasi.degree !== undefined && p.exaltationRasi.degree !== null
          ? ` (${p.exaltationRasi.degree}°)`
          : '';
      return `${signName}${deg}`;
    }
    if (p.exaltationSign) {
      const signName = getLocalizedValue(p.exaltationSign, currentLang);
      const deg = p.exaltationDegree ? ` (${p.exaltationDegree}°)` : '';
      return `${signName}${deg}`;
    }
    return '-';
  };

  const getDebilitationDisplay = (p) => {
    if (p.debilitationRasi && (p.debilitationRasi.name || p.debilitationRasi.nameTa || p.debilitationRasi.nameMl)) {
      const signName = getLocalizedValue(p.debilitationRasi, currentLang);
      const deg =
        p.debilitationRasi.degree !== undefined && p.debilitationRasi.degree !== null
          ? ` (${p.debilitationRasi.degree}°)`
          : '';
      return `${signName}${deg}`;
    }
    if (p.debilitationSign) {
      const signName = getLocalizedValue(p.debilitationSign, currentLang);
      const deg = p.debilitationDegree ? ` (${p.debilitationDegree}°)` : '';
      return `${signName}${deg}`;
    }
    return '-';
  };

  const getNatureString = (p) => {
    if (!p.nature) return '';
    if (typeof p.nature === 'string') return p.nature;
    return p.nature.name || p.nature.nameTa || '';
  };

  const filteredPlanets = planets.filter((p) => {
    const q = searchTerm.toLowerCase();
    const nameMatch = (p.name || '').toLowerCase().includes(q) ||
                      (p.nameTa || '').includes(q) ||
                      (p.nameHi || '').includes(q) ||
                      (p.nameTe || '').includes(q) ||
                      (p.nameKn || '').includes(q) ||
                      (p.nameMl || '').includes(q);
    const gemStr = getLocalizedValue(p.gemstone, currentLang).toLowerCase();
    const metalStr = getLocalizedValue(p.metal, currentLang).toLowerCase();
    const grainStr = getLocalizedValue(p.grain, currentLang).toLowerCase();
    return nameMatch || gemStr.includes(q) || metalStr.includes(q) || grainStr.includes(q);
  });

  return (
    <>
      {/* Enterprise SEO Meta & Structured Data */}
      <SEOHead
        pageKey="planets"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Zodiac & Planets', path: '/planets' },
          { name: getUIString('planetsTitle', currentLang), path: '/planets' }
        ]}
      />

      <Breadcrumbs items={breadcrumbItems} />

      <div className="master-directory-page">
            {/* Header Title Card */}
            <div className="directory-hero-banner">
              <div className="directory-hero-left">
                <span className="directory-hero-icon">🪐</span>
                <div>
                  <h1 className="directory-hero-title">
                    {getUIString('planetsTitle', currentLang, 'Navagraha (9 Planets) Directory')}
                  </h1>
                  <p className="directory-hero-sub">
                    {getUIString('planetsSubtitle', currentLang, 'Detailed attributes of the 9 celestial rulers.')}
                  </p>
                </div>
              </div>
            </div>

            {/* Filter Toolbar */}
            <div className="directory-filter-toolbar">
              <div className="directory-search-box">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={getUIString('planetsSearchPlaceholder', currentLang, 'Search by Planet, Gemstone or Day...')}
                  className="directory-search-input"
                />
              </div>
            </div>

            {/* Content Cards Grid */}
            {loading ? (
              <div className="loading-box" style={{ padding: '60px 20px' }}>
                <div className="spinner"></div>
                <p>{getUIString('loading', currentLang, 'Loading Navagrahas details...')}</p>
              </div>
            ) : (
              <div className="master-cards-grid">
                {filteredPlanets.map((planet, idx) => {
                  const meta = PLANET_SYMBOLS[planet.name] || { symbol: '🪐', color: '#b45309' };
                  const natureStr = getNatureString(planet);
                  const isBenefic = natureStr.toLowerCase().includes('benefic') || natureStr.includes('சுபர்');
                  const { title, subtitle } = getLocalizedCardTitles(planet, currentLang);

                  return (
                    <div key={planet.planetId !== undefined ? planet.planetId : idx} className="master-card planet-card">
                      <div className="master-card-top-bar">
                        <div className="master-card-glyph-badge" style={{ color: meta.color }}>
                          {meta.symbol}
                        </div>
                        <div className="master-card-header-titles">
                          <h3 className="master-card-title">{title}</h3>
                          {subtitle && <span className="master-card-subtitle">{subtitle}</span>}
                        </div>
                        <span className="master-id-pill">
                          {planet.shortNameTa || planet.shortName || (planet.planetId !== undefined ? `#${Number(planet.planetId) + 1}` : `#${idx + 1}`)}
                        </span>
                      </div>

                      <div className="master-card-attributes-grid">
                        <div className="attribute-item">
                          <span className="attr-lbl">{getUIString('nature', currentLang, 'Nature')}</span>
                          <span className={`attr-val ${isBenefic ? 'text-green-700 font-bold' : 'text-red-700 font-semibold'}`}>
                            {getLocalizedValue(planet.nature, currentLang)}
                          </span>
                        </div>

                        <div className="attribute-item">
                          <span className="attr-lbl">{getUIString('ownSigns', currentLang, 'Own Sign')}</span>
                          <span className="attr-val highlight-val">
                            {getOwnRasisDisplay(planet)}
                          </span>
                        </div>

                        <div className="attribute-item">
                          <span className="attr-lbl">{getUIString('exaltation', currentLang, 'Exaltation')}</span>
                          <span className="attr-val font-bold text-emerald-700">
                            {getExaltationDisplay(planet)}
                          </span>
                        </div>

                        <div className="attribute-item">
                          <span className="attr-lbl">{getUIString('debilitation', currentLang, 'Debilitation')}</span>
                          <span className="attr-val text-red-700">
                            {getDebilitationDisplay(planet)}
                          </span>
                        </div>

                        <div className="attribute-item">
                          <span className="attr-lbl">{getUIString('gemstone', currentLang, 'Gemstone')}</span>
                          <span className="attr-val gemstone-badge">
                            💎 {getLocalizedValue(planet.gemstone, currentLang)}
                          </span>
                        </div>

                        <div className="attribute-item">
                          <span className="attr-lbl">{getUIString('metal', currentLang, 'Metal')}</span>
                          <span className="attr-val font-semibold">{getLocalizedValue(planet.metal, currentLang)}</span>
                        </div>

                        <div className="attribute-item">
                          <span className="attr-lbl">{getUIString('dayOfWeek', currentLang, 'Governing Day')}</span>
                          <span className="attr-val">{getLocalizedValue(planet.dayOfWeek || planet.day, currentLang)}</span>
                        </div>

                        <div className="attribute-item">
                          <span className="attr-lbl">{getUIString('grain', currentLang, 'Sacred Grain')}</span>
                          <span className="attr-val font-semibold">{getLocalizedValue(planet.grain, currentLang)}</span>
                        </div>
                      </div>

                      {/* Friendship / Enemy Grahas Strip */}
                      {(planet.friends || planet.enemies) && (
                        <div className="planet-relations-strip">
                          {planet.friends && (
                            <div className="relation-row">
                              <span className="rel-tag tag-friend">{getUIString('friendlyPlanets', currentLang, 'Friends')}:</span>
                              <span className="rel-names">{getLocalizedValue(planet.friends, currentLang)}</span>
                            </div>
                          )}
                          {planet.enemies && (
                            <div className="relation-row">
                              <span className="rel-tag tag-enemy">{getUIString('enemyPlanets', currentLang, 'Enemies')}:</span>
                              <span className="rel-names">{getLocalizedValue(planet.enemies, currentLang)}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
    </>
  );
}
