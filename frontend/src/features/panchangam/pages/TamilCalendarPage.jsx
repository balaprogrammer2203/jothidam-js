import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import masterDataService from '../../../services/masterData.service';
import SEOHead from '../../../components/common/SEOHead';
import Breadcrumbs from '../../../components/common/Breadcrumbs';
import { getLocalizedValue, getLocalizedCardTitles, getUIString } from '../../../utils/localizedContent';
import { ROUTES } from '../../../config/routes.config';

export default function TamilCalendarPage() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'en';
  const navigate = useNavigate();

  const [tamilYears, setTamilYears] = useState([]);
  const [tamilMonths, setTamilMonths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('years');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCalendarData();
  }, []);

  const fetchCalendarData = async () => {
    setLoading(true);
    try {
      const [years, months] = await Promise.all([
        masterDataService.getTamilYears(),
        masterDataService.getTamilMonths()
      ]);
      setTamilYears(years);
      setTamilMonths(months);
    } catch (err) {
      console.error('Failed to load calendar data:', err);
    } finally {
      setLoading(false);
    }
  };

  const breadcrumbItems = [
    { label: getUIString('home', currentLang, 'Home'), link: '/' },
    { label: getUIString('calendarTitle', currentLang, 'Tamil Calendar Master Table'), active: true }
  ];

  const filteredYears = tamilYears.filter((y) => {
    const q = searchTerm.toLowerCase();
    return (y.name || '').toLowerCase().includes(q) ||
           (y.nameTa || '').includes(q) ||
           (y.nameHi || '').includes(q) ||
           (y.nameTe || '').includes(q) ||
           (y.nameKn || '').includes(q) ||
           (y.nameMl || '').includes(q);
  });

  const filteredMonths = tamilMonths.filter((m) => {
    const q = searchTerm.toLowerCase();
    return (m.name || '').toLowerCase().includes(q) ||
           (m.nameTa || '').includes(q) ||
           (m.nameHi || '').includes(q) ||
           (m.nameTe || '').includes(q) ||
           (m.nameKn || '').includes(q) ||
           (m.nameMl || '').includes(q);
  });

  return (
    <>
      {/* Enterprise SEO Meta & Structured Data */}
      <SEOHead
        pageKey="tamilCalendar"
        breadcrumbs={[
          { name: 'Home', path: ROUTES.HOME },
          { name: 'Panchangam', path: ROUTES.PANCHANGAM.TAMIL_CALENDAR },
          { name: getUIString('calendarTitle', currentLang), path: ROUTES.PANCHANGAM.TAMIL_CALENDAR }
        ]}
      />

      <Breadcrumbs items={[
        { name: 'Home', path: ROUTES.HOME },
        { name: 'Panchangam', path: ROUTES.PANCHANGAM.TAMIL_CALENDAR },
        { name: getUIString('calendarTitle', currentLang), path: ROUTES.PANCHANGAM.TAMIL_CALENDAR }
      ]} />

      <div className="master-directory-page">
            {/* Header Title Card */}
            <div className="directory-hero-banner">
              <div className="directory-hero-left">
                <span className="directory-hero-icon">📆</span>
                <div>
                  <h1 className="directory-hero-title">
                    {getUIString('calendarTitle', currentLang, 'Vedic Tamil Calendar Directory')}
                  </h1>
                  <p className="directory-hero-sub">
                    {getUIString('calendarSubtitle', currentLang, '60-year Jupiter cycle (Samvatsaras) and 12 Solar Months with corresponding signs.')}
                  </p>
                </div>
              </div>
            </div>

            {/* Tab Controls & Search */}
            <div className="directory-filter-toolbar">
              <div className="chart-style-pill-group">
                <button
                  type="button"
                  className={`chart-style-segmented-btn ${activeTab === 'years' ? 'active' : ''}`}
                  onClick={() => setActiveTab('years')}
                >
                  {getUIString('tabYears', currentLang, '60 Tamil Years')}
                </button>
                <button
                  type="button"
                  className={`chart-style-segmented-btn ${activeTab === 'months' ? 'active' : ''}`}
                  onClick={() => setActiveTab('months')}
                >
                  {getUIString('tabMonths', currentLang, '12 Solar Months')}
                </button>
              </div>

              <div className="directory-search-box">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={getUIString('calendarSearchPlaceholder', currentLang, 'Search by name...')}
                  className="directory-search-input"
                />
              </div>
            </div>

            {/* Content Display */}
            {loading ? (
              <div className="loading-box" style={{ padding: '60px 20px' }}>
                <div className="spinner"></div>
                <p>{getUIString('loading', currentLang, 'Loading Tamil Calendar data...')}</p>
              </div>
            ) : activeTab === 'years' ? (
              <div className="master-cards-grid">
                {filteredYears.map((year, idx) => {
                  const { title, subtitle } = getLocalizedCardTitles(year, currentLang);
                  return (
                    <div key={year.yearId !== undefined ? year.yearId : idx} className="master-card calendar-year-card">
                      <div className="master-card-top-bar">
                        <div className="master-card-glyph-badge">
                          🗓️
                        </div>
                        <div className="master-card-header-titles">
                          <h3 className="master-card-title">{title}</h3>
                          {subtitle && <span className="master-card-subtitle">{subtitle}</span>}
                        </div>
                        <span className="master-id-pill">#{year.yearId !== undefined ? Number(year.yearId) + 1 : idx + 1}</span>
                      </div>

                      {getLocalizedValue(year, currentLang, '') && (
                        <p className="master-card-desc" style={{ marginTop: '8px' }}>
                          {getLocalizedValue(year, currentLang, year.meaningEn || '')}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="master-cards-grid">
                {filteredMonths.map((month, idx) => {
                  const { title, subtitle } = getLocalizedCardTitles(month, currentLang);
                  return (
                    <div key={month.monthId !== undefined ? month.monthId : idx} className="master-card calendar-month-card">
                      <div className="master-card-top-bar">
                        <div className="master-card-glyph-badge">
                          ☀️
                        </div>
                        <div className="master-card-header-titles">
                          <h3 className="master-card-title">{title}</h3>
                          {subtitle && <span className="master-card-subtitle">{subtitle}</span>}
                        </div>
                        <span className="master-id-pill">#{month.monthId !== undefined ? Number(month.monthId) + 1 : idx + 1}</span>
                      </div>

                      <div className="master-card-attributes-grid">
                        <div className="attribute-item">
                          <span className="attr-lbl">{getUIString('sunSign', currentLang, 'Sun Sign')}</span>
                          <span className="attr-val highlight-val">{getLocalizedValue(month, currentLang, month.rasiName)}</span>
                        </div>

                        <div className="attribute-item">
                          <span className="attr-lbl">{getUIString('season', currentLang, 'Vedic Season')}</span>
                          <span className="attr-val">{getLocalizedValue(month, currentLang, month.seasonEn || month.seasonTa)}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
    </>
  );
}
