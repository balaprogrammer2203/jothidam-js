import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import masterDataService from '../../../services/masterData.service';
import SEOHead from '../../../components/common/SEOHead';
import Breadcrumbs from '../../../components/common/Breadcrumbs';
import { getLocalizedValue, getLocalizedCardTitles, getUIString } from '../../../utils/localizedContent';
import { ROUTES } from '../../../config/routes.config';

export default function KaranasPage() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'en';
  const navigate = useNavigate();

  const [karanas, setKaranas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  useEffect(() => {
    fetchKaranas();
  }, []);

  const fetchKaranas = async () => {
    setLoading(true);
    try {
      const data = await masterDataService.getKaranas();
      setKaranas(data);
    } catch (err) {
      console.error('Failed to load karanas:', err);
    } finally {
      setLoading(false);
    }
  };

  const breadcrumbItems = [
    { label: getUIString('home', currentLang, 'Home'), link: '/' },
    { label: getUIString('karanasTitle', currentLang, '11 Karanas Directory'), active: true }
  ];

  const filteredKaranas = karanas.filter((k) => {
    const q = searchTerm.toLowerCase();
    const nameMatch = (k.name || '').toLowerCase().includes(q) ||
                      (k.nameTa || '').includes(q) ||
                      (k.nameHi || '').includes(q) ||
                      (k.nameTe || '').includes(q) ||
                      (k.nameKn || '').includes(q) ||
                      (k.nameMl || '').includes(q);
    const rulerStr = getLocalizedValue(k.lord || k.ruler, currentLang).toLowerCase();
    const rulerMatch = rulerStr.includes(q);
    const typeStr = (typeof k.type === 'string' ? k.type : k.type?.name || k.typeTa || '').toLowerCase();
    const typeMatch = selectedType === 'all' || typeStr.includes(selectedType.toLowerCase());
    return (nameMatch || rulerMatch) && typeMatch;
  });

  const getTypeFilterLabel = (type) => {
    if (type === 'all') return getUIString('all', currentLang, 'All');
    if (type === 'Chara' || type === 'Movable') {
      const map = { ta: 'சர கரணங்கள் (7 சரம்)', hi: 'चर करण (7)', te: 'చర కరణాలు (7)', kn: 'ಚರ ಕರಣಗಳು (7)', ml: 'ചര കരണങ്ങൾ (7)', en: 'Movable (7 Chara)' };
      return map[currentLang] || 'Movable (7)';
    }
    const map = { ta: 'ஸ்திர கரணங்கள் (4 ஸ்திரம்)', hi: 'स्थिर करण (4)', te: 'స్థిర కరణాలు (4)', kn: 'ಸ್ಥಿರ ಕರಣಗಳು (4)', ml: 'സ്ഥിര കരണങ്ങൾ (4)', en: 'Fixed (4 Sthira)' };
    return map[currentLang] || 'Fixed (4)';
  };

  return (
    <>
      {/* Enterprise SEO Meta & Structured Data */}
      <SEOHead
        pageKey="karanas"
        breadcrumbs={[
          { name: 'Home', path: ROUTES.HOME },
          { name: 'Panchangam', path: ROUTES.PANCHANGAM.KARANAS },
          { name: getUIString('karanasTitle', currentLang), path: ROUTES.PANCHANGAM.KARANAS }
        ]}
      />

      <Breadcrumbs items={[
        { name: 'Home', path: ROUTES.HOME },
        { name: 'Panchangam', path: ROUTES.PANCHANGAM.KARANAS },
        { name: getUIString('karanasTitle', currentLang), path: ROUTES.PANCHANGAM.KARANAS }
      ]} />

      <div className="master-directory-page">
            {/* Header Title Card */}
            <div className="directory-hero-banner">
              <div className="directory-hero-left">
                <span className="directory-hero-icon">⏳</span>
                <div>
                  <h1 className="directory-hero-title">
                    {getUIString('karanasTitle', currentLang, '11 Karanas (Half-Tithis) Directory')}
                  </h1>
                  <p className="directory-hero-sub">
                    {getUIString('karanasSubtitle', currentLang, '7 Chara (movable) and 4 Sthira (fixed) Vedic karanas with lords and deities.')}
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
                  placeholder={getUIString('karanasSearchPlaceholder', currentLang, 'Search by Karana, Deity or Lord name...')}
                  className="directory-search-input"
                />
              </div>

              <div className="directory-filter-pills">
                {['all', 'Chara', 'Sthira'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    className={`filter-pill-btn ${selectedType === type ? 'active' : ''}`}
                    onClick={() => setSelectedType(type)}
                  >
                    {getTypeFilterLabel(type)}
                  </button>
                ))}
              </div>
            </div>

            {/* Content Cards Grid */}
            {loading ? (
              <div className="loading-box" style={{ padding: '60px 20px' }}>
                <div className="spinner"></div>
                <p>{getUIString('loading', currentLang, 'Loading Karanas details...')}</p>
              </div>
            ) : (
              <div className="master-cards-grid">
                {filteredKaranas.map((karana, idx) => {
                  const typeStr = (typeof karana.type === 'string' ? karana.type : karana.type?.name || karana.typeTa || '');
                  const isMovable = typeStr.toLowerCase().includes('movable') || typeStr.toLowerCase().includes('chara') || typeStr.includes('சரம்');
                  const { title, subtitle } = getLocalizedCardTitles(karana, currentLang);

                  return (
                    <div key={karana.karanaId !== undefined ? karana.karanaId : idx} className="master-card karana-card">
                      <div className="master-card-top-bar">
                        <div className="master-card-glyph-badge">
                          ⏳
                        </div>
                        <div className="master-card-header-titles">
                          <h3 className="master-card-title">{title}</h3>
                          {subtitle && <span className="master-card-subtitle">{subtitle}</span>}
                        </div>
                        <span className="master-id-pill">#{karana.karanaId !== undefined ? Number(karana.karanaId) + 1 : idx + 1}</span>
                      </div>

                      <div className="master-card-attributes-grid">
                        <div className="attribute-item">
                          <span className="attr-lbl">{getUIString('type', currentLang, 'Type')}</span>
                          <span className={`attr-val ${isMovable ? 'text-sky-700 font-bold' : 'text-amber-800 font-bold'}`}>
                            {getLocalizedValue(karana, currentLang, karana.type)}
                          </span>
                        </div>

                        <div className="attribute-item">
                          <span className="attr-lbl">{getUIString('rulingLord', currentLang, 'Ruler')}</span>
                          <span className="attr-val highlight-val">{getLocalizedValue(karana.lord || karana.ruler, currentLang)}</span>
                        </div>

                        <div className="attribute-item">
                          <span className="attr-lbl">{getUIString('deity', currentLang, 'Deity')}</span>
                          <span className="attr-val">{getLocalizedValue(karana.deity, currentLang)}</span>
                        </div>

                        {karana.symbol && (
                          <div className="attribute-item">
                            <span className="attr-lbl">{getUIString('symbol', currentLang, 'Symbol')}</span>
                            <span className="attr-val">{getLocalizedValue(karana.symbol, currentLang)}</span>
                          </div>
                        )}
                      </div>

                      {getLocalizedValue(karana, currentLang, '') && (
                        <p className="master-card-desc">
                          {getLocalizedValue(karana, currentLang, karana.descriptionEn || '')}
                        </p>
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
