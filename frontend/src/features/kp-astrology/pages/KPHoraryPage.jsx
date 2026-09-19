import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import masterDataService from '../../../services/masterData.service';
import SEOHead from '../../../components/common/SEOHead';
import Breadcrumbs from '../../../components/common/Breadcrumbs';
import { getLocalizedValue, getUIString } from '../../../utils/localizedContent';
import { ROUTES } from '../../../config/routes.config';

export default function KPHoraryPage() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'en';
  const navigate = useNavigate();

  const [horaryList, setHoraryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedNumber, setSelectedNumber] = useState(1);
  const [searchNumber, setSearchNumber] = useState('');
  const [filterRasi, setFilterRasi] = useState('all');
  const [filterSubLord, setFilterSubLord] = useState('all');
  const [viewMode, setViewMode] = useState('compact');

  const tableContainerRef = useRef(null);

  useEffect(() => {
    fetchHoraryData();
  }, []);

  const fetchHoraryData = async () => {
    setLoading(true);
    try {
      const data = await masterDataService.getKPHorary();
      setHoraryList(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to load KP Horary data:', err);
    } finally {
      setLoading(false);
    }
  };

  const breadcrumbItems = [
    { label: getUIString('home', currentLang, 'Home'), link: '/' },
    { label: getUIString('kpHoraryTitle', currentLang, 'KP Horary Numbers 1-249 Table'), active: true }
  ];

  const getLangProp = (obj, defaultEn = '') => {
    return getLocalizedValue(obj, currentLang, defaultEn);
  };

  // Format DMS compactly: 00°00'00"
  const formatCompactDMS = (dmsStr) => {
    if (!dmsStr) return '00°00\'00"';
    return dmsStr.replace(/\s+/g, '');
  };

  const filteredItems = horaryList.filter((item) => {
    if (searchNumber !== '') {
      return String(item.number).includes(searchNumber);
    }
    const rasiMatch = filterRasi === 'all' || item.rasiId === Number(filterRasi);
    const subMatch = filterSubLord === 'all' || (item.subLordName && item.subLordName.toLowerCase() === filterSubLord.toLowerCase());
    return rasiMatch && subMatch;
  });

  const currentItem = horaryList.find((item) => item.number === selectedNumber) || horaryList[0];

  const handleRowClick = (num) => {
    setSelectedNumber(num);
  };

  const jumpToRasi = (rasiId) => {
    setFilterRasi(String(rasiId));
    setSearchNumber('');
    const firstItemOfRasi = horaryList.find((item) => item.rasiId === Number(rasiId));
    if (firstItemOfRasi) {
      setSelectedNumber(firstItemOfRasi.number);
    }
  };

  const rasiNames = [
    { id: 0, en: 'Aries', ta: 'மேஷம்', hi: 'मेष', te: 'మేషం', kn: 'ಮೇಷ', ml: 'മേടം' },
    { id: 1, en: 'Taurus', ta: 'ரிஷபம்', hi: 'वृषभ', te: 'వృషభం', kn: 'ವೃಷಭ', ml: 'ഇടവം' },
    { id: 2, en: 'Gemini', ta: 'மிதுனம்', hi: 'मिथुन', te: 'మిథునం', kn: 'ಮಿಥುನ', ml: 'മിഥുനം' },
    { id: 3, en: 'Cancer', ta: 'கடகம்', hi: 'कर्क', te: 'కర్కాటకం', kn: 'ಕರ್ಕಾಟಕ', ml: 'കർക്കിടകം' },
    { id: 4, en: 'Leo', ta: 'சிம்மம்', hi: 'सिंह', te: 'సింహం', kn: 'ಸಿಂಹ', ml: 'ചിങ്ങം' },
    { id: 5, en: 'Virgo', ta: 'கன்னி', hi: 'कन्या', te: 'కన్య', kn: 'ಕನ್ಯಾ', ml: 'കന്നി' },
    { id: 6, en: 'Libra', ta: 'துலாம்', hi: 'तुला', te: 'తుల', kn: 'ತುಲಾ', ml: 'തുലാം' },
    { id: 7, en: 'Scorpio', ta: 'விருச்சிகம்', hi: 'वृश्चिक', te: 'వృశ్చಿಕం', kn: 'ವೃಶ್ಚಿಕ', ml: 'വൃശ്ചികം' },
    { id: 8, en: 'Sagittarius', ta: 'தனுசு', hi: 'धनु', te: 'ధనుస్సు', kn: 'ಧನುಸ್ಸು', ml: 'ധനു' },
    { id: 9, en: 'Capricorn', ta: 'மகரம்', hi: 'मकर', te: 'మకరం', kn: 'ಮಕರ', ml: 'മകരം' },
    { id: 10, en: 'Aquarius', ta: 'கும்பம்', hi: 'कुम्भ', te: 'కుంభం', kn: 'ಕುಂಭ', ml: 'കുംഭം' },
    { id: 11, en: 'Pisces', ta: 'மீனம்', hi: 'मीन', te: 'మీనం', kn: 'ಮೀನ', ml: 'മീനം' }
  ];

  const subLords = ['all', 'Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury'];

  return (
    <>
      {/* Enterprise SEO Meta & Structured Data */}
      <SEOHead
        pageKey="kpHorary"
        breadcrumbs={[
          { name: 'Home', path: ROUTES.HOME },
          { name: 'KP Astrology', path: ROUTES.KP_ASTROLOGY.HORARY },
          { name: getUIString('kpHoraryTitle', currentLang), path: ROUTES.KP_ASTROLOGY.HORARY }
        ]}
      />

      <Breadcrumbs items={[
        { name: 'Home', path: ROUTES.HOME },
        { name: 'KP Astrology', path: ROUTES.KP_ASTROLOGY.HORARY },
        { name: getUIString('kpHoraryTitle', currentLang), path: ROUTES.KP_ASTROLOGY.HORARY }
      ]} />

      <div className="master-directory-page">
            {/* Header Hero Banner */}
            <div className="directory-hero-banner">
              <div className="directory-hero-left">
                <span className="directory-hero-icon">🔮</span>
                <div>
                  <h1 className="directory-hero-title">
                    {getUIString('kpHoraryTitle', currentLang, 'KP Horary Numbers 1-249 Table')}
                  </h1>
                  <p className="directory-hero-sub">
                    {getUIString('kpHorarySubtitle', currentLang, 'Krishnamurti Paddhati 249 Sub-Lord table with sign, star, sub-lord, and exact degree boundaries.')}
                  </p>
                </div>
              </div>
            </div>

            {/* Selected Number Quick Spec Banner */}
            {currentItem && (
              <div className="kp-quick-spec-card">
                <div className="kp-spec-num-badge">
                  <span className="kp-spec-num-lbl">KP #</span>
                  <span className="kp-spec-num-val">{currentItem.number}</span>
                </div>

                <div className="kp-spec-details-grid">
                  <div className="kp-spec-cell">
                    <span className="kp-spec-lbl">{getUIString('element', currentLang, 'Sign')}</span>
                    <span className="kp-spec-val font-bold text-amber-950">{getLangProp(currentItem.sign)}</span>
                  </div>

                  <div className="kp-spec-cell">
                    <span className="kp-spec-lbl">From</span>
                    <span className="kp-spec-val deg-mono font-bold">{formatCompactDMS(currentItem.rasiStartDMS)}</span>
                  </div>

                  <div className="kp-spec-cell">
                    <span className="kp-spec-lbl">To</span>
                    <span className="kp-spec-val deg-mono font-bold">{formatCompactDMS(currentItem.rasiEndDMS)}</span>
                  </div>

                  <div className="kp-spec-cell">
                    <span className="kp-spec-lbl">{getUIString('rulingLord', currentLang, 'Sign Lord')}</span>
                    <span className="kp-spec-val">{getLangProp(currentItem.signLord)}</span>
                  </div>

                  <div className="kp-spec-cell">
                    <span className="kp-spec-lbl">Star Lord</span>
                    <span className="kp-spec-val">{getLangProp(currentItem.starLord)}</span>
                  </div>

                  <div className="kp-spec-cell">
                    <span className="kp-spec-lbl">Sub Lord</span>
                    <span className="kp-spec-val font-bold text-emerald-800">{getLangProp(currentItem.subLord)}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Filter and View Mode Toolbar */}
            <div className="kp-table-control-toolbar">
              <div className="kp-toolbar-top-row">
                {/* Search Box */}
                <div className="directory-search-box" style={{ maxWidth: '200px' }}>
                  <span className="search-icon">🔢</span>
                  <input
                    type="number"
                    min="1"
                    max="249"
                    value={searchNumber}
                    onChange={(e) => setSearchNumber(e.target.value)}
                    placeholder="KP No. (1-249)..."
                    className="directory-search-input"
                  />
                </div>

                {/* Sign Filter */}
                <select
                  value={filterRasi}
                  onChange={(e) => setFilterRasi(e.target.value)}
                  className="quick-select-box"
                  style={{ minWidth: '150px', padding: '6px 10px', fontSize: '12px' }}
                >
                  <option value="all">{getUIString('all', currentLang, 'All Signs')}</option>
                  {rasiNames.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.id + 1}. {r[currentLang] || r.en}
                    </option>
                  ))}
                </select>

                {/* Sub-Lord Filter */}
                <select
                  value={filterSubLord}
                  onChange={(e) => setFilterSubLord(e.target.value)}
                  className="quick-select-box"
                  style={{ minWidth: '140px', padding: '6px 10px', fontSize: '12px' }}
                >
                  <option value="all">{getUIString('all', currentLang, 'All Sub-Lords')}</option>
                  {subLords.filter(s => s !== 'all').map((pl) => (
                    <option key={pl} value={pl}>{pl}</option>
                  ))}
                </select>

                {/* View Mode Toggle */}
                <div className="kp-view-mode-toggle">
                  <button
                    type="button"
                    className={`kp-view-toggle-btn ${viewMode === 'compact' ? 'active' : ''}`}
                    onClick={() => setViewMode('compact')}
                    title="Compact Table"
                  >
                    📑 Compact
                  </button>
                  <button
                    type="button"
                    className={`kp-view-toggle-btn ${viewMode === 'extended' ? 'active' : ''}`}
                    onClick={() => setViewMode('extended')}
                    title="Detailed view"
                  >
                    🔍 Detailed
                  </button>
                </div>
              </div>

              {/* Quick Jump Sign Chips Strip */}
              <div className="kp-sign-chips-scroll">
                <span className="kp-chips-lbl">{getUIString('element', currentLang, 'Jump to Sign:')}:</span>
                <button
                  type="button"
                  className={`kp-sign-chip ${filterRasi === 'all' ? 'active' : ''}`}
                  onClick={() => { setFilterRasi('all'); setSearchNumber(''); }}
                >
                  {getUIString('all', currentLang, 'All')} (1-249)
                </button>
                {rasiNames.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    className={`kp-sign-chip ${filterRasi === String(r.id) ? 'active' : ''}`}
                    onClick={() => jumpToRasi(r.id)}
                  >
                    {r[currentLang] || r.en}
                  </button>
                ))}
              </div>
            </div>

            {/* Compact Reference Table */}
            {loading ? (
              <div className="loading-box" style={{ padding: '60px 20px' }}>
                <div className="spinner"></div>
                <p>{getUIString('loading', currentLang, 'Loading KP Horary Table...')}</p>
              </div>
            ) : (
              <div className="table-responsive-container kp-table-scroll-wrap" ref={tableContainerRef}>
                <table className="kp-compact-reference-table">
                  <thead>
                    <tr>
                      <th className="col-no">No.</th>
                      <th className="col-sign">Sign</th>
                      {viewMode === 'extended' && (
                        <th className="col-star">Star</th>
                      )}
                      <th className="col-from">From</th>
                      <th className="col-to">To</th>
                      <th className="col-signlord">Sign Lord</th>
                      <th className="col-starlord">Star Lord</th>
                      <th className="col-sublord">Sub Lord</th>
                      {viewMode === 'extended' && (
                        <>
                          <th className="col-long">360° Longitude</th>
                          <th className="col-span">Span</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredItems.map((row, idx) => {
                      const isSelected = row.number === selectedNumber;
                      const prevRow = idx > 0 ? filteredItems[idx - 1] : null;
                      const isSignStart = !prevRow || prevRow.rasiId !== row.rasiId;

                      return (
                        <tr 
                          key={row.number}
                          id={`kp-row-${row.number}`}
                          className={`${isSelected ? 'selected-row' : ''} ${isSignStart ? 'sign-boundary-row' : ''}`}
                          onClick={() => handleRowClick(row.number)}
                        >
                          {/* 1. No. */}
                          <td className="cell-no">{row.number}</td>

                          {/* 2. Sign */}
                          <td className="cell-sign">
                            <span className="sign-text">{getLangProp(row.sign)}</span>
                          </td>

                          {/* Star (Extended mode only) */}
                          {viewMode === 'extended' && (
                            <td className="cell-star">{getLangProp(row.star)}</td>
                          )}

                          {/* 3. From (Deg/Min/Sec) */}
                          <td className="cell-from deg-mono">
                            {formatCompactDMS(row.rasiStartDMS)}
                          </td>

                          {/* 4. To (Deg/Min/Sec) */}
                          <td className="cell-to deg-mono">
                            {formatCompactDMS(row.rasiEndDMS)}
                          </td>

                          {/* 5. Sign Lord */}
                          <td className="cell-signlord">
                            {getLangProp(row.signLord)}
                          </td>

                          {/* 6. Star Lord */}
                          <td className="cell-starlord">
                            {getLangProp(row.starLord)}
                          </td>

                          {/* 7. Sub Lord */}
                          <td className="cell-sublord">
                            <span className="sublord-highlight-tag">
                              {getLangProp(row.subLord)}
                            </span>
                          </td>

                          {/* 360 Longitude & Span (Extended mode only) */}
                          {viewMode === 'extended' && (
                            <>
                              <td className="cell-long deg-mono text-emerald-800">
                                {formatCompactDMS(row.startDMS)} - {formatCompactDMS(row.endDMS)}
                              </td>
                              <td className="cell-span deg-mono">
                                {row.spanFormatted}
                              </td>
                            </>
                          )}
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
