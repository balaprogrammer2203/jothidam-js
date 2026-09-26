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
    ? (activeLang === 'ta' ? 'சுக்ல பக்ஷம்' : activeLang === 'hi' ? 'शुक्ल पक्ष' : activeLang === 'te' ? 'శుక్ల పక్షం' : activeLang === 'kn' ? 'ಶುಕ್ಲ ಪಕ್ಷ' : activeLang === 'ml' ? 'ശുക്ല പക്ഷം' : 'Shukla Paksha')
    : (activeLang === 'ta' ? 'கிருஷ்ண பக்ஷம்' : activeLang === 'hi' ? 'कृष्ण पक्ष' : activeLang === 'te' ? 'కృష్ణ పక్షం' : activeLang === 'kn' ? 'ಕೃಷ್ಣ ಪಕ್ಷ' : activeLang === 'ml' ? 'കൃഷ്ണ പക്ഷം' : 'Krishna Paksha');
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
