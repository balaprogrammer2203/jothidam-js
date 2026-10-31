import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import masterDataService from '../../../services/masterData.service';
import SEOHead from '../../../components/common/SEOHead';
import Breadcrumbs from '../../../components/common/Breadcrumbs';
import { ROUTES } from '../../../config/routes.config';
import {
  PUSHKARA_NAVAMSA_DATA,
  PUSHKARA_NAKSHATRA_SUMMARY,
  NON_PUSHKARA_NAKSHATRAS_NOTE,
  PUSHKARA_NAVAMSA_STATS
} from '../data/pushkaraNavamsaData';
import '../../../styles/pushkaraNavamsam.css';

export default function PushkaraNavamsamPage() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'ta';

  const [padamList, setPadamList] = useState(PUSHKARA_NAVAMSA_DATA);
  const [nakshatraSummary, setNakshatraSummary] = useState(PUSHKARA_NAKSHATRA_SUMMARY);
  const [noteData, setNoteData] = useState(NON_PUSHKARA_NAKSHATRAS_NOTE);
  const [loading, setLoading] = useState(false);

  // View & Filter states
  // 'cards' = 24 individual Pada Cards (Tile View - Default)
  // 'summary' = 18 Nakshatras Table matching reference image
  const [activeTab, setActiveTab] = useState('cards');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNavamsaSign, setSelectedNavamsaSign] = useState('ALL');
  const [filterVargottamaOnly, setFilterVargottamaOnly] = useState(false);

  useEffect(() => {
    fetchPushkaraData();
  }, [currentLang]);

  const fetchPushkaraData = async () => {
    try {
      setLoading(true);
      const res = await masterDataService.getPushkaraNavamsa({ lang: currentLang });
      if (res && res.data && res.data.length > 0) {
        setPadamList(res.data);
      }
      if (res && res.nakshatraSummary && res.nakshatraSummary.length > 0) {
        setNakshatraSummary(res.nakshatraSummary);
      }
      if (res && res.note) {
        setNoteData(res.note);
      }
    } catch (err) {
      console.warn('Using local fallback for Pushkara Navamsa:', err);
    } finally {
      setLoading(false);
    }
  };

  // Helper for localized text supporting both {name, nameTa} and {en, ta}
  const getLocalized = (obj, fallback = '') => {
    if (!obj) return fallback;
    if (typeof obj === 'string') return obj;
    if (currentLang === 'ta') return obj.nameTa || obj.ta || obj.name || obj.en || fallback;
    if (currentLang === 'hi') return obj.nameHi || obj.hi || obj.name || obj.en || fallback;
    if (currentLang === 'te') return obj.nameTe || obj.te || obj.name || obj.en || fallback;
    if (currentLang === 'kn') return obj.nameKn || obj.kn || obj.name || obj.en || fallback;
    if (currentLang === 'ml') return obj.nameMl || obj.ml || obj.name || obj.en || fallback;
    return obj.name || obj.en || obj.nameTa || obj.ta || fallback;
  };

  // Filtered 18-Nakshatra Summary list
  const filteredSummary = useMemo(() => {
    let list = [...nakshatraSummary];

    if (searchTerm.trim()) {
      const q = searchTerm.trim().toLowerCase();
      list = list.filter((item) => {
        const nameTa = (item.nakshatraName?.nameTa || item.nakshatraName?.ta || '').toLowerCase();
        const nameEn = (item.nakshatraName?.name || item.nakshatraName?.en || '').toLowerCase();
        const padaTa = (item.padasDisplayTa || '').toLowerCase();
        const padaEn = (item.padasDisplayEn || '').toLowerCase();
        const rasiTa = (item.navamsaRasisTa || '').toLowerCase();
        const rasiEn = (item.navamsaRasisEn || '').toLowerCase();
        return (
          nameTa.includes(q) ||
          nameEn.includes(q) ||
          padaTa.includes(q) ||
          padaEn.includes(q) ||
          rasiTa.includes(q) ||
          rasiEn.includes(q)
        );
      });
    }

    if (selectedNavamsaSign !== 'ALL') {
      list = list.filter((item) => {
        const rasisTa = item.navamsaRasisTa || '';
        const rasisEn = item.navamsaRasisEn || '';
        return (
          rasisTa.includes(selectedNavamsaSign) ||
          rasisEn.toLowerCase().includes(selectedNavamsaSign.toLowerCase())
        );
      });
    }

    if (filterVargottamaOnly) {
      list = list.filter((item) => item.hasVargottama);
    }

    return list;
  }, [nakshatraSummary, searchTerm, selectedNavamsaSign, filterVargottamaOnly]);

  // Filtered 24-Padam individual list
  const filteredPadams = useMemo(() => {
    let list = [...padamList];

    if (searchTerm.trim()) {
      const q = searchTerm.trim().toLowerCase();
      list = list.filter((item) => {
        const nakTa = (item.nakshatraName?.nameTa || item.nakshatraName?.ta || '').toLowerCase();
        const nakEn = (item.nakshatraName?.name || item.nakshatraName?.en || '').toLowerCase();
        const rasiTa = (item.rasiName?.nameTa || '').toLowerCase();
        const rasiEn = (item.rasiName?.name || '').toLowerCase();
        const navTa = (item.navamsaRasiName?.nameTa || '').toLowerCase();
        const navEn = (item.navamsaRasiName?.name || '').toLowerCase();
        const padaStr = String(item.pada);
        return (
          nakTa.includes(q) ||
          nakEn.includes(q) ||
          rasiTa.includes(q) ||
          rasiEn.includes(q) ||
          navTa.includes(q) ||
          navEn.includes(q) ||
          padaStr === q
        );
      });
    }

    if (selectedNavamsaSign !== 'ALL') {
      list = list.filter((item) => {
        const navTa = item.navamsaRasiName?.nameTa || '';
        const navEn = item.navamsaRasiName?.name || '';
        return (
          navTa === selectedNavamsaSign ||
          navEn.toLowerCase() === selectedNavamsaSign.toLowerCase()
        );
      });
    }

    if (filterVargottamaOnly) {
      list = list.filter((item) => item.isVargottama);
    }

    return list;
  }, [padamList, searchTerm, selectedNavamsaSign, filterVargottamaOnly]);

  // Navamsa Sign Filters List
  const navamsaSignFilters = [
    { id: 'ALL', labelTa: 'அனைத்து ராசிகள்', labelEn: 'All Signs', count: 24 },
    { id: 'ரிஷபம்', labelTa: 'ரிஷபம் (சுக்கிரன்)', labelEn: 'Taurus (Venus)', count: 6 },
    { id: 'மீனம்', labelTa: 'மீனம் (குரு)', labelEn: 'Pisces (Jupiter)', count: 6 },
    { id: 'துலாம்', labelTa: 'துலாம் (சுக்கிரன்)', labelEn: 'Libra (Venus)', count: 3 },
    { id: 'தனுசு', labelTa: 'தனுசு (குரு)', labelEn: 'Sagittarius (Jupiter)', count: 3 },
    { id: 'கடகம்', labelTa: 'கடகம் (சந்திரன்)', labelEn: 'Cancer (Moon)', count: 3 },
    { id: 'கன்னி', labelTa: 'கன்னி (புதன்)', labelEn: 'Virgo (Mercury)', count: 3 }
  ];

  return (
    <>
      <SEOHead
        pageKey="pushkara-navamsam-padam-list"
        canonicalUrl="/pushkara-navamsam-padam-list"
      />

      <div className="pushkara-page-container">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { label: currentLang === 'ta' ? 'முகப்பு' : 'Home', path: ROUTES.HOME },
            {
              label: currentLang === 'ta' ? 'ராசிகள் & நட்சத்திரங்கள்' : 'Signs & Stars',
              path: ROUTES.ZODIAC.NAKSHATRAS
            },
            {
              label:
                currentLang === 'ta'
                  ? '24 புஷ்கர நவாம்ச பாதங்கள்'
                  : '24 Pushkara Navamsa Padas',
              active: true
            }
          ]}
        />

        {/* 1. HERO BANNER */}
        <header className="pushkara-hero-banner">
          <div className="pushkara-hero-left">
            <div className="pushkara-hero-icon" aria-hidden="true">
              🌟
            </div>
            <div className="pushkara-hero-titles">
              <h1>
                {currentLang === 'ta'
                  ? 'புஷ்கர நவாம்சம் பெறும் 24 பாதங்களின் முழு பட்டியல்'
                  : '24 Pushkara Navamsa Padas Complete List'}
              </h1>
              <p>
                {currentLang === 'ta'
                  ? '108 பாதங்களில் அதியுன்னத சுப பலன்களை வழங்கும் 24 புஷ்கர நவாம்ச பாதங்கள், 18 நட்சத்திரங்களின் அட்டவணை மற்றும் நவாம்ச வீடுகள்'
                  : 'Comprehensive reference table of the 24 highly auspicious Pushkara Navamsas across 18 nakshatras in Vedic astrology'}
              </p>
            </div>
          </div>
          <div className="pushkara-hero-right">
            <span className="pushkara-hero-badge">
              ✨ {currentLang === 'ta' ? '24 பாதங்கள்' : '24 Padas'}
            </span>
            <span className="pushkara-hero-badge">
              ⭐ {currentLang === 'ta' ? '18 நட்சத்திரங்கள்' : '18 Nakshatras'}
            </span>
            <span className="pushkara-hero-badge">
              👑 {currentLang === 'ta' ? '3 வர்கோத்தமம்' : '3 Vargottama'}
            </span>
          </div>
        </header>

        {/* 2. STATS OVERVIEW CARDS */}
        <section className="pushkara-stats-grid" aria-label="Pushkara Navamsa Quick Stats">
          <div className="pushkara-stat-card">
            <div className="pushkara-stat-icon" style={{ background: '#dbeafe', color: '#1e40af' }}>
              🔢
            </div>
            <div className="pushkara-stat-info">
              <span className="pushkara-stat-number">24</span>
              <span className="pushkara-stat-label">
                {currentLang === 'ta' ? 'புஷ்கர நவாம்ச பாதங்கள்' : 'Pushkara Navamsa Padas'}
              </span>
            </div>
          </div>

          <div className="pushkara-stat-card">
            <div className="pushkara-stat-icon" style={{ background: '#fef3c7', color: '#92400e' }}>
              🌟
            </div>
            <div className="pushkara-stat-info">
              <span className="pushkara-stat-number">18</span>
              <span className="pushkara-stat-label">
                {currentLang === 'ta' ? 'பெறும் நட்சத்திரங்கள்' : 'Eligible Nakshatras'}
              </span>
            </div>
          </div>

          <div className="pushkara-stat-card">
            <div className="pushkara-stat-icon" style={{ background: '#dcfce7', color: '#166534' }}>
              🏛️
            </div>
            <div className="pushkara-stat-info">
              <span className="pushkara-stat-number">6</span>
              <span className="pushkara-stat-label">
                {currentLang === 'ta' ? 'சுப நவாம்ச ராசிகள்' : 'Benefic Navamsa Signs'}
              </span>
            </div>
          </div>

          <div className="pushkara-stat-card">
            <div className="pushkara-stat-icon" style={{ background: '#fae8ff', color: '#86198f' }}>
              👑
            </div>
            <div className="pushkara-stat-info">
              <span className="pushkara-stat-number">3</span>
              <span className="pushkara-stat-label">
                {currentLang === 'ta' ? 'புஷ்கர வர்கோத்தமம்' : 'Pushkara Vargottama'}
              </span>
            </div>
          </div>
        </section>

        {/* 3. CONTROLS BAR (VIEW TABS, SEARCH, FILTERS) */}
        <section className="pushkara-controls-card">
          <div className="pushkara-controls-top">
            {/* View Mode Switcher */}
            <div className="pushkara-tabs" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'cards'}
                className={`pushkara-tab-btn ${activeTab === 'cards' ? 'active' : ''}`}
                onClick={() => setActiveTab('cards')}
              >
                <span>🎴</span>
                <span>
                  {currentLang === 'ta'
                    ? '24 பாதங்கள் கார்டுகள்'
                    : '24 Pada Cards'}
                </span>
                <span className="pushkara-tab-count">{filteredPadams.length}</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'summary'}
                className={`pushkara-tab-btn ${activeTab === 'summary' ? 'active' : ''}`}
                onClick={() => setActiveTab('summary')}
              >
                <span>📋</span>
                <span>
                  {currentLang === 'ta'
                    ? 'நட்சத்திர வாரியாக (18)'
                    : 'By Nakshatras (18)'}
                </span>
                <span className="pushkara-tab-count">{filteredSummary.length}</span>
              </button>
            </div>

            {/* Search Box */}
            <div className="pushkara-search-box">
              <input
                type="text"
                className="pushkara-search-input"
                placeholder={
                  currentLang === 'ta'
                    ? 'நட்சத்திரம், பாதம், ராசி தேட...'
                    : 'Search nakshatra, pada, rasi...'
                }
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  type="button"
                  className="pushkara-search-clear"
                  onClick={() => setSearchTerm('')}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Filter Chips Row */}
          <div className="pushkara-filters-row">
            <span style={{ fontSize: '12.5px', color: '#64748b', fontWeight: 700 }}>
              {currentLang === 'ta' ? 'நவாம்ச வீடு:' : 'Navamsa Sign:'}
            </span>
            {navamsaSignFilters.map((flt) => (
              <button
                key={flt.id}
                type="button"
                className={`pushkara-filter-chip ${selectedNavamsaSign === flt.id ? 'active' : ''}`}
                onClick={() => setSelectedNavamsaSign(flt.id)}
              >
                {currentLang === 'ta' ? flt.labelTa : flt.labelEn}
              </button>
            ))}

            <button
              type="button"
              className={`pushkara-filter-chip ${filterVargottamaOnly ? 'active' : ''}`}
              onClick={() => setFilterVargottamaOnly((prev) => !prev)}
              style={{ marginLeft: 'auto' }}
            >
              👑 {currentLang === 'ta' ? 'வர்கோத்தமம் மட்டும் (3)' : 'Vargottama Only (3)'}
            </button>
          </div>
        </section>

        {/* 4. MAIN VIEW CONTENT */}

        {/* TAB 1: SUMMARY TABLE (EXACT 18 NAKSHATRAS MATCHING USER'S IMAGE) */}
        {activeTab === 'summary' && (
          <section className="pushkara-summary-card">
            <div className="pushkara-card-header">
              <h2>
                <span>📜</span>
                <span>
                  {currentLang === 'ta'
                    ? 'நட்சத்திர வாரியாக 24 பாதங்களின் முழு பட்டியல்:'
                    : 'Full List of 24 Padas by Nakshatras:'}
                </span>
              </h2>
              <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>
                {currentLang === 'ta'
                  ? `மொத்தம்: ${filteredSummary.length} நட்சத்திரங்கள்`
                  : `Showing ${filteredSummary.length} nakshatras`}
              </span>
            </div>

            <div className="pushkara-table-wrapper">
              <table className="pushkara-summary-table">
                <thead>
                  <tr>
                    <th style={{ width: '60px' }}>#</th>
                    <th>{currentLang === 'ta' ? 'நட்சத்திரம்' : 'Nakshatra'}</th>
                    <th>
                      {currentLang === 'ta'
                        ? 'புஷ்கர நவாம்சம் பெரும் பாதம்'
                        : 'Pushkara Navamsa Pada'}
                    </th>
                    <th>
                      {currentLang === 'ta'
                        ? 'நவாம்சம் அமையும் வீடு'
                        : 'Navamsa House / Sign'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSummary.map((item, idx) => (
                    <tr key={item.order || idx}>
                      <td>
                        <span className="pushkara-num-badge">{item.order}</span>
                      </td>
                      <td>
                        <span className="pushkara-nak-name">
                          {getLocalized(item.nakshatraName)}
                          {currentLang !== 'ta' && (item.nakshatraName?.nameTa || item.nakshatraName?.ta) && (
                            <span style={{ fontSize: '12px', color: '#64748b' }}>
                              ({item.nakshatraName?.nameTa || item.nakshatraName?.ta})
                            </span>
                          )}
                        </span>
                      </td>
                      <td>
                        <span className="pushkara-padas-text">
                          {currentLang === 'ta'
                            ? item.padasDisplayTa
                            : item.padasDisplayEn || item.padasDisplayTa}
                        </span>
                      </td>
                      <td>
                        <div className="pushkara-navamsa-rasis">
                          <span>
                            {currentLang === 'ta'
                              ? item.navamsaRasisTa
                              : item.navamsaRasisEn || item.navamsaRasisTa}
                          </span>
                          {item.hasVargottama && (
                            <span className="pushkara-vargottama-pill">
                              👑 {currentLang === 'ta' ? 'வர்கோத்தமம்' : 'Vargottama'}
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredSummary.length === 0 && (
                    <tr>
                      <td colSpan="4" style={{ textAlign: 'center', padding: '36px', color: '#94a3b8' }}>
                        {currentLang === 'ta'
                          ? 'பொருத்தமான நட்சத்திரங்கள் கிடைக்கவில்லை'
                          : 'No matching nakshatras found'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* TAB 2: 24 PADAS CARD / TILE VIEW */}
        {activeTab === 'cards' && (
          <section className="pushkara-cards-grid">
            {filteredPadams.map((item) => (
              <div
                key={item.order}
                className={`pushkara-padam-card ${item.isVargottama ? 'is-vargottama' : ''}`}
              >
                <div className="pushkara-padam-card-top">
                  <div className="pushkara-card-title-group">
                    <span className="pushkara-card-nakshatra">
                      <span className="pushkara-num-badge">{item.order}</span>
                      {getLocalized(item.nakshatraName)}
                    </span>
                    <span className="pushkara-card-nakshatra-lord">
                      {currentLang === 'ta'
                        ? `அதிபதி: ${item.nakshatraLord?.nameTa}`
                        : `Lord: ${item.nakshatraLord?.name}`}
                    </span>
                  </div>
                  <span className="pushkara-pada-badge">
                    {currentLang === 'ta' ? item.padaLabelTa : item.padaLabelEn}
                  </span>
                </div>

                <div className="pushkara-card-body">
                  <div className="pushkara-data-line">
                    <span className="pushkara-data-label">
                      {currentLang === 'ta' ? 'ஜென்ம ராசி:' : 'Natal Sign:'}
                    </span>
                    <span className="pushkara-data-value">
                      {currentLang === 'ta' ? item.rasiName?.nameTa : item.rasiName?.name}
                    </span>
                  </div>

                  <div className="pushkara-data-line">
                    <span className="pushkara-data-label">
                      {currentLang === 'ta' ? 'நவாம்ச வீடு:' : 'Navamsa Sign:'}
                    </span>
                    <span className="pushkara-navamsa-highlight">
                      {currentLang === 'ta'
                        ? item.navamsaRasiName?.nameTa
                        : item.navamsaRasiName?.name}
                      {' '}
                      <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>
                        ({currentLang === 'ta' ? item.navamsaLord?.nameTa : item.navamsaLord?.name})
                      </span>
                    </span>
                  </div>

                  <div className="pushkara-data-line">
                    <span className="pushkara-data-label">
                      {currentLang === 'ta' ? 'ராசி பாகை:' : 'Sign Span:'}
                    </span>
                    <span className="pushkara-data-value" style={{ fontFamily: 'monospace' }}>
                      {item.inRasiSpan}
                    </span>
                  </div>

                  <div className="pushkara-data-line">
                    <span className="pushkara-data-label">
                      {currentLang === 'ta' ? '360° சக்கர பாகை:' : '360° Span:'}
                    </span>
                    <span className="pushkara-data-value" style={{ fontFamily: 'monospace' }}>
                      {item.zodiacSpan360}
                    </span>
                  </div>

                  {item.isVargottama && (
                    <div style={{ marginTop: '4px' }}>
                      <span className="pushkara-vargottama-pill">
                        👑 {currentLang === 'ta' ? 'புஷ்கர வர்கோத்தமம்' : 'Pushkara Vargottama'}
                      </span>
                    </div>
                  )}
                </div>

                {item.significance && (
                  <div className="pushkara-card-significance">
                    {getLocalized(item.significance)}
                  </div>
                )}
              </div>
            ))}
            {filteredPadams.length === 0 && (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                {currentLang === 'ta'
                  ? 'பொருத்தமான பாதங்கள் கிடைக்கவில்லை'
                  : 'No matching padas found'}
              </div>
            )}
          </section>
        )}

        {/* 4. USER'S EXPLICIT NOTE BOX (RED CALLOUT MATCHING USER'S IMAGE) */}
        <aside className="pushkara-note-card" aria-label="Non-Pushkara Stars Note">
          <p>
            {getLocalized(noteData, NON_PUSHKARA_NAKSHATRAS_NOTE.ta)}
          </p>
        </aside>

        {/* 6. CLASSICAL ASTROLOGY EXPLANATION / KNOWLEDGE SECTION */}
        <section className="pushkara-knowledge-card">
          <h3>
            <span>📖</span>
            <span>
              {currentLang === 'ta'
                ? 'புஷ்கர நவாம்சம் பற்றிய ஜோதிட ரகசியங்கள் & பலன்கள்'
                : 'Astrological Significance & Principles of Pushkara Navamsa'}
            </span>
          </h3>

          <div className="pushkara-knowledge-grid">
            <div className="pushkara-knowledge-item" style={{ borderLeftColor: '#3b82f6' }}>
              <h4>
                {currentLang === 'ta'
                  ? '1. புஷ்கர நவாம்சம் என்றால் என்ன?'
                  : '1. What is Pushkara Navamsa?'}
              </h4>
              <p>
                {currentLang === 'ta'
                  ? 'ஜோதிட சக்கரத்தின் 108 பாதங்களில், மிகச் சிறந்த சுபத்தன்மையை நல்கும் 24 பாதங்கள் "புஷ்கர நவாம்சம்" என அழைக்கப்படுகின்றன. இந்த பாதங்களில் அமையும் லக்னம் அல்லது கிரகங்கள் தோஷங்கள் நீங்கி உச்சத்திற்கு நிகரான அதீத வலிமையைப் பெறுகின்றன.'
                  : 'Among the 108 padas in the zodiac, exactly 24 padas are designated as "Pushkara Navamsa". Planets or Lagna positioned in these degrees overcome afflicting doshas and deliver results comparable to exaltation.'}
              </p>
            </div>

            <div className="pushkara-knowledge-item" style={{ borderLeftColor: '#10b981' }}>
              <h4>
                {currentLang === 'ta'
                  ? '2. சுப கிரகங்களின் வீடுகளில் மட்டுமே அமைவது ஏன்?'
                  : '2. Why Only in Benefic Signs?'}
              </h4>
              <p>
                {currentLang === 'ta'
                  ? 'அனைத்து 24 புஷ்கர நவாம்ச பாதங்களும் சுப கிரகங்களான சுக்கிரன் (ரிஷபம், துலாம்), குரு (தனுசு, மீனம்), சந்திரன் (கடகம்) மற்றும் புதன் (கன்னி) ஆகிய 6 ராசிகளில் மட்டுமே அமைகின்றன. பாவ கிரகங்களான சனி, செவ்வாய், சூரியன் வீடுகளில் புஷ்கர நவாம்சம் அமைவதில்லை.'
                  : 'All 24 Pushkara Navamsa padas land strictly in signs ruled by natural benefics: Venus (Taurus, Libra), Jupiter (Sagittarius, Pisces), Moon (Cancer), and Mercury (Virgo). None ever fall into signs ruled by Sun, Mars, or Saturn.'}
              </p>
            </div>

            <div className="pushkara-knowledge-item" style={{ borderLeftColor: '#f59e0b' }}>
              <h4>
                {currentLang === 'ta'
                  ? '3. புஷ்கர வர்கோத்தமம் (Pushkara Vargottama)'
                  : '3. Pushkara Vargottama Power'}
              </h4>
              <p>
                {currentLang === 'ta'
                  ? 'ரோகிணி 2-ஆம் பாதம் (ரிஷபம்), புனர்பூசம் 4-ஆம் பாதம் (கடகம்), உத்திராடம் 1-ஆம் பாதம் (தனுசு) ஆகிய மூன்று பாதங்களும் ராசியிலும் நவாம்சத்திலும் ஒரே சுப ராசியில் அமையும் புஷ்கர வர்கோத்தமம் ஆகும். ஸ்ரீராமபிரான் லக்னம் மற்றும் சந்திரன் புனர்பூசம் 4-ஆம் பாதத்தில் அமைந்தது குறிப்பிடத்தக்கது.'
                  : 'Three padas are both Pushkara and Vargottama: Rohini-2 (Taurus), Punarvasu-4 (Cancer), and Uttara Ashadha-1 (Sagittarius). Lord Sri Rama was born with Lagna and Moon in Punarvasu 4th pada, the most exalted blessing.'}
              </p>
            </div>

            <div className="pushkara-knowledge-item" style={{ borderLeftColor: '#8b5cf6' }}>
              <h4>
                {currentLang === 'ta'
                  ? '4. புஷ்கர நவாம்சம் இல்லாத நட்சத்திரங்கள்'
                  : '4. Nakshatras Without Pushkara'}
              </h4>
              <p>
                {currentLang === 'ta'
                  ? 'கேதுவின் அசுவினி, மகம், மூலம்; செவ்வாயின் மிருகசீரிடம், சித்திரை, அவிட்டம்; புதனின் ஆயில்யம், கேட்டை, ரேவதி ஆகிய 9 நட்சத்திரங்களுக்கு புஷ்கர நவாம்ச பாதங்கள் கிடையாது. மீதமுள்ள 18 நட்சத்திரங்களே 24 புஷ்கர பாதங்களைக் கொண்டுள்ளன.'
                  : 'Nakshatras ruled by Ketu (Ashwini, Magha, Mula), Mars (Mrigashirsha, Chitra, Dhanishta), and Mercury (Ashlesha, Jyeshtha, Revati)—total 9 stars—possess no Pushkara Navamsa padas.'}
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

