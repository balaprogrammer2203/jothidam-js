import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import SEOHead from '../../../components/common/SEOHead';
import Breadcrumbs from '../../../components/common/Breadcrumbs';
import { panchangamService } from '../services/panchangam.service';
import horoscopeService from '../../horoscope/services/horoscope.service';
import { ROUTES } from '../../../config/routes.config';
import {
  DEFAULT_CITY,
  PRESET_CITIES,
  getSavedCity,
  saveCityPreference
} from '../constants/panchangam.constants';
import {
  PanchangHeroBanner,
  PanchangControlsCard,
  PanchangDaySummaryCard,
  PanchangDetailsCard,
  PanchangChandrashtamamBanner,
  PanchangTimingsGrid,
  PanchangMuhurthamSection,
  PanchangGowriTable,
  PanchangHoraiTable
} from '../components';
import './DailyPanchangam.css';

// Re-export constants for backwards compatibility with any external imports
export { DEFAULT_CITY, PRESET_CITIES };

export default function DailyPanchangamPage() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'ta';
  const isTa = currentLang === 'ta';

  // Format today's date YYYY-MM-DD in local time
  const getTodayDateStr = () => {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };

  const getNowTimeStr = () => {
    const d = new Date();
    const hh = String(d.getHours()).padStart(2, '0');
    const min = String(d.getMinutes()).padStart(2, '0');
    const sec = String(d.getSeconds()).padStart(2, '0');
    return `${hh}:${min}:${sec}`;
  };

  const [date, setDate] = useState(getTodayDateStr);
  const [time, setTime] = useState(getNowTimeStr);
  const [isLiveClock, setIsLiveClock] = useState(true);

  // Dynamic Location & City states (matching Jamakol Prasannam Page pattern)
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
  const cityInputRef = useRef(null);

  const [ayanamsa, setAyanamsa] = useState('lahiri');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copiedToast, setCopiedToast] = useState(false);

  // Auto initialize Gowri tab based on current hour
  const getInitialGowriTab = () => {
    const curHour = new Date().getHours();
    return curHour >= 18 || curHour < 6 ? 'night' : 'day';
  };
  const [gowriTab, setGowriTab] = useState(getInitialGowriTab);

  // Fetch Panchangam
  const fetchPanchangam = useCallback(
    async (targetDate, targetTime, targetCity, targetAyanamsa) => {
      setLoading(true);
      setError(null);
      try {
        const res = await panchangamService.getDailyPanchangam({
          date: targetDate,
          time: targetTime,
          latitude: targetCity.lat,
          longitude: targetCity.lng,
          placeName: targetCity.name,
          ayanamsa: targetAyanamsa,
          lang: currentLang
        });
        setData(res);

        // Automatically sync Gowri tab based on active period (day or night)
        if (res?.gowriPanchangamSchedule) {
          if (res.gowriPanchangamSchedule.activePeriod) {
            setGowriTab(res.gowriPanchangamSchedule.activePeriod);
          } else if (res.gowriPanchangamSchedule.night?.some((g) => g.isCurrent)) {
            setGowriTab('night');
          } else if (res.gowriPanchangamSchedule.day?.some((g) => g.isCurrent)) {
            setGowriTab('day');
          } else {
            const currentHour = parseInt((targetTime || '').split(':')[0], 10);
            setGowriTab(!isNaN(currentHour) && (currentHour >= 18 || currentHour < 6) ? 'night' : 'day');
          }
        }
      } catch (err) {
        console.error('Failed to load Daily Panchangam:', err);
        setError(
          isTa
            ? 'பஞ்சாங்கம் தரவு பெற முடியவில்லை. சிறிது நேரம் கழித்து மீண்டும் முயற்சிக்கவும்.'
            : 'Failed to load panchangam details. Please try again.'
        );
      } finally {
        setLoading(false);
      }
    },
    [currentLang, isTa]
  );

  // Keep Gowri tab in sync whenever data changes
  useEffect(() => {
    if (data?.gowriPanchangamSchedule) {
      if (data.gowriPanchangamSchedule.activePeriod) {
        setGowriTab(data.gowriPanchangamSchedule.activePeriod);
      } else if (data.gowriPanchangamSchedule.night?.some((g) => g.isCurrent)) {
        setGowriTab('night');
      } else if (data.gowriPanchangamSchedule.day?.some((g) => g.isCurrent)) {
        setGowriTab('day');
      }
    }
  }, [data]);

  // Explicit Submit calculation handler
  const handleSubmit = useCallback(
    (e) => {
      if (e && e.preventDefault) e.preventDefault();
      setIsPlaceDropdownOpen(false);

      const targetCity = {
        name: inputPlace?.trim() || selectedCity.name,
        lat: inputLat !== undefined ? Number(inputLat) : selectedCity.lat,
        lng: inputLng !== undefined ? Number(inputLng) : selectedCity.lng
      };

      fetchPanchangam(date, time, targetCity, ayanamsa);
    },
    [date, time, inputPlace, selectedCity, inputLat, inputLng, ayanamsa, fetchPanchangam]
  );

  const getSubmitButtonLabel = useCallback(() => {
    if (loading) {
      if (currentLang === 'ta') return 'பஞ்சாங்கம் கணக்கிடப்படுகிறது...';
      if (currentLang === 'hi') return 'पंचांग गणना हो रही है...';
      if (currentLang === 'te') return 'పంచాంగం లెక్కించబడుతోంది...';
      if (currentLang === 'kn') return 'ಪಂಚಾಂಗ ಲೆಕ್ಕಹಾಕಲಾಗುತ್ತಿದೆ...';
      if (currentLang === 'ml') return 'പഞ്ചാംഗം കണക്കാക്കുന്നു...';
      return 'Calculating Panchangam...';
    }
    if (currentLang === 'ta') return 'பஞ்சாங்கம் விவரங்களைக் காண்க';
    if (currentLang === 'hi') return 'पंचांग विवरण देखें';
    if (currentLang === 'te') return 'పంచాంగ వివరాలు చూడండి';
    if (currentLang === 'kn') return 'ಪಂಚಾಂಗ ವಿವರಗಳನ್ನು ನೋಡಿ';
    if (currentLang === 'ml') return 'പഞ്ചാംഗ വിവരങ്ങൾ കാണുക';
    return 'View Panchangam Details';
  }, [loading, currentLang]);

  // Initial load on mount & re-fetch when active language changes
  useEffect(() => {
    fetchPanchangam(date, time, selectedCity, ayanamsa);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLang]);

  // Live seconds clock ticker
  useEffect(() => {
    if (!isLiveClock) return;
    const interval = setInterval(() => {
      const nowStr = getNowTimeStr();
      setTime(nowStr);
    }, 1000);
    return () => clearInterval(interval);
  }, [isLiveClock]);

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
  const handleSelectPlace = useCallback(
    (item) => {
      const cityName = item.city || item.description?.split(',')[0] || item.formattedAddress;
      setInputPlace(cityName);
      setSelectedPlaceName(cityName);
      const newLat = item.lat !== undefined ? Number(item.lat) : inputLat;
      const newLng = item.lng !== undefined ? Number(item.lng) : inputLng;
      if (item.lat !== undefined && item.lng !== undefined) {
        setInputLat(newLat);
        setInputLng(newLng);
      }
      const updatedCity = {
        name: cityName,
        lat: newLat,
        lng: newLng,
        formattedAddress: item.formattedAddress || item.description || cityName
      };
      setSelectedCity(updatedCity);
      saveCityPreference(updatedCity);
      setIsPlaceDropdownOpen(false);
      setPlaceSuggestions([]);
      fetchPanchangam(date, time, updatedCity, ayanamsa);
    },
    [date, time, inputLat, inputLng, ayanamsa, fetchPanchangam]
  );

  // Device GPS Location detection handler
  const handleDetectCurrentLocation = useCallback(() => {
    if (!('geolocation' in navigator)) {
      alert(isTa ? 'உங்கள் உலாவியில் GPS வசதி இல்லை.' : 'Geolocation is not supported by your browser.');
      return;
    }

    setIsDetectingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = parseFloat(position.coords.latitude.toFixed(4));
        const lng = parseFloat(position.coords.longitude.toFixed(4));
        setInputLat(lat);
        setInputLng(lng);

        let detectedCity = 'My Location';
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=12`
          );
          const geoData = await res.json();
          detectedCity =
            geoData.address?.city ||
            geoData.address?.town ||
            geoData.address?.village ||
            geoData.address?.county ||
            (isTa ? 'என் இருப்பிடம்' : 'My Location');
        } catch {
          detectedCity = isTa ? 'என் இருப்பிடம்' : 'My Location';
        }
        setInputPlace(detectedCity);
        setSelectedPlaceName(detectedCity);
        const updatedCity = { name: detectedCity, lat, lng };
        setSelectedCity(updatedCity);
        saveCityPreference(updatedCity);
        setIsDetectingLocation(false);
        fetchPanchangam(date, time, updatedCity, ayanamsa);
      },
      (err) => {
        console.warn('Geolocation error:', err);
        setIsDetectingLocation(false);
        alert(
          isTa
            ? 'இருப்பிடத்தை அணுக முடியவில்லை. உலாவியில் GPS அனுமதியை சரிபார்க்கவும்.'
            : 'Unable to access your location. Please check browser GPS permissions.'
        );
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  }, [date, time, ayanamsa, isTa, fetchPanchangam]);

  // Quick Date Navigation
  const handleShiftDate = useCallback(
    (days) => {
      setIsLiveClock(false);
      const [y, m, d] = date.split('-').map(Number);
      const dateObj = new Date(y, m - 1, d);
      dateObj.setDate(dateObj.getDate() + days);
      const newY = dateObj.getFullYear();
      const newM = String(dateObj.getMonth() + 1).padStart(2, '0');
      const newD = String(dateObj.getDate()).padStart(2, '0');
      const newDateStr = `${newY}-${newM}-${newD}`;
      setDate(newDateStr);
      fetchPanchangam(newDateStr, time, selectedCity, ayanamsa);
    },
    [date, time, selectedCity, ayanamsa, fetchPanchangam]
  );

  const handleResetToday = useCallback(() => {
    setIsLiveClock(true);
    const todayStr = getTodayDateStr();
    const nowStr = getNowTimeStr();
    setDate(todayStr);
    setTime(nowStr);
    fetchPanchangam(todayStr, nowStr, selectedCity, ayanamsa);
  }, [selectedCity, ayanamsa, fetchPanchangam]);

  // Jump to specific Subha Muhurtham date
  const handleSelectMuhurthamDate = useCallback(
    (targetDateStr) => {
      if (!targetDateStr || targetDateStr === date) return;
      setIsLiveClock(false);
      setDate(targetDateStr);
      fetchPanchangam(targetDateStr, time, selectedCity, ayanamsa);
      window.scrollTo({ top: 380, behavior: 'smooth' });
    },
    [date, time, selectedCity, ayanamsa, fetchPanchangam]
  );

  // Copy Panchangam Summary
  const handleCopySummary = useCallback(() => {
    if (!data) return;
    const summaryLines = [
      `🌟 ${isTa ? 'இன்றைய திருக்கணித பஞ்சாங்கம்' : 'Daily Thirukanitha Panchangam'} - ${data.meta?.date}`,
      `📍 ${data.meta?.placeName} (${data.meta?.time}) [${Number(data.meta?.latitude).toFixed(4)}°N, ${Number(data.meta?.longitude).toFixed(4)}°E]`,
      `📅 ${isTa ? (data.tamilCalendar?.tamilDateTa || data.tamilCalendar?.tamilDate) : (data.tamilCalendar?.tamilDateEn || data.tamilCalendar?.tamilDate)} (முறை: திருக்கணிதம்)`,
      `🪐 ${isTa ? 'கிழமை' : 'Day'}: ${isTa ? (data.panchaAngam?.vaaram?.nameTa || data.panchaAngam?.vaaram?.name) : (data.panchaAngam?.vaaram?.nameEn || data.panchaAngam?.vaaram?.name)}`,
      `🌕 ${isTa ? 'திதி' : 'Tithi'}: ${isTa ? (data.panchaAngam?.tithi?.nameTa || data.panchaAngam?.tithi?.name) : (data.panchaAngam?.tithi?.nameEn || data.panchaAngam?.tithi?.name)}`,
      `✨ ${isTa ? 'நட்சத்திரம்' : 'Nakshatra'}: ${isTa ? (data.panchaAngam?.nakshatra?.nameTa || data.panchaAngam?.nakshatra?.name) : (data.panchaAngam?.nakshatra?.nameEn || data.panchaAngam?.nakshatra?.name)}`,
      `🌀 ${isTa ? 'யோகம்' : 'Yoga'}: ${isTa ? (data.panchaAngam?.yoga?.dinaYoga?.nameTa || data.panchaAngam?.yoga?.dinaYoga?.name) : (data.panchaAngam?.yoga?.dinaYoga?.nameEn || data.panchaAngam?.yoga?.dinaYoga?.name)}`,
      `⏳ ${isTa ? 'கரணம்' : 'Karana'}: ${isTa ? (data.panchaAngam?.karana?.nameTa || data.panchaAngam?.karana?.name) : (data.panchaAngam?.karana?.nameEn || data.panchaAngam?.karana?.name)}`,
      `🌅 ${isTa ? 'சூரிய உதயம்' : 'Sunrise'}: ${data.astronomy?.sunrise} | 🌇 ${isTa ? 'அஸ்தமனம்' : 'Sunset'}: ${data.astronomy?.sunset}`,
      `🌟 ${isTa ? 'நல்ல நேரம்' : 'Nalla Neram'}: ${data.muhurthamAndTimings?.nallaNeram?.morning} / ${data.muhurthamAndTimings?.nallaNeram?.evening}`,
      `✨ ${isTa ? 'சுப முகூர்த்தம்' : 'Subha Muhurtham'}: ${Array.isArray(data.muhurthamAndTimings?.subhaMuhurtham) ? data.muhurthamAndTimings.subhaMuhurtham.join(', ') : (data.muhurthamAndTimings?.subhaMuhurtham || (isTa ? 'இன்று முகூர்த்த நாள் அல்ல' : 'Not a Muhurtham Day'))}`,
      `⚠️ ${isTa ? 'ராகு காலம்' : 'Rahu Kalam'}: ${data.muhurthamAndTimings?.rahuKalam}`,
      `⚠️ ${isTa ? 'எமகண்டம்' : 'Yamakandam'}: ${data.muhurthamAndTimings?.yamakandam}`,
      ...(data.muhurthamAndTimings?.tyajyam ? [
        `⚡ ${isTa ? 'தியாஜ்யம்' : 'Tyajyam'}: ${Array.isArray(data.muhurthamAndTimings.tyajyam) ? data.muhurthamAndTimings.tyajyam.join(', ') : data.muhurthamAndTimings.tyajyam}`
      ] : []),
      `⚠️ ${isTa ? 'சந்திராஷ்டமம்' : 'Chandrashtamam'}: ${isTa ? (data.chandrashtamam?.rasiNameTa || data.chandrashtamam?.rasiName) : (data.chandrashtamam?.rasiNameEn || data.chandrashtamam?.rasiName)}`
    ].join('\n');

    navigator.clipboard.writeText(summaryLines);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2500);
  }, [data, isTa]);

  const breadcrumbItems = useMemo(
    () => [
      { name: isTa ? 'முகப்பு' : 'Home', path: ROUTES.HOME },
      { name: isTa ? 'பஞ்சாங்கம்' : 'Panchangam', path: ROUTES.PANCHANGAM.DAILY },
      { name: isTa ? 'திருக்கணித பஞ்சாங்கம்' : 'Thirukanitha Panchangam', path: ROUTES.PANCHANGAM.DAILY }
    ],
    [isTa]
  );

  return (
    <>
      <SEOHead
        pageKey="daily-panchangam"
        breadcrumbs={[
          { name: 'Home', path: ROUTES.HOME },
          { name: 'Panchangam', path: ROUTES.PANCHANGAM.DAILY },
          { name: isTa ? 'இன்றைய பஞ்சாங்கம்' : 'Daily Panchangam', path: ROUTES.PANCHANGAM.DAILY }
        ]}
      />

      <Breadcrumbs items={breadcrumbItems} />

      <div className="daily-panchangam-container">
        {/* 1. HERO TITLE BANNER */}
        <PanchangHeroBanner
          isTa={isTa}
          copiedToast={copiedToast}
          onCopySummary={handleCopySummary}
        />

        {/* 2. INTERACTIVE CONTROLS CARD */}
        <PanchangControlsCard
          date={date}
          setDate={setDate}
          time={time}
          setTime={setTime}
          isLiveClock={isLiveClock}
          setIsLiveClock={setIsLiveClock}
          todayDateStr={getTodayDateStr()}
          inputPlace={inputPlace}
          setInputPlace={setInputPlace}
          inputLat={inputLat}
          inputLng={inputLng}
          setSelectedPlaceName={setSelectedPlaceName}
          placeSuggestions={placeSuggestions}
          isPlaceDropdownOpen={isPlaceDropdownOpen}
          setIsPlaceDropdownOpen={setIsPlaceDropdownOpen}
          isDetectingLocation={isDetectingLocation}
          placeAutocompleteRef={placeAutocompleteRef}
          cityInputRef={cityInputRef}
          ayanamsa={ayanamsa}
          setAyanamsa={setAyanamsa}
          loading={loading}
          isTa={isTa}
          onShiftDate={handleShiftDate}
          onResetToday={handleResetToday}
          onSelectPlace={handleSelectPlace}
          onDetectLocation={handleDetectCurrentLocation}
          onSubmit={handleSubmit}
          getSubmitButtonLabel={getSubmitButtonLabel}
        />

        {/* 3. LOADING / ERROR STATES */}
        {loading && (
          <div className="dp-loading-container">
            <div className="dp-loading-spinner" />
            <p>
              {isTa
                ? 'துல்லியமான பஞ்சாங்கம் கணிக்கப்படுகிறது...'
                : 'Calculating high-precision daily panchangam...'}
            </p>
          </div>
        )}

        {error && !loading && (
          <div className="dp-chandrashtamam-banner" style={{ borderLeftColor: '#ef4444' }}>
            <span className="dp-chandra-icon">⚠️</span>
            <div className="dp-chandra-content">
              <h3>{isTa ? 'பிழை ஏற்பட்டது' : 'Calculation Error'}</h3>
              <p className="dp-chandra-note">{error}</p>
            </div>
          </div>
        )}

        {/* 4. MAIN PANCHANGAM CONTENT */}
        {data && !loading && (
          <>
            {/* 4.1 TODAY SUMMARY HERO CARD & ASTRONOMY */}
            <PanchangDaySummaryCard data={data} isTa={isTa} />

            {/* 4.2 DETAILED PANCHANG ATTRIBUTES (12 KEY ITEMS) */}
            <PanchangDetailsCard data={data} isTa={isTa} />

            {/* 4.3 CHANDRASHTAMAM WARNING BANNER */}
            <PanchangChandrashtamamBanner data={data} isTa={isTa} />

            {/* 4.4 AUSPICIOUS VS INAUSPICIOUS TIMINGS */}
            <PanchangTimingsGrid data={data} isTa={isTa} />

            {/* 4.5 SUBHA MUHURTHAM DETAILS & MONTHLY DATES */}
            <PanchangMuhurthamSection
              data={data}
              currentDate={date}
              onSelectDate={handleSelectMuhurthamDate}
              isTa={isTa}
            />

            {/* 4.6 GOWRI PANCHANGAM TABLE (DAY & NIGHT) */}
            <PanchangGowriTable
              data={data}
              gowriTab={gowriTab}
              setGowriTab={setGowriTab}
              isTa={isTa}
            />

            {/* 4.7 24-HOUR PLANETARY HORAI TABLE */}
            <PanchangHoraiTable data={data} isTa={isTa} />
          </>
        )}
      </div>
    </>
  );
}
