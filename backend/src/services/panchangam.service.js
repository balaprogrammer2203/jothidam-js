import swisseph from 'sweph';
import {
  TITHIS_DATA,
  YOGAS_DATA,
  KARANAS_DATA,
  TAMIL_YEARS_DATA,
  TAMIL_MONTHS_DATA,
  RASIS_DATA,
  PLANETS_DATA,
  NAKSHATRAS_DATA,
  getTithiDetails,
  getYogaDetails,
  getKaranaDetails,
  getTamilYearDetails,
  getTamilMonthDetails
} from './masterData.service.js';
import { calculateVedicChart, AYANAMSA_MODES } from './ephemeris.service.js';

const swe = swisseph.default || swisseph;

const WEEKDAYS = {
  ta: ['ஞாயிறு', 'திங்கள்', 'செவ்வாய்', 'புதன்', 'வியாழன்', 'வெள்ளி', 'சனி'],
  en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  hi: ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'],
  te: ['ఆదివారం', 'సోమవారం', 'మంగళవారం', 'బుధవారం', 'గురువారం', 'శుక్రవారం', 'శనివారం'],
  kn: ['ಭಾನುವಾರ', 'ಸೋಮವಾರ', 'ಮಂಗಳವಾರ', 'ಬುಧವಾರ', 'ಗುರುವಾರ', 'ಶುಕ್ರವಾರ', 'ಶನಿವಾರ'],
  ml: ['ഞായർ', 'തിങ്കൾ', 'ചൊവ്വ', 'ബുധൻ', 'വ്യാഴം', 'വെള്ളി', 'ശനി']
};

const PADA_LABELS = {
  ta: { 1: 'முதலாவது பாதம் (1)', 2: 'இரண்டாவது பாதம் (2)', 3: 'மூன்றாவது பாதம் (3)', 4: 'நான்காவது பாதம் (4)' },
  en: { 1: 'Pada 1', 2: 'Pada 2', 3: 'Pada 3', 4: 'Pada 4' },
  hi: { 1: 'प्रथम चरण (1)', 2: 'द्वितीय चरण (2)', 3: 'तृतीय चरण (3)', 4: 'चतुर्थ चरण (4)' },
  te: { 1: '1వ పాదం', 2: '2వ పాదం', 3: '3వ పాదం', 4: '4వ పాదం' },
  kn: { 1: '1ನೇ ಪಾದ', 2: '2ನೇ ಪಾದ', 3: '3ನೇ ಪಾದ', 4: '4ನೇ ಪಾದ' },
  ml: { 1: 'ഒന്നാം പാദം (1)', 2: 'രണ്ടാം പാദം (2)', 3: 'മൂന്നാം പാദം (3)', 4: 'നാലാം പാദം (4)' }
};

const NAKSHATRA_ATTRIBUTES = {
  0:  {
    nameTa: 'அஸ்வினி', nameEn: 'Ashwini', nameHi: 'अश्विनी',
    deity: { ta: 'அஸ்வினி குமாரர்கள்', en: 'Ashwini Kumaras', hi: 'अश्विनी कुमार', te: 'అశ్విని కుమారులు', kn: 'ಅಶ್ವಿನಿ ಕುಮಾರರು', ml: 'അശ്വിനി കുമാരന്മാർ' },
    tree: { ta: 'எட்டி', en: 'Poison Nut Tree (Nux-vomica)', hi: 'कुचला', te: 'ముషిడి', kn: 'ಕಾಸರಕ', ml: 'കാഞ്ഞിരം' },
    animal: { ta: 'குதிரை (ஆண்)', en: 'Horse (Male)', hi: 'अश्व (नर)', te: 'గుర్రం (పురుష)', kn: 'ಕುದುರೆ (ಗಂಡು)', ml: 'കുതിര (ആൺ)' },
    bird: { ta: 'புள்ளிப்பருந்து', en: 'Spotted Eagle', hi: 'चील', te: 'గద్ద', kn: 'ಹದ್ದು', ml: 'പുള്ള്' },
    gana: { ta: 'தேவ கணம்', en: 'Deva Gana (Divine)', hi: 'देव गण', te: 'దేవ గణం', kn: 'ದೇವ ಗಣ', ml: 'ദേവ ഗണം' },
    yoniGender: { ta: 'ஆண்', en: 'Male', hi: 'पुरुष', te: 'పురుష', kn: 'ಪುರುಷ', ml: 'പുരുഷൻ' },
    lord: { ta: 'கேது', en: 'Ketu', hi: 'केतु', te: 'కేతువు', kn: 'ಕೇತು', ml: 'കേതു' }
  },
  1:  {
    nameTa: 'பரணி', nameEn: 'Bharani', nameHi: 'भरणी',
    deity: { ta: 'எமன்', en: 'Yama (God of Justice)', hi: 'यम', te: 'యముడు', kn: 'ಯಮ', ml: 'യമൻ' },
    tree: { ta: 'நெல்லி', en: 'Indian Gooseberry (Amla)', hi: 'आंवला', te: 'ఉసిరి', kn: 'ನೆಲ್ಲಿ', ml: 'നെല്ലി' },
    animal: { ta: 'யானை (பெண்)', en: 'Elephant (Female)', hi: 'गज (मादा)', te: 'ఏనుగు (స్త్రీ)', kn: 'ಆನೆ (ಹೆಣ್ಣು)', ml: 'ആന (പെൺ)' },
    bird: { ta: 'காகம்', en: 'Crow', hi: 'कौआ', te: 'కాకి', kn: 'ಕಾಗೆ', ml: 'കാക്ക' },
    gana: { ta: 'மனித கணம்', en: 'Manushya Gana (Human)', hi: 'मनुष्य गण', te: 'మనుష్య గణం', kn: 'ಮನುಷ್ಯ ಗಣ', ml: 'മനുഷ്യ ഗണം' },
    yoniGender: { ta: 'பெண்', en: 'Female', hi: 'स्त्री', te: 'స్త్రీ', kn: 'ಸ್ತ್ರೀ', ml: 'സ്ത്രീ' },
    lord: { ta: 'சுக்கிரன்', en: 'Venus', hi: 'शुक्र', te: 'శుక్రుడు', kn: 'ಶುಕ್ರ', ml: 'ശുക്രൻ' }
  },
  2:  {
    nameTa: 'கார்த்திகை', nameEn: 'Krittika', nameHi: 'कृत्तिका',
    deity: { ta: 'அக்னி', en: 'Agni (Fire God)', hi: 'अग्नि', te: 'అగ్ని', kn: 'ಅಗ್ನಿ', ml: 'അഗ്നി' },
    tree: { ta: 'அத்தி', en: 'Cluster Fig (Atti)', hi: 'गूलर', te: 'మేడి', kn: 'ಅತ್ತಿ', ml: 'അത്തി' },
    animal: { ta: 'ஆடு (பெண்)', en: 'Sheep / Goat (Female)', hi: 'मेष (मादा)', te: 'గొర్రె (స్త్రీ)', kn: 'ಕುರಿ (ಹೆಣ್ಣು)', ml: 'ആട് (പെൺ)' },
    bird: { ta: 'மயில்', en: 'Peacock', hi: 'मयूर', te: 'నెమలి', kn: 'ನವಿಲು', ml: 'മയിൽ' },
    gana: { ta: 'ராட்சச கணம்', en: 'Rakshasa Gana (Fierce)', hi: 'राक्षस गण', te: 'రాక్షస గణం', kn: 'ರಾಕ್ಷಸ ಗಣ', ml: 'രാക്ഷസ ഗണം' },
    yoniGender: { ta: 'பெண்', en: 'Female', hi: 'स्त्री', te: 'స్త్రీ', kn: 'ಸ್ತ್ರೀ', ml: 'സ്ത്രീ' },
    lord: { ta: 'சூரியன்', en: 'Sun', hi: 'सूर्य', te: 'సూర్యుడు', kn: 'ಸೂರ್ಯ', ml: 'സൂര്യൻ' }
  },
  3:  {
    nameTa: 'ரோகிணி', nameEn: 'Rohini', nameHi: 'रोहिणी',
    deity: { ta: 'பிரம்மா', en: 'Brahma / Prajapati', hi: 'ब्रह्मा', te: 'బ్రహ్మ', kn: 'ಬ್ರಹ್ಮ', ml: 'ബ്രഹ്മാവ്' },
    tree: { ta: 'நாவல்', en: 'Black Plum (Jamun)', hi: 'जामुन', te: 'నేరేడు', kn: 'ನೇರಳೆ', ml: 'ഞാവൽ' },
    animal: { ta: 'பாம்பு (ஆண்)', en: 'Serpent / Cobra (Male)', hi: 'सर्प (नर)', te: 'పాము (పురుష)', kn: 'ಹಾವು (ಗಂಡು)', ml: 'പാമ്പ് (ആൺ)' },
    bird: { ta: 'ஆந்தை', en: 'Owl', hi: 'उल्लू', te: 'గుడ్లగూబ', kn: 'ಗೂಬೆ', ml: 'മൂങ്ങ' },
    gana: { ta: 'மனித கணம்', en: 'Manushya Gana (Human)', hi: 'मनुष्य गण', te: 'మనుష్య గణం', kn: 'ಮನುಷ್ಯ ಗಣ', ml: 'മനുഷ്യ ഗണം' },
    yoniGender: { ta: 'ஆண்', en: 'Male', hi: 'पुरुष', te: 'పురుష', kn: 'ಪುರುಷ', ml: 'ಪುರುಷൻ' },
    lord: { ta: 'சந்திரன்', en: 'Moon', hi: 'चन्द्र', te: 'చంద్రుడు', kn: 'ಚಂದ್ರ', ml: 'ചന്ദ്രൻ' }
  },
  4:  {
    nameTa: 'மிருகசீரிஷம்', nameEn: 'Mrigashira', nameHi: 'मृगशिरा',
    deity: { ta: 'சந்திரன்', en: 'Soma / Chandra', hi: 'सोम', te: 'సోముడు', kn: 'ಸೋಮ', ml: 'സോമൻ' },
    tree: { ta: 'கருங்காலி', en: 'Ebony / Cutch Tree', hi: 'खैर', te: 'చండ్ర', kn: 'ಕಗ್ಗಲಿ', ml: 'കരിങ്ങാലി' },
    animal: { ta: 'மான் (பெண்)', en: 'Deer / Serpent (Female)', hi: 'सर्प (मादा)', te: 'జింక (స్త్రీ)', kn: 'ಜಿಂಕೆ (ಹೆಣ್ಣು)', ml: 'മാൻ (പെൺ)' },
    bird: { ta: 'கோழி', en: 'Hen / Cock', hi: 'मुर्गा', te: 'కోడి', kn: 'ಕೋಳಿ', ml: 'കോഴി' },
    gana: { ta: 'தேவ கணம்', en: 'Deva Gana (Divine)', hi: 'देव गण', te: 'దేవ గణం', kn: 'ದೇವ ಗಣ', ml: 'ദേവ ഗണം' },
    yoniGender: { ta: 'பெண்', en: 'Female', hi: 'स्त्री', te: 'స్త్రీ', kn: 'ಸ್ತ್ರೀ', ml: 'സ്ത്രീ' },
    lord: { ta: 'செவ்வாய்', en: 'Mars', hi: 'मंगल', te: 'కుజుడు', kn: 'ಮಂಗಳ', ml: 'ചൊവ്വ' }
  },
  5:  {
    nameTa: 'திருவாதிரை', nameEn: 'Ardra', nameHi: 'आर्द्रा',
    deity: { ta: 'ருத்ரன்', en: 'Rudra (Lord Shiva)', hi: 'रुद्र', te: 'రుద్రుడు', kn: 'ರುದ್ರ', ml: 'രുദ്രൻ' },
    tree: { ta: 'செம்மரம்', en: 'Red Sandalwood', hi: 'लाल चन्दन', te: 'రక్తచందనం', kn: 'ರಕ್ತಚಂದನ', ml: 'രക്തചന്ദനം' },
    animal: { ta: 'நாய் (பெண்)', en: 'Dog (Female)', hi: 'श्वान (मादा)', te: 'కుక్క (స్త్రీ)', kn: 'ನಾಯಿ (ಹೆಣ್ಣು)', ml: 'പട്ടി (പെൺ)' },
    bird: { ta: 'அன்றில்', en: 'Black Ibis (Andril)', hi: 'चातक', te: 'క్రౌంచం', kn: 'ಅಂಡ್ರಿಲ್', ml: 'അന്റിൽ' },
    gana: { ta: 'மனித கணம்', en: 'Manushya Gana (Human)', hi: 'मनुष्य गण', te: 'మనుష్య గణం', kn: 'ಮನುಷ್ಯ ಗಣ', ml: 'മനുഷ്യ ഗണം' },
    yoniGender: { ta: 'பெண்', en: 'Female', hi: 'स्त्री', te: 'స్త్రీ', kn: 'ಸ್ತ್ರೀ', ml: 'സ്ത്രീ' },
    lord: { ta: 'ராகு', en: 'Rahu', hi: 'राहु', te: 'రాహువు', kn: 'ರಾಹು', ml: 'രാഹു' }
  },
  6:  {
    nameTa: 'புனர்பூசம்', nameEn: 'Punarvasu', nameHi: 'पुनर्वसु',
    deity: { ta: 'அதிதி', en: 'Aditi (Cosmic Mother)', hi: 'अदिति', te: 'అదితి', kn: 'ಅದಿತಿ', ml: 'അദിതി' },
    tree: { ta: 'மூங்கில்', en: 'Bamboo', hi: 'बाँस', te: 'వెదురు', kn: 'ಬಿದಿರು', ml: 'മുള' },
    animal: { ta: 'பூனை (பெண்)', en: 'Cat (Female)', hi: 'मार्जार (मादा)', te: 'పిల్లి (స్త్రీ)', kn: 'ಬೆಕ್ಕು (ಹೆಣ್ಣು)', ml: 'പൂച്ച (പെൺ)' },
    bird: { ta: 'அன்னம்', en: 'Swan (Hamsa)', hi: 'हंस', te: 'హంస', kn: 'ಹಂಸ', ml: 'അന്നം' },
    gana: { ta: 'தேவ கணம்', en: 'Deva Gana (Divine)', hi: 'देव गण', te: 'దేవ గణం', kn: 'ದೇವ ಗಣ', ml: 'ദേവ ഗണം' },
    yoniGender: { ta: 'பெண்', en: 'Female', hi: 'स्त्री', te: 'స్త్రీ', kn: 'ಸ್ತ್ರೀ', ml: 'സ്ത്രീ' },
    lord: { ta: 'குரு', en: 'Jupiter', hi: 'गुरु', te: 'గురుడు', kn: 'ಗುರು', ml: 'വ്യാഴം' }
  },
  7:  {
    nameTa: 'பூசம்', nameEn: 'Pushya', nameHi: 'पुष्य',
    deity: { ta: 'பிருஹஸ்பதி', en: 'Brihaspati (Divine Guru)', hi: 'बृहस्पति', te: 'బృహస్పతి', kn: 'ಬೃಹಸ್ಪತಿ', ml: 'ബൃഹസ്പതി' },
    tree: { ta: 'அரசு', en: 'Sacred Fig (Peepal / Bodhi)', hi: 'पीपल', te: 'రావి', kn: 'ಅರಳಿ', ml: 'അരയാൽ' },
    animal: { ta: 'ஆடு (ஆண்)', en: 'Goat / Ram (Male)', hi: 'मेष (नर)', te: 'మేక (పురుష)', kn: 'ಮೇಕೆ (ಗಂಡು)', ml: 'ആട് (ஆൺ)' },
    bird: { ta: 'நீர் காகம்', en: 'Water Crow / Cuckoo', hi: 'जल कौआ', te: 'నీటి కాకి', kn: 'ನೀರು ಕಾಗೆ', ml: 'നീർക്കാക്ക' },
    gana: { ta: 'தேவ கணம்', en: 'Deva Gana (Divine)', hi: 'देव गण', te: 'దేవ గణం', kn: 'ದೇವ ಗಣ', ml: 'ദേവ ഗണം' },
    yoniGender: { ta: 'ஆண்', en: 'Male', hi: 'पुरुष', te: 'పురుష', kn: 'ಪುರುಷ', ml: 'ಪುರುಷன்' },
    lord: { ta: 'சனி', en: 'Saturn', hi: 'शनि', te: 'శని', kn: 'ಶನಿ', ml: 'ശനി' }
  },
  8:  {
    nameTa: 'ஆயில்யம்', nameEn: 'Ashlesha', nameHi: 'आश्लेषा',
    deity: { ta: 'நாகர்கள்', en: 'Nagas (Serpent Deities)', hi: 'नाग देव', te: 'నాగులు', kn: 'ನಾಗರು', ml: 'നാഗങ്ങൾ' },
    tree: { ta: 'புன்னை', en: 'Alexandrian Laurel (Punnaga)', hi: 'नागकेसर', te: 'పొన్న', kn: 'ಸುರಗಿ', ml: 'പുന്ന' },
    animal: { ta: 'பூனை (ஆண்)', en: 'Cat (Male)', hi: 'मार्जार (नर)', te: 'పిల్లి (పురుష)', kn: 'ಬೆಕ್ಕು (ಗಂಡು)', ml: 'പൂച്ച (ആൺ)' },
    bird: { ta: 'சிச்சிலி', en: 'Kingfisher (Sichili)', hi: 'नीलकंठ', te: 'లక్కపిట్ట', kn: 'ಮೀಂಚುಳ್ಳಿ', ml: 'പൊന്മാൻ' },
    gana: { ta: 'ராட்சச கணம்', en: 'Rakshasa Gana (Fierce)', hi: 'राक्षस गण', te: 'రాక్షస గణం', kn: 'ರಾಕ್ಷಸ ಗಣ', ml: 'രാക്ഷസ ഗണം' },
    yoniGender: { ta: 'ஆண்', en: 'Male', hi: 'पुरुष', te: 'పురుష', kn: 'ಪುರುಷ', ml: 'ಪುರುಷன்' },
    lord: { ta: 'புதன்', en: 'Mercury', hi: 'बुध', te: 'బుధుడు', kn: 'ಬುಧ', ml: 'ബുധൻ' }
  },
  9:  {
    nameTa: 'மகம்', nameEn: 'Magha', nameHi: 'मघा',
    deity: { ta: 'பித்ருக்கள்', en: 'Pitris (Ancestral Spirits)', hi: 'पितृगण', te: 'పితృదేవతలు', kn: 'ಪಿತೃಗಳು', ml: 'പിതൃക്കൾ' },
    tree: { ta: 'ஆலமரம்', en: 'Banyan Tree (Vata)', hi: 'बरगद', te: 'మర్రి', kn: 'ಆಲದ ಮರ', ml: 'പേരാൽ' },
    animal: { ta: 'எலி (ஆண்)', en: 'Rat / Bandicoot (Male)', hi: 'मूषक (नर)', te: 'ఎలుక (పురుష)', kn: 'ಇಲಿ (ಗಂಡು)', ml: 'എലി (ആൺ)' },
    bird: { ta: 'ஆண் கழுகு', en: 'Eagle (Male)', hi: 'चील (नर)', te: 'గద్ద (పురుష)', kn: 'ಹದ್ದು (ಗಂಡು)', ml: 'കഴുകൻ (ആൺ)' },
    gana: { ta: 'ராட்சச கணம்', en: 'Rakshasa Gana (Fierce)', hi: 'राक्षस गण', te: 'రాక్షస గణం', kn: 'ರಾಕ್ಷಸ ಗಣ', ml: 'രാಕ್ಷസ ഗണം' },
    yoniGender: { ta: 'ஆண்', en: 'Male', hi: 'पुरुष', te: 'పురుష', kn: 'ಪುರುಷ', ml: 'ಪುರುಷன்' },
    lord: { ta: 'கேது', en: 'Ketu', hi: 'केतु', te: 'కేతువు', kn: 'ಕೇತು', ml: 'കേതു' }
  },
  10: {
    nameTa: 'பூரம்', nameEn: 'Purva Phalguni', nameHi: 'पूर्वाफाल्गुनी',
    deity: { ta: 'பகன்', en: 'Bhaga (Solar Deity)', hi: 'भग', te: 'భగుడు', kn: 'ಭಗ', ml: 'ഭഗൻ' },
    tree: { ta: 'பலாசு', en: 'Flame of Forest (Palash)', hi: 'पलाश', te: 'మోదుగ', kn: 'ಮುತ್ತುಗ', ml: 'പ്ലാശ്' },
    animal: { ta: 'எலி (பெண்)', en: 'Rat (Female)', hi: 'मूषक (मादा)', te: 'ఎలుక (స్త్రీ)', kn: 'ಇಲಿ (ಹೆಣ್ಣು)', ml: 'എലി (പെൺ)' },
    bird: { ta: 'பெண் கழுகு', en: 'Eagle (Female)', hi: 'चील (मादा)', te: 'గద్ద (స్త్రీ)', kn: 'ಹದ್ದು (ಹೆಣ್ಣು)', ml: 'കഴുകൻ (പെൺ)' },
    gana: { ta: 'மனித கணம்', en: 'Manushya Gana (Human)', hi: 'मनुष्य गण', te: 'మనుష్య గణం', kn: 'ಮನುಷ್ಯ ಗಣ', ml: 'മനുഷ്യ ഗണം' },
    yoniGender: { ta: 'பெண்', en: 'Female', hi: 'स्त्री', te: 'స్త్రీ', kn: 'ಸ್ತ್ರೀ', ml: 'സ്ത്രീ' },
    lord: { ta: 'சுக்கிரன்', en: 'Venus', hi: 'शुक्र', te: 'శుక్రుడు', kn: 'ಶುಕ್ರ', ml: 'ശുക്രൻ' }
  },
  11: {
    nameTa: 'உத்திரம்', nameEn: 'Uttara Phalguni', nameHi: 'उत्तराफाल्गुनी',
    deity: { ta: 'அரியமான்', en: 'Aryaman (God of Patronage)', hi: 'अर्यमा', te: 'అర్యముడు', kn: 'ಅರ್ಯಮ', ml: 'അര്യമാവ്' },
    tree: { ta: 'இத்தி', en: 'Indian Red Pear (Itthi)', hi: 'गूलर', te: 'జువ్వి', kn: 'ಇತ್ತಿ', ml: 'ഇത്തി' },
    animal: { ta: 'எருது (ஆண்)', en: 'Bull / Cow (Male)', hi: 'वृषभ (नर)', te: 'ఎద్దు (పురుష)', kn: 'ಎತ್ತು (ಗಂಡು)', ml: 'കാള (ആൺ)' },
    bird: { ta: 'வண்டான்காக்கை', en: 'Beetle Crow', hi: 'भृंगराज', te: 'కాకి', kn: 'ಕಾಗೆ', ml: 'കാക്ക' },
    gana: { ta: 'மனித கணம்', en: 'Manushya Gana (Human)', hi: 'मनुष्य गण', te: 'మనుష్య గణం', kn: 'ಮನುಷ್ಯ ಗಣ', ml: 'മനുഷ്യ ഗണം' },
    yoniGender: { ta: 'ஆண்', en: 'Male', hi: 'पुरुष', te: 'పురుష', kn: 'ಪುರುಷ', ml: 'ಪುರುಷன்' },
    lord: { ta: 'சூரியன்', en: 'Sun', hi: 'सूर्य', te: 'సూర్యుడు', kn: 'ಸೂರ್ಯ', ml: 'சூரியன்' }
  },
  12: {
    nameTa: 'ஹஸ்தம்', nameEn: 'Hasta', nameHi: 'हस्त',
    deity: { ta: 'சவிதா', en: 'Savita (Solar Creative Energy)', hi: 'सविता', te: 'సవితృడు', kn: 'ಸವಿತೃ', ml: 'സവിതാവ്' },
    tree: { ta: 'அம்பாடம்', en: 'Hog Plum (Ambazham)', hi: 'आंवला', te: 'అంబల', kn: 'ಅಂಬಟೆ', ml: 'അമ്പഴം' },
    animal: { ta: 'எருமை (பெண்)', en: 'Buffalo (Female)', hi: 'महिष (मादा)', te: 'గేదె (స్త్రీ)', kn: 'ಕೋಣ (ಹೆಣ್ಣು)', ml: 'എരുമ (പെൺ)' },
    bird: { ta: 'பருந்து', en: 'Hawk / Vulture', hi: 'बाज', te: 'డేగ', kn: 'ಗಿಡುಗ', ml: 'പരുന്ത്' },
    gana: { ta: 'தேவ கணம்', en: 'Deva Gana (Divine)', hi: 'देव गण', te: 'దేవ గణం', kn: 'ದೇವ ಗಣ', ml: 'ദേവ ഗണം' },
    yoniGender: { ta: 'பெண்', en: 'Female', hi: 'स्त्री', te: 'స్త్రీ', kn: 'ಸ್ತ್ರೀ', ml: 'സ്ത്രീ' },
    lord: { ta: 'சந்திரன்', en: 'Moon', hi: 'चन्द्र', te: 'చంద్రుడు', kn: 'ಚಂದ್ರ', ml: 'ചന്ദ്രൻ' }
  },
  13: {
    nameTa: 'சித்திரை', nameEn: 'Chitra', nameHi: 'चित्रा',
    deity: { ta: 'விஸ்வகர்மா', en: 'Tvashtar / Vishwakarma (Architect)', hi: 'विश्वकर्मा', te: 'విశ్వకర్మ', kn: 'ವಿಶ್ವಕರ್ಮ', ml: 'വിശ്വകർമ്മാവ്' },
    tree: { ta: 'வில்வம்', en: 'Bael Tree (Bilva)', hi: 'बेल', te: 'మారేడు', kn: 'ಬಿಲ್ವಪತ್ರೆ', ml: 'കൂവളം' },
    animal: { ta: 'புலி (பெண்)', en: 'Tiger (Female)', hi: 'व्याघ्र (मादा)', te: 'పులి (స్త్రీ)', kn: 'ಹುಲಿ (ಹೆಣ್ಣು)', ml: 'പുലി (പെൺ)' },
    bird: { ta: 'தையல் சிட்டு', en: 'Tailor Bird', hi: 'दर्जी पक्षी', te: 'దర్జీ పిట్ట', kn: 'ದರ್ಜಿ ಹಕ್ಕಿ', ml: 'തുന്നാരൻ പക്ഷി' },
    gana: { ta: 'ராட்சச கணம்', en: 'Rakshasa Gana (Fierce)', hi: 'राक्षस गण', te: 'రాక్షస గణం', kn: 'ರಾಕ್ಷಸ ಗಣ', ml: 'രാക്ഷസ ഗണം' },
    yoniGender: { ta: 'பெண்', en: 'Female', hi: 'स्त्री', te: 'స్త్రీ', kn: 'ಸ್ತ್ರೀ', ml: 'സ്ത്രീ' },
    lord: { ta: 'செவ்வாய்', en: 'Mars', hi: 'मंगल', te: 'కుజుడు', kn: 'ಮಂಗಳ', ml: 'ചൊവ്വ' }
  },
  14: {
    nameTa: 'சுவாதி', nameEn: 'Swati', nameHi: 'स्वाति',
    deity: { ta: 'வாயு', en: 'Vayu (Wind God)', hi: 'वायु', te: 'వాయుదేవుడు', kn: 'ವಾಯು', ml: 'വായു' },
    tree: { ta: 'மருதம்', en: 'Terminalia Arjuna (Marudham)', hi: 'अर्जुन वृक्ष', te: 'మద్ది', kn: 'ಮತ್ತಿ', ml: 'മരുത്' },
    animal: { ta: 'எருமை (ஆண்)', en: 'Buffalo (Male)', hi: 'महिष (नर)', te: 'దున్నపోతు (పురుష)', kn: 'ಕೋಣ (ಗಂಡು)', ml: 'പോത്ത് (ആൺ)' },
    bird: { ta: 'தேனீ', en: 'Honeybee', hi: 'मधुमक्खी', te: 'తేనెటీగ', kn: 'ಜೇನುನೊಣ', ml: 'തേനീച്ച' },
    gana: { ta: 'தேவ கணம்', en: 'Deva Gana (Divine)', hi: 'देव गण', te: 'దేవ గణం', kn: 'ದೇವ ಗಣ', ml: 'ദേവ ഗണം' },
    yoniGender: { ta: 'ஆண்', en: 'Male', hi: 'पुरुष', te: 'పురుష', kn: 'ಪುರುಷ', ml: 'పురుಷൻ' },
    lord: { ta: 'ராகு', en: 'Rahu', hi: 'राहु', te: 'రాహువు', kn: 'ರಾಹು', ml: 'രാహు' }
  },
  15: {
    nameTa: 'விசாகம்', nameEn: 'Vishakha', nameHi: 'विशाखा',
    deity: { ta: 'இந்திராக்னி', en: 'Indragni (Indra & Agni)', hi: 'इन्द्राग्नि', te: 'ఇంద్రాగ్ని', kn: 'ಇಂದ್ರಾಗ್ನಿ', ml: 'ഇന്ദ്രാഗ്നി' },
    tree: { ta: 'விளா', en: 'Wood Apple (Vila)', hi: 'कैथ', te: 'వెలగ', kn: 'ಬೇಲದ ಮರ', ml: 'വിളാംപഴം' },
    animal: { ta: 'புலி (ஆண்)', en: 'Tiger (Male)', hi: 'व्याघ्र (नर)', te: 'పులి (పురుష)', kn: 'ಹುಲಿ (ಗಂಡು)', ml: 'പുലി (ആൺ)' },
    bird: { ta: 'செங்காகம்', en: 'Red Crow', hi: 'लाल कौआ', te: 'ఎర్ర కాకి', kn: 'ಕೆಂಪು ಕಾಗೆ', ml: 'ചെമ്പോത്ത്' },
    gana: { ta: 'ராட்சச கணம்', en: 'Rakshasa Gana (Fierce)', hi: 'राक्षस गण', te: 'రాक्षస గణం', kn: 'ರಾಕ್ಷಸ ಗಣ', ml: 'രാക്ഷസ ഗണം' },
    yoniGender: { ta: 'ஆண்', en: 'Male', hi: 'पुरुष', te: 'పురుష', kn: 'ಪುರುಷ', ml: 'పురుಷൻ' },
    lord: { ta: 'குரு', en: 'Jupiter', hi: 'गुरु', te: 'గురుడు', kn: 'ಗುರು', ml: 'വ്യാഴം' }
  },
  16: {
    nameTa: 'அனுஷம்', nameEn: 'Anuradha', nameHi: 'अनुराधा',
    deity: { ta: 'மித்ரன்', en: 'Mitra (God of Friendship & Light)', hi: 'मित्र', te: 'మిత్రుడు', kn: 'ಮಿತ್ರ', ml: 'മിത്രൻ' },
    tree: { ta: 'மகிழம்', en: 'Spanish Cherry (Bakula)', hi: 'मौलसिरी', te: 'పొగడ', kn: 'ಬಕುಳ', ml: 'ഇലഞ്ഞി' },
    animal: { ta: 'மான் (பெண்)', en: 'Deer (Female)', hi: 'मृग (मादा)', te: 'లేడి (స్త్రీ)', kn: 'ಜಿಂಕೆ (ಹೆಣ್ಣು)', ml: 'മാൻ (പെൺ)' },
    bird: { ta: 'நாரை', en: 'Crane / Stork', hi: 'सारस', te: 'కొంగ', kn: 'ಬೆಳ್ಳಕ್ಕಿ', ml: 'കൊക്ക്' },
    gana: { ta: 'தேவ கணம்', en: 'Deva Gana (Divine)', hi: 'देव गण', te: 'దేవ గణం', kn: 'ದೇವ ಗಣ', ml: 'ദേവ ഗണം' },
    yoniGender: { ta: 'பெண்', en: 'Female', hi: 'स्त्री', te: 'స్త్రీ', kn: 'ಸ್ತ್ರೀ', ml: 'സ്ത്രീ' },
    lord: { ta: 'சனி', en: 'Saturn', hi: 'शनि', te: 'శని', kn: 'ಶನಿ', ml: 'ശനി' }
  },
  17: {
    nameTa: 'கேட்டை', nameEn: 'Jyeshtha', nameHi: 'ज्येष्ठा',
    deity: { ta: 'இந்திரன்', en: 'Indra (King of Gods)', hi: 'इन्द्र', te: 'ఇంద్రుడు', kn: 'ಇಂದ್ರ', ml: 'ഇന്ദ്രൻ' },
    tree: { ta: 'பரம்பை', en: 'Silk Cotton / Pine', hi: 'चीड़', te: 'మోదుగ', kn: 'ಸಂಪಿಗೆ', ml: 'വെട്ടി' },
    animal: { ta: 'மான் (ஆண்)', en: 'Deer (Male)', hi: 'मृग (नर)', te: 'లేడి (పురుష)', kn: 'ಜಿಂಕೆ (ಗಂಡು)', ml: 'മാൻ (ആൺ)' },
    bird: { ta: 'சக்ரவாகம்', en: 'Brahminy Duck (Chakravaka)', hi: 'चक्रवाक', te: 'చక్రవాకం', kn: 'ಚಕ್ರವಾಕ', ml: 'ചക്രവാകം' },
    gana: { ta: 'ராட்சச கணம்', en: 'Rakshasa Gana (Fierce)', hi: 'राक्षस गण', te: 'రాక్షస గణం', kn: 'ರಾಕ್ಷಸ ಗಣ', ml: 'രാಕ್ಷಸ ഗണം' },
    yoniGender: { ta: 'ஆண்', en: 'Male', hi: 'पुरुष', te: 'పురుష', kn: 'ಪುರುಷ', ml: 'ಪುರುಷൻ' },
    lord: { ta: 'புதன்', en: 'Mercury', hi: 'बुध', te: 'బుధుడు', kn: 'ಬುಧ', ml: 'ಬುಧൻ' }
  },
  18: {
    nameTa: 'மூலம்', nameEn: 'Mula', nameHi: 'मूल',
    deity: { ta: 'நிருருதி', en: 'Nirriti (Goddess of Calamity)', hi: 'निरृति', te: 'నిరృతి', kn: 'ನಿರೃತಿ', ml: 'നിരൃതി' },
    tree: { ta: 'மராமரம்', en: 'Sal Tree (Maramaram)', hi: 'साल', te: 'మద్ది', kn: 'ಸಾಲ ಮರ', ml: 'മരമരം' },
    animal: { ta: 'நாய் (ஆண்)', en: 'Dog (Male)', hi: 'श्वान (नर)', te: 'కుక్క (పురుష)', kn: 'ನಾಯಿ (ಗಂಡು)', ml: 'പട്ടി (ആൺ)' },
    bird: { ta: 'கோழி', en: 'Cock / Hen', hi: 'मुर्गा', te: 'కోడి', kn: 'ಕೋಳಿ', ml: 'കോഴി' },
    gana: { ta: 'ராட்சச கணம்', en: 'Rakshasa Gana (Fierce)', hi: 'राक्षस गण', te: 'రాక్షస గణం', kn: 'ರಾಕ್ಷಸ ಗಣ', ml: 'രാಕ್ಷಸ ഗണം' },
    yoniGender: { ta: 'ஆண்', en: 'Male', hi: 'पुरुष', te: 'పురుష', kn: 'ಪುರುಷ', ml: 'ಪುರುಷൻ' },
    lord: { ta: 'கேது', en: 'Ketu', hi: 'केतु', te: 'కేతువు', kn: 'ಕೇತು', ml: 'കേതു' }
  },
  19: {
    nameTa: 'பூராடம்', nameEn: 'Purva Ashadha', nameHi: 'पूर्वाषाढ़ा',
    deity: { ta: 'வருணன் / ஆபஸ்', en: 'Apas / Varuna (Cosmic Waters)', hi: 'वरुण / आपः', te: 'వరుణుడు', kn: 'ವರುಣ', ml: 'വരുണൻ' },
    tree: { ta: 'வஞ்சி', en: 'Rattan Cane (Vanchi)', hi: 'बेंत', te: 'వేత్రం', kn: 'ಬೆತ್ತ', ml: 'വഞ്ചി' },
    animal: { ta: 'குரங்கு (ஆண்)', en: 'Monkey (Male)', hi: 'वानर (नर)', te: 'కోతి (పురుష)', kn: 'ಮಂಗ (ಗಂಡು)', ml: 'കുരങ്ങ് (ആൺ)' },
    bird: { ta: 'கழுகு', en: 'Eagle (Garuda)', hi: 'गरुड़', te: 'గద్ద', kn: 'ಹದ್ದು', ml: 'കഴുകൻ' },
    gana: { ta: 'மனித கணம்', en: 'Manushya Gana (Human)', hi: 'मनुष्य गण', te: 'మనుష్య గణం', kn: 'ಮನುಷ್ಯ ಗಣ', ml: 'മനുഷ്യ ಗണം' },
    yoniGender: { ta: 'ஆண்', en: 'Male', hi: 'पुरुष', te: 'పురుష', kn: 'ಪುರುಷ', ml: 'పురుಷൻ' },
    lord: { ta: 'சுக்கிரன்', en: 'Venus', hi: 'शुक्र', te: 'శుక్రుడు', kn: 'ಶುಕ್ರ', ml: 'ശുക്രൻ' }
  },
  20: {
    nameTa: 'உத்திராடம்', nameEn: 'Uttara Ashadha', nameHi: 'उत्तराषाढ़ा',
    deity: { ta: 'விஸ்வேதேவர்கள்', en: 'Vishwadevas (Universal Gods)', hi: 'विश्वेदेवा', te: 'విశ్వేదేవతలు', kn: 'ವಿಶ್ವೇದೇವತೆಗಳು', ml: 'വിശ്വേദേവകൾ' },
    tree: { ta: 'பலா', en: 'Jackfruit Tree', hi: 'कटहल', te: 'పనస', kn: 'ಹಲಸು', ml: 'പ്ലാവ്' },
    animal: { ta: 'கீரி (பெண்)', en: 'Mongoose (Female)', hi: 'नकुल (मादा)', te: 'ముంగిస (స్త్రీ)', kn: 'ಮುಂಗುಸಿ (ಹೆಣ್ಣು)', ml: 'കീരി (പെൺ)' },
    bird: { ta: 'வலியன்', en: 'Stork / Heron', hi: 'बगुला', te: 'కొంగ', kn: 'ಕೊಕ್ಕರೆ', ml: 'കൊക്ക്' },
    gana: { ta: 'மனித கணம்', en: 'Manushya Gana (Human)', hi: 'मनुष्य गण', te: 'మనుష్య గణం', kn: 'ಮನುಷ್ಯ ಗಣ', ml: 'മനുഷ്യ ಗണം' },
    yoniGender: { ta: 'பெண்', en: 'Female', hi: 'स्त्री', te: 'స్త్రీ', kn: 'ಸ್ತ್ರೀ', ml: 'സ്ത്രീ' },
    lord: { ta: 'சூரியன்', en: 'Sun', hi: 'सूर्य', te: 'సూర్యుడు', kn: 'ಸೂರ್ಯ', ml: 'സൂര്യൻ' }
  },
  21: {
    nameTa: 'திருவோணம்', nameEn: 'Shravana', nameHi: 'श्रवण',
    deity: { ta: 'விஷ்ணு', en: 'Lord Vishnu (The Preserver)', hi: 'विष्णु', te: 'విష్ణువు', kn: 'ವಿಷ್ಣು', ml: 'വിഷ്ണു' },
    tree: { ta: 'எருக்கு', en: 'Crown Flower (Calotropis)', hi: 'मदार', te: 'జిల్లేడు', kn: 'ಎಕ್ಕದ ಗಿಡ', ml: 'എരുക്ക്' },
    animal: { ta: 'குரங்கு (பெண்)', en: 'Monkey (Female)', hi: 'वानर (मादा)', te: 'కోతి (స్త్రీ)', kn: 'ಮಂಗ (ಹೆಣ್ಣು)', ml: 'കുരങ്ങ് (പെൺ)' },
    bird: { ta: 'நாரை', en: 'Crane / Heron', hi: 'सारस', te: 'కొంగ', kn: 'ಬೆಳ್ಳಕ್ಕಿ', ml: 'കൊക്ക്' },
    gana: { ta: 'தேவ கணம்', en: 'Deva Gana (Divine)', hi: 'देव गण', te: 'దేవ గణం', kn: 'ದೇವ ಗಣ', ml: 'ദേവ ಗണം' },
    yoniGender: { ta: 'பெண்', en: 'Female', hi: 'स्त्री', te: 'స్త్రీ', kn: 'ಸ್ತ್ರೀ', ml: 'സ്ത്രീ' },
    lord: { ta: 'சந்திரன்', en: 'Moon', hi: 'चन्द्र', te: 'చంద్రుడు', kn: 'ಚಂದ್ರ', ml: 'ചന്ദ്രൻ' }
  },
  22: {
    nameTa: 'அவிட்டம்', nameEn: 'Dhanishta', nameHi: 'धनिष्ठा',
    deity: { ta: 'அஷ்ட வசுக்கள்', en: 'Ashta Vasus (Eight Elemental Gods)', hi: 'अष्ट वसु', te: 'అష్టవసువులు', kn: 'ಅಷ್ಟ ವಸುಗಳು', ml: 'അഷ്ടവസുക്കൾ' },
    tree: { ta: 'வன்னி', en: 'Prosopis / Khejri (Shami)', hi: 'शमी', te: 'జమ్మి', kn: 'ಬನ್ನಿ ಮರ', ml: 'വഹ്നി' },
    animal: { ta: 'சிங்கம் (பெண்)', en: 'Lioness (Female)', hi: 'सिंह (मादा)', te: 'సింహం (స్త్రీ)', kn: 'ಸಿಂಹ (ಹೆಣ್ಣು)', ml: 'സിംഹം (പെൺ)' },
    bird: { ta: 'வண்டான்காக்கை', en: 'Peacock / Crow', hi: 'मयूर', te: 'కాకి', kn: 'ಕಾಗೆ', ml: 'കാക്ക' },
    gana: { ta: 'ராட்சச கணம்', en: 'Rakshasa Gana (Fierce)', hi: 'राक्षस गण', te: 'రాక్షస గణం', kn: 'ರಾಕ್ಷಸ ಗಣ', ml: 'രാಕ್ಷಸ ഗണം' },
    yoniGender: { ta: 'பெண்', en: 'Female', hi: 'स्त्री', te: 'స్త్రీ', kn: 'ಸ್ತ್ರೀ', ml: 'സ്ത്രീ' },
    lord: { ta: 'செவ்வாய்', en: 'Mars', hi: 'मंगल', te: 'కుజుడు', kn: 'ಮಂಗಳ', ml: 'ചൊവ്വ' }
  },
  23: {
    nameTa: 'சதயம்', nameEn: 'Shatabhisha', nameHi: 'शतभिषा',
    deity: { ta: 'வருணன்', en: 'Varuna (Lord of Cosmic Waters)', hi: 'वरुण', te: 'వరుణుడు', kn: 'ವರುಣ', ml: 'വരുണൻ' },
    tree: { ta: 'கடம்பு', en: 'Kadamba Tree', hi: 'कदम्ब', te: 'కదంబం', kn: 'ಕದಂಬ', ml: 'കടമ്പ്' },
    animal: { ta: 'குதிரை (பெண்)', en: 'Mare / Horse (Female)', hi: 'अश्व (मादा)', te: 'గుర్రం (స్త్రీ)', kn: 'ಕುದುರೆ (ಹೆಣ್ಣು)', ml: 'കുതിര (പെൺ)' },
    bird: { ta: 'காகம்', en: 'Raven / Crow', hi: 'कौआ', te: 'కాకి', kn: 'ಕಾಗೆ', ml: 'കാക്ക' },
    gana: { ta: 'ராட்சச கணம்', en: 'Rakshasa Gana (Fierce)', hi: 'राक्षस गण', te: 'రాక్షస గణం', kn: 'ರಾಕ್ಷಸ ಗಣ', ml: 'രാಕ್ಷಸ ഗണം' },
    yoniGender: { ta: 'பெண்', en: 'Female', hi: 'स्त्री', te: 'స్త్రీ', kn: 'ಸ್ತ್ರೀ', ml: 'സ്ത്രീ' },
    lord: { ta: 'ராகு', en: 'Rahu', hi: 'राहु', te: 'రాహువు', kn: 'ರಾಹು', ml: 'రాహు' }
  },
  24: {
    nameTa: 'பூரட்டாதி', nameEn: 'Purva Bhadrapada', nameHi: 'पूर्वभाद्रपद',
    deity: { ta: 'அஜைகபாதன்', en: 'Aja Ekapada (Cosmic Fire Serpent)', hi: 'अजैकपाद', te: 'అజైకపాదుడు', kn: 'ಅಜೈಕಪಾದ', ml: 'അജൈകപാദൻ' },
    tree: { ta: 'தேமா', en: 'Mango Tree', hi: 'आम', te: 'మామిడి', kn: 'ಮಾವಿನ ಮರ', ml: 'മാവ്' },
    animal: { ta: 'சிங்கம் (ஆண்)', en: 'Lion (Male)', hi: 'सिंह (नर)', te: 'సింహం (పురుష)', kn: 'ಸಿಂಹ (ಗಂಡು)', ml: 'സിംഹം (ആൺ)' },
    bird: { ta: 'வானம்பாடி', en: 'Skylark (Vaanambadi)', hi: 'चातक', te: 'భరద్వాజ పిట్ట', kn: 'ಹಾಡುಹಕ್ಕಿ', ml: 'വാനമ്പാടി' },
    gana: { ta: 'மனித கணம்', en: 'Manushya Gana (Human)', hi: 'मनुष्य गण', te: 'మనుష్య గణం', kn: 'ಮನುಷ್ಯ ಗಣ', ml: 'ಮನುಷ್ಯ ಗണം' },
    yoniGender: { ta: 'ஆண்', en: 'Male', hi: 'पुरुष', te: 'పురుష', kn: 'ಪುರುಷ', ml: 'ಪುರುಷൻ' },
    lord: { ta: 'குரு', en: 'Jupiter', hi: 'गुरु', te: 'గురుడు', kn: 'ಗುರು', ml: 'വ്യാഴം' }
  },
  25: {
    nameTa: 'உத்திரட்டாதி', nameEn: 'Uttara Bhadrapada', nameHi: 'उत्तरभाद्रपद',
    deity: { ta: 'அஹிர்பபியன்', en: 'Ahirbudhnya (Serpent of the Depths)', hi: 'अहिर्बुध्न्य', te: 'అహిర్బుధ్న్యుడు', kn: 'ಅಹಿರ್ಬುಧ್ನ್ಯ', ml: 'അഹിർബുധ്ന്യൻ' },
    tree: { ta: 'வேம்பு', en: 'Neem Tree (Margosa)', hi: 'नीम', te: 'వేప', kn: 'ಬೇವಿನ ಮರ', ml: 'വേപ്പ്' },
    animal: { ta: 'பசு (பெண்)', en: 'Cow (Female)', hi: 'गौ (मादा)', te: 'ఆవు (స్త్రీ)', kn: 'ಹಸು (ಹೆಣ್ಣು)', ml: 'പശു (പെൺ)' },
    bird: { ta: 'கோட்டான்', en: 'Barn Owl (Kottaan)', hi: 'उल्लू', te: 'గుడ్లగూబ', kn: 'ಗೂಬೆ', ml: 'കൂമൻ' },
    gana: { ta: 'மனித கணம்', en: 'Manushya Gana (Human)', hi: 'मनुष्य गण', te: 'మనుష్య గణం', kn: 'ಮನುಷ್ಯ ಗಣ', ml: 'ಮನುಷ್ಯ ಗണം' },
    yoniGender: { ta: 'பெண்', en: 'Female', hi: 'स्त्री', te: 'స్త్రీ', kn: 'ಸ್ತ್ರೀ', ml: 'സ്ത്രീ' },
    lord: { ta: 'சனி', en: 'Saturn', hi: 'शनि', te: 'శని', kn: 'ಶನಿ', ml: 'ശനി' }
  },
  26: {
    nameTa: 'ரேவதி', nameEn: 'Revati', nameHi: 'रेवती',
    deity: { ta: 'பூஷா', en: 'Pushan (Nourisher Deity)', hi: 'पूषा', te: 'పూషుడు', kn: 'ಪೂಷ', ml: 'പൂഷാവ്' },
    tree: { ta: 'இலுப்பை', en: 'Mahua Tree (Iluppai)', hi: 'महुआ', te: 'ఇప్ప', kn: 'ಇಪ್ಪೆ ಮರ', ml: 'ഇരിപ്പ' },
    animal: { ta: 'யானை (பெண்)', en: 'Elephant (Female)', hi: 'गज (मादा)', te: 'ఏనుగు (స్త్రీ)', kn: 'ಆನೆ (ಹೆಣ್ಣು)', ml: 'ആന (പെൺ)' },
    bird: { ta: 'வல்லூறு', en: 'Falcon / Kestrel', hi: 'चील', te: 'డేగ', kn: 'ಗಿಡುಗ', ml: 'പ്രാപ്പിടിയൻ' },
    gana: { ta: 'தேவ கணம்', en: 'Deva Gana (Divine)', hi: 'देव गण', te: 'ದೇವ ಗణం', kn: 'ದೇವ ಗಣ', ml: 'ദേവ ಗണം' },
    yoniGender: { ta: 'பெண்', en: 'Female', hi: 'स्त्री', te: 'స్త్రీ', kn: 'ಸ್ತ್ರೀ', ml: 'സ്ത്രീ' },
    lord: { ta: 'புதன்', en: 'Mercury', hi: 'बुध', te: 'బుధుడు', kn: 'ಬುಧ', ml: 'ബുಧൻ' }
  }
};

function calculateSunriseSunset(year, month, day, latitude = 13.0827, longitude = 80.2707, tzOffsetHours = 5.5) {
  try {
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
    const zenithRad = 90.815 * (Math.PI / 180); // 90°49' calibrated for Indian ephemeris

    let cosHA = (Math.cos(zenithRad) - Math.sin(latRad) * Math.sin(decl)) / (Math.cos(latRad) * Math.cos(decl));
    cosHA = Math.max(-1, Math.min(1, cosHA));
    const haDeg = Math.acos(cosHA) * (180 / Math.PI);

    const solarNoonUTC = (720 - 4 * longitude - eqtime) / 60;
    const sunriseUTC = solarNoonUTC - (haDeg * 4) / 60;
    const sunsetUTC = solarNoonUTC + (haDeg * 4) / 60;

    const sunriseLocal = (sunriseUTC + tzOffsetHours + 24) % 24;
    const sunsetLocal = (sunsetUTC + tzOffsetHours + 24) % 24;

    const formatTime12 = (decHours) => {
      const totalSecs = Math.round(decHours * 3600);
      const h = Math.floor(totalSecs / 3600) % 24;
      const m = Math.floor((totalSecs % 3600) / 60);
      const ampm = h >= 12 ? 'PM' : 'AM';
      const h12 = h % 12 || 12;
      return `${String(h12).padStart(2, '0')}:${String(m).padStart(2, '0')} ${ampm}`;
    };

    return {
      sunrise: formatTime12(sunriseLocal),
      sunset: formatTime12(sunsetLocal)
    };
  } catch {
    return { sunrise: '06:00 AM', sunset: '06:22 PM' };
  }
}

function getLocalizedText(item, activeLang) {
  if (!item) return '';
  if (activeLang === 'en') return item.name || item.nameEn || item.nameTa || '';
  if (activeLang === 'ta') return item.nameTa || item.name || '';
  const langKey = `name${activeLang.charAt(0).toUpperCase() + activeLang.slice(1)}`;
  return item[langKey] || item.name || item.nameTa || '';
}

function getLocalizedField(fieldObj, activeLang) {
  if (!fieldObj) return '-';
  if (typeof fieldObj === 'string') return fieldObj;
  return fieldObj[activeLang] || fieldObj.en || fieldObj.ta || '-';
}

export function calculateBasicHoroscopeDetails({
  dob,
  tob,
  sunLongitude,
  moonLongitude,
  ascendantRasiId,
  latitude = 13.0827,
  longitude = 80.2707,
  lang = 'ta'
}) {
  const activeLang = ['ta', 'en', 'hi', 'te', 'kn', 'ml'].includes(lang) ? lang : 'ta';

  const [yearStr, monthStr, dayStr] = (dob || '2026-08-23').split('-');
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10);
  const day = parseInt(dayStr, 10);

  const dateObj = new Date(year, month - 1, day);
  const weekdayIndex = dateObj.getDay();
  const vaaram = (WEEKDAYS[activeLang] || WEEKDAYS.ta)[weekdayIndex];

  // 1. Month, Day and Year
  const sunRasiId = Math.floor(sunLongitude / 30);
  const sunDegInRasi = Math.floor(sunLongitude % 30) + 1;
  const monthObj = getTamilMonthDetails(sunRasiId) || TAMIL_MONTHS_DATA[sunRasiId] || { nameTa: 'ஆவணி', name: 'Aavani' };
  const localizedMonthName = getLocalizedText(monthObj, activeLang);

  const yearIndex = ((year - 1987) % 60 + 60) % 60;
  const yearObj = getTamilYearDetails(yearIndex) || TAMIL_YEARS_DATA[yearIndex] || { nameTa: 'பராபவ', name: 'Parabhava' };
  const localizedYearName = getLocalizedText(yearObj, activeLang);
  const tamilDate = `${localizedMonthName} ${sunDegInRasi}, ${localizedYearName}`;

  // 2. Nakshatra & Pada
  const nakshatraId = Math.floor(moonLongitude / (360 / 27));
  const nakshatraDeg = moonLongitude % (360 / 27);
  const pada = Math.floor(nakshatraDeg / (360 / 108)) + 1;
  const nakshatraData = NAKSHATRAS_DATA[nakshatraId] || NAKSHATRAS_DATA[0];
  const nakshatraMeta = NAKSHATRA_ATTRIBUTES[nakshatraId] || NAKSHATRA_ATTRIBUTES[0];
  const nakshatraName = getLocalizedText(nakshatraData, activeLang);
  const padaText = PADA_LABELS[activeLang]?.[pada] || (activeLang === 'en' ? `Pada ${pada}` : PADA_LABELS.ta[pada]);
  const nakshatraWithPada = `${nakshatraName} - ${padaText}`;

  // 3. Tithi
  const diffLong = ((moonLongitude - sunLongitude) + 360) % 360;
  const tithiIndex = Math.floor(diffLong / 12);
  const tithiObj = getTithiDetails(tithiIndex) || TITHIS_DATA[tithiIndex];
  const tithiName = getLocalizedText(tithiObj, activeLang) || (activeLang === 'en' ? 'Ekadashi' : 'ஏகாதசி');
  const pakshaText = tithiObj?.paksha === 'Shukla'
    ? (activeLang === 'ta' ? 'சுக்ல பட்சம்' : activeLang === 'hi' ? 'शुक्ल पक्ष' : activeLang === 'te' ? 'శుక్ల పక్షం' : activeLang === 'kn' ? 'ಶುಕ್ಲ ಪಕ್ಷ' : activeLang === 'ml' ? 'ശുക്ല പക്ഷം' : 'Shukla Paksha')
    : (activeLang === 'ta' ? 'கிருஷ்ண பட்சம்' : activeLang === 'hi' ? 'कृष्ण पक्ष' : activeLang === 'te' ? 'కృష్ణ పక్షం' : activeLang === 'kn' ? 'ಕೃಷ್ಣ ಪಕ್ಷ' : activeLang === 'ml' ? 'കൃഷ്ണ പക്ഷം' : 'Krishna Paksha');
  const tithi = `${tithiName} (${pakshaText})`;

  // 4. Yoga
  const sumLong = (sunLongitude + moonLongitude) % 360;
  const yogaIndex = Math.floor(sumLong / (360 / 27));
  const yogaObj = getYogaDetails(yogaIndex) || YOGAS_DATA[yogaIndex];
  const yogam = getLocalizedText(yogaObj, activeLang) || (activeLang === 'en' ? 'Priti' : 'பிரீதி');

  // 5. Karana
  const halfTithiIndex = Math.floor(diffLong / 6);
  let karanamObj;
  if (halfTithiIndex === 0) {
    karanamObj = getKaranaDetails(10) || KARANAS_DATA[10];
  } else if (halfTithiIndex >= 57) {
    const fixedMap = { 57: 7, 58: 8, 59: 9 };
    const kId = fixedMap[halfTithiIndex] || 7;
    karanamObj = getKaranaDetails(kId) || KARANAS_DATA[kId];
  } else {
    const charaIndex = (halfTithiIndex - 1) % 7;
    karanamObj = getKaranaDetails(charaIndex) || KARANAS_DATA[charaIndex];
  }
  const karanam = getLocalizedText(karanamObj, activeLang) || (activeLang === 'en' ? 'Vanija' : 'வணிசை');

  // 6. Rasi & Lagna
  const moonRasiId = Math.floor(moonLongitude / 30);
  const moonRasiObj = RASIS_DATA[moonRasiId];
  const rasi = getLocalizedText(moonRasiObj, activeLang) || (activeLang === 'en' ? 'Aries' : 'மேஷம்');
  const rasiLordObj = PLANETS_DATA.find(p => p.planetId === moonRasiObj?.athipathi?.planetId);
  const rasiLord = getLocalizedText(rasiLordObj, activeLang) || (activeLang === 'en' ? 'Mars' : 'செவ்வாய்');

  const lagnaRasiId = ascendantRasiId ?? 6;
  const lagnaRasiObj = RASIS_DATA[lagnaRasiId];
  const lagna = getLocalizedText(lagnaRasiObj, activeLang) || (activeLang === 'en' ? 'Libra' : 'துலாம்');
  const lagnaLordObj = PLANETS_DATA.find(p => p.planetId === lagnaRasiObj?.athipathi?.planetId);
  const lagnaLord = getLocalizedText(lagnaLordObj, activeLang) || (activeLang === 'en' ? 'Venus' : 'சுக்கிரன்');

  const { sunrise, sunset } = calculateSunriseSunset(year, month, day, latitude, longitude, 5.5);

  return {
    tamilDate,
    tamilMonthId: sunRasiId,
    tamilMonthName: localizedMonthName,
    tamilDay: sunDegInRasi,
    tamilYearId: yearIndex,
    tamilYearName: localizedYearName,
    nakshatraWithPada,
    nakshatraName,
    pada,
    vaaram,
    tithi,
    tithiId: tithiIndex,
    yogam,
    yogaId: yogaIndex,
    karanam,
    karanamId: karanamObj ? karanamObj.karanaId : 5,
    nakshatraLord: getLocalizedField(nakshatraMeta.lord, activeLang),
    nakshatraDeity: getLocalizedField(nakshatraMeta.deity, activeLang),
    animal: getLocalizedField(nakshatraMeta.animal, activeLang),
    rasi,
    rasiLord,
    lagna,
    lagnaLord,
    tree: getLocalizedField(nakshatraMeta.tree, activeLang),
    gana: getLocalizedField(nakshatraMeta.gana, activeLang),
    bird: getLocalizedField(nakshatraMeta.bird, activeLang),
    yoniGender: getLocalizedField(nakshatraMeta.yoniGender, activeLang),
    sunrise,
    sunset
  };
}

// --------------------------------------------------------------------------
// Daily Panchangam (இன்றைய பஞ்சாங்கம்) Master Data & Calculation Engine
// --------------------------------------------------------------------------

// Classical Tamil Thirukanitha Dina Yoga Rules (திருக்கணித தின யோக விதி):
// 27 Nakshatras: 0: Ashwini, 1: Bharani, 2: Krittika, 3: Rohini, 4: Mrigashirsha, 5: Ardra, 6: Punarvasu, 7: Pushya, 8: Ashlesha,
// 9: Magha, 10: Purva Phalguni, 11: Uttara Phalguni, 12: Hasta, 13: Chitra, 14: Swati, 15: Vishakha, 16: Anuradha, 17: Jyeshtha,
// 18: Mula, 19: Purva Ashadha, 20: Uttara Ashadha, 21: Shravana, 22: Dhanishta, 23: Shatabhisha, 24: Purva Bhadrapada, 25: Uttara Bhadrapada, 26: Revati.
const DINA_YOGA_RULES = {
  0: { amrita: [19], marana: [1, 15, 25] },         // Sun (ஞாயிறு): Amrita = P.Ashadha; Marana = Bharani, Vishakha, U.Bhadrapada
  1: { amrita: [22], marana: [11, 19] },            // Mon (திங்கள்): Amrita = Dhanishta; Marana = U.Phalguni, P.Ashadha
  2: { amrita: [10], marana: [1, 21, 23] },         // Tue (செவ்வாய்): Amrita = P.Phalguni; Marana = Bharani, Shravana, Shatabhisha
  3: { amrita: [0, 2], marana: [17, 24] },          // Wed (புதன்): Amrita = Ashwini, Krittika; Marana = Jyeshtha, P.Bhadrapada
  4: { amrita: [3, 6], marana: [4, 5] },            // Thu (வியாழன்): Amrita = Rohini, Punarvasu; Marana = Mrigashirsha, Ardra
  5: { amrita: [21, 26], marana: [3, 7] },          // Fri (வெள்ளி): Amrita = Shravana, Revati; Marana = Rohini, Pushya
  6: { amrita: [16, 21], marana: [0, 20, 26] }      // Sat (சனி): Amrita = Anuradha, Shravana; Marana = Ashwini, U.Ashadha, Revati
};

const DISHA_SOOLAM_DATA = {
  0: { direction: { ta: 'மேற்கு', en: 'West', hi: 'पश्चिम', te: 'పడమర', kn: 'ಪಶ್ಚಿಮ', ml: 'പടിഞ്ഞാറ്' }, pariharam: { ta: 'வெல்லம்', en: 'Jaggery', hi: 'गुड़', te: 'బెల్లం', kn: 'ಬೆಲ್ಲ', ml: 'ശർക്കര' } },
  1: { direction: { ta: 'கிழக்கு', en: 'East', hi: 'पूर्व', te: 'తూర్పు', kn: 'ಪೂರ್ವ', ml: 'കിഴക്ക്' }, pariharam: { ta: 'தயிர்', en: 'Curd', hi: 'दही', te: 'పెరుగు', kn: 'ಮೊಸರು', ml: 'തൈര്' } },
  2: { direction: { ta: 'வடக்கு', en: 'North', hi: 'उत्तर', te: 'ఉత్తరం', kn: 'ಉತ್ತರ', ml: 'വടക്ക്' }, pariharam: { ta: 'பால்', en: 'Milk', hi: 'दूध', te: 'పాలు', kn: 'ಹಾಲು', ml: 'പാൽ' } },
  3: { direction: { ta: 'வடக்கு', en: 'North', hi: 'उत्तर', te: 'ఉత్తరం', kn: 'ಉತ್ತர', ml: 'വടക്ക്' }, pariharam: { ta: 'பால்', en: 'Milk', hi: 'दूध', te: 'పాలు', kn: 'ಹಾಲು', ml: 'പാൽ' } },
  4: { direction: { ta: 'தெற்கு', en: 'South', hi: 'दक्षिण', te: 'దక్షిణం', kn: 'ದಕ್ಷಿಣ', ml: 'തെക്ക്' }, pariharam: { ta: 'தைலம் / நெய்', en: 'Oil / Ghee', hi: 'तेल / घी', te: 'నూనె / నెయ్యి', kn: 'ತೈಲ / ತುಪ್ಪ', ml: 'നെയ്യ് / എണ്ണ' } },
  5: { direction: { ta: 'மேற்கு', en: 'West', hi: 'पश्चिम', te: 'పడమర', kn: 'ಪಶ್ಚಿಮ', ml: 'പടിഞ്ഞാറ്' }, pariharam: { ta: 'வெல்லம்', en: 'Jaggery', hi: 'गुड़', te: 'బెల్లం', kn: 'ಬೆಲ್ಲ', ml: 'ശർക്കര' } },
  6: { direction: { ta: 'கிழக்கு', en: 'East', hi: 'पूर्व', te: 'తూర్పు', kn: 'ಪೂರ್ವ', ml: 'കിഴക്ക്' }, pariharam: { ta: 'தயிர்', en: 'Curd', hi: 'दही', te: 'పెరుగు', kn: 'ಮೊಸರು', ml: 'തൈര്' } }
};

const AYANAMS_DATA = {
  uttarayana: {
    ta: 'உத்தராயணம்',
    en: 'Uttarayana',
    hi: 'उत्तरायण',
    te: 'ఉత్తరాయణం',
    kn: 'ಉತ್ತರಾಯಣ',
    ml: 'ഉത്തരായനം'
  },
  dakshinayana: {
    ta: 'தட்சிணாயனம்',
    en: 'Dakshinayana',
    hi: 'दक्षिणायन',
    te: 'దక్షిణాయనం',
    kn: 'ದಕ್ಷಿಣಾಯನ',
    ml: 'ദക്ഷിണായനം'
  }
};

const RUTHUS_DATA = [
  { ta: 'வசந்த ருது', en: 'Vasanta Ritu (Spring)', hi: 'वसन्त ऋतु', te: 'వసంత ఋతువు', kn: 'ವಸಂತ ಋತು', ml: 'വസന്ത ഋതു' },
  { ta: 'கிரீஷ்ம ருது', en: 'Grishma Ritu (Summer)', hi: 'ग्रीष्म ऋतु', te: 'గ్రీష్మ ఋతువు', kn: 'ಗ್ರೀಷ್ಮ ಋತು', ml: 'ഗ്രീഷ്മ ഋതു' },
  { ta: 'வர்ஷ ருது', en: 'Varsha Ritu (Monsoon)', hi: 'वर्षा ऋतु', te: 'వర్ష ఋతువు', kn: 'ವರ್ಷ ಋತು', ml: 'വർഷ ഋതു' },
  { ta: 'சரத் ருது', en: 'Sharad Ritu (Autumn)', hi: 'शरद् ऋतु', te: 'శరద్ ఋతువు', kn: 'ಶರದ್ ಋತು', ml: 'ശരദ് ഋതു' },
  { ta: 'ஹேமந்த ருது', en: 'Hemanta Ritu (Pre-Winter)', hi: 'हेमन्त ऋतु', te: 'హేమంత ఋతువు', kn: 'ಹೇಮಂತ ಋತು', ml: 'ഹേമന്ത ഋതു' },
  { ta: 'சிசிர ருது', en: 'Shishira Ritu (Winter)', hi: 'शिशिर ऋतु', te: 'శిశిర ఋతువు', kn: 'ಶಿಶಿರ ಋತು', ml: 'ശിശിര ഋതു' }
];

const NALLA_NERAM_TABLE = {
  0: { morning: '07:30 AM - 08:30 AM', evening: '03:30 PM - 04:30 PM' },
  1: { morning: '06:30 AM - 07:30 AM', evening: '04:30 PM - 05:30 PM' },
  2: { morning: '07:30 AM - 08:30 AM', evening: '04:30 PM - 05:30 PM' },
  3: { morning: '09:30 AM - 10:30 AM', evening: '04:30 PM - 05:30 PM' },
  4: { morning: '09:30 AM - 10:30 AM', evening: '04:30 PM - 05:30 PM' },
  5: { morning: '09:30 AM - 10:30 AM', evening: '04:30 PM - 05:30 PM' },
  6: { morning: '07:30 AM - 08:30 AM', evening: '04:30 PM - 05:30 PM' }
};

const GOWRI_NALLA_NERAM_TABLE = {
  0: { morning: '10:30 AM - 11:30 AM', evening: '01:30 PM - 02:30 PM' },
  1: { morning: '09:30 AM - 10:30 AM', evening: '07:30 PM - 08:30 PM' },
  2: { morning: '10:30 AM - 11:30 AM', evening: '07:30 PM - 08:30 PM' },
  3: { morning: '09:30 AM - 10:30 AM', evening: '01:30 PM - 02:30 PM' },
  4: { morning: '10:30 AM - 11:30 AM', evening: '07:30 PM - 08:30 PM' },
  5: { morning: '09:30 AM - 10:30 AM', evening: '07:30 PM - 08:30 PM' },
  6: { morning: '10:30 AM - 11:30 AM', evening: '07:30 PM - 08:30 PM' }
};

const DURMUHURTHAM_TABLE = {
  0: ['04:30 PM - 05:18 PM'],
  1: ['12:30 PM - 01:18 PM', '02:54 PM - 03:42 PM'],
  2: ['08:30 AM - 09:18 AM', '11:06 PM - 11:54 PM'],
  3: ['11:42 AM - 12:30 PM'],
  4: ['10:06 AM - 10:54 AM', '02:54 PM - 03:42 PM'],
  5: ['08:30 AM - 09:18 AM', '12:30 PM - 01:18 PM'],
  6: ['07:42 AM - 08:30 AM']
};

const RAHU_SEGMENT_INDEX = [7, 1, 6, 4, 5, 3, 2];
const YAMA_SEGMENT_INDEX = [4, 3, 2, 1, 0, 6, 5];
const KULI_SEGMENT_INDEX = [6, 5, 4, 3, 2, 1, 0];

// Classical Varjyam / Tyajyam (தியாஜ்யம்) starting ghatis for each of the 27 Nakshatras (0: Ashwini to 26: Revati)
// Standard Varjyam duration is 4 ghatis (scaled to nakshatra duration).
const VARJYAM_START_GHATIS = [
  50, 24, 30, 40, 14, 21, 30, 20, 32, // 0: Ashwini, 1: Bharani, 2: Krittika, 3: Rohini, 4: Mrigashirsha, 5: Ardra, 6: Punarvasu, 7: Pushya, 8: Ashlesha
  30, 20, 18, 21, 20, 14, 14, 10, 14, // 9: Magha, 10: P.Phalguni, 11: U.Phalguni, 12: Hasta, 13: Chitra, 14: Swati, 15: Vishakha, 16: Anuradha, 17: Jyeshtha
  56, 24, 20, 10, 10, 18, 16, 24, 30  // 18: Mula, 19: P.Ashadha, 20: U.Ashadha, 21: Shravana, 22: Dhanishta, 23: Shatabhisha, 24: P.Bhadrapada, 25: U.Bhadrapada, 26: Revati
];

const HORA_PLANETS_ORDER = [
  { key: 'Sun', ta: 'சூரியன்', en: 'Sun', hi: 'सूर्य', te: 'సూర్యుడు', kn: 'ಸೂರ್ಯ', ml: 'സൂര്യൻ', isAuspicious: false, natureTa: 'மத்திமம்', natureEn: 'Moderate', suitableTa: 'அரசுப் பணிகள், உயர் அதிகாரிகள் சந்திப்பு, ஆன்மிகம்', suitableEn: 'Government affairs, meeting dignitaries, spiritual activities' },
  { key: 'Venus', ta: 'சுக்கிரன்', en: 'Venus', hi: 'शुक्र', te: 'శుక్రుడు', kn: 'ಶುಕ್ರ', ml: 'ശുക്രൻ', isAuspicious: true, natureTa: 'சுபம்', natureEn: 'Auspicious', suitableTa: 'ஆடை, ஆபரணம், கலை, வாகனங்கள், சுப காரியங்கள்', suitableEn: 'Clothing, jewelry, arts, vehicles, auspicious events' },
  { key: 'Mercury', ta: 'புதன்', en: 'Mercury', hi: 'बुध', te: 'బుధుడు', kn: 'ಬುಧ', ml: 'ബുധன்', isAuspicious: true, natureTa: 'சுபம்', natureEn: 'Auspicious', suitableTa: 'கல்வி, வியாபாரம், கணக்கு, எழுத்து, ஒப்பந்தங்கள்', suitableEn: 'Education, commerce, accounts, writing, agreements' },
  { key: 'Moon', ta: 'சந்திரன்', en: 'Moon', hi: 'चन्द्र', te: 'చంద్రుడు', kn: 'ಚಂದ್ರ', ml: 'ചന്ദ്രൻ', isAuspicious: true, natureTa: 'சுபம்', natureEn: 'Auspicious', suitableTa: 'பயணம், உணவு, நீர் பணிகள், பொது நலம்', suitableEn: 'Travel, food, water activities, public welfare' },
  { key: 'Saturn', ta: 'சனி', en: 'Saturn', hi: 'शनि', te: 'శని', kn: 'ಶನಿ', ml: 'ശനി', isAuspicious: false, natureTa: 'அசுபம்', natureEn: 'Inauspicious', suitableTa: 'இரும்பு, பழைய பொருட்கள், கடனை அடைக்க, சுபங்களைத் தவிர்க்கவும்', suitableEn: 'Iron, disposal of old items, debt clearance; avoid auspicious events' },
  { key: 'Jupiter', ta: 'குரு', en: 'Jupiter', hi: 'गुरु', te: 'గురుడు', kn: 'ಗುರು', ml: 'വ്യാഴം', isAuspicious: true, natureTa: 'மிகவும் சுபம்', natureEn: 'Highly Auspicious', suitableTa: 'திருமணம், புதிய தொடக்கங்கள், பொன் வாங்குதல், ஆன்மிகம்', suitableEn: 'Weddings, new ventures, purchasing gold, spiritual rites' },
  { key: 'Mars', ta: 'செவ்வாய்', en: 'Mars', hi: 'मंगल', te: 'కుజుడు', kn: 'ಮಂಗಳ', ml: 'ചൊവ്വ', isAuspicious: false, natureTa: 'கடினம்', natureEn: 'Challenging', suitableTa: 'பூமி வாங்குதல், இயந்திரப் பணிகள், வழக்கு; சுபங்களைத் தவிர்க்கவும்', suitableEn: 'Land purchase, mechanical works, legal affairs; avoid auspicious events' }
];

const DAY_HORA_START_INDEX = [0, 3, 6, 2, 5, 1, 4];

const GOWRI_PANCHANGAM_DAY = [
  ['Uthi', 'Amirtham', 'Rogam', 'Labam', 'Dhanam', 'Visham', 'Sobam', 'Pilli'],
  ['Amirtham', 'Rogam', 'Labam', 'Dhanam', 'Visham', 'Sobam', 'Pilli', 'Uthi'],
  ['Rogam', 'Labam', 'Dhanam', 'Visham', 'Sobam', 'Pilli', 'Uthi', 'Amirtham'],
  ['Labam', 'Dhanam', 'Visham', 'Sobam', 'Pilli', 'Uthi', 'Amirtham', 'Rogam'],
  ['Dhanam', 'Visham', 'Sobam', 'Pilli', 'Uthi', 'Amirtham', 'Rogam', 'Labam'],
  ['Visham', 'Sobam', 'Pilli', 'Uthi', 'Amirtham', 'Rogam', 'Labam', 'Dhanam'],
  ['Sobam', 'Pilli', 'Uthi', 'Amirtham', 'Rogam', 'Labam', 'Dhanam', 'Visham']
];

const GOWRI_PANCHANGAM_NIGHT = [
  ['Sobam', 'Pilli', 'Uthi', 'Amirtham', 'Rogam', 'Labam', 'Dhanam', 'Visham'],
  ['Visham', 'Sobam', 'Pilli', 'Uthi', 'Amirtham', 'Rogam', 'Labam', 'Dhanam'],
  ['Dhanam', 'Visham', 'Sobam', 'Pilli', 'Uthi', 'Amirtham', 'Rogam', 'Labam'],
  ['Rogam', 'Labam', 'Dhanam', 'Visham', 'Sobam', 'Pilli', 'Uthi', 'Amirtham'],
  ['Labam', 'Dhanam', 'Visham', 'Sobam', 'Pilli', 'Uthi', 'Amirtham', 'Rogam'],
  ['Amirtham', 'Rogam', 'Labam', 'Dhanam', 'Visham', 'Sobam', 'Pilli', 'Uthi'],
  ['Uthi', 'Amirtham', 'Rogam', 'Labam', 'Dhanam', 'Visham', 'Sobam', 'Pilli']
];

const GOWRI_METADATA = {
  Uthi: { key: 'Uthi', ta: 'உத்தி', en: 'Uthi', hi: 'उत्थि', te: 'ఉత్తి', kn: 'ಉತ್ತಿ', ml: 'ഉത്തി', isAuspicious: false, natureTa: 'மத்திமம்', natureEn: 'Moderate', descTa: 'பயனற்றது, மத்திம பலன்', descEn: 'Idle, moderate outcomes' },
  Amirtham: { key: 'Amirtham', ta: 'அமிர்தம்', en: 'Amirtham', hi: 'अमृत', te: 'అమృతం', kn: 'ಅಮೃತ', ml: 'അമൃതം', isAuspicious: true, natureTa: 'அதி சுபம்', natureEn: 'Highly Auspicious', descTa: 'அனைத்து சுப காரியங்களுக்கும் மிகச் சிறந்தது', descEn: 'Highly favorable for all auspicious beginnings' },
  Rogam: { key: 'Rogam', ta: 'ரோகம்', en: 'Rogam', hi: 'रोग', te: 'రోగం', kn: 'ರೋಗ', ml: 'രോഗം', isAuspicious: false, natureTa: 'அசுபம்', natureEn: 'Inauspicious', descTa: 'நோயுண்டாகும், விரயம் ஏற்படும், தவிர்க்கவும்', descEn: 'Risk of illness or loss, best avoided' },
  Labam: { key: 'Labam', ta: 'லாபம்', en: 'Labam', hi: 'लाभ', te: 'లాభం', kn: 'ಲಾಭ', ml: 'ലാഭം', isAuspicious: true, natureTa: 'சுபம்', natureEn: 'Auspicious', descTa: 'லாபகரமானது, புதிய தொடக்கங்களுக்கு நல்லது', descEn: 'Profitable, excellent for new ventures' },
  Dhanam: { key: 'Dhanam', ta: 'தனம்', en: 'Dhanam', hi: 'धन', te: 'ధనం', kn: 'ಧನ', ml: 'ധനം', isAuspicious: true, natureTa: 'சுபம்', natureEn: 'Auspicious', descTa: 'பண வரவு, தன சேர்க்கைக்கு சிறந்தது', descEn: 'Wealth gain and financial prosperity' },
  Visham: { key: 'Visham', ta: 'விஷம்', en: 'Visham', hi: 'विष', te: 'విషం', kn: 'ವಿಷ', ml: 'വിಷം', isAuspicious: false, natureTa: 'அசுபம்', natureEn: 'Inauspicious', descTa: 'கவலை, நஷ்டம், புதிய காரியங்களைத் தவிர்க்கவும்', descEn: 'Anxiety and setbacks, strictly avoid' },
  Sobam: { key: 'Sobam', ta: 'சோபம்', en: 'Sobam', hi: 'शुभ', te: 'శోభనం', kn: 'ಶೋಭನ', ml: 'ശോഭം', isAuspicious: true, natureTa: 'சுபம்', natureEn: 'Auspicious', descTa: 'மங்களமானது, திருமண காரியங்களுக்கு உகந்தது', descEn: 'Splendid and harmonious, ideal for ceremonies' },
  Pilli: { key: 'Pilli', ta: 'பில்லி', en: 'Pilli', hi: 'पिल्ली', te: 'పిల్లి', kn: 'ಪಿಲ್ಲಿ', ml: 'പില്ലി', isAuspicious: false, natureTa: 'அசுபம்', natureEn: 'Inauspicious', descTa: 'தடைகள், சங்கடங்கள் ஏற்படும், தவிர்க்கவும்', descEn: 'Obstacles and delays, avoid important tasks' }
};

const CHANDRASHTAMA_STARS = {
  0: { ta: ['அஸ்வினி', 'பரணி', 'கார்த்திகை (1-ம் பாதம்)'], en: ['Ashwini', 'Bharani', 'Krittika (Pada 1)'] },
  1: { ta: ['கார்த்திகை (2, 3, 4-ம் பாதம்)', 'ரோகிணி', 'மிருகசீரிஷம் (1, 2-ம் பாதம்)'], en: ['Krittika (Pada 2, 3, 4)', 'Rohini', 'Mrigashirsha (Pada 1, 2)'] },
  2: { ta: ['மிருகசீரிஷம் (3, 4-ம் பாதம்)', 'திருவாதிரை', 'புனர்பூசம் (1, 2, 3-ம் பாதம்)'], en: ['Mrigashirsha (Pada 3, 4)', 'Ardra', 'Punarvasu (Pada 1, 2, 3)'] },
  3: { ta: ['புனர்பூசம் (4-ம் பாதம்)', 'பூசம்', 'ஆயில்யம்'], en: ['Punarvasu (Pada 4)', 'Pushya', 'Ashlesha'] },
  4: { ta: ['மகம்', 'பூரம்', 'உத்திரம் (1-ம் பாதம்)'], en: ['Magha', 'Purva Phalguni', 'Uttara Phalguni (Pada 1)'] },
  5: { ta: ['உத்திரம் (2, 3, 4-ம் பாதம்)', 'ஹஸ்தம்', 'சித்திரை (1, 2-ம் பாதம்)'], en: ['Uttara Phalguni (Pada 2, 3, 4)', 'Hasta', 'Chitra (Pada 1, 2)'] },
  6: { ta: ['சித்திரை (3, 4-ம் பாதம்)', 'சுவாதி', 'விசாகம் (1, 2, 3-ம் பாதம்)'], en: ['Chitra (Pada 3, 4)', 'Swati', 'Vishakha (Pada 1, 2, 3)'] },
  7: { ta: ['விசாகம் (4-ம் பாதம்)', 'அனுஷம்', 'கேட்டை'], en: ['Vishakha (Pada 4)', 'Anuradha', 'Jyeshtha'] },
  8: { ta: ['மூலம்', 'பூராடம்', 'உத்திராடம் (1-ம் பாதம்)'], en: ['Mula', 'Purva Ashadha', 'Uttara Ashadha (Pada 1)'] },
  9: { ta: ['உத்திராடம் (2, 3, 4-ம் பாதம்)', 'திருவோணம்', 'அவிட்டம் (1, 2-ம் பாதம்)'], en: ['Uttara Ashadha (Pada 2, 3, 4)', 'Shravana', 'Dhanishta (Pada 1, 2)'] },
  10: { ta: ['அவிட்டம் (3, 4-ம் பாதம்)', 'சதயம்', 'பூரட்டாதி (1, 2, 3-ம் பாதம்)'], en: ['Dhanishta (Pada 3, 4)', 'Shatabhisha', 'Purva Bhadrapada (Pada 1, 2, 3)'] },
  11: { ta: ['பூரட்டாதி (4-ம் பாதம்)', 'உத்திரட்டாதி', 'ரேவதி'], en: ['Purva Bhadrapada (Pada 4)', 'Uttara Bhadrapada', 'Revati'] }
};

const SANSKRIT_VAARAM = ['Ravivara', 'Somavara', 'Mangalavara', 'Budhavara', 'Guruvara', 'Shukravara', 'Shanivara'];

function calculateHijriDate(dateObj) {
  const y = dateObj.getFullYear();
  const m = dateObj.getMonth() + 1;
  const d = dateObj.getDate();

  let a = Math.floor((14 - m) / 12);
  let yj = y + 4800 - a;
  let mj = m + 12 * a - 3;
  let jd = d + Math.floor((153 * mj + 2) / 5) + 365 * yj + Math.floor(yj / 4) - Math.floor(yj / 100) + Math.floor(yj / 400) - 32045;

  let l = jd - 1948440 + 10632;
  let n = Math.floor((l - 1) / 10631);
  l = l - 10631 * n + 354;
  let j = (Math.floor((10985 - l) / 5316)) * (Math.floor((50 * l) / 17719)) + (Math.floor(l / 5670)) * (Math.floor((43 * l) / 15238));
  l = l - (Math.floor((30 - j) / 15)) * (Math.floor((17719 * j) / 50)) - (Math.floor(j / 16)) * (Math.floor((15238 * j) / 43)) + 29;
  let month = Math.floor((24 * l) / 709);
  let day = l - Math.floor((709 * month) / 24);
  let year = 30 * n + j - 30;

  const ISLAMIC_MONTHS = [
    { en: 'Muharram', ta: 'முஹர்ரம்' },
    { en: 'Safar', ta: 'ஸஃபர்' },
    { en: 'Rabi al-Awwal', ta: 'ரபீஉல் அவ்வல்' },
    { en: 'Rabi al-Thani', ta: 'ரபீஉஸ் ஸானி' },
    { en: 'Jumada al-Awwal', ta: 'ஜமாதல் அவ்வல்' },
    { en: 'Jumada al-Thani', ta: 'ஜமாதஸ் ஸானி' },
    { en: 'Rajab', ta: 'ரஜப்' },
    { en: 'Sha\'ban', ta: 'ஷஃபான்' },
    { en: 'Ramadan', ta: 'ரமலான்' },
    { en: 'Shawwal', ta: 'ஷவ்வால்' },
    { en: 'Dhu al-Qi\'dah', ta: 'துல் கஃதா' },
    { en: 'Dhu al-Hijjah', ta: 'துல் ஹஜ்' }
  ];
  const mObj = ISLAMIC_MONTHS[Math.max(0, Math.min(11, month - 1))] || ISLAMIC_MONTHS[0];
  return {
    day,
    month,
    year,
    monthEn: mObj.en,
    monthTa: mObj.ta,
    formattedEn: `${day} ${mObj.en} ${year}`,
    formattedTa: `${day} ${mObj.ta} ${year}`
  };
}

// --------------------------------------------------------------------------
// Subha Muhurtham (சுப முகூர்த்தம்) - Authentic Tamil Calendar Records & Classical Rules
// --------------------------------------------------------------------------

/**
 * Standard Authentic Tamil Calendar Vivaha Subha Muhurtham Dates (சுபமுகூர்த்த நாட்கள்)
 * Direct transcription from authentic Tamil Panchangams & Wall Calendars
 * (e.g., ஸ்ரீ விசுவாவசு - ஸ்ரீ பராபவ வருடம் 2026)
 * Each date includes day and whether it is Valarpirai (yellow circle 🟡 in calendar)
 */
export const STANDARD_TAMIL_MUHURTHAM_CALENDAR = {
  2025: {
    1: [{ day: 19, isValarpirai: false }, { day: 20, isValarpirai: false }, { day: 31, isValarpirai: true }],
    2: [{ day: 2, isValarpirai: true }, { day: 3, isValarpirai: true }, { day: 10, isValarpirai: true }, { day: 16, isValarpirai: false }, { day: 17, isValarpirai: false }, { day: 23, isValarpirai: false }, { day: 26, isValarpirai: false }],
    3: [{ day: 2, isValarpirai: true }, { day: 3, isValarpirai: true }, { day: 9, isValarpirai: true }, { day: 10, isValarpirai: true }, { day: 12, isValarpirai: true }, { day: 16, isValarpirai: false }, { day: 17, isValarpirai: false }],
    4: [{ day: 4, isValarpirai: true }, { day: 7, isValarpirai: true }, { day: 9, isValarpirai: true }, { day: 11, isValarpirai: true }, { day: 16, isValarpirai: false }, { day: 18, isValarpirai: false }, { day: 23, isValarpirai: false }, { day: 25, isValarpirai: false }, { day: 30, isValarpirai: true }],
    5: [{ day: 4, isValarpirai: true }, { day: 9, isValarpirai: true }, { day: 11, isValarpirai: true }, { day: 14, isValarpirai: false }, { day: 16, isValarpirai: false }, { day: 18, isValarpirai: false }, { day: 19, isValarpirai: false }, { day: 23, isValarpirai: false }, { day: 28, isValarpirai: true }],
    6: [{ day: 5, isValarpirai: false }, { day: 6, isValarpirai: false }, { day: 8, isValarpirai: false }, { day: 16, isValarpirai: false }, { day: 27, isValarpirai: false }],
    7: [{ day: 2, isValarpirai: false }, { day: 7, isValarpirai: false }, { day: 13, isValarpirai: false }, { day: 14, isValarpirai: false }, { day: 16, isValarpirai: false }],
    8: [{ day: 20, isValarpirai: false }, { day: 21, isValarpirai: false }, { day: 27, isValarpirai: false }, { day: 28, isValarpirai: true }, { day: 29, isValarpirai: false }],
    9: [{ day: 4, isValarpirai: false }, { day: 14, isValarpirai: false }],
    10: [{ day: 24, isValarpirai: true }, { day: 31, isValarpirai: true }],
    11: [{ day: 3, isValarpirai: false }, { day: 10, isValarpirai: false }, { day: 16, isValarpirai: false }, { day: 23, isValarpirai: false }, { day: 27, isValarpirai: true }, { day: 30, isValarpirai: true }],
    12: [{ day: 1, isValarpirai: false }, { day: 8, isValarpirai: false }, { day: 10, isValarpirai: false }, { day: 14, isValarpirai: false }, { day: 15, isValarpirai: false }]
  },
  2026: {
    1: [ // ஜனவரி
      { day: 28, isValarpirai: true }
    ],
    2: [ // பிப்ரவரி
      { day: 6, isValarpirai: false },
      { day: 8, isValarpirai: false },
      { day: 13, isValarpirai: false },
      { day: 15, isValarpirai: false },
      { day: 16, isValarpirai: false },
      { day: 20, isValarpirai: true }
    ],
    3: [ // மார்ச்
      { day: 5, isValarpirai: false },
      { day: 6, isValarpirai: false },
      { day: 8, isValarpirai: false },
      { day: 15, isValarpirai: false },
      { day: 16, isValarpirai: false },
      { day: 25, isValarpirai: true }
    ],
    4: [ // ஏப்ரல்
      { day: 6, isValarpirai: false },
      { day: 12, isValarpirai: false },
      { day: 13, isValarpirai: false },
      { day: 16, isValarpirai: false },
      { day: 20, isValarpirai: true },
      { day: 23, isValarpirai: true },
      { day: 30, isValarpirai: true }
    ],
    5: [ // மே
      { day: 8, isValarpirai: false },
      { day: 13, isValarpirai: false },
      { day: 14, isValarpirai: false },
      { day: 18, isValarpirai: true },
      { day: 28, isValarpirai: true },
      { day: 29, isValarpirai: true }
    ],
    6: [ // ஜூன்
      { day: 4, isValarpirai: false },
      { day: 7, isValarpirai: false },
      { day: 17, isValarpirai: false },
      { day: 18, isValarpirai: true },
      { day: 24, isValarpirai: true },
      { day: 25, isValarpirai: true }
    ],
    7: [ // ஜூலை
      { day: 2, isValarpirai: false },
      { day: 5, isValarpirai: false },
      { day: 12, isValarpirai: false }
    ],
    8: [ // ஆகஸ்ட்
      { day: 23, isValarpirai: true },
      { day: 30, isValarpirai: false },
      { day: 31, isValarpirai: false }
    ],
    9: [ // செப்டம்பர்
      { day: 7, isValarpirai: false },
      { day: 13, isValarpirai: true },
      { day: 17, isValarpirai: true }
    ],
    10: [ // அக்டோபர்
      { day: 25, isValarpirai: true },
      { day: 30, isValarpirai: false }
    ],
    11: [ // நவம்பர்
      { day: 1, isValarpirai: false },
      { day: 11, isValarpirai: true },
      { day: 13, isValarpirai: true },
      { day: 15, isValarpirai: true },
      { day: 16, isValarpirai: true },
      { day: 20, isValarpirai: true },
      { day: 29, isValarpirai: false }
    ],
    12: [ // டிசம்பர்
      { day: 4, isValarpirai: false },
      { day: 6, isValarpirai: false },
      { day: 10, isValarpirai: true },
      { day: 13, isValarpirai: true },
      { day: 14, isValarpirai: true }
    ]
  },
  2027: {
    1: [{ day: 20, isValarpirai: true }, { day: 28, isValarpirai: true }],
    2: [{ day: 1, isValarpirai: false }, { day: 5, isValarpirai: false }, { day: 8, isValarpirai: true }, { day: 10, isValarpirai: true }, { day: 11, isValarpirai: true }, { day: 18, isValarpirai: true }, { day: 25, isValarpirai: false }, { day: 26, isValarpirai: false }],
    3: [{ day: 4, isValarpirai: false }, { day: 10, isValarpirai: true }, { day: 11, isValarpirai: true }, { day: 17, isValarpirai: true }, { day: 18, isValarpirai: true }, { day: 24, isValarpirai: false }, { day: 25, isValarpirai: false }]
  }
};

const AUSPICIOUS_VIVAHA_MONTHS = [0, 1, 2, 4, 6, 7, 9, 10, 11]; // Chithirai, Vaikasi, Aani, Aavani, Aippasi, Karthigai, Thai, Maasi, Panguni
const AUSPICIOUS_VIVAHA_WEEKDAYS = [0, 1, 3, 4, 5]; // Sun, Mon, Wed, Thu, Fri (Tue 2 & Sat 6 strictly prohibited)
const AUSPICIOUS_VIVAHA_NAKSHATRAS = [0, 3, 4, 6, 7, 9, 11, 12, 13, 14, 16, 18, 20, 21, 22, 23, 25, 26];
const PROHIBITED_VIVAHA_NAKSHATRAS = [1, 2, 5, 8, 10, 15, 17, 19, 24]; // Bharani, Krittika, Ardra, Ashlesha, P.Phalguni, Vishakha, Jyeshtha, P.Ashadha, P.Bhadrapada
const AUSPICIOUS_VIVAHA_RASIS = [1, 2, 3, 4, 5, 6, 8, 10, 11]; // Rishabam, Mithunam, Katakam, Simham, Kanya, Thulam, Dhanus, Kumbham, Meenam

const TAMIL_MONTH_NAMES_SHORT = ['ஜனவரி', 'பிப்ரவரி', 'மார்ச்', 'ஏப்ரல்', 'மே', 'ஜூன்', 'ஜூலை', 'ஆகஸ்ட்', 'செப்டம்பர்', 'அக்டோபர்', 'நவம்பர்', 'டிசம்பர்'];
const ENG_MONTH_NAMES_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function checkSubhaMuhurthamDayFast(dateObj) {
  const y = dateObj.getFullYear();
  const m = dateObj.getMonth() + 1;
  const d = dateObj.getDate();
  const weekday = dateObj.getDay();

  // 1. Authoritative Tamil Calendar Check (when available for the given year/month)
  const yearData = STANDARD_TAMIL_MUHURTHAM_CALENDAR[y];
  if (yearData && yearData[m]) {
    const monthList = yearData[m];
    const match = monthList.find((item) => item.day === d);
    if (!match) return false;

    // Retrieve astronomical coordinates for accurate Tithi, Nakshatra, and Tamil Date calculation
    const jd = swe.julday ? swe.julday(y, m, d, 6.0 - 5.5, 1) : 2460000;
    if (swe.set_sid_mode) swe.set_sid_mode(swe.SE_SIDM_LAHIRI || 1, 0, 0);

    const flag = (swe.SEFLG_SWIEPH || 2) | (swe.SEFLG_SIDEREAL || (64 * 1024));
    const sunRes = swe.calc_ut(jd, 0, flag);
    const moonRes = swe.calc_ut(jd, 1, flag);

    const sunLong = sunRes && sunRes.data ? ((sunRes.data[0] + 360) % 360) : 0;
    const moonLong = moonRes && moonRes.data ? ((moonRes.data[0] + 360) % 360) : 0;
    const sunRasiId = Math.floor(sunLong / 30);
    const nakshatraId = Math.floor(moonLong / (360 / 27));
    const diffLong = ((moonLong - sunLong) + 360) % 360;
    const tithiIndex = Math.floor(diffLong / 12);
    const isShukla = match.isValarpirai !== undefined ? match.isValarpirai : (tithiIndex < 15);

    return {
      isMuhurthamDay: true,
      isShukla,
      tithiIndex,
      nakshatraId,
      sunRasiId,
      sunLong,
      moonLong
    };
  }

  // 2. Classical Algorithmic Vivaha Shuddhi Fallback for years not in the table
  if (!AUSPICIOUS_VIVAHA_WEEKDAYS.includes(weekday)) return false;

  const jd = swe.julday ? swe.julday(y, m, d, 6.0 - 5.5, 1) : 2460000;
  if (swe.set_sid_mode) swe.set_sid_mode(swe.SE_SIDM_LAHIRI || 1, 0, 0);

  const flag = (swe.SEFLG_SWIEPH || 2) | (swe.SEFLG_SIDEREAL || (64 * 1024));
  const sunRes = swe.calc_ut(jd, 0, flag);
  const moonRes = swe.calc_ut(jd, 1, flag);
  if (!sunRes || !moonRes || !sunRes.data || !moonRes.data) return false;

  const sunLong = (sunRes.data[0] + 360) % 360;
  const moonLong = (moonRes.data[0] + 360) % 360;

  const sunRasiId = Math.floor(sunLong / 30);
  if (!AUSPICIOUS_VIVAHA_MONTHS.includes(sunRasiId)) return false;

  const nakshatraId = Math.floor(moonLong / (360 / 27));
  if (PROHIBITED_VIVAHA_NAKSHATRAS.includes(nakshatraId) || !AUSPICIOUS_VIVAHA_NAKSHATRAS.includes(nakshatraId)) return false;

  const rules = DINA_YOGA_RULES[weekday] || { amrita: [], marana: [] };
  if (rules.marana.includes(nakshatraId)) return false;

  const diffLong = ((moonLong - sunLong) + 360) % 360;
  const tithiIndex = Math.floor(diffLong / 12);
  const isShukla = tithiIndex < 15;
  const tithiInPaksha = tithiIndex % 15;

  if ([3, 8, 13].includes(tithiInPaksha)) return false;
  if (tithiInPaksha === 7) return false;
  if (tithiIndex === 29 || tithiIndex === 14) return false;
  if (tithiInPaksha === 0) return false;
  if (!isShukla && tithiInPaksha > 9) return false;

  return { isMuhurthamDay: true, isShukla, tithiIndex, nakshatraId, sunRasiId, sunLong, moonLong };
}

function formatSecondsTo12Hour(sec) {
  const normSec = ((Math.round(sec) % 86400) + 86400) % 86400;
  const h24 = Math.floor(normSec / 3600);
  const m = Math.floor((normSec % 3600) / 60);
  const ampm = h24 >= 12 ? 'PM' : 'AM';
  const h12 = h24 % 12 || 12;
  return `${String(h12).padStart(2, '0')}:${String(m).padStart(2, '0')} ${ampm}`;
}

const parseTime12ToSec = (time12Str) => {
  const match = (time12Str || '').match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!match) return 6 * 3600;
  let hh = parseInt(match[1], 10);
  const mm = parseInt(match[2], 10);
  const period = match[3].toUpperCase();
  if (period === 'PM' && hh < 12) hh += 12;
  if (period === 'AM' && hh === 12) hh = 0;
  return hh * 3600 + mm * 60;
};

/**
 * Calculates dynamic daytime auspicious Lagna windows for Subha Muhurtham
 */
export async function calculateMuhurthamLagnaWindows({
  dateStr,
  year,
  month,
  day,
  weekdayIndex,
  latitude = 10.3673,
  longitude = 77.9803,
  ayanamsa = 'lahiri',
  activeLang = 'ta'
}) {
  const { sunrise, sunset } = calculateSunriseSunset(year, month, day, latitude, longitude, 5.5);
  const sunriseSec = parseTime12ToSec(sunrise);
  const sunsetSec = parseTime12ToSec(sunset);
  const dayDurationSec = (sunsetSec - sunriseSec + 86400) % 86400;
  const segmentDurationSec = dayDurationSec / 8;

  const lagnas = [];
  let currentRasi = null;
  let startMin = null;
  const startScanMin = Math.max(330, Math.floor(sunriseSec / 60)); // 05:30 AM or sunrise
  const endScanMin = 780; // 01:00 PM (13:00)

  for (let mins = startScanMin; mins <= endScanMin; mins += 5) {
    const hScan = Math.floor(mins / 60);
    const mScan = mins % 60;
    const tob = `${String(hScan).padStart(2, '0')}:${String(mScan).padStart(2, '0')}`;
    const chart = await calculateVedicChart({
      dob: dateStr,
      tob,
      latitude,
      longitude,
      ayanamsa
    });
    const rasi = chart.ascendantRasiId;
    if (currentRasi === null) {
      currentRasi = rasi;
      startMin = mins;
    } else if (rasi !== currentRasi) {
      lagnas.push({ rasiId: currentRasi, startMin, endMin: mins });
      currentRasi = rasi;
      startMin = mins;
    }
  }
  if (currentRasi !== null) {
    lagnas.push({ rasiId: currentRasi, startMin, endMin: endScanMin });
  }

  const rahuStartMin = Math.floor((sunriseSec + RAHU_SEGMENT_INDEX[weekdayIndex] * segmentDurationSec) / 60);
  const rahuEndMin = Math.floor((sunriseSec + (RAHU_SEGMENT_INDEX[weekdayIndex] + 1) * segmentDurationSec) / 60);
  const yamaStartMin = Math.floor((sunriseSec + YAMA_SEGMENT_INDEX[weekdayIndex] * segmentDurationSec) / 60);
  const yamaEndMin = Math.floor((sunriseSec + (YAMA_SEGMENT_INDEX[weekdayIndex] + 1) * segmentDurationSec) / 60);

  const cleanWindows = [];
  const cleanWindowsTa = [];
  const cleanWindowsEn = [];

  for (const l of lagnas) {
    if (!AUSPICIOUS_VIVAHA_RASIS.includes(l.rasiId)) continue;
    let s = l.startMin;
    let e = l.endMin;

    // Avoid Rahu Kalam
    if (s < rahuStartMin && e > rahuStartMin) {
      e = Math.min(e, rahuStartMin);
    } else if (s < rahuEndMin && e > rahuEndMin) {
      s = Math.max(s, rahuEndMin);
    } else if (s >= rahuStartMin && e <= rahuEndMin) {
      continue;
    }

    // Avoid Yamagandam
    if (s < yamaStartMin && e > yamaStartMin) {
      e = Math.min(e, yamaStartMin);
    } else if (s < yamaEndMin && e > yamaEndMin) {
      s = Math.max(s, yamaEndMin);
    } else if (s >= yamaStartMin && e <= yamaEndMin) {
      continue;
    }

    if (e - s >= 30) {
      const rasiObj = RASIS_DATA[l.rasiId] || { nameTa: '', name: '' };
      const rNameTa = rasiObj.nameTa || rasiObj.name;
      const rNameEn = rasiObj.name || rasiObj.nameTa;
      const slotTa = `${formatSecondsTo12Hour(s * 60)} - ${formatSecondsTo12Hour(e * 60)} (${rNameTa} லக்னம்)`;
      const slotEn = `${formatSecondsTo12Hour(s * 60)} - ${formatSecondsTo12Hour(e * 60)} (${rNameEn} Lagna)`;
      const slotLocalized = activeLang === 'ta' ? slotTa : slotEn;
      cleanWindows.push(slotLocalized);
      cleanWindowsTa.push(slotTa);
      cleanWindowsEn.push(slotEn);
    }
  }

  if (cleanWindows.length === 0) {
    const nallaNeram = NALLA_NERAM_TABLE[weekdayIndex] || NALLA_NERAM_TABLE[0];
    const fallbackTa = `${nallaNeram.morning}`;
    cleanWindows.push(fallbackTa);
    cleanWindowsTa.push(fallbackTa);
    cleanWindowsEn.push(fallbackTa);
  }

  return { cleanWindows, cleanWindowsTa, cleanWindowsEn };
}

/**
 * Returns all Subha Muhurtham dates for a given month with full details and timings
 */
export async function getMonthlySubhaMuhurthamDates({
  year,
  month,
  latitude = 10.3673,
  longitude = 77.9803,
  ayanamsa = 'lahiri',
  activeLang = 'ta'
}) {
  const daysInMonth = new Date(year, month, 0).getDate();
  const muhurthamDates = [];

  for (let d = 1; d <= daysInMonth; d++) {
    const dObj = new Date(year, month - 1, d);
    const check = checkSubhaMuhurthamDayFast(dObj);
    if (!check || !check.isMuhurthamDay) continue;

    const weekday = dObj.getDay();
    const dStr = `${year}-${String(month).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

    const { cleanWindows, cleanWindowsTa, cleanWindowsEn } = await calculateMuhurthamLagnaWindows({
      dateStr: dStr,
      year,
      month,
      day: d,
      weekdayIndex: weekday,
      latitude,
      longitude,
      ayanamsa,
      activeLang
    });

    const isValarpirai = check.isShukla;
    const muhurthamTypeTa = isValarpirai ? 'வளர்பிறை முகூர்த்தம்' : 'தேய்பிறை முகூர்த்தம்';
    const muhurthamTypeEn = isValarpirai ? 'Valarpirai Muhurtham' : 'Theipirai Muhurtham';
    const muhurthamType = activeLang === 'ta' ? muhurthamTypeTa : muhurthamTypeEn;

    const monthObj = getTamilMonthDetails(check.sunRasiId) || TAMIL_MONTHS_DATA[check.sunRasiId] || { nameTa: '', name: '' };
    const monthNameTa = monthObj.nameTa || monthObj.name;
    const monthNameEn = monthObj.name || monthObj.nameTa;
    const sunDegInRasi = Math.floor((check.sunLong || 0) % 30) + 1;
    const tamilDateTa = `${monthNameTa} ${sunDegInRasi}`;
    const tamilDateEn = `${monthNameEn} ${sunDegInRasi}`;

    const tithiObj = getTithiDetails(check.tithiIndex) || TITHIS_DATA[check.tithiIndex] || { nameTa: '', name: '' };
    const tithiNameTa = tithiObj.nameTa || tithiObj.name;
    const tithiNameEn = tithiObj.name || tithiObj.nameTa;

    const nakshatraObj = NAKSHATRAS_DATA[check.nakshatraId] || { nameTa: '', name: '' };
    const nakshatraNameTa = nakshatraObj.nameTa || nakshatraObj.name;
    const nakshatraNameEn = nakshatraObj.name || nakshatraObj.nameTa;

    const dayNameTa = WEEKDAYS.ta[weekday];
    const dayNameEn = WEEKDAYS.en[weekday];

    const engMonthName = ENG_MONTH_NAMES_SHORT[month - 1];
    const tamilMonthName = TAMIL_MONTH_NAMES_SHORT[month - 1];

    muhurthamDates.push({
      date: dStr,
      dayNumber: d,
      dayName: activeLang === 'ta' ? dayNameTa : dayNameEn,
      dayNameTa,
      dayNameEn,
      month,
      year,
      formattedDateTa: `${d} ${tamilMonthName} ${year}`,
      formattedDateEn: `${d} ${engMonthName} ${year}`,
      formattedDate: activeLang === 'ta' ? `${d} ${tamilMonthName} ${year}` : `${d} ${engMonthName} ${year}`,
      tamilMonth: activeLang === 'ta' ? monthNameTa : monthNameEn,
      tamilDateNumber: sunDegInRasi,
      tamilDateTa,
      tamilDateEn,
      tamilDate: activeLang === 'ta' ? tamilDateTa : tamilDateEn,
      muhurthamType,
      muhurthamTypeTa,
      muhurthamTypeEn,
      isValarpirai,
      tithiName: activeLang === 'ta' ? tithiNameTa : tithiNameEn,
      tithiNameTa,
      tithiNameEn,
      nakshatraName: activeLang === 'ta' ? nakshatraNameTa : nakshatraNameEn,
      nakshatraNameTa,
      nakshatraNameEn,
      timings: cleanWindows,
      timingsTa: cleanWindowsTa,
      timingsEn: cleanWindowsEn,
      timingsSummary: cleanWindows.join(', ')
    });
  }

  return muhurthamDates;
}

export async function calculateDailyPanchangam({
  date,
  time,
  latitude = 10.3673,
  longitude = 77.9803,
  placeName = 'Dindigul',
  formattedAddress,
  ayanamsa = 'lahiri',
  timezone = '+05:30',
  lang = 'ta'
}) {
  const activeLang = ['ta', 'en', 'hi', 'te', 'kn', 'ml'].includes(lang) ? lang : 'ta';

  // 1. Resolve Date & Time defaults
  let resolvedDate = date;
  let resolvedTime = time;

  if (!resolvedDate) {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    resolvedDate = `${y}-${m}-${d}`;
  }

  if (!resolvedTime) {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const min = String(now.getMinutes()).padStart(2, '0');
    const sec = String(now.getSeconds()).padStart(2, '0');
    resolvedTime = `${h}:${min}:${sec}`;
  }

  const [yearStr, monthStr, dayStr] = resolvedDate.split('-');
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10);
  const day = parseInt(dayStr, 10);

  const [hourStr, minStr, secStr] = resolvedTime.split(':');
  const h = parseInt(hourStr || '0', 10);
  const m = parseInt(minStr || '0', 10);
  const s = parseInt(secStr || '0', 10);
  const querySec = h * 3600 + m * 60 + s;

  const dateObj = new Date(Date.UTC(year, month - 1, day));
  const weekdayIndex = dateObj.getUTCDay();
  const vaaram = (WEEKDAYS[activeLang] || WEEKDAYS.ta)[weekdayIndex];
  const vaaramTa = WEEKDAYS.ta[weekdayIndex];
  const vaaramEn = WEEKDAYS.en[weekdayIndex];

  // 2. High-precision Swiss Ephemeris Vedic Chart Calculation
  const calcResult = await calculateVedicChart({
    dob: resolvedDate,
    tob: resolvedTime,
    latitude: Number(latitude),
    longitude: Number(longitude),
    ayanamsa,
    gmt: timezone,
    dst: '+00:00'
  });

  const sunPlanet = calcResult.planets.find(p => p.name === 'Sun');
  const moonPlanet = calcResult.planets.find(p => p.name === 'Moon');
  const sunLong = sunPlanet ? sunPlanet.longitude : 0;
  const moonLong = moonPlanet ? moonPlanet.longitude : 0;
  const moonSpeed = moonPlanet?.speed || 13.2;
  const sunSpeed = sunPlanet?.speed || 1.0;

  // 3. Astronomical Sunrise & Sunset
  const tzOffsetHours = 5.5; // Indian Standard Time default
  const { sunrise, sunset } = calculateSunriseSunset(year, month, day, latitude, longitude, tzOffsetHours);

  // Parse sunrise & sunset seconds from midnight
  const parseTime12ToSec = (time12Str) => {
    const match = (time12Str || '').match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
    if (!match) return 6 * 3600;
    let hh = parseInt(match[1], 10);
    const mm = parseInt(match[2], 10);
    const period = match[3].toUpperCase();
    if (period === 'PM' && hh < 12) hh += 12;
    if (period === 'AM' && hh === 12) hh = 0;
    return hh * 3600 + mm * 60;
  };

  const sunriseSec = parseTime12ToSec(sunrise);
  const sunsetSec = parseTime12ToSec(sunset);
  const dayDurationSec = (sunsetSec - sunriseSec + 86400) % 86400;
  const nightDurationSec = 86400 - dayDurationSec;

  const dayDurationHours = Math.floor(dayDurationSec / 3600);
  const dayDurationMins = Math.floor((dayDurationSec % 3600) / 60);
  const nightDurationHours = Math.floor(nightDurationSec / 3600);
  const nightDurationMins = Math.floor((nightDurationSec % 3600) / 60);

  const dayDurationEn = `${dayDurationHours} hrs ${dayDurationMins} mins`;
  const dayDurationTa = `${dayDurationHours} மணி ${dayDurationMins} நிமிடம்`;
  const nightDurationEn = `${nightDurationHours} hrs ${nightDurationMins} mins`;
  const nightDurationTa = `${nightDurationHours} மணி ${nightDurationMins} நிமிடம்`;
  const dayDurationFormatted = activeLang === 'ta' ? dayDurationTa : dayDurationEn;
  const nightDurationFormatted = activeLang === 'ta' ? nightDurationTa : nightDurationEn;

  // Moonrise & Moonset from Swiss Ephemeris or astronomical approximation
  let moonriseStr = '-';
  let moonsetStr = '-';
  try {
    const jdMidnight = swe.julday ? swe.julday(year, month, day, 0, 1) : 2460000;
    if (swe.rise_trans) {
      const riseRes = swe.rise_trans(jdMidnight, 1, null, 2, 1, [longitude, latitude, 0], 0, 0);
      const setRes = swe.rise_trans(jdMidnight, 1, null, 2, 2, [longitude, latitude, 0], 0, 0);
      if (riseRes && riseRes.data) {
        const utcHours = ((riseRes.data + 0.5) % 1) * 24;
        const localHours = (utcHours + tzOffsetHours + 24) % 24;
        moonriseStr = formatSecondsTo12Hour(localHours * 3600);
      }
      if (setRes && setRes.data) {
        const utcHours = ((setRes.data + 0.5) % 1) * 24;
        const localHours = (utcHours + tzOffsetHours + 24) % 24;
        moonsetStr = formatSecondsTo12Hour(localHours * 3600);
      }
    }
  } catch (e) {
    console.warn('Moon rise_trans fallback applied:', e);
  }

  // 4. Tamil Calendar & Year
  const sunRasiId = Math.floor(sunLong / 30);
  const sunDegInRasi = Math.floor(sunLong % 30) + 1;
  const monthObj = getTamilMonthDetails(sunRasiId) || TAMIL_MONTHS_DATA[sunRasiId] || { nameTa: 'ஐப்பசி', name: 'Aippasi' };
  const localizedMonthName = getLocalizedText(monthObj, activeLang);

  const yearIndex = ((year - 1987) % 60 + 60) % 60;
  const yearObj = getTamilYearDetails(yearIndex) || TAMIL_YEARS_DATA[yearIndex] || { nameTa: 'பராபவ', name: 'Parabhava' };
  const localizedYearName = getLocalizedText(yearObj, activeLang);
  const yearNameEn = yearObj?.name || 'Parabhava';
  const yearNameTa = yearObj?.nameTa || 'பராபவ';
  const monthNameEn = monthObj?.name || 'Aippasi';
  const monthNameTa = monthObj?.nameTa || 'ஐப்பசி';

  const tamilDate = `${localizedMonthName} ${sunDegInRasi}, ${localizedYearName}`;
  const tamilDateEn = `${monthNameEn} ${sunDegInRasi}, ${yearNameEn}`;
  const tamilDateTa = `${monthNameTa} ${sunDegInRasi}, ${yearNameTa}`;

  // Ayanam (உத்தராயணம் / தட்சிணாயனம்)
  // Sun in Kataka (3) to Dhanu (8) = Dakshinayana; Makara (9) to Mithuna (2) = Uttarayana
  const isUttarayana = sunRasiId >= 9 || sunRasiId <= 2;
  const ayanam = isUttarayana ? AYANAMS_DATA.uttarayana[activeLang] || AYANAMS_DATA.uttarayana.ta : AYANAMS_DATA.dakshinayana[activeLang] || AYANAMS_DATA.dakshinayana.ta;
  const ayanamTa = isUttarayana ? AYANAMS_DATA.uttarayana.ta : AYANAMS_DATA.dakshinayana.ta;
  const ayanamEn = isUttarayana ? AYANAMS_DATA.uttarayana.en : AYANAMS_DATA.dakshinayana.en;

  // Ruthu (6 Seasons)
  const ruthuIdx = Math.floor(sunRasiId / 2);
  const ruthu = RUTHUS_DATA[ruthuIdx]?.[activeLang] || RUTHUS_DATA[ruthuIdx]?.ta || 'சரத் ருது';
  const ruthuTa = RUTHUS_DATA[ruthuIdx]?.ta || 'சரத் ருது';
  const ruthuEn = RUTHUS_DATA[ruthuIdx]?.en || 'Sharad Ritu';

  // 5. Pancha Angas: Tithi, Nakshatra, Yoga, Karana, Vaaram
  // 5.1 Tithi
  const diffLong = ((moonLong - sunLong) + 360) % 360;
  const tithiIndex = Math.min(29, Math.max(0, Math.floor(diffLong / 12)));
  const isShukla = tithiIndex < 15;
  const tithiObj = getTithiDetails(tithiIndex) || TITHIS_DATA[tithiIndex];
  const tithiName = getLocalizedText(tithiObj, activeLang);
  const tithiNameTa = tithiObj?.nameTa || 'பிரதமை';
  const pakshaText = isShukla
    ? (activeLang === 'ta' ? 'சுக்ல பட்சம் (வளர்பிறை)' : 'Shukla Paksha (Waxing)')
    : (activeLang === 'ta' ? 'கிருஷ்ண பட்சம் (தேய்பிறை)' : 'Krishna Paksha (Waning)');
  const pakshaTa = isShukla ? 'சுக்ல பட்சம் (வளர்பிறை)' : 'கிருஷ்ண பட்சம் (தேய்பிறை)';

  const tithiDegRemaining = 12 - (diffLong % 12);
  const relSpeed = Math.max(10, moonSpeed - sunSpeed);
  const tithiHoursRemaining = (tithiDegRemaining / relSpeed) * 24;
  const tithiEndSec = (querySec + tithiHoursRemaining * 3600) % 86400;
  const tithiEndTime = formatSecondsTo12Hour(tithiEndSec);
  const tithiPercentage = Math.round(((diffLong % 12) / 12) * 100);

  // 5.2 Nakshatra
  const nakshatraId = Math.floor(moonLong / (360 / 27));
  const nakshatraDeg = moonLong % (360 / 27);
  const pada = Math.floor(nakshatraDeg / (360 / 108)) + 1;
  const nakshatraData = NAKSHATRAS_DATA[nakshatraId] || NAKSHATRAS_DATA[0];
  const nakshatraMeta = NAKSHATRA_ATTRIBUTES[nakshatraId] || NAKSHATRA_ATTRIBUTES[0];
  const nakshatraName = getLocalizedText(nakshatraData, activeLang);
  const nakshatraNameTa = nakshatraMeta.nameTa || 'பரணி';
  const padaText = PADA_LABELS[activeLang]?.[pada] || PADA_LABELS.ta[pada];

  const nakDegRemaining = (360 / 27) - nakshatraDeg;
  const nakHoursRemaining = (nakDegRemaining / Math.max(11, moonSpeed)) * 24;
  const nakEndSec = (querySec + nakHoursRemaining * 3600) % 86400;
  const nakshatraEndTime = formatSecondsTo12Hour(nakEndSec);

  // 5.3 Yoga (Nithya Yoga & Dina Yoga)
  const sumLong = (sunLong + moonLong) % 360;
  const yogaIndex = Math.min(26, Math.max(0, Math.floor(sumLong / (360 / 27))));
  const yogaObj = getYogaDetails(yogaIndex) || YOGAS_DATA[yogaIndex];
  const nithyaYogam = getLocalizedText(yogaObj, activeLang);
  const nithyaYogamTa = yogaObj?.nameTa || 'சித்தி';

  // Dina Yogam (சித்த / அமிர்த / மரண யோகம்)
  const dayRule = DINA_YOGA_RULES[weekdayIndex] || { amrita: [], marana: [] };
  let dinaYogaKey = 'siddha';
  if (dayRule.amrita.includes(nakshatraId)) dinaYogaKey = 'amrita';
  else if (dayRule.marana.includes(nakshatraId)) dinaYogaKey = 'marana';

  const DINA_YOGA_LABELS = {
    siddha: {
      ta: 'சித்த யோகம்',
      en: 'Siddha Yoga',
      hi: 'सिद्ध योग',
      natureTa: 'சுபம்',
      natureEn: 'Auspicious',
      isAuspicious: true,
      color: '#22c55e',
      descTa: 'சுப காரியங்கள், புதிய முயற்சிகள் செய்ய ஏற்றது.'
    },
    amrita: {
      ta: 'அமிர்த யோகம்',
      en: 'Amritha Yoga',
      hi: 'अमृत योग',
      natureTa: 'அதி சுபம்',
      natureEn: 'Highly Auspicious',
      isAuspicious: true,
      color: '#10b981',
      descTa: 'எல்லா சுப காரியங்களுக்கும் மிகவும் சிறப்பானது.'
    },
    marana: {
      ta: 'மரண யோகம்',
      en: 'Marana Yoga',
      hi: 'मरण योग',
      natureTa: 'அசுபம்',
      natureEn: 'Inauspicious',
      isAuspicious: false,
      color: '#ef4444',
      descTa: 'புதிய காரியங்கள் தொடங்குவதைத் தவிர்க்கவும்.'
    }
  };
  const dinaYoga = DINA_YOGA_LABELS[dinaYogaKey];

  // 5.4 Karana
  const halfTithiIndex = Math.floor(diffLong / 6);
  let karanamObj;
  if (halfTithiIndex === 0) {
    karanamObj = getKaranaDetails(10) || KARANAS_DATA[10];
  } else if (halfTithiIndex >= 57) {
    const fixedMap = { 57: 7, 58: 8, 59: 9 };
    const kId = fixedMap[halfTithiIndex] || 7;
    karanamObj = getKaranaDetails(kId) || KARANAS_DATA[kId];
  } else {
    const charaIndex = (halfTithiIndex - 1) % 7;
    karanamObj = getKaranaDetails(charaIndex) || KARANAS_DATA[charaIndex];
  }
  const karanamName = getLocalizedText(karanamObj, activeLang);
  const karanamNameTa = karanamObj?.nameTa || 'கௌலவம்';
  const isCharaKarana = (karanamObj?.karanaId || 0) < 7;
  const karanaTypeTa = isCharaKarana ? 'சர கரணம்' : 'ஸ்திர கரணம்';

  // 6. Inauspicious Periods: Rahu Kalam, Yamakandam, Kuligai
  const segmentDurationSec = dayDurationSec / 8;
  const RAHU_SEGMENT_INDEX = [7, 1, 6, 4, 5, 3, 2];
  const YAMA_SEGMENT_INDEX = [4, 3, 2, 1, 0, 6, 5];
  const KULI_SEGMENT_INDEX = [6, 5, 4, 3, 2, 1, 0];

  const getSegmentTimeWindow = (segIdx) => {
    const startSec = sunriseSec + segIdx * segmentDurationSec;
    const endSec = startSec + segmentDurationSec;
    return `${formatSecondsTo12Hour(startSec)} - ${formatSecondsTo12Hour(endSec)}`;
  };

  const rahuKalam = getSegmentTimeWindow(RAHU_SEGMENT_INDEX[weekdayIndex]);
  const yamakandam = getSegmentTimeWindow(YAMA_SEGMENT_INDEX[weekdayIndex]);
  const kuligai = getSegmentTimeWindow(KULI_SEGMENT_INDEX[weekdayIndex]);

  // 7. Auspicious Periods: Brahma Muhurtham, Abhijit Muhurtham, Nalla Neram
  const brahmaStartSec = sunriseSec - 96 * 60;
  const brahmaEndSec = sunriseSec - 48 * 60;
  const brahmaMuhurtham = `${formatSecondsTo12Hour(brahmaStartSec)} - ${formatSecondsTo12Hour(brahmaEndSec)}`;

  const solarNoonSec = (sunriseSec + sunsetSec) / 2;
  const abhijitMuhurtham = `${formatSecondsTo12Hour(solarNoonSec - 24 * 60)} - ${formatSecondsTo12Hour(solarNoonSec + 24 * 60)}`;

  const nallaNeram = NALLA_NERAM_TABLE[weekdayIndex] || NALLA_NERAM_TABLE[0];
  const gowriNallaNeram = GOWRI_NALLA_NERAM_TABLE[weekdayIndex] || GOWRI_NALLA_NERAM_TABLE[0];
  // 7.1 Subha Muhurtham (சுப முகூர்த்தம்) - Classical Vivaha Muhurtham Calculation
  const isMuhurthamCheck = checkSubhaMuhurthamDayFast(new Date(year, month - 1, day));
  const isMuhurthamDay = !!(isMuhurthamCheck && isMuhurthamCheck.isMuhurthamDay);

  // Compute all Muhurtham dates for the currently viewed month
  const monthlyMuhurthamDates = await getMonthlySubhaMuhurthamDates({
    year,
    month,
    latitude,
    longitude,
    ayanamsa,
    activeLang
  });

  let subhaMuhurtham = [];
  let subhaMuhurthamInfo = {
    isMuhurthamDay,
    muhurthamType: null,
    muhurthamTypeEn: null,
    timings: [],
    monthlyMuhurthamDates,
    nextMuhurthamDate: null,
    text: activeLang === 'ta' ? 'இன்று முகூர்த்த நாள் அல்ல' : 'Not a Muhurtham Day',
    textTa: 'இன்று முகூர்த்த நாள் அல்ல',
    textEn: 'Not a Muhurtham Day'
  };

  if (isMuhurthamDay) {
    const isValarpirai = isMuhurthamCheck.isShukla;
    const muhurthamType = isValarpirai ? 'வளர்பிறை முகூர்த்தம்' : 'தேய்பிறை முகூர்த்தம்';
    const muhurthamTypeEn = isValarpirai ? 'Valarpirai Muhurtham' : 'Theipirai Muhurtham';

    // Retrieve timings from monthlyMuhurthamDates or calculate dynamically
    const todayInMonth = monthlyMuhurthamDates.find((m) => m.dayNumber === day);
    let cleanWindows = todayInMonth?.timings;
    let cleanWindowsTa = todayInMonth?.timingsTa;
    let cleanWindowsEn = todayInMonth?.timingsEn;

    if (!cleanWindows || cleanWindows.length === 0) {
      const windowsRes = await calculateMuhurthamLagnaWindows({
        dateStr: resolvedDate,
        year,
        month,
        day,
        weekdayIndex,
        latitude,
        longitude,
        ayanamsa,
        activeLang
      });
      cleanWindows = windowsRes.cleanWindows;
      cleanWindowsTa = windowsRes.cleanWindowsTa;
      cleanWindowsEn = windowsRes.cleanWindowsEn;
    }

    subhaMuhurtham = cleanWindows;
    subhaMuhurthamInfo = {
      isMuhurthamDay: true,
      muhurthamType,
      muhurthamTypeEn,
      timings: cleanWindows,
      timingsTa: cleanWindowsTa,
      timingsEn: cleanWindowsEn,
      monthlyMuhurthamDates,
      nextMuhurthamDate: null,
      text: cleanWindows.join(', '),
      textTa: cleanWindowsTa.join(', '),
      textEn: cleanWindowsEn.join(', ')
    };
  } else {
    // Today is not a Muhurtham day - find next upcoming Muhurtham date
    let nextDateStr = null;
    let nextDateStrTa = null;
    let nextDateStrEn = null;
    let nextDateIso = null;

    // Check if there is an upcoming muhurtham date in the current month first
    const nextInThisMonth = monthlyMuhurthamDates.find((m) => m.dayNumber > day);
    if (nextInThisMonth) {
      nextDateStrTa = nextInThisMonth.formattedDateTa;
      nextDateStrEn = nextInThisMonth.formattedDateEn;
      nextDateStr = activeLang === 'ta' ? nextDateStrTa : nextDateStrEn;
      nextDateIso = nextInThisMonth.date;
    } else {
      // Scan into future months (up to 60 days)
      for (let offset = 1; offset <= 60; offset++) {
        const nextDate = new Date(year, month - 1, day + offset);
        if (checkSubhaMuhurthamDayFast(nextDate)) {
          const nd = nextDate.getDate();
          const nm = nextDate.getMonth();
          const ny = nextDate.getFullYear();
          nextDateStrTa = `${nd} ${TAMIL_MONTH_NAMES_SHORT[nm]} ${ny}`;
          nextDateStrEn = `${nd} ${ENG_MONTH_NAMES_SHORT[nm]} ${ny}`;
          nextDateStr = activeLang === 'ta' ? nextDateStrTa : nextDateStrEn;
          nextDateIso = `${ny}-${String(nm + 1).padStart(2, '0')}-${String(nd).padStart(2, '0')}`;
          break;
        }
      }
    }

    const nonMuhurthamTextTa = 'இன்று முகூர்த்த நாள் அல்ல';
    const nonMuhurthamTextEn = 'Not a Muhurtham Day';
    const nonMuhurthamText = activeLang === 'ta' ? nonMuhurthamTextTa : nonMuhurthamTextEn;
    subhaMuhurtham = [nonMuhurthamText];
    subhaMuhurthamInfo = {
      isMuhurthamDay: false,
      muhurthamType: null,
      muhurthamTypeEn: null,
      timings: [],
      monthlyMuhurthamDates,
      nextMuhurthamDate: nextDateStr,
      nextMuhurthamDateTa: nextDateStrTa,
      nextMuhurthamDateEn: nextDateStrEn,
      nextMuhurthamDateIso: nextDateIso,
      text: nonMuhurthamText,
      textTa: nonMuhurthamTextTa,
      textEn: nonMuhurthamTextEn
    };
  }
  const durmuhurtham = DURMUHURTHAM_TABLE[weekdayIndex] || DURMUHURTHAM_TABLE[0];

  // Disha Soolam & Pariharam
  const soolamData = DISHA_SOOLAM_DATA[weekdayIndex] || DISHA_SOOLAM_DATA[0];
  const soolamDirection = soolamData.direction[activeLang] || soolamData.direction.ta;
  const soolamPariharam = soolamData.pariharam[activeLang] || soolamData.pariharam.ta;

  // 8. Chandrashtamam (இன்றைய சந்திராஷ்டம ராசி & நட்சத்திரங்கள்)
  const moonRasiId = Math.floor(moonLong / 30);
  const chandrashtamaRasiId = (moonRasiId - 7 + 12) % 12;
  const chandrashtamaRasiObj = RASIS_DATA[chandrashtamaRasiId];
  const chandrashtamaRasi = getLocalizedText(chandrashtamaRasiObj, activeLang) || 'கன்னி';
  const chandrashtamaRasiTa = chandrashtamaRasiObj?.nameTa || 'கன்னி';
  const chandrashtamaStars = CHANDRASHTAMA_STARS[chandrashtamaRasiId]?.[activeLang] || CHANDRASHTAMA_STARS[chandrashtamaRasiId]?.ta || [];

  // Moon & Sun Signs
  const moonRasiObj = RASIS_DATA[moonRasiId];
  const moonRasi = getLocalizedText(moonRasiObj, activeLang) || 'மேஷம்';
  const moonRasiTa = moonRasiObj?.nameTa || 'மேஷம்';
  const moonDegInRasi = (moonLong % 30).toFixed(2);

  const sunRasiObj = RASIS_DATA[sunRasiId];
  const sunRasi = getLocalizedText(sunRasiObj, activeLang) || 'துலாம்';
  const sunRasiTa = sunRasiObj?.nameTa || 'துலாம்';
  const sunDegFormatted = (sunLong % 30).toFixed(2);

  // 9. 24-Hour Planetary Horai Table (ஹோரை அட்டவணை)
  const dayLordStartIndex = DAY_HORA_START_INDEX[weekdayIndex];
  const horaiSchedule = [];
  for (let i = 0; i < 24; i++) {
    const hStartSec = (sunriseSec + i * 3600) % 86400;
    const hEndSec = (sunriseSec + (i + 1) * 3600) % 86400;
    const planetIdx = (dayLordStartIndex + i) % 7;
    const planet = HORA_PLANETS_ORDER[planetIdx];
    const isCurrentHora = querySec >= hStartSec && querySec < hEndSec;

    horaiSchedule.push({
      horaNumber: i + 1,
      timeSlot: `${formatSecondsTo12Hour(hStartSec)} - ${formatSecondsTo12Hour(hEndSec)}`,
      lord: planet[activeLang] || planet.ta,
      lordTa: planet.ta,
      lordKey: planet.key,
      nature: activeLang === 'ta' ? planet.natureTa : planet.natureEn,
      natureTa: planet.natureTa,
      isAuspicious: planet.isAuspicious,
      suitable: activeLang === 'ta' ? planet.suitableTa : (planet.suitableEn || planet.suitableTa),
      suitableTa: planet.suitableTa,
      suitableEn: planet.suitableEn || planet.suitableTa,
      isCurrent: isCurrentHora
    });
  }

  // 10. Gowri Panchangam Periods (Day 8 + Night 8)
  const gowriDaySchedule = [];
  for (let i = 0; i < 8; i++) {
    const gStartSec = sunriseSec + i * segmentDurationSec;
    const gEndSec = gStartSec + segmentDurationSec;
    const gKey = GOWRI_PANCHANGAM_DAY[weekdayIndex][i];
    const meta = GOWRI_METADATA[gKey] || GOWRI_METADATA.Amirtham;
    const isCurrent = querySec >= gStartSec && querySec < gEndSec;

    gowriDaySchedule.push({
      segment: i + 1,
      timeSlot: `${formatSecondsTo12Hour(gStartSec)} - ${formatSecondsTo12Hour(gEndSec)}`,
      name: meta[activeLang] || meta.ta,
      nameTa: meta.ta,
      key: gKey,
      nature: activeLang === 'ta' ? meta.natureTa : meta.natureEn,
      natureTa: meta.natureTa,
      isAuspicious: meta.isAuspicious,
      desc: activeLang === 'ta' ? meta.descTa : (meta.descEn || meta.descTa),
      descTa: meta.descTa,
      descEn: meta.descEn || meta.descTa,
      color: meta.isAuspicious ? '#22c55e' : (gKey === 'Uthi' ? '#94a3b8' : '#ef4444'),
      isCurrent
    });
  }

  const nightSegmentDurationSec = nightDurationSec / 8;
  const gowriNightSchedule = [];
  for (let i = 0; i < 8; i++) {
    const gStartSec = (sunsetSec + i * nightSegmentDurationSec) % 86400;
    const gEndSec = (gStartSec + nightSegmentDurationSec) % 86400;
    const gKey = GOWRI_PANCHANGAM_NIGHT[weekdayIndex][i];
    const meta = GOWRI_METADATA[gKey] || GOWRI_METADATA.Amirtham;

    let isCurrent = false;
    if (gEndSec > gStartSec) {
      isCurrent = querySec >= gStartSec && querySec < gEndSec;
    } else {
      isCurrent = querySec >= gStartSec || querySec < gEndSec;
    }

    gowriNightSchedule.push({
      segment: i + 1,
      timeSlot: `${formatSecondsTo12Hour(gStartSec)} - ${formatSecondsTo12Hour(gEndSec)}`,
      name: meta[activeLang] || meta.ta,
      nameTa: meta.ta,
      key: gKey,
      nature: activeLang === 'ta' ? meta.natureTa : meta.natureEn,
      natureTa: meta.natureTa,
      isAuspicious: meta.isAuspicious,
      desc: activeLang === 'ta' ? meta.descTa : (meta.descEn || meta.descTa),
      descTa: meta.descTa,
      descEn: meta.descEn || meta.descTa,
      color: meta.isAuspicious ? '#22c55e' : (gKey === 'Uthi' ? '#94a3b8' : '#ef4444'),
      isCurrent
    });
  }

  const isNightActive = gowriNightSchedule.some(g => g.isCurrent);
  const activeGowriPeriod = isNightActive ? 'night' : 'day';

  // Nokku Naal (Direction)
  const NOKKU_NAAL_MEL = [3, 5, 7, 11, 20, 21, 22, 23, 25];
  const NOKKU_NAAL_KEEZH = [1, 2, 8, 9, 10, 15, 18, 19, 24];
  let nokkuNaal = {
    nameEn: 'Sama Nokku (Level)',
    nameTa: 'சம நோக்கு',
    type: 'sama'
  };
  if (NOKKU_NAAL_MEL.includes(nakshatraId)) {
    nokkuNaal = { nameEn: 'Mel Nokku (Upward)', nameTa: 'மேல் நோக்கு', type: 'mel' };
  } else if (NOKKU_NAAL_KEEZH.includes(nakshatraId)) {
    nokkuNaal = { nameEn: 'Keezh Nokku (Downward)', nameTa: 'கீழ் நோக்கு', type: 'keezh' };
  }

  // Hijri (Tabular Islamic) Date
  const hijri = calculateHijriDate(dateObj);

  // Next Tithi
  const nextTithiIdx = (tithiIndex + 1) % 30;
  const nextTithiObj = getTithiDetails(nextTithiIdx) || TITHIS_DATA[nextTithiIdx];
  const nextIsShukla = nextTithiIdx < 15;
  const cleanTithiEn = (rawName, isShukla, idx) => {
    if (idx === 14) return 'Purnima';
    if (idx === 29) return 'Amavasya';
    const clean = (rawName || '').replace(/^(Shukla|Krishna)\s+/i, '').trim();
    return isShukla ? `Shukla ${clean}` : `Krishna ${clean}`;
  };
  const currentTithiNameEn = cleanTithiEn(tithiObj?.name, isShukla, tithiIndex);
  const nextTithiNameEn = cleanTithiEn(nextTithiObj?.name, nextIsShukla, nextTithiIdx);
  const nextTithiNameTa = nextTithiIdx === 14 ? 'பௌர்ணமி' : (nextTithiIdx === 29 ? 'அமாவாசை' : (nextIsShukla ? `வளர்பிறை ${nextTithiObj?.nameTa || ''}` : `தேய்பிறை ${nextTithiObj?.nameTa || ''}`));

  // Next Nakshatra
  const nextNakIdx = (nakshatraId + 1) % 27;
  const nextNakData = NAKSHATRAS_DATA[nextNakIdx] || NAKSHATRAS_DATA[0];
  const nextNakMeta = NAKSHATRA_ATTRIBUTES[nextNakIdx] || NAKSHATRA_ATTRIBUTES[0];

  // Next Yoga
  const nextYogaIdx = (yogaIndex + 1) % 27;
  const nextYogaObj = getYogaDetails(nextYogaIdx) || YOGAS_DATA[nextYogaIdx];

  // Next Karana
  const nextKaranaIdx = (halfTithiIndex + 1) % 60;
  let nextKaranamObj;
  if (nextKaranaIdx === 0) {
    nextKaranamObj = getKaranaDetails(10) || KARANAS_DATA[10];
  } else if (nextKaranaIdx >= 57) {
    const fixedMap = { 57: 7, 58: 8, 59: 9 };
    const kId = fixedMap[nextKaranaIdx] || 7;
    nextKaranamObj = getKaranaDetails(kId) || KARANAS_DATA[kId];
  } else {
    const charaIndex = (nextKaranaIdx - 1) % 7;
    nextKaranamObj = getKaranaDetails(charaIndex) || KARANAS_DATA[charaIndex];
  }

  // Helper for formatting date interval matching "Oct 24 1:38 PM – Oct 25 11:57 AM" or "Oct 25, 12:52 AM – 11:57 AM"
  function formatDateTimeRange(startDt, endDt) {
    if (!startDt || !endDt) return '';
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const formatTime = (d) => {
      let h = d.getHours();
      const min = d.getMinutes().toString().padStart(2, '0');
      const ampm = h >= 12 ? 'PM' : 'AM';
      h = h % 12 || 12;
      return `${h}:${min} ${ampm}`;
    };

    const isSameDay = startDt.getFullYear() === endDt.getFullYear() &&
                      startDt.getMonth() === endDt.getMonth() &&
                      startDt.getDate() === endDt.getDate();

    const startMonth = months[startDt.getMonth()];
    const endMonth = months[endDt.getMonth()];

    if (isSameDay) {
      return `${startMonth} ${startDt.getDate()}, ${formatTime(startDt)} – ${formatTime(endDt)}`;
    } else {
      return `${startMonth} ${startDt.getDate()} ${formatTime(startDt)} – ${endMonth} ${endDt.getDate()} ${formatTime(endDt)}`;
    }
  }

  // Tithi start/end range
  const tithiDegElapsed = diffLong % 12;
  const tithiHoursElapsed = (tithiDegElapsed / relSpeed) * 24;
  const tithiStartDt = new Date(dateObj.getTime() - tithiHoursElapsed * 3600 * 1000);
  const tithiEndDt = new Date(dateObj.getTime() + tithiHoursRemaining * 3600 * 1000);
  const nextTithiEndDt = new Date(tithiEndDt.getTime() + (12 / relSpeed) * 24 * 3600 * 1000);
  const tithiTimingStr = formatDateTimeRange(tithiStartDt, tithiEndDt);
  const nextTithiTimingStr = formatDateTimeRange(tithiEndDt, nextTithiEndDt);

  // Nakshatra start/end range
  const nakDegElapsed = nakshatraDeg;
  const nakSpeed = Math.max(11, moonSpeed);
  const nakHoursElapsed = (nakDegElapsed / nakSpeed) * 24;
  const nakStartDt = new Date(dateObj.getTime() - nakHoursElapsed * 3600 * 1000);
  const nakEndDt = new Date(dateObj.getTime() + nakHoursRemaining * 3600 * 1000);
  const nextNakEndDt = new Date(nakEndDt.getTime() + ((360 / 27) / nakSpeed) * 24 * 3600 * 1000);
  const nakTimingStr = formatDateTimeRange(nakStartDt, nakEndDt);
  const nextNakTimingStr = formatDateTimeRange(nakEndDt, nextNakEndDt);

  // Yoga start/end range
  const yogaDegElapsed = sumLong % (360 / 27);
  const yogaDegRemaining = (360 / 27) - yogaDegElapsed;
  const yogaSpeed = Math.max(12, sunSpeed + moonSpeed);
  const yogaHoursElapsed = (yogaDegElapsed / yogaSpeed) * 24;
  const yogaHoursRemaining = (yogaDegRemaining / yogaSpeed) * 24;
  const yogaStartDt = new Date(dateObj.getTime() - yogaHoursElapsed * 3600 * 1000);
  const yogaEndDt = new Date(dateObj.getTime() + yogaHoursRemaining * 3600 * 1000);
  const nextYogaEndDt = new Date(yogaEndDt.getTime() + ((360 / 27) / yogaSpeed) * 24 * 3600 * 1000);
  const yogaTimingStr = formatDateTimeRange(yogaStartDt, yogaEndDt);
  const nextYogaTimingStr = formatDateTimeRange(yogaEndDt, nextYogaEndDt);

  // Karana start/end range
  const karanaDegElapsed = diffLong % 6;
  const karanaDegRemaining = 6 - (diffLong % 6);
  const karanaHoursElapsed = (karanaDegElapsed / relSpeed) * 24;
  const karanaHoursRemaining = (karanaDegRemaining / relSpeed) * 24;
  const karanaStartDt = new Date(dateObj.getTime() - karanaHoursElapsed * 3600 * 1000);
  const karanaEndDt = new Date(dateObj.getTime() + karanaHoursRemaining * 3600 * 1000);
  const nextKaranaEndDt = new Date(karanaEndDt.getTime() + (6 / relSpeed) * 24 * 3600 * 1000);
  const karanaTimingStr = formatDateTimeRange(karanaStartDt, karanaEndDt);
  const nextKaranaTimingStr = formatDateTimeRange(karanaEndDt, nextKaranaEndDt);

  // Varjyam / Tyajyam (தியாஜ்யம்) calculation for the 24-hour Panchangam day
  const formatTime12Padded = (d) => {
    let hh = d.getHours();
    const mm = String(d.getMinutes()).padStart(2, '0');
    const ampm = hh >= 12 ? 'PM' : 'AM';
    hh = hh % 12 || 12;
    return `${String(hh).padStart(2, '0')}:${mm} ${ampm}`;
  };

  const getTyajyamPeriod = (nId, sDt, eDt) => {
    const durMs = eDt.getTime() - sDt.getTime();
    const startGhati = VARJYAM_START_GHATIS[nId] ?? 30;
    const tStartMs = sDt.getTime() + (startGhati / 60) * durMs;
    const tEndMs = tStartMs + (4 / 60) * durMs;
    const sPeriodDt = new Date(tStartMs);
    const ePeriodDt = new Date(tEndMs);
    return {
      startDt: sPeriodDt,
      endDt: ePeriodDt,
      str: `${formatTime12Padded(sPeriodDt)} – ${formatTime12Padded(ePeriodDt)}`
    };
  };

  const localMidnight = new Date(year, month - 1, day, 0, 0, 0);
  const daySunriseDt = new Date(localMidnight.getTime() + sunriseSec * 1000);
  const nextSunriseDt = new Date(daySunriseDt.getTime() + 24 * 3600 * 1000);

  const candidateTyajyamPeriods = [];

  // Previous Nakshatra (if current nakshatra began after today's sunrise)
  if (nakStartDt.getTime() > daySunriseDt.getTime()) {
    const prevNakIdx = (nakshatraId - 1 + 27) % 27;
    const prevNakDurationMs = ((360 / 27) / nakSpeed) * 24 * 3600 * 1000;
    const prevNakStartDt = new Date(nakStartDt.getTime() - prevNakDurationMs);
    candidateTyajyamPeriods.push(getTyajyamPeriod(prevNakIdx, prevNakStartDt, nakStartDt));
  }

  // Current Nakshatra
  candidateTyajyamPeriods.push(getTyajyamPeriod(nakshatraId, nakStartDt, nakEndDt));

  // Next Nakshatra
  const nextNakIdxVal = (nakshatraId + 1) % 27;
  candidateTyajyamPeriods.push(getTyajyamPeriod(nextNakIdxVal, nakEndDt, nextNakEndDt));

  // Subsequent Nakshatra (if next nakshatra ends before next sunrise)
  if (nextNakEndDt.getTime() < nextSunriseDt.getTime()) {
    const afterNextNakIdx = (nakshatraId + 2) % 27;
    const afterNextDurationMs = ((360 / 27) / nakSpeed) * 24 * 3600 * 1000;
    const afterNextEndDt = new Date(nextNakEndDt.getTime() + afterNextDurationMs);
    candidateTyajyamPeriods.push(getTyajyamPeriod(afterNextNakIdx, nextNakEndDt, afterNextEndDt));
  }

  const activeTyajyamList = candidateTyajyamPeriods.filter(
    p => p.endDt.getTime() > daySunriseDt.getTime() && p.startDt.getTime() < nextSunriseDt.getTime()
  );

  const tyajyam = activeTyajyamList.length > 0
    ? activeTyajyamList.map(p => p.str)
    : [getTyajyamPeriod(nakshatraId, nakStartDt, nakEndDt).str];

  return {
    meta: {
      date: resolvedDate,
      time: resolvedTime,
      placeName,
      formattedAddress: formattedAddress || placeName,
      latitude: Number(latitude),
      longitude: Number(longitude),
      ayanamsa,
      timezone,
      lang: activeLang,
      calculationSystem: 'Thirukanitha Panchangam (Drik Ganita)',
      calculationSystemTa: 'திருக்கணித பஞ்சாங்கம்'
    },
    tamilCalendar: {
      tamilDate,
      tamilDateTa,
      tamilDateEn,
      tamilYearName: localizedYearName,
      tamilYearTa: yearNameTa,
      tamilYearEn: yearNameEn,
      tamilYearId: yearIndex,
      tamilMonthName: localizedMonthName,
      tamilMonthTa: monthNameTa,
      tamilMonthEn: monthNameEn,
      tamilMonthId: sunRasiId,
      tamilDay: sunDegInRasi,
      ayanam,
      ayanamTa,
      ayanamEn,
      ruthu,
      ruthuTa,
      ruthuEn
    },
    panchaAngam: {
      vaaram: {
        name: vaaram,
        nameTa: vaaramTa,
        nameEn: vaaramEn,
        sanskrit: SANSKRIT_VAARAM[weekdayIndex],
        dayOfWeek: weekdayIndex,
        lord: HORA_PLANETS_ORDER[DAY_HORA_START_INDEX[weekdayIndex]]?.[activeLang] || 'சந்திரன்'
      },
      paksha: {
        nameEn: isShukla ? 'Shukla Paksha' : 'Krishna Paksha',
        nameTa: isShukla ? 'வளர்பிறை' : 'தேய்பிறை',
        isShukla
      },
      tithi: {
        name: tithiName,
        nameTa: isShukla ? (tithiIndex === 14 ? 'பௌர்ணமி' : `வளர்பிறை ${tithiObj?.nameTa || ''}`) : (tithiIndex === 29 ? 'அமாவாசை' : `தேய்பிறை ${tithiObj?.nameTa || ''}`),
        nameEn: currentTithiNameEn,
        paksha: pakshaText,
        pakshaTa,
        isShukla,
        tithiIndex,
        percentage: tithiPercentage,
        endTime: tithiEndTime,
        timingStr: tithiTimingStr,
        deity: getLocalizedField(tithiObj?.deity, activeLang),
        fullDisplay: `${tithiName} (${pakshaText})`,
        next: {
          nameEn: nextTithiNameEn,
          nameTa: nextTithiNameTa,
          timingStr: nextTithiTimingStr
        }
      },
      nakshatra: {
        name: nakshatraName,
        nameTa: nakshatraNameTa,
        nameEn: nakshatraData?.name || nakshatraMeta?.nameEn,
        pada,
        padaLabel: padaText,
        nakshatraIndex: nakshatraId,
        endTime: nakshatraEndTime,
        timingStr: nakTimingStr,
        lord: getLocalizedField(nakshatraMeta.lord, activeLang),
        lordEn: nakshatraMeta?.lord?.en || 'Ketu',
        lordTa: nakshatraMeta?.lord?.ta || 'கேது',
        deity: getLocalizedField(nakshatraMeta.deity, activeLang),
        animal: getLocalizedField(nakshatraMeta.animal, activeLang),
        tree: getLocalizedField(nakshatraMeta.tree, activeLang),
        bird: getLocalizedField(nakshatraMeta.bird, activeLang),
        gana: getLocalizedField(nakshatraMeta.gana, activeLang),
        yoniGender: getLocalizedField(nakshatraMeta.yoniGender, activeLang),
        fullDisplay: `${nakshatraName} - ${padaText}`,
        next: {
          nameEn: nextNakData?.name,
          nameTa: nextNakMeta?.nameTa || nextNakData?.nameTa,
          timingStr: nextNakTimingStr
        }
      },
      yoga: {
        nithyaYoga: nithyaYogam,
        nithyaYogaTa: nithyaYogamTa,
        nameEn: yogaObj?.name,
        nameTa: nithyaYogamTa,
        timingStr: yogaTimingStr,
        yogaIndex,
        dinaYoga: {
          name: dinaYoga[activeLang] || dinaYoga.ta,
          nameTa: dinaYoga.ta,
          nameEn: dinaYoga.en,
          timingStr: nakTimingStr,
          nature: activeLang === 'ta' ? dinaYoga.natureTa : dinaYoga.natureEn,
          natureTa: dinaYoga.natureTa,
          natureNote: dinaYoga.natureTa === 'சுபம்' ? 'நல்லது' : dinaYoga.natureTa,
          isAuspicious: dinaYoga.isAuspicious,
          color: dinaYoga.color,
          desc: dinaYoga.descTa
        },
        next: {
          nameEn: nextYogaObj?.name,
          nameTa: nextYogaObj?.nameTa,
          timingStr: nextYogaTimingStr
        }
      },
      karana: {
        name: karanamName,
        nameTa: karanamNameTa,
        nameEn: karanamObj?.name,
        timingStr: karanaTimingStr,
        karanaIndex: karanamObj ? karanamObj.karanaId : 2,
        type: karanaTypeTa,
        lord: getLocalizedField(karanamObj?.lord, activeLang),
        deity: getLocalizedField(karanamObj?.deity, activeLang),
        next: {
          nameEn: nextKaranamObj?.name,
          nameTa: nextKaranamObj?.nameTa,
          timingStr: nextKaranaTimingStr
        }
      },
      ayana: {
        nameEn: isUttarayana ? 'Uttarayana' : 'Dakshinayana',
        nameTa: isUttarayana ? 'உத்தராயணம்' : 'தக்ஷிணாயனம்'
      },
      nokkuNaal,
      hijri
    },
    astronomy: {
      sunrise,
      sunset,
      moonrise: moonriseStr,
      moonset: moonsetStr,
      dayDuration: dayDurationFormatted,
      dayDurationTa,
      dayDurationEn,
      nightDuration: nightDurationFormatted,
      nightDurationTa,
      nightDurationEn,
      sunSign: {
        rasiName: sunRasi,
        rasiNameTa: sunRasiTa,
        rasiNameEn: sunRasiObj?.name || 'Libra',
        rasiId: sunRasiId,
        degree: `${sunDegFormatted}°`
      },
      moonSign: {
        rasiName: moonRasi,
        rasiNameTa: moonRasiTa,
        rasiNameEn: moonRasiObj?.name || 'Aries',
        rasiId: moonRasiId,
        degree: `${moonDegInRasi}°`
      }
    },
    monthlyMuhurthamDates,
    muhurthamAndTimings: {
      nallaNeram,
      gowriNallaNeram,
      brahmaMuhurtham,
      abhijitMuhurtham,
      subhaMuhurtham,
      subhaMuhurthamInfo,
      monthlyMuhurthamDates,
      rahuKalam,
      yamakandam,
      kuligai,
      durmuhurtham,
      tyajyam,
      soolam: {
        direction: soolamDirection,
        directionTa: soolamData.direction.ta,
        directionEn: soolamData.direction.en,
        pariharam: soolamPariharam,
        pariharamTa: soolamData.pariharam.ta,
        pariharamEn: soolamData.pariharam.en
      }
    },
    chandrashtamam: {
      rasiName: chandrashtamaRasi,
      rasiNameTa: chandrashtamaRasiTa,
      rasiNameEn: chandrashtamaRasiObj?.name || chandrashtamaRasi,
      rasiId: chandrashtamaRasiId,
      nakshatras: chandrashtamaStars,
      nakshatrasTa: CHANDRASHTAMA_STARS[chandrashtamaRasiId]?.ta || chandrashtamaStars,
      nakshatrasEn: CHANDRASHTAMA_STARS[chandrashtamaRasiId]?.en || chandrashtamaStars,
      note: activeLang === 'ta'
        ? `இன்று ${chandrashtamaRasiTa} ராசி அன்பர்கள் புதிய முக்கிய முடிவுகள், பணப்பரிவர்த்தனைகள் மற்றும் வாக்குவாதங்களைத் தவிர்ப்பது நலம்.`
        : `Today native people of ${chandrashtamaRasiObj?.name || chandrashtamaRasi} should exercise caution in new commitments, major financial investments, and disputes.`,
      noteTa: `இன்று ${chandrashtamaRasiTa} ராசி அன்பர்கள் புதிய முக்கிய முடிவுகள், பணப்பரிவர்த்தனைகள் மற்றும் வாக்குவாதங்களைத் தவிர்ப்பது நலம்.`,
      noteEn: `Today native people of ${chandrashtamaRasiObj?.name || chandrashtamaRasi} should exercise caution in new commitments, major financial investments, and disputes.`
    },
    horaiSchedule,
    gowriPanchangamSchedule: {
      activePeriod: activeGowriPeriod,
      day: gowriDaySchedule,
      night: gowriNightSchedule
    }
  };
}

