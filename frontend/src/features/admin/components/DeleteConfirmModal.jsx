import React from 'react';
import { useTranslation } from 'react-i18next';

export default function DeleteConfirmModal({
  isOpen,
  tableConfig,
  record = null,
  isDeleting = false,
  onClose,
  onConfirm
}) {
  const { t } = useTranslation(['admin', 'common']);

  if (!isOpen || !record) return null;

  const recordName =
    record.personDetails?.fullName ||
    record.nameTa ||
    record.name ||
    record.degreeDisplay ||
    record._id;

  const tableName = tableConfig.displayName || tableConfig.nameTa || tableConfig.name;

  return (
    <div className="admin-modal-overlay">
      <div className="admin-modal-box confirm-modal">
        <div className="confirm-modal-content">
          <div className="danger-icon-circle">⚠️</div>
          <h3 className="confirm-title">{t('admin:table.confirmDelete', 'Delete Record?')}</h3>
          <p className="confirm-message">
            <strong>'{tableName}'</strong>: <strong>'{recordName}'</strong>
          </p>
          <p className="confirm-sub-warning">
            {t('admin:table.deleteWarning', 'This action cannot be undone.')}
          </p>

          <div className="confirm-actions-row">
            <button
              type="button"
              className="admin-modal-btn cancel-btn"
              onClick={onClose}
              disabled={isDeleting}
            >
              {t('common:buttons.cancel', 'Cancel')}
            </button>

            <button
              type="button"
              className="admin-modal-btn danger-btn"
              onClick={() => onConfirm(record)}
              disabled={isDeleting}
            >
              {isDeleting ? t('common:status.loading', 'Deleting...') : `🗑️ ${t('common:buttons.delete', 'Delete')}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
