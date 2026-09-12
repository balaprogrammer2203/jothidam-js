import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import masterDataService from '../services/masterData.service';
import SEOHead from '../components/common/SEOHead';
import Breadcrumbs from '../components/common/Breadcrumbs';
import {
  getUIString,
  getLocalizedKalachakramRasi,
  getLocalizedKalachakramNakshatra,
  getLocalizedKalachakramNavamsa,
  getLocalizedKalachakramLord,
  getLocalizedKalachakramPada
} from '../utils/localizedContent';
import {
  RASIS_6LANG,
  NAKSHATRAS_6LANG,
  getLocalizedRasi,
  getLocalizedNakshatra,
  formatPadaLabel
} from '../utils/astrologyLocalization';

export default function KalachakramPage() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'en';
  const navigate = useNavigate();

  const [kalachakram, setKalachakram] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDegree, setSelectedDegree] = useState(0);
  const [degreeSearch, setDegreeSearch] = useState('');
  const [filterRasi, setFilterRasi] = useState('all');
  const [filterNakshatra, setFilterNakshatra] = useState('all');
  const [filterPada, setFilterPada] = useState('all');
  const [viewLimit, setViewLimit] = useState('all'); // 'all', '30', '60', '120'
  const [viewMode, setViewMode] = useState('compact'); // 'compact' or 'detailed'
  const tableContainerRef = useRef(null);

  useEffect(() => {
    fetchKalachakram();
  }, []);

  // Smoothly scroll selected row into view in compact table mode
  useEffect(() => {
    if (viewMode === 'compact' && tableContainerRef.current) {
      const rowEl = document.getElementById(`kalachakram-row-${selectedDegree}`);
      if (rowEl) {
        rowEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [selectedDegree, viewMode]);

  const fetchKalachakram = async () => {
    setLoading(true);
    try {
      const data = await masterDataService.getKalachakram();
      setKalachakram(data);
    } catch (err) {
      console.error('Failed to load kalachakram:', err);
    } finally {
      setLoading(false);
    }
  };

  const breadcrumbItems = [
    { label: getUIString('home', currentLang, 'Home'), link: '/' },
    { label: getUIString('kalachakramTitle', currentLang, '360° Kalachakram Wheel'), active: true }
  ];

  const filteredItems = useMemo(() => {
    let list = kalachakram;
    if (degreeSearch !== '') {
      const degNum = Number(degreeSearch);
      return list.filter((item) => item.degree === degNum);
    }
    if (filterRasi !== 'all') {
      list = list.filter((item) => item.rasiId === Number(filterRasi));
    }
    if (filterNakshatra !== 'all') {
      list = list.filter((item) => item.nakshatraId === Number(filterNakshatra));
    }
    if (filterPada !== 'all') {
      list = list.filter((item) => item.pada === Number(filterPada));
    }
    return list;
  }, [kalachakram, degreeSearch, filterRasi, filterNakshatra, filterPada]);

  const displayedItems = useMemo(() => {
    if (viewLimit === 'all' || degreeSearch !== '') {
      return filteredItems;
    }
    return filteredItems.slice(0, Number(viewLimit));
  }, [filteredItems, viewLimit, degreeSearch]);

  const currentDegreeItem = useMemo(() => {
    return kalachakram.find((item) => item.degree === selectedDegree) || kalachakram[0] || {};
  }, [kalachakram, selectedDegree]);

  const handlePrevDegree = () => {
    setSelectedDegree((prev) => (prev > 0 ? prev - 1 : 359));
  };

  const handleNextDegree = () => {
    setSelectedDegree((prev) => (prev < 359 ? prev + 1 : 0));
  };

  const handleJumpToRasi = (rasiId) => {
    const targetDegree = rasiId * 30;
    setSelectedDegree(targetDegree);
    setFilterRasi(String(rasiId));
    setDegreeSearch('');
  };

  const handleResetFilters = () => {
    setFilterRasi('all');
    setFilterNakshatra('all');
    setFilterPada('all');
    setDegreeSearch('');
  };

  return (
    <>
      {/* Enterprise SEO Meta & Structured Data */}
      <SEOHead
        pageKey="kalachakram"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Zodiac & Planets', path: '/kalachakram' },
          { name: getUIString('kalachakramTitle', currentLang), path: '/kalachakram' }
        ]}
      />

      <Breadcrumbs items={breadcrumbItems} />

      <div className="master-directory-page">
            {/* Header Title Card */}
            <div className="directory-hero-banner">
              <div className="directory-hero-left">
                <span className="directory-hero-icon">🎡</span>
                <div>
                  <h1 className="directory-hero-title">
                    {getUIString('kalachakramTitle', currentLang, '360° Kalachakram Degree Wheel')}
                  </h1>
                  <p className="directory-hero-sub">
                    {getUIString('kalachakramSubtitle', currentLang, 'Precise degree-by-degree mapping connecting Rasi, Nakshatra, Pada, and Navamsa sign rulers.')}
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Degree Picker & Highlight Card */}
            {currentDegreeItem && (
              <div className="kalachakram-highlight-box">
                <div className="degree-slider-container">
                  <div className="slider-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '14px', fontWeight: '700' }}>
                      {getUIString('exploreDegree', currentLang, 'Explore Degree (0°-359°):')}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button
                        type="button"
                        onClick={handlePrevDegree}
                        className="chart-style-segmented-btn"
                        style={{ padding: '4px 10px', fontSize: '13px', fontWeight: 'bold' }}
                        title={getUIString('prevDegree', currentLang, 'Previous Degree')}
                      >
                        ◀
                      </button>
                      <span className="current-degree-badge" style={{ minWidth: '60px', textAlign: 'center' }}>
                        {selectedDegree}°
                      </span>
                      <button
                        type="button"
                        onClick={handleNextDegree}
                        className="chart-style-segmented-btn"
                        style={{ padding: '4px 10px', fontSize: '13px', fontWeight: 'bold' }}
                        title={getUIString('nextDegree', currentLang, 'Next Degree')}
                      >
                        ▶
                      </button>
                    </div>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="359"
                    value={selectedDegree}
                    onChange={(e) => setSelectedDegree(Number(e.target.value))}
                    className="degree-range-slider"
                  />

                  {/* Quick Sign Jump Pills */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px', alignItems: 'center' }}>
                    <span style={{ fontSize: '11px', fontWeight: '600', color: 'var(--fe-text-muted)', marginRight: '4px' }}>
                      {getUIString('quickJump', currentLang, 'Quick Jump:')}
                    </span>
                    {RASIS_6LANG.map((r) => {
                      const isActive = Math.floor(selectedDegree / 30) === r.id;
                      return (
                        <button
                          key={r.id}
                          type="button"
                          onClick={() => handleJumpToRasi(r.id)}
                          className={`chart-style-segmented-btn ${isActive ? 'active' : ''}`}
                          style={{
                            padding: '3px 8px',
                            fontSize: '11px',
                            borderRadius: '12px'
                          }}
                        >
                          {r.id * 30}° {r[currentLang] || r.en}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Degree Details Summary Cards */}
                <div className="degree-details-summary-row" style={{ marginTop: '8px' }}>
                  {/* 1. Zodiac Degree */}
                  <div className="deg-summary-tile">
                    <span className="tile-lbl">{getUIString('degreeRange', currentLang, 'Degree Range')}</span>
                    <span className="tile-val deg-mono font-bold highlight-val">
                      {selectedDegree}° - {selectedDegree + 1}°
                    </span>
                  </div>

                  {/* 2. Rasi (Zodiac Sign) */}
                  <div className="deg-summary-tile">
                    <span className="tile-lbl">{getUIString('zodiacSign', currentLang, 'Rasi')}</span>
                    <span className="tile-val font-bold">
                      {getLocalizedKalachakramRasi(currentDegreeItem, currentLang)}
                    </span>
                  </div>

                  {/* 3. Degree in Rasi */}
                  <div className="deg-summary-tile">
                    <span className="tile-lbl">{getUIString('degreeInRasi', currentLang, 'Degree in Rasi')}</span>
                    <span className="tile-val deg-mono font-bold">
                      {currentDegreeItem.degreeInRasi !== undefined ? `${currentDegreeItem.degreeInRasi}°` : `${selectedDegree % 30}°`}
                    </span>
                  </div>

                  {/* 4. Rasi Lord */}
                  <div className="deg-summary-tile">
                    <span className="tile-lbl">{getUIString('rasiLord', currentLang, 'Rasi Lord')}</span>
                    <span className="tile-val font-bold">
                      {getLocalizedKalachakramLord(currentDegreeItem.rasiAthipathi, currentLang)}
                    </span>
                  </div>

                  {/* 5. Nakshatra */}
                  <div className="deg-summary-tile">
                    <span className="tile-lbl">{getUIString('nakshatra', currentLang, 'Nakshatra')}</span>
                    <span className="tile-val highlight-val font-bold">
                      {getLocalizedKalachakramNakshatra(currentDegreeItem, currentLang)}
                    </span>
                  </div>

                  {/* 6. Pada */}
                  <div className="deg-summary-tile">
                    <span className="tile-lbl">{getUIString('pada', currentLang, 'Pada')}</span>
                    <span className="tile-val font-bold">
                      {getLocalizedKalachakramPada(currentDegreeItem.pada || 1, currentLang)}
                    </span>
                  </div>

                  {/* 7. Star Lord */}
                  <div className="deg-summary-tile">
                    <span className="tile-lbl">{getUIString('starLord', currentLang, 'Star Lord')}</span>
                    <span className="tile-val">
                      {getLocalizedKalachakramLord(currentDegreeItem.nakshatraAthipathi, currentLang)}
                    </span>
                  </div>

                  {/* 8. Navamsa Sign */}
                  <div className="deg-summary-tile">
                    <span className="tile-lbl">{getUIString('navamsaSign', currentLang, 'Navamsa Sign')}</span>
                    <span className="tile-val font-bold">
                      {getLocalizedKalachakramNavamsa(currentDegreeItem, currentLang)}
                    </span>
                  </div>

                  {/* 9. Navamsa Lord */}
                  <div className="deg-summary-tile">
                    <span className="tile-lbl">{getUIString('navamsaLord', currentLang, 'Navamsa Lord')}</span>
                    <span className="tile-val">
                      {getLocalizedKalachakramLord(currentDegreeItem.navamsaAthipathi, currentLang)}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Filter & Search Toolbar */}
            <div className="directory-filter-toolbar" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', flex: '1 1 auto' }}>
                {/* Search by exact degree */}
                <div className="directory-search-box" style={{ maxWidth: '200px' }}>
                  <span className="search-icon">🔍</span>
                  <input
                    type="number"
                    min="0"
                    max="359"
                    value={degreeSearch}
                    onChange={(e) => setDegreeSearch(e.target.value)}
                    placeholder={getUIString('searchDegreePlaceholder', currentLang, 'Search degree 0-359°...')}
                    className="directory-search-input"
                  />
                </div>

                {/* Filter by Rasi */}
                <select
                  value={filterRasi}
                  onChange={(e) => {
                    setFilterRasi(e.target.value);
                    setDegreeSearch('');
                  }}
                  className="quick-select-box"
                  style={{ minWidth: '150px', padding: '7px 10px', fontSize: '13px' }}
                >
                  <option value="all">{getUIString('allSigns', currentLang, 'All 12 Signs (0°-360°)')}</option>
                  {RASIS_6LANG.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.id + 1}. {r[currentLang] || r.en} ({r.id * 30}° - {(r.id + 1) * 30}°)
                    </option>
                  ))}
                </select>

                {/* Filter by Nakshatra */}
                <select
                  value={filterNakshatra}
                  onChange={(e) => {
                    setFilterNakshatra(e.target.value);
                    setDegreeSearch('');
                  }}
                  className="quick-select-box"
                  style={{ minWidth: '150px', padding: '7px 10px', fontSize: '13px' }}
                >
                  <option value="all">{getUIString('allNakshatras', currentLang, 'All 27 Stars')}</option>
                  {NAKSHATRAS_6LANG.map((n) => (
                    <option key={n.id} value={n.id}>
                      {n.id + 1}. {n[currentLang] || n.en}
                    </option>
                  ))}
                </select>

                {/* Filter by Pada */}
                <select
                  value={filterPada}
                  onChange={(e) => {
                    setFilterPada(e.target.value);
                    setDegreeSearch('');
                  }}
                  className="quick-select-box"
                  style={{ minWidth: '120px', padding: '7px 10px', fontSize: '13px' }}
                >
                  <option value="all">{getUIString('allPadas', currentLang, 'All Padas (1-4)')}</option>
                  {[1, 2, 3, 4].map((p) => (
                    <option key={p} value={p}>
                      {formatPadaLabel(p, currentLang)}
                    </option>
                  ))}
                </select>

                {/* Reset Filters button if any active */}
                {(filterRasi !== 'all' || filterNakshatra !== 'all' || filterPada !== 'all' || degreeSearch !== '') && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="chart-style-segmented-btn"
                    style={{ padding: '6px 12px', fontSize: '12px' }}
                  >
                    ✕ {getUIString('clear', currentLang, 'Clear Filters')}
                  </button>
                )}
              </div>

              {/* Right tools: View Mode Toggle & Rows Limit */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                {/* View Mode Toggle: Compact vs Detailed */}
                <div className="kp-view-mode-toggle">
                  <button
                    type="button"
                    className={`kp-view-toggle-btn ${viewMode === 'compact' ? 'active' : ''}`}
                    onClick={() => setViewMode('compact')}
                    title={getUIString('compact', currentLang, 'Compact Table')}
                  >
                    📑 {getUIString('compact', currentLang, 'Compact')}
                  </button>
                  <button
                    type="button"
                    className={`kp-view-toggle-btn ${viewMode === 'detailed' ? 'active' : ''}`}
                    onClick={() => setViewMode('detailed')}
                    title={getUIString('detailed', currentLang, 'Detailed Table')}
                  >
                    🔍 {getUIString('detailed', currentLang, 'Detailed')}
                  </button>
                </div>

                {/* View limit / Rows count selector */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--fe-text-muted)' }}>
                    {getUIString('viewRows', currentLang, 'Rows:')}
                  </span>
                  <select
                    value={viewLimit}
                    onChange={(e) => setViewLimit(e.target.value)}
                    className="quick-select-box"
                    style={{ padding: '6px 10px', fontSize: '12px' }}
                  >
                    <option value="all">{getUIString('viewAll360', currentLang, 'All 360 Degrees')}</option>
                    <option value="30">30 {getUIString('degrees', currentLang, 'Degrees')}</option>
                    <option value="60">60 {getUIString('degrees', currentLang, 'Degrees')}</option>
                    <option value="120">120 {getUIString('degrees', currentLang, 'Degrees')}</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Results Count Banner */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: 'var(--fe-text-muted)', margin: '8px 2px' }}>
              <span>
                {getUIString('showingDegrees', currentLang, 'Showing')}: <strong>{displayedItems.length}</strong> {getUIString('of360', currentLang, 'of 360°')}
              </span>
              {displayedItems.length > 0 && (
                <span>
                  {getUIString('degreeRange', currentLang, 'Range')}: {displayedItems[0]?.degree}° - {displayedItems[displayedItems.length - 1]?.degree + 1}°
                </span>
              )}
            </div>

            {/* 360° Kalachakram Table */}
            {loading ? (
              <div className="loading-box" style={{ padding: '60px 20px' }}>
                <div className="spinner"></div>
                <p>{getUIString('loading', currentLang, 'Loading Kalachakram data...')}</p>
              </div>
            ) : viewMode === 'compact' ? (
              /* Compact Reference Table (High-Density, Sticky Headers, Sign Boundaries) */
              <div className="table-responsive-container kalachakram-table-scroll-wrap" ref={tableContainerRef}>
                <table className="kalachakram-compact-table">
                  <thead>
                    <tr>
                      <th style={{ width: '65px', textAlign: 'center' }}>
                        {getUIString('degree', currentLang, 'Degree')}
                      </th>
                      <th style={{ width: '75px', textAlign: 'center' }}>
                        {getUIString('degreeInRasi', currentLang, 'In Sign')}
                      </th>
                      <th>{getUIString('zodiacSign', currentLang, 'Rasi')}</th>
                      <th>{getUIString('rasiLord', currentLang, 'Rasi Lord')}</th>
                      <th>{getUIString('nakshatra', currentLang, 'Nakshatra')}</th>
                      <th style={{ width: '75px', textAlign: 'center' }}>
                        {getUIString('pada', currentLang, 'Pada')}
                      </th>
                      <th>{getUIString('starLord', currentLang, 'Star Lord')}</th>
                      <th>{getUIString('navamsaSign', currentLang, 'Navamsa Sign')}</th>
                      <th>{getUIString('navamsaLord', currentLang, 'Navamsa Lord')}</th>
                      <th style={{ width: '55px', textAlign: 'center' }}>
                        {getUIString('selectDegree', currentLang, 'Select')}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayedItems.map((item, idx) => {
                      const isSelected = item.degree === selectedDegree;
                      const prevItem = idx > 0 ? displayedItems[idx - 1] : null;
                      const isSignBoundary = !prevItem || prevItem.rasiId !== item.rasiId || item.degreeInRasi === 0;

                      return (
                        <tr
                          key={item.degree}
                          id={`kalachakram-row-${item.degree}`}
                          className={`kalachakram-compact-row ${isSelected ? 'selected-row' : ''} ${isSignBoundary ? 'sign-boundary-row' : ''}`}
                          onClick={() => setSelectedDegree(item.degree)}
                        >
                          <td className="cell-deg deg-mono font-bold text-center">
                            {item.degree}°
                          </td>
                          <td className="cell-in-sign deg-mono text-center">
                            {item.degreeInRasi !== undefined ? `${item.degreeInRasi}°` : `${item.degree % 30}°`}
                          </td>
                          <td className="cell-rasi font-bold">
                            {getLocalizedKalachakramRasi(item, currentLang)}
                          </td>
                          <td className="cell-rasi-lord">
                            {getLocalizedKalachakramLord(item.rasiAthipathi, currentLang)}
                          </td>
                          <td className="cell-nakshatra font-bold">
                            {getLocalizedKalachakramNakshatra(item, currentLang)}
                          </td>
                          <td className="cell-pada text-center">
                            <span className="kalachakram-compact-pada-badge">
                              {getLocalizedKalachakramPada(item.pada, currentLang)}
                            </span>
                          </td>
                          <td className="cell-star-lord">
                            {getLocalizedKalachakramLord(item.nakshatraAthipathi, currentLang)}
                          </td>
                          <td className="cell-navamsa font-bold">
                            {getLocalizedKalachakramNavamsa(item, currentLang)}
                          </td>
                          <td className="cell-navamsa-lord">
                            {getLocalizedKalachakramLord(item.navamsaAthipathi, currentLang)}
                          </td>
                          <td className="cell-action text-center">
                            <button
                              type="button"
                              className={`chart-style-segmented-btn ${isSelected ? 'active' : ''}`}
                              style={{ padding: '2px 7px', fontSize: '11px', lineHeight: 1 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedDegree(item.degree);
                              }}
                              title={getUIString('selectDegree', currentLang, 'Select')}
                            >
                              {isSelected ? '✓' : '→'}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              /* Detailed Standard Table */
              <div className="table-responsive-container">
                <table className="planetary-table">
                  <thead>
                    <tr>
                      <th style={{ width: '70px', textAlign: 'center' }}>{getUIString('degree', currentLang, 'Degree')}</th>
                      <th style={{ width: '80px', textAlign: 'center' }}>{getUIString('degreeInRasi', currentLang, 'In Sign')}</th>
                      <th>{getUIString('zodiacSign', currentLang, 'Rasi')}</th>
                      <th>{getUIString('rasiLord', currentLang, 'Rasi Lord')}</th>
                      <th>{getUIString('nakshatra', currentLang, 'Nakshatra')}</th>
                      <th style={{ width: '80px', textAlign: 'center' }}>{getUIString('pada', currentLang, 'Pada')}</th>
                      <th>{getUIString('starLord', currentLang, 'Star Lord')}</th>
                      <th>{getUIString('navamsaSign', currentLang, 'Navamsa Sign')}</th>
                      <th>{getUIString('navamsaLord', currentLang, 'Navamsa Lord')}</th>
                      <th style={{ width: '60px', textAlign: 'center' }}>{getUIString('selectDegree', currentLang, 'Select')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayedItems.map((item) => {
                      const isSelected = item.degree === selectedDegree;
                      return (
                        <tr
                          key={item.degree}
                          id={`kalachakram-detailed-row-${item.degree}`}
                          className={`kalachakram-row ${isSelected ? 'selected-row kalachakram-selected-row' : ''}`}
                          onClick={() => setSelectedDegree(item.degree)}
                          style={{ cursor: 'pointer' }}
                        >
                          <td className="deg-mono font-bold text-center" style={{ color: isSelected ? 'var(--fe-amber-gold)' : undefined }}>
                            {item.degree}°
                          </td>
                          <td className="deg-mono text-center">
                            {item.degreeInRasi !== undefined ? `${item.degreeInRasi}°` : `${item.degree % 30}°`}
                          </td>
                          <td className="font-bold">
                            {getLocalizedKalachakramRasi(item, currentLang)}
                          </td>
                          <td>
                            {getLocalizedKalachakramLord(item.rasiAthipathi, currentLang)}
                          </td>
                          <td className="font-bold">
                            {getLocalizedKalachakramNakshatra(item, currentLang)}
                          </td>
                          <td className="text-center">
                            <span className="pada-badge">
                              {getLocalizedKalachakramPada(item.pada, currentLang)}
                            </span>
                          </td>
                          <td>
                            {getLocalizedKalachakramLord(item.nakshatraAthipathi, currentLang)}
                          </td>
                          <td className="font-bold">
                            {getLocalizedKalachakramNavamsa(item, currentLang)}
                          </td>
                          <td>
                            {getLocalizedKalachakramLord(item.navamsaAthipathi, currentLang)}
                          </td>
                          <td className="text-center">
                            <button
                              type="button"
                              className={`chart-style-segmented-btn ${isSelected ? 'active' : ''}`}
                              style={{ padding: '3px 8px', fontSize: '11px' }}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedDegree(item.degree);
                              }}
                              title={getUIString('selectDegree', currentLang, 'Select')}
                            >
                              {isSelected ? '✓' : '→'}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
    </>
  );
}
