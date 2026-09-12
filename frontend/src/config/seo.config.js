/**
 * Enterprise SEO Configuration & Multilingual Metadata Registry
 * Provides CTR-optimized titles, descriptions, keywords, and Schema.org metadata
 * Supporting 6 Languages: Tamil (ta), English (en), Hindi (hi), Telugu (te), Kannada (kn), Malayalam (ml)
 */

export const SITE_METADATA = {
  siteName: 'Jothidam Portal',
  siteUrl: 'https://jothidam.portal',
  defaultLocale: 'ta',
  locales: ['ta', 'en', 'hi', 'te', 'kn', 'ml'],
  twitterHandle: '@JothidamPortal',
  defaultImage: 'https://jothidam.portal/assets/images/og-jothidam-portal.png',
  organization: {
    name: 'Jothidam Astrology Services & Ephemeris Engine',
    logo: 'https://jothidam.portal/assets/images/logo-badge.png',
    url: 'https://jothidam.portal',
    sameAs: [
      'https://facebook.com/jothidamportal',
      'https://twitter.com/jothidamportal',
      'https://instagram.com/jothidamportal'
    ]
  }
};

export const PAGE_SEO_REGISTRY = {
  // 1. Homepage / Kundli Calculator
  home: {
    title: {
      ta: 'இலவச ஜாதகம் கணிப்பு, ராசி சக்கரம் & நவாம்சம் | Jothidam Portal',
      en: 'Free Kundli & Vedic Horoscope Calculator D1 D9 | Jothidam Portal',
      hi: 'मुफ्त जन्म कुंडली और वैदिक राशिफल गणना | Jothidam Portal',
      te: 'ఉచిత జాతక చక్రం మరియు నవాంశ గణన | Jothidam Portal',
      kn: 'ಉಚಿತ ಜಾತಕ ಮತ್ತು ನವಾಂಶ ಚಾರ್ಟ್ ಕ್ಯಾಲ್ಕುಲೇಟರ್ | Jothidam Portal',
      ml: 'സൗജന്യ ജാതകം, രാശി ചക്രം & നവാംശം | Jothidam Portal'
    },
    description: {
      ta: 'துல்லியமான சுவிஸ் எபிமெரிஸ் முறைப்படி உங்கள் பிறந்த தேதி, நேரம், இடம் கொண்டு இலவச தமிழ் ஜாதகம், ராசி, நவாம்ச சக்கரம் மற்றும் நவகிரக நிலைகளை கணிக்கவும்.',
      en: 'Generate free Vedic Horoscope & Kundli with accurate Swiss Ephemeris. Instant D1 Rasi & D9 Navamsa birth charts, planetary positions, and Panchangam.',
      hi: 'सटीक स्विस एफिमेरिस के साथ मुफ्त वैदिक जन्म कुंडली, राशि और नवांश चक्र बनाएं। ग्रहों की स्थिति और पंचांग तुरंत देखें।',
      te: 'ఖచ్చితమైన స్విస్ ఎఫిమెరిస్ ద్వారా ఉచిత వేద జాతకం, రాశి మరియు నవాంశ చక్రాన్ని లెక్కించండి.',
      kn: 'ನಿಖರವಾದ ಸ್ವಿಿಸ್ ಎಫಿಮೆರಿಸ್ ಮೂಲಕ ಉಚಿತ ಜನ್ಮ ಕುಂಡಲಿ, ರಾಶಿ ಮತ್ತು ನವಾಂಶ ಚಾರ್ಟ್ ಪಡೆಯಿರಿ.',
      ml: 'കൃത്യമായ സ്വിസ്സ് എഫിമെരിസ് രീതിയിൽ സൗജന്യ ജാതകവും രാശി നവാംശ ചക്രങ്ങളും കണക്കാക്കൂ.'
    },
    keywords: [
      'tamil jothidam', 'free kundli', 'vedic horoscope', 'rasi chart D1', 'navamsa chart D9',
      'ephemeris calculator', 'tamil astrology online', 'tamil panchangam', 'graha nilaimai'
    ],
    schemaType: 'WebApplication'
  },

  // 2. KP Horary 1-249 Numbers Table
  kpHorary: {
    title: {
      ta: 'KP பிரசன்ன எண் அட்டவணை 1 முதல் 249 வரை | Jothidam Portal',
      en: 'KP Horary Numbers 1 to 249 Table with Sub Lords | Jothidam Portal',
      hi: 'केपी प्रश्न कुंडली 1-249 संख्या तालिका | Jothidam Portal',
      te: 'KP హోరరీ సంఖ్యలు 1 నుండి 249 పట్టిక | Jothidam Portal',
      kn: 'ಕೆಪಿ ಪ್ರಶೋತ್ತರ ಸಂಖ್ಯೆಗಳು 1-249 ಪಟ್ಟಿ | Jothidam Portal',
      ml: 'കെപി പ്രശസ്ത ഹോററി നമ്പറുകൾ 1-249 ടേബിൾ | Jothidam Portal'
    },
    description: {
      ta: 'கே.பி ஜோதிட முறைப்படி 1 முதல் 249 பிரசன்ன எண்களுக்கான ராசி அதிபதி, நட்சத்திர அதிபதி மற்றும் உப அதிபதி (Sub Lord) பாகை விவர அட்டவணை.',
      en: 'Complete KP Horary 1 to 249 reference table with exact DMS spans, Sign Lords, Star Lords, and Sub Lords for high-precision Prashna astrology.',
      hi: 'केपी ज्योतिष 1 से 249 प्रश्न कुंडली तालिका, राशि स्वामी, नक्षत्र स्वामी और उप स्वामी (Sub Lord) की विस्तृत डिग्री सूची।',
      te: 'ఖచ్చితమైన డిగ్రీలు, రాశి, నక్షత్ర మరియు ఉప ప్రభువులతో KP హోరరీ 1-249 పూర్తి సూచన పట్టిక.',
      kn: 'ಕೆಪಿ ಜ್ಯೋತಿಷ್ಯದ 1 ರಿಂದ 249 ಪ್ರಶೋತ್ತರ ಸಂಖ್ಯೆಗಳ ಸಂಪೂರ್ಣ ಕೋಷ್ಟಕ ಮತ್ತು ಉಪ ಪ್ರಭು ವಿವರ.',
      ml: 'കൃത്യമായ ഡിഎംഎസ് സ്പാനുകൾ അടങ്ങിയ സമ്പൂർണ്ണ കെപി ഹോററി 1-249 റഫറൻസ് ടേബിൾ.'
    },
    keywords: [
      'kp horary table', 'kp astrology 249 numbers', 'kp sub lord table', 'prashna astrology',
      'krishnamurti paddhati', 'sub lord dms table', 'kp horary calculator'
    ],
    schemaType: 'Dataset'
  },

  // 3. 12 Zodiac Signs / Rasis
  rasis: {
    title: {
      ta: '12 ராசிகள் விவர அட்டவணை (மேஷம் முதல் மீனம் வரை) | Jothidam Portal',
      en: '12 Vedic Zodiac Signs (Rasis) Guide & Ruling Planets | Jothidam Portal',
      hi: '12 वैदिक राशियां और उनके स्वामी ग्रह | Jothidam Portal',
      te: '12 రాశులు మరియు వాటి అధిపతులు | Jothidam Portal',
      kn: '12 ರಾಶಿಗಳು ಮತ್ತು ಅವುಗಳ ಅಧಿಪತಿ ಗ್ರಹಗಳು | Jothidam Portal',
      ml: '12 രാശികളും അവയുടെ അധിപന്മാരും | Jothidam Portal'
    },
    description: {
      ta: 'மேஷம், ரிஷபம், மிதுனம், கடகம், சிம்மம், கன்னி, துலாம், விருச்சிகம், தனுசு, மகரம், கும்பம், மீனம் ஆகிய 12 ராசிகளின் குணங்கள், அதிபதி மற்றும் தத்துவங்கள்.',
      en: 'Comprehensive guide to the 12 Vedic Rasis (Aries to Pisces), ruling elements, planetary lords, body parts, and astrological nature.',
      hi: 'मेष से मीन तक 12 राशियों के स्वामी ग्रह, तत्व, गुण और ज्योतिषीय विशेषताओं की संपूर्ण जानकारी।',
      te: 'మేషం నుండి మీనం వరకు 12 రాశుల లక్షణాలు, అధిపతి గ్రహాలు మరియు వివరాలు.',
      kn: 'ಮೇಷದಿಂದ ಮೀನದವರೆಗೆ 12 ರಾಶಿಗಳ ಗುಣಗಳು ಮತ್ತು ಅಧಿಪತಿಗಳ ಸಮಗ್ರ ಮಾಹಿತಿ.',
      ml: 'മേടം മുതൽ മീനം വരെയുള്ള 12 രാശികളുടെ ഗുണങ്ങളും ഗ്രഹാധിപന്മാരും.'
    },
    keywords: ['12 rasis', 'zodiac signs vedic', 'mesham to meenam', 'rasi lords', 'astrology elements'],
    schemaType: 'CollectionPage'
  },

  // 4. 27 Nakshatras & Padas
  nakshatras: {
    title: {
      ta: '27 நட்சத்திரங்கள், பாதங்கள் மற்றும் அதிபதிகள் அட்டவணை | Jothidam Portal',
      en: '27 Vedic Nakshatras, 108 Padas & Deities Table | Jothidam Portal',
      hi: '27 वैदिक नक्षत्र, 108 चरण और उनके देवता | Jothidam Portal',
      te: '27 నక్షత్రాలు, 108 పాదాలు మరియు అధిపతులు | Jothidam Portal',
      kn: '27 ನಕ್ಷತ್ರಗಳು, 108 ಪಾದಗಳು ಮತ್ತು ದೇವತೆಗಳು | Jothidam Portal',
      ml: '27 നക്ഷത്രങ്ങളും 108 പാദങ്ങളും | Jothidam Portal'
    },
    description: {
      ta: 'அசுவினி முதல் ரேவதி வரையிலான 27 நட்சத்திரங்களின் 108 பாதங்கள், அதிபதி கிரகங்கள், தேவதைகள், கணங்கள் மற்றும் பரிகார விவரங்கள்.',
      en: 'Explore the 27 Vedic Nakshatras (Ashwini to Revati) with 108 padas, presiding deities, ganas, ruling planets, and degrees.',
      hi: 'अश्विनी से रेवती तक 27 नक्षत्रों के 108 चरण, स्वामी ग्रह, देवता, गण और योनि का संपूर्ण विवरण।',
      te: 'అశ్విని నుండి రేవతి వరకు 27 నక్షత్రాల పూర్తి వివరాలు మరియు అధిపతులు.',
      kn: 'ಅಶ್ವಿನಿಯಿಂದ ರೇವತಿಯವರೆಗೆ 27 ನಕ್ಷತ್ರಗಳ ಸಮಗ್ರ ಕೋಷ್ಟಕ.',
      ml: 'അശ്വതി മുതൽ രേവതി വരെയുള്ള 27 നക്ഷത്രങ്ങളുടെ വിശദാംശങ്ങൾ.'
    },
    keywords: ['27 nakshatras', '108 padas', 'ashwini to revati', 'nakshatra lord', 'vedic lunar mansions'],
    schemaType: 'CollectionPage'
  },

  // 5. 9 Navagrahas & Lords
  planets: {
    title: {
      ta: 'நவக்கிரகங்கள் விவர அட்டவணை (சூரியன் முதல் கேது வரை) | Jothidam Portal',
      en: '9 Navagrahas in Vedic Astrology: Exaltation, Debilitation & Gems | Jothidam Portal',
      hi: 'नवग्रहों का संपूर्ण विवरण: उच्च, नीच, रत्न और प्रकृति | Jothidam Portal',
      te: 'నవగ్రహాల సమగ్ర సమాచారం మరియు రత్నాలు | Jothidam Portal',
      kn: 'ನವಗ್ರಹಗಳ ಸಮಗ್ರ ಮಾಹಿತಿ ಮತ್ತು ರತ್ನಗಳು | Jothidam Portal',
      ml: 'നവഗ്രഹങ്ങളുടെ സമഗ്ര വിവരണം | Jothidam Portal'
    },
    description: {
      ta: 'சூரியன், சந்திரன், செவ்வாய், புதன், குரு, சுக்கிரன், சனி, ராகு, கேது ஆகிய 9 நவக்கிரகங்களின் உச்சம், நீசம், ஆட்சி ராசி, ரத்தினம், தானியம் மற்றும் உலோக விவரங்கள்.',
      en: 'Detailed guide to the 9 Navagrahas (Sun to Ketu), exaltation & debilitation signs, own signs, gemstones, friendship tables, and metals.',
      hi: 'सूर्य से केतु तक नवग्रहों के उच्च, नीच, स्वराशि, रत्न, धातु और वैदिक ज्योतिषीय प्रभावों का विश्लेषण।',
      te: 'సూర్యుని నుండి కేతువు వరకు నవగ్రహాల ఉచ్చ, నీచ స్థానాలు మరియు రత్నాలు.',
      kn: 'ಸೂರ್ಯನಿಂದ ಕೇತುವಿನವರೆಗೆ ನವಗ್ರಹಗಳ ಉಚ್ಚ, ನೀಚ ಮತ್ತು ರತ್ನ ವಿವರಗಳು.',
      ml: 'സൂര്യൻ മുതൽ കേതു വരെയുള്ള നവഗ്രഹങ്ങളുടെ ഗുണവിശേഷങ്ങൾ.'
    },
    keywords: ['9 navagrahas', 'planets in astrology', 'exaltation debilitation', 'navagraha gemstones', 'graha lords'],
    schemaType: 'CollectionPage'
  },

  // 6. 360° Kalachakram Wheel
  kalachakram: {
    title: {
      ta: '360° காலச்சக்கரம் & பாகை விவர அட்டவணை | Jothidam Portal',
      en: '360° Kalachakram Wheel & Degree-by-Degree Zodiac Wheel | Jothidam Portal',
      hi: '360° कालचक्र और डिग्री अनुसार राशि चक्र | Jothidam Portal',
      te: '360° కాలచక్రం మరియు డిగ్రీ పట్టిక | Jothidam Portal',
      kn: '360° ಕಾಲಚಕ್ರ ಮತ್ತು ರಾಶಿ ಚಕ್ರ ಕೋಷ್ಟಕ | Jothidam Portal',
      ml: '360° കാലചക്രവും ഡിഗ്രി ചക്രവും | Jothidam Portal'
    },
    description: {
      ta: '360 பாகை காலச்சக்கரத்தின் ஒவ்வொரு பாகைக்கான ராசி, நட்சத்திரம், பாதம் மற்றும் கிரக அதிபதி விவரங்கள் அடங்கிய விரிவான சக்கர வழிகாட்டி.',
      en: 'Interactive 360-degree Kalachakram wheel. Lookup degree-by-degree zodiac mappings, nakshatra padas, and planetary rulers across the 12 signs.',
      hi: '360 डिग्री कालचक्र का इंटरैक्टिव गाइड। डिग्री अनुसार राशि, नक्षत्र और उप-स्वामियों का सटीक विश्लेषण।',
      te: '360 డిగ్రీల కాలచక్రంలో ప్రతి డిగ్రీకి రాశి, నక్షత్ర వివరాలు.',
      kn: '360 ಡಿಗ್ರಿಯ ಕಾಲಚಕ್ರದ ಸಂಪೂರ್ಣ ಮಾಹಿತಿ.',
      ml: '360 ഡിഗ്രി കാലചക്രത്തിന്റെ സമഗ്ര വിവരണം.'
    },
    keywords: ['kalachakram 360', 'degree by degree zodiac', '360 astrology wheel', 'nakshatra pada degree'],
    schemaType: 'ItemPage'
  },

  // 7. 30 Lunar Tithis
  tithis: {
    title: {
      ta: '30 திதிகள் அட்டவணை (சுக்ல & கிருஷ்ண பக்ஷம்) | Jothidam Portal',
      en: '30 Lunar Tithis Guide: Shukla & Krishna Paksha | Jothidam Portal',
      hi: '30 तिथियां: शुक्ल पक्ष और कृष्ण पक्ष पंचांग | Jothidam Portal',
      te: '30 తిథులు: శుక్ల మరియు కృష్ణ పక్షం | Jothidam Portal',
      kn: '30 ತಿಥಿಗಳು: ಶುಕ್ಲ ಮತ್ತು ಕೃಷ್ಣ ಪಕ್ಷ | Jothidam Portal',
      ml: '30 തിഥികൾ: ശുക്ല കൃഷ്ണ പക്ഷങ്ങൾ | Jothidam Portal'
    },
    description: {
      ta: 'பிரதமை முதல் பௌர்ணமி மற்றும் அமாவாசை வரையிலான 30 சந்திர திதிகளின் அதிபதிகள், சுப காரிய பலன்கள் மற்றும் முக்கியத்துவங்கள்.',
      en: 'Complete guide to the 30 Vedic Tithis across Shukla & Krishna Paksha, ruling deities, auspicious activities, and lunar calendar significance.',
      hi: 'प्रतिपदा से पूर्णिमा और अमावस्या तक 30 तिथियों के स्वामी, शुभ मुहूर्त और पंचांग महत्व।',
      te: 'పాడ్యమి నుండి పూర్ణిమ, అమావాస్య వరకు 30 తిథుల విశేషాలు.',
      kn: 'ಪಾಡ್ಯಮಿಯಿಂದ ಅಮಾವಾಸ್ಯೆ, ಹುಣ್ಣಿಮೆಯವರೆಗಿನ 30 ತಿಥಿಗಳ ವಿವರಣೆ.',
      ml: 'പ്രഥമ മുതൽ പൗർണ്ണമി, അമാവാസി വരെയുള്ള 30 തിഥികളുടെ ഫലങ്ങൾ.'
    },
    keywords: ['30 tithis', 'shukla paksha', 'krishna paksha', 'lunar calendar panchangam', 'tithi lords'],
    schemaType: 'CollectionPage'
  },

  // 8. 27 Nithya Yogas
  yogas: {
    title: {
      ta: '27 நித்ய யோகங்கள் அட்டவணை & பலன்கள் | Jothidam Portal',
      en: '27 Nithya Yogas in Panchangam & Results | Jothidam Portal',
      hi: '27 नित्य योग और उनके ज्योतिषीय फल | Jothidam Portal',
      te: '27 నిత్య యోగాలు మరియు ఫలితాలు | Jothidam Portal',
      kn: '27 ನಿತ್ಯ ಯೋಗಗಳು ಮತ್ತು ಫಲಗಳು | Jothidam Portal',
      ml: '27 നിത്യ യോഗങ്ങൾ | Jothidam Portal'
    },
    description: {
      ta: 'விஷ்கம்பம் முதல் வைதிருதி வரையிலான 27 நித்ய யோகங்களின் குணங்கள், சுப/அசுப தன்மைகள் மற்றும் பிறந்த பலன்கள்.',
      en: 'Explore the 27 Nithya Yogas in Vedic Panchangam (Vishkambha to Vaidhriti), auspicious vs inauspicious natures, and birth attributes.',
      hi: 'विष्कुम्भ से वैधृति तक 27 नित्य योगों के शुभ-अशुभ प्रभाव और जन्मकालीन फल।',
      te: 'విష్కంభం నుండి వైధృతి వరకు 27 నిత్య యోగాల ఫలితాలు.',
      kn: 'ವಿಷ್ಕಂಭದಿಂದ ವೈಧೃತಿಯವರೆಗಿನ 27 ನಿತ್ಯ ಯೋಗಗಳು.',
      ml: 'വിഷ്കംഭം മുതൽ വൈധൃതി വരെയുള്ള 27 നിത്യ യോഗങ്ങളുടെ ഫലങ്ങൾ.'
    },
    keywords: ['27 nithya yogas', 'panchangam yogas', 'vishkambha to vaidhriti', 'auspicious yoga'],
    schemaType: 'CollectionPage'
  },

  // 9. 11 Vedic Karanas
  karanas: {
    title: {
      ta: '11 கரணங்கள் விவர அட்டவணை (சரம் & ஸ்திரம்) | Jothidam Portal',
      en: '11 Vedic Karanas in Panchangam: Movable & Fixed | Jothidam Portal',
      hi: '11 करण: चर और स्थिर करणों का पंचांग महत्व | Jothidam Portal',
      te: '11 కరణాలు: చర మరియు స్థిర కరణాలు | Jothidam Portal',
      kn: '11 ಕರಣಗಳು: ಚರ ಮತ್ತು ಸ್ಥಿರ ಕರಣಗಳು | Jothidam Portal',
      ml: '11 കരണങ്ങൾ | Jothidam Portal'
    },
    description: {
      ta: 'பவம், பாலவம், கௌலவம், தைதுலை, கரசை, வணிசை, பத்திரை, சகுனி, சதுஷ்பாதம், நாகவம், கிம்துக்கினம் ஆகிய 11 கரணங்களின் பலன்கள்.',
      en: 'Guide to the 11 Vedic Karanas (7 movable, 4 fixed), ruling animals, deities, and half-tithi calculations in Hindu Panchangam.',
      hi: 'बव से किंस्तुघ्न तक 11 करणों के स्वामी, प्रतीक और कार्यसिद्धि के नियम।',
      te: 'బవ నుండి కింస్తుఘ్నం వరకు 11 కరణాల విశేషాలు.',
      kn: 'ಬವದಿಂದ ಕಿಂಸ್ತುಘ್ನದವರೆಗಿನ 11 ಕರಣಗಳ ವಿವರಣೆ.',
      ml: 'ബവം മുതൽ കിംസ്തുഘ്നം വരെയുള്ള 11 കരണങ്ങളുടെ പ്രാധാന്യം.'
    },
    keywords: ['11 karanas', 'movable fixed karanas', 'panchangam karana', 'bava to kimstughna'],
    schemaType: 'CollectionPage'
  },

  // 10. Tamil Calendar 60 Years & Months
  tamilCalendar: {
    title: {
      ta: 'தமிழ் வருடங்கள் 60 & 12 மாதங்கள் அட்டவணை | Jothidam Portal',
      en: 'Tamil Calendar 60 Years Cycle & 12 Solar Months | Jothidam Portal',
      hi: 'तमिल कैलेंडर 60 संवत्सर और 12 सौर मास | Jothidam Portal',
      te: 'తమిళ క్యాలెండర్ 60 సంవత్సరాలు & 12 నెలలు | Jothidam Portal',
      kn: 'ತಮಿಳು ಕ್ಯಾಲೆಂಡರ್ 60 ಸಂವತ್ಸರಗಳು & 12 ತಿಂಗಳುಗಳು | Jothidam Portal',
      ml: 'തമിഴ് കലണ്ടർ 60 വർഷങ്ങൾ & 12 മാസങ്ങൾ | Jothidam Portal'
    },
    description: {
      ta: 'பிரபவ முதல் அட்சய வரையிலான 60 தமிழ் வருடங்கள், சித்திரை முதல் பங்குனி வரையிலான 12 தமிழ் மாதங்கள் மற்றும் அவற்றின் ராசி தொடர்புகள்.',
      en: 'Comprehensive directory of the 60-year Tamil calendar cycle (Prabhava to Akshaya) and 12 solar months with associated zodiac signs.',
      hi: 'प्रभव से अक्षय तक 60 संवत्सरों और 12 तमिल सौर मासों का विस्तृत ज्योतिषीय चक्र।',
      te: 'ప్రభవ నుండి అక్షయ వరకు 60 సంవత్సరాల చక్రం మరియు 12 సౌర నెలల వివరాలు.',
      kn: 'ಪ್ರಭವದಿಂದ ಅಕ್ಷಯದವರೆಗೆ 60 ಸಂವತ್ಸರಗಳ ಸಂಪೂರ್ಣ ಕೋಷ್ಟಕ.',
      ml: 'പ്രഭവ മുതൽ അക്ഷയ വരെയുള്ള 60 തമിഴ് വർഷങ്ങളുടെ പട്ടിക.'
    },
    keywords: ['60 tamil years', 'prabhava to akshaya', '12 tamil months', 'chithirai to panguni', 'tamil solar calendar'],
    schemaType: 'CollectionPage'
  },

  // 11. Saved Profiles
  saved: {
    title: {
      ta: 'சேமிக்கப்பட்ட ஜாதக விவரங்கள் | Jothidam Portal',
      en: 'Saved Horoscope Profiles & Client Kundlis | Jothidam Portal',
      hi: 'सहेजी गई कुंडलियां और प्रोफाइल | Jothidam Portal',
      te: 'భద్రపరచబడిన జాతక ప్రొఫైల్స్ | Jothidam Portal',
      kn: 'ಉಳಿಸಲಾದ ಜಾತಕ ಪ್ರೊಫೈಲ್‌ಗಳು | Jothidam Portal',
      ml: 'സൂക്ഷിച്ച ജാതക പ്രൊഫൈലുകൾ | Jothidam Portal'
    },
    description: {
      ta: 'உங்கள் வாடிக்கையாளர்கள் மற்றும் குடும்பத்தினருக்கான சேமிக்கப்பட்ட ஜாதகங்கள் மற்றும் பிறந்த விவரங்கள் மேலாண்மை.',
      en: 'Manage your saved Vedic horoscope profiles, birth charts, and client Kundli calculations safely in one place.',
      hi: 'अपने सहेजे गए जन्म कुंडली प्रोफाइल और ग्राहक विवरणों का प्रबंधन करें।',
      te: 'భద్రపరచబడిన జాతక వివరాలు మరియు క్లయింట్ ప్రొఫైల్స్ నిర్వహణ.',
      kn: 'ಉಳಿಸಲಾದ ಜನ್ಮ ಕುಂಡಲಿ ಪ್ರೊಫೈಲ್‌ಗಳ ನಿರ್ವಹಣೆ.',
      ml: 'സൂക്ഷിച്ച ജാതക വിവരങ്ങൾ എളുപ്പത്തിൽ കൈകാര്യം ചെയ്യുക.'
    },
    keywords: ['saved horoscopes', 'client profiles', 'horoscope management', 'vedic astrology database'],
    schemaType: 'WebApplication'
  },

  // 12. Kadikara Prasannam (Clock Horary)
  kadikaraPrasannam: {
    title: {
      ta: 'கடிகார பிரசன்னம் கால்குலேட்டர்: நினைத்த காரியம் நிறைவேறுமா? | Jothidam Portal',
      en: 'Kadikara Prasannam Calculator: Clock Horary Astrology | Jothidam Portal',
      hi: 'घड़ी प्रश्न कुंडली कैलकुलेटर: कार्य सिद्धि फल | Jothidam Portal',
      te: 'గడియార ప్రశ్న కాలిక్యులేటర్ | Jothidam Portal',
      kn: 'ಗಡಿಯಾರ ಪ್ರಶ್ನ ಕ್ಯಾಲ್ಕುಲೇಟರ್ | Jothidam Portal',
      ml: 'ഘടികാര പ്രശ്നം കാൽക്കുലേറ്റർ | Jothidam Portal'
    },
    description: {
      ta: 'கடிகார நேரத்தை (மணி, நிமிடம்) கொண்டு நினைத்த காரியத்தின் வெற்றியைத் தென்னிந்திய ராசி சக்கரத்துடன் துல்லியமாகக் கணிக்கும் உடனடி கடிகார பிரசன்னம்.',
      en: 'Instant Clock Horary Astrology (Kadikara Prasannam) with authentic South Indian Rasi Chart. Determine endeavor success using clock hours and minutes.',
      hi: 'घड़ी के समय (घंटा, मिनट) के आधार पर दक्षिण भारतीय चक्र के साथ त्वरित प्रश्न फल एवं 12 भावों का सटीक विश्लेषण।',
      te: 'గడియార సమయం ఆధారంగా కార్యం సఫలతను తెలిపే వేద ప్రశ్న శాస్త్రం.',
      kn: 'ಗಡಿಯಾರದ ಸಮಯದಿಂದ ತಕ್ಷಣದ ಕಾರ್ಯ ಸಿದ್ಧಿ ಪ್ರಶ್ನ ಫಲಿತಾಂಶ.',
      ml: 'ഘടികാര സമയം ഉപയോഗിച്ച് കാര്യസിദ്ധി അറിയാനുള്ള കൃത്യമായ പ്രശ്ന ജ്യോതിഷം.'
    },
    keywords: ['kadigara prasannam calculator', 'clock prasannam', 'tamil horary astrology', 'south indian rasi chart clock', 'udhayam aarudam calculator'],
    schemaType: 'WebApplication'
  }
};
