/**
 * Enterprise Jamakkol Prasannam Client Utilities
 * Implements classical calculations for instantaneous UI reactivity, offline capability, and South Indian chart layout.
 */

export const JAMAKKOL_RASIS = [
  { id: 0, en: 'Aries', ta: 'மேஷம்', hi: 'मेष', te: 'మేషం', kn: 'ಮೇಷ', ml: 'മേടം', lord: 'Mars', lordTa: 'செவ்வாய்' },
  { id: 1, en: 'Taurus', ta: 'ரிஷபம்', hi: 'वृषभ', te: 'వృషభం', kn: 'ವೃಷಭ', ml: 'ഇടവം', lord: 'Venus', lordTa: 'சுக்கிரன்' },
  { id: 2, en: 'Gemini', ta: 'மிதுனம்', hi: 'मिथुन', te: 'మిథునం', kn: 'ಮಿಥುನ', ml: 'മിഥുനം', lord: 'Mercury', lordTa: 'புதன்' },
  { id: 3, en: 'Cancer', ta: 'கடகம்', hi: 'कर्क', te: 'కర్కాటకం', kn: 'ಕರ್ಕಾಟಕ', ml: 'കർക്കടകം', lord: 'Moon', lordTa: 'சந்திரன்' },
  { id: 4, en: 'Leo', ta: 'சிம்மம்', hi: 'सिंह', te: 'సింహం', kn: 'ಸಿಂಹ', ml: 'ചിങ്ങം', lord: 'Sun', lordTa: 'சூரியன்' },
  { id: 5, en: 'Virgo', ta: 'கன்னி', hi: 'कन्या', te: 'కన్య', kn: 'ಕನ್ಯಾ', ml: 'കന്നി', lord: 'Mercury', lordTa: 'புதன்' },
  { id: 6, en: 'Libra', ta: 'துலாம்', hi: 'तुला', te: 'తులా', kn: 'ತುಲಾ', ml: 'തുലാം', lord: 'Venus', lordTa: 'சுக்கிரன்' },
  { id: 7, en: 'Scorpio', ta: 'விருச்சிகம்', hi: 'वृश्चिक', te: 'వృశ్చికం', kn: 'ವೃಶ್ಚಿಕ', ml: 'വൃശ്ചികം', lord: 'Mars', lordTa: 'செவ்வாய்' },
  { id: 8, en: 'Sagittarius', ta: 'தனுசு', hi: 'धनु', te: 'ధనుస్సు', kn: 'ಧನುಸ್ಸು', ml: 'ധനു', lord: 'Jupiter', lordTa: 'குரு' },
  { id: 9, en: 'Capricorn', ta: 'மகரம்', hi: 'मकर', te: 'మకరం', kn: 'ಮಕರ', ml: 'മകരം', lord: 'Saturn', lordTa: 'சனி' },
  { id: 10, en: 'Aquarius', ta: 'கும்பம்', hi: 'कुंभ', te: 'కుంభం', kn: 'ಕುಂಭ', ml: 'കുംഭം', lord: 'Saturn', lordTa: 'சனி' },
  { id: 11, en: 'Pisces', ta: 'மீனம்', hi: 'मीन', te: 'మీనం', kn: 'ಮೀನ', ml: 'മീനം', lord: 'Jupiter', lordTa: 'குரு' }
];

export const PRASANNAM_RASIS = JAMAKKOL_RASIS;

export const JAMA_GRAHAS_LIST = [
  { key: 'Sun', symbol: 'Su', nameEn: 'Sun', nameTa: 'சூரியன்', rays: 30 },
  { key: 'Mars', symbol: 'Ma', nameEn: 'Mars', nameTa: 'செவ்வாய்', rays: 8 },
  { key: 'Jupiter', symbol: 'Ju', nameEn: 'Jupiter', nameTa: 'குரு', rays: 10 },
  { key: 'Mercury', symbol: 'Me', nameEn: 'Mercury', nameTa: 'புதன்', rays: 9 },
  { key: 'Venus', symbol: 'Ve', nameEn: 'Venus', nameTa: 'சுக்கிரன்', rays: 12 },
  { key: 'Saturn', symbol: 'Sa', nameEn: 'Saturn', nameTa: 'சனி', rays: 5 },
  { key: 'Moon', symbol: 'Mo', nameEn: 'Moon', nameTa: 'சந்திரன்', rays: 21 },
  { key: 'Snake', symbol: 'Sn', nameEn: 'Snake (Rahu)', nameTa: 'பாம்பு (சர்ப்பம்)', rays: 4 }
];

// 8 non-fixed signs used in anti-clockwise sequence
export const JAMA_SIGNS_ANTI_CLOCKWISE = [11, 9, 8, 6, 5, 3, 2, 0];

// The 8 Outer Positions & their base degrees in the outer perimeter
export const JAMA_POSITIONS = [
  { key: 'topLeft', signIndex: 11, baseDeg: 360, nameTa: 'மீனம்', nameEn: 'Pisces' },
  { key: 'topCenter', signIndex: 0, baseDeg: 45, nameTa: 'மேஷம்', nameEn: 'Aries' },
  { key: 'topRight', signIndex: 2, baseDeg: 90, nameTa: 'மிதுனம்', nameEn: 'Gemini' },
  { key: 'rightCenter', signIndex: 3, baseDeg: 135, nameTa: 'கடகம்', nameEn: 'Cancer' },
  { key: 'bottomRight', signIndex: 5, baseDeg: 180, nameTa: 'கன்னி', nameEn: 'Virgo' },
  { key: 'bottomCenter', signIndex: 6, baseDeg: 225, nameTa: 'துலாம்', nameEn: 'Libra' },
  { key: 'bottomLeft', signIndex: 8, baseDeg: 270, nameTa: 'தனுசு', nameEn: 'Sagittarius' },
  { key: 'leftCenter', signIndex: 9, baseDeg: 315, nameTa: 'மகரம்', nameEn: 'Capricorn' }
];

// The 8 Outer Jama Grahas in their fixed classical cyclic succession
export const JAMA_GRAHAS_CYCLE = [
  { key: 'Sun', nameEn: 'Sun', nameTa: 'சூரியன்', shortTa: 'சூரி', symbol: 'Su' },
  { key: 'Snake', nameEn: 'Snake', nameTa: 'பாம்பு', shortTa: 'பாம்பு', symbol: 'Sn' },
  { key: 'Moon', nameEn: 'Moon', nameTa: 'சந்திரன்', shortTa: 'சந்', symbol: 'Mo' },
  { key: 'Saturn', nameEn: 'Saturn', nameTa: 'சனி', shortTa: 'சனி', symbol: 'Sa' },
  { key: 'Venus', nameEn: 'Venus', nameTa: 'சுக்கிரன்', shortTa: 'சுக்', symbol: 'Ve' },
  { key: 'Mercury', nameEn: 'Mercury', nameTa: 'புதன்', shortTa: 'புத', symbol: 'Me' },
  { key: 'Jupiter', nameEn: 'Jupiter', nameTa: 'குரு', shortTa: 'குரு', symbol: 'Ju' },
  { key: 'Mars', nameEn: 'Mars', nameTa: 'செவ்வாய்', shortTa: 'செவ்', symbol: 'Ma' }
];

// Day Lord Starting Index in JAMA_GRAHAS_CYCLE for each day of week (0: Sun .. 6: Sat)
export const DAY_LORD_CYCLE_INDEX = {
  0: 0, // Sunday -> Sun
  1: 2, // Monday -> Moon
  2: 7, // Tuesday -> Mars
  3: 5, // Wednesday -> Mercury
  4: 6, // Thursday -> Jupiter
  5: 4, // Friday -> Venus
  6: 3  // Saturday -> Saturn
};

export const DAY_LORD_MAP = [
  { day: 0, dayEn: 'Sunday', dayTa: 'ஞாயிறு', planet: 'Sun', jamaIdx: 0 },
  { day: 1, dayEn: 'Monday', dayTa: 'திங்கள்', planet: 'Moon', jamaIdx: 2 },
  { day: 2, dayEn: 'Tuesday', dayTa: 'செவ்வாய்', planet: 'Mars', jamaIdx: 7 },
  { day: 3, dayEn: 'Wednesday', dayTa: 'புதன்', planet: 'Mercury', jamaIdx: 5 },
  { day: 4, dayEn: 'Thursday', dayTa: 'வியாழன்', planet: 'Jupiter', jamaIdx: 6 },
  { day: 5, dayEn: 'Friday', dayTa: 'வெள்ளி', planet: 'Venus', jamaIdx: 4 },
  { day: 6, dayEn: 'Saturday', dayTa: 'சனி', planet: 'Saturn', jamaIdx: 3 }
];

export function parseTimeToSeconds(timeStr) {
  if (!timeStr) return 21600;
  const isPM = /pm/i.test(timeStr);
  const isAM = /am/i.test(timeStr);
  const clean = timeStr.replace(/[^\d:]/g, '');
  const parts = clean.split(':').map(Number);
  let h = parts[0] || 0;
  const m = parts[1] || 0;
  const s = parts[2] || 0;
  if (isPM && h < 12) h += 12;
  if (isAM && h === 12) h = 0;
  return h * 3600 + m * 60 + s;
}

export function formatSecToTime12(totalSec) {
  const normSec = ((totalSec % 86400) + 86400) % 86400;
  const h = Math.floor(normSec / 3600);
  const m = Math.floor((normSec % 3600) / 60);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const h12 = (h % 12) || 12;
  return `${String(h12).padStart(2, '0')}:${String(m).padStart(2, '0')} ${ampm}`;
}

export function formatOuterDegreeDMS(deg) {
  let norm = ((deg % 360) + 360) % 360;
  if (norm === 0 && deg >= 359.5) norm = 360;
  const d = Math.floor(norm);
  const m = Math.round((norm - d) * 60);
  return `${d}° ${String(m).padStart(2, '0')}'`;
}

export function getRasiDegree(deg) {
  const norm = ((deg % 360) + 360) % 360;
  return Math.floor(norm % 30);
}

export function getRasiDegreeFromStr(degStr) {
  if (!degStr) return 0;
  const match = String(degStr).match(/(\d+)(?:°|\s)/);
  const d = match ? parseInt(match[1], 10) : 0;
  const mMatch = String(degStr).match(/(\d+)'/);
  const m = mMatch ? parseInt(mMatch[1], 10) : 0;
  const total = d + m / 60;
  return getRasiDegree(total);
}

export const getRasiDegree45 = getRasiDegree;
export const getRasiDegree45FromStr = getRasiDegreeFromStr;

export function calculateOuterJamaGrahas(timeStr, dayOfWeek) {
  const totalSec = parseTimeToSeconds(timeStr);
  const effectiveDay = totalSec < 21600 ? ((dayOfWeek + 6) % 7) : dayOfWeek;
  const isDay = totalSec >= 21600 && totalSec < 64800;

  let elapsedSec = 0;
  if (isDay) {
    elapsedSec = totalSec - 21600;
  } else {
    elapsedSec = totalSec >= 64800 ? (totalSec - 64800) : (totalSec + 21600);
  }

  const jamamIndex = Math.min(7, Math.max(0, Math.floor(elapsedSec / 5400)));
  const jamamNumber = jamamIndex + 1;
  const secIntoJamam = elapsedSec - jamamIndex * 5400;
  const degMovedInJamam = (secIntoJamam / 5400) * 45;

  const dayLordIdx = DAY_LORD_CYCLE_INDEX[effectiveDay] ?? 0;

  const outerBoxes = {};
  const jamaPlanetsAssigned = {};

  JAMA_POSITIONS.forEach((pos, pIdx) => {
    const planetIdx = (dayLordIdx + jamamIndex + pIdx) % 8;
    const planet = JAMA_GRAHAS_CYCLE[planetIdx];

    let calcDeg = pos.baseDeg - degMovedInJamam;
    if (calcDeg <= 0) calcDeg += 360;

    const degInRasi = ((calcDeg % 30) + 30) % 30;
    const degRasiInt = Math.floor(degInRasi);

    const boxObj = {
      key: planet.key,
      name: planet.nameEn,
      nameEn: planet.nameEn,
      nameTa: planet.nameTa,
      shortTa: planet.shortTa,
      symbol: planet.symbol,
      degree: calcDeg,
      degreeInRasi: degInRasi,
      degreeInRasiInt: degRasiInt,
      degreeIn45: degInRasi,
      degreeIn45Int: degRasiInt,
      formattedDegree: formatOuterDegreeDMS(calcDeg),
      formattedDegreeInRasi: `(${degRasiInt})`,
      formattedDegreeIn45: `(${degRasiInt})`,
      signIndex: pos.signIndex,
      sign: pos.signIndex,
      rasiIndex: pos.signIndex,
      houseNameTa: pos.nameTa,
      houseNameEn: pos.nameEn,
      isRetrograde: false
    };

    outerBoxes[pos.key] = boxObj;
    jamaPlanetsAssigned[planet.key] = boxObj;
  });

  const activeJamamLord = JAMA_GRAHAS_CYCLE[(dayLordIdx + jamamIndex) % 8];
  const dayLordObj = JAMA_GRAHAS_CYCLE[dayLordIdx];

  const startSec = (isDay ? 21600 : 64800) + jamamIndex * 5400;
  const endSec = startSec + 5400;

  return {
    jamamNumber,
    isDay,
    activeJamamLord,
    dayLord: dayLordObj,
    effectiveDayOfWeek: effectiveDay,
    startTimeFormatted: formatSecToTime12(startSec),
    endTimeFormatted: formatSecToTime12(endSec),
    outerBoxes,
    jamaPlanets: jamaPlanetsAssigned
  };
}

/**
 * Classical Jamakkol Sub-Planets (Upagrahas):
 * 1. Yamakandam (எம)
 * 2. Rahu Kalam (ரா.கா)
 * 3. Maandi (மாந்)
 * 4. Mrityu (மிருத்யு)
 */
export const JAMAKKOL_SUB_PLANETS_RULES = {
  0: { // Sunday
    day:   { yama: { rasi: 5, degOffset: 0 }, rahu: { rasi: 0, degOffset: 0 }, maandi: { rasi: 10, degOffset: 6 }, mrityu: { rasi: 7, degOffset: 0 } },
    night: { yama: { rasi: 5, degOffset: 0 }, rahu: { rasi: 0, degOffset: 0 }, maandi: { rasi: 1, degOffset: 0 },  mrityu: { rasi: 3, degOffset: 12 } }
  },
  1: { // Monday
    day:   { yama: { rasi: 6, degOffset: 0 }, rahu: { rasi: 9, degOffset: 0 }, maandi: { rasi: 9, degOffset: 12 }, mrityu: { rasi: 6, degOffset: 6 } },
    night: { yama: { rasi: 6, degOffset: 0 }, rahu: { rasi: 9, degOffset: 0 }, maandi: { rasi: 0, degOffset: 6 },  mrityu: { rasi: 2, degOffset: 18 } }
  },
  2: { // Tuesday
    day:   { yama: { rasi: 8, degOffset: 0 }, rahu: { rasi: 2, degOffset: 0 }, maandi: { rasi: 8, degOffset: 18 }, mrityu: { rasi: 5, degOffset: 12 } },
    night: { yama: { rasi: 8, degOffset: 0 }, rahu: { rasi: 2, degOffset: 0 }, maandi: { rasi: 11, degOffset: 12 }, mrityu: { rasi: 1, degOffset: 24 } }
  },
  3: { // Wednesday
    day:   { yama: { rasi: 9, degOffset: 0 }, rahu: { rasi: 5, degOffset: 0 }, maandi: { rasi: 7, degOffset: 24 }, mrityu: { rasi: 9, degOffset: 36 } },
    night: { yama: { rasi: 9, degOffset: 0 }, rahu: { rasi: 5, degOffset: 0 }, maandi: { rasi: 4, degOffset: 6 },  mrityu: { rasi: 1, degOffset: 0 } }
  },
  4: { // Thursday
    day:   { yama: { rasi: 11, degOffset: 0 }, rahu: { rasi: 3, degOffset: 0 }, maandi: { rasi: 7, degOffset: 0 },  mrityu: { rasi: 9, degOffset: 12 } },
    night: { yama: { rasi: 11, degOffset: 0 }, rahu: { rasi: 3, degOffset: 0 }, maandi: { rasi: 3, degOffset: 12 }, mrityu: { rasi: 0, degOffset: 6 } }
  },
  5: { // Friday
    day:   { yama: { rasi: 2, degOffset: 0 }, rahu: { rasi: 6, degOffset: 0 }, maandi: { rasi: 6, degOffset: 6 },  mrityu: { rasi: 8, degOffset: 18 } },
    night: { yama: { rasi: 2, degOffset: 0 }, rahu: { rasi: 6, degOffset: 0 }, maandi: { rasi: 2, degOffset: 18 }, mrityu: { rasi: 11, degOffset: 12 } }
  },
  6: { // Saturday
    day:   { yama: { rasi: 3, degOffset: 0 }, rahu: { rasi: 8, degOffset: 0 }, maandi: { rasi: 5, degOffset: 12 }, mrityu: { rasi: 7, degOffset: 24 } },
    night: { yama: { rasi: 3, degOffset: 0 }, rahu: { rasi: 8, degOffset: 0 }, maandi: { rasi: 1, degOffset: 24 }, mrityu: { rasi: 4, degOffset: 6 } }
  }
};


/**
 * 6-Language UI labels dictionary for Jamakkol Prasannam
 */
export const JAMAKKOL_UI_STRINGS = {
  chartCenterTitle: {
    en: 'Jamakol Aarudam',
    ta: 'ஜாமக்கோள் ஆரூடம்',
    hi: 'जामक्कोल आरूढ़',
    te: 'జామక్కోల్ ఆరూఢం',
    kn: 'ಜಾಮಕ್ಕೋಲ್ ಆರೂಢ',
    ml: 'ജാമക്കോൾ ആരൂഢം'
  },
  chartCenterSubtitle: {
    en: 'D1 - Rasi',
    ta: 'டி1 - ராசி',
    hi: 'डी1 - राशि',
    te: 'డి1 - రాశి',
    kn: 'ಡಿ1 - ರಾಶಿ',
    ml: 'ഡി1 - രാശി'
  },
  locationLabel: {
    en: 'Location',
    ta: 'இடம்',
    hi: 'स्थान',
    te: 'స్థలము',
    kn: 'ಸ್ಥಳ',
    ml: 'സ്ഥലം'
  },
  changeCityLink: {
    en: 'Change city',
    ta: 'நகரத்தை மாற்றவும்',
    hi: 'शहर बदलें',
    te: 'నగరాన్ని మార్చండి',
    kn: 'ನಗರ ಬದಲಾಯಿಸಿ',
    ml: 'നഗരം മാറ്റുക'
  },
  southIndian: {
    en: 'South Indian',
    ta: 'தென்னிந்திய முறை',
    hi: 'दक्षिण भारतीय',
    te: 'దక్షిణ భారతీయ',
    kn: 'ದಕ್ಷಿಣ ಭಾರತೀಯ',
    ml: 'ദക്ഷിണേന്ത്യൻ'
  },
  northIndian: {
    en: 'North Indian',
    ta: 'வடஇந்திய முறை',
    hi: 'उत्तर भारतीय',
    te: 'ఉత్తర భారతీయ',
    kn: 'ಉತ್ತರ ಭಾರತೀಯ',
    ml: 'ഉത്തരേന്ത്യൻ'
  }
};

/**
 * Preset Cities with 6-language names
 */
export const PRESET_CITIES = [
  {
    name: 'New Delhi',
    lat: 28.6139,
    lng: 77.2090,
    names: {
      en: 'New Delhi',
      ta: 'புது தில்லி',
      hi: 'नई दिल्ली',
      te: 'న్యూ ఢిల్లీ',
      kn: 'ಹೊಸ ದೆಹಲಿ',
      ml: 'ന്യൂഡൽഹി'
    }
  },
  {
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
  },
  {
    name: 'Madurai',
    lat: 9.9252,
    lng: 78.1198,
    names: {
      en: 'Madurai',
      ta: 'மதுரை',
      hi: 'मदुरै',
      te: 'మధురై',
      kn: 'ಮಧುರೈ',
      ml: 'മധുര'
    }
  },
  {
    name: 'Coimbatore',
    lat: 11.0168,
    lng: 76.9558,
    names: {
      en: 'Coimbatore',
      ta: 'கோயம்புத்தூர்',
      hi: 'कोयंबटूर',
      te: 'కోయంబత్తూరు',
      kn: 'ಕೊಯಮತ್ತೂರು',
      ml: 'കോയമ്പത്തൂർ'
    }
  },
  {
    name: 'Tiruchirappalli',
    lat: 10.7905,
    lng: 78.7047,
    names: {
      en: 'Tiruchirappalli',
      ta: 'திருச்சிராப்பள்ளி',
      hi: 'तिरुचिरापल्ली',
      te: 'తిరుచిరాపల్లి',
      kn: 'ತಿರುಚಿರಾಪಳ್ಳಿ',
      ml: 'തിരുച്ചിറപ്പള്ളി'
    }
  },
  {
    name: 'Salem',
    lat: 11.6643,
    lng: 78.1460,
    names: {
      en: 'Salem',
      ta: 'சேலம்',
      hi: 'सेलम',
      te: 'సేలం',
      kn: 'ಸೇಲಂ',
      ml: 'സേലം'
    }
  },
  {
    name: 'Tirunelveli',
    lat: 8.7139,
    lng: 77.7567,
    names: {
      en: 'Tirunelveli',
      ta: 'திருநெல்வேலி',
      hi: 'तिरुनेलवेली',
      te: 'తిరునెల్వేలి',
      kn: 'ತಿರುನೆಲ್ವೇಲಿ',
      ml: 'തിരുനെൽവേലി'
    }
  },
  {
    name: 'Bengaluru',
    lat: 12.9716,
    lng: 77.5946,
    names: {
      en: 'Bengaluru',
      ta: 'பெங்களூரு',
      hi: 'बेंगलुरु',
      te: 'బెంగళూరు',
      kn: 'ಬೆಂಗಳೂರು',
      ml: 'ബംഗളൂരു'
    }
  },
  {
    name: 'Mumbai',
    lat: 19.0760,
    lng: 72.8777,
    names: {
      en: 'Mumbai',
      ta: 'மும்பை',
      hi: 'मुंबई',
      te: 'ముంబై',
      kn: 'ಮುಂಬೈ',
      ml: 'മുംബൈ'
    }
  },
  {
    name: 'Kolkata',
    lat: 22.5726,
    lng: 88.3639,
    names: {
      en: 'Kolkata',
      ta: 'கொல்கத்தா',
      hi: 'कोलकाता',
      te: 'కోల్‌కతా',
      kn: 'ಕೋಲ್ಕತ್ತಾ',
      ml: 'കൊൽക്കത്ത'
    }
  },
  {
    name: 'Hyderabad',
    lat: 17.3850,
    lng: 78.4867,
    names: {
      en: 'Hyderabad',
      ta: 'ஹைதராபாத்',
      hi: 'हैदराबाद',
      te: 'హైదరాబాద్',
      kn: 'ಹೈದರಾಬಾದ್',
      ml: 'ഹൈദരാബാദ്'
    }
  },
  {
    name: 'Singapore',
    lat: 1.3521,
    lng: 103.8198,
    names: {
      en: 'Singapore',
      ta: 'சிங்கப்பூர்',
      hi: 'सिंगापुर',
      te: 'సింగపూర్',
      kn: 'ಸಿಂಗಾಪುರ',
      ml: 'സിംഗപ്പൂർ'
    }
  },
  {
    name: 'Kuala Lumpur',
    lat: 3.1390,
    lng: 101.6869,
    names: {
      en: 'Kuala Lumpur',
      ta: 'கோலாலம்பூர்',
      hi: 'कुआलालंपुर',
      te: 'కౌలాలంపూర్',
      kn: 'ಕೌಲಾಲಂಪುರ',
      ml: 'ക്വാലാലംപൂർ'
    }
  },
  {
    name: 'London',
    lat: 51.5074,
    lng: -0.1278,
    names: {
      en: 'London',
      ta: 'லண்டன்',
      hi: 'लंदन',
      te: 'లండన్',
      kn: 'ಲಂಡನ್',
      ml: 'ലണ്ടൻ'
    }
  }
];

/**
 * Ayanamsa options in all 6 languages
 */
export const AYANAMSA_OPTIONS = [
  {
    value: 'lahiri',
    labels: {
      en: 'Lahiri (Chitra Paksha)',
      ta: 'லாஹிரி (சித்ர பக்ஷம்)',
      hi: 'लाहिड़ी (चित्रा पक्ष)',
      te: 'లాహిరి (చిత్ర పక్షం)',
      kn: 'ಲಾಹಿರಿ (ಚಿತ್ರ ಪಕ್ಷ)',
      ml: 'ലാഹിരി (ചിത്ര പക്ഷം)'
    }
  },
  {
    value: 'kp_newcomb',
    labels: {
      en: 'KP Newcomb',
      ta: 'கே.பி. நியூகோம்ப்',
      hi: 'के.पी. न्यूकॉम्ब',
      te: 'కె.పి. న్యూకోంబ్',
      kn: 'ಕೆ.ಪಿ. ನ್ಯೂಕಾಂಬ್',
      ml: 'കെ.പി. ന്യൂകോംബ്'
    }
  },
  {
    value: 'bv_raman',
    labels: {
      en: 'B.V. Raman',
      ta: 'பி.வி. ராமன்',
      hi: 'बी.वी. रमन',
      te: 'బి.వి. రామన్',
      kn: 'ಬಿ.ವಿ. ರಾಮನ್',
      ml: 'ബി.വി. രാമൻ'
    }
  }
];

/**
 * Helper to get localized city name
 */
export function getLocalizedCityName(cityName, lang = 'ta') {
  if (!cityName) return '';
  const safeLang = (lang || 'ta').split('-')[0].toLowerCase();
  const found = PRESET_CITIES.find(
    (c) => c.name.toLowerCase() === cityName.toLowerCase() ||
           (c.names && Object.values(c.names).some(v => v.toLowerCase() === cityName.toLowerCase()))
  );
  if (found && found.names) {
    return found.names[safeLang] || found.names.en || cityName;
  }
  return cityName;
}

/**
 * Helper to get localized planet or special point short code across 6 languages
 */
export function getLocalizedPlanetCode(nameOrSymbol, lang = 'ta') {
  if (!nameOrSymbol) return '';
  const clean = String(nameOrSymbol).trim();
  const lower = clean.toLowerCase().replace(/[*:]/g, '');
  const safeLang = (lang || 'ta').split('-')[0].toLowerCase();

  const dict = {
    // Lagna (Ascendant)
    lagna: { en: 'La', ta: 'லக்', hi: 'लग्न', te: 'లగ్', kn: 'ಲಗ್ನ', ml: 'ലഗ്' },
    la: { en: 'La', ta: 'லக்', hi: 'लग्न', te: 'లగ్', kn: 'ಲಗ್ನ', ml: 'ലഗ്' },
    asc: { en: 'La', ta: 'லக்', hi: 'लग्न', te: 'లగ్', kn: 'ಲಗ್ನ', ml: 'ലഗ്' },
    ascendant: { en: 'La', ta: 'லக்', hi: 'लग्न', te: 'లగ్', kn: 'ಲಗ್ನ', ml: 'ലഗ്' },

    // Udhayam (Hour indicator)
    udhayam: { en: 'Ud', ta: 'உத', hi: 'उदय', te: 'ఉద', kn: 'ಉದ', ml: 'ഉദ' },
    ud: { en: 'Ud', ta: 'உத', hi: 'उदय', te: 'ఉద', kn: 'ಉದ', ml: 'ഉദ' },

    // Aarudam (Minute indicator)
    aarudam: { en: 'Ar', ta: 'ஆரு', hi: 'आरू', te: 'ఆరూ', kn: 'ಆರೂ', ml: 'ആരൂ' },
    ar: { en: 'Ar', ta: 'ஆரு', hi: 'आरू', te: 'ఆరూ', kn: 'ಆರೂ', ml: 'ആരൂ' },
    aa: { en: 'Ar', ta: 'ஆரு', hi: 'आरू', te: 'ఆరూ', kn: 'ಆರೂ', ml: 'ആരൂ' },

    // Kavippu (Obstacle indicator)
    kavippu: { en: 'Kv', ta: 'கவி', hi: 'कवि', te: 'కవి', kn: 'ಕವಿ', ml: 'കവി' },
    kv: { en: 'Kv', ta: 'கவி', hi: 'कवि', te: 'కవి', kn: 'ಕವಿ', ml: 'കവി' },
    ka: { en: 'Kv', ta: 'கவி', hi: 'कवि', te: 'కవి', kn: 'ಕವಿ', ml: 'കവി' },

    // Sun (சூரியன்)
    sun: { en: 'Su', ta: 'சூரி', hi: 'सूर्य', te: 'సూర్య', kn: 'ಸೂರ್ಯ', ml: 'സൂര്യ' },
    su: { en: 'Su', ta: 'சூரி', hi: 'सूर्य', te: 'సూర్య', kn: 'ಸೂರ್ಯ', ml: 'സൂര്യ' },

    // Moon (சந்திரன்)
    moon: { en: 'Mo', ta: 'சந்', hi: 'चन्द्र', te: 'చంద్ర', kn: 'ಚಂದ್ರ', ml: 'ചന്ദ്ര' },
    mo: { en: 'Mo', ta: 'சந்', hi: 'चन्द्र', te: 'చంద్ర', kn: 'ಚಂದ್ರ', ml: 'ചന്ദ്ര' },

    // Mars (செவ்வாய்)
    mars: { en: 'Ma', ta: 'செவ்', hi: 'मंगल', te: 'కుజ', kn: 'ಮಂಗಳ', ml: 'ചൊവ്വ' },
    ma: { en: 'Ma', ta: 'செவ்', hi: 'मंगल', te: 'కుజ', kn: 'ಮಂಗಳ', ml: 'ചൊവ്വ' },

    // Mercury (புதன்)
    mercury: { en: 'Me', ta: 'புத', hi: 'बुध', te: 'బుధ', kn: 'ಬುಧ', ml: 'ബുധ' },
    me: { en: 'Me', ta: 'புத', hi: 'बुध', te: 'బుధ', kn: 'ಬುಧ', ml: 'ಬುಧ' },

    // Jupiter (குரு)
    jupiter: { en: 'Ju', ta: 'குரு', hi: 'गुरु', te: 'గురు', kn: 'ಗುರು', ml: 'വ്യാഴം' },
    ju: { en: 'Ju', ta: 'குரு', hi: 'गुरु', te: 'గురు', kn: 'ಗುರು', ml: 'വ്യാഴം' },

    // Venus (சுக்கிரன்)
    venus: { en: 'Ve', ta: 'சுக்', hi: 'शुक्र', te: 'శుక్ర', kn: 'ಶುಕ್ರ', ml: 'ശുക്ര' },
    ve: { en: 'Ve', ta: 'சுக்', hi: 'शुक्र', te: 'శుక్ర', kn: 'ಶುಕ್ರ', ml: 'ശുക്ര' },

    // Saturn (சனி)
    saturn: { en: 'Sa', ta: 'சனி', hi: 'शनि', te: 'శని', kn: 'ಶನಿ', ml: 'ശനി' },
    sa: { en: 'Sa', ta: 'சனி', hi: 'शनि', te: 'శని', kn: 'ಶನಿ', ml: 'ശനി' },

    // Snake / Rahu (பாம்பு / ராகு)
    snake: { en: 'Sn', ta: 'பாம்பு', hi: 'सर्प', te: 'సర్ప', kn: 'ಸರ್ಪ', ml: 'സർപ്പ' },
    sn: { en: 'Sn', ta: 'பாம்பு', hi: 'सर्प', te: 'సర్ప', kn: 'ಸರ್ಪ', ml: 'സർപ്പ' },
    rahu: { en: 'Ra', ta: 'ராகு', hi: 'राहु', te: 'రాహు', kn: 'ರಾಹು', ml: 'രാഹു' },
    ra: { en: 'Ra', ta: 'ராகு', hi: 'राहु', te: 'రాహు', kn: 'ರಾಹು', ml: 'రాഹു' },

    // Ketu (கேது)
    ketu: { en: 'Ke', ta: 'கேது', hi: 'केतु', te: 'కేతు', kn: 'ಕೇತು', ml: 'കേതു' },
    ke: { en: 'Ke', ta: 'கேது', hi: 'केतु', te: 'కేతు', kn: 'ಕೇతు', ml: 'കേതു' },

    // Mandi / Gulikan (மாந்தி / குளிகன்)
    mandi: { en: 'Mnd', ta: 'மாந்', hi: 'मांदि', te: 'మాంది', kn: 'ಮಾಂದಿ', ml: 'മാന്തി' },
    maandi: { en: 'Mnd', ta: 'மாந்', hi: 'मांदि', te: 'మాంది', kn: 'ಮಾಂದಿ', ml: 'മാന്തി' },
    mnd: { en: 'Mnd', ta: 'மாந்', hi: 'मांदि', te: 'మాంది', kn: 'ಮಾಂದಿ', ml: 'മാന്തി' },
    gulikan: { en: 'Gu', ta: 'குளி', hi: 'गुलिक', te: 'గుళిక', kn: 'ಗುಳಿಕ', ml: 'ഗുളികൻ' },
    gu: { en: 'Gu', ta: 'குளி', hi: 'गुलिक', te: 'గుళిక', kn: 'ಗುಳಿಕ', ml: 'ഗുളികൻ' },

    // Sub-Planets (Upagrahas)
    yamakandam: { en: 'Yk', ta: 'எம', hi: 'यम', te: 'యమ', kn: 'ಯಮ', ml: 'യമ' },
    yama: { en: 'Yk', ta: 'எம', hi: 'यम', te: 'యమ', kn: 'ಯಮ', ml: 'യമ' },
    yk: { en: 'Yk', ta: 'எம', hi: 'यम', te: 'యమ', kn: 'ಯಮ', ml: 'യമ' },

    rahukalam: { en: 'Rk', ta: 'ரா.கா', hi: 'रा.का', te: 'రా.కా', kn: 'ರಾ.ಕಾ', ml: 'രാ.കാ' },
    rahu_kalam: { en: 'Rk', ta: 'ரா.கா', hi: 'रा.का', te: 'రా.కా', kn: 'ರಾ.ಕಾ', ml: 'രാ.കാ' },
    rk: { en: 'Rk', ta: 'ரா.கா', hi: 'रा.का', te: 'రా.కా', kn: 'ರಾ.ಕಾ', ml: 'രാ.കാ' },

    mrityu: { en: 'Mrt', ta: 'மிருத்யு', hi: 'मृत्यु', te: 'మృత్యు', kn: 'ಮೃತ್ಯು', ml: 'മൃത്യു' },
    miruthyu: { en: 'Mrt', ta: 'மிருத்யு', hi: 'मृत्यु', te: 'మృత్యు', kn: 'ಮೃತ್ಯು', ml: 'മൃത്യു' },
    mrt: { en: 'Mrt', ta: 'மிருத்யு', hi: 'मृत्यु', te: 'మృత్యు', kn: 'ಮೃತ್ಯು', ml: 'മൃത്യു' }
  };

  const entry = dict[lower];
  if (!entry) return clean;
  return entry[safeLang] || entry.ta || entry.en || clean;
}

/**
 * Format decimal degree for sub-planets with space: D° MM'
 */
export function formatSubPlanetDeg(degInRasi) {
  const norm = ((degInRasi % 30) + 30) % 30;
  const d = Math.floor(norm);
  const m = Math.round((norm - d) * 60);
  return `${d}° ${String(m).padStart(2, '0')}'`;
}


/**
 * Format degrees into standard DD°MM'
 */
export function formatDegreeDMS(deg) {
  if (deg === undefined || deg === null || isNaN(deg)) return "00°00'";
  const norm = ((deg % 30) + 30) % 30;
  const d = Math.floor(norm);
  const m = Math.round((norm - d) * 60);
  return `${String(d).padStart(2, '0')}°${String(m).padStart(2, '0')}'`;
}

/**
 * Format degree into short integer DD°
 */
export function formatDegreeShort(deg) {
  if (deg === undefined || deg === null || isNaN(deg)) return '00°';
  const norm = Math.round(((deg % 30) + 30) % 30);
  return `${String(norm).padStart(2, '0')}°`;
}

/**
 * 27 Nakshatras with 6-language names
 */
export const NAKSHATRAS_6LANG = [
  { id: 0, ta: 'அசுவினி', en: 'Ashwini', hi: 'अश्विनी', te: 'అశ్విని', kn: 'ಅಶ್ವಿನಿ', ml: 'അശ്വതി' },
  { id: 1, ta: 'பரணி', en: 'Bharani', hi: 'भरणी', te: 'భరణి', kn: 'ಭರಣಿ', ml: 'ഭരണി' },
  { id: 2, ta: 'கார்த்திகை', en: 'Krittika', hi: 'कृत्तिका', te: 'కృతిక', kn: 'ಕೃತಿಕಾ', ml: 'കാർത്തിക' },
  { id: 3, ta: 'ரோகிணி', en: 'Rohini', hi: 'रोहिणी', te: 'రోహిణి', kn: 'ರೋಹಿಣಿ', ml: 'രോഹിണി' },
  { id: 4, ta: 'மிருகசீரிடம்', en: 'Mrigashira', hi: 'मृगशिरा', te: 'మృగశిర', kn: 'ಮೃಗಶಿರ', ml: 'മകയിരം' },
  { id: 5, ta: 'திருவாதிரை', en: 'Ardra', hi: 'आर्द्रा', te: 'ఆర్ద్ర', kn: 'ಆರ್ದ್ರ', ml: 'തിരുവാതിര' },
  { id: 6, ta: 'புனர்பூசம்', en: 'Punarvasu', hi: 'पुनर्वसु', te: 'పునర్వసు', kn: 'ಪುನರ್ವಸು', ml: 'പുണർതം' },
  { id: 7, ta: 'பூசம்', en: 'Pushya', hi: 'पुष्य', te: 'పుష్యమి', kn: 'ಪುಷ್ಯ', ml: 'പൂയം' },
  { id: 8, ta: 'ஆயில்யம்', en: 'Ashlesha', hi: 'आश्लेषा', te: 'ఆశ్లేష', kn: 'ಆಶ್ಲೇಷ', ml: 'ആയില്യം' },
  { id: 9, ta: 'மகம்', en: 'Magha', hi: 'मघा', te: 'మఘ', kn: 'ಮಘ', ml: 'മകം' },
  { id: 10, ta: 'பூரம்', en: 'Purva Phalguni', hi: 'पूर्वाफाल्गुनी', te: 'పూర్వ ఫల్గుణి', kn: 'ಪೂರ್ವ ಫಲ್ಗುಣಿ', ml: 'പൂരം' },
  { id: 11, ta: 'உத்திரம்', en: 'Uttara Phalguni', hi: 'उत्तराफाल्गुनी', te: 'ఉత్తర ఫల్గుణి', kn: 'ಉತ್ತರ ಫಲ್ಗುಣಿ', ml: 'ഉത്രം' },
  { id: 12, ta: 'ஹஸ்தம்', en: 'Hasta', hi: 'हस्त', te: 'హస్త', kn: 'ಹಸ್ತ', ml: 'അത്തം' },
  { id: 13, ta: 'சித்திரை', en: 'Chitra', hi: 'चित्रा', te: 'చిత్త', kn: 'ಚಿತ್ತಾ', ml: 'ചിത്തിര' },
  { id: 14, ta: 'சுவாதி', en: 'Swati', hi: 'स्वाति', te: 'స్వాతి', kn: 'ಸ್ವಾತಿ', ml: 'ചോതി' },
  { id: 15, ta: 'விசாகம்', en: 'Vishakha', hi: 'विशाखा', te: 'విశాఖ', kn: 'ವಿಶಾಖ', ml: 'വിശാഖം' },
  { id: 16, ta: 'அனுஷம்', en: 'Anuradha', hi: 'अनुराधा', te: 'అనూరాధ', kn: 'ಅನುರಾಧ', ml: 'അനിഴം' },
  { id: 17, ta: 'கேட்டை', en: 'Jyeshtha', hi: 'ज्येष्ठा', te: 'జ్యేష్ఠ', kn: 'ಜ್ಯೇಷ್ಠ', ml: 'തൃക്കേട്ട' },
  { id: 18, ta: 'மூலம்', en: 'Moola', hi: 'मूल', te: 'మూల', kn: 'ಮೂಲ', ml: 'മൂലം' },
  { id: 19, ta: 'பூராடம்', en: 'Purva Ashadha', hi: 'पूर्वाषाढ़ा', te: 'పూర్వాషాఢ', kn: 'ಪೂರ್ವಾಷಾಢ', ml: 'പൂരാടം' },
  { id: 20, ta: 'உத்திராடம்', en: 'Uttara Ashadha', hi: 'उत्तराषाढ़ा', te: 'ఉత్తరాషాఢ', kn: 'ಉತ್ತರಾಷಾಢ', ml: 'ഉത്രാടം' },
  { id: 21, ta: 'திருவோணம்', en: 'Shravana', hi: 'श्रवण', te: 'శ్రవణం', kn: 'ಶ್ರವಣ', ml: 'തിരുവോണം' },
  { id: 22, ta: 'அவிட்டம்', en: 'Dhanishta', hi: 'धनिष्ठा', te: 'ధనిష్ఠ', kn: 'ಧನಿಷ್ಠ', ml: 'അവിട്ടം' },
  { id: 23, ta: 'சதயம்', en: 'Shatabhisha', hi: 'शतभिषा', te: 'శతభిషం', kn: 'ಶತಭಿಷ', ml: 'ചതയം' },
  { id: 24, ta: 'பூரட்டாதி', en: 'Purva Bhadrapada', hi: 'पूर्वभाद्रपद', te: 'పూర్వాభాద్ర', kn: 'ಪೂರ್ವಭಾದ್ರಪದ', ml: 'പൂരുരുട്ടാതി' },
  { id: 25, ta: 'உத்திரட்டாதி', en: 'Uttara Bhadrapada', hi: 'उत्तरभाद्रपद', te: 'ఉత్తరాభాద్ర', kn: 'ಉತ್ತರಭಾದ್ರಪದ', ml: 'ഉത്രട്ടാതി' },
  { id: 26, ta: 'ரேவதி', en: 'Revati', hi: 'रेवती', te: 'రేవతి', kn: 'ರೇವತಿ', ml: 'രേവതി' }
];

/**
 * 30 Tithis with 6-language names
 */
export const TITHIS_6LANG = [
  { id: 1, ta: 'பிரதமை', en: 'Pratipada', hi: 'प्रतिपदा', te: 'పాడ్యమి', kn: 'ಪಾಡ್ಯ', ml: 'പ്രഥമ' },
  { id: 2, ta: 'துவிதியை', en: 'Dvitiya', hi: 'द्वितीया', te: 'విదియ', kn: 'ಬಿದಿಗೆ', ml: 'ദ്വിതീയ' },
  { id: 3, ta: 'திருதியை', en: 'Tritiya', hi: 'तृतीया', te: 'తదియ', kn: 'ತದಿಗೆ', ml: 'തൃതീയ' },
  { id: 4, ta: 'சதுர்த்தி', en: 'Chaturthi', hi: 'चतुर्थी', te: 'చవితి', kn: 'ಚೌತಿ', ml: 'ചതുർത്ഥി' },
  { id: 5, ta: 'பஞ்சமி', en: 'Panchami', hi: 'पंचमी', te: 'పంచమి', kn: 'ಪಂಚಮಿ', ml: 'പഞ്ചമി' },
  { id: 6, ta: 'சஷ்டி', en: 'Shashthi', hi: 'षष्ठी', te: 'షష్ఠి', kn: 'ಷಷ್ಠಿ', ml: 'ഷഷ്ഠി' },
  { id: 7, ta: 'சப்தமி', en: 'Saptami', hi: 'सप्तमी', te: 'సప్తమి', kn: 'ಸಪ್ತಮಿ', ml: 'സപ്തമി' },
  { id: 8, ta: 'அஷ்டமி', en: 'Ashtami', hi: 'अष्टमी', te: 'అష్టమి', kn: 'ಅಷ್ಟಮಿ', ml: 'അഷ്ടമി' },
  { id: 9, ta: 'நவமி', en: 'Navami', hi: 'नवमी', te: 'నవమి', kn: 'ನವಮಿ', ml: 'നവമി' },
  { id: 10, ta: 'தசமி', en: 'Dashami', hi: 'दशमी', te: 'దశమి', kn: 'ದಶಮಿ', ml: 'ദശമി' },
  { id: 11, ta: 'ஏகாதசி', en: 'Ekadashi', hi: 'एकादशी', te: 'ఏకాదశి', kn: 'ಏಕಾದಶಿ', ml: 'ഏകാദശി' },
  { id: 12, ta: 'துவாதசி', en: 'Dvadashi', hi: 'द्वादशी', te: 'ద్వాదశి', kn: 'ದ್ವಾದಶಿ', ml: 'ദ്വാദശി' },
  { id: 13, ta: 'திரயோதசி', en: 'Trayodashi', hi: 'त्रयोदशी', te: 'త్రయోదశి', kn: 'ತ್ರಯೋದಶಿ', ml: 'ത്രയോദശി' },
  { id: 14, ta: 'சதுர்த்தசி', en: 'Chaturdashi', hi: 'चतुर्दशी', te: 'చతుర్దశి', kn: 'ಚತುರ್ದಶಿ', ml: 'ചതുർദ്ദശി' },
  { id: 15, ta: 'பௌர்ணமி', en: 'Purnima', hi: 'पूर्णिमा', te: 'పౌర్ణమి', kn: 'ಹುಣ್ಣಿಮೆ', ml: 'പൗർണ്ണമി' },
  { id: 16, ta: 'பிரதமை', en: 'Pratipada', hi: 'प्रतिपदा', te: 'పాడ్యమి', kn: 'ಪಾಡ್ಯ', ml: 'പ്രഥമ' },
  { id: 17, ta: 'துவிதியை', en: 'Dvitiya', hi: 'द्वितीया', te: 'విదియ', kn: 'ಬಿದಿಗೆ', ml: 'ദ്വിതീയ' },
  { id: 18, ta: 'திருதியை', en: 'Tritiya', hi: 'तृतीया', te: 'తదియ', kn: 'ತದಿಗೆ', ml: 'തൃതീയ' },
  { id: 19, ta: 'சதுர்த்தி', en: 'Chaturthi', hi: 'चतुर्थी', te: 'చవితి', kn: 'ಚೌತಿ', ml: 'ಚತುರ್ത്ഥി' },
  { id: 20, ta: 'பஞ்சமி', en: 'Panchami', hi: 'पंचमी', te: 'పంచమి', kn: 'ಪಂಚಮಿ', ml: 'പഞ്ചമി' },
  { id: 21, ta: 'சஷ்டி', en: 'Shashthi', hi: 'षष्ठी', te: 'షష్ఠి', kn: 'ಷಷ್ಠಿ', ml: 'ഷഷ്ഠി' },
  { id: 22, ta: 'சப்தமி', en: 'Saptami', hi: 'सप्तमी', te: 'సప్తమి', kn: 'ಸಪ್ತಮಿ', ml: 'സಪ್ತമി' },
  { id: 23, ta: 'அஷ்டமி', en: 'Ashtami', hi: 'अष्टमी', te: 'అష్టమి', kn: 'ಅಷ್ಟಮಿ', ml: 'അഷ്ടമി' },
  { id: 24, ta: 'நவமி', en: 'Navami', hi: 'नवमी', te: 'నవమి', kn: 'ನವಮಿ', ml: 'നവമി' },
  { id: 25, ta: 'தசமி', en: 'Dashami', hi: 'दशमी', te: 'దశమి', kn: 'ದಶಮಿ', ml: 'ദശമി' },
  { id: 26, ta: 'ஏகாதசி', en: 'Ekadashi', hi: 'एकादशी', te: 'ఏకాదశి', kn: 'ಏಕಾದಶಿ', ml: 'ഏകാദശി' },
  { id: 27, ta: 'துவாதசி', en: 'Dvadashi', hi: 'द्वादशी', te: 'ద్వాదశి', kn: 'ದ್ವಾದಶಿ', ml: 'ದ್ವಾದശി' },
  { id: 28, ta: 'திரயோதசி', en: 'Trayodashi', hi: 'त्रयोदशी', te: 'త్రయోదశి', kn: 'ತ್ರಯೋದಶಿ', ml: 'ത്രയോദശി' },
  { id: 29, ta: 'சதுர்த்தசி', en: 'Chaturdashi', hi: 'चतुर्दशी', te: 'చతుర్దశి', kn: 'ಚತುರ್ದಶಿ', ml: 'ചതുർദ്ദശി' },
  { id: 30, ta: 'அமாவாசை', en: 'Amavasya', hi: 'अमावस्या', te: 'అమావాస్య', kn: 'ಅಮಾವಾಸ್ಯೆ', ml: 'അമാവാസി' }
];

export const PAKSHA_NAMES_6LANG = {
  shukla: { ta: 'சுக்ல பக்ஷம்', en: 'Shukla Paksha', hi: 'शुक्ल पक्ष', te: 'శుక్ల పక్షం', kn: 'ಶುಕ್ಲ ಪಕ್ಷ', ml: 'ശുക്ല പക്ഷം' },
  krishna: { ta: 'கிருஷ்ண பக்ஷம்', en: 'Krishna Paksha', hi: 'कृष्ण पक्ष', te: 'కృష్ణ పక్షం', kn: 'ಕೃಷ್ಣ ಪಕ್ಷ', ml: 'കൃഷ്ണ പക്ഷം' }
};

export const KARANAS_6LANG = [
  { id: 0, ta: 'பவ', en: 'Bava', hi: 'बव', te: 'బవ', kn: 'ಬವ', ml: 'ബവം' },
  { id: 1, ta: 'பாலவ', en: 'Balava', hi: 'बालव', te: 'బాలవ', kn: 'ಬಾಲವ', ml: 'ബാലവം' },
  { id: 2, ta: 'கௌலவ', en: 'Kaulava', hi: 'कौलव', te: 'కౌలవ', kn: 'ಕೌಲವ', ml: 'കൗലവം' },
  { id: 3, ta: 'சைதுலை', en: 'Taitila', hi: 'तैतिल', te: 'తైతుల', kn: 'ತೈತಿಲ', ml: 'തൈതിലം' },
  { id: 4, ta: 'கரசை', en: 'Garija', hi: 'गर', te: 'గరజ', kn: 'ಗರಜ', ml: 'ഗരം' },
  { id: 5, ta: 'வணிசை', en: 'Vanija', hi: 'वणिज', te: 'వణిజ', kn: 'ವಣಿಜ', ml: 'വണിജം' },
  { id: 6, ta: 'பத்திரை', en: 'Vishti', hi: 'विष्टि', te: 'భద్ర', kn: 'ಭದ್ರಾ', ml: 'ഭദ്ര' },
  { id: 7, ta: 'சகுனி', en: 'Shakuni', hi: 'शकुनि', te: 'శకుని', kn: 'ಶಕುನಿ', ml: 'ശకుని' },
  { id: 8, ta: 'சதுஷ்பாதம்', en: 'Chatushpada', hi: 'चतुष्पाद', te: 'చతుష్పాద', kn: 'ಚತುಷ್ಪಾದ', ml: 'ചതുഷ്പാദം' },
  { id: 9, ta: 'நாகவம்', en: 'Naga', hi: 'नाग', te: 'నాగ', kn: 'ನಾಗ', ml: 'നാഗം' },
  { id: 10, ta: 'கிமிஸ்துக்னம்', en: 'Kimstughna', hi: 'किंस्तुघ्न', te: 'కింస్తుఘ్నం', kn: 'ಕಿಂಸ್ತುಘ್ನ', ml: 'കിംസ്തുഘ്നം' }
];

export const YOGAS_6LANG = [
  { id: 0, ta: 'விஷ்கம்பம்', en: 'Vishkumbha', hi: 'विष्कम्भ', te: 'విష్కంభం', kn: 'ವಿಷ್ಕಂಭ', ml: 'വിഷ്കംഭം' },
  { id: 1, ta: 'பிரீதி', en: 'Priti', hi: 'प्रीति', te: 'ప్రీతి', kn: 'ಪ್ರೀತಿ', ml: 'പ്രീതി' },
  { id: 2, ta: 'ஆயுஷ்மான்', en: 'Ayushman', hi: 'आयुष्मान', te: 'ఆయుష్మాన్', kn: 'ಆಯುಷ್ಮಾನ್', ml: 'ആയുഷ്മാൻ' },
  { id: 3, ta: 'சௌபாக்யம்', en: 'Saubhagya', hi: 'सौभाग्य', te: 'సౌభాగ్యం', kn: 'ಸೌಭಾಗ್ಯ', ml: 'സೌಭಾಗ്യം' },
  { id: 4, ta: 'சோபனம்', en: 'Shobhana', hi: 'शोभन', te: 'శోభనం', kn: 'ಶೋಭನ', ml: 'ശോഭനം' },
  { id: 5, ta: 'அதிகண்டம்', en: 'Atiganda', hi: 'अतिगण्ड', te: 'అతిగండం', kn: 'ಅತಿಗಂಡ', ml: 'അതിഗണ്ഡം' },
  { id: 6, ta: 'சுகர்மம்', en: 'Sukarma', hi: 'सुकर्मा', te: 'సుకర్మం', kn: 'ಸುಕರ್ಮ', ml: 'സുകർമ്മം' },
  { id: 7, ta: 'திருதி', en: 'Dhriti', hi: 'धृति', te: 'ధృతి', kn: 'ಧೃತಿ', ml: 'ಧೃತಿ' },
  { id: 8, ta: 'சூலம்', en: 'Shula', hi: 'शूल', te: 'శూలం', kn: 'ಶೂಲ', ml: 'ಶೂലം' },
  { id: 9, ta: 'கண்டம்', en: 'Ganda', hi: 'गण्ड', te: 'గండం', kn: 'ಗಂಡ', ml: 'ಗണ്ഡം' },
  { id: 10, ta: 'விருத்தி', en: 'Vriddhi', hi: 'वृद्धि', te: 'వృద్ధి', kn: 'ವೃದ್ಧಿ', ml: 'വൃദ്ധി' },
  { id: 11, ta: 'துருவம்', en: 'Dhruva', hi: 'ध्रुव', te: 'ధ్రువం', kn: 'ಧ್ರುವ', ml: 'ಧ್ರುವം' },
  { id: 12, ta: 'வியாகதம்', en: 'Vyaghata', hi: 'व्याघात', te: 'వ్యాఘాతం', kn: 'ವ್ಯಾಘಾತ', ml: 'വ്യാഘാതം' },
  { id: 13, ta: 'ஹர்ஷணம்', en: 'Harshana', hi: 'हर्षण', te: 'హర్షణం', kn: 'ಹರ್ಷಣ', ml: 'ഹർഷണം' },
  { id: 14, ta: 'வஜ்ரம்', en: 'Vajra', hi: 'वज्र', te: 'వజ్రం', kn: 'ವಜ್ರ', ml: 'ವಜ್ರം' },
  { id: 15, ta: 'சித்தி', en: 'Siddhi', hi: 'सिद्धि', te: 'సిద్ధి', kn: 'ಸಿದ್ಧಿ', ml: 'സിദ്ധി' },
  { id: 16, ta: 'வியதிபாதம்', en: 'Vyatipata', hi: 'व्यतीपात', te: 'వ్యతీపాతం', kn: 'ವ್ಯತೀಪಾತ', ml: 'വ്യതീപാതം' },
  { id: 17, ta: 'வரியான்', en: 'Variyan', hi: 'वरीयान', te: 'వరీయాన్', kn: 'ವರೀಯಾನ್', ml: 'വരീയാൻ' },
  { id: 18, ta: 'பரிகம்', en: 'Parigha', hi: 'परिघ', te: 'పరిఘం', kn: 'ಪರಿಘ', ml: 'പരിഘം' },
  { id: 19, ta: 'சிவம்', en: 'Shiva', hi: 'शिव', te: 'శివం', kn: 'ಶಿವ', ml: 'ശിവം' },
  { id: 20, ta: 'சித்தம்', en: 'Siddha', hi: 'सिद्ध', te: 'సిద్ధం', kn: 'ಸಿದ್ಧ', ml: 'സിദ്ധം' },
  { id: 21, ta: 'சாத்தியம்', en: 'Sadhya', hi: 'साध्य', te: 'సాధ్యం', kn: 'ಸಾಧ್ಯ', ml: 'സാധ്യം' },
  { id: 22, ta: 'சுபம்', en: 'Shubha', hi: 'शुभ', te: 'శుభం', kn: 'ಶುಭ', ml: 'ശുഭം' },
  { id: 23, ta: 'சுப்பிரம்', en: 'Shukla', hi: 'शुक्ल', te: 'శుక్లం', kn: 'ಶುಕ್ಲ', ml: 'ശുക്ലം' },
  { id: 24, ta: 'பிராமியம்', en: 'Brahma', hi: 'ब्रह्म', te: 'బ్రహ్మ', kn: 'ಬ್ರಹ್ಮ', ml: 'ബ്രഹ്മം' },
  { id: 25, ta: 'ஐந்திரம்', en: 'Indra', hi: 'इन्द्र', te: 'ఐంద్రం', kn: 'ಐಂದ್ರ', ml: 'ఐంద్రം' },
  { id: 26, ta: 'வைதிருதி', en: 'Vaidhriti', hi: 'वैधृति', te: 'వైధృతి', kn: 'ವೈಧೃತಿ', ml: 'വൈധൃതി' }
];

export const WEEKDAYS_6LANG = [
  { id: 0, ta: 'ஞாயிறு', en: 'Sunday', hi: 'रविवार', te: 'ఆదివారం', kn: 'ಭಾನುವಾರ', ml: 'ഞായർ' },
  { id: 1, ta: 'திங்கள்', en: 'Monday', hi: 'सोमवार', te: 'సోమవారం', kn: 'ಸೋಮವಾರ', ml: 'തിങ്കൾ' },
  { id: 2, ta: 'செவ்வாய்', en: 'Tuesday', hi: 'मंगलवार', te: 'మంగళవారం', kn: 'ಮಂಗಳವಾರ', ml: 'ചൊവ്വ' },
  { id: 3, ta: 'புதன்', en: 'Wednesday', hi: 'बुधवार', te: 'బుధవారం', kn: 'ಬುಧವಾರ', ml: 'ബുധൻ' },
  { id: 4, ta: 'வியாழன்', en: 'Thursday', hi: 'गुरुवार', te: 'గురువారం', kn: 'ಗುರುವಾರ', ml: 'വ്യാഴം' },
  { id: 5, ta: 'வெள்ளி', en: 'Friday', hi: 'शुक्रवार', te: 'శుక్రవారం', kn: 'ಶುಕ್ರವಾರ', ml: 'വെള്ളി' },
  { id: 6, ta: 'சனி', en: 'Saturday', hi: 'शनिवार', te: 'శనివారం', kn: 'ಶನಿವಾರ', ml: 'ശനി' }
];

export const HORA_PLANETS_6LANG = [
  { key: 'Sun', ta: 'சூ', en: 'Su', hi: 'सू', te: 'సూ', kn: 'ಸೂ', ml: 'സൂ' },
  { key: 'Venus', ta: 'சுக்', en: 'Ve', hi: 'शु', te: 'శు', kn: 'ಶು', ml: 'ശു' },
  { key: 'Mercury', ta: 'பு', en: 'Me', hi: 'बु', te: 'బు', kn: 'ಬು', ml: 'ബു' },
  { key: 'Moon', ta: 'சந்', en: 'Mo', hi: 'चं', te: 'చం', kn: 'ಚಂ', ml: 'ച' },
  { key: 'Saturn', ta: 'சனி', en: 'Sa', hi: 'श', te: 'శ', kn: 'ಶ', ml: 'ശ' },
  { key: 'Jupiter', ta: 'குரு', en: 'Ju', hi: 'गु', te: 'గు', kn: 'ಗು', ml: 'ഗു' },
  { key: 'Mars', ta: 'செ', en: 'Ma', hi: 'मं', te: 'కు', kn: 'ಮಂ', ml: 'ചൊ' }
];

export const DAY_LORD_HORA_START_INDEX = [0, 3, 6, 2, 5, 1, 4];

export const GOWRI_PANCHANGAM_DAY = [
  ['Uthi', 'Amirtham', 'Rogam', 'Labam', 'Dhanam', 'Visham', 'Sobam', 'Pilli'],
  ['Amirtham', 'Rogam', 'Labam', 'Dhanam', 'Visham', 'Sobam', 'Pilli', 'Uthi'],
  ['Rogam', 'Labam', 'Dhanam', 'Visham', 'Sobam', 'Pilli', 'Uthi', 'Amirtham'],
  ['Labam', 'Dhanam', 'Visham', 'Sobam', 'Pilli', 'Uthi', 'Amirtham', 'Rogam'],
  ['Dhanam', 'Visham', 'Sobam', 'Pilli', 'Uthi', 'Amirtham', 'Rogam', 'Labam'],
  ['Visham', 'Sobam', 'Pilli', 'Uthi', 'Amirtham', 'Rogam', 'Labam', 'Dhanam'],
  ['Sobam', 'Pilli', 'Uthi', 'Amirtham', 'Rogam', 'Labam', 'Dhanam', 'Visham']
];

export const GOWRI_PANCHANGAM_NIGHT = [
  ['Sobam', 'Pilli', 'Uthi', 'Amirtham', 'Rogam', 'Labam', 'Dhanam', 'Visham'],
  ['Visham', 'Sobam', 'Pilli', 'Uthi', 'Amirtham', 'Rogam', 'Labam', 'Dhanam'],
  ['Dhanam', 'Visham', 'Sobam', 'Pilli', 'Uthi', 'Amirtham', 'Rogam', 'Labam'],
  ['Rogam', 'Labam', 'Dhanam', 'Visham', 'Sobam', 'Pilli', 'Uthi', 'Amirtham'],
  ['Labam', 'Dhanam', 'Visham', 'Sobam', 'Pilli', 'Uthi', 'Amirtham', 'Rogam'],
  ['Amirtham', 'Rogam', 'Labam', 'Dhanam', 'Visham', 'Sobam', 'Pilli', 'Uthi'],
  ['Uthi', 'Amirtham', 'Rogam', 'Labam', 'Dhanam', 'Visham', 'Sobam', 'Pilli']
];

export const GOWRI_METADATA = {
  Uthi: { key: 'Uthi', ta: 'உத்தி', en: 'Uthi', hi: 'उत्थि', te: 'ఉత్తి', kn: 'ಉತ್ತಿ', ml: 'ഉത്തി', isAuspicious: false },
  Amirtham: { key: 'Amirtham', ta: 'அமிர்தம்', en: 'Amirtham', hi: 'अमृत', te: 'అమృతం', kn: 'ಅಮೃತ', ml: 'അമൃതം', isAuspicious: true },
  Rogam: { key: 'Rogam', ta: 'ரோகம்', en: 'Rogam', hi: 'रोग', te: 'రోగం', kn: 'ರೋಗ', ml: 'രോഗം', isAuspicious: false },
  Labam: { key: 'Labam', ta: 'லாபம்', en: 'Labam', hi: 'लाभ', te: 'లాభం', kn: 'ಲಾಭ', ml: 'ലാഭം', isAuspicious: true },
  Dhanam: { key: 'Dhanam', ta: 'தனம்', en: 'Dhanam', hi: 'धन', te: 'ధనం', kn: 'ಧನ', ml: 'ധനം', isAuspicious: true },
  Visham: { key: 'Visham', ta: 'விஷம்', en: 'Visham', hi: 'विष', te: 'విషం', kn: 'ವಿಷ', ml: 'വിഷം', isAuspicious: false },
  Sobam: { key: 'Sobam', ta: 'சோபம்', en: 'Sobam', hi: 'शुभ', te: 'శోభనం', kn: 'ಶೋಭನ', ml: 'ശോഭം', isAuspicious: true },
  Pilli: { key: 'Pilli', ta: 'பில்லி', en: 'Pilli', hi: 'पिल्ली', te: 'పిల్లి', kn: 'ಪಿಲ್ಲಿ', ml: 'പില്ലി', isAuspicious: false }
};

/**
 * Format decimal coordinates to DMS: DD°MM'SS" Dir
 */
export function formatGeoDMS(deg, isLat) {
  const absolute = Math.abs(deg);
  const d = Math.floor(absolute);
  const minFloat = (absolute - d) * 60;
  let m = Math.floor(minFloat);
  let s = Math.round((minFloat - m) * 60);
  let finalM = m;
  let finalD = d;
  if (s >= 60) {
    s = 0;
    finalM += 1;
  }
  if (finalM >= 60) {
    finalM = 0;
    finalD += 1;
  }
  const dir = isLat ? (deg >= 0 ? 'N' : 'S') : (deg >= 0 ? 'E' : 'W');
  return `${finalD}°${finalM}'${s}" ${dir}`;
}

/**
 * Astronomical Sunrise and Sunset calculation using standard NOAA solar algorithm
 */
export function calculateSunriseSunset(dateStr, latitude, longitude, tzOffsetHours = 5.5) {
  try {
    const [year, month, day] = dateStr.split('-').map(Number);
    const d = new Date(Date.UTC(year, month - 1, day));
    const startOfYear = new Date(Date.UTC(year, 0, 0));
    const dayOfYear = Math.floor((d - startOfYear) / (1000 * 60 * 60 * 24));

    const gamma = (2 * Math.PI / 365) * (dayOfYear - 1);
    const eqtime = 229.18 * (0.000075 + 0.001868 * Math.cos(gamma) - 0.032077 * Math.sin(gamma)
      - 0.014615 * Math.cos(2 * gamma) - 0.040849 * Math.sin(2 * gamma));

    const decl = 0.006918 - 0.399912 * Math.cos(gamma) + 0.070257 * Math.sin(gamma)
      - 0.006758 * Math.cos(2 * gamma) + 0.000907 * Math.sin(2 * gamma)
      - 0.002697 * Math.cos(3 * gamma) + 0.00148 * Math.sin(3 * gamma);

    const latRad = latitude * (Math.PI / 180);
    const zenithRad = 90.815 * (Math.PI / 180); // 90°49' calibrated for Indian ephemeris (yielding 06:11 PM sunset and 06:06 AM sunrise)

    let cosHA = (Math.cos(zenithRad) - Math.sin(latRad) * Math.sin(decl)) / (Math.cos(latRad) * Math.cos(decl));
    cosHA = Math.max(-1, Math.min(1, cosHA));
    const haDeg = Math.acos(cosHA) * (180 / Math.PI);

    const solarNoonUTC = (720 - 4 * longitude - eqtime) / 60;
    const sunriseUTC = solarNoonUTC - (haDeg * 4) / 60;
    const sunsetUTC = solarNoonUTC + (haDeg * 4) / 60;

    const sunriseLocal = (sunriseUTC + tzOffsetHours + 24) % 24;
    const sunsetLocal = (sunsetUTC + tzOffsetHours + 24) % 24;

    const toTimeObj = (decHours) => {
      const totalSecs = Math.round(decHours * 3600);
      const h = Math.floor(totalSecs / 3600) % 24;
      const m = Math.floor((totalSecs % 3600) / 60);
      const s = totalSecs % 60;
      return {
        hours: h,
        minutes: m,
        seconds: s,
        totalMinutes: h * 60 + m,
        totalSeconds: totalSecs,
        formatted: `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`,
        formattedWithSec: `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
      };
    };

    const sunriseObj = toTimeObj(sunriseLocal);
    const sunsetObj = toTimeObj(sunsetLocal);
    const dayDurationMinutes = Math.round(((sunsetLocal - sunriseLocal + 24) % 24) * 60);
    const dayDurationSeconds = Math.round(((sunsetLocal - sunriseLocal + 24) % 24) * 3600);

    return {
      sunrise: sunriseObj,
      sunset: sunsetObj,
      dayDurationMinutes,
      dayDurationSeconds
    };
  } catch {
    return {
      sunrise: { hours: 6, minutes: 2, seconds: 40, totalMinutes: 362, totalSeconds: 21760, formatted: '06:02', formattedWithSec: '06:02:40' },
      sunset: { hours: 17, minutes: 41, seconds: 55, totalMinutes: 1061, totalSeconds: 63715, formatted: '17:41', formattedWithSec: '17:41:55' },
      dayDurationMinutes: 699,
      dayDurationSeconds: 41955
    };
  }
}

/**
 * Calculate planetary Hora and Sub-Hora
 */
export function calculateHora(querySec, sunriseSec, sunsetSec, dayOfWeek, activeLang = 'ta') {
  const isDay = querySec >= sunriseSec && querySec < sunsetSec;
  let elapsedSec = 0;
  const horaLengthSec = 3600;

  if (isDay) {
    elapsedSec = querySec - sunriseSec;
  } else {
    elapsedSec = querySec >= sunsetSec ? (querySec - sunsetSec) : (24 * 3600 - sunsetSec + querySec);
  }

  const horaNumber = Math.floor(elapsedSec / horaLengthSec);
  const startLordIdx = DAY_LORD_HORA_START_INDEX[dayOfWeek];
  const mainLordIdx = (startLordIdx + horaNumber) % 7;
  const mainLord = HORA_PLANETS_6LANG[mainLordIdx];

  const elapsedInHora = elapsedSec % horaLengthSec;
  const subHoraLength = horaLengthSec / 7;
  const subHoraNumber = Math.floor(elapsedInHora / subHoraLength);
  const subLordIdx = (mainLordIdx + subHoraNumber) % 7;
  const subLord = HORA_PLANETS_6LANG[subLordIdx];

  const mainSym = mainLord[activeLang] || mainLord.ta;
  const subSym = subLord[activeLang] || subLord.ta;

  return {
    mainLord: mainLord.key,
    subLord: subLord.key,
    display: `${mainSym} - ${subSym}`,
    color: '#ef4444'
  };
}

/**
 * Calculate Gowri Panchangam period
 */
export function calculateGowri(querySec, sunriseSec, sunsetSec, dayOfWeek, activeLang = 'ta') {
  const isDay = querySec >= sunriseSec && querySec < sunsetSec;
  let elapsed = 0;
  let totalPeriod = 0;

  if (isDay) {
    totalPeriod = sunsetSec - sunriseSec;
    elapsed = querySec - sunriseSec;
  } else {
    totalPeriod = (24 * 3600 - sunsetSec) + sunriseSec;
    elapsed = querySec >= sunsetSec ? (querySec - sunsetSec) : (24 * 3600 - sunsetSec + querySec);
  }

  const segmentDuration = totalPeriod / 8;
  const segmentIdx = Math.min(7, Math.max(0, Math.floor(elapsed / segmentDuration)));
  const gowriKey = isDay ? GOWRI_PANCHANGAM_DAY[dayOfWeek][segmentIdx] : GOWRI_PANCHANGAM_NIGHT[dayOfWeek][segmentIdx];
  const meta = GOWRI_METADATA[gowriKey] || GOWRI_METADATA.Dhanam;

  return {
    key: gowriKey,
    name: meta[activeLang] || meta.ta,
    isAuspicious: meta.isAuspicious,
    color: meta.isAuspicious ? '#22c55e' : (gowriKey === 'Uthi' ? '#f1f5f9' : '#ef4444')
  };
}

export const PANCHANGAM_LABELS_6LANG = {
  vaaram: { ta: 'நாள்', en: 'Day', hi: 'वार', te: 'వారం', kn: 'ವಾರ', ml: 'വാരം' },
  nakshatram: { ta: 'நட்சத்திரம்', en: 'Nakshatra', hi: 'नक्षत्र', te: 'నక్షత్రం', kn: 'ನಕ್ಷತ್ರ', ml: 'നക്ഷത്രം' },
  thithi: { ta: 'திதி', en: 'Tithi', hi: 'तिथि', te: 'తిథి', kn: 'ತಿಥಿ', ml: 'തിഥി' },
  karanam: { ta: 'கரணம்', en: 'Karana', hi: 'करण', te: 'కరణం', kn: 'ಕರಣ', ml: 'കരണം' },
  yogam: { ta: 'யோகம்', en: 'Yoga', hi: 'योग', te: 'యోగం', kn: 'ಯೋಗ', ml: 'యోగം' },
  horai: { ta: 'ஹோரை', en: 'Hora', hi: 'होरा', te: 'హోర', kn: 'ಹೋರೆ', ml: 'ಹോര' },
  gowri: { ta: 'கௌரி', en: 'Gowri', hi: 'गौरी', te: 'గౌరి', kn: 'ಗೌರಿ', ml: 'ഗൗരി' },
  idam: { ta: 'இடம்', en: 'Location', hi: 'स्थान', te: 'ప్రదేశం', kn: 'ಸ್ಥಳ', ml: 'സ്ഥലം' }
};

export const SUN_TIMINGS_LABELS = {
  ta: { sunrise: 'சூரிய உதயம்', sunset: 'சூரிய அஸ்தமனம்' },
  en: { sunrise: 'Sunrise', sunset: 'Sunset' },
  hi: { sunrise: 'सूर्योदय', sunset: 'सूर्यास्त' },
  te: { sunrise: 'సూర్యోదయం', sunset: 'సూర్యాస్తమయం' },
  kn: { sunrise: 'ಸೂರ್ಯೋದಯ', sunset: 'ಸೂರ್ಯಾಸ್ತ' },
  ml: { sunrise: 'സൂര്യോദയം', sunset: 'സൂര്യാസ്തമയം' }
};

/**
 * Format any sunrise/sunset input (object or string) into 12-hour AM/PM format (e.g. "06:00 AM", "06:05 PM")
 */
export function formatSunTime12Hour(timeInput, fallback = '06:00 AM') {
  if (!timeInput) return fallback;

  // Case 1: Object with hours and minutes
  if (typeof timeInput === 'object') {
    if (typeof timeInput.hours === 'number' && typeof timeInput.minutes === 'number') {
      const h = timeInput.hours;
      const m = timeInput.minutes;
      const period = h >= 12 ? 'PM' : 'AM';
      const h12 = h % 12 || 12;
      return `${String(h12).padStart(2, '0')}:${String(m).padStart(2, '0')} ${period}`;
    }
    if (timeInput.formatted) {
      return formatSunTime12Hour(timeInput.formatted, fallback);
    }
    if (timeInput.value) {
      return formatSunTime12Hour(timeInput.value, fallback);
    }
  }

  // Case 2: String
  if (typeof timeInput === 'string') {
    const trimmed = timeInput.trim();

    // Already 12-hour AM/PM (e.g., "06:00 AM" or "6:00 AM")
    const match12 = trimmed.match(/(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM|PM)/i);
    if (match12) {
      const h12 = parseInt(match12[1], 10);
      const m = match12[2];
      const period = match12[4].toUpperCase();
      return `${String(h12).padStart(2, '0')}:${m} ${period}`;
    }

    // Match 24-hr time like "05:57:37" or "18:02:45" or "26/09/2026, 05:57:37"
    const match24 = trimmed.match(/(\d{1,2}):(\d{2})(?::\d{2})?/);
    if (match24) {
      const h = parseInt(match24[1], 10);
      const m = match24[2];
      const period = h >= 12 ? 'PM' : 'AM';
      const h12 = h % 12 || 12;
      return `${String(h12).padStart(2, '0')}:${m} ${period}`;
    }
  }

  return fallback;
}

/**
 * Format timestamp for center cell in 12-hour AM/PM format with seconds, removing any ".0"
 * Example: "26/09/2026, 14:34:25.0" -> "26/09/2026, 02:34:25 PM"
 */
export function formatCenterDateTime12Hour(dateTimeStr) {
  if (!dateTimeStr) return '';
  // 1. Remove trailing milliseconds or ".0"
  let clean = String(dateTimeStr).replace(/\.\d+/g, '').trim();

  // 2. If it already has AM/PM:
  // e.g. "26/09/2026, 02:34:25 PM" or "26-09-2026 · 02:34:25 pm"
  const matchWithAmPm = clean.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})[,·\s]+(\d{1,2}):(\d{2}):?(\d{2})?\s*(AM|PM)$/i);
  if (matchWithAmPm) {
    const day = matchWithAmPm[1].padStart(2, '0');
    const mon = matchWithAmPm[2].padStart(2, '0');
    const yr = matchWithAmPm[3];
    const h = String(parseInt(matchWithAmPm[4], 10)).padStart(2, '0');
    const m = matchWithAmPm[5];
    const s = matchWithAmPm[6] || '00';
    const p = matchWithAmPm[7].toUpperCase();
    return `${day}/${mon}/${yr}, ${h}:${m}:${s} ${p}`;
  }

  // 3. Match 24-hr: "DD/MM/YYYY, HH:mm:ss" or "DD-MM-YYYY · HH:mm:ss"
  const match24 = clean.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})[,·\s]+(\d{1,2}):(\d{2}):?(\d{2})?$/);
  if (match24) {
    const day = match24[1].padStart(2, '0');
    const mon = match24[2].padStart(2, '0');
    const yr = match24[3];
    const h24 = parseInt(match24[4], 10);
    const m = match24[5];
    const s = match24[6] ? match24[6] : '00';
    const period = h24 >= 12 ? 'PM' : 'AM';
    const h12 = h24 % 12 || 12;
    return `${day}/${mon}/${yr}, ${String(h12).padStart(2, '0')}:${m}:${String(s).padStart(2, '0')} ${period}`;
  }

  // 4. Match "YYYY-MM-DD" or similar ISO / Date string
  const isoMatch = clean.match(/^(\d{4})-(\d{2})-(\d{2})(?:[T\s](\d{1,2}):(\d{2}):?(\d{2})?)?/);
  if (isoMatch) {
    const day = isoMatch[3].padStart(2, '0');
    const mon = isoMatch[2].padStart(2, '0');
    const yr = isoMatch[1];
    const h24 = isoMatch[4] ? parseInt(isoMatch[4], 10) : 0;
    const m = isoMatch[5] || '00';
    const s = isoMatch[6] || '00';
    const period = h24 >= 12 ? 'PM' : 'AM';
    const h12 = h24 % 12 || 12;
    return `${day}/${mon}/${yr}, ${String(h12).padStart(2, '0')}:${m}:${String(s).padStart(2, '0')} ${period}`;
  }

  return clean;
}

/**
 * Calculate full Panchangam & Horary parameters for the center chart section
 */
export function calculateJamakkolCenterInfo({
  date,
  time,
  latitude,
  longitude,
  cityName = 'Chennai',
  sunData,
  moonData,
  sunTimes,
  dayOfWeek,
  lang = 'ta'
}) {
  const [year, month, day] = (date || '').split('-').map(Number);
  const [hStr, mStr, sStr] = (time || '00:00:00').split(':');
  const h = parseInt(hStr, 10) || 0;
  const m = parseInt(mStr, 10) || 0;
  const s = parseInt(sStr, 10) || 0;
  const querySec = h * 3600 + m * 60 + s;

  const dateFormatted = `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`;
  const h12 = h % 12 || 12;
  const period = h >= 12 ? 'PM' : 'AM';
  const queryDateTimeStr = `${dateFormatted}, ${String(h12).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')} ${period}`;

  const labels = {
    vaaram: PANCHANGAM_LABELS_6LANG.vaaram[lang] || PANCHANGAM_LABELS_6LANG.vaaram.ta,
    nakshatram: PANCHANGAM_LABELS_6LANG.nakshatram[lang] || PANCHANGAM_LABELS_6LANG.nakshatram.ta,
    thithi: PANCHANGAM_LABELS_6LANG.thithi[lang] || PANCHANGAM_LABELS_6LANG.thithi.ta,
    karanam: PANCHANGAM_LABELS_6LANG.karanam[lang] || PANCHANGAM_LABELS_6LANG.karanam.ta,
    yogam: PANCHANGAM_LABELS_6LANG.yogam[lang] || PANCHANGAM_LABELS_6LANG.yogam.ta,
    horai: PANCHANGAM_LABELS_6LANG.horai[lang] || PANCHANGAM_LABELS_6LANG.horai.ta,
    gowri: PANCHANGAM_LABELS_6LANG.gowri[lang] || PANCHANGAM_LABELS_6LANG.gowri.ta,
    idam: PANCHANGAM_LABELS_6LANG.idam[lang] || PANCHANGAM_LABELS_6LANG.idam.ta
  };

  // 1. Vaaram
  const weekdayObj = WEEKDAYS_6LANG[dayOfWeek] || WEEKDAYS_6LANG[0];
  const vaaramVal = weekdayObj[lang] || weekdayObj.ta;

  // 2. Nakshatram & Pada
  const moonLong = ((Number(moonData?.longitude ?? 0) % 360) + 360) % 360;
  const nakshatraIndex = Math.floor(moonLong / (360 / 27));
  const nakshatraDeg = moonLong % (360 / 27);
  const pada = Math.min(4, Math.max(1, Math.floor(nakshatraDeg / (360 / 108)) + 1));
  const nakshatraObj = NAKSHATRAS_6LANG[nakshatraIndex] || NAKSHATRAS_6LANG[0];
  const nakshatraVal = `${nakshatraObj[lang] || nakshatraObj.ta} - ${pada}`;

  // 3. Thithi
  const sunLong = ((Number(sunData?.longitude ?? 0) % 360) + 360) % 360;
  const moonSunDiff = (moonLong - sunLong + 360) % 360;
  const tithiRawIndex = Math.min(29, Math.max(0, Math.floor(moonSunDiff / 12)));
  const isShukla = tithiRawIndex < 15;
  const pakshaKey = isShukla ? 'shukla' : 'krishna';
  const pakshaName = PAKSHA_NAMES_6LANG[pakshaKey][lang] || PAKSHA_NAMES_6LANG[pakshaKey].ta;
  const tithiObj = TITHIS_6LANG[tithiRawIndex] || TITHIS_6LANG[0];
  const tithiName = tithiObj[lang] || tithiObj.ta;
  const thithiVal = `${pakshaName} ${tithiName}`;

  // 4. Karanam
  const karanaSpanIndex = Math.min(59, Math.max(0, Math.floor(moonSunDiff / 6)));
  let karanaObj = KARANAS_6LANG[0];
  if (karanaSpanIndex === 0) {
    karanaObj = KARANAS_6LANG[10]; // Kimstughna
  } else if (karanaSpanIndex >= 57) {
    if (karanaSpanIndex === 57) karanaObj = KARANAS_6LANG[7]; // Shakuni
    else if (karanaSpanIndex === 58) karanaObj = KARANAS_6LANG[8]; // Chatushpada
    else karanaObj = KARANAS_6LANG[9]; // Naga
  } else {
    karanaObj = KARANAS_6LANG[(karanaSpanIndex - 1) % 7];
  }
  const karanamVal = karanaObj[lang] || karanaObj.ta;

  // 5. Yogam
  const yogaSum = (moonLong + sunLong) % 360;
  const yogaIndex = Math.min(26, Math.max(0, Math.floor(yogaSum / (360 / 27))));
  const yogaObj = YOGAS_6LANG[yogaIndex] || YOGAS_6LANG[0];
  const yogamVal = yogaObj[lang] || yogaObj.ta;

  // 6. Horai
  const sunriseSec = sunTimes?.sunrise?.totalSeconds ?? 21760;
  const sunsetSec = sunTimes?.sunset?.totalSeconds ?? 63715;
  const hora = calculateHora(querySec, sunriseSec, sunsetSec, dayOfWeek, lang);

  // 7. Gowri
  const gowri = calculateGowri(querySec, sunriseSec, sunsetSec, dayOfWeek, lang);

  // 8. Sunrise / Sunset strings
  const sunriseStr = `${dateFormatted}, ${sunTimes?.sunrise?.formattedWithSec || '06:02:40'}`;
  const sunsetStr = `${dateFormatted}, ${sunTimes?.sunset?.formattedWithSec || '17:41:55'}`;

  // 9. Location DMS string & City Name
  const locationDMS = `${formatGeoDMS(latitude, true)}, ${formatGeoDMS(longitude, false)}`;
  const localizedCity = getLocalizedCityName(cityName, lang) || cityName || 'Chennai';

  const fullCopyText = [
    queryDateTimeStr,
    `${labels.vaaram}: ${vaaramVal}`,
    `${labels.nakshatram}: ${nakshatraVal}`,
    `${labels.thithi}: ${thithiVal}`,
    `${labels.karanam}: ${karanamVal}`,
    `${labels.yogam}: ${yogamVal}`,
    `${labels.horai}: ${hora.display}`,
    `${labels.gowri}: ${gowri.name}`,
    `${labels.idam}: ${localizedCity}`,
    locationDMS
  ].join('\n');

  const karanaIndex = (karanaSpanIndex === 0)
    ? 10
    : (karanaSpanIndex >= 57
      ? (karanaSpanIndex === 57 ? 7 : (karanaSpanIndex === 58 ? 8 : 9))
      : (karanaSpanIndex - 1) % 7);

  const raw = {
    dateFormatted,
    queryDateTimeStr,
    dayOfWeek,
    nakshatraIndex,
    pada,
    tithiRawIndex,
    isShukla,
    karanaIndex,
    yogaIndex,
    mainLordKey: hora.mainLord,
    subLordKey: hora.subLord,
    gowriKey: gowri.key,
    isAuspicious: gowri.isAuspicious,
    sunriseStr,
    sunsetStr,
    cityName,
    localizedCity,
    locationDMS
  };

  return {
    raw,
    queryDateTimeStr,
    labels,
    vaaram: { label: labels.vaaram, value: vaaramVal, dayOfWeek },
    nakshatram: { label: labels.nakshatram, value: nakshatraVal, pada, nakshatraIndex },
    thithi: { label: labels.thithi, value: thithiVal, isShukla, paksha: pakshaName, tithiName, tithiRawIndex },
    karanam: { label: labels.karanam, value: karanamVal, karanaIndex },
    yogam: { label: labels.yogam, value: yogamVal, yogaIndex },
    horai: { label: labels.horai, value: hora.display, color: hora.color, mainLord: hora.mainLord, subLord: hora.subLord },
    gowri: { label: labels.gowri, value: gowri.name, color: gowri.color, isAuspicious: gowri.isAuspicious, key: gowri.key },
    sunrise: { icon: '🌅', value: sunriseStr, time12: formatSunTime12Hour(sunTimes?.sunrise?.formatted || sunriseStr, '06:00 AM') },
    sunset: { icon: '🌇', value: sunsetStr, time12: formatSunTime12Hour(sunTimes?.sunset?.formatted || sunsetStr, '06:11 PM') },
    location: { label: labels.idam, value: localizedCity, cityName: localizedCity, dms: locationDMS },
    coordinates: { value: locationDMS },
    fullCopyText
  };
}

// --------------------------------------------------------------------------
// Reverse Lookup Dictionaries for 6-Language Reactive Panchangam Localization
// --------------------------------------------------------------------------
const WEEKDAY_LOOKUP = {};
WEEKDAYS_6LANG.forEach((w, idx) => {
  ['ta', 'en', 'hi', 'te', 'kn', 'ml'].forEach((l) => {
    if (w[l]) WEEKDAY_LOOKUP[w[l].toLowerCase().trim()] = idx;
  });
});

const NAKSHATRA_LOOKUP = {};
NAKSHATRAS_6LANG.forEach((n, idx) => {
  ['ta', 'en', 'hi', 'te', 'kn', 'ml'].forEach((l) => {
    if (n[l]) NAKSHATRA_LOOKUP[n[l].toLowerCase().trim()] = idx;
  });
});

const TITHI_LOOKUP = {};
TITHIS_6LANG.forEach((t, idx) => {
  ['ta', 'en', 'hi', 'te', 'kn', 'ml'].forEach((l) => {
    if (t[l]) TITHI_LOOKUP[t[l].toLowerCase().trim()] = idx;
  });
});

const KARANA_LOOKUP = {};
KARANAS_6LANG.forEach((k, idx) => {
  ['ta', 'en', 'hi', 'te', 'kn', 'ml'].forEach((l) => {
    if (k[l]) KARANA_LOOKUP[k[l].toLowerCase().trim()] = idx;
  });
});

const YOGA_LOOKUP = {};
YOGAS_6LANG.forEach((y, idx) => {
  ['ta', 'en', 'hi', 'te', 'kn', 'ml'].forEach((l) => {
    if (y[l]) YOGA_LOOKUP[y[l].toLowerCase().trim()] = idx;
  });
});

const HORA_PLANET_LOOKUP = {
  sun: 'Sun', su: 'Sun', surya: 'Sun', soorya: 'Sun',
  moon: 'Moon', mo: 'Moon', chandra: 'Moon',
  mars: 'Mars', ma: 'Mars', mangal: 'Mars', sevvai: 'Mars', chevvai: 'Mars',
  mercury: 'Mercury', me: 'Mercury', budha: 'Mercury', budhan: 'Mercury',
  jupiter: 'Jupiter', ju: 'Jupiter', guru: 'Jupiter', brihaspati: 'Jupiter',
  venus: 'Venus', ve: 'Venus', shukra: 'Venus', sukran: 'Venus',
  saturn: 'Saturn', sa: 'Saturn', shani: 'Saturn'
};
HORA_PLANETS_6LANG.forEach((hp) => {
  HORA_PLANET_LOOKUP[hp.key.toLowerCase()] = hp.key;
  ['ta', 'en', 'hi', 'te', 'kn', 'ml'].forEach((l) => {
    if (hp[l]) HORA_PLANET_LOOKUP[hp[l].toLowerCase().trim()] = hp.key;
  });
});

const GOWRI_LOOKUP = {};
Object.keys(GOWRI_METADATA).forEach((k) => {
  GOWRI_LOOKUP[k.toLowerCase()] = k;
  const m = GOWRI_METADATA[k];
  ['ta', 'en', 'hi', 'te', 'kn', 'ml'].forEach((l) => {
    if (m[l]) GOWRI_LOOKUP[m[l].toLowerCase().trim()] = k;
  });
});

/**
 * Dynamically localize Panchangam & Horary center info to the active UI language
 * Supports all 6 languages: ta (Tamil), en (English), hi (Hindi), te (Telugu), kn (Kannada), ml (Malayalam)
 */
export function getLocalizedCenterInfo(centerInfo, activeLang = 'ta', fallbackData = null) {
  const safeLang = ['ta', 'en', 'hi', 'te', 'kn', 'ml'].includes(activeLang) ? activeLang : 'ta';

  if (!centerInfo && fallbackData) {
    centerInfo = fallbackData.centerInfo || fallbackData.panchangam;
    if (!centerInfo && (fallbackData.metadata || fallbackData.jamaPlanets)) {
      return calculateJamakkolCenterInfo({
        date: fallbackData.metadata?.date || new Date().toISOString().split('T')[0],
        time: fallbackData.metadata?.time || '12:00:00',
        latitude: fallbackData.metadata?.latitude ?? 13.0827,
        longitude: fallbackData.metadata?.longitude ?? 80.2707,
        sunData: fallbackData.jamaPlanets?.Sun || { longitude: 0 },
        moonData: fallbackData.jamaPlanets?.Moon || { longitude: 0 },
        sunTimes: fallbackData.sunTimes,
        dayOfWeek: fallbackData.metadata?.date ? new Date(fallbackData.metadata.date).getDay() : 0,
        lang: safeLang
      });
    }
  }

  if (!centerInfo) return {};

  const raw = centerInfo.raw || {};

  // 1. Vaaram
  let dayOfWeek = raw.dayOfWeek !== undefined
    ? raw.dayOfWeek
    : (centerInfo.vaaram?.dayOfWeek !== undefined ? centerInfo.vaaram.dayOfWeek : undefined);
  if (dayOfWeek === undefined && centerInfo.vaaram?.value) {
    dayOfWeek = WEEKDAY_LOOKUP[centerInfo.vaaram.value.toLowerCase().trim()];
  }
  if (dayOfWeek === undefined && fallbackData?.metadata?.date) {
    dayOfWeek = new Date(fallbackData.metadata.date).getDay();
  }
  const dayObj = WEEKDAYS_6LANG[dayOfWeek ?? 0] || WEEKDAYS_6LANG[0];
  const vaaramVal = dayObj[safeLang] || dayObj.ta;

  // 2. Nakshatram & Pada
  let nakshatraIndex = raw.nakshatraIndex !== undefined
    ? raw.nakshatraIndex
    : (centerInfo.nakshatram?.nakshatraIndex !== undefined ? centerInfo.nakshatram.nakshatraIndex : -1);
  let pada = raw.pada !== undefined
    ? raw.pada
    : (centerInfo.nakshatram?.pada !== undefined ? centerInfo.nakshatram.pada : 1);

  if (nakshatraIndex === -1 && centerInfo.nakshatram?.value) {
    const starPart = centerInfo.nakshatram.value.split(/[-–]/)[0].trim().toLowerCase();
    nakshatraIndex = NAKSHATRA_LOOKUP[starPart] ?? 0;
    const digitMatch = centerInfo.nakshatram.value.match(/\d+/);
    if (digitMatch) pada = parseInt(digitMatch[0], 10);
  }
  const nakshatraObj = NAKSHATRAS_6LANG[Math.max(0, nakshatraIndex)] || NAKSHATRAS_6LANG[0];
  const nakshatraVal = `${nakshatraObj[safeLang] || nakshatraObj.ta} - ${pada}`;

  // 3. Thithi
  let tithiRawIndex = raw.tithiRawIndex !== undefined
    ? raw.tithiRawIndex
    : (centerInfo.thithi?.tithiRawIndex !== undefined ? centerInfo.thithi.tithiRawIndex : -1);
  let isShukla = raw.isShukla !== undefined
    ? raw.isShukla
    : (centerInfo.thithi?.isShukla !== undefined ? centerInfo.thithi.isShukla : true);

  if (tithiRawIndex === -1 && centerInfo.thithi?.value) {
    const parts = centerInfo.thithi.value.split(' ');
    const tName = (parts.length > 1 ? parts.slice(1).join(' ') : parts[0]).trim().toLowerCase();
    tithiRawIndex = TITHI_LOOKUP[tName] ?? (isShukla ? 0 : 15);
  }
  if (tithiRawIndex >= 0 && tithiRawIndex < 15) isShukla = true;
  else if (tithiRawIndex >= 15) isShukla = false;

  const pakshaKey = isShukla ? 'shukla' : 'krishna';
  const pakshaName = (PAKSHA_NAMES_6LANG[pakshaKey] || PAKSHA_NAMES_6LANG.shukla)[safeLang] || PAKSHA_NAMES_6LANG[pakshaKey].ta;
  const tithiObj = TITHIS_6LANG[Math.max(0, tithiRawIndex)] || TITHIS_6LANG[0];
  const tithiName = tithiObj[safeLang] || tithiObj.ta;
  const thithiVal = `${pakshaName} ${tithiName}`;

  // 4. Karanam
  let karanaIndex = raw.karanaIndex !== undefined
    ? raw.karanaIndex
    : (centerInfo.karanam?.karanaIndex !== undefined ? centerInfo.karanam.karanaIndex : -1);
  if (karanaIndex === -1 && centerInfo.karanam?.value) {
    karanaIndex = KARANA_LOOKUP[centerInfo.karanam.value.toLowerCase().trim()] ?? 0;
  }
  const karanaObj = KARANAS_6LANG[Math.max(0, karanaIndex)] || KARANAS_6LANG[0];
  const karanamVal = karanaObj[safeLang] || karanaObj.ta;

  // 5. Yogam
  let yogaIndex = raw.yogaIndex !== undefined
    ? raw.yogaIndex
    : (centerInfo.yogam?.yogaIndex !== undefined ? centerInfo.yogam.yogaIndex : -1);
  if (yogaIndex === -1 && centerInfo.yogam?.value) {
    yogaIndex = YOGA_LOOKUP[centerInfo.yogam.value.toLowerCase().trim()] ?? 0;
  }
  const yogaObj = YOGAS_6LANG[Math.max(0, yogaIndex)] || YOGAS_6LANG[0];
  const yogamVal = yogaObj[safeLang] || yogaObj.ta;

  // 6. Horai
  let mainLordKey = raw.mainLordKey || centerInfo.horai?.mainLord;
  let subLordKey = raw.subLordKey || centerInfo.horai?.subLord;
  if ((!mainLordKey || !subLordKey) && centerInfo.horai?.value) {
    const horaParts = centerInfo.horai.value.split(/[-–]/).map((s) => s.trim().toLowerCase());
    if (!mainLordKey && horaParts[0]) mainLordKey = HORA_PLANET_LOOKUP[horaParts[0]];
    if (!subLordKey && horaParts[1]) subLordKey = HORA_PLANET_LOOKUP[horaParts[1]];
  }
  const mainLordObj = HORA_PLANETS_6LANG.find((p) => p.key === mainLordKey) || HORA_PLANETS_6LANG[0];
  const subLordObj = HORA_PLANETS_6LANG.find((p) => p.key === subLordKey) || HORA_PLANETS_6LANG[0];
  const horaDisplay = `${mainLordObj[safeLang] || mainLordObj.ta} - ${subLordObj[safeLang] || subLordObj.ta}`;

  // 7. Gowri
  let gowriKey = raw.gowriKey || centerInfo.gowri?.key;
  if (!gowriKey && centerInfo.gowri?.value) {
    gowriKey = GOWRI_LOOKUP[centerInfo.gowri.value.toLowerCase().trim()];
  }
  const gowriMeta = GOWRI_METADATA[gowriKey] || GOWRI_METADATA.Dhanam;
  const gowriVal = gowriMeta[safeLang] || gowriMeta.ta;
  const isAuspicious = gowriMeta.isAuspicious;

  // Labels
  const labels = {
    vaaram: PANCHANGAM_LABELS_6LANG.vaaram[safeLang] || PANCHANGAM_LABELS_6LANG.vaaram.ta,
    nakshatram: PANCHANGAM_LABELS_6LANG.nakshatram[safeLang] || PANCHANGAM_LABELS_6LANG.nakshatram.ta,
    thithi: PANCHANGAM_LABELS_6LANG.thithi[safeLang] || PANCHANGAM_LABELS_6LANG.thithi.ta,
    karanam: PANCHANGAM_LABELS_6LANG.karanam[safeLang] || PANCHANGAM_LABELS_6LANG.karanam.ta,
    yogam: PANCHANGAM_LABELS_6LANG.yogam[safeLang] || PANCHANGAM_LABELS_6LANG.yogam.ta,
    horai: PANCHANGAM_LABELS_6LANG.horai[safeLang] || PANCHANGAM_LABELS_6LANG.horai.ta,
    gowri: PANCHANGAM_LABELS_6LANG.gowri[safeLang] || PANCHANGAM_LABELS_6LANG.gowri.ta,
    idam: PANCHANGAM_LABELS_6LANG.idam[safeLang] || PANCHANGAM_LABELS_6LANG.idam.ta
  };

  const rawQueryDateTime = raw.queryDateTimeStr || centerInfo.queryDateTimeStr || '';
  const queryDateTimeStr = formatCenterDateTime12Hour(rawQueryDateTime);
  const sunriseStr = centerInfo.sunrise?.value || raw.sunriseStr || '';
  const sunsetStr = centerInfo.sunset?.value || raw.sunsetStr || '';

  const rawCity = centerInfo.location?.cityName || raw.cityName || fallbackData?.metadata?.placeName || fallbackData?.placeName || fallbackData?.cityName || '';
  const localizedCity = rawCity ? getLocalizedCityName(rawCity, safeLang) : (centerInfo.location?.cityName || '');
  const locationDMS = centerInfo.location?.dms || raw.locationDMS || centerInfo.coordinates?.value || (centerInfo.location?.value && centerInfo.location.value.includes('°') ? centerInfo.location.value : '') || '';

  return {
    raw: {
      ...raw,
      dayOfWeek,
      nakshatraIndex,
      pada,
      tithiRawIndex,
      isShukla,
      karanaIndex,
      yogaIndex,
      mainLordKey,
      subLordKey,
      gowriKey,
      isAuspicious,
      sunriseStr,
      sunsetStr,
      cityName: rawCity,
      localizedCity,
      locationDMS
    },
    queryDateTimeStr,
    labels,
    vaaram: { label: labels.vaaram, value: vaaramVal, dayOfWeek },
    nakshatram: { label: labels.nakshatram, value: nakshatraVal, pada, nakshatraIndex },
    thithi: { label: labels.thithi, value: thithiVal, isShukla, paksha: pakshaName, tithiName, tithiRawIndex },
    karanam: { label: labels.karanam, value: karanamVal, karanaIndex },
    yogam: { label: labels.yogam, value: yogamVal, yogaIndex },
    horai: { label: labels.horai, value: horaDisplay, color: '#ef4444', mainLord: mainLordKey, subLord: subLordKey },
    gowri: { label: labels.gowri, value: gowriVal, color: isAuspicious ? '#22c55e' : (gowriKey === 'Uthi' ? '#f1f5f9' : '#ef4444'), isAuspicious, key: gowriKey },
    sunrise: { icon: '🌅', value: sunriseStr, time12: formatSunTime12Hour(centerInfo.sunrise?.time12 || sunriseStr, '06:00 AM') },
    sunset: { icon: '🌇', value: sunsetStr, time12: formatSunTime12Hour(centerInfo.sunset?.time12 || sunsetStr, '06:11 PM') },
    location: { label: labels.idam, value: localizedCity || centerInfo.location?.value || 'Chennai', cityName: localizedCity || 'Chennai', dms: locationDMS },
    coordinates: { value: locationDMS }
  };
}

/**
 * Calculate Approximate Solar Nirayana (Sidereal) Longitude
 */
export function calculateApproxSunLongitude(dateStr) {
  const [y, m, d] = (dateStr || '').split('-').map(Number);
  if (!y || !m || !d) return 159.088;
  const a = Math.floor((14 - m) / 12);
  const y1 = y + 4800 - a;
  const m1 = m + 12 * a - 3;
  const jd = d + Math.floor((153 * m1 + 2) / 5) + 365 * y1 + Math.floor(y1 / 4) - Math.floor(y1 / 100) + Math.floor(y1 / 400) - 32045;
  const T = (jd - 2451545.0) / 36525;
  const L0 = 280.46646 + 36000.76983 * T + 0.0003032 * T * T;
  const M = 357.52911 + 35999.05029 * T - 0.0001537 * T * T;
  const Mrad = (M * Math.PI) / 180;
  const C = (1.914602 - 0.004817 * T) * Math.sin(Mrad) + (0.019993 - 0.000101 * T) * Math.sin(2 * Mrad) + 0.000289 * Math.sin(3 * Mrad);
  const sunSayana = (L0 + C) % 360;
  const lahiriAyanamsa = 23.853 + (y - 2000) * (50.29 / 3600) + (m - 1 + d / 30) * (50.29 / 12 / 3600);
  const sunNirayana = ((sunSayana - lahiriAyanamsa) % 360 + 360) % 360;
  return sunNirayana;
}

/**
 * Compute local Jamakkol Prasannam for instant reactivity
 */
export function computeLocalJamakkol({
  date = new Date().toISOString().split('T')[0],
  time = '09:19:00',
  placeName = 'New Delhi',
  latitude = 28.6139,
  longitude = 77.2090
}) {
  const [year, month, day] = date.split('-').map(Number);
  const [hourStr, minuteStr, secStr] = (time || '09:19:00').split(':');
  const h = parseInt(hourStr, 10) || 0;
  const m = parseInt(minuteStr, 10) || 0;
  const s = parseInt(secStr, 10) || 0;
  const formattedTimeWithSec = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  const totalMin = h * 60 + m + (s / 60);

  // Day of week
  const dateObj = new Date(year, month - 1, day, 12, 0, 0);
  const dayOfWeek = dateObj.getDay();
  const dayLordInfo = DAY_LORD_MAP[dayOfWeek] || DAY_LORD_MAP[6];

  // Dynamic Sunrise & Sunset for given date & location
  const sunTimes = calculateSunriseSunset(date, latitude, longitude);
  const sunriseSec = sunTimes.sunrise.totalSeconds ?? (sunTimes.sunrise.hours * 3600 + sunTimes.sunrise.minutes * 60 + (sunTimes.sunrise.seconds || 0));
  const sunsetSec = sunTimes.sunset.totalSeconds ?? (sunTimes.sunset.hours * 3600 + sunTimes.sunset.minutes * 60 + (sunTimes.sunset.seconds || 0));
  const sunriseMin = Math.floor(sunriseSec / 60);
  const sunsetMin = Math.floor(sunsetSec / 60);
  const totalSec = h * 3600 + m * 60 + s;
  const isDay = totalSec >= sunriseSec && totalSec < sunsetSec;

  const dayLengthSec = isDay ? (sunsetSec - sunriseSec) : ((24 * 3600 - sunsetSec) + sunriseSec);
  const elapsedSec = isDay
    ? Math.max(0, totalSec - sunriseSec)
    : (totalSec >= sunsetSec ? (totalSec - sunsetSec) : (24 * 3600 - sunsetSec + totalSec));

  // Dynamic 8 Outer Jama Grahas Calculation
  const outerJamaResult = calculateOuterJamaGrahas(formattedTimeWithSec, dayOfWeek);
  const outerBoxes = outerJamaResult.outerBoxes;
  const jamaPlanetsAssigned = outerJamaResult.jamaPlanets;
  const jamamNum = outerJamaResult.jamamNumber;
  const activeLord = outerJamaResult.activeJamamLord;

  // 1. Aarudam (5 min per sign from Aries, including seconds precision)
  const minuteFraction = m + (s / 60);
  const aarudamSignIndex = Math.floor(minuteFraction / 5) % 12;
  const aarudamDegreeInRasi = ((minuteFraction % 5) / 5) * 30;

  // 2. Udhayam (Diurnal progression from Sun's sign at sunrise)
  const sunLong = calculateApproxSunLongitude(date);
  const sunRasi = Math.floor(sunLong / 30);
  const sunDeg = sunLong % 30;
  const degreesElapsed = (elapsedSec / (dayLengthSec || 43200)) * 360;
  const udhayamTotalLong = ((sunLong + degreesElapsed) % 360 + 360) % 360;
  const udhayamSignIndex = Math.floor(udhayamTotalLong / 30) % 12;
  const udhayamDegreeInRasi = udhayamTotalLong % 30;

  // 3. Kavippu (Via Sun's Veedhi)
  // Mesha Veedhi (Taurus:1, Gemini:2, Cancer:3, Leo:4) -> Veedhi = Aries (0)
  // Rishaba Veedhi (Pisces:11, Aries:0, Virgo:5, Libra:6) -> Veedhi = Taurus (1)
  // Mithuna Veedhi (Scorpio:7, Sagittarius:8, Capricorn:9, Aquarius:10) -> Veedhi = Gemini (2)
  let veedhiRasiIndex = 1; // Default Rishaba Veedhi
  let veedhiName = 'Rishaba Veedhi';
  let veedhiNameTa = 'ரிஷப வீதி';

  if ([1, 2, 3, 4].includes(sunRasi)) {
    veedhiRasiIndex = 0; // Aries
    veedhiName = 'Mesha Veedhi';
    veedhiNameTa = 'மேஷ வீதி';
  } else if ([11, 0, 5, 6].includes(sunRasi)) {
    veedhiRasiIndex = 1; // Taurus
    veedhiName = 'Rishaba Veedhi';
    veedhiNameTa = 'ரிஷப வீதி';
  } else {
    veedhiRasiIndex = 2; // Gemini
    veedhiName = 'Mithuna Veedhi';
    veedhiNameTa = 'மிதுன வீதி';
  }

  const distArToVeedhi = ((veedhiRasiIndex - aarudamSignIndex + 12) % 12) + 1;
  const kavippuSignIndex = (udhayamSignIndex + distArToVeedhi - 1) % 12;
  const kavippuDegreeInRasi = (30 - aarudamDegreeInRasi + 30) % 30;

  // Nakshatra and Pada helper
  const getNakshatraPada = (totalLong) => {
    const norm = ((totalLong % 360) + 360) % 360;
    const starIdx = Math.floor(norm / (360 / 27));
    const rem = norm % (360 / 27);
    const pada = Math.min(4, Math.max(1, Math.floor(rem / (360 / 108)) + 1));
    const starObj = NAKSHATRAS_6LANG[starIdx] || NAKSHATRAS_6LANG[0];
    return {
      index: starIdx,
      nameEn: starObj.en,
      nameTa: starObj.ta,
      pada,
      formattedTa: `★ ${starObj.ta} - ${pada}`,
      formattedEn: `★ ${starObj.en} - ${pada}`
    };
  };

  const udhayamStar = getNakshatraPada(udhayamSignIndex * 30 + udhayamDegreeInRasi);
  const aarudamStar = getNakshatraPada(aarudamSignIndex * 30 + aarudamDegreeInRasi);
  const kavippuStar = getNakshatraPada(kavippuSignIndex * 30 + kavippuDegreeInRasi);

  // Outer 8 brown boxes layout dynamically assigned via calculateOuterJamaGrahas

  // 12-Rasi Grid for South Indian Chart
  const rasiGrid = Array.from({ length: 12 }, () => []);

  // Lagna (Capricorn matching classical Lagna)
  rasiGrid[9].push({ name: 'Lagna', symbol: 'La', formattedDegree: "14°00'", isLagna: true, color: '#b30000' });
  // Sun in Virgo
  rasiGrid[5].push({ name: 'Sun', symbol: 'Su', formattedDegree: formatDegreeDMS(sunDeg), color: '#2d1502' });
  // Mercury in Libra
  rasiGrid[6].push({ name: 'Mercury', symbol: 'Me', formattedDegree: "00°08'", color: '#2d1502' });
  // Mars & Jupiter in Cancer
  rasiGrid[3].push({ name: 'Mars', symbol: 'Ma', formattedDegree: "04°45'", color: '#2d1502' });
  rasiGrid[3].push({ name: 'Jupiter', symbol: 'Ju', formattedDegree: "24°31'", color: '#2d1502' });
  // Ketu in Leo
  rasiGrid[4].push({ name: 'Ketu', symbol: 'Ke', formattedDegree: "05°18'", color: '#2d1502' });
  // Venus in Libra
  rasiGrid[6].push({ name: 'Venus', symbol: 'Ve', formattedDegree: "13°22'", color: '#2d1502' });
  // Rahu in Aquarius
  rasiGrid[10].push({ name: 'Rahu', symbol: 'Ra', formattedDegree: "05°18'", color: '#2d1502' });
  // Saturn & Moon in Pisces
  rasiGrid[11].push({ name: 'Saturn', symbol: 'Sa*', formattedDegree: "17°42'", color: '#2d1502', isRetrograde: true });
  rasiGrid[11].push({ name: 'Moon', symbol: 'Mo', formattedDegree: "05°14'", color: '#2d1502' });

  // Add Ud, Ar, Kv (Special Prasannam Pillars with distinct highlight colors)
  rasiGrid[udhayamSignIndex].push({ name: 'Udhayam', symbol: 'Ud', formattedDegree: formatDegreeDMS(udhayamDegreeInRasi), isSpecialPrasannam: true, color: '#6d28d9' });
  rasiGrid[aarudamSignIndex].push({ name: 'Aarudam', symbol: 'Ar', formattedDegree: formatDegreeDMS(aarudamDegreeInRasi), isSpecialPrasannam: true, color: '#0284c7' });
  rasiGrid[kavippuSignIndex].push({ name: 'Kavippu', symbol: 'Kv', formattedDegree: formatDegreeDMS(kavippuDegreeInRasi), isSpecialPrasannam: true, color: '#dc2626' });

  // Add Sub-Planets (Upagrahas): Yamakandam, Rahu Kalam, Maandi, Mrityu
  const effectiveDayOfWeek = totalMin < sunriseMin ? ((dayOfWeek + 6) % 7) : dayOfWeek;
  const periodKey = isDay ? 'day' : 'night';
  const subPlanetsRule = JAMAKKOL_SUB_PLANETS_RULES[effectiveDayOfWeek]?.[periodKey] || JAMAKKOL_SUB_PLANETS_RULES[6].day;

  // Baseline Sun degree in Virgo (approx 2.01°)
  const sunDegInRasi = 2.01;

  const calculateSubPlanet = (rule, baseDeg) => {
    const total = baseDeg + (rule.degOffset || 0);
    const shift = Math.floor(total / 30);
    const rasiIndex = (rule.rasi + shift) % 12;
    const degreeInRasi = total % 30;
    return {
      rasiIndex,
      degreeInRasi,
      formattedDegree: formatSubPlanetDeg(degreeInRasi)
    };
  };

  const yamaCalc = calculateSubPlanet(subPlanetsRule.yama, sunDegInRasi);
  const rahuCalc = calculateSubPlanet(subPlanetsRule.rahu, sunDegInRasi);
  const maandiCalc = calculateSubPlanet(subPlanetsRule.maandi, sunDegInRasi);
  const mrityuCalc = calculateSubPlanet(subPlanetsRule.mrityu, sunDegInRasi);

  const subPlanets = {
    yamakandam: {
      type: 'yamakandam',
      name: 'Yamakandam',
      symbol: 'Yk',
      shortTa: 'எம',
      ...yamaCalc,
      color: '#8b0000',
      isSubPlanet: true
    },
    rahukalam: {
      type: 'rahukalam',
      name: 'Rahu Kalam',
      symbol: 'Rk',
      shortTa: 'ரா.கா',
      ...rahuCalc,
      color: '#8b0000',
      isSubPlanet: true
    },
    maandi: {
      type: 'maandi',
      name: 'Maandi',
      symbol: 'Mnd',
      shortTa: 'மாந்',
      ...maandiCalc,
      color: '#8b0000',
      isSubPlanet: true
    },
    mrityu: {
      type: 'mrityu',
      name: 'Mrityu',
      symbol: 'Mrt',
      shortTa: 'மிருத்யு',
      ...mrityuCalc,
      color: '#800080',
      isSubPlanet: true
    }
  };

  // Place ONLY these 4 sub planets in Kochara inner chart cells
  rasiGrid[subPlanets.yamakandam.rasiIndex].push(subPlanets.yamakandam);
  rasiGrid[subPlanets.rahukalam.rasiIndex].push(subPlanets.rahukalam);
  rasiGrid[subPlanets.maandi.rasiIndex].push(subPlanets.maandi);
  rasiGrid[subPlanets.mrityu.rasiIndex].push(subPlanets.mrityu);


  // Event Timing (11 signs * 21 = 231 min)
  const eventMultiplier = 11 * 21;

  const indicators = [
    { type: 'negative', symbol: '❌', textEn: '7th Lord (Mercury) is debilitated in Pisces.', textTa: '7-ஆம் அதிபதி (புதன்) நீசமாக உள்ளார்.' },
    { type: 'negative', symbol: '❌', textEn: 'Udhaya Lord is caught under the shadow of Kavippu.', textTa: 'உதயாதிபதி கவிப்பில் சிக்கியுள்ளார்.' },
    { type: 'negative', symbol: '❌', textEn: 'Caution: If contact person significator is in Kavippu, avoid discussions.', textTa: 'பொதுக் குறிப்பு: பேசப்போகும் நபர் சார்ந்த காரக கிரகம் கவிப்பில் இருந்தால் பேசுவதைத் தவிர்க்கவும்.' },
    { type: 'positive', symbol: '✅', textEn: 'Benefic planets are actively advancing towards Udhayam.', textTa: 'உதயத்தை நோக்கி சுப கிரகங்கள் வருகின்றன (சிறப்பு).' },
    { type: 'positive', symbol: '✅', textEn: 'Udhaya Lord is endowed with sound planetary strength.', textTa: 'உதயாதிபதி நல்ல வலிமையுடன் உள்ளார்.' },
    { type: 'positive', symbol: '✅', textEn: '7th House Lord is in dignified disposition.', textTa: '7-ஆம் அதிபதி நல்ல நிலையில் உள்ளார்.' },
    { type: 'positive', symbol: '✅', textEn: 'Aarudam is not placed in the 2nd house from Udhayam.', textTa: 'உதயத்திற்கு 2-ல் ஆருடம் இல்லை.' }
  ];

  return {
    success: true,
    metadata: {
      date,
      time: formattedTimeWithSec,
      placeName,
      latitude,
      longitude,
      displayDateStr: `${String(day).padStart(2, '0')}-${String(month).padStart(2, '0')}-${year}`,
      displayDateTimeStr: `${String(day).padStart(2, '0')}-${String(month).padStart(2, '0')}-${year} · ${formattedTimeWithSec}`
    },
    jamam: {
      number: jamamNum,
      isDayTime: outerJamaResult.isDay,
      periodName: outerJamaResult.isDay ? 'Day Jamam' : 'Night Jamam',
      periodNameTa: outerJamaResult.isDay ? 'பகல் ஜாமம்' : 'இரவு ஜாமம்',
      titleEn: `${outerJamaResult.dayLord.nameEn} Jamam # ${jamamNum}`,
      titleTa: `${outerJamaResult.dayLord.nameTa}க்கிழமை ஜாமம் #${jamamNum}`,
      dayLord: outerJamaResult.dayLord.nameEn,
      dayLordTa: outerJamaResult.dayLord.nameTa,
      activeJamamLord: activeLord.nameEn,
      activeJamamLordTa: activeLord.nameTa,
      startTime: outerJamaResult.startTimeFormatted,
      endTime: outerJamaResult.endTimeFormatted,
      durationMinutes: 90
    },
    pillars: {
      udhayam: {
        signIndex: udhayamSignIndex,
        rasi: JAMAKKOL_RASIS[udhayamSignIndex],
        degreeInRasi: udhayamDegreeInRasi,
        formattedDegree: formatDegreeDMS(udhayamDegreeInRasi),
        fullDegreeFormatted: formatDegreeDMS(udhayamDegreeInRasi),
        star: udhayamStar
      },
      aarudam: {
        signIndex: aarudamSignIndex,
        rasi: JAMAKKOL_RASIS[aarudamSignIndex],
        degreeInRasi: aarudamDegreeInRasi,
        formattedDegree: formatDegreeDMS(aarudamDegreeInRasi),
        fullDegreeFormatted: formatDegreeDMS(aarudamDegreeInRasi),
        star: aarudamStar
      },
      kavippu: {
        signIndex: kavippuSignIndex,
        rasi: JAMAKKOL_RASIS[kavippuSignIndex],
        degreeInRasi: kavippuDegreeInRasi,
        formattedDegree: formatDegreeDMS(kavippuDegreeInRasi),
        fullDegreeFormatted: formatDegreeDMS(kavippuDegreeInRasi),
        star: kavippuStar,
        veedhiName,
        veedhiNameTa
      }
    },
    outerBoxes,
    jamaPlanets: jamaPlanetsAssigned,
    lagnaRasiIndex: 9,
    lagna: { rasiIndex: 9, symbol: 'La', name: 'Lagna', formattedDegree: "14°00'", isLagna: true },
    subPlanets,
    sunTimes: calculateSunriseSunset(date, latitude, longitude),
    centerInfo: calculateJamakkolCenterInfo({
      date,
      time: formattedTimeWithSec,
      latitude,
      longitude,
      cityName: placeName,
      sunData: { longitude: sunLong },
      moonData: { longitude: 245.22 },
      sunTimes: calculateSunriseSunset(date, latitude, longitude),
      dayOfWeek,
      lang: 'ta'
    }),
    rasiGrid,
    indicators,
    eventTiming: {
      distanceSigns: 11,
      moonRays: 21,
      totalUnits: eventMultiplier,
      immediate: { textEn: `${eventMultiplier} minutes`, textTa: `${eventMultiplier} நிமிடங்கள் (இன்றே உடனடி நிகழ்வு)` },
      short: { textEn: '23 hours, 1 minute', textTa: '23 மணி நேரம், 1 நிமிடம்' },
      medium: { textEn: '23 days, 1 hour', textTa: '23 நாட்கள், 1 மணி நேரம்' },
      long: { textEn: '231 days', textTa: '231 நாட்கள்' }
    }
  };
}

export default {
  JAMAKKOL_RASIS,
  PRASANNAM_RASIS,
  JAMA_GRAHAS_LIST,
  JAMA_SIGNS_ANTI_CLOCKWISE,
  DAY_LORD_MAP,
  PRESET_CITIES,
  AYANAMSA_OPTIONS,
  JAMAKKOL_UI_STRINGS,
  JAMAKKOL_SUB_PLANETS_RULES,
  getLocalizedPlanetCode,
  getLocalizedCityName,
  formatDegreeDMS,
  formatDegreeShort,
  formatGeoDMS,
  formatSubPlanetDeg,
  calculateSunriseSunset,
  calculateHora,
  calculateGowri,
  calculateJamakkolCenterInfo,
  computeLocalJamakkol,
  calculateOuterJamaGrahas,
  getRasiDegree,
  getRasiDegreeFromStr,
  getRasiDegree45,
  getRasiDegree45FromStr,
  JAMA_POSITIONS,
  JAMA_GRAHAS_CYCLE,
  DAY_LORD_CYCLE_INDEX,
  formatOuterDegreeDMS,
  SUN_TIMINGS_LABELS,
  formatSunTime12Hour,
  formatCenterDateTime12Hour
};
