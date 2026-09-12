import React from 'react';
import { useTranslation } from 'react-i18next';
import { DEFAULT_AUSPICIOUS_TIMINGS, SIDEBAR_I18N } from '../config/sidebarContent.config';

export default function AuspiciousTimingsWidget({ timings = DEFAULT_AUSPICIOUS_TIMINGS }) {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  const getLangString = (obj, fallback = '') => {
    if (!obj) return fallback;
    return obj[currentLang] || obj.en || obj.ta || fallback;
  };

  const getBadgeLabel = (type) => {
    switch (type) {
      case 'auspicious':
        return `🟢 ${getLangString(SIDEBAR_I18N.auspiciousBadge, 'Auspicious')}`;
      case 'inauspicious':
        return `🔴 ${getLangString(SIDEBAR_I18N.inauspiciousBadge, 'Inauspicious')}`;
      case 'moderate':
      default:
        return `🟡 ${getLangString(SIDEBAR_I18N.moderateBadge, 'Moderate')}`;
    }
  };

  return (
    <div className="sidebar-widget-card auspicious-timings-widget">
      <h3 className="sidebar-widget-heading">
        {getLangString(SIDEBAR_I18N.auspiciousTimingsTitle, "Today's Auspicious & Inauspicious Hours")}
      </h3>

      <div className="timings-grid-box">
        {timings.map((item) => (
          <div
            key={item.id}
            className={`timing-row-item ${item.type === 'auspicious' ? 'auspicious-item' : 'inauspicious-item'}`}
          >
            <span className={`timing-badge badge-${item.badgeType}`}>
              {getBadgeLabel(item.type)}
            </span>
            <div className="timing-info">
              <strong className="timing-name">{getLangString(item.name)}</strong>
              <span className="timing-value">{item.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
