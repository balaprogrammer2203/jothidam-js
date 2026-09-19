import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import masterDataService from '../../../services/masterData.service';
import SEOHead from '../../../components/common/SEOHead';
import Breadcrumbs from '../../../components/common/Breadcrumbs';
import { getLocalizedValue, getLocalizedCardTitles, getUIString, UI_STRINGS } from '../../../utils/localizedContent';
import { ROUTES } from '../../../config/routes.config';

export default function TithisPage() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'en';
  const navigate = useNavigate();

  const [tithis, setTithis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPaksha, setSelectedPaksha] = useState('all');

  useEffect(() => {
    fetchTithis();
  }, []);

  const fetchTithis = async () => {
    setLoading(true);
    try {
      const data = await masterDataService.getTithis();
      setTithis(data);
    } catch (err) {
      console.error('Failed to load tithis:', err);
    } finally {
      setLoading(false);
    }
  };

  const breadcrumbItems = [
    { label: getUIString('home', currentLang, 'Home'), link: '/' },
    { label: getUIString('tithisTitle', currentLang, '30 Lunar Tithis Directory'), active: true }
  ];

  const filteredTithis = tithis.filter((item) => {
    const q = searchTerm.toLowerCase();
    const nameMatch = (item.name || '').toLowerCase().includes(q) ||
                      (item.nameTa || '').includes(q) ||
                      (item.nameHi || '').includes(q) ||
                      (item.nameTe || '').includes(q) ||
                      (item.nameKn || '').includes(q) ||
                      (item.nameMl || '').includes(q);
    const deityStr = getLocalizedValue(item.deity, currentLang).toLowerCase();
    const deityMatch = deityStr.includes(q);
    const pakshaStr = (typeof item.paksha === 'string' ? item.paksha : item.paksha?.name || item.pakshaTa || '').toLowerCase();
    const pakshaMatch = selectedPaksha === 'all' || pakshaStr.includes(selectedPaksha.toLowerCase());
    return (nameMatch || deityMatch) && pakshaMatch;
  });

  return (
    <>
      {/* Enterprise SEO Meta & Structured Data */}
      <SEOHead
        pageKey="tithis"
        breadcrumbs={[
          { name: 'Home', path: ROUTES.HOME },
          { name: 'Panchangam', path: ROUTES.PANCHANGAM.TITHIS },
          { name: getUIString('tithisTitle', currentLang), path: ROUTES.PANCHANGAM.TITHIS }
        ]}
      />

      <Breadcrumbs items={[
        { name: 'Home', path: ROUTES.HOME },
        { name: 'Panchangam', path: ROUTES.PANCHANGAM.TITHIS },
        { name: getUIString('tithisTitle', currentLang), path: ROUTES.PANCHANGAM.TITHIS }
      ]} />

      <div className="master-directory-page">
            {/* Header Title Card */}
            <div className="directory-hero-banner">
              <div className="directory-hero-left">
                <span className="directory-hero-icon">🌕</span>
                <div>
                  <h1 className="directory-hero-title">
                    {getUIString('tithisTitle', currentLang, '30 Vedic Lunar Tithis Directory')}
                  </h1>
                  <p className="directory-hero-sub">
                    {getUIString('tithisSubtitle', currentLang, 'Comprehensive lunar day calendar covering Shukla & Krishna pakshas, deities, and categories.')}
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
                  placeholder={getUIString('tithisSearchPlaceholder', currentLang, 'Search by Tithi or Deity name...')}
                  className="directory-search-input"
                />
              </div>

              <div className="directory-filter-pills">
                {['all', 'Shukla', 'Krishna'].map((p) => {
                  const label = UI_STRINGS.pakshas[p]
                    ? (UI_STRINGS.pakshas[p][currentLang] || UI_STRINGS.pakshas[p].en)
                    : p;
                  return (
                    <button
                      key={p}
                      type="button"
                      className={`filter-pill-btn ${selectedPaksha === p ? 'active' : ''}`}
                      onClick={() => setSelectedPaksha(p)}
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
                <p>{getUIString('loading', currentLang, 'Loading Tithis details...')}</p>
              </div>
            ) : (
              <div className="master-cards-grid">
                {filteredTithis.map((tithi, idx) => {
                  const pakshaStr = (typeof tithi.paksha === 'string' ? tithi.paksha : tithi.paksha?.name || tithi.pakshaTa || '');
                  const isShukla = pakshaStr.toLowerCase().includes('shukla') || pakshaStr.includes('சுக்ல');
                  const { title, subtitle } = getLocalizedCardTitles(tithi, currentLang);

                  return (
                    <div key={tithi.tithiId !== undefined ? tithi.tithiId : idx} className="master-card tithi-card">
                      <div className="master-card-top-bar">
                        <div className="master-card-glyph-badge">
                          {isShukla ? '🌔' : '🌘'}
                        </div>
                        <div className="master-card-header-titles">
                          <h3 className="master-card-title">{title}</h3>
                          {subtitle && <span className="master-card-subtitle">{subtitle}</span>}
                        </div>
                        <span className="master-id-pill">#{tithi.tithiId !== undefined ? Number(tithi.tithiId) + 1 : idx + 1}</span>
                      </div>

                      <div className="master-card-attributes-grid">
                        <div className="attribute-item">
                          <span className="attr-lbl">{getUIString('paksha', currentLang, 'Paksha')}</span>
                          <span className={`attr-val paksha-badge ${isShukla ? 'badge-shukla' : 'badge-krishna'}`}>
                            {getLocalizedValue(tithi, currentLang, tithi.paksha)}
                          </span>
                        </div>

                        <div className="attribute-item">
                          <span className="attr-lbl">{getUIString('rulingLord', currentLang, 'Ruling Lord')}</span>
                          <span className="attr-val highlight-val">{getLocalizedValue(tithi.lord, currentLang)}</span>
                        </div>

                        <div className="attribute-item">
                          <span className="attr-lbl">{getUIString('deity', currentLang, 'Deity')}</span>
                          <span className="attr-val">{getLocalizedValue(tithi.deity, currentLang)}</span>
                        </div>

                        <div className="attribute-item">
                          <span className="attr-lbl">{getUIString('type', currentLang, 'Category')}</span>
                          <span className="attr-val">{getLocalizedValue(tithi.category, currentLang)}</span>
                        </div>
                      </div>

                      {(tithi.auspiciousFor || tithi.auspiciousForTa || tithi.descriptionTa) && (
                        <div className="tithi-auspicious-box">
                          <span className="auspicious-title">
                            {getUIString('auspiciousFor', currentLang, 'Auspicious For:')}
                          </span>
                          <p className="auspicious-text">
                            {getLocalizedValue(tithi, currentLang, tithi.auspiciousFor || tithi.descriptionTa || '')}
                          </p>
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
