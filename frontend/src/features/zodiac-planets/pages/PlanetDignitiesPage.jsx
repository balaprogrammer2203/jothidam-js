import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import masterDataService from '../../../services/masterData.service';
import SEOHead from '../../../components/common/SEOHead';
import Breadcrumbs from '../../../components/common/Breadcrumbs';
import { ROUTES } from '../../../config/routes.config';
import {
  DIGNITY_STATUS_CONFIG,
  TATKALIKA_RULES_DATA,
  PLANET_RASI_DIGNITIES_DATA,
  PLANETS_LIST,
  SOUTH_INDIAN_DIGNITY_CHART_ORDER
} from '../data/planetDignityData';
import '../../../styles/planetDignities.css';

export default function PlanetDignitiesPage() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  const [dignityData, setDignityData] = useState(PLANET_RASI_DIGNITIES_DATA);
  const [rulesData, setRulesData] = useState(TATKALIKA_RULES_DATA);
  const [loading, setLoading] = useState(true);

  // Filter & View States
  const [viewMode, setViewMode] = useState('chart'); // 'chart' or 'table'
  const [mobileMode, setMobileMode] = useState('fit'); // 'fit' or 'scroll' (matching Nakshatra Padas)
  const [selectedPlanetId, setSelectedPlanetId] = useState(null); // null = all
  const [selectedStatus, setSelectedStatus] = useState(null); // null = all
  const [selectedRasiId, setSelectedRasiId] = useState(null); // null = none
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchDignities();
  }, [currentLang]);

  const fetchDignities = async () => {
    setLoading(true);
    try {
      const res = await masterDataService.getPlanetDignities({ lang: currentLang });
      if (res && res.data && res.data.length > 0) {
        setDignityData(res.data);
      }
      if (res && res.rules) {
        setRulesData(res.rules);
      }
    } catch (err) {
      console.error('Failed to load planet dignities:', err);
    } finally {
      setLoading(false);
    }
  };

  // Localized helper for Rasi Name
  const getRasiName = (rasi) => {
    if (!rasi) return '';
    if (currentLang === 'ta' && rasi.rasiNameTa) return rasi.rasiNameTa;
    if (currentLang === 'hi' && rasi.rasiNameHi) return rasi.rasiNameHi;
    if (currentLang === 'te' && rasi.rasiNameTe) return rasi.rasiNameTe;
    if (currentLang === 'kn' && rasi.rasiNameKn) return rasi.rasiNameKn;
    if (currentLang === 'ml' && rasi.rasiNameMl) return rasi.rasiNameMl;
    return rasi.rasiName || rasi.rasiNameTa || '';
  };

  // Localized helper for Planet Name
  const getPlanetName = (planet) => {
    if (!planet) return '';
    if (currentLang === 'ta' && planet.nameTa) return planet.nameTa;
    return planet.name || planet.nameTa || '';
  };

  // Localized helper for Dignity Status
  const getDignityLabel = (statusKey, planetObj) => {
    if (currentLang === 'ta' && planetObj?.statusTa) return planetObj.statusTa;
    if (currentLang !== 'ta' && planetObj?.statusEn) return planetObj.statusEn;
    const conf = DIGNITY_STATUS_CONFIG[statusKey];
    if (conf) {
      return currentLang === 'ta' ? conf.nameTa : conf.nameEn;
    }
    return statusKey;
  };

  // Filtered Rasis based on search
  const filteredRasis = useMemo(() => {
    if (!searchTerm.trim()) return dignityData;
    const term = searchTerm.toLowerCase();
    return dignityData.filter((r) => {
      const nameEn = (r.rasiName || '').toLowerCase();
      const nameTa = (r.rasiNameTa || '').toLowerCase();
      return nameEn.includes(term) || nameTa.includes(term);
    });
  }, [dignityData, searchTerm]);

  // Fast lookup mapping by rasiId
  const rasiMap = useMemo(() => {
    const map = {};
    dignityData.forEach((r) => {
      map[r.rasiId] = r;
    });
    return map;
  }, [dignityData]);

  // Selected Rasi details for inspection panel (matching Nakshatra Padas)
  const selectedRasi = useMemo(() => {
    if (selectedRasiId === null) return null;
    return rasiMap[selectedRasiId] || null;
  }, [selectedRasiId, rasiMap]);

  // Planet meta lookup by planetId
  const planetMetaMap = useMemo(() => {
    const map = {};
    PLANETS_LIST.forEach((p) => {
      map[p.id] = p;
    });
    return map;
  }, []);

  // Active filter helper for chips
  const isChipHighlighted = (planet) => {
    const matchesPlanet = selectedPlanetId === null || planet.planetId === selectedPlanetId;
    const matchesStatus = selectedStatus === null || planet.status === selectedStatus;
    return matchesPlanet && matchesStatus;
  };

  const isChipDimmed = (planet) => {
    if (selectedPlanetId === null && selectedStatus === null) return false;
    return !isChipHighlighted(planet);
  };

  const breadcrumbItems = [
    { label: currentLang === 'ta' ? 'முகப்பு' : 'Home', link: ROUTES.HOME },
    { label: currentLang === 'ta' ? 'ராசிகள் & கிரகங்கள்' : 'Zodiac & Planets', link: ROUTES.ZODIAC.RASIS },
    {
      label:
        currentLang === 'ta'
          ? 'கிரக ஆட்சி, உச்ச, நீச அட்டவணை'
          : 'Planetary Dignities (Aatchi, Ucham, Neecham)',
      active: true
    }
  ];

  return (
    <div className="dignity-page-container">
      <SEOHead
        title={
          currentLang === 'ta'
            ? 'கிரக ஆட்சி, உச்ச, நீச, நட்பு, பகை ராசிகள் & பஞ்சதா மைத்ரி | ஜோதிட போர்டல்'
            : 'Classical Planetary Dignities (Exaltation, Debilitation, Own Sign) & Panchadha Maitri | Vedic Astrology'
        }
        description={
          currentLang === 'ta'
            ? '12 ராசிகளில் 9 நவக்கிரகங்களின் ஆட்சி, உச்சம், நீசம், நட்பு, பகை, சமம் நிலைகள் மற்றும் தற்கால சத்துரு-மித்துரு, பஞ்சதா மைத்ரி முழு அட்டவணை.'
            : 'Comprehensive classical South Indian chart & cross-table of planetary dignities (own, exalted, debilitated, friend, enemy, neutral) in all 12 Zodiac signs with Tatkalika Mitra-Satru rules.'
        }
        canonicalUrl="/zodiac/planet-dignities"
      />

      <Breadcrumbs items={breadcrumbItems} />

      {/* =========================================================================
          1. HERO BANNER
          ========================================================================= */}
      <div className="dignity-hero-banner">
        <div className="dignity-hero-left">
          <div className="dignity-hero-icon">🪐</div>
          <div className="dignity-hero-titles">
            <h1>
              {currentLang === 'ta'
                ? 'கிரக ஆட்சி, உச்ச, நீச, நட்பு, பகை ராசி சக்கரம்'
                : 'Planetary Dignities & Zodiac Placements'}
            </h1>
            <p>
              {currentLang === 'ta'
                ? 'உச்ச - நீச - சத்துரு - மித்துரு ராசிகள் மற்றும் தற்கால நட்பு-பகை (பஞ்சதா மைத்ரி) விதிகள்'
                : 'Classical dignities: Own (ஆட்சி), Exalted (உச்சம்), Debilitated (நீசம்), Friend (நட்பு), Enemy (பகை), Neutral (சமம்)'}
            </p>
          </div>
        </div>

        <div className="dignity-hero-right">
          <div className="dignity-hero-pill">
            <span>✨</span>
            <span>12 {currentLang === 'ta' ? 'ராசிகள்' : 'Signs'}</span>
          </div>
          <div className="dignity-hero-pill">
            <span>🪐</span>
            <span>9 {currentLang === 'ta' ? 'கிரகங்கள்' : 'Grahas'}</span>
          </div>
          <div className="dignity-hero-pill">
            <span>📊</span>
            <span>108 {currentLang === 'ta' ? 'நிலைகள்' : 'Dignities'}</span>
          </div>
        </div>
      </div>



      {/* =========================================================================
          3. CONTROLS & FILTER TOOLBAR
          ========================================================================= */}
      <div className="dignity-controls-bar">
        <div className="controls-top-row">
          {/* View Switcher: Chart vs Table */}
          <div className="view-toggle-group">
            <button
              type="button"
              className={`view-toggle-btn ${viewMode === 'chart' ? 'active' : ''}`}
              onClick={() => setViewMode('chart')}
            >
              <span>🔲</span>
              <span>{currentLang === 'ta' ? 'தென்னிந்திய கட்டம்' : 'South Indian Chart'}</span>
            </button>
            <button
              type="button"
              className={`view-toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
              onClick={() => setViewMode('table')}
            >
              <span>📋</span>
              <span>{currentLang === 'ta' ? 'முழு அட்டவணை' : 'Cross Table'}</span>
            </button>
          </div>

          {/* Mobile Fit vs Scroll Mode Switcher for Chart View (matching Nakshatra Padas) */}
          {viewMode === 'chart' && (
            <div className="option-segmented-control mobile-only-toggle">
              <button
                type="button"
                className={`seg-btn ${mobileMode === 'fit' ? 'active' : ''}`}
                onClick={() => setMobileMode('fit')}
                title="Fit all 12 signs in screen without scrollbar"
              >
                {currentLang === 'ta' ? '📱 முழு பார்வை (Fit)' : '📱 Fit Screen'}
              </button>
              <button
                type="button"
                className={`seg-btn ${mobileMode === 'scroll' ? 'active' : ''}`}
                onClick={() => setMobileMode('scroll')}
                title="Scrollable high resolution chart"
              >
                {currentLang === 'ta' ? '↔️ உருட்டு (Scroll)' : '↔️ Scroll HD'}
              </button>
            </div>
          )}

          {/* Quick Search */}
          <input
            type="text"
            className="dignity-search-input"
            placeholder={
              currentLang === 'ta'
                ? 'ராசி பெயர் தேடுக... (எ.கா. மேஷம், சிம்மம்)'
                : 'Search sign... (e.g. Aries, Leo)'
            }
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Planet Filter Pills Bar */}
        <div className="planet-filter-scroll">
          <span className="filter-label">{currentLang === 'ta' ? 'கிரகம்:' : 'Planet:'}</span>
          <button
            type="button"
            className={`planet-filter-pill ${selectedPlanetId === null ? 'active' : ''}`}
            onClick={() => setSelectedPlanetId(null)}
          >
            <span>✨</span>
            <span>{currentLang === 'ta' ? 'அனைத்து கிரகங்கள்' : 'All Planets'}</span>
          </button>
          {PLANETS_LIST.map((pl) => (
            <button
              type="button"
              key={pl.id}
              className={`planet-filter-pill ${selectedPlanetId === pl.id ? 'active' : ''}`}
              onClick={() => setSelectedPlanetId(selectedPlanetId === pl.id ? null : pl.id)}
            >
              <span style={{ color: pl.color }}>{pl.symbol}</span>
              <span>{currentLang === 'ta' ? pl.nameTa : pl.nameEn}</span>
            </button>
          ))}
        </div>

        {/* Dignity Status Filter Pills Bar */}
        <div className="status-filter-row">
          <span className="filter-label">{currentLang === 'ta' ? 'நிலை:' : 'Dignity:'}</span>
          <button
            type="button"
            className={`status-filter-pill ${selectedStatus === null ? 'active' : ''}`}
            style={selectedStatus === null ? { background: '#1e293b', color: '#fff' } : {}}
            onClick={() => setSelectedStatus(null)}
          >
            {currentLang === 'ta' ? 'அனைத்தும்' : 'All'}
          </button>
          {Object.values(DIGNITY_STATUS_CONFIG).map((st) => (
            <button
              type="button"
              key={st.key}
              className={`status-filter-pill ${selectedStatus === st.key ? 'active' : ''}`}
              style={
                selectedStatus === st.key
                  ? { background: st.color, color: '#fff', borderColor: st.color }
                  : { background: st.bg, color: st.textColor, borderColor: st.borderColor }
              }
              onClick={() => setSelectedStatus(selectedStatus === st.key ? null : st.key)}
            >
              <span>{currentLang === 'ta' ? st.nameTa : st.nameEn}</span>
            </button>
          ))}
        </div>
      </div>

      {/* =========================================================================
          4. SOUTH INDIAN 4x4 CHART VIEW (AUTHENTIC KUNDLI GRID - NAKSHATRA PADAS STYLE)
          ========================================================================= */}
      {viewMode === 'chart' && (
        <div className="mandalam-chart-card dignity-chart-card">
          <div className="chart-header-bar">
            <div className="chart-header-title">
              <span>🔲</span>
              <span>
                {currentLang === 'ta'
                  ? 'தென்னிந்திய முறை ராசி சக்கரம் (12 கட்டங்கள் × 9 கிரகங்கள்)'
                  : 'South Indian Chart Format (12 Rasi Cells × 9 Planets)'}
              </span>
            </div>
            <div className="chart-header-actions">
              <span className="compact-badge-pill">
                <span>✨</span>
                <span>12 {currentLang === 'ta' ? 'ராசிகள்' : 'Signs'} × 9 {currentLang === 'ta' ? 'கிரகங்கள்' : 'Grahas'}</span>
              </span>
              {(selectedPlanetId !== null || selectedStatus !== null || selectedRasiId !== null) && (
                <button
                  type="button"
                  className="reset-filter-btn"
                  onClick={() => {
                    setSelectedPlanetId(null);
                    setSelectedStatus(null);
                    setSelectedRasiId(null);
                  }}
                >
                  ✕ {currentLang === 'ta' ? 'வடிகட்டலை நீக்குக' : 'Reset Filter'}
                </button>
              )}
            </div>
          </div>

          {/* Mobile scroll indicator banner when in scroll mode */}
          {mobileMode === 'scroll' && (
            <div className="mobile-scroll-indicator-banner">
              <span>👈 பக்கவாட்டில் நகர்த்தி 12 ராசிகளையும் காண்க (Swipe horizontally) 👉</span>
            </div>
          )}

          <div className={`mandalam-chart-scroll-wrapper dignity-chart-scroll-wrapper ${mobileMode === 'scroll' ? 'is-scroll-active' : ''}`}>
            <div className={`mandalam-grid dignity-kundli-grid ${mobileMode === 'fit' ? 'is-mobile-fit-grid' : 'is-mobile-scroll-grid'}`}>
              {/* 12 Perimeter Rasi Cells */}
              {SOUTH_INDIAN_DIGNITY_CHART_ORDER.map(({ rasiId, gridArea }) => {
                const rasi = rasiMap[rasiId];
                if (!rasi) return null;

                const isSelected = selectedRasiId === rasiId;
                const isHighlightedSign =
                  searchTerm &&
                  (rasi.rasiName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    rasi.rasiNameTa.includes(searchTerm));

                return (
                  <div
                    key={rasiId}
                    className={`mandalam-cell dignity-rasi-cell ${isSelected ? 'active-selected' : ''} ${isHighlightedSign ? 'highlighted-sign' : ''
                      }`}
                    style={{ gridArea }}
                    onClick={() => setSelectedRasiId(selectedRasiId === rasiId ? null : rasiId)}
                    title={`${getRasiName(rasi)} - ${currentLang === 'ta' ? rasi.athipathiNameTa : rasi.athipathiName}`}
                  >
                    <div className="mandalam-cell-header dignity-cell-header">
                      <div className="header-primary-line">
                        <span className="rasi-title">{getRasiName(rasi)}</span>
                        <span className="header-hyphen"> - </span>
                        <span className="rasi-lord">{currentLang === 'ta' ? rasi.athipathiNameTa : rasi.athipathiName}</span>
                      </div>
                      <div className="header-degrees-badge">
                        <span className="deg-pill rasi-pill" title="Order">#{rasi.order}</span>
                      </div>
                    </div>

                    <div className="dignity-planets-list">
                      {rasi.planets.map((planet) => {
                        const statusConf = DIGNITY_STATUS_CONFIG[planet.status] || {};
                        const plMeta = planetMetaMap[planet.planetId] || {};
                        const highlighted = isChipHighlighted(planet);
                        const dimmed = isChipDimmed(planet);

                        return (
                          <div
                            key={planet.planetId}
                            className={`dignity-planet-row ${highlighted && (selectedPlanetId !== null || selectedStatus !== null)
                                ? 'row-highlighted'
                                : ''
                              } ${dimmed ? 'row-dimmed' : ''}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedPlanetId(selectedPlanetId === planet.planetId ? null : planet.planetId);
                            }}
                            title={`${getPlanetName(planet)} - ${getRasiName(rasi)}: ${getDignityLabel(
                              planet.status,
                              planet
                            )}`}
                          >
                            <div className="planet-row-left">
                              <span className="planet-row-symbol" style={{ color: plMeta.color || '#64748b' }}>
                                {plMeta.symbol || '●'}
                              </span>
                              <span className="planet-row-name">{getPlanetName(planet)}</span>
                            </div>

                            <span className={`dignity-badge-pill ${statusConf.badgeClass || ''}`}>
                              {getDignityLabel(planet.status, planet)}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {/* Center 2x2 Cell matching Nakshatra Mandalam centerpiece */}
              <div className="mandalam-center-box dignity-center-box">
                <h2 className="center-mandalam-title center-dignity-title">
                  {currentLang === 'ta' ? 'கிரக ஆட்சி உச்ச நீச சக்கரம்' : 'Planetary Dignities Wheel'}
                </h2>
                <div className="center-mandalam-subtitle center-dignity-subtitle">
                  {currentLang === 'ta'
                    ? '12 ராசிகள் × 9 கிரகங்கள் (108 நிலைகள்)'
                    : '12 Signs × 9 Planets (108 Placements)'}
                </div>

                <div className="center-metrics-strip">
                  <span className="center-metric-tag">
                    {currentLang === 'ta' ? 'ராசிகள்:' : 'Signs:'} <strong>12</strong>
                  </span>
                  <span className="center-metric-tag">
                    {currentLang === 'ta' ? 'கிரகங்கள்:' : 'Planets:'} <strong>9</strong>
                  </span>
                  <span className="center-metric-tag">
                    {currentLang === 'ta' ? 'நிலைகள்:' : 'Placements:'} <strong>108</strong>
                  </span>
                </div>

                {/* Status Legend Pills (interactive filter buttons) */}
                <div className="center-legend-wrap">
                  {Object.values(DIGNITY_STATUS_CONFIG).map((st) => (
                    <button
                      type="button"
                      key={st.key}
                      className={`center-legend-item ${st.badgeClass} ${selectedStatus === st.key ? 'active-legend' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedStatus(selectedStatus === st.key ? null : st.key);
                      }}
                      style={{ cursor: 'pointer', border: 'none' }}
                    >
                      <span>●</span>
                      <span>{currentLang === 'ta' ? st.nameTa : st.nameEn}</span>
                    </button>
                  ))}
                </div>

                <div className="center-hint-text">
                  {currentLang === 'ta'
                    ? '👆 ராசி அல்லது கிரகத்தை கிளிக் செய்து விவரங்களைக் காண்க'
                    : '👆 Click any sign or planet to filter & view details'}
                </div>
              </div>
            </div>
          </div>

          {/* Selected Rasi Detailed Planet Inspection Panel (matching selected-rasi-padas-panel) */}
          {selectedRasi && (
            <div className="selected-rasi-padas-panel selected-rasi-dignity-panel">
              <div className="rasi-panel-header">
                <div className="rasi-panel-title">
                  <span>🪐</span>
                  <span>
                    {getRasiName(selectedRasi)} -{' '}
                    {currentLang === 'ta' ? selectedRasi.athipathiNameTa : selectedRasi.athipathiName}
                  </span>
                  <span className="rasi-badge-highlight">
                    #{selectedRasi.order}
                  </span>
                </div>
                <button
                  type="button"
                  className="close-panel-btn"
                  onClick={() => setSelectedRasiId(null)}
                >
                  ✕ {currentLang === 'ta' ? 'மூடுக' : 'Close'}
                </button>
              </div>

              <div className="dignity-inspect-grid">
                {selectedRasi.planets.map((planet) => {
                  const statusConf = DIGNITY_STATUS_CONFIG[planet.status] || {};
                  const plMeta = planetMetaMap[planet.planetId] || {};

                  return (
                    <div key={planet.planetId} className="planet-inspect-card">
                      <div className="planet-inspect-top">
                        <div className="planet-inspect-identity">
                          <span className="planet-inspect-symbol" style={{ color: plMeta.color }}>
                            {plMeta.symbol}
                          </span>
                          <strong>{getPlanetName(planet)}</strong>
                        </div>
                        <span className={`dignity-badge-pill ${statusConf.badgeClass || ''}`}>
                          {getDignityLabel(planet.status, planet)}
                        </span>
                      </div>
                      <div className="planet-inspect-details">
                        <div className="inspect-row">
                          <span className="inspect-lbl">{currentLang === 'ta' ? 'ஆங்கில பெயர்:' : 'English:'}</span>
                          <span>{plMeta.nameEn || planet.nameEn}</span>
                        </div>
                        <div className="inspect-row">
                          <span className="inspect-lbl">{currentLang === 'ta' ? 'ராசி அதிபதி:' : 'Sign Lord:'}</span>
                          <span>{currentLang === 'ta' ? selectedRasi.athipathiNameTa : selectedRasi.athipathiName}</span>
                        </div>
                        <div className="inspect-row">
                          <span className="inspect-lbl">{currentLang === 'ta' ? 'நிலை விளக்கம்:' : 'Dignity:'}</span>
                          <span style={{ fontWeight: 700, color: statusConf.color }}>
                            {currentLang === 'ta' ? statusConf.nameTa : statusConf.nameEn}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          5. TABLE VIEW (12 Rasis × 9 Planets Cross-Table)
          ========================================================================= */}
      {viewMode === 'table' && (
        <div className="dignity-table-wrapper">
          <div className="chart-header-bar">
            <div className="chart-header-title">
              <span>📋</span>
              <span>
                {currentLang === 'ta'
                  ? '12 ராசிகள் × 9 கிரகங்கள் முழு அட்டவணை'
                  : '12 Signs × 9 Planets Cross Table'}
              </span>
            </div>
            <div className="chart-header-actions">
              <span className="compact-badge-pill">
                <span>✨</span>
                <span>12 {currentLang === 'ta' ? 'ராசிகள்' : 'Signs'} × 9 {currentLang === 'ta' ? 'கிரகங்கள்' : 'Grahas'}</span>
              </span>
              {(selectedPlanetId !== null || selectedStatus !== null) && (
                <button
                  type="button"
                  className="reset-filter-btn"
                  onClick={() => {
                    setSelectedPlanetId(null);
                    setSelectedStatus(null);
                  }}
                >
                  ✕ {currentLang === 'ta' ? 'வடிகட்டலை நீக்குக' : 'Reset Filter'}
                </button>
              )}
            </div>
          </div>

          <div className="table-grid-container">
            <table className="dignity-cross-table">
              <thead>
                <tr>
                  <th className="col-rasi">{currentLang === 'ta' ? 'ராசி / அதிபதி' : 'Rasi / Lord'}</th>
                  {PLANETS_LIST.map((pl) => (
                    <th
                      key={pl.id}
                      style={{
                        background: selectedPlanetId === pl.id ? '#1e293b' : undefined,
                        color: selectedPlanetId === pl.id ? '#f59e0b' : undefined,
                        cursor: 'pointer'
                      }}
                      onClick={() => setSelectedPlanetId(selectedPlanetId === pl.id ? null : pl.id)}
                    >
                      <span style={{ marginRight: '4px' }}>{pl.symbol}</span>
                      <span>{currentLang === 'ta' ? pl.nameTa : pl.nameEn}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredRasis.map((rasi) => (
                  <tr key={rasi.rasiId}>
                    <td className="cell-rasi">
                      <div style={{ fontWeight: 800 }}>
                        #{rasi.order} {getRasiName(rasi)}
                      </div>
                      <div style={{ fontSize: '10.5px', color: '#64748b', fontWeight: 500 }}>
                        {currentLang === 'ta' ? rasi.athipathiNameTa : rasi.athipathiName}
                      </div>
                    </td>
                    {rasi.planets.map((planet) => {
                      const statusConf = DIGNITY_STATUS_CONFIG[planet.status] || {};
                      const isHighlighted = isChipHighlighted(planet);
                      const isDimmed = isChipDimmed(planet);

                      return (
                        <td
                          key={planet.planetId}
                          style={{
                            opacity: isDimmed ? 0.3 : 1,
                            transition: 'opacity 0.15s'
                          }}
                        >
                          <span
                            className={`table-badge ${statusConf.badgeClass || ''}`}
                            style={
                              isHighlighted && (selectedPlanetId !== null || selectedStatus !== null)
                                ? {
                                  boxShadow: '0 0 0 2px #d97706',
                                  transform: 'scale(1.05)',
                                  fontWeight: 800
                                }
                                : {}
                            }
                            onClick={() => {
                              if (selectedPlanetId === planet.planetId) {
                                setSelectedPlanetId(null);
                              } else {
                                setSelectedPlanetId(planet.planetId);
                              }
                            }}
                          >
                            {getDignityLabel(planet.status, planet)}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {/* =========================================================================
          5. TATKALIKA MITRA-SATRU & PANCHADHA MAITRI RULES (BELOW RAASI BOX)
          ========================================================================= */}
      <div className="tatkalika-rules-card" id="tatkalika-rules-bottom">
        <div className="tatkalika-card-header">
          <div className="tatkalika-header-title">
            <span>📜</span>
            <span>
              {currentLang === 'ta'
                ? rulesData.titleTa || 'தற்கால சத்துரு-மித்துரு கிரகம் & பஞ்சதா மைத்ரி விளக்கம்'
                : rulesData.titleEn || 'Temporal Friendship (Tatkalika Mitra-Satru) & Panchadha Maitri Rules'}
            </span>
          </div>
          <div className="tatkalika-header-badge">
            {currentLang === 'ta' ? 'பாரம்பரிய ஜோதிட விதி' : 'Classical System'}
          </div>
        </div>

        <div className="tatkalika-card-body">
          {/* Principle Rule Statement */}
          <div className="tatkalika-principle-banner">
            <strong>{currentLang === 'ta' ? 'விதி முறை: ' : 'Core Principle: '}</strong>
            {currentLang === 'ta' ? rulesData.rulePrincipleTa : rulesData.rulePrincipleEn}
          </div>

          {/* Friendly vs Enemy Houses Indicator Grid */}
          <div className="tatkalika-houses-grid">
            {/* Friendly Houses */}
            <div className="houses-box friendly">
              <div className="houses-box-icon">🤝</div>
              <div className="houses-box-content">
                <h4>
                  {currentLang === 'ta'
                    ? 'தற்கால மித்துரு (நட்பு) இடங்கள்:'
                    : 'Tatkalika Mitra (Temporal Friends):'}
                </h4>
                <div className="houses-pill-list">
                  {(rulesData.friendlyHouses || [2, 3, 4, 10, 11, 12]).map((h) => (
                    <span key={h} className="house-num-pill">
                      {h}
                      {currentLang === 'ta' ? '-ஆம் இடம்' : 'th'}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Enemy Houses */}
            <div className="houses-box enemy">
              <div className="houses-box-icon">⚔️</div>
              <div className="houses-box-content">
                <h4>
                  {currentLang === 'ta'
                    ? 'தற்கால சத்துரு (பகை) இடங்கள்:'
                    : 'Tatkalika Satru (Temporal Enemies):'}
                </h4>
                <div className="houses-pill-list">
                  {(rulesData.enemyHouses || [1, 5, 6, 7, 8, 9]).map((h) => (
                    <span key={h} className="house-num-pill">
                      {h}
                      {currentLang === 'ta' ? '-ஆம் இடம்' : 'th'}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 2-Column Rules Grid: Compound Table + Classical Example */}
          <div className="tatkalika-details-grid">
            {/* Compound Relationship (Panchadha Maitri) 6-Cases Table */}
            <div className="tatkalika-subpanel">
              <div className="subpanel-title">
                <span>⚖️</span>
                <span>
                  {currentLang === 'ta'
                    ? 'பஞ்சதா மைத்ரி (5 வகை உறவுகள் நிர்ணயம்)'
                    : 'Panchadha Maitri (Compound 5-Fold Friendship)'}
                </span>
              </div>
              <table className="compound-formula-table">
                <thead>
                  <tr>
                    <th>{currentLang === 'ta' ? 'நைசர்கிகம்' : 'Natural'}</th>
                    <th>+</th>
                    <th>{currentLang === 'ta' ? 'தற்காலிகம்' : 'Temporal'}</th>
                    <th>=</th>
                    <th>{currentLang === 'ta' ? 'முடிவு பலன்' : 'Compound'}</th>
                  </tr>
                </thead>
                <tbody>
                  {(rulesData.compoundTable || []).map((row, idx) => (
                    <tr key={idx}>
                      <td>{currentLang === 'ta' ? row.naturalTa : row.naturalEn}</td>
                      <td>+</td>
                      <td>{currentLang === 'ta' ? row.temporalTa : row.temporalEn}</td>
                      <td>=</td>
                      <td>
                        <span
                          className="compound-badge"
                          style={{
                            background: row.color + '18',
                            color: row.color,
                            border: `1px solid ${row.color}40`
                          }}
                        >
                          {row.badge} {currentLang === 'ta' ? row.compoundTa : row.compoundEn}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Classical Example */}
            <div className="tatkalika-subpanel">
              <div className="subpanel-title">
                <span>📖</span>
                <span>{currentLang === 'ta' ? 'பாரம்பரிய உதாரணம்' : 'Classical Example'}</span>
              </div>
              <div className="example-box">
                <p style={{ margin: '0 0 6px 0', fontWeight: 600 }}>
                  {currentLang === 'ta'
                    ? rulesData.classicalExampleTa
                    : rulesData.classicalExampleEn}
                </p>
                <ul className="example-step-list">
                  <li className="example-step-item">
                    <span className="step-bullet">1</span>
                    <span>
                      {currentLang === 'ta'
                        ? 'சூரியன் கடகத்தில் (Cancer); சந்திரன் தனுசில் (Sagittarius).'
                        : 'Sun is posited in Cancer; Moon is posited in Sagittarius.'}
                    </span>
                  </li>
                  <li className="example-step-item">
                    <span className="step-bullet">2</span>
                    <span>
                      {currentLang === 'ta'
                        ? 'கடகத்திலிருந்து தனுசு 6-ம் இடம் -> தற்கால விதிப்படி "சத்துரு" (பகை).'
                        : 'Cancer to Sagittarius is the 6th house -> By temporal rule: "Satru" (Enemy).'}
                    </span>
                  </li>
                  <li className="example-step-item">
                    <span className="step-bullet">3</span>
                    <span>
                      {currentLang === 'ta'
                        ? 'இயற்கை முறையில் சந்திரனுக்கு சூரியன் "மித்துரு" (நட்பு).'
                        : 'By natural relationship, Sun is a "Mitra" (Friend) to Moon.'}
                    </span>
                  </li>
                </ul>
                <div className="example-conclusion">
                  <span>🎯</span>
                  <span>
                    {currentLang === 'ta'
                      ? 'முடிவு: இயற்கை நட்பு + தற்கால பகை = சமம் (Neutral).'
                      : 'Result: Natural Friend + Temporal Enemy = Sama (Neutral).'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
