import React from 'react';

/**
 * PanchangControlsCard
 * Form controls card containing quick date pills, date picker, time input with live clock toggle,
 * city/location search with GPS detector and coordinates badge, Ayanamsa selector, and submit button.
 */
export default function PanchangControlsCard({
  date,
  setDate,
  time,
  setTime,
  isLiveClock,
  setIsLiveClock,
  todayDateStr,
  inputPlace,
  setInputPlace,
  inputLat,
  inputLng,
  setSelectedPlaceName,
  placeSuggestions,
  isPlaceDropdownOpen,
  setIsPlaceDropdownOpen,
  isDetectingLocation,
  placeAutocompleteRef,
  cityInputRef,
  ayanamsa,
  setAyanamsa,
  loading,
  isTa,
  onShiftDate,
  onResetToday,
  onSelectPlace,
  onDetectLocation,
  onSubmit,
  getSubmitButtonLabel
}) {
  return (
    <div className="dp-controls-card">
      {/* Quick Date Pills */}
      <div className="dp-quick-date-strip">
        <span className="dp-quick-date-label">{isTa ? 'விரைவுத் தேர்வுகள்:' : 'Quick Select:'}</span>
        <button
          type="button"
          className="dp-quick-pill"
          onClick={() => onShiftDate(-1)}
        >
          ← {isTa ? 'நேற்று' : 'Yesterday'}
        </button>
        <button
          type="button"
          className={`dp-quick-pill ${date === todayDateStr ? 'active' : ''}`}
          onClick={onResetToday}
        >
          ⭐ {isTa ? 'இன்று' : 'Today'}
        </button>
        <button
          type="button"
          className="dp-quick-pill"
          onClick={() => onShiftDate(1)}
        >
          {isTa ? 'நாளை' : 'Tomorrow'} →
        </button>
      </div>

      {/* Form Filter Rows */}
      <div className="dp-form-container">
        {/* Row 1: Date, Time, City */}
        <div className="dp-form-row dp-form-row-top">
          {/* 1. Date */}
          <div className="dp-input-group">
            <label htmlFor="panchangam-date">
              <span>📅</span> {isTa ? 'தேதி:' : 'Date:'}
            </label>
            <input
              id="panchangam-date"
              type="date"
              value={date}
              onChange={(e) => {
                setIsLiveClock(false);
                setDate(e.target.value);
              }}
              onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
              className="dp-input"
            />
          </div>

          {/* 2. Time */}
          <div className="dp-input-group">
            <label htmlFor="panchangam-time">
              <span>⏰</span> {isTa ? 'நேரம்:' : 'Time:'} {isLiveClock && <span className="dp-live-tag">● Live</span>}
            </label>
            <div className="dp-time-input-group">
              <input
                id="panchangam-time"
                type="time"
                step="1"
                value={time}
                onChange={(e) => {
                  setIsLiveClock(false);
                  setTime(e.target.value);
                }}
                onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
                className="dp-input dp-time-input"
              />
              <button
                type="button"
                className={`dp-action-btn dp-time-toggle-btn ${isLiveClock ? 'active' : ''}`}
                onClick={() => setIsLiveClock(!isLiveClock)}
                title={isTa ? 'தற்போதைய நேரம் (Live Time)' : 'Toggle live clock'}
              >
                ⏱️
              </button>
            </div>
          </div>

          {/* 3. City / Location with Dynamic Autocomplete & Lat/Long */}
          <div className="dp-input-group jk-place-field" ref={placeAutocompleteRef}>
            <label htmlFor="panchangam-city-input">
              <span>📍</span> {isTa ? 'இருப்பிடம் / நகரம்:' : 'City / Location:'}
            </label>
            <div className="jk-place-input-group">
              <input
                id="panchangam-city-input"
                ref={cityInputRef}
                type="text"
                className="dp-input jk-place-input"
                placeholder={
                  isTa
                    ? 'நகரம் (எ.கா. Dindigul, Chennai, Madurai...)'
                    : 'City / Location (e.g. Dindigul, Chennai...)'
                }
                value={inputPlace}
                onChange={(e) => {
                  setInputPlace(e.target.value);
                  setSelectedPlaceName('');
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    setIsPlaceDropdownOpen(false);
                    onSubmit();
                  }
                }}
                onFocus={() => {
                  if (placeSuggestions.length > 0) setIsPlaceDropdownOpen(true);
                }}
                autoComplete="off"
              />
              <button
                type="button"
                className="btn-jk-gps"
                onClick={onDetectLocation}
                title={isTa ? 'தற்போதைய இருப்பிடம் (Detect My Location)' : 'Detect My Location'}
                disabled={isDetectingLocation}
              >
                {isDetectingLocation ? '⏳' : '🎯'}
              </button>
            </div>

            {/* Dynamic Coordinates Badge */}
            {inputLat && inputLng && (
              <div className="jk-coords-badge" title="Geo Coordinates">
                <span>🌐</span>
                <span>
                  {Number(inputLat).toFixed(4)}° {inputLat >= 0 ? 'N' : 'S'}, {Number(inputLng).toFixed(4)}° {inputLng >= 0 ? 'E' : 'W'}
                </span>
              </div>
            )}

            {/* Autocomplete Suggestions Dropdown */}
            {isPlaceDropdownOpen && placeSuggestions.length > 0 && (
              <ul className="jk-suggestions-dropdown">
                {placeSuggestions.map((item) => (
                  <li
                    key={item.placeId || `${item.lat}-${item.lng}`}
                    className="jk-suggestion-item"
                    onClick={() => onSelectPlace(item)}
                  >
                    <div className="jk-suggestion-main-info">
                      <span className="jk-suggestion-city-name">
                        {item.city || item.description?.split(',')[0]}
                      </span>
                      <span className="jk-suggestion-region-name">
                        {[item.district && `${item.district} Dist`, item.state, item.country]
                          .filter(Boolean)
                          .filter((v, i, a) => a.indexOf(v) === i)
                          .join(', ') || item.description}
                      </span>
                    </div>
                    {item.lat !== undefined && item.lng !== undefined && (
                      <span className="jk-suggestion-latlng-pill">
                        {Number(item.lat).toFixed(2)}°, {Number(item.lng).toFixed(2)}°
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Row 2: Ayanamsa & Submit Button */}
        <div className="dp-form-row dp-form-row-bottom">
          {/* 4. Ayanamsa */}
          <div className="dp-input-group dp-ayanamsa-group">
            <label htmlFor="panchangam-ayanamsa">
              <span>📐</span> {isTa ? 'அயனாம்சம்:' : 'Ayanamsa:'}
            </label>
            <select
              id="panchangam-ayanamsa"
              value={ayanamsa}
              onChange={(e) => setAyanamsa(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
              className="dp-select"
            >
              <option value="lahiri">{isTa ? 'திருக்கணிதம் - லாஹிரி (சித்ரபட்சம்)' : 'Thirukanitha - Lahiri (Chitra Paksha)'}</option>
              <option value="kp_new">{isTa ? 'கே.பி. புதியது' : 'KP New'}</option>
              <option value="kp_old">{isTa ? 'கே.பி. பழையது' : 'KP Old'}</option>
              <option value="bv_raman">{isTa ? 'பி.வி. ராமன்' : 'B.V. Raman'}</option>
            </select>
          </div>

          {/* 5. Submit Button */}
          <div className="dp-submit-group">
            <button
              type="button"
              id="dp-submit-btn"
              className="dp-btn-submit"
              onClick={onSubmit}
              disabled={loading}
              title={isTa ? 'தேர்ந்தெடுத்த தேதி மற்றும் இடத்திற்கான பஞ்சாங்கம் விவரங்களைக் காண்க' : 'View daily panchangam details for selected date and location'}
            >
              <span className="dp-btn-submit-icon">{loading ? '⏳' : '🔍'}</span>
              <span className="dp-btn-submit-text">{getSubmitButtonLabel()}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
