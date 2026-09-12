import React from 'react';
import { useTranslation } from 'react-i18next';
import FormRow from '../../../../components/common/FormRow';

export default function NameSection({ value, onChange, error }) {
  const { t } = useTranslation('horoscope');

  const icon = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  );

  return (
    <FormRow label={t('form.name', 'NAME')} icon={icon} badgeColor="orange" error={error}>
      <input
        type="text"
        className="epanchang-text-input full-width"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t('form.namePlaceholder', 'Enter Full Name...')}
        required
      />
    </FormRow>
  );
}
