import React from 'react';
import { useTranslation } from 'react-i18next';
import FormRow from '../../../../components/common/FormRow';
import { getLocalizedMonths, YEARS, HOURS, MINUTES, SECONDS } from '../../../../config/constants';

export default function DateTimeSection({
  birthMonth, setBirthMonth,
  birthDay, setBirthDay,
  birthYear, setBirthYear,
  birthHour, setBirthHour,
  birthMinute, setBirthMinute,
  birthSecond, setBirthSecond,
  birthAmPm, setBirthAmPm,
  daysList
}) {
  const { t, i18n } = useTranslation('horoscope');
  const currentLang = i18n.language || 'en';
  const monthList = getLocalizedMonths(currentLang);

  const dateIcon = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
  );

  const timeIcon = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  );

  return (
    <>
      {/* DATE OF BIRTH */}
      <FormRow label={t('form.dob', 'DATE OF BIRTH')} icon={dateIcon} badgeColor="purple">
        <div className="date-select-group">
          <select
            className="epanchang-select date-select-month"
            value={birthMonth}
            onChange={(e) => setBirthMonth(Number(e.target.value))}
          >
            {monthList.map((m) => (
              <option key={m.value} value={m.value}>{m.name}</option>
            ))}
          </select>

          <select
            className="epanchang-select date-select-day"
            value={birthDay}
            onChange={(e) => setBirthDay(Number(e.target.value))}
          >
            {daysList.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          <select
            className="epanchang-select date-select-year"
            value={birthYear}
            onChange={(e) => setBirthYear(Number(e.target.value))}
          >
            {YEARS.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
      </FormRow>

      {/* TIME OF BIRTH */}
      <FormRow label={t('form.tob', 'TIME OF BIRTH')} icon={timeIcon} badgeColor="purple">
        <div className="time-select-group">
          <select
            className="epanchang-select time-select-item"
            value={birthHour}
            onChange={(e) => setBirthHour(e.target.value)}
          >
            {HOURS.map((h) => (
              <option key={h} value={h}>{h}</option>
            ))}
          </select>

          <select
            className="epanchang-select time-select-item"
            value={birthMinute}
            onChange={(e) => setBirthMinute(e.target.value)}
          >
            {MINUTES.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>

          <select
            className="epanchang-select time-select-item"
            value={birthSecond}
            onChange={(e) => setBirthSecond(e.target.value)}
          >
            {SECONDS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <select
            className="epanchang-select time-select-ampm"
            value={birthAmPm}
            onChange={(e) => setBirthAmPm(e.target.value)}
          >
            <option value="am">am</option>
            <option value="pm">pm</option>
          </select>
        </div>
      </FormRow>
    </>
  );
}
