import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import masterDataService from '../services/masterData.service';
import SEOHead from '../components/common/SEOHead';
import Breadcrumbs from '../components/common/Breadcrumbs';
import { getLocalizedValue, getLocalizedCardTitles, getUIString } from '../utils/localizedContent';

export default function YogasPage() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'en';
  const navigate = useNavigate();

  const [yogas, setYogas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchYogas();
  }, []);

  const fetchYogas = async () => {
    setLoading(true);
    try {
      const data = await masterDataService.getYogas();
      setYogas(data);
    } catch (err) {
      console.error('Failed to load yogas:', err);
    } finally {
      setLoading(false);
    }
  };

  const breadcrumbItems = [
    { label: getUIString('home', currentLang, 'Home'), link: '/' },
    { label: getUIString('yogasTitle', currentLang, '27 Nithya Yogas Directory'), active: true }
  ];

  const filteredYogas = yogas.filter((y) => {
    const q = searchTerm.toLowerCase();
    const nameMatch = (y.name || '').toLowerCase().includes(q) ||
                      (y.nameTa || '').includes(q) ||
                      (y.nameHi || '').includes(q) ||
                      (y.nameTe || '').includes(q) ||
                      (y.nameKn || '').includes(q) ||
                      (y.nameMl || '').includes(q);
    const lordStr = getLocalizedValue(y.athipathi || y.lord, currentLang).toLowerCase();
    const lordMatch = lordStr.includes(q);
    return nameMatch || lordMatch;
  });

  return (
    <>
      {/* Enterprise SEO Meta & Structured Data */}
      <SEOHead
        pageKey="yogas"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Panchangam', path: '/yogas' },
          { name: getUIString('yogasTitle', currentLang), path: '/yogas' }
        ]}
      />

      <Breadcrumbs items={breadcrumbItems} />

      <div className="master-directory-page">
            {/* Header Title Card */}
            <div className="directory-hero-banner">
              <div className="directory-hero-left">
                <span className="directory-hero-icon">🌀</span>
                <div>
                  <h1 className="directory-hero-title">
                    {getUIString('yogasTitle', currentLang, '27 Nithya Yogas Directory')}
                  </h1>
                  <p className="directory-hero-sub">
                    {getUIString('yogasSubtitle', currentLang, 'Complete reference for 27 Nithya Yogas with lords and spiritual properties.')}
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
                  placeholder={getUIString('yogasSearchPlaceholder', currentLang, 'Search by Yoga or Lord name...')}
                  className="directory-search-input"
                />
              </div>
            </div>

            {/* Content Cards Grid */}
            {loading ? (
              <div className="loading-box" style={{ padding: '60px 20px' }}>
                <div className="spinner"></div>
                <p>{getUIString('loading', currentLang, 'Loading Yogas details...')}</p>
              </div>
            ) : (
              <div className="master-cards-grid">
                {filteredYogas.map((yoga, idx) => {
                  const isBenefic = yoga.nature === 'Benefic';
                  const { title, subtitle } = getLocalizedCardTitles(yoga, currentLang);

                  return (
                    <div key={yoga.yogaId !== undefined ? yoga.yogaId : idx} className="master-card yoga-card">
                      <div className="master-card-top-bar">
                        <div className="master-card-glyph-badge">
                          🌀
                        </div>
                        <div className="master-card-header-titles">
                          <h3 className="master-card-title">{title}</h3>
                          {subtitle && <span className="master-card-subtitle">{subtitle}</span>}
                        </div>
                        <span className="master-id-pill">#{yoga.yogaId !== undefined ? Number(yoga.yogaId) + 1 : idx + 1}</span>
                      </div>

                      <div className="master-card-attributes-grid">
                        <div className="attribute-item">
                          <span className="attr-lbl">{getUIString('nature', currentLang, 'Nature')}</span>
                          <span className={`attr-val ${isBenefic ? 'text-green-700 font-bold' : 'text-amber-700'}`}>
                            {getLocalizedValue(yoga, currentLang, yoga.nature || '')}
                          </span>
                        </div>

                        <div className="attribute-item">
                          <span className="attr-lbl">{getUIString('rulingLord', currentLang, 'Lord')}</span>
                          <span className="attr-val highlight-val">{getLocalizedValue(yoga.athipathi || yoga.lord, currentLang)}</span>
                        </div>

                        {yoga.deity && (
                          <div className="attribute-item">
                            <span className="attr-lbl">{getUIString('deity', currentLang, 'Deity')}</span>
                            <span className="attr-val">{getLocalizedValue(yoga.deity, currentLang)}</span>
                          </div>
                        )}
                      </div>

                      {getLocalizedValue(yoga, currentLang, '') && (
                        <p className="master-card-desc">
                          {getLocalizedValue(yoga, currentLang, yoga.meaningEn || '')}
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
