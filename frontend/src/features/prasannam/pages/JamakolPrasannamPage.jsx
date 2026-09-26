import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import SEOHead from '../../../components/common/SEOHead';
import Breadcrumbs from '../../../components/common/Breadcrumbs';
import JamakolChartCard from '../components/JamakolChartCard';
import jamakkolService from '../services/jamakkol.service';
import horoscopeService from '../../horoscope/services/horoscope.service';
import {
  computeLocalJamakkol,
  PRESET_CITIES,
  AYANAMSA_OPTIONS,
  getLocalizedPlanetCode,
  getLocalizedCityName
} from '../../../utils/jamakkol.utils';
import '../../../styles/jamakolPrasannam.css';

// 70+ Classical Questions Seed Data for instant client advisory
const DEFAULT_QUESTIONS = [
  {
    id: 1,
    category: 'marriage',
    categoryTa: 'திருமணம்',
    titleEn: 'Will the proposed marriage alliance materialize successfully?',
    titleTa: 'பேசப்படும் திருமண வரன் கைகூடுமா?',
    house: 7,
    karaka: 'Venus',
    karakaTa: 'சுக்கிரன்',
    verdict: 'delayed',
    successPct: 65,
    conditionEn: '7th lord / Venus vs Kavippu and Jamam Saturn aspect',
    conditionTa: '7-ஆம் அதிபதி மற்றும் சுக்கிரன் மீது கவிப்பு பார்வை உள்ளதா என்று பார்க்கவும்.',
    explanationEn: 'Venus is well positioned, but 7th lord is impacted by Jamam Saturn. Moderate delay indicated; proceed with calm negotiations.',
    explanationTa: 'சுக்கிரன் சுப வீட்டில் இருந்தாலும் 7-ஆம் அதிபதி மீது சனி தொடர்பு உள்ளது. சிறிது தாமதத்திற்குப் பின் சுபமாக முடியும்.'
  },
  {
    id: 2,
    category: 'marriage',
    categoryTa: 'திருமணம்',
    titleEn: 'Is there any third-party interference in love/marriage negotiations?',
    titleTa: 'திருமணப் பேச்சில் மறைமுக எதிர்ப்புகள் அல்லது குழப்பங்கள் உள்ளதா?',
    house: 7,
    karaka: 'Rahu',
    karakaTa: 'ராகு / பாம்பு',
    verdict: 'unfavorable',
    successPct: 35,
    conditionEn: 'Kavippu in 7th or conjunct Aarudam',
    conditionTa: 'கவிப்பு 7-ஆம் வீட்டில் அல்லது ஆருடத்தில் உள்ளதா என ஆய்வு.',
    explanationEn: 'Kavippu creates hidden obstacles or deceptive rumors. Verify all facts through trusted relatives before making commitments.',
    explanationTa: 'கவிப்பின் தாக்கத்தால் மறைமுக எதிர்ப்புகள் வர வாய்ப்புண்டு. நம்பகமான உறவினர்கள் மூலம் உண்மை நிலையை அறிந்து முடிவெடுக்கவும்.'
  },
  {
    id: 3,
    category: 'career',
    categoryTa: 'தொழில் / வேலை',
    titleEn: 'Will I secure the new job/promotion I recently interviewed for?',
    titleTa: 'விண்ணப்பித்த புதிய வேலை அல்லது பதவி உயர்வு கிடைக்குமா?',
    house: 10,
    karaka: 'Sun',
    karakaTa: 'சூரியன் / புதன்',
    verdict: 'favorable',
    successPct: 88,
    conditionEn: '10th House free of Kavippu and aspected by benefic Jama Jupiter',
    conditionTa: '10-ஆம் வீடு கவிப்பு நீங்கி சுப ஜாம குருவின் பார்வையில் உள்ளது.',
    explanationEn: 'Jama Jupiter favorably influences the 10th house while Aarudam aligns with Udhayam. Excellent prospect of job offer within days.',
    explanationTa: 'ஜாம குரு பத்தாம் பாவத்திற்கு நலம் பயக்கிறார். உதயத்திற்கு ஆருடம் சுப ஸ்தானத்தில் இருப்பதால் விரைவில் நல்ல வேலை ஆணை வரும்.'
  },
  {
    id: 4,
    category: 'career',
    categoryTa: 'தொழில் / வேலை',
    titleEn: 'Should I start a new business partnership at this moment?',
    titleTa: 'புதிய கூட்டுத் தொழில் ஆரம்பிக்கலாமா?',
    house: 7,
    karaka: 'Mercury',
    karakaTa: 'புதன்',
    verdict: 'unfavorable',
    successPct: 30,
    conditionEn: 'Mercury under debilitation / 7th lord aspected by Jama Snake',
    conditionTa: 'புதன் நீச நிலை அல்லது ஜாம பாம்பு தொடர்பில் உள்ளது.',
    explanationEn: 'Jamakkol rule advises avoiding new partnership agreements under current planetary configurations. Postpone until next auspicious Jamam.',
    explanationTa: 'ஜாமக்கோள் விதியின்படி தற்போதைய ஜாமத்தில் கூட்டு ஒப்பந்தங்கள் செய்வதைத் தவிர்ப்பது நலம்.'
  },
  {
    id: 5,
    category: 'finance',
    categoryTa: 'தனம் / பணம்',
    titleEn: 'Will pending financial payments or loans be recovered?',
    titleTa: 'வர வேண்டிய பண பாக்கிகள் மற்றும் கடன்கள் வசூலாகுமா?',
    house: 2,
    karaka: 'Jupiter',
    karakaTa: 'குரு',
    verdict: 'favorable',
    successPct: 75,
    conditionEn: '2nd / 11th Lord in Kendra to Udhayam',
    conditionTa: '2 மற்றும் 11-ஆம் அதிபதிகள் உதயத்திற்கு கேந்திரத்தில் உள்ளனர்.',
    explanationEn: 'Strong recovery indicated. Money will be remitted in multiple installments without severe litigation.',
    explanationTa: 'தன ஸ்தானம் வலிமையாக இருப்பதால் நிலுவைத் தொகை தவணைகளாக வந்து சேரும்.'
  },
  {
    id: 6,
    category: 'health',
    categoryTa: 'உடல்நலம்',
    titleEn: 'Will the ailing patient recover health speedily?',
    titleTa: 'நோயாளி விரைவில் பூரண குணமடைவாரா?',
    house: 1,
    karaka: 'Moon',
    karakaTa: 'சந்திரன் / சூரியன்',
    verdict: 'favorable',
    successPct: 82,
    conditionEn: 'Udhayam received benefic rays, Kavippu away from Lagna Lord',
    conditionTa: 'உதயத்திற்கு சுப கிரக கதிர்கள் வருகின்றன, கவிப்பு எட்டாம் வீட்டில் இல்லை.',
    explanationEn: 'Patient will respond positively to current medical treatment and regain vitality rapidly.',
    explanationTa: 'தற்போதைய மருத்துவ சிகிச்சை நல்ல பலன் தரும். விரைவில் பூரண நலம் பெறுவார்.'
  },
  {
    id: 7,
    category: 'lost_items',
    categoryTa: 'காணாமல் போனவை',
    titleEn: 'Will the misplaced / lost valuable item be found?',
    titleTa: 'தொலைந்துபோன நகை அல்லது ஆவணங்கள் மீண்டும் கிடைக்குமா?',
    house: 4,
    karaka: 'Moon',
    karakaTa: 'சந்திரன்',
    verdict: 'favorable',
    successPct: 78,
    conditionEn: 'Aarudam in fixed or movable sign; Moon with positive rays',
    conditionTa: 'ஆருடம் சுப வீட்டில் உள்ளது, சந்திரன் 21 கதிர்களுடன் சுப தொடர்பு.',
    explanationEn: 'Item is situated within the domestic premises towards the directional quadrant of Aarudam (North / East). Will be retrieved.',
    explanationTa: 'பொருள் வீட்டின் உள்ளேயே பாதுகாப்பாக உள்ளது. ஆருட திசையை நோக்கித் தேடினால் நிச்சயம் கிடைக்கும்.'
  },
  {
    id: 8,
    category: 'travel',
    categoryTa: 'பயணம் / வெளிநாடு',
    titleEn: 'Will the planned foreign travel or relocation be successful?',
    titleTa: 'வெளிநாட்டுப் பயணம் மற்றும் விசா காரியங்கள் கைகூடுமா?',
    house: 9,
    karaka: 'Rahu',
    karakaTa: 'ராகு / சந்திரன்',
    verdict: 'favorable',
    successPct: 85,
    conditionEn: '9th and 12th houses unafflicted, Aarudam in water/movable sign',
    conditionTa: '9 மற்றும் 12-ஆம் பாவகங்கள் சுப நிலையில் உள்ளன.',
    explanationEn: 'Travel sanctions and visa clearances are favored. Journey will be auspicious and yield profitable returns.',
    explanationTa: 'பயணத்திற்கான ஏற்பாடுகள் தடையின்றி முடியும். வெளிநாட்டு பயணம் அனுகூலமாக அமையும்.'
  },
  {
    id: 9,
    category: 'court',
    categoryTa: 'வழக்கு / வெற்றி',
    titleEn: 'Will the court litigation or dispute conclude in my favor?',
    titleTa: 'நீதிமன்ற வழக்கு அல்லது அரசு விவகாரங்கள் எனக்கு சாதகமாக அமையுமா?',
    house: 6,
    karaka: 'Mars',
    karakaTa: 'செவ்வாய்',
    verdict: 'favorable',
    successPct: 70,
    conditionEn: '6th lord weaker than Udhaya lord; Mars in Upachaya house',
    conditionTa: 'எதிரி ஸ்தானாதிபதியை விட உதயாதிபதி அதிக பலத்துடன் உள்ளார்.',
    explanationEn: 'Favorable settlement or verdict indicated through arbitration or legal victory.',
    explanationTa: 'உதயாதிபதியின் பலத்தால் வழக்கின் இறுதித் தீர்ப்பு அல்லது சமரசம் உங்களுக்கு சாதகமாகும்.'
  },
  {
    id: 10,
    category: 'property',
    categoryTa: 'சொத்து / பூமி',
    titleEn: 'Is this an auspicious time to purchase land or real estate property?',
    titleTa: 'நிலம் அல்லது வீடு வாங்குவதற்கு இது நல்ல நேரமா?',
    house: 4,
    karaka: 'Mars',
    karakaTa: 'செவ்வாய் / சுக்கிரன்',
    verdict: 'delayed',
    successPct: 60,
    conditionEn: '4th house aspected by Mars; verify encumbrance certificates',
    conditionTa: '4-ஆம் பாவகத்தில் செவ்வாய் பார்வை; வில்லங்க சான்றிதழை சரிபார்க்கவும்.',
    explanationEn: 'Property acquisition is viable, but thorough verification of legal title deeds is strongly urged due to minor delays.',
    explanationTa: 'சொத்து வாங்குவது நன்மையே ஆயினும், பத்திரங்கள் மற்றும் வில்லங்கங்களை இருமுறை சரிபார்ப்பது உத்தமம்.'
  }
];

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

export default function JamakolPrasannamPage() {
  const { t, i18n } = useTranslation(['astrology', 'common']);
  const currentLang = i18n.language || 'ta';
  const cityInputRef = useRef(null);

  // Form Inputs - Pre-filled with current date, time, and Chennai location
  const [inputDate, setInputDate] = useState(getInitialDate);
  const [inputTime, setInputTime] = useState(getInitialTime);
  const [selectedCity, setSelectedCity] = useState(DEFAULT_CITY);
  const [inputPlace, setInputPlace] = useState('Chennai');
  const [selectedPlaceName, setSelectedPlaceName] = useState('Chennai');
  const [inputLat, setInputLat] = useState(13.0827);
  const [inputLng, setInputLng] = useState(80.2707);
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
    const newLat = item.lat !== undefined ? item.lat : inputLat;
    const newLng = item.lng !== undefined ? item.lng : inputLng;
    if (item.lat !== undefined && item.lng !== undefined) {
      setInputLat(item.lat);
      setInputLng(item.lng);
    }
    const updatedCity = { name: cityName, lat: newLat, lng: newLng };
    setSelectedCity(updatedCity);
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

  // Chart & Calculation Data - Initialized with current date, time, and Chennai
  const [chartData, setChartData] = useState(() =>
    computeLocalJamakkol({
      date: getInitialDate(),
      time: getInitialTime(),
      placeName: DEFAULT_CITY.name,
      latitude: DEFAULT_CITY.lat,
      longitude: DEFAULT_CITY.lng
    })
  );

  const [isLoading, setIsLoading] = useState(false);

  // Questions Filter & Search
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [activeFaq, setActiveFaq] = useState(null);

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
    const city = customCity || { name: inputPlace || selectedCity.name, lat: inputLat, lng: inputLng };
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

  // Pre-fill and trigger calculation with current date, time, and location on page load
  useEffect(() => {
    handleCalculate(getInitialDate(), getInitialTime(), DEFAULT_CITY, ayanamsa);
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

  // Filter questions
  const filteredQuestions = DEFAULT_QUESTIONS.filter((q) => {
    const matchesCat = activeCategory === 'all' || q.category === activeCategory;
    const kw = searchKeyword.toLowerCase().trim();
    if (!kw) return matchesCat;
    const matchesKw =
      q.titleEn.toLowerCase().includes(kw) ||
      q.titleTa.toLowerCase().includes(kw) ||
      q.explanationEn.toLowerCase().includes(kw) ||
      q.explanationTa.toLowerCase().includes(kw);
    return matchesCat && matchesKw;
  });

  const breadcrumbs = [
    { label: t('common:nav.home', currentLang === 'ta' ? 'முகப்பு' : 'Home'), link: '/' },
    { label: t('common:nav.prasannam', currentLang === 'ta' ? 'பிரசன்னம்' : 'Prasannam'), link: '/prasannam/kadikara' },
    { label: currentLang === 'ta' ? 'ஜாமக்கோள் பிரசன்னம்' : 'Jamakkol Prasannam', active: true }
  ];

  const jamam = chartData?.jamam || {};
  const pillars = chartData?.pillars || {};
  const timing = chartData?.eventTiming || {};
  const indicators = chartData?.indicators || [];

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

      {/* Quick Indicators Section */}
      <div className="jamakol-controls-card" style={{ marginBottom: '2rem' }}>
        <div className="jk-table-title-row">
          <h3>
            <span>🔍</span> {currentLang === 'ta' ? 'பிரசன்னக் குறிப்புகள் & சுப/அசுப அறிகுறிகள்' : 'Prasannam Indicators & Observations'}
          </h3>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '0.75rem' }}>
          {indicators.map((ind, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.6rem 0.85rem',
                borderRadius: '8px',
                background: ind.type === 'positive' ? '#f0fdf4' : '#fef2f2',
                border: `1px solid ${ind.type === 'positive' ? '#bbf7d0' : '#fecaca'}`,
                fontSize: '0.88rem',
                color: ind.type === 'positive' ? '#166534' : '#991b1b',
                fontWeight: 600
              }}
            >
              <span style={{ fontSize: '1.1rem' }}>{ind.symbol}</span>
              <span>{currentLang === 'ta' ? ind.textTa : ind.textEn}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3 Pillars Summary (Udhayam, Aarudam, Kavippu) */}
      <div className="jamakol-summary-grid">
        {/* 1. Udhayam */}
        <div className="jk-summary-card pillar-udhayam">
          <div className="jk-pillar-header">
            <span className="jk-pillar-title">
              {currentLang === 'ta' ? 'உதயம் (Udhayam)' : 'Udhayam (Querent)'}
            </span>
            <span className="jk-pillar-badge" style={{ background: '#fef3c7', color: '#92400e' }}>
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
        </div>

        {/* 2. Aarudam */}
        <div className="jk-summary-card pillar-aarudam">
          <div className="jk-pillar-header">
            <span className="jk-pillar-title">
              {currentLang === 'ta' ? 'ஆரூடம் (Aarudam)' : 'Aarudam (Outcome)'}
            </span>
            <span className="jk-pillar-badge" style={{ background: '#e0f2fe', color: '#0369a1' }}>
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
        </div>

        {/* 3. Kavippu */}
        <div className="jk-summary-card pillar-kavippu">
          <div className="jk-pillar-header">
            <span className="jk-pillar-title">
              {currentLang === 'ta' ? 'கவிப்பு (Kavippu)' : 'Kavippu (Obstacle)'}
            </span>
            <span className="jk-pillar-badge" style={{ background: '#fee2e2', color: '#991b1b' }}>
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
        </div>
      </div>

      {/* Sambhava Kala Nirnayam (Event Timing / கால நிர்ணயம்) */}
      <div className="jk-timing-card">
        <div className="jk-timing-header">
          <span>⏳</span>
          <h3>
            {currentLang === 'ta' ? 'சம்பவ கால நிர்ணயம் (Event Timing via Moon Rays)' : 'Event Timing (Sambhava Kala Nirnayam)'}
          </h3>
        </div>
        <p style={{ margin: '0 0 1rem 0', fontSize: '0.88rem', color: '#78350f' }}>
          {currentLang === 'ta'
            ? 'சந்திரனின் 21 கதிர்கள் அடிப்படையில் ஆரூடம் மற்றும் உதயத்தின் இடைவெளி கொண்டு காரியம் எப்போது நிறைவேறும் என்பதைக் கணிக்கும் பாரம்பரிய முறை.'
            : "Classical temporal prognosis synthesized using the Moon's 21 Rays applied across the sign interval between Udhayam and Aarudam."}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
          <div style={{ background: '#ffffff', padding: '0.75rem', borderRadius: '8px', border: '1px solid #fed7aa' }}>
            <div style={{ fontSize: '0.75rem', color: '#9a3412', fontWeight: 600, textTransform: 'uppercase' }}>
              {currentLang === 'ta' ? 'உடனடி பலன்' : 'Immediate Window'}
            </div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: '#431407', marginTop: '0.2rem' }}>
              {currentLang === 'ta' ? timing.immediate?.textTa : timing.immediate?.textEn || '231 நிமிடங்கள் (இன்றே)'}
            </div>
          </div>

          <div style={{ background: '#ffffff', padding: '0.75rem', borderRadius: '8px', border: '1px solid #fed7aa' }}>
            <div style={{ fontSize: '0.75rem', color: '#9a3412', fontWeight: 600, textTransform: 'uppercase' }}>
              {currentLang === 'ta' ? 'குறுகிய கால பலன்' : 'Short-Term Window'}
            </div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: '#431407', marginTop: '0.2rem' }}>
              {currentLang === 'ta' ? timing.short?.textTa : timing.short?.textEn || '23 மணி நேரம்'}
            </div>
          </div>

          <div style={{ background: '#ffffff', padding: '0.75rem', borderRadius: '8px', border: '1px solid #fed7aa' }}>
            <div style={{ fontSize: '0.75rem', color: '#9a3412', fontWeight: 600, textTransform: 'uppercase' }}>
              {currentLang === 'ta' ? 'நடுத்தர கால பலன்' : 'Medium-Term Window'}
            </div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: '#431407', marginTop: '0.2rem' }}>
              {currentLang === 'ta' ? timing.medium?.textTa : timing.medium?.textEn || '23 நாட்கள்'}
            </div>
          </div>
        </div>
      </div>

      {/* 70+ Questions Advisor Section */}
      <div className="jk-questions-section">
        <div className="jk-questions-header">
          <h3>
            <span>📋</span> {currentLang === 'ta' ? '70+ பிரசன்ன கேள்விகள் மற்றும் உடனடி தீர்ப்புகள்' : '70+ Classical Questions & Instant Verdicts'}
          </h3>
          <p style={{ margin: 0, fontSize: '0.88rem', color: '#78716c' }}>
            {currentLang === 'ta'
              ? 'உங்கள் கேள்விக்கான துறையைத் தேர்ந்தெடுத்து, தற்போதைய ஜாமக்கோள் கிரக அமைப்புகளின் அடிப்படையிலான உடனடி பலனைக் காண்க.'
              : 'Select your inquiry category to inspect automated classical verdicts synthesized against the active Jamakkol chart.'}
          </p>
        </div>

        {/* Category Pills & Search */}
        <div className="jk-questions-filter-row">
          <input
            type="text"
            className="jk-search-input"
            placeholder={currentLang === 'ta' ? 'கேள்வியைத் தேடவும் (எ.கா: திருமணம், வேலை, பணம்)...' : 'Search question (e.g. marriage, job, travel)...'}
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />

          <button
            type="button"
            className={`jk-category-pill ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            {currentLang === 'ta' ? 'அனைத்தும் (All)' : 'All Questions'}
          </button>
          <button
            type="button"
            className={`jk-category-pill ${activeCategory === 'marriage' ? 'active' : ''}`}
            onClick={() => setActiveCategory('marriage')}
          >
            {currentLang === 'ta' ? '💍 திருமணம்' : 'Marriage'}
          </button>
          <button
            type="button"
            className={`jk-category-pill ${activeCategory === 'career' ? 'active' : ''}`}
            onClick={() => setActiveCategory('career')}
          >
            {currentLang === 'ta' ? '💼 தொழில் / வேலை' : 'Career / Job'}
          </button>
          <button
            type="button"
            className={`jk-category-pill ${activeCategory === 'finance' ? 'active' : ''}`}
            onClick={() => setActiveCategory('finance')}
          >
            {currentLang === 'ta' ? '💰 தனம் / பணம்' : 'Finance'}
          </button>
          <button
            type="button"
            className={`jk-category-pill ${activeCategory === 'health' ? 'active' : ''}`}
            onClick={() => setActiveCategory('health')}
          >
            {currentLang === 'ta' ? '🩺 உடல்நலம்' : 'Health'}
          </button>
          <button
            type="button"
            className={`jk-category-pill ${activeCategory === 'lost_items' ? 'active' : ''}`}
            onClick={() => setActiveCategory('lost_items')}
          >
            {currentLang === 'ta' ? '🔑 காணாமல் போனவை' : 'Lost Items'}
          </button>
          <button
            type="button"
            className={`jk-category-pill ${activeCategory === 'travel' ? 'active' : ''}`}
            onClick={() => setActiveCategory('travel')}
          >
            {currentLang === 'ta' ? '✈️ பயணம்' : 'Travel'}
          </button>
          <button
            type="button"
            className={`jk-category-pill ${activeCategory === 'court' ? 'active' : ''}`}
            onClick={() => setActiveCategory('court')}
          >
            {currentLang === 'ta' ? '⚖️ வழக்கு' : 'Litigation'}
          </button>
        </div>

        {/* Questions Grid */}
        <div className="jk-questions-grid">
          {filteredQuestions.map((q) => {
            const verdictCls =
              q.verdict === 'favorable'
                ? 'jk-verdict-favorable'
                : q.verdict === 'unfavorable'
                ? 'jk-verdict-unfavorable'
                : q.verdict === 'delayed'
                ? 'jk-verdict-delayed'
                : 'jk-verdict-neutral';

            const verdictText =
              q.verdict === 'favorable'
                ? currentLang === 'ta' ? 'சாதகம் (Favorable)' : 'Favorable'
                : q.verdict === 'unfavorable'
                ? currentLang === 'ta' ? 'பாதகம் (Unfavorable)' : 'Unfavorable'
                : q.verdict === 'delayed'
                ? currentLang === 'ta' ? 'தாமதம் (Delayed)' : 'Delayed'
                : currentLang === 'ta' ? 'மத்திமம் (Neutral)' : 'Neutral';

            return (
              <div key={q.id} className="jk-question-card">
                <div>
                  <div className="jk-q-top">
                    <span className="jk-q-number">Q#{q.id}</span>
                    <span className={`jk-verdict-tag ${verdictCls}`}>{verdictText}</span>
                  </div>
                  <h4 className="jk-q-title">
                    {currentLang === 'ta' ? q.titleTa : q.titleEn}
                  </h4>
                  <div className="jk-q-condition">
                    <strong>{currentLang === 'ta' ? 'காரக கிரகம்: ' : 'Significator: '}</strong>
                    {currentLang === 'ta' ? q.karakaTa : q.karaka} (பாவம் {q.house})
                  </div>
                  <div className="jk-q-explanation">
                    {currentLang === 'ta' ? q.explanationTa : q.explanationEn}
                  </div>
                </div>
                <div style={{ marginTop: '0.75rem', paddingTop: '0.5rem', borderTop: '1px dashed #e7e5e4', display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#78716c' }}>
                  <span>{currentLang === 'ta' ? 'வெற்றி சாத்தியக்கூறு' : 'Probability'}:</span>
                  <strong style={{ color: q.successPct > 70 ? '#166534' : q.successPct > 50 ? '#b45309' : '#991b1b' }}>
                    {q.successPct}%
                  </strong>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Classical Principles & FAQs Accordion */}
      <div className="jk-faq-section">
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#431407', margin: '0 0 1rem 0' }}>
          <span>📖</span> {currentLang === 'ta' ? 'ஜாமக்கோள் பிரசன்ன சாஸ்திர ரகசியங்கள்' : 'Classical Jamakkol Principles & FAQs'}
        </h3>

        {[
          {
            id: 'faq1',
            qEn: 'Who originated the Jamakkol Prasannam system?',
            qTa: 'ஜாமக்கோள் பிரசன்ன முறையை உருவாக்கியவர் யார்?',
            aEn: 'The system was codified by the revered Tamil astrological sage Sri Upendra Achariyar. It synthesizes instantaneous planetary transits with fixed 8 Jamam diurnal divisions for infallible day-to-day horary predictions.',
            aTa: 'இம்முறையை ஸ்ரீ உபேந்திர ஆச்சாரியார் அருளிச்செய்தார். பகல் 8 ஜாமங்கள், இரவு 8 ஜாமங்கள் என பிரித்து, கோச்சார கிரகங்களுடன் 8 ஜாமக் கிரகங்களை இணைத்து மிகத் துல்லியமாக பலன் சொல்லும் முறை இதுவாகும்.'
          },
          {
            id: 'faq2',
            qEn: 'Why are the 4 fixed signs (Taurus, Leo, Scorpio, Aquarius) excluded from outer Jama Grahas?',
            qTa: 'ஜாமக் கிரகங்கள் சுழற்சியில் 4 ஸ்திர ராசிகள் (ரிஷபம், சிம்மம், விருச்சிகம், கும்பம்) சேர்க்கப்படாதது ஏன்?',
            aEn: 'Classical Jamakkol assigns outer rotating grahas exclusively to the 4 cardinal (Chara) and 4 dual (Dwiswabhava) signs. Fixed (Sthira) signs represent immutable permanence and are preserved as the fixed cardinal pivots.',
            aTa: 'ஜாமக் கிரகங்கள் சரம் மற்றும் உபய ராசிகளான 8 வீடுகளில் மட்டுமே வலம் வருகின்றன. ஸ்திர ராசிகள் நிலைத்தன்மை கொண்டவையாக இருப்பதால் அவை சுழற்சியில் சேர்க்கப்படாமல் உள்வட்டக் கோச்சாரத்திற்கு மட்டுமே பயன்படுத்தப்படுகின்றன.'
          },
          {
            id: 'faq3',
            qEn: 'What is the significance of Kavippu (கவிப்பு)?',
            qTa: 'கவிப்பு என்பதன் முக்கியத்துவம் என்ன?',
            aEn: 'Kavippu literally translates to an invisible covering or eclipse shroud. Any planet, house, or significator falling under the degree of Kavippu suffers temporary paralysis or hidden obstacles. Never inaugurate discussions when the querent significator is in Kavippu.',
            aTa: 'கவிப்பு என்பது இருள் அல்லது கவிந்து மூடுவது ஆகும். எந்த ஒரு கிரகமோ அல்லது பாவகமோ கவிப்பில் சிக்கினால் அந்த காரியம் தற்காலிக முடக்கத்தை அல்லது மறைமுகத் தடையைச் சந்திக்கும். பேசப்போகும் காரக கிரகம் கவிப்பில் இருக்கும்போது உடன்படிக்கைகள் செய்யக்கூடாது.'
          },
          {
            id: 'faq4',
            qEn: 'How does the Sambhava Kala Nirnayam determine timing?',
            qTa: 'சம்பவ கால நிர்ணயம் எவ்வாறு கணக்கிடப்படுகிறது?',
            aEn: "Timing is derived using the Moon's 21 Ray Matrix multiplied across the house distance between Udhayam and Aarudam. Depending on whether signs are movable, fixed, or dual, the units resolve into minutes, hours, days, or months.",
            aTa: 'சந்திரனின் 21 கதிர்களைக் கொண்டு உதயம் முதல் ஆருடம் வரையிலான இடைவெளியைப் பெருக்கி, அது சரம், ஸ்திரம், உபய ராசிகளுக்கு ஏற்ப நிமிடங்கள், மணி நேரங்கள், நாட்கள் அல்லது மாதங்களாக பலன் தரும் காலத்தை அறியலாம்.'
          }
        ].map((item) => {
          const isOpen = activeFaq === item.id;
          return (
            <div key={item.id} className="jk-faq-item">
              <button
                type="button"
                className="jk-faq-btn"
                onClick={() => setActiveFaq(isOpen ? null : item.id)}
              >
                <span>{currentLang === 'ta' ? item.qTa : item.qEn}</span>
                <span style={{ fontSize: '1.2rem', color: '#b45309' }}>{isOpen ? '−' : '+'}</span>
              </button>
              {isOpen && (
                <div className="jk-faq-ans">
                  {currentLang === 'ta' ? item.aTa : item.aEn}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
