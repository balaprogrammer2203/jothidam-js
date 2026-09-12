import React from 'react';
import { useTranslation } from 'react-i18next';
import { TABLE_CONFIGS, getTableConfig } from '../config/tableSchemas.config';

export default function AdminDashboard({ stats = {}, onSelectTable, onRefresh }) {
  const { t, i18n } = useTranslation(['admin', 'common']);
  const currentLang = i18n.language || 'ta';
  const totalRecords = Object.values(stats).reduce((acc, curr) => acc + (curr.count || 0), 0);

  return (
    <div className="admin-dashboard-view">
      {/* Top Banner */}
      <div className="admin-dashboard-hero">
        <div className="hero-text-content">
          <h2 className="dashboard-heading">{t('admin:panelTitle', 'Database Administration')}</h2>
          <p className="dashboard-desc">
            {t('admin:permissions.subtitle', 'Manage, create, update, and monitor all database tables and master astrology datasets.')}
          </p>
        </div>

        <div className="hero-stats-badge">
          <div className="total-stat-box">
            <span className="total-stat-num">{totalRecords}</span>
            <span className="total-stat-lbl">{t('admin:totalRecords', 'Total Records')}</span>
          </div>
          <button type="button" onClick={onRefresh} className="admin-hero-refresh-btn" title={t('common:buttons.refresh', 'Refresh metrics')}>
            🔄 {t('common:buttons.refresh', 'Refresh')}
          </button>
        </div>
      </div>

      {/* Grid of Database Collections Cards */}
      <div className="admin-tables-grid">
        {TABLE_CONFIGS.map((rawTable) => {
          const table = getTableConfig(rawTable.key, currentLang);
          const count = stats[table.key]?.count ?? 0;

          return (
            <div
              key={table.key}
              className="admin-table-card"
              onClick={() => onSelectTable(table.key)}
              style={{ borderTopColor: table.color }}
            >
              <div className="table-card-header">
                <div
                  className="table-card-icon"
                  style={{ backgroundColor: `${table.color}15`, color: table.color }}
                >
                  📁
                </div>
                <div className="table-card-badge" style={{ color: table.color, borderColor: `${table.color}40` }}>
                  {table.key}
                </div>
              </div>

              <h3 className="table-card-title">{table.displayName}</h3>
              <p className="table-card-subtitle">{table.name}</p>

              <div className="table-card-footer">
                <div className="table-card-count">
                  <span className="count-number" style={{ color: table.color }}>{count}</span>
                  <span className="count-unit">{t('common:pagination.entries', 'Records')}</span>
                </div>
                <span className="card-arrow-btn">{t('common:buttons.view', 'Manage')} →</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
