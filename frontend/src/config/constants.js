export const MONTH_NAMES = {
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  ta: ['ஜனவரி', 'பிப்ரவரி', 'மார்ச்', 'ஏப்ரல்', 'மே', 'ஜூன்', 'ஜூலை', 'ஆகஸ்ட்', 'செப்டம்பர்', 'அக்டோபர்', 'நவம்பர்', 'டிசம்பர்'],
  hi: ['जनवरी', 'फ़रवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'],
  te: ['జనవరి', 'ఫిబ్రవరి', 'మార్చి', 'ఏప్రిల్', 'మే', 'జూన్', 'జూలై', 'ఆగస్టు', 'సెప్టెంబర్', 'అక్టోబర్', 'నవంబర్', 'డిసెంబర్'],
  kn: ['ಜನವರಿ', 'ಫೆಬ್ರವರಿ', 'ಮಾರ್ಚ್', 'ಏಪ್ರಿಲ್', 'ಮೇ', 'ಜೂನ್', 'ಜುಲೈ', 'ಆಗಸ್ಟ್', 'ಸೆಪ್ಟೆಂಬರ್', 'ಅಕ್ಟೋಬರ್', 'ನವೆಂಬರ್', 'ಡಿಸೆಂಬರ್'],
  ml: ['ജനുവരി', 'ഫെബ്രുവരി', 'മാർച്ച്', 'ഏപ്രിൽ', 'മെയ്', 'ജൂൺ', 'ജൂലൈ', 'ആഗസ്റ്റ്', 'സെപ്റ്റംബർ', 'ഒക്ടോബർ', 'നവംബർ', 'ഡിസംബർ']
};

export const getLocalizedMonthName = (monthNum, lang = 'en') => {
  const index = Math.max(0, Math.min(11, (parseInt(monthNum, 10) || 1) - 1));
  const list = MONTH_NAMES[lang] || MONTH_NAMES.en || MONTH_NAMES.ta;
  return list[index] || MONTH_NAMES.en[index] || '';
};

export const getLocalizedMonths = (lang = 'en') => {
  const list = MONTH_NAMES[lang] || MONTH_NAMES.en || MONTH_NAMES.ta;
  return list.map((name, idx) => ({
    value: idx + 1,
    name
  }));
};

export const MONTHS = [
  { value: 1, name: 'January' },
  { value: 2, name: 'February' },
  { value: 3, name: 'March' },
  { value: 4, name: 'April' },
  { value: 5, name: 'May' },
  { value: 6, name: 'June' },
  { value: 7, name: 'July' },
  { value: 8, name: 'August' },
  { value: 9, name: 'September' },
  { value: 10, name: 'October' },
  { value: 11, name: 'November' },
  { value: 12, name: 'December' }
];

export const YEARS = Array.from({ length: 120 }, (_, i) => 2030 - i);
export const HOURS = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
export const MINUTES = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));
export const SECONDS = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));

export const GENDERS = [
  { value: 'Male', labelKey: 'form.genderMale', labelDefault: 'Male' },
  { value: 'Female', labelKey: 'form.genderFemale', labelDefault: 'Female' },
  { value: 'Other', labelKey: 'form.genderOther', labelDefault: 'Other' }
];

// Multilingual Zodiac Sign Names (0 to 11)
export const RASI_NAMES = {
  ta: ['மேஷம்', 'ரிஷபம்', 'மிதுனம்', 'கடகம்', 'சிம்மம்', 'கன்னி', 'துலாம்', 'விருச்சிகம்', 'தனுசு', 'மகரம்', 'கும்பம்', 'மீனம்'],
  en: ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'],
  hi: ['मेष', 'वृषभ', 'मिथुन', 'कर्क', 'सिंह', 'कन्या', 'तुला', 'वृश्चिक', 'धनु', 'मकर', 'कुम्भ', 'मीन'],
  te: ['మేషం', 'వృషభం', 'మిథునం', 'కర్కాటకం', 'సింహం', 'కన్య', 'తుల', 'వృశ్చికం', 'ధనుస్సు', 'మకరం', 'కుంభం', 'మీనం'],
  kn: ['ಮೇಷ', 'ವೃಷಭ', 'ಮಿಥುನ', 'ಕರ್ಕಾಟಕ', 'ಸಿಂಹ', 'ಕನ್ಯಾ', 'ತುಲಾ', 'ವೃಶ್ಚಿಕ', 'ಧನುಸ್ಸು', 'ಮಕರ', 'ಕುಂಭ', 'ಮೀನ'],
  ml: ['മേടം', 'ഇടവം', 'മിഥുനം', 'കർക്കിടകം', 'ചിങ്ങം', 'കന്നി', 'തുലാം', 'വൃശ്ചികം', 'ധനു', 'മകരം', 'കുംഭം', 'മീനം']
};

export const RASI_NAMES_TA = RASI_NAMES.ta;

export const getLocalizedRasiName = (rasiId, lang = 'ta') => {
  const normalizedId = ((rasiId % 12) + 12) % 12;
  const list = RASI_NAMES[lang] || RASI_NAMES.en || RASI_NAMES.ta;
  return list[normalizedId] || RASI_NAMES.en[normalizedId] || '';
};

// Multilingual Planet Names and Short Codes
export const PLANET_TRANSLATIONS = {
  Sun: {
    en: { name: 'Sun', short: 'Sun' },
    ta: { name: 'சூரியன்', short: 'சூ' },
    hi: { name: 'सूर्य', short: 'सू' },
    te: { name: 'సూర్యుడు', short: 'సూ' },
    kn: { name: 'ಸೂರ್ಯ', short: 'ಸೂ' },
    ml: { name: 'സൂര്യൻ', short: 'സൂ' }
  },
  Moon: {
    en: { name: 'Moon', short: 'Mon' },
    ta: { name: 'சந்திரன்', short: 'சந்' },
    hi: { name: 'चन्द्र', short: 'चं' },
    te: { name: 'చంద్రుడు', short: 'చం' },
    kn: { name: 'ಚಂದ್ರ', short: 'ಚಂ' },
    ml: { name: 'ചന്ദ്രൻ', short: 'ച' }
  },
  Mars: {
    en: { name: 'Mars', short: 'Mar' },
    ta: { name: 'செவ்வாய்', short: 'செவ்' },
    hi: { name: 'मंगल', short: 'मं' },
    te: { name: 'కుజుడు', short: 'కు' },
    kn: { name: 'ಮಂಗಳ', short: 'ಮಂ' },
    ml: { name: 'ചൊവ്വ', short: 'ചൊ' }
  },
  Mercury: {
    en: { name: 'Mercury', short: 'Mer' },
    ta: { name: 'புதன்', short: 'பு' },
    hi: { name: 'बुध', short: 'बु' },
    te: { name: 'బుధుడు', short: 'బు' },
    kn: { name: 'ಬುಧ', short: 'ಬು' },
    ml: { name: 'ബുധൻ', short: 'ബു' }
  },
  Jupiter: {
    en: { name: 'Jupiter', short: 'Jup' },
    ta: { name: 'குரு', short: 'குரு' },
    hi: { name: 'गुरु', short: 'गु' },
    te: { name: 'గురువు', short: 'గు' },
    kn: { name: 'ಗುರು', short: 'ಗು' },
    ml: { name: 'വ്യാഴം', short: 'ഗു' }
  },
  Venus: {
    en: { name: 'Venus', short: 'Ven' },
    ta: { name: 'சுக்கிரன்', short: 'சுக்' },
    hi: { name: 'शुक्र', short: 'शु' },
    te: { name: 'శుక్రుడు', short: 'శు' },
    kn: { name: 'ಶುಕ್ರ', short: 'ಶು' },
    ml: { name: 'ശുക്രൻ', short: 'ശു' }
  },
  Saturn: {
    en: { name: 'Saturn', short: 'Sat' },
    ta: { name: 'சனி', short: 'சனி' },
    hi: { name: 'शनि', short: 'श' },
    te: { name: 'శని', short: 'శ' },
    kn: { name: 'ಶನಿ', short: 'ಶ' },
    ml: { name: 'ശനി', short: 'ശ' }
  },
  Rahu: {
    en: { name: 'Rahu', short: 'Rah' },
    ta: { name: 'ராகு', short: 'ரா' },
    hi: { name: 'राहु', short: 'रा' },
    te: { name: 'రాహువు', short: 'రా' },
    kn: { name: 'ರಾಹು', short: 'ರಾ' },
    ml: { name: 'രാഹു', short: 'രാ' }
  },
  Ketu: {
    en: { name: 'Ketu', short: 'Ket' },
    ta: { name: 'கேது', short: 'கே' },
    hi: { name: 'केतु', short: 'के' },
    te: { name: 'కేతువు', short: 'కే' },
    kn: { name: 'ಕೇತು', short: 'ಕೇ' },
    ml: { name: 'കേതു', short: 'കേ' }
  },
  Lagna: {
    en: { name: 'Ascendant (Lagna)', short: 'Asc' },
    ta: { name: 'லக்னம்', short: 'ல' },
    hi: { name: 'लग्न', short: 'ल' },
    te: { name: 'లగ్నము', short: 'ల' },
    kn: { name: 'ಲಗ್ನ', short: 'ಲ' },
    ml: { name: 'ലഗ്നം', short: 'ല' }
  },
  Maandi: {
    en: { name: 'Maandi', short: 'Maa' },
    ta: { name: 'மாந்தி', short: 'மா' },
    hi: { name: 'मांदी', short: 'मां' },
    te: { name: 'మాంది', short: 'మాం' },
    kn: { name: 'ಮಾಂದಿ', short: 'ಮಾಂ' },
    ml: { name: 'മാന്തി', short: 'മാ' }
  },
  Mandi: {
    en: { name: 'Maandi', short: 'Maa' },
    ta: { name: 'மாந்தி', short: 'மா' },
    hi: { name: 'मांदी', short: 'मां' },
    te: { name: 'మాంది', short: 'మాం' },
    kn: { name: 'ಮಾಂದಿ', short: 'ಮಾಂ' },
    ml: { name: 'മാന്തി', short: 'മാ' }
  }
};

export const PLANET_SHORT_NAMES_TA = {
  'சூரியன்': 'சூ',
  'சந்திரன்': 'சந்',
  'செவ்வாய்': 'செவ்',
  'புதன்': 'பு',
  'குரு': 'குரு',
  'சுக்கிரன்': 'சுக்',
  'சனி': 'சனி',
  'ராகு': 'ரா',
  'கேது': 'கே',
  'லக்னம்': 'ல',
  'மாந்தி': 'மா'
};

export const getLocalizedPlanet = (planetNameOrKey, lang = 'ta') => {
  if (!planetNameOrKey) return { name: '-', short: '-' };
  const clean = String(planetNameOrKey).trim().toLowerCase();
  const normKey = Object.keys(PLANET_TRANSLATIONS).find((k) => {
    if (k.toLowerCase() === clean || (clean === 'ascendant' && k === 'Lagna')) return true;
    const entry = PLANET_TRANSLATIONS[k];
    return Object.values(entry).some(
      (langObj) =>
        langObj.name?.toLowerCase() === clean ||
        langObj.short?.toLowerCase() === clean
    );
  }) || 'Sun';
  const entry = PLANET_TRANSLATIONS[normKey] || PLANET_TRANSLATIONS.Sun;
  return entry[lang] || entry.ta || entry.en;
};

export const DISPLAY_PLANET_ORDER = [
  'Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Lagna', 'Rahu', 'Ketu', 'Maandi'
];

export const PLANET_SYMBOLS = {
  Sun: { symbol: '☉', color: '#e11d48' },
  Moon: { symbol: '☽', color: '#ea580c' },
  Mercury: { symbol: '☿', color: '#d97706' },
  Venus: { symbol: '♀', color: '#e11d48' },
  Mars: { symbol: '♂', color: '#65a30d' },
  Jupiter: { symbol: '♃', color: '#16a34a' },
  Saturn: { symbol: '♄', color: '#16a34a' },
  Lagna: { symbol: 'Asc', color: '#0f172a', isBadge: true },
  Rahu: { symbol: '☊', color: '#0284c7' },
  Ketu: { symbol: '☋', color: '#2563eb' },
  Maandi: { symbol: 'மா', color: '#7c3aed', isBadge: true }
};

export const ZODIAC_SYMBOLS = {
  0: { symbol: '♈', color: '#ea580c' },
  1: { symbol: '♉', color: '#16a34a' },
  2: { symbol: '♊', color: '#7c3aed' },
  3: { symbol: '♋', color: '#0284c7' },
  4: { symbol: '♌', color: '#16a34a' },
  5: { symbol: '♍', color: '#2563eb' },
  6: { symbol: '♎', color: '#0284c7' },
  7: { symbol: '♏', color: '#dc2626' },
  8: { symbol: '♐', color: '#06b6d4' },
  9: { symbol: '♑', color: '#64748b' },
  10: { symbol: '♒', color: '#16a34a' },
  11: { symbol: '♓', color: '#65a30d' }
};

export const RASI_LORDS = [
  'Mars',    // 0: Mesham
  'Venus',   // 1: Rishabham
  'Mercury', // 2: Mithunam
  'Moon',    // 3: Katakam
  'Sun',     // 4: Simham
  'Mercury', // 5: Kanni
  'Venus',   // 6: Thulam
  'Mars',    // 7: Vrischigam
  'Jupiter', // 8: Dhanusu
  'Saturn',  // 9: Makaram
  'Saturn',  // 10: Kumbham
  'Jupiter'  // 11: Meenam
];

export const NAKSHATRA_LORDS = [
  'Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury',
  'Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury',
  'Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury'
];

export const getRasiLordName = (rasiId, lang = 'ta') => {
  if (rasiId === undefined || rasiId === null || isNaN(rasiId)) return '-';
  const normId = ((Number(rasiId) % 12) + 12) % 12;
  const lordKey = RASI_LORDS[normId];
  return getLocalizedPlanet(lordKey, lang).name || lordKey;
};

export const getNakshatraLordName = (nakshatraId, lang = 'ta') => {
  if (nakshatraId === undefined || nakshatraId === null || isNaN(nakshatraId)) return '-';
  const normId = ((Number(nakshatraId) % 27) + 27) % 27;
  const lordKey = NAKSHATRA_LORDS[normId];
  return getLocalizedPlanet(lordKey, lang).name || lordKey;
};

