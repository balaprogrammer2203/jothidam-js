import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FEATURED_ARTICLES, SIDEBAR_I18N } from '../config/sidebarContent.config';

export default function FeaturedArticlesWidget({ articles = FEATURED_ARTICLES }) {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'en';
  const navigate = useNavigate();

  const getLangString = (obj, fallback = '') => {
    if (!obj) return fallback;
    return obj[currentLang] || obj.en || obj.ta || fallback;
  };

  const handleCardClick = (route) => {
    if (route) {
      navigate(route);
    }
  };

  return (
    <div className="sidebar-widget-card more-astrology-widget">
      <h3 className="sidebar-widget-heading">
        {getLangString(SIDEBAR_I18N.moreFromAstrologyTitle, 'More from Astrology')}
      </h3>

      <div className="article-cards-list">
        {articles.map((item) => (
          <div
            key={item.id}
            className="astrology-article-card"
            onClick={() => handleCardClick(item.route)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleCardClick(item.route)}
            title={getLangString(item.title)}
          >
            <div className={`article-thumb ${item.themeClass || ''}`}>
              <span className="thumb-symbol">{item.symbol}</span>
              <span className="thumb-tag">{item.badge}</span>
            </div>
            <div className="article-content">
              <h4 className="article-title">{getLangString(item.title)}</h4>
              <span className="article-cat">{getLangString(item.category)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
