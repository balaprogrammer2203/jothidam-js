/**
 * Enterprise Multilingual Content Helper
 * Provides seamless 6-language resolution (English, Tamil, Hindi, Telugu, Kannada, Malayalam)
 * for dynamic database objects, static UI strings, breadcrumbs, and attribute labels.
 */

// Supported language codes
export const LANG_CODES = ['ta', 'en', 'hi', 'te', 'kn', 'ml'];

/**
 * Extracts a localized string from an object or returns the appropriate fallback.
 * Checks language-specific keys like:
 * - ml: nameMl, titleMl, labelMl, ml
 * - te: nameTe, titleTe, labelTe, te
 * - kn: nameKn, titleKn, labelKn, kn
 * - hi: nameHi, titleHi, labelHi, hi
 * - ta: nameTa, titleTa, labelTa, ta
 * - en: nameEn, titleEn, labelEn, en, name, title, label
 */
export function getLocalizedValue(obj, lang = 'en', defaultFallback = '-') {
  if (!obj) return defaultFallback;
  if (typeof obj === 'string') return obj;
  if (typeof obj === 'number') return String(obj);

  const l = (lang || 'en').toLowerCase();

  // If object has direct language key like { en: "Sun", ta: "சூரியன்", ml: "സൂര്യൻ" }
  if (obj[l]) return obj[l];

  // Language specific property suffixes
  const suffixMap = {
    ml: ['Ml', 'ml'],
    te: ['Te', 'te'],
    kn: ['Kn', 'kn'],
    hi: ['Hi', 'hi'],
    ta: ['Ta', 'ta'],
    en: ['En', 'en', '']
  };

  const prefixes = [
    'name', 'title', 'label', 'value', 'desc', 'description', 'meaning', 'season', 'type', 'nature', 'paksha',
    'rasiName', 'nakshatraName', 'navamsaRasiName', 'lordName', 'deity'
  ];

  // Check requested language first
  const targetSuffixes = suffixMap[l] || ['En', 'en', ''];
  for (const prefix of prefixes) {
    for (const suffix of targetSuffixes) {
      const key = suffix ? `${prefix}${suffix}` : prefix;
      if (obj[key] && typeof obj[key] === 'string' && obj[key].trim()) {
        return obj[key];
      }
    }
  }

  // Fallbacks in priority order
  const fallbackLangs = ['en', 'ta', 'hi', 'te', 'kn', 'ml'].filter((code) => code !== l);
  for (const fbLang of fallbackLangs) {
    const fbSuffixes = suffixMap[fbLang] || [];
    for (const prefix of prefixes) {
      for (const suffix of fbSuffixes) {
        const key = suffix ? `${prefix}${suffix}` : prefix;
        if (obj[key] && typeof obj[key] === 'string' && obj[key].trim()) {
          return obj[key];
        }
      }
    }
    if (obj[fbLang]) return obj[fbLang];
  }

  return obj.name || obj.title || obj.label || defaultFallback;
}

/**
 * Returns the primary title and dual-script subtitle for cards.
 * Example: In Malayalam mode -> Primary: "മേടം", Subtitle: "Aries / Mesha"
 *          In English mode   -> Primary: "Aries", Subtitle: "மேஷம் / मेष"
 */
export function getLocalizedCardTitles(item, lang = 'en') {
  if (!item) return { title: '-', subtitle: '' };

  const l = (lang || 'en').toLowerCase();
  const primaryTitle = getLocalizedValue(item, l, item.name || '-');

  let subtitle = '';
  if (l === 'en') {
    // Show regional names (Tamil / Sanskrit)
    subtitle = item.nameTa || item.sanskritName || item.nameHi || item.nameMl || '';
  } else {
    // Show English name as subtitle for clarity
    subtitle = item.name || item.nameEn || item.sanskritName || item.nameTa || '';
    if (subtitle === primaryTitle) {
      subtitle = item.sanskritName || item.nameTa || item.name || '';
    }
  }

  return {
    title: primaryTitle,
    subtitle: subtitle && subtitle !== primaryTitle ? subtitle : ''
  };
}

/**
 * Enterprise Static UI Dictionary for Astrological Master Pages
 */
export const UI_STRINGS = {
  // Navigation & General
  home: {
    en: 'Home',
    ta: 'முகப்பு',
    hi: 'होम',
    te: 'హోమ్',
    kn: 'ಮುಖಪುಟ',
    ml: 'ഹോം'
  },
  all: {
    en: 'All',
    ta: 'அனைத்தும்',
    hi: 'सभी',
    te: 'అన్నీ',
    kn: 'ಎಲ್ಲವೂ',
    ml: 'എല്ലാം'
  },
  loading: {
    en: 'Loading astrological data...',
    ta: 'விவரங்கள் ஏற்றப்படுகின்றன...',
    hi: 'ज्योतिष डेटा लोड हो रहा है...',
    te: 'జ్యోతిష వివరాలు లోడ్ అవుతున్నాయి...',
    kn: 'ಜ್ಯೋತಿಷ್ಯ ಮಾಹಿತಿ ಲೋಡ್ ಆಗುತ್ತಿದೆ...',
    ml: 'ജ്യോതിഷ വിവരങ്ങൾ ലഭ്യമാക്കുന്നു...'
  },
  searchPlaceholder: {
    en: 'Search by name, deity or lord...',
    ta: 'பெயர், அதிபதி அல்லது தேவதை கொண்டு தேடுக...',
    hi: 'नाम, स्वामी या देवता द्वारा खोजें...',
    te: 'పేరు, అధిపతి లేదా దేవత పేరుతో శోధించండి...',
    kn: 'ಹೆಸರು, ಅಧಿಪತಿ ಅಥವಾ ದೇವತೆಯ ಹೆಸರಿನಿಂದ ಹುಡುಕಿ...',
    ml: 'പേര്, അധിപൻ അല്ലെങ്കിൽ ദേവത വഴി തിരയുക...'
  },

  // 12 Rasis Page
  rasisTitle: {
    en: '12 Zodiac Signs (Rasis) Directory',
    ta: '12 ராசிகள் விவர அட்டவணை',
    hi: '12 राशियाँ विवरण निर्देशिका',
    te: '12 రాశులు సమగ్ర సమాచారం',
    kn: '12 ರಾಶಿಗಳ ಸಮಗ್ರ ಕೋಷ್ಟಕ',
    ml: '12 രാശികൾ സമഗ്ര ഡയറക്ടറി'
  },
  rasisSubtitle: {
    en: 'Comprehensive astrological specifications of the 12 Vedic signs including lords, elements, and attributes.',
    ta: 'மேஷம் முதல் மீனம் வரையிலான 12 ராசிகளின் அதிபதி, பூதம், குணம், திசை மற்றும் உடல் உறுப்புகள் விவரங்கள்.',
    hi: 'मेष से मीन तक 12 वैदिक राशियों के स्वामी, तत्व, गुण, दिशा और शरीर के अंगों का विस्तृत विवरण।',
    te: 'మేషం నుండి మీనం వరకు 12 రాశుల అధిపతులు, తత్వాలు, గుణాలు, దిశలు మరియు శరీర భాగాలు.',
    kn: 'ಮೇಷದಿಂದ ಮೀನದವರೆಗೆ 12 ರಾಶಿಗಳ ಅಧಿಪತಿ, ತತ್ವ, ಗುಣ, ದಿಕ್ಕು ಮತ್ತು ದೇಹದ ಅಂಗಗಳ ವಿವರಣೆ.',
    ml: 'മേടം മുതൽ മീനം വരെയുള്ള 12 രാശികളുടെ അധിപൻ, തത്വം, ഗുണം, ദിശ, ശരീര ഭാഗങ്ങൾ എന്നിവയുടെ സമഗ്ര വിവരങ്ങൾ.'
  },
  rasisSearchPlaceholder: {
    en: 'Search by Sign or Lord name...',
    ta: 'ராசி அல்லது அதிபதி பெயர் கொண்டு தேடுக...',
    hi: 'राशि या स्वामी के नाम से खोजें...',
    te: 'రాశి లేదా అధిపతి పేరుతో శోధించండి...',
    kn: 'ರಾಶಿ ಅಥವಾ ಅಧಿಪತಿಯ ಹೆಸರಿನಿಂದ ಹುಡುಕಿ...',
    ml: 'രാശി അല്ലെങ്കിൽ അധിപന്റെ പേര് ഉപയോഗിച്ച് തിരയുക...'
  },

  // 9 Planets Page
  planetsTitle: {
    en: 'Navagraha (9 Planets) Directory',
    ta: 'நவகிரகங்கள் (9 Planets) விவர அட்டவணை',
    hi: 'नवग्रह (9 ग्रह) विवरण निर्देशिका',
    te: 'నవగ్రహాలు (9 గ్రహాలు) సమగ్ర సమాచారం',
    kn: 'ನವಗ್ರಹಗಳು (9 ಗ್ರಹಗಳು) ಸಮಗ್ರ ಕೋಷ್ಟಕ',
    ml: 'നവഗ്രഹങ്ങൾ (9 ഗ്രഹങ്ങൾ) സമഗ്ര ഡയറക്ടറി'
  },
  planetsSubtitle: {
    en: 'Detailed attributes of the 9 celestial rulers including nature, exaltation, debilitation, gemstone, metal, and grain.',
    ta: 'சூரியன் முதல் கேது வரையிலான 9 கிரகங்களின் ஆட்சி, உச்சம், நீசம், ரத்தினம், உலோகம், தானியம் மற்றும் குணங்கள்.',
    hi: 'सूर्य से केतु तक 9 ग्रहों के गुण, उच्च-नीच राशि, रत्न, धातु, अनाज और मित्रता-शत्रुता का विवरण।',
    te: 'సూర్యుడు నుండి కేతువు వరకు 9 గ్రహాల గుణాలు, ఉచ్ఛ, నీచ క్షేత్రాలు, రత్నాలు, లోహాలు, ధాన్యాలు.',
    kn: 'ಸೂರ್ಯನಿಂದ ಕೇತುವಿನವರೆಗೆ 9 ಗ್ರಹಗಳ ಗುಣ, ಉಚ್ಚ-ನೀಚ ಸ್ಥಾನ, ರತ್ನ, ಲೋಹ, ಧಾನ್ಯಗಳ ಸಂಪೂರ್ಣ ವಿವರ.',
    ml: 'സൂര്യൻ മുതൽ കേതു വരെയുള്ള 9 ഗ്രഹങ്ങളുടെ ഗുണം, ഉച്ച-നീച രാശികൾ, രത്നം, ലോഹം, ധാന്യം എന്നിവയുടെ സമഗ്ര വിവരങ്ങൾ.'
  },
  planetsSearchPlaceholder: {
    en: 'Search by Planet, Gemstone or Day...',
    ta: 'கிரகம், ரத்தினம் அல்லது கிழமை பெயர் கொண்டு தேடுக...',
    hi: 'ग्रह, रत्न या वार के नाम से खोजें...',
    te: 'గ్రహం, రత్నం లేదా వారం పేరుతో శోధించండి...',
    kn: 'ಗ್ರಹ, ರತ್ನ ಅಥವಾ ವಾರದ ಹೆಸರಿನಿಂದ ಹುಡುಕಿ...',
    ml: 'ഗ്രഹം, രത്നം അല്ലെങ്കിൽ ദിവസം വഴി തിരയുക...'
  },

  // 27 Nakshatras Page
  nakshatrasTitle: {
    en: '27 Nakshatras (Lunar Mansions) Directory',
    ta: '27 நட்சத்திரங்கள் விவர அட்டவணை',
    hi: '27 नक्षत्र विवरण निर्देशिका',
    te: '27 నక్షత్రాలు సమగ్ర సమాచారం',
    kn: '27 ನಕ್ಷತ್ರಗಳ ಸಮಗ್ರ ಕೋಷ್ಟಕ',
    ml: '27 നക്ഷത്രങ്ങൾ സമഗ്ര ഡയറക്ടറി'
  },
  nakshatrasSubtitle: {
    en: 'Astrological directory of 27 lunar stars with deities, lords, ganas, yonis, animals, trees, birds, and zodiac spans.',
    ta: 'அசுவினி முதல் ரேவதி வரையிலான 27 நட்சத்திரங்களின் அதிபதி, தேவதை, கணம், யோனி, மரம், பறவை, மிருகம் மற்றும் பாத விவரங்கள்.',
    hi: 'अश्विनी से रेवती तक 27 नक्षत्रों के स्वामी, देवता, गण, योनि, वृक्ष, पक्षी, पशु और चरण विस्तार।',
    te: 'అశ్విని నుండి రేవతి వరకు 27 నక్షత్రాల అధిపతులు, దేవతలు, గణాలు, యోనులు, వృక్షాలు, పక్షులు, పాదాలు.',
    kn: 'ಅಶ್ವಿನಿಯಿಂದ ರೇವತಿಯವರೆಗೆ 27 ನಕ್ಷತ್ರಗಳ ಅಧಿಪತಿ, ದೇವತೆ, ಗಣ, ಯೋನಿ, ವೃಕ್ಷ, ಪಕ್ಷಿ, ಪ್ರಾಣಿ ಮತ್ತು ಪಾದಗಳ ವಿವರ.',
    ml: 'അശ്വതി മുതൽ രേവതി വരെയുള്ള 27 നക്ഷത്രങ്ങളുടെ അധിപൻ, ദേവത, ഗണം, യോനി, വൃക്ഷം, പക്ഷി, മൃഗം, പാദ വിവരങ്ങൾ.'
  },
  nakshatrasSearchPlaceholder: {
    en: 'Search by Star, Deity or Lord name...',
    ta: 'நட்சத்திரம், தேவதை அல்லது அதிபதி பெயர் கொண்டு தேடுக...',
    hi: 'नक्षत्र, देवता या स्वामी के नाम से खोजें...',
    te: 'నక్షత్రం, దేవత లేదా అధిపతి పేరుతో శోధించండి...',
    kn: 'ನಕ್ಷತ್ರ, ದೇವತೆ ಅಥವಾ ಅಧಿಪತಿಯ ಹೆಸರಿನಿಂದ ಹುಡುಕಿ...',
    ml: 'നക്ഷത്രം, ദേവത അല്ലെങ്കിൽ അധിപന്റെ പേര് ഉപയോഗിച്ച് തിരയുക...'
  },

  // 30 Tithis Page
  tithisTitle: {
    en: '30 Vedic Lunar Tithis Directory',
    ta: '30 திதிகள் விவர அட்டவணை',
    hi: '30 वैदिक तिथियाँ विवरण निर्देशिका',
    te: '30 తిథులు సమగ్ర సమాచారం',
    kn: '30 ತಿಥಿಗಳ ಸಮಗ್ರ ಕೋಷ್ಟಕ',
    ml: '30 തിഥികൾ സമഗ്ര ഡയറക്ടറി'
  },
  tithisSubtitle: {
    en: 'Comprehensive lunar day calendar covering Shukla & Krishna pakshas, deities, categories, and auspicious activities.',
    ta: 'சுக்ல மற்றும் கிருஷ்ண பக்ஷத்தின் 30 திதிகளின் அதிபதி, தேவதை, வகை (நந்தா, பத்ரா, ஜயா, ரிக்தா, பூர்ணா) விவரங்கள்.',
    hi: 'शुक्ल और कृष्ण पक्ष की 30 तिथियों के स्वामी, देवता, वर्ग (नंदा, भद्रा, जया, रिक्ता, पूर्णा) और शुभ मुहूर्त।',
    te: 'శుక్ల మరియు కృష్ణ పక్షాల 30 తిథుల అధిపతులు, దేవతలు, వర్గాలు (నంద, భద్ర, జయ, రిక్త, పూర్ణ) మరియు శుభ కార్యాలు.',
    kn: 'ಶುಕ್ಲ ಮತ್ತು ಕೃಷ್ಣ ಪಕ್ಷದ 30 ತಿಥಿಗಳ ಅಧಿಪತಿ, ದೇವತೆ, ವರ್ಗಗಳು (ನಂದಾ, ಭದ್ರಾ, ಜಯಾ, ರಿಕ್ತಾ, ಪೂರ್ಣಾ) ಮತ್ತು ಶುಭ ಕಾರ್ಯಗಳು.',
    ml: 'ശുക്ല, കൃഷ്ണ പക്ഷങ്ങളിലെ 30 തിഥികളുടെ അധിപൻ, ദേവത, വർഗ്ഗങ്ങൾ (നന്ദ, ഭദ്ര, ജയ, രിക്ത, പൂർണ്ണ), ശുഭ മുഹൂർത്തങ്ങൾ.'
  },
  tithisSearchPlaceholder: {
    en: 'Search by Tithi or Deity name...',
    ta: 'திதி அல்லது தேவதை பெயர் கொண்டு தேடுக...',
    hi: 'तिथि या देवता के नाम से खोजें...',
    te: 'తిథి లేదా దేవత పేరుతో శోధించండి...',
    kn: 'ತಿಥಿ ಅಥವಾ ದೇವತೆಯ ಹೆಸರಿನಿಂದ ಹುಡುಕಿ...',
    ml: 'തിഥി അല്ലെങ്കിൽ ദേവത വഴി തിരയുക...'
  },

  // 27 Yogas Page
  yogasTitle: {
    en: '27 Nithya Yogas Directory',
    ta: '27 நித்திய யோகங்கள் விவர அட்டவணை',
    hi: '27 नित्य योग विवरण निर्देशिका',
    te: '27 నిత్య యోగాలు సమగ్ర సమాచారం',
    kn: '27 ನಿತ್ಯ ಯೋಗಗಳ ಸಮಗ್ರ ಕೋಷ್ಟಕ',
    ml: '27 നിത്യ യോഗങ്ങൾ സമഗ്ര ഡയറക്ടറി'
  },
  yogasSubtitle: {
    en: '27 Vedic angular conjunctions of Sun and Moon with lords, benefic/malefic natures, and spiritual properties.',
    ta: 'விஷ்கம்பம் முதல் வைதிருதி வரையிலான 27 யோகங்களின் அதிபதி, சுப/அசுப தன்மை மற்றும் பலன்கள்.',
    hi: 'विष्कम्भ से वैधृति तक 27 नित्य योगों के स्वामी, शुभ-अशुभ प्रकृति और फल।',
    te: 'విష్కంభం నుండి వైధృతి వరకు 27 యోగాల అధిపతులు, శుభ/అశుభ స్వభావాలు.',
    kn: 'ವಿಷ್ಕಂಭದಿಂದ ವೈಧೃತಿಯವರೆಗೆ 27 ನಿತ್ಯ ಯೋಗಗಳ ಅಧಿಪತಿ, ಶುಭ/ಅಶುಭ ಸ್ವಭಾವ ಮತ್ತು ಫಲಗಳು.',
    ml: 'വിഷ്കംഭം മുതൽ വൈധൃതി വരെയുള്ള 27 നിത്യ യോഗങ്ങളുടെ അധിപൻ, ശുഭ/അശുഭ സ്വഭാവം, ഫലങ്ങൾ.'
  },
  yogasSearchPlaceholder: {
    en: 'Search by Yoga or Lord name...',
    ta: 'யோகம் அல்லது அதிபதி பெயர் கொண்டு தேடுக...',
    hi: 'योग या स्वामी के नाम से खोजें...',
    te: 'యోగం లేదా అధిపతి పేరుతో శోధించండి...',
    kn: 'ಯೋಗ ಅಥವಾ ಅಧಿಪತಿಯ ಹೆಸರಿನಿಂದ ಹುಡುಕಿ...',
    ml: 'യോഗം അല്ലെങ്കിൽ അധിപന്റെ പേര് വഴി തിരയുക...'
  },

  // 11 Karanas Page
  karanasTitle: {
    en: '11 Karanas (Half-Tithis) Directory',
    ta: '11 கரணங்கள் விவர அட்டவணை',
    hi: '11 करण विवरण निर्देशिका',
    te: '11 కరణాలు సమగ్ర సమాచారం',
    kn: '11 ಕರಣಗಳ ಸಮಗ್ರ ಕೋಷ್ಟಕ',
    ml: '11 കരണങ്ങൾ സമഗ്ര ഡയറക്ടറി'
  },
  karanasSubtitle: {
    en: '7 Chara (movable) and 4 Sthira (fixed) Vedic karanas with lords, deities, and predictive influences.',
    ta: 'பவம் முதல் கிமிஸ்துக்னம் வரையிலான 7 சரம் மற்றும் 4 ஸ்திர கரணங்களின் அதிபதி, தேவதை மற்றும் இயல்புகள்.',
    hi: 'बव से किंस्तुघ्न तक 7 चर और 4 स्थिर करणों के स्वामी, देवता और प्रभाव।',
    te: 'బవ నుండి కింస్తుఘ్నం వరకు 7 చర మరియు 4 స్థిర కరణాల అధిపతులు, దేవతలు.',
    kn: 'ಬವದಿಂದ ಕಿಂಸ್ತುಘ್ನದವರೆಗೆ 7 ಚರ ಮತ್ತು 4 ಸ್ಥಿರ ಕರಣಗಳ ಅಧಿಪತಿ, ದೇವತೆ ಮತ್ತು ಪ್ರಭಾವಗಳು.',
    ml: 'ബവം മുതൽ കിംസ്തുഘ്നം വരെയുള്ള 7 ചര, 4 സ്ഥിര കരണങ്ങളുടെ അധിപൻ, ദേവത, സ്വഭാവങ്ങൾ.'
  },
  karanasSearchPlaceholder: {
    en: 'Search by Karana, Deity or Lord name...',
    ta: 'கரணம், தேவதை அல்லது அதிபதி பெயர் கொண்டு தேடுக...',
    hi: 'करण, देवता या स्वामी के नाम से खोजें...',
    te: 'కరణం, దేవత లేదా అధిపతి పేరుతో శోధించండి...',
    kn: 'ಕರಣ, ದೇವತೆ ಅಥವಾ ಅಧಿಪತಿಯ ಹೆಸರಿನಿಂದ ಹುಡುಕಿ...',
    ml: 'കരണം, ദേവത അല്ലെങ്കിൽ അധിപന്റെ പേര് വഴി തിരയുക...'
  },

  // Tamil Calendar (Years & Months) Page
  calendarTitle: {
    en: 'Vedic Tamil Calendar Directory (Years & Months)',
    ta: 'தமிழ் காலண்டர் (60 வருடங்கள் & 12 மாதங்கள்)',
    hi: 'वैदिक सौर पंचांग (60 संवत्सर और 12 मास)',
    te: 'వైదిక సౌర పంచాంగం (60 సంవత్సరాలు & 12 మాసాలు)',
    kn: 'ವೈದಿಕ ಸೌರ ಪಂಚಾಂಗ (60 ಸಂವತ್ಸರಗಳು & 12 ಮಾಸಗಳು)',
    ml: 'വേദ സൗര കലണ്ടർ (60 സംവത്സരങ്ങൾ & 12 മാസങ്ങൾ)'
  },
  calendarSubtitle: {
    en: 'The 60-year Jupiter cycle (Samvatsaras) and 12 Solar Months with corresponding signs, seasons, and meanings.',
    ta: 'பிரபவ முதல் அட்சய வரையிலான 60 தமிழ் வருடங்கள் மற்றும் சித்திரை முதல் பங்குனி வரையிலான 12 தமிழ் மாதங்கள்.',
    hi: 'प्रभव से अक्षय तक 60 संवत्सर चक्र और चैत्र से फाल्गुन तक 12 सौर मास, राशियाँ और ऋतुएँ।',
    te: 'ప్రభవ నుండి అక్షయ వరకు 60 సంవత్సరాల చక్రం మరియు 12 సౌర మాసాలు, రాశులు, ఋతువులు.',
    kn: 'ಪ್ರಭವದಿಂದ ಅಕ್ಷಯದವರೆಗೆ 60 ಸಂವತ್ಸರಗಳು ಮತ್ತು 12 ಸೌರ ಮಾಸಗಳು, ರಾಶಿಗಳು ಮತ್ತು ಋತುಗಳು.',
    ml: 'പ്രഭവ മുതൽ അക്ഷയ വരെയുള്ള 60 സംവത്സരങ്ങളും 12 സൗര മാസങ്ങളും, രാശികളും, ഋതുക്കളും.'
  },
  tabYears: {
    en: '60 Vedic Years (Samvatsaras)',
    ta: '60 தமிழ் வருடங்கள்',
    hi: '60 संवत्सर (वर्ष)',
    te: '60 సంవత్సరాలు',
    kn: '60 ಸಂವತ್ಸರಗಳು',
    ml: '60 സംവത്സരങ്ങൾ'
  },
  tabMonths: {
    en: '12 Solar Months',
    ta: '12 தமிழ் மாதங்கள்',
    hi: '12 सौर मास',
    te: '12 సౌర మాసాలు',
    kn: '12 ಸೌರ ಮಾಸಗಳು',
    ml: '12 സൗര മാസങ്ങൾ'
  },
  calendarSearchPlaceholder: {
    en: 'Search by Year or Month name...',
    ta: 'வருடம் அல்லது மாதம் பெயர் கொண்டு தேடுக...',
    hi: 'वर्ष या मास के नाम से खोजें...',
    te: 'సంవత్సరం లేదా మాసం పేరుతో శోధించండి...',
    kn: 'ವರ್ಷ ಅಥವಾ ಮಾಸದ ಹೆಸರಿನಿಂದ ಹುಡುಕಿ...',
    ml: 'വർഷം അല്ലെങ്കിൽ മാസത്തിന്റെ പേര് വഴി തിരയുക...'
  },

  // Kalachakram Page
  kalachakramTitle: {
    en: 'Kalachakram (360° Cosmic Wheel) Directory',
    ta: 'காலசக்கரம் 360° பாகை விவர அட்டவணை',
    hi: 'कालचक्र (360° चक्र) निर्देशिका',
    te: 'కాలచక్రం 360° సూచిక',
    kn: 'ಕಾಲಚಕ್ರ 360° ಕೋಷ್ಟಕ',
    ml: 'കാലചക്രം 360° ഡയറക്ടറി'
  },
  kalachakramSubtitle: {
    en: 'Precise degree-by-degree (0° to 359°) mapping connecting Rasi, Nakshatra, Pada, and Navamsa sign rulers.',
    ta: '0° முதல் 359° வரையிலான 360 பாகைகளின் ராசி, நட்சத்திரம், பாதம் மற்றும் நவாம்ச அதிபதிகள் விவரங்கள்.',
ml: '0° മുതൽ 359° വരെയുള്ള ഓരോ ഡിഗ്രിയിലും രാശി, നക്ഷത്രം, പാദം, നവാംശ അധിപന്മാരുടെ സമഗ്ര വിവരങ്ങൾ.'
  },
  degree: {
    en: 'Degree',
    ta: 'பாகை',
    hi: 'अंश / डिग्री',
    te: 'డిగ్రీ',
    kn: 'ಅಂಶ / ಡಿಗ್ರಿ',
    ml: 'ഡിഗ്രി'
  },
  degrees: {
    en: 'Degrees',
    ta: 'பாகைகள்',
    hi: 'डिग्री',
    te: 'డిగ్రీలు',
    kn: 'ಅಂಶಗಳು',
    ml: 'ഡിഗ്രികൾ'
  },
  degreeInRasi: {
    en: 'Degree in Rasi',
    ta: 'ராசிக்குள் பாகை',
    hi: 'राशि में अंश',
    te: 'రాశిలో డిగ్రీ',
    kn: 'ರಾಶಿಯಲ್ಲಿ ಅಂಶ',
    ml: 'രാശിയിലെ ഡിഗ്രി'
  },
  zodiacSign: {
    en: 'Zodiac Sign (Rasi)',
    ta: 'ராசி',
    hi: 'राशि',
    te: 'రాశి',
    kn: 'ರಾಶಿ',
    ml: 'രാശി'
  },
  nakshatra: {
    en: 'Nakshatra (Star)',
    ta: 'நட்சத்திரம்',
    hi: 'नक्षत्र',
    te: 'నక్షత్రం',
    kn: 'ನಕ್ಷತ್ರ',
    ml: 'നക്ഷത്രം'
  },
  pada: {
    en: 'Pada',
    ta: 'பாதம்',
    hi: 'चरण / पाद',
    te: 'పాదము',
    kn: 'ಪಾದ',
    ml: 'പാദം'
  },
  padaLabel: {
    en: 'Pada',
    ta: 'பாதம்',
    hi: 'चरण',
    te: 'పాదం',
    kn: 'ಪಾದ',
    ml: 'പാദം'
  },
  starLord: {
    en: 'Star Lord',
    ta: 'நட்சத்திர அதிபதி',
    hi: 'नक्षत्र स्वामी',
    te: 'నక్షత్రాధిపతి',
    kn: 'ನಕ್ಷತ್ರಾಧಿಪತಿ',
    ml: 'നക്ഷത്രാധിപൻ'
  },
  rasiLord: {
    en: 'Rasi Lord',
    ta: 'ராசி அதிபதி',
    hi: 'राशि स्वामी',
    te: 'రాశ్యాధిపతి',
    kn: 'ರಾಶ್ಯಾಧಿಪತಿ',
    ml: 'രാശ്യാധിപൻ'
  },
  navamsaSign: {
    en: 'Navamsa Sign (D9)',
    ta: 'நவாம்ச ராசி',
    hi: 'नवांश राशि (D9)',
    te: 'నవాంశ రాశి (D9)',
    kn: 'ನವಾಂಶ ರಾಶಿ (D9)',
    ml: 'നവാംശ രാശി (D9)'
  },
  navamsaLord: {
    en: 'Navamsa Lord',
    ta: 'நவாம்ச அதிபதி',
    hi: 'नवांश स्वामी',
    te: 'నవాంశ అధిపతి',
    kn: 'ನವಾಂಶ ಅಧಿಪತಿ',
    ml: 'നവാംശ അധിപൻ'
  },
  selectDegree: {
    en: 'Select',
    ta: 'தேர்வு',
    hi: 'चुनें',
    te: 'ఎంచుకోండి',
    kn: 'ಆಯ್ಕೆಮಾಡಿ',
    ml: 'തിരഞ്ഞെടുക്കുക'
  },
  exploreDegree: {
    en: 'Explore Degree (0°-359°):',
    ta: 'பாகை ஆய்வு செய்க (0°-359°):',
    hi: 'डिग्री अन्वेषण (0°-359°):',
    te: 'డిగ్రీ పరిశీలించండి (0°-359°):',
    kn: 'ಅಂಶ ಪರಿಶೀಲಿಸಿ (0°-359°):',
    ml: 'ഡിഗ്രി കണ്ടെത്തുക (0°-359°):'
  },
  searchDegreePlaceholder: {
    en: 'Search degree (0 - 359°)...',
    ta: 'பாகை தேடுக (0 - 359°)...',
    hi: 'डिग्री खोजें (0 - 359°)...',
    te: 'డిగ్రీ శోధించండి (0 - 359°)...',
    kn: 'ಅಂಶ ಹುಡುಕಿ (0 - 359°)...',
    ml: 'ഡിഗ്രി തിരയുക (0 - 359°)...'
  },
  allSigns: {
    en: 'All Signs (0°-360°)',
    ta: 'அனைத்து ராசிகள் (0°-360°)',
    hi: 'सभी 12 राशियाँ (0°-360°)',
    te: 'అన్ని 12 రాశులు (0°-360°)',
    kn: 'ಎಲ್ಲಾ 12 ರಾಶಿಗಳು (0°-360°)',
    ml: 'എല്ലാ 12 രാശികളും (0°-360°)'
  },
  allNakshatras: {
    en: 'All 27 Stars',
    ta: 'அனைத்து 27 நட்சத்திரங்கள்',
    hi: 'सभी 27 नक्षत्र',
    te: 'అన్ని 27 నక్షత్రాలు',
    kn: 'ಎಲ್ಲಾ 27 ನಕ್ಷತ್ರಗಳು',
    ml: 'എല്ലാ 27 നക്ഷത്രങ്ങളും'
  },
  allPadas: {
    en: 'All Padas (1-4)',
    ta: 'அனைத்து பாதங்கள் (1-4)',
    hi: 'सभी चरण (1-4)',
    te: 'అన్ని పాదాలు (1-4)',
    kn: 'ಎಲ್ಲಾ ಪಾದಗಳು (1-4)',
    ml: 'എല്ലാ പാദങ്ങളും (1-4)'
  },
  quickJump: {
    en: 'Quick Jump by Sign:',
    ta: 'விரைவு ராசி தேர்வு:',
    hi: 'राशि अनुसार त्वरित छलांग:',
    te: 'రాశి ప్రకారం త్వరిత ఎంపిక:',
    kn: 'ರಾಶಿಯ ಪ್ರಕಾರ ತ್ವರಿತ ಆಯ್ಕೆ:',
    ml: 'രാശി വഴി പെട്ടെന്ന് തിരഞ്ഞെടുക്കുക:'
  },
  prevDegree: {
    en: 'Previous Degree',
    ta: 'முந்தைய பாகை',
    hi: 'पिछली डिग्री',
    te: 'మునుపటి డిగ్రీ',
    kn: 'ಹಿಂದಿನ ಅಂಶ',
    ml: 'മുൻപത്തെ ഡിഗ്രി'
  },
  nextDegree: {
    en: 'Next Degree',
    ta: 'அடுத்த பாகை',
    hi: 'अगली डिग्री',
    te: 'తర్వాతి డిగ్రీ',
    kn: 'ಮುಂದಿನ ಅಂಶ',
    ml: 'അടുത്ത ഡിഗ്രി'
  },
  showingDegrees: {
    en: 'Showing Degrees',
    ta: 'காட்டப்படும் பாகைகள்',
    hi: 'प्रदर्शित डिग्री',
    te: 'చూపుతున్న డిగ్రీలు',
    kn: 'ತೋರಿಸುತ್ತಿರುವ ಅಂಶಗಳು',
    ml: 'കാണിക്കുന്ന ഡിഗ്രികൾ'
  },
  degreeRange: {
    en: 'Degree Range',
    ta: 'பாகை எல்லை',
    hi: 'अंश सीमा',
    te: 'డిగ్రీ పరిధి',
    kn: 'ಅಂಶ ಶ್ರೇಣಿ',
    ml: 'ഡിഗ്രി പരിധി'
  },
  viewRows: {
    en: 'Display Rows:',
    ta: 'வரிசைகள் எண்ணிக்கை:',
    hi: 'पंक्तियाँ दिखाएं:',
    te: 'వరుసలు చూపించు:',
    kn: 'ಸಾಲುಗಳನ್ನು ತೋರಿಸಿ:',
    ml: 'വരികൾ കാണിക്കുക:'
  },
  viewAll360: {
    en: 'All 360 Degrees',
    ta: 'முழு 360 பாகைகள்',
    hi: 'संपूर्ण 360 डिग्री',
    te: 'మొత్తం 360 డిగ్రీలు',
    kn: 'ಪೂರ್ಣ 360 ಅಂಶಗಳು',
    ml: 'പൂർണ്ണ 360 ഡിഗ്രികൾ'
  },
  selectedDegreeDetails: {
    en: 'Selected Degree Information',
    ta: 'தேர்ந்தெடுத்த பாகை விவரங்கள்',
    hi: 'चयनित डिग्री की जानकारी',
    te: 'ఎంచుకున్న డిగ్రీ వివరాలు',
    kn: 'ಆಯ್ಕೆಮಾಡಿದ ಅಂಶದ ವಿವರಗಳು',
    ml: 'തിരഞ്ഞെടുത്ത ഡിഗ്രി വിവരങ്ങൾ'
  },
  compact: {
    en: 'Compact',
    ta: 'சுருக்கமான',
    hi: 'कॉम्पैक्ट',
    te: 'కాంపాక్ట్',
    kn: 'ಕಾಂಪ್ಯಾಕ್ಟ್',
    ml: 'കോംപാക്റ്റ്'
  },
  detailed: {
    en: 'Detailed',
    ta: 'விரிவான',
    hi: 'विस्तृत',
    te: 'వివరమైన',
    kn: 'ವಿವರವಾದ',
    ml: 'വിശദമായ'
  },


  // KP Horary Page
  kpHoraryTitle: {
    en: 'KP Horary (1-249 Sub-Lord Table)',
    ta: 'கே.பி பிரசன்ன அட்டவணை (1-249 உப அதிபதிகள்)',
    hi: 'केपी प्रश्न कुंडली तालिका (1-249 उप स्वामी)',
    te: 'కేపీ హోరరీ పట్టిక (1-249 ఉప ప్రభువులు)',
    kn: 'ಕೆಪಿ ಹೋರರಿ ಕೋಷ್ಟಕ (1-249 ಉಪ ಅಧಿಪತಿಗಳು)',
    ml: 'കെപി ഹോററി പട്ടിക (1-249 ഉപ നാഥന്മാർ)'
  },
  kpHorarySubtitle: {
    en: 'Authoritative Krishnamurti Padhdhati 1 to 249 sub-division table for accurate Horary & Stellar astrology.',
    ta: 'கே.பி ஜோதிட முறைப்படி 1 முதல் 249 வரையிலான ராசி, நட்சத்திரம் மற்றும் உப அதிபதிகள் (Sub Lords) அட்டவணை.',
    hi: 'केपी ज्योतिष पद्धति के अनुसार 1 से 249 तक राशि, नक्षत्र और उप-स्वामियों (Sub-Lords) की प्रामाणिक तालिका।',
    te: 'కృష్ణమూర్తి పద్ధతి ప్రకారం 1 నుండి 249 వరకు రాశి, నక్షత్ర మరియు ఉప-అధిపతుల పట్టిక.',
    kn: 'ಕೃಷ್ಣಮೂರ್ತಿ ಪದ್ಧತಿಯ ಪ್ರಕಾರ 1 ರಿಂದ 249 ವರೆಗಿನ ರಾಶಿ, ನಕ್ಷತ್ರ ಮತ್ತು ಉಪ-ಅಧಿಪತಿಗಳ ಕೋಷ್ಟಕ.',
    ml: 'കൃഷ്ണമൂർത്തി പദ്ധതി പ്രകാരം 1 മുതൽ 249 വരെയുള്ള രാശി, നക്ഷത്ര, ഉപ-നാഥന്മാരുടെ (Sub Lords) പട്ടിക.'
  },

  // Attribute Labels
  rulingLord: {
    en: 'Ruling Lord',
    ta: 'அதிபதி',
    hi: 'स्वामी ग्रह',
    te: 'రాశ్యాధిపతి',
    kn: 'ಅಧಿಪತಿ',
    ml: 'അധിപൻ'
  },
  element: {
    en: 'Element',
    ta: 'பூதம்',
    hi: 'तत्व',
    te: 'తత్వం',
    kn: 'ತತ್ವ',
    ml: 'തത്വം (ഭൂതം)'
  },
  mobility: {
    en: 'Mobility',
    ta: 'குணம் (சரம்/ஸ்திரம்)',
    hi: 'स्वभाव',
    te: 'స్వభావం',
    kn: 'ಸ್ವಭಾವ',
    ml: 'സ്വഭാവം (ചരം/സ്ഥിരം)'
  },
  gender: {
    en: 'Gender',
    ta: 'பாலினம்',
    hi: 'लिंग',
    te: 'లింగం',
    kn: 'ಲಿಂಗ',
    ml: 'ലിംഗം'
  },
  direction: {
    en: 'Direction',
    ta: 'திசை',
    hi: 'दिशा',
    te: 'దిశ',
    kn: 'ದಿಕ್ಕು',
    ml: 'ദിശ'
  },
  bodyPart: {
    en: 'Body Part',
    ta: 'உடல் உறுப்பு',
    hi: 'शरीर का अंग',
    te: 'శరీర భాగం',
    kn: 'ದೇಹದ ಅಂಗ',
    ml: 'ശരീര ഭാഗം'
  },
  ownSigns: {
    en: 'Own Sign (Aatchi)',
    ta: 'ஆட்சி வீடுகள்',
    hi: 'स्वराशि (आधिपत्य)',
    te: 'స్వక్షేత్రం',
    kn: 'ಸ್ವಕ್ಷೇತ್ರ',
    ml: 'സ്വന്തം രാശി (ആക്ഷി)'
  },
  exaltation: {
    en: 'Exaltation (Ucham)',
    ta: 'உச்ச வீடு',
    hi: 'उच्च राशि',
    te: 'ఉచ్ఛ స్థానం',
    kn: 'ಉಚ್ಚ ಸ್ಥಾನ',
    ml: 'ഉച്ച രാശി (ഉച്ചം)'
  },
  debilitation: {
    en: 'Debilitation (Neecham)',
    ta: 'நீச வீடு',
    hi: 'नीच राशि',
    te: 'నీచ స్థానం',
    kn: 'ನೀಚ ಸ್ಥಾನ',
    ml: 'നീച രാശി (നീചം)'
  },
  gemstone: {
    en: 'Gemstone',
    ta: 'ரத்தினம்',
    hi: 'रत्न',
    te: 'రత్నం',
    kn: 'ರತ್ನ',
    ml: 'രത്നം'
  },
  metal: {
    en: 'Metal',
    ta: 'உலோகம்',
    hi: 'धातु',
    te: 'లోహం',
    kn: 'ಲೋಹ',
    ml: 'ലോഹം'
  },
  grain: {
    en: 'Grain',
    ta: 'தானியம்',
    hi: 'अनाज',
    te: 'ధాన్యం',
    kn: 'ಧಾನ್ಯ',
    ml: 'ധാന്യം'
  },
  dayOfWeek: {
    en: 'Day of Week',
    ta: 'கிழமை',
    hi: 'दिन / वार',
    te: 'వారం',
    kn: 'ವಾರ',
    ml: 'ദിവസം (ആഴ്ച)'
  },
  friendlyPlanets: {
    en: 'Friendly Planets',
    ta: 'நட்பு கிரகங்கள்',
    hi: 'मित्र ग्रह',
    te: 'మిత్ర గ్రహాలు',
    kn: 'ಮಿತ್ರ ಗ್ರಹಗಳು',
    ml: 'മിത്ര ഗ്രഹങ്ങൾ'
  },
  enemyPlanets: {
    en: 'Enemy Planets',
    ta: 'பகை கிரகங்கள்',
    hi: 'शत्रु ग्रह',
    te: 'శత్రు గ్రహాలు',
    kn: 'ಶತ್ರು ಗ್ರಹಗಳು',
    ml: 'ശത്രു ഗ്രഹങ്ങൾ'
  },
  deity: {
    en: 'Deity',
    ta: 'அதிதேவதை',
    hi: 'देवता',
    te: 'దేవత',
    kn: 'ದೇವತೆ',
    ml: 'ദേവത'
  },
  gana: {
    en: 'Gana',
    ta: 'கணம்',
    hi: 'गण',
    te: 'గణము',
    kn: 'ಗಣ',
    ml: 'ഗണം'
  },
  yoni: {
    en: 'Yoni',
    ta: 'யோனி',
    hi: 'योनि',
    te: 'యోని',
    kn: 'ಯೋನಿ',
    ml: 'യോനി'
  },
  animal: {
    en: 'Animal',
    ta: 'மிருகம்',
    hi: 'पशु',
    te: 'జంతువు',
    kn: 'ಪ್ರಾಣಿ',
    ml: 'മൃഗം'
  },
  bird: {
    en: 'Bird',
    ta: 'பறவை',
    hi: 'पक्षी',
    te: 'పక్షి',
    kn: 'ಪಕ್ಷಿ',
    ml: 'പക്ഷി'
  },
  tree: {
    en: 'Sacred Tree',
    ta: 'விருட்சம் (மரம்)',
    hi: 'पवित्र वृक्ष',
    te: 'వృక్షం',
    kn: 'ಪವಿತ್ರ ಮರ',
    ml: 'വൃക്ഷം'
  },
  paksha: {
    en: 'Paksha',
    ta: 'பக்ஷம்',
    hi: 'पक्ष',
    te: 'పక్షం',
    kn: 'ಪಕ್ಷ',
    ml: 'പക്ഷം'
  },
  nature: {
    en: 'Nature',
    ta: 'சுப/அசுப குணம்',
    hi: 'प्रकृति (शुभ/अशुभ)',
    te: 'శుభ/అశుభ స్వభావం',
    kn: 'ಶುಭ/ಅಶುಭ ಸ್ವಭಾವ',
    ml: 'സ്വഭാവം (ശുഭ/അശുഭ)'
  },
  type: {
    en: 'Type',
    ta: 'வகை',
    hi: 'प्रकार',
    te: 'రకం',
    kn: 'ವಿಧ',
    ml: 'തരം'
  },
  auspiciousFor: {
    en: 'Auspicious For:',
    ta: 'சுப காரியங்கள்:',
    hi: 'शुभ कार्य:',
    te: 'శుభ కార్యాలకు:',
    kn: 'ಶುಭ ಕಾರ್ಯಗಳಿಗೆ:',
    ml: 'ശുഭ കാര്യങ്ങൾക്ക്:'
  },
  sunSign: {
    en: 'Sun Sign',
    ta: 'சூரிய ராசி',
    hi: 'सूर्य राशि',
    te: 'సూర్య రాశి',
    kn: 'ಸೂರ್ಯ ರಾಶಿ',
    ml: 'സൂര്യ രാശി'
  },
  season: {
    en: 'Vedic Season',
    ta: 'பருவ காலம் (ருது)',
    hi: 'ऋतु',
    te: 'ఋతువు',
    kn: 'ಋತು',
    ml: 'ഋതു (കാലം)'
  },
  padasAndRasis: {
    en: 'Padas & Zodiac Signs',
    ta: 'பாதங்கள் மற்றும் ராசிகள்',
    hi: 'चरण और राशियाँ',
    te: 'పాదాలు మరియు రాశులు',
    kn: 'ಪಾದಗಳು ಮತ್ತು ರಾಶಿಗಳು',
    ml: 'പാദങ്ങളും രാശികളും'
  },

  // Right Sidebar Horoscope Form
  sidebarFormTitle: {
    en: 'Make your FREE HOROSCOPE in seconds',
    ta: 'உடனடி இலவச ஜாதகம் கணிக்கவும்',
    hi: 'सेकंडों में मुफ्त जन्म कुंडली बनाएं',
    te: 'క్షణాల్లో మీ ఉచిత జాతకం పొందండి',
    kn: 'ಕೆಲವೇ ಸೆಕೆಂಡುಗಳಲ್ಲಿ ಉಚಿತ ಜಾತಕ ಪಡೆಯಿರಿ',
    ml: 'നിമിഷങ്ങൾക്കകം സൗജന്യ ജാതകം ഗണിക്കുക'
  },
  namePlaceholder: {
    en: 'Your Name',
    ta: 'உங்கள் பெயர்',
    hi: 'आपका नाम',
    te: 'మీ పేరు',
    kn: 'ನಿಮ್ಮ ಹೆಸರು',
    ml: 'നിങ്ങളുടെ പേര്'
  },
  placePlaceholder: {
    en: 'Search city, district or town in English (e.g. Chennai, Madurai, Mumbai)',
    ta: 'நகரம் / மாவட்டத்தை ஆங்கிலத்தில் தேடுக (எ.கா. Chennai, Madurai)',
    hi: 'शहर या जिला अंग्रेजी में खोजें (उदा. Chennai, Madurai, Mumbai)',
    te: 'నగరం లేదా జిల్లాను ఇంగ్లీషులో వెతకండి (ఉదా: Chennai, Madurai)',
    kn: 'ನಗರ ಅಥವಾ ಜಿಲ್ಲೆಯನ್ನು ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ ಹುಡುಕಿ (ಉದಾ: Chennai, Bengaluru)',
    ml: 'നഗരമോ ജില്ലയോ ഇംഗ്ലീഷിൽ തിരയുക (ഉദാ: Chennai, Kochi)'
  },
  dobLabel: {
    en: 'DOB',
    ta: 'தேதி',
    hi: 'जन्म तिथि',
    te: 'తేదీ',
    kn: 'ದಿನಾಂಕ',
    ml: 'തീയതി'
  },
  tobLabel: {
    en: 'TOB',
    ta: 'நேரம்',
    hi: 'समय',
    te: 'సమయం',
    kn: 'ಸಮಯ',
    ml: 'സമയം'
  },
  continueBtn: {
    en: 'Continue →',
    ta: 'தொடர்க →',
    hi: 'आगे बढ़ें →',
    te: 'కొనసాగించండి →',
    kn: 'ಮುಂದುವರಿಯಿರಿ →',
    ml: 'തുടരുക →'
  },

  // Elements for Filter Pills
  elements: {
    all: { en: 'All', ta: 'அனைத்தும்', hi: 'सभी', te: 'అన్నీ', kn: 'ಎಲ್ಲವೂ', ml: 'എല്ലാം' },
    Fire: { en: 'Fire', ta: 'நெருப்பு', hi: 'अग्नि', te: 'అగ్ని', kn: 'ಅಗ್ನಿ', ml: 'തീ' },
    Earth: { en: 'Earth', ta: 'நிலம்', hi: 'पृथ्वी', te: 'భూమి', kn: 'ಭೂಮಿ', ml: 'ഭൂമി' },
    Air: { en: 'Air', ta: 'காற்று', hi: 'वायु', te: 'వాయువు', kn: 'ವಾಯು', ml: 'വായു' },
    Water: { en: 'Water', ta: 'நீர்', hi: 'जल', te: 'జలం', kn: 'ಜಲ', ml: 'ജലം' }
  },

  // Pakshas for Filter Pills
  pakshas: {
    all: { en: 'All Pakshas', ta: 'அனைத்து பக்ஷங்கள்', hi: 'सभी पक्ष', te: 'అన్ని పక్షాలు', kn: 'ಎಲ್ಲಾ ಪಕ್ಷಗಳು', ml: 'എല്ലാ പക്ഷങ്ങളും' },
    Shukla: { en: 'Shukla Paksha (Waxing)', ta: 'சுக்ல பக்ஷம் (வளர்பிறை)', hi: 'शुक्ल पक्ष (पूर्णिमा की ओर)', te: 'శుక్ల పక్షం (శుద్ధ)', kn: 'ಶುಕ್ಲ ಪಕ್ಷ (ಬೆಳದಿಂಗಳ)', ml: 'ശുക്ല പക്ഷം (വെളുത്തവാവ്)' },
    Krishna: { en: 'Krishna Paksha (Waning)', ta: 'கிருஷ்ண பக்ஷம் (தேய்பிறை)', hi: 'कृष्ण पक्ष (अमावस्या की ओर)', te: 'కృష్ణ పక్షం (బహుళ)', kn: 'ಕೃಷ್ಣ ಪಕ್ಷ (ಕತ್ತಲು)', ml: 'കൃഷ്ണ പക്ഷം (കറുത്തവാവ്)' }
  }
};

/**
 * Gets a localized UI string by key with language fallback
 */
export function getUIString(key, lang = 'en', defaultFallback = '') {
  const l = (lang || 'en').toLowerCase();
  const entry = UI_STRINGS[key];
  if (!entry) return defaultFallback || key;
  return entry[l] || entry.en || entry.ta || defaultFallback || key;
}

/**
 * Returns localized Rasi name for Kalachakram degree item
 */
export function getLocalizedKalachakramRasi(item, lang = 'en') {
  if (!item) return '-';
  const l = (lang || 'en').toLowerCase();
  const keyMap = {
    ta: item.rasiNameTa,
    hi: item.rasiNameHi,
    te: item.rasiNameTe,
    kn: item.rasiNameKn,
    ml: item.rasiNameMl,
    en: item.rasiName
  };
  return keyMap[l] || item.rasiName || item.rasiNameTa || '-';
}

/**
 * Returns localized Nakshatra name for Kalachakram degree item
 */
export function getLocalizedKalachakramNakshatra(item, lang = 'en') {
  if (!item) return '-';
  const l = (lang || 'en').toLowerCase();
  const keyMap = {
    ta: item.nakshatraNameTa,
    hi: item.nakshatraNameHi,
    te: item.nakshatraNameTe,
    kn: item.nakshatraNameKn,
    ml: item.nakshatraNameMl,
    en: item.nakshatraName
  };
  return keyMap[l] || item.nakshatraName || item.nakshatraNameTa || '-';
}

/**
 * Returns localized Navamsa Rasi name for Kalachakram degree item
 */
export function getLocalizedKalachakramNavamsa(item, lang = 'en') {
  if (!item) return '-';
  const l = (lang || 'en').toLowerCase();
  const keyMap = {
    ta: item.navamsaRasiNameTa,
    hi: item.navamsaRasiNameHi,
    te: item.navamsaRasiNameTe,
    kn: item.navamsaRasiNameKn,
    ml: item.navamsaRasiNameMl,
    en: item.navamsaRasiName
  };
  return keyMap[l] || item.navamsaRasiName || item.navamsaRasiNameTa || '-';
}

/**
 * Returns localized Ruling Lord / Athipathi name
 */
export function getLocalizedKalachakramLord(lordObj, lang = 'en') {
  if (!lordObj) return '-';
  if (typeof lordObj === 'string') return lordObj;
  const l = (lang || 'en').toLowerCase();
  const keyMap = {
    ta: lordObj.nameTa,
    hi: lordObj.nameHi,
    te: lordObj.nameTe,
    kn: lordObj.nameKn,
    ml: lordObj.nameMl,
    en: lordObj.name
  };
  return keyMap[l] || lordObj.name || lordObj.nameTa || '-';
}

/**
 * Returns localized Pada string (e.g., Pada 1 / பாதம் 1 / चरण 1)
 */
export function getLocalizedKalachakramPada(padaNumber, lang = 'en') {
  const padaLabel = getUIString('padaLabel', lang, 'Pada');
  return `${padaLabel} ${padaNumber}`;
}

export default {
  getLocalizedValue,
  getLocalizedCardTitles,
  getUIString,
  getLocalizedKalachakramRasi,
  getLocalizedKalachakramNakshatra,
  getLocalizedKalachakramNavamsa,
  getLocalizedKalachakramLord,
  getLocalizedKalachakramPada,
  UI_STRINGS,
  LANG_CODES
};

