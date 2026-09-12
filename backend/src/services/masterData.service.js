import RasiMaster from '../models/RasiMaster.js';
import NakshatraMaster from '../models/NakshatraMaster.js';
import PlanetMaster from '../models/PlanetMaster.js';
import KalachakramMaster from '../models/KalachakramMaster.js';
import TithiMaster from '../models/TithiMaster.js';
import YogaMaster from '../models/YogaMaster.js';
import KaranaMaster from '../models/KaranaMaster.js';
import { TamilYearMaster, TamilMonthMaster } from '../models/TamilCalendarMaster.js';
import KPHoraryMaster from '../models/KPHoraryMaster.js';
import NakshatraPadaMaster from '../models/NakshatraPadaMaster.js';
import KadikaraPrasannamMaster from '../models/KadikaraPrasannamMaster.js';
import { KP_HORARY_DATA } from './kpHoraryData.js';
import { NAKSHATRA_PADAS_DATA } from './nakshatraPadaData.js';
import { KADIKARA_PRASANNAM_MASTER_DATA } from './kadikaraData.js';

export { NAKSHATRA_PADAS_DATA, KADIKARA_PRASANNAM_MASTER_DATA };

export const RASIS_DATA = [
  {
    rasiId: 0, order: 1, name: 'Aries', nameTa: 'மேஷம்', nameHi: 'मेष', nameTe: 'మేషం', nameKn: 'ಮೇಷ', nameMl: 'മേടം',
    sanskritName: 'मेष (Mesha)',
    athipathi: { planetId: 4, name: 'Mars', nameTa: 'செவ்வாய்', nameHi: 'मंगल', nameTe: 'కుజుడు', nameKn: 'ಮಂಗಳ', nameMl: 'ചൊവ്വ' },
    element: { name: 'Fire', nameTa: 'நெருப்பு', nameHi: 'अग्नि', nameTe: 'అగ్ని', nameKn: 'ಅಗ್ನಿ', nameMl: 'തീ' },
    mobility: { name: 'Movable', nameTa: 'சரம்', nameHi: 'चर', nameTe: 'చర', nameKn: 'ಚರ', nameMl: 'ചരം' },
    gender: { name: 'Male', nameTa: 'ஆண்', nameHi: 'पुरुष', nameTe: 'పురుష', nameKn: 'ಪುರುಷ', nameMl: 'പുരുഷൻ' },
    symbol: { name: 'Ram', nameTa: 'ஆடு', nameHi: 'भेड़', nameTe: 'గొర్రె', nameKn: 'ಕುರಿ', nameMl: 'ആട്' },
    direction: { name: 'East', nameTa: 'கிழக்கு', nameHi: 'पूर्व', nameTe: 'తూర్పు', nameKn: 'ಪೂರ್ವ', nameMl: 'കിഴക്ക്' },
    startDegree: 0, endDegree: 30
  },
  {
    rasiId: 1, order: 2, name: 'Taurus', nameTa: 'ரிஷபம்', nameHi: 'वृषभ', nameTe: 'వృషభం', nameKn: 'ವೃಷಭ', nameMl: 'ഇടവം',
    sanskritName: 'वृषभ (Vrishabha)',
    athipathi: { planetId: 3, name: 'Venus', nameTa: 'சுக்கிரன்', nameHi: 'शुक्र', nameTe: 'శుక్రుడు', nameKn: 'ಶುಕ್ರ', nameMl: 'ശുക്രൻ' },
    element: { name: 'Earth', nameTa: 'நிலம்', nameHi: 'पृथ्वी', nameTe: 'భూమి', nameKn: 'ಭೂಮಿ', nameMl: 'ഭൂമി' },
    mobility: { name: 'Fixed', nameTa: 'ஸ்திரம்', nameHi: 'स्थिर', nameTe: 'స్థిర', nameKn: 'ಸ್ಥಿರ', nameMl: 'സ്ഥിരം' },
    gender: { name: 'Female', nameTa: 'பெண்', nameHi: 'स्त्री', nameTe: 'స్త్రీ', nameKn: 'ಸ್ತ್ರೀ', nameMl: 'സ്ത്രീ' },
    symbol: { name: 'Bull', nameTa: 'காளை', nameHi: 'बैल', nameTe: 'ఎద్దు', nameKn: 'ಎತ್ತು', nameMl: 'കാള' },
    direction: { name: 'South', nameTa: 'தெற்கு', nameHi: 'दक्षिण', nameTe: 'దక్షిణం', nameKn: 'ದಕ್ಷಿಣ', nameMl: 'തെക്ക്' },
    startDegree: 30, endDegree: 60
  },
  {
    rasiId: 2, order: 3, name: 'Gemini', nameTa: 'மிதுனம்', nameHi: 'मिथुन', nameTe: 'మిథునం', nameKn: 'ಮಿಥುನ', nameMl: 'മിഥുനം',
    sanskritName: 'मिथुन (Mithuna)',
    athipathi: { planetId: 2, name: 'Mercury', nameTa: 'புதன்', nameHi: 'बुध', nameTe: 'బుధుడు', nameKn: 'ಬುಧ', nameMl: 'ബുധൻ' },
    element: { name: 'Air', nameTa: 'காற்று', nameHi: 'वायु', nameTe: 'వాయువు', nameKn: 'ವಾಯು', nameMl: 'വായു' },
    mobility: { name: 'Dual', nameTa: 'உபயம்', nameHi: 'द्विस्वभाव', nameTe: 'ద్విస్వభావ', nameKn: 'ದ್ವಿಸ್ವಭಾವ', nameMl: 'ഉഭയം' },
    gender: { name: 'Male', nameTa: 'ஆண்', nameHi: 'पुरुष', nameTe: 'పురుష', nameKn: 'ಪುರುಷ', nameMl: 'പുരുഷൻ' },
    symbol: { name: 'Twins', nameTa: 'இரட்டையர்', nameHi: 'मिथुन', nameTe: 'మిథునం', nameKn: 'ಜೋಡಿ', nameMl: 'ഇരട്ടകൾ' },
    direction: { name: 'West', nameTa: 'மேற்கு', nameHi: 'पश्चिम', nameTe: 'పడమర', nameKn: 'ಪಶ್ಚಿಮ', nameMl: 'പടിഞ്ഞാറ്' },
    startDegree: 60, endDegree: 90
  },
  {
    rasiId: 3, order: 4, name: 'Cancer', nameTa: 'கடகம்', nameHi: 'कर्क', nameTe: 'కర్కాటకం', nameKn: 'ಕರ್ಕಾಟಕ', nameMl: 'കർക്കടകം',
    sanskritName: 'कर्क (Karka)',
    athipathi: { planetId: 1, name: 'Moon', nameTa: 'சந்திரன்', nameHi: 'चन्द्र', nameTe: 'చంద్రుడు', nameKn: 'ಚಂದ್ರ', nameMl: 'ചന്ദ്രൻ' },
    element: { name: 'Water', nameTa: 'நீர்', nameHi: 'जल', nameTe: 'జలం', nameKn: 'ಜಲ', nameMl: 'വെള്ളം' },
    mobility: { name: 'Movable', nameTa: 'சரம்', nameHi: 'चर', nameTe: 'చర', nameKn: 'ಚರ', nameMl: 'ചരം' },
    gender: { name: 'Female', nameTa: 'பெண்', nameHi: 'स्त्री', nameTe: 'స్త్రీ', nameKn: 'ಸ್ತ್ರೀ', nameMl: 'സ്ത്രീ' },
    symbol: { name: 'Crab', nameTa: 'நண்டு', nameHi: 'केकड़ा', nameTe: 'పీత', nameKn: 'ಏಡಿ', nameMl: 'ഞണ്ട്' },
    direction: { name: 'North', nameTa: 'வடக்கு', nameHi: 'उत्तर', nameTe: 'ఉత్తరం', nameKn: 'ಉತ್ತರ', nameMl: 'വടക്ക്' },
    startDegree: 90, endDegree: 120
  },
  {
    rasiId: 4, order: 5, name: 'Leo', nameTa: 'சிம்மம்', nameHi: 'सिंह', nameTe: 'సింహం', nameKn: 'ಸಿಂಹ', nameMl: 'ചിങ്ങം',
    sanskritName: 'सिंह (Simha)',
    athipathi: { planetId: 0, name: 'Sun', nameTa: 'சூரியன்', nameHi: 'सूर्य', nameTe: 'సూర్యుడు', nameKn: 'ಸೂರ್ಯ', nameMl: 'സൂര്യൻ' },
    element: { name: 'Fire', nameTa: 'நெருப்பு', nameHi: 'अग्नि', nameTe: 'అగ్ని', nameKn: 'ಅಗ್ನಿ', nameMl: 'തീ' },
    mobility: { name: 'Fixed', nameTa: 'ஸ்திரம்', nameHi: 'स्थिर', nameTe: 'స్థిర', nameKn: 'ಸ್ಥಿರ', nameMl: 'സ്ഥിരം' },
    gender: { name: 'Male', nameTa: 'ஆண்', nameHi: 'पुरुष', nameTe: 'పురుష', nameKn: 'ಪುರುಷ', nameMl: 'പുരുഷൻ' },
    symbol: { name: 'Lion', nameTa: 'சிங்கம்', nameHi: 'सिंह', nameTe: 'సింహం', nameKn: 'ಸಿಂಹ', nameMl: 'സിംഹം' },
    direction: { name: 'East', nameTa: 'கிழக்கு', nameHi: 'पूर्व', nameTe: 'తూర్పు', nameKn: 'ಪೂರ್ವ', nameMl: 'കിഴക്ക്' },
    startDegree: 120, endDegree: 150
  },
  {
    rasiId: 5, order: 6, name: 'Virgo', nameTa: 'கன்னி', nameHi: 'कन्या', nameTe: 'కన్య', nameKn: 'ಕನ್ಯಾ', nameMl: 'കന്നി',
    sanskritName: 'कन्या (Kanya)',
    athipathi: { planetId: 2, name: 'Mercury', nameTa: 'புதன்', nameHi: 'बुध', nameTe: 'బుధుడు', nameKn: 'ಬುಧ', nameMl: 'ബുധൻ' },
    element: { name: 'Earth', nameTa: 'நிலம்', nameHi: 'पृथ्वी', nameTe: 'భూమి', nameKn: 'ಭೂಮಿ', nameMl: 'ഭൂമി' },
    mobility: { name: 'Dual', nameTa: 'உபயம்', nameHi: 'द्विस्वभाव', nameTe: 'ద్విస్వభావ', nameKn: 'ದ್ವಿಸ್ವಭಾವ', nameMl: 'ഉഭയം' },
    gender: { name: 'Female', nameTa: 'பெண்', nameHi: 'स्त्री', nameTe: 'స్త్రీ', nameKn: 'ಸ್ತ್ರೀ', nameMl: 'സ്ത്രീ' },
    symbol: { name: 'Virgin', nameTa: 'கன்னிப் பெண்', nameHi: 'कन्या', nameTe: 'కన్య', nameKn: 'ಕನ್ಯೆ', nameMl: 'കന്യക' },
    direction: { name: 'South', nameTa: 'தெற்கு', nameHi: 'दक्षिण', nameTe: 'దక్షిణం', nameKn: 'ದಕ್ಷಿಣ', nameMl: 'തെക്ക്' },
    startDegree: 150, endDegree: 180
  },
  {
    rasiId: 6, order: 7, name: 'Libra', nameTa: 'துலாம்', nameHi: 'तुला', nameTe: 'తుల', nameKn: 'ತುಲಾ', nameMl: 'തുലാം',
    sanskritName: 'तुला (Tula)',
    athipathi: { planetId: 3, name: 'Venus', nameTa: 'சுக்கிரன்', nameHi: 'शुक्र', nameTe: 'శుక్రుడు', nameKn: 'ಶುಕ್ರ', nameMl: 'ശുക്രൻ' },
    element: { name: 'Air', nameTa: 'காற்று', nameHi: 'वायु', nameTe: 'వాయువు', nameKn: 'ವಾಯು', nameMl: 'വായു' },
    mobility: { name: 'Movable', nameTa: 'சரம்', nameHi: 'चर', nameTe: 'చర', nameKn: 'ಚರ', nameMl: 'ചരം' },
    gender: { name: 'Male', nameTa: 'ஆண்', nameHi: 'पुरुष', nameTe: 'పురుష', nameKn: 'ಪುರುಷ', nameMl: 'പുരുഷൻ' },
    symbol: { name: 'Scales', nameTa: 'தராசு', nameHi: 'तराजू', nameTe: 'త్రాసు', nameKn: 'ತಕ್ಕಡಿ', nameMl: 'തുലാസ്' },
    direction: { name: 'West', nameTa: 'மேற்கு', nameHi: 'पश्चिम', nameTe: 'పడమర', nameKn: 'ಪಶ್ಚಿಮ', nameMl: 'പടിഞ്ഞാറ്' },
    startDegree: 180, endDegree: 210
  },
  {
    rasiId: 7, order: 8, name: 'Scorpio', nameTa: 'விருச்சிகம்', nameHi: 'वृश्चिक', nameTe: 'వృశ్చికం', nameKn: 'ವೃಶ್ಚಿಕ', nameMl: 'വൃശ്ചികം',
    sanskritName: 'वृश्चिक (Vrischika)',
    athipathi: { planetId: 4, name: 'Mars', nameTa: 'செவ்வாய்', nameHi: 'मंगल', nameTe: 'కుజుడు', nameKn: 'ಮಂಗಳ', nameMl: 'ചൊവ്വ' },
    element: { name: 'Water', nameTa: 'நீர்', nameHi: 'जल', nameTe: 'జలం', nameKn: 'ಜಲ', nameMl: 'വെള്ളം' },
    mobility: { name: 'Fixed', nameTa: 'ஸ்திரம்', nameHi: 'स्थिर', nameTe: 'స్థిర', nameKn: 'ಸ್ಥಿರ', nameMl: 'സ്ഥിരം' },
    gender: { name: 'Female', nameTa: 'பெண்', nameHi: 'स्त्री', nameTe: 'స్త్రీ', nameKn: 'ಸ್ತ್ರೀ', nameMl: 'സ്ത്രീ' },
    symbol: { name: 'Scorpion', nameTa: 'தேள்', nameHi: 'बिच्छू', nameTe: 'తేలు', nameKn: 'ಚೇಳು', nameMl: 'തേൾ' },
    direction: { name: 'North', nameTa: 'வடக்கு', nameHi: 'उत्तर', nameTe: 'ఉత్తరం', nameKn: 'ಉತ್ತರ', nameMl: 'വടക്ക്' },
    startDegree: 210, endDegree: 240
  },
  {
    rasiId: 8, order: 9, name: 'Sagittarius', nameTa: 'தனுசு', nameHi: 'धनु', nameTe: 'ధనుస్సు', nameKn: 'ಧನುಸ್ಸು', nameMl: 'ധനു',
    sanskritName: 'धनु (Dhanu)',
    athipathi: { planetId: 5, name: 'Jupiter', nameTa: 'குரு', nameHi: 'गुरु', nameTe: 'గురుడు', nameKn: 'ಗುರು', nameMl: 'വ്യാഴം' },
    element: { name: 'Fire', nameTa: 'நெருப்பு', nameHi: 'अग्नि', nameTe: 'అగ్ని', nameKn: 'ಅಗ್ನಿ', nameMl: 'തീ' },
    mobility: { name: 'Dual', nameTa: 'உபயம்', nameHi: 'द्विस्वभाव', nameTe: 'ద్విస్వభావ', nameKn: 'ದ್ವಿಸ್ವಭಾವ', nameMl: 'ഉഭയം' },
    gender: { name: 'Male', nameTa: 'ஆண்', nameHi: 'पुरुष', nameTe: 'పురుష', nameKn: 'ಪುರುಷ', nameMl: 'പുരുഷൻ' },
    symbol: { name: 'Bow & Arrow', nameTa: 'வில்', nameHi: 'धनुष', nameTe: 'విల్లు', nameKn: 'ಬಿಲ್ಲು', nameMl: 'വില്ല്' },
    direction: { name: 'East', nameTa: 'கிழக்கு', nameHi: 'पूर्व', nameTe: 'తూర్పు', nameKn: 'ಪೂರ್ವ', nameMl: 'കിഴക്ക്' },
    startDegree: 240, endDegree: 270
  },
  {
    rasiId: 9, order: 10, name: 'Capricorn', nameTa: 'மகரம்', nameHi: 'मकर', nameTe: 'మకరం', nameKn: 'ಮಕರ', nameMl: 'മകരം',
    sanskritName: 'मकर (Makara)',
    athipathi: { planetId: 6, name: 'Saturn', nameTa: 'சனி', nameHi: 'शनि', nameTe: 'శని', nameKn: 'ಶನಿ', nameMl: 'ശനി' },
    element: { name: 'Earth', nameTa: 'நிலம்', nameHi: 'पृथ्वी', nameTe: 'భూమి', nameKn: 'ಭೂಮಿ', nameMl: 'ഭൂമി' },
    mobility: { name: 'Movable', nameTa: 'சரம்', nameHi: 'चर', nameTe: 'చర', nameKn: 'ಚರ', nameMl: 'ചരം' },
    gender: { name: 'Female', nameTa: 'பெண்', nameHi: 'स्त्री', nameTe: 'స్త్రీ', nameKn: 'ಸ್ತ್ರೀ', nameMl: 'സ്ത്രീ' },
    symbol: { name: 'Crocodile', nameTa: 'சுறா/முதலை', nameHi: 'मकर', nameTe: 'మొసలి', nameKn: 'ಮೊಸಳೆ', nameMl: 'മൃഗം' },
    direction: { name: 'South', nameTa: 'தெற்கு', nameHi: 'दक्षिण', nameTe: 'దక్షిణం', nameKn: 'ದಕ್ಷಿಣ', nameMl: 'തെക്ക്' },
    startDegree: 270, endDegree: 300
  },
  {
    rasiId: 10, order: 11, name: 'Aquarius', nameTa: 'கும்பம்', nameHi: 'कुम्भ', nameTe: 'కుంభం', nameKn: 'ಕುಂಭ', nameMl: 'കുംഭം',
    sanskritName: 'कुम्भ (Kumbha)',
    athipathi: { planetId: 6, name: 'Saturn', nameTa: 'சனி', nameHi: 'शनि', nameTe: 'శని', nameKn: 'ಶನಿ', nameMl: 'ശനി' },
    element: { name: 'Air', nameTa: 'காற்று', nameHi: 'वायु', nameTe: 'వాయువు', nameKn: 'ವಾಯು', nameMl: 'വായു' },
    mobility: { name: 'Fixed', nameTa: 'ஸ்திரம்', nameHi: 'स्थिर', nameTe: 'స్థిర', nameKn: 'ಸ್ಥಿರ', nameMl: 'സ്ഥിരം' },
    gender: { name: 'Male', nameTa: 'ஆண்', nameHi: 'पुरुष', nameTe: 'పురుష', nameKn: 'ಪುರುಷ', nameMl: 'പുരുഷൻ' },
    symbol: { name: 'Pot', nameTa: 'குடம்', nameHi: 'घड़ा', nameTe: 'కుండ', nameKn: 'ಕೊಡ', nameMl: 'കുടം' },
    direction: { name: 'West', nameTa: 'மேற்கு', nameHi: 'पश्चिम', nameTe: 'పడమర', nameKn: 'ಪಶ್ಚಿಮ', nameMl: 'പടിഞ്ഞാറ്' },
    startDegree: 300, endDegree: 330
  },
  {
    rasiId: 11, order: 12, name: 'Pisces', nameTa: 'மீனம்', nameHi: 'मीन', nameTe: 'మీనం', nameKn: 'ಮೀನ', nameMl: 'മീനം',
    sanskritName: 'मीन (Meena)',
    athipathi: { planetId: 5, name: 'Jupiter', nameTa: 'குரு', nameHi: 'गुरु', nameTe: 'గురుడు', nameKn: 'ಗುರು', nameMl: 'വ്യാഴം' },
    element: { name: 'Water', nameTa: 'நீர்', nameHi: 'जल', nameTe: 'జలం', nameKn: 'ಜಲ', nameMl: 'വെള്ളം' },
    mobility: { name: 'Dual', nameTa: 'உபயம்', nameHi: 'द्विस्वभाव', nameTe: 'ద్విస్వభావ', nameKn: 'ದ್ವಿಸ್ವಭಾವ', nameMl: 'ഉഭയം' },
    gender: { name: 'Female', nameTa: 'பெண்', nameHi: 'स्त्री', nameTe: 'స్త్రీ', nameKn: 'ಸ್ತ್ರೀ', nameMl: 'സ്ത്രീ' },
    symbol: { name: 'Fishes', nameTa: 'மீன்கள்', nameHi: 'मछली', nameTe: 'చేపలు', nameKn: 'ಮೀನುಗಳು', nameMl: 'മത്സ്യം' },
    direction: { name: 'North', nameTa: 'வடக்கு', nameHi: 'उत्तर', nameTe: 'ఉత్తరం', nameKn: 'ಉತ್ತರ', nameMl: 'വടക്ക്' },
    startDegree: 330, endDegree: 360
  }
];

export const PLANETS_DATA = [
  {
    planetId: 0, name: 'Sun', nameTa: 'சூரியன்', nameHi: 'सूर्य', nameTe: 'సూర్యుడు', nameKn: 'ಸೂರ್ಯ', nameMl: 'സൂര്യൻ',
    shortName: 'Su', shortNameTa: 'சூரி', shortNameHi: 'सू', shortNameTe: 'సూ', shortNameKn: 'ಸೂ', shortNameMl: 'സൂ',
    sanskritName: 'Surya',
    nature: { name: 'Natural Malefic', nameTa: 'பாவி / கிரூரர்', nameHi: 'क्रूर ग्रह' },
    dayOfWeek: { name: 'Sunday', nameTa: 'ஞாயிறு', nameHi: 'रविवार', nameTe: 'ఆదివారం', nameKn: 'ಭಾನುವಾರ', nameMl: 'ഞായർ' }
  },
  {
    planetId: 1, name: 'Moon', nameTa: 'சந்திரன்', nameHi: 'चन्द्र', nameTe: 'చంద్రుడు', nameKn: 'ಚಂದ್ರ', nameMl: 'ചന്ദ്രൻ',
    shortName: 'Mo', shortNameTa: 'சந்', shortNameHi: 'चं', shortNameTe: 'చం', shortNameKn: 'ಚಂ', shortNameMl: 'ച',
    sanskritName: 'Chandra',
    nature: { name: 'Natural Benefic', nameTa: 'சுபர்', nameHi: 'शुभ ग्रह' },
    dayOfWeek: { name: 'Monday', nameTa: 'திங்கள்', nameHi: 'सोमवार', nameTe: 'సోమవారం', nameKn: 'ಸೋಮವಾರ', nameMl: 'തിങ്കൾ' }
  },
  {
    planetId: 2, name: 'Mercury', nameTa: 'புதன்', nameHi: 'बुध', nameTe: 'బుధుడు', nameKn: 'ಬುಧ', nameMl: 'ബുധൻ',
    shortName: 'Me', shortNameTa: 'புத', shortNameHi: 'बु', shortNameTe: 'బు', shortNameKn: 'ಬು', shortNameMl: 'ബു',
    sanskritName: 'Budha',
    nature: { name: 'Conditional Benefic', nameTa: 'சுபர் / பாவி', nameHi: 'शुभ ग्रह' },
    dayOfWeek: { name: 'Wednesday', nameTa: 'புதன்', nameHi: 'बुधवार', nameTe: 'బుధవారం', nameKn: 'ಬುಧವಾರ', nameMl: 'ബുധൻ' }
  },
  {
    planetId: 3, name: 'Venus', nameTa: 'சுக்கிரன்', nameHi: 'शुक्र', nameTe: 'శుక్రుడు', nameKn: 'ಶುಕ್ರ', nameMl: 'ശുക്രൻ',
    shortName: 'Ve', shortNameTa: 'சுக்', shortNameHi: 'शु', shortNameTe: 'శు', shortNameKn: 'ಶು', shortNameMl: 'ശു',
    sanskritName: 'Shukra',
    nature: { name: 'Natural Benefic', nameTa: 'சுபர்', nameHi: 'शुभ ग्रह' },
    dayOfWeek: { name: 'Friday', nameTa: 'வெள்ளி', nameHi: 'शुक्रवार', nameTe: 'శుక్రవారం', nameKn: 'ಶುಕ್ರವಾರ', nameMl: 'വെള്ളി' }
  },
  {
    planetId: 4, name: 'Mars', nameTa: 'செவ்வாய்', nameHi: 'मंगल', nameTe: 'కుజుడు', nameKn: 'ಮಂಗಳ', nameMl: 'ചൊവ്വ',
    shortName: 'Ma', shortNameTa: 'செவ்', shortNameHi: 'मं', shortNameTe: 'కు', shortNameKn: 'ಮಂ', shortNameMl: 'ചൊ',
    sanskritName: 'Mangala',
    nature: { name: 'Natural Malefic', nameTa: 'பாவி', nameHi: 'क्रूर ग्रह' },
    dayOfWeek: { name: 'Tuesday', nameTa: 'செவ்வாய்', nameHi: 'मंगलवार', nameTe: 'మంగళవారం', nameKn: 'ಮಂಗಳವಾರ', nameMl: 'ചൊവ്വ' }
  },
  {
    planetId: 5, name: 'Jupiter', nameTa: 'குரு', nameHi: 'गुरु', nameTe: 'గురుడు', nameKn: 'ಗುರು', nameMl: 'വ്യാഴം',
    shortName: 'Ju', shortNameTa: 'குரு', shortNameHi: 'गु', shortNameTe: 'గు', shortNameKn: 'ಗು', shortNameMl: 'ഗു',
    sanskritName: 'Guru / Brihaspati',
    nature: { name: 'Greatest Benefic', nameTa: 'முழு சுபர்', nameHi: 'शुभ ग्रह' },
    dayOfWeek: { name: 'Thursday', nameTa: 'வியாழன்', nameHi: 'गुरुवार', nameTe: 'గురువారం', nameKn: 'ಗುರುವಾರ', nameMl: 'വ്യാഴം' }
  },
  {
    planetId: 6, name: 'Saturn', nameTa: 'சனி', nameHi: 'शनि', nameTe: 'శని', nameKn: 'ಶನಿ', nameMl: 'ശനി',
    shortName: 'Sa', shortNameTa: 'சனி', shortNameHi: 'श', shortNameTe: 'శ', shortNameKn: 'ಶ', shortNameMl: 'ശ',
    sanskritName: 'Shani',
    nature: { name: 'Natural Malefic', nameTa: 'பாவி', nameHi: 'क्रूर ग्रह' },
    dayOfWeek: { name: 'Saturday', nameTa: 'சனி', nameHi: 'शनिवार', nameTe: 'శనివారం', nameKn: 'ಶನಿವಾರ', nameMl: 'ശനി' }
  },
  {
    planetId: 7, name: 'Rahu', nameTa: 'ராகு', nameHi: 'राहु', nameTe: 'రాహువు', nameKn: 'ರಾಹು', nameMl: 'രാഹു',
    shortName: 'Ra', shortNameTa: 'ராகு', shortNameHi: 'रा', shortNameTe: 'రా', shortNameKn: 'ರಾ', shortNameMl: 'രാ',
    sanskritName: 'Rahu (North Node)',
    nature: { name: 'Shadow Malefic', nameTa: 'சாயா கிரகம்', nameHi: 'छाया ग्रह' },
    dayOfWeek: { name: 'N/A', nameTa: 'ராகு காலம்' }
  },
  {
    planetId: 8, name: 'Ketu', nameTa: 'கேது', nameHi: 'केतु', nameTe: 'కేతువు', nameKn: 'ಕೇತು', nameMl: 'കേതു',
    shortName: 'Ke', shortNameTa: 'கேது', shortNameHi: 'के', shortNameTe: 'కే', shortNameKn: 'ಕೇ', shortNameMl: 'കേ',
    sanskritName: 'Ketu (South Node)',
    nature: { name: 'Shadow Moksha Karaka', nameTa: 'சாயா கிரகம்', nameHi: 'छाया ग्रह' },
    dayOfWeek: { name: 'N/A', nameTa: 'எமகண்டம்' }
  },
  {
    planetId: 9, name: 'Ascendant', nameTa: 'லக்னம்', nameHi: 'लग्न', nameTe: 'లగ్నం', nameKn: 'ಲಗ್ನ', nameMl: 'ലഗ്നം',
    shortName: 'As', shortNameTa: 'லக்', shortNameHi: 'ल', shortNameTe: 'ల', shortNameKn: 'ಲ', shortNameMl: 'ല',
    sanskritName: 'Lagna',
    nature: { name: 'Self / Pivot', nameTa: 'உயிர் நிலை', nameHi: 'लग्न भाव' },
    dayOfWeek: { name: 'N/A', nameTa: '-' }
  },
  {
    planetId: 10, name: 'Maandi', nameTa: 'மாந்தி', nameHi: 'मांदी', nameTe: 'మాంది', nameKn: 'ಮಾಂದಿ', nameMl: 'മാന്തി',
    shortName: 'Maa', shortNameTa: 'மா', shortNameHi: 'मां', shortNameTe: 'మాం', shortNameKn: 'ಮಾಂ', shortNameMl: 'മാ',
    sanskritName: 'Gulika / Mandi',
    nature: { name: 'Sub-planet (Upagraha)', nameTa: 'உபகிரகம்', nameHi: 'उपग्रह' },
    dayOfWeek: { name: 'N/A', nameTa: 'மாந்தி உதயம்' }
  }
];

export const NAKSHATRAS_DATA = [
  { nakshatraId: 0, order: 1, name: 'Ashwini', nameTa: 'அஸ்வினி', nameHi: 'अश्विनी', nameTe: 'అశ్విని', nameKn: 'ಅಶ್ವಿನಿ', nameMl: 'അശ്വതി', athipathi: { planetId: 8, name: 'Ketu', nameTa: 'கேது' }, startDegree: 0, endDegree: 13.3333 },
  { nakshatraId: 1, order: 2, name: 'Bharani', nameTa: 'பரணி', nameHi: 'भरणी', nameTe: 'భరణి', nameKn: 'ಭರಣಿ', nameMl: 'ഭരണി', athipathi: { planetId: 3, name: 'Venus', nameTa: 'சுக்கிரன்' }, startDegree: 13.3333, endDegree: 26.6667 },
  { nakshatraId: 2, order: 3, name: 'Krittika', nameTa: 'கார்த்திகை', nameHi: 'कृत्तिका', nameTe: 'కృత్తిక', nameKn: 'ಕೃತ್ತಿಕಾ', nameMl: 'കാർത്തിക', athipathi: { planetId: 0, name: 'Sun', nameTa: 'சூரியன்' }, startDegree: 26.6667, endDegree: 40 },
  { nakshatraId: 3, order: 4, name: 'Rohini', nameTa: 'ரோகிணி', nameHi: 'रोहिणी', nameTe: 'రోహిణి', nameKn: 'ರೋಹಿಣಿ', nameMl: 'രോഹിണി', athipathi: { planetId: 1, name: 'Moon', nameTa: 'சந்திரன்' }, startDegree: 40, endDegree: 53.3333 },
  { nakshatraId: 4, order: 5, name: 'Mrigashira', nameTa: 'மிருகசீரிஷம்', nameHi: 'मृगशिरा', nameTe: 'మృగశిర', nameKn: 'ಮೃಗಶಿರಾ', nameMl: 'മകയിരം', athipathi: { planetId: 4, name: 'Mars', nameTa: 'செவ்வாய்' }, startDegree: 53.3333, endDegree: 66.6667 },
  { nakshatraId: 5, order: 6, name: 'Ardra', nameTa: 'திருவாதிரை', nameHi: 'आर्द्रा', nameTe: 'ఆర్ద్ర', nameKn: 'ಆರ್ದ್ರಾ', nameMl: 'തിരുവാതിര', athipathi: { planetId: 7, name: 'Rahu', nameTa: 'ராகு' }, startDegree: 66.6667, endDegree: 80 },
  { nakshatraId: 6, order: 7, name: 'Punarvasu', nameTa: 'புனர்பூசம்', nameHi: 'पुनर्वसु', nameTe: 'పునర్వసు', nameKn: 'ಪುನರ್ವಸು', nameMl: 'പുണർതം', athipathi: { planetId: 5, name: 'Jupiter', nameTa: 'குரு' }, startDegree: 80, endDegree: 93.3333 },
  { nakshatraId: 7, order: 8, name: 'Pushya', nameTa: 'பூசம்', nameHi: 'पुष्य', nameTe: 'పుష్యమి', nameKn: 'ಪುಷ್ಯ', nameMl: 'പൂയം', athipathi: { planetId: 6, name: 'Saturn', nameTa: 'சனி' }, startDegree: 93.3333, endDegree: 106.6667 },
  { nakshatraId: 8, order: 9, name: 'Ashlesha', nameTa: 'ஆயில்யம்', nameHi: 'आश्लेषा', nameTe: 'ఆశ్లేష', nameKn: 'ಆಶ್ಲೇಷಾ', nameMl: 'ആയില്യം', athipathi: { planetId: 2, name: 'Mercury', nameTa: 'புதன்' }, startDegree: 106.6667, endDegree: 120 },
  { nakshatraId: 9, order: 10, name: 'Magha', nameTa: 'மகம்', nameHi: 'मघा', nameTe: 'మఖ', nameKn: 'ಮಖಾ', nameMl: 'മകം', athipathi: { planetId: 8, name: 'Ketu', nameTa: 'கேது' }, startDegree: 120, endDegree: 133.3333 },
  { nakshatraId: 10, order: 11, name: 'Purva Phalguni', nameTa: 'பூரம்', nameHi: 'पूर्वाफाल्गुनी', nameTe: 'పూర్వ ఫల్గుణి', nameKn: 'ಪೂರ್ವಾಫಲ್ಗುಣಿ', nameMl: 'പൂരം', athipathi: { planetId: 3, name: 'Venus', nameTa: 'சுக்கிரன்' }, startDegree: 133.3333, endDegree: 146.6667 },
  { nakshatraId: 11, order: 12, name: 'Uttara Phalguni', nameTa: 'உத்திரம்', nameHi: 'उत्तराफाल्गुनी', nameTe: 'ఉత్తర ఫల్గుణి', nameKn: 'ಉತ್ತರಾಫಲ್ಗುಣಿ', nameMl: 'ഉത്രം', athipathi: { planetId: 0, name: 'Sun', nameTa: 'சூரியன்' }, startDegree: 146.6667, endDegree: 160 },
  { nakshatraId: 12, order: 13, name: 'Hasta', nameTa: 'ஹஸ்தம்', nameHi: 'हस्त', nameTe: 'హస్త', nameKn: 'ಹಸ್ತ', nameMl: 'അത്തം', athipathi: { planetId: 1, name: 'Moon', nameTa: 'சந்திரன்' }, startDegree: 160, endDegree: 173.3333 },
  { nakshatraId: 13, order: 14, name: 'Chitra', nameTa: 'சித்திரை', nameHi: 'चित्रा', nameTe: 'చిత్త', nameKn: 'ಚಿತ್ರಾ', nameMl: 'ചിത്തിര', athipathi: { planetId: 4, name: 'Mars', nameTa: 'செவ்வாய்' }, startDegree: 173.3333, endDegree: 186.6667 },
  { nakshatraId: 14, order: 15, name: 'Swati', nameTa: 'சுவாதி', nameHi: 'स्वाति', nameTe: 'స్వాతి', nameKn: 'ಸ್ವಾತಿ', nameMl: 'ചോതി', athipathi: { planetId: 7, name: 'Rahu', nameTa: 'ராகு' }, startDegree: 186.6667, endDegree: 200 },
  { nakshatraId: 15, order: 16, name: 'Vishakha', nameTa: 'விசாகம்', nameHi: 'विशाखा', nameTe: 'విశాఖ', nameKn: 'ವಿಶಾಖಾ', nameMl: 'വിശാഖം', athipathi: { planetId: 5, name: 'Jupiter', nameTa: 'குரு' }, startDegree: 200, endDegree: 213.3333 },
  { nakshatraId: 16, order: 17, name: 'Anuradha', nameTa: 'அனுஷம்', nameHi: 'अनुराधा', nameTe: 'అనూరాధ', nameKn: 'ಅನುರಾಧಾ', nameMl: 'അനിഴം', athipathi: { planetId: 6, name: 'Saturn', nameTa: 'சனி' }, startDegree: 213.3333, endDegree: 226.6667 },
  { nakshatraId: 17, order: 18, name: 'Jyeshtha', nameTa: 'கேட்டை', nameHi: 'ज्येष्ठा', nameTe: 'జ్యేష్ఠ', nameKn: 'ಜ್ಯೇಷ್ಠಾ', nameMl: 'തൃക്കേട്ട', athipathi: { planetId: 2, name: 'Mercury', nameTa: 'புதன்' }, startDegree: 226.6667, endDegree: 240 },
  { nakshatraId: 18, order: 19, name: 'Mula', nameTa: 'மூலம்', nameHi: 'मूल', nameTe: 'మూల', nameKn: 'ಮೂಲ', nameMl: 'മൂലം', athipathi: { planetId: 8, name: 'Ketu', nameTa: 'கேது' }, startDegree: 240, endDegree: 253.3333 },
  { nakshatraId: 19, order: 20, name: 'Purva Ashadha', nameTa: 'பூராடம்', nameHi: 'पूर्वाषाढ़ा', nameTe: 'పూర్వాషాఢ', nameKn: 'ಪೂರ್ವಾಷಾಢ', nameMl: 'പൂരാടം', athipathi: { planetId: 3, name: 'Venus', nameTa: 'சுக்கிரன்' }, startDegree: 253.3333, endDegree: 266.6667 },
  { nakshatraId: 20, order: 21, name: 'Uttara Ashadha', nameTa: 'உத்திராடம்', nameHi: 'उत्तराषाढ़ा', nameTe: 'ఉత్తరాషాఢ', nameKn: 'ಉತ್ತರಾಷಾಢ', nameMl: 'ഉത്രാടം', athipathi: { planetId: 0, name: 'Sun', nameTa: 'சூரியன்' }, startDegree: 266.6667, endDegree: 280 },
  { nakshatraId: 21, order: 22, name: 'Shravana', nameTa: 'திருவோணம்', nameHi: 'श्रवण', nameTe: 'శ్రవణం', nameKn: 'ಶ್ರವಣ', nameMl: 'തിരുവോണം', athipathi: { planetId: 1, name: 'Moon', nameTa: 'சந்திரன்' }, startDegree: 280, endDegree: 293.3333 },
  { nakshatraId: 22, order: 23, name: 'Dhanishta', nameTa: 'அவிட்டம்', nameHi: 'धनिष्ठा', nameTe: 'ధనిష్ఠ', nameKn: 'ಧನಿಷ್ಠಾ', nameMl: 'അവിട്ടം', athipathi: { planetId: 4, name: 'Mars', nameTa: 'செவ்வாய்' }, startDegree: 293.3333, endDegree: 306.6667 },
  { nakshatraId: 23, order: 24, name: 'Shatabhisha', nameTa: 'சதயம்', nameHi: 'शतभिषा', nameTe: 'శతభిషం', nameKn: 'ಶತಭಿಷಾ', nameMl: 'ചതയം', athipathi: { planetId: 7, name: 'Rahu', nameTa: 'ராகு' }, startDegree: 306.6667, endDegree: 320 },
  { nakshatraId: 24, order: 25, name: 'Purva Bhadrapada', nameTa: 'பூரட்டாதி', nameHi: 'पूर्वभाद्रपद', nameTe: 'పూర్వాభాద్ర', nameKn: 'ಪೂರ್ವಾಭಾದ್ರಪದ', nameMl: 'പൂരുരുട്ടാതി', athipathi: { planetId: 5, name: 'Jupiter', nameTa: 'குரு' }, startDegree: 320, endDegree: 333.3333 },
  { nakshatraId: 25, order: 26, name: 'Uttara Bhadrapada', nameTa: 'உத்திரட்டாதி', nameHi: 'उत्तरभाद्रपद', nameTe: 'ఉత్తరాభాద్ర', nameKn: 'ಉತ್ತರಾಭಾದ್ರಪದ', nameMl: 'ഉത്രട്ടാതി', athipathi: { planetId: 6, name: 'Saturn', nameTa: 'சனி' }, startDegree: 333.3333, endDegree: 346.6667 },
  { nakshatraId: 26, order: 27, name: 'Revati', nameTa: 'ரேவதி', nameHi: 'रेवती', nameTe: 'రేవతి', nameKn: 'ರೇವತಿ', nameMl: 'രേവതി', athipathi: { planetId: 2, name: 'Mercury', nameTa: 'புதன்' }, startDegree: 346.6667, endDegree: 360 }
];

export const TITHIS_DATA = [
  { tithiId: 0, name: 'Prathama', nameTa: 'பிரதமை', nameHi: 'प्रतिपदा', nameTe: 'పాడ్యమి', nameKn: 'ಪಾಡ್ಯ', nameMl: 'പ്രഥമ', paksha: 'Shukla', pakshaTa: 'சுக்ல பக்ஷம்', number: 1, startDegree: 0, endDegree: 12 },
  { tithiId: 1, name: 'Dvitiya', nameTa: 'துவிதியை', nameHi: 'द्वितीया', nameTe: 'విదియ', nameKn: 'ಬಿದಿಗೆ', nameMl: 'ദ്വിതീയ', paksha: 'Shukla', pakshaTa: 'சுக்ல பக்ஷம்', number: 2, startDegree: 12, endDegree: 24 },
  { tithiId: 2, name: 'Tritiya', nameTa: 'திருதியை', nameHi: 'तृतीया', nameTe: 'తదియ', nameKn: 'ತದಿಗೆ', nameMl: 'തൃതീയ', paksha: 'Shukla', pakshaTa: 'சுக்ல பக்ஷம்', number: 3, startDegree: 24, endDegree: 36 },
  { tithiId: 3, name: 'Chaturthi', nameTa: 'சதுர்த்தி', nameHi: 'चतुर्थी', nameTe: 'చవితి', nameKn: 'ಚೌತಿ', nameMl: 'ചതുർത്ഥി', paksha: 'Shukla', pakshaTa: 'சுக்ல பக்ஷம்', number: 4, startDegree: 36, endDegree: 48 },
  { tithiId: 4, name: 'Panchami', nameTa: 'பஞ்சமி', nameHi: 'पञ्चमी', nameTe: 'పంచమి', nameKn: 'ಪಂಚಮಿ', nameMl: 'പഞ്ചമി', paksha: 'Shukla', pakshaTa: 'சுக்ல பக்ஷம்', number: 5, startDegree: 48, endDegree: 60 },
  { tithiId: 5, name: 'Shashthi', nameTa: 'சஷ்டி', nameHi: 'षष्ठी', nameTe: 'షష్ఠి', nameKn: 'ಷಷ್ಠಿ', nameMl: 'ഷഷ്ഠി', paksha: 'Shukla', pakshaTa: 'சுக்ல பக்ஷம்', number: 6, startDegree: 60, endDegree: 72 },
  { tithiId: 6, name: 'Saptami', nameTa: 'சப்தமி', nameHi: 'सप्तमी', nameTe: 'సప్తమి', nameKn: 'ಸಪ್ತಮಿ', nameMl: 'സപ്തമി', paksha: 'Shukla', pakshaTa: 'சுக்ல பக்ஷம்', number: 7, startDegree: 72, endDegree: 84 },
  { tithiId: 7, name: 'Ashtami', nameTa: 'அஷ்டமி', nameHi: 'अष्टमी', nameTe: 'అష్టమి', nameKn: 'ಅಷ್ಟಮಿ', nameMl: 'അഷ്ടമി', paksha: 'Shukla', pakshaTa: 'சுக்ல பக்ஷம்', number: 8, startDegree: 84, endDegree: 96 },
  { tithiId: 8, name: 'Navami', nameTa: 'நவமி', nameHi: 'नवमी', nameTe: 'నవమి', nameKn: 'ನವಮಿ', nameMl: 'നവമി', paksha: 'Shukla', pakshaTa: 'சுக்ல பக்ஷம்', number: 9, startDegree: 96, endDegree: 108 },
  { tithiId: 9, name: 'Dashami', nameTa: 'தசமி', nameHi: 'दशमी', nameTe: 'దశమి', nameKn: 'ದಶಮಿ', nameMl: 'ദശമി', paksha: 'Shukla', pakshaTa: 'சுக்ல பக்ஷம்', number: 10, startDegree: 108, endDegree: 120 },
  { tithiId: 10, name: 'Ekadashi', nameTa: 'ஏகாதசி', nameHi: 'एकादशी', nameTe: 'ఏకాదశి', nameKn: 'ಏಕಾದಶಿ', nameMl: 'ഏകാദശി', paksha: 'Shukla', pakshaTa: 'சுக்ல பக்ஷம்', number: 11, startDegree: 120, endDegree: 132 },
  { tithiId: 11, name: 'Dvadashi', nameTa: 'துவாதசி', nameHi: 'द्वादशी', nameTe: 'ద్వాదశి', nameKn: 'ದ್ವಾದಶಿ', nameMl: 'ദ്വാദശി', paksha: 'Shukla', pakshaTa: 'சுக்ல பக்ஷம்', number: 12, startDegree: 132, endDegree: 144 },
  { tithiId: 12, name: 'Trayodashi', nameTa: 'திரயோதசி', nameHi: 'त्रयोदशी', nameTe: 'త్రయోదశి', nameKn: 'ತ್ರಯೋದಶಿ', nameMl: 'ത്രയോദശി', paksha: 'Shukla', pakshaTa: 'சுக்ல பக்ஷம்', number: 13, startDegree: 144, endDegree: 156 },
  { tithiId: 13, name: 'Chaturdashi', nameTa: 'சதுர்த்தசி', nameHi: 'चतुर्दशी', nameTe: 'చతుర్దశి', nameKn: 'ಚತುರ್ದಶಿ', nameMl: 'ചതുർദ്ദശി', paksha: 'Shukla', pakshaTa: 'சுக்ல பக்ஷம்', number: 14, startDegree: 156, endDegree: 168 },
  { tithiId: 14, name: 'Purnima', nameTa: 'பௌர்ணமி', nameHi: 'पूर्णिमा', nameTe: 'పూర్ణిమ', nameKn: 'ಹುಣ್ಣಿಮೆ', nameMl: 'പൗർണ്ണമി', paksha: 'Shukla', pakshaTa: 'சுக்ல பக்ஷம்', number: 15, startDegree: 168, endDegree: 180 },
  { tithiId: 15, name: 'Krishna Prathama', nameTa: 'பிரதமை', nameHi: 'प्रतिपदा', nameTe: 'పాడ్యమి', nameKn: 'ಪಾಡ್ಯ', nameMl: 'പ്രഥമ', paksha: 'Krishna', pakshaTa: 'கிருஷ்ண பக்ஷம்', number: 1, startDegree: 180, endDegree: 192 },
  { tithiId: 16, name: 'Krishna Dvitiya', nameTa: 'துவிதியை', nameHi: 'द्वितीया', nameTe: 'విదియ', nameKn: 'ಬಿದಿಗೆ', nameMl: 'ദ്വിതീയ', paksha: 'Krishna', pakshaTa: 'கிருஷ்ண பக்ஷம்', number: 2, startDegree: 192, endDegree: 204 },
  { tithiId: 17, name: 'Krishna Tritiya', nameTa: 'திருதியை', nameHi: 'तृतीया', nameTe: 'తదియ', nameKn: 'ತದಿಗೆ', nameMl: 'തൃതീയ', paksha: 'Krishna', pakshaTa: 'கிருஷ்ண பக்ஷம்', number: 3, startDegree: 204, endDegree: 216 },
  { tithiId: 18, name: 'Krishna Chaturthi', nameTa: 'சதுர்த்தி', nameHi: 'चतुर्थी', nameTe: 'చవితి', nameKn: 'ಚೌತಿ', nameMl: 'ചതുർത്ഥി', paksha: 'Krishna', pakshaTa: 'கிருஷ்ண பக்ஷம்', number: 4, startDegree: 216, endDegree: 228 },
  { tithiId: 19, name: 'Krishna Panchami', nameTa: 'பஞ்சமி', nameHi: 'पञ्चमी', nameTe: 'పంచమి', nameKn: 'ಪಂಚಮಿ', nameMl: 'പഞ്ചമി', paksha: 'Krishna', pakshaTa: 'கிருஷ்ண பக்ஷம்', number: 5, startDegree: 228, endDegree: 240 },
  { tithiId: 20, name: 'Krishna Shashthi', nameTa: 'சஷ்டி', nameHi: 'षष्ठी', nameTe: 'షష్ఠి', nameKn: 'ಷಷ್ಠಿ', nameMl: 'ഷഷ്ഠി', paksha: 'Krishna', pakshaTa: 'கிருஷ்ண பக்ஷம்', number: 6, startDegree: 240, endDegree: 252 },
  { tithiId: 21, name: 'Krishna Saptami', nameTa: 'சப்தமி', nameHi: 'सप्तमी', nameTe: 'సప్తమి', nameKn: 'ಸಪ್ತಮಿ', nameMl: 'സപ്തമി', paksha: 'Krishna', pakshaTa: 'கிருஷ்ண பக்ஷம்', number: 7, startDegree: 252, endDegree: 264 },
  { tithiId: 22, name: 'Krishna Ashtami', nameTa: 'அஷ்டமி', nameHi: 'अष्टमी', nameTe: 'అష్టమి', nameKn: 'ಅಷ್ಟಮಿ', nameMl: 'അഷ്ടമി', paksha: 'Krishna', pakshaTa: 'கிருஷ்ண பக்ஷம்', number: 8, startDegree: 264, endDegree: 276 },
  { tithiId: 23, name: 'Krishna Navami', nameTa: 'நவமி', nameHi: 'नवमी', nameTe: 'నవమి', nameKn: 'ನವಮಿ', nameMl: 'നവമി', paksha: 'Krishna', pakshaTa: 'கிருஷ்ண பக்ஷம்', number: 9, startDegree: 276, endDegree: 288 },
  { tithiId: 24, name: 'Krishna Dashami', nameTa: 'தசமி', nameHi: 'दशमी', nameTe: 'దశమి', nameKn: 'ದಶಮಿ', nameMl: 'ദശമി', paksha: 'Krishna', pakshaTa: 'கிருஷ்ண பக்ஷம்', number: 10, startDegree: 288, endDegree: 300 },
  { tithiId: 25, name: 'Krishna Ekadashi', nameTa: 'ஏகாதசி', nameHi: 'एकादशी', nameTe: 'ఏకాదశి', nameKn: 'ಏಕಾದಶಿ', nameMl: 'ഏകാദശി', paksha: 'Krishna', pakshaTa: 'கிருஷ்ண பக்ஷம்', number: 11, startDegree: 300, endDegree: 312 },
  { tithiId: 26, name: 'Krishna Dvadashi', nameTa: 'துவாதசி', nameHi: 'द्वादशी', nameTe: 'ద్వాదశి', nameKn: 'ದ್ವಾದಶಿ', nameMl: 'ദ്വാദശി', paksha: 'Krishna', pakshaTa: 'கிருஷ்ண பக்ஷம்', number: 12, startDegree: 312, endDegree: 324 },
  { tithiId: 27, name: 'Krishna Trayodashi', nameTa: 'திரயோதசி', nameHi: 'त्रयोदशी', nameTe: 'త్రయోదశి', nameKn: 'ತ್ರಯೋದಶಿ', nameMl: 'ത്രയോദശി', paksha: 'Krishna', pakshaTa: 'கிருஷ்ண பக்ஷம்', number: 13, startDegree: 324, endDegree: 336 },
  { tithiId: 28, name: 'Krishna Chaturdashi', nameTa: 'சதுர்த்தசி', nameHi: 'चतुर्दशी', nameTe: 'చతుర్దశి', nameKn: 'ಚತುರ್ದಶಿ', nameMl: 'ചതുർദ്ദശി', paksha: 'Krishna', pakshaTa: 'கிருஷ்ண பக்ஷம்', number: 14, startDegree: 336, endDegree: 348 },
  { tithiId: 29, name: 'Amavasya', nameTa: 'அமாவாசை', nameHi: 'अमावस्या', nameTe: 'అమావాస్య', nameKn: 'ಅಮಾವಾಸ್ಯೆ', nameMl: 'അമാവാസി', paksha: 'Krishna', pakshaTa: 'கிருஷ்ண பக்ஷம்', number: 15, startDegree: 348, endDegree: 360 }
];

export const YOGAS_DATA = [
  { yogaId: 0, name: 'Vishkumbha', nameTa: 'விஷ்கம்பம்', nameHi: 'विष्कम्भ', nameTe: 'విష్కంభం', nameKn: 'ವಿಷ್ಕಂಭ', nameMl: 'വിഷ്കംഭം' },
  { yogaId: 1, name: 'Priti', nameTa: 'பிரீதி', nameHi: 'प्रीति', nameTe: 'ప్రీతి', nameKn: 'ಪ್ರೀತಿ', nameMl: 'പ്രീതി' },
  { yogaId: 2, name: 'Ayushman', nameTa: 'ஆயுஷ்மான்', nameHi: 'आयुष्मान', nameTe: 'ఆయుష్మాన్', nameKn: 'ಆಯುಷ್ಮಾನ್', nameMl: 'ആയുഷ്മാൻ' },
  { yogaId: 3, name: 'Saubhagya', nameTa: 'சௌபாக்யம்', nameHi: 'सौभाग्य', nameTe: 'సౌభాగ్యం', nameKn: 'ಸೌಭಾಗ್ಯ', nameMl: 'സൗഭാഗ്യം' },
  { yogaId: 4, name: 'Shobhana', nameTa: 'சோபனம்', nameHi: 'शोभन', nameTe: 'శోభనం', nameKn: 'ಶೋಭನ', nameMl: 'ശോഭനം' },
  { yogaId: 5, name: 'Atiganda', nameTa: 'அதிகண்டம்', nameHi: 'अतिगण्ड', nameTe: 'అతిగండం', nameKn: 'ಅತಿಗಂಡ', nameMl: 'അതിഗണ്ഡം' },
  { yogaId: 6, name: 'Sukarma', nameTa: 'சுகர்மம்', nameHi: 'सुकर्मा', nameTe: 'సుకర్మం', nameKn: 'ಸುಕರ್ಮ', nameMl: 'സുകർമ്മം' },
  { yogaId: 7, name: 'Dhriti', nameTa: 'திருதி', nameHi: 'धृति', nameTe: 'ధృతి', nameKn: 'ಧೃತಿ', nameMl: 'ധൃതി' },
  { yogaId: 8, name: 'Shula', nameTa: 'சூலம்', nameHi: 'शूल', nameTe: 'శూలం', nameKn: 'ಶೂಲ', nameMl: 'ശൂലം' },
  { yogaId: 9, name: 'Ganda', nameTa: 'கண்டம்', nameHi: 'गण्ड', nameTe: 'గండం', nameKn: 'ಗಂಡ', nameMl: 'ഗണ്ഡം' },
  { yogaId: 10, name: 'Vriddhi', nameTa: 'விருத்தி', nameHi: 'वृद्धि', nameTe: 'వృద్ధి', nameKn: 'ವೃದ್ಧಿ', nameMl: 'വൃദ്ധി' },
  { yogaId: 11, name: 'Dhruva', nameTa: 'துருவம்', nameHi: 'ध्रुव', nameTe: 'ధ్రువం', nameKn: 'ಧ್ರುವ', nameMl: 'ധ്രുവം' },
  { yogaId: 12, name: 'Vyaghata', nameTa: 'வியாகாதம்', nameHi: 'व्याघात', nameTe: 'వ్యాఘాతం', nameKn: 'ವ್ಯಾಘಾತ', nameMl: 'വ്യാഘാതം' },
  { yogaId: 13, name: 'Harshana', nameTa: 'ஹர்ஷணம்', nameHi: 'हर्षण', nameTe: 'హర్షణం', nameKn: 'ಹರ್ಷಣ', nameMl: 'ഹർഷണം' },
  { yogaId: 14, name: 'Vajra', nameTa: 'வஜ்ரம்', nameHi: 'वज्र', nameTe: 'వజ్రం', nameKn: 'ವಜ್ರ', nameMl: 'വജ്രം' },
  { yogaId: 15, name: 'Siddhi', nameTa: 'சித்தி', nameHi: 'सिद्धि', nameTe: 'సిద్ధి', nameKn: 'ಸಿದ್ಧಿ', nameMl: 'സിദ്ധി' },
  { yogaId: 16, name: 'Vyatipata', nameTa: 'வியதிபாதம்', nameHi: 'व्यतीपात', nameTe: 'వ్యతీపాతం', nameKn: 'ವ್ಯತೀಪಾತ', nameMl: 'വ്യതീപാതം' },
  { yogaId: 17, name: 'Variyan', nameTa: 'வரியான்', nameHi: 'वरीयान', nameTe: 'వరీయాన్', nameKn: 'ವರೀಯಾನ್', nameMl: 'വരീയാൻ' },
  { yogaId: 18, name: 'Parigha', nameTa: 'பரிகம்', nameHi: 'परिघ', nameTe: 'పరిఘం', nameKn: 'ಪರಿಘ', nameMl: 'പരിഘം' },
  { yogaId: 19, name: 'Shiva', nameTa: 'சிவம்', nameHi: 'शिव', nameTe: 'శివం', nameKn: 'ಶಿವ', nameMl: 'ശിവം' },
  { yogaId: 20, name: 'Siddha', nameTa: 'சித்தம்', nameHi: 'सिद्ध', nameTe: 'సిద్ధం', nameKn: 'ಸಿದ್ಧ', nameMl: 'സിദ്ധം' },
  { yogaId: 21, name: 'Sadhya', nameTa: 'சாத்தியம்', nameHi: 'साध्य', nameTe: 'సాధ్యం', nameKn: 'ಸಾಧ್ಯ', nameMl: 'സാധ്യം' },
  { yogaId: 22, name: 'Shubha', nameTa: 'சுபம்', nameHi: 'शुभ', nameTe: 'శుభం', nameKn: 'ಶುಭ', nameMl: 'ശുഭം' },
  { yogaId: 23, name: 'Shukla', nameTa: 'சுப்பிரம்', nameHi: 'शुक्ल', nameTe: 'శుక్లం', nameKn: 'ಶುಕ್ಲ', nameMl: 'ശുക്ലം' },
  { yogaId: 24, name: 'Brahma', nameTa: 'பிராமியம்', nameHi: 'ब्रह्म', nameTe: 'బ్రహ్మ', nameKn: 'ಬ್ರಹ್ಮ', nameMl: 'ബ്രഹ്മം' },
  { yogaId: 25, name: 'Indra', nameTa: 'ஐந்திரம்', nameHi: 'इन्द्र', nameTe: 'ఐంద్రం', nameKn: 'ಐಂದ್ರ', nameMl: 'ഐന്ദ്രം' },
  { yogaId: 26, name: 'Vaidhriti', nameTa: 'வைதிருதி', nameHi: 'वैधृति', nameTe: 'వైధృతి', nameKn: 'ವೈಧೃತಿ', nameMl: 'വൈധൃതി' }
];

export const KARANAS_DATA = [
  { karanaId: 0, name: 'Bava', nameTa: 'பவம்', nameHi: 'बव', nameTe: 'బవ', nameKn: 'ಬವ', nameMl: 'ബവം', type: 'Chara', typeTa: 'சரம்' },
  { karanaId: 1, name: 'Balava', nameTa: 'பாலவம்', nameHi: 'बालव', nameTe: 'బాలవ', nameKn: 'ಬಾಲವ', nameMl: 'ബാലവം', type: 'Chara', typeTa: 'சரம்' },
  { karanaId: 2, name: 'Kaulava', nameTa: 'கௌலவம்', nameHi: 'कौलव', nameTe: 'కౌలవ', nameKn: 'ಕೌಲವ', nameMl: 'കൗലവം', type: 'Chara', typeTa: 'சரம்' },
  { karanaId: 3, name: 'Taitila', nameTa: 'சைதுளை', nameHi: 'तैतिल', nameTe: 'తైతుల', nameKn: 'ತೈತಿಲ', nameMl: 'തൈതിലം', type: 'Chara', typeTa: 'சரம்' },
  { karanaId: 4, name: 'Gara', nameTa: 'கரசை', nameHi: 'गर', nameTe: 'గరజ', nameKn: 'ಗರಜ', nameMl: 'ഗരം', type: 'Chara', typeTa: 'சரம்' },
  { karanaId: 5, name: 'Vanija', nameTa: 'வணிசை', nameHi: 'वणिज', nameTe: 'వణిజ', nameKn: 'ವಣಿಜ', nameMl: 'വണിജം', type: 'Chara', typeTa: 'சரம்' },
  { karanaId: 6, name: 'Vishti (Bhadra)', nameTa: 'பத்திரை', nameHi: 'विष्टि (भद्रा)', nameTe: 'భద్ర', nameKn: 'ಭದ್ರಾ', nameMl: 'ഭദ്ര', type: 'Chara', typeTa: 'சரம்' },
  { karanaId: 7, name: 'Shakuni', nameTa: 'சகுனி', nameHi: 'शकुनि', nameTe: 'శకుని', nameKn: 'ಶಕುನಿ', nameMl: 'ശకుని', type: 'Sthira', typeTa: 'ஸ்திரம்' },
  { karanaId: 8, name: 'Chatushpada', nameTa: 'சதுஷ்பாதம்', nameHi: 'चतुष्पाद', nameTe: 'చతుష్పాద', nameKn: 'ಚತುಷ್ಪಾದ', nameMl: 'ചതുഷ്പാദം', type: 'Sthira', typeTa: 'ஸ்திரம்' },
  { karanaId: 9, name: 'Naga', nameTa: 'நாகவம்', nameHi: 'नाग', nameTe: 'నాగ', nameKn: 'ನಾಗ', nameMl: 'നാഗം', type: 'Sthira', typeTa: 'ஸ்திரம்' },
  { karanaId: 10, name: 'Kimstughna', nameTa: 'கிமிஸ்துக்னம்', nameHi: 'किंस्तुघ्न', nameTe: 'కింస్తుఘ్నం', nameKn: 'ಕಿಂಸ್ತುಘ್ನ', nameMl: 'കിംസ്തുഘ്നം', type: 'Sthira', typeTa: 'ஸ்திரம்' }
];

export const TAMIL_MONTHS_DATA = [
  { monthId: 0, name: 'Chithirai', nameTa: 'சித்திரை', nameHi: 'चैत्र', nameTe: 'చైత్రం', nameKn: 'ಚೈತ್ರ', nameMl: 'മേടം', rasiId: 0, seasonTa: 'இளவேனில்' },
  { monthId: 1, name: 'Vaikasi', nameTa: 'வைகாசி', nameHi: 'वैशाख', nameTe: 'వైశాఖం', nameKn: 'ವೈಶಾಖ', nameMl: 'ഇടവം', rasiId: 1, seasonTa: 'இளவேனில்' },
  { monthId: 2, name: 'Aani', nameTa: 'ஆனி', nameHi: 'ज्येष्ठ', nameTe: 'జ్యేష్ఠం', nameKn: 'ಜ್ಯೇಷ್ಠ', nameMl: 'മിഥുനം', rasiId: 2, seasonTa: 'முதுவேனில்' },
  { monthId: 3, name: 'Aadi', nameTa: 'ஆடி', nameHi: 'आषाढ़', nameTe: 'ఆషాఢం', nameKn: 'ಆಷಾಢ', nameMl: 'കർക്കടകം', rasiId: 3, seasonTa: 'முதுவேனில்' },
  { monthId: 4, name: 'Aavani', nameTa: 'ஆவணி', nameHi: 'श्रावण', nameTe: 'శ్రావణం', nameKn: 'ಶ್ರಾವಣ', nameMl: 'ചിങ്ങം', rasiId: 4, seasonTa: 'கார்' },
  { monthId: 5, name: 'Purattasi', nameTa: 'புரட்டாசி', nameHi: 'भाद्रपद', nameTe: 'భాద్రపదం', nameKn: 'ಭಾದ್ರಪದ', nameMl: 'കന്നി', rasiId: 5, seasonTa: 'கார்' },
  { monthId: 6, name: 'Aippasi', nameTa: 'ஐப்பசி', nameHi: 'आश्विन', nameTe: 'ఆశ్వయుజం', nameKn: 'ಆಶ್ವಯುಜ', nameMl: 'തുലാം', rasiId: 6, seasonTa: 'கூதிர்' },
  { monthId: 7, name: 'Karthigai', nameTa: 'கார்த்திகை', nameHi: 'कार्तिक', nameTe: 'కార్తీకం', nameKn: 'ಕಾರ್ತೀಕ', nameMl: 'വൃശ്ചികം', rasiId: 7, seasonTa: 'கூதிர்' },
  { monthId: 8, name: 'Margazhi', nameTa: 'மார்கழி', nameHi: 'मार्गशीर्ष', nameTe: 'మార్గశిర', nameKn: 'ಮಾರ್ಗಶಿರ', nameMl: 'ധനു', rasiId: 8, seasonTa: 'முன்பனி' },
  { monthId: 9, name: 'Thai', nameTa: 'தை', nameHi: 'पौष', nameTe: 'పుష్యం', nameKn: 'ಪುಷ್ಯ', nameMl: 'മകരം', rasiId: 9, seasonTa: 'முன்பனி' },
  { monthId: 10, name: 'Masi', nameTa: 'மாசி', nameHi: 'माघ', nameTe: 'మాఘం', nameKn: 'ಮಾಘ', nameMl: 'കുംഭം', rasiId: 10, seasonTa: 'பின்பனி' },
  { monthId: 11, name: 'Panguni', nameTa: 'பங்குனி', nameHi: 'फाल्गुन', nameTe: 'ఫాల్గుణం', nameKn: 'ಫಾಲ್ಗುಣ', nameMl: 'മീനം', rasiId: 11, seasonTa: 'பின்பனி' }
];

export const TAMIL_YEARS_NAMES = [
  'பிரபவ', 'விபவ', 'சுக்ல', 'பிரமோதூத', 'பிரசோற்பத்தி', 'ஆங்கீரச', 'ஸ்ரீமுக', 'பவ', 'யுவ', 'தாது',
  'ஈஸ்வர', 'வெகுதானிய', 'பிரமாதி', 'விக்ரம', 'விஷு', 'சித்திரபானு', 'சுபானு', 'தாரண', 'பார்த்திப', 'விய',
  'சர்வசித்து', 'சர்வதாரி', 'விரோதி', 'விகிருதி', 'கர', 'நந்தன', 'விஜய', 'ஜய', 'மன்மத', 'துன்முகி',
  'ஹேவிளம்பி', 'விளம்பி', 'விகாரி', 'சார்வரி', 'பிலவ', 'சுபகிருது', 'சோபகிருது', 'குரோதி', 'விசுவாவசு', 'பராபவ',
  'பிலவங்க', 'கீலக', 'சௌமிய', 'சாதாரண', 'விரோதிகிருது', 'பரிதாபி', 'பிரமாதீச', 'ஆனந்த', 'ராட்சச', 'நள',
  'பிங்கள', 'காளயுக்தி', 'சித்தார்த்தி', 'ரௌத்திரி', 'துன்மதி', 'துந்துபி', 'ருத்ரோத்காரி', 'ரக்தாட்சி', 'குரோதன', 'அட்சய'
];

export const VEDIC_YEARS_NAMES_EN = [
  'Prabhava', 'Vibhava', 'Shukla', 'Pramodoota', 'Prajotpatti', 'Aangirasa', 'Shrimukha', 'Bhava', 'Yuva', 'Dhatru',
  'Ishvara', 'Bahudhanya', 'Pramathi', 'Vikrama', 'Vishu', 'Chitrabhanu', 'Subhanu', 'Tarana', 'Parthiva', 'Vyaya',
  'Sarvajit', 'Sarvadhari', 'Virodhi', 'Vikruti', 'Khara', 'Nandana', 'Vijaya', 'Jaya', 'Manmatha', 'Durmukhi',
  'Hevilambi', 'Vilambi', 'Vikari', 'Sharvari', 'Plava', 'Shubhakrit', 'Shobhakrit', 'Krodhi', 'Vishvavasu', 'Parabhava',
  'Plavanga', 'Kilaka', 'Saumya', 'Sadharana', 'Virodhikrit', 'Paridhavi', 'Pramadicha', 'Ananda', 'Rakshasa', 'Nala',
  'Pingala', 'Kalayukthi', 'Siddharthi', 'Raudra', 'Durmati', 'Dundubhi', 'Rudhirodgari', 'Raktakshi', 'Krodhana', 'Akshaya'
];

// 60 Tamil / Vedic Years in all 6 languages
export const YEARS_RAW = [
  ['Prabhava', 'பிரபவ', 'प्रभव', 'ప్రభవ', 'ಪ್ರಭವ', 'പ്രഭവ'],
  ['Vibhava', 'விபவ', 'विभव', 'విభవ', 'ವಿಭವ', 'വിഭവ'],
  ['Shukla', 'சுக்ல', 'शुक्ल', 'శుక్ల', 'ಶುಕ್ಲ', 'ശുക്ല'],
  ['Pramodoota', 'பிரமோதூத', 'प्रमोदूत', 'ప్రమోదూత', 'ಪ್ರಮೋದೂತ', 'പ്രമോദൂത'],
  ['Prajotpatti', 'பிரஜோற்பத்தி', 'प्रजोत्पत्ति', 'ప్రజోత్పత్తి', 'ಪ್ರಜೋತ್ಪತ್ತಿ', 'പ്രജോത്പത്തി'],
  ['Angirasa', 'ஆங்கீரச', 'आङ्गीरस', 'ఆంగీరస', 'ಆಂಗೀರಸ', 'ആംഗീരസ'],
  ['Srimukha', 'ஸ்ரீமுக', 'श्रीमुख', 'శ్రీముఖ', 'ಶ್ರೀಮುಖ', 'ശ്രീമുഖ'],
  ['Bhava', 'பவ', 'भाव', 'భావ', 'ಭಾವ', 'ഭാവ'],
  ['Yuva', 'யுவ', 'युव', 'యువ', 'ಯುವ', 'യുവ'],
  ['Dhatri', 'தாது', 'धाता', 'ధాత', 'ಧಾತೃ', 'ധാത'],
  ['Ishvara', 'ஈஸ்வர', 'ईश्वर', 'ఈశ్వర', 'ಈಶ್ವರ', 'ഈശ്വര'],
  ['Bahudhanya', 'பகுதானிய', 'बहुधान्य', 'బహుధాన్య', 'ಬಹುಧಾನ್ಯ', 'ബഹുധാന്യ'],
  ['Pramathi', 'பிரமாதி', 'प्रमाथी', 'ప్రమాది', 'ಪ್ರಮಾಥಿ', 'പ്രമാഥി'],
  ['Vikrama', 'விக்ரம', 'विक्रम', 'విక్రమ', 'ವಿಕ್ರಮ', 'വിക്രമ'],
  ['Vrushapraja (Vishu)', 'விஷு', 'वृषप्रजा (विषु)', 'విషు', 'ವಿಷು', 'വിഷു'],
  ['Chitrabhanu', 'சித்திரபானு', 'चित्रभानु', 'చిత్రభాను', 'ಚಿತ್ರಭಾನು', 'ചിത്രഭാനു'],
  ['Subhanu', 'சுபானு', 'स्वभानु', 'స్వభాను', 'ಸ್ವಭಾನು', 'സ്വഭാനു'],
  ['Dharana (Tharana)', 'தாரண', 'तारण', 'తారణ', 'ತಾರಣ', 'താരണ'],
  ['Parthiva', 'பார்த்திப', 'पार्थिव', 'పార్థివ', 'ಪಾರ್ಥಿವ', 'പാർത്ഥിവ'],
  ['Vyaya', 'வியய', 'व्यय', 'వ్యయ', 'ವ್ಯಯ', 'വ്യയ'],
  ['Sarvajit', 'சர்வஜித்', 'सर्वजित्', 'సర్వజిత్', 'ಸರ್ವಜಿತ್', 'സർവജിത്'],
  ['Sarvadhari', 'சர்வதாரி', 'सर्वधारी', 'సర్వధారి', 'ಸರ್ವಧಾರಿ', 'സർവധാരി'],
  ['Virodhi', 'विरोதி', 'विरोधी', 'విరోధి', 'ವಿರೋಧಿ', 'വിരോധി'],
  ['Vikruthi', 'விக்ருதி', 'विकृति', 'వికృతి', 'ವಿಕೃತಿ', 'വികൃതി'],
  ['Khara', 'கர', 'खर', 'ఖర', 'ಖರ', 'ഖര'],
  ['Nandana', 'நந்தன', 'नन्दन', 'నందన', 'ನಂದನ', 'നന്ദന'],
  ['Vijaya', 'விஜய', 'विजय', 'విజయ', 'ವಿಜಯ', 'വിജയ'],
  ['Jaya', 'ஜய', 'जय', 'జయ', 'ಜಯ', 'ജയ'],
  ['Manmatha', 'மன்மத', 'मन्मथ', 'మన్మథ', 'ಮನ್ಮಥ', 'മന്മഥ'],
  ['Durmukhi', 'துன்முகி', 'दुर्मुख', 'దుర్ముఖి', 'ದುರ್ಮುಖಿ', 'ദുർമുഖി'],
  ['Hevilambi', 'ஹேவிளம்பி', 'हेविलम्बी', 'హేవిళంబి', 'ಹೇವಿಳಂಬಿ', 'ഹേവിളമ്പി'],
  ['Vilambi', 'விளம்பி', 'विलम्बी', 'విళంబి', 'ವಿಳಂಬಿ', 'വിളമ്പി'],
  ['Vikari', 'விகாரி', 'विकारी', 'వికారి', 'ವಿಕಾರಿ', 'വികാരി'],
  ['Sharvari', 'சார்வரி', 'शार्वरी', 'శార్వరి', 'ಶಾರ್ವರಿ', 'ശാർവരി'],
  ['Plava', 'பிலவ', 'प्लव', 'ప్లవ', 'ಪ್ಲವ', 'പ്ലവ'],
  ['Shubhakrit', 'சுபகிருது', 'शुभकृत्', 'శుభకృతు', 'ಶುಭಕೃತ್', 'ശുഭകൃത്'],
  ['Shobhakrit', 'சோபகிருது', 'शोभकृत्', 'శోభకృతు', 'ಶೋಭಕೃತ್', 'ശോഭകൃത്'],
  ['Krodhi', 'குரோதி', 'क्रोधी', 'క్రోధి', 'ಕ್ರೋಧಿ', 'ക്രോധി'],
  ['Vishvavasu', 'விசுவாசு', 'विश्वावसु', 'విశ్వావసు', 'ವಿಶ್ವಾವಸು', 'വിശ്വാവസു'],
  ['Parabhava', 'பராபவ', 'पराभव', 'పరాభవ', 'ಪರಾಭವ', 'പരാഭവ'],
  ['Plavanga', 'பிலவங்க', 'प्लवङ्ग', 'ప్లవంగ', 'ಪ್ಲವಂಗ', 'പ്ലവംഗ'],
  ['Kilaka', 'கீலக', 'कीलक', 'కీలక', 'ಕೀಲಕ', 'കീലക'],
  ['Saumya', 'சௌமிய', 'सौम्य', 'సౌమ్య', 'ಸೌಮ್ಯ', 'സൗമ്യ'],
  ['Sadharana', 'சாதாரண', 'साधारण', 'సాధారణ', 'ಸಾಧಾರಣ', 'സാധാരണ'],
  ['Virodhikrit', 'விரோதிகிருது', 'विरोधकृत्', 'విరోధికృతు', 'ವಿರೋಧಿಕೃತ್', 'വിരോധികൃത്'],
  ['Paridhavi', 'பரிதாபி', 'परिधावी', 'పరిధావి', 'ಪರಿಧಾವಿ', 'പരിധാവി'],
  ['Pramadicha', 'பிரமாதீச', 'प्रमादीचा', 'ప్రమాదీచ', 'ಪ್ರಮಾದೀಚ', 'പ്രമാദീച'],
  ['Ananda', 'ஆனந்த', 'आनन्द', 'ఆనంద', 'ಆನಂದ', 'ആനന്ദ'],
  ['Rakshasa', 'ராட்சச', 'राक्षस', 'రాక్షస', 'ರಾಕ್ಷಸ', 'രാക്ഷസ'],
  ['Nala (Anala)', 'நள', 'नल (अनल)', 'నల', 'ನಲ', 'നള'],
  ['Pingala', 'பிங்கள', 'पिङ्गल', 'పింగళ', 'ಪಿಂಗಳ', 'പിംഗള'],
  ['Kalayukta', 'காளயுக்தி', 'कालयुक्त', 'కాళయుక్తి', 'ಕಾಲಯುಕ್ತ', 'കാളയുക്തി'],
  ['Siddharthi', 'சித்தார்த்தி', 'सिद्धार्थी', 'సిద్ధార్థి', 'ಸಿದ್ಧಾರ್ಥಿ', 'സിദ്ധാർത്ഥി'],
  ['Raudra', 'ரௌத்திரி', 'रौद्र', 'రౌద్రి', 'ರೌದ್ರ', 'രൗദ്രി'],
  ['Durmati', 'துர்மதி', 'दुर्मति', 'దుర్మతి', 'ದುರ್ಮತಿ', 'ദുർമതി'],
  ['Dundubhi', 'துந்துபி', 'दुन्दुभि', 'దుందుభి', 'ದುಂದುಭಿ', 'ദുന്ദുഭി'],
  ['Rudhirodgari', 'ருத்ரோத்காரி', 'रुधिरोद्गारी', 'రుధిరోద్గారి', 'ರುಧಿರೋದ್ಗಾರಿ', 'രുധിരോദ്ഗാരി'],
  ['Raktakshi', 'ரக்தாட்சி', 'रक्ताक्षी', 'రక్తాక్షి', 'ರಕ್ತಾಕ್ಷಿ', 'രക്താക്ഷി'],
  ['Krodhana', 'குரோதன', 'क्रोधन', 'క్రోధన', 'ಕ್ರೋಧನ', 'ക്രോധന'],
  ['Akshaya (Kshaya)', 'அட்சய', 'अक्षय (क्षय)', 'అక్షయ', 'ಅಕ್ಷಯ', 'അക്ഷയ']
];

export const TAMIL_YEARS_DATA = YEARS_RAW.map((row, idx) => ({
  yearId: idx,
  order: idx + 1,
  name: row[0],
  nameEn: row[0],
  nameTa: row[1],
  nameHi: row[2],
  nameTe: row[3],
  nameKn: row[4],
}));

export const KALACHAKRAM_DATA = Array.from({ length: 360 }, (_, degree) => {
  const rasiId = Math.floor(degree / 30);
  const degreeInRasi = degree % 30;
  const rasi = RASIS_DATA[rasiId];

  const oneNakshatraDeg = 360 / 27; // 13.333333333333334
  const nakshatraId = Math.floor(degree / oneNakshatraDeg);
  const nakshatra = NAKSHATRAS_DATA[nakshatraId];

  const onePadaDeg = 360 / 108; // 3.3333333333333335
  const totalPadaIndex = Math.floor(degree / onePadaDeg); // 0 to 107
  const pada = (totalPadaIndex % 4) + 1; // 1, 2, 3, 4

  const navamsaRasiId = totalPadaIndex % 12;
  const navamsaRasi = RASIS_DATA[navamsaRasiId];

  const nakLordPlanet = PLANETS_DATA.find(p => p.planetId === nakshatra.athipathi?.planetId);
  const nakshatraAthipathi = nakLordPlanet ? {
    planetId: nakLordPlanet.planetId,
    name: nakLordPlanet.name,
    nameTa: nakLordPlanet.nameTa,
    nameHi: nakLordPlanet.nameHi || '',
    nameTe: nakLordPlanet.nameTe || '',
    nameKn: nakLordPlanet.nameKn || '',
    nameMl: nakLordPlanet.nameMl || ''
  } : nakshatra.athipathi;

  return {
    degree,
    degreeDisplay: `${degree}° - ${degree + 1}°`,
    startDegree: degree,
    endDegree: degree + 1,
    
    // Rasi info
    rasiId,
    rasiName: rasi.name,
    rasiNameTa: rasi.nameTa,
    rasiNameHi: rasi.nameHi || '',
    rasiNameTe: rasi.nameTe || '',
    rasiNameKn: rasi.nameKn || '',
    rasiNameMl: rasi.nameMl || '',
    degreeInRasi,
    rasiAthipathi: rasi.athipathi,

    // Nakshatra info
    nakshatraId,
    nakshatraName: nakshatra.name,
    nakshatraNameTa: nakshatra.nameTa,
    nakshatraNameHi: nakshatra.nameHi || '',
    nakshatraNameTe: nakshatra.nameTe || '',
    nakshatraNameKn: nakshatra.nameKn || '',
    nakshatraNameMl: nakshatra.nameMl || '',
    nakshatraAthipathi,

    // Pada (Padam) info
    pada,
    totalPadaIndex,

    // Navamsa info
    navamsaRasiId,
    navamsaRasiName: navamsaRasi.name,
    navamsaRasiNameTa: navamsaRasi.nameTa,
    navamsaRasiNameHi: navamsaRasi.nameHi || '',
    navamsaRasiNameTe: navamsaRasi.nameTe || '',
    navamsaRasiNameKn: navamsaRasi.nameKn || '',
    navamsaRasiNameMl: navamsaRasi.nameMl || '',
    navamsaAthipathi: navamsaRasi.athipathi
  };
});

export const seedMasterDataIfEmpty = async () => {
  try {
    for (const r of RASIS_DATA) {
      await RasiMaster.updateOne({ rasiId: r.rasiId }, { $set: r }, { upsert: true });
    }
    for (const n of NAKSHATRAS_DATA) {
      await NakshatraMaster.updateOne({ nakshatraId: n.nakshatraId }, { $set: n }, { upsert: true });
    }
    for (const p of PLANETS_DATA) {
      await PlanetMaster.updateOne({ planetId: p.planetId }, { $set: p }, { upsert: true });
    }
    for (const t of TITHIS_DATA) {
      await TithiMaster.updateOne({ tithiId: t.tithiId }, { $set: t }, { upsert: true });
    }
    for (const y of YOGAS_DATA) {
      await YogaMaster.updateOne({ yogaId: y.yogaId }, { $set: y }, { upsert: true });
    }
    for (const k of KARANAS_DATA) {
      await KaranaMaster.updateOne({ karanaId: k.karanaId }, { $set: k }, { upsert: true });
    }
    for (const y of TAMIL_YEARS_DATA) {
      await TamilYearMaster.updateOne({ yearId: y.yearId }, { $set: y }, { upsert: true });
    }
    for (const m of TAMIL_MONTHS_DATA) {
      await TamilMonthMaster.updateOne({ monthId: m.monthId }, { $set: m }, { upsert: true });
    }

    const kalachakramSample = await KalachakramMaster.findOne({ degree: 0 });
    if (!kalachakramSample || !kalachakramSample.rasiNameHi) {
      for (const k of KALACHAKRAM_DATA) {
        await KalachakramMaster.updateOne({ degree: k.degree }, { $set: k }, { upsert: true });
      }
    }

    const kpHoraryCount = await KPHoraryMaster.countDocuments();
    if (kpHoraryCount === 0) {
      await KPHoraryMaster.insertMany(KP_HORARY_DATA);
    }

    const nakshatraPadasCount = await NakshatraPadaMaster.countDocuments();
    if (nakshatraPadasCount === 0) {
      await NakshatraPadaMaster.insertMany(NAKSHATRA_PADAS_DATA);
    }

    for (const kp of KADIKARA_PRASANNAM_MASTER_DATA) {
      await KadikaraPrasannamMaster.updateOne({ key: kp.key }, { $set: kp }, { upsert: true });
    }
  } catch (err) {
    console.error('Error seeding master astrology data:', err.message);
  }
};

export const getRasiDetails = (rasiId) => RASIS_DATA.find(r => r.rasiId === rasiId);
export const getNakshatraDetails = (nakshatraId) => NAKSHATRAS_DATA.find(n => n.nakshatraId === nakshatraId);
export const getPlanetDetails = (nameOrId) => {
  if (typeof nameOrId === 'number') {
    return PLANETS_DATA.find(p => p.planetId === nameOrId);
  }
  return PLANETS_DATA.find(p => p.name.toLowerCase() === String(nameOrId).toLowerCase() || p.nameTa === nameOrId);
};
export const getDegreeKalachakram = (degree) => {
  const normDegree = ((Math.floor(degree) % 360) + 360) % 360;
  return KALACHAKRAM_DATA[normDegree];
};
export const getTithiDetails = (tithiId) => TITHIS_DATA.find(t => t.tithiId === tithiId);
export const getYogaDetails = (yogaId) => YOGAS_DATA.find(y => y.yogaId === yogaId);
export const getKaranaDetails = (karanaId) => KARANAS_DATA.find(k => k.karanaId === karanaId);
export const getTamilYearDetails = (yearId) => TAMIL_YEARS_DATA.find(y => y.yearId === yearId);
export const getTamilMonthDetails = (monthId) => TAMIL_MONTHS_DATA.find(m => m.monthId === monthId);
export const getNakshatraPadaDetails = (padaNumber) => NAKSHATRA_PADAS_DATA.find(p => p.padaNumber === Number(padaNumber));
export const getNakshatraPadasByNakshatra = (nakshatraId) => NAKSHATRA_PADAS_DATA.filter(p => p.nakshatraId === Number(nakshatraId));
export const getKadikaraPrasannamMasterData = () => KADIKARA_PRASANNAM_MASTER_DATA;
export const getKadikaraBhavaDetails = (bhavaNum) => KADIKARA_PRASANNAM_MASTER_DATA.find(k => k.category === 'bhava' && k.bhava === Number(bhavaNum));

