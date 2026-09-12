import React, { useState } from 'react';
import { useTheme } from '../../app/providers/ThemeContext';
import { useTranslation } from 'react-i18next';

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme, isDark } = useTheme();
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'ta';
  const [showTooltip, setShowTooltip] = useState(false);

  const tooltipText = isDark
    ? (currentLang === 'ta' ? 'ஒளி வடிவம் (Light)' : 'Light')
    : (currentLang === 'ta' ? 'இருண்ட வடிவம் (Dark)' : 'Dark');

  return (
    <div className="portal-theme-toggle-wrapper">
      <button
        type="button"
        className={`portal-theme-toggle-btn ${isDark ? 'is-dark' : 'is-light'} ${className}`}
        onClick={toggleTheme}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
        title={tooltipText}
      >
        {isDark ? (
          /* Radiant Sun Icon in Dark Mode */
          <svg
            className="theme-icon sun-icon"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        ) : (
          /* Sleek Crescent Moon Icon in Light Mode (Matching Astrotalk) */
          <svg
            className="theme-icon moon-icon"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        )}
      </button>

      {/* Floating Hover Tooltip matching screenshot */}
      {showTooltip && (
        <div className="portal-theme-tooltip">
          {tooltipText}
        </div>
      )}
    </div>
  );
}
