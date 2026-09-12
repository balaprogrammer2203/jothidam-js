import { useState, useEffect } from 'react';
import horoscopeService from '../services/horoscope.service';
import { DEFAULT_AYANAMSA } from '../../../config/ayanamsa.config';
import { decimalToDms, dmsToDecimal } from '../../../utils/coordinateUtils';
import { getGmtOffsetForTimezone, DST_OPTIONS } from '../../../config/timezones.config';

export function useHoroscopeForm(initialValues = {}) {
  // Current local date & time for prefilling
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  const currentDay = now.getDate();

  const rawHours = now.getHours();
  const currentAmPm = rawHours >= 12 ? 'pm' : 'am';
  const h12 = rawHours % 12 || 12;
  const currentHour = String(h12).padStart(2, '0');
  const currentMinute = String(now.getMinutes()).padStart(2, '0');
  const currentSecond = String(now.getSeconds()).padStart(2, '0');

  // Fields empty on page load, only date and time prefilled with current date and time
  const [fullName, setFullName] = useState(initialValues.fullName || '');
  const [gender, setGender] = useState(initialValues.gender || '');

  const [birthMonth, setBirthMonth] = useState(initialValues.birthMonth || currentMonth);
  const [birthDay, setBirthDay] = useState(initialValues.birthDay || currentDay);
  const [birthYear, setBirthYear] = useState(initialValues.birthYear || currentYear);

  const [birthHour, setBirthHour] = useState(initialValues.birthHour || currentHour);
  const [birthMinute, setBirthMinute] = useState(initialValues.birthMinute || currentMinute);
  const [birthSecond, setBirthSecond] = useState(initialValues.birthSecond || currentSecond);
  const [birthAmPm, setBirthAmPm] = useState(initialValues.birthAmPm || currentAmPm);

  const [ayanamsa, setAyanamsa] = useState(initialValues.ayanamsa || DEFAULT_AYANAMSA);
  const [chartType, setChartType] = useState(initialValues.chartType || 'south');

  // Location fields empty on page load
  const [placeQuery, setPlaceQuery] = useState(initialValues.placeQuery || '');
  const [selectedPlaceId, setSelectedPlaceId] = useState(initialValues.selectedPlaceId || '');
  
  // Decimal Coordinates empty on load
  const [latitude, setLatitude] = useState(initialValues.latitude || '');
  const [longitude, setLongitude] = useState(initialValues.longitude || '');

  // DMS Latitude State (Empty by default)
  const initialLatDms = (initialValues.latitude !== undefined && initialValues.latitude !== '')
    ? decimalToDms(initialValues.latitude, 'lat')
    : { deg: '', min: '', sec: '', dir: 'N' };
  const [latDeg, setLatDeg] = useState(initialLatDms.deg);
  const [latMin, setLatMin] = useState(initialLatDms.min);
  const [latSec, setLatSec] = useState(initialLatDms.sec);
  const [latDir, setLatDir] = useState(initialLatDms.dir || 'N');

  // DMS Longitude State (Empty by default)
  const initialLngDms = (initialValues.longitude !== undefined && initialValues.longitude !== '')
    ? decimalToDms(initialValues.longitude, 'lng')
    : { deg: '', min: '', sec: '', dir: 'E' };
  const [lngDeg, setLngDeg] = useState(initialLngDms.deg);
  const [lngMin, setLngMin] = useState(initialLngDms.min);
  const [lngSec, setLngSec] = useState(initialLngDms.sec);
  const [lngDir, setLngDir] = useState(initialLngDms.dir || 'E');

  // Timezone (IANA ID, e.g. 'Asia/Kolkata', 'Asia/Dubai')
  const [timezone, setTimezone] = useState(initialValues.timezone || 'Asia/Kolkata');

  // Timezone (GMT) and Daylight Saving Time (DST)
  const initialGmt = initialValues.gmt || getGmtOffsetForTimezone(initialValues.timezone || 'Asia/Kolkata');
  const [gmt, setGmt] = useState(initialGmt);
  const [dstType, setDstType] = useState(initialValues.dstType || 'standard');
  const [dst, setDst] = useState(initialValues.dst || '+00:00');

  const [placeSuggestions, setPlaceSuggestions] = useState([]);

  // Auto-update GMT offset when a timezone is selected
  const handleTimezoneChange = (newTz) => {
    setTimezone(newTz);
    const newGmt = getGmtOffsetForTimezone(newTz);
    setGmt(newGmt);
  };

  // Update DST offset when DST Type is selected from dropdown
  const handleDstTypeChange = (newDstType) => {
    setDstType(newDstType);
    const matched = DST_OPTIONS.find((d) => d.id === newDstType);
    if (matched) {
      setDst(matched.offset);
    }
  };

  // Sync DMS when decimal latitude/longitude updates from place selection
  const updateLatFromDecimal = (decVal) => {
    if (decVal === '' || decVal === null || decVal === undefined) {
      setLatitude('');
      setLatDeg('');
      setLatMin('');
      setLatSec('');
      setLatDir('N');
      return;
    }
    setLatitude(String(decVal));
    const dms = decimalToDms(decVal, 'lat');
    setLatDeg(dms.deg);
    setLatMin(dms.min);
    setLatSec(dms.sec);
    setLatDir(dms.dir);
  };

  const updateLngFromDecimal = (decVal) => {
    if (decVal === '' || decVal === null || decVal === undefined) {
      setLongitude('');
      setLngDeg('');
      setLngMin('');
      setLngSec('');
      setLngDir('E');
      return;
    }
    setLongitude(String(decVal));
    const dms = decimalToDms(decVal, 'lng');
    setLngDeg(dms.deg);
    setLngMin(dms.min);
    setLngSec(dms.sec);
    setLngDir(dms.dir);
  };

  // Sync Decimal when DMS components update
  const handleLatDmsChange = (newDeg, newMin, newSec, newDir) => {
    setLatDeg(newDeg);
    setLatMin(newMin);
    setLatSec(newSec);
    setLatDir(newDir);
    if (newDeg === '' && newMin === '' && newSec === '') {
      setLatitude('');
    } else {
      const dec = dmsToDecimal(newDeg, newMin, newSec, newDir);
      setLatitude(dec.toFixed(4));
    }
  };

  const handleLngDmsChange = (newDeg, newMin, newSec, newDir) => {
    setLngDeg(newDeg);
    setLngMin(newMin);
    setLngSec(newSec);
    setLngDir(newDir);
    if (newDeg === '' && newMin === '' && newSec === '') {
      setLongitude('');
    } else {
      const dec = dmsToDecimal(newDeg, newMin, newSec, newDir);
      setLongitude(dec.toFixed(4));
    }
  };

  // Formatted YYYY-MM-DD
  const getDobString = () => {
    const y = String(birthYear);
    const m = String(birthMonth).padStart(2, '0');
    const d = String(birthDay).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  // Formatted 24-hour HH:MM:SS
  const getTobString = () => {
    let h = parseInt(birthHour, 10);
    if (birthAmPm.toLowerCase() === 'pm' && h < 12) {
      h += 12;
    } else if (birthAmPm.toLowerCase() === 'am' && h === 12) {
      h = 0;
    }
    const m = String(birthMinute).padStart(2, '0');
    const s = String(birthSecond).padStart(2, '0');
    return `${String(h).padStart(2, '0')}:${m}:${s}`;
  };

  // Days in month calculation
  const maxDays = new Date(birthYear, birthMonth, 0).getDate();
  const daysList = Array.from({ length: maxDays }, (_, i) => i + 1);

  // Debounced search for place autocomplete
  useEffect(() => {
    const trimmed = (placeQuery || '').trim();
    if (!trimmed || trimmed.length <= 1 || selectedPlaceId) {
      setPlaceSuggestions([]);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      try {
        const suggestions = await horoscopeService.searchPlaces(trimmed);
        setPlaceSuggestions(suggestions || []);
      } catch (err) {
        console.error('Place search error:', err);
        setPlaceSuggestions([]);
      }
    }, 350);

    return () => clearTimeout(delayDebounceFn);
  }, [placeQuery, selectedPlaceId]);

  const handleSelectPlace = (item) => {
    const englishPlace = item.formattedAddress || item.description || item.city;
    setPlaceQuery(englishPlace);
    setSelectedPlaceId(item.placeId);
    if (item.lat !== undefined && item.lng !== undefined) {
      updateLatFromDecimal(Number(item.lat).toFixed(4));
      updateLngFromDecimal(Number(item.lng).toFixed(4));
    }
    if (item.timezone && item.timezone !== timezone) {
      handleTimezoneChange(item.timezone);
    }
    setPlaceSuggestions([]);
    setFormErrors((prev) => ({ ...prev, placeQuery: null, coordinates: null }));
  };

  // Form Validation & Inline Errors
  const [formErrors, setFormErrors] = useState({});

  const validateForm = (lang = 'en') => {
    const errors = {};

    // 1. Full Name
    if (!fullName || !fullName.trim()) {
      errors.fullName = {
        ta: 'முழுப் பெயரை உள்ளிடவும்',
        en: 'Please enter full name',
        hi: 'कृपया पूरा नाम दर्ज करें',
        te: 'దయచేసి పూర్తి పేరు నమోదు చేయండి',
        kn: 'ದಯವಿಟ್ಟು ಪೂರ್ಣ ಹೆಸರನ್ನು ನಮೂದಿಸಿ',
        ml: 'ദയവായി മുഴുവൻ പേര് രേഖപ്പെടുത്തുക'
      }[lang] || 'Please enter full name';
    }

    // 2. Gender
    if (!gender || gender.trim() === '') {
      errors.gender = {
        ta: 'பாலினத்தைத் தேர்ந்தெடுக்கவும்',
        en: 'Please select gender',
        hi: 'कृपया लिंग चुनें',
        te: 'దయచేసి లింగం ఎంచుకోండి',
        kn: 'ದಯವಿಟ್ಟು ಲಿಂಗವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
        ml: 'ദയവായി ലിംഗം തിരഞ്ഞെടുക്കുക'
      }[lang] || 'Please select gender';
    }

    // 3. Birth Place
    if (!placeQuery || !placeQuery.trim()) {
      errors.placeQuery = {
        ta: 'பிறந்த இடத்தைத் தேடித் தேர்ந்தெடுக்கவும்',
        en: 'Please search and select birth place',
        hi: 'कृपया जन्म स्थान खोजें और चुनें',
        te: 'దయచేసి పుట్టిన స్థలాన్ని వెతికి ఎంచుకోండి',
        kn: 'ದಯವಿಟ್ಟು ಹುಟ್ಟಿದ ಸ್ಥಳವನ್ನು ಹುಡುಕಿ ಆಯ್ಕೆಮಾಡಿ',
        ml: 'ദയവായി ജനന സ്ഥലം തിരഞ്ഞ് തിരഞ്ഞെടുക്കുക'
      }[lang] || 'Please search and select birth place';
    }

    // 4. Coordinates
    const latNum = parseFloat(latitude);
    const lngNum = parseFloat(longitude);
    if (isNaN(latNum) || isNaN(lngNum) || (!latDeg && !latMin && !lngDeg && !lngMin)) {
      errors.coordinates = {
        ta: 'அட்ச/தீர்க்க ரேகை தேவை (பரிந்துரையில் இருந்து ஊரைத் தேர்வு செய்யவும்)',
        en: 'Coordinates are required (please select place from suggestions)',
        hi: 'अक्षांश और देशांतर आवश्यक हैं (कृपया सूची से स्थान चुनें)',
        te: 'అక్షాంశం మరియు రేఖాంశం అవసరం (దయచేసి జాబితా నుండి స్థలాన్ని ఎంచుకోండి)',
        kn: 'ಅಕ್ಷಾಂಶ ಮತ್ತು ರೇಖಾಂಶ ಅಗತ್ಯವಿದೆ (ದಯವಿಟ್ಟು ಪಟ್ಟಿಯಿಂದ ಸ್ಥಳವನ್ನು ಆಯ್ಕೆಮಾಡಿ)',
        ml: 'അക്ഷാംശവും രേഖാംശവും ആവശ്യമാണ് (ദയവായി പട്ടികയിൽ നിന്ന് സ്ഥലം തിരഞ്ഞെടുക്കുക)'
      }[lang] || 'Coordinates are required (please select place from suggestions)';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFullNameChange = (val) => {
    setFullName(val);
    if (formErrors.fullName) {
      setFormErrors((prev) => ({ ...prev, fullName: null }));
    }
  };

  const handleGenderChange = (val) => {
    setGender(val);
    if (formErrors.gender) {
      setFormErrors((prev) => ({ ...prev, gender: null }));
    }
  };

  const handlePlaceQueryChange = (val) => {
    setPlaceQuery(val);
    if (formErrors.placeQuery) {
      setFormErrors((prev) => ({ ...prev, placeQuery: null }));
    }
  };

  const getPayload = (customChartType = chartType) => {
    const latNum = parseFloat(latitude);
    const lngNum = parseFloat(longitude);
    const normGender = gender ? gender.toLowerCase() : 'male';
    const genderTa = normGender === 'female' ? 'பெண்' : (normGender === 'other' ? 'மற்றவை' : 'ஆண்');
    const normDstType = dstType || 'standard';
    const dstTypeTa = normDstType === 'daylight_saving'
      ? 'கோடைக்கால சேமிப்பு நேரம் [DST] (+1 மணி)'
      : (normDstType === 'double_daylight_saving'
        ? 'இரட்டை கோடைக்கால சேமிப்பு நேரம் (+2 மணி)'
        : 'நிலையான நேரம் (DST இல்லை)');

    return {
      fullName: fullName.trim(),
      gender: normGender,
      genderTa,
      dob: getDobString(),
      tob: getTobString(),
      birthYear: Number(birthYear),
      birthMonth: Number(birthMonth),
      birthDay: Number(birthDay),
      birthHour: String(birthHour),
      birthMinute: String(birthMinute),
      birthSecond: String(birthSecond),
      birthAmPm: String(birthAmPm),
      placeId: selectedPlaceId || '',
      placeName: (placeQuery || 'Chennai').split(',')[0].trim(),
      formattedAddress: placeQuery || 'Chennai, Tamil Nadu, India',
      latitude: !isNaN(latNum) ? latNum : 13.0827,
      longitude: !isNaN(lngNum) ? lngNum : 80.2707,
      latDeg: String(latDeg || ''),
      latMin: String(latMin || ''),
      latSec: String(latSec || ''),
      latDir: String(latDir || 'N'),
      lngDeg: String(lngDeg || ''),
      lngMin: String(lngMin || ''),
      lngSec: String(lngSec || ''),
      lngDir: String(lngDir || 'E'),
      timezone: timezone || 'Asia/Kolkata',
      gmt: gmt.trim() || '+05:30',
      dstType: normDstType,
      dstTypeTa,
      dst: dst.trim() || '+00:00',
      ayanamsa: ayanamsa || 'lahiri',
      chartType: customChartType || 'south'
    };
  };

  return {
    fullName, setFullName, handleFullNameChange,
    birthMonth, setBirthMonth,
    birthDay, setBirthDay,
    birthYear, setBirthYear,
    birthHour, setBirthHour,
    birthMinute, setBirthMinute,
    birthSecond, setBirthSecond,
    birthAmPm, setBirthAmPm,
    gender, setGender, handleGenderChange,
    ayanamsa, setAyanamsa,
    chartType, setChartType,
    placeQuery, setPlaceQuery, handlePlaceQueryChange,
    selectedPlaceId, setSelectedPlaceId,
    latitude, setLatitude,
    longitude, setLongitude,
    latDeg, setLatDeg,
    latMin, setLatMin,
    latSec, setLatSec,
    latDir, setLatDir,
    lngDeg, setLngDeg,
    lngMin, setLngMin,
    lngSec, setLngSec,
    lngDir, setLngDir,
    handleLatDmsChange,
    handleLngDmsChange,
    updateLatFromDecimal,
    updateLngFromDecimal,
    timezone, setTimezone,
    handleTimezoneChange,
    gmt, setGmt,
    dstType, setDstType,
    dst, setDst,
    handleDstTypeChange,
    placeSuggestions, setPlaceSuggestions,
    handleSelectPlace,
    getDobString,
    getTobString,
    getPayload,
    daysList,
    formErrors,
    setFormErrors,
    validateForm
  };
}
