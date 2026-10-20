import React from 'react';
import { useTranslation } from 'react-i18next';
import FormRow from '../../../../components/common/FormRow';
import { GENDERS } from '../../../../config/constants';

const GENDER_SELECT_TEXT = {
  ta: '-- பாலினம் தேர்வு செய்க --',
  en: '-- Select Gender --',
  hi: '-- लिंग चुनें --',
  te: '-- లింగం ఎంచుకోండి --',
  kn: '-- ಲಿಂಗವನ್ನು ಆಯ್ಕೆಮಾಡಿ --',
  ml: '-- ലിംഗം തിരഞ്ഞെടുക്കുക --'
};

export default function GenderSection({ value, onChange, error }) {
  const { t, i18n } = useTranslation('horoscope');
  const currentLang = i18n.language || 'ta';
  const defaultPlaceholder = GENDER_SELECT_TEXT[currentLang] || GENDER_SELECT_TEXT.ta;

  // Robust case-insensitive and multilingual gender matching for the select value
  const selectedGender = React.useMemo(() => {
    if (!value) return '';
    const raw = String(value).trim().toLowerCase();
    const matched = GENDERS.find((g) => g.value.toLowerCase() === raw);
    if (matched) return matched.value;
    if (raw.includes('fem') || raw.includes('பெண்')) return 'Female';
    if (raw.includes('oth') || raw.includes('மற்றவை')) return 'Other';
    if (raw.includes('mal') || raw.includes('ஆண்')) return 'Male';
    return value;
  }, [value]);

  const icon = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  );

  return (
    <FormRow label={t('form.gender', 'GENDER')} icon={icon} badgeColor="orange" error={error}>
      <select
        className="epanchang-select full-width"
        value={selectedGender}
        onChange={(e) => onChange(e.target.value)}
        required
      >
        <option value="">{t('form.selectGender', defaultPlaceholder)}</option>
        {GENDERS.map((g) => (
          <option key={g.value} value={g.value}>
            {t(g.labelKey, g.labelDefault)}
          </option>
        ))}
      </select>
    </FormRow>
  );
}
