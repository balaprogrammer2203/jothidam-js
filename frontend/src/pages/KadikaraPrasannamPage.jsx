import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import KadikaraChartCard from '../components/KadikaraChartCard';
import SEOHead from '../components/common/SEOHead';
import Breadcrumbs from '../components/common/Breadcrumbs';
import { calculateKadikaraPrasannam, BHAVA_PREDICTIONS } from '../utils/kadikaraPrasannam';
import { generateKundali, calculateKadikaraPrasannamApi } from '../services/api';
import horoscopeService from '../features/horoscope/services/horoscope.service';
import masterDataService from '../services/masterData.service';
import '../styles/kadikaraPrasannam.css';

// Fallback planetary positions for 04/07/2025 15:03 Chennai with rich astrological attributes
const DEFAULT_FALLBACK_RASI_GRID = [
  /* 0: Aries */[],
  /* 1: Taurus */[
    {
      name: 'Venus',
      shortNameTa: 'சுக்',
      formattedDegree: "06°30'",
      degreeInRasi: 6.5,
      rasiId: 1,
      rasiName: 'Taurus',
      rasiNameTa: 'ரிஷபம்',
      rasiAthipathi: { name: 'Venus', nameTa: 'சுக்கிரன்' },
      nakshatraId: 2,
      nakshatraName: 'Krittika',
      nakshatraNameTa: 'கார்த்திகை',
      nakshatraAthipathi: { name: 'Sun', nameTa: 'சூரியன்' },
      pada: 3,
      navamsaRasiId: 10,
      padamAthipathi: { name: 'Saturn', nameTa: 'சனி' }
    }
  ],
  /* 2: Gemini */[
    {
      name: 'Sun',
      shortNameTa: 'சூரி',
      formattedDegree: "18°35'",
      degreeInRasi: 18.5833,
      rasiId: 2,
      rasiName: 'Gemini',
      rasiNameTa: 'மிதுனம்',
      rasiAthipathi: { name: 'Mercury', nameTa: 'புதன்' },
      nakshatraId: 5,
      nakshatraName: 'Ardra',
      nakshatraNameTa: 'திருவாதிரை',
      nakshatraAthipathi: { name: 'Rahu', nameTa: 'ராகு' },
      pada: 4,
      navamsaRasiId: 11,
      padamAthipathi: { name: 'Jupiter', nameTa: 'குரு' }
    },
    {
      name: 'Jupiter',
      shortNameTa: 'குரு',
      formattedDegree: "19°50'",
      degreeInRasi: 19.8333,
      rasiId: 2,
      rasiName: 'Gemini',
      rasiNameTa: 'மிதுனம்',
      rasiAthipathi: { name: 'Mercury', nameTa: 'புதன்' },
      nakshatraId: 5,
      nakshatraName: 'Ardra',
      nakshatraNameTa: 'திருவாதிரை',
      nakshatraAthipathi: { name: 'Rahu', nameTa: 'ராகு' },
      pada: 4,
      navamsaRasiId: 11,
      padamAthipathi: { name: 'Jupiter', nameTa: 'குரு' }
    }
  ],
  /* 3: Cancer */[
    {
      name: 'Mercury',
      shortNameTa: 'புத',
      formattedDegree: "02°45'",
      degreeInRasi: 2.75,
      rasiId: 3,
      rasiName: 'Cancer',
      rasiNameTa: 'கடகம்',
      rasiAthipathi: { name: 'Moon', nameTa: 'சந்திரன்' },
      nakshatraId: 6,
      nakshatraName: 'Punarvasu',
      nakshatraNameTa: 'புனர்பூசம்',
      nakshatraAthipathi: { name: 'Jupiter', nameTa: 'குரு' },
      pada: 4,
      navamsaRasiId: 3,
      padamAthipathi: { name: 'Moon', nameTa: 'சந்திரன்' }
    }
  ],
  /* 4: Leo */[
    {
      name: 'Mars',
      shortNameTa: 'செவ்',
      formattedDegree: "14°22'",
      degreeInRasi: 14.3667,
      rasiId: 4,
      rasiName: 'Leo',
      rasiNameTa: 'சிம்மம்',
      rasiAthipathi: { name: 'Sun', nameTa: 'சூரியன்' },
      nakshatraId: 10,
      nakshatraName: 'Purva Phalguni',
      nakshatraNameTa: 'பூரம்',
      nakshatraAthipathi: { name: 'Venus', nameTa: 'சுக்கிரன்' },
      pada: 1,
      navamsaRasiId: 4,
      padamAthipathi: { name: 'Sun', nameTa: 'சூரியன்' }
    },
    {
      name: 'Ketu',
      shortNameTa: 'கேது',
      formattedDegree: "28°40'",
      degreeInRasi: 28.6667,
      rasiId: 4,
      rasiName: 'Leo',
      rasiNameTa: 'சிம்மம்',
      rasiAthipathi: { name: 'Sun', nameTa: 'சூரியன்' },
      nakshatraId: 11,
      nakshatraName: 'Uttara Phalguni',
      nakshatraNameTa: 'உத்திரம்',
      nakshatraAthipathi: { name: 'Sun', nameTa: 'சூரியன்' },
      pada: 1,
      navamsaRasiId: 8,
      padamAthipathi: { name: 'Jupiter', nameTa: 'குரு' }
    }
  ],
  /* 5: Virgo */[],
  /* 6: Libra */[
    {
      name: 'Lagna',
      shortNameTa: 'லக்',
      formattedDegree: "25°12'",
      degreeInRasi: 25.2,
      rasiId: 6,
      rasiName: 'Libra',
      rasiNameTa: 'துலாம்',
      rasiAthipathi: { name: 'Venus', nameTa: 'சுக்கிரன்' },
      nakshatraId: 15,
      nakshatraName: 'Vishakha',
      nakshatraNameTa: 'விசாகம்',
      nakshatraAthipathi: { name: 'Jupiter', nameTa: 'குரு' },
      pada: 2,
      navamsaRasiId: 1,
      padamAthipathi: { name: 'Venus', nameTa: 'சுக்கிரன்' }
    },
    {
      name: 'Moon',
      shortNameTa: 'சந்த்',
      formattedDegree: "12°14'",
      degreeInRasi: 12.2333,
      rasiId: 6,
      rasiName: 'Libra',
      rasiNameTa: 'துலாம்',
      rasiAthipathi: { name: 'Venus', nameTa: 'சுக்கிரன்' },
      nakshatraId: 14,
      nakshatraName: 'Swati',
      nakshatraNameTa: 'சுவாதி',
      nakshatraAthipathi: { name: 'Rahu', nameTa: 'ராகு' },
      pada: 2,
      navamsaRasiId: 9,
      padamAthipathi: { name: 'Saturn', nameTa: 'சனி' }
    }
  ],
  /* 7: Scorpio */[],
  /* 8: Sagittarius */[],
  /* 9: Capricorn */[],
  /* 10: Aquarius */[
    {
      name: 'Rahu',
      shortNameTa: 'ராகு',
      formattedDegree: "28°40'",
      degreeInRasi: 28.6667,
      rasiId: 10,
      rasiName: 'Aquarius',
      rasiNameTa: 'கும்பம்',
      rasiAthipathi: { name: 'Saturn', nameTa: 'சனி' },
      nakshatraId: 24,
      nakshatraName: 'Purva Bhadrapada',
      nakshatraNameTa: 'பூரட்டாதி',
      nakshatraAthipathi: { name: 'Jupiter', nameTa: 'குரு' },
      pada: 3,
      navamsaRasiId: 2,
      padamAthipathi: { name: 'Mercury', nameTa: 'புதன்' }
    }
  ],
  /* 11: Pisces */[
    {
      name: 'Saturn',
      shortNameTa: 'சனி',
      formattedDegree: "07°10'",
      degreeInRasi: 7.1667,
      rasiId: 11,
      rasiName: 'Pisces',
      rasiNameTa: 'மீனம்',
      rasiAthipathi: { name: 'Jupiter', nameTa: 'குரு' },
      nakshatraId: 25,
      nakshatraName: 'Uttara Bhadrapada',
      nakshatraNameTa: 'உத்திரட்டாதி',
      nakshatraAthipathi: { name: 'Saturn', nameTa: 'சனி' },
      pada: 2,
      navamsaRasiId: 5,
      padamAthipathi: { name: 'Mercury', nameTa: 'புதன்' },
      isRetrograde: true
    }
  ]
];

const KADIKARA_AYANAMSA_OPTIONS = [
  { value: 'lahiri', labelEn: 'Lahiri (Chitra Paksha)', labelTa: 'லாஹிரி (Lahiri)' },
  { value: 'kp_newcomb', labelEn: 'KP-Newcomb', labelTa: 'கே.பி. நியூகோம்ப் (KP-Newcomb)' },
  { value: 'kp_old', labelEn: 'K.P. Old', labelTa: 'கே.பி. பழையது (KP Old)' },
  { value: 'kp_new', labelEn: 'KP New', labelTa: 'கே.பி. புதியது (KP New)' },
  { value: 'bv_raman', labelEn: 'B.V. Raman', labelTa: 'பி.வி. ராமன் (BV Raman)' }
];

export default function KadikaraPrasannamPage() {
  const { t, i18n } = useTranslation(['astrology', 'horoscope', 'common']);
  const currentLang = i18n.language || 'ta';
  const navigate = useNavigate();

  const breadcrumbItems = [
    { label: t('common:nav.home', currentLang === 'ta' ? 'முகப்பு' : 'Home'), link: '/' },
    { label: t('astrology:kadikara.prasannam', currentLang === 'ta' ? 'பிரசன்னம்' : 'Prasannam'), link: '/kadikara-prasannam' },
    { label: t('astrology:kadikara.pageTitle', currentLang === 'ta' ? 'கடிகார பிரசன்னம்' : 'Kadikara Prasannam'), active: true }
  ];

  // Live ticking clock
  const [liveTimeStr, setLiveTimeStr] = useState('');

  // Form Inputs - Defaulting to user's screenshot context (04/07/2025 15:03 Chennai)
  const [inputDate, setInputDate] = useState(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  });

  const [inputHour, setInputHour] = useState(() => {
    const now = new Date();
    const h = now.getHours() % 12 || 12;
    return String(h);
  });

  const [inputMinute, setInputMinute] = useState(() => {
    const now = new Date();
    return String(now.getMinutes());
  });

  const [inputAmPm, setInputAmPm] = useState(() => {
    const now = new Date();
    return now.getHours() >= 12 ? 'PM' : 'AM';
  });

  const [inputPlace, setInputPlace] = useState('Chennai');
  const [inputLat, setInputLat] = useState(13.0827);
  const [inputLng, setInputLng] = useState(80.2707);
  const [inputAyanamsa, setInputAyanamsa] = useState('lahiri');
  const [selectedPlaceName, setSelectedPlaceName] = useState('Chennai');
  const [placeSuggestions, setPlaceSuggestions] = useState([]);
  const [isPlaceDropdownOpen, setIsPlaceDropdownOpen] = useState(false);
  const [isSearchingPlace, setIsSearchingPlace] = useState(false);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [calculationMode, setCalculationMode] = useState('runningHour'); // 'runningHour' matches clock face logic in screenshot

  const placeAutocompleteRef = useRef(null);

  // Calculation Results
  const [chartResult, setChartResult] = useState(null);
  const [rasiGrid, setRasiGrid] = useState(DEFAULT_FALLBACK_RASI_GRID);
  const [isLoadingChart, setIsLoadingChart] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Master DB Content State
  const [masterData, setMasterData] = useState({
    bhavas: [],
    rules: [],
    concepts: [],
    faqs: []
  });
  const [customBhavaMap, setCustomBhavaMap] = useState(null);
  const [isLoadingMasterData, setIsLoadingMasterData] = useState(false);

  const resultRef = useRef(null);

  // Load master data from DB table
  useEffect(() => {
    let isMounted = true;
    const fetchMasterData = async () => {
      try {
        setIsLoadingMasterData(true);
        const resData = await masterDataService.getKadikaraPrasannamMaster();
        if (resData && isMounted) {
          let bhavas = [];
          let rules = [];
          let concepts = [];
          let faqs = [];

          if (Array.isArray(resData)) {
            bhavas = resData.filter(i => i.category === 'bhava').sort((a, b) => (a.bhava || a.order) - (b.bhava || b.order));
            rules = resData.filter(i => i.category === 'rule').sort((a, b) => a.order - b.order);
            concepts = resData.filter(i => i.category === 'concept').sort((a, b) => a.order - b.order);
            faqs = resData.filter(i => i.category === 'faq').sort((a, b) => a.order - b.order);
          } else if (typeof resData === 'object') {
            bhavas = resData.bhavas || [];
            rules = resData.rules || [];
            concepts = resData.concepts || [];
            faqs = resData.faqs || [];
          }

          const bMap = {};
          bhavas.forEach(b => {
            bMap[b.bhava] = b;
          });

          setMasterData({ bhavas, rules, concepts, faqs });
          setCustomBhavaMap(bMap);
        }
      } catch (err) {
        console.error('Failed to load Kadikara master data:', err);
      } finally {
        if (isMounted) setIsLoadingMasterData(false);
      }
    };
    fetchMasterData();
    return () => { isMounted = false; };
  }, []);

  // Update live clock every second
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      let h = now.getHours();
      let m = now.getMinutes();
      let s = now.getSeconds();
      const ampm = h >= 12 ? 'PM' : 'AM';
      h = h % 12 || 12;
      const pad = (n) => String(n).padStart(2, '0');
      setLiveTimeStr(`${pad(h)}:${pad(m)}:${pad(s)} ${ampm}`);
    };

    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

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

  // Re-calculate when language or customBhavaMap changes
  useEffect(() => {
    performCalculation(inputDate, inputHour, inputMinute, inputAmPm, inputPlace, calculationMode, inputLat, inputLng, inputAyanamsa, customBhavaMap, currentLang);
  }, [currentLang, customBhavaMap]);

  // Place selection handler
  const handleSelectPlace = (item) => {
    const cityName = item.city || item.description?.split(',')[0] || item.formattedAddress;
    setInputPlace(cityName);
    setSelectedPlaceName(cityName);
    if (item.lat !== undefined && item.lng !== undefined) {
      setInputLat(item.lat);
      setInputLng(item.lng);
    }
    setIsPlaceDropdownOpen(false);
    setPlaceSuggestions([]);
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

        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=12`);
          const data = await res.json();
          const city = data.address?.city || data.address?.town || data.address?.village || data.address?.county || 'My Location';
          setInputPlace(city);
          setSelectedPlaceName(city);
        } catch {
          const fallback = `${lat.toFixed(2)}°, ${lng.toFixed(2)}°`;
          setInputPlace(fallback);
          setSelectedPlaceName(fallback);
        } finally {
          setIsDetectingLocation(false);
        }
      },
      (err) => {
        console.warn('Geolocation error:', err);
        setIsDetectingLocation(false);
        alert(currentLang === 'ta' ? 'இருப்பிடத்தை அணுக முடியவில்லை. உலாவியில் GPS அனுமதியை சரிபார்க்கவும்.' : 'Unable to access your location. Please check browser GPS permissions.');
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  // Set Current Time
  const handleSetCurrentTime = () => {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    setInputDate(`${yyyy}-${mm}-${dd}`);

    const h = now.getHours();
    const h12 = h % 12 || 12;
    setInputHour(String(h12));
    setInputMinute(String(now.getMinutes()));
    setInputAmPm(h >= 12 ? 'PM' : 'AM');

    performCalculation(`${yyyy}-${mm}-${dd}`, String(h12), String(now.getMinutes()), h >= 12 ? 'PM' : 'AM', inputPlace, calculationMode, inputLat, inputLng, inputAyanamsa, customBhavaMap, currentLang);
  };

  // Handle Ayanamsa Dropdown Change
  const handleAyanamsaChange = (newAyanamsa) => {
    setInputAyanamsa(newAyanamsa);
    performCalculation(inputDate, inputHour, inputMinute, inputAmPm, inputPlace, calculationMode, inputLat, inputLng, newAyanamsa, customBhavaMap, currentLang);
  };

  // Perform Calculation & Fetch Ephemeris Planets dynamically
  const performCalculation = async (
    dateVal,
    hourVal,
    minVal,
    ampmVal,
    placeVal,
    mode,
    latVal = inputLat,
    lngVal = inputLng,
    ayanamsaVal = inputAyanamsa,
    bhavasMap = customBhavaMap,
    langCode = currentLang
  ) => {
    const res = calculateKadikaraPrasannam({
      date: dateVal,
      hour: hourVal,
      minute: minVal,
      ampm: ampmVal,
      calculationMode: mode,
      lang: langCode,
      customBhavaPredictions: bhavasMap
    });

    setChartResult(res);

    // Format TOB for Ephemeris API (HH:mm:00)
    let h24 = parseInt(hourVal, 10);
    if (ampmVal.toUpperCase() === 'PM' && h24 < 12) h24 += 12;
    if (ampmVal.toUpperCase() === 'AM' && h24 === 12) h24 = 0;
    const tobFormatted = `${String(h24).padStart(2, '0')}:${String(minVal).padStart(2, '0')}:00`;

    // Attempt Ephemeris Fetch from backend API
    try {
      setIsLoadingChart(true);
      // Call dedicated Kadikara Prasannam calculate API endpoint
      const apiRes = await calculateKadikaraPrasannamApi({
        date: dateVal,
        hour: hourVal,
        minute: minVal,
        ampm: ampmVal,
        calculationMode: mode,
        placeName: placeVal || 'Chennai',
        latitude: Number(latVal) || 13.0827,
        longitude: Number(lngVal) || 80.2707,
        ayanamsa: ayanamsaVal || 'lahiri',
        lang: langCode
      });

      const resData = apiRes?.data?.data || apiRes?.data;
      const dynamicRasiGrid = resData?.rasiGrid || resData?.kundaliData?.chartData?.rasiGrid;

      if (dynamicRasiGrid && Array.isArray(dynamicRasiGrid) && dynamicRasiGrid.length === 12) {
        setRasiGrid(dynamicRasiGrid);
      }
    } catch (err) {
      console.warn('Kadikara calculate API unavailable, attempting generateKundali fallback:', err.message);
      try {
        const fallbackRes = await generateKundali({
          fullName: 'Kadikara Prasannam',
          gender: 'Male',
          dob: dateVal,
          tob: tobFormatted,
          placeName: placeVal || 'Chennai',
          latitude: Number(latVal) || 13.0827,
          longitude: Number(lngVal) || 80.2707,
          ayanamsa: ayanamsaVal || 'lahiri'
        });

        const dynamicRasiGrid = fallbackRes?.data?.chartData?.rasiGrid || fallbackRes?.data?.rasiGrid;

        if (dynamicRasiGrid && Array.isArray(dynamicRasiGrid) && dynamicRasiGrid.length === 12) {
          setRasiGrid(dynamicRasiGrid);
        }
      } catch (innerErr) {
        console.warn('Ephemeris API unavailable, using fallback planetary positions:', innerErr.message);
        if (dateVal === '2025-07-04') {
          setRasiGrid(DEFAULT_FALLBACK_RASI_GRID);
        }
      }
    } finally {
      setIsLoadingChart(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPlaceDropdownOpen(false);
    performCalculation(inputDate, inputHour, inputMinute, inputAmPm, inputPlace, calculationMode, inputLat, inputLng, inputAyanamsa, customBhavaMap, currentLang);
    if (resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Format date time string matching screenshot "04/07/2025 15:03"
  const formattedDateTimeStr = (() => {
    if (!inputDate) return '04/07/2025 15:03';
    const parts = inputDate.split('-');
    if (parts.length !== 3) return inputDate;
    const [yyyy, mm, dd] = parts;

    let h24 = parseInt(inputHour, 10);
    if (inputAmPm === 'PM' && h24 < 12) h24 += 12;
    if (inputAmPm === 'AM' && h24 === 12) h24 = 0;
    const pad = (n) => String(n).padStart(2, '0');

    return `${pad(dd)}/${pad(mm)}/${yyyy} ${pad(h24)}:${pad(inputMinute)}`;
  })();

  const toggleFaq = (idx) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <>
      {/* Enterprise SEO Meta & Structured Data */}
      <SEOHead
        pageKey="kadikaraPrasannam"
        breadcrumbs={[
          { name: t('common:nav.home', 'Home'), path: '/' },
          { name: t('astrology:kadikara.prasannam', currentLang === 'ta' ? 'பிரசன்னம்' : 'Prasannam'), path: '/kadikara-prasannam' },
          { name: t('astrology:kadikara.pageTitle', currentLang === 'ta' ? 'கடிகார பிரசன்னம்' : 'Kadikara Prasannam'), path: '/kadikara-prasannam' }
        ]}
      />

      <Breadcrumbs items={breadcrumbItems} />

      <div className="kadikara-page-container">
            {/* =========================================================================
          HERO BANNER
          ========================================================================= */}
            <section className="kadikara-hero-banner">
              <span className="kadikara-hero-icon">🕰️</span>
              <h1 className="kadikara-hero-title">{t('astrology:kadikara.pageTitle', 'கடிகார பிரசன்னம்')}</h1>
              <p className="kadikara-hero-subtitle">
                {t('astrology:kadikara.heroSubtitle', 'நீங்கள் நினைத்த காரியம் நிறைவேறுமா? தற்போதைய கடிகார மணி மற்றும் நிமிடத்தைக் கொண்டு பிரபஞ்சத்தின் விடையை நொடியில் அறியும் அற்புத பிரசன்ன முறை.')}
              </p>
            </section>

            {/* =========================================================================
          SACRED RULES WARNING BOX
          ========================================================================= */}
            <section className="kadikara-rules-box">
              <h4 className="kadikara-rules-heading">
                <span>⚠️</span> {t('astrology:kadikara.rulesHeading', 'பிரசன்னம் 100% பலிக்க 3 முக்கிய விதிகள்:')}
              </h4>
              <ul className="kadikara-rules-list">
                {masterData.rules && masterData.rules.length > 0 ? (
                  masterData.rules.map((rule, idx) => (
                    <li key={rule._id || rule.key || idx}>
                      <strong>{rule.title?.[currentLang] || rule.title?.en || rule.title?.ta}: </strong>
                      {rule.desc?.[currentLang] || rule.desc?.en || rule.desc?.ta}
                    </li>
                  ))
                ) : (
                  <>
                    <li>
                      <strong>{currentLang === 'ta' ? 'விளையாட்டுக்கு வேண்டாம்:' : 'Not for Amusement:'}</strong> {currentLang === 'ta' ? 'வெறும் பரிசோதனைக்காகவோ, விளையாட்டுக்காகவோ பார்க்கக் கூடாது. மனதில் ஆழமான குழப்பமோ அல்லது விடை தெரியாத தவிப்போ எழும்போது மட்டுமே பார்க்க வேண்டும்.' : 'Never consult for idle testing or entertainment. Only consult when there is genuine seeking in your mind.'}
                    </li>
                    <li>
                      <strong>{currentLang === 'ta' ? 'நேரத்தை ஏமாற்றக் கூடாது:' : 'Never Manipulate Time:'}</strong> {currentLang === 'ta' ? 'நல்ல நேரம் வரும் வரை காத்திருந்து கடிகாரத்தைப் பார்க்கக் கூடாது. மனதில் கேள்வி எழும் அந்தத் துல்லியமான வினாடியில் என்ன நேரமோ அதை அப்படியே பயன்படுத்த வேண்டும்.' : 'Never wait for a preferred time. Take the exact spontaneous time the thought arises.'}
                    </li>
                    <li>
                      <strong>{currentLang === 'ta' ? 'ஒரு முறை மட்டுமே:' : 'Only Once per Query:'}</strong> {currentLang === 'ta' ? 'ஒரே கேள்விக்காகத் திரும்பத் திரும்ப வெவ்வேறு நேரங்களில் பிரசன்னம் பார்க்கக் கூடாது. முதல் முறை வரும் விடையே பிரபஞ்சத்தின் இறுதியான தீர்ப்பாகும்.' : 'Do not ask repeatedly for the same question. The first answer is the cosmic decree.'}
                    </li>
                  </>
                )}
              </ul>
            </section>

            {/* =========================================================================
          INTERACTIVE TOOL SECTION
          ========================================================================= */}
            <section className="kadikara-tool-card">
              <h2 className="kadikara-tool-title">{t('astrology:kadikara.toolTitle', 'கடிகாரத்தில் தற்போதைய நேரம் என்ன?')}</h2>

              {/* Live Digital Clock */}
              <div className="kadikara-live-clock" title={t('astrology:kadikara.currentTime', 'Current Real-time Clock')}>
                {liveTimeStr || '00:00:00 AM'}
              </div>

              <form onSubmit={handleSubmit} className="kadikara-time-form">
                <div className="kadikara-selectors-row">
                  {/* Hour Selector (1-12) */}
                  <div className="kadikara-select-group">
                    <label className="kadikara-select-label">{t('astrology:kadikara.hour', 'மணி')}</label>
                    <select
                      className="kadikara-select"
                      value={inputHour}
                      onChange={(e) => {
                        const newHour = e.target.value;
                        setInputHour(newHour);
                        performCalculation(inputDate, newHour, inputMinute, inputAmPm, inputPlace, calculationMode, inputLat, inputLng, inputAyanamsa, customBhavaMap, currentLang);
                      }}
                      required
                    >
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
                        <option key={h} value={h}>
                          {String(h).padStart(2, '0')}
                        </option>
                      ))}
                    </select>
                  </div>

                  <span className="kadikara-time-colon">:</span>

                  {/* Minute Selector (0-59) */}
                  <div className="kadikara-select-group">
                    <label className="kadikara-select-label">{t('astrology:kadikara.minute', 'நிமிடம்')}</label>
                    <select
                      className="kadikara-select"
                      value={inputMinute}
                      onChange={(e) => {
                        const newMin = e.target.value;
                        setInputMinute(newMin);
                        performCalculation(inputDate, inputHour, newMin, inputAmPm, inputPlace, calculationMode, inputLat, inputLng, inputAyanamsa, customBhavaMap, currentLang);
                      }}
                      required
                    >
                      {Array.from({ length: 60 }, (_, i) => i).map((m) => (
                        <option key={m} value={m}>
                          {String(m).padStart(2, '0')}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* AM / PM Selector */}
                  <div className="kadikara-select-group">
                    <label className="kadikara-select-label">{t('astrology:kadikara.ampm', 'AM / PM')}</label>
                    <select
                      className="kadikara-select"
                      value={inputAmPm}
                      onChange={(e) => {
                        const newAmPm = e.target.value;
                        setInputAmPm(newAmPm);
                        performCalculation(inputDate, inputHour, inputMinute, newAmPm, inputPlace, calculationMode, inputLat, inputLng, inputAyanamsa, customBhavaMap, currentLang);
                      }}
                      required
                    >
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </select>
                  </div>
                </div>

                {/* Date, Ayanamsa & Place Controls */}
                <div className="kadikara-meta-inputs-row">
                  {/* Date Picker */}
                  <div className="kadikara-field-item kadikara-date-field">
                    <label className="kadikara-mini-label">📅 {t('astrology:kadikara.date', 'தேதி')}</label>
                    <input
                      type="date"
                      className="kadikara-date-input"
                      value={inputDate}
                      onChange={(e) => {
                        const newDate = e.target.value;
                        setInputDate(newDate);
                        performCalculation(newDate, inputHour, inputMinute, inputAmPm, inputPlace, calculationMode, inputLat, inputLng, inputAyanamsa, customBhavaMap, currentLang);
                      }}
                      title={t('astrology:kadikara.date', 'தேதி')}
                    />
                  </div>

                  {/* Ayanamsa Selector (Lahiri, KP-Newcomb, etc.) */}
                  <div className="kadikara-field-item kadikara-ayanamsa-field">
                    <label className="kadikara-mini-label">🪐 {t('astrology:kadikara.ayanamsa', 'அயனாம்சம்')}</label>
                    <select
                      className="kadikara-ayanamsa-select"
                      value={inputAyanamsa}
                      onChange={(e) => handleAyanamsaChange(e.target.value)}
                      title={t('astrology:kadikara.ayanamsa', 'அயனாம்சம்')}
                    >
                      {KADIKARA_AYANAMSA_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {currentLang === 'ta' ? opt.labelTa : opt.labelEn}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Place Autocomplete & GPS Detection */}
                  <div className="kadikara-field-item kadikara-place-field" ref={placeAutocompleteRef}>
                    <label className="kadikara-mini-label">📍 {t('astrology:kadikara.location', 'இடம்')}</label>
                    <div className="kadikara-place-input-group">
                      <input
                        type="text"
                        className="kadikara-place-input"
                        placeholder={t('astrology:kadikara.placePlaceholder', currentLang === 'ta' ? 'இடம் (எ.கா. Chennai, Dindigul...)' : 'Location (e.g. Chennai, Dindigul...)')}
                        value={inputPlace}
                        onChange={(e) => {
                          setInputPlace(e.target.value);
                          setSelectedPlaceName('');
                        }}
                        onFocus={() => {
                          if (placeSuggestions.length > 0) setIsPlaceDropdownOpen(true);
                        }}
                        autoComplete="off"
                        required
                      />
                      <button
                        type="button"
                        className="btn-kadikara-gps"
                        onClick={handleDetectCurrentLocation}
                        title={t('astrology:kadikara.detectLocation', 'தற்போதைய இருப்பிடம் (Detect My Location)')}
                        disabled={isDetectingLocation}
                      >
                        {isDetectingLocation ? '⏳' : '🎯'}
                      </button>
                    </div>

                    {/* Coordinates Pill */}
                    {inputLat && inputLng && (
                      <div className="kadikara-coords-badge" title="Geo Coordinates">
                        <span>🌐</span>
                        <span>{Number(inputLat).toFixed(4)}° {inputLat >= 0 ? 'N' : 'S'}, {Number(inputLng).toFixed(4)}° {inputLng >= 0 ? 'E' : 'W'}</span>
                      </div>
                    )}

                    {/* Autocomplete Suggestions Dropdown */}
                    {isPlaceDropdownOpen && placeSuggestions.length > 0 && (
                      <ul className="kadikara-suggestions-dropdown">
                        {placeSuggestions.map((item) => (
                          <li
                            key={item.placeId || `${item.lat}-${item.lng}`}
                            className="kadikara-suggestion-item"
                            onClick={() => handleSelectPlace(item)}
                          >
                            <div className="suggestion-main-info">
                              <span className="suggestion-city-name">
                                {item.city || item.description?.split(',')[0]}
                              </span>
                              <span className="suggestion-region-name">
                                {[item.district && `${item.district} Dist`, item.state, item.country]
                                  .filter(Boolean)
                                  .filter((v, i, a) => a.indexOf(v) === i)
                                  .join(', ') || item.description}
                              </span>
                            </div>
                            {item.lat !== undefined && item.lng !== undefined && (
                              <span className="suggestion-latlng-pill">
                                {Number(item.lat).toFixed(2)}°, {Number(item.lng).toFixed(2)}°
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="kadikara-actions-row">
                  <button
                    type="button"
                    className="btn-kadikara-now"
                    onClick={handleSetCurrentTime}
                  >
                    <span>⚡</span> {t('astrology:kadikara.currentTime', 'இப்போதுள்ள நேரம்')}
                  </button>
                  <button type="submit" className="btn-kadikara-calculate">
                    <span>✨</span> {t('astrology:kadikara.calculate', 'பலன் காண்க')}
                  </button>
                </div>
              </form>
            </section>

            {/* =========================================================================
          SOUTH INDIAN STYLE RASI CHART (MATCHING USER SCREENSHOT)
          ========================================================================= */}
            {chartResult && (
              <section className="kadikara-chart-card-section" ref={resultRef}>
                <KadikaraChartCard
                  chartData={chartResult}
                  rasiGrid={rasiGrid}
                  dateTimeStr={formattedDateTimeStr}
                  placeName={inputPlace || 'Chennai'}
                  ayanamsaLabel={inputAyanamsa === 'kp_newcomb' ? 'KP-Newcomb' : (inputAyanamsa === 'lahiri' ? 'Lahiri' : inputAyanamsa)}
                  title={t('astrology:kadikara.chartTitle', 'கடிகார பிரசன்னம்')}
                  lang={currentLang}
                />
              </section>
            )}

            {/* =========================================================================
          DETAILED RESULT STATS & PREDICTION CARD
          ========================================================================= */}
            {chartResult && (
              <section className="kadikara-result-container">
                <div className="res-header-strip">
                  <div className="res-title-text" style={{ color: chartResult.badgeBg }}>
                    <span>{chartResult.prediction.statusTa === 'உத்தமம்' ? '🌟' : chartResult.prediction.statusTa === 'சாதகம்' ? '⚖️' : '⚠️'}</span>
                    <span>{chartResult.prediction.titleLocalized || (currentLang === 'ta' ? chartResult.prediction.titleTa : chartResult.prediction.titleEn)}</span>
                  </div>
                  <div
                    className="res-percentage-pill"
                    style={{
                      backgroundColor: chartResult.badgeBg,
                      color: chartResult.badgeText
                    }}
                  >
                    {t('astrology:kadikara.winProbability', 'வெற்றி வாய்ப்பு')}: {chartResult.prediction.percentage}%
                  </div>
                </div>

                {/* Summary Grid */}
                <div className="res-summary-grid">
                  <div className="res-summary-card">
                    <div className="res-summary-lbl">{t('astrology:kadikara.udhayamHour', 'உதயம் (Hour)')}</div>
                    <div className="res-summary-val" style={{ color: '#dc2626' }}>
                      {chartResult.udhayamRasiNameLocalized || (currentLang === 'ta' ? chartResult.udhayamRasi.nameTa : chartResult.udhayamRasi.nameEn)} {chartResult.udhayamFormattedDegree ? `(${chartResult.udhayamFormattedDegree})` : ''}
                    </div>
                    <div className="res-summary-sub">
                      {t('astrology:kadikara.lord', 'அதிபதி')}: {chartResult.udhayamRasiLordLocalized || (currentLang === 'ta' ? chartResult.udhayamRasi.lordTa : chartResult.udhayamRasi.lordEn)}
                    </div>
                  </div>

                  <div className="res-summary-card">
                    <div className="res-summary-lbl">{t('astrology:kadikara.aarudamMinute', 'ஆரூடம் (Minute)')}</div>
                    <div className="res-summary-val" style={{ color: '#dc2626' }}>
                      {chartResult.aarudamRasiNameLocalized || (currentLang === 'ta' ? chartResult.aarudamRasi.nameTa : chartResult.aarudamRasi.nameEn)} {chartResult.aarudamFormattedDegree ? `(${chartResult.aarudamFormattedDegree})` : ''}
                    </div>
                    <div className="res-summary-sub">
                      {t('astrology:kadikara.lord', 'அதிபதி')}: {chartResult.aarudamRasiLordLocalized || (currentLang === 'ta' ? chartResult.aarudamRasi.lordTa : chartResult.aarudamRasi.lordEn)}
                    </div>
                  </div>

                  <div className="res-summary-card">
                    <div className="res-summary-lbl">{t('astrology:kadikara.bhavaDistance', 'பாவக நிலை (Distance)')}</div>
                    <div className="res-summary-val">
                      {currentLang === 'en' ? `House ${chartResult.udhayamToAarudam}` : `${chartResult.udhayamToAarudam} ${t('astrology:kadikara.houseNumSuffix', '-ஆம் இடம்')}`}
                    </div>
                    <div className="res-summary-sub">
                      {t('astrology:kadikara.udhayamAarudamFormula', 'உத->ஆரு=')}{chartResult.udhayamToAarudam} | {t('astrology:kadikara.aarudamUdhayamFormula', 'ஆரு->உத=')}{chartResult.aarudamToUdhayam}
                    </div>
                  </div>

                  <div className="res-summary-card">
                    <div className="res-summary-lbl">{t('astrology:kadikara.actionStatus', 'காரிய நிலை')}</div>
                    <div className="res-summary-val">
                      {chartResult.statusLocalized || (currentLang === 'en' ? chartResult.statusEn : chartResult.statusTa)} {chartResult.statusEn && currentLang !== 'en' ? `(${chartResult.statusEn})` : ''}
                    </div>
                    <div className="res-summary-sub">
                      {(chartResult.prediction.ratingType === 'good' ||
                        chartResult.prediction.ratingType === 'excellent' ||
                        chartResult.prediction.ratingType === 'very-good') ?
                        `${chartResult.prediction.percentage}% ${t('astrology:kadikara.positiveOutcome', 'சாதகமான பலன்')}` :
                        (chartResult.prediction.ratingType === 'hard' ||
                          chartResult.prediction.ratingType === 'delay') ?
                          t('astrology:kadikara.effortNeeded', 'முயற்சி தேவை') :
                          t('astrology:kadikara.beCareful', 'கவனமாக இருக்க வேண்டும்')
                      }
                    </div>
                  </div>
                </div>

                {/* Description Box */}
                <div className={`res-description-box ${chartResult.prediction.ratingType}`}>
                  <strong>{t('astrology:kadikara.explanation', 'விளக்கம்:')} </strong>
                  <span>{chartResult.prediction.descLocalized || (currentLang === 'ta' ? chartResult.prediction.descTa : chartResult.prediction.descEn)}</span>
                </div>
              </section>
            )}

            {/* =========================================================================
          SYNCHRONICITY & HOW IT WORKS ARTICLE
          ========================================================================= */}
            <section className="kadikara-article-section">
              <h2>
                <span>⚙️</span> {masterData.concepts[0]?.title?.[currentLang] || masterData.concepts[0]?.title?.en || t('astrology:kadikara.howItWorksTitle')}
              </h2>
              <p>
                {masterData.concepts[0]?.desc?.[currentLang] || masterData.concepts[0]?.content?.[currentLang] || t('astrology:kadikara.howItWorksIntro')}
              </p>

              <div className="synchronicity-box">
                <span className="synchronicity-badge">
                  {masterData.concepts[1]?.metadata?.badge?.[currentLang] || t('astrology:kadikara.synchronicityBadge')}
                </span>
                <h4>
                  ⚛️ {masterData.concepts[1]?.title?.[currentLang] || masterData.concepts[1]?.title?.en || t('astrology:kadikara.synchronicityTitle')}
                </h4>
                <p>
                  {(() => {
                    const p1 = masterData.concepts[1]?.desc?.[currentLang] || masterData.concepts[1]?.content?.[currentLang] || t('astrology:kadikara.synchronicityPara1');
                    const p2 = masterData.concepts[1]?.metadata?.conclusion?.[currentLang] || t('astrology:kadikara.synchronicityPara2');
                    if (p1 && p2 && !p1.includes(p2)) {
                      return `${p1} ${p2}`;
                    }
                    return p1 || p2 || '';
                  })()}
                </p>
              </div>
            </section>

            {/* =========================================================================
          12 BHAVAS COMPLETE PREDICTION GUIDE
          ========================================================================= */}
            <section className="kadikara-article-section">
              <h2>
                <span>📊</span> {t('astrology:kadikara.bhavasGuideTitle', '2. 12 பாவங்களின் முழுமையான பலன்கள் வழிகாட்டி')}
              </h2>
              <p>
                {t('astrology:kadikara.bhavasGuideSubtitle', 'உதய ராசியிலிருந்து ஆரூடம் விழுந்த இடம் எத்தனையாவது பாவகம் என்பதை வைத்தே 12 விதமான ஆழமான பலன்கள் கணிக்கப்படுகின்றன:')}
              </p>

              <div className="bhavas-guide-grid">
                {(masterData.bhavas && masterData.bhavas.length > 0 ? masterData.bhavas : Object.values(BHAVA_PREDICTIONS)).map((item) => {
                  const bNum = item.bhava;
                  const bTitle = item.title?.[currentLang] || item.title?.en || item.title?.ta || item.titleTa || item.titleEn;
                  const bDesc = item.desc?.[currentLang] || item.desc?.en || item.desc?.ta || item.descTa || item.descEn;
                  const bBadgeBg = item.badgeBg || '#10b981';
                  const bBadgeColor = item.badgeColor || '#ffffff';

                  return (
                    <div key={bNum} className="bhava-item-card">
                      <div className="bhava-card-top">
                        <span className="bhava-num-badge">
                          {currentLang === 'en' ? `House ${bNum}` : `${bNum} ${t('astrology:kadikara.houseNumSuffix', '-ஆம் இடம்')}`}
                        </span>
                        <span
                          className="bhava-pct-badge"
                          style={{
                            backgroundColor: bBadgeBg,
                            color: bBadgeColor
                          }}
                        >
                          {item.percentage}% {t('astrology:kadikara.success', currentLang === 'ta' ? 'வெற்றி' : 'Success')}
                        </span>
                      </div>
                      <div className="bhava-title-line">{bTitle}</div>
                      <div className="bhava-desc-line">{bDesc}</div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* =========================================================================
          FAQS ACCORDION
          ========================================================================= */}
            <section className="kadikara-article-section">
              <h2>
                <span>❓</span> {t('astrology:kadikara.faqsTitle', 'அடிக்கடி கேட்கப்படும் கேள்விகள் (FAQs)')}
              </h2>

              <div className="kadikara-faq-list">
                {(masterData.faqs && masterData.faqs.length > 0 ? masterData.faqs : [
                  {
                    question: { ta: 'கடிகார பிரசன்னம் என்றால் என்ன?', en: 'What is Kadikara Prasannam?' },
                    answer: { ta: 'ஜாதகமோ, பிறந்த தேதியோ இல்லாத நேரத்தில், சுவரில் உள்ள கடிகாரத்தின் நேரத்தை (மணி மற்றும் நிமிடம்) வைத்து ஒரு காரியத்தின் வெற்றியைத் துல்லியமாகக் கணிக்கும் ஜோதிட முறையே கடிகார பிரசன்னமாகும்.', en: 'Kadikara Prasannam is a classical horary astrology method where an outcome is predicted based on the exact hour and minute on the clock.' }
                  },
                  {
                    question: { ta: 'மணி மற்றும் நிமிடம் எதைக் குறிக்கிறது?', en: 'What do the hour and minute represent?' },
                    answer: { ta: 'மணி (Hour) என்பது "உதயம்" எனப்படும். இது 1 முதல் 12 ராசிகளைக் குறிக்கும். நிமிடம் (Minute) என்பது "ஆரூடம்" எனப்படும். 60 நிமிடங்களை 12 ராசிகளுக்கும் தலா 5 நிமிடங்களாகப் பிரித்து ஆரூடம் கணக்கிடப்படும்.', en: 'Hour represents Udhayam (Ascendant). Minute represents Aarudam. 60 minutes are divided into 12 signs of 5 minutes each.' }
                  },
                  {
                    question: { ta: 'இந்த முறையில் காரிய வெற்றி எப்படித் தீர்மானிக்கப்படுகிறது?', en: 'How is success determined?' },
                    answer: { ta: 'உதயத்திற்கும் ஆரூடத்திற்கும் உள்ள தூரத்தை (1 முதல் 12 வீடுகள்) வைத்து பலன் அறியப்படுகிறது. ஆரூடம் 1, 5, 9, 11 ஆகிய இடங்களில் வந்தால் காரியம் மாபெரும் வெற்றி பெறும். 6, 8, 10, 12-ல் வந்தால் தாமதமும் தடையும் ஏற்படும்.', en: 'Success is judged by the distance from Udhayam to Aarudam (houses 1-12). 1, 3, 5, 9, 11 yield high success, while 6, 8, 10, 12 indicate obstacles or delay.' }
                  },
                  {
                    question: { ta: 'கடிகார பிரசன்னத்தை எப்போதெல்லாம் பார்க்கலாம்?', en: 'When should one consult Kadikara Prasannam?' },
                    answer: { ta: 'மனதில் ஒரு கேள்வி அல்லது குழப்பம் தோன்றும் அந்தத் துல்லியமான வினாடியில், தன்னிச்சையாக கடிகாரத்தைப் பார்த்து இதைப் பயன்படுத்த வேண்டும். வேண்டும் என்றே நேரம் பார்த்துப் பயன்படுத்தினால் பலன் தப்பக் கூடும்.', en: 'It should be used at the spontaneous moment an earnest question arises in your mind. Choosing favorable times deliberately defeats the cosmic principle.' }
                  }
                ]).map((faq, idx) => {
                  const qText = faq.question?.[currentLang] || faq.question?.ta || faq.question?.en || faq.q || '';
                  const aText = faq.answer?.[currentLang] || faq.answer?.ta || faq.answer?.en || faq.a || '';
                  const isOpen = openFaqIndex === idx;

                  return (
                    <div key={idx} className="kadikara-faq-item">
                      <div
                        className="kadikara-faq-question"
                        onClick={() => toggleFaq(idx)}
                      >
                        <span>{qText}</span>
                        <span>{isOpen ? '▲' : '▼'}</span>
                      </div>
                      {isOpen && (
                        <div className="kadikara-faq-answer">
                          <p>{aText}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
    </>
  );
}
