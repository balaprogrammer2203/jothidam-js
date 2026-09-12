/**
 * Kadikara Prasannam (கடிகார பிரசன்னம் - Clock Horary Astrology) Calculation Engine
 * 
 * Multilingual Astrology Engine supporting 6 Languages:
 * English (en), Tamil (ta), Hindi (hi), Telugu (te), Kannada (kn), Malayalam (ml)
 * 
 * Based on traditional Tamil clock horary principles:
 * https://thirukanithapanchangam.com/kadigara-prasannam-calculator-tamil/
 */

import {
  getLocalizedPlanet,
  getLocalizedRasiName,
  getRasiLordName,
  getNakshatraLordName
} from '../config/constants';
import { getLocalizedNakshatra } from './astrologyLocalization';

// 12 Zodiac Signs in 6 languages (0-indexed: 0 = Mesham/Aries, 11 = Meenam/Pisces)
export const PRASANNAM_RASIS = [
  {
    id: 0,
    nameEn: 'Aries',
    nameTa: 'மேஷம்',
    nameHi: 'मेष',
    nameTe: 'మేషం',
    nameKn: 'ಮೇಷ',
    nameMl: 'മേടം',
    names: { en: 'Aries', ta: 'மேஷம்', hi: 'मेष', te: 'మేషం', kn: 'ಮೇಷ', ml: 'മേടം' },
    lordEn: 'Mars',
    lordTa: 'செவ்வாய்',
    lordHi: 'मंगल',
    lordTe: 'కుజుడు',
    lordKn: 'ಮಂಗಳ',
    lordMl: 'ചൊവ്വ',
    lords: { en: 'Mars', ta: 'செவ்வாய்', hi: 'मंगल', te: 'కుజుడు', kn: 'ಮಂಗಳ', ml: 'ചൊവ്വ' }
  },
  {
    id: 1,
    nameEn: 'Taurus',
    nameTa: 'ரிஷபம்',
    nameHi: 'वृषभ',
    nameTe: 'వృషభం',
    nameKn: 'ವೃಷಭ',
    nameMl: 'ഇടവം',
    names: { en: 'Taurus', ta: 'ரிஷபம்', hi: 'वृषभ', te: 'వృషభం', kn: 'ವೃಷಭ', ml: 'ഇടവം' },
    lordEn: 'Venus',
    lordTa: 'சுக்கிரன்',
    lordHi: 'शुक्र',
    lordTe: 'శుక్రుడు',
    lordKn: 'ಶುಕ್ರ',
    lordMl: 'ശുക്രൻ',
    lords: { en: 'Venus', ta: 'சுக்கிரன்', hi: 'शुक्र', te: 'శుక్రుడు', kn: 'ಶುಕ್ರ', ml: 'ശുക്രൻ' }
  },
  {
    id: 2,
    nameEn: 'Gemini',
    nameTa: 'மிதுனம்',
    nameHi: 'मिथुन',
    nameTe: 'మిథునం',
    nameKn: 'ಮಿಥುನ',
    nameMl: 'മിഥുനം',
    names: { en: 'Gemini', ta: 'மிதுனம்', hi: 'मिथुन', te: 'మిథునం', kn: 'ಮಿಥುನ', ml: 'മിഥുനം' },
    lordEn: 'Mercury',
    lordTa: 'புதன்',
    lordHi: 'बुध',
    lordTe: 'బుధుడు',
    lordKn: 'ಬುಧ',
    lordMl: 'ബുധൻ',
    lords: { en: 'Mercury', ta: 'புதன்', hi: 'बुध', te: 'బుధుడు', kn: 'ಬುಧ', ml: 'ബുധൻ' }
  },
  {
    id: 3,
    nameEn: 'Cancer',
    nameTa: 'கடகம்',
    nameHi: 'कर्क',
    nameTe: 'కర్కాటకం',
    nameKn: 'ಕರ್ಕಾಟಕ',
    nameMl: 'കർക്കിടകം',
    names: { en: 'Cancer', ta: 'கடகம்', hi: 'कर्क', te: 'కర్కాటకం', kn: 'ಕರ್ಕಾಟಕ', ml: 'കർക്കിടകം' },
    lordEn: 'Moon',
    lordTa: 'சந்திரன்',
    lordHi: 'चन्द्र',
    lordTe: 'చంద్రుడు',
    lordKn: 'ಚಂದ್ರ',
    lordMl: 'ചന്ദ്രൻ',
    lords: { en: 'Moon', ta: 'சந்திரன்', hi: 'चन्द्र', te: 'చంద్రుడు', kn: 'ಚಂದ್ರ', ml: 'ചന്ദ്രൻ' }
  },
  {
    id: 4,
    nameEn: 'Leo',
    nameTa: 'சிம்மம்',
    nameHi: 'सिंह',
    nameTe: 'సింహం',
    nameKn: 'ಸಿಂಹ',
    nameMl: 'ചിങ്ങം',
    names: { en: 'Leo', ta: 'சிம்மம்', hi: 'सिंह', te: 'సింహం', kn: 'ಸಿಂಹ', ml: 'ചിങ്ങം' },
    lordEn: 'Sun',
    lordTa: 'சூரியன்',
    lordHi: 'सूर्य',
    lordTe: 'సూర్యుడు',
    lordKn: 'ಸೂರ್ಯ',
    lordMl: 'സൂര്യൻ',
    lords: { en: 'Sun', ta: 'சூரியன்', hi: 'सूर्य', te: 'సూర్యుడు', kn: 'ಸೂರ್ಯ', ml: 'സൂര്യൻ' }
  },
  {
    id: 5,
    nameEn: 'Virgo',
    nameTa: 'கன்னி',
    nameHi: 'कन्या',
    nameTe: 'కన్య',
    nameKn: 'ಕನ್ಯಾ',
    nameMl: 'കന്നി',
    names: { en: 'Virgo', ta: 'கன்னி', hi: 'कन्या', te: 'కన్య', kn: 'ಕನ್ಯಾ', ml: 'കന്നി' },
    lordEn: 'Mercury',
    lordTa: 'புதன்',
    lordHi: 'बुध',
    lordTe: 'బుధుడు',
    lordKn: 'ಬುಧ',
    lordMl: 'ബുധൻ',
    lords: { en: 'Mercury', ta: 'புதன்', hi: 'बुध', te: 'బుధుడు', kn: 'ಬುಧ', ml: 'ബുധൻ' }
  },
  {
    id: 6,
    nameEn: 'Libra',
    nameTa: 'துலாம்',
    nameHi: 'तुला',
    nameTe: 'తుల',
    nameKn: 'ತುಲಾ',
    nameMl: 'തുലാം',
    names: { en: 'Libra', ta: 'துலாம்', hi: 'तुला', te: 'తుల', kn: 'ತುಲಾ', ml: 'തുലാം' },
    lordEn: 'Venus',
    lordTa: 'சுக்கிரன்',
    lordHi: 'शुक्र',
    lordTe: 'శుక్రుడు',
    lordKn: 'ಶುಕ್ರ',
    lordMl: 'ശുക്രൻ',
    lords: { en: 'Venus', ta: 'சுக்கிரன்', hi: 'शुक्र', te: 'శుక్రుడు', kn: 'ಶುಕ್ರ', ml: 'ശുക്രൻ' }
  },
  {
    id: 7,
    nameEn: 'Scorpio',
    nameTa: 'விருச்சிகம்',
    nameHi: 'वृश्चिक',
    nameTe: 'వృశ్చికం',
    nameKn: 'ವೃಶ್ಚಿಕ',
    nameMl: 'വൃശ്ചികം',
    names: { en: 'Scorpio', ta: 'விருச்சிகம்', hi: 'वृश्चिक', te: 'వృశ్చికం', kn: 'ವೃಶ್ಚಿಕ', ml: 'വൃശ്ചികം' },
    lordEn: 'Mars',
    lordTa: 'செவ்வாய்',
    lordHi: 'मंगल',
    lordTe: 'కుజుడు',
    lordKn: 'ಮಂಗಳ',
    lordMl: 'ചൊവ്വ',
    lords: { en: 'Mars', ta: 'செவ்வாய்', hi: 'मंगल', te: 'కుజుడు', kn: 'ಮಂಗಳ', ml: 'ചൊവ്വ' }
  },
  {
    id: 8,
    nameEn: 'Sagittarius',
    nameTa: 'தனுசு',
    nameHi: 'धनु',
    nameTe: 'ధనుస్సు',
    nameKn: 'ಧನುಸ್ಸು',
    nameMl: 'ധനു',
    names: { en: 'Sagittarius', ta: 'தனுசு', hi: 'धनु', te: 'ధనుస్సు', kn: 'ಧನುಸ್ಸು', ml: 'ധനു' },
    lordEn: 'Jupiter',
    lordTa: 'குரு',
    lordHi: 'गुरु',
    lordTe: 'గురుడు',
    lordKn: 'ಗುರು',
    lordMl: 'വ്യാഴം',
    lords: { en: 'Jupiter', ta: 'குரு', hi: 'गुरु', te: 'గురుడు', kn: 'ಗುರು', ml: 'വ്യാഴം' }
  },
  {
    id: 9,
    nameEn: 'Capricorn',
    nameTa: 'மகரம்',
    nameHi: 'मकर',
    nameTe: 'మకరం',
    nameKn: 'ಮಕರ',
    nameMl: 'മകരം',
    names: { en: 'Capricorn', ta: 'மகரம்', hi: 'मकर', te: 'మకరం', kn: 'ಮಕರ', ml: 'മകരം' },
    lordEn: 'Saturn',
    lordTa: 'சனி',
    lordHi: 'शनि',
    lordTe: 'శని',
    lordKn: 'ಶನಿ',
    lordMl: 'ശനി',
    lords: { en: 'Saturn', ta: 'சனி', hi: 'शनि', te: 'శని', kn: 'ಶನಿ', ml: 'ശനി' }
  },
  {
    id: 10,
    nameEn: 'Aquarius',
    nameTa: 'கும்பம்',
    nameHi: 'कुम्भ',
    nameTe: 'కుంభం',
    nameKn: 'ಕುಂಭ',
    nameMl: 'കുംഭം',
    names: { en: 'Aquarius', ta: 'கும்பம்', hi: 'कुम्भ', te: 'కుంభం', kn: 'ಕುಂಭ', ml: 'കുംഭം' },
    lordEn: 'Saturn',
    lordTa: 'சனி',
    lordHi: 'शनि',
    lordTe: 'శని',
    lordKn: 'ಶನಿ',
    lordMl: 'ശനി',
    lords: { en: 'Saturn', ta: 'சனி', hi: 'शनि', te: 'శని', kn: 'ಶನಿ', ml: 'ശനി' }
  },
  {
    id: 11,
    nameEn: 'Pisces',
    nameTa: 'மீனம்',
    nameHi: 'मीन',
    nameTe: 'మీనం',
    nameKn: 'ಮೀನ',
    nameMl: 'മീനം',
    names: { en: 'Pisces', ta: 'மீனம்', hi: 'मीन', te: 'మీనం', kn: 'ಮೀನ', ml: 'മീനം' },
    lordEn: 'Jupiter',
    lordTa: 'குரு',
    lordHi: 'गुरु',
    lordTe: 'గురుడు',
    lordKn: 'ಗುರು',
    lordMl: 'വ്യാഴം',
    lords: { en: 'Jupiter', ta: 'குரு', hi: 'गुरु', te: 'గురుడు', kn: 'ಗುರು', ml: 'വ്യാഴം' }
  }
];

export const getLocalizedPrasannamRasiName = (rasiId, lang = 'ta') => {
  const r = PRASANNAM_RASIS[rasiId];
  if (!r) return '';
  return r.names?.[lang] || r.names?.ta || r.names?.en || r.nameTa || r.nameEn;
};

export const getLocalizedPrasannamRasiLord = (rasiId, lang = 'ta') => {
  const r = PRASANNAM_RASIS[rasiId];
  if (!r) return '';
  return r.lords?.[lang] || r.lords?.ta || r.lords?.en || r.lordTa || r.lordEn;
};

/**
 * 12 Bhava Predictions (1st house to 12th house distance) with 6 Languages
 */
export const BHAVA_PREDICTIONS = {
  1: {
    bhava: 1,
    titleTa: 'பூரண வெற்றி! (Excellent / உத்தமம்)',
    titleEn: 'Total Success! (Excellent)',
    title: {
      en: 'Total Success! (Excellent)',
      ta: 'பூரண வெற்றி! (Excellent / உத்தமம்)',
      hi: 'पूर्ण सफलता! (उत्कृष्ट)',
      te: 'పూర్తి విజయం! (ఉత్తమం)',
      kn: 'ಪೂರ್ಣ ಯಶಸ್ಸು! (ಉತ್ತಮ)',
      ml: 'പൂർണ്ണ വിജയം! (ഉത്തമം)'
    },
    statusEn: 'Excellent',
    statusTa: 'உத்தமம்',
    status: {
      en: 'Excellent',
      ta: 'உத்தமம்',
      hi: 'उत्कृष्ट',
      te: 'ఉత్తమం',
      kn: 'ಉತ್ತಮ',
      ml: 'ഉത്തമം'
    },
    ratingType: 'excellent',
    badgeColor: '#16a34a',
    badgeBg: '#00c288',
    percentage: 100,
    descTa: 'ஆரூடம் உதயத்துடனேயே (1-ஆம் இடம்) இணைந்துள்ளது. நீங்கள் நினைத்த காரியம் உடனடியாக எந்தவிதத் தடங்கலுமின்றி நிறைவேறும். உங்களின் முயற்சிகளுக்குத் தெய்வ பலமும் பிரபஞ்சமும் முழுமையாகத் துணை நிற்கும்.',
    descEn: 'Aarudam falls directly on Udhayam (1st House). Your intended endeavor will succeed immediately without any obstacles. Divine grace and universal alignment are strongly with you.',
    desc: {
      en: 'Aarudam falls directly on Udhayam (1st House). Your intended endeavor will succeed immediately without any obstacles. Divine grace and universal alignment are strongly with you.',
      ta: 'ஆரூடம் உதயத்துடனேயே (1-ஆம் இடம்) இணைந்துள்ளது. நீங்கள் நினைத்த காரியம் உடனடியாக எந்தவிதத் தடங்கலுமின்றி நிறைவேறும். உங்களின் முயற்சிகளுக்குத் தெய்வ பலமும் பிரபஞ்சமும் முழுமையாகத் துணை நிற்கும்.',
      hi: 'आरूढ़ सीधे उदय (प्रथम भाव) पर पड़ता है। आपका अभीष्ट कार्य बिना किसी बाधा के तुरंत सफल होगा। ईश्वरीय कृपा और ब्रह्मांडीय ऊर्जा आपके साथ है।',
      te: 'ఆరూఢం నేరుగా ఉదయంతో (1వ స్థానం) కలిసి ఉంది. మీరు తలపెట్టిన కార్యం ఎటువంటి ఆటంకం లేకుండా తక్షణమే నెరవేరుతుంది. దైవబలం మీకు పూర్తిగా తోడ్పడుతుంది.',
      kn: 'ಆರೂಢವು ನೇರವಾಗಿ ಉದಯದೊಂದಿಗೆ (1ನೇ ಸ್ಥಾನ) ಸೇರಿಕೊಂಡಿದೆ. ನೀವು ಅಂದುಕೊಂಡ ಕೆಲಸವು ಯಾವುದೇ ಅಡೆತಡೆಗಳಿಲ್ಲದೆ ತಕ್ಷಣವೇ ಈಡೇರುತ್ತದೆ. ದೈವಾನುಗ್ರಹವು ನಿಮ್ಮೊಂದಿಗಿದೆ.',
      ml: 'ആരൂഢം ഉദയത്തോടൊപ്പം (ഒന്നാം ഭാവം) സ്ഥിതി ചെയ്യുന്നു. നിങ്ങൾ വിചാരിച്ച കാര്യം യാതൊരു തടസ്സവുമില്ലാതെ ഉടൻ തന്നെ സഫലമാകും. ഈശ്വരാനുഗ്രഹം പൂർണ്ണമായും കൂടെയുണ്ട്.'
    },
    icon: 'fa-circle-check'
  },
  2: {
    bhava: 2,
    titleTa: 'தாமதம் or தடை (Delay / அதமம்)',
    titleEn: 'Delay & Obstacles (Delay / Denial)',
    title: {
      en: 'Delay & Obstacles (Delay / Denial)',
      ta: 'தாமதம் or தடை (Delay / அதமம்)',
      hi: 'विलंब और बाधा (Delay / अधम)',
      te: 'ఆలస్యం మరియు అడ్డంకులు (Delay / అధమం)',
      kn: 'ವಿಳಂಬ ಮತ್ತು ಅಡೆತಡೆಗಳು (Delay / ಅಧಮ)',
      ml: 'കാലതാമസവും തടസ്സങ്ങളും (Delay / അധമം)'
    },
    statusEn: 'Delay',
    statusTa: 'அதமம்',
    status: {
      en: 'Delay',
      ta: 'அதமம்',
      hi: 'विलंब / अधम',
      te: 'ఆలస్యం / అధమం',
      kn: 'ವಿಳಂಬ / ಅಧಮ',
      ml: 'കാലതാമസം / അധമം'
    },
    ratingType: 'delay',
    badgeColor: '#dc2626',
    badgeBg: '#ff5b79',
    percentage: 30,
    descTa: 'உதயத்திலிருந்து ஆரூடம் 2-ஆம் இடத்திலும், ஆரூடத்திலிருந்து உதயம் 12-ஆம் இடத்திலும் (2-12 விரய / தாமத தொடர்பு) அமைவதால் காரியத்தில் காலதாமதமும் இழுபறியும் ஏற்படும். உடனடியாக நினைத்த பலன் கிடைப்பது கடினம்.',
    descEn: 'Aarudam is 2nd from Udhayam and Udhayam is 12th from Aarudam (2-12 Dwidwadasa connection). Expect delay, friction, and initial obstacles before completion.',
    desc: {
      en: 'Aarudam is 2nd from Udhayam and Udhayam is 12th from Aarudam (2-12 Dwidwadasa connection). Expect delay, friction, and initial obstacles before completion.',
      ta: 'உதயத்திலிருந்து ஆரூடம் 2-ஆம் இடத்திலும், ஆரூடத்திலிருந்து உதயம் 12-ஆம் இடத்திலும் (2-12 விரய / தாமத தொடர்பு) அமைவதால் காரியத்தில் காலதாமதமும் இழுபறியும் ஏற்படும். உடனடியாக நினைத்த பலன் கிடைப்பது கடினம்.',
      hi: 'उदय से आरूढ़ द्वितीय और आरूढ़ से उदय द्वादश भाव (2-12 संबंध) में होने से कार्य में देरी और रुकावटें आएंगी। तत्काल परिणाम मिलना कठिन है।',
      te: 'ఉదయం నుండి ఆరూఢం 2వ స్థానంలో, ఆరూఢం నుండి ఉదయం 12వ స్థానంలో (2-12 సంబంధం) ఉండటం వల్ల పనిలో జాప్యం మరియు ఆటంకాలు ఎదురవుతాయి.',
      kn: 'ಉದಯದಿಂದ ಆರೂಢವು 2ನೇ ಸ್ಥಾನದಲ್ಲಿ ಮತ್ತು ಆರೂಢದಿಂದ ಉದಯವು 12ನೇ ಸ್ಥಾನದಲ್ಲಿದ್ದು (2-12 ಸಂಬಂಧ), ಕಾರ್ಯದಲ್ಲಿ ವಿಳಂಬ ಮತ್ತು ಎಳೆದಾಟ ಉಂಟಾಗುತ್ತದೆ.',
      ml: 'ഉദയത്തിൽ നിന്ന് ആരൂഢം 2-ാം ഭാവത്തിലും ആരൂഢത്തിൽ നിന്ന് ഉദയം 12-ാം ഭാവത്തിലും (2-12 ബന്ധം) വരുന്നതിനാൽ കാര്യങ്ങളിൽ കാലതാമസവും അനിശ്ചിതത്വവും ഉണ്ടാകും.'
    },
    icon: 'fa-clock'
  },
  3: {
    bhava: 3,
    titleTa: 'முயற்சியால் வெற்றி (Very Good / உத்தமம்)',
    titleEn: 'Success Through Effort (Very Good)',
    title: {
      en: 'Success Through Effort (Very Good)',
      ta: 'முயற்சியால் வெற்றி (Very Good / உத்தமம்)',
      hi: 'प्रयास से सफलता (अति उत्तम)',
      te: 'ప్రయత్నంతో విజయం (చాలా మంచిది)',
      kn: 'ಪ್ರಯತ್ನದಿಂದ ಯಶಸ್ಸು (ಅತ್ಯುತ್ತಮ)',
      ml: 'പരിശ്രമത്തിലൂടെ വിജയം (വളരെ നല്ലത്)'
    },
    statusEn: 'Very Good',
    statusTa: 'உத்தமம்',
    status: {
      en: 'Very Good',
      ta: 'உத்தமம்',
      hi: 'अति उत्तम',
      te: 'చాలా మంచిది',
      kn: 'ಅತ್ಯುತ್ತಮ',
      ml: 'വളരെ നല്ലത്'
    },
    ratingType: 'very-good',
    badgeColor: '#16a34a',
    badgeBg: '#00c288',
    percentage: 90,
    descTa: 'ஆரூடம் 3-ஆம் இடத்தில் (தைரிய/முயற்சி ஸ்தானம்) மற்றும் ஆரூடத்திலிருந்து உதயம் 11-ஆம் இடத்தில் (லாப ஸ்தானம்) அமைவதால், உங்களின் விடாமுயற்சியால் நினைத்த காரியம் மிகச் சிறப்பாக வெற்றி பெறும்.',
    descEn: 'Aarudam is 3rd from Udhayam and Udhayam is 11th from Aarudam (3-11 connection). Your effort and courage will bring very good success and positive outcome.',
    desc: {
      en: 'Aarudam is 3rd from Udhayam and Udhayam is 11th from Aarudam (3-11 connection). Your effort and courage will bring very good success and positive outcome.',
      ta: 'ஆரூடம் 3-ஆம் இடத்தில் (தைரிய/முயற்சி ஸ்தானம்) மற்றும் ஆரூடத்திலிருந்து உதயம் 11-ஆம் இடத்தில் (லாப ஸ்தானம்) அமைவதால், உங்களின் விடாமுயற்சியால் நினைத்த காரியம் மிகச் சிறப்பாக வெற்றி பெறும்.',
      hi: 'आरूढ़ तृतीय भाव में और उदय एकादश भाव (3-11 लाभ संबंध) में होने से आपके साहस और परिश्रम से बहुत अच्छी सफलता मिलेगी।',
      te: 'ఆరూఢం 3వ స్థానంలో మరియు ఉదయం 11వ స్థానంలో (3-11 లాభ సంబంధం) ఉండటంతో మీ పట్టుదలతో తలపెట్టిన కార్యం గొప్ప విజయం సాధిస్తుంది.',
      kn: 'ಆರೂಢವು 3ನೇ ಸ್ಥಾನದಲ್ಲಿ ಮತ್ತು ಉದಯವು 11ನೇ ಸ್ಥಾನದಲ್ಲಿದ್ದು (3-11 ಸಂಬಂಧ), ನಿಮ್ಮ ಧೈರ್ಯ ಮತ್ತು ಪರಿಶ್ರಮದಿಂದ ಕಾರ್ಯವು ಅತ್ಯುತ್ತಮವಾಗಿ ಸಫಲವಾಗುತ್ತದೆ.',
      ml: 'ആരൂഢം 3-ാം ഭാവത്തിലും ഉദയം 11-ാം ഭാവത്തിലും (3-11 ലാഭഭാവം) നിൽക്കുന്നതിനാൽ നിങ്ങളുടെ ആത്മാർത്ഥ പരിശ്രമത്തിലൂടെ കാര്യം വിജയകരമായി പൂർത്തിയാകും.'
    },
    icon: 'fa-hand-fist'
  },
  4: {
    bhava: 4,
    titleTa: 'சுகம் மற்றும் சொத்து லாபம் (Good / சாதகம்)',
    titleEn: 'Comfort & Property Success (Good)',
    title: {
      en: 'Comfort & Property Success (Good)',
      ta: 'சுகம் மற்றும் சொத்து லாபம் (Good / சாதகம்)',
      hi: 'सुख एवं संपत्ति लाभ (अनुकूल)',
      te: 'సుఖం మరియు ఆస్తి లాభం (అనుకూలం)',
      kn: 'ಸುಖ ಮತ್ತು ಆಸ್ತಿ ಲಾಭ (ಅನುಕೂಲ)',
      ml: 'സുഖവും സ്വത്ത് ലാഭവും (അനുകൂലം)'
    },
    statusEn: 'Good',
    statusTa: 'சாதகம்',
    status: {
      en: 'Good',
      ta: 'சாதகம்',
      hi: 'अनुकूल',
      te: 'అనుకూలం',
      kn: 'ಅನುಕೂಲ',
      ml: 'അനുകൂലം'
    },
    ratingType: 'good',
    badgeColor: '#ea580c',
    badgeBg: '#f89762',
    percentage: 80,
    descTa: 'ஆரூடம் 4-ஆம் இடத்தில் (சுக ஸ்தானம்) மற்றும் ஆரூடத்திலிருந்து உதயம் 10-ஆம் இடத்தில் அமைந்து நல்ல சாதகமான பலனைத் தரும். நிலம், வீடு, வாகனம் வாங்குதல் அல்லது சுப காரியங்கள் சுமூகமாக நிறைவேறும்.',
    descEn: 'Aarudam is in the 4th house (Comfort & Assets) and Udhayam is 10th from Aarudam (4-10 connection). Good and favorable outcome for property, family joy, and endeavors.',
    desc: {
      en: 'Aarudam is in the 4th house (Comfort & Assets) and Udhayam is 10th from Aarudam (4-10 connection). Good and favorable outcome for property, family joy, and endeavors.',
      ta: 'ஆரூடம் 4-ஆம் இடத்தில் (சுக ஸ்தானம்) மற்றும் ஆரூடத்திலிருந்து உதயம் 10-ஆம் இடத்தில் அமைந்து நல்ல சாதகமான பலனைத் தரும். நிலம், வீடு, வாகனம் வாங்குதல் அல்லது சுப காரியங்கள் சுமூகமாக நிறைவேறும்.',
      hi: 'आरूढ़ चतुर्थ भाव (सुख स्थान) में होने से संपत्ति, वाहन, परिवार और नए कार्यों में अच्छा और अनुकूल परिणाम मिलेगा।',
      te: 'ఆరూఢం 4వ స్థానంలో ఉండటం వల్ల ఇల్లు, వాహనం, ఆస్తుల కొనుగోలు మరియు కుటుంబ వ్యవహారాలలో మంచి అనుకూల ఫలితం లభిస్తుంది.',
      kn: 'ಆರೂಢವು 4ನೇ ಸ್ಥಾನದಲ್ಲಿದ್ದು (ಸುಖ ಸ್ಥಾನ), ಆಸ್ತಿ, ಮನೆ, ವಾಹನ ಖರೀದಿ ಮತ್ತು ಶುಭ ಕಾರ್ಯಗಳು ಸುಸೂತ್ರವಾಗಿ ನೆರವೇರುತ್ತವೆ.',
      ml: 'ആരൂഢം 4-ാം ഭാവത്തിൽ (സുഖസ്ഥാനം) വരുന്നതിനാൽ ഭൂമി, വീട്, വാഹനം എന്നിവ വാങ്ങുന്നതിനും കുടുംബ കാര്യങ്ങൾക്കും നല്ല അനുകൂല ഫലം ലഭിക്കും.'
    },
    icon: 'fa-house-chimney'
  },
  5: {
    bhava: 5,
    titleTa: 'பூர்வ புண்ணிய பலன் (Good / சாதகம்)',
    titleEn: 'Divine Merit & Fruition (Good)',
    title: {
      en: 'Divine Merit & Fruition (Good)',
      ta: 'பூர்வ புண்ணிய பலன் (Good / சாதகம்)',
      hi: 'पूर्व पुण्य और ईश्वरीय कृपा (अनुकूल)',
      te: 'పూర్వ పుణ్య ఫలం (అనుకూలం)',
      kn: 'ಪೂರ್ವ ಪುಣ್ಯ ಫಲ (ಅನುಕೂಲ)',
      ml: 'പൂർവ്വപുണ്യ ഫലം (അനുകൂലം)'
    },
    statusEn: 'Good',
    statusTa: 'சாதகம்',
    status: {
      en: 'Good',
      ta: 'சாதகம்',
      hi: 'अनुकूल',
      te: 'అనుకూలం',
      kn: 'ಅನುಕೂಲ',
      ml: 'അനുകൂലം'
    },
    ratingType: 'good',
    badgeColor: '#ea580c',
    badgeBg: '#f89762',
    percentage: 85,
    descTa: 'ஆரூடம் 5-ஆம் இடத்தில் (பூர்வ புண்ணிய ஸ்தானம்) மற்றும் ஆரூடத்திலிருந்து உதயம் 9-ஆம் இடத்தில் (பாக்கிய ஸ்தானம்) அமைந்து நல்ல சாதகமான பலனைத் தரும். புதிய தொடக்கங்கள், ஆன்மீக அருள் மற்றும் நினைத்த காரியங்கள் கைகூடும்.',
    descEn: 'Aarudam is in the 5th house and Udhayam in the 9th house (5-9 Kona connection). Good and favorable blessings, luck, and successful fruition.',
    desc: {
      en: 'Aarudam is in the 5th house and Udhayam in the 9th house (5-9 Kona connection). Good and favorable blessings, luck, and successful fruition.',
      ta: 'ஆரூடம் 5-ஆம் இடத்தில் (பூர்வ புண்ணிய ஸ்தானம்) மற்றும் ஆரூடத்திலிருந்து உதயம் 9-ஆம் இடத்தில் (பாக்கிய ஸ்தானம்) அமைந்து நல்ல சாதகமான பலனைத் தரும். புதிய தொடக்கங்கள், ஆன்மீக அருள் மற்றும் நினைத்த காரியங்கள் கைகூடும்.',
      hi: 'आरूढ़ पंचम भाव और उदय नवम भाव (5-9 त्रिकोण संबंध) में होने से ईश्वरीय कृपा, भाग्य और अनुकूल सफलता प्राप्त होगी।',
      te: 'ఆరూఢం 5వ స్థానంలో మరియు ఉదయం 9వ స్థానంలో (5-9 త్రికోణ సంబంధం) ఉండటం వల్ల దైవానుగ్రహం, అదృష్టం కలిసివస్తాయి.',
      kn: 'ಆರೂಢವು 5ನೇ ಸ್ಥಾನದಲ್ಲಿ ಮತ್ತು ಉದಯವು 9ನೇ ಸ್ಥಾನದಲ್ಲಿದ್ದು (5-9 ತ್ರಿಕೋಣ ಸಂಬಂಧ), ಪೂರ್ವ ಪುಣ್ಯ ಮತ್ತು ದೈವಾನುಗ್ರಹದಿಂದ ಕಾರ್ಯಗಳು ಕೈಗೂಡುತ್ತವೆ.',
      ml: 'ആരൂഢം 5-ാം ഭാവത്തിലും ഉദയം 9-ാം ഭാവത്തിലും (5-9 ത്രികോണ ബന്ധം) വരുന്നതിനാൽ ഈശ്വരാധീനവും ഭാഗ്യവും കൊണ്ട് കാര്യങ്ങൾ അനുകൂലമായി ഭവിക്കും.'
    },
    icon: 'fa-star'
  },
  6: {
    bhava: 6,
    titleTa: 'காரியத் தடை / தோல்வி (Failure / அதமம்)',
    titleEn: 'Obstacle & Failure (Failure)',
    title: {
      en: 'Obstacle & Failure (Failure)',
      ta: 'காரியத் தடை / தோல்வி (Failure / அதமம்)',
      hi: 'बाधा और असफलता (विफलता)',
      te: 'ఆటంకం మరియు వైఫల్యం (వైఫల్యం)',
      kn: 'ಅಡೆತಡೆ ಮತ್ತು ವಿಫಲತೆ (ವಿಫಲತೆ)',
      ml: 'കാര്യ തടസ്സം / പരാജയം (പരാജയം)'
    },
    statusEn: 'Failure',
    statusTa: 'அதமம்',
    status: {
      en: 'Failure',
      ta: 'அதமம்',
      hi: 'विफलता / अधम',
      te: 'వైఫల్యం / అధమం',
      kn: 'ವಿಫಲತೆ / ಅಧಮ',
      ml: 'പരാജയം / അധമം'
    },
    ratingType: 'failure',
    badgeColor: '#dc2626',
    badgeBg: '#ff5b79',
    percentage: 20,
    descTa: 'ஆரூடம் 6-ஆம் இடத்தில் (ரோக/சத்ரு ஸ்தானம்) மற்றும் ஆரூடத்திலிருந்து உதயம் 8-ஆம் இடத்தில் (அஷ்டம ஸ்தானம் - 6-8 சஷ்டாஷ்டக தொடர்பு) அமைவதால் கடன், நோய், எதிரிகள் அல்லது காரியத் தோல்வி ஏற்பட வாய்ப்புள்ளது. புதிய முக்கிய முடிவுகளைத் தள்ளிப்போடுவது நலம்.',
    descEn: 'Aarudam is placed in the 6th house and Udhayam in the 8th house (6-8 Shashtashtaka connection). High likelihood of obstacles, opposition, or failure. Postponing crucial new decisions is advised.',
    desc: {
      en: 'Aarudam is placed in the 6th house and Udhayam in the 8th house (6-8 Shashtashtaka connection). High likelihood of obstacles, opposition, or failure. Postponing crucial new decisions is advised.',
      ta: 'ஆரூடம் 6-ஆம் இடத்தில் (ரோக/சத்ரு ஸ்தானம்) மற்றும் ஆரூடத்திலிருந்து உதயம் 8-ஆம் இடத்தில் (அஷ்டம ஸ்தானம் - 6-8 சஷ்டாஷ்டக தொடர்பு) அமைவதால் கடன், நோய், எதிரிகள் அல்லது காரியத் தோல்வி ஏற்பட வாய்ப்புள்ளது. புதிய முக்கிய முடிவுகளைத் தள்ளிப்போடுவது நலம்.',
      hi: 'आरूढ़ षष्ठ भाव और उदय अष्टम भाव (6-8 षडाष्टक संबंध) में होने से बाधाएं, शत्रु या असफलता की संभावना है। महत्वपूर्ण निर्णय टालना उचित होगा।',
      te: 'ఆరూఢం 6వ స్థానంలో మరియు ఉదయం 8వ స్థానంలో (6-8 షష్టాష్టక సంబంధం) ఉండటం వల్ల శత్రువులు, వివాదాలు లేదా వైఫల్యం కలగవచ్చు. కొత్త నిర్ణయాలు వాయిదా వేయడం మంచిది.',
      kn: 'ಆರೂಢವು 6ನೇ ಸ್ಥಾನದಲ್ಲಿ ಮತ್ತು ಉದಯವು 8ನೇ ಸ್ಥಾನದಲ್ಲಿದ್ದು (6-8 ಷಡಾಷ್ಟಕ ಸಂಬಂಧ), ಅಡೆತಡೆಗಳು ಅಥವಾ ವಿಫಲತೆ ಉಂಟಾಗುವ ಸಂಭವವಿದೆ. ಪ್ರಮುಖ ನಿರ್ಧಾರಗಳನ್ನು ಮುಂದೂಡುವುದು ಉತ್ತಮ.',
      ml: 'ആരൂഢം 6-ാം ഭാവത്തിലും ഉദയം 8-ാം ഭാവത്തിലും (6-8 ഷഡാഷ്ടക ബന്ധം) വരുന്നതിനാൽ കടം, ശത്രുക്കൾ അല്ലെങ്കിൽ പരാജയം എന്നിവയ്ക്ക് സാധ്യതയുണ്ട്. പ്രധാന തീരുമാനങ്ങൾ മാറ്റിവെക്കുന്നത് ഉചിതം.'
    },
    icon: 'fa-triangle-exclamation'
  },
  7: {
    bhava: 7,
    titleTa: 'கூட்டுத் தொழில் & களத்திரம் (Normal / சாதகம்)',
    titleEn: 'Partnership & Marriage (Normal)',
    title: {
      en: 'Partnership & Marriage (Normal)',
      ta: 'கூட்டுத் தொழில் & களத்திரம் (Normal / சாதகம்)',
      hi: 'साझेदारी और विवाह (सामान्य)',
      te: 'భాగస్వామ్యం మరియు వివాహం (సాధారణం)',
      kn: 'ಪಾಲುದಾರಿಕೆ ಮತ್ತು ವಿವಾಹ (ಸಾಮಾನ್ಯ)',
      ml: 'കൂട്ടുബിസിനസും വിവാഹവും (സാധാരണം)'
    },
    statusEn: 'Normal',
    statusTa: 'சாதகம்',
    status: {
      en: 'Normal',
      ta: 'சாதகம்',
      hi: 'सामान्य / अनुकूल',
      te: 'సాధారణం / అనుకూలం',
      kn: 'ಸಾಮಾನ್ಯ / ಅನುಕೂಲ',
      ml: 'സാധാരണം / അനുകൂലം'
    },
    ratingType: 'normal',
    badgeColor: '#ea580c',
    badgeBg: '#f89762',
    percentage: 70,
    descTa: 'ஆரூடம் 7-ஆம் இடத்தில் (களத்திர ஸ்தானம்) மற்றும் ஆரூடத்திலிருந்து உதயம் 7-ஆம் இடத்தில் (சமசப்தம பார்வை) அமைந்து சாதகமான பலனைத் தரும். கூட்டு முயற்சிகள், திருமணம் மற்றும் புதிய ஒப்பந்தங்களுக்கு உகந்தது.',
    descEn: 'Aarudam is in the 7th house and Udhayam in the 7th house (7-7 direct aspect). Normal and favorable outcome for partnerships, marriage, and negotiations.',
    desc: {
      en: 'Aarudam is in the 7th house and Udhayam in the 7th house (7-7 direct aspect). Normal and favorable outcome for partnerships, marriage, and negotiations.',
      ta: 'ஆரூடம் 7-ஆம் இடத்தில் (களத்திர ஸ்தானம்) மற்றும் ஆரூடத்திலிருந்து உதயம் 7-ஆம் இடத்தில் (சமசப்தம பார்வை) அமைந்து சாதகமான பலனைத் தரும். கூட்டு முயற்சிகள், திருமணம் மற்றும் புதிய ஒப்பந்தங்களுக்கு உகந்தது.',
      hi: 'आरूढ़ सप्तम भाव में और परस्पर दृष्टि (7-7 संबंध) होने से साझेदारी, विवाह और बातचीत के लिए सामान्य व अनुकूल परिणाम रहेंगे।',
      te: 'ఆరూఢం 7వ స్థానంలో సమసప్తక దృష్టిలో ఉండటం వల్ల భాగస్వామ్య వ్యాపారాలు, వివాహ సంబంధాలు మరియు నూతన ఒప్పందాలకు అనుకూలం.',
      kn: 'ಆರೂಢವು 7ನೇ ಸ್ಥಾನದಲ್ಲಿ ಸಮಸಪ್ತಕ ದೃಷ್ಟಿಯಲ್ಲಿದ್ದು, ಪಾಲುದಾರಿಕೆ, ವಿವಾಹ ಮತ್ತು ಮಾತುಕತೆಗಳಿಗೆ ಸಾಮಾನ್ಯ ಹಾಗೂ ಅನುಕೂಲಕರ ಫಲ ನೀಡುತ್ತದೆ.',
      ml: 'ആരൂഢം 7-ാം ഭാവത്തിൽ സമസപ്തക ദൃഷ്ടിയിലായതിനാൽ കൂട്ടുകച്ചവടം, വിവാഹം, പുതിയ കരാറുകൾ എന്നിവയ്ക്ക് പൊതുവേ അനുകൂല ഫലം നൽകും.'
    },
    icon: 'fa-handshake'
  },
  8: {
    bhava: 8,
    titleTa: 'காரியத் தடை / தோல்வி (Failure / அதமம்)',
    titleEn: 'Obstacle & Failure (Failure)',
    title: {
      en: 'Obstacle & Failure (Failure)',
      ta: 'காரியத் தடை / தோல்வி (Failure / அதமம்)',
      hi: 'बाधा और हानि (विफलता)',
      te: 'తీవ్ర ఆటంకం మరియు నష్టం (వైఫల్యం)',
      kn: 'ತೀವ್ರ ಅಡೆತಡೆ ಮತ್ತು ನಷ್ಟ (ವಿಫಲತೆ)',
      ml: 'കാര്യ തടസ്സം / നഷ്ടം (പരാജയം)'
    },
    statusEn: 'Failure',
    statusTa: 'அதமம்',
    status: {
      en: 'Failure',
      ta: 'அதமம்',
      hi: 'विफलता / अधम',
      te: 'వైఫల్యం / అధమం',
      kn: 'ವಿಫಲತೆ / ಅಧಮ',
      ml: 'പരാജയം / അധമം'
    },
    ratingType: 'failure',
    badgeColor: '#dc2626',
    badgeBg: '#ff5b79',
    percentage: 10,
    descTa: 'ஆரூடம் 8-ஆம் இடத்தில் (அஷ்டம ஸ்தானம்) மறைவதால் எதிர்பாராத ஏமாற்றம், பொருள் இழப்பு அல்லது தேவையற்ற அலைச்சல் வரக்கூடும். அவசர முடிவுகளை அறவே தவிர்த்து அமைதி காக்கவும்.',
    descEn: 'Aarudam is in the 8th house (Ashtama / Peril). Anticipate unexpected delays, disappointments, or hindrances. Avoid crucial investments or risks at this hour.',
    desc: {
      en: 'Aarudam is in the 8th house (Ashtama / Peril). Anticipate unexpected delays, disappointments, or hindrances. Avoid crucial investments or risks at this hour.',
      ta: 'ஆரூடம் 8-ஆம் இடத்தில் (அஷ்டம ஸ்தானம்) மறைவதால் எதிர்பாராத ஏமாற்றம், பொருள் இழப்பு அல்லது தேவையற்ற அலைச்சல் வரக்கூடும். அவசர முடிவுகளை அறவே தவிர்த்து அமைதி காக்கவும்.',
      hi: 'आरूढ़ अष्टम भाव (अष्टम स्थान) में होने से अप्रत्याशित निराशा, धन हानि या रुकावटें आ सकती हैं। जोखिम भरे निर्णयों से बचें।',
      te: 'ఆరూఢం 8వ స్థానంలో ఉండటం వల్ల ఊహించని నష్టం, ఆశాభంగం లేదా శ్రమ కలగవచ్చు. తొందరపాటు నిర్ణయాలు తీసుకోరాదు.',
      kn: 'ಆರೂಢವು 8ನೇ ಸ್ಥಾನದಲ್ಲಿದ್ದು (ಅಷ್ಟಮ ಸ್ಥಾನ), ಅನಿರೀಕ್ಷಿತ ನಿರಾಶೆ, ಧನ ನಷ್ಟ ಅಥವಾ ತೊಂದರೆಗಳು ಬರಬಹುದು. ಆತುರದ ನಿರ್ಧಾರಗಳನ್ನು ತಪ್ಪಿಸಿ.',
      ml: 'ആരൂഢം 8-ാം ഭാവത്തിൽ (അഷ്ടമ ഭാവം) നിൽക്കുന്നതിനാൽ അപ്രതീക്ഷിത നഷ്ടം, തടസ്സങ്ങൾ അല്ലെങ്കിൽ അനാവശ്യ അലച്ചിൽ എന്നിവ ഉണ്ടാകാം. ഈ സമയത്ത് റിസ്ക് എടുക്കരുത്.'
    },
    icon: 'fa-ban'
  },
  9: {
    bhava: 9,
    titleTa: 'பாக்கிய ஸ்தானம் - அதிர்ஷ்டம் (Good / சாதகம்)',
    titleEn: 'Fortune & Divine Blessing (Good)',
    title: {
      en: 'Fortune & Divine Blessing (Good)',
      ta: 'பாக்கிய ஸ்தானம் - அதிர்ஷ்டம் (Good / சாதகம்)',
      hi: 'भाग्य और ईश्वरीय कृपा (अनुकूल)',
      te: 'భాగ్య స్థానం - అదృష్టం (అనుకూలం)',
      kn: 'ಭಾಗ್ಯ ಸ್ಥಾನ - ಅದೃಷ್ಟ (ಅನುಕೂಲ)',
      ml: 'ഭാഗ്യസ്ഥാനം - ഈശ്വരാധീനം (അനുകൂലം)'
    },
    statusEn: 'Good',
    statusTa: 'சாதகம்',
    status: {
      en: 'Good',
      ta: 'சாதகம்',
      hi: 'अनुकूल / भाग्यशाली',
      te: 'అనుకూలం / భాగ్యం',
      kn: 'ಅನುಕೂಲ / ಭಾಗ್ಯ',
      ml: 'അനുകൂലം / ഭാഗ്യം'
    },
    ratingType: 'good',
    badgeColor: '#ea580c',
    badgeBg: '#f89762',
    percentage: 90,
    descTa: 'ஆரூடம் 9-ஆம் இடத்தில் (பாக்கிய ஸ்தானம்) வீற்றிருக்கிறது. தந்தை வழியில் நன்மை, உயர் பதவி, வெளிநாட்டுப் பயணம், ஆன்மீக அருள் மற்றும் எதிர்பாராத யோகங்கள் தேடி வரும். காரியம் உறுதியாக வெல்லும்.',
    descEn: 'Aarudam is in the 9th house (Fortune & Dharma). Tremendous luck, support from mentors/elders, long-distance journeys, and auspicious opportunities will materialize.',
    desc: {
      en: 'Aarudam is in the 9th house (Fortune & Dharma). Tremendous luck, support from mentors/elders, long-distance journeys, and auspicious opportunities will materialize.',
      ta: 'ஆரூடம் 9-ஆம் இடத்தில் (பாக்கிய ஸ்தானம்) வீற்றிருக்கிறது. தந்தை வழியில் நன்மை, உயர் பதவி, வெளிநாட்டுப் பயணம், ஆன்மீக அருள் மற்றும் எதிர்பாராத யோகங்கள் தேடி வரும். காரியம் உறுதியாக வெல்லும்.',
      hi: 'आरूढ़ नवम भाव (भाग्य स्थान) में स्थित है। पिता का सहयोग, उच्च पद, यात्रा और आध्यात्मिक आशीर्वाद से सफलता सुनिश्चित है।',
      te: 'ఆరూఢం 9వ స్థానంలో (భాగ్య స్థానం) ఉండటం వల్ల తండ్రి తరపు సహకారం, ఉన్నత పదవి, ప్రయాణాలు మరియు అదృష్టం కలిసివచ్చి కార్యం విజయవంతమవుతుంది.',
      kn: 'ಆರೂಢವು 9ನೇ ಸ್ಥಾನದಲ್ಲಿದ್ದು (ಭಾಗ್ಯ ಸ್ಥಾನ), ಹಿರಿಯರ ಬೆಂಬಲ, ಉನ್ನತ ಸ್ಥಾನಮಾನ, ಧಾರ್ಮಿಕ ಆಶೀರ್ವಾದ ಮತ್ತು ಯಶಸ್ಸು ಖಚಿತವಾಗಿ ದೊರೆಯುತ್ತದೆ.',
      ml: 'ആരൂഢം 9-ാം ഭാവത്തിൽ (ഭാഗ്യസ്ഥാനം) നിൽക്കുന്നതിനാൽ പിതൃതുല്യരുടെ സഹായം, ഉന്നത പദവി, ഭാഗ്യാനുഭവങ്ങൾ എന്നിവയാൽ കാര്യം തീർച്ചയായും വിജയിക്കും.'
    },
    icon: 'fa-plane-departure'
  },
  10: {
    bhava: 10,
    titleTa: 'தொழில் போராட்டம் (Hard Luck / அதமம்)',
    titleEn: 'Professional Struggle (Hard Luck)',
    title: {
      en: 'Professional Struggle (Hard Luck)',
      ta: 'தொழில் போராட்டம் (Hard Luck / அதமம்)',
      hi: 'कार्यक्षेत्र में संघर्ष (कठिन)',
      te: 'వృత్తిరంగంలో పోరాటం (కష్టం)',
      kn: 'ಉದ್ಯೋಗದಲ್ಲಿ ಹೋರಾಟ (ಕಠಿಣ)',
      ml: 'തൊഴിൽരംഗത്തെ പോരാട്ടം (പ്രയാസം)'
    },
    statusEn: 'Hard Luck',
    statusTa: 'அதமம்',
    status: {
      en: 'Hard Luck',
      ta: 'அதமம்',
      hi: 'कठिन परिश्रम / अधम',
      te: 'కష్ట సాధ్యం / అధమం',
      kn: 'ಕಠಿಣ ಶ್ರಮ / ಅಧಮ',
      ml: 'കഠിന പ്രയത്നം / അധമം'
    },
    ratingType: 'hard',
    badgeColor: '#f43f5e',
    badgeBg: '#ff5b79',
    percentage: 35,
    descTa: 'உதயத்திலிருந்து ஆரூடம் 10-ஆம் இடத்திலும், ஆரூடத்திலிருந்து உதயம் 4-ஆம் இடத்திலும் அமைவதால் கடுமையான போராட்டமும் இழுபறியும் இருக்கும். தொழில்ரீதியான பொறுப்புகள் கூடும்; எளிதில் முடியக்கூடிய காரியம் கூட கடின உழைப்பைக் கோரும்.',
    descEn: 'Aarudam is in the 10th house from Udhayam (and Udhayam in 4th from Aarudam). Significant struggle, pressure, and testing conditions prevail. Even simple tasks require excessive toil.',
    desc: {
      en: 'Aarudam is in the 10th house from Udhayam (and Udhayam in 4th from Aarudam). Significant struggle, pressure, and testing conditions prevail. Even simple tasks require excessive toil.',
      ta: 'உதயத்திலிருந்து ஆரூடம் 10-ஆம் இடத்திலும், ஆரூடத்திலிருந்து உதயம் 4-ஆம் இடத்திலும் அமைவதால் கடுமையான போராட்டமும் இழுபறியும் இருக்கும். தொழில்ரீதியான பொறுப்புகள் கூடும்; எளிதில் முடியக்கூடிய காரியம் கூட கடின உழைப்பைக் கோரும்.',
      hi: 'उदय से आरूढ़ दशम भाव में होने से कार्यक्षेत्र में दबाव और संघर्ष रहेगा। सरल कार्यों के लिए भी अधिक मेहनत करनी पड़ेगी।',
      te: 'ఉదయం నుండి ఆరూఢం 10వ స్థానంలో ఉండటం వల్ల వృత్తిపరమైన ఒత్తిడి, శ్రమ పెరుగుతాయి. సులభమైన పని కూడా ఎక్కువ కష్టాన్ని కోరుతుంది.',
      kn: 'ಉದಯದಿಂದ ಆರೂಢವು 10ನೇ ಸ್ಥಾನದಲ್ಲಿದ್ದು, ಉದ್ಯೋಗ ಕ್ಷೇತ್ರದಲ್ಲಿ ಸವಾಲುಗಳು ಮತ್ತು ಒತ್ತಡ ಹೆಚ್ಚಿರುತ್ತದೆ. ಸುಲಭ ಕೆಲಸಕ್ಕೂ ಹೆಚ್ಚಿನ ಪರಿಶ್ರಮ ಬೇಕು.',
      ml: 'ഉദയത്തിൽ നിന്ന് ആരൂഢം 10-ാം ഭാവത്തിലായതിനാൽ തൊഴിൽപരമായ സമ്മർദ്ദവും അലച്ചിലും ഉണ്ടാകും. ലളിതമായ കാര്യങ്ങൾ പോലും കഠിനാധ്വാനം ആവശ്യപ്പെടും.'
    },
    icon: 'fa-briefcase'
  },
  11: {
    bhava: 11,
    titleTa: 'அபரிமித லாபம் & ஆசைகள் பூர்த்தி (Very Good / உத்தமம்)',
    titleEn: 'Abundant Gain & Wish Fulfillment (Very Good)',
    title: {
      en: 'Abundant Gain & Wish Fulfillment (Very Good)',
      ta: 'அபரிமித லாபம் & ஆசைகள் பூர்த்தி (Very Good / உத்தமம்)',
      hi: 'प्रचुर लाभ और मनोकामना पूर्ति (अति उत्तम)',
      te: 'అపారమైన లాభం మరియు కోరికల నెరవేర్పు (చాలా మంచిది)',
      kn: 'ಅಪಾರ ಲಾಭ ಮತ್ತು ಆಸೆಗಳ ಈಡೇರಿಕೆ (ಅತ್ಯುತ್ತಮ)',
      ml: 'വൻ നേട്ടങ്ങളും ആഗ്രഹ പൂർത്തീകരണവും (വളരെ നല്ലത്)'
    },
    statusEn: 'Very Good',
    statusTa: 'உத்தமம்',
    status: {
      en: 'Very Good',
      ta: 'உத்தமம்',
      hi: 'अति उत्तम / महालाभ',
      te: 'చాలా మంచిది / లాభం',
      kn: 'ಅತ್ಯುತ್ತಮ / ಲಾಭ',
      ml: 'വളരെ നല്ലത് / ലാഭം'
    },
    ratingType: 'very-good',
    badgeColor: '#16a34a',
    badgeBg: '#00c288',
    percentage: 95,
    descTa: 'ஆரூடம் 11-ஆம் இடத்தில் (லாப ஸ்தானம்) உள்ளது. நீங்கள் நீண்ட நாட்களாக எதிர்பார்த்திருந்த நற்செய்தி வரும். தொட்டதெல்லாம் பொன்னாகும்; முதலீடுகள் மற்றும் முயற்சிகள் பல மடங்கு பலன் தரும்.',
    descEn: 'Aarudam is in the 11th house (Gains & Fulfillment). Great news awaits. Your long-pending wishes will bear sweet fruit with handsome returns.',
    desc: {
      en: 'Aarudam is in the 11th house (Gains & Fulfillment). Great news awaits. Your long-pending wishes will bear sweet fruit with handsome returns.',
      ta: 'ஆரூடம் 11-ஆம் இடத்தில் (லாப ஸ்தானம்) உள்ளது. நீங்கள் நீண்ட நாட்களாக எதிர்பார்த்திருந்த நற்செய்தி வரும். தொட்டதெல்லாம் பொன்னாகும்; முதலீடுகள் மற்றும் முயற்சிகள் பல மடங்கு பலன் தரும்.',
      hi: 'आरूढ़ एकादश भाव (लाभ स्थान) में है। बहुप्रतीक्षित शुभ समाचार मिलेगा। आपके प्रयास और निवेश कई गुना लाभ देंगे।',
      te: 'ఆరూఢం 11వ స్థానంలో (లాభ స్థానం) ఉంది. మీరు చాలా కాలంగా ఎదురుచూస్తున్న శుభవార్త అందుతుంది. మీ ప్రయత్నాలకు గొప్ప ఫలితం లభిస్తుంది.',
      kn: 'ಆರೂಢವು 11ನೇ ಸ್ಥಾನದಲ್ಲಿದ್ದು (ಲಾಭ ಸ್ಥಾನ), ಬಹುಕಾಲದ ನಿರೀಕ್ಷಿತ ಶುಭ ಸುದ್ದಿ ಬರುತ್ತದೆ. ನೀವು ಕೈಹಾಕಿದ ಕೆಲಸಗಳು ಅತ್ಯುತ್ತಮ ಲಾಭ ನೀಡುತ್ತವೆ.',
      ml: 'ആരൂഢം 11-ാം ഭാവത്തിൽ (ലാഭസ്ഥാനം) ആയതിനാൽ ഏറെ നാളായി കാത്തിരുന്ന ശുഭവാർത്ത തേടിയെത്തും. ആഗ്രഹങ്ങൾ പൂർണ്ണമായി സഫലമാകും.'
    },
    icon: 'fa-trophy'
  },
  12: {
    bhava: 12,
    titleTa: 'தாமதம் or தடை (Delay / அதமம்)',
    titleEn: 'Delay & Obstacles (Delay / Denial)',
    title: {
      en: 'Delay & Obstacles (Delay / Denial)',
      ta: 'தாமதம் or தடை (Delay / அதமம்)',
      hi: 'विलंब और व्यय (Delay / अधम)',
      te: 'ఆలస్యం మరియు ఖర్చులు (Delay / అధమం)',
      kn: 'ವಿಳಂಬ ಮತ್ತು ವ್ಯಯ (Delay / ಅಧಮ)',
      ml: 'കാലതാമസവും ചെലവുകളും (Delay / അധമം)'
    },
    statusEn: 'Delay',
    statusTa: 'அதமம்',
    status: {
      en: 'Delay',
      ta: 'அதமம்',
      hi: 'व्यय एवं विलंब / अधम',
      te: 'ఖర్చులు మరియు ఆలస్యం / అధమం',
      kn: 'ಖರ್ಚು ಮತ್ತು ವಿಳಂಬ / ಅಧಮ',
      ml: 'വ്യയവും കാലതാമസവും / അധമം'
    },
    ratingType: 'delay',
    badgeColor: '#dc2626',
    badgeBg: '#ff5b79',
    percentage: 30,
    descTa: 'ஆரூடம் 12-ஆம் இடத்தில் (விரய ஸ்தானம்) மறைந்துள்ளது. பொருள் நஷ்டம், தேவையற்ற அலைச்சல் அல்லது மருத்துவச் செலவுகள் ஏற்படலாம். ஆனால் வெளிநாட்டுப் பயணம் அல்லது தூரதேச தொடர்புகளுக்கு இது நன்மையளிக்கும்.',
    descEn: 'Aarudam is in the 12th house (Expenses & Loss). Waste of resources, fatigue, or unwarranted expenses. Foreign travel or hospital-related queries may yield specialized progress.',
    desc: {
      en: 'Aarudam is in the 12th house (Expenses & Loss). Waste of resources, fatigue, or unwarranted expenses. Foreign travel or hospital-related queries may yield specialized progress.',
      ta: 'ஆரூடம் 12-ஆம் இடத்தில் (விரய ஸ்தானம்) மறைந்துள்ளது. பொருள் நஷ்டம், தேவையற்ற அலைச்சல் அல்லது மருத்துவச் செலவுகள் ஏற்படலாம். ஆனால் வெளிநாட்டுப் பயணம் அல்லது தூரதேச தொடர்புகளுக்கு இது நன்மையளிக்கும்.',
      hi: 'आरूढ़ द्वादश भाव (व्यय स्थान) में है। धन हानि, अकारण भागदौड़ या स्वास्थ्य संबंधी चिंता संभव है। विदेश यात्रा के लिए यह अनुकूल हो सकता है।',
      te: 'ఆరూఢం 12వ స్థానంలో (వ్యయ స్థానం) ఉండటం వల్ల ఖర్చులు, అలసట కలగవచ్చు. అయితే విదేశీ ప్రయాణాల ప్రయత్నాలకు ఇది మంచిది.',
      kn: 'ಆರೂಢವು 12ನೇ ಸ್ಥಾನದಲ್ಲಿದ್ದು (ವ್ಯಯ ಸ್ಥಾನ), ಧನ ನಷ್ಟ ಅಥವಾ ಅನಗತ್ಯ ಅಲೆದಾಟ ಉಂಟಾಗಬಹುದು. ವಿದೇಶ ಪ್ರಯಾಣದ ವಿಚಾರಗಳಿಗೆ ಅನುಕೂಲಕರ.',
      ml: 'ആരൂഢം 12-ാം ഭാവത്തിൽ (വ്യയസ്ഥാനം) നിൽക്കുന്നതിനാൽ അനാവശ്യ ചെലവുകളും അലച്ചിലും വരാം. എന്നാൽ വിദേശയാത്രയ്ക്കും ദൂരദേശ ബന്ധങ്ങൾക്കും അനുകൂലമാണ്.'
    },
    icon: 'fa-money-bill-transfer'
  }
};

/**
 * Localizes a Bhava prediction object into target language
 */
export function getLocalizedBhavaPrediction(bhavaNum, lang = 'ta', customPredictions = null) {
  const source = (customPredictions && customPredictions[bhavaNum]) || BHAVA_PREDICTIONS[bhavaNum] || BHAVA_PREDICTIONS[1];
  const l = lang || 'ta';

  const title = (source.title && typeof source.title === 'object')
    ? (source.title[l] || source.title.ta || source.title.en || source.titleTa || source.titleEn || '')
    : (source.title || (l === 'en' ? source.titleEn : source.titleTa) || '');

  const status = (source.status && typeof source.status === 'object')
    ? (source.status[l] || source.status.ta || source.status.en || source.statusTa || source.statusEn || '')
    : (source.status || (l === 'en' ? source.statusEn : source.statusTa) || '');

  const desc = (source.desc && typeof source.desc === 'object')
    ? (source.desc[l] || source.desc.ta || source.desc.en || source.descTa || source.descEn || '')
    : (source.desc || (l === 'en' ? source.descEn : source.descTa) || '');

  return {
    ...source,
    bhava: Number(bhavaNum),
    titleLocalized: title,
    statusLocalized: status,
    descLocalized: desc
  };
}

/**
 * Calculate Kadikara Prasannam given Date, Hour, Minute, AM/PM
 * 
 * @param {Object} params
 * @param {string|Date} params.date - Date string 'YYYY-MM-DD' or Date object
 * @param {number|string} params.hour - Hour (1-12 or 0-23)
 * @param {number|string} params.minute - Minute (0-59)
 * @param {string} [params.ampm] - 'AM' or 'PM' (if 12-hr format)
 * @param {string} [params.calculationMode] - 'runningHour' (default matching clock horary standard) or 'directHour'
 * @param {string} [params.lang] - Current language ('ta', 'en', 'hi', 'te', 'kn', 'ml')
 * @param {Object} [params.customBhavaPredictions] - Loaded Master Predictions from DB
 * @returns {Object} Prasannam calculation results
 */
export function calculateKadikaraPrasannam({
  date = new Date(),
  hour,
  minute,
  ampm = 'AM',
  calculationMode = 'runningHour',
  lang = 'ta',
  customBhavaPredictions = null
}) {
  const parsedHour = parseInt(hour, 10);
  const parsedMinute = Math.max(0, Math.min(59, parseInt(minute, 10) || 0));

  let h24 = parsedHour;
  if (ampm.toUpperCase() === 'PM' && parsedHour < 12) {
    h24 += 12;
  } else if (ampm.toUpperCase() === 'AM' && parsedHour === 12) {
    h24 = 0;
  }

  // 12-hour clock standard (1 to 12)
  const h12 = (parsedHour % 12) || 12;

  let udhayamIndex = 0; // 0 = Aries ... 11 = Pisces
  let aarudamIndex = 0;

  // Minute / Aarudam Calculation (every 5 minutes = 1 rasi)
  // 0-4 = Aries (0), 5-9 = Taurus (1) ... 55-59 = Pisces (11)
  aarudamIndex = Math.min(11, Math.floor(parsedMinute / 5));

  if (calculationMode === 'runningHour') {
    // In running hour mode (standard in clock horary and matching reference screenshot):
    // e.g. 15:03 -> hour 15 (3 PM) running hour is 4 -> Cancer (கடகம், index 3).
    const hourMod12 = (h24 % 12);
    if (parsedMinute > 0) {
      udhayamIndex = hourMod12 % 12;
    } else {
      udhayamIndex = (hourMod12 - 1 + 12) % 12;
    }
  } else {
    // Direct 1-12 mapping (1 = Aries, 12 = Pisces)
    udhayamIndex = (h12 - 1) % 12;
  }

  // Calculate Distance (House position from Udhayam to Aarudam: 1 to 12)
  // உத-ஆரு: distance from Udhayam to Aarudam
  const udhayamToAarudam = ((aarudamIndex - udhayamIndex + 12) % 12) + 1;

  // ஆரு->உத: distance from Aarudam to Udhayam
  const aarudamToUdhayam = ((udhayamIndex - aarudamIndex + 12) % 12) + 1;

  const udhayamRasi = PRASANNAM_RASIS[udhayamIndex];
  const aarudamRasi = PRASANNAM_RASIS[aarudamIndex];

  // Fetch prediction by distance (1 to 12) with localized strings
  const prediction = getLocalizedBhavaPrediction(udhayamToAarudam, lang, customBhavaPredictions);

  // Determine badge values matching reference style
  let statusEn = prediction.statusEn;
  let statusTa = prediction.statusTa;
  let badgeBg = prediction.badgeBg || '#10b981';

  if (udhayamToAarudam === 1 || prediction.ratingType === 'excellent') {
    statusEn = 'Excellent';
    statusTa = 'உத்தமம்';
    badgeBg = '#00c288';
  } else if (udhayamToAarudam === 2 || udhayamToAarudam === 12 || prediction.ratingType === 'delay') {
    statusEn = 'Delay';
    statusTa = 'அதமம்';
    badgeBg = '#ff5b79';
  } else if (udhayamToAarudam === 3 || udhayamToAarudam === 11 || prediction.ratingType === 'very-good') {
    statusEn = 'Very Good';
    statusTa = 'உத்தமம்';
    badgeBg = '#00c288';
  } else if (udhayamToAarudam === 4 || udhayamToAarudam === 5 || udhayamToAarudam === 9 || prediction.ratingType === 'good') {
    statusEn = 'Good';
    statusTa = 'சாதகம்';
    badgeBg = '#f89762';
  } else if (udhayamToAarudam === 6 || udhayamToAarudam === 8 || prediction.ratingType === 'failure') {
    statusEn = 'Failure';
    statusTa = 'அதமம்';
    badgeBg = '#ff5b79';
  } else if (udhayamToAarudam === 7 || prediction.ratingType === 'normal') {
    statusEn = 'Normal';
    statusTa = 'சாதகம்';
    badgeBg = '#f89762';
  } else if (udhayamToAarudam === 10 || prediction.ratingType === 'hard') {
    statusEn = 'Hard Luck';
    statusTa = 'அதமம்';
    badgeBg = '#ff5b79';
  }

  const statusLocalized = prediction.statusLocalized || (lang === 'en' ? statusEn : statusTa);

  // Degree calculations for Udhayam & Aarudam (30° per Rasi)
  // Udhayam (Hour hand: 30° across 60 min -> 0.5° or 30' per min)
  const udhayamDegreeInRasi = Number(((parsedMinute / 60) * 30).toFixed(4));
  const uDeg = Math.floor(udhayamDegreeInRasi);
  const uMin = Math.round((udhayamDegreeInRasi - uDeg) * 60);
  const udhayamFormattedDegree = `${uDeg}°${String(uMin).padStart(2, '0')}'`;

  // Aarudam (Minute hand: 30° across 5 min -> 6° per min)
  const minuteInRasi = parsedMinute % 5;
  const aarudamDegreeInRasi = Number(((minuteInRasi / 5) * 30).toFixed(4));
  const aDeg = Math.floor(aarudamDegreeInRasi);
  const aMin = Math.round((aarudamDegreeInRasi - aDeg) * 60);
  const aarudamFormattedDegree = `${aDeg}°${String(aMin).padStart(2, '0')}'`;

  return {
    udhayamIndex,
    aarudamIndex,
    udhayamDegreeInRasi,
    aarudamDegreeInRasi,
    udhayamFormattedDegree,
    aarudamFormattedDegree,
    udhayamRasi,
    aarudamRasi,
    udhayamRasiNameLocalized: getLocalizedPrasannamRasiName(udhayamIndex, lang),
    aarudamRasiNameLocalized: getLocalizedPrasannamRasiName(aarudamIndex, lang),
    udhayamRasiLordLocalized: getLocalizedPrasannamRasiLord(udhayamIndex, lang),
    aarudamRasiLordLocalized: getLocalizedPrasannamRasiLord(aarudamIndex, lang),
    udhayamToAarudam, // உத-ஆரு
    aarudamToUdhayam, // ஆரு->உத
    prediction,
    statusEn,
    statusTa,
    statusLocalized,
    badgeBg,
    badgeText: '#ffffff',
    h12,
    h24,
    minute: parsedMinute,
    ampm: ampm.toUpperCase(),
    date
  };
}

/**
 * 12 Rasis and their Constituent Nakshatras with Padas & Pada Lords
 * Continuous 108 Navamsa Cycle (9 Padas per Rasi = 30°)
 */
export const RASI_CONSTITUENT_STARS = [
  // 0: Mesham (Aries)
  [
    { nakshatraId: 0, nameEn: 'Ashwini', nameTa: 'அஸ்வினி', lordEn: 'Ketu', lordTa: 'கேது', padas: [1, 2, 3, 4], padaLordsEn: ['Mars', 'Venus', 'Mercury', 'Moon'], padaLordsTa: ['செவ்வாய்', 'சுக்கிரன்', 'புதன்', 'சந்திரன்'] },
    { nakshatraId: 1, nameEn: 'Bharani', nameTa: 'பரணி', lordEn: 'Venus', lordTa: 'சுக்கிரன்', padas: [1, 2, 3, 4], padaLordsEn: ['Sun', 'Mercury', 'Venus', 'Mars'], padaLordsTa: ['சூரியன்', 'புதன்', 'சுக்கிரன்', 'செவ்வாய்'] },
    { nakshatraId: 2, nameEn: 'Krittika', nameTa: 'கார்த்திகை', lordEn: 'Sun', lordTa: 'சூரியன்', padas: [1], padaLordsEn: ['Jupiter'], padaLordsTa: ['குரு'] }
  ],
  // 1: Rishabam (Taurus)
  [
    { nakshatraId: 2, nameEn: 'Krittika', nameTa: 'கார்த்திகை', lordEn: 'Sun', lordTa: 'சூரியன்', padas: [2, 3, 4], padaLordsEn: ['Saturn', 'Saturn', 'Jupiter'], padaLordsTa: ['சனி', 'சனி', 'குரு'] },
    { nakshatraId: 3, nameEn: 'Rohini', nameTa: 'ரோகிணி', lordEn: 'Moon', lordTa: 'சந்திரன்', padas: [1, 2, 3, 4], padaLordsEn: ['Mars', 'Venus', 'Mercury', 'Moon'], padaLordsTa: ['செவ்வாய்', 'சுக்கிரன்', 'புதன்', 'சந்திரன்'] },
    { nakshatraId: 4, nameEn: 'Mrigashira', nameTa: 'மிருகசீரிஷம்', lordEn: 'Mars', lordTa: 'செவ்வாய்', padas: [1, 2], padaLordsEn: ['Sun', 'Mercury'], padaLordsTa: ['சூரியன்', 'புதன்'] }
  ],
  // 2: Mithunam (Gemini)
  [
    { nakshatraId: 4, nameEn: 'Mrigashira', nameTa: 'மிருகசீரிஷம்', lordEn: 'Mars', lordTa: 'செவ்வாய்', padas: [3, 4], padaLordsEn: ['Venus', 'Mars'], padaLordsTa: ['சுக்கிரன்', 'செவ்வாய்'] },
    { nakshatraId: 5, nameEn: 'Ardra', nameTa: 'திருவாதிரை', lordEn: 'Rahu', lordTa: 'ராகு', padas: [1, 2, 3, 4], padaLordsEn: ['Jupiter', 'Saturn', 'Saturn', 'Jupiter'], padaLordsTa: ['குரு', 'சனி', 'சனி', 'குரு'] },
    { nakshatraId: 6, nameEn: 'Punarvasu', nameTa: 'புனர்பூசம்', lordEn: 'Jupiter', lordTa: 'குரு', padas: [1, 2, 3], padaLordsEn: ['Mars', 'Venus', 'Mercury'], padaLordsTa: ['செவ்வாய்', 'சுக்கிரன்', 'புதன்'] }
  ],
  // 3: Katakam (Cancer)
  [
    { nakshatraId: 6, nameEn: 'Punarvasu', nameTa: 'புனர்பூசம்', lordEn: 'Jupiter', lordTa: 'குரு', padas: [4], padaLordsEn: ['Moon'], padaLordsTa: ['சந்திரன்'] },
    { nakshatraId: 7, nameEn: 'Pushya', nameTa: 'பூசம்', lordEn: 'Saturn', lordTa: 'சனி', padas: [1, 2, 3, 4], padaLordsEn: ['Sun', 'Mercury', 'Venus', 'Mars'], padaLordsTa: ['சூரியன்', 'புதன்', 'சுக்கிரன்', 'செவ்வாய்'] },
    { nakshatraId: 8, nameEn: 'Ashlesha', nameTa: 'ஆயில்யம்', lordEn: 'Mercury', lordTa: 'புதன்', padas: [1, 2, 3, 4], padaLordsEn: ['Jupiter', 'Saturn', 'Saturn', 'Jupiter'], padaLordsTa: ['குரு', 'சனி', 'சனி', 'குரு'] }
  ],
  // 4: Simham (Leo)
  [
    { nakshatraId: 9, nameEn: 'Magha', nameTa: 'மகம்', lordEn: 'Ketu', lordTa: 'கேது', padas: [1, 2, 3, 4], padaLordsEn: ['Mars', 'Venus', 'Mercury', 'Moon'], padaLordsTa: ['செவ்வாய்', 'சுக்கிரன்', 'புதன்', 'சந்திரன்'] },
    { nakshatraId: 10, nameEn: 'Purva Phalguni', nameTa: 'பூரம்', lordEn: 'Venus', lordTa: 'சுக்கிரன்', padas: [1, 2, 3, 4], padaLordsEn: ['Sun', 'Mercury', 'Venus', 'Mars'], padaLordsTa: ['சூரியன்', 'புதன்', 'சுக்கிரன்', 'செவ்வாய்'] },
    { nakshatraId: 11, nameEn: 'Uttara Phalguni', nameTa: 'உத்திரம்', lordEn: 'Sun', lordTa: 'சூரியன்', padas: [1], padaLordsEn: ['Jupiter'], padaLordsTa: ['குரு'] }
  ],
  // 5: Kanni (Virgo)
  [
    { nakshatraId: 11, nameEn: 'Uttara Phalguni', nameTa: 'உத்திரம்', lordEn: 'Sun', lordTa: 'சூரியன்', padas: [2, 3, 4], padaLordsEn: ['Saturn', 'Saturn', 'Jupiter'], padaLordsTa: ['சனி', 'சனி', 'குரு'] },
    { nakshatraId: 12, nameEn: 'Hasta', nameTa: 'ஹஸ்தம்', lordEn: 'Moon', lordTa: 'சந்திரன்', padas: [1, 2, 3, 4], padaLordsEn: ['Mars', 'Venus', 'Mercury', 'Moon'], padaLordsTa: ['செவ்வாய்', 'சுக்கிரன்', 'புதன்', 'சந்திரன்'] },
    { nakshatraId: 13, nameEn: 'Chitra', nameTa: 'சித்திரை', lordEn: 'Mars', lordTa: 'செவ்வாய்', padas: [1, 2], padaLordsEn: ['Sun', 'Mercury'], padaLordsTa: ['சூரியன்', 'புதன்'] }
  ],
  // 6: Thulam (Libra)
  [
    { nakshatraId: 13, nameEn: 'Chitra', nameTa: 'சித்திரை', lordEn: 'Mars', lordTa: 'செவ்வாய்', padas: [3, 4], padaLordsEn: ['Venus', 'Mars'], padaLordsTa: ['சுக்கிரன்', 'செவ்வாய்'] },
    { nakshatraId: 14, nameEn: 'Swati', nameTa: 'சுவாதி', lordEn: 'Rahu', lordTa: 'ராகு', padas: [1, 2, 3, 4], padaLordsEn: ['Jupiter', 'Saturn', 'Saturn', 'Jupiter'], padaLordsTa: ['குரு', 'சனி', 'சனி', 'குரு'] },
    { nakshatraId: 15, nameEn: 'Vishakha', nameTa: 'விசாகம்', lordEn: 'Jupiter', lordTa: 'குரு', padas: [1, 2, 3], padaLordsEn: ['Mars', 'Venus', 'Mercury'], padaLordsTa: ['செவ்வாய்', 'சுக்கிரன்', 'புதன்'] }
  ],
  // 7: Vrichigam (Scorpio)
  [
    { nakshatraId: 15, nameEn: 'Vishakha', nameTa: 'விசாகம்', lordEn: 'Jupiter', lordTa: 'குரு', padas: [4], padaLordsEn: ['Moon'], padaLordsTa: ['சந்திரன்'] },
    { nakshatraId: 16, nameEn: 'Anuradha', nameTa: 'அனுஷம்', lordEn: 'Saturn', lordTa: 'சனி', padas: [1, 2, 3, 4], padaLordsEn: ['Sun', 'Mercury', 'Venus', 'Mars'], padaLordsTa: ['சூரியன்', 'புதன்', 'சுக்கிரன்', 'செவ்வாய்'] },
    { nakshatraId: 17, nameEn: 'Jyeshtha', nameTa: 'கேட்டை', lordEn: 'Mercury', lordTa: 'புதன்', padas: [1, 2, 3, 4], padaLordsEn: ['Jupiter', 'Saturn', 'Saturn', 'Jupiter'], padaLordsTa: ['குரு', 'சனி', 'சனி', 'குரு'] }
  ],
  // 8: Dhanusu (Sagittarius)
  [
    { nakshatraId: 18, nameEn: 'Mula', nameTa: 'மூலம்', lordEn: 'Ketu', lordTa: 'கேது', padas: [1, 2, 3, 4], padaLordsEn: ['Mars', 'Venus', 'Mercury', 'Moon'], padaLordsTa: ['செவ்வாய்', 'சுக்கிரன்', 'புதன்', 'சந்திரன்'] },
    { nakshatraId: 19, nameEn: 'Purva Ashadha', nameTa: 'பூராடம்', lordEn: 'Venus', lordTa: 'சுக்கிரன்', padas: [1, 2, 3, 4], padaLordsEn: ['Sun', 'Mercury', 'Venus', 'Mars'], padaLordsTa: ['சூரியன்', 'புதன்', 'சுக்கிரன்', 'செவ்வாய்'] },
    { nakshatraId: 20, nameEn: 'Uttara Ashadha', nameTa: 'உத்திராடம்', lordEn: 'Sun', lordTa: 'சூரியன்', padas: [1], padaLordsEn: ['Jupiter'], padaLordsTa: ['குரு'] }
  ],
  // 9: Makaram (Capricorn)
  [
    { nakshatraId: 20, nameEn: 'Uttara Ashadha', nameTa: 'உத்திராடம்', lordEn: 'Sun', lordTa: 'சூரியன்', padas: [2, 3, 4], padaLordsEn: ['Saturn', 'Saturn', 'Jupiter'], padaLordsTa: ['சனி', 'சனி', 'குரு'] },
    { nakshatraId: 21, nameEn: 'Shravana', nameTa: 'திருவோணம்', lordEn: 'Moon', lordTa: 'சந்திரன்', padas: [1, 2, 3, 4], padaLordsEn: ['Mars', 'Venus', 'Mercury', 'Moon'], padaLordsTa: ['செவ்வாய்', 'சுக்கிரன்', 'புதன்', 'சந்திரன்'] },
    { nakshatraId: 22, nameEn: 'Dhanishta', nameTa: 'அவிட்டம்', lordEn: 'Mars', lordTa: 'செவ்வாய்', padas: [1, 2], padaLordsEn: ['Sun', 'Mercury'], padaLordsTa: ['சூரியன்', 'புதன்'] }
  ],
  // 10: Kumbam (Aquarius)
  [
    { nakshatraId: 22, nameEn: 'Dhanishta', nameTa: 'அவிட்டம்', lordEn: 'Mars', lordTa: 'செவ்வாய்', padas: [3, 4], padaLordsEn: ['Venus', 'Mars'], padaLordsTa: ['சுக்கிரன்', 'செவ்வாய்'] },
    { nakshatraId: 23, nameEn: 'Shatabhisha', nameTa: 'சதயம்', lordEn: 'Rahu', lordTa: 'ராகு', padas: [1, 2, 3, 4], padaLordsEn: ['Jupiter', 'Saturn', 'Saturn', 'Jupiter'], padaLordsTa: ['குரு', 'சனி', 'சனி', 'குரு'] },
    { nakshatraId: 24, nameEn: 'Purva Bhadrapada', nameTa: 'பூரட்டாதி', lordEn: 'Jupiter', lordTa: 'குரு', padas: [1, 2, 3], padaLordsEn: ['Mars', 'Venus', 'Mercury'], padaLordsTa: ['செவ்வாய்', 'சுக்கிரன்', 'புதன்'] }
  ],
  // 11: Meenam (Pisces)
  [
    { nakshatraId: 24, nameEn: 'Purva Bhadrapada', nameTa: 'பூரட்டாதி', lordEn: 'Jupiter', lordTa: 'குரு', padas: [4], padaLordsEn: ['Moon'], padaLordsTa: ['சந்திரன்'] },
    { nakshatraId: 25, nameEn: 'Uttara Bhadrapada', nameTa: 'உத்திரட்டாதி', lordEn: 'Saturn', lordTa: 'சனி', padas: [1, 2, 3, 4], padaLordsEn: ['Sun', 'Mercury', 'Venus', 'Mars'], padaLordsTa: ['சூரியன்', 'புதன்', 'சுக்கிரன்', 'செவ்வாய்'] },
    { nakshatraId: 26, nameEn: 'Revati', nameTa: 'ரேவதி', lordEn: 'Mercury', lordTa: 'புதன்', padas: [1, 2, 3, 4], padaLordsEn: ['Jupiter', 'Saturn', 'Saturn', 'Jupiter'], padaLordsTa: ['குரு', 'சனி', 'சனி', 'குரு'] }
  ]
];

/**
 * Robust Astrological Details Enricher for Planet Hover Tooltip
 * Resolves:
 * 1. Raasi (ராசி)
 * 2. Raasi Athipathi (ராசி அதிபதி)
 * 3. Natchathiram (நட்சத்திரம்)
 * 4. Natch Athipathi (நட்சத்திர அதிபதி)
 * 5. Natchathira Padam (நட்சத்திர பாதம் - 1, 2, 3, 4)
 * 6. Natch Pada Athipathi (நட்சத்திர பாத அதிபதி)
 */
export function enrichPlanetAstrology(planet, rasiIndex, lang = 'ta') {
  if (!planet) return null;

  const normRasiId = ((Number(rasiIndex) % 12) + 12) % 12;
  const rasiName = getLocalizedRasiName(normRasiId, lang);
  const rasiLordName = getRasiLordName(normRasiId, lang);

  // Extract degree in Rasi
  let degInRasi = planet.degreeInRasi ?? planet.rawDegree;
  if (degInRasi === undefined || isNaN(degInRasi)) {
    const degStr = planet.formattedDegree || planet.degree || '';
    const match = String(degStr).match(/(\d+)[°\s]+(\d+)?/);
    if (match) {
      degInRasi = parseInt(match[1], 10) + (parseInt(match[2] || '0', 10) / 60.0);
    } else {
      degInRasi = 15.0; // fallback midpoint
    }
  }

  // Calculate 108 Pada and Nakshatra
  const padaInRasi = Math.max(0, Math.min(8, Math.floor(degInRasi / (30.0 / 9.0))));
  const totalPadaIndex = normRasiId * 9 + padaInRasi;
  const calcNakshatraId = Math.floor(totalPadaIndex / 4);
  const calcPada = (totalPadaIndex % 4) + 1;
  const navamsaRasiId = totalPadaIndex % 12;

  const finalNakshatraId = planet.nakshatraId !== undefined ? planet.nakshatraId : calcNakshatraId;
  const finalPada = planet.pada || calcPada;
  const finalNavamsaRasiId = planet.navamsaRasiId !== undefined ? planet.navamsaRasiId : navamsaRasiId;

  // Localized Nakshatra Name
  let nakshatraName = getLocalizedNakshatra(finalNakshatraId, lang);
  if (!nakshatraName || nakshatraName === '-') {
    nakshatraName = lang === 'ta' ? (planet.nakshatraNameTa || planet.nakshatraName) : (planet.nakshatraName || planet.nakshatraNameTa);
  }

  // Localized Nakshatra Athipathi (Star Lord)
  let nakshatraLordName = '';
  if (planet.nakshatraAthipathi?.name || planet.natchAthipathi?.name) {
    const lordObj = planet.nakshatraAthipathi || planet.natchAthipathi;
    const key = `name${lang.charAt(0).toUpperCase() + lang.slice(1)}`;
    nakshatraLordName = lordObj[key] || (lang === 'ta' ? lordObj.nameTa : (getLocalizedPlanet(lordObj.name, lang).name || lordObj.name));
  }
  if (!nakshatraLordName) {
    nakshatraLordName = getNakshatraLordName(finalNakshatraId, lang);
  }

  // Localized Pada Athipathi (Navamsa Lord)
  let padamLordName = '';
  if (planet.padamAthipathi?.name || planet.natchPadaAthipathi?.name) {
    const lordObj = planet.padamAthipathi || planet.natchPadaAthipathi;
    const key = `name${lang.charAt(0).toUpperCase() + lang.slice(1)}`;
    padamLordName = lordObj[key] || (lang === 'ta' ? lordObj.nameTa : (getLocalizedPlanet(lordObj.name, lang).name || lordObj.name));
  }
  if (!padamLordName) {
    padamLordName = getRasiLordName(finalNavamsaRasiId, lang);
  }

  // Format Pada display text
  let padaText = '';
  if (lang === 'ta') {
    padaText = `${finalPada}-ஆம் பாதம்`;
  } else if (lang === 'en') {
    padaText = `Pada ${finalPada}`;
  } else if (lang === 'hi') {
    padaText = `पद ${finalPada}`;
  } else if (lang === 'te') {
    padaText = `పాదం ${finalPada}`;
  } else if (lang === 'kn') {
    padaText = `ಪಾದ ${finalPada}`;
  } else if (lang === 'ml') {
    padaText = `പാദം ${finalPada}`;
  } else {
    padaText = `Pada ${finalPada}`;
  }

  // Localized Planet Full Name
  const locPlanet = getLocalizedPlanet(planet.name, lang);
  const planetFullName = lang === 'en'
    ? (planet.name || locPlanet.name)
    : (planet[`name${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || locPlanet.name || planet.nameTa || planet.name);

  return {
    ...planet,
    planetFullName,
    rasiId: normRasiId,
    rasiName,
    rasiLordName,
    nakshatraId: finalNakshatraId,
    nakshatraName,
    nakshatraLordName,
    pada: finalPada,
    padaText,
    navamsaRasiId: finalNavamsaRasiId,
    padamLordName
  };
}

export default {
  PRASANNAM_RASIS,
  BHAVA_PREDICTIONS,
  RASI_CONSTITUENT_STARS,
  calculateKadikaraPrasannam,
  getLocalizedPrasannamRasiName,
  getLocalizedPrasannamRasiLord,
  getLocalizedBhavaPrediction,
  enrichPlanetAstrology
};

