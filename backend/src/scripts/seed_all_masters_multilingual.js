import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import RasiMaster from '../models/RasiMaster.js';
import NakshatraMaster from '../models/NakshatraMaster.js';
import TithiMaster from '../models/TithiMaster.js';
import YogaMaster from '../models/YogaMaster.js';
import KaranaMaster from '../models/KaranaMaster.js';
import { TamilYearMaster, TamilMonthMaster } from '../models/TamilCalendarMaster.js';
import KalachakramMaster from '../models/KalachakramMaster.js';
import NakshatraPadaMaster from '../models/NakshatraPadaMaster.js';
import { NAKSHATRA_PADAS_DATA } from '../services/nakshatraPadaData.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../../.env') });

const PLANET_MAP = {
  0: { planetId: 0, name: 'Sun', nameTa: 'சூரியன்', nameHi: 'सूर्य', nameTe: 'సూర్యుడు', nameKn: 'ಸೂರ್ಯ', nameMl: 'സൂര്യൻ' },
  1: { planetId: 1, name: 'Moon', nameTa: 'சந்திரன்', nameHi: 'चन्द्र', nameTe: 'చంద్రుడు', nameKn: 'ಚಂದ್ರ', nameMl: 'ചന്ദ്രൻ' },
  2: { planetId: 2, name: 'Mercury', nameTa: 'புதன்', nameHi: 'बुध', nameTe: 'బుధుడు', nameKn: 'ಬುಧ', nameMl: 'ബുധൻ' },
  3: { planetId: 3, name: 'Venus', nameTa: 'சுக்கிரன்', nameHi: 'शुक्र', nameTe: 'శుక్రుడు', nameKn: 'ಶುಕ್ರ', nameMl: 'ശുക്രൻ' },
  4: { planetId: 4, name: 'Mars', nameTa: 'செவ்வாய்', nameHi: 'मंगल', nameTe: 'కుజుడు', nameKn: 'ಮಂಗಳ', nameMl: 'ചൊവ്വ' },
  5: { planetId: 5, name: 'Jupiter', nameTa: 'குரு', nameHi: 'गुरु', nameTe: 'గురుడు', nameKn: 'ಗುರು', nameMl: 'വ്യാഴം' },
  6: { planetId: 6, name: 'Saturn', nameTa: 'சனி', nameHi: 'शनि', nameTe: 'శని', nameKn: 'ಶನಿ', nameMl: 'ശനി' },
  7: { planetId: 7, name: 'Rahu', nameTa: 'ராகு', nameHi: 'राहु', nameTe: 'రాహువు', nameKn: 'ರಾಹು', nameMl: 'രാഹു' },
  8: { planetId: 8, name: 'Ketu', nameTa: 'கேது', nameHi: 'केतु', nameTe: 'కేతువు', nameKn: 'ಕೇತು', nameMl: 'കേതു' }
};

const RASI_DATA = [
  {
    rasiId: 0, order: 1, name: 'Aries', nameTa: 'மேஷம்', nameHi: 'मेष', nameTe: 'మేషం', nameKn: 'ಮೇಷ', nameMl: 'മേടം',
    sanskritName: 'मेष (Mesha)',
    athipathi: PLANET_MAP[4],
    element: { name: 'Fire', nameTa: 'நெருப்பு', nameHi: 'अग्नि', nameTe: 'అగ్ని', nameKn: 'ಅಗ್ನಿ', nameMl: 'തീ' },
    mobility: { name: 'Movable', nameTa: 'சரம்', nameHi: 'चर', nameTe: 'చర', nameKn: 'ಚರ', nameMl: 'ചരം' },
    gender: { name: 'Male', nameTa: 'ஆண்', nameHi: 'पुरुष', nameTe: 'పురుష', nameKn: 'ಪುರುಷ', nameMl: 'പുരുഷൻ' },
    symbol: { name: 'Ram', nameTa: 'ஆடு', nameHi: 'भेड़', nameTe: 'గొర్రె', nameKn: 'ಕುರಿ', nameMl: 'ആട്' },
    direction: { name: 'East', nameTa: 'கிழக்கு', nameHi: 'पूर्व', nameTe: 'తూర్పు', nameKn: 'ಪೂರ್ವ', nameMl: 'കിഴക്ക്' },
    bodyPart: { name: 'Head', nameTa: 'தலை', nameHi: 'सिर', nameTe: 'తల', nameKn: 'ತಲೆ', nameMl: 'തല' },
    startDegree: 0, endDegree: 30
  },
  {
    rasiId: 1, order: 2, name: 'Taurus', nameTa: 'ரிஷபம்', nameHi: 'वृषभ', nameTe: 'వృషభం', nameKn: 'ವೃಷಭ', nameMl: 'ഇടവം',
    sanskritName: 'वृषभ (Vrishabha)',
    athipathi: PLANET_MAP[3],
    element: { name: 'Earth', nameTa: 'நிலம்', nameHi: 'पृथ्वी', nameTe: 'భూమి', nameKn: 'ಭೂಮಿ', nameMl: 'ഭൂമി' },
    mobility: { name: 'Fixed', nameTa: 'ஸ்திரம்', nameHi: 'स्थिर', nameTe: 'స్థిర', nameKn: 'ಸ್ಥಿರ', nameMl: 'സ്ഥിരം' },
    gender: { name: 'Female', nameTa: 'பெண்', nameHi: 'स्त्री', nameTe: 'స్త్రీ', nameKn: 'ಸ್ತ್ರೀ', nameMl: 'സ്ത്രീ' },
    symbol: { name: 'Bull', nameTa: 'காளை', nameHi: 'बैल', nameTe: 'ఎద్దు', nameKn: 'ಗೂಳಿ', nameMl: 'കാള' },
    direction: { name: 'South', nameTa: 'தெற்கு', nameHi: 'दक्षिण', nameTe: 'దక్షిణం', nameKn: 'ದಕ್ಷಿಣ', nameMl: 'തെക്ക്' },
    bodyPart: { name: 'Face & Neck', nameTa: 'முகம், கழுத்து', nameHi: 'चेहरा और गर्दन', nameTe: 'ముఖం, మెడ', nameKn: 'ಮುಖ, ಕುತ್ತಿಗೆ', nameMl: 'മുഖം, കഴുത്ത്' },
    startDegree: 30, endDegree: 60
  },
  {
    rasiId: 2, order: 3, name: 'Gemini', nameTa: 'மிதுனம்', nameHi: 'मिथुन', nameTe: 'మిథునం', nameKn: 'ಮಿಥುನ', nameMl: 'മിഥുനം',
    sanskritName: 'मिथुन (Mithuna)',
    athipathi: PLANET_MAP[2],
    element: { name: 'Air', nameTa: 'காற்று', nameHi: 'वायु', nameTe: 'వాయువు', nameKn: 'ವಾಯು', nameMl: 'വായു' },
    mobility: { name: 'Dual', nameTa: 'உபயம்', nameHi: 'द्विस्वभाव', nameTe: 'ద్విస్వభావ', nameKn: 'ದ್ವಿಸ್ವಭಾವ', nameMl: 'ഉഭയം' },
    gender: { name: 'Male', nameTa: 'ஆண்', nameHi: 'पुरुष', nameTe: 'పురుష', nameKn: 'ಪುರುಷ', nameMl: 'പുരുഷൻ' },
    symbol: { name: 'Twins', nameTa: 'இரட்டையர்', nameHi: 'जुड़वाँ', nameTe: 'మిథునం (జంట)', nameKn: 'ಅವಳಿಗಳು', nameMl: 'ഇരട്ടകൾ' },
    direction: { name: 'West', nameTa: 'மேற்கு', nameHi: 'पश्चिम', nameTe: 'పడమర', nameKn: 'ಪಶ್ಚಿಮ', nameMl: 'പടിഞ്ഞാറ്' },
    bodyPart: { name: 'Shoulders & Arms', nameTa: 'தோள்கள், கைகள்', nameHi: 'कंधे और भुजाएं', nameTe: 'భుజాలు, చేతులు', KN: 'ಭುಜಗಳು, ಕೈಗಳು', ML: 'തോളുകൾ, കൈകൾ' },
    startDegree: 60, endDegree: 90
  },
  {
    rasiId: 3, order: 4, name: 'Cancer', nameTa: 'கடகம்', nameHi: 'कर्क', nameTe: 'కర్కాటకం', nameKn: 'ಕರ್ಕಾಟಕ', nameMl: 'കർക്കിടകം',
    sanskritName: 'कर्क (Karka)',
    athipathi: PLANET_MAP[1],
    element: { name: 'Water', nameTa: 'நீர்', nameHi: 'जल', nameTe: 'జలం', nameKn: 'ಜಲ', nameMl: 'ജലം' },
    mobility: { name: 'Movable', nameTa: 'சரம்', nameHi: 'चर', nameTe: 'చర', nameKn: 'ಚರ', nameMl: 'ചരം' },
    gender: { name: 'Female', nameTa: 'பெண்', nameHi: 'स्त्री', nameTe: 'స్త్రీ', nameKn: 'ಸ್ತ್ರೀ', nameMl: 'സ്ത്രീ' },
    symbol: { name: 'Crab', nameTa: 'நண்டு', nameHi: 'केकड़ा', nameTe: 'ఎండ్రకాయ', nameKn: 'ಏಡಿ', nameMl: 'ഞണ്ട്' },
    direction: { name: 'North', nameTa: 'வடக்கு', nameHi: 'उत्तर', nameTe: 'ఉత్తరం', nameKn: 'ಉತ್ತರ', nameMl: 'വടക്ക്' },
    bodyPart: { name: 'Chest & Heart', nameTa: 'மார்பு, இதயம்', nameHi: 'छाती और हृदय', nameTe: 'ఛాతీ, గుండె', nameKn: 'ಎದೆ, ಹೃದಯ', nameMl: 'നെഞ്ച്, ഹൃദയം' },
    startDegree: 90, endDegree: 120
  },
  {
    rasiId: 4, order: 5, name: 'Leo', nameTa: 'சிம்மம்', nameHi: 'सिंह', nameTe: 'సింహం', nameKn: 'ಸಿಂಹ', nameMl: 'ചിങ്ങം',
    sanskritName: 'सिंह (Simha)',
    athipathi: PLANET_MAP[0],
    element: { name: 'Fire', nameTa: 'நெருப்பு', nameHi: 'अग्नि', nameTe: 'అగ్ని', nameKn: 'ಅಗ್ನಿ', nameMl: 'തീ' },
    mobility: { name: 'Fixed', nameTa: 'ஸ்திரம்', nameHi: 'स्थिर', nameTe: 'స్థిర', nameKn: 'ಸ್ಥಿರ', nameMl: 'സ്ഥിരം' },
    gender: { name: 'Male', nameTa: 'ஆண்', nameHi: 'पुरुष', nameTe: 'పురుష', nameKn: 'ಪುರುಷ', nameMl: 'പുരുഷൻ' },
    symbol: { name: 'Lion', nameTa: 'சிங்கம்', nameHi: 'सिंह', nameTe: 'సింహం', nameKn: 'ಸಿಂಹ', nameMl: 'സിംഹം' },
    direction: { name: 'East', nameTa: 'கிழக்கு', nameHi: 'पूर्व', nameTe: 'తూర్పు', nameKn: 'ಪೂರ್ವ', nameMl: 'കിഴക്ക്' },
    bodyPart: { name: 'Upper Abdomen', nameTa: 'மேல் வயிறு', nameHi: 'ऊपरी पेट', nameTe: 'పై పొట్ట', nameKn: 'ಮೇಲ್ಹೊಟ್ಟೆ', nameMl: 'വയറിന്റെ മുകൾഭാഗം' },
    startDegree: 120, endDegree: 150
  },
  {
    rasiId: 5, order: 6, name: 'Virgo', nameTa: 'கன்னி', nameHi: 'कन्या', nameTe: 'కన్య', nameKn: 'ಕನ್ಯಾ', nameMl: 'കന്നി',
    sanskritName: 'कन्या (Kanya)',
    athipathi: PLANET_MAP[2],
    element: { name: 'Earth', nameTa: 'நிலம்', nameHi: 'पृथ्वी', nameTe: 'భూమి', nameKn: 'ಭೂಮಿ', nameMl: 'ഭൂമി' },
    mobility: { name: 'Dual', nameTa: 'உபயம்', nameHi: 'द्विस्वभाव', nameTe: 'ద్విస్వభావ', nameKn: 'ದ್ವಿಸ್ವಭಾವ', nameMl: 'ഉഭയം' },
    gender: { name: 'Female', nameTa: 'பெண்', nameHi: 'स्त्री', nameTe: 'స్త్రీ', nameKn: 'ಸ್ತ್ರೀ', nameMl: 'സ്ത്രീ' },
    symbol: { name: 'Virgin / Maiden', nameTa: 'கன்னிப் பெண்', nameHi: 'कन्या', nameTe: 'కన్యక', nameKn: 'ಕನ್ಯೆ', nameMl: 'കന്യക' },
    direction: { name: 'South', nameTa: 'தெற்கு', nameHi: 'दक्षिण', nameTe: 'దక్షిణం', nameKn: 'ದಕ್ಷಿಣ', nameMl: 'തെക്ക്' },
    bodyPart: { name: 'Digestive System', nameTa: 'செரிமான உறுப்புகள்', nameHi: 'पाचन तंत्र', nameTe: 'జీర్ణ వ్యవస్థ', nameKn: 'ಜೀರ್ಣಾಂಗಗಳು', nameMl: 'ദഹന വ്യവസ്ഥ' },
    startDegree: 150, endDegree: 180
  },
  {
    rasiId: 6, order: 7, name: 'Libra', nameTa: 'துலாம்', nameHi: 'तुला', nameTe: 'తుల', nameKn: 'ತುಲಾ', nameMl: 'തുലാം',
    sanskritName: 'तुला (Tula)',
    athipathi: PLANET_MAP[3],
    element: { name: 'Air', nameTa: 'காற்று', nameHi: 'वायु', nameTe: 'వాయువు', nameKn: 'ವಾಯು', nameMl: 'വായു' },
    mobility: { name: 'Movable', nameTa: 'சரம்', nameHi: 'चर', nameTe: 'చర', nameKn: 'ಚರ', nameMl: 'ചരം' },
    gender: { name: 'Male', nameTa: 'ஆண்', nameHi: 'पुरुष', nameTe: 'పురుష', nameKn: 'ಪುರುಷ', nameMl: 'പുരുഷൻ' },
    symbol: { name: 'Balance / Scale', nameTa: 'தராசு', nameHi: 'तराजू', nameTe: 'త్రాసు', nameKn: 'ತಕ್ಕಡಿ', nameMl: 'ത്രാസ്' },
    direction: { name: 'West', nameTa: 'மேற்கு', nameHi: 'पश्चिम', nameTe: 'పడమర', nameKn: 'ಪಶ್ಚಿಮ', nameMl: 'പടിഞ്ഞാറ്' },
    bodyPart: { name: 'Lower Abdomen & Kidneys', nameTa: 'கீழ் வயிறு, சிறுநீரகம்', nameHi: 'निचला पेट और गुर्दे', nameTe: 'క్రింది పొట్ట, మూత్రపిండాలు', nameKn: 'ಕೆಳಹೊಟ್ಟೆ, ಮೂತ್ರಪಿಂಡ', nameMl: 'അടിവയർ, വൃക്കകൾ' },
    startDegree: 180, endDegree: 210
  },
  {
    rasiId: 7, order: 8, name: 'Scorpio', nameTa: 'விருச்சிகம்', nameHi: 'वृश्चिक', nameTe: 'వృశ్చికం', nameKn: 'ವೃಶ್ಚಿಕ', nameMl: 'വൃശ്ചികം',
    sanskritName: 'वृश्चिक (Vrishchika)',
    athipathi: PLANET_MAP[4],
    element: { name: 'Water', nameTa: 'நீர்', nameHi: 'जल', nameTe: 'జలం', nameKn: 'ಜಲ', nameMl: 'ജലം' },
    mobility: { name: 'Fixed', nameTa: 'ஸ்திரம்', nameHi: 'स्थिर', nameTe: 'స్థిర', nameKn: 'ಸ್ಥಿರ', nameMl: 'സ്ഥിരം' },
    gender: { name: 'Female', nameTa: 'பெண்', nameHi: 'स्त्री', nameTe: 'స్త్రీ', nameKn: 'ಸ್ತ್ರೀ', nameMl: 'സ്ത്രീ' },
    symbol: { name: 'Scorpion', nameTa: 'தேள்', nameHi: 'बिच्छू', nameTe: 'తేలు', nameKn: 'ಚೇಳು', nameMl: 'തേൾ' },
    direction: { name: 'North', nameTa: 'வடக்கு', nameHi: 'उत्तर', nameTe: 'ఉత్తరం', nameKn: 'ಉತ್ತರ', nameMl: 'വടക്ക്' },
    bodyPart: { name: 'Reproductive Organs', nameTa: 'இனப்பெருக்க உறுப்புகள்', nameHi: 'जननेंद्रिय', nameTe: 'ప్రత్యుత్పత్తి అవయవాలు', nameKn: 'ಸಂತಾನೋತ್ಪತ್ತಿ ಅಂಗಗಳು', nameMl: 'പ്രത്യുത്പാദന അവയവങ്ങൾ' },
    startDegree: 210, endDegree: 240
  },
  {
    rasiId: 8, order: 9, name: 'Sagittarius', nameTa: 'தனுசு', nameHi: 'धनु', nameTe: 'ధనుస్సు', nameKn: 'ಧನುಸ್ಸು', nameMl: 'ധനു',
    sanskritName: 'धनु (Dhanu)',
    athipathi: PLANET_MAP[5],
    element: { name: 'Fire', nameTa: 'நெருப்பு', nameHi: 'अग्नि', nameTe: 'అగ్ని', nameKn: 'ಅಗ್ನಿ', nameMl: 'തീ' },
    mobility: { name: 'Dual', nameTa: 'உபயம்', nameHi: 'द्विस्वभाव', nameTe: 'ద్విస్వభావ', nameKn: 'ದ್ವಿಸ್ವಭಾವ', nameMl: 'ഉഭയം' },
    gender: { name: 'Male', nameTa: 'ஆண்', nameHi: 'पुरुष', nameTe: 'పురుష', nameKn: 'ಪುರುಷ', nameMl: 'പുരുഷൻ' },
    symbol: { name: 'Bow & Arrow / Centaur', nameTa: 'வில் மற்றும் அம்பு', nameHi: 'धनुष', nameTe: 'విల్లు మరియు బాణం', nameKn: 'ಬಿಲ್ಲು ಬಾಣ', nameMl: 'വില്ലും അമ്പും' },
    direction: { name: 'East', nameTa: 'கிழக்கு', nameHi: 'पूर्व', nameTe: 'తూర్పు', nameKn: 'ಪೂರ್ವ', nameMl: 'കിഴക്ക്' },
    bodyPart: { name: 'Thighs & Hips', nameTa: 'தொடைகள், இடுப்பு', nameHi: 'जांघें और कूल्हे', nameTe: 'తొడలు, నడుము', nameKn: 'ತೊಡೆಗಳು, ಸೊಂಟ', nameMl: 'തുടകൾ, ഇടുപ്പ്' },
    startDegree: 240, endDegree: 270
  },
  {
    rasiId: 9, order: 10, name: 'Capricorn', nameTa: 'மகரம்', nameHi: 'मकर', nameTe: 'మకరం', nameKn: 'ಮಕರ', nameMl: 'മകരം',
    sanskritName: 'मकर (Makara)',
    athipathi: PLANET_MAP[6],
    element: { name: 'Earth', nameTa: 'நிலம்', nameHi: 'पृथ्वी', nameTe: 'భూమి', nameKn: 'ಭೂಮಿ', nameMl: 'ഭൂമി' },
    mobility: { name: 'Movable', nameTa: 'சரம்', nameHi: 'चर', nameTe: 'చర', nameKn: 'ಚರ', nameMl: 'ചരം' },
    gender: { name: 'Female', nameTa: 'பெண்', nameHi: 'स्त्री', nameTe: 'స్త్రీ', nameKn: 'ಸ್ತ್ರೀ', nameMl: 'സ്ത്രീ' },
    symbol: { name: 'Crocodile / Sea Goat', nameTa: 'முதலை', nameHi: 'मकर (मगरमच्छ)', nameTe: 'మొసలి', nameKn: 'ಮೊಸಳೆ', nameMl: 'മുതല' },
    direction: { name: 'South', nameTa: 'தெற்கு', nameHi: 'दक्षिण', nameTe: 'దక్షిణం', nameKn: 'ದಕ್ಷಿಣ', nameMl: 'തെക്ക്' },
    bodyPart: { name: 'Knees & Joints', nameTa: 'முழங்கால்கள், மூட்டுகள்', nameHi: 'घुटने और जोड़', nameTe: 'మోకాళ్ళు, కీళ్ళు', nameKn: 'ಮೊಣಕಾಲುಗಳು, ಕೀಲುಗಳು', nameMl: 'മുട്ടുകൾ, സന്ധികൾ' },
    startDegree: 270, endDegree: 300
  },
  {
    rasiId: 10, order: 11, name: 'Aquarius', nameTa: 'கும்பம்', nameHi: 'कुम्भ', nameTe: 'కుంభం', nameKn: 'ಕುಂಭ', nameMl: 'കുംഭം',
    sanskritName: 'कुम्भ (Kumbha)',
    athipathi: PLANET_MAP[6],
    element: { name: 'Air', nameTa: 'காற்று', nameHi: 'वायु', nameTe: 'వాయువు', nameKn: 'ವಾಯು', nameMl: 'വായു' },
    mobility: { name: 'Fixed', nameTa: 'ஸ்திரம்', nameHi: 'स्थिर', nameTe: 'స్థిర', nameKn: 'ಸ್ಥಿರ', nameMl: 'സ്ഥിരം' },
    gender: { name: 'Male', nameTa: 'ஆண்', nameHi: 'पुरुष', nameTe: 'పురుష', nameKn: 'ಪುರುಷ', nameMl: 'പുരുഷൻ' },
    symbol: { name: 'Water Pot / Pitcher', nameTa: 'குடம்', nameHi: 'घड़ा (कुम्भ)', nameTe: 'కుండ', nameKn: 'ಕೊಡ', nameMl: 'കുടം' },
    direction: { name: 'West', nameTa: 'மேற்கு', nameHi: 'पश्चिम', nameTe: 'పడమర', nameKn: 'ಪಶ್ಚಿಮ', nameMl: 'പടിഞ്ഞാറ്' },
    bodyPart: { name: 'Calves & Ankles', nameTa: 'கணுக்கால், கால்கள்', nameHi: 'पिंडलियां और टखने', nameTe: 'పిక్కలు, చీలమండలు', nameKn: 'ಪಾದದ ಕೀಲು, ಮೀನಖಂಡ', nameMl: 'കണങ്കാൽ, കാലുകൾ' },
    startDegree: 300, endDegree: 330
  },
  {
    rasiId: 11, order: 12, name: 'Pisces', nameTa: 'மீனம்', nameHi: 'मीन', nameTe: 'మీనం', nameKn: 'ಮೀನ', nameMl: 'മീനം',
    sanskritName: 'मीन (Meena)',
    athipathi: PLANET_MAP[5],
    element: { name: 'Water', nameTa: 'நீர்', nameHi: 'जल', nameTe: 'జలం', nameKn: 'ಜಲ', nameMl: 'ജലം' },
    mobility: { name: 'Dual', nameTa: 'உபயம்', nameHi: 'द्विस्वभाव', nameTe: 'ద్విస్వభావ', nameKn: 'ದ್ವಿಸ್ವಭಾವ', nameMl: 'ഉഭയം' },
    gender: { name: 'Female', nameTa: 'பெண்', nameHi: 'स्त्री', nameTe: 'స్త్రీ', nameKn: 'ಸ್ತ್ರೀ', nameMl: 'സ്ത്രീ' },
    symbol: { name: 'Pair of Fishes', nameTa: 'இரட்டை மீன்கள்', nameHi: 'दो मछलियां', nameTe: 'రెండు చేపలు', nameKn: 'ಜೋಡಿ ಮೀನುಗಳು', nameMl: 'ഇരട്ട മത്സ്യങ്ങൾ' },
    direction: { name: 'North', nameTa: 'வடக்கு', nameHi: 'उत्तर', nameTe: 'ఉత్తరం', nameKn: 'ಉತ್ತರ', nameMl: 'വടക്ക്' },
    bodyPart: { name: 'Feet & Toes', nameTa: 'பாதங்கள், விரல்கள்', nameHi: 'पैर और उंगलियां', nameTe: 'పాదాలు, వేళ్ళు', nameKn: 'ಪಾದಗಳು, ಬೆರಳುಗಳು', nameMl: 'പാദങ്ങൾ, വിരലുകൾ' },
    startDegree: 330, endDegree: 360
  }
];

// Helper to get Gana translation
const getGana = (type) => {
  if (type === 'Deva') {
    return { name: 'Deva', nameTa: 'தேவ கணம்', nameHi: 'देव गण', nameTe: 'దేవ గణము', nameKn: 'ದೇವ ಗಣ', nameMl: 'ദേവ ഗണം' };
  }
  if (type === 'Manushya') {
    return { name: 'Manushya', nameTa: 'மனுஷ கணம்', nameHi: 'मनुष्य गण', nameTe: 'మనుష్య గణము', nameKn: 'ಮನುಷ್ಯ ಗಣ', nameMl: 'മനുഷ്യ ഗണം' };
  }
  return { name: 'Rakshasa', nameTa: 'ராட்சஸ கணம்', nameHi: 'राक्षस गण', nameTe: 'రాక్షస గణము', nameKn: 'ರಾಕ್ಷಸ ಗಣ', nameMl: 'രാക്ഷസ ഗണം' };
};

// 27 Nakshatras Raw Definition with 6 Languages
const NAKSHATRA_RAW = [
  { id: 0, en: 'Ashwini', ta: 'அசுவினி', hi: 'अश्विनी', te: 'అశ్విని', kn: 'ಅಶ್ವಿನಿ', ml: 'അശ്വതി', lord: 8, deity: { name: 'Ashwini Kumaras', nameTa: 'அஸ்வினி குமாரர்கள்', nameHi: 'अश्विनी कुमार', nameTe: 'అశ్విని కుమారులు', nameKn: 'ಅಶ್ವಿನಿ ಕುಮಾರರು', nameMl: 'അശ്വിനികുമാരന്മാർ' }, gana: 'Deva', yoni: { name: 'Male Horse', nameTa: 'ஆண் குதிரை', nameHi: 'अश्व (घोड़ा)', nameTe: 'గుర్రం', nameKn: 'ಕುದುರೆ', nameMl: 'കുതിര' }, animal: { name: 'Horse', nameTa: 'குதிரை', nameHi: 'घोड़ा', nameTe: 'గుర్రం', nameKn: 'ಕುದುರೆ', nameMl: 'കുതിര' }, tree: { name: 'Poison Nut (Etti)', nameTa: 'எட்டி', nameHi: 'कुचिला', nameTe: 'ముషిణి', nameKn: 'ಕಾಸರಕ', nameMl: 'കാഞ്ഞിരം' }, bird: { name: 'Swan', nameTa: 'அன்னப்பறவை', nameHi: 'हंस', nameTe: 'హంస', nameKn: 'ಹಂಸ', nameMl: 'അന്നം' }, rasis: [{ rasiId: 0, padas: [1,2,3,4] }] },
  { id: 1, en: 'Bharani', ta: 'பரணி', hi: 'भरणी', te: 'భరణి', kn: 'ಭರಣಿ', ml: 'ഭരണി', lord: 3, deity: { name: 'Yama', nameTa: 'எமன்', nameHi: 'यमराज', nameTe: 'యముడు', nameKn: 'ಯಮ', nameMl: 'യമൻ' }, gana: 'Manushya', yoni: { name: 'Male Elephant', nameTa: 'ஆண் யானை', nameHi: 'गज (हाथी)', nameTe: 'ఏనుగు', nameKn: 'ಆನೆ', nameMl: 'ആന' }, animal: { name: 'Elephant', nameTa: 'யானை', nameHi: 'हाथी', nameTe: 'ఏనుగు', nameKn: 'ಆನೆ', nameMl: 'ആന' }, tree: { name: 'Amla (Nelli)', nameTa: 'நெல்லி', nameHi: 'आंवला', nameTe: 'ఉసిరి', nameKn: 'ನೆಲ್ಲಿ', nameMl: 'നെല്ലി' }, bird: { name: 'Crow', nameTa: 'காகம்', nameHi: 'कौआ', nameTe: 'కాకి', nameKn: 'ಕಾಗೆ', nameMl: 'കാക്ക' }, rasis: [{ rasiId: 0, padas: [1,2,3,4] }] },
  { id: 2, en: 'Krittika', ta: 'கார்த்திகை', hi: 'कृत्तिका', te: 'కృత్తిక', kn: 'ಕೃತಿಕಾ', ml: 'കാർത്തിക', lord: 0, deity: { name: 'Agni', nameTa: 'அக்னி', nameHi: 'अग्नि देव', nameTe: 'అగ్నిదేవుడు', nameKn: 'ಅಗ್ನಿ ದೇವ', nameMl: 'അഗ്നി' }, gana: 'Rakshasa', yoni: { name: 'Female Sheep / Goat', nameTa: 'பெண் ஆடு', nameHi: 'मेढ़ा / बकरी', nameTe: 'మేక', nameKn: 'ಕುರಿ / ಮೇಕೆ', nameMl: 'ആട്' }, animal: { name: 'Sheep / Goat', nameTa: 'ஆடு', nameHi: 'भेड़ / बकरी', nameTe: 'గొర్రె / మేక', nameKn: 'ಕುರಿ', nameMl: 'ആട്' }, tree: { name: 'Cluster Fig (Athi)', nameTa: 'அத்தி', nameHi: 'गूलर', nameTe: 'మేడి చెట్టు', nameKn: 'ಅತ್ತಿ', nameMl: 'അത്തി' }, bird: { name: 'Peacock', nameTa: 'மயில்', nameHi: 'मोर', nameTe: 'నెమలి', nameKn: 'ನವಿಲು', nameMl: 'മയിൽ' }, rasis: [{ rasiId: 0, padas: [1] }, { rasiId: 1, padas: [2,3,4] }] },
  { id: 3, en: 'Rohini', ta: 'ரோகிணி', hi: 'रोहिणी', te: 'రోహిణి', kn: 'ರೋಹಿಣಿ', ml: 'രോഹിണി', lord: 1, deity: { name: 'Brahma / Prajapati', nameTa: 'பிரம்மா', nameHi: 'ब्रह्मा / प्रजापति', nameTe: 'బ్రహ్మ', nameKn: 'ಬ್ರಹ್ಮ', nameMl: 'ബ്രഹ്മാവ്' }, gana: 'Manushya', yoni: { name: 'Male Serpent', nameTa: 'ஆண் பாம்பு', nameHi: 'सर्प', nameTe: 'పాము', nameKn: 'ಹಾವು', nameMl: 'സർപ്പം' }, animal: { name: 'Serpent', nameTa: 'பாம்பு', nameHi: 'सांप', nameTe: 'సర్పము', nameKn: 'ಹಾವು', nameMl: 'പാമ്പ്' }, tree: { name: 'Jamun (Naval)', nameTa: 'நாவல்', nameHi: 'जामुन', nameTe: 'నేరేడు', nameKn: 'ನೇರಳೆ', nameMl: 'ഞാവൽ' }, bird: { name: 'Owl', nameTa: 'ஆந்தை', nameHi: 'उल्लू', nameTe: 'గుడ్లగూబ', nameKn: 'ಗೂಬೆ', nameMl: 'മൂങ്ങ' }, rasis: [{ rasiId: 1, padas: [1,2,3,4] }] },
  { id: 4, en: 'Mrigashira', ta: 'மிருகசீரிஷம்', hi: 'मृगशिरा', te: 'మృగశిర', kn: 'ಮೃಗಶಿರ', ml: 'മകയിരം', lord: 4, deity: { name: 'Soma / Chandra', nameTa: 'சந்திரன்', nameHi: 'सोम (चन्द्र)', nameTe: 'చంద్రుడు', nameKn: 'ಸೋಮ (ಚಂದ್ರ)', nameMl: 'ചന്ദ്രൻ' }, gana: 'Deva', yoni: { name: 'Female Serpent', nameTa: 'பெண் பாம்பு', nameHi: 'सर्पिणी', nameTe: 'ఆడ పాము', nameKn: 'ಹೆಣ್ಣು ಹಾವು', nameMl: 'പെൺപാമ്പ്' }, animal: { name: 'Serpent', nameTa: 'பாம்பு', nameHi: 'सांप', nameTe: 'సర్పము', nameKn: 'ಹಾವು', nameMl: 'പാമ്പ്' }, tree: { name: 'Cutch Tree (Karungali)', nameTa: 'கருங்காலி', nameHi: 'खैर', nameTe: 'చండ్ర', nameKn: 'ಕಗ್ಗಲಿ', nameMl: 'കരിങ്ങാലി' }, bird: { name: 'Hen / Cock', nameTa: 'கோழி', nameHi: 'मुर्गी', nameTe: 'కోడి', nameKn: 'ಕೋಳಿ', nameMl: 'കോഴി' }, rasis: [{ rasiId: 1, padas: [1,2] }, { rasiId: 2, padas: [3,4] }] },
  { id: 5, en: 'Ardra', ta: 'திருவாதிரை', hi: 'आर्द्रा', te: 'ఆర్ద్ర', kn: 'ಆರ್ದ್ರಾ', ml: 'തിരുവാതിര', lord: 7, deity: { name: 'Rudra (Shiva)', nameTa: 'ருத்ரன் (சிவன்)', nameHi: 'रुद्र (शिव)', nameTe: 'రుద్రుడు (శివుడు)', nameKn: 'ರುದ್ರ (ಶಿವ)', nameMl: 'രുദ്രൻ (ശിവൻ)' }, gana: 'Manushya', yoni: { name: 'Female Dog', nameTa: 'பெண் நாய்', nameHi: 'कुतिया (श्वान)', nameTe: 'ఆడ కుక్క', nameKn: 'ಹೆಣ್ಣು ನಾಯಿ', nameMl: 'പെൺപട്ടി' }, animal: { name: 'Dog', nameTa: 'நாய்', nameHi: 'कुत्ता', nameTe: 'కుక్క', nameKn: 'ನಾಯಿ', nameMl: 'പട്ടി' }, tree: { name: 'Long Pepper / Red Wood (Semmaram)', nameTa: 'செம்மரம்', nameHi: 'रक्तचंदन / अगर', nameTe: 'ఎర్రచందనం', nameKn: 'ರಕ್ತಚಂದನ', nameMl: 'ചെമ്മരം' }, bird: { name: 'Andril Bird', nameTa: 'அன்றில்', nameHi: 'चक्रवाक', nameTe: 'చక్రవాకం', nameKn: 'ಚಕ್ರವಾಕ', nameMl: 'ചക്രവാകം' }, rasis: [{ rasiId: 2, padas: [1,2,3,4] }] },
  { id: 6, en: 'Punarvasu', ta: 'புனர்பூசம்', hi: 'पुनर्वसु', te: 'పునర్వసు', kn: 'ಪುನರ್ವಸು', ml: 'പുണർതം', lord: 5, deity: { name: 'Aditi', nameTa: 'அதிதி', nameHi: 'अदिति', nameTe: 'అదితి', nameKn: 'ಅದಿತಿ', nameMl: 'അദിതി' }, gana: 'Deva', yoni: { name: 'Female Cat', nameTa: 'பெண் பூனை', nameHi: 'मार्जार (बिल्ली)', nameTe: 'పిల్లి', nameKn: 'ಬೆಕ್ಕು', nameMl: 'പൂച്ച' }, animal: { name: 'Cat', nameTa: 'பூனை', nameHi: 'बिल्ली', nameTe: 'పిల్లి', nameKn: 'ಬೆಕ್ಕು', nameMl: 'പൂച്ച' }, tree: { name: 'Bamboo (Moongil)', nameTa: 'மூங்கில்', nameHi: 'बांस', nameTe: 'వెదురు', nameKn: 'ಬಿದಿರು', nameMl: 'മുള' }, bird: { name: 'Swan', nameTa: 'அன்னம்', nameHi: 'हंस', nameTe: 'హంస', nameKn: 'ಹಂಸ', nameMl: 'അന്നം' }, rasis: [{ rasiId: 2, padas: [1,2,3] }, { rasiId: 3, padas: [4] }] },
  { id: 7, en: 'Pushya', ta: 'பூசம்', hi: 'पुष्य', te: 'పుష్యమి', kn: 'ಪುಷ್ಯ', ml: 'പൂയം', lord: 6, deity: { name: 'Brihaspati (Guru)', nameTa: 'பிருஹஸ்பதி (குரு)', nameHi: 'बृहस्पति', nameTe: 'బృహస్పతి', nameKn: 'ಬೃಹಸ್ಪತಿ', nameMl: 'ബൃഹസ്പതി' }, gana: 'Deva', yoni: { name: 'Male Sheep / Ram', nameTa: 'ஆண் ஆடு', nameHi: 'मेढ़ा', nameTe: 'పొట్టేలు', nameKn: 'ಟಗರು', nameMl: 'ആട്ടുകൊറ്റൻ' }, animal: { name: 'Sheep', nameTa: 'ஆடு', nameHi: 'भेड़', nameTe: 'గొర్రె', nameKn: 'ಕುರಿ', nameMl: 'ആട്' }, tree: { name: 'Sacred Fig (Arasu)', nameTa: 'அரசு', nameHi: 'पीपल', nameTe: 'రావి చెట్టు', nameKn: 'ಅರಳಿ ಮರ', nameMl: 'അരയാൽ' }, bird: { name: 'Crow / Sea Gull', nameTa: 'காகம்', nameHi: 'कौआ', nameTe: 'కాకి', nameKn: 'ಕಾಗೆ', nameMl: 'കാക്ക' }, rasis: [{ rasiId: 3, padas: [1,2,3,4] }] },
  { id: 8, en: 'Ashlesha', ta: 'ஆயில்யம்', hi: 'आश्लेषा', te: 'ఆశ్లేష', kn: 'ಆಶ್ಲೇಷಾ', ml: 'ആയില്യം', lord: 2, deity: { name: 'Nagas / Sarpa', nameTa: 'நாகர்கள்', nameHi: 'नाग देव', nameTe: 'నాగదేవత', nameKn: 'ನಾಗ ದೇವತೆ', nameMl: 'നാഗങ്ങൾ' }, gana: 'Rakshasa', yoni: { name: 'Male Cat', nameTa: 'ஆண் பூனை', nameHi: 'बिलाव', nameTe: 'మగ పిల్లి', nameKn: 'ಗಂಡು ಬೆಕ್ಕು', nameMl: 'ആൺപൂച്ച' }, animal: { name: 'Cat', nameTa: 'பூனை', nameHi: 'बिल्ली', nameTe: 'పిల్లి', nameKn: 'ಬೆಕ್ಕು', nameMl: 'പൂച്ച' }, tree: { name: 'Alexandrian Laurel (Punnai)', nameTa: 'புன்னை', nameHi: 'नागकेसर / पुन्नाग', nameTe: 'పున్నాగ', nameKn: 'ಸುರಗಿ ಮರ', nameMl: 'പുന്ന' }, bird: { name: 'Small Sparrow', nameTa: 'சிட்டுக்குருவி', nameHi: 'गौरैया', nameTe: 'పిచ్చుక', nameKn: 'ಗುಬ್ಬಚ್ಚಿ', nameMl: 'കുരുവി' }, rasis: [{ rasiId: 3, padas: [1,2,3,4] }] },
  { id: 9, en: 'Magha', ta: 'மகம்', hi: 'मघा', te: 'మఖ', kn: 'ಮಖಾ', ml: 'മകം', lord: 8, deity: { name: 'Pitris (Ancestors)', nameTa: 'பித்ருக்கள்', nameHi: 'पितृ देव', nameTe: 'పితృదేవతలు', nameKn: 'ಪಿತೃ ದೇವತೆಗಳು', nameMl: 'പിതൃക്കൾ' }, gana: 'Rakshasa', yoni: { name: 'Male Rat', nameTa: 'ஆண் எலி', nameHi: 'मूषक (चूहा)', nameTe: 'ఎలుక', nameKn: 'ಇಲಿ', nameMl: 'എലി' }, animal: { name: 'Rat', nameTa: 'எலி', nameHi: 'चूहा', nameTe: 'ఎలుక', nameKn: 'ಇಲಿ', nameMl: 'എലി' }, tree: { name: 'Banyan Tree (Aal)', nameTa: 'ஆலமரம்', nameHi: 'बरगद', nameTe: 'మర్రి చెట్టు', nameKn: 'ಆಲದ ಮರ', nameMl: 'പേരാൽ' }, bird: { name: 'Male Eagle', nameTa: 'ஆண் கழுகு', nameHi: 'चील / गरुड़', nameTe: 'గద్ద', nameKn: 'ಹದ್ದು', nameMl: 'കഴുകൻ' }, rasis: [{ rasiId: 4, padas: [1,2,3,4] }] },
  { id: 10, en: 'Purva Phalguni', ta: 'பூரம்', hi: 'पूर्वाफाल्गुनी', te: 'పూర్వ ఫల్గుణి', kn: 'ಪೂರ್ವ ಫಲ್ಗುಣಿ', ml: 'പൂരം', lord: 3, deity: { name: 'Bhaga (Sun God)', nameTa: 'பகதேவன்', nameHi: 'भग देव', nameTe: 'భగ దేవుడు', nameKn: 'ಭಗ ದೇವ', nameMl: 'ഭഗൻ' }, gana: 'Manushya', yoni: { name: 'Female Rat', nameTa: 'பெண் எலி', nameHi: 'चूहिया', nameTe: 'ఆడ ఎలుక', nameKn: 'ಹೆಣ್ಣು ಇಲಿ', nameMl: 'പെണ്ണെലി' }, animal: { name: 'Rat', nameTa: 'எலி', nameHi: 'चूहा', nameTe: 'ఎలుక', nameKn: 'ಇಲಿ', nameMl: 'എലി' }, tree: { name: 'Flame of the Forest (Palasu)', nameTa: 'பலாசு', nameHi: 'ढाक / पलाश', nameTe: 'మోదుగ', nameKn: 'ಮುತ್ತುಗ', nameMl: 'പ്ലാശ്' }, bird: { name: 'Eagle', nameTa: 'கழுகு', nameHi: 'चील', nameTe: 'గద్ద', nameKn: 'ಹದ್ದು', nameMl: 'കഴുകൻ' }, rasis: [{ rasiId: 4, padas: [1,2,3,4] }] },
  { id: 11, en: 'Uttara Phalguni', ta: 'உத்திரம்', hi: 'उत्तराफाल्गुनी', te: 'ఉత్తర ఫల్గుణి', kn: 'ಉತ್ತರ ಫಲ್ಗುಣಿ', ml: 'ഉത്രം', lord: 0, deity: { name: 'Aryaman', nameTa: 'அரியமான்', nameHi: 'अर्यमा', nameTe: 'అర్యముడు', nameKn: 'ಅರ್ಯಮ', nameMl: 'അര്യമാവ്' }, gana: 'Manushya', yoni: { name: 'Male Cow / Bull', nameTa: 'ஆண் மாடு (காளை)', nameHi: 'बैल / गाय', nameTe: 'ఎద్దు', nameKn: 'ಎತ್ತು', nameMl: 'കാള' }, animal: { name: 'Cow / Bull', nameTa: 'மாடு', nameHi: 'गाय / बैल', nameTe: 'గోవు', nameKn: 'ಆಕಳು', nameMl: 'പശു' }, tree: { name: 'Rose Apple (Ichi / Arali)', nameTa: 'இச்சி / அலரி', nameHi: 'पाकड़ / कनेर', nameTe: 'జువ్వి చెట్టు', nameKn: 'ಇಚ್ಚಿ ಮರ', nameMl: 'ഇത്തി' }, bird: { name: 'Kite / Beetle', nameTa: 'வண்டு', nameHi: 'भृंग', nameTe: 'తుమ్మెద', nameKn: 'ದುಂಬಿ', nameMl: 'വണ്ട്' }, rasis: [{ rasiId: 4, padas: [1] }, { rasiId: 5, padas: [2,3,4] }] },
  { id: 12, en: 'Hasta', ta: 'அஸ்தம்', hi: 'हस्त', te: 'హస్త', kn: 'హస్తಾ', ml: 'അത്തം', lord: 2, deity: { name: 'Savitr (Sun)', nameTa: 'சாவித்ரி (சூரியன்)', nameHi: 'सविता (सूर्य)', nameTe: 'సవితృడు', nameKn: 'ಸವಿತೃ', nameMl: 'സവിതൃ' }, gana: 'Deva', yoni: { name: 'Female Buffalo', nameTa: 'பெண் எருமை', nameHi: 'भैंस', nameTe: 'ఆడ గేదె', nameKn: 'ಹೆಣ್ಣು ಎಮ್ಮೆ', nameMl: 'എരുമ' }, animal: { name: 'Buffalo', nameTa: 'எருமை', nameHi: 'भैंस', nameTe: 'గేదె', nameKn: 'ಎಮ್ಮೆ', nameMl: 'പോത്ത്' }, tree: { name: 'Wild Jasmine (Aathi / Velam)', nameTa: 'வேலம் / ஆத்தி', nameHi: 'चमेली / रीठा', nameTe: 'తుమ్మ చెట్టు', nameKn: 'ಜಾಲಿ ಮರ', nameMl: 'അത്തി' }, bird: { name: 'Vulture', nameTa: 'பருந்து', nameHi: 'गिद्ध', nameTe: 'రాబందు', nameKn: 'ರಣಹದ್ದು', nameMl: 'പരുന്ത്' }, rasis: [{ rasiId: 5, padas: [1,2,3,4] }] },
  { id: 13, en: 'Chitra', ta: 'சித்திரை', hi: 'चित्रा', te: 'చిత్త', kn: 'ಚಿತ್ತಾ', ml: 'ചിത്തിര', lord: 4, deity: { name: 'Vishwakarma (Divine Architect)', nameTa: 'விஸ்வகர்மா', nameHi: 'विश्वकर्मा', nameTe: 'విశ్వకర్మ', nameKn: 'ವಿಶ್ವಕರ್ಮ', nameMl: 'വിശ്വകർമ്മാവ്' }, gana: 'Rakshasa', yoni: { name: 'Female Tiger', nameTa: 'பெண் புலி', nameHi: 'बाघिन', nameTe: 'ఆడ పులి', nameKn: 'ಹೆಣ್ಣು ಹುಲಿ', nameMl: 'പെൺപുലി' }, animal: { name: 'Tiger', nameTa: 'புலி', nameHi: 'बाघ', nameTe: 'పులి', nameKn: 'ಹುಲಿ', nameMl: 'പുലി' }, tree: { name: 'Bael Tree (Vilvam)', nameTa: 'வில்வம்', nameHi: 'बेल पत्र', nameTe: 'మారేడు చెట్టు', nameKn: 'ಬೇಲದ ಮರ', nameMl: 'കൂവളം' }, bird: { name: 'Woodpecker', nameTa: 'மரங்கொத்தி', nameHi: 'कठफोड़वा', nameTe: 'వడ్రంగి పిట్ట', nameKn: 'ಮರಕುಟಿಗ', nameMl: 'മരംകൊത്തി' }, rasis: [{ rasiId: 5, padas: [1,2] }, { rasiId: 6, padas: [3,4] }] },
  { id: 14, en: 'Swati', ta: 'சுவாதி', hi: 'स्वाति', te: 'స్వాతి', kn: 'ಸ್ವಾತಿ', ml: 'ചോതി', lord: 7, deity: { name: 'Vayu (Wind God)', nameTa: 'வாயு தேவன்', nameHi: 'वायु देव', nameTe: 'వాయు దేవుడు', nameKn: 'ವಾಯು ದೇವ', nameMl: 'വായുദേവൻ' }, gana: 'Deva', yoni: { name: 'Male Buffalo', nameTa: 'ஆண் எருமை', nameHi: 'भैंसा', nameTe: 'మగ దున్న', nameKn: 'ಕೋಣ', nameMl: 'പോത്ത്' }, animal: { name: 'Buffalo', nameTa: 'எருமை', nameHi: 'भैंसा', nameTe: 'దున్నపోతు', nameKn: 'ಕೋಣ', nameMl: 'പോത്ത്' }, tree: { name: 'Arjuna Tree (Marutham)', nameTa: 'மருதம்', nameHi: 'अर्जुन वृक्ष', nameTe: 'మద్ది చెట్టు', nameKn: 'ಮತ್ತಿ ಮರ', nameMl: 'നീർമരുത്' }, bird: { name: 'Bee-eater / Pigeon', nameTa: 'புறா', nameHi: 'कबूतर', nameTe: 'పావురం', nameKn: 'ಪಾರಿವಾಳ', nameMl: 'പ്രാവ്' }, rasis: [{ rasiId: 6, padas: [1,2,3,4] }] },
  { id: 15, en: 'Vishakha', ta: 'விசாகம்', hi: 'विशाखा', te: 'విశాఖ', kn: 'ವಿಶಾಖಾ', ml: 'വിശാഖം', lord: 5, deity: { name: 'Indra & Agni', nameTa: 'இந்திரன் மற்றும் அக்னி', nameHi: 'इन्द्राग्नि', nameTe: 'ఇంద్రాగ్నులు', nameKn: 'ಇಂದ್ರ ಮತ್ತು ಅಗ್ನಿ', nameMl: 'ഇന്ദ്രാഗ്നികൾ' }, gana: 'Rakshasa', yoni: { name: 'Male Tiger', nameTa: 'ஆண் புலி', nameHi: 'बाघ', nameTe: 'పులి', nameKn: 'ಹುಲಿ', nameMl: 'പുലി' }, animal: { name: 'Tiger', nameTa: 'புலி', nameHi: 'बाघ', nameTe: 'పులి', nameKn: 'ಹುಲಿ', nameMl: 'പുലി' }, tree: { name: 'Wood Apple (Vilamichai / Kaith)', nameTa: 'விளா மரம்', nameHi: 'कैथ / कैथा', nameTe: 'వెలగ చెట్టు', nameKn: 'ಬೇಲದ ಮರ', nameMl: 'വിളാംപഴം' }, bird: { name: 'Red-wattled Lapwing', nameTa: 'செம்பருந்து', nameHi: 'टिटहरी', nameTe: 'టిట్టిభం', nameKn: 'ಟಿಟ್ಟಿಭ', nameMl: 'ചെമ്പോത്ത്' }, rasis: [{ rasiId: 6, padas: [1,2,3] }, { rasiId: 7, padas: [4] }] },
  { id: 16, en: 'Anuradha', ta: 'அனுஷம்', hi: 'अनुराधा', te: 'అనూరాధ', kn: 'ಅನುರಾಧಾ', ml: 'അനിഴം', lord: 6, deity: { name: 'Mitra (Friendship / Sun)', nameTa: 'மித்ரன்', nameHi: 'मित्र देव', nameTe: 'మిత్రుడు', nameKn: 'ಮಿತ್ರ ದೇವ', nameMl: 'മിത്രൻ' }, gana: 'Deva', yoni: { name: 'Female Deer', nameTa: 'பெண் மான்', nameHi: 'मृगी (हिरणी)', nameTe: 'ఆడ జింక', nameKn: 'ಹೆಣ್ಣು ಜಿಂಕೆ', nameMl: 'പെൺമാൻ' }, animal: { name: 'Deer', nameTa: 'மான்', nameHi: 'हिरण', nameTe: 'జింక', nameKn: 'ಜಿಂಕೆ', nameMl: 'മാൻ' }, tree: { name: 'Spanish Cherry (Magizham)', nameTa: 'மகிழம்', nameHi: 'मौलसिरी', nameTe: 'పొగడ చెట్టు', nameKn: 'ಬಕುಳ ಮರ', nameMl: 'ഇലഞ്ഞി' }, bird: { name: 'Night Heron / Crow', nameTa: 'காகம்', nameHi: 'कौआ', nameTe: 'కాకి', nameKn: 'ಕಾಗೆ', nameMl: 'കാക്ക' }, rasis: [{ rasiId: 7, padas: [1,2,3,4] }] },
  { id: 17, en: 'Jyeshtha', ta: 'கேட்டை', hi: 'ज्येष्ठा', te: 'జ్యేష్ఠ', kn: 'ಜ್ಯೇಷ್ಠಾ', ml: 'തൃക്കേട്ട', lord: 2, deity: { name: 'Indra (King of Gods)', nameTa: 'இந்திரன்', nameHi: 'देवराज इन्द्र', nameTe: 'ఇంద్రుడు', nameKn: 'ದೇವೇಂದ್ರ', nameMl: 'ഇന്ദ്രൻ' }, gana: 'Rakshasa', yoni: { name: 'Male Deer', nameTa: 'ஆண் மான்', nameHi: 'मृग (हिरण)', nameTe: 'మగ జింక', nameKn: 'ಗಂಡು ಜಿಂಕೆ', nameMl: 'ആൺമാൻ' }, animal: { name: 'Deer', nameTa: 'மான்', nameHi: 'हिरण', nameTe: 'జింక', nameKn: 'ಜಿಂಕೆ', nameMl: 'മാൻ' }, tree: { name: 'Pine Tree / Silk Cotton (Piran / Paruthi)', nameTa: 'பராய் / பிராய்', nameHi: 'चीड़ / सेमल', nameTe: 'బూరుగు చెట్టు', nameKn: 'ಬೂರಗದ ಮರ', nameMl: 'വെട്ടി' }, bird: { name: 'Chakora Bird', nameTa: 'செம்பருந்து', nameHi: 'चकोर', nameTe: 'చకోరం', nameKn: 'ಚಕೋರ', nameMl: 'ചകോരം' }, rasis: [{ rasiId: 7, padas: [1,2,3,4] }] },
  { id: 18, en: 'Mula', ta: 'மூலம்', hi: 'मूल', te: 'మూల', kn: 'ಮೂಲಾ', ml: 'മൂലം', lord: 8, deity: { name: 'Nirriti (Goddess of Dissolution)', nameTa: 'நிருதி', nameHi: 'निरृति', nameTe: 'నిరృతి', nameKn: 'ನಿರೃತಿ', nameMl: 'നിര്യതി' }, gana: 'Rakshasa', yoni: { name: 'Male Dog', nameTa: 'ஆண் நாய்', nameHi: 'श्वान (कुत्ता)', nameTe: 'మగ కుక్క', nameKn: 'ನಾಯಿ', nameMl: 'ആൺപട്ടി' }, animal: { name: 'Dog', nameTa: 'நாய்', nameHi: 'कुत्ता', nameTe: 'కుక్క', nameKn: 'ನಾಯಿ', nameMl: 'പട്ടി' }, tree: { name: 'Sal Tree (Maramaram / Sarja)', nameTa: 'மராமரம்', nameHi: 'साल वृक्ष', nameTe: 'గుగ్గిలం చెట్టు', nameKn: 'ಸಾಲ ಮರ', nameMl: 'പൈൻ / പച്ചോറ്റി' }, bird: { name: 'Red-crested Cuckoo', nameTa: 'செண்பகப் பறவை', nameHi: 'कोयल', nameTe: 'కోకిల', nameKn: 'ಕೋಗಿಲೆ', nameMl: 'ചെമ്പോത്ത്' }, rasis: [{ rasiId: 8, padas: [1,2,3,4] }] },
  { id: 19, en: 'Purva Ashadha', ta: 'பூராடம்', hi: 'पूर्वाषाढ़ा', te: 'పూర్వాషాఢ', kn: 'ಪೂರ್ವಾಷಾಢ', ml: 'പൂരാടം', lord: 3, deity: { name: 'Apas (Water Cosmic Deity)', nameTa: 'அபாஸ் (வருணன்)', nameHi: 'आपः (जल देवता)', nameTe: 'జలదేవత', nameKn: 'ಅಪಾಃ (ಜಲ ದೇವತೆ)', nameMl: 'ജലദേവത' }, gana: 'Manushya', yoni: { name: 'Male Monkey', nameTa: 'ஆண் குரங்கு', nameHi: 'वानर (बंदर)', nameTe: 'కోతి', nameKn: 'ಕೋತಿ', nameMl: 'കുരങ്ങ്' }, animal: { name: 'Monkey', nameTa: 'குரங்கு', nameHi: 'बंदर', nameTe: 'కోతి', nameKn: 'ಮಂಗ', nameMl: 'കുരങ്ങ്' }, tree: { name: 'Rattan Cane (Vanchi)', nameTa: 'வஞ்சி', nameHi: 'बेंत / जामुन', nameTe: 'బెత్తము', nameKn: 'ಬೆತ್ತದ ಮರ', nameMl: 'വഞ്ചി' }, bird: { name: 'Partridge', nameTa: 'கௌதாரி', nameHi: 'तीतर', nameTe: 'కౌజు పిట్ట', nameKn: 'ಗೌಜಲಕ್ಕಿ', nameMl: 'കോഴി' }, rasis: [{ rasiId: 8, padas: [1,2,3,4] }] },
  { id: 20, en: 'Uttara Ashadha', ta: 'உத்திராடம்', hi: 'उत्तराषाढ़ा', te: 'ఉత్తరాషాఢ', kn: 'ಉತ್ತರಾಷಾಢ', ml: 'ഉത്രാടം', lord: 0, deity: { name: 'Vishwadevas (Universal Gods)', nameTa: 'விஸ்வேதேவர்கள்', nameHi: 'विश्वेदेव', nameTe: 'విశ్వేదేవతలు', nameKn: 'ವಿಶ್ವೇದೇವತೆಗಳು', nameMl: 'വിശ്വേദേവന്മാർ' }, gana: 'Manushya', yoni: { name: 'Male Mongoose', nameTa: 'ஆண் கீரி', nameHi: 'नेवला', nameTe: 'ముంగిస', nameKn: 'ಮುಂಗುಸಿ', nameMl: 'കീരി' }, animal: { name: 'Mongoose', nameTa: 'கீரிப்பிள்ளை', nameHi: 'नेवला', nameTe: 'ముంగిస', nameKn: 'ಮುಂಗುಸಿ', nameMl: 'കീരി' }, tree: { name: 'Jackfruit Tree (Pala)', nameTa: 'பலா மரம்', nameHi: 'कटहल', nameTe: 'పనస చెట్టు', nameKn: 'ಹಲಸಿನ ಮರ', nameMl: 'പ്ലാവ്' }, bird: { name: 'Stork / Cock', nameTa: 'நாரை', nameHi: 'बगुला', nameTe: 'కొంగ', nameKn: 'ಬೆಳ್ಳಕ್ಕಿ', nameMl: 'കൊക്ക്' }, rasis: [{ rasiId: 8, padas: [1] }, { rasiId: 9, padas: [2,3,4] }] },
  { id: 21, en: 'Shravana', ta: 'திருவோணம்', hi: 'श्रवण', te: 'శ్రవణం', kn: 'ಶ್ರವಣ', ml: 'തിരുവോണം', lord: 1, deity: { name: 'Lord Vishnu', nameTa: 'மகாவிஷ்ணு', nameHi: 'भगवान विष्णु', nameTe: 'మహావిష్ణువు', nameKn: 'ಮಹಾವಿಷ್ಣು', nameMl: 'മഹാവിഷ്ണു' }, gana: 'Deva', yoni: { name: 'Female Monkey', nameTa: 'பெண் குரங்கு', nameHi: 'वानरी', nameTe: 'ఆడ కోతి', nameKn: 'ಹೆಣ್ಣು ಮಂಗ', nameMl: 'പെൺകുരങ്ങ്' }, animal: { name: 'Monkey', nameTa: 'குரங்கு', nameHi: 'बंदर', nameTe: 'కోతి', nameKn: 'ಮಂಗ', nameMl: 'കുരങ്ങ്' }, tree: { name: 'Crown Flower (Erukku)', nameTa: 'எருக்கு', nameHi: 'मदार / आक', nameTe: 'జిల్లేడు చెట్టు', nameKn: 'ಎಕ್ಕದ ಗಿಡ', nameMl: 'എരുക്ക്' }, bird: { name: 'Francolin / Hawk', nameTa: 'நண்டு தின்னிப் பறவை', nameHi: 'चील', nameTe: 'డేగ', nameKn: 'ಗಿಡುಗ', nameMl: 'പരുന്ത്' }, rasis: [{ rasiId: 9, padas: [1,2,3,4] }] },
  { id: 22, en: 'Dhanishta', ta: 'அவிட்டம்', hi: 'धनिष्ठा', te: 'ధనిష్ఠ', kn: 'ಧನಿಷ್ಠಾ', ml: 'അവിട്ടം', lord: 4, deity: { name: 'Ashta Vasus (8 Elemental Deities)', nameTa: 'அஷ்ட வசுக்கள்', nameHi: 'अष्ट वसु', nameTe: 'అష్ట వసువులు', nameKn: 'ಅಷ್ಟ ವಸುಗಳು', nameMl: 'അഷ്ടവസുക്കൾ' }, gana: 'Rakshasa', yoni: { name: 'Female Lion', nameTa: 'பெண் சிங்கம்', nameHi: 'सिंहनी', nameTe: 'ఆడ సింహం', nameKn: 'ಹೆಣ್ಣು ಸಿಂಹ', nameMl: 'പെൺസിംഹം' }, animal: { name: 'Lion', nameTa: 'சிங்கம்', nameHi: 'सिंह', nameTe: 'సింహం', nameKn: 'ಸಿಂಹ', nameMl: 'സിംഹം' }, tree: { name: 'Indian Mesquite (Vanni)', nameTa: 'வன்னி', nameHi: 'शमी वृक्ष', nameTe: 'జమ్మి చెట్టు', nameKn: 'ಬನ್ನಿ ಮರ', nameMl: 'വഹ്നി' }, bird: { name: 'Golden Eagle', nameTa: 'பொன் கழுகு', nameHi: 'सुनहरा गरुड़', nameTe: 'బంగారు గద్ద', nameKn: 'ಚಿನ್ನದ ಹದ್ದು', nameMl: 'പൊൻപരുന്ത്' }, rasis: [{ rasiId: 9, padas: [1,2] }, { rasiId: 10, padas: [3,4] }] },
  { id: 23, en: 'Shatabhisha', ta: 'சதயம்', hi: 'शतभिषा', te: 'శతభిషం', kn: 'ಶತಭಿಷಾ', ml: 'ചതയം', lord: 7, deity: { name: 'Varuna (God of Cosmic Waters)', nameTa: 'வருண பகவான்', nameHi: 'वरुण देव', nameTe: 'వరుణ దేవుడు', nameKn: 'ವರುಣ ದೇವ', nameMl: 'വരുണൻ' }, gana: 'Rakshasa', yoni: { name: 'Female Horse', nameTa: 'பெண் குதிரை', nameHi: 'घोड़ी', nameTe: 'ఆడ గుర్రం', nameKn: 'ಹೆಣ್ಣು ಕುದುರೆ', nameMl: 'പെൺകുതിര' }, animal: { name: 'Horse', nameTa: 'குதிரை', nameHi: 'घोड़ा', nameTe: 'గుర్రం', nameKn: 'ಕುದುರೆ', nameMl: 'കുതിര' }, tree: { name: 'Indian Coral Tree (Kadambu)', nameTa: 'கடம்பு', nameHi: 'कदम्ब', nameTe: 'కదంబ చెట్టు', nameKn: 'ಕದಂಬ ಮರ', nameMl: 'കടമ്പ്' }, bird: { name: 'Raven / Crow', nameTa: 'அண்டங்காக்கை', nameHi: 'काला कौआ', nameTe: 'మలకాకి', nameKn: 'ಕಾಡು ಕಾಗೆ', nameMl: 'കാക്ക' }, rasis: [{ rasiId: 10, padas: [1,2,3,4] }] },
  { id: 24, en: 'Purva Bhadrapada', ta: 'பூரட்டாதி', hi: 'पूर्वाभाद्रपदा', te: 'పూర్వాభాద్ర', kn: 'ಪೂರ್ವಾಭಾದ್ರ', ml: 'പൂരുരുട്ടാതി', lord: 5, deity: { name: 'Aja Ekapada (One-footed Serpent / Rudra)', nameTa: 'அஜைகபாதர்', nameHi: 'अजैकपाद', nameTe: 'అజైకపాదుడు', nameKn: 'ಅಜೈಕಪಾದ', nameMl: 'അജൈകപാദൻ' }, gana: 'Manushya', yoni: { name: 'Male Lion', nameTa: 'ஆண் சிங்கம்', nameHi: 'सिंह', nameTe: 'మగ సింహం', nameKn: 'ಗಂಡು ಸಿಂಹ', nameMl: 'ആൺസിംഹം' }, animal: { name: 'Lion', nameTa: 'சிங்கம்', nameHi: 'सिंह', nameTe: 'సింహం', nameKn: 'ಸಿಂಹ', nameMl: 'സിംഹം' }, tree: { name: 'Mango Tree (Maa)', nameTa: 'மாமரம்', nameHi: 'आम का पेड़', nameTe: 'మామిడి చెట్టు', nameKn: 'ಮಾವಿನ ಮರ', nameMl: 'മാവ്' }, bird: { name: 'Peacock', nameTa: 'மயில்', nameHi: 'मोर', nameTe: 'నెమలి', nameKn: 'ನವಿಲು', nameMl: 'മയിൽ' }, rasis: [{ rasiId: 10, padas: [1,2,3] }, { rasiId: 11, padas: [4] }] },
  { id: 25, en: 'Uttara Bhadrapada', ta: 'உத்திரட்டாதி', hi: 'उत्तराभाद्रपदा', te: 'ఉత్తరాభాద్ర', kn: 'ಉತ್ತರಾಭಾದ್ರ', ml: 'ഉത്രട്ടാതി', lord: 6, deity: { name: 'Ahirbudhnya (Serpent of the Depths)', nameTa: 'அஹிர்புத்னியன்', nameHi: 'अहिर्बुध्न्य', nameTe: 'అహిర్బుధ్న్యుడు', nameKn: 'ಅಹಿರ್ಬುಧ್ನ್ಯ', nameMl: 'അഹിർബുധ്ന്യൻ' }, gana: 'Manushya', yoni: { name: 'Female Cow', nameTa: 'பெண் பசு', nameHi: 'गाय', nameTe: 'ఆవు', nameKn: 'ಆಕಳು', nameMl: 'പശു' }, animal: { name: 'Cow', nameTa: 'பசு', nameHi: 'गाय', nameTe: 'గోవు', nameKn: 'ಗೋವು', nameMl: 'പശു' }, tree: { name: 'Neem Tree (Veppam)', nameTa: 'வேப்பமரம்', nameHi: 'नीम', nameTe: 'వేప చెట్టు', nameKn: 'ಬೇವಿನ ಮರ', nameMl: 'വേപ്പ്' }, bird: { name: 'Dove / Pigeon', nameTa: 'கோட்டான்', nameHi: 'कबूतर / पंडुक', nameTe: 'పావురం', nameKn: 'ಪಾರಿವಾಳ', nameMl: 'പ്രാവ്' }, rasis: [{ rasiId: 11, padas: [1,2,3,4] }] },
  { id: 26, en: 'Revati', ta: 'ரேவதி', hi: 'रेवती', te: 'రేవతి', kn: 'ರೇವತಿ', ml: 'രേവതി', lord: 2, deity: { name: 'Pushan (Nourisher / Solar Deity)', nameTa: 'பூஷா (சூரியன்)', nameHi: 'पूषा देव', nameTe: 'పూష దేవుడు', nameKn: 'ಪೂಷ ದೇವ', nameMl: 'പൂഷാവ്' }, gana: 'Deva', yoni: { name: 'Female Elephant', nameTa: 'பெண் யானை', nameHi: 'हथिनी', nameTe: 'ఆడ ఏనుగు', nameKn: 'ಹೆಣ್ಣು ಆನೆ', nameMl: 'പിടിയാന' }, animal: { name: 'Elephant', nameTa: 'யானை', nameHi: 'हाथी', nameTe: 'ఏనుగు', nameKn: 'ಆನೆ', nameMl: 'ആന' }, tree: { name: 'Mahua Tree (Iluppai)', nameTa: 'இலுப்பை', nameHi: 'महुआ', nameTe: 'ఇప్ప చెట్టు', nameKn: 'ಇಪ್ಪೆ ಮರ', nameMl: 'ഇരിപ്പ' }, bird: { name: 'Kestrel / Sparrow', nameTa: 'வல்லூறு', nameHi: 'बाज / गौरैया', nameTe: 'డేగ', nameKn: 'ಗಿಡುಗ', nameMl: 'പ്രാവ്' }, rasis: [{ rasiId: 11, padas: [1,2,3,4] }] }
];

// 30 Tithis
const TITHI_NAMES = [
  ['Prathama', 'பிரதமை', 'प्रतिपदा', 'పాడ్యమి', 'ಪಾಡ್ಯ', 'പ്രഥമ', 'Agni', 'அக்னி', 'अग्नि देव', 'అగ్ని', 'ಅಗ್ನಿ', 'അഗ്നി', 'Nanda', 'நந்தா', 'नन्दा', 'నంద', 'ನಂದಾ', 'നന്ദ', 0],
  ['Dvitiya', 'துவிதியை', 'द्वितीया', 'విదియ', 'ಬಿದಿಗೆ', 'ദ്വിതീയ', 'Brahma', 'பிரம்மா', 'ब्रह्मा', 'బ్రహ్మ', 'ಬ್ರಹ್ಮ', 'ബ്രഹ്മാവ്', 'Bhadra', 'பத்ரா', 'भद्रा', 'భద్ర', 'ಭದ್ರಾ', 'ഭദ്ര', 1],
  ['Tritiya', 'திருதியை', 'तृतीया', 'తదియ', 'ತದಿಗೆ', 'തൃതീയ', 'Gauri', 'கௌரி', 'गौरी', 'గౌరి', 'ಗೌರಿ', 'ഗൗരി', 'Jaya', 'ஜயா', 'जया', 'జయ', 'ಜಯಾ', 'ജയ', 4],
  ['Chaturthi', 'சதுர்த்தி', 'चतुर्थी', 'చవితి', 'ಚೌತಿ', 'ചതുർത്ഥി', 'Ganesha', 'விநாயகர்', 'गणेश', 'వినాయకుడు', 'ಗಣೇಶ', 'ഗണപതി', 'Rikta', 'ரிக்தா', 'रिक्ता', 'రిక్త', 'ರಿಕ್ತಾ', 'രിക്ത', 2],
  ['Panchami', 'பஞ்சமி', 'पञ्चमी', 'పంచమి', 'ಪಂಚಮಿ', 'പഞ്ചമി', 'Nagas / Serpent', 'நாகர்கள்', 'नाग देव', 'నాగదేవత', 'ನಾಗ ದೇವತೆ', 'നാഗങ്ങൾ', 'Poorna', 'பூர்ணா', 'पूर्णा', 'పూర్ణ', 'ಪೂರ್ಣಾ', 'പൂർണ്ണ', 5],
  ['Shashti', 'சஷ்டி', 'षष्ठी', 'షష్ఠి', 'ಷಷ್ಠಿ', 'ഷഷ്ഠി', 'Kartikeya / Murugan', 'முருகன்', 'कार्तिकेय', 'సుబ్రహ్మణ్యేశ్వరుడు', 'ಕಾರ್ತಿಕೇಯ', 'മുരുകൻ', 'Nanda', 'நந்தா', 'नन्दा', 'నంద', 'ನಂದಾ', 'നന്ദ', 3],
  ['Saptami', 'சப்தமி', 'सप्तमी', 'సప్తమి', 'ಸಪ್ತಮಿ', 'സപ്തമി', 'Surya (Sun)', 'சூரியன்', 'सूर्य देव', 'సూర్యుడు', 'ಸೂರ್ಯ', 'സൂര്യൻ', 'Bhadra', 'பத்ரா', 'भद्रा', 'భద్ర', 'ಭದ್ರಾ', 'ഭദ്ര', 6],
  ['Ashtami', 'அஷ்டமி', 'अष्टमी', 'అష్టమి', 'ಅಷ್ಟಮಿ', 'അഷ്ടമി', 'Shiva / Rudra', 'ருத்ரன்', 'शिव / रुद्र', 'శివుడు', 'ಶಿವ', 'ശിവൻ', 'Jaya', 'ஜயா', 'जया', 'జయ', 'ಜಯಾ', 'ജയ', 7],
  ['Navami', 'நவமி', 'नवमी', 'నవమి', 'ನವಮಿ', 'നവമി', 'Durga', 'துர்க்கை', 'माँ दुर्गा', 'దుర్గాదేవి', 'ದುರ್ಗೆ', 'ദുർഗ്ഗ', 'Rikta', 'ரிக்தா', 'रिक्ता', 'రిక్త', 'ರಿಕ್ತಾ', 'രിക്ത', 8],
  ['Dashami', 'தசமி', 'दशमी', 'దశమి', 'ದಶಮಿ', 'ദശമി', 'Yama / Dharma', 'எமன்', 'यमराज', 'యముడు', 'ಯಮ', 'യമൻ', 'Poorna', 'பூர்ணா', 'पूर्णा', 'పూర్ణ', 'ಪೂರ್ಣಾ', 'പൂർണ്ണ', 1],
  ['Ekadashi', 'ஏகாதசி', 'एकादशी', 'ఏకాదశి', 'ಏಕಾದಶಿ', 'ഏകാദശി', 'Vishnu', 'மகாவிஷ்ணு', 'भगवान विष्णु', 'మహావిష్ణువు', 'ಮಹಾವಿಷ್ಣು', 'മഹാവിഷ്ണു', 'Nanda', 'நந்தா', 'नन्दा', 'నంద', 'ನಂದಾ', 'നന്ദ', 4],
  ['Dvadashi', 'துவாதசி', 'द्वादशी', 'ద్వాదశి', 'ದ್ವಾದಶಿ', 'ദ്വാദശി', 'Vishnu / Hari', 'ஹரி', 'विष्णु / हरि', 'హరి', 'ವಿಷ್ಣು', 'ഹരി', 'Bhadra', 'பத்ரா', 'भद्रा', 'భద్ర', 'ಭದ್ರಾ', 'ഭദ്ര', 2],
  ['Trayodashi', 'திரயோதசி', 'त्रयोदशी', 'త్రయోదశి', 'ತ್ರಯೋದಶಿ', 'ത്രയോദശി', 'Kamadeva', 'காமதேவன்', 'कामदेव', 'మన్మథుడు', 'ಕಾಮದೇವ', 'കാമദേവൻ', 'Jaya', 'ஜயா', 'जया', 'జయ', 'ಜಯಾ', 'ജയ', 5],
  ['Chaturdashi', 'சதுர்த்தசி', 'चतुर्दशी', 'చతుర్దశి', 'ಚತುರ್ದಶಿ', 'ചതുർദ്ദശി', 'Shiva', 'சிவன்', 'भगवान शिव', 'శివుడు', 'ಶಿವ', 'ശിവൻ', 'Rikta', 'ரிக்தா', 'रिक्ता', 'రిక్త', 'ರಿಕ್ತಾ', 'രിക്ത', 3],
  ['Purnima', 'பௌர்ணமி', 'पूर्णिमा', 'పౌర్ణమి', 'ಹುಣ್ಣಿಮೆ', 'പൗർണ്ണമി', 'Moon / Chandra', 'சந்திரன்', 'चन्द्र देव', 'చంద్రుడు', 'ಚಂದ್ರ', 'ചന്ദ്രൻ', 'Poorna', 'பூர்ணா', 'पूर्णा', 'పూర్ణ', 'ಪೂರ್ಣಾ', 'പൂർണ്ണ', 6]
];

// 27 Nithya Yogas
const YOGA_RAW = [
  ['Vishkumbha', 'விஷ்கம்பம்', 'विष्कम्भ', 'విష్కంభం', 'ವಿಷ್ಕಂಭ', 'വിഷ്കംഭം', 6, 'Malefic'],
  ['Priti', 'ப்ரீதி', 'प्रीति', 'ప్రీతి', 'ಪ್ರೀತಿ', 'പ്രീതി', 2, 'Benefic'],
  ['Ayushman', 'ஆயுஷ்மான்', 'आयुष्मान्', 'ఆయుష్మాన్', 'ಆಯುಷ್ಮಾನ್', 'ആയുഷ്മാൻ', 8, 'Benefic'],
  ['Saubhagya', 'சௌபாக்யம்', 'सौभाग्य', 'సౌభాగ్యం', 'ಸೌಭಾಗ್ಯ', 'സൗഭാഗ്യം', 3, 'Benefic'],
  ['Shobhana', 'சோபனம்', 'शोभन', 'శోభనం', 'ಶೋಭನ', 'ശോഭനം', 0, 'Benefic'],
  ['Atiganda', 'அதிகண்டம்', 'अतिगण्ड', 'అతిగండం', 'ಅತಿಗಂಡ', 'അതിഗണ്ഡം', 1, 'Malefic'],
  ['Sukarma', 'சுகர்மம்', 'सुकर्मा', 'సుకర్మ', 'ಸುಕರ್ಮ', 'സുകർമ്മം', 4, 'Benefic'],
  ['Dhriti', 'திருதி', 'धृति', 'ధృతి', 'ಧೃತಿ', 'ധൃതി', 7, 'Benefic'],
  ['Shula', 'சூலம்', 'शूल', 'శూలం', 'ಶೂಲ', 'ശൂലം', 5, 'Malefic'],
  ['Ganda', 'கண்டம்', 'गण्ड', 'గండం', 'ಗಂಡ', 'ഗണ്ഡം', 6, 'Malefic'],
  ['Vriddhi', 'விருத்தி', 'वृद्धि', 'వృద్ధి', 'ವೃದ್ಧಿ', 'വൃദ്ധി', 2, 'Benefic'],
  ['Dhruva', 'துருவம்', 'ध्रुव', 'ధ్రువం', 'ಧ್ರುವ', 'ധ്രുവം', 8, 'Benefic'],
  ['Vyaghata', 'வியாகாதம்', 'व्याघात', 'వ్యాఘాతం', 'ವ್ಯಾಘಾತ', 'വ്യാഘാതം', 3, 'Malefic'],
  ['Harshana', 'ஹர்ஷணம்', 'हर्षण', 'హర్షణం', 'ಹರ್ಷಣ', 'ഹർഷണം', 0, 'Benefic'],
  ['Vajra', 'வஜ்ரம்', 'वज्र', 'వజ్రం', 'ವಜ್ರ', 'വജ്രം', 1, 'Malefic'],
  ['Siddhi', 'சித்தி', 'सिद्धि', 'సిద్ధి', 'ಸಿದ್ಧಿ', 'സിദ്ധി', 4, 'Benefic'],
  ['Vyatipata', 'வியதிபாதம்', 'व्यतीपात', 'వ్యతీపాతం', 'ವ್ಯತೀಪಾತ', 'വ്യതീപാതം', 7, 'Malefic'],
  ['Variyan', 'வரியான்', 'वरीयान्', 'వరీయాన్', 'ವರೀಯಾನ್', 'വരീയാൻ', 5, 'Benefic'],
  ['Parigha', 'பரிகம்', 'परिघ', 'పరిఘం', 'ಪರಿಘ', 'പരിഘം', 6, 'Malefic'],
  ['Shiva', 'சிவம்', 'शिव', 'శివం', 'ಶಿವ', 'ശിവം', 2, 'Benefic'],
  ['Siddha', 'சித்தம்', 'सिद्ध', 'సిద్ధం', 'ಸಿದ್ಧ', 'സിദ്ധം', 8, 'Benefic'],
  ['Sadhya', 'சாத்தியம்', 'साध्य', 'సాధ్యం', 'ಸಾಧ್ಯ', 'സാധ്യം', 3, 'Benefic'],
  ['Shubha', 'சுபம்', 'शुभ', 'శుభం', 'ಶುಭ', 'ശുഭം', 0, 'Benefic'],
  ['Shukla', 'சுப்பிரம்', 'शुक्ल', 'శుక్లం', 'ಶುಕ್ಲ', 'ശുക്ലം', 1, 'Benefic'],
  ['Brahma', 'பிரம்மம்', 'ब्रह्म', 'బ్రహ్మం', 'ಬ್ರಹ್ಮ', 'ബ്രഹ്മം', 4, 'Benefic'],
  ['Indra', 'ஐந்திரம்', 'ऐन्द्र', 'ఐంద్రం', 'ಐಂದ್ರ', 'ഐന്ദ്രം', 7, 'Benefic'],
  ['Vaidhriti', 'வைதிருதி', 'वैधृति', 'వైధృతి', 'ವೈಧೃತಿ', 'വൈധൃതി', 5, 'Malefic']
];

// 11 Karanas
const KARANA_RAW = [
  ['Bava', 'பவம்', 'बव', 'బవ', 'ಬವ', 'ബവം', 'Chara', 'Indra', 'இந்திரன்', 'इन्द्र', 'ఇంద్రుడు', 'ಇಂದ್ರ', 'ഇന്ദ്രൻ', 0],
  ['Balava', 'பாலவம்', 'बालव', 'బాలవ', 'ಬಾಲವ', 'ബാലവം', 'Chara', 'Brahma', 'பிரம்மா', 'ब्रह्मा', 'బ్రహ్మ', 'ಬ್ರಹ್ಮ', 'ബ്രഹ്മാവ്', 1],
  ['Kaulava', 'கௌலவம்', 'कौलव', 'కౌలవ', 'ಕೌಲವ', 'കൗലവം', 'Chara', 'Mitra', 'மித்ரன்', 'मित्र', 'మిత్రుడు', 'ಮಿತ್ರ', 'മിത്രൻ', 4],
  ['Taitila', 'தைதுலை', 'तैतिल', 'తైతుల', 'ತೈತಿಲ', 'തൈതിലം', 'Chara', 'Aryaman', 'அரியமான்', 'अर्यमा', 'అర్యముడు', 'ಅರ್ಯಮ', 'അര്യമാവ്', 2],
  ['Garija', 'கரசை', 'गरिज', 'గరజ', 'ಗರಿಜ', 'ഗരജം', 'Chara', 'Bhumi (Earth)', 'பூமாதேவி', 'भूदेवी', 'భూదేవి', 'ಭೂದೇವಿ', 'ഭൂമീദേവി', 5],
  ['Vanija', 'வணிகை', 'वणिज', 'వణిజ', 'ವಣಿಜ', 'വണിജം', 'Chara', 'Shri (Lakshmi)', 'மகாலட்சுமி', 'लक्ष्मी', 'లక్ష్మీదేవి', 'ಲಕ್ಷ್ಮೀ', 'ലക്ഷ്മി', 3],
  ['Vishti (Bhadra)', 'பத்திரை (விஷ்டி)', 'विष्टि (भद्रा)', 'విష్టి (భద్ర)', 'ವಿಷ್ಟಿ (ಭದ್ರಾ)', 'വിഷ്ടി (ഭദ്ര)', 'Chara', 'Yama', 'எமன்', 'यमराज', 'యముడు', 'ಯಮ', 'യമൻ', 6],
  ['Shakuni', 'சகுனி', 'शकुनि', 'శకుని', 'ಶಕುನಿ', 'ശకుని', 'Sthira', 'Garuda', 'கருடன்', 'गरुड़', 'గరుడుడు', 'ಗರುಡ', 'ഗരുഡൻ', 7],
  ['Chatushpada', 'சதுஷ்பாதம்', 'चतुष्पाद', 'చతుష్పాదం', 'ಚತುಷ್ಪಾದ', 'ചതുഷ്പാദം', 'Sthira', 'Pashupati (Rudra)', 'பசுபதி (சிவன்)', 'पशुपति', 'పశుపతి', 'ಪಶುಪತಿ', 'പശുപതി', 8],
  ['Naga', 'நாகவம்', 'नाग', 'నాగం', 'ನಾಗ', 'നാഗം', 'Sthira', 'Nagas (Serpent)', 'நாகர்கள்', 'नाग देव', 'నాగదేవత', 'ನಾಗ ದೇವತೆ', 'നാഗങ്ങൾ', 7],
  ['Kimstughna', 'கிமிஸ்துக்னம்', 'किंस्तुघ्न', 'కింస్తుఘ్నం', 'ಕಿಂಸ್ತುಘ್ನ', 'കിംസ്തുഘ്നം', 'Sthira', 'Vayu (Wind)', 'வாயு', 'वायु देव', 'వాయువు', 'ವಾಯು', 'വായു', 8]
];

// 60 Tamil / Vedic Years
const YEARS_RAW = [
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

// 12 Tamil Months with Rasis and Seasons
const MONTHS_RAW = [
  ['Chithirai', 'சித்திரை', 'चैत्र', 'చైత్రం', 'ಚೈತ್ರ', 'മേടം (ചിത്തിര)', 0, 'Mesha', 'Spring (Vasantha)', 'இளவேனில்', 'वसन्त', 'వసంతం', 'ವಸಂತ', 'വസന്തം'],
  ['Vaikasi', 'வைகாசி', 'वैशाख', 'వైశాఖం', 'ವೈಶಾಖ', 'ഇടവം (വൈശാഖം)', 1, 'Vrishabha', 'Summer (Grishma)', 'முதுவேனில்', 'ग्रीष्म', 'గ్రీష్మం', 'ಗ್ರೀಷ್ಮ', 'ഗ്രീഷ്മം'],
  ['Aani', 'ஆனி', 'ज्येष्ठ', 'జ్యేష్ఠం', 'ಜ್ಯೇಷ್ಠ', 'മിഥുനം (ആനി)', 2, 'Mithuna', 'Summer (Grishma)', 'முதுவேனில்', 'ग्रीष्म', 'గ్రీష్మం', 'ಗ್ರೀಷ್ಮ', 'ഗ്രീഷ്മം'],
  ['Aadi', 'ஆடி', 'आषाढ़', 'ఆషాఢం', 'ಆಷಾಢ', 'കർക്കിടകം (ആടി)', 3, 'Karka', 'Monsoon (Varsha)', 'கார் காலம்', 'वर्षा', 'వర్షం', 'ವರ್ಷಾ', 'വർഷം'],
  ['Aavani', 'ஆவணி', 'श्रावण', 'శ్రావణం', 'ಶ್ರಾವಣ', 'ചിങ്ങം (ശ്രാവണം)', 4, 'Simha', 'Monsoon (Varsha)', 'கார் காலம்', 'वर्षा', 'వర్షం', 'ವರ್ಷಾ', 'വർഷം'],
  ['Purattasi', 'புரட்டாசி', 'भाद्रपद', 'భాద్రపదం', 'ಭಾದ್ರಪದ', 'കന്നി (ഭാദ്രപദം)', 5, 'Kanya', 'Autumn (Sharad)', 'கூதிர் காலம்', 'शरद्', 'శరదృతువు', 'ಶರದ್', 'ശരത്'],
  ['Aippasi', 'ஐப்பசி', 'अश्विन', 'ఆశ్వయుజం', 'ಆಶ್ವಯುಜ', 'തുലാം (അശ്വിനം)', 6, 'Tula', 'Autumn (Sharad)', 'கூதிர் காலம்', 'शरद्', 'శరదృతువు', 'ಶರದ್', 'ശരത്'],
  ['Karthigai', 'கார்த்திகை', 'कार्तिक', 'కార్తీకం', 'ಕಾರ್ತಿಕ', 'വൃശ്ചികം (കാർത്തിക)', 7, 'Vrishchika', 'Pre-Winter (Hemanta)', 'முன்பனி', 'हेमन्त', 'హేమంతం', 'ಹೇಮಂತ', 'ഹേമന്തം'],
  ['Margazhi', 'மார்கழி', 'मार्गशीर्ष', 'మార్గశిరం', 'ಮಾರ್ಗಶಿರ', 'ധനു (മാർഗ്ഗഴി)', 8, 'Dhanu', 'Pre-Winter (Hemanta)', 'முன்பனி', 'हेमन्त', 'హేమంతం', 'ಹೇಮಂತ', 'ഹേമന്തം'],
  ['Thai', 'தை', 'पौष', 'పుష్యం', 'ಪುಷ್ಯ', 'മകരം (തൈ)', 9, 'Makara', 'Winter (Shishira)', 'பின்பனி', 'शिशिर', 'శిశిరం', 'ಶಿಶಿರ', 'ശിശിരം'],
  ['Maasi', 'மாசி', 'माघ', 'మాఘం', 'ಮಾಘ', 'കുംഭം (മാസി)', 10, 'Kumbha', 'Winter (Shishira)', 'பின்பனி', 'शिशिर', 'శిశిరం', 'ಶಿಶಿರ', 'ശിശിരം'],
  ['Panguni', 'பங்குனி', 'फाल्गुन', 'ఫాల్గుణం', 'ಫಾಲ್ಗುಣ', 'മീനം (പങ്കുനി)', 11, 'Meena', 'Spring (Vasantha)', 'இளவேனில்', 'वसन्त', 'వసంతం', 'ವಸಂತ', 'വസന്തം']
];

async function seedAllMasters() {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/jothidam_db';
  await mongoose.connect(mongoUri);
  console.log('Connected to MongoDB:', mongoUri);

  // 1. Rasi Master
  console.log('\n--- Seeding 12 Rasis ---');
  await RasiMaster.deleteMany({});
  for (const rasi of RASI_DATA) {
    await RasiMaster.create(rasi);
  }
  console.log('✓ 12 Rasis seeded with complete 6-language properties!');

  // 2. Nakshatra Master
  console.log('\n--- Seeding 27 Nakshatras ---');
  await NakshatraMaster.deleteMany({});
  for (const nak of NAKSHATRA_RAW) {
    const startDeg = (nak.id * 360) / 27;
    const endDeg = ((nak.id + 1) * 360) / 27;

    const rasisFormatted = nak.rasis.map(r => {
      const rasiInfo = RASI_DATA[r.rasiId];
      return {
        rasiId: r.rasiId,
        rasiName: rasiInfo.name,
        rasiNameTa: rasiInfo.nameTa,
        rasiNameHi: rasiInfo.nameHi,
        rasiNameTe: rasiInfo.nameTe,
        rasiNameKn: rasiInfo.nameKn,
        rasiNameMl: rasiInfo.nameMl,
        padas: r.padas
      };
    });

    await NakshatraMaster.create({
      nakshatraId: nak.id,
      order: nak.id + 1,
      name: nak.en,
      nameTa: nak.ta,
      nameHi: nak.hi,
      nameTe: nak.te,
      nameKn: nak.kn,
      nameMl: nak.ml,
      sanskritName: nak.hi,
      athipathi: PLANET_MAP[nak.lord],
      deity: nak.deity,
      gana: getGana(nak.gana),
      yoni: nak.yoni,
      yoniGender: { name: nak.yoni.name, nameTa: nak.yoni.nameTa, nameHi: nak.yoni.nameHi, nameTe: nak.yoni.nameTe, nameKn: nak.yoni.nameKn, nameMl: nak.yoni.nameMl },
      animal: nak.animal,
      bird: nak.bird,
      tree: nak.tree,
      startDegree: startDeg,
      endDegree: endDeg,
      rasis: rasisFormatted
    });
  }
  console.log('✓ 27 Nakshatras seeded with complete 6-language properties!');

  // 3. Tithis (30 Tithis: 15 Shukla + 15 Krishna)
  console.log('\n--- Seeding 30 Tithis ---');
  await TithiMaster.deleteMany({});
  for (let i = 0; i < 30; i++) {
    const isShukla = i < 15;
    const rawIdx = i % 15;
    const raw = TITHI_NAMES[rawIdx];
    const num = rawIdx + 1;
    const startDeg = i * 12;
    const endDeg = (i + 1) * 12;

    const lordPlanet = PLANET_MAP[raw[18]];

    let tithiName = raw[0];
    let tithiNameTa = raw[1];
    let tithiNameHi = raw[2];
    let tithiNameTe = raw[3];
    let tithiNameKn = raw[4];
    let tithiNameMl = raw[5];

    if (!isShukla && rawIdx === 14) {
      tithiName = 'Amavasya';
      tithiNameTa = 'அமாவாசை';
      tithiNameHi = 'अमावास्या';
      tithiNameTe = 'అమావాస్య';
      tithiNameKn = 'ಅಮಾವಾಸ್ಯೆ';
      tithiNameMl = 'അമാവാസി';
    }

    await TithiMaster.create({
      tithiId: i,
      name: tithiName,
      nameTa: tithiNameTa,
      nameHi: tithiNameHi,
      nameTe: tithiNameTe,
      nameKn: tithiNameKn,
      nameMl: tithiNameMl,
      paksha: isShukla ? 'Shukla' : 'Krishna',
      pakshaTa: isShukla ? 'சுக்ல பக்ஷம் (வளர்பிறை)' : 'கிருஷ்ண பக்ஷம் (தேய்பிறை)',
      pakshaHi: isShukla ? 'शुक्ल पक्ष' : 'कृष्ण पक्ष',
      pakshaTe: isShukla ? 'శుక్ల పక్షం' : 'కృష్ణ పక్షం',
      pakshaKn: isShukla ? 'ಶುಕ್ಲ ಪಕ್ಷ' : 'ಕೃಷ್ಣ ಪಕ್ಷ',
      pakshaMl: isShukla ? 'ശുക്ല പക്ഷം' : 'കൃഷ്ണ പക്ഷം',
      number: num,
      startDegree: startDeg,
      endDegree: endDeg,
      deity: {
        name: raw[6],
        nameTa: raw[7],
        nameHi: raw[8],
        nameTe: raw[9],
        nameKn: raw[10],
        nameMl: raw[11]
      },
      lord: lordPlanet,
      category: {
        name: raw[12],
        nameTa: raw[13],
        nameHi: raw[14],
        nameTe: raw[15],
        nameKn: raw[16],
        nameMl: raw[17]
      }
    });
  }
  console.log('✓ 30 Tithis seeded with complete 6-language properties!');

  // 4. Yogas (27 Yogas)
  console.log('\n--- Seeding 27 Yogas ---');
  await YogaMaster.deleteMany({});
  for (let i = 0; i < 27; i++) {
    const raw = YOGA_RAW[i];
    const isBenefic = raw[7] === 'Benefic';
    const startDeg = (i * 360) / 27;
    const endDeg = ((i + 1) * 360) / 27;

    await YogaMaster.create({
      yogaId: i,
      name: raw[0],
      nameTa: raw[1],
      nameHi: raw[2],
      nameTe: raw[3],
      nameKn: raw[4],
      nameMl: raw[5],
      athipathi: PLANET_MAP[raw[6]],
      nature: raw[7],
      natureTa: isBenefic ? 'சுப யோகம்' : 'அசுப யோகம்',
      natureHi: isBenefic ? 'शुभ योग' : 'अशुभ योग',
      natureTe: isBenefic ? 'శుభ యోగం' : 'అశుభ యోగం',
      natureKn: isBenefic ? 'ಶುಭ ಯೋಗ' : 'ಅಶುಭ ಯೋಗ',
      natureMl: isBenefic ? 'ശുഭ യോഗം' : 'അശുഭ യോഗം',
      startDegree: startDeg,
      endDegree: endDeg
    });
  }
  console.log('✓ 27 Yogas seeded with complete 6-language properties!');

  // 5. Karanas (11 Karanas)
  console.log('\n--- Seeding 11 Karanas ---');
  await KaranaMaster.deleteMany({});
  for (let i = 0; i < 11; i++) {
    const raw = KARANA_RAW[i];
    const isChara = raw[6] === 'Chara';

    await KaranaMaster.create({
      karanaId: i,
      name: raw[0],
      nameTa: raw[1],
      nameHi: raw[2],
      nameTe: raw[3],
      nameKn: raw[4],
      nameMl: raw[5],
      type: raw[6],
      typeTa: isChara ? 'சரம் (மாறும் கரணம்)' : 'ஸ்திரம் (நிலையான கரணம்)',
      typeHi: isChara ? 'चर करण' : 'स्थिर करण',
      typeTe: isChara ? 'చర కరణం' : 'స్థిర కరణం',
      typeKn: isChara ? 'ಚರ ಕರಣ' : 'ಸ್ಥಿರ ಕರಣ',
      typeMl: isChara ? 'ചര കരണം' : 'സ്ഥിര കരണം',
      deity: {
        name: raw[7],
        nameTa: raw[8],
        nameHi: raw[9],
        nameTe: raw[10],
        nameKn: raw[11],
        nameMl: raw[12]
      },
      lord: PLANET_MAP[raw[13]]
    });
  }
  console.log('✓ 11 Karanas seeded with complete 6-language properties!');

  // 6. Tamil / Vedic Years (60 Years)
  console.log('\n--- Seeding 60 Vedic Years ---');
  await TamilYearMaster.deleteMany({});
  for (let i = 0; i < 60; i++) {
    const raw = YEARS_RAW[i];
    await TamilYearMaster.create({
      yearId: i,
      order: i + 1,
      name: raw[0],
      nameTa: raw[1],
      nameHi: raw[2],
      nameTe: raw[3],
      nameKn: raw[4],
      nameMl: raw[5]
    });
  }
  console.log('✓ 60 Vedic Years seeded with complete 6-language properties!');

  // 7. Tamil Months (12 Months)
  console.log('\n--- Seeding 12 Tamil Months ---');
  await TamilMonthMaster.deleteMany({});
  for (let i = 0; i < 12; i++) {
    const raw = MONTHS_RAW[i];
    const rasi = RASI_DATA[raw[6]];

    await TamilMonthMaster.create({
      monthId: i,
      name: raw[0],
      nameTa: raw[1],
      nameHi: raw[2],
      nameTe: raw[3],
      nameKn: raw[4],
      nameMl: raw[5],
      rasiId: raw[6],
      rasiName: rasi.name,
      rasiNameTa: rasi.nameTa,
      rasiNameHi: rasi.nameHi,
      rasiNameTe: rasi.nameTe,
      rasiNameKn: rasi.nameKn,
      rasiNameMl: rasi.nameMl,
      seasonEn: raw[8],
      seasonTa: raw[9],
      seasonHi: raw[10],
      seasonTe: raw[11],
      seasonKn: raw[12],
      seasonMl: raw[13]
    });
  }
  console.log('✓ 12 Tamil Months seeded with complete 6-language properties!');

  // 8. Kalachakram (360 Degrees)
  console.log('\n--- Enriching Kalachakram 360 Degrees ---');
  const kalachakramDocs = await KalachakramMaster.find({}).sort({ degree: 1 });
  if (kalachakramDocs.length > 0) {
    for (const doc of kalachakramDocs) {
      const rasi = RASI_DATA[doc.rasiId];
      const nak = NAKSHATRA_RAW[doc.nakshatraId];
      const navamsaRasi = RASI_DATA[doc.navamsaRasiId];

      doc.rasiName = rasi.name;
      doc.rasiNameTa = rasi.nameTa;
      doc.rasiNameHi = rasi.nameHi;
      doc.rasiNameTe = rasi.nameTe;
      doc.rasiNameKn = rasi.nameKn;
      doc.rasiNameMl = rasi.nameMl;
      doc.rasiAthipathi = rasi.athipathi;

      doc.nakshatraName = nak.en;
      doc.nakshatraNameTa = nak.ta;
      doc.nakshatraNameHi = nak.hi;
      doc.nakshatraNameTe = nak.te;
      doc.nakshatraNameKn = nak.kn;
      doc.nakshatraNameMl = nak.ml;
      doc.nakshatraAthipathi = PLANET_MAP[nak.lord];

      doc.navamsaRasiName = navamsaRasi.name;
      doc.navamsaRasiNameTa = navamsaRasi.nameTa;
      doc.navamsaRasiNameHi = navamsaRasi.nameHi;
      doc.navamsaRasiNameTe = navamsaRasi.nameTe;
      doc.navamsaRasiNameKn = navamsaRasi.nameKn;
      doc.navamsaRasiNameMl = navamsaRasi.nameMl;
      doc.navamsaAthipathi = navamsaRasi.athipathi;

      await doc.save();
    }
    console.log('✓ 360 Kalachakram degrees enriched with 6 languages!');
  }

  // 9. 108 Nakshatra Padas Master Table
  console.log('\n--- Seeding 108 Nakshatra Padas (with 6 Languages & Athipathis) ---');
  await NakshatraPadaMaster.deleteMany({});
  const insertedPadas = await NakshatraPadaMaster.insertMany(NAKSHATRA_PADAS_DATA);
  console.log(`✓ ${insertedPadas.length} Nakshatra Padas seeded with complete 6-language translations and lords!`);

  console.log('\n=============================================');
  console.log('ALL MASTER TABLES HAVE BEEN SEEDED / ENRICHED WITH 100% COMPLETE MULTILINGUAL TRANSLATIONS!');
  console.log('=============================================\n');

  await mongoose.disconnect();
}

seedAllMasters().catch(console.error);
