import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Breadcrumbs({ items = [] }) {
  const { t } = useTranslation('common');

  const defaultItems = [
    { label: t('nav.home', 'Home'), link: '/' },
    { label: t('menu.astrology', 'Astrology'), link: '/' },
    { label: t('menu.kundli', 'Birth Chart (ஜாதகக் கணிப்பு)'), active: true }
  ];

  const breadcrumbList = items.length > 0 ? items : defaultItems;

  return (
    <nav className="prokerala-breadcrumbs" aria-label="breadcrumb">
      <ol className="breadcrumbs-list">
        {breadcrumbList.map((item, idx) => {
          const isLast = idx === breadcrumbList.length - 1 || item.active;
          return (
            <li key={idx} className={`breadcrumb-item ${isLast ? 'active' : ''}`}>
              {isLast ? (
                <span className="breadcrumb-current">{item.label}</span>
              ) : (
                <>
                  <Link to={item.link || '/'} className="breadcrumb-link">
                    {item.label}
                  </Link>
                  <span className="breadcrumb-separator">›</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
