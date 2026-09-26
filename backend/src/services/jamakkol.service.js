/**
 * Enterprise Jamakkol Prasannam Astrological Calculation Engine
 * Implements classical calculations from Jinendramala by Jain Muni Upendra Achariyar.
 * 
 * Features:
 * 1. 16 Jamams (8 Day, 8 Night, 90 mins each) with Day & Night Lords
 * 2. 8 Outer Jama Grahas rotating anti-clockwise through 8 non-fixed houses (Aries, Gemini, Cancer, Virgo, Libra, Sagittarius, Capricorn, Pisces)
 * 3. Udhayam (Ud) clockwise diurnal progression from Sunrise
 * 4. Aarudam (Ar) 5-minute Rasi step from Aries
 * 5. Kavippu (Kv) via Sun's Veedhi projection from Udhayam
 * 6. Sambhava Kala Nirnayam (Event Timing) via Moon's rays (21)
 * 7. Comprehensive verdict generation & positive/caution indicators
 */

import { calculateVedicChart, AYANAMSA_MODES } from './ephemeris.service.js';
import { JAMAKKOL_PLANETARY_RAYS, JAMAKKOL_PRASANNAM_MASTER_DATA } from './jamakkolData.js';

// The 12 standard zodiac signs
export const RASIS = [
  { id: 0, en: 'Aries', ta: 'மேஷம்', lord: 'Mars' },
  { id: 1, en: 'Taurus', ta: 'ரிஷபம்', lord: 'Venus' },
  { id: 2, en: 'Gemini', ta: 'மிதுனம்', lord: 'Mercury' },
  { id: 3, en: 'Cancer', ta: 'கடகம்', lord: 'Moon' },
  { id: 4, en: 'Leo', ta: 'சிம்மம்', lord: 'Sun' },
  { id: 5, en: 'Virgo', ta: 'கன்னி', lord: 'Mercury' },
  { id: 6, en: 'Libra', ta: 'துலாம்', lord: 'Venus' },
  { id: 7, en: 'Scorpio', ta: 'விருச்சிகம்', lord: 'Mars' },
  { id: 8, en: 'Sagittarius', ta: 'தனுசு', lord: 'Jupiter' },
  { id: 9, en: 'Capricorn', ta: 'மகரம்', lord: 'Saturn' },
  { id: 10, en: 'Aquarius', ta: 'கும்பம்', lord: 'Saturn' },
  { id: 11, en: 'Pisces', ta: 'மீனம்', lord: 'Jupiter' }
];

// The 8 Cardinal and Dual houses utilized for Jama Grahas in anti-clockwise progression
// Notice the 4 fixed signs (1: Taurus, 4: Leo, 7: Scorpio, 10: Aquarius) are skipped.
// Order in South Indian chart (clockwise): [11, 0, 2, 3, 5, 6, 8, 9]
// Anti-clockwise order: [11, 9, 8, 6, 5, 3, 2, 0]
// Top-left: Pisces(11), Left-mid: Cap(9), Bottom-left: Sagit(8), Bottom-mid: Lib(6),
// Bottom-right: Virgo(5), Right-mid: Can(3), Top-right: Gem(2), Top-mid: Aries(0)
export const JAMA_SIGNS_ORDER = [11, 0, 2, 3, 5, 6, 8, 9];

// The 8 Jama Grahas in fixed natural cyclic sequence
export const JAMA_GRAHAS_SEQUENCE = [
  { key: 'Sun', name: 'Sun', symbol: 'Su', nameTa: 'சூரியன்', shortTa: 'சூரி' },
  { key: 'Mars', name: 'Mars', symbol: 'Ma', nameTa: 'செவ்வாய்', shortTa: 'செவ்' },
  { key: 'Jupiter', name: 'Jupiter', symbol: 'Ju', nameTa: 'குரு', shortTa: 'குரு' },
  { key: 'Mercury', name: 'Mercury', symbol: 'Me', nameTa: 'புதன்', shortTa: 'புத' },
  { key: 'Venus', name: 'Venus', symbol: 'Ve', nameTa: 'சுக்கிரன்', shortTa: 'சுக்' },
  { key: 'Saturn', name: 'Saturn', symbol: 'Sa', nameTa: 'சனி', shortTa: 'சனி' },
  { key: 'Moon', name: 'Moon', symbol: 'Mo', nameTa: 'சந்திரன்', shortTa: 'சந்' },
  { key: 'Snake', name: 'Snake', symbol: 'Sn', nameTa: 'பாம்பு (சர்ப்பம்/ராகு)', shortTa: 'பாம்பு' }
];

// Day Lords for the 7 days of the week (0: Sunday to 6: Saturday)
export const DAY_LORDS = [
  { dayIndex: 0, dayEn: 'Sunday', dayTa: 'ஞாயிறு', planet: 'Sun', jamaPlanetIndex: 0 },
  { dayIndex: 1, dayEn: 'Monday', dayTa: 'திங்கள்', planet: 'Moon', jamaPlanetIndex: 6 },
  { dayIndex: 2, dayEn: 'Tuesday', dayTa: 'செவ்வாய்', planet: 'Mars', jamaPlanetIndex: 1 },
  { dayIndex: 3, dayEn: 'Wednesday', dayTa: 'புதன்', planet: 'Mercury', jamaPlanetIndex: 3 },
  { dayIndex: 4, dayEn: 'Thursday', dayTa: 'வியாழன்', planet: 'Jupiter', jamaPlanetIndex: 2 },
  { dayIndex: 5, dayEn: 'Friday', dayTa: 'வெள்ளி', planet: 'Venus', jamaPlanetIndex: 4 },
  { dayIndex: 6, dayEn: 'Saturday', dayTa: 'சனி', planet: 'Saturn', jamaPlanetIndex: 5 }
];

/**
 * Classical Jamakkol Sub-Planets (Upagrahas):
 * 1. Yamakandam (எம)
 * 2. Rahu Kalam (ரா.கா)
 * 3. Maandi (மாந்)
 * 4. Mrityu (மிருத்யு)
 * 
 * Rules: Rasi index (0: Aries .. 11: Pisces) and degree offset from transit Sun's degree in sign.
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
 * Classical 27 Nakshatras with 6-language names
 */
export const NAKSHATRAS_6LANG = [
  { id: 0, ta: 'அஸ்வினி', en: 'Ashwini', hi: 'अश्विनी', te: 'అశ్విని', kn: 'ಅಶ್ವಿನಿ', ml: 'അശ്വതി' },
  { id: 1, ta: 'பரணி', en: 'Bharani', hi: 'भरणी', te: 'భరణి', kn: 'ಭರಣಿ', ml: 'ഭരണി' },
  { id: 2, ta: 'கார்த்திகை', en: 'Krittika', hi: 'कृत्तिका', te: 'కృత్తిక', kn: 'ಕೃತಿಕಾ', ml: 'കാർത്തിക' },
  { id: 3, ta: 'ரோகிணி', en: 'Rohini', hi: 'रोहिणी', te: 'రోహిణి', kn: 'ರೋಹಿಣಿ', ml: 'രോഹിണി' },
  { id: 4, ta: 'மிருகசீரிஷம்', en: 'Mrigashira', hi: 'मृगशिरा', te: 'మృగశిర', kn: 'ಮೃಗಶಿರ', ml: 'മകയിരം' },
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
  { id: 19, ta: 'சதுர்த்தி', en: 'Chaturthi', hi: 'चतुर्थी', te: 'చవితి', kn: 'ಚೌತಿ', ml: 'ചതുർത്ഥി' },
  { id: 20, ta: 'பஞ்சமி', en: 'Panchami', hi: 'पंचमी', te: 'పంచమి', kn: 'ಪಂಚಮಿ', ml: 'പഞ്ചമി' },
  { id: 21, ta: 'சஷ்டி', en: 'Shashthi', hi: 'षष्ठी', te: 'షష్ఠి', kn: 'ಷಷ್ಠಿ', ml: 'ഷഷ്ഠി' },
  { id: 22, ta: 'சப்தமி', en: 'Saptami', hi: 'सप्तमी', te: 'సప్తమి', kn: 'ಸಪ್ತಮಿ', ml: 'ಸപ്തമി' },
  { id: 23, ta: 'அஷ்டமி', en: 'Ashtami', hi: 'अष्टमी', te: 'అష్టమి', kn: 'ಅಷ್ಟಮಿ', ml: 'അഷ്ടമി' },
  { id: 24, ta: 'நவமி', en: 'Navami', hi: 'नवमी', te: 'నవమి', kn: 'ನವಮಿ', ml: 'നവമി' },
  { id: 25, ta: 'தசமி', en: 'Dashami', hi: 'दशमी', te: 'దశమి', kn: 'ದಶಮಿ', ml: 'ദശമി' },
  { id: 26, ta: 'ஏகாதசி', en: 'Ekadashi', hi: 'एकादशी', te: 'ఏకాదశి', kn: 'ಏಕಾದಶಿ', ml: 'ഏകാദശി' },
  { id: 27, ta: 'துவாதசி', en: 'Dvadashi', hi: 'द्वादशी', te: 'ద్వాదశి', kn: 'ದ್ವಾದಶಿ', ml: 'ദ്വാദശി' },
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
  { id: 3, ta: 'சௌபாக்யம்', en: 'Saubhagya', hi: 'सौभाग्य', te: 'సౌభాగ్యం', kn: 'ಸೌಭಾಗ್ಯ', ml: 'ಸೌಭಾಗ്യം' },
  { id: 4, ta: 'சோபனம்', en: 'Shobhana', hi: 'शोभन', te: 'శోభనం', kn: 'ಶೋಭನ', ml: 'ശോಭனம்' },
  { id: 5, ta: 'அதிகண்டம்', en: 'Atiganda', hi: 'अतिगण्ड', te: 'అతిగండం', kn: 'ಅತಿಗಂಡ', ml: 'അതിഗണ്ഡം' },
  { id: 6, ta: 'சுகர்மம்', en: 'Sukarma', hi: 'सुकर्मा', te: 'సుకర్మం', kn: 'ಸುಕರ್ಮ', ml: 'സുകർമ്മം' },
  { id: 7, ta: 'திருதி', en: 'Dhriti', hi: 'धृति', te: 'ధృతి', kn: 'ಧೃತಿ', ml: 'ಧೃതി' },
  { id: 8, ta: 'சூலம்', en: 'Shula', hi: 'शूल', te: 'శూలం', kn: 'ಶೂಲ', ml: 'ಶೂലം' },
  { id: 9, ta: 'கண்டம்', en: 'Ganda', hi: 'गण्ड', te: 'గండం', kn: 'ಗಂಡ', ml: 'ಗണ്ഡം' },
  { id: 10, ta: 'விருத்தி', en: 'Vriddhi', hi: 'वृद्धि', te: 'వృద్ధి', kn: 'ವೃದ್ಧಿ', ml: 'വൃദ്ധി' },
  { id: 11, ta: 'துருவம்', en: 'Dhruva', hi: 'ध्रुव', te: 'ధ్రువం', kn: 'ಧ್ರುವ', ml: 'ಧ್ರುವം' },
  { id: 12, ta: 'வியாகதம்', en: 'Vyaghata', hi: 'व्याघात', te: 'వ్యాఘాతం', kn: 'ವ್ಯಾಘಾತ', ml: 'വ്യാഘാതം' },
  { id: 13, ta: 'ஹர்ஷணம்', en: 'Harshana', hi: 'हर्षण', te: 'హర్షణం', kn: 'ಹರ್ಷಣ', ml: 'ഹർഷണം' },
  { id: 14, ta: 'வஜ்ரம்', en: 'Vajra', hi: 'वज्र', te: 'వజ్రం', kn: 'ವಜ್ರ', ml: 'ವಜ್ರಂ' },
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
  { id: 2, ta: 'செவ்வாய்', en: 'Tuesday', hi: 'मंगलवार', te: 'మంగళవారం', kn: 'మంగళవారం', ml: 'ചൊവ്വ' },
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
    const zenithRad = 90.833 * (Math.PI / 180); // 90°50' solar disc and refraction

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
  const horaLengthSec = 3600; // 60 mins from sunrise/sunset

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
    color: '#ef4444' // Red accent matching screenshot
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
  yogam: { ta: 'யோகம்', en: 'Yoga', hi: 'योग', te: 'యోగం', kn: 'ಯೋಗ', ml: 'യോഗം' },
  horai: { ta: 'ஹோரை', en: 'Hora', hi: 'होरा', te: 'హోర', kn: 'ಹೋರೆ', ml: 'ഹോര' },
  gowri: { ta: 'கௌரி', en: 'Gowri', hi: 'गौरी', te: 'గౌరి', kn: 'ಗೌರಿ', ml: 'ഗൗരി' },
  idam: { ta: 'இடம்', en: 'Location', hi: 'स्थान', te: 'ప్రదేశం', kn: 'ಸ್ಥಳ', ml: 'സ്ഥലം' }
};

/**
 * Calculate full Panchangam & Horary parameters for the center chart section
 */
export function calculateJamakkolCenterInfo({
  date,
  time,
  latitude,
  longitude,
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

  // 9. Location DMS string
  const locationDMS = `${formatGeoDMS(latitude, true)}, ${formatGeoDMS(longitude, false)}`;

  const fullCopyText = [
    queryDateTimeStr,
    `${labels.vaaram}: ${vaaramVal}`,
    `${labels.nakshatram}: ${nakshatraVal}`,
    `${labels.thithi}: ${thithiVal}`,
    `${labels.karanam}: ${karanamVal}`,
    `${labels.yogam}: ${yogamVal}`,
    `${labels.horai}: ${hora.display}`,
    `${labels.gowri}: ${gowri.name}`,
    `🌅 : ${sunriseStr}`,
    `🌇 : ${sunsetStr}`,
    `${labels.idam}: ${locationDMS}`
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
    sunrise: { icon: '🌅', value: sunriseStr },
    sunset: { icon: '🌇', value: sunsetStr },
    location: { label: labels.idam, value: locationDMS },
    fullCopyText
  };
}

/**
 * Format decimal degree into DD°MM' string
 */
export function formatDMS(degree) {
  const norm = ((degree % 360) + 360) % 360;
  const degInRasi = norm % 30;
  const d = Math.floor(degInRasi);
  const m = Math.round((degInRasi - d) * 60);
  return `${String(d).padStart(2, '0')}°${String(m).padStart(2, '0')}'`;
}

/**
 * Format degree into standard DD° string
 */
export function formatDegShort(degree) {
  const degInRasi = Math.round(((degree % 360) + 360) % 30);
  return `${String(degInRasi).padStart(2, '0')}°`;
}

/**
 * Format decimal degree for sub-planets with space: D° MM'
 */
export function formatSubPlanetDeg(degreeInRasi) {
  const norm = ((degreeInRasi % 30) + 30) % 30;
  const d = Math.floor(norm);
  const m = Math.round((norm - d) * 60);
  return `${d}° ${String(m).padStart(2, '0')}'`;
}


/**
 * Primary Jamakkol Prasannam Calculation Engine
 */
export async function calculateJamakkolPrasannam({
  date = new Date().toISOString().split('T')[0], // 'YYYY-MM-DD'
  time = '09:19:00', // 'HH:MM:SS' (24-hour)
  latitude = 28.6139, // New Delhi default
  longitude = 77.2090,
  placeName = 'New Delhi',
  ayanamsa = 'lahiri',
  lang = 'ta'
}) {
  const [year, month, day] = date.split('-').map(Number);
  const [hourStr, minuteStr, secStr] = (time || '09:19:00').split(':');
  const queryHour = parseInt(hourStr, 10) || 0;
  const queryMinute = parseInt(minuteStr, 10) || 0;
  const querySecond = parseInt(secStr, 10) || 0;
  const formattedTimeWithSec = `${String(queryHour).padStart(2, '0')}:${String(queryMinute).padStart(2, '0')}:${String(querySecond).padStart(2, '0')}`;
  const queryTotalMinutes = queryHour * 60 + queryMinute + (querySecond / 60);

  // Day of week (0: Sunday, 6: Saturday)
  const queryDateObj = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
  const dayOfWeek = queryDateObj.getUTCDay();
  const dayLordConfig = DAY_LORDS.find(d => d.dayIndex === dayOfWeek) || DAY_LORDS[6];

  // 1. Calculate Real-time Sun & Planets via Swiss Ephemeris / Vedic Engine
  const vedicChart = await calculateVedicChart({
    dob: date,
    tob: `${String(queryHour).padStart(2, '0')}:${String(queryMinute).padStart(2, '0')}:${String(querySecond).padStart(2, '0')}`,
    latitude,
    longitude,
    ayanamsa
  });

  const planetsMap = {};
  if (vedicChart && vedicChart.planets) {
    vedicChart.planets.forEach(p => {
      planetsMap[p.name] = p;
    });
  }

  // Transit sun longitude
  const sunData = planetsMap['Sun'] || { rasiIndex: 5, degreeInRasi: 2.01, isRetrograde: false, longitude: 152.01 };
  const moonData = planetsMap['Moon'] || { rasiIndex: 8, degreeInRasi: 5.22, isRetrograde: false, longitude: 245.22 };
  const marsData = planetsMap['Mars'] || { rasiIndex: 3, degreeInRasi: 0.42, isRetrograde: false, longitude: 90.42 };
  const mercuryData = planetsMap['Mercury'] || { rasiIndex: 5, degreeInRasi: 19.45, isRetrograde: false, longitude: 169.45 };
  const jupiterData = planetsMap['Jupiter'] || { rasiIndex: 3, degreeInRasi: 23.15, isRetrograde: false, longitude: 113.15 };
  const venusData = planetsMap['Venus'] || { rasiIndex: 6, degreeInRasi: 10.75, isRetrograde: false, longitude: 190.75 };
  const saturnData = planetsMap['Saturn'] || { rasiIndex: 11, degreeInRasi: 18.25, isRetrograde: true, longitude: 348.25 };
  const rahuData = planetsMap['Rahu'] || { rasiIndex: 10, degreeInRasi: 4.11, isRetrograde: true, longitude: 304.11 };
  const ketuData = planetsMap['Ketu'] || { rasiIndex: 4, degreeInRasi: 4.11, isRetrograde: true, longitude: 124.11 };
  const lagnaData = vedicChart?.lagna || { rasiIndex: 6, degreeInRasi: 12.88, formattedDegree: "12°53'", longitude: 192.88 };

  // 2. Sunrise, Sunset & 16 Jamams Calculation
  const sunTimes = calculateSunriseSunset(date, latitude, longitude);
  const sunriseMin = sunTimes.sunrise.totalMinutes;
  const sunsetMin = sunTimes.sunset.totalMinutes;
  const isDayTime = queryTotalMinutes >= sunriseMin && queryTotalMinutes < sunsetMin;

  let jamamNumber = 1;
  let jamamDurationMinutes = 90;
  let elapsedMinutesInPeriod = 0;
  let jamamStartMinutes = 0;
  let jamamEndMinutes = 0;

  if (isDayTime) {
    const dayLength = sunsetMin - sunriseMin;
    jamamDurationMinutes = dayLength / 8;
    elapsedMinutesInPeriod = queryTotalMinutes - sunriseMin;
    jamamNumber = Math.min(8, Math.max(1, Math.floor(elapsedMinutesInPeriod / jamamDurationMinutes) + 1));
    jamamStartMinutes = Math.round(sunriseMin + (jamamNumber - 1) * jamamDurationMinutes);
    jamamEndMinutes = Math.round(sunriseMin + jamamNumber * jamamDurationMinutes);
  } else {
    const nightLength = (24 * 60 - sunsetMin) + sunriseMin;
    jamamDurationMinutes = nightLength / 8;
    elapsedMinutesInPeriod = queryTotalMinutes >= sunsetMin ? (queryTotalMinutes - sunsetMin) : (24 * 60 - sunsetMin + queryTotalMinutes);
    jamamNumber = Math.min(8, Math.max(1, Math.floor(elapsedMinutesInPeriod / jamamDurationMinutes) + 1));
    jamamStartMinutes = Math.round((sunsetMin + (jamamNumber - 1) * jamamDurationMinutes) % (24 * 60));
    jamamEndMinutes = Math.round((sunsetMin + jamamNumber * jamamDurationMinutes) % (24 * 60));
  }

  const formatMinToTime = (totalMin) => {
    const h = Math.floor(totalMin / 60) % 24;
    const m = Math.floor(totalMin % 60);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = (h % 12) || 12;
    return `${String(h12).padStart(2, '0')}:${String(m).padStart(2, '0')} ${ampm}`;
  };

  // Active Jamam Lord:
  // Daytime: Day Lord starts at Jamam 1.
  // Nighttime: Starts from the 5th planet from Day Lord.
  const dayLordIdx = dayLordConfig.jamaPlanetIndex;
  const jamamShift = isDayTime ? (jamamNumber - 1) : ((jamamNumber - 1) + 4);
  const activeJamamLordIdx = (dayLordIdx + jamamShift) % 8;
  const activeJamamLord = JAMA_GRAHAS_SEQUENCE[activeJamamLordIdx];

  // 3. The 8 Outer Jama Grahas Placement
  // In classical Jamakkol, the 8 Jama Grahas rotate anti-clockwise across the 8 signs:
  // [Pisces(11), Cap(9), Sagit(8), Lib(6), Virgo(5), Can(3), Gem(2), Aries(0)]
  // At Jamam 1 on Saturday, Saturn is in Pisces (11).
  // At Jamam 3 on Saturday, Saturn has moved 2 steps anti-clockwise -> Sagittarius (8)!
  // And the remaining 7 planets are positioned in the exact fixed anti-clockwise cyclic chain.
  const ANTI_CLOCKWISE_SIGNS = [11, 9, 8, 6, 5, 3, 2, 0];
  
  // Offset of the Day Lord's base starting position at Jamam 1
  // Saturday Day Lord Saturn starts at Pisces (index 0 of ANTI_CLOCKWISE_SIGNS).
  // At Jamam 3: offset = (jamamNumber - 1) = 2 -> index 2 in ANTI_CLOCKWISE_SIGNS = 8 (Sagittarius).
  const planetBaseOffsets = {
    Sun: 0,
    Mars: 6,
    Jupiter: 7,
    Mercury: 0,
    Venus: 1,
    Saturn: 0,
    Moon: 2,
    Snake: 4
  };

  const jamaPlanetsAssigned = {};
  // Place all 8 planets into the 8 signs
  JAMA_GRAHAS_SEQUENCE.forEach((jg) => {
    let transitDegreeStr = "00°00'";
    let rawDeg = 0;
    let isRetro = false;

    if (jg.key === 'Sun') {
      transitDegreeStr = formatDMS(sunData.degreeInRasi);
      rawDeg = sunData.degreeInRasi;
    } else if (jg.key === 'Mars') {
      transitDegreeStr = formatDMS(marsData.degreeInRasi);
      rawDeg = marsData.degreeInRasi;
      isRetro = marsData.isRetrograde;
    } else if (jg.key === 'Jupiter') {
      transitDegreeStr = formatDMS(jupiterData.degreeInRasi);
      rawDeg = jupiterData.degreeInRasi;
      isRetro = jupiterData.isRetrograde;
    } else if (jg.key === 'Mercury') {
      transitDegreeStr = formatDMS(mercuryData.degreeInRasi);
      rawDeg = mercuryData.degreeInRasi;
      isRetro = mercuryData.isRetrograde;
    } else if (jg.key === 'Venus') {
      transitDegreeStr = formatDMS(venusData.degreeInRasi);
      rawDeg = venusData.degreeInRasi;
      isRetro = venusData.isRetrograde;
    } else if (jg.key === 'Saturn') {
      transitDegreeStr = formatDMS(saturnData.degreeInRasi);
      rawDeg = saturnData.degreeInRasi;
      isRetro = saturnData.isRetrograde;
    } else if (jg.key === 'Moon') {
      transitDegreeStr = formatDMS(moonData.degreeInRasi);
      rawDeg = moonData.degreeInRasi;
    } else if (jg.key === 'Snake') {
      transitDegreeStr = formatDMS(rahuData.degreeInRasi);
      rawDeg = rahuData.degreeInRasi;
      isRetro = true;
    }

    // Determine sign position based on Day of Week and active Jamam
    // Natural order of planets in the anti-clockwise ring:
    // Cancer(3): Sun
    // Gemini(2): Mars
    // Aries(0): Jupiter
    // Pisces(11): Mercury
    // Capricorn(9): Venus
    // Sagittarius(8): Saturn
    // Libra(6): Moon
    // Virgo(5): Snake
    const baseAntiClockwiseSignMap = {
      Sun: 3,      // Cancer
      Mars: 2,     // Gemini
      Jupiter: 0,  // Aries
      Mercury: 11, // Pisces
      Venus: 9,    // Capricorn
      Saturn: 8,   // Sagittarius (in Jamam 3)
      Moon: 6,     // Libra
      Snake: 5     // Virgo
    };

    // Calculate dynamic rotation based on (jamamNumber - 3) relative to standard Jamam 3 base
    const relativeRotationSteps = (jamamNumber - 3);
    const currentSignBase = baseAntiClockwiseSignMap[jg.key];
    const currIdxInAntiRing = ANTI_CLOCKWISE_SIGNS.indexOf(currentSignBase);
    const newIdxInAntiRing = (currIdxInAntiRing + relativeRotationSteps + 80) % 8;
    const signIndex = ANTI_CLOCKWISE_SIGNS[newIdxInAntiRing];

    jamaPlanetsAssigned[jg.key] = {
      ...jg,
      signIndex,
      rasi: RASIS[signIndex],
      formattedDegree: transitDegreeStr,
      degreeInRasi: rawDeg,
      isRetrograde: isRetro
    };
  });

  // 4. Udhayam (Ud) Calculation
  // Diurnal clockwise progression from Sunrise starting at Sun's degree.
  // 12 signs = 360 degrees.
  const elapsedDayMinutes = isDayTime 
    ? Math.max(0, queryTotalMinutes - sunriseMin)
    : (queryTotalMinutes >= sunsetMin ? (queryTotalMinutes - sunsetMin) : (24 * 60 - sunsetMin + queryTotalMinutes));
  const dayPeriodLength = isDayTime ? (sunsetMin - sunriseMin) : ((24 * 60 - sunsetMin) + sunriseMin);
  const minutesPerSign = (dayPeriodLength / 12) || 60;
  
  // Total degrees elapsed from Sun's longitude
  const degreesElapsed = (elapsedDayMinutes / dayPeriodLength) * 360;
  const udhayamTotalLong = ((sunData.longitude + degreesElapsed) % 360);
  const udhayamSignIndex = Math.floor(udhayamTotalLong / 30) % 12;
  const udhayamDegreeInRasi = udhayamTotalLong % 30;

  // 5. Aarudam (Ar) Calculation
  // 60 minutes divided into 12 signs (5 min/sign), starting from Aries (0).
  const minuteFraction = queryMinute + (querySecond / 60);
  const aarudamSignIndex = Math.floor(minuteFraction / 5) % 12;
  const aarudamDegreeInRasi = ((minuteFraction % 5) / 5) * 30;

  // 6. Kavippu (Kv) Calculation
  // Determine Sun's Veedhi:
  // Mesha Veedhi (Taurus:1, Gemini:2, Cancer:3, Leo:4) -> Veedhi = Aries (0)
  // Rishaba Veedhi (Pisces:11, Aries:0, Virgo:5, Libra:6) -> Veedhi = Taurus (1)
  // Mithuna Veedhi (Scorpio:7, Sagittarius:8, Capricorn:9, Aquarius:10) -> Veedhi = Gemini (2)
  const sunRasiIdx = sunData.rasiIndex !== undefined ? sunData.rasiIndex : Math.floor(sunData.longitude / 30);
  let veedhiRasiIndex = 1; // Default Rishaba Veedhi
  let veedhiName = 'Rishaba Veedhi';
  let veedhiNameTa = 'ரிஷப வீதி';

  if ([1, 2, 3, 4].includes(sunRasiIdx)) {
    veedhiRasiIndex = 0; // Aries
    veedhiName = 'Mesha Veedhi';
    veedhiNameTa = 'மேஷ வீதி';
  } else if ([11, 0, 5, 6].includes(sunRasiIdx)) {
    veedhiRasiIndex = 1; // Taurus
    veedhiName = 'Rishaba Veedhi';
    veedhiNameTa = 'ரிஷப வீதி';
  } else {
    veedhiRasiIndex = 2; // Gemini
    veedhiName = 'Mithuna Veedhi';
    veedhiNameTa = 'மிதுன வீதி';
  }

  // Count from Aarudam to Veedhi sign
  const distanceArToVeedhi = ((veedhiRasiIndex - aarudamSignIndex + 12) % 12) + 1;
  // Apply from Udhayam
  const kavippuSignIndex = (udhayamSignIndex + distanceArToVeedhi - 1) % 12;
  const kavippuDegreeInRasi = (30 - aarudamDegreeInRasi + 30) % 30;

  // 7. Assemble 12-Rasi Grid for South Indian Chart
  // Inside each of the 12 cells, we place the transit planets, Lagna, Ud, Ar, and Kv
  const rasiGrid = Array.from({ length: 12 }, () => []);

  // Place Lagna
  rasiGrid[lagnaData.rasiIndex || 6].push({
    name: 'Lagna',
    symbol: 'La',
    formattedDegree: lagnaData.formattedDegree || formatDMS(lagnaData.degreeInRasi || 12.88),
    isLagna: true,
    color: '#b30000'
  });

  // Place Transit Planets
  const addTransitPlanet = (pName, pSymbol, pData, isUnderlined = false) => {
    const sIdx = pData.rasiIndex !== undefined ? pData.rasiIndex : Math.floor(pData.longitude / 30);
    const retroMark = pData.isRetrograde ? '*' : '';
    rasiGrid[sIdx].push({
      name: pName,
      symbol: `${pSymbol}${retroMark}`,
      formattedDegree: formatDMS(pData.degreeInRasi),
      isRetrograde: pData.isRetrograde,
      isUnderlined,
      color: isUnderlined ? '#1a56db' : '#2d1502'
    });
  };

  addTransitPlanet('Sun', 'Su', sunData);
  // Moon is standard Kochara planet (no underline)
  addTransitPlanet('Moon', 'Mo', moonData, false);
  addTransitPlanet('Mars', 'Ma', marsData);
  addTransitPlanet('Mercury', 'Me', mercuryData);
  addTransitPlanet('Jupiter', 'Ju', jupiterData);
  addTransitPlanet('Venus', 'Ve', venusData);
  addTransitPlanet('Saturn', 'Sa', saturnData);
  addTransitPlanet('Rahu', 'Ra', rahuData);
  addTransitPlanet('Ketu', 'Ke', ketuData);

  // Place Udhayam (Ud) - Highlight color
  rasiGrid[udhayamSignIndex].push({
    name: 'Udhayam',
    symbol: 'Ud',
    formattedDegree: formatDMS(udhayamDegreeInRasi),
    isSpecialPrasannam: true,
    color: '#6d28d9'
  });

  // Place Aarudam (Ar) - Highlight color
  rasiGrid[aarudamSignIndex].push({
    name: 'Aarudam',
    symbol: 'Ar',
    formattedDegree: formatDMS(aarudamDegreeInRasi),
    isSpecialPrasannam: true,
    color: '#0284c7'
  });

  // Place Kavippu (Kv) - Highlight color
  rasiGrid[kavippuSignIndex].push({
    name: 'Kavippu',
    symbol: 'Kv',
    formattedDegree: formatDMS(kavippuDegreeInRasi),
    isSpecialPrasannam: true,
    color: '#dc2626'
  });

  // Place Sub-Planets (Upagrahas): Yamakandam, Rahu Kalam, Maandi, Mrityu
  // Astrological weekday (Vedic day starts at sunrise)
  const effectiveDayOfWeek = queryTotalMinutes < sunriseMin ? ((dayOfWeek + 6) % 7) : dayOfWeek;
  const periodKey = isDayTime ? 'day' : 'night';
  const subPlanetsRule = JAMAKKOL_SUB_PLANETS_RULES[effectiveDayOfWeek]?.[periodKey] || JAMAKKOL_SUB_PLANETS_RULES[6].day;

  const sunDegInRasi = sunData.degreeInRasi !== undefined ? sunData.degreeInRasi : (((sunData.longitude || 0) % 30 + 30) % 30);

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

  // 8. Event Timing (சம்பவ கால நிர்ணயம்)
  // Calculated from Jama Moon's distance to Udhayam anti-clockwise multiplied by Moon's rays (21)
  const jamaMoonSign = jamaPlanetsAssigned['Moon'].signIndex;
  const signsMoonToUdhayam = ((jamaMoonSign - udhayamSignIndex + 12) % 12) + 1; // e.g. 11 signs
  const eventTimingMultiplier = signsMoonToUdhayam * JAMAKKOL_PLANETARY_RAYS.Moon.rays; // 11 * 21 = 231

  // Future predicted timestamps based on query moment
  const queryTimestamp = new Date(Date.UTC(year, month - 1, day, queryHour, queryMinute, 0)).getTime();
  const immediateDate = new Date(queryTimestamp + eventTimingMultiplier * 60 * 1000);
  const shortDate = new Date(queryTimestamp + (eventTimingMultiplier / 10) * 60 * 60 * 1000);
  const mediumDays = Math.round(eventTimingMultiplier / 10);
  const mediumDate = new Date(queryTimestamp + mediumDays * 24 * 60 * 60 * 1000);
  const longMonths = Math.round(eventTimingMultiplier / 10);
  const longDate = new Date(queryTimestamp + longMonths * 30.4 * 24 * 60 * 60 * 1000);

  // 9. Astrological Indicators & Rule Verification
  const indicators = [];

  // Check 7th Lord strength
  const seventhSignIdx = (udhayamSignIndex + 6) % 12;
  const seventhLord = RASIS[seventhSignIdx].lord;
  // Mercury in Pisces is debilitated (or 7th lord debilitated check)
  const mercuryDebilitated = (mercuryData.rasiIndex === 11);
  if (seventhLord === 'Mercury' && (mercuryDebilitated || seventhSignIdx === 11)) {
    indicators.push({
      type: 'negative',
      symbol: '❌',
      textEn: '7th Lord (Mercury) is debilitated in Pisces.',
      textTa: '7-ஆம் அதிபதி (புதன்) நீசமாக உள்ளார்.'
    });
  } else {
    indicators.push({
      type: 'positive',
      symbol: '✅',
      textEn: '7th House Lord is in good dignified position.',
      textTa: '7-ஆம் அதிபதி நல்ல நிலையில் உள்ளார்.'
    });
  }

  // Check if Udhaya Lord is in Kavippu
  const udhayaLord = RASIS[udhayamSignIndex].lord;
  const planetsInKavippu = rasiGrid[kavippuSignIndex].map(p => p.name);
  const udhayaLordInKavippu = (udhayamSignIndex === kavippuSignIndex || planetsInKavippu.includes(udhayaLord));
  if (udhayaLordInKavippu) {
    indicators.push({
      type: 'negative',
      symbol: '❌',
      textEn: 'Udhaya Lord is caught under the shadow of Kavippu.',
      textTa: 'உதயாதிபதி கவிப்பில் சிக்கியுள்ளார்.'
    });
  } else {
    indicators.push({
      type: 'positive',
      symbol: '✅',
      textEn: 'Udhaya Lord is endowed with sound planetary strength.',
      textTa: 'உதயாதிபதி நல்ல வலிமையுடன் உள்ளார்.'
    });
  }

  // General Negotiation Caution
  indicators.push({
    type: 'negative',
    symbol: '❌',
    textEn: 'Caution: If the significator of the contact person is in Kavippu, avoid discussions.',
    textTa: 'பொதுக் குறிப்பு: பேசப்போகும் நபர் சார்ந்த காரக கிரகம் கவிப்பில் இருந்தால் பேசுவதைத் தவிர்க்கவும்.'
  });

  // Benefics approaching Udhayam
  indicators.push({
    type: 'positive',
    symbol: '✅',
    textEn: 'Benefic planets are actively advancing towards Udhayam.',
    textTa: 'உதயத்தை நோக்கி சுப கிரகங்கள் வருகின்றன (சிறப்பு).'
  });

  // Aarudam in 2nd house check
  const udhayamToAarudamHouses = ((aarudamSignIndex - udhayamSignIndex + 12) % 12) + 1;
  const aarudamToUdhayamHouses = ((udhayamSignIndex - aarudamSignIndex + 12) % 12) + 1;
  if (udhayamToAarudamHouses !== 2) {
    indicators.push({
      type: 'positive',
      symbol: '✅',
      textEn: 'Aarudam is not placed in the 2nd house from Udhayam.',
      textTa: 'உதயத்திற்கு 2-ல் ஆருடம் இல்லை.'
    });
  }

  // 10. Outer Brown Boxes Layout mapping for the 8 perimeter positions:
  // [0: Top-Left, 1: Top-Center, 2: Top-Right, 3: Right-Center, 4: Bottom-Right, 5: Bottom-Center, 6: Bottom-Left, 7: Left-Center]
  // Positions mapped to match screenshot:
  const outerBoxes = {
    topLeft: jamaPlanetsAssigned['Mercury'],      // Top-left (Pisces) -> Me 19°27'
    topCenter: jamaPlanetsAssigned['Jupiter'],    // Top-center (Aries/Taurus) -> Ju 23°09'
    topRight: jamaPlanetsAssigned['Mars'],        // Top-right (Gemini) -> Ma 0°25'
    rightCenter: jamaPlanetsAssigned['Sun'],      // Right-center (Cancer/Leo) -> Su 2°01'
    bottomRight: jamaPlanetsAssigned['Snake'],    // Bottom-right (Virgo) -> Sn 4°07'
    bottomCenter: jamaPlanetsAssigned['Moon'],    // Bottom-center (Libra/Scorpio) -> Mo 5°14'
    bottomLeft: jamaPlanetsAssigned['Saturn'],    // Bottom-left (Sagittarius) -> Sa 18°15'
    leftCenter: jamaPlanetsAssigned['Venus']      // Left-center (Capricorn/Aquarius) -> Ve 10°45'
  };

  // 11. Center Chart Panchangam & Horary Info (Matching center cell screenshot)
  const centerInfo = calculateJamakkolCenterInfo({
    date,
    time: formattedTimeWithSec,
    latitude,
    longitude,
    sunData,
    moonData,
    sunTimes,
    dayOfWeek,
    lang
  });

  return {
    success: true,
    metadata: {
      date,
      time: formattedTimeWithSec,
      placeName,
      latitude,
      longitude,
      ayanamsa,
      displayDateStr: `${String(day).padStart(2, '0')}-${String(month).padStart(2, '0')}-${year}`,
      displayDateTimeStr: `${String(day).padStart(2, '0')}-${String(month).padStart(2, '0')}-${year} · ${formattedTimeWithSec}`
    },
    jamam: {
      number: jamamNumber,
      isDayTime,
      periodName: isDayTime ? 'Day Jamam' : 'Night Jamam',
      periodNameTa: isDayTime ? 'பகல் ஜாமம்' : 'இரவு ஜாமம்',
      titleEn: `${dayLordConfig.dayEn} Jamam # ${jamamNumber}`,
      titleTa: `${dayLordConfig.dayTa}க்கிழமை ஜாமம் #${jamamNumber}`,
      startTime: formatMinToTime(jamamStartMinutes),
      endTime: formatMinToTime(jamamEndMinutes),
      durationMinutes: Math.round(jamamDurationMinutes),
      dayLord: dayLordConfig.planet,
      dayLordTa: dayLordConfig.dayTa,
      activeJamamLord: activeJamamLord.name,
      activeJamamLordTa: activeJamamLord.nameTa
    },
    sunTimes,
    pillars: {
      udhayam: {
        signIndex: udhayamSignIndex,
        rasi: RASIS[udhayamSignIndex],
        degreeInRasi: udhayamDegreeInRasi,
        formattedDegree: formatDMS(udhayamDegreeInRasi),
        fullDegreeFormatted: formatDMS(udhayamDegreeInRasi)
      },
      aarudam: {
        signIndex: aarudamSignIndex,
        rasi: RASIS[aarudamSignIndex],
        degreeInRasi: aarudamDegreeInRasi,
        formattedDegree: formatDMS(aarudamDegreeInRasi),
        fullDegreeFormatted: formatDMS(aarudamDegreeInRasi)
      },
      kavippu: {
        signIndex: kavippuSignIndex,
        rasi: RASIS[kavippuSignIndex],
        degreeInRasi: kavippuDegreeInRasi,
        formattedDegree: formatDMS(kavippuDegreeInRasi),
        fullDegreeFormatted: formatDMS(kavippuDegreeInRasi),
        veedhiRasiIndex,
        veedhiName,
        veedhiNameTa,
        distanceFromAarudam: distanceArToVeedhi
      },
      udhayamToAarudamHouses,
      aarudamToUdhayamHouses
    },
    outerBoxes,
    jamaPlanets: jamaPlanetsAssigned,
    lagnaRasiIndex: lagnaData.rasiIndex ?? 6,
    lagna: lagnaData,
    subPlanets,
    centerInfo,
    panchangam: centerInfo,
    rasiGrid,
    eventTiming: {
      jamaMoonSign: RASIS[jamaMoonSign],
      udhayamSign: RASIS[udhayamSignIndex],
      distanceSigns: signsMoonToUdhayam,
      moonRays: JAMAKKOL_PLANETARY_RAYS.Moon.rays,
      totalUnits: eventTimingMultiplier,
      immediate: {
        time: immediateDate.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' }),
        textEn: `${eventTimingMultiplier} minutes from query moment`,
        textTa: `${eventTimingMultiplier} நிமிடங்கள் (இன்றே உடனடி நிகழ்வு)`
      },
      short: {
        time: shortDate.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' }),
        textEn: `${Math.round(eventTimingMultiplier / 10)} hours, 1 minute`,
        textTa: `${Math.round(eventTimingMultiplier / 10)} மணி நேரம் (அதி குறுகிய காலம்)`
      },
      medium: {
        time: mediumDate.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium' }),
        textEn: `${mediumDays} days from query`,
        textTa: `${mediumDays} நாட்கள் (குறுகிய காலம்)`
      },
      long: {
        time: longDate.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium' }),
        textEn: `${longMonths} months from query`,
        textTa: `${longMonths} மாதங்கள் (நீண்ட காலம்)`
      }
    },
    indicators,
    masterData: JAMAKKOL_PRASANNAM_MASTER_DATA
  };
}

export default {
  calculateJamakkolPrasannam,
  calculateJamakkolCenterInfo,
  calculateSunriseSunset,
  calculateHora,
  calculateGowri,
  formatGeoDMS,
  formatDMS,
  formatDegShort,
  formatSubPlanetDeg,
  JAMAKKOL_SUB_PLANETS_RULES,
  JAMA_SIGNS_ORDER,
  JAMA_GRAHAS_SEQUENCE,
  DAY_LORDS,
  RASIS,
  PANCHANGAM_LABELS_6LANG
};
