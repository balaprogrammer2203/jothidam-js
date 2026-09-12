import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

// Helpers to get nested value
function getNestedValue(obj, path) {
  if (!obj || !path) return undefined;
  const parts = path.split('.');
  let curr = obj;
  for (const p of parts) {
    if (curr === undefined || curr === null) return undefined;
    curr = curr[p];
  }
  return curr;
}

// Format date nicely
function formatDate(val) {
  if (!val) return '-';
  try {
    const d = new Date(val);
    if (isNaN(d.getTime())) return String(val);
    return d.toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  } catch (e) {
    return String(val);
  }
}

export default function RecordDetailModal({
  isOpen,
  tableConfig,
  record = null,
  onClose,
  onEdit
}) {
  const { t, i18n } = useTranslation(['admin', 'common']);
  const currentLang = i18n.language || 'en';

  const [viewMode, setViewMode] = useState('structured'); // 'structured' | 'json'
  const [copiedKey, setCopiedKey] = useState(null);
  const [jsonCopied, setJsonCopied] = useState(false);

  if (!isOpen || !record) return null;

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(record, null, 2));
    setJsonCopied(true);
    setTimeout(() => setJsonCopied(false), 2000);
  };

  const handleCopyValue = (val, key) => {
    if (val === undefined || val === null) return;
    const textToCopy = typeof val === 'object' ? JSON.stringify(val) : String(val);
    navigator.clipboard.writeText(textToCopy);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  const tableName = tableConfig.displayName || tableConfig.nameTa || tableConfig.name;
  const primaryId = record._id || record[tableConfig.primaryKey] || 'N/A';

  // Render Multilingual String Object
  const renderMultilingualValue = (obj) => {
    if (!obj || typeof obj !== 'object') return '-';

    // Normalize multilingual key structures: { en, ta, ... } or { name, nameTa, nameHi, ... }
    const langMap = {
      en: obj.en || obj.name || obj.nameEn || '',
      ta: obj.ta || obj.nameTa || '',
      hi: obj.hi || obj.nameHi || '',
      te: obj.te || obj.nameTe || '',
      kn: obj.kn || obj.nameKn || '',
      ml: obj.ml || obj.nameMl || ''
    };

    const mainVal =
      langMap[currentLang] ||
      langMap.ta ||
      langMap.en ||
      Object.values(obj).find((v) => typeof v === 'string' && v) ||
      '-';

    const otherLangs = Object.entries(langMap).filter(
      ([k, v]) => v && (k !== currentLang || !langMap[currentLang])
    );

    return (
      <div className="multilingual-detail-box">
        <span className="multilingual-main-val">{mainVal}</span>
        {otherLangs.length > 0 && (
          <div className="multilingual-subchips">
            {otherLangs.map(([langCode, val]) => (
              <span key={langCode} className="lang-subchip">
                <span className="lang-subchip-tag">{langCode.toUpperCase()}</span>
                <span className="lang-subchip-val">{val}</span>
              </span>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Render individual field value cleanly
  const renderFieldValue = (field, path, rawVal) => {
    if (rawVal === undefined || rawVal === null || rawVal === '') {
      return <span className="detail-empty-val">-</span>;
    }

    // Multilingual object check
    if (typeof rawVal === 'object' && !Array.isArray(rawVal) && !(rawVal instanceof Date)) {
      if (
        rawVal.en !== undefined ||
        rawVal.ta !== undefined ||
        rawVal.name !== undefined ||
        rawVal.nameTa !== undefined ||
        rawVal.nameHi !== undefined ||
        rawVal.nameTe !== undefined ||
        rawVal.nameKn !== undefined ||
        rawVal.nameMl !== undefined
      ) {
        return renderMultilingualValue(rawVal);
      }
    }

    // Role badge
    if (path === 'role' || field?.name === 'role') {
      const roleStr = String(rawVal).toLowerCase();
      return (
        <span className={`role-pill role-${roleStr} detail-role-pill`}>
          {roleStr.toUpperCase()}
        </span>
      );
    }

    // Boolean / Active status
    if (path === 'isActive' || typeof rawVal === 'boolean') {
      return (
        <span className={`detail-status-pill ${rawVal ? 'status-active' : 'status-inactive'}`}>
          {rawVal ? '✅ Active' : '❌ Inactive'}
        </span>
      );
    }

    // Preferred Language
    if (path === 'preferredLanguage') {
      return (
        <span className="detail-lang-pill">
          🌐 {String(rawVal).toUpperCase()}
        </span>
      );
    }

    // Date / Time check
    if (
      path.includes('Date') ||
      path.includes('At') ||
      path === 'lastLogin' ||
      path === 'dob' ||
      rawVal instanceof Date ||
      (typeof rawVal === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(rawVal))
    ) {
      return <span className="detail-date-val">📅 {formatDate(rawVal)}</span>;
    }

    // Degree or coordinates
    if (typeof rawVal === 'number' && (path.includes('Degree') || path.includes('latitude') || path.includes('longitude'))) {
      return <span className="detail-degree-val">{rawVal}°</span>;
    }

    return <span className="detail-text-val">{String(rawVal)}</span>;
  };

  // Extract all distinct fields configured for this table
  const configuredFields = [];
  const addedPaths = new Set();

  // Add from columns
  (tableConfig.columns || []).forEach((col) => {
    if (col.path && !addedPaths.has(col.path)) {
      addedPaths.add(col.path);
      configuredFields.push({
        key: col.key || col.path,
        name: col.path,
        label: col.label || col.labelEn || col.key,
        path: col.path,
        isHighlight: col.isHighlight
      });
    }
  });

  // Add from formFields
  (tableConfig.formFields || []).forEach((ff) => {
    if (ff.name && !addedPaths.has(ff.name)) {
      addedPaths.add(ff.name);
      configuredFields.push({
        key: ff.name,
        name: ff.name,
        label: ff.label || ff.labelEn || ff.name,
        path: ff.name,
        type: ff.type
      });
    }
  });

  // Hero title resolution
  const heroTitle =
    record.fullName ||
    record.nameTa ||
    record.name ||
    record.username ||
    (record.number ? `KP Horary #${record.number}` : null) ||
    record.degreeDisplay ||
    primaryId;

  return (
    <div className="admin-modal-overlay">
      <div className="admin-modal-box large-modal record-detail-modal-box">
        {/* Header */}
        <div className="admin-modal-header" style={{ borderLeftColor: tableConfig.color }}>
          <div className="modal-title-group">
            <h3 className="modal-title">{t('admin:table.viewRecord', 'Record Details')}</h3>
            <span className="modal-subtitle">
              {tableName} • ID: <code className="header-id-code">{primaryId}</code>
            </span>
          </div>

          <div className="modal-header-actions">
            {/* Mode Switcher Tabs */}
            <div className="detail-view-mode-tabs">
              <button
                type="button"
                className={`detail-mode-tab ${viewMode === 'structured' ? 'active' : ''}`}
                onClick={() => setViewMode('structured')}
              >
                📋 {t('common:buttons.details', 'Details View')}
              </button>
              <button
                type="button"
                className={`detail-mode-tab ${viewMode === 'json' ? 'active' : ''}`}
                onClick={() => setViewMode('json')}
              >
                {'{ }'} {t('common:buttons.rawJson', 'Raw JSON')}
              </button>
            </div>

            <button
              type="button"
              className="copy-json-btn"
              onClick={handleCopyJson}
              title="Copy entire JSON to clipboard"
            >
              {jsonCopied ? '✅ Copied' : '📋 Copy JSON'}
            </button>

            <button type="button" className="modal-close-btn" onClick={onClose}>
              &times;
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="admin-modal-body detail-modal-body">
          {viewMode === 'structured' ? (
            <div className="structured-detail-view">
              {/* Record Summary Hero Banner */}
              <div className="detail-hero-banner" style={{ borderLeftColor: tableConfig.color }}>
                <div
                  className="detail-hero-icon"
                  style={{ backgroundColor: `${tableConfig.color}15`, color: tableConfig.color }}
                >
                  {tableConfig.icon === 'Users' ? '👥' : tableConfig.icon === 'Sun' ? '☀️' : tableConfig.icon === 'Moon' ? '🌙' : '📁'}
                </div>

                <div className="detail-hero-info">
                  <h4 className="detail-hero-title">{heroTitle}</h4>
                  <div className="detail-hero-meta">
                    <span className="hero-table-pill" style={{ color: tableConfig.color, borderColor: `${tableConfig.color}40` }}>
                      {tableConfig.key}
                    </span>
                    {record.role && (
                      <span className={`role-pill role-${record.role}`}>
                        {String(record.role).toUpperCase()}
                      </span>
                    )}
                    {record.isActive !== undefined && (
                      <span className={`detail-status-pill ${record.isActive ? 'status-active' : 'status-inactive'}`}>
                        {record.isActive ? '✅ Active' : '❌ Inactive'}
                      </span>
                    )}
                    {record.createdAt && (
                      <span className="hero-timestamp">
                        Created: {formatDate(record.createdAt)}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Fields Grid */}
              <div className="detail-fields-section-title">
                <span>📋 {t('admin:table.recordProperties', 'RECORD PROPERTIES & ATTRIBUTES')}</span>
                <span className="fields-count-badge">{configuredFields.length} Fields</span>
              </div>

              <div className="detail-fields-grid">
                {configuredFields.map((field) => {
                  const rawVal = getNestedValue(record, field.path);
                  const isCopied = copiedKey === field.path;

                  return (
                    <div
                      key={field.path}
                      className={`detail-field-card ${field.isHighlight ? 'is-highlight-card' : ''}`}
                      onClick={() => handleCopyValue(rawVal, field.path)}
                      title="Click to copy value"
                    >
                      <div className="detail-field-header">
                        <span className="detail-field-label">{field.label}</span>
                        <span className="detail-field-path-key">{field.path}</span>
                      </div>

                      <div className="detail-field-value-row">
                        <div className="detail-field-value-content">
                          {renderFieldValue(field, field.path, rawVal)}
                        </div>

                        <button
                          type="button"
                          className="field-quick-copy-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopyValue(rawVal, field.path);
                          }}
                          title="Copy field value"
                        >
                          {isCopied ? '✓ Copied' : '📋'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* System Metadata Section */}
              <div className="detail-metadata-card">
                <div className="metadata-card-header">
                  <span>⚙️ System Audit & Identifiers</span>
                </div>
                <div className="metadata-grid">
                  <div className="meta-item">
                    <span className="meta-lbl">Document ID (_id):</span>
                    <span className="meta-val font-mono">{record._id || 'N/A'}</span>
                  </div>
                  {record.createdAt && (
                    <div className="meta-item">
                      <span className="meta-lbl">Created Timestamp:</span>
                      <span className="meta-val">{formatDate(record.createdAt)}</span>
                    </div>
                  )}
                  {record.updatedAt && (
                    <div className="meta-item">
                      <span className="meta-lbl">Last Modified:</span>
                      <span className="meta-val">{formatDate(record.updatedAt)}</span>
                    </div>
                  )}
                  {record.__v !== undefined && (
                    <div className="meta-item">
                      <span className="meta-lbl">Schema Version (__v):</span>
                      <span className="meta-val">{record.__v}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* JSON View */
            <div className="record-details-viewer">
              <div className="json-tree-container">
                <pre className="json-code-block">
                  {JSON.stringify(record, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="admin-modal-footer">
          <button
            type="button"
            className="admin-modal-btn cancel-btn"
            onClick={onClose}
          >
            {t('common:buttons.close', 'Close')}
          </button>

          {onEdit && (
            <button
              type="button"
              className="admin-modal-btn edit-action-btn"
              onClick={() => {
                onClose();
                onEdit(record);
              }}
            >
              ✏️ {t('admin:table.editRecord', 'Edit Record')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
