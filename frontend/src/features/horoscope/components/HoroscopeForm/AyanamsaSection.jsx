import React from 'react';
import { useTranslation } from 'react-i18next';
import FormRow from '../../../../components/common/FormRow';
import { AYANAMSA_OPTIONS } from '../../../../config/ayanamsa.config';

export default function AyanamsaSection({ value, onChange }) {
  const { t, i18n } = useTranslation('horoscope');
  const currentLang = i18n.language || 'ta';

  const icon = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
    </svg>
  );

  return (
    <FormRow label={t('form.ayanamsa', 'AYANAMSA')} icon={icon} badgeColor="blue">
      <select
        className="epanchang-select full-width"
        value={value || DEFAULT_AYANAMSA}
        onChange={(e) => onChange(e.target.value)}
      >
        {AYANAMSA_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {currentLang === 'ta' ? (opt.nameTa || opt.label) : opt.label}
          </option>
        ))}
      </select>
    </FormRow>
  );
}
