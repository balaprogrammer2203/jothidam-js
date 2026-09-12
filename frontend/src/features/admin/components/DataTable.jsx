import React from 'react';
import { useTranslation } from 'react-i18next';

// Helper to access nested properties like 'personDetails.fullName'
function getNestedValue(obj, path) {
  if (!obj || !path) return '-';
  const parts = path.split('.');
  let curr = obj;
  for (const part of parts) {
    if (curr === undefined || curr === null) return '-';
    curr = curr[part];
  }
  return curr !== undefined && curr !== null ? curr : '-';
}

export default function DataTable({
  tableConfig,
  records = [],
  loading = false,
  totalRecords = 0,
  page = 1,
  totalPages = 1,
  limit = 15,
  searchTerm = '',
  sortBy = '',
  sortOrder = 'asc',
  userPermissions = null,
  isSuperAdmin = false,
  onSearchChange,
  onPageChange,
  onLimitChange,
  onSortChange,
  onRefresh,
  onCreate,
  onView,
  onEdit,
  onDelete
}) {
  const { t } = useTranslation(['admin', 'common']);
  const canCreate = isSuperAdmin || !userPermissions || userPermissions.tablePermissions?.[tableConfig.key]?.create !== false;
  const canUpdate = isSuperAdmin || !userPermissions || userPermissions.tablePermissions?.[tableConfig.key]?.update !== false;
  const canDelete = isSuperAdmin || !userPermissions || userPermissions.tablePermissions?.[tableConfig.key]?.delete !== false;

  return (
    <div className="admin-data-table-container">
      {/* 1. Header & Actions Toolbar */}
      <div className="table-toolbar">
        <div className="toolbar-left">
          <div className="table-title-group">
            <h2 className="admin-table-title">{tableConfig.displayName || tableConfig.nameTa || tableConfig.name}</h2>
            <span className="admin-table-badge" style={{ backgroundColor: `${tableConfig.color}15`, color: tableConfig.color }}>
              {tableConfig.key} ({totalRecords} {t('common:pagination.entries', 'records')})
            </span>
          </div>
        </div>

        <div className="toolbar-right">
          {/* Search Input */}
          <div className="admin-search-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={t('admin:table.search', 'Search records...')}
              className="admin-search-input"
            />
            {searchTerm && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={() => onSearchChange('')}
                title={t('common:buttons.clear', 'Clear search')}
              >
                &times;
              </button>
            )}
          </div>

          {/* Rows Per Page */}
          <select
            className="admin-limit-select"
            value={limit}
            onChange={(e) => onLimitChange(Number(e.target.value))}
          >
            <option value={10}>10 / {t('common:pagination.page', 'page')}</option>
            <option value={15}>15 / {t('common:pagination.page', 'page')}</option>
            <option value={25}>25 / {t('common:pagination.page', 'page')}</option>
            <option value={50}>50 / {t('common:pagination.page', 'page')}</option>
          </select>

          {/* Refresh Button */}
          <button
            type="button"
            className="admin-btn secondary-btn"
            onClick={onRefresh}
            disabled={loading}
            title={t('common:buttons.refresh', 'Refresh Table')}
          >
            🔄
          </button>

          {/* Create Button (Visible only if permitted) */}
          {canCreate && (
            <button
              type="button"
              className="admin-btn primary-btn"
              onClick={onCreate}
            >
              <span className="btn-icon">➕</span>
              {t('admin:table.addRecord', 'Add New Record')}
            </button>
          )}
        </div>
      </div>

      {/* 2. Responsive Table View */}
      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th className="col-index">#</th>
              {tableConfig.columns.map((col) => {
                const isSorted = sortBy === col.key;
                return (
                  <th
                    key={col.key}
                    onClick={() => onSortChange(col.key)}
                    className={`sortable-th ${isSorted ? 'sorted' : ''}`}
                  >
                    <div className="th-content">
                      <span>{col.label}</span>
                      <span className="sort-arrow">
                        {isSorted ? (sortOrder === 'asc' ? '▲' : '▼') : '⇅'}
                      </span>
                    </div>
                  </th>
                );
              })}
              <th className="col-actions">{t('common:buttons.actions', 'Actions')}</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={tableConfig.columns.length + 2} className="table-state-cell">
                  <div className="spinner"></div>
                  <span>{t('common:status.loading', 'Loading data...')}</span>
                </td>
              </tr>
            ) : records.length === 0 ? (
              <tr>
                <td colSpan={tableConfig.columns.length + 2} className="table-state-cell">
                  <span>{t('common:status.noData', 'No records found.')}</span>
                </td>
              </tr>
            ) : (
              records.map((row, idx) => {
                const rowNum = (page - 1) * limit + idx + 1;
                return (
                  <tr key={row._id || row[tableConfig.primaryKey] || idx}>
                    <td className="cell-index">{rowNum}</td>
                    {tableConfig.columns.map((col) => {
                      const rawVal = getNestedValue(row, col.path);
                      const displayVal = col.format ? col.format(rawVal, row) : rawVal;
                      return (
                        <td
                          key={col.key}
                          className={`cell-data ${col.isHighlight ? 'cell-highlight' : ''}`}
                        >
                          {displayVal}
                        </td>
                      );
                    })}

                    {/* Row Actions */}
                    <td className="cell-actions">
                      <div className="action-buttons-group">
                        <button
                          type="button"
                          className="row-action-btn view-action"
                          onClick={() => onView(row)}
                          title={t('common:buttons.view', 'View Record')}
                        >
                          👁️
                        </button>
                        {canUpdate && (
                          <button
                            type="button"
                            className="row-action-btn edit-action"
                            onClick={() => onEdit(row)}
                            title={t('common:buttons.edit', 'Edit Record')}
                          >
                            ✏️
                          </button>
                        )}
                        {canDelete && (
                          <button
                            type="button"
                            className="row-action-btn delete-action"
                            onClick={() => onDelete(row)}
                            title={t('common:buttons.delete', 'Delete Record')}
                          >
                            🗑️
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* 3. Pagination Controls */}
      <div className="table-pagination-bar">
        <div className="pagination-info">
          {t('common:pagination.showing', 'Showing')} {records.length > 0 ? (page - 1) * limit + 1 : 0} -{' '}
          {Math.min(page * limit, totalRecords)} {t('common:pagination.of', 'of')} {totalRecords} {t('common:pagination.entries', 'entries')}
        </div>

        <div className="pagination-controls">
          <button
            type="button"
            className="page-nav-btn"
            disabled={page <= 1 || loading}
            onClick={() => onPageChange(page - 1)}
          >
            ← {t('common:pagination.prev', 'Previous')}
          </button>

          <span className="page-current-indicator">
            {t('common:pagination.page', 'Page')} {page} / {totalPages}
          </span>

          <button
            type="button"
            className="page-nav-btn"
            disabled={page >= totalPages || loading}
            onClick={() => onPageChange(page + 1)}
          >
            {t('common:pagination.next', 'Next')} →
          </button>
        </div>
      </div>
    </div>
  );
}
