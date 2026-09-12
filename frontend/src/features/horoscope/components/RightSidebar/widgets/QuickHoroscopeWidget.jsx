import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getLocalizedMonths, YEARS, HOURS } from '../../../../../config/constants';
import { SIDEBAR_I18N } from '../config/sidebarContent.config';

export default function QuickHoroscopeWidget({ onQuickSubmit }) {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'en';
  const navigate = useNavigate();
  const location = useLocation();

  const [quickName, setQuickName] = useState('');
  const [quickPlace, setQuickPlace] = useState('Chennai, Tamil Nadu');
  const [quickYear, setQuickYear] = useState(2026);
  const [quickMonth, setQuickMonth] = useState(1);
  const [quickDay, setQuickDay] = useState(1);
  const [quickHour, setQuickHour] = useState('12');
  const [quickMin, setQuickMin] = useState('0');
  const [quickAmPm, setQuickAmPm] = useState('PM');

  const getLangString = (obj, fallback = '') => {
    if (!obj) return fallback;
    return obj[currentLang] || obj.en || obj.ta || fallback;
  };

  const handleQuickContinue = (e) => {
    e.preventDefault();

    const quickData = {
      fullName: quickName.trim() || 'Guest User',
      placeQuery: quickPlace.trim() || 'Chennai, Tamil Nadu',
      birthYear: Number(quickYear),
      birthMonth: Number(quickMonth),
      birthDay: Number(quickDay),
      birthHour: String(quickHour).padStart(2, '0'),
      birthMinute: String(quickMin).padStart(2, '0'),
      birthAmPm: String(quickAmPm).toLowerCase()
    };

    // Dispatch global event for instant hydration if on home page
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('jothidam:quick-horoscope-submit', { detail: quickData }));
    }

    if (onQuickSubmit) {
      onQuickSubmit(quickData);
      return;
    }

    if (location.pathname !== '/') {
      navigate('/', { state: { quickData } });
    } else {
      const formElement = document.getElementById('birth-details-form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="sidebar-widget-card quick-horoscope-widget">
      <div className="widget-header-green">
        <span className="widget-header-title">
          {getLangString(SIDEBAR_I18N.quickHoroscopeTitle, 'Make your FREE HOROSCOPE in seconds')}
        </span>
      </div>

      <form onSubmit={handleQuickContinue} className="quick-form-body">
        <div className="quick-form-inner-grid">
          {/* Rishi / Sage Illustration Badge */}
          <div className="rishi-avatar-container">
            <div className="rishi-avatar-circle" title="Vedic Rishi">
              <span className="rishi-glyph">🧘‍♂️</span>
            </div>
          </div>

          {/* Inputs Column */}
          <div className="quick-inputs-col">
            <div className="quick-input-row">
              <input
                type="text"
                value={quickName}
                onChange={(e) => setQuickName(e.target.value)}
                placeholder={getLangString(SIDEBAR_I18N.namePlaceholder, 'Your Name')}
                className="quick-text-input"
                aria-label="Your Name"
              />
            </div>

            <div className="quick-input-row">
              <input
                type="text"
                value={quickPlace}
                onChange={(e) => setQuickPlace(e.target.value)}
                placeholder={getLangString(SIDEBAR_I18N.placePlaceholder, 'Place of birth')}
                className="quick-text-input"
                aria-label="Birth Place"
              />
            </div>

            {/* DOB Row */}
            <div className="quick-dropdown-row">
              <span className="quick-row-label">
                {getLangString(SIDEBAR_I18N.dobLabel, 'DOB')}
              </span>
              <select
                value={quickYear}
                onChange={(e) => setQuickYear(Number(e.target.value))}
                className="quick-select-box select-year"
                aria-label="Birth Year"
              >
                {YEARS.slice(0, 80).map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>

              <select
                value={quickMonth}
                onChange={(e) => setQuickMonth(Number(e.target.value))}
                className="quick-select-box select-month"
                aria-label="Birth Month"
              >
                {getLocalizedMonths(currentLang).map((m) => (
                  <option key={m.value} value={m.value}>
                    {currentLang === 'en' ? m.name.slice(0, 3) : m.name}
                  </option>
                ))}
              </select>

              <select
                value={quickDay}
                onChange={(e) => setQuickDay(Number(e.target.value))}
                className="quick-select-box select-day"
                aria-label="Birth Day"
              >
                {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            {/* TOB Row */}
            <div className="quick-dropdown-row">
              <span className="quick-row-label">
                {getLangString(SIDEBAR_I18N.tobLabel, 'TOB')}
              </span>
              <select
                value={quickHour}
                onChange={(e) => setQuickHour(e.target.value)}
                className="quick-select-box select-hr"
                aria-label="Birth Hour"
              >
                {HOURS.map((h) => (
                  <option key={h} value={parseInt(h, 10)}>{parseInt(h, 10)}</option>
                ))}
              </select>

              <select
                value={quickMin}
                onChange={(e) => setQuickMin(e.target.value)}
                className="quick-select-box select-min"
                aria-label="Birth Minute"
              >
                {['0', '5', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'].map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>

              <select
                value={quickAmPm}
                onChange={(e) => setQuickAmPm(e.target.value)}
                className="quick-select-box select-ampm"
                aria-label="AM or PM"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>

            {/* Continue Button */}
            <div className="quick-btn-row">
              <button type="submit" className="quick-continue-btn">
                {getLangString(SIDEBAR_I18N.continueBtn, 'Continue →')}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
