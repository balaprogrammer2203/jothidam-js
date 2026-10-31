/**
 * 24 Pushkara Navamsa Padas (புஷ்கர நவாம்சம் பெறும் 24 பாதங்கள்) Master Data
 *
 * In Vedic Astrology, there are exactly 24 Pushkara Navamsas among the 108 padas.
 * All 24 Pushkara Navamsa padas fall exclusively into signs ruled by benefic planets:
 * - Taurus (Venus)
 * - Cancer (Moon)
 * - Virgo (Mercury)
 * - Libra (Venus)
 * - Sagittarius (Jupiter)
 * - Pisces (Jupiter)
 *
 * Special Note: Nakshatras ruled by Ketu, Mars, and Mercury (Ashwini, Magha, Mula,
 * Mrigashirsha, Chitra, Dhanishta, Ashlesha, Jyeshtha, Revati) have NO Pushkara Navamsa padas.
 */

export const PUSHKARA_NAKSHATRA_NAMES = {
  1: {
    name: 'Bharani', nameTa: 'பரணி', nameHi: 'भरणी', nameTe: 'భరణి', nameKn: 'ಭರಣಿ', nameMl: 'ഭരണി'
  },
  2: {
    name: 'Krittika', nameTa: 'கார்த்திகை', nameHi: 'कृत्तिका', nameTe: 'కృత్తిక', nameKn: 'ಕೃತಿಕಾ', nameMl: 'കാർത്തിക'
  },
  3: {
    name: 'Rohini', nameTa: 'ரோகிணி', nameHi: 'रोहिणी', nameTe: 'రోహిణి', nameKn: 'ರೋಹಿಣಿ', nameMl: 'രോഹിണി'
  },
  5: {
    name: 'Ardra', nameTa: 'திருவாதிரை', nameHi: 'ஆर्द्रा', nameTe: 'ఆర్ద్ర', nameKn: 'ಆರ್ದ್ರ', nameMl: 'തിരുവാതിര'
  },
  6: {
    name: 'Punarvasu', nameTa: 'புனர்பூசம்', nameHi: 'पुनर्वसु', nameTe: 'పునర్వసు', nameKn: 'ಪುನರ್ವಸು', nameMl: 'പുണർതം'
  },
  7: {
    name: 'Pushya', nameTa: 'பூசம்', nameHi: 'पुष्य', nameTe: 'పుష్యమి', nameKn: 'ಪುಷ್ಯ', nameMl: 'പൂയം'
  },
  10: {
    name: 'Purva Phalguni', nameTa: 'பூரம்', nameHi: 'पूर्वाफाल्गुनी', nameTe: 'పూర్వఫల్గుణి', nameKn: 'ಪೂರ್ವಫಾಲ್ಗುಣಿ', nameMl: 'പൂരം'
  },
  11: {
    name: 'Uttara Phalguni', nameTa: 'உத்திரம்', nameHi: 'उत्तराफाल्गुनी', nameTe: 'உత్తరఫల్గుణి', nameKn: 'ಉತ್ತರಫಾಲ್ಗುಣಿ', nameMl: 'ഉത്രം'
  },
  12: {
    name: 'Hasta', nameTa: 'அஸ்தம்', nameHi: 'हस्त', nameTe: 'హస్త', nameKn: 'ಹಸ್ತ', nameMl: 'അത്തം'
  },
  14: {
    name: 'Swati', nameTa: 'சுவாதி', nameHi: 'स्वाती', nameTe: 'స్వాతి', nameKn: 'ಸ್ವಾತಿ', nameMl: 'ചോതി'
  },
  15: {
    name: 'Vishakha', nameTa: 'விசாகம்', nameHi: 'विशाखा', nameTe: 'విశాఖ', nameKn: 'ವಿಶಾಖಾ', nameMl: 'ವಿശാഖം'
  },
  16: {
    name: 'Anuradha', nameTa: 'அனுஷம்', nameHi: 'अनुराधा', nameTe: 'అనూరాధ', nameKn: 'ಅನುರಾಧಾ', nameMl: 'അനിഴം'
  },
  19: {
    name: 'Purva Ashadha', nameTa: 'பூராடம்', nameHi: 'पूर्वाषाढ़ा', nameTe: 'పూర్వాషాఢ', nameKn: 'ಪೂರ್ವಾಷಾಢ', nameMl: 'പൂരാടം'
  },
  20: {
    name: 'Uttara Ashadha', nameTa: 'உத்திராடம்', nameHi: 'उत्तराषाढ़ा', nameTe: 'ఉత్తరాషాఢ', nameKn: 'ಉತ್ತರಾಷಾಢ', nameMl: 'ഉത്രാടം'
  },
  21: {
    name: 'Shravana', nameTa: 'திருவோணம்', nameHi: 'श्रवण', nameTe: 'శ్రవణం', nameKn: 'ಶ್ರವಣ', nameMl: 'തിരുവോണം'
  },
  23: {
    name: 'Shatabhisha', nameTa: 'சதயம்', nameHi: 'शतभिषा', nameTe: 'శతభిషం', nameKn: 'ಶತಭಿಷ', nameMl: 'ചതയം'
  },
  24: {
    name: 'Purva Bhadrapada', nameTa: 'பூரட்டாதி', nameHi: 'पूर्वभाद्रपद', nameTe: 'పూర్వాభాద్ర', nameKn: 'ಪೂರ್ವಭಾದ್ರಪದ', nameMl: 'പൂരുരുട്ടാതി'
  },
  25: {
    name: 'Uttara Bhadrapada', nameTa: 'உத்திரட்டாதி', nameHi: 'उत्तरभाद्रपद', nameTe: 'ఉత్తరాభాద్ర', nameKn: 'ಉತ್ತರಭಾದ್ರಪದ', nameMl: 'ഉത്രട്ടാതി'
  }
};

export const PUSHKARA_NAVAMSA_RASIS = {
  1: {
    name: 'Taurus', nameTa: 'ரிஷபம்', nameHi: 'वृषभ', nameTe: 'వృషభం', nameKn: 'ವೃಷಭ', nameMl: 'ഇടവം'
  },
  3: {
    name: 'Cancer', nameTa: 'கடகம்', nameHi: 'கर्क', nameTe: 'కర్కాటకం', nameKn: 'ಕರ್ಕಾಟಕ', nameMl: 'కర్ക്കടകം'
  },
  5: {
    name: 'Virgo', nameTa: 'கன்னி', nameHi: 'कन्या', nameTe: 'కన్య', nameKn: 'ಕನ್ಯಾ', nameMl: 'കന്നി'
  },
  6: {
    name: 'Libra', nameTa: 'துலாம்', nameHi: 'तुला', nameTe: 'తులా', nameKn: 'ತುಲಾ', nameMl: 'തുലാം'
  },
  8: {
    name: 'Sagittarius', nameTa: 'தனுசு', nameHi: 'धनु', nameTe: 'ధనుస్సు', nameKn: 'ಧನು', nameMl: 'ಧನು'
  },
  11: {
    name: 'Pisces', nameTa: 'மீனம்', nameHi: 'मीन', nameTe: 'మీనం', nameKn: 'ಮೀನ', nameMl: 'മീനം'
  }
};

export const PUSHKARA_NAVAMSA_DATA = [
  // 1. Bharani Pada 3
  {
    order: 1,
    nakshatraId: 1,
    nakshatraOrder: 2,
    nakshatraName: PUSHKARA_NAKSHATRA_NAMES[1],
    nakshatraLord: { planetId: 5, name: 'Venus', nameTa: 'சுக்கிரன்' },
    pada: 3,
    padaLabelTa: '3-ஆம் பாதம்',
    padaLabelEn: 'Pada 3',
    rasiId: 0,
    rasiName: { name: 'Aries', nameTa: 'மேஷம்' },
    rasiLord: { name: 'Mars', nameTa: 'செவ்வாய்' },
    navamsaRasiId: 6,
    navamsaRasiName: PUSHKARA_NAVAMSA_RASIS[6],
    navamsaLord: { planetId: 5, name: 'Venus', nameTa: 'சுக்கிரன்' },
    isVargottama: false,
    inRasiSpan: "20°00' - 23°20'",
    zodiacSpan360: "20°00' - 23°20'",
    element: { en: 'Fire', ta: 'நெருப்பு' },
    significance: {
      en: 'Venus Pushkara in Fire Sign - brings artistic excellence, harmony, and prosperity.',
      ta: 'சுக்கிரனின் நவாம்சம் - கலைத்திறன், சௌபாக்கியம் மற்றும் யோக பலன்களைத் தரும்.'
    }
  },

  // 2. Krittika Pada 1
  {
    order: 2,
    nakshatraId: 2,
    nakshatraOrder: 3,
    nakshatraName: PUSHKARA_NAKSHATRA_NAMES[2],
    nakshatraLord: { planetId: 0, name: 'Sun', nameTa: 'சூரியன்' },
    pada: 1,
    padaLabelTa: '1-ஆம் பாதம்',
    padaLabelEn: 'Pada 1',
    rasiId: 0,
    rasiName: { name: 'Aries', nameTa: 'மேஷம்' },
    rasiLord: { name: 'Mars', nameTa: 'செவ்வாய்' },
    navamsaRasiId: 8,
    navamsaRasiName: PUSHKARA_NAVAMSA_RASIS[8],
    navamsaLord: { planetId: 4, name: 'Jupiter', nameTa: 'குரு' },
    isVargottama: false,
    inRasiSpan: "26°40' - 30°00'",
    zodiacSpan360: "26°40' - 30°00'",
    element: { en: 'Fire', ta: 'நெருப்பு' },
    significance: {
      en: 'Jupiter Pushkara in Fire Sign - gives spiritual wisdom, leadership and righteous power.',
      ta: 'குருவின் நவாம்சம் - ஆன்மிக ஞானம், தலைமைப்பண்பு மற்றும் தர்ம வழியில் வெற்றி அருளும்.'
    }
  },

  // 3. Krittika Pada 4
  {
    order: 3,
    nakshatraId: 2,
    nakshatraOrder: 3,
    nakshatraName: PUSHKARA_NAKSHATRA_NAMES[2],
    nakshatraLord: { planetId: 0, name: 'Sun', nameTa: 'சூரியன்' },
    pada: 4,
    padaLabelTa: '4-ஆம் பாதம்',
    padaLabelEn: 'Pada 4',
    rasiId: 1,
    rasiName: { name: 'Taurus', nameTa: 'ரிஷபம்' },
    rasiLord: { name: 'Venus', nameTa: 'சுக்கிரன்' },
    navamsaRasiId: 11,
    navamsaRasiName: PUSHKARA_NAVAMSA_RASIS[11],
    navamsaLord: { planetId: 4, name: 'Jupiter', nameTa: 'குரு' },
    isVargottama: false,
    inRasiSpan: "06°40' - 10°00'",
    zodiacSpan360: "36°40' - 40°00'",
    element: { en: 'Earth', ta: 'நிலம்' },
    significance: {
      en: 'Jupiter Pushkara in Earth Sign - provides wealth, compassion, and spiritual elevation.',
      ta: 'குருவின் நவாம்சம் - தன லாபம், நற்குணம், கருணை மற்றும் ஆன்மிக உயர்வு தரும்.'
    }
  },

  // 4. Rohini Pada 2 (Pushkara + Vargottama)
  {
    order: 4,
    nakshatraId: 3,
    nakshatraOrder: 4,
    nakshatraName: PUSHKARA_NAKSHATRA_NAMES[3],
    nakshatraLord: { planetId: 1, name: 'Moon', nameTa: 'சந்திரன்' },
    pada: 2,
    padaLabelTa: '2-ஆம் பாதம்',
    padaLabelEn: 'Pada 2',
    rasiId: 1,
    rasiName: { name: 'Taurus', nameTa: 'ரிஷபம்' },
    rasiLord: { name: 'Venus', nameTa: 'சுக்கிரன்' },
    navamsaRasiId: 1,
    navamsaRasiName: PUSHKARA_NAVAMSA_RASIS[1],
    navamsaLord: { planetId: 5, name: 'Venus', nameTa: 'சுக்கிரன்' },
    isVargottama: true, // Pushkara Vargottama!
    inRasiSpan: "13°20' - 16°40'",
    zodiacSpan360: "43°20' - 46°40'",
    element: { en: 'Earth', ta: 'நிலம்' },
    significance: {
      en: 'Pushkara Vargottama (Taurus - Venus) - exceptional beauty, steady prosperity, high status, and fame.',
      ta: 'புஷ்கர வர்கோத்தமம் (ரிஷப நவாம்சம்) - அதிஷ்ட யோகம், லட்சுமி கடாட்சம், செல்வாக்கு மற்றும் நிரந்தர சுகபோகம் அருளும்.'
    }
  },

  // 5. Ardra Pada 4
  {
    order: 5,
    nakshatraId: 5,
    nakshatraOrder: 6,
    nakshatraName: PUSHKARA_NAKSHATRA_NAMES[5],
    nakshatraLord: { planetId: 7, name: 'Rahu', nameTa: 'ராகு' },
    pada: 4,
    padaLabelTa: '4-ஆம் பாதம்',
    padaLabelEn: 'Pada 4',
    rasiId: 2,
    rasiName: { name: 'Gemini', nameTa: 'மிதுனம்' },
    rasiLord: { name: 'Mercury', nameTa: 'புதன்' },
    navamsaRasiId: 11,
    navamsaRasiName: PUSHKARA_NAVAMSA_RASIS[11],
    navamsaLord: { planetId: 4, name: 'Jupiter', nameTa: 'குரு' },
    isVargottama: false,
    inRasiSpan: "16°40' - 20°00'",
    zodiacSpan360: "76°40' - 80°00'",
    element: { en: 'Air', ta: 'காற்று' },
    significance: {
      en: 'Jupiter Pushkara in Gemini - transforms mental restlessness into divine wisdom and scientific acumen.',
      ta: 'குருவின் நவாம்சம் - தீவிர ஆராய்ச்சி அறிவு, ஆன்மிக ஞானம் மற்றும் புத்திக்கூர்மை அருளும்.'
    }
  },

  // 6. Punarvasu Pada 2
  {
    order: 6,
    nakshatraId: 6,
    nakshatraOrder: 7,
    nakshatraName: PUSHKARA_NAKSHATRA_NAMES[6],
    nakshatraLord: { planetId: 4, name: 'Jupiter', nameTa: 'குரு' },
    pada: 2,
    padaLabelTa: '2-ஆம் பாதம்',
    padaLabelEn: 'Pada 2',
    rasiId: 2,
    rasiName: { name: 'Gemini', nameTa: 'மிதுனம்' },
    rasiLord: { name: 'Mercury', nameTa: 'புதன்' },
    navamsaRasiId: 1,
    navamsaRasiName: PUSHKARA_NAVAMSA_RASIS[1],
    navamsaLord: { planetId: 5, name: 'Venus', nameTa: 'சுக்கிரன்' },
    isVargottama: false,
    inRasiSpan: "23°20' - 26°40'",
    zodiacSpan360: "83°20' - 86°40'",
    element: { en: 'Air', ta: 'காற்று' },
    significance: {
      en: 'Venus Pushkara in Air sign - gives communicative elegance, diplomacy, and enduring peace.',
      ta: 'சுக்கிரனின் நவாம்சம் - வாக்கு சாதுரியம், சாந்த குணம் மற்றும் தொடர் வெற்றி நல்கும்.'
    }
  },

  // 7. Punarvasu Pada 4 (Pushkara + Vargottama)
  {
    order: 7,
    nakshatraId: 6,
    nakshatraOrder: 7,
    nakshatraName: PUSHKARA_NAKSHATRA_NAMES[6],
    nakshatraLord: { planetId: 4, name: 'Jupiter', nameTa: 'குரு' },
    pada: 4,
    padaLabelTa: '4-ஆம் பாதம்',
    padaLabelEn: 'Pada 4',
    rasiId: 3,
    rasiName: { name: 'Cancer', nameTa: 'கடகம்' },
    rasiLord: { name: 'Moon', nameTa: 'சந்திரன்' },
    navamsaRasiId: 3,
    navamsaRasiName: PUSHKARA_NAVAMSA_RASIS[3],
    navamsaLord: { planetId: 1, name: 'Moon', nameTa: 'சந்திரன்' },
    isVargottama: true, // Pushkara Vargottama (Lord Rama's natal lagna and Moon!)
    inRasiSpan: "00°00' - 03°20'",
    zodiacSpan360: "90°00' - 93°20'",
    element: { en: 'Water', ta: 'நீர்' },
    significance: {
      en: 'Pushkara Vargottama (Cancer - Moon/Jupiter exalted) - saintly character, sovereign authority, supreme grace.',
      ta: 'புஷ்கர வர்கோத்தமம் (கடக நவாம்சம் - ஸ்ரீராமர் பிறந்த அம்சம்) - ராஜயோகம், தெய்வீக அருள், நற்குணம், புகழ் தரும்.'
    }
  },

  // 8. Pushya Pada 2
  {
    order: 8,
    nakshatraId: 7,
    nakshatraOrder: 8,
    nakshatraName: PUSHKARA_NAKSHATRA_NAMES[7],
    nakshatraLord: { planetId: 6, name: 'Saturn', nameTa: 'சனி' },
    pada: 2,
    padaLabelTa: '2-ஆம் பாதம்',
    padaLabelEn: 'Pada 2',
    rasiId: 3,
    rasiName: { name: 'Cancer', nameTa: 'கடகம்' },
    rasiLord: { name: 'Moon', nameTa: 'சந்திரன்' },
    navamsaRasiId: 5,
    navamsaRasiName: PUSHKARA_NAVAMSA_RASIS[5],
    navamsaLord: { planetId: 2, name: 'Mercury', nameTa: 'புதன்' },
    isVargottama: false,
    inRasiSpan: "06°40' - 10°00'",
    zodiacSpan360: "96°40' - 100°00'",
    element: { en: 'Water', ta: 'நீர்' },
    significance: {
      en: 'Mercury Pushkara in Water sign - profound analytical intelligence, pure devotion, and nourishing qualities.',
      ta: 'புதனின் நவாம்சம் - ஆழ்ந்த கல்வி, புத்தி சாதுரியம், தர்ம சிந்தனை மற்றும் நன்மதிப்பு தரும்.'
    }
  },

  // 9. Purva Phalguni Pada 3
  {
    order: 9,
    nakshatraId: 10,
    nakshatraOrder: 11,
    nakshatraName: PUSHKARA_NAKSHATRA_NAMES[10],
    nakshatraLord: { planetId: 5, name: 'Venus', nameTa: 'சுக்கிரன்' },
    pada: 3,
    padaLabelTa: '3-ஆம் பாதம்',
    padaLabelEn: 'Pada 3',
    rasiId: 4,
    rasiName: { name: 'Leo', nameTa: 'சிம்மம்' },
    rasiLord: { name: 'Sun', nameTa: 'சூரியன்' },
    navamsaRasiId: 6,
    navamsaRasiName: PUSHKARA_NAVAMSA_RASIS[6],
    navamsaLord: { planetId: 5, name: 'Venus', nameTa: 'சுக்கிரன்' },
    isVargottama: false,
    inRasiSpan: "20°00' - 23°20'",
    zodiacSpan360: "140°00' - 143°20'",
    element: { en: 'Fire', ta: 'நெருப்பு' },
    significance: {
      en: 'Venus Pushkara in Royal Fire sign - luxury, creative magnificence, charisma, and affection.',
      ta: 'சுக்கிரனின் நவாம்சம் - ஆடம்பரம், கலை நயம், மக்கள் ஆதரவு மற்றும் இன்ப வாழ்வு தரும்.'
    }
  },

  // 10. Uttara Phalguni Pada 1
  {
    order: 10,
    nakshatraId: 11,
    nakshatraOrder: 12,
    nakshatraName: PUSHKARA_NAKSHATRA_NAMES[11],
    nakshatraLord: { planetId: 0, name: 'Sun', nameTa: 'சூரியன்' },
    pada: 1,
    padaLabelTa: '1-ஆம் பாதம்',
    padaLabelEn: 'Pada 1',
    rasiId: 4,
    rasiName: { name: 'Leo', nameTa: 'சிம்மம்' },
    rasiLord: { name: 'Sun', nameTa: 'சூரியன்' },
    navamsaRasiId: 8,
    navamsaRasiName: PUSHKARA_NAVAMSA_RASIS[8],
    navamsaLord: { planetId: 4, name: 'Jupiter', nameTa: 'குரு' },
    isVargottama: false,
    inRasiSpan: "26°40' - 30°00'",
    zodiacSpan360: "146°40' - 150°00'",
    element: { en: 'Fire', ta: 'நெருப்பு' },
    significance: {
      en: 'Jupiter Pushkara in Leo - dignified leadership, generosity, high royal favor, and spiritual patronage.',
      ta: 'குருவின் நவாம்சம் - அரச மரியாதை, தாராள குணம், உயர்ந்த அந்தஸ்து மற்றும் ஆன்மிக ஈடுபாடு தரும்.'
    }
  },

  // 11. Uttara Phalguni Pada 4
  {
    order: 11,
    nakshatraId: 11,
    nakshatraOrder: 12,
    nakshatraName: PUSHKARA_NAKSHATRA_NAMES[11],
    nakshatraLord: { planetId: 0, name: 'Sun', nameTa: 'சூரியன்' },
    pada: 4,
    padaLabelTa: '4-ஆம் பாதம்',
    padaLabelEn: 'Pada 4',
    rasiId: 5,
    rasiName: { name: 'Virgo', nameTa: 'கன்னி' },
    rasiLord: { name: 'Mercury', nameTa: 'புதன்' },
    navamsaRasiId: 11,
    navamsaRasiName: PUSHKARA_NAVAMSA_RASIS[11],
    navamsaLord: { planetId: 4, name: 'Jupiter', nameTa: 'குரு' },
    isVargottama: false,
    inRasiSpan: "06°40' - 10°00'",
    zodiacSpan360: "156°40' - 160°00'",
    element: { en: 'Earth', ta: 'நிலம்' },
    significance: {
      en: 'Jupiter Pushkara in Earth sign - practical wisdom, charitable inclinations, medical and healing success.',
      ta: 'குருவின் நவாம்சம் - சேவை மனப்பான்மை, மருத்துவ யோகம், தர்ம குணம் மற்றும் தொழில் வெற்றி தரும்.'
    }
  },

  // 12. Hasta Pada 2
  {
    order: 12,
    nakshatraId: 12,
    nakshatraOrder: 13,
    nakshatraName: PUSHKARA_NAKSHATRA_NAMES[12],
    nakshatraLord: { planetId: 1, name: 'Moon', nameTa: 'சந்திரன்' },
    pada: 2,
    padaLabelTa: '2-ஆம் பாதம்',
    padaLabelEn: 'Pada 2',
    rasiId: 5,
    rasiName: { name: 'Virgo', nameTa: 'கன்னி' },
    rasiLord: { name: 'Mercury', nameTa: 'புதன்' },
    navamsaRasiId: 1,
    navamsaRasiName: PUSHKARA_NAVAMSA_RASIS[1],
    navamsaLord: { planetId: 5, name: 'Venus', nameTa: 'சுக்கிரன்' },
    isVargottama: false,
    inRasiSpan: "13°20' - 16°40'",
    zodiacSpan360: "163°20' - 166°40'",
    element: { en: 'Earth', ta: 'நிலம்' },
    significance: {
      en: 'Venus Pushkara in Earth sign - craft proficiency, financial dexterity, artistic craftsmanship.',
      ta: 'சுக்கிரனின் நவாம்சம் - கைவினைக் கலைகள், நுணுக்கமான தொழில் ஞானம் மற்றும் தன தான்ய விருத்தி தரும்.'
    }
  },

  // 13. Swati Pada 4
  {
    order: 13,
    nakshatraId: 14,
    nakshatraOrder: 15,
    nakshatraName: PUSHKARA_NAKSHATRA_NAMES[14],
    nakshatraLord: { planetId: 7, name: 'Rahu', nameTa: 'ராகு' },
    pada: 4,
    padaLabelTa: '4-ஆம் பாதம்',
    padaLabelEn: 'Pada 4',
    rasiId: 6,
    rasiName: { name: 'Libra', nameTa: 'துலாம்' },
    rasiLord: { name: 'Venus', nameTa: 'சுக்கிரன்' },
    navamsaRasiId: 11,
    navamsaRasiName: PUSHKARA_NAVAMSA_RASIS[11],
    navamsaLord: { planetId: 4, name: 'Jupiter', nameTa: 'குரு' },
    isVargottama: false,
    inRasiSpan: "16°40' - 20°00'",
    zodiacSpan360: "196°40' - 200°00'",
    element: { en: 'Air', ta: 'காற்று' },
    significance: {
      en: 'Jupiter Pushkara in Libra - commercial mastery, ethical fairness, justice, and spiritual liberation.',
      ta: 'குருவின் நவாம்சம் - நேர்மையான வியாபாரம், நீதியும் கருணையும், சமூகத்தில் உயர்ந்த கௌரவம் அருளும்.'
    }
  },

  // 14. Vishakha Pada 2
  {
    order: 14,
    nakshatraId: 15,
    nakshatraOrder: 16,
    nakshatraName: PUSHKARA_NAKSHATRA_NAMES[15],
    nakshatraLord: { planetId: 4, name: 'Jupiter', nameTa: 'குரு' },
    pada: 2,
    padaLabelTa: '2-ஆம் பாதம்',
    padaLabelEn: 'Pada 2',
    rasiId: 6,
    rasiName: { name: 'Libra', nameTa: 'துலாம்' },
    rasiLord: { name: 'Venus', nameTa: 'சுக்கிரன்' },
    navamsaRasiId: 1,
    navamsaRasiName: PUSHKARA_NAVAMSA_RASIS[1],
    navamsaLord: { planetId: 5, name: 'Venus', nameTa: 'சுக்கிரன்' },
    isVargottama: false,
    inRasiSpan: "23°20' - 26°40'",
    zodiacSpan360: "203°20' - 206°40'",
    element: { en: 'Air', ta: 'காற்று' },
    significance: {
      en: 'Venus Pushkara in Libra - goal-oriented triumph, charismatic personality, partnership wealth.',
      ta: 'சுக்கிரனின் நவாம்சம் - இலக்கை அடையும் வேட்கை, நற்பெயர் மற்றும் கூட்டுத் தொழில் லாபம் தரும்.'
    }
  },

  // 15. Vishakha Pada 4
  {
    order: 15,
    nakshatraId: 15,
    nakshatraOrder: 16,
    nakshatraName: PUSHKARA_NAKSHATRA_NAMES[15],
    nakshatraLord: { planetId: 4, name: 'Jupiter', nameTa: 'குரு' },
    pada: 4,
    padaLabelTa: '4-ஆம் பாதம்',
    padaLabelEn: 'Pada 4',
    rasiId: 7,
    rasiName: { name: 'Scorpio', nameTa: 'விருச்சிகம்' },
    rasiLord: { name: 'Mars', nameTa: 'செவ்வாய்' },
    navamsaRasiId: 3,
    navamsaRasiName: PUSHKARA_NAVAMSA_RASIS[3],
    navamsaLord: { planetId: 1, name: 'Moon', nameTa: 'சந்திரன்' },
    isVargottama: false,
    inRasiSpan: "00°00' - 03°20'",
    zodiacSpan360: "210°00' - 213°20'",
    element: { en: 'Water', ta: 'நீர்' },
    significance: {
      en: 'Moon Pushkara in Scorpio - mystical insight, emotional endurance, overcoming obstacles decisively.',
      ta: 'சந்திரனின் நவாம்சம் - மறைமுக ஆன்மிக ஆற்றல், சவால்களை வெல்லும் சக்தி, உள்ளுணர்வு தரும்.'
    }
  },

  // 16. Anuradha Pada 2
  {
    order: 16,
    nakshatraId: 16,
    nakshatraOrder: 17,
    nakshatraName: PUSHKARA_NAKSHATRA_NAMES[16],
    nakshatraLord: { planetId: 6, name: 'Saturn', nameTa: 'சனி' },
    pada: 2,
    padaLabelTa: '2-ஆம் பாதம்',
    padaLabelEn: 'Pada 2',
    rasiId: 7,
    rasiName: { name: 'Scorpio', nameTa: 'விருச்சிகம்' },
    rasiLord: { name: 'Mars', nameTa: 'செவ்வாய்' },
    navamsaRasiId: 5,
    navamsaRasiName: PUSHKARA_NAVAMSA_RASIS[5],
    navamsaLord: { planetId: 2, name: 'Mercury', nameTa: 'புதன்' },
    isVargottama: false,
    inRasiSpan: "06°40' - 10°00'",
    zodiacSpan360: "216°40' - 220°00'",
    element: { en: 'Water', ta: 'நீர்' },
    significance: {
      en: 'Mercury Pushkara in Scorpio - foreign travel luck, deep friendships, organizational dexterity.',
      ta: 'புதனின் நவாம்சம் - அயல்நாட்டு யோகம், உண்மையான நட்பு மற்றும் அமைப்பான நிர்வாகத் திறன் அருளும்.'
    }
  },

  // 17. Purva Ashadha Pada 3
  {
    order: 17,
    nakshatraId: 19,
    nakshatraOrder: 20,
    nakshatraName: PUSHKARA_NAKSHATRA_NAMES[19],
    nakshatraLord: { planetId: 5, name: 'Venus', nameTa: 'சுக்கிரன்' },
    pada: 3,
    padaLabelTa: '3-ஆம் பாதம்',
    padaLabelEn: 'Pada 3',
    rasiId: 8,
    rasiName: { name: 'Sagittarius', nameTa: 'தனுசு' },
    rasiLord: { name: 'Jupiter', nameTa: 'குரு' },
    navamsaRasiId: 6,
    navamsaRasiName: PUSHKARA_NAVAMSA_RASIS[6],
    navamsaLord: { planetId: 5, name: 'Venus', nameTa: 'சுக்கிரன்' },
    isVargottama: false,
    inRasiSpan: "20°00' - 23°20'",
    zodiacSpan360: "260°00' - 263°20'",
    element: { en: 'Fire', ta: 'நெருப்பு' },
    significance: {
      en: 'Venus Pushkara in Jupiter Fire sign - invincible popularity, radiant beauty, moral courage.',
      ta: 'சுக்கிரனின் நவாம்சம் - வெல்ல முடியாத புகழ், கவர்ச்சியான தோற்றம் மற்றும் தார்மீக வெற்றி தரும்.'
    }
  },

  // 18. Uttara Ashadha Pada 1 (Pushkara + Vargottama)
  {
    order: 18,
    nakshatraId: 20,
    nakshatraOrder: 21,
    nakshatraName: PUSHKARA_NAKSHATRA_NAMES[20],
    nakshatraLord: { planetId: 0, name: 'Sun', nameTa: 'சூரியன்' },
    pada: 1,
    padaLabelTa: '1-ஆம் பாதம்',
    padaLabelEn: 'Pada 1',
    rasiId: 8,
    rasiName: { name: 'Sagittarius', nameTa: 'தனுசு' },
    rasiLord: { name: 'Jupiter', nameTa: 'குரு' },
    navamsaRasiId: 8,
    navamsaRasiName: PUSHKARA_NAVAMSA_RASIS[8],
    navamsaLord: { planetId: 4, name: 'Jupiter', nameTa: 'குரு' },
    isVargottama: true, // Pushkara Vargottama!
    inRasiSpan: "26°40' - 30°00'",
    zodiacSpan360: "266°40' - 270°00'",
    element: { en: 'Fire', ta: 'நெருப்பு' },
    significance: {
      en: 'Pushkara Vargottama (Sagittarius - Jupiter) - supreme victory, impeccable character, highest moral virtue.',
      ta: 'புஷ்கர வர்கோத்தமம் (தனுசு நவாம்சம்) - இறுதி வெற்றி, அசைக்க முடியாத தர்மம், அரச தலைமை, ஞான யோகம் அருளும்.'
    }
  },

  // 19. Uttara Ashadha Pada 4
  {
    order: 19,
    nakshatraId: 20,
    nakshatraOrder: 21,
    nakshatraName: PUSHKARA_NAKSHATRA_NAMES[20],
    nakshatraLord: { planetId: 0, name: 'Sun', nameTa: 'சூரியன்' },
    pada: 4,
    padaLabelTa: '4-ஆம் பாதம்',
    padaLabelEn: 'Pada 4',
    rasiId: 9,
    rasiName: { name: 'Capricorn', nameTa: 'மகரம்' },
    rasiLord: { name: 'Saturn', nameTa: 'சனி' },
    navamsaRasiId: 11,
    navamsaRasiName: PUSHKARA_NAVAMSA_RASIS[11],
    navamsaLord: { planetId: 4, name: 'Jupiter', nameTa: 'குரு' },
    isVargottama: false,
    inRasiSpan: "06°40' - 10°00'",
    zodiacSpan360: "276°40' - 280°00'",
    element: { en: 'Earth', ta: 'நிலம்' },
    significance: {
      en: 'Jupiter Pushkara in Earth sign - practical wisdom, charitable inclinations, medical and healing success.',
      ta: 'குருவின் நவாம்சம் - நிலையான தொழில் பெருமை, தலைமைப் பொறுப்பு மற்றும் தரும நெறி தரும்.'
    }
  },

  // 20. Shravana Pada 2
  {
    order: 20,
    nakshatraId: 21,
    nakshatraOrder: 22,
    nakshatraName: PUSHKARA_NAKSHATRA_NAMES[21],
    nakshatraLord: { planetId: 1, name: 'Moon', nameTa: 'சந்திரன்' },
    pada: 2,
    padaLabelTa: '2-ஆம் பாதம்',
    padaLabelEn: 'Pada 2',
    rasiId: 9,
    rasiName: { name: 'Capricorn', nameTa: 'மகரம்' },
    rasiLord: { name: 'Saturn', nameTa: 'சனி' },
    navamsaRasiId: 1,
    navamsaRasiName: PUSHKARA_NAVAMSA_RASIS[1],
    navamsaLord: { planetId: 5, name: 'Venus', nameTa: 'சுக்கிரன்' },
    isVargottama: false,
    inRasiSpan: "13°20' - 16°40'",
    zodiacSpan360: "283°20' - 286°40'",
    element: { en: 'Earth', ta: 'நிலம்' },
    significance: {
      en: 'Venus Pushkara in Capricorn - financial discipline, high learning and oral tradition absorption.',
      ta: 'சுக்கிரனின் நவாம்சம் - கல்வி ஞானம், சாஸ்திர ஈடுபாடு, நிதி வளம் மற்றும் நற்பண்பு அருளும்.'
    }
  },

  // 21. Shatabhisha Pada 4
  {
    order: 21,
    nakshatraId: 23,
    nakshatraOrder: 24,
    nakshatraName: PUSHKARA_NAKSHATRA_NAMES[23],
    nakshatraLord: { planetId: 7, name: 'Rahu', nameTa: 'ராகு' },
    pada: 4,
    padaLabelTa: '4-ஆம் பாதம்',
    padaLabelEn: 'Pada 4',
    rasiId: 10,
    rasiName: { name: 'Aquarius', nameTa: 'கும்பம்' },
    rasiLord: { name: 'Saturn', nameTa: 'சனி' },
    navamsaRasiId: 11,
    navamsaRasiName: PUSHKARA_NAVAMSA_RASIS[11],
    navamsaLord: { planetId: 4, name: 'Jupiter', nameTa: 'குரு' },
    isVargottama: false,
    inRasiSpan: "16°40' - 20°00'",
    zodiacSpan360: "316°40' - 320°00'",
    element: { en: 'Air', ta: 'காற்று' },
    significance: {
      en: 'Jupiter Pushkara in Aquarius - miracle healing powers, philosophical mastery, mystical liberation.',
      ta: 'குருவின் நவாம்சம் - மருத்துவ மற்றும் நிவாரண ஆற்றல், ஆன்மிக விடுதலை, உயர் ஞானம் தரும்.'
    }
  },

  // 22. Purva Bhadrapada Pada 2
  {
    order: 22,
    nakshatraId: 24,
    nakshatraOrder: 25,
    nakshatraName: PUSHKARA_NAKSHATRA_NAMES[24],
    nakshatraLord: { planetId: 4, name: 'Jupiter', nameTa: 'குரு' },
    pada: 2,
    padaLabelTa: '2-ஆம் பாதம்',
    padaLabelEn: 'Pada 2',
    rasiId: 10,
    rasiName: { name: 'Aquarius', nameTa: 'கும்பம்' },
    rasiLord: { name: 'Saturn', nameTa: 'சனி' },
    navamsaRasiId: 1,
    navamsaRasiName: PUSHKARA_NAVAMSA_RASIS[1],
    navamsaLord: { planetId: 5, name: 'Venus', nameTa: 'சுக்கிரன்' },
    isVargottama: false,
    inRasiSpan: "23°20' - 26°40'",
    zodiacSpan360: "323°20' - 326°40'",
    element: { en: 'Air', ta: 'காற்று' },
    significance: {
      en: 'Venus Pushkara in Air sign - extraordinary eloquence, reformative mindset, wealth accumulation.',
      ta: 'சுக்கிரனின் நவாம்சம் - கவர்ச்சிகரமான பேச்சுத்திறன், சமுதாய சிந்தனை, சிறந்த தன சேர்க்கை தரும்.'
    }
  },

  // 23. Purva Bhadrapada Pada 4
  {
    order: 23,
    nakshatraId: 24,
    nakshatraOrder: 25,
    nakshatraName: PUSHKARA_NAKSHATRA_NAMES[24],
    nakshatraLord: { planetId: 4, name: 'Jupiter', nameTa: 'குரு' },
    pada: 4,
    padaLabelTa: '4-ஆம் பாதம்',
    padaLabelEn: 'Pada 4',
    rasiId: 11,
    rasiName: { name: 'Pisces', nameTa: 'மீனம்' },
    rasiLord: { name: 'Jupiter', nameTa: 'குரு' },
    navamsaRasiId: 3,
    navamsaRasiName: PUSHKARA_NAVAMSA_RASIS[3],
    navamsaLord: { planetId: 1, name: 'Moon', nameTa: 'சந்திரன்' },
    isVargottama: false,
    inRasiSpan: "00°00' - 03°20'",
    zodiacSpan360: "330°00' - 333°20'",
    element: { en: 'Water', ta: 'நீர்' },
    significance: {
      en: 'Moon Pushkara in Pisces - spiritual renunciation, profound universal compassion, higher consciousness.',
      ta: 'சந்திரனின் நவாம்சம் - உயர்ந்த ஆன்மிக விழிப்புணர்வு, கருணை, மோட்ச காரியம் மற்றும் மன அமைதி தரும்.'
    }
  },

  // 24. Uttara Bhadrapada Pada 2
  {
    order: 24,
    nakshatraId: 25,
    nakshatraOrder: 26,
    nakshatraName: PUSHKARA_NAKSHATRA_NAMES[25],
    nakshatraLord: { planetId: 6, name: 'Saturn', nameTa: 'சனி' },
    pada: 2,
    padaLabelTa: '2-ஆம் பாதம்',
    padaLabelEn: 'Pada 2',
    rasiId: 11,
    rasiName: { name: 'Pisces', nameTa: 'மீனம்' },
    rasiLord: { name: 'Jupiter', nameTa: 'குரு' },
    navamsaRasiId: 5,
    navamsaRasiName: PUSHKARA_NAVAMSA_RASIS[5],
    navamsaLord: { planetId: 2, name: 'Mercury', nameTa: 'புதன்' },
    isVargottama: false,
    inRasiSpan: "06°40' - 10°00'",
    zodiacSpan360: "336°40' - 340°00'",
    element: { en: 'Water', ta: 'நீர்' },
    significance: {
      en: 'Mercury Pushkara in Pisces - unshakeable tranquility, deep meditative depth, steady prosperity.',
      ta: 'புதனின் நவாம்சம் - மன அமைதி, தியான யோகம், நிலையான தனம் மற்றும் நற்கல்வி தரும்.'
    }
  }
];

/**
 * 18 Nakshatras Summary (as presented in classical reference table)
 * Exact match with user's reference image:
 * நட்சத்திரம் | புஷ்கர நவாம்சம் பெரும் பாதம் | நவாம்சம் அமையும் வீடு
 */
export const PUSHKARA_NAKSHATRA_SUMMARY = [
  {
    order: 1,
    nakshatraName: PUSHKARA_NAKSHATRA_NAMES[1],
    padas: [3],
    padasDisplayTa: '3-ஆம் பாதம்',
    padasDisplayEn: 'Pada 3',
    navamsaRasisTa: 'துலாம்',
    navamsaRasisEn: 'Libra',
    navamsaLordsTa: 'சுக்கிரன்',
    navamsaLordsEn: 'Venus',
    hasVargottama: false
  },
  {
    order: 2,
    nakshatraName: PUSHKARA_NAKSHATRA_NAMES[2],
    padas: [1, 4],
    padasDisplayTa: '1 மற்றும் 4-ஆம் பாதங்கள்',
    padasDisplayEn: 'Padas 1 & 4',
    navamsaRasisTa: 'தனுசு, மீனம்',
    navamsaRasisEn: 'Sagittarius, Pisces',
    navamsaLordsTa: 'குரு',
    navamsaLordsEn: 'Jupiter',
    hasVargottama: false
  },
  {
    order: 3,
    nakshatraName: PUSHKARA_NAKSHATRA_NAMES[3],
    padas: [2],
    padasDisplayTa: '2-ஆம் பாதம்',
    padasDisplayEn: 'Pada 2',
    navamsaRasisTa: 'ரிஷபம்',
    navamsaRasisEn: 'Taurus',
    navamsaLordsTa: 'சுக்கிரன்',
    navamsaLordsEn: 'Venus',
    hasVargottama: true // Vargottama in Taurus
  },
  {
    order: 4,
    nakshatraName: PUSHKARA_NAKSHATRA_NAMES[5],
    padas: [4],
    padasDisplayTa: '4-ஆம் பாதம்',
    padasDisplayEn: 'Pada 4',
    navamsaRasisTa: 'மீனம்',
    navamsaRasisEn: 'Pisces',
    navamsaLordsTa: 'குரு',
    navamsaLordsEn: 'Jupiter',
    hasVargottama: false
  },
  {
    order: 5,
    nakshatraName: PUSHKARA_NAKSHATRA_NAMES[6],
    padas: [2, 4],
    padasDisplayTa: '2 மற்றும் 4-ஆம் பாதங்கள்',
    padasDisplayEn: 'Padas 2 & 4',
    navamsaRasisTa: 'ரிஷபம், கடகம்',
    navamsaRasisEn: 'Taurus, Cancer',
    navamsaLordsTa: 'சுக்கிரன், சந்திரன்',
    navamsaLordsEn: 'Venus, Moon',
    hasVargottama: true // Pada 4 is Vargottama in Cancer
  },
  {
    order: 6,
    nakshatraName: PUSHKARA_NAKSHATRA_NAMES[7],
    padas: [2],
    padasDisplayTa: '2-ஆம் பாதம்',
    padasDisplayEn: 'Pada 2',
    navamsaRasisTa: 'கன்னி',
    navamsaRasisEn: 'Virgo',
    navamsaLordsTa: 'புதன்',
    navamsaLordsEn: 'Mercury',
    hasVargottama: false
  },
  {
    order: 7,
    nakshatraName: PUSHKARA_NAKSHATRA_NAMES[10],
    padas: [3],
    padasDisplayTa: '3-ஆம் பாதம்',
    padasDisplayEn: 'Pada 3',
    navamsaRasisTa: 'துலாம்',
    navamsaRasisEn: 'Libra',
    navamsaLordsTa: 'சுக்கிரன்',
    navamsaLordsEn: 'Venus',
    hasVargottama: false
  },
  {
    order: 8,
    nakshatraName: PUSHKARA_NAKSHATRA_NAMES[11],
    padas: [1, 4],
    padasDisplayTa: '1 மற்றும் 4-ஆம் பாதங்கள்',
    padasDisplayEn: 'Padas 1 & 4',
    navamsaRasisTa: 'தனுசு, மீனம்',
    navamsaRasisEn: 'Sagittarius, Pisces',
    navamsaLordsTa: 'குரு',
    navamsaLordsEn: 'Jupiter',
    hasVargottama: false
  },
  {
    order: 9,
    nakshatraName: PUSHKARA_NAKSHATRA_NAMES[12],
    padas: [2],
    padasDisplayTa: '2-ஆம் பாதம்',
    padasDisplayEn: 'Pada 2',
    navamsaRasisTa: 'ரிஷபம்',
    navamsaRasisEn: 'Taurus',
    navamsaLordsTa: 'சுக்கிரன்',
    navamsaLordsEn: 'Venus',
    hasVargottama: false
  },
  {
    order: 10,
    nakshatraName: PUSHKARA_NAKSHATRA_NAMES[14],
    padas: [4],
    padasDisplayTa: '4-ஆம் பாதம்',
    padasDisplayEn: 'Pada 4',
    navamsaRasisTa: 'மீனம்',
    navamsaRasisEn: 'Pisces',
    navamsaLordsTa: 'குரு',
    navamsaLordsEn: 'Jupiter',
    hasVargottama: false
  },
  {
    order: 11,
    nakshatraName: PUSHKARA_NAKSHATRA_NAMES[15],
    padas: [2, 4],
    padasDisplayTa: '2 மற்றும் 4-ஆம் பாதங்கள்',
    padasDisplayEn: 'Padas 2 & 4',
    navamsaRasisTa: 'ரிஷபம், கடகம்',
    navamsaRasisEn: 'Taurus, Cancer',
    navamsaLordsTa: 'சுக்கிரன், சந்திரன்',
    navamsaLordsEn: 'Venus, Moon',
    hasVargottama: false
  },
  {
    order: 12,
    nakshatraName: PUSHKARA_NAKSHATRA_NAMES[16],
    padas: [2],
    padasDisplayTa: '2-ஆம் பாதம்',
    padasDisplayEn: 'Pada 2',
    navamsaRasisTa: 'கன்னி',
    navamsaRasisEn: 'Virgo',
    navamsaLordsTa: 'புதன்',
    navamsaLordsEn: 'Mercury',
    hasVargottama: false
  },
  {
    order: 13,
    nakshatraName: PUSHKARA_NAKSHATRA_NAMES[19],
    padas: [3],
    padasDisplayTa: '3-ஆம் பாதம்',
    padasDisplayEn: 'Pada 3',
    navamsaRasisTa: 'துலாம்',
    navamsaRasisEn: 'Libra',
    navamsaLordsTa: 'சுக்கிரன்',
    navamsaLordsEn: 'Venus',
    hasVargottama: false
  },
  {
    order: 14,
    nakshatraName: PUSHKARA_NAKSHATRA_NAMES[20],
    padas: [1, 4],
    padasDisplayTa: '1 மற்றும் 4-ஆம் பாதங்கள்',
    padasDisplayEn: 'Padas 1 & 4',
    navamsaRasisTa: 'தனுசு, மீனம்',
    navamsaRasisEn: 'Sagittarius, Pisces',
    navamsaLordsTa: 'குரு',
    navamsaLordsEn: 'Jupiter',
    hasVargottama: true // Pada 1 is Vargottama in Sagittarius
  },
  {
    order: 15,
    nakshatraName: PUSHKARA_NAKSHATRA_NAMES[21],
    padas: [2],
    padasDisplayTa: '2-ஆம் பாதம்',
    padasDisplayEn: 'Pada 2',
    navamsaRasisTa: 'ரிஷபம்',
    navamsaRasisEn: 'Taurus',
    navamsaLordsTa: 'சுக்கிரன்',
    navamsaLordsEn: 'Venus',
    hasVargottama: false
  },
  {
    order: 16,
    nakshatraName: PUSHKARA_NAKSHATRA_NAMES[23],
    padas: [4],
    padasDisplayTa: '4-ஆம் பாதம்',
    padasDisplayEn: 'Pada 4',
    navamsaRasisTa: 'மீனம்',
    navamsaRasisEn: 'Pisces',
    navamsaLordsTa: 'குரு',
    navamsaLordsEn: 'Jupiter',
    hasVargottama: false
  },
  {
    order: 17,
    nakshatraName: PUSHKARA_NAKSHATRA_NAMES[24],
    padas: [2, 4],
    padasDisplayTa: '2 மற்றும் 4-ஆம் பாதங்கள்',
    padasDisplayEn: 'Padas 2 & 4',
    navamsaRasisTa: 'ரிஷபம், கடகம்',
    navamsaRasisEn: 'Taurus, Cancer',
    navamsaLordsTa: 'சுக்கிரன், சந்திரன்',
    navamsaLordsEn: 'Venus, Moon',
    hasVargottama: false
  },
  {
    order: 18,
    nakshatraName: PUSHKARA_NAKSHATRA_NAMES[25],
    padas: [2],
    padasDisplayTa: '2-ஆம் பாதம்',
    padasDisplayEn: 'Pada 2',
    navamsaRasisTa: 'கன்னி',
    navamsaRasisEn: 'Virgo',
    navamsaLordsTa: 'புதன்',
    navamsaLordsEn: 'Mercury',
    hasVargottama: false
  }
];

export const NON_PUSHKARA_NAKSHATRAS_NOTE = {
  ta: '(குறிப்பு: கேது, செவ்வாய், புதன் ஆகிய கிரகங்களின் நட்சத்திரங்களான அசுவினி, மகம், மூலம், மிருகசீரிடம், சித்திரை, அவிட்டம், ஆயில்யம், கேட்டை, ரேவதி ஆகியவற்றுக்கு புஷ்கர நவாம்ச பாதங்கள் கிடையாது).',
  en: '(Note: Nakshatras ruled by Ketu, Mars, and Mercury—Ashwini, Magha, Mula, Mrigashirsha, Chitra, Dhanishta, Ashlesha, Jyeshtha, and Revati—have NO Pushkara Navamsa padas).'
};

export const PUSHKARA_NAVAMSA_STATS = {
  totalPadas: 24,
  totalNakshatras: 18,
  nonPushkaraNakshatrasCount: 9,
  beneficSignsCount: 6,
  vargottamaPadasCount: 3,
  signsDistribution: [
    { nameTa: 'ரிஷபம்', nameEn: 'Taurus', lordTa: 'சுக்கிரன்', lordEn: 'Venus', count: 6 },
    { nameTa: 'மீனம்', nameEn: 'Pisces', lordTa: 'குரு', lordEn: 'Jupiter', count: 6 },
    { nameTa: 'துலாம்', nameEn: 'Libra', lordTa: 'சுக்கிரன்', lordEn: 'Venus', count: 3 },
    { nameTa: 'தனுசு', nameEn: 'Sagittarius', lordTa: 'குரு', lordEn: 'Jupiter', count: 3 },
    { nameTa: 'கடகம்', nameEn: 'Cancer', lordTa: 'சந்திரன்', lordEn: 'Moon', count: 3 },
    { nameTa: 'கன்னி', nameEn: 'Virgo', lordTa: 'புதன்', lordEn: 'Mercury', count: 3 }
  ]
};
