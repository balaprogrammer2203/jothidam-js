/**
 * Jothidam Portal Mega Menu Navigation Configuration
 * Multilingual Main Categories & Multi-Column Subcategories with SEO-Optimized URLs
 */

import { ROUTES } from './routes.config';

export const PORTAL_NAVIGATION_TREE = [
  {
    id: 'horoscopes',
    key: 'horoscopes',
    title: {
      en: 'Horoscope',
      ta: 'ஜாதகம்',
      hi: 'कुंडली',
      te: 'జాతకం',
      kn: 'ಜಾತಕ',
      ml: 'ജാതകം'
    },
    icon: '🕉️',
    hasDropdown: true,
    columns: [
      {
        heading: { en: 'Horoscope Services', ta: 'ஜாதகக் கணிப்புகள்' },
        items: [
          {
            id: 'birth-chart',
            title: { en: 'Birth Chart Calculator (Kundli)', ta: 'ஜாதகக் கணிப்பு (D1 & D9)' },
            desc: { en: 'Precision birth chart with Navamsa', ta: 'ராசி மற்றும் நவாம்ச கட்டங்கள்' },
            path: ROUTES.HOME,
            badge: 'Popular',
            icon: '📄'
          },
          {
            id: 'saved-profiles',
            title: { en: 'Saved Horoscope Profiles', ta: 'சேமிக்கப்பட்ட ஜாதகங்கள்' },
            desc: { en: 'View and manage saved kundli charts', ta: 'சேமித்த ஜாதக விவரங்கள்' },
            path: ROUTES.HOROSCOPE.SAVED,
            badge: 'Archive',
            icon: '⭐'
          },
          {
            id: 'menu-kadikara-prasannam',
            title: { en: 'Kadikara Prasannam (Clock)', ta: 'கடிகார பிரசன்னம்' },
            desc: { en: 'Instant clock time horary with South Indian chart', ta: 'தென்னிந்திய ராசி சக்கரத்துடன் கூடிய பிரசன்னம்' },
            path: ROUTES.PRASANNAM.KADIKARA,
            badge: 'New',
            icon: '🕰️'
          }
        ]
      }
    ]
  },
  {
    id: 'prasannam',
    key: 'prasannam',
    title: {
      en: 'Prasannam',
      ta: 'பிரசன்னம்',
      hi: 'प्रश्न ज्योतिष',
      te: 'ప్రశ్న శాస్త్రం',
      kn: 'ಪ್ರಶ್ನ ಜ್ಯೋತಿಷ್ಯ',
      ml: 'പ്രശ്നം'
    },
    icon: '🕰️',
    hasDropdown: true,
    columns: [
      {
        heading: { en: 'Horary Astrology', ta: 'பிரசன்ன ஜோதிடம்' },
        items: [
          {
            id: 'kadikara-prasannam',
            title: {
              en: 'Kadikara Prasannam (Clock Horary)',
              ta: 'கடிகார பிரசன்னம்',
              hi: 'घड़ी प्रश्न कुंडली',
              te: 'గడియార ప్రశ్న శాస్త్రం',
              kn: 'ಗಡಿಯಾರ ಪ್ರಶ್ನ ಜ್ಯೋತಿಷ್ಯ',
              ml: 'ഘടികാര പ്രശ്നം'
            },
            desc: {
              en: 'Instant clock time horary with South Indian chart',
              ta: 'மணி & நிமிடம் வைத்து காரிய வெற்றி அறியும் பிரசன்னம்',
              hi: 'समय और मिनट से त्वरित प्रश्न फल',
              te: 'గంట మరియు నిమిషాల ఆధారంగా ప్రశ్న ఫలితం',
              kn: 'ಘಂಟೆ ಮತ್ತು ನಿಮಿಷಗಳಿಂದ ಫಲಿತಾಂಶ',
              ml: 'മണിയും മിനിറ്റും ഉപയോഗിച്ചുള്ള പ്രശ്ന ഫലം'
            },
            path: ROUTES.PRASANNAM.KADIKARA,
            badge: 'New',
            icon: '🕰️'
          }
        ]
      }
    ]
  },
  {
    id: 'zodiac_grahas',
    key: 'zodiacGrahas',
    title: {
      en: 'Zodiac & Planets',
      ta: 'ராசிகள் & கிரகங்கள்',
      hi: 'राशि & ग्रह',
      te: 'రాశులు & గ్రహాలు',
      kn: 'ರಾಶಿ & ಗ್ರಹ',
      ml: 'രാശി & ഗ്രഹം'
    },
    icon: '🪐',
    hasDropdown: true,
    columns: [
      {
        heading: { en: 'Signs & Stars', ta: 'ராசிகள் & நட்சத்திரங்கள்' },
        items: [
          {
            id: 'rasis',
            title: { en: '12 Zodiac Signs (Rasis)', ta: '12 ராசிகள் முழு விவரம்' },
            desc: { en: 'Elements, ruling lords, and attributes', ta: 'பூதம், குணம், அதிபதி விவரங்கள்' },
            path: ROUTES.ZODIAC.RASIS,
            icon: '♈'
          },
          {
            id: 'nakshatras',
            title: { en: '27 Vedic Nakshatras', ta: '27 நட்சத்திரங்கள் & பாதங்கள்' },
            desc: { en: '108 Padas, deities, and ganas', ta: 'அதிபதி, தேவதை, கணங்கள்' },
            path: ROUTES.ZODIAC.NAKSHATRAS,
            icon: '✨'
          },
          {
            id: 'nakshatra-padas',
            title: { en: '108 Nakshatra Padas (Mandalam)', ta: '108 நட்சத்திர பாதங்கள் (மண்டலம்)' },
            desc: { en: 'South Indian Chart wheel & pada degrees', ta: 'ராசி சக்கரம் & பாதங்கள் பாகை விவரம்' },
            path: ROUTES.ZODIAC.NAKSHATRA_PADAS,
            badge: '108 Padas',
            icon: '🧭'
          }
        ]
      },
      {
        heading: { en: 'Planets & Ephemeris', ta: 'கிரகங்கள் & சக்கரம்' },
        items: [
          {
            id: 'planets',
            title: { en: '9 Navagrahas & Lords', ta: 'நவக்கிரகங்கள் & அதிபதிகள்' },
            desc: { en: 'Exaltation, debilitation & relations', ta: 'உச்சம், நீசம், ஆட்சி விவரங்கள்' },
            path: ROUTES.ZODIAC.PLANETS,
            icon: '🪐'
          },
          {
            id: 'kalachakram',
            title: {
              en: '360° Kalachakram Wheel',
              ta: 'காலச்சக்கரம் 360° பாகை',
              hi: '360° कालचक्र चक्र',
              te: '360° కాలచక్రం సూచిక',
              kn: '360° ಕಾಲಚಕ್ರ ಕೋಷ್ಟಕ',
              ml: '360° കാലചക്രം ഡയറക്ടറി'
            },
            desc: {
              en: 'Degree-by-degree zodiac lookup',
              ta: 'ஒவ்வொரு பாகைக்கான சக்கரம்',
              hi: 'प्रत्येक डिग्री का सूक्ष्म राशि व नक्षत्र विवरण',
              te: 'ప్రతి డిగ్రీకి రాశి మరియు నక్షత్ర వివరాలు',
              kn: 'ಪ್ರತಿ ಅಂಶದ ರಾಶಿ ಮತ್ತು ನಕ್ಷತ್ರ ವಿವರಗಳು',
              ml: 'ഓരോ ഡിഗ്രിയിലെയും രാശി, നക്ഷത്ര വിവരങ്ങൾ'
            },
            path: ROUTES.ZODIAC.KALACHAKRAM,
            icon: '🎡'
          }
        ]
      }
    ]
  },
  {
    id: 'kp_astrology',
    key: 'kpAstrology',
    title: {
      en: 'KP Astrology',
      ta: 'KP ஜோதிடம்',
      hi: 'केपी ज्योतिष',
      te: 'కేపీ జ్యోతిష్యం',
      kn: 'ಕೆಪಿ ಜ್ಯೋತಿಷ್ಯ',
      ml: 'കെ.പി ജ്യോതിഷം'
    },
    icon: '🔮',
    hasDropdown: true,
    columns: [
      {
        heading: { en: 'Krishnamurti Paddhati Tables', ta: 'KP முறை அட்டவணைகள்' },
        items: [
          {
            id: 'kp-horary',
            title: { en: 'KP Horary Numbers 1-249', ta: 'KP ஹோரரி 1-249 அட்டவணை' },
            desc: { en: 'Authentic 249 sub-lord reference table', ta: '249 உப அதிபதி முழு விவரம்' },
            path: ROUTES.KP_ASTROLOGY.HORARY,
            badge: 'KP 249',
            icon: '🔮'
          },
          {
            id: 'kp-sublords',
            title: { en: 'Sub-Lord Longitudes (From/To)', ta: 'உப அதிபதி பாகை எல்லைகள்' },
            desc: { en: 'Exact degree, minute, second limits', ta: 'துல்லிய பாகை/கலை/விகலை அளவுகள்' },
            path: ROUTES.KP_ASTROLOGY.HORARY,
            icon: '📐'
          },
          {
            id: 'kp-boundaries',
            title: { en: 'Sign Boundary Splits', ta: 'ராசி எல்லைப் பிரிவுகள்' },
            desc: { en: 'Sign transition sub-lord divisions', ta: '30° ராசி மாறுதல் பிரிவுகள்' },
            path: ROUTES.KP_ASTROLOGY.HORARY,
            icon: '⚖️'
          }
        ]
      }
    ]
  },
  {
    id: 'panchangam',
    key: 'panchangam',
    title: {
      en: 'Panchangam',
      ta: 'பஞ்சாங்கம்',
      hi: 'पंचांग',
      te: 'పంచాంగం',
      kn: 'ಪಂಚಾಂಗ',
      ml: 'പഞ്ചാംഗം'
    },
    icon: '🌕',
    hasDropdown: true,
    columns: [
      {
        heading: { en: 'Lunar Elements', ta: 'திதிகள் & யோகங்கள்' },
        items: [
          {
            id: 'tithis',
            title: { en: '30 Lunar Tithis', ta: '30 திதிகள் அட்டவணை' },
            desc: { en: 'Shukla & Krishna paksha deities', ta: 'வளர்பிறை & தேய்பிறை திதிகள்' },
            path: ROUTES.PANCHANGAM.TITHIS,
            icon: '🌕'
          },
          {
            id: 'yogas',
            title: { en: '27 Nithya Yogas', ta: '27 நித்திய யோகங்கள்' },
            desc: { en: 'Auspicious & inauspicious yogas', ta: 'சுப & அசுப யோக பலன்கள்' },
            path: ROUTES.PANCHANGAM.YOGAS,
            icon: '🌀'
          }
        ]
      },
      {
        heading: { en: 'Karanas & Calendar', ta: 'கரணங்கள் & காலண்டர்' },
        items: [
          {
            id: 'karanas',
            title: { en: '11 Vedic Karanas', ta: '11 கரணங்கள் அட்டவணை' },
            desc: { en: '7 Movable and 4 Fixed karanas', ta: 'சர & ஸ்திர கரண விவரங்கள்' },
            path: ROUTES.PANCHANGAM.KARANAS,
            icon: '⏳'
          },
          {
            id: 'tamil-calendar',
            title: { en: 'Tamil Calendar (60 Years)', ta: '60 தமிழ் வருடங்கள் & மாதங்கள்' },
            desc: { en: '60 cycle years and solar months', ta: 'பிரபவ முதல் அட்சய வரை & 12 மாதங்கள்' },
            path: ROUTES.PANCHANGAM.TAMIL_CALENDAR,
            icon: '📆'
          }
        ]
      }
    ]
  },
  {
    id: 'admin',
    key: 'admin',
    title: {
      en: 'Admin',
      ta: 'நிர்வாகம்',
      hi: 'प्रशासन',
      te: 'పరిపాలన',
      kn: 'ಆಡಳಿತ',
      ml: 'ഭരണവിഭാഗം'
    },
    icon: '⚙️',
    hasDropdown: true,
    columns: [
      {
        heading: { en: 'System Administration', ta: 'நிர்வாக கட்டுப்பாட்டு பலகை' },
        items: [
          {
            id: 'admin-panel',
            title: { en: 'Master Tables Administration', ta: 'அட்டவணைகள் நிர்வாகம்' },
            desc: { en: 'CRUD management for 11 master collections', ta: '11 அட்டவணைகளின் தரவு மேலாண்மை' },
            path: ROUTES.ADMIN.DASHBOARD,
            badge: 'Admin',
            icon: '⚙️'
          },
          {
            id: 'admin-login',
            title: { en: 'Admin Portal Login', ta: 'நிர்வாக நுழைவு (Login)' },
            desc: { en: 'Secure JWT role-based credentials', ta: 'பாதுகாப்பான நிர்வாகி உள்நுழைவு' },
            path: ROUTES.ADMIN.LOGIN,
            icon: '🔐'
          }
        ]
      }
    ]
  }
];

export default PORTAL_NAVIGATION_TREE;
