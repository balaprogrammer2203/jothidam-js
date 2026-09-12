import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function AdminFooter() {
  const { t } = useTranslation(['admin', 'common']);

  return (
    <footer className="admin-footer">
      <div className="admin-footer-left">
        <span className="admin-footer-engine-status">
          <span className="status-indicator-dot online"></span>
          <span>🕉️ {t('admin:panelTitle', 'Admin Control Panel')} • v2.4</span>
        </span>
        <span className="admin-footer-separator">•</span>
        <span className="admin-footer-copyright">
          © {new Date().getFullYear()} Jothidam Vedic Astrology Portal
        </span>
      </div>
      <div className="admin-footer-right">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="admin-footer-link"
          title={t('common:nav.home', 'Public Site (Opens in new window)')}
        >
          🌐 {t('common:nav.home', 'Public Site')}
        </a>
        <span className="admin-footer-separator">•</span>
        <span className="admin-footer-badge">
          🛡️ RBAC Enterprise Security
        </span>
      </div>
    </footer>
  );
}
