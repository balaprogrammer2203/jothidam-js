import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import masterDataService from '../../../services/masterData.service';
import SEOHead from '../../../components/common/SEOHead';
import Breadcrumbs from '../../../components/common/Breadcrumbs';
import { ZODIAC_SYMBOLS } from '../../../config/constants';
import { getLocalizedValue, getLocalizedCardTitles, getUIString, UI_STRINGS } from '../../../utils/localizedContent';
import { ROUTES } from '../../../config/routes.config';

export default function RasisPage() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'en';
  const navigate = useNavigate();

  const [rasis, setRasis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedElement, setSelectedElement] = useState('all');

  useEffect(() => {
    fetchRasis();
  }, []);

  const fetchRasis = async () => {
    setLoading(true);
    try {
      const data = await masterDataService.getRasis();
      setRasis(data);
    } catch (err) {
      console.error('Failed to load rasis:', err);
    } finally {
      setLoading(false);
    }
  };

  const breadcrumbItems = [
    { label: getUIString('home', currentLang, 'Home'), link: '/' },
    { label: getUIString('rasisTitle', currentLang, '12 Zodiac Signs (Rasis)'), active: true }
  ];

  const getElementEn = (r) => {
    if (!r.element) return '';
    if (typeof r.element === 'string') return r.element;
    return r.element.name || r.element.nameEn || '';
  };

  const filteredRasis = rasis.filter((r) => {
    const q = searchTerm.toLowerCase();
    const nameMatch = (r.name || '').toLowerCase().includes(q) ||
                      (r.nameTa || '').includes(q) ||
                      (r.nameHi || '').includes(q) ||
                      (r.nameTe || '').includes(q) ||
                      (r.nameKn || '').includes(q) ||
                      (r.nameMl || '').includes(q);
    const lordName = getLocalizedValue(r.athipathi, currentLang);
    const lordMatch = lordName.toLowerCase().includes(q);
    const elemEn = getElementEn(r).toLowerCase();
    const elementMatch = selectedElement === 'all' || elemEn.includes(selectedElement.toLowerCase());
    return (nameMatch || lordMatch) && elementMatch;
  });

  return (
    <>
      {/* Enterprise SEO Meta & Structured Data */}
      <SEOHead
        pageKey="rasis"
        breadcrumbs={[
          { name: 'Home', path: ROUTES.HOME },
          { name: 'Zodiac & Planets', path: ROUTES.ZODIAC.RASIS },
          { name: getUIString('rasisTitle', currentLang), path: ROUTES.ZODIAC.RASIS }
        ]}
      />

      <Breadcrumbs items={[
        { label: getUIString('home', currentLang, 'Home'), link: ROUTES.HOME },
        { label: getUIString('rasisTitle', currentLang, '12 Zodiac Signs (Rasis)'), active: true }
      ]} />

      <div className="master-directory-page">
            {/* Header Title Card */}
            <div className="directory-hero-banner">
              <div className="directory-hero-left">
                <span className="directory-hero-icon">♈</span>
                <div>
                  <h1 className="directory-hero-title">
                    {getUIString('rasisTitle', currentLang, '12 Zodiac Signs (Rasis) Directory')}
                  </h1>
                  <p className="directory-hero-sub">
                    {getUIString('rasisSubtitle', currentLang, 'Comprehensive astrological specifications of the 12 Vedic signs.')}
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
                  placeholder={getUIString('rasisSearchPlaceholder', currentLang, 'Search by Sign or Lord name...')}
                  className="directory-search-input"
                />
              </div>

              <div className="directory-filter-pills">
                {['all', 'Fire', 'Earth', 'Air', 'Water'].map((elem) => {
                  const label = UI_STRINGS.elements[elem]
                    ? (UI_STRINGS.elements[elem][currentLang] || UI_STRINGS.elements[elem].en)
                    : elem;
                  return (
                    <button
                      key={elem}
                      type="button"
                      className={`filter-pill-btn ${selectedElement === elem ? 'active' : ''}`}
                      onClick={() => setSelectedElement(elem)}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Content Cards Grid */}
            {loading ? (
              <div className="loading-box" style={{ padding: '60px 20px' }}>
                <div className="spinner"></div>
                <p>{getUIString('loading', currentLang, 'Loading Rasi details...')}</p>
              </div>
            ) : (
              <div className="master-cards-grid">
                {filteredRasis.map((rasi, idx) => {
                  const zodiacMeta = ZODIAC_SYMBOLS[rasi.rasiId] || { symbol: '♈', color: '#b45309' };
                  const elemEn = getElementEn(rasi);
                  const elementColor = 
                    elemEn.includes('Fire') ? '#ef4444' :
                    elemEn.includes('Earth') ? '#ca8a04' :
                    elemEn.includes('Air') ? '#0284c7' : '#0d9488';

                  const { title, subtitle } = getLocalizedCardTitles(rasi, currentLang);

                  return (
                    <div key={rasi.rasiId} className="master-card rasi-card">
                      <div className="master-card-top-bar">
                        <div className="master-card-glyph-badge" style={{ color: zodiacMeta.color }}>
                          {zodiacMeta.symbol}
                        </div>
                        <div className="master-card-header-titles">
                          <h3 className="master-card-title">{title}</h3>
                          {subtitle && <span className="master-card-subtitle">{subtitle}</span>}
                        </div>
                        <span className="master-id-pill">#{rasi.rasiId !== undefined ? Number(rasi.rasiId) + 1 : idx + 1}</span>
                      </div>

                      <div className="master-card-attributes-grid">
                        <div className="attribute-item">
                          <span className="attr-lbl">{getUIString('rulingLord', currentLang, 'Ruling Lord')}</span>
                          <span className="attr-val highlight-val">{getLocalizedValue(rasi.athipathi, currentLang)}</span>
                        </div>

                        <div className="attribute-item">
                          <span className="attr-lbl">{getUIString('element', currentLang, 'Element')}</span>
                          <span className="attr-val elem-badge" style={{ borderColor: elementColor, color: elementColor }}>
                            {getLocalizedValue(rasi.element, currentLang)}
                          </span>
                        </div>

                        <div className="attribute-item">
                          <span className="attr-lbl">{getUIString('mobility', currentLang, 'Mobility')}</span>
                          <span className="attr-val">{getLocalizedValue(rasi.mobility, currentLang)}</span>
                        </div>

                        <div className="attribute-item">
                          <span className="attr-lbl">{getUIString('gender', currentLang, 'Gender')}</span>
                          <span className="attr-val">{getLocalizedValue(rasi.gender, currentLang)}</span>
                        </div>

                        <div className="attribute-item">
                          <span className="attr-lbl">{getUIString('direction', currentLang, 'Direction')}</span>
                          <span className="attr-val">{getLocalizedValue(rasi.direction, currentLang)}</span>
                        </div>

                        <div className="attribute-item">
                          <span className="attr-lbl">{getUIString('bodyPart', currentLang, 'Body Part')}</span>
                          <span className="attr-val">{getLocalizedValue(rasi.bodyPart, currentLang)}</span>
                        </div>
                      </div>

                      {getLocalizedValue(rasi, currentLang, '') && (
                        <p className="master-card-desc">
                          {getLocalizedValue(rasi, currentLang, rasi.descriptionEn || '')}
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
