/**
 * Enterprise Configuration for AstrologyRightSidebar
 * Multilingual strings, featured articles, quick links, and auspicious timing configurations.
 */

export const SIDEBAR_I18N = {
  quickHoroscopeTitle: {
    en: 'Make your FREE HOROSCOPE in seconds',
    ta: 'இலவச ஜாதகத்தை நொடிகளில் கணிக்கவும்',
    hi: 'सेकंडों में अपनी निःशुल्क कुंडली बनाएं',
    te: 'క్షణాల్లో మీ ఉచిత జాతకాన్ని రూపొందించండి',
    kn: 'ಕ್ಷಣಗಳಲ್ಲಿ ನಿಮ್ಮ ಉಚಿತ ಜಾತಕವನ್ನು ರಚಿಸಿ',
    ml: 'നിമിഷങ്ങൾക്കുള്ളിൽ നിങ്ങളുടെ സൗജന്യ ജാതകം ഉണ്ടാക്കുക'
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
    en: 'Place of birth',
    ta: 'பிறந்த ஊர் / நகரம்',
    hi: 'जन्म स्थान',
    te: 'జన్మ స్థలము',
    kn: 'ಹುಟ್ಟಿದ ಸ್ಥಳ',
    ml: 'ജനன സ്ഥലം'
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
    kn: 'ಮುಂದುವರಿಸಿ →',
    ml: 'തുടരുക →'
  },
  moreFromAstrologyTitle: {
    en: 'More from Astrology',
    ta: 'ஜோதிடத் தகவல்கள் & வழிகாட்டல்கள்',
    hi: 'ज्योतिष से संबंधित और अधिक',
    te: 'మరిన్ని జ్యోతిష్య సమాచారాలు',
    kn: 'ಜ್ಯೋತಿಷ್ಯದಿಂದ ಇನ್ನಷ್ಟು',
    ml: 'ജ്യോതിഷത്തിൽ നിന്നുള്ള കൂടുതൽ വിവരങ്ങൾ'
  },
  astrologyLinksTitle: {
    en: 'Astrology Links',
    ta: 'ஜோதிட விரைவு இணைப்புகள்',
    hi: 'ज्योतिष लिंक',
    te: 'జ్యోతిష్య లింకులు',
    kn: 'ಜ್ಯೋತಿಷ್ಯ ಲಿಂಕ್‌ಗಳು',
    ml: 'ജ്യോതിഷ ലിങ്കുകൾ'
  },
  auspiciousTimingsTitle: {
    en: "Today's Auspicious & Inauspicious Hours",
    ta: 'இன்றைய சுப & அசுப நேரங்கள்',
    hi: 'आज के शुभ व अशुभ मुहूर्त',
    te: 'ఈ రోజు శుభ & అశుభ సమయాలు',
    kn: 'ಇಂದಿನ ಶುಭ ಮತ್ತು ಅಶುಭ ಮುಹೂರ್ತಗಳು',
    ml: 'ഇന്നത്തെ ശുഭ & അശുഭ സമയങ്ങൾ'
  },
  auspiciousBadge: {
    en: 'Auspicious',
    ta: 'சுப நேரம்',
    hi: 'शुभ',
    te: 'శుభం',
    kn: 'ಶುಭ',
    ml: 'ശുഭം'
  },
  inauspiciousBadge: {
    en: 'Inauspicious',
    ta: 'அசுப நேரம்',
    hi: 'அशुभ',
    te: 'అశుభం',
    kn: 'ಅಶುಭ',
    ml: 'അശുഭം'
  },
  moderateBadge: {
    en: 'Moderate',
    ta: 'மத்தியமம்',
    hi: 'मध्यम',
    te: 'మధ్యమం',
    kn: 'ಮಧ್ಯಮ',
    ml: 'മധ്യമം'
  }
};

/**
 * Featured Articles List
 */
export const FEATURED_ARTICLES = [
  {
    id: 'bhagyank-1',
    symbol: '1️⃣',
    badge: 'Bhagyank',
    themeClass: 'thumb-bhagyank',
    title: {
      en: 'Bhagyank 1 Meaning: Personality, Career, Love, and Compatibility',
      ta: 'பாக்ய எண் 1 பலன்கள்: தொழில், குணம், காதல் & யோகங்கள்',
      hi: 'भाग्यांक 1: व्यक्तित्व, करियर, प्रेम और अनुकूलता'
    },
    category: {
      en: 'Numerology Insights',
      ta: 'எண்கணித ரகசியங்கள்',
      hi: 'अंकशास्त्र'
    },
    route: '/kalachakram'
  },
  {
    id: 'zodiac-compatibility',
    symbol: '❤️',
    badge: 'Love',
    themeClass: 'thumb-love',
    title: {
      en: 'Zodiac compatibility to find love & lasting marriage harmony',
      ta: '12 ராசி திருமணப் பொருத்தம் & தாம்பத்ய ஒற்றுமை',
      hi: 'राशि अनुकूलता: वैवाहिक सामंजस्य और प्रेम'
    },
    category: {
      en: 'Astrology Matching',
      ta: 'திருமணப் பொருத்தம்',
      hi: 'कुंडली मिलान'
    },
    route: '/rasis'
  },
  {
    id: 'mulank-insights',
    symbol: '🔢',
    badge: 'Mulank',
    themeClass: 'thumb-mulank',
    title: {
      en: 'Mulank 1 Meaning: Personality, Wealth, Leadership, and Life Path',
      ta: 'மூலாங்க எண் 1: தலைமைப் பண்பு, செல்வம் & வாழ்க்கை பாதை',
      hi: 'मूलांक 1: स्वभाव, नेतृत्व, धन और जीवन पथ'
    },
    category: {
      en: 'Vedic Numerology',
      ta: 'வேத எண் கணிதம்',
      hi: 'वैदिक अंकशास्त्र'
    },
    route: '/kalachakram'
  },
  {
    id: 'planetary-transits',
    symbol: '🪐',
    badge: 'Transits',
    themeClass: 'thumb-planets',
    title: {
      en: 'Planetary Transits: Saturn & Jupiter Gocharam Influences',
      ta: 'கிரகப் பெயர்ச்சிகள்: சனி & குரு பெயர்ச்சி கோச்சார பலன்கள்',
      hi: 'ग्रह गोचर: शनि और गुरु गोचर प्रभाव'
    },
    category: {
      en: 'Planetary Ephemeris',
      ta: 'கோச்சார பலன்கள்',
      hi: 'ग्रह गोचर'
    },
    route: '/planets'
  }
];

/**
 * High-Value Cross-Portal Navigation Links
 */
export const ASTROLOGY_QUICK_LINKS = [
  {
    id: 'link-kundli-calculator',
    path: '/',
    badge: 'Free',
    title: {
      en: 'Free Janam Kundli Online Calculator (D1 & D9)',
      ta: 'இலவச ஜாதகக் கணிப்பு (ராசி & நவாம்சம்)',
      hi: 'मुफ्त जन्म कुंडली कैलकुलेटर'
    }
  },
  {
    id: 'link-kadikara-prasannam',
    path: '/kadikara-prasannam',
    badge: 'New',
    title: {
      en: 'Kadikara Prasannam (Clock Time Horary Astrology)',
      ta: 'கடிகார பிரசன்னம் (உதயம் & ஆருடம் கணக்கீடு)',
      hi: 'घड़ी प्रश्न कुंडली (उदयम और आरूढ़)'
    }
  },
  {
    id: 'link-zodiac-signs',
    path: '/rasis',
    badge: '12 Signs',
    title: {
      en: '12 Zodiac Signs (Rasis) & Ruling Planets Guide',
      ta: '12 ராசிகள் & அதிபதிகள் முழு விவரம்',
      hi: '12 राशियां और उनके स्वामी'
    }
  },
  {
    id: 'link-nakshatras',
    path: '/nakshatras',
    badge: '27 Stars',
    title: {
      en: '27 Vedic Nakshatras & Pada Characteristics',
      ta: '27 நட்சத்திரங்கள் & பாத குணங்கள்',
      hi: '27 नक्षत्र एवं चरण फल'
    }
  },
  {
    id: 'link-planets',
    path: '/planets',
    badge: 'Navagrahas',
    title: {
      en: '9 Navagrahas: Exaltation, Debilitation & Friendly Signs',
      ta: 'நவக்கிரகங்கள்: உச்சம், நீசம், நட்பு, பகை அட்டவணை',
      hi: 'नवग्रह: उच्च, नीच एवं मित्र राशियां'
    }
  },
  {
    id: 'link-kp-horary',
    path: '/kp-horary',
    badge: 'KP 249',
    title: {
      en: 'KP Horary Numbers 1-249 Sub-Lord Table',
      ta: 'KP ஹோரரி 1-249 உப அதிபதி அட்டவணை',
      hi: 'केपी 1-249 उप-स्वामी तालिका'
    }
  },
  {
    id: 'link-tithis-panchangam',
    path: '/tithis',
    badge: 'Tithis',
    title: {
      en: '30 Lunar Tithis & Auspicious Muhurtham Timings',
      ta: '30 திதிகள் & வளர்பிறை / தேய்பிறை விவரங்கள்',
      hi: '30 तिथियां एवं शुभ मुहूर्त'
    }
  },
  {
    id: 'link-kalachakram',
    path: '/kalachakram',
    badge: '360°',
    title: {
      en: '360° Kalachakram Wheel & Degree Longitude Lookup',
      ta: 'காலச்சக்கரம் 360° பாகை விவர அட்டவணை',
      hi: '360° कालचक्र चक्र एवं डिग्री विवरण'
    }
  },
  {
    id: 'link-tamil-calendar',
    path: '/tamil-calendar',
    badge: '60 Years',
    title: {
      en: 'Tamil Calendar 60-Year Cycle & Solar Months',
      ta: '60 தமிழ் வருடங்கள் & 12 தமிழ் மாதங்கள்',
      hi: 'तमिल कैलेंडर 60 संवत्सर'
    }
  }
];

/**
 * Standard Auspicious & Inauspicious Hours
 */
export const DEFAULT_AUSPICIOUS_TIMINGS = [
  {
    id: 'abhijit-muhurtham',
    type: 'auspicious',
    badgeType: 'green',
    name: {
      en: 'Abhijit Muhurtham',
      ta: 'அபிஜித் முகூர்த்தம்',
      hi: 'अभिजित मुहूर्त'
    },
    time: '11:48 AM - 12:38 PM'
  },
  {
    id: 'brahma-muhurtham',
    type: 'auspicious',
    badgeType: 'green',
    name: {
      en: 'Brahma Muhurtham',
      ta: 'பிரம்ம முகூர்த்தம்',
      hi: 'ब्रह्म मुहूर्त'
    },
    time: '04:30 AM - 05:18 AM'
  },
  {
    id: 'rahu-kalam',
    type: 'inauspicious',
    badgeType: 'red',
    name: {
      en: 'Rahu Kalam',
      ta: 'இராகு காலம்',
      hi: 'राहु काल'
    },
    time: '04:30 PM - 06:00 PM'
  },
  {
    id: 'yamagandam',
    type: 'inauspicious',
    badgeType: 'red',
    name: {
      en: 'Yamagandam',
      ta: 'எமகண்டம்',
      hi: 'यमगण्ड'
    },
    time: '12:00 PM - 01:30 PM'
  },
  {
    id: 'gulikai',
    type: 'moderate',
    badgeType: 'yellow',
    name: {
      en: 'Kuligai (Gulikai)',
      ta: 'குளிகை',
      hi: 'गुलिक काल'
    },
    time: '03:00 PM - 04:30 PM'
  }
];
