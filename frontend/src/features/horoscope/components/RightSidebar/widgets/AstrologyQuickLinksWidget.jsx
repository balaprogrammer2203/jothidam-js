import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ASTROLOGY_QUICK_LINKS, SIDEBAR_I18N } from '../config/sidebarContent.config';

export default function AstrologyQuickLinksWidget({ links = ASTROLOGY_QUICK_LINKS }) {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'en';
  const location = useLocation();

  const getLangString = (obj, fallback = '') => {
    if (!obj) return fallback;
    return obj[currentLang] || obj.en || obj.ta || fallback;
  };

  return (
    <div className="sidebar-widget-card astrology-links-widget">
      <h3 className="sidebar-widget-heading">
        {getLangString(SIDEBAR_I18N.astrologyLinksTitle, 'Astrology Links')}
      </h3>

      <ul className="astrology-links-list">
        {links.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <li key={link.id}>
              <Link
                to={link.path}
                className={`sidebar-nav-link ${isActive ? 'is-current-page' : ''}`}
                title={getLangString(link.title)}
              >
                <span className="link-arrow-circle">➔</span>
                <span className="link-title-text">
                  {getLangString(link.title)}
                </span>
                {link.badge && (
                  <span className="link-badge-pill">{link.badge}</span>
                )}
                <span className="link-chevron">›</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
