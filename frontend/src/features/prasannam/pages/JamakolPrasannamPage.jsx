import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import SEOHead from '../../../components/common/SEOHead';
import Breadcrumbs from '../../../components/common/Breadcrumbs';
import JamakolChartCard from '../components/JamakolChartCard';
import JamakolKeyNotesCard from '../components/JamakolKeyNotesCard';
import JamakolPlanetaryStatusTables from '../components/JamakolPlanetaryStatusTables';
import JamakolRaysTable from '../components/JamakolRaysTable';
import JamakolPositionsAndSphutasTables from '../components/JamakolPositionsAndSphutasTables';
import JamakolIndicatorsSection from '../components/JamakolIndicatorsSection';
import JamakolTimingSection from '../components/JamakolTimingSection';
import JamakolQuestionsSection from '../components/JamakolQuestionsSection';
import JamakolFaqSection from '../components/JamakolFaqSection';
import jamakkolService from '../services/jamakkol.service';
import horoscopeService from '../../horoscope/services/horoscope.service';
import {
  computeLocalJamakkol,
  PRESET_CITIES,
  AYANAMSA_OPTIONS,
  getLocalizedPlanetCode
} from '../../../utils/jamakkol.utils';
import '../../../styles/jamakolPrasannam.css';

// Helpers to pre-fill current date, time, and default location (Chennai) like in Kadikara Prasannam page
const getInitialDate = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

const getInitialTime = () => {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, '0');
  const min = String(now.getMinutes()).padStart(2, '0');
  const sec = String(now.getSeconds()).padStart(2, '0');
  return `${hh}:${min}:${sec}`;
};

const DEFAULT_CITY = PRESET_CITIES.find((c) => c.name === 'Chennai') || PRESET_CITIES[1] || {
  name: 'Chennai',
  lat: 13.0827,
  lng: 80.2707,
  names: {
    en: 'Chennai',
    ta: 'சென்னை',
    hi: 'चेन्नई',
    te: 'చెన్నై',
    kn: 'ಚೆನ್ನೈ',
    ml: 'ചെന്നൈ'
  }
};

const JAMAKOL_CITY_STORAGE_KEY = 'jothidam_jamakol_city';

// Long-term storage helper: defaults to Chennai for first-time user, otherwise recalls user's selected city
const getSavedCity = () => {
  if (typeof window === 'undefined') return DEFAULT_CITY;
  try {
    const saved = localStorage.getItem(JAMAKOL_CITY_STORAGE_KEY) || localStorage.getItem('jothidam_user_city');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && parsed.name && typeof parsed.lat === 'number' && typeof parsed.lng === 'number') {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Failed to read saved city preference:', e);
  }
  return DEFAULT_CITY;
};

// Store selected city long-term in localStorage for subsequent visits
const saveCityPreference = (city) => {
  if (typeof window === 'undefined' || !city || !city.name) return;
  try {
    const toSave = {
      name: city.name,
      lat: Number(city.lat),
      lng: Number(city.lng),
      names: city.names || { en: city.name, ta: city.name }
    };
    localStorage.setItem(JAMAKOL_CITY_STORAGE_KEY, JSON.stringify(toSave));
    localStorage.setItem('jothidam_user_city', JSON.stringify(toSave));
  } catch (e) {
    console.warn('Failed to save city preference:', e);
  }
};

export default function JamakolPrasannamPage() {
  const { t, i18n } = useTranslation(['astrology', 'common']);
  const currentLang = i18n.language || 'ta';
  const cityInputRef = useRef(null);

  // Form Inputs - Pre-filled with current date, time, and saved city (or Chennai default for first-time visitors)
  const [inputDate, setInputDate] = useState(getInitialDate);
  const [inputTime, setInputTime] = useState(getInitialTime);
  const [selectedCity, setSelectedCity] = useState(getSavedCity);
  const [inputPlace, setInputPlace] = useState(() => getSavedCity().name);
  const [selectedPlaceName, setSelectedPlaceName] = useState(() => getSavedCity().name);
  const [inputLat, setInputLat] = useState(() => getSavedCity().lat);
  const [inputLng, setInputLng] = useState(() => getSavedCity().lng);
  const [isSearchingPlace, setIsSearchingPlace] = useState(false);
  const [placeSuggestions, setPlaceSuggestions] = useState([]);
  const [isPlaceDropdownOpen, setIsPlaceDropdownOpen] = useState(false);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const placeAutocompleteRef = useRef(null);
  const [ayanamsa, setAyanamsa] = useState('lahiri');

  // Place search debounce with Geo Location API
  useEffect(() => {
    const trimmed = (inputPlace || '').trim();
    if (!trimmed || trimmed.length < 2) {
      setPlaceSuggestions([]);
      setIsPlaceDropdownOpen(false);
      return;
    }

    if (selectedPlaceName && selectedPlaceName.toLowerCase() === trimmed.toLowerCase()) {
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearchingPlace(true);
      try {
        const results = await horoscopeService.searchPlaces(trimmed);
        setPlaceSuggestions(results || []);
        if (results && results.length > 0) {
          setIsPlaceDropdownOpen(true);
        }
      } catch (err) {
        console.error('Failed to search places via Geo Location API:', err);
        setPlaceSuggestions([]);
      } finally {
        setIsSearchingPlace(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [inputPlace, selectedPlaceName]);

  // Close suggestions dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (placeAutocompleteRef.current && !placeAutocompleteRef.current.contains(e.target)) {
        setIsPlaceDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  // Place selection handler
  const handleSelectPlace = (item) => {
    const cityName = item.city || item.description?.split(',')[0] || item.formattedAddress;
    setInputPlace(cityName);
    setSelectedPlaceName(cityName);
    const newLat = item.lat !== undefined ? Number(item.lat) : inputLat;
    const newLng = item.lng !== undefined ? Number(item.lng) : inputLng;
    if (item.lat !== undefined && item.lng !== undefined) {
      setInputLat(newLat);
      setInputLng(newLng);
    }
    const updatedCity = { name: cityName, lat: newLat, lng: newLng };
    setSelectedCity(updatedCity);
    saveCityPreference(updatedCity);
    setIsPlaceDropdownOpen(false);
    setPlaceSuggestions([]);
    handleCalculate(inputDate, inputTime, updatedCity);
  };

  // Device GPS Location detection handler
  const handleDetectCurrentLocation = () => {
    if (!('geolocation' in navigator)) {
      alert(currentLang === 'ta' ? 'உங்கள் உலாவியில் GPS வசதி இல்லை.' : 'Geolocation is not supported by your browser.');
      return;
    }

    setIsDetectingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setInputLat(lat);
        setInputLng(lng);

        let detectedCity = 'My Location';
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=12`);
          const data = await res.json();
          detectedCity = data.address?.city || data.address?.town || data.address?.village || data.address?.county || 'My Location';
        } catch {
          detectedCity = `${lat.toFixed(2)}°, ${lng.toFixed(2)}°`;
        }
        setInputPlace(detectedCity);
        setSelectedPlaceName(detectedCity);
        const updatedCity = { name: detectedCity, lat, lng };
        setSelectedCity(updatedCity);
        saveCityPreference(updatedCity);
        setIsDetectingLocation(false);
        handleCalculate(inputDate, inputTime, updatedCity);
      },
      (err) => {
        console.warn('Geolocation error:', err);
        setIsDetectingLocation(false);
        alert(currentLang === 'ta' ? 'இருப்பிடத்தை அணுக முடியவில்லை. உலாவியில் GPS அனுமதியை சரிபார்க்கவும்.' : 'Unable to access your location. Please check browser GPS permissions.');
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  // Chart & Calculation Data - Initialized with current date, time, and saved or default Chennai
  const [chartData, setChartData] = useState(() => {
    const initCity = getSavedCity();
    return computeLocalJamakkol({
      date: getInitialDate(),
      time: getInitialTime(),
      placeName: initCity.name,
      latitude: initCity.lat,
      longitude: initCity.lng
    });
  });

  const [isLoading, setIsLoading] = useState(false);

  // Perform Calculation
  const handleCalculate = async (customDate, customTime, customCity, customAyanamsa) => {
    const calcDate = customDate || inputDate;
    let rawTime = customTime || inputTime || getInitialTime();
    // Ensure seconds are included (HH:MM:SS)
    const timeParts = rawTime.split(':');
    let calcTime = rawTime;
    if (timeParts.length === 1 && timeParts[0]) {
      calcTime = `${timeParts[0].padStart(2, '0')}:00:00`;
    } else if (timeParts.length === 2) {
      calcTime = `${timeParts[0].padStart(2, '0')}:${timeParts[1].padStart(2, '0')}:00`;
    } else if (timeParts.length === 3) {
      calcTime = `${timeParts[0].padStart(2, '0')}:${timeParts[1].padStart(2, '0')}:${timeParts[2].padStart(2, '0')}`;
    }

    let city = customCity;
    if (!city) {
      const match = PRESET_CITIES.find(
        (c) => c.name.toLowerCase() === (inputPlace || '').trim().toLowerCase()
      );
      if (match) {
        city = match;
        setInputLat(match.lat);
        setInputLng(match.lng);
      } else {
        city = {
          name: inputPlace || selectedCity.name || 'Chennai',
          lat: Number(inputLat),
          lng: Number(inputLng)
        };
      }
    }

    if (city && city.name && !isNaN(city.lat) && !isNaN(city.lng)) {
      saveCityPreference(city);
    }

    const calcAyanamsa = customAyanamsa || ayanamsa;

    setIsLoading(true);
    try {
      const res = await jamakkolService.calculate({
        date: calcDate,
        time: calcTime,
        placeName: city.name,
        latitude: city.lat,
        longitude: city.lng,
        ayanamsa: calcAyanamsa
      });

      if (res && res.success) {
        setChartData(res);
      } else {
        // Fallback to local
        const local = computeLocalJamakkol({
          date: calcDate,
          time: calcTime,
          placeName: city.name,
          latitude: city.lat,
          longitude: city.lng
        });
        setChartData(local);
      }
    } catch {
      const local = computeLocalJamakkol({
        date: calcDate,
        time: calcTime,
        placeName: city.name,
        latitude: city.lat,
        longitude: city.lng
      });
      setChartData(local);
    } finally {
      setIsLoading(false);
    }
  };

  // Pre-fill and trigger calculation with current date, time, and saved/default location on page load
  useEffect(() => {
    const initCity = getSavedCity();
    handleCalculate(getInitialDate(), getInitialTime(), initCity, ayanamsa);
  }, []);

  // Handle Ayanamsa Dropdown Change
  const handleAyanamsaChange = (newAyanamsa) => {
    setAyanamsa(newAyanamsa);
    handleCalculate(inputDate, inputTime, { name: inputPlace || selectedCity.name, lat: inputLat, lng: inputLng }, newAyanamsa);
  };

  // Set real-time "Now"
  const handleSetNow = () => {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const hh = String(now.getHours()).padStart(2, '0');
    const min = String(now.getMinutes()).padStart(2, '0');
    const sec = String(now.getSeconds()).padStart(2, '0');

    const nowDate = `${yyyy}-${mm}-${dd}`;
    const nowTime = `${hh}:${min}:${sec}`;

    setInputDate(nowDate);
    setInputTime(nowTime);
    handleCalculate(nowDate, nowTime, { name: inputPlace || selectedCity.name, lat: inputLat, lng: inputLng });
  };

  // Change City trigger
  const handleChangeCityClick = () => {
    if (cityInputRef.current) {
      cityInputRef.current.focus();
      cityInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };


  const breadcrumbs = [
    { label: t('common:nav.home', currentLang === 'ta' ? 'முகப்பு' : 'Home'), link: '/' },
    { label: t('common:nav.prasannam', currentLang === 'ta' ? 'பிரசன்னம்' : 'Prasannam'), link: '/prasannam/kadikara' },
    { label: currentLang === 'ta' ? 'ஜாமக்கோள் பிரசன்னம்' : 'Jamakkol Prasannam', active: true }
  ];

  const jamam = chartData?.jamam || {};
  const pillars = chartData?.pillars || {};

  return (
    <div className="jamakol-container">
      <SEOHead
        title={currentLang === 'ta' ? 'ஜாமக்கோள் பிரசன்னம் | Jamakkol Prasannam Horary Calculator' : 'Jamakkol Prasannam Astrology Calculator - Classical 8 Jamams'}
        description="Authentic classical Jamakkol Prasannam calculator based on Sri Upendra Achariyar system with Udhayam, Aarudam, Kavippu, 8 Jama Grahas, and 70+ Questions Advisor."
      />

      <Breadcrumbs items={breadcrumbs} />

      {/* Page Header */}
      <div className="jamakol-header">
        <div className="jamakol-title-row">
          <div className="jamakol-title-group">
            <h1>
              <span>🧭</span>
              <span>{currentLang === 'ta' ? 'ஜாமக்கோள் பிரசன்னம்' : 'Jamakkol Prasannam'}</span>
            </h1>
          </div>
          <span className="jamakol-title-badge">
            {currentLang === 'ta' ? 'உபேந்திர ஆச்சாரியார் முறை · 8 ஜாமங்கள்' : 'Upendra Achariyar System · 8 Jamams'}
          </span>
        </div>
        <p className="jamakol-header-desc">
          {currentLang === 'ta'
            ? 'தமிழ்நாட்டில் 800 ஆண்டுகளுக்கும் மேலாக பின்பற்றப்படும் உன்னத பிரசன்ன முறை. உதயம் (கேட்பவர்), ஆரூடம் (காரியம்), கவிப்பு (தடை) மற்றும் 8 ஜாமக் கிரகங்களின் சுழற்சி அடிப்படையில் உடனடி பலன்கள்.'
            : 'Authentic 800-year-old Tamil horary system by Sri Upendra Achariyar. Instant verdicts synthesized via Udhayam (Querent), Aarudam (Query Outcome), Kavippu (Obstacle), and the 8 rotating Jama Grahas.'}
        </p>
      </div>

      {/* Jamam Status Banner */}
      <div className="jamam-banner">
        <div className="jamam-info-pill-group">
          <div className="jamam-pill accent">
            <span>⏰</span>
            <span>{currentLang === 'ta' ? jamam.titleTa : jamam.titleEn}</span>
          </div>
          <div className="jamam-pill">
            <span className="jamam-pill-label">{currentLang === 'ta' ? 'கிழமை அதிபதி' : 'Day Lord'}:</span>
            <span>{getLocalizedPlanetCode(jamam.dayLord, currentLang)}</span>
          </div>
          <div className="jamam-pill">
            <span className="jamam-pill-label">{currentLang === 'ta' ? 'ஜாம அதிபதி' : 'Jamam Lord'}:</span>
            <span>{getLocalizedPlanetCode(jamam.activeJamamLord, currentLang)}</span>
          </div>
          <div className="jamam-pill">
            <span className="jamam-pill-label">{currentLang === 'ta' ? 'சூரிய வீதி' : "Sun's Veedhi"}:</span>
            <span>{currentLang === 'ta' ? (pillars.kavippu?.veedhiNameTa || 'ரிஷப வீதி') : (pillars.kavippu?.veedhiName || 'Rishaba Veedhi')}</span>
          </div>
        </div>
        <div className="jamam-pill">
          <span>⌛</span>
          <span>{jamam.startTime} – {jamam.endTime}</span>
        </div>
      </div>

      {/* Input Controls Card */}
      <div className="jamakol-controls-card">
        <div className="jamakol-form-container">
          {/* Row 1: Date & Time */}
          <div className="jamakol-form-row">
            <div className="jk-form-group">
              <label className="jk-form-label">
                <span>📅</span>
                <span>
                  {currentLang === 'ta' ? 'தேதி (Date)' :
                   currentLang === 'hi' ? 'दिनांक (Date)' :
                   currentLang === 'te' ? 'తేదీ (Date)' :
                   currentLang === 'kn' ? 'ದಿನಾಂಕ (Date)' :
                   currentLang === 'ml' ? 'തീയതി (Date)' : 'Date'}
                </span>
              </label>
              <input
                type="date"
                className="jk-form-input"
                value={inputDate}
                onChange={(e) => setInputDate(e.target.value)}
              />
            </div>

            <div className="jk-form-group">
              <label className="jk-form-label">
                <span>⏰</span>
                <span>
                  {currentLang === 'ta' ? 'நேரம் (மணி : நிமிடம் : வினாடி)' :
                   currentLang === 'hi' ? 'समय (घंटा : मिनट : सेकंड)' :
                   currentLang === 'te' ? 'సమయం (గం : ని : సె)' :
                   currentLang === 'kn' ? 'ಸಮಯ (ಗಂ : ನಿ : ಸೆ)' :
                   currentLang === 'ml' ? 'സമയം (മണി : മിനിറ്റ് : സെക്കൻഡ്)' : 'Time (HH:MM:SS)'}
                </span>
              </label>
              <input
                type="time"
                step="1"
                className="jk-form-input jk-time-input"
                value={inputTime}
                onChange={(e) => setInputTime(e.target.value)}
                aria-label="Time (HH:MM:SS)"
              />
            </div>
          </div>

          {/* Row 2: City & Ayanamsa */}
          <div className="jamakol-form-row">
            <div className="jk-form-group jk-place-field" ref={placeAutocompleteRef}>
              <label className="jk-form-label">
                <span>📍</span>
                <span>
                  {currentLang === 'ta' ? 'நகரம் (City)' :
                   currentLang === 'hi' ? 'शहर (City)' :
                   currentLang === 'te' ? 'నగరం (City)' :
                   currentLang === 'kn' ? 'ನಗರ (City)' :
                   currentLang === 'ml' ? 'നഗരം (City)' : 'City / Location'}
                </span>
              </label>
              <div className="jk-place-input-group">
                <input
                  ref={cityInputRef}
                  type="text"
                  className="jk-form-input jk-place-input"
                  placeholder={
                    currentLang === 'ta' ? 'நகரம் (எ.கா. New Delhi, Chennai, Madurai...)' :
                    currentLang === 'hi' ? 'शहर (उदा. New Delhi, Chennai...)' :
                    currentLang === 'te' ? 'నగరం (ఉదా. New Delhi, Chennai...)' :
                    currentLang === 'kn' ? 'ನಗರ (ಉದಾ. New Delhi, Chennai...)' :
                    currentLang === 'ml' ? 'നഗരം (ഉദാ. New Delhi, Chennai...)' :
                    'City / Location (e.g. New Delhi, Chennai...)'
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
                      handleCalculate();
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
                  onClick={handleDetectCurrentLocation}
                  title={
                    currentLang === 'ta' ? 'தற்போதைய இருப்பிடம் (Detect My Location)' :
                    currentLang === 'hi' ? 'वर्तमान स्थान (Detect My Location)' :
                    currentLang === 'te' ? 'ప్రస్తుత స్థానం (Detect My Location)' :
                    currentLang === 'kn' ? 'ಪ್ರಸ್ತುತ ಸ್ಥಳ (Detect My Location)' :
                    currentLang === 'ml' ? 'നിലവിലെ സ്ഥലം (Detect My Location)' :
                    'Detect My Location'
                  }
                  disabled={isDetectingLocation}
                >
                  {isDetectingLocation ? '⏳' : '🎯'}
                </button>
              </div>

              {/* Coordinates Pill */}
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
                      onClick={() => handleSelectPlace(item)}
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

            <div className="jk-form-group">
              <label className="jk-form-label">
                <span>📐</span>
                <span>
                  {currentLang === 'ta' ? 'அயனாம்சம்' :
                   currentLang === 'hi' ? 'अयनांश' :
                   currentLang === 'te' ? 'అయనాంశ' :
                   currentLang === 'kn' ? 'ಅಯನಾಂಶ' :
                   currentLang === 'ml' ? 'அയനാംശം' : 'Ayanamsa'}
                </span>
              </label>
              <select
                className="jk-form-select"
                value={ayanamsa}
                onChange={(e) => handleAyanamsaChange(e.target.value)}
              >
                {AYANAMSA_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.labels?.[currentLang] || opt.labels?.en || opt.value}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 3: Action Buttons */}
          <div className="jamakol-form-row jk-row-actions">
            <button
              type="button"
              className="jk-btn-now"
              onClick={handleSetNow}
              title={currentLang === 'ta' ? 'தற்போதைய நேரம்' : 'Current Time'}
            >
              <span>⚡</span>
              <span>{currentLang === 'ta' ? 'இப்போது (Now)' : 'Now'}</span>
            </button>

            <button
              type="button"
              className="jk-btn-submit"
              onClick={() => handleCalculate()}
              disabled={isLoading}
            >
              <span>{isLoading ? '⏳...' : '🧭'}</span>
              <span>{currentLang === 'ta' ? 'பிரசன்னம் கணக்கிடு' : 'Calculate Chart'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* The Central Chart Card (Matches exact screenshot layout) */}
      <JamakolChartCard
        chartData={chartData}
        dateTimeStr={chartData?.metadata?.displayDateTimeStr}
        cityName={inputPlace || selectedCity.name || 'Chennai'}
        onChangeCity={handleChangeCityClick}
        lang={currentLang}
      />

      {/* Key Prasanna Notes (முக்கிய பிரசன்ன குறிப்புகள்) */}
      <JamakolKeyNotesCard
        chartData={chartData}
        lang={currentLang}
      />

      {/* Planetary Status in Pillars & Pillar Lords (புள்ளி & அதிபதி நிலைகள்) */}
      <JamakolPlanetaryStatusTables
        chartData={chartData}
        lang={currentLang}
      />

      {/* Current Prasannam's Rasi & Planet Rays Table (தற்போதைய பிரசன்னத்தின் ராசி மற்றும் கிரக கதிர்கள்) */}
      <JamakolRaysTable
        chartData={chartData}
        lang={currentLang}
      />

      {/* Gochara, Jama & Prasanna Sphutas Tables (கோச்சாரம், ஜாமம், பிரசன்ன ஸ்புடங்கள்) */}
      <JamakolPositionsAndSphutasTables
        chartData={chartData}
        lang={currentLang}
      />

      {/* Dynamic & Workable Prasannam Indicators & Verdict Section */}
      <JamakolIndicatorsSection
        chartData={chartData}
        lang={currentLang}
        cityName={inputPlace || selectedCity.name || 'Chennai'}
        onRefreshLiveTime={handleSetNow}
      />

      {/* 3 Pillars Summary (Udhayam, Aarudam, Kavippu) */}
      <div className="jamakol-summary-grid">
        {/* 1. Udhayam */}
        <div className="jk-summary-card pillar-udhayam">
          <div className="jk-pillar-header">
            <span className="jk-pillar-title">
              {currentLang === 'ta' ? 'உதயம் (Udhayam)' : 'Udhayam (Querent)'}
            </span>
            <span className="jk-pillar-badge" style={{ background: '#ede9fe', color: '#3b0764', border: '1px solid #7c3aed' }}>
              {currentLang === 'ta' ? 'கேட்பவர் நிலை' : 'Querent Indicator'}
            </span>
          </div>
          <div className="jk-pillar-detail-row">
            <span className="jk-pillar-lbl">{currentLang === 'ta' ? 'ராசி' : 'Rasi Sign'}:</span>
            <span className="jk-pillar-val">
              {pillars.udhayam?.rasi?.[currentLang] || pillars.udhayam?.rasi?.ta || pillars.udhayam?.rasi?.en || 'தனுசு'}
            </span>
          </div>
          <div className="jk-pillar-detail-row">
            <span className="jk-pillar-lbl">{currentLang === 'ta' ? 'பாகை' : 'Degree'}:</span>
            <span className="jk-pillar-val">{pillars.udhayam?.formattedDegree || "18°"}</span>
          </div>
          <div className="jk-pillar-detail-row">
            <span className="jk-pillar-lbl">{currentLang === 'ta' ? 'அதிபதி' : 'Sign Lord'}:</span>
            <span className="jk-pillar-val">
              {getLocalizedPlanetCode(pillars.udhayam?.rasi?.lord, currentLang)}
            </span>
          </div>
          {pillars.udhayam?.star && (
            <div className="jk-pillar-detail-row">
              <span className="jk-pillar-lbl">{currentLang === 'ta' ? 'நட்சத்திரம்' : 'Nakshatra'}:</span>
              <span className="jk-pillar-val" style={{ color: '#3b0764', fontWeight: 800 }}>
                {currentLang === 'ta' ? pillars.udhayam.star.formattedTa : pillars.udhayam.star.formattedEn}
              </span>
            </div>
          )}
        </div>

        {/* 2. Aarudam */}
        <div className="jk-summary-card pillar-aarudam">
          <div className="jk-pillar-header">
            <span className="jk-pillar-title">
              {currentLang === 'ta' ? 'ஆரூடம் (Aarudam)' : 'Aarudam (Outcome)'}
            </span>
            <span className="jk-pillar-badge" style={{ background: '#e0f2fe', color: '#075985', border: '1px solid #0284c7' }}>
              {currentLang === 'ta' ? 'காரிய வெற்றி நிலை' : 'Matter Outcome'}
            </span>
          </div>
          <div className="jk-pillar-detail-row">
            <span className="jk-pillar-lbl">{currentLang === 'ta' ? 'ராசி' : 'Rasi Sign'}:</span>
            <span className="jk-pillar-val">
              {pillars.aarudam?.rasi?.[currentLang] || pillars.aarudam?.rasi?.ta || pillars.aarudam?.rasi?.en || 'கடகம்'}
            </span>
          </div>
          <div className="jk-pillar-detail-row">
            <span className="jk-pillar-lbl">{currentLang === 'ta' ? 'பாகை (5 நிமிடம்/ராசி)' : 'Degree'}:</span>
            <span className="jk-pillar-val">{pillars.aarudam?.formattedDegree || "24°19'"}</span>
          </div>
          <div className="jk-pillar-detail-row">
            <span className="jk-pillar-lbl">{currentLang === 'ta' ? 'அதிபதி' : 'Sign Lord'}:</span>
            <span className="jk-pillar-val">
              {getLocalizedPlanetCode(pillars.aarudam?.rasi?.lord, currentLang)}
            </span>
          </div>
          {pillars.aarudam?.star && (
            <div className="jk-pillar-detail-row">
              <span className="jk-pillar-lbl">{currentLang === 'ta' ? 'நட்சத்திரம்' : 'Nakshatra'}:</span>
              <span className="jk-pillar-val" style={{ color: '#075985', fontWeight: 800 }}>
                {currentLang === 'ta' ? pillars.aarudam.star.formattedTa : pillars.aarudam.star.formattedEn}
              </span>
            </div>
          )}
        </div>

        {/* 3. Kavippu */}
        <div className="jk-summary-card pillar-kavippu">
          <div className="jk-pillar-header">
            <span className="jk-pillar-title">
              {currentLang === 'ta' ? 'கவிப்பு (Kavippu)' : 'Kavippu (Obstacle)'}
            </span>
            <span className="jk-pillar-badge" style={{ background: '#fee2e2', color: '#7f1d1d', border: '1px solid #dc2626' }}>
              {currentLang === 'ta' ? 'மறைமுகத் தடை' : 'Hidden Blockage'}
            </span>
          </div>
          <div className="jk-pillar-detail-row">
            <span className="jk-pillar-lbl">{currentLang === 'ta' ? 'ராசி' : 'Rasi Sign'}:</span>
            <span className="jk-pillar-val">
              {pillars.kavippu?.rasi?.[currentLang] || pillars.kavippu?.rasi?.ta || pillars.kavippu?.rasi?.en || 'துலாம்'}
            </span>
          </div>
          <div className="jk-pillar-detail-row">
            <span className="jk-pillar-lbl">{currentLang === 'ta' ? 'பாகை' : 'Degree'}:</span>
            <span className="jk-pillar-val">{pillars.kavippu?.formattedDegree || "06°"}</span>
          </div>
          <div className="jk-pillar-detail-row">
            <span className="jk-pillar-lbl">{currentLang === 'ta' ? 'சூரிய வீதி' : "Sun's Veedhi"}:</span>
            <span className="jk-pillar-val">
              {currentLang === 'ta' ? (pillars.kavippu?.veedhiNameTa || 'ரிஷப வீதி') : (pillars.kavippu?.veedhiName || 'Rishaba Veedhi')}
            </span>
          </div>
          {pillars.kavippu?.star && (
            <div className="jk-pillar-detail-row">
              <span className="jk-pillar-lbl">{currentLang === 'ta' ? 'நட்சத்திரம்' : 'Nakshatra'}:</span>
              <span className="jk-pillar-val" style={{ color: '#7f1d1d', fontWeight: 800 }}>
                {currentLang === 'ta' ? pillars.kavippu.star.formattedTa : pillars.kavippu.star.formattedEn}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Sambhava Kala Nirnayam (Event Timing / கால நிர்ணயம்) */}
      <JamakolTimingSection
        timing={chartData?.eventTiming}
        lang={currentLang}
      />

      {/* 70+ Questions Advisor Section */}
      <JamakolQuestionsSection
        lang={currentLang}
      />

      {/* Classical Principles & FAQs Accordion */}
      <JamakolFaqSection
        lang={currentLang}
      />
    </div>
  );
}
