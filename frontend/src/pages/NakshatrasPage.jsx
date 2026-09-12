import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import masterDataService from '../services/masterData.service';
import SEOHead from '../components/common/SEOHead';
import Breadcrumbs from '../components/common/Breadcrumbs';
import { getLocalizedValue, getLocalizedCardTitles, getUIString } from '../utils/localizedContent';

export default function NakshatrasPage() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'en';
  const navigate = useNavigate();

  const [nakshatras, setNakshatras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGana, setSelectedGana] = useState('all');

  useEffect(() => {
    fetchNakshatras();
  }, []);

  const fetchNakshatras = async () => {
    setLoading(true);
    try {
      const data = await masterDataService.getNakshatras();
      setNakshatras(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to load nakshatras:', err);
    } finally {
      setLoading(false);
    }
  };

  const breadcrumbItems = [
    { label: getUIString('home', currentLang, 'Home'), link: '/' },
    { label: getUIString('nakshatrasTitle', currentLang, '27 Nakshatras Directory'), active: true }
  ];

  const getGanaEn = (nak) => {
    if (!nak.gana) return '';
    if (typeof nak.gana === 'string') return nak.gana;
    return nak.gana.name || nak.gana.nameEn || '';
  };

  const filteredNakshatras = nakshatras.filter((n) => {
    const q = searchTerm.toLowerCase();
    const nameMatch = (n.name || '').toLowerCase().includes(q) ||
                      (n.nameTa || '').includes(q) ||
                      (n.nameHi || '').includes(q) ||
                      (n.nameTe || '').includes(q) ||
                      (n.nameKn || '').includes(q) ||
                      (n.nameMl || '').includes(q);
    const lordName = getLocalizedValue(n.athipathi, currentLang).toLowerCase();
    const lordMatch = lordName.includes(q);
    const deityStr = getLocalizedValue(n.deity, currentLang).toLowerCase();
    const deityMatch = deityStr.includes(q);
    const ganaEn = getGanaEn(n).toLowerCase();
    const ganaMatch = selectedGana === 'all' || ganaEn.includes(selectedGana.toLowerCase());
    return (nameMatch || lordMatch || deityMatch) && ganaMatch;
  });

  const getGanaFilterLabel = (g) => {
    if (g === 'all') return getUIString('all', currentLang, 'All');
    if (g === 'Deva') {
      const map = { ta: 'தேவ கணம்', hi: 'देव गण', te: 'దేవ గణము', kn: 'ದೇವ ಗಣ', ml: 'ദേവ ഗണം', en: 'Deva' };
      return map[currentLang] || 'Deva';
    }
    if (g === 'Manushya') {
      const map = { ta: 'மனித கணம்', hi: 'मनुष्य गण', te: 'మనుష్య గణము', kn: 'ಮನುಷ್ಯ ಗಣ', ml: 'മനുഷ്യ ഗണം', en: 'Manushya' };
      return map[currentLang] || 'Manushya';
    }
    const map = { ta: 'ராட்சச கணம்', hi: 'राक्षस गण', te: 'రాక్షస గణము', kn: 'ರಾಕ್ಷಸ ಗಣ', ml: 'രാക്ഷസ ഗണം', en: 'Rakshasa' };
    return map[currentLang] || 'Rakshasa';
  };

  return (
    <>
      {/* Enterprise SEO Meta & Structured Data */}
      <SEOHead
        pageKey="nakshatras"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Zodiac & Planets', path: '/nakshatras' },
          { name: getUIString('nakshatrasTitle', currentLang), path: '/nakshatras' }
        ]}
      />

      <Breadcrumbs items={breadcrumbItems} />

      <div className="master-directory-page">
            {/* Header Title Card */}
            <div className="directory-hero-banner">
              <div className="directory-hero-left">
                <span className="directory-hero-icon">✨</span>
                <div>
                  <h1 className="directory-hero-title">
                    {getUIString('nakshatrasTitle', currentLang, '27 Nakshatras (Lunar Mansions) Directory')}
                  </h1>
                  <p className="directory-hero-sub">
                    {getUIString('nakshatrasSubtitle', currentLang, 'Astrological directory of 27 lunar stars with deities, lords, ganas, and trees.')}
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
                  placeholder={getUIString('nakshatrasSearchPlaceholder', currentLang, 'Search by Star, Deity or Lord name...')}
                  className="directory-search-input"
                />
              </div>

              <div className="directory-filter-pills">
                {['all', 'Deva', 'Manushya', 'Rakshasa'].map((g) => (
                  <button
                    key={g}
                    type="button"
                    className={`filter-pill-btn ${selectedGana === g ? 'active' : ''}`}
                    onClick={() => setSelectedGana(g)}
                  >
                    {getGanaFilterLabel(g)}
                  </button>
                ))}
              </div>
            </div>

            {/* Content Cards Grid */}
            {loading ? (
              <div className="loading-box" style={{ padding: '60px 20px' }}>
                <div className="spinner"></div>
                <p>{getUIString('loading', currentLang, 'Loading Nakshatras details...')}</p>
              </div>
            ) : (
              <div className="master-cards-grid">
                {filteredNakshatras.map((nak, idx) => {
                  const displayIndex = nak.order !== undefined ? nak.order : (nak.nakshatraId !== undefined ? Number(nak.nakshatraId) + 1 : idx + 1);
                  const { title, subtitle } = getLocalizedCardTitles(nak, currentLang);

                  return (
                    <div key={nak.nakshatraId !== undefined ? nak.nakshatraId : idx} className="master-card nakshatra-card">
                      <div className="master-card-top-bar">
                        <div className="master-card-star-badge">
                          ⭐
                        </div>
                        <div className="master-card-header-titles">
                          <h3 className="master-card-title">{title}</h3>
                          {subtitle && <span className="master-card-subtitle">{subtitle}</span>}
                        </div>
                        <span className="master-id-pill">#{displayIndex}</span>
                      </div>

                      <div className="master-card-attributes-grid">
                        <div className="attribute-item">
                          <span className="attr-lbl">{getUIString('rulingLord', currentLang, 'Ruling Lord')}</span>
                          <span className="attr-val highlight-val">{getLocalizedValue(nak.athipathi, currentLang)}</span>
                        </div>

                        <div className="attribute-item">
                          <span className="attr-lbl">{getUIString('deity', currentLang, 'Deity')}</span>
                          <span className="attr-val">{getLocalizedValue(nak.deity, currentLang)}</span>
                        </div>

                        <div className="attribute-item">
                          <span className="attr-lbl">{getUIString('gana', currentLang, 'Gana')}</span>
                          <span className="attr-val gana-badge">{getLocalizedValue(nak.gana, currentLang)}</span>
                        </div>

                        <div className="attribute-item">
                          <span className="attr-lbl">{getUIString('yoni', currentLang, 'Yoni Animal')}</span>
                          <span className="attr-val">{getLocalizedValue(nak.animal || nak.yoni, currentLang)}</span>
                        </div>

                        <div className="attribute-item">
                          <span className="attr-lbl">{getUIString('tree', currentLang, 'Sacred Tree')}</span>
                          <span className="attr-val">{getLocalizedValue(nak.tree, currentLang)}</span>
                        </div>

                        <div className="attribute-item">
                          <span className="attr-lbl">{getUIString('bird', currentLang, 'Sacred Bird')}</span>
                          <span className="attr-val">{getLocalizedValue(nak.bird, currentLang)}</span>
                        </div>
                      </div>

                      {/* Rasi Spans / Padas */}
                      {Array.isArray(nak.rasis) && nak.rasis.length > 0 ? (
                        <div className="padas-strip-container">
                          <span className="padas-strip-title">{getUIString('padasAndRasis', currentLang, 'Padas & Zodiac Signs')}:</span>
                          <div className="padas-chips-row">
                            {nak.rasis.map((span, sIdx) => (
                              <span key={sIdx} className="pada-chip">
                                <strong>{getLocalizedValue(span, currentLang, span.rasiName)}:</strong> Padas {Array.isArray(span.padas) ? span.padas.join(', ') : span.padas}
                              </span>
                            ))}
                          </div>
                        </div>
                      ) : Array.isArray(nak.rasiSpans) && nak.rasiSpans.length > 0 ? (
                        <div className="padas-strip-container">
                          <span className="padas-strip-title">{getUIString('padasAndRasis', currentLang, 'Padas & Zodiac Signs')}:</span>
                          <div className="padas-chips-row">
                            {nak.rasiSpans.map((span, sIdx) => (
                              <span key={sIdx} className="pada-chip">
                                <strong>{getLocalizedValue(span, currentLang, span.rasiName)}:</strong> Padas {Array.isArray(span.padas) ? span.padas.join(', ') : span.padas}
                              </span>
                            ))}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
    </>
  );
}
