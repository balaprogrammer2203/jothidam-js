import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import masterDataService from '../../../services/masterData.service';
import SEOHead from '../../../components/common/SEOHead';
import Breadcrumbs from '../../../components/common/Breadcrumbs';
import { getLocalizedValue, getUIString } from '../../../utils/localizedContent';
import { ROUTES } from '../../../config/routes.config';
import '../../../styles/nakshatraPadas.css';

// South Indian 4x4 Chart arrangement of Rasi IDs:
// Row 1: Pisces (11), Aries (0), Taurus (1), Gemini (2)
// Row 2: Aquarius (10), Center, Cancer (3)
// Row 3: Capricorn (9), Center, Leo (4)
// Row 4: Sagittarius (8), Scorpio (7), Libra (6), Virgo (5)
const SOUTH_INDIAN_RASI_CHART_ORDER = [
  // Row 1
  { rasiId: 11, gridArea: '1 / 1' },
  { rasiId: 0,  gridArea: '1 / 2' },
  { rasiId: 1,  gridArea: '1 / 3' },
  { rasiId: 2,  gridArea: '1 / 4' },

  // Row 2
  { rasiId: 10, gridArea: '2 / 1' },
  // Center cell spans 2/2 to 4/4
  { rasiId: 3,  gridArea: '2 / 4' },

  // Row 3
  { rasiId: 9,  gridArea: '3 / 1' },
  { rasiId: 4,  gridArea: '3 / 4' },

  // Row 4
  { rasiId: 8,  gridArea: '4 / 1' },
  { rasiId: 7,  gridArea: '4 / 2' },
  { rasiId: 6,  gridArea: '4 / 3' },
  { rasiId: 5,  gridArea: '4 / 4' },
];

// Complete 12 Rasis definitions with 1 to 30 degree in Rasi and 0 to 360 degree in Zodiac
const MANDALAM_RASI_DEFINITIONS = [
  {
    rasiId: 0,
    order: 1,
    name: { en: 'Aries', ta: 'மேஷம்', hi: 'मेष', te: 'మేషం', kn: 'ಮೇಷ', ml: 'മേടം' },
    lord: { en: 'Mars', ta: 'செவ்வாய்', hi: 'मंगल', te: 'కుజుడు', kn: 'ಮಂಗಳ', ml: 'ചൊവ്വ' },
    inRasiSpan: '1°-30°',
    zodiacSpan360: '0°-30°',
    stars: [
      {
        name: { en: 'Ashwini', ta: 'அஸ்வினி', hi: 'अश्विनी', te: 'అశ్విని', kn: 'ಅಶ್ವಿನಿ', ml: 'അശ്വതി' },
        lord: { en: 'Ketu', ta: 'கேது', hi: 'केतु', te: 'కేతువు', kn: 'ಕೇತು', ml: 'കേതു' },
        span: '13.20',
        padasCount: 4,
        inRasiDeg: "0°-13°20'",
        zodiacDeg: "0°-13°20'"
      },
      {
        name: { en: 'Bharani', ta: 'பரணி', hi: 'भरणी', te: 'భరణి', kn: 'ಭರಣಿ', ml: 'ഭരണി' },
        lord: { en: 'Venus', ta: 'சுக்கிரன்', hi: 'शुक्र', te: 'శుక్రుడు', kn: 'ಶುಕ್ರ', ml: 'ശുക്രൻ' },
        span: '13.20',
        padasCount: 4,
        inRasiDeg: "13°20'-26°40'",
        zodiacDeg: "13°20'-26°40'"
      },
      {
        name: { en: 'Krittika', ta: 'கார்த்திகை', hi: 'कृत्तिका', te: 'కృత్తిక', kn: 'ಕೃತ್ತಿಕಾ', ml: 'കാർത്തിക' },
        lord: { en: 'Sun', ta: 'சூரியன்', hi: 'सूर्य', te: 'సూర్యుడు', kn: 'ಸೂರ್ಯ', ml: 'സൂര്യൻ' },
        span: '3.20',
        padasCount: 1,
        inRasiDeg: "26°40'-30°",
        zodiacDeg: "26°40'-30°"
      }
    ]
  },
  {
    rasiId: 1,
    order: 2,
    name: { en: 'Taurus', ta: 'ரிஷபம்', hi: 'वृषभ', te: 'వృషభం', kn: 'ವೃಷಭ', ml: 'ഇടവം' },
    lord: { en: 'Venus', ta: 'சுக்கிரன்', hi: 'शुक्र', te: 'శుక్రుడు', kn: 'ಶುಕ್ರ', ml: 'ശുക്രൻ' },
    inRasiSpan: '1°-30°',
    zodiacSpan360: '30°-60°',
    stars: [
      {
        name: { en: 'Krittika', ta: 'கார்த்திகை', hi: 'कृत्तिका', te: 'కృత్తిక', kn: 'ಕೃತ್ತಿಕಾ', ml: 'കാർത്തിക' },
        lord: { en: 'Sun', ta: 'சூரியன்', hi: 'सूर्य', te: 'సూర్యుడు', kn: 'ಸೂರ್ಯ', ml: 'സൂര്യൻ' },
        span: '10.00',
        padasCount: 3,
        inRasiDeg: "0°-10°",
        zodiacDeg: "30°-40°"
      },
      {
        name: { en: 'Rohini', ta: 'ரோகிணி', hi: 'रोहिणी', te: 'ரோహిణి', kn: 'ರೋಹಿಣಿ', ml: 'രോഹിണി' },
        lord: { en: 'Moon', ta: 'சந்திரன்', hi: 'चन्द्र', te: 'చంద్రుడు', kn: 'ಚಂದ್ರ', ml: 'ചന്ദ്രൻ' },
        span: '13.20',
        padasCount: 4,
        inRasiDeg: "10°-23°20'",
        zodiacDeg: "40°-53°20'"
      },
      {
        name: { en: 'Mrigashira', ta: 'மிருகசீரிஷம்', hi: 'मृगशिरा', te: 'మృగశిర', kn: 'ಮೃಗಶಿರಾ', ml: 'മകയിരം' },
        lord: { en: 'Mars', ta: 'செவ்வாய்', hi: 'मंगल', te: 'కుజుడు', kn: 'ಮಂಗಳ', ml: 'ചொവ്വ' },
        span: '6.40',
        padasCount: 2,
        inRasiDeg: "23°20'-30°",
        zodiacDeg: "53°20'-60°"
      }
    ]
  },
  {
    rasiId: 2,
    order: 3,
    name: { en: 'Gemini', ta: 'மிதுனம்', hi: 'मिथुन', te: 'మిథునం', kn: 'ಮಿಥುನ', ml: 'മിഥുനം' },
    lord: { en: 'Mercury', ta: 'புதன்', hi: 'बुध', te: 'బుధుడు', kn: 'ಬುಧ', ml: 'ಬುಧൻ' },
    inRasiSpan: '1°-30°',
    zodiacSpan360: '60°-90°',
    stars: [
      {
        name: { en: 'Mrigashira', ta: 'மிருகசீரிஷம்', hi: 'मृगशिरा', te: 'మృగశిర', kn: 'ಮೃಗಶಿರಾ', ml: 'മകയിരം' },
        lord: { en: 'Mars', ta: 'செவ்வாய்', hi: 'मंगल', te: 'కుజుడు', kn: 'ಮಂಗಳ', ml: 'ചொവ്വ' },
        span: '6.40',
        padasCount: 2,
        inRasiDeg: "0°-6°40'",
        zodiacDeg: "60°-66°40'"
      },
      {
        name: { en: 'Ardra', ta: 'திருவாதிரை', hi: 'आर्द्रा', te: 'ఆర్ద్ర', kn: 'ಆರ್ದ್ರಾ', ml: 'തിരുവാതിര' },
        lord: { en: 'Rahu', ta: 'ராகு', hi: 'राहु', te: 'రాహువు', kn: 'ರಾಹು', ml: 'രാഹു' },
        span: '13.20',
        padasCount: 4,
        inRasiDeg: "6°40'-20°",
        zodiacDeg: "66°40'-80°"
      },
      {
        name: { en: 'Punarvasu', ta: 'புனர்பூசம்', hi: 'पुनर्वसु', te: 'పునర్వసు', kn: 'ಪುನರ್ವಸು', ml: 'പുണർതം' },
        lord: { en: 'Jupiter', ta: 'குரு', hi: 'गुरु', te: 'గురువు', kn: 'ಗುರು', ml: 'വ്യാഴം' },
        span: '10.00',
        padasCount: 3,
        inRasiDeg: "20°-30°",
        zodiacDeg: "80°-90°"
      }
    ]
  },
  {
    rasiId: 3,
    order: 4,
    name: { en: 'Cancer', ta: 'கடகம்', hi: 'कर्क', te: 'కర్కాటకం', kn: 'ಕರ್ಕಾಟಕ', ml: 'കർക്കിടകം' },
    lord: { en: 'Moon', ta: 'சந்திரன்', hi: 'चन्द्र', te: 'చంద్రుడు', kn: 'ಚಂದ್ರ', ml: 'ചന്ദ്രൻ' },
    inRasiSpan: '1°-30°',
    zodiacSpan360: '90°-120°',
    stars: [
      {
        name: { en: 'Punarvasu', ta: 'புனர்பூசம்', hi: 'पुनर्वसु', te: 'పునర్వసు', kn: 'ಪುನರ್ವಸು', ml: 'പുണർതം' },
        lord: { en: 'Jupiter', ta: 'குரு', hi: 'गुरु', te: 'గురువు', kn: 'ಗುರು', ml: 'വ്യാഴം' },
        span: '3.20',
        padasCount: 1,
        inRasiDeg: "0°-3°20'",
        zodiacDeg: "90°-93°20'"
      },
      {
        name: { en: 'Pushya', ta: 'பூசம்', hi: 'पुष्य', te: 'పుష్యమి', kn: 'ಪುಷ್ಯ', ml: 'പൂയം' },
        lord: { en: 'Saturn', ta: 'சனி', hi: 'शनि', te: 'శని', kn: 'ಶನಿ', ml: 'ശനി' },
        span: '13.20',
        padasCount: 4,
        inRasiDeg: "3°20'-16°40'",
        zodiacDeg: "93°20'-106°40'"
      },
      {
        name: { en: 'Ashlesha', ta: 'ஆயில்யம்', hi: 'ஆश्लेषा', te: 'ఆశ్లేష', kn: 'ಆಶ್ಲೇಷಾ', ml: 'ആയില്യം' },
        lord: { en: 'Mercury', ta: 'புதன்', hi: 'बुध', te: 'బుధుడు', kn: 'ಬುಧ', ml: 'ಬುಧൻ' },
        span: '13.20',
        padasCount: 4,
        inRasiDeg: "16°40'-30°",
        zodiacDeg: "106°40'-120°"
      }
    ]
  },
  {
    rasiId: 4,
    order: 5,
    name: { en: 'Leo', ta: 'சிம்மம்', hi: 'सिंह', te: 'సింహం', kn: 'ಸಿಂಹ', ml: 'ചിങ്ങം' },
    lord: { en: 'Sun', ta: 'சூரியன்', hi: 'सूर्य', te: 'సూర్యుడు', kn: 'ಸೂರ್ಯ', ml: 'സூര്യன்' },
    inRasiSpan: '1°-30°',
    zodiacSpan360: '120°-150°',
    stars: [
      {
        name: { en: 'Magha', ta: 'மகம்', hi: 'मघा', te: 'మఖ', kn: 'ಮಖಾ', ml: 'മകം' },
        lord: { en: 'Ketu', ta: 'கேது', hi: 'கேது', te: 'కేతువు', kn: 'ಕೇತು', ml: 'കേതു' },
        span: '13.20',
        padasCount: 4,
        inRasiDeg: "0°-13°20'",
        zodiacDeg: "120°-133°20'"
      },
      {
        name: { en: 'Purva Phalguni', ta: 'பூரம்', hi: 'पूर्वाफाल्गुनी', te: 'పూర్వ ఫల్గుణి', kn: 'ಪೂರ್ವಾಫಲ್ಗುಣಿ', ml: 'പൂരം' },
        lord: { en: 'Venus', ta: 'சுக்கிரன்', hi: 'शुक्र', te: 'శుక్రుడు', kn: 'ಶುಕ್ರ', ml: 'ശുക്രൻ' },
        span: '13.20',
        padasCount: 4,
        inRasiDeg: "13°20'-26°40'",
        zodiacDeg: "133°20'-146°40'"
      },
      {
        name: { en: 'Uttara Phalguni', ta: 'உத்திரம்', hi: 'उत्तराफाल्गुनी', te: 'ఉత్తర ఫల్గుణి', kn: 'ಉತ್ತರಾಫಲ್ಗುಣಿ', ml: 'ഉത്രം' },
        lord: { en: 'Sun', ta: 'சூரியன்', hi: 'सूर्य', te: 'సూర్యుడు', kn: 'ಸೂರ್ಯ', ml: 'സூര്യன்' },
        span: '3.20',
        padasCount: 1,
        inRasiDeg: "26°40'-30°",
        zodiacDeg: "146°40'-150°"
      }
    ]
  },
  {
    rasiId: 5,
    order: 6,
    name: { en: 'Virgo', ta: 'கன்னி', hi: 'कन्या', te: 'కన్య', kn: 'ಕನ್ಯಾ', ml: 'കന്നി' },
    lord: { en: 'Mercury', ta: 'புதன்', hi: 'बुध', te: 'బుధుడు', kn: 'ಬುಧ', ml: 'ಬುಧൻ' },
    inRasiSpan: '1°-30°',
    zodiacSpan360: '150°-180°',
    stars: [
      {
        name: { en: 'Uttara Phalguni', ta: 'உத்திரம்', hi: 'उत्तराफाल्गुनी', te: 'ఉత్తర ఫల్గుణి', kn: 'ಉತ್ತರಾಫಲ್ಗುಣಿ', ml: 'ഉത്രം' },
        lord: { en: 'Sun', ta: 'சூரியன்', hi: 'सूर्य', te: 'సూర్యుడు', kn: 'ಸೂರ್ಯ', ml: 'സூര്യன்' },
        span: '10.00',
        padasCount: 3,
        inRasiDeg: "0°-10°",
        zodiacDeg: "150°-160°"
      },
      {
        name: { en: 'Hasta', ta: 'அஸ்தம்', hi: 'हस्त', te: 'హస్త', kn: 'ಹಸ್ತ', ml: 'അത്തം' },
        lord: { en: 'Moon', ta: 'சந்திரன்', hi: 'चन्द्र', te: 'చంద్రుడు', kn: 'ಚಂದ್ರ', ml: 'ചന്ദ്രൻ' },
        span: '13.20',
        padasCount: 4,
        inRasiDeg: "10°-23°20'",
        zodiacDeg: "160°-173°20'"
      },
      {
        name: { en: 'Chitra', ta: 'சித்திரை', hi: 'चित्रा', te: 'చిత్త', kn: 'ಚಿತ್ರಾ', ml: 'ചിത്തിര' },
        lord: { en: 'Mars', ta: 'செவ்வாய்', hi: 'मंगल', te: 'కుజుడు', kn: 'ಮಂಗಳ', ml: 'ചொവ്വ' },
        span: '6.40',
        padasCount: 2,
        inRasiDeg: "23°20'-30°",
        zodiacDeg: "173°20'-180°"
      }
    ]
  },
  {
    rasiId: 6,
    order: 7,
    name: { en: 'Libra', ta: 'துலாம்', hi: 'तुला', te: 'తుల', kn: 'ತುಲಾ', ml: 'തുലാം' },
    lord: { en: 'Venus', ta: 'சுக்கிரன்', hi: 'शुक्र', te: 'శుక్రుడు', kn: 'ಶುಕ್ರ', ml: 'ശുക്രൻ' },
    inRasiSpan: '1°-30°',
    zodiacSpan360: '180°-210°',
    stars: [
      {
        name: { en: 'Chitra', ta: 'சித்திரை', hi: 'चित्रा', te: 'చిత్త', kn: 'ಚಿತ್ರಾ', ml: 'ചിത്തിര' },
        lord: { en: 'Mars', ta: 'செவ்வாய்', hi: 'मंगल', te: 'కుజుడు', kn: 'ಮಂಗಳ', ml: 'ചொവ്വ' },
        span: '6.40',
        padasCount: 2,
        inRasiDeg: "0°-6°40'",
        zodiacDeg: "180°-186°40'"
      },
      {
        name: { en: 'Swati', ta: 'சுவாதி', hi: 'स्वाति', te: 'స్వాతి', kn: 'ಸ್ವಾತಿ', ml: 'ചോതി' },
        lord: { en: 'Rahu', ta: 'ராகு', hi: 'राहु', te: 'రాహువు', kn: 'ರಾಹು', ml: 'രാహు' },
        span: '13.20',
        padasCount: 4,
        inRasiDeg: "6°40'-20°",
        zodiacDeg: "186°40'-200°"
      },
      {
        name: { en: 'Vishakha', ta: 'விசாகம்', hi: 'विशाखा', te: 'విశాఖ', kn: 'ವಿಶಾಖಾ', ml: 'വിശാഖം' },
        lord: { en: 'Jupiter', ta: 'குரு', hi: 'गुरु', te: 'గురువు', kn: 'ಗುರು', ml: 'വ്യാഴം' },
        span: '10.00',
        padasCount: 3,
        inRasiDeg: "20°-30°",
        zodiacDeg: "200°-210°"
      }
    ]
  },
  {
    rasiId: 7,
    order: 8,
    name: { en: 'Scorpio', ta: 'விருச்சிகம்', hi: 'वृश्चिक', te: 'వృశ్చికం', kn: 'ವೃಶ್ಚಿಕ', ml: 'വൃശ്ചികം' },
    lord: { en: 'Mars', ta: 'செவ்வாய்', hi: 'मंगल', te: 'కుజుడు', kn: 'ಮಂಗಳ', ml: 'ചொവ്വ' },
    inRasiSpan: '1°-30°',
    zodiacSpan360: '210°-240°',
    stars: [
      {
        name: { en: 'Vishakha', ta: 'விசாகம்', hi: 'विशाखा', te: 'విశాఖ', kn: 'ವಿಶಾಖಾ', ml: 'വിശാഖം' },
        lord: { en: 'Jupiter', ta: 'குரு', hi: 'गुरु', te: 'గురువు', kn: 'ಗುರು', ml: 'വ്യാഴം' },
        span: '3.20',
        padasCount: 1,
        inRasiDeg: "0°-3°20'",
        zodiacDeg: "210°-213°20'"
      },
      {
        name: { en: 'Anuradha', ta: 'அனுஷம்', hi: 'अनुराधा', te: 'అనూరాధ', kn: 'ಅನುರಾಧಾ', ml: 'അനിഴം' },
        lord: { en: 'Saturn', ta: 'சனி', hi: 'शनि', te: 'శని', kn: 'ಶನಿ', ml: 'ശനി' },
        span: '13.20',
        padasCount: 4,
        inRasiDeg: "3°20'-16°40'",
        zodiacDeg: "213°20'-226°40'"
      },
      {
        name: { en: 'Jyeshtha', ta: 'கேட்டை', hi: 'ज्येष्ठा', te: 'జ్యేష్ఠ', kn: 'ಜ್ಯೇಷ್ಠಾ', ml: 'തൃക്കേട്ട' },
        lord: { en: 'Mercury', ta: 'புதன்', hi: 'बुध', te: 'ಬುಧుడు', kn: 'ಬುಧ', ml: 'ബുಧൻ' },
        span: '13.20',
        padasCount: 4,
        inRasiDeg: "16°40'-30°",
        zodiacDeg: "226°40'-240°"
      }
    ]
  },
  {
    rasiId: 8,
    order: 9,
    name: { en: 'Sagittarius', ta: 'தனுசு', hi: 'धनु', te: 'ధనుస్సు', kn: 'ಧನುಸ್ಸು', ml: 'ധനു' },
    lord: { en: 'Jupiter', ta: 'குரு', hi: 'गुरु', te: 'గురువు', kn: 'ಗುರು', ml: 'വ്യാഴം' },
    inRasiSpan: '1°-30°',
    zodiacSpan360: '240°-270°',
    stars: [
      {
        name: { en: 'Mula', ta: 'மூலம்', hi: 'मूल', te: 'మూల', kn: 'ಮೂಲ', ml: 'മൂലം' },
        lord: { en: 'Ketu', ta: 'கேது', hi: 'केतु', te: 'కేతువు', kn: 'ಕೇತು', ml: 'കേതു' },
        span: '13.20',
        padasCount: 4,
        inRasiDeg: "0°-13°20'",
        zodiacDeg: "240°-253°20'"
      },
      {
        name: { en: 'Purva Ashadha', ta: 'பூராடம்', hi: 'पूर्वाषाढ़ा', te: 'పూర్వాషాఢ', kn: 'ಪೂರ್ವಾಷಾಢ', ml: 'പൂരാടം' },
        lord: { en: 'Venus', ta: 'சுக்கிரன்', hi: 'शुक्र', te: 'శుక్రుడు', kn: 'ಶುಕ್ರ', ml: 'ശുക്രൻ' },
        span: '13.20',
        padasCount: 4,
        inRasiDeg: "13°20'-26°40'",
        zodiacDeg: "253°20'-266°40'"
      },
      {
        name: { en: 'Uttara Ashadha', ta: 'உத்திராடம்', hi: 'उत्तराषाढ़ा', te: 'ఉత్తరాషాఢ', kn: 'ಉತ್ತರಾಷಾಢ', ml: 'ഉത്രാടം' },
        lord: { en: 'Sun', ta: 'சூரியன்', hi: 'सूर्य', te: 'సూర్యుడు', kn: 'ಸೂರ್ಯ', ml: 'സூര്യൻ' },
        span: '3.20',
        padasCount: 1,
        inRasiDeg: "26°40'-30°",
        zodiacDeg: "266°40'-270°"
      }
    ]
  },
  {
    rasiId: 9,
    order: 10,
    name: { en: 'Capricorn', ta: 'மகரம்', hi: 'मकर', te: 'మకరం', kn: 'ಮಕರ', ml: 'മകരം' },
    lord: { en: 'Saturn', ta: 'சனி', hi: 'शनि', te: 'శని', kn: 'ಶನಿ', ml: 'ശനി' },
    inRasiSpan: '1°-30°',
    zodiacSpan360: '270°-300°',
    stars: [
      {
        name: { en: 'Uttara Ashadha', ta: 'உத்திராடம்', hi: 'उत्तराषाढ़ा', te: 'ఉత్తరాషాఢ', kn: 'ಉತ್ತರಾಷಾಢ', ml: 'ഉത്രാടം' },
        lord: { en: 'Sun', ta: 'சூரியன்', hi: 'सूर्य', te: 'సూర్యుడు', kn: 'ಸೂರ್ಯ', ml: 'സூര്യൻ' },
        span: '10.00',
        padasCount: 3,
        inRasiDeg: "0°-10°",
        zodiacDeg: "270°-280°"
      },
      {
        name: { en: 'Shravana', ta: 'திருவோணம்', hi: 'श्रवण', te: 'శ్రవణం', kn: 'ಶ್ರವಣ', ml: 'തിരുവോണം' },
        lord: { en: 'Moon', ta: 'சந்திரன்', hi: 'चन्द्र', te: 'చంద్రుడు', kn: 'ಚಂದ್ರ', ml: 'ചంద్రൻ' },
        span: '13.20',
        padasCount: 4,
        inRasiDeg: "10°-23°20'",
        zodiacDeg: "280°-293°20'"
      },
      {
        name: { en: 'Dhanishta', ta: 'அவிட்டம்', hi: 'धनिष्ठा', te: 'ధనిష్ఠ', kn: 'ಧನಿಷ್ಠಾ', ml: 'അவிட்டம்' },
        lord: { en: 'Mars', ta: 'செவ்வாய்', hi: 'मंगल', te: 'కుజుడు', kn: 'ಮಂಗಳ', ml: 'ചொവ്വ' },
        span: '6.40',
        padasCount: 2,
        inRasiDeg: "23°20'-30°",
        zodiacDeg: "293°20'-300°"
      }
    ]
  },
  {
    rasiId: 10,
    order: 11,
    name: { en: 'Aquarius', ta: 'கும்பம்', hi: 'कुम्भ', te: 'కుంభం', kn: 'ಕುಂಭ', ml: 'കുംഭം' },
    lord: { en: 'Saturn', ta: 'சனி', hi: 'शनि', te: 'శని', kn: 'ಶನಿ', ml: 'ശനി' },
    inRasiSpan: '1°-30°',
    zodiacSpan360: '300°-330°',
    stars: [
      {
        name: { en: 'Dhanishta', ta: 'அவிட்டம்', hi: 'धनिष्ठा', te: 'ధనిష్ఠ', kn: 'ಧನಿಷ್ಠಾ', ml: 'അவிட்டம்' },
        lord: { en: 'Mars', ta: 'செவ்வாய்', hi: 'मंगल', te: 'కుజుడు', kn: 'ಮಂಗಳ', ml: 'ചொവ്വ' },
        span: '6.40',
        padasCount: 2,
        inRasiDeg: "0°-6°40'",
        zodiacDeg: "300°-306°40'"
      },
      {
        name: { en: 'Shatabhisha', ta: 'சதயம்', hi: 'शतभिषा', te: 'శతభిషం', kn: 'ಶತಭಿಷಾ', ml: 'ചതയം' },
        lord: { en: 'Rahu', ta: 'ராகு', hi: 'राहु', te: 'రాహువు', kn: 'ರಾಹು', ml: 'രാಹು' },
        span: '13.20',
        padasCount: 4,
        inRasiDeg: "6°40'-20°",
        zodiacDeg: "306°40'-320°"
      },
      {
        name: { en: 'Purva Bhadrapada', ta: 'பூரட்டாதி', hi: 'पूर्वभाद्रपद', te: 'పూర్వాభాద్ర', kn: 'ಪೂರ್ವಾಭಾದ್ರಪದ', ml: 'പൂരുരുട്ടാതി' },
        lord: { en: 'Jupiter', ta: 'குரு', hi: 'गुरु', te: 'గురువు', kn: 'ಗುರು', ml: 'വ്യാഴം' },
        span: '10.00',
        padasCount: 3,
        inRasiDeg: "20°-30°",
        zodiacDeg: "320°-330°"
      }
    ]
  },
  {
    rasiId: 11,
    order: 12,
    name: { en: 'Pisces', ta: 'மீனம்', hi: 'मीन', te: 'మీనం', kn: 'ಮೀನ', ml: 'മീനം' },
    lord: { en: 'Jupiter', ta: 'குரு', hi: 'गुरु', te: 'గురువు', kn: 'ಗುರು', ml: 'വ്യാഴം' },
    inRasiSpan: '1°-30°',
    zodiacSpan360: '330°-360°',
    stars: [
      {
        name: { en: 'Purva Bhadrapada', ta: 'பூரட்டாதி', hi: 'पूर्वभाद्रपद', te: 'పూర్వాభాద్ర', kn: 'ಪೂರ್ವಾಭಾದ್ರಪದ', ml: 'പൂരുരുട്ടാതി' },
        lord: { en: 'Jupiter', ta: 'குரு', hi: 'गुरु', te: 'గురువు', kn: 'ಗುರು', ml: 'വ്യാഴം' },
        span: '3.20',
        padasCount: 1,
        inRasiDeg: "0°-3°20'",
        zodiacDeg: "330°-333°20'"
      },
      {
        name: { en: 'Uttara Bhadrapada', ta: 'உத்திரட்டாதி', hi: 'उत्तरभाद्रपद', te: 'ಉತ್ತರಾభాద్ర', kn: 'ಉತ್ತರಾಭಾದ್ರಪದ', ml: 'ഉത്രട്ടാതി' },
        lord: { en: 'Saturn', ta: 'சனி', hi: 'शनि', te: 'శని', kn: 'ಶನಿ', ml: 'ശനി' },
        span: '13.20',
        padasCount: 4,
        inRasiDeg: "3°20'-16°40'",
        zodiacDeg: "333°20'-346°40'"
      },
      {
        name: { en: 'Revati', ta: 'ரேவதி', hi: 'रेवती', te: 'రేవతి', kn: 'ರೇವತಿ', ml: 'രേവതി' },
        lord: { en: 'Mercury', ta: 'புதன்', hi: 'बुध', te: 'బుధుడు', kn: 'ಬುಧ', ml: 'ಬುಧൻ' },
        span: '13.20',
        padasCount: 4,
        inRasiDeg: "16°40'-30°",
        zodiacDeg: "346°40'-360°"
      }
    ]
  }
];

export default function NakshatraPadasPage() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'ta';
  const [searchParams, setSearchParams] = useSearchParams();

  const [allPadas, setAllPadas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'chart'); // 'chart' | 'table'
  const [selectedRasiId, setSelectedRasiId] = useState(0); // Default to Aries
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRasi, setFilterRasi] = useState('all');

  // Display mode for degrees: 'both' | 'rasi' | 'zodiac'
  const [degreeDisplayMode, setDegreeDisplayMode] = useState('both');
  // Mobile mode: 'fit' (Fit to screen 100%) or 'scroll' (HD scrollable)
  const [mobileMode, setMobileMode] = useState('fit');

  useEffect(() => {
    fetchPadasData();
  }, []);

  const fetchPadasData = async () => {
    setLoading(true);
    try {
      const data = await masterDataService.getNakshatraPadas();
      setAllPadas(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to load nakshatra padas:', err);
    } finally {
      setLoading(false);
    }
  };

  const breadcrumbItems = [
    { label: getUIString('home', currentLang, 'Home'), link: '/' },
    { label: getUIString('nakshatrasTitle', currentLang, 'Zodiac & Stars'), link: '/nakshatras' },
    {
      label: currentLang === 'ta' ? '108 நட்சத்திர பாதங்கள் (மண்டலம்)' : '108 Nakshatra Padas (Mandalam)',
      active: true
    }
  ];

  // Group fetched padas by rasiId for inspection
  const padasByRasi = useMemo(() => {
    const map = {};
    for (let i = 0; i < 12; i++) map[i] = [];
    allPadas.forEach((p) => {
      if (p.rasiId !== undefined && map[p.rasiId]) {
        map[p.rasiId].push(p);
      }
    });
    return map;
  }, [allPadas]);

  // Group fetched padas by Nakshatra (each star has exactly 4 padas)
  const padasByStar = useMemo(() => {
    const map = {};
    allPadas.forEach((p) => {
      const starNameEn = p.nakshatraName?.name || p.nakshatraName?.en;
      if (starNameEn) {
        if (!map[starNameEn]) map[starNameEn] = [];
        map[starNameEn].push(p);
      }
    });
    return map;
  }, [allPadas]);

  // Hover Tooltip State
  const [hoverTooltip, setHoverTooltip] = useState(null);

  const handleRasiMouseEnter = (e, rasiId) => {
    const def = MANDALAM_RASI_DEFINITIONS.find((r) => r.rasiId === rasiId);
    const padas = padasByRasi[rasiId] || [];
    const rect = e.currentTarget.getBoundingClientRect();
    setHoverTooltip({
      visible: true,
      type: 'rasi',
      targetRect: rect,
      rasiDef: def,
      padas
    });
  };

  const handleStarMouseEnter = (e, starNameEn, rasiId) => {
    e.stopPropagation();
    const def = MANDALAM_RASI_DEFINITIONS.find((r) => r.rasiId === rasiId);
    const starDef = def?.stars.find((s) => s.name.en === starNameEn);
    const padas = padasByStar[starNameEn] || [];
    const rect = e.currentTarget.getBoundingClientRect();
    setHoverTooltip({
      visible: true,
      type: 'star',
      targetRect: rect,
      starDef,
      rasiDef: def,
      padas
    });
  };

  const handleStarMouseLeave = (e, rasiId) => {
    e.stopPropagation();
    const cellEl = e.currentTarget.closest('.mandalam-cell');
    if (cellEl) {
      const def = MANDALAM_RASI_DEFINITIONS.find((r) => r.rasiId === rasiId);
      const padas = padasByRasi[rasiId] || [];
      const rect = cellEl.getBoundingClientRect();
      setHoverTooltip({
        visible: true,
        type: 'rasi',
        targetRect: rect,
        rasiDef: def,
        padas
      });
    } else {
      setHoverTooltip(null);
    }
  };

  const handleTooltipLeave = () => {
    setHoverTooltip(null);
  };

  const getTooltipStyle = (targetRect, type) => {
    if (!targetRect) return { display: 'none' };

    const tooltipWidth = type === 'rasi' ? 450 : 420;
    const tooltipHeight = type === 'rasi' ? 295 : 185;
    const margin = 12;

    let left = targetRect.right + margin;
    if (left + tooltipWidth > window.innerWidth - 10) {
      left = targetRect.left - tooltipWidth - margin;
    }
    if (left < 10) {
      left = Math.max(8, (window.innerWidth - tooltipWidth) / 2);
    }

    let top = targetRect.top;
    if (top + tooltipHeight > window.innerHeight - 10) {
      top = window.innerHeight - tooltipHeight - 10;
    }
    if (top < 10) {
      top = 10;
    }

    return {
      position: 'fixed',
      top: `${top}px`,
      left: `${left}px`,
      width: `${Math.min(tooltipWidth, window.innerWidth - 20)}px`,
      zIndex: 99999,
      pointerEvents: 'none'
    };
  };

  // Active selected sign padas
  const selectedPadas = padasByRasi[selectedRasiId] || [];
  const selectedRasiDef = MANDALAM_RASI_DEFINITIONS.find((r) => r.rasiId === selectedRasiId) || MANDALAM_RASI_DEFINITIONS[0];

  // Filtered table rows
  const filteredTablePadas = useMemo(() => {
    return allPadas.filter((p) => {
      const q = searchTerm.toLowerCase().trim();
      if (filterRasi !== 'all' && p.rasiId !== Number(filterRasi)) {
        return false;
      }
      if (!q) return true;

      const pName = getLocalizedValue(p.padaName, currentLang).toLowerCase();
      const nName = getLocalizedValue(p.nakshatraName, currentLang).toLowerCase();
      const rName = getLocalizedValue(p.rasiName, currentLang).toLowerCase();
      const sLord = getLocalizedValue(p.nakshatraAthipathi, currentLang).toLowerCase();
      const pLord = getLocalizedValue(p.padamAthipathi, currentLang).toLowerCase();
      const rLord = getLocalizedValue(p.rasiAthipathi, currentLang).toLowerCase();
      const aksharaVal = (p.akshara && (p.akshara[currentLang] || p.akshara.ta || p.akshara.en || ''))?.toLowerCase();
      const numMatch = String(p.padaNumber) === q || String(p.totalPadaIndex + 1) === q;

      return (
        numMatch ||
        pName.includes(q) ||
        nName.includes(q) ||
        rName.includes(q) ||
        sLord.includes(q) ||
        pLord.includes(q) ||
        rLord.includes(q) ||
        aksharaVal.includes(q)
      );
    });
  }, [allPadas, searchTerm, filterRasi, currentLang]);

  const breadcrumbsList = [
    { name: 'Home', path: ROUTES.HOME },
    { name: 'Zodiac & Planets', path: ROUTES.ZODIAC.RASIS },
    { name: currentLang === 'ta' ? '108 நட்சத்திர பாதங்கள்' : '108 Nakshatra Padas', path: ROUTES.ZODIAC.NAKSHATRA_PADAS }
  ];

  return (
    <div className="prokerala-layout-container">
      <SEOHead
        pageKey="nakshatraPadas"
        breadcrumbs={breadcrumbsList}
      />

      <Breadcrumbs items={[
        { label: getUIString('home', currentLang, 'Home'), link: ROUTES.HOME },
        { label: 'Zodiac & Planets', link: ROUTES.ZODIAC.RASIS },
        { label: currentLang === 'ta' ? '108 நட்சத்திர பாதங்கள்' : '108 Nakshatra Padas', active: true }
      ]} />

      <div className="mandalam-fullwidth-container">
        <div className="mandalam-page-wrapper">
            {/* Top Hero Banner */}
            <div className="mandalam-hero-card">
              <div className="mandalam-hero-left">
                <span className="mandalam-hero-icon">☸️</span>
                <div className="mandalam-title-group">
                  <h1>
                    {currentLang === 'ta'
                      ? 'நட்சத்திர மண்டலம் - 108 பாதங்கள்'
                      : 'Nakshatra Mandalam - 108 Padas'}
                  </h1>
                  <p>
                    {currentLang === 'ta'
                      ? '12 ராசிகள் (1°-30°), 27 நட்சத்திரங்கள் (0°-360° சக்கரம்), 108 நவாம்ச பாதங்கள்'
                      : '12 Signs (1°-30° in Rasi), 27 Stars (0°-360° Wheel), 108 Navamsa Padas with Athipathi Lords'}
                  </p>
                </div>
              </div>

              <div className="mandalam-hero-right">
                <span className="mandalam-stat-pill">
                  <span>♈ {currentLang === 'ta' ? 'ராசிகள்:' : 'Signs:'}</span>
                  <strong className="pill-num">12</strong>
                </span>
                <span className="mandalam-stat-pill">
                  <span>✨ {currentLang === 'ta' ? 'நட்சத்திரங்கள்:' : 'Stars:'}</span>
                  <strong className="pill-num">27</strong>
                </span>
                <span className="mandalam-stat-pill">
                  <span>🧭 {currentLang === 'ta' ? 'பாதங்கள்:' : 'Padas:'}</span>
                  <strong className="pill-num">108</strong>
                </span>
                <span className="mandalam-stat-pill">
                  <span>⭕ {currentLang === 'ta' ? 'சக்கரம்:' : 'Wheel:'}</span>
                  <strong className="pill-num">360°</strong>
                </span>
              </div>
            </div>

            {/* View Mode & Filter Controls */}
            <div className="mandalam-controls-bar">
              <div className="mandalam-tabs-group">
                <button
                  type="button"
                  className={`mandalam-tab-btn ${activeTab === 'chart' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab('chart');
                    setSearchParams({});
                  }}
                >
                  <span>🕉️</span>
                  <span>{currentLang === 'ta' ? 'மண்டல சக்கரம்' : 'Mandalam Chart'}</span>
                </button>
                <button
                  type="button"
                  className={`mandalam-tab-btn ${activeTab === 'table' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab('table');
                    setSearchParams({ tab: 'table' });
                  }}
                >
                  <span>📋</span>
                  <span>{currentLang === 'ta' ? '108 பாதங்கள் அட்டவணை' : '108 Padas Table'}</span>
                </button>
              </div>

              {/* Display Options for Chart View */}
              {activeTab === 'chart' && (
                <div className="mandalam-chart-options-group">
                  {/* Mobile Fit vs Scroll Mode Switcher */}
                  <div className="option-segmented-control mobile-only-toggle">
                    <button
                      type="button"
                      className={`seg-btn ${mobileMode === 'fit' ? 'active' : ''}`}
                      onClick={() => setMobileMode('fit')}
                      title="Fit all 12 signs in screen without scrollbar"
                    >
                      {currentLang === 'ta' ? '📱 முழு பார்வை (Fit)' : '📱 Fit Screen'}
                    </button>
                    <button
                      type="button"
                      className={`seg-btn ${mobileMode === 'scroll' ? 'active' : ''}`}
                      onClick={() => setMobileMode('scroll')}
                      title="Scrollable high resolution chart"
                    >
                      {currentLang === 'ta' ? '↔️ உருட்டு (Scroll)' : '↔️ Scroll HD'}
                    </button>
                  </div>

                  {/* Degree Mode Control */}
                  <div className="option-segmented-control">
                    <span className="control-lbl">{currentLang === 'ta' ? 'பாகை:' : 'Degrees:'}</span>
                    <button
                      type="button"
                      className={`seg-btn ${degreeDisplayMode === 'both' ? 'active' : ''}`}
                      onClick={() => setDegreeDisplayMode('both')}
                      title="Show both 1-30° in Rasi and 0-360° Zodiac"
                    >
                      {currentLang === 'ta' ? 'இரண்டும்' : 'Both'}
                    </button>
                    <button
                      type="button"
                      className={`seg-btn ${degreeDisplayMode === 'rasi' ? 'active' : ''}`}
                      onClick={() => setDegreeDisplayMode('rasi')}
                      title="Show 1-30° in Rasi only"
                    >
                      {currentLang === 'ta' ? '1°-30°' : '1°-30°'}
                    </button>
                    <button
                      type="button"
                      className={`seg-btn ${degreeDisplayMode === 'zodiac' ? 'active' : ''}`}
                      onClick={() => setDegreeDisplayMode('zodiac')}
                      title="Show 0-360° Zodiac only"
                    >
                      {currentLang === 'ta' ? '360°' : '360°'}
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'table' && (
                <div className="mandalam-search-box">
                  <span>🔍</span>
                  <input
                    type="text"
                    placeholder={
                      currentLang === 'ta'
                        ? 'நட்சத்திரம், பாதம், அதிபதி அல்லது எழுத்து தேடுக...'
                        : 'Search by Star, Pada #, Lord, or Syllable...'
                    }
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  {searchTerm && (
                    <button
                      type="button"
                      style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
                      onClick={() => setSearchTerm('')}
                    >
                      ✕
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* =========================================================================
                VIEW 1: Authentic South Indian Chart Grid (Clean Mobile & Tablet Layout)
                ========================================================================= */}
            {activeTab === 'chart' && (
              <div className="mandalam-chart-card">
                {/* Mobile scroll indicator banner when in scroll mode */}
                {mobileMode === 'scroll' && (
                  <div className="mobile-scroll-indicator-banner">
                    <span>👈 பக்கவாட்டில் நகர்த்தி 12 ராசிகளையும் காண்க (Swipe horizontally) 👉</span>
                  </div>
                )}

                <div className={`mandalam-chart-scroll-wrapper ${mobileMode === 'scroll' ? 'is-scroll-active' : ''}`}>
                  <div className={`mandalam-grid ${mobileMode === 'fit' ? 'is-mobile-fit-grid' : 'is-mobile-scroll-grid'}`}>
                    {/* Render the 12 boxes according to South Indian Kundli positions */}
                    {SOUTH_INDIAN_RASI_CHART_ORDER.map(({ rasiId, gridArea }) => {
                      const def = MANDALAM_RASI_DEFINITIONS.find((r) => r.rasiId === rasiId);
                      const isSelected = selectedRasiId === rasiId;
                      const rasiNameText = getLocalizedValue(def.name, currentLang);
                      const rasiLordText = getLocalizedValue(def.lord, currentLang);

                      return (
                        <div
                          key={rasiId}
                          className={`mandalam-cell ${isSelected ? 'active-selected' : ''}`}
                          style={{ gridArea }}
                          onClick={() => setSelectedRasiId(rasiId)}
                          onMouseEnter={(e) => handleRasiMouseEnter(e, rasiId)}
                          onMouseLeave={handleTooltipLeave}
                          title={`${rasiNameText} - ${rasiLordText}`}
                        >
                          {/* Box Header matching image + Degree Spans */}
                          <div
                            className="mandalam-cell-header"
                            onMouseEnter={(e) => handleRasiMouseEnter(e, rasiId)}
                          >
                            <div className="header-primary-line">
                              <span className="rasi-title">{rasiNameText}</span>
                              <span className="header-hyphen"> - </span>
                              <span className="rasi-lord">{rasiLordText}</span>
                            </div>
                            <div className="header-degrees-badge">
                              <span className="deg-pill rasi-pill" title="Degrees inside this Rasi">
                                1°-30°
                              </span>
                              <span className="deg-pill zodiac-pill" title="Degrees in 360° Zodiac wheel">
                                {def.zodiacSpan360}
                              </span>
                            </div>
                          </div>

                          {/* Star rows inside box */}
                          <div className="mandalam-stars-list">
                            {def.stars.map((st, sIdx) => {
                              const starNameText = getLocalizedValue(st.name, currentLang);
                              const starLordText = getLocalizedValue(st.lord, currentLang);

                              return (
                                <div
                                  key={sIdx}
                                  className="mandalam-star-line-compact"
                                  onMouseEnter={(e) => handleStarMouseEnter(e, st.name.en, rasiId)}
                                  onMouseLeave={(e) => handleStarMouseLeave(e, rasiId)}
                                  title={`${starNameText} - ${starLordText}`}
                                >
                                  {/* Line 1: Star Name - Lord & Span */}
                                  <div className="star-line-row1">
                                    <div className="star-name-group">
                                      <span className="star-name-col">{starNameText}</span>
                                      <span className="star-hyphen">-</span>
                                      <span className="star-lord-col">{starLordText}</span>
                                    </div>
                                    <span className="star-span-badge" title={`${st.padasCount} Padas (${st.span})`}>
                                      {st.span}
                                    </span>
                                  </div>

                                  {/* Line 2 (Mobile fit only): Lord on separate micro-line */}
                                  <div className="star-line-mobile-lord">
                                    <span className="mobile-lord-lbl">{starLordText}</span>
                                  </div>

                                  {/* Line 3: 1 to 30 Degree in Rasi & 0 to 360 Degree in Zodiac */}
                                  <div className="star-deg-strip">
                                    {(degreeDisplayMode === 'both' || degreeDisplayMode === 'rasi') && (
                                      <span className="deg-tag rasi-deg-tag" title="In-Rasi 1 to 30 degree span">
                                        <span className="tag-prefix">{currentLang === 'ta' ? 'ரா:' : 'R:'}</span>
                                        <strong>{st.inRasiDeg}</strong>
                                      </span>
                                    )}
                                    {(degreeDisplayMode === 'both' || degreeDisplayMode === 'zodiac') && (
                                      <span className="deg-tag zodiac-deg-tag" title="360° Zodiac wheel degree span">
                                        <span className="tag-prefix">360:</span>
                                        <strong>{st.zodiacDeg}</strong>
                                      </span>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}

                    {/* Center 2x2 Cell matching image: "நட்சத்திர மண்டலம்" */}
                    <div className="mandalam-center-box">
                      <h2 className="center-mandalam-title">
                        {currentLang === 'ta' ? 'நட்சத்திர மண்டலம்' : 'நட்சத்திர மண்டலம்'}
                      </h2>
                      <div className="center-mandalam-subtitle">
                        {currentLang === 'ta' ? '108 நவாம்ச பாதங்கள் & பாகைகள்' : '108 Navamsa Padas & Degree Wheel'}
                      </div>

                      <div className="center-metrics-strip">
                        <span className="center-metric-tag">
                          {currentLang === 'ta' ? 'ராசிக்கு:' : 'Per Sign:'} <strong>30° (1°-30°)</strong>
                        </span>
                        <span className="center-metric-tag">
                          {currentLang === 'ta' ? 'சக்கரம்:' : 'Wheel:'} <strong>0° - 360°</strong>
                        </span>
                        <span className="center-metric-tag">
                          1 Pada = <strong>3° 20'</strong>
                        </span>
                        <span className="center-metric-tag">
                          4 × 27 = <strong>108 Padas</strong>
                        </span>
                      </div>

                      <div className="center-hint-text">
                        {currentLang === 'ta'
                          ? '👆 ராசியை கிளிக் செய்து 9 பாதங்களின் நவாம்சம் & அக்ஷரங்களைக் காண்க'
                          : '👆 Click any sign to view all 9 padas, Navamsa lords & syllables below'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Selected Rasi Detailed Pada Inspection Box */}
                {selectedRasiDef && (
                  <div className="selected-rasi-padas-panel">
                    <div className="rasi-panel-header">
                      <div className="rasi-panel-title">
                        <span>♈</span>
                        <span>
                          {getLocalizedValue(selectedRasiDef.name, currentLang)} -{' '}
                          {getLocalizedValue(selectedRasiDef.lord, currentLang)}
                        </span>
                        <span className="rasi-badge-highlight">
                          1°-30° | 360°: {selectedRasiDef.zodiacSpan360}
                        </span>
                      </div>
                    </div>

                    {/* Grid of 9 padas in this sign */}
                    <div className="padas-cards-grid">
                      {selectedPadas.length > 0 ? (
                        selectedPadas.map((pada) => {
                          const pName = getLocalizedValue(pada.padaName, currentLang);
                          const sLord = getLocalizedValue(pada.nakshatraAthipathi, currentLang);
                          const pLord = getLocalizedValue(pada.padamAthipathi, currentLang);
                          const navSign = getLocalizedValue(pada.navamsaRasiName, currentLang);
                          const aksharaChar = pada.akshara?.[currentLang] || pada.akshara?.ta || pada.akshara?.en || '-';

                          return (
                            <div key={pada.padaNumber} className="pada-card-item-compact">
                              <div className="pada-card-top">
                                <span className="pada-num-badge">#{pada.padaNumber}</span>
                                <div className="pada-deg-spans-wrap">
                                  <span className="pada-deg-in-rasi" title="In Rasi 1 to 30 degree">
                                    {pada.rasiDegreeDisplay || `${pada.rasiStartDMS} - ${pada.rasiEndDMS}`}
                                  </span>
                                  <span className="pada-deg-360" title="360° Zodiac degree">
                                    360°: {pada.positionDegreeDisplay || `${pada.startDMS} - ${pada.endDMS}`}
                                  </span>
                                </div>
                              </div>

                              <div className="pada-name-heading">{pName}</div>

                              <div className="pada-attributes-compact-grid">
                                <div>
                                  <span className="attr-lbl">{currentLang === 'ta' ? 'நட்சத்திராதிபதி:' : 'Star Lord:'}</span>
                                  <strong>{sLord}</strong>
                                </div>
                                <div>
                                  <span className="attr-lbl">{currentLang === 'ta' ? 'பாதாதிபதி:' : 'Pada Lord:'}</span>
                                  <strong style={{ color: '#d97706' }}>{pLord}</strong>
                                </div>
                                <div>
                                  <span className="attr-lbl">{currentLang === 'ta' ? 'நவாம்சம்:' : 'Navamsa:'}</span>
                                  <strong>{navSign}</strong>
                                </div>
                                <div>
                                  <span className="attr-lbl">{currentLang === 'ta' ? 'அக்ஷரம்:' : 'Akshara:'}</span>
                                  <span className="pada-akshara-badge">{aksharaChar}</span>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div style={{ padding: '20px', color: '#64748b' }}>
                          {currentLang === 'ta' ? 'பாதத் தரவுகள் ஏற்றப்படுகின்றன...' : 'Loading padas data...'}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* =========================================================================
                VIEW 2: Full 108 Padas Master Table
                ========================================================================= */}
            {activeTab === 'table' && (
              <div className="mandalam-table-container">
                <table className="mandalam-data-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>{currentLang === 'ta' ? 'பாதம் & நட்சத்திரம்' : 'Pada & Star'}</th>
                      <th>{currentLang === 'ta' ? 'ராசி' : 'Rasi Sign'}</th>
                      <th>{currentLang === 'ta' ? 'ராசிக்குள் பாகை (1°-30°)' : 'In-Rasi Span (1°-30°)'}</th>
                      <th>{currentLang === 'ta' ? 'சக்கர பாகை (0°-360°)' : '360° Zodiac Span'}</th>
                      <th>{currentLang === 'ta' ? 'ராசி அதிபதி' : 'Rasi Lord'}</th>
                      <th>{currentLang === 'ta' ? 'நட்சத்திர அதிபதி' : 'Star Lord'}</th>
                      <th>{currentLang === 'ta' ? 'பாத அதிபதி (நவாம்சம்)' : 'Pada Lord (Navamsa)'}</th>
                      <th>{currentLang === 'ta' ? 'அக்ஷரம்' : 'Akshara'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTablePadas.map((p) => {
                      const pName = getLocalizedValue(p.padaName, currentLang);
                      const rName = getLocalizedValue(p.rasiName, currentLang);
                      const rLord = getLocalizedValue(p.rasiAthipathi, currentLang);
                      const sLord = getLocalizedValue(p.nakshatraAthipathi, currentLang);
                      const pLord = getLocalizedValue(p.padamAthipathi, currentLang);
                      const navSign = getLocalizedValue(p.navamsaRasiName, currentLang);
                      const aksharaChar = p.akshara?.[currentLang] || p.akshara?.ta || p.akshara?.en || '-';

                      return (
                        <tr key={p.padaNumber}>
                          <td className="table-pada-num">#{p.padaNumber}</td>
                          <td>
                            <strong>{pName}</strong>
                          </td>
                          <td>
                            <span>{rName}</span>
                          </td>
                          <td>
                            <span className="table-deg-badge rasi-deg-badge">
                              {p.rasiDegreeDisplay || `${p.rasiStartDMS} - ${p.rasiEndDMS}`}
                            </span>
                          </td>
                          <td>
                            <span className="table-deg-badge zodiac-deg-badge">
                              {p.positionDegreeDisplay || `${p.startDMS} - ${p.endDMS}`}
                            </span>
                          </td>
                          <td>{rLord}</td>
                          <td>{sLord}</td>
                          <td>
                            <strong>{pLord}</strong> ({navSign})
                          </td>
                          <td>
                            <span className="pada-akshara-badge">{aksharaChar}</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Floating Compact Hover Tooltip (9 Padas for Rasi / 4 Padas for Star) */}
        {hoverTooltip && hoverTooltip.visible && (
          <div
            className={`mandalam-hover-tooltip mandalam-${hoverTooltip.type}-tooltip`}
            style={getTooltipStyle(hoverTooltip.targetRect, hoverTooltip.type)}
          >
            {/* Tooltip Header */}
            <div className={`tooltip-header ${hoverTooltip.type}-tooltip-header`}>
              <div className="tooltip-title-row">
                <span className="tooltip-title-main">
                  {hoverTooltip.type === 'rasi' ? (
                    <>
                      ♈ {getLocalizedValue(hoverTooltip.rasiDef?.name, currentLang)} - 9{' '}
                      {currentLang === 'ta' ? 'பாதங்கள்' : 'Padas'}
                    </>
                  ) : (
                    <>
                      ✨ {getLocalizedValue(hoverTooltip.starDef?.name, currentLang)} - 4{' '}
                      {currentLang === 'ta' ? 'பாதங்கள்' : 'Padas'}
                    </>
                  )}
                </span>
                <span className="tooltip-degree-badge">
                  {hoverTooltip.type === 'rasi'
                    ? `1°-30° (${hoverTooltip.rasiDef?.zodiacSpan360})`
                    : (hoverTooltip.starDef?.span || "13°20'")}
                </span>
              </div>
              <div className="tooltip-subtitle">
                {hoverTooltip.type === 'rasi' ? (
                  <span>
                    {currentLang === 'ta' ? 'ராசி அதிபதி' : 'Sign Lord'}:{' '}
                    <strong>{getLocalizedValue(hoverTooltip.rasiDef?.lord, currentLang)}</strong>
                  </span>
                ) : (
                  <span>
                    {currentLang === 'ta' ? 'நட்சத்திர அதிபதி' : 'Star Lord'}:{' '}
                    <strong>{getLocalizedValue(hoverTooltip.starDef?.lord, currentLang)}</strong>
                  </span>
                )}
              </div>
            </div>

            {/* Compact Tooltip Table */}
            <div className="tooltip-table-wrapper">
              <table className="tooltip-compact-table">
                <thead>
                  <tr>
                    <th>{hoverTooltip.type === 'rasi' ? '#' : (currentLang === 'ta' ? 'பாதம்' : 'Pada')}</th>
                    <th>
                      {hoverTooltip.type === 'rasi'
                        ? (currentLang === 'ta' ? 'நட்சத்திர பாதம்' : 'Star & Pada')
                        : (currentLang === 'ta' ? 'ராசி' : 'Sign')}
                    </th>
                    <th>{currentLang === 'ta' ? 'பாத அதிபதி' : 'Pada Lord'}</th>
                    <th>{currentLang === 'ta' ? 'ராசியில்' : 'In Sign'}</th>
                    <th>360°</th>
                    <th>{currentLang === 'ta' ? 'அக்ஷரம்' : 'Sound'}</th>
                  </tr>
                </thead>
                <tbody>
                  {hoverTooltip.padas.map((p, idx) => {
                    const sName = getLocalizedValue(p.nakshatraName, currentLang);
                    const rName = getLocalizedValue(p.rasiName, currentLang);
                    const pLord = getLocalizedValue(p.padamAthipathi, currentLang);
                    const aksharaText = p.akshara?.[currentLang] || p.akshara?.ta || p.akshara?.en || '-';

                    return (
                      <tr key={idx}>
                        <td className="cell-pada-num">
                          {hoverTooltip.type === 'rasi' ? idx + 1 : (currentLang === 'ta' ? `பா ${p.pada}` : `P${p.pada}`)}
                        </td>
                        <td className="cell-col-main">
                          {hoverTooltip.type === 'rasi' ? (
                            <>
                              <strong>{sName}</strong> - {p.pada}
                            </>
                          ) : (
                            <strong>{rName}</strong>
                          )}
                        </td>
                        <td className="cell-pada-lord">{pLord}</td>
                        <td className="cell-deg-rasi">{p.rasiDegreeDisplay || p.padamSpan}</td>
                        <td className="cell-deg-360">{p.positionDegreeDisplay}</td>
                        <td className="cell-akshara">
                          <span className="tooltip-akshara-pill">{aksharaText}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
  );
}
