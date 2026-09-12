import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import FormRow from '../../../../components/common/FormRow';
import { TIMEZONE_GROUPS, DST_OPTIONS } from '../../../../config/timezones.config';

export default function LocationSection({
  placeQuery, setPlaceQuery,
  selectedPlaceId, setSelectedPlaceId,
  latitude, setLatitude,
  longitude, setLongitude,
  latDeg, latMin, latSec, latDir,
  lngDeg, lngMin, lngSec, lngDir,
  handleLatDmsChange,
  handleLngDmsChange,
  timezone, setTimezone,
  handleTimezoneChange,
  gmt, setGmt,
  dstType, setDstType,
  dst, setDst,
  handleDstTypeChange,
  placeSuggestions, handleSelectPlace,
  placeError,
  coordsError
}) {
  const { t, i18n } = useTranslation(['horoscope', 'common']);
  const currentLang = i18n.language || 'ta';

  // Autocomplete dropdown visibility state and outside-click ref
  const [isOpen, setIsOpen] = useState(false);
  const autocompleteRef = useRef(null);

  // Close suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (autocompleteRef.current && !autocompleteRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  // Show suggestions when valid suggestions arrive and input has >= 2 characters
  useEffect(() => {
    if (placeSuggestions.length > 0 && placeQuery && placeQuery.trim().length >= 2 && !selectedPlaceId) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [placeSuggestions, placeQuery, selectedPlaceId]);

  const placeIcon = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>
  );

  const coordsIcon = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="2" y1="12" x2="22" y2="12"></line>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
    </svg>
  );

  const tzIcon = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  );

  const dstIcon = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
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
  );

  return (
    <>
      {/* 1. BIRTH PLACE AUTOCOMPLETE (English only across all 6 languages) */}
      <FormRow
        label={
          <span className="location-field-label">
            {currentLang === 'ta' ? 'பிறந்த இடம் (BIRTH PLACE)' : t('form.birthPlace', 'BIRTH PLACE')}
            <span className="lang-en-badge" title="Type location name in English for all languages">EN</span>
          </span>
        }
        icon={placeIcon}
        badgeColor="orange"
        isRelative={true}
        error={placeError}
      >
        <div ref={autocompleteRef} className="autocomplete-wrapper" style={{ position: 'relative', width: '100%' }}>
          <input
            type="text"
            className="epanchang-text-input full-width"
            value={placeQuery}
            onChange={(e) => {
              const val = e.target.value;
              setPlaceQuery(val);
              setSelectedPlaceId('');
              if (!val || !val.trim() || val.trim().length < 2) {
                setIsOpen(false);
                handleLatDmsChange('', '', '', 'N');
                handleLngDmsChange('', '', '', 'E');
              } else {
                setIsOpen(true);
              }
            }}
            onFocus={() => {
              if (placeQuery && placeQuery.trim().length >= 2 && placeSuggestions.length > 0 && !selectedPlaceId) {
                setIsOpen(true);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                setIsOpen(false);
              }
            }}
            placeholder={t('form.placePlaceholder', 'Search city, district, or town in English (e.g. Chennai, Madurai, Mumbai)...')}
            autoComplete="off"
            required
          />
          {isOpen && placeQuery && placeQuery.trim().length >= 2 && placeSuggestions.length > 0 && !selectedPlaceId && (
            <ul className="epanchang-suggestions-list">
              {placeSuggestions.map((item) => (
                <li
                  key={item.placeId}
                  onClick={() => {
                    handleSelectPlace(item);
                    setIsOpen(false);
                  }}
                >
                  <div className="suggestion-info">
                    <span className="suggestion-city">{item.city || item.description?.split(',')[0]}</span>
                    <span className="suggestion-region">
                      {[item.district && `${item.district} Dist`, item.state, item.country].filter(Boolean).filter((v, i, a) => a.indexOf(v) === i).join(', ') || item.description}
                    </span>
                  </div>
                  {item.lat !== undefined && item.lng !== undefined && (
                    <span className="suggestion-coords-pill">
                      {Number(item.lat).toFixed(2)}°, {Number(item.lng).toFixed(2)}°
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </FormRow>

      {/* 2. EXACT COORDINATES (LONGITUDE / LATITUDE DMS) */}
      <FormRow
        label={currentLang === 'ta' ? 'அட்ச / தீர்க்க ரேகை (COORDINATES)' : t('chart.degrees', 'COORDINATES')}
        icon={coordsIcon}
        badgeColor="blue"
        error={coordsError}
      >
        <div className="dms-coords-container">
          {/* Longitude Row */}
          <div className="dms-field-row">
            <span className="dms-row-label">{currentLang === 'ta' ? 'தீர்க்க ரேகை:' : `${t('form.longitude', 'Longitude')}:`}</span>
            <div className="dms-inputs-wrapper">
              <div className="dms-inputs-group">
                <input
                  type="number"
                  className="dms-box-input dms-deg-input"
                  min="0"
                  max="180"
                  value={lngDeg}
                  onChange={(e) => handleLngDmsChange(e.target.value, lngMin, lngSec, lngDir)}
                  title="Longitude Degrees (0-180)"
                />
                <span className="dms-unit">°</span>
                <input
                  type="number"
                  className="dms-box-input dms-min-input"
                  min="0"
                  max="59"
                  value={lngMin}
                  onChange={(e) => handleLngDmsChange(lngDeg, e.target.value, lngSec, lngDir)}
                  title="Longitude Minutes (0-59)"
                />
                <span className="dms-unit">'</span>
                <input
                  type="number"
                  className="dms-box-input dms-sec-input"
                  min="0"
                  max="59"
                  value={lngSec}
                  onChange={(e) => handleLngDmsChange(lngDeg, lngMin, e.target.value, lngDir)}
                  title="Longitude Seconds (0-59)"
                />
                <span className="dms-unit">"</span>
                <select
                  className="dms-dir-select"
                  value={lngDir || 'E'}
                  onChange={(e) => handleLngDmsChange(lngDeg, lngMin, lngSec, e.target.value)}
                  title="Direction (East / West)"
                >
                  <option value="E">{currentLang === 'ta' ? 'கிழக்கு' : 'East (E)'}</option>
                  <option value="W">{currentLang === 'ta' ? 'மேற்கு' : 'West (W)'}</option>
                </select>
              </div>
              {longitude && !isNaN(Number(longitude)) && Number(longitude) !== 0 && (
                <span className="dms-decimal-preview">({Number(longitude).toFixed(4)}°)</span>
              )}
            </div>
          </div>

          {/* Latitude Row */}
          <div className="dms-field-row">
            <span className="dms-row-label">{currentLang === 'ta' ? 'அட்ச ரேகை:' : `${t('form.latitude', 'Latitude')}:`}</span>
            <div className="dms-inputs-wrapper">
              <div className="dms-inputs-group">
                <input
                  type="number"
                  className="dms-box-input dms-deg-input"
                  min="0"
                  max="90"
                  value={latDeg}
                  onChange={(e) => handleLatDmsChange(e.target.value, latMin, latSec, latDir)}
                  title="Latitude Degrees (0-90)"
                />
                <span className="dms-unit">°</span>
                <input
                  type="number"
                  className="dms-box-input dms-min-input"
                  min="0"
                  max="59"
                  value={latMin}
                  onChange={(e) => handleLatDmsChange(latDeg, e.target.value, latSec, latDir)}
                  title="Latitude Minutes (0-59)"
                />
                <span className="dms-unit">'</span>
                <input
                  type="number"
                  className="dms-box-input dms-sec-input"
                  min="0"
                  max="59"
                  value={latSec}
                  onChange={(e) => handleLatDmsChange(latDeg, latMin, e.target.value, latDir)}
                  title="Latitude Seconds (0-59)"
                />
                <span className="dms-unit">"</span>
                <select
                  className="dms-dir-select"
                  value={latDir || 'N'}
                  onChange={(e) => handleLatDmsChange(latDeg, latMin, latSec, e.target.value)}
                  title="Direction (North / South)"
                >
                  <option value="N">{currentLang === 'ta' ? 'வடக்கு' : 'North (N)'}</option>
                  <option value="S">{currentLang === 'ta' ? 'தெற்கு' : 'South (S)'}</option>
                </select>
              </div>
              {latitude && !isNaN(Number(latitude)) && Number(latitude) !== 0 && (
                <span className="dms-decimal-preview">({Number(latitude).toFixed(4)}°)</span>
              )}
            </div>
          </div>
        </div>
      </FormRow>

      {/* 3. TIMEZONE (நேர மண்டலம்) & GMT */}
      <FormRow label={t('form.timezone', 'TIMEZONE & GMT')} icon={tzIcon} badgeColor="purple">
        <div className="dms-coords-container">
          {/* Timezone Select Dropdown (Categorized by Continent/Group) */}
          <div className="dms-field-row tz-select-row">
            <span className="dms-row-label">{t('form.timeZoneLabel', 'Time Zone:')}</span>
            <div className="tz-select-wrapper">
              <select
                className="timezone-custom-select"
                value={timezone}
                onChange={(e) => handleTimezoneChange(e.target.value)}
                title="Select Geographical Timezone"
              >
                {TIMEZONE_GROUPS.map((grp) => (
                  <optgroup key={grp.group} label={currentLang === 'ta' && grp.groupTa ? grp.groupTa : grp.group}>
                    {grp.zones.map((z) => (
                      <option key={z.id} value={z.id}>
                        {z.label} {z.desc ? `(${z.desc})` : `(${z.offset})`}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            {/* GMT Field Auto-Updated from Selected Timezone */}
            <div className="dms-tz-item gmt-quick-item">
              <span className="dms-tz-label">GMT:</span>
              <input
                type="text"
                className="dms-tz-input"
                value={gmt}
                onChange={(e) => setGmt(e.target.value)}
                placeholder="+05:30"
                title="GMT Offset (Auto-updated from Timezone or enter custom)"
              />
            </div>
          </div>
        </div>
      </FormRow>

      {/* 4. DST CORRECTION (DST திருத்தம்) - Matching Screenshot Dropdown */}
      <FormRow label={t('form.dstCorrection', 'DST CORRECTION')} icon={dstIcon} badgeColor="purple">
        <div className="dms-coords-container">
          <div className="dms-field-row tz-select-row">
            <span className="dms-row-label">{t('form.dstCorrectionLabel', 'DST Correction:')}</span>
            <div className="tz-select-wrapper">
              <select
                className="timezone-custom-select dst-custom-select"
                value={dstType}
                onChange={(e) => handleDstTypeChange(e.target.value)}
                title="Select DST Correction"
              >
                {DST_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label[currentLang] || opt.label.en}
                  </option>
                ))}
              </select>
            </div>

            {/* Active DST Offset badge/input */}
            <div className="dms-tz-item gmt-quick-item">
              <span className="dms-tz-label">Offset:</span>
              <input
                type="text"
                className="dms-tz-input"
                value={dst}
                onChange={(e) => setDst(e.target.value)}
                placeholder="+00:00"
                title="Daylight Saving Time Offset (e.g. +00:00, +01:00, +02:00)"
              />
            </div>
          </div>
        </div>
      </FormRow>
    </>
  );
}
