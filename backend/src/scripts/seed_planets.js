import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import PlanetMaster from '../models/PlanetMaster.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../../.env') });

const PLANETS_DATA = [
  {
    planetId: 0,
    name: 'Sun',
    nameTa: 'சூரியன்',
    nameHi: 'सूर्य',
    nameTe: 'సూర్యుడు',
    nameKn: 'ಸೂರ್ಯ',
    nameMl: 'സൂര്യൻ',
    shortName: 'Su',
    shortNameTa: 'சூரி',
    shortNameHi: 'सू',
    shortNameTe: 'సూ',
    shortNameKn: 'ಸೂ',
    shortNameMl: 'സൂ',
    sanskritName: 'Surya (Aditya)',
    nature: {
      name: 'Natural Malefic / Cruel (Krura)',
      nameTa: 'பாவி / கிரூரர் (பித்ருகாரகன்)',
      nameHi: 'क्रूर ग्रह (पितृकारक)',
      nameTe: 'క్రూర గ్రహం (పితృకారకుడు)',
      nameKn: 'ಕ್ರೂರ ಗ್ರಹ (ಪಿತೃಕಾರಕ)',
      nameMl: 'ക്രൂര ഗ്രഹം (പിതൃകാരകൻ)'
    },
    gender: {
      name: 'Male',
      nameTa: 'ஆண்',
      nameHi: 'पुरुष',
      nameTe: 'పురుష',
      nameKn: 'ಪುರುಷ',
      nameMl: 'പുരുഷൻ'
    },
    color: {
      name: 'Copper / Orange-Red',
      nameTa: 'செந்நிறம் / சிவப்பு',
      nameHi: 'ताम्र / नारंगी',
      nameTe: 'రాగి / నారింజ',
      nameKn: 'ತಾಮ್ರ / ಕಿತ್ತಳೆ',
      nameMl: 'ചെമ്പ് / ഓറഞ്ച്'
    },
    gemstone: {
      name: 'Ruby (Manikkam)',
      nameTa: 'மாணிக்கம்',
      nameHi: 'माणिक्य',
      nameTe: 'మాణిక్యం',
      nameKn: 'ಮಾಣಿಕ್ಯ',
      nameMl: 'മാണിക്യം'
    },
    dayOfWeek: {
      name: 'Sunday',
      nameTa: 'ஞாயிறு',
      nameHi: 'रविवार',
      nameTe: 'ఆదివారం',
      nameKn: 'ಭಾನುವಾರ',
      nameMl: 'ഞായറാഴ്ച'
    },
    metal: {
      name: 'Copper',
      nameTa: 'செம்பு (தாமிரம்)',
      nameHi: 'तांबा',
      nameTe: 'రాగి',
      nameKn: 'ತಾಮ್ರ',
      nameMl: 'ചെമ്പ്'
    },
    grain: {
      name: 'Wheat',
      nameTa: 'கோதுமை',
      nameHi: 'गेहूं',
      nameTe: 'గోధుమలు',
      nameKn: 'ಗೋಧಿ',
      nameMl: 'ഗോതമ്പ്'
    },
    friends: {
      name: 'Moon, Mars, Jupiter',
      nameTa: 'சந்திரன், செவ்வாய், குரு',
      nameHi: 'चन्द्र, मंगल, गुरु',
      nameTe: 'చంద్రుడు, కుజుడు, గురుడు',
      nameKn: 'ಚಂದ್ರ, ಮಂಗಳ, ಗುರು',
      nameMl: 'ചന്ദ്രൻ, ചൊവ്വ, വ്യാഴം'
    },
    enemies: {
      name: 'Venus, Saturn, Rahu, Ketu',
      nameTa: 'சுக்கிரன், சனி, ராகு, கேது',
      nameHi: 'शुक्र, शनि, राहु, केतु',
      nameTe: 'శుక్రుడు, శని, రాహువు, కేతువు',
      nameKn: 'ಶುಕ್ರ, ಶನಿ, ರಾಹು, ಕೇತು',
      nameMl: 'ശുക്രൻ, ശനി, രാഹു, കേതു'
    },
    ownRasis: [
      {
        rasiId: 4,
        name: 'Leo',
        nameTa: 'சிம்மம்',
        nameHi: 'सिंह',
        nameTe: 'సింహం',
        nameKn: 'ಸಿಂಹ',
        nameMl: 'ചിങ്ങം'
      }
    ],
    exaltationRasi: {
      rasiId: 0,
      name: 'Aries',
      nameTa: 'மேஷம்',
      nameHi: 'मेष',
      nameTe: 'మేషం',
      nameKn: 'ಮೇಷ',
      nameMl: 'മേടം',
      degree: 10
    },
    debilitationRasi: {
      rasiId: 6,
      name: 'Libra',
      nameTa: 'துலாம்',
      nameHi: 'तुला',
      nameTe: 'తుల',
      nameKn: 'ತುಲಾ',
      nameMl: 'തുലാം',
      degree: 10
    }
  },
  {
    planetId: 1,
    name: 'Moon',
    nameTa: 'சந்திரன்',
    nameHi: 'चन्द्र',
    nameTe: 'చంద్రుడు',
    nameKn: 'ಚಂದ್ರ',
    nameMl: 'ചന്ദ്രൻ',
    shortName: 'Mo',
    shortNameTa: 'சந்',
    shortNameHi: 'चं',
    shortNameTe: 'చం',
    shortNameKn: 'ಚಂ',
    shortNameMl: 'ച',
    sanskritName: 'Chandra (Soma)',
    nature: {
      name: 'Natural Benefic (Shubha)',
      nameTa: 'சுபர் (மாத்ருகாரகன்)',
      nameHi: 'शुभ ग्रह (मातृकारक)',
      nameTe: 'శుభ గ్రహం (మాతృకారకుడు)',
      nameKn: 'ಶುಭ ಗ್ರಹ (ಮಾತೃಕಾರಕ)',
      nameMl: 'ശുഭ ഗ്രഹം (മാതൃകാരകൻ)'
    },
    gender: {
      name: 'Female',
      nameTa: 'பெண்',
      nameHi: 'स्त्री',
      nameTe: 'స్త్రీ',
      nameKn: 'ಸ್ತ್ರೀ',
      nameMl: 'സ്ത്രീ'
    },
    color: {
      name: 'White / Silver',
      nameTa: 'வெள்ளை',
      nameHi: 'श्वेत / सफेद',
      nameTe: 'తెలుపు',
      nameKn: 'ಬಿಳಿ',
      nameMl: 'വെള്ള'
    },
    gemstone: {
      name: 'Pearl (Muthu)',
      nameTa: 'முத்து',
      nameHi: 'मोती',
      nameTe: 'ముత్యం',
      nameKn: 'ಮುತ್ತು',
      nameMl: 'മുത്ത്'
    },
    dayOfWeek: {
      name: 'Monday',
      nameTa: 'திங்கள்',
      nameHi: 'सोमवार',
      nameTe: 'సోమవారం',
      nameKn: 'ಸೋಮವಾರ',
      nameMl: 'തിങ്കളാഴ്ച'
    },
    metal: {
      name: 'Silver',
      nameTa: 'வெள்ளி',
      nameHi: 'चांदी',
      nameTe: 'వెండి',
      nameKn: 'ಬೆಳ್ಳಿ',
      nameMl: 'വെള്ളി'
    },
    grain: {
      name: 'Paddy / Raw Rice',
      nameTa: 'நெல் (பச்சரிசி)',
      nameHi: 'चावल',
      nameTe: 'వరి / బియ్యం',
      nameKn: 'ಭತ್ತ / ಅಕ್ಕಿ',
      nameMl: 'നെല്ല് / അരി'
    },
    friends: {
      name: 'Sun, Mercury',
      nameTa: 'சூரியன், புதன்',
      nameHi: 'सूर्य, बुध',
      nameTe: 'సూర్యుడు, బుధుడు',
      nameKn: 'ಸೂರ್ಯ, ಬುಧ',
      nameMl: 'സൂര്യൻ, ബുധൻ'
    },
    enemies: {
      name: 'Rahu, Ketu',
      nameTa: 'ராகு, கேது',
      nameHi: 'राहु, केतु',
      nameTe: 'రాహువు, కేతువు',
      nameKn: 'ರಾಹು, ಕೇತು',
      nameMl: 'രാഹു, കേതു'
    },
    ownRasis: [
      {
        rasiId: 3,
        name: 'Cancer',
        nameTa: 'கடகம்',
        nameHi: 'कर्क',
        nameTe: 'కర్కాటకం',
        nameKn: 'ಕರ್ಕಾಟಕ',
        nameMl: 'കർക്കിടകം'
      }
    ],
    exaltationRasi: {
      rasiId: 1,
      name: 'Taurus',
      nameTa: 'ரிஷபம்',
      nameHi: 'वृषभ',
      nameTe: 'వృషభం',
      nameKn: 'ವೃಷಭ',
      nameMl: 'ഇടവം',
      degree: 3
    },
    debilitationRasi: {
      rasiId: 7,
      name: 'Scorpio',
      nameTa: 'விருச்சிகம்',
      nameHi: 'वृश्चिक',
      nameTe: 'వృశ్చికం',
      nameKn: 'ವೃಶ್ಚಿಕ',
      nameMl: 'വൃശ്ചികം',
      degree: 3
    }
  },
  {
    planetId: 4,
    name: 'Mars',
    nameTa: 'செவ்வாய்',
    nameHi: 'मंगल',
    nameTe: 'కుజుడు',
    nameKn: 'ಮಂಗಳ',
    nameMl: 'ചൊവ്വ',
    shortName: 'Ma',
    shortNameTa: 'செவ்',
    shortNameHi: 'मं',
    shortNameTe: 'కు',
    shortNameKn: 'ಮಂ',
    shortNameMl: 'ചൊ',
    sanskritName: 'Mangala (Kuja / Angaraka)',
    nature: {
      name: 'Natural Malefic (Krura)',
      nameTa: 'பாவி / கிரூரர் (சகோதரகாரகன்)',
      nameHi: 'क्रूर ग्रह (भ्रातृकारक)',
      nameTe: 'క్రూర గ్రహం (భ్రాతృకారకుడు)',
      nameKn: 'ಕ್ರೂರ ಗ್ರಹ (ಭ್ರಾತೃಕಾರಕ)',
      nameMl: 'ക്രൂര ഗ്രഹം (ഭ്രാതൃകാരകൻ)'
    },
    gender: {
      name: 'Male',
      nameTa: 'ஆண்',
      nameHi: 'पुरुष',
      nameTe: 'పురుష',
      nameKn: 'ಪುರುಷ',
      nameMl: 'പുരുഷൻ'
    },
    color: {
      name: 'Deep Red',
      nameTa: 'சிவப்பு',
      nameHi: 'लाल',
      nameTe: 'ఎరుపు',
      nameKn: 'ಕೆಂಪು',
      nameMl: 'ചുവപ്പ്'
    },
    gemstone: {
      name: 'Red Coral (Pavalizham)',
      nameTa: 'பவளம்',
      nameHi: 'मूँगा',
      nameTe: 'పగడం',
      nameKn: 'ಹವಳ',
      nameMl: 'പവിഴം'
    },
    dayOfWeek: {
      name: 'Tuesday',
      nameTa: 'செவ்வாய்',
      nameHi: 'मंगलवार',
      nameTe: 'మంగళవారం',
      nameKn: 'ಮಂಗಳವಾರ',
      nameMl: 'ചൊവ്വാഴ്ച'
    },
    metal: {
      name: 'Copper',
      nameTa: 'செம்பு',
      nameHi: 'तांबा',
      nameTe: 'రాగి',
      nameKn: 'ತಾಮ್ರ',
      nameMl: 'ചെമ്പ്'
    },
    grain: {
      name: 'Red Gram / Toor Dal',
      nameTa: 'துவரை',
      nameHi: 'अरहर दाल',
      nameTe: 'కందులు',
      nameKn: 'ತೊಗರಿ',
      nameMl: 'തുവര'
    },
    friends: {
      name: 'Sun, Moon, Jupiter',
      nameTa: 'சூரியன், சந்திரன், குரு',
      nameHi: 'सूर्य, चन्द्र, गुरु',
      nameTe: 'సూర్యుడు, చంద్రుడు, గురుడు',
      nameKn: 'ಸೂರ್ಯ, ಚಂದ್ರ, ಗುರು',
      nameMl: 'സൂര്യൻ, ചന്ദ്രൻ, വ്യാഴം'
    },
    enemies: {
      name: 'Mercury, Rahu',
      nameTa: 'புதன், ராகு',
      nameHi: 'बुध, राहु',
      nameTe: 'బుధుడు, రాహువు',
      nameKn: 'ಬುಧ, ರಾಹು',
      nameMl: 'ബുധൻ, രാഹു'
    },
    ownRasis: [
      {
        rasiId: 0,
        name: 'Aries',
        nameTa: 'மேஷம்',
        nameHi: 'मेष',
        nameTe: 'మేషం',
        nameKn: 'ಮೇಷ',
        nameMl: 'മേടം'
      },
      {
        rasiId: 7,
        name: 'Scorpio',
        nameTa: 'விருச்சிகம்',
        nameHi: 'वृश्चिक',
        nameTe: 'వృశ్చికం',
        nameKn: 'ವೃಶ್ಚಿಕ',
        nameMl: 'വൃശ്ചികം'
      }
    ],
    exaltationRasi: {
      rasiId: 9,
      name: 'Capricorn',
      nameTa: 'மகரம்',
      nameHi: 'मकर',
      nameTe: 'మకరం',
      nameKn: 'ಮಕರ',
      nameMl: 'മകരം',
      degree: 28
    },
    debilitationRasi: {
      rasiId: 3,
      name: 'Cancer',
      nameTa: 'கடகம்',
      nameHi: 'कर्क',
      nameTe: 'కర్కాటకం',
      nameKn: 'ಕರ್ಕಾಟಕ',
      nameMl: 'കർക്കിടകം',
      degree: 28
    }
  },
  {
    planetId: 2,
    name: 'Mercury',
    nameTa: 'புதன்',
    nameHi: 'बुध',
    nameTe: 'బుధుడు',
    nameKn: 'ಬುಧ',
    nameMl: 'ബുധൻ',
    shortName: 'Me',
    shortNameTa: 'புத',
    shortNameHi: 'बु',
    shortNameTe: 'బు',
    shortNameKn: 'ಬು',
    shortNameMl: 'ബു',
    sanskritName: 'Budha (Soumya)',
    nature: {
      name: 'Benefic (Adaptable / Vidya Karaka)',
      nameTa: 'சுபர் (வித்யாகாரகன்)',
      nameHi: 'शुभ ग्रह (विद्याकारक)',
      nameTe: 'శుభ గ్రహం (విద్యాకారకుడు)',
      nameKn: 'ಶುಭ ಗ್ರಹ (ವಿದ್ಯಾಕಾರಕ)',
      nameMl: 'ശുഭ ഗ്രഹം (വിദ്യാകാരകൻ)'
    },
    gender: {
      name: 'Neutral / Eunuch',
      nameTa: 'அலி',
      nameHi: 'नपुंसक',
      nameTe: 'నపుంసక',
      nameKn: 'ನಪುಂಸಕ',
      nameMl: 'നപുംസകം'
    },
    color: {
      name: 'Green',
      nameTa: 'பச்சை',
      nameHi: 'हरा',
      nameTe: 'ఆకుపచ్చ',
      nameKn: 'ಹಸಿರು',
      nameMl: 'പച്ച'
    },
    gemstone: {
      name: 'Emerald (Maragatham)',
      nameTa: 'மரகதம்',
      nameHi: 'पन्ना',
      nameTe: 'మరకతం',
      nameKn: 'ಮರಕತ',
      nameMl: 'മരതകം'
    },
    dayOfWeek: {
      name: 'Wednesday',
      nameTa: 'புதன்',
      nameHi: 'बुधवार',
      nameTe: 'బుధవారం',
      nameKn: 'ಬುಧವಾರ',
      nameMl: 'ബുധനാഴ്ച'
    },
    metal: {
      name: 'Brass',
      nameTa: 'பித்தளை',
      nameHi: 'पीतल',
      nameTe: 'ఇత్తడి',
      nameKn: 'ಹಿತ್ತಾಳೆ',
      nameMl: 'പിത്തള'
    },
    grain: {
      name: 'Green Gram / Moong Dal',
      nameTa: 'பச்சைப்பயறு',
      nameHi: 'मूंग दाल',
      nameTe: 'పెసలు',
      nameKn: 'ಹೆಸರು ಕಾಳು',
      nameMl: 'ചെറുപയർ'
    },
    friends: {
      name: 'Sun, Venus',
      nameTa: 'சூரியன், சுக்கிரன்',
      nameHi: 'सूर्य, शुक्र',
      nameTe: 'సూర్యుడు, శుక్రుడు',
      nameKn: 'ಸೂರ್ಯ, ಶುಕ್ರ',
      nameMl: 'സൂര്യൻ, ശുക്രൻ'
    },
    enemies: {
      name: 'Moon',
      nameTa: 'சந்திரன்',
      nameHi: 'चन्द्र',
      nameTe: 'చంద్రుడు',
      nameKn: 'ಚಂದ್ರ',
      nameMl: 'ചന്ദ്രൻ'
    },
    ownRasis: [
      {
        rasiId: 2,
        name: 'Gemini',
        nameTa: 'மிதுனம்',
        nameHi: 'मिथुन',
        nameTe: 'మిథునం',
        nameKn: 'ಮಿಥುನ',
        nameMl: 'മിഥുനം'
      },
      {
        rasiId: 5,
        name: 'Virgo',
        nameTa: 'கன்னி',
        nameHi: 'कन्या',
        nameTe: 'కన్య',
        nameKn: 'ಕನ್ಯಾ',
        nameMl: 'കന്നി'
      }
    ],
    exaltationRasi: {
      rasiId: 5,
      name: 'Virgo',
      nameTa: 'கன்னி',
      nameHi: 'कन्या',
      nameTe: 'కన్య',
      nameKn: 'ಕನ್ಯಾ',
      nameMl: 'കന്നി',
      degree: 15
    },
    debilitationRasi: {
      rasiId: 11,
      name: 'Pisces',
      nameTa: 'மீனம்',
      nameHi: 'मीन',
      nameTe: 'మీనం',
      nameKn: 'ಮೀನ',
      nameMl: 'മീനം',
      degree: 15
    }
  },
  {
    planetId: 5,
    name: 'Jupiter',
    nameTa: 'குரு',
    nameHi: 'गुरु',
    nameTe: 'గురుడు',
    nameKn: 'ಗುರು',
    nameMl: 'വ്യാഴം',
    shortName: 'Ju',
    shortNameTa: 'குரு',
    shortNameHi: 'गु',
    shortNameTe: 'గు',
    shortNameKn: 'ಗು',
    shortNameMl: 'ഗു',
    sanskritName: 'Guru (Brihaspati)',
    nature: {
      name: 'Supreme Benefic (Guru / Putra Karaka)',
      nameTa: 'சுபர் / தேவகுரு (புத்திரகாரகன்)',
      nameHi: 'परम शुभ ग्रह (पुत्रकारक)',
      nameTe: 'పరమ శుభ గ్రహం (పుత్రకారకుడు)',
      nameKn: 'ಪರಮ ಶುಭ ಗ್ರಹ (ಪುತ್ರಕಾರಕ)',
      nameMl: 'പരമ ശുഭ ഗ്രഹം (പുത്രകാരകൻ)'
    },
    gender: {
      name: 'Male',
      nameTa: 'ஆண்',
      nameHi: 'पुरुष',
      nameTe: 'పురుష',
      nameKn: 'ಪುರುಷ',
      nameMl: 'പുരുഷൻ'
    },
    color: {
      name: 'Yellow / Golden',
      nameTa: 'மஞ்சள் / பொன்',
      nameHi: 'पीला / स्वर्ण',
      nameTe: 'పసుపు / బంగారం',
      nameKn: 'ಹಳದಿ / ಚಿನ್ನ',
      nameMl: 'മഞ്ഞ / സ്വർണ്ണം'
    },
    gemstone: {
      name: 'Yellow Sapphire (Pushparagam)',
      nameTa: 'புஷ்பராகம்',
      nameHi: 'पुखराज',
      nameTe: 'పుష్యరాగం',
      nameKn: 'ಪುಷ್ಯರಾಗ',
      nameMl: 'പുഷ്യരാഗം'
    },
    dayOfWeek: {
      name: 'Thursday',
      nameTa: 'வியாழன்',
      nameHi: 'गुरुवार',
      nameTe: 'గురువారం',
      nameKn: 'ಗುರುವಾರ',
      nameMl: 'വ്യാഴാഴ്ച'
    },
    metal: {
      name: 'Gold',
      nameTa: 'தங்கம் (பொன்)',
      nameHi: 'सोना',
      nameTe: 'బంగారం',
      nameKn: 'ಚಿನ್ನ',
      nameMl: 'സ്വർണ്ണം'
    },
    grain: {
      name: 'Chickpeas / Bengal Gram',
      nameTa: 'கொண்டைக்கடலை',
      nameHi: 'चना दाल',
      nameTe: 'శనగలు',
      nameKn: 'ಕಡಲೆ',
      nameMl: 'കടല'
    },
    friends: {
      name: 'Sun, Moon, Mars',
      nameTa: 'சூரியன், சந்திரன், செவ்வாய்',
      nameHi: 'सूर्य, चन्द्र, मंगल',
      nameTe: 'సూర్యుడు, చంద్రుడు, కుజుడు',
      nameKn: 'ಸೂರ್ಯ, ಚಂದ್ರ, ಮಂಗಳ',
      nameMl: 'സൂര്യൻ, ചന്ദ്രൻ, ചൊവ്വ'
    },
    enemies: {
      name: 'Mercury, Venus',
      nameTa: 'புதன், சுக்கிரன்',
      nameHi: 'बुध, शुक्र',
      nameTe: 'బుధుడు, శుక్రుడు',
      nameKn: 'ಬುಧ, ಶುಕ್ರ',
      nameMl: 'ಬುಧൻ, ശുക്രൻ'
    },
    ownRasis: [
      {
        rasiId: 8,
        name: 'Sagittarius',
        nameTa: 'தனுசு',
        nameHi: 'धनु',
        nameTe: 'ధనుస్సు',
        nameKn: 'ಧನುಸ್ಸು',
        nameMl: 'ധനു'
      },
      {
        rasiId: 11,
        name: 'Pisces',
        nameTa: 'மீனம்',
        nameHi: 'मीन',
        nameTe: 'మీనం',
        nameKn: 'ಮೀನ',
        nameMl: 'മീനം'
      }
    ],
    exaltationRasi: {
      rasiId: 3,
      name: 'Cancer',
      nameTa: 'கடகம்',
      nameHi: 'कर्क',
      nameTe: 'కర్కాటకం',
      nameKn: 'ಕರ್ಕಾಟಕ',
      nameMl: 'കർക്കിടകം',
      degree: 5
    },
    debilitationRasi: {
      rasiId: 9,
      name: 'Capricorn',
      nameTa: 'மகரம்',
      nameHi: 'मकर',
      nameTe: 'మకరం',
      nameKn: 'ಮಕರ',
      nameMl: 'മകരം',
      degree: 5
    }
  },
  {
    planetId: 3,
    name: 'Venus',
    nameTa: 'சுக்கிரன்',
    nameHi: 'शुक्र',
    nameTe: 'శుక్రుడు',
    nameKn: 'ಶುಕ್ರ',
    nameMl: 'ശുക്രൻ',
    shortName: 'Ve',
    shortNameTa: 'சுக்',
    shortNameHi: 'शु',
    shortNameTe: 'శు',
    shortNameKn: 'ಶು',
    shortNameMl: 'ശു',
    sanskritName: 'Shukra (Bhargava)',
    nature: {
      name: 'Natural Benefic (Shubha / Kalathra Karaka)',
      nameTa: 'சுபர் / அசுரகுரு (களத்திரகாரகன்)',
      nameHi: 'शुभ ग्रह (कलत्रकारक)',
      nameTe: 'శుభ గ్రహం (కళత్రకారకుడు)',
      nameKn: 'ಶುಭ ಗ್ರಹ (ಕಳತ್ರಕಾರಕ)',
      nameMl: 'ശുഭ ഗ്രഹം (കളത്രകാരകൻ)'
    },
    gender: {
      name: 'Female',
      nameTa: 'பெண்',
      nameHi: 'स्त्री',
      nameTe: 'స్త్రీ',
      nameKn: 'ಸ್ತ್ರೀ',
      nameMl: 'സ്ത്രീ'
    },
    color: {
      name: 'Pure White / Rainbow',
      nameTa: 'வெள்ளை / பலவண்ணம்',
      nameHi: 'श्वेत / बहुरंगी',
      nameTe: 'తెలుపు / రంగురంగుల',
      nameKn: 'ಬಿಳಿ / ಬಹುವರ್ಣ',
      nameMl: 'വെള്ള / ബഹുവർണ്ണം'
    },
    gemstone: {
      name: 'Diamond (Vairam)',
      nameTa: 'வைரம்',
      nameHi: 'हीरा',
      nameTe: 'వజ్రం',
      nameKn: 'ವಜ್ರ',
      nameMl: 'വൈരം'
    },
    dayOfWeek: {
      name: 'Friday',
      nameTa: 'வெள்ளி',
      nameHi: 'शुक्रवार',
      nameTe: 'శుక్రవారం',
      nameKn: 'ಶುಕ್ರವಾರ',
      nameMl: 'വെള്ളിയാഴ്ച'
    },
    metal: {
      name: 'Silver / Platinum',
      nameTa: 'வெள்ளி',
      nameHi: 'चांदी / प्लैटिनम',
      nameTe: 'వెండి',
      nameKn: 'ಬೆಳ್ಳಿ',
      nameMl: 'വെള്ളി'
    },
    grain: {
      name: 'White Field Beans / Mochai',
      nameTa: 'மொச்சை',
      nameHi: 'राजमा / सफेद सेम',
      nameTe: 'అలసందలు / బొబ్బర్లు',
      nameKn: 'ಅವರೆಕಾಳು',
      nameMl: 'തട്ടപ്പയർ'
    },
    friends: {
      name: 'Mercury, Saturn, Rahu',
      nameTa: 'புதன், சனி, ராகு',
      nameHi: 'बुध, शनि, राहु',
      nameTe: 'బుధుడు, శని, రాహువు',
      nameKn: 'ಬುಧ, ಶನಿ, ರಾಹು',
      nameMl: 'ബുധൻ, ശനി, രാഹു'
    },
    enemies: {
      name: 'Sun, Moon',
      nameTa: 'சூரியன், சந்திரன்',
      nameHi: 'सूर्य, चन्द्र',
      nameTe: 'సూర్యుడు, చంద్రుడు',
      nameKn: 'ಸೂರ್ಯ, ಚಂದ್ರ',
      nameMl: 'സൂര്യൻ, ചന്ദ്രൻ'
    },
    ownRasis: [
      {
        rasiId: 1,
        name: 'Taurus',
        nameTa: 'ரிஷபம்',
        nameHi: 'वृषभ',
        nameTe: 'వృషభం',
        nameKn: 'ವೃಷಭ',
        nameMl: 'ഇടവം'
      },
      {
        rasiId: 6,
        name: 'Libra',
        nameTa: 'துலாம்',
        nameHi: 'तुला',
        nameTe: 'తుల',
        nameKn: 'ತುಲಾ',
        nameMl: 'തുലാം'
      }
    ],
    exaltationRasi: {
      rasiId: 11,
      name: 'Pisces',
      nameTa: 'மீனம்',
      nameHi: 'मीन',
      nameTe: 'మీనం',
      nameKn: 'ಮೀನ',
      nameMl: 'മീനം',
      degree: 27
    },
    debilitationRasi: {
      rasiId: 5,
      name: 'Virgo',
      nameTa: 'கன்னி',
      nameHi: 'कन्या',
      nameTe: 'కన్య',
      nameKn: 'ಕನ್ಯಾ',
      nameMl: 'കന്നി',
      degree: 27
    }
  },
  {
    planetId: 6,
    name: 'Saturn',
    nameTa: 'சனி',
    nameHi: 'शनि',
    nameTe: 'శని',
    nameKn: 'ಶನಿ',
    nameMl: 'ശനി',
    shortName: 'Sa',
    shortNameTa: 'சனி',
    shortNameHi: 'श',
    shortNameTe: 'శ',
    shortNameKn: 'ಶ',
    shortNameMl: 'ശ',
    sanskritName: 'Shani (Manda / Sani)',
    nature: {
      name: 'Natural Malefic (Justice / Ayush Karaka)',
      nameTa: 'பாவி / நீதிபதி (ஆயுள்காரகன்)',
      nameHi: 'क्रूर ग्रह (आयुष्कारक)',
      nameTe: 'క్రూర గ్రహం (ఆయుష్కారకుడు)',
      nameKn: 'ಕ್ರೂರ ಗ್ರಹ (ಆಯುಷ್ಯಕಾರಕ)',
      nameMl: 'ക്രൂര ഗ്രഹം (ആയുഷ്കാരകൻ)'
    },
    gender: {
      name: 'Neutral / Eunuch',
      nameTa: 'அலி',
      nameHi: 'नपुंसक',
      nameTe: 'నపుంసక',
      nameKn: 'ನಪುಂಸಕ',
      nameMl: 'നപുംസകം'
    },
    color: {
      name: 'Dark Blue / Black',
      nameTa: 'நீலம் / கருப்பு',
      nameHi: 'नीला / काला',
      nameTe: 'నీలం / నలుపు',
      nameKn: 'ನೀಲಿ / ಕಪ್ಪು',
      nameMl: 'നീല / കറുപ്പ്'
    },
    gemstone: {
      name: 'Blue Sapphire (Neelam)',
      nameTa: 'நீலக்கல்',
      nameHi: 'नीलम',
      nameTe: 'నీలం',
      nameKn: 'ನೀಲಂ',
      nameMl: 'നീലം'
    },
    dayOfWeek: {
      name: 'Saturday',
      nameTa: 'சனி',
      nameHi: 'शनिवार',
      nameTe: 'శనివారం',
      nameKn: 'ಶನಿವಾರ',
      nameMl: 'ശനിയാഴ്ച'
    },
    metal: {
      name: 'Iron',
      nameTa: 'இரும்பு',
      nameHi: 'लोहा',
      nameTe: 'ఇనుము',
      nameKn: 'ಕಬ್ಬಿಣ',
      nameMl: 'ഇരുമ്പ്'
    },
    grain: {
      name: 'Black Sesame / Gingelly',
      nameTa: 'எள்',
      nameHi: 'काला तिल',
      nameTe: 'నువ్వులు',
      nameKn: 'ಎಳ್ಳು',
      nameMl: 'എള്ള്'
    },
    friends: {
      name: 'Mercury, Venus, Rahu',
      nameTa: 'புதன், சுக்கிரன், ராகு',
      nameHi: 'बुध, शुक्र, राहु',
      nameTe: 'బుధుడు, శుక్రుడు, రాహువు',
      nameKn: 'ಬುಧ, ಶುಕ್ರ, ರಾಹು',
      nameMl: 'ബുധൻ, ശുക്രൻ, രാഹു'
    },
    enemies: {
      name: 'Sun, Moon, Mars',
      nameTa: 'சூரியன், சந்திரன், செவ்வாய்',
      nameHi: 'सूर्य, चन्द्र, मंगल',
      nameTe: 'సూర్యుడు, చంద్రుడు, కుజుడు',
      nameKn: 'ಸೂರ್ಯ, ಚಂದ್ರ, ಮಂಗಳ',
      nameMl: 'സൂര്യൻ, ചന്ദ്രൻ, ചൊവ്വ'
    },
    ownRasis: [
      {
        rasiId: 9,
        name: 'Capricorn',
        nameTa: 'மகரம்',
        nameHi: 'मकर',
        nameTe: 'మకరం',
        nameKn: 'ಮಕರ',
        nameMl: 'മകരം'
      },
      {
        rasiId: 10,
        name: 'Aquarius',
        nameTa: 'கும்பம்',
        nameHi: 'कुम्भ',
        nameTe: 'కుంభం',
        nameKn: 'ಕುಂಭ',
        nameMl: 'കുംഭം'
      }
    ],
    exaltationRasi: {
      rasiId: 6,
      name: 'Libra',
      nameTa: 'துலாம்',
      nameHi: 'तुला',
      nameTe: 'తుల',
      nameKn: 'ತುಲಾ',
      nameMl: 'തുലാം',
      degree: 20
    },
    debilitationRasi: {
      rasiId: 0,
      name: 'Aries',
      nameTa: 'மேஷம்',
      nameHi: 'मेष',
      nameTe: 'మేషం',
      nameKn: 'ಮೇಷ',
      nameMl: 'ಮೇടം',
      degree: 20
    }
  },
  {
    planetId: 7,
    name: 'Rahu',
    nameTa: 'ராகு',
    nameHi: 'राहु',
    nameTe: 'రాహువు',
    nameKn: 'ರಾಹು',
    nameMl: 'രാഹു',
    shortName: 'Ra',
    shortNameTa: 'ரா',
    shortNameHi: 'रा',
    shortNameTe: 'రా',
    shortNameKn: 'ರಾ',
    shortNameMl: 'രാ',
    sanskritName: 'Rahu (Svarbhanu)',
    nature: {
      name: 'Shadow Malefic (Chhaya Graha / Bhoga Karaka)',
      nameTa: 'சாயா கிரகம் / பாவி (போககாரகன்)',
      nameHi: 'छाया ग्रह (भोगकारक)',
      nameTe: 'ఛాయా గ్రహం (భోగకారకుడు)',
      nameKn: 'ಛಾಯಾ ಗ್ರಹ (ಭೋಗಕಾರಕ)',
      nameMl: 'ഛായാ ഗ്രഹം (ഭോഗകാരകൻ)'
    },
    gender: {
      name: 'Female',
      nameTa: 'பெண்',
      nameHi: 'स्त्री',
      nameTe: 'స్త్రీ',
      nameKn: 'ಸ್ತ್ರೀ',
      nameMl: 'സ്ത്രീ'
    },
    color: {
      name: 'Smoky / Dark Grey',
      nameTa: 'புகை நிறம் / கருநீலம்',
      nameHi: 'धूम्र वर्ण / गहरा स्लेटी',
      nameTe: 'పొగ రంగు / ముదురు బూడిద',
      nameKn: 'ಹೊಗೆ ಬಣ್ಣ / ಗಾಢ ಬೂದು',
      nameMl: 'പുക നിറം / കടും ചാരം'
    },
    gemstone: {
      name: 'Hessonite (Gomedhakam)',
      nameTa: 'கோமேதகம்',
      nameHi: 'गोमेद',
      nameTe: 'గోమేధికం',
      nameKn: 'ಗೋಮೇಧಿಕ',
      nameMl: 'ഗോമേദകം'
    },
    dayOfWeek: {
      name: 'Rahu Kalam / Sunday',
      nameTa: 'ராகு காலம் / ஞாயிறு',
      nameHi: 'राहु काल / रविवार',
      nameTe: 'రాహు కాలం / ఆదివారం',
      nameKn: 'ರಾಹು ಕಾಲ / ಭಾನುವಾರ',
      nameMl: 'രാഹുകാലം / ഞായർ'
    },
    metal: {
      name: 'Lead',
      nameTa: 'ஈயம்',
      nameHi: 'सीसा',
      nameTe: 'సీసం',
      nameKn: 'ಸೀಸ',
      nameMl: 'ഈയം'
    },
    grain: {
      name: 'Black Gram / Urad Dal',
      nameTa: 'உளுந்து',
      nameHi: 'उड़द दाल',
      nameTe: 'మినుములు',
      nameKn: 'ಉದ್ದು',
      nameMl: 'ഉഴുന്ന്'
    },
    friends: {
      name: 'Venus, Saturn, Mercury',
      nameTa: 'சுக்கிரன், சனி, புதன்',
      nameHi: 'शुक्र, शनि, बुध',
      nameTe: 'శుక్రుడు, శని, బుధుడు',
      nameKn: 'ಶುಕ್ರ, ಶನಿ, ಬುಧ',
      nameMl: 'ശുക്രൻ, ശനി, ബുധൻ'
    },
    enemies: {
      name: 'Sun, Moon, Mars',
      nameTa: 'சூரியன், சந்திரன், செவ்வாய்',
      nameHi: 'सूर्य, चन्द्र, मंगल',
      nameTe: 'సూర్యుడు, చంద్రుడు, కుజుడు',
      nameKn: 'ಸೂರ್ಯ, ಚಂದ್ರ, ಮಂಗಳ',
      nameMl: 'സൂര്യൻ, ചന്ദ്രൻ, ചൊവ്വ'
    },
    ownRasis: [
      {
        rasiId: 10,
        name: 'Aquarius',
        nameTa: 'கும்பம்',
        nameHi: 'कुम्भ',
        nameTe: 'కుంభం',
        nameKn: 'ಕುಂಭ',
        nameMl: 'കുംഭം'
      }
    ],
    exaltationRasi: {
      rasiId: 1,
      name: 'Taurus',
      nameTa: 'ரிஷபம்',
      nameHi: 'वृषभ',
      nameTe: 'వృషభం',
      nameKn: 'ವೃಷಭ',
      nameMl: 'ഇടവം',
      degree: 20
    },
    debilitationRasi: {
      rasiId: 7,
      name: 'Scorpio',
      nameTa: 'விருச்சிகம்',
      nameHi: 'वृश्चिक',
      nameTe: 'వృశ్చికం',
      nameKn: 'ವೃಶ್ಚಿಕ',
      nameMl: 'വൃശ്ചികം',
      degree: 20
    }
  },
  {
    planetId: 8,
    name: 'Ketu',
    nameTa: 'கேது',
    nameHi: 'केतु',
    nameTe: 'కేతువు',
    nameKn: 'ಕೇತು',
    nameMl: 'കേതു',
    shortName: 'Ke',
    shortNameTa: 'கே',
    shortNameHi: 'के',
    shortNameTe: 'కే',
    shortNameKn: 'ಕೇ',
    shortNameMl: 'കേ',
    sanskritName: 'Ketu (Shikhi)',
    nature: {
      name: 'Shadow Planet / Moksha Karaka (Jnana Karaka)',
      nameTa: 'சாயா கிரகம் / மோட்சகாரகன் (ஞானகாரகன்)',
      nameHi: 'छाया ग्रह / मोक्षकारक (ज्ञानकारक)',
      nameTe: 'ఛాయా గ్రహం / మోక్షకారకుడు (జ్ఞానకారకుడు)',
      nameKn: 'ಛಾಯಾ ಗ್ರಹ / ಮೋಕ್ಷಕಾರಕ (ಜ್ಞಾನಕಾರಕ)',
      nameMl: 'ഛായാ ഗ്രഹം / മോക്ഷകാരകൻ (ജ്ഞാനകാരകൻ)'
    },
    gender: {
      name: 'Neutral / Eunuch',
      nameTa: 'அலி',
      nameHi: 'नपुंसक',
      nameTe: 'నపుంసక',
      nameKn: 'ನಪುಂಸಕ',
      nameMl: 'നപുംസകം'
    },
    color: {
      name: 'Multi-colored / Brown',
      nameTa: 'பல்வண்ணம் / பழுப்பு',
      nameHi: 'बहुरंगी / भूरा',
      nameTe: 'రంగురంగుల / గోధుమ',
      nameKn: 'ಬಹುವರ್ಣ / ಕಂದು',
      nameMl: 'ബഹുവർണ്ണം / തവിട്ട്'
    },
    gemstone: {
      name: "Cat's Eye (Vaidooryam)",
      nameTa: 'வைடூரியம்',
      nameHi: 'लहसुनिया',
      nameTe: 'వైడూర్యం',
      nameKn: 'ವೈಡೂರ್ಯ',
      nameMl: 'വൈഡൂര്യം'
    },
    dayOfWeek: {
      name: 'Ketu Kalam / Tuesday',
      nameTa: 'கேது காலம் / செவ்வாய்',
      nameHi: 'केतु काल / मंगलवार',
      nameTe: 'కేతు కాలం / మంగళవారం',
      nameKn: 'ಕೇತು ಕಾಲ / ಮಂಗಳವಾರ',
      nameMl: 'കേതുകാലം / ചൊവ്വ'
    },
    metal: {
      name: 'Bronze / Panchaloham',
      nameTa: 'வெண்கலம் (பஞ்சலோகம்)',
      nameHi: 'कांस्य / पंचलोहा',
      nameTe: 'కంచు / పంచలోహం',
      nameKn: 'ಕಂಚು / ಪಂಚಲೋಹ',
      nameMl: 'വെങ്കലം / പഞ്ചലോഹം'
    },
    grain: {
      name: 'Horse Gram (Kollu)',
      nameTa: 'கொள்ளு',
      nameHi: 'कुलथी दाल',
      nameTe: 'ఉలవలు',
      nameKn: 'ಹುರುಳಿ',
      nameMl: 'മുതിര'
    },
    friends: {
      name: 'Mars, Venus, Saturn',
      nameTa: 'செவ்வாய், சுக்கிரன், சனி',
      nameHi: 'मंगल, शुक्र, शनि',
      nameTe: 'కుజుడు, శుక్రుడు, శని',
      nameKn: 'ಮಂಗಳ, ಶುಕ್ರ, ಶನಿ',
      nameMl: 'ചൊവ്വ, ശുക്രൻ, ശനി'
    },
    enemies: {
      name: 'Sun, Moon',
      nameTa: 'சூரியன், சந்திரன்',
      nameHi: 'सूर्य, चन्द्र',
      nameTe: 'సూర్యుడు, చంద్రుడు',
      nameKn: 'ಸೂರ್ಯ, ಚಂದ್ರ',
      nameMl: 'സൂര്യൻ, ചന്ദ്രൻ'
    },
    ownRasis: [
      {
        rasiId: 7,
        name: 'Scorpio',
        nameTa: 'விருச்சிகம்',
        nameHi: 'वृश्चिक',
        nameTe: 'వృశ్చికం',
        nameKn: 'ವೃಶ್ಚಿಕ',
        nameMl: 'വൃശ്ചികം'
      }
    ],
    exaltationRasi: {
      rasiId: 7,
      name: 'Scorpio',
      nameTa: 'விருச்சிகம்',
      nameHi: 'वृश्चिक',
      nameTe: 'వృశ్చికం',
      nameKn: 'ವೃಶ್ಚಿಕ',
      nameMl: 'വൃശ്ചികം',
      degree: 20
    },
    debilitationRasi: {
      rasiId: 1,
      name: 'Taurus',
      nameTa: 'ரிஷபம்',
      nameHi: 'वृषभ',
      nameTe: 'వృషభం',
      nameKn: 'ವೃಷಭ',
      nameMl: 'ഇടവം',
      degree: 20
    }
  }
];

async function seedPlanets() {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/jothidam_db';
  await mongoose.connect(mongoUri);
  console.log('Connected to MongoDB:', mongoUri);

  await PlanetMaster.deleteMany({});
  console.log('Cleared existing planet master records.');

  for (const planetData of PLANETS_DATA) {
    const res = await PlanetMaster.create(planetData);
    console.log(`Created: ${res.planetId}. ${res.name} (${res.nameTa} / ${res.nameHi} / ${res.nameTe} / ${res.nameKn} / ${res.nameMl})`);
  }

  console.log('All 9 Navagrahas seeded with 100% complete translations in all 6 languages!');
  await mongoose.disconnect();
}

seedPlanets().catch(console.error);
