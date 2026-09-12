import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SUPPORTED_LANGUAGES, getLanguageConfig } from '../../i18n/languages';

export default function LanguageSelector({ variant = 'default', className = '' }) {
  const { i18n, t } = useTranslation('common');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentLang = i18n.language || 'ta';
  const currentConfig = getLanguageConfig(currentLang);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
    localStorage.setItem('jothidam_locale', langCode);
    setIsOpen(false);
  };

  return (
    <div
      ref={dropdownRef}
      className={`lang-selector-wrapper ${variant} ${className}`}
      title={t('language.selectLanguage', 'Select Language')}
    >
      <button
        type="button"
        className={`lang-selector-trigger ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label={t('language.selectLanguage', 'Select Language')}
      >
        <span className="lang-trigger-flag">{currentConfig.flag}</span>
        <span className="lang-trigger-name">{currentConfig.nativeName}</span>
        <span className="lang-trigger-code">{currentConfig.code.toUpperCase()}</span>
        <svg
          className={`lang-chevron-icon ${isOpen ? 'rotated' : ''}`}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {isOpen && (
        <div className="lang-dropdown-menu">
          <div className="lang-dropdown-header">
            <span className="lang-header-title">{t('language.selectLanguage', 'Select Language')}</span>
          </div>
          <div className="lang-options-list">
            {SUPPORTED_LANGUAGES.map((lang) => {
              const isSelected = currentLang === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  className={`lang-option-item ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleSelectLanguage(lang.code)}
                >
                  <div className="lang-option-left">
                    <span className="lang-option-flag">{lang.flag}</span>
                    <div className="lang-option-text">
                      <span className="lang-native-name">{lang.nativeName}</span>
                      <span className="lang-english-name">{lang.name}</span>
                    </div>
                  </div>

                  <div className="lang-option-right">
                    <span className="lang-badge-pill">{lang.badge}</span>
                    {isSelected && (
                      <span className="lang-check-icon">✓</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
