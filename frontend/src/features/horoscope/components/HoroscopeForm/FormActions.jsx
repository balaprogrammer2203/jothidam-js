import React from 'react';
import { useTranslation } from 'react-i18next';

export default function FormActions({
  chartType, setChartType,
  loading, saving,
  onSave
}) {
  const { t } = useTranslation(['horoscope', 'common']);

  return (
    <div className="epanchang-bottom-row">
      <div className="chart-type-options">
        <button
          type="button"
          className={`chart-pill-btn ${chartType === 'south' ? 'active' : ''}`}
          onClick={() => setChartType('south')}
        >
          <span className="radio-dot">
            {chartType === 'south' && <span className="radio-dot-inner" />}
          </span>
          {t('horoscope:form.southIndian', 'South Indian Chart')}
        </button>

        <button
          type="button"
          className={`chart-pill-btn ${chartType === 'north' ? 'active' : ''}`}
          onClick={() => setChartType('north')}
        >
          <span className="radio-dot">
            {chartType === 'north' && <span className="radio-dot-inner" />}
          </span>
          {t('horoscope:form.northIndian', 'North Indian Chart')}
        </button>
      </div>

      <div className="form-actions-group">
        <button type="submit" disabled={loading} className="epanchang-submit-btn">
          {loading ? t('common:buttons.calculating', 'Calculating...') : t('common:buttons.calculate', 'Calculate Horoscope')}
        </button>

        <button
          type="button"
          disabled={saving || loading}
          onClick={onSave}
          className="epanchang-save-btn"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
            <polyline points="17 21 17 13 7 13 7 21"></polyline>
            <polyline points="7 3 7 8 15 8"></polyline>
          </svg>
          {saving ? t('common:buttons.saving', 'Saving...') : t('common:buttons.save', 'Save Horoscope')}
        </button>
      </div>
    </div>
  );
}
