/**
 * 108 Nakshatra Padas (நட்சத்திர பாதங்கள்) Master Dataset
 * 27 Nakshatras x 4 Padas = 108 Padas
 * 6 Languages: English (en), Tamil (ta), Hindi (hi), Telugu (te), Kannada (kn), Malayalam (ml)
 */

export const PLANETS_MAP = {
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

export const RASIS_META = [
  { rasiId: 0, order: 1, name: 'Aries', nameTa: 'மேஷம்', nameHi: 'मेष', nameTe: 'మేషం', nameKn: 'ಮೇಷ', nameMl: 'മേടം', lord: 4 },
  { rasiId: 1, order: 2, name: 'Taurus', nameTa: 'ரிஷபம்', nameHi: 'वृषभ', nameTe: 'వృషభం', nameKn: 'ವೃಷಭ', nameMl: 'ഇടവം', lord: 3 },
  { rasiId: 2, order: 3, name: 'Gemini', nameTa: 'மிதுனம்', nameHi: 'मिथुन', nameTe: 'మిథునం', nameKn: 'ಮಿಥುನ', nameMl: 'മിഥുനം', lord: 2 },
  { rasiId: 3, order: 4, name: 'Cancer', nameTa: 'கடகம்', nameHi: 'कर्क', nameTe: 'కర్కాటకం', nameKn: 'ಕರ್ಕಾಟಕ', nameMl: 'കർക്കിടകം', lord: 1 },
  { rasiId: 4, order: 5, name: 'Leo', nameTa: 'சிம்மம்', nameHi: 'सिंह', nameTe: 'సింహం', nameKn: 'ಸಿಂಹ', nameMl: 'ചിങ്ങം', lord: 0 },
  { rasiId: 5, order: 6, name: 'Virgo', nameTa: 'கன்னி', nameHi: 'कन्या', nameTe: 'కన్య', nameKn: 'ಕನ್ಯಾ', nameMl: 'കന്നി', lord: 2 },
  { rasiId: 6, order: 7, name: 'Libra', nameTa: 'துலாம்', nameHi: 'तुला', nameTe: 'తుల', nameKn: 'ತುಲಾ', nameMl: 'തുലാം', lord: 3 },
  { rasiId: 7, order: 8, name: 'Scorpio', nameTa: 'விருச்சிகம்', nameHi: 'वृश्चिक', nameTe: 'వృశ్చికం', nameKn: 'ವೃಶ್ಚಿಕ', nameMl: 'വൃശ്ചികം', lord: 4 },
  { rasiId: 8, order: 9, name: 'Sagittarius', nameTa: 'தனுசு', nameHi: 'धनु', nameTe: 'ధనుస్సు', nameKn: 'ಧನುಸ್ಸು', nameMl: 'ധനു', lord: 5 },
  { rasiId: 9, order: 10, name: 'Capricorn', nameTa: 'மகரம்', nameHi: 'मकर', nameTe: 'మకరం', nameKn: 'ಮಕರ', nameMl: 'മകരം', lord: 6 },
  { rasiId: 10, order: 11, name: 'Aquarius', nameTa: 'கும்பம்', nameHi: 'कुम्भ', nameTe: 'కుంభం', nameKn: 'ಕುಂಭ', nameMl: 'കുംഭം', lord: 6 },
  { rasiId: 11, order: 12, name: 'Pisces', nameTa: 'மீனம்', nameHi: 'मीन', nameTe: 'మీనం', nameKn: 'ಮೀನ', nameMl: 'മീനം', lord: 5 }
];

export const NAKSHATRAS_META = [
  {
    nakshatraId: 0, order: 1, name: 'Ashwini', nameTa: 'அசுவினி', nameHi: 'अश्विनी', nameTe: 'అశ్విని', nameKn: 'ಅಶ್ವಿನಿ', nameMl: 'അശ്വതി',
    lord: 8,
    gana: { name: 'Deva', nameTa: 'தேவ கணம்', nameHi: 'देव गण', nameTe: 'దేవ గణము', nameKn: 'ದೇವ ಗಣ', nameMl: 'ദേവ ഗണം' },
    yoni: { name: 'Male Horse', nameTa: 'ஆண் குதிரை', nameHi: 'अश्व (घोड़ा)', nameTe: 'గుర్రం', nameKn: 'ಕುದುರೆ', nameMl: 'കുതിര' },
    animal: { name: 'Horse', nameTa: 'குதிரை', nameHi: 'घोड़ा', nameTe: 'గుర్రం', nameKn: 'ಕುದುರೆ', nameMl: 'കുതിര' },
    bird: { name: 'Swan', nameTa: 'அன்னப்பறவை', nameHi: 'हंस', nameTe: 'హంస', nameKn: 'ಹಂಸ', nameMl: 'അന്നം' },
    tree: { name: 'Poison Nut (Etti)', nameTa: 'எட்டி', nameHi: 'कुचिला', nameTe: 'ముషిణి', nameKn: 'ಕಾಸರಕ', nameMl: 'കാഞ്ഞിരം' },
    deity: { name: 'Ashwini Kumaras', nameTa: 'அஸ்வினி குமாரர்கள்', nameHi: 'अश्विनी कुमार', nameTe: 'అశ్విని కుమారులు', nameKn: 'ಅಶ್ವಿನಿ ಕುಮಾರರು', nameMl: 'അശ്വിനികുമാരന്മാർ' }
  },
  {
    nakshatraId: 1, order: 2, name: 'Bharani', nameTa: 'பரணி', nameHi: 'भरणी', nameTe: 'భరణి', nameKn: 'ಭರಣಿ', nameMl: 'ഭരണി',
    lord: 3,
    gana: { name: 'Manushya', nameTa: 'மனுஷ கணம்', nameHi: 'मनुष्य गण', nameTe: 'మనుష్య గణము', nameKn: 'ಮನುಷ್ಯ ಗಣ', nameMl: 'മനുഷ്യ ഗണം' },
    yoni: { name: 'Male Elephant', nameTa: 'ஆண் யானை', nameHi: 'गज (हाथी)', nameTe: 'ఏనుగు', nameKn: 'ಆನೆ', nameMl: 'ആന' },
    animal: { name: 'Elephant', nameTa: 'யானை', nameHi: 'हाथी', nameTe: 'ఏనుగు', nameKn: 'ಆನೆ', nameMl: 'ആന' },
    bird: { name: 'Crow', nameTa: 'காகம்', nameHi: 'कौआ', nameTe: 'కాకి', nameKn: 'ಕಾಗೆ', nameMl: 'കാക്ക' },
    tree: { name: 'Amla (Nelli)', nameTa: 'நெல்லி', nameHi: 'आंवला', nameTe: 'ఉసిరి', nameKn: 'ನೆಲ್ಲಿ', nameMl: 'നെല്ലി' },
    deity: { name: 'Yama', nameTa: 'எமன்', nameHi: 'यमराज', nameTe: 'యముడు', nameKn: 'ಯಮ', nameMl: 'യമൻ' }
  },
  {
    nakshatraId: 2, order: 3, name: 'Krittika', nameTa: 'கார்த்திகை', nameHi: 'कृत्तिका', nameTe: 'కృత్తిక', nameKn: 'ಕೃತಿಕಾ', nameMl: 'കാർത്തിക',
    lord: 0,
    gana: { name: 'Rakshasa', nameTa: 'ராட்சஸ கணம்', nameHi: 'राक्षस गण', nameTe: 'రాక్షస గణము', nameKn: 'ರಾಕ್ಷಸ ಗಣ', nameMl: 'രാക്ഷസ ഗണം' },
    yoni: { name: 'Female Sheep / Goat', nameTa: 'பெண் ஆடு', nameHi: 'मेढ़ा / बकरी', nameTe: 'మేక', nameKn: 'ಕುರಿ / ಮೇಕೆ', nameMl: 'ആട്' },
    animal: { name: 'Sheep / Goat', nameTa: 'ஆடு', nameHi: 'भेड़ / बकरी', nameTe: 'గొర్రె / మేక', nameKn: 'ಕುರಿ', nameMl: 'ആട്' },
    bird: { name: 'Peacock', nameTa: 'மயில்', nameHi: 'मोर', nameTe: 'నెమలి', nameKn: 'ನವಿಲು', nameMl: 'മയിൽ' },
    tree: { name: 'Cluster Fig (Athi)', nameTa: 'அத்தி', nameHi: 'गूलर', nameTe: 'మేడి చెట్టు', nameKn: 'ಅತ್ತಿ', nameMl: 'അത്തി' },
    deity: { name: 'Agni', nameTa: 'அக்னி', nameHi: 'अग्नि देव', nameTe: 'అగ్నిదేవుడు', nameKn: 'ಅಗ್ನಿ ದೇವ', nameMl: 'അഗ്നി' }
  },
  {
    nakshatraId: 3, order: 4, name: 'Rohini', nameTa: 'ரோகிணி', nameHi: 'रोहिणी', nameTe: 'రోహిణి', nameKn: 'ರೋಹಿಣಿ', nameMl: 'രോഹിണി',
    lord: 1,
    gana: { name: 'Manushya', nameTa: 'மனுஷ கணம்', nameHi: 'मनुष्य गण', nameTe: 'మనుష్య గణము', nameKn: 'ಮನುಷ್ಯ ಗಣ', nameMl: 'മനുഷ്യ ഗണം' },
    yoni: { name: 'Male Serpent', nameTa: 'ஆண் பாம்பு', nameHi: 'सर्प', nameTe: 'పాము', nameKn: 'ಹಾವು', nameMl: 'സർപ്പം' },
    animal: { name: 'Serpent', nameTa: 'பாம்பு', nameHi: 'सांप', nameTe: 'సర్పము', nameKn: 'ಹಾವು', nameMl: 'പാമ്പ്' },
    bird: { name: 'Owl', nameTa: 'ஆந்தை', nameHi: 'उल्लू', nameTe: 'గుడ్లగూబ', nameKn: 'ಗೂಬೆ', nameMl: 'മൂങ്ങ' },
    tree: { name: 'Jamun (Naval)', nameTa: 'நாவல்', nameHi: 'जामुन', nameTe: 'నేరేడు', nameKn: 'ನೇರಳೆ', nameMl: 'ഞാവൽ' },
    deity: { name: 'Brahma / Prajapati', nameTa: 'பிரம்மா', nameHi: 'ब्रह्मा / प्रजापति', nameTe: 'బ్రహ్మ', nameKn: 'ಬ್ರಹ್ಮ', nameMl: 'ബ്രഹ്മാവ്' }
  },
  {
    nakshatraId: 4, order: 5, name: 'Mrigashira', nameTa: 'மிருகசீரிஷம்', nameHi: 'मृगशिरा', nameTe: 'మృగశిర', nameKn: 'ಮೃಗಶಿರ', nameMl: 'മകയിരം',
    lord: 4,
    gana: { name: 'Deva', nameTa: 'தேவ கணம்', nameHi: 'देव गण', nameTe: 'దేవ గణము', nameKn: 'ದೇವ ಗಣ', nameMl: 'ദേവ ഗണം' },
    yoni: { name: 'Female Serpent', nameTa: 'பெண் பாம்பு', nameHi: 'सर्पिणी', nameTe: 'ఆడ పాము', nameKn: 'ಹೆಣ್ಣು ಹಾವು', nameMl: 'പെൺപാമ്പ്' },
    animal: { name: 'Serpent', nameTa: 'பாம்பு', nameHi: 'सांप', nameTe: 'సర్పము', nameKn: 'ಹಾವು', nameMl: 'പാമ്പ്' },
    bird: { name: 'Hen / Cock', nameTa: 'கோழி', nameHi: 'मुर्गी', nameTe: 'కోడి', nameKn: 'ಕೋಳಿ', nameMl: 'കോഴി' },
    tree: { name: 'Cutch Tree (Karungali)', nameTa: 'கருங்காலி', nameHi: 'खैर', nameTe: 'చండ్ర', nameKn: 'ಕಗ್ಗಲಿ', nameMl: 'കരിങ്ങാലി' },
    deity: { name: 'Soma / Chandra', nameTa: 'சந்திரன்', nameHi: 'सोम (चन्द्र)', nameTe: 'చంద్రుడు', nameKn: 'ಸೋಮ (ಚಂದ್ರ)', nameMl: 'ചന്ദ്രൻ' }
  },
  {
    nakshatraId: 5, order: 6, name: 'Ardra', nameTa: 'திருவாதிரை', nameHi: 'आर्द्रा', nameTe: 'ఆర్ద్ర', nameKn: 'ಆರ್ದ್ರಾ', nameMl: 'തിരുവാതിര',
    lord: 7,
    gana: { name: 'Manushya', nameTa: 'மனுஷ கணம்', nameHi: 'मनुष्य गण', nameTe: 'మనుష్య గణము', nameKn: 'ಮನುಷ್ಯ ಗಣ', nameMl: 'മനുഷ്യ ഗണം' },
    yoni: { name: 'Female Dog', nameTa: 'பெண் நாய்', nameHi: 'कुतिया (श्वान)', nameTe: 'ఆడ కుక్క', nameKn: 'ಹೆಣ್ಣು ನಾಯಿ', nameMl: 'പെൺപട്ടി' },
    animal: { name: 'Dog', nameTa: 'நாய்', nameHi: 'कुत्ता', nameTe: 'కుక్క', nameKn: 'ನಾಯಿ', nameMl: 'പട്ടി' },
    bird: { name: 'Andril Bird', nameTa: 'அன்றில்', nameHi: 'चक्रवाक', nameTe: 'చక్రవాకం', nameKn: 'ಚಕ್ರವಾಕ', nameMl: 'ചക്രവാകം' },
    tree: { name: 'Red Wood (Semmaram)', nameTa: 'செம்மரம்', nameHi: 'रक्तचंदन / अगर', nameTe: 'ఎర్రచందనం', nameKn: 'ರಕ್ತಚಂದನ', nameMl: 'ചെമ്മരം' },
    deity: { name: 'Rudra (Shiva)', nameTa: 'ருத்ரன் (சிவன்)', nameHi: 'रुद्र (शिव)', nameTe: 'రుద్రుడు (శివుడు)', nameKn: 'ರುದ್ರ (ಶಿವ)', nameMl: 'രുദ്രൻ (ശിവൻ)' }
  },
  {
    nakshatraId: 6, order: 7, name: 'Punarvasu', nameTa: 'புனர்பூசம்', nameHi: 'पुनर्वसु', nameTe: 'పునర్వసు', nameKn: 'ಪುನರ್ವಸು', nameMl: 'പുണർതം',
    lord: 5,
    gana: { name: 'Deva', nameTa: 'தேவ கணம்', nameHi: 'देव गण', nameTe: 'దేవ గణము', nameKn: 'ದೇವ ಗಣ', nameMl: 'ദേവ ഗണം' },
    yoni: { name: 'Female Cat', nameTa: 'பெண் பூனை', nameHi: 'मार्जार (बिल्ली)', nameTe: 'పిల్లి', nameKn: 'ಬೆಕ್ಕು', nameMl: 'പൂച്ച' },
    animal: { name: 'Cat', nameTa: 'பூனை', nameHi: 'बिल्ली', nameTe: 'పిల్లి', nameKn: 'ಬೆಕ್ಕು', nameMl: 'പൂച്ച' },
    bird: { name: 'Swan', nameTa: 'அன்னம்', nameHi: 'हंस', nameTe: 'హంస', nameKn: 'ಹಂಸ', nameMl: 'അന്നം' },
    tree: { name: 'Bamboo (Moongil)', nameTa: 'மூங்கில்', nameHi: 'बांस', nameTe: 'వెదురు', nameKn: 'ಬಿದಿರು', nameMl: 'മുള' },
    deity: { name: 'Aditi', nameTa: 'அதிதி', nameHi: 'अदिति', nameTe: 'అదితి', nameKn: 'ಅದಿತಿ', nameMl: 'അദിതി' }
  },
  {
    nakshatraId: 7, order: 8, name: 'Pushya', nameTa: 'பூசம்', nameHi: 'पुष्य', nameTe: 'పుష్యమి', nameKn: 'ಪುಷ್ಯ', nameMl: 'പൂയം',
    lord: 6,
    gana: { name: 'Deva', nameTa: 'தேவ கணம்', nameHi: 'देव गण', nameTe: 'దేవ గణము', nameKn: 'ದೇವ ಗಣ', nameMl: 'ദേവ ಗണം' },
    yoni: { name: 'Male Sheep / Ram', nameTa: 'ஆண் ஆடு', nameHi: 'मेढ़ा', nameTe: 'పొట్టేలు', nameKn: 'ಟಗರು', nameMl: 'ആട്ടുകൊറ്റൻ' },
    animal: { name: 'Sheep', nameTa: 'ஆடு', nameHi: 'भेड़', nameTe: 'గొర్రె', nameKn: 'ಕುರಿ', nameMl: 'ആട്' },
    bird: { name: 'Crow / Sea Gull', nameTa: 'காகம்', nameHi: 'कौआ', nameTe: 'కాకి', nameKn: 'ಕಾಗೆ', nameMl: 'കാക്ക' },
    tree: { name: 'Sacred Fig (Arasu)', nameTa: 'அரசு', nameHi: 'पीपल', nameTe: 'రావి చెట్టు', nameKn: 'ಅರಳಿ ಮರ', nameMl: 'അരയാൽ' },
    deity: { name: 'Brihaspati (Guru)', nameTa: 'பிருஹஸ்பதி (குரு)', nameHi: 'बृहस्पति', nameTe: 'బృహస్పతి', nameKn: 'ಬೃಹಸ್ಪತಿ', nameMl: 'ബൃഹസ്പതി' }
  },
  {
    nakshatraId: 8, order: 9, name: 'Ashlesha', nameTa: 'ஆயில்யம்', nameHi: 'आश्लेषा', nameTe: 'ఆశ్లేష', nameKn: 'ಆಶ್ಲೇಷಾ', nameMl: 'ആയില്യം',
    lord: 2,
    gana: { name: 'Rakshasa', nameTa: 'ராட்சஸ கணம்', nameHi: 'राक्षस गण', nameTe: 'రాక్షస గణము', nameKn: 'ರಾಕ್ಷಸ ಗಣ', nameMl: 'രാക്ഷസ ഗണം' },
    yoni: { name: 'Male Cat', nameTa: 'ஆண் பூனை', nameHi: 'बिलाव', nameTe: 'మగ పిల్లి', nameKn: 'ಗಂಡು ಬೆಕ್ಕು', nameMl: 'ആൺപൂച്ച' },
    animal: { name: 'Cat', nameTa: 'பூனை', nameHi: 'बिल्ली', nameTe: 'పిల్లి', nameKn: 'ಬೆಕ್ಕು', nameMl: 'പൂച്ച' },
    bird: { name: 'Small Sparrow', nameTa: 'சிட்டுக்குருவி', nameHi: 'गौरैया', nameTe: 'పిచ్చుక', nameKn: 'ಗುಬ್ಬಚ್ಚಿ', nameMl: 'കുരുവി' },
    tree: { name: 'Alexandrian Laurel (Punnai)', nameTa: 'புன்னை', nameHi: 'नागकेसर / पुन्नाग', nameTe: 'పున్నాగ', nameKn: 'ಸುರಗಿ ಮರ', nameMl: 'പുന്ന' },
    deity: { name: 'Nagas / Sarpa', nameTa: 'நாகர்கள்', nameHi: 'नाग देव', nameTe: 'నాగదేవత', nameKn: 'ನಾಗ ದೇವತೆ', nameMl: 'നാഗങ്ങൾ' }
  },
  {
    nakshatraId: 9, order: 10, name: 'Magha', nameTa: 'மகம்', nameHi: 'मघा', nameTe: 'మఖ', nameKn: 'ಮಖಾ', nameMl: 'മകം',
    lord: 8,
    gana: { name: 'Rakshasa', nameTa: 'ராட்சஸ கணம்', nameHi: 'राक्षस गण', nameTe: 'రాక్షస గణము', nameKn: 'ರಾಕ್ಷಸ ಗಣ', nameMl: 'രാക്ഷസ ഗണം' },
    yoni: { name: 'Male Rat', nameTa: 'ஆண் எலி', nameHi: 'मूषक (चूहा)', nameTe: 'ఎలుక', nameKn: 'ಇಲಿ', nameMl: 'എലി' },
    animal: { name: 'Rat', nameTa: 'எலி', nameHi: 'चूहा', nameTe: 'ఎలుక', nameKn: 'ಇಲಿ', nameMl: 'എലി' },
    bird: { name: 'Male Eagle', nameTa: 'ஆண் கழுகு', nameHi: 'चील / गरुड़', nameTe: 'గద్ద', nameKn: 'ಹದ್ದು', nameMl: 'കഴുകൻ' },
    tree: { name: 'Banyan Tree (Aal)', nameTa: 'ஆலமரம்', nameHi: 'बरगद', nameTe: 'మర్రి చెట్టు', nameKn: 'ಆಲದ ಮರ', nameMl: 'പേരാൽ' },
    deity: { name: 'Pitris (Ancestors)', nameTa: 'பித்ருக்கள்', nameHi: 'पितृ देव', nameTe: 'పితృదేవతలు', nameKn: 'ಪಿತೃ ದೇವತೆಗಳು', nameMl: 'പിതൃക്കൾ' }
  },
  {
    nakshatraId: 10, order: 11, name: 'Purva Phalguni', nameTa: 'பூரம்', nameHi: 'पूर्वाफाल्गुनी', nameTe: 'పూర్వ ఫల్గుణి', nameKn: 'ಪೂರ್ವ ಫಲ್ಗುಣಿ', nameMl: 'പൂരം',
    lord: 3,
    gana: { name: 'Manushya', nameTa: 'மனுஷ கணம்', nameHi: 'मनुष्य गण', nameTe: 'మనుష్య గణము', nameKn: 'ಮನುಷ್ಯ ಗಣ', nameMl: 'മനുഷ്യ ഗണം' },
    yoni: { name: 'Female Rat', nameTa: 'பெண் எலி', nameHi: 'चूहिया', nameTe: 'ఆడ ఎలుక', nameKn: 'ಹೆಣ್ಣು ಇಲಿ', nameMl: 'പെണ്ണെലി' },
    animal: { name: 'Rat', nameTa: 'எலி', nameHi: 'चूहा', nameTe: 'ఎలుక', nameKn: 'ಇಲಿ', nameMl: 'எலி' },
    bird: { name: 'Eagle', nameTa: 'கழுகு', nameHi: 'चील', nameTe: 'గద్ద', nameKn: 'ಹದ್ದು', nameMl: 'കഴുകൻ' },
    tree: { name: 'Flame of the Forest (Palasu)', nameTa: 'பலாசு', nameHi: 'ढाक / पलाश', nameTe: 'మోదుగ', nameKn: 'ಮುತ್ತುಗ', nameMl: 'പ്ലാശ്' },
    deity: { name: 'Bhaga (Sun God)', nameTa: 'பகதேவன்', nameHi: 'भग देव', nameTe: 'భగ దేవుడు', nameKn: 'ಭಗ ದೇವ', nameMl: 'ഭഗൻ' }
  },
  {
    nakshatraId: 11, order: 12, name: 'Uttara Phalguni', nameTa: 'உத்திரம்', nameHi: 'उत्तराफाल्गुनी', nameTe: 'ఉత్తర ఫల్గుణి', nameKn: 'ಉತ್ತರ ಫಲ್ಗುಣಿ', nameMl: 'ഉത്രം',
    lord: 0,
    gana: { name: 'Manushya', nameTa: 'மனுஷ கணம்', nameHi: 'मनुष्य गण', nameTe: 'మనుష్య గణము', nameKn: 'ಮನುಷ್ಯ ಗಣ', nameMl: 'മനുഷ്യ ഗണം' },
    yoni: { name: 'Male Cow / Bull', nameTa: 'ஆண் மாடு (காளை)', nameHi: 'बैल / गाय', nameTe: 'ఎద్దు', nameKn: 'ಎತ್ತು', nameMl: 'കാള' },
    animal: { name: 'Cow / Bull', nameTa: 'மாடு', nameHi: 'गाय / बैल', nameTe: 'గోవు', nameKn: 'ಆಕಳು', nameMl: 'പശു' },
    bird: { name: 'Kite / Beetle', nameTa: 'வண்டு', nameHi: 'भृंग', nameTe: 'తుమ్మెద', nameKn: 'ದುಂಬಿ', nameMl: 'വണ്ട്' },
    tree: { name: 'Rose Apple (Ichi)', nameTa: 'இச்சி / அலரி', nameHi: 'पाकड़ / कनेर', nameTe: 'జువ్వి చెట్టు', nameKn: 'ಇಚ್ಚಿ ಮರ', nameMl: 'ഇത്തി' },
    deity: { name: 'Aryaman', nameTa: 'அரியமான்', nameHi: 'अर्यमा', nameTe: 'అర్యముడు', nameKn: 'ಅರ್ಯಮ', nameMl: 'അര്യമാവ്' }
  },
  {
    nakshatraId: 12, order: 13, name: 'Hasta', nameTa: 'அஸ்தம்', nameHi: 'हस्त', nameTe: 'హస్త', nameKn: 'ಹಸ್ತಾ', nameMl: 'അത്തം',
    lord: 1,
    gana: { name: 'Deva', nameTa: 'தேவ கணம்', nameHi: 'देव गण', nameTe: 'దేవ గణము', nameKn: 'ದೇವ ಗಣ', nameMl: 'ദേവ ഗണം' },
    yoni: { name: 'Female Buffalo', nameTa: 'பெண் எருமை', nameHi: 'भैंस', nameTe: 'ఆడ గేదె', nameKn: 'ಹೆಣ್ಣು ಎಮ್ಮೆ', nameMl: 'എരുമ' },
    animal: { name: 'Buffalo', nameTa: 'எருமை', nameHi: 'भैंस', nameTe: 'గేదె', nameKn: 'ಎಮ್ಮೆ', nameMl: 'പോത്ത്' },
    bird: { name: 'Vulture', nameTa: 'பருந்து', nameHi: 'गिद्ध', nameTe: 'రాబందు', nameKn: 'ರಣಹದ್ದು', nameMl: 'പരുന്ത്' },
    tree: { name: 'Velam (Wild Jasmine)', nameTa: 'வேலம் / ஆத்தி', nameHi: 'चमेली / रीठा', nameTe: 'తుమ్మ చెట్టు', nameKn: 'ಜಾಲಿ ಮರ', nameMl: 'അത്തി' },
    deity: { name: 'Savitr (Sun)', nameTa: 'சாவித்ரி (சூரியன்)', nameHi: 'सविता (सूर्य)', nameTe: 'సవితృడు', nameKn: 'ಸವಿತೃ', nameMl: 'സവിതൃ' }
  },
  {
    nakshatraId: 13, order: 14, name: 'Chitra', nameTa: 'சித்திரை', nameHi: 'चित्रा', nameTe: 'చిత్త', nameKn: 'ಚಿತ್ತಾ', nameMl: 'ചിത്തിര',
    lord: 4,
    gana: { name: 'Rakshasa', nameTa: 'ராட்சஸ கணம்', nameHi: 'राक्षस गण', nameTe: 'రాక్షస గణము', nameKn: 'ರಾಕ್ಷಸ ಗಣ', nameMl: 'രാಕ್ಷಸ ಗണം' },
    yoni: { name: 'Female Tiger', nameTa: 'பெண் புலி', nameHi: 'बाघिन', nameTe: 'ఆడ పులి', nameKn: 'ಹೆಣ್ಣು ಹುಲಿ', nameMl: 'പെൺപുലി' },
    animal: { name: 'Tiger', nameTa: 'புலி', nameHi: 'बाघ', nameTe: 'పులి', nameKn: 'ಹುಲಿ', nameMl: 'പുലി' },
    bird: { name: 'Woodpecker', nameTa: 'மரங்கொத்தி', nameHi: 'कठफोड़वा', nameTe: 'వడ్రంగి పిట్ట', nameKn: 'ಮರಕುಟಿಗ', nameMl: 'മരംകൊത്തി' },
    tree: { name: 'Bael Tree (Vilvam)', nameTa: 'வில்வம்', nameHi: 'बेल पत्र', nameTe: 'మారేడు చెట్టు', nameKn: 'ಬೇಲದ ಮರ', nameMl: 'കൂവളം' },
    deity: { name: 'Vishwakarma', nameTa: 'விஸ்வகர்மா', nameHi: 'विश्वकर्मा', nameTe: 'విశ్వకర్మ', nameKn: 'ವಿಶ್ವಕರ್ಮ', nameMl: 'വിശ്വകർമ്മാവ്' }
  },
  {
    nakshatraId: 14, order: 15, name: 'Swati', nameTa: 'சுவாதி', nameHi: 'स्वाति', nameTe: 'స్వాతి', nameKn: 'ಸ್ವಾತಿ', nameMl: 'ചോതി',
    lord: 7,
    gana: { name: 'Deva', nameTa: 'தேவ கணம்', nameHi: 'देव गण', nameTe: 'దేవ గణము', nameKn: 'ದೇವ ಗಣ', nameMl: 'ദേവ ഗണം' },
    yoni: { name: 'Male Buffalo', nameTa: 'ஆண் எருமை', nameHi: 'भैंसा', nameTe: 'మగ దున్న', nameKn: 'ಕೋಣ', nameMl: 'പോത്ത്' },
    animal: { name: 'Buffalo', nameTa: 'எருமை', nameHi: 'भैंसा', nameTe: 'దున్నపోతు', nameKn: 'ಕೋಣ', nameMl: 'പോത്ത്' },
    bird: { name: 'Pigeon', nameTa: 'புறா', nameHi: 'कबूतर', nameTe: 'పావురం', nameKn: 'ಪಾರಿವಾಳ', nameMl: 'പ്രാവ്' },
    tree: { name: 'Arjuna Tree (Marutham)', nameTa: 'மருதம்', nameHi: 'अर्जुन वृक्ष', nameTe: 'మద్ది చెట్టు', nameKn: 'ಮತ್ತಿ ಮರ', nameMl: 'നീർമരുത്' },
    deity: { name: 'Vayu (Wind God)', nameTa: 'வாயு தேவன்', nameHi: 'वायु देव', nameTe: 'వాయు దేవుడు', nameKn: 'ವಾಯು ದೇವ', nameMl: 'വായുദേവൻ' }
  },
  {
    nakshatraId: 15, order: 16, name: 'Vishakha', nameTa: 'விசாகம்', nameHi: 'विशाखा', nameTe: 'విశాఖ', nameKn: 'ವಿಶಾಖಾ', nameMl: 'വിശാഖം',
    lord: 5,
    gana: { name: 'Rakshasa', nameTa: 'ராட்சஸ கணம்', nameHi: 'राक्षस गण', nameTe: 'రాక్షస గణము', nameKn: 'ರಾಕ್ಷಸ ಗಣ', nameMl: 'രാಕ್ಷಸ ಗണം' },
    yoni: { name: 'Male Tiger', nameTa: 'ஆண் புலி', nameHi: 'बाघ', nameTe: 'పులి', nameKn: 'ಹುಲಿ', nameMl: 'പുലി' },
    animal: { name: 'Tiger', nameTa: 'புலி', nameHi: 'बाघ', nameTe: 'పులి', nameKn: 'ಹುಲಿ', nameMl: 'പുലി' },
    bird: { name: 'Red-wattled Lapwing', nameTa: 'செம்பருந்து', nameHi: 'टिटहरी', nameTe: 'టిట్టిభం', nameKn: 'ಟಿಟ್ಟಿಭ', nameMl: 'ചെമ്പോത്ത്' },
    tree: { name: 'Wood Apple (Vila)', nameTa: 'விளா மரம்', nameHi: 'कैथ / कैथा', nameTe: 'వెలగ చెట్టు', nameKn: 'ಬೇಲದ ಮರ', nameMl: 'വിളാംപഴം' },
    deity: { name: 'Indra & Agni', nameTa: 'இந்திரன் மற்றும் அக்னி', nameHi: 'इन्द्राग्नि', nameTe: 'ఇంద్రాగ్నులు', nameKn: 'ಇಂದ್ರ ಮತ್ತು ಅಗ್ನಿ', nameMl: 'ഇന്ദ്രാഗ്നികൾ' }
  },
  {
    nakshatraId: 16, order: 17, name: 'Anuradha', nameTa: 'அனுஷம்', nameHi: 'अनुराधा', nameTe: 'అనూరాధ', nameKn: 'ಅನುರಾಧಾ', nameMl: 'അനിഴം',
    lord: 6,
    gana: { name: 'Deva', nameTa: 'தேவ கணம்', nameHi: 'देव गण', nameTe: 'దేవ గణము', nameKn: 'ದೇವ ಗಣ', nameMl: 'ദേവ ಗണം' },
    yoni: { name: 'Female Deer', nameTa: 'பெண் மான்', nameHi: 'मृगी (हिरणी)', nameTe: 'ఆడ జింక', nameKn: 'ಹೆಣ್ಣು ಜಿಂಕೆ', nameMl: 'പെൺമാൻ' },
    animal: { name: 'Deer', nameTa: 'மான்', nameHi: 'हिरण', nameTe: 'జింక', nameKn: 'ಜಿಂಕೆ', nameMl: 'മാൻ' },
    bird: { name: 'Night Heron / Crow', nameTa: 'காகம்', nameHi: 'कौआ', nameTe: 'కాకి', nameKn: 'ಕಾಗೆ', nameMl: 'കാക്ക' },
    tree: { name: 'Spanish Cherry (Magizham)', nameTa: 'மகிழம்', nameHi: 'मौलसिरी', nameTe: 'పొగడ చెట్టు', nameKn: 'ಬಕುಳ ಮರ', nameMl: 'இലഞ്ഞി' },
    deity: { name: 'Mitra (Sun Deity)', nameTa: 'மித்ரன்', nameHi: 'मित्र देव', nameTe: 'మిత్రుడు', nameKn: 'ಮಿತ್ರ ದೇವ', nameMl: 'മിത്രൻ' }
  },
  {
    nakshatraId: 17, order: 18, name: 'Jyeshtha', nameTa: 'கேட்டை', nameHi: 'ज्येष्ठा', nameTe: 'జ్యేష్ఠ', nameKn: 'ಜ್ಯೇಷ್ಠಾ', nameMl: 'തൃക്കേട്ട',
    lord: 2,
    gana: { name: 'Rakshasa', nameTa: 'ராட்சஸ கணம்', nameHi: 'राक्षस गण', nameTe: 'రాక్షస గణము', nameKn: 'ರಾಕ್ಷಸ ಗಣ', nameMl: 'രാಕ್ಷಸ ಗണം' },
    yoni: { name: 'Male Deer', nameTa: 'ஆண் மான்', nameHi: 'मृग (हिरण)', nameTe: 'మగ జింక', nameKn: 'ಗಂಡು ಜಿಂಕೆ', nameMl: 'ആൺമാൻ' },
    animal: { name: 'Deer', nameTa: 'மான்', nameHi: 'हिरण', nameTe: 'జింక', nameKn: 'ಜಿಂಕೆ', nameMl: 'മാൻ' },
    bird: { name: 'Chakora Bird', nameTa: 'செம்பருந்து', nameHi: 'चकोर', nameTe: 'చకోరం', nameKn: 'ಚಕೋರ', nameMl: 'ചകോരം' },
    tree: { name: 'Silk Cotton (Pirai)', nameTa: 'பராய் / பிராய்', nameHi: 'चीड़ / सेमल', nameTe: 'బూరుగు చెట్టు', nameKn: 'ಬೂರಗದ ಮರ', nameMl: 'വെട്ടി' },
    deity: { name: 'Indra (King of Gods)', nameTa: 'இந்திரன்', nameHi: 'देवराज इन्द्र', nameTe: 'ఇంద్రుడు', nameKn: 'ದೇವೇಂದ್ರ', nameMl: 'ഇന്ദ്രൻ' }
  },
  {
    nakshatraId: 18, order: 19, name: 'Mula', nameTa: 'மூலம்', nameHi: 'मूल', nameTe: 'మూల', nameKn: 'ಮೂಲಾ', nameMl: 'മൂലം',
    lord: 8,
    gana: { name: 'Rakshasa', nameTa: 'ராட்சஸ கணம்', nameHi: 'राक्षस गण', nameTe: 'రాక్షస గణము', nameKn: 'ರಾಕ್ಷಸ ಗಣ', nameMl: 'രാಕ್ಷಸ ಗണം' },
    yoni: { name: 'Male Dog', nameTa: 'ஆண் நாய்', nameHi: 'श्वान (कुत्ता)', nameTe: 'మగ కుక్క', nameKn: 'ನಾಯಿ', nameMl: 'ആൺപട്ടി' },
    animal: { name: 'Dog', nameTa: 'நாய்', nameHi: 'कुत्ता', nameTe: 'కుక్క', nameKn: 'ನಾಯಿ', nameMl: 'പട്ടി' },
    bird: { name: 'Red-crested Cuckoo', nameTa: 'செண்பகப் பறவை', nameHi: 'कोयल', nameTe: 'కోకిల', nameKn: 'ಕೋಗಿಲೆ', nameMl: 'ചെമ്പോത്ത്' },
    tree: { name: 'Sal Tree (Maramaram)', nameTa: 'மராமரம்', nameHi: 'साल वृक्ष', nameTe: 'గుగ్గిలం చెట్టు', nameKn: 'ಸಾಲ ಮರ', nameMl: 'പൈൻ / പച്ചോറ്റി' },
    deity: { name: 'Nirriti (Goddess of Dissolution)', nameTa: 'நிருதி', nameHi: 'निरृति', nameTe: 'నిరృతి', nameKn: 'ನಿರೃತಿ', nameMl: 'നിര്യതി' }
  },
  {
    nakshatraId: 19, order: 20, name: 'Purva Ashadha', nameTa: 'பூராடம்', nameHi: 'पूर्वाषाढ़ा', nameTe: 'పూర్వాషాఢ', nameKn: 'ಪೂರ್ವಾಷಾಢ', nameMl: 'പൂരാടം',
    lord: 3,
    gana: { name: 'Manushya', nameTa: 'மனுஷ கணம்', nameHi: 'मनुष्य गण', nameTe: 'మనుష్య గణము', nameKn: 'ಮನುಷ್ಯ ಗಣ', nameMl: 'മനുഷ്യ ಗണം' },
    yoni: { name: 'Male Monkey', nameTa: 'ஆண் குரங்கு', nameHi: 'वानर (बंदर)', nameTe: 'కోతి', nameKn: 'ಕೋತಿ', nameMl: 'കുരങ്ങ്' },
    animal: { name: 'Monkey', nameTa: 'குரங்கு', nameHi: 'बंदर', nameTe: 'కోతి', nameKn: 'ಮಂಗ', nameMl: 'കുരങ്ങ്' },
    bird: { name: 'Partridge', nameTa: 'கௌதாரி', nameHi: 'तीतर', nameTe: 'కౌజు పిట్ట', nameKn: 'ಗೌಜಲಕ್ಕಿ', nameMl: 'കോഴി' },
    tree: { name: 'Rattan Cane (Vanchi)', nameTa: 'வஞ்சி', nameHi: 'बेंत / जामुन', nameTe: 'బెత్తము', nameKn: 'ಬೆತ್ತದ ಮರ', nameMl: 'വഞ്ചി' },
    deity: { name: 'Apas (Water Cosmic Deity)', nameTa: 'அபாஸ் (வருணன்)', nameHi: 'आपः (जल देवता)', nameTe: 'జలదేవత', nameKn: 'ಅಪಾಃ (ಜಲ ದೇವತೆ)', nameMl: 'ജലദേവത' }
  },
  {
    nakshatraId: 20, order: 21, name: 'Uttara Ashadha', nameTa: 'உத்திராடம்', nameHi: 'उत्तराषाढ़ा', nameTe: 'ఉత్తరాషాఢ', nameKn: 'ಉತ್ತರಾಷಾಢ', nameMl: 'ഉത്രാടം',
    lord: 0,
    gana: { name: 'Manushya', nameTa: 'மனுஷ கணம்', nameHi: 'मनुष्य गण', nameTe: 'మనుష్య గణము', nameKn: 'ಮನುಷ್ಯ ಗಣ', nameMl: 'മനുഷ്യ ಗണം' },
    yoni: { name: 'Male Mongoose', nameTa: 'ஆண் கீரி', nameHi: 'नेवला', nameTe: 'ముంగిస', nameKn: 'ಮುಂಗುಸಿ', nameMl: 'കീരി' },
    animal: { name: 'Mongoose', nameTa: 'கீரிப்பிள்ளை', nameHi: 'नेवला', nameTe: 'ముంగిస', nameKn: 'ಮುಂಗುಸಿ', nameMl: 'കീരി' },
    bird: { name: 'Stork / Cock', nameTa: 'நாரை', nameHi: 'बगुला', nameTe: 'కొంగ', nameKn: 'ಬೆಳ್ಳಕ್ಕಿ', nameMl: 'കൊക്ക്' },
    tree: { name: 'Jackfruit Tree (Pala)', nameTa: 'பலா மரம்', nameHi: 'कटहल', nameTe: 'పనస చెట్టు', nameKn: 'ಹಲಸಿನ ಮರ', nameMl: 'പ്ലാവ്' },
    deity: { name: 'Vishwadevas', nameTa: 'விஸ்வேதேவர்கள்', nameHi: 'विश्वेदेव', nameTe: 'విశ్వేదేవతలు', nameKn: 'ವಿಶ್ವೇದೇವತೆಗಳು', nameMl: 'വിശ്വേദേവന്മാർ' }
  },
  {
    nakshatraId: 21, order: 22, name: 'Shravana', nameTa: 'திருவோணம்', nameHi: 'श्रवण', nameTe: 'శ్రవణం', nameKn: 'ಶ್ರವಣ', nameMl: 'തിരുവോണം',
    lord: 1,
    gana: { name: 'Deva', nameTa: 'தேவ கணம்', nameHi: 'देव गण', nameTe: 'దేవ గణము', nameKn: 'ದೇವ ಗಣ', nameMl: 'ദേവ ഗണം' },
    yoni: { name: 'Female Monkey', nameTa: 'பெண் குரங்கு', nameHi: 'वानरी', nameTe: 'ఆడ కోతి', nameKn: 'ಹೆಣ್ಣು ಮಂಗ', nameMl: 'പെൺകുരങ്ങ്' },
    animal: { name: 'Monkey', nameTa: 'குரங்கு', nameHi: 'बंदर', nameTe: 'కోతి', nameKn: 'ಮಂಗ', nameMl: 'കുരങ്ങ്' },
    bird: { name: 'Francolin / Hawk', nameTa: 'நண்டு தின்னிப் பறவை', nameHi: 'चील', nameTe: 'డేగ', nameKn: 'ಗಿಡುಗ', nameMl: 'പരുന്ത്' },
    tree: { name: 'Crown Flower (Erukku)', nameTa: 'எருக்கு', nameHi: 'मदार / आक', nameTe: 'జిల్లేడు చెట్టు', nameKn: 'ಎಕ್ಕದ ಗಿಡ', nameMl: 'എരുക്ക്' },
    deity: { name: 'Lord Vishnu', nameTa: 'மகாவிஷ்ணு', nameHi: 'भगवान विष्णु', nameTe: 'మహావిష్ణువు', nameKn: 'ಮಹಾವಿಷ್ಣು', nameMl: 'മഹാവിഷ്ണു' }
  },
  {
    nakshatraId: 22, order: 23, name: 'Dhanishta', nameTa: 'அவிட்டம்', nameHi: 'धनिष्ठा', nameTe: 'ధనిష్ఠ', nameKn: 'ಧನಿಷ್ಠಾ', nameMl: 'അവിട്ടം',
    lord: 4,
    gana: { name: 'Rakshasa', nameTa: 'ராட்சஸ கணம்', nameHi: 'राक्षस गण', nameTe: 'రాక్షస గణము', nameKn: 'ರಾಕ್ಷಸ ಗಣ', nameMl: 'ರಾಕ್ಷಸ ಗಣ' },
    yoni: { name: 'Female Lion', nameTa: 'பெண் சிங்கம்', nameHi: 'सिंहनी', nameTe: 'ఆడ సింహం', nameKn: 'ಹೆಣ್ಣು ಸಿಂಹ', nameMl: 'പെൺസിംഹം' },
    animal: { name: 'Lion', nameTa: 'சிங்கம்', nameHi: 'सिंह', nameTe: 'సింహం', nameKn: 'ಸಿಂಹ', nameMl: 'സിംഹം' },
    bird: { name: 'Golden Eagle', nameTa: 'பொன் கழுகு', nameHi: 'सुनहरा गरुड़', nameTe: 'బంగారు గద్ద', nameKn: 'ಚಿನ್ನದ ಹದ್ದು', nameMl: 'പൊൻപരുന്ത്' },
    tree: { name: 'Indian Mesquite (Vanni)', nameTa: 'வன்னி', nameHi: 'शमी वृक्ष', nameTe: 'జమ్మి చెట్టు', nameKn: 'ಬನ್ನಿ ಮರ', nameMl: 'വഹ്നി' },
    deity: { name: 'Ashta Vasus', nameTa: 'அஷ்ட வசுக்கள்', nameHi: 'अष्ट वसु', nameTe: 'అష్ట వసువులు', nameKn: 'ಅಷ್ಟ ವಸುಗಳು', nameMl: 'അഷ്ടവസുക്കൾ' }
  },
  {
    nakshatraId: 23, order: 24, name: 'Shatabhisha', nameTa: 'சதயம்', nameHi: 'शतभिषा', nameTe: 'శతభిషం', nameKn: 'ಶತಭಿಷಾ', nameMl: 'ചതയം',
    lord: 7,
    gana: { name: 'Rakshasa', nameTa: 'ராட்சஸ கணம்', nameHi: 'राक्षस गण', nameTe: 'రాక్షస గణము', nameKn: 'ರಾಕ್ಷಸ ಗಣ', nameMl: 'രാക്ഷസ ಗണം' },
    yoni: { name: 'Female Horse', nameTa: 'பெண் குதிரை', nameHi: 'घोड़ी', nameTe: 'ఆడ గుర్రం', nameKn: 'ಹೆಣ್ಣು ಕುದುರೆ', nameMl: 'പെൺകുതിര' },
    animal: { name: 'Horse', nameTa: 'குதிரை', nameHi: 'घोड़ा', nameTe: 'గుర్రం', nameKn: 'ಕುದುರೆ', nameMl: 'കുതിര' },
    bird: { name: 'Raven / Crow', nameTa: 'அண்டங்காக்கை', nameHi: 'काला कौआ', nameTe: 'మలకాకి', nameKn: 'ಕಾಡು ಕಾಗೆ', nameMl: 'കാക്ക' },
    tree: { name: 'Indian Coral Tree (Kadambu)', nameTa: 'கடம்பு', nameHi: 'कदम्ब', nameTe: 'కదంబ చెట్టు', nameKn: 'ಕದಂಬ ಮರ', nameMl: 'കടമ്പ്' },
    deity: { name: 'Varuna (Water God)', nameTa: 'வருண பகவான்', nameHi: 'वरुण देव', nameTe: 'వరుణ దేవుడు', nameKn: 'ವರುಣ ದೇವ', nameMl: 'വരുണൻ' }
  },
  {
    nakshatraId: 24, order: 25, name: 'Purva Bhadrapada', nameTa: 'பூரட்டாதி', nameHi: 'पूर्वाभाद्रपदा', nameTe: 'పూర్వాభాద్ర', nameKn: 'ಪೂರ್ವಾಭಾದ್ರ', nameMl: 'പൂരുരുട്ടാതി',
    lord: 5,
    gana: { name: 'Manushya', nameTa: 'மனுஷ கணம்', nameHi: 'मनुष्य गण', nameTe: 'మనుష్య గణము', nameKn: 'ಮನುಷ್ಯ ಗಣ', nameMl: 'ಮನುಷ್ಯ ಗಣ' },
    yoni: { name: 'Male Lion', nameTa: 'ஆண் சிங்கம்', nameHi: 'सिंह', nameTe: 'మగ సింహం', nameKn: 'ಗಂಡು ಸಿಂಹ', nameMl: 'ആൺസിംഹം' },
    animal: { name: 'Lion', nameTa: 'சிங்கம்', nameHi: 'सिंह', nameTe: 'సింహం', nameKn: 'ಸಿಂಹ', nameMl: 'സിംഹം' },
    bird: { name: 'Peacock', nameTa: 'மயில்', nameHi: 'मोर', nameTe: 'నెమలి', nameKn: 'ನವಿಲು', nameMl: 'മയിൽ' },
    tree: { name: 'Mango Tree (Maa)', nameTa: 'மாமரம்', nameHi: 'आम का पेड़', nameTe: 'మామిడి చెట్టు', nameKn: 'ಮಾವಿನ ಮರ', nameMl: 'മാവ്' },
    deity: { name: 'Aja Ekapada', nameTa: 'அஜைகபாதர்', nameHi: 'अजैकपाद', nameTe: 'అజైకపాదుడు', nameKn: 'ಅಜೈಕಪಾದ', nameMl: 'അജൈകപാദൻ' }
  },
  {
    nakshatraId: 25, order: 26, name: 'Uttara Bhadrapada', nameTa: 'உத்திரட்டாதி', nameHi: 'उत्तराभाद्रपदा', nameTe: 'ఉత్తరాభాద్ర', nameKn: 'ಉತ್ತರಾಭಾದ್ರ', nameMl: 'ഉത്രട്ടാതി',
    lord: 6,
    gana: { name: 'Manushya', nameTa: 'மனுஷ கணம்', nameHi: 'मनुष्य गण', nameTe: 'మనుష్య గణము', nameKn: 'ಮನುಷ್ಯ ಗಣ', nameMl: 'ಮನುಷ್ಯ ಗಣ' },
    yoni: { name: 'Female Cow', nameTa: 'பெண் பசு', nameHi: 'गाय', nameTe: 'ఆవు', nameKn: 'ಆಕಳು', nameMl: 'പശു' },
    animal: { name: 'Cow', nameTa: 'பசு', nameHi: 'गाय', nameTe: 'గోవు', nameKn: 'ಗೋವು', nameMl: 'പശു' },
    bird: { name: 'Dove / Pigeon', nameTa: 'கோட்டான்', nameHi: 'कबूतर / पंडुक', nameTe: 'పావురం', nameKn: 'ಪಾರಿವಾಳ', nameMl: 'പ്രാവ്' },
    tree: { name: 'Neem Tree (Veppam)', nameTa: 'வேப்பமரம்', nameHi: 'नीम', nameTe: 'వేప చెట్టు', nameKn: 'ಬೇವಿನ ಮರ', nameMl: 'വേപ്പ്' },
    deity: { name: 'Ahirbudhnya', nameTa: 'அஹிர்புத்னியன்', nameHi: 'अहिर्बुध्न्य', nameTe: 'అహిర్బుధ్న్యుడు', nameKn: 'ಅಹಿರ್ಬುಧ್ನ್ಯ', nameMl: 'അഹിർബുധ്ന്യൻ' }
  },
  {
    nakshatraId: 26, order: 27, name: 'Revati', nameTa: 'ரேவதி', nameHi: 'रेवती', nameTe: 'రేవతి', nameKn: 'ರೇವತಿ', nameMl: 'രേവതി',
    lord: 2,
    gana: { name: 'Deva', nameTa: 'தேவ கணம்', nameHi: 'देव गण', nameTe: 'దేవ గణము', nameKn: 'ದೇವ ಗಣ', nameMl: 'ദേവ ഗണം' },
    yoni: { name: 'Female Elephant', nameTa: 'பெண் யானை', nameHi: 'हथिनी', nameTe: 'ఆడ ఏనుగు', nameKn: 'ಹೆಣ್ಣು ಆನೆ', nameMl: 'പിടിയാന' },
    animal: { name: 'Elephant', nameTa: 'யானை', nameHi: 'हाथी', nameTe: 'ఏనుగు', nameKn: 'ಆನೆ', nameMl: 'ആന' },
    bird: { name: 'Kestrel / Sparrow', nameTa: 'வல்லூறு', nameHi: 'बाज / गौरैया', nameTe: 'డేగ', nameKn: 'ಗಿಡುಗ', nameMl: 'പ്രാവ്' },
    tree: { name: 'Mahua Tree (Iluppai)', nameTa: 'இலுப்பை', nameHi: 'महुआ', nameTe: 'ఇప్ప చెట్టు', nameKn: 'ಇಪ್ಪೆ ಮರ', nameMl: 'ഇരിപ്പ' },
    deity: { name: 'Pushan (Solar Deity)', nameTa: 'பூஷா (சூரியன்)', nameHi: 'पूषा देव', nameTe: 'పూష దేవుడు', nameKn: 'ಪೂಷ ದೇವ', nameMl: 'പൂഷാവ്' }
  }
];

// 108 Nama Aksharas (Naming sound syllables for child born in each pada)
export const NAKSHATRA_AKSHARAS = [
  // 0. Ashwini
  [
    { en: 'Chu', ta: 'சு', hi: 'चु', te: 'చు', kn: 'ಚು', ml: 'ചു' },
    { en: 'Che', ta: 'சே', hi: 'चे', te: 'చే', kn: 'ಚೇ', ml: 'ചേ' },
    { en: 'Cho', ta: 'சோ', hi: 'चो', te: 'చో', kn: 'ಚೋ', ml: 'ചോ' },
    { en: 'La', ta: 'ல', hi: 'ला', te: 'లా', kn: 'ಲಾ', ml: 'ലാ' }
  ],
  // 1. Bharani
  [
    { en: 'Lee', ta: 'லீ', hi: 'ली', te: 'లీ', kn: 'ಲೀ', ml: 'ലീ' },
    { en: 'Loo', ta: 'லூ', hi: 'लू', te: 'లూ', kn: 'ಲೂ', ml: 'ലൂ' },
    { en: 'Lay', ta: 'லே', hi: 'ले', te: 'లే', kn: 'ಲೇ', ml: 'ലേ' },
    { en: 'Lo', ta: 'லோ', hi: 'लो', te: 'లో', kn: 'ಲೋ', ml: 'ലോ' }
  ],
  // 2. Krittika
  [
    { en: 'A', ta: 'அ', hi: 'अ', te: 'అ', kn: 'ಅ', ml: 'അ' },
    { en: 'E', ta: 'இ', hi: 'इ', te: 'ఇ', kn: 'ಇ', ml: 'ഇ' },
    { en: 'U', ta: 'உ', hi: 'उ', te: 'ఉ', kn: 'ಉ', ml: 'ഉ' },
    { en: 'Ea', ta: 'எ', hi: 'ए', te: 'ఏ', kn: 'ಏ', ml: 'ഏ' }
  ],
  // 3. Rohini
  [
    { en: 'O', ta: 'ஒ', hi: 'ओ', te: 'ఓ', kn: 'ಓ', ml: 'ഓ' },
    { en: 'Va', ta: 'வ', hi: 'वा', te: 'వా', kn: 'ವಾ', ml: 'വാ' },
    { en: 'Vi', ta: 'வி', hi: 'वी', te: 'వీ', kn: 'ವೀ', ml: 'വീ' },
    { en: 'Vu', ta: 'வு', hi: 'वू', te: 'వూ', kn: 'ವೂ', ml: 'വൂ' }
  ],
  // 4. Mrigashira
  [
    { en: 'Ve', ta: 'வே', hi: 'वे', te: 'వే', kn: 'ವೇ', ml: 'വേ' },
    { en: 'Vo', ta: 'வோ', hi: 'वो', te: 'వో', kn: 'ವೋ', ml: 'വോ' },
    { en: 'Ka', ta: 'கா', hi: 'का', te: 'కా', kn: 'ಕಾ', ml: 'കാ' },
    { en: 'Kee', ta: 'கீ', hi: 'की', te: 'కీ', kn: 'ಕೀ', ml: 'കീ' }
  ],
  // 5. Ardra
  [
    { en: 'Ku', ta: 'கு', hi: 'कु', te: 'కు', kn: 'ಕು', ml: 'കു' },
    { en: 'Gha', ta: 'க', hi: 'घ', te: 'ఘ', kn: 'ಘ', ml: 'ഘ' },
    { en: 'Ng / Chha', ta: 'ஞ', hi: 'ङ', te: 'ఙ', kn: 'ಙ', ml: 'ങ' },
    { en: 'Chha', ta: 'சா', hi: 'छ', te: 'ఛ', kn: 'ಛ', ml: 'ഛ' }
  ],
  // 6. Punarvasu
  [
    { en: 'Ke', ta: 'கே', hi: 'के', te: 'కే', kn: 'ಕೇ', ml: 'കേ' },
    { en: 'Ko', ta: 'கோ', hi: 'को', te: 'కో', kn: 'ಕೋ', ml: 'കോ' },
    { en: 'Ha', ta: 'ஹா', hi: 'हा', te: 'హా', kn: 'ಹಾ', ml: 'ഹാ' },
    { en: 'Hee', ta: 'ஹீ', hi: 'ही', te: 'హీ', kn: 'ಹೀ', ml: 'ഹീ' }
  ],
  // 7. Pushya
  [
    { en: 'Hu', ta: 'ஹு', hi: 'हु', te: 'హు', kn: 'ಹು', ml: 'ഹു' },
    { en: 'He', ta: 'ஹே', hi: 'हे', te: 'హే', kn: 'ಹೇ', ml: 'ಹೇ' },
    { en: 'Ho', ta: 'ஹோ', hi: 'हो', te: 'హో', kn: 'ಹೋ', ml: 'ಹೋ' },
    { en: 'Da', ta: 'ட', hi: 'डा', te: 'డా', kn: 'ಡಾ', ml: 'ഡാ' }
  ],
  // 8. Ashlesha
  [
    { en: 'Dee', ta: 'டீ', hi: 'डी', te: 'డీ', kn: 'ಡೀ', ml: 'ഡീ' },
    { en: 'Doo', ta: 'டூ', hi: 'डू', te: 'డూ', kn: 'ಡೂ', ml: 'ഡൂ' },
    { en: 'Day', ta: 'டே', hi: 'डे', te: 'డే', kn: 'ಡೇ', ml: 'ಡೇ' },
    { en: 'Do', ta: 'டோ', hi: 'डो', te: 'డో', kn: 'ಡೋ', ml: 'ഡോ' }
  ],
  // 9. Magha
  [
    { en: 'Ma', ta: 'ம', hi: 'मा', te: 'మా', kn: 'ಮಾ', ml: 'മാ' },
    { en: 'Mee', ta: 'மீ', hi: 'मी', te: 'మీ', kn: 'ಮೀ', ml: 'മീ' },
    { en: 'Moo', ta: 'மூ', hi: 'मू', te: 'మూ', kn: 'ಮೂ', ml: 'മൂ' },
    { en: 'May', ta: 'மே', hi: 'मे', te: 'మే', kn: 'ಮೇ', ml: 'മേ' }
  ],
  // 10. Purva Phalguni
  [
    { en: 'Mo', ta: 'மோ', hi: 'मो', te: 'మో', kn: 'ಮೋ', ml: 'മോ' },
    { en: 'Ta', ta: 'டா', hi: 'टा', te: 'టా', kn: 'ಟಾ', ml: 'ಟಾ' },
    { en: 'Tee', ta: 'டீ', hi: 'टी', te: 'టీ', kn: 'ಟೀ', ml: 'ಟೀ' },
    { en: 'Too', ta: 'டூ', hi: 'टू', te: 'టూ', kn: 'ಟೂ', ml: 'ಟೂ' }
  ],
  // 11. Uttara Phalguni
  [
    { en: 'Tay', ta: 'டே', hi: 'टे', te: 'టే', kn: 'ಟೇ', ml: 'ಟೇ' },
    { en: 'To', ta: 'டோ', hi: 'टो', te: 'టో', kn: 'ಟೋ', ml: 'ಟೋ' },
    { en: 'Pa', ta: 'ப', hi: 'पा', te: 'పా', kn: 'ಪಾ', ml: 'പാ' },
    { en: 'Pee', ta: 'பீ', hi: 'पी', te: 'పీ', kn: 'ಪೀ', ml: 'പീ' }
  ],
  // 12. Hasta
  [
    { en: 'Pu', ta: 'பு', hi: 'पू', te: 'పూ', kn: 'ಪೂ', ml: 'പൂ' },
    { en: 'Sha', ta: 'ஷ', hi: 'ष', te: 'ష', kn: 'ಷ', ml: 'ഷ' },
    { en: 'Na', ta: 'ண', hi: 'ण', te: 'ణ', kn: 'ಣ', ml: 'ണ' },
    { en: 'Tha', ta: 'த', hi: 'ढा', te: 'ఢ', kn: 'ಢ', ml: 'ഢ' }
  ],
  // 13. Chitra
  [
    { en: 'Pe', ta: 'பே', hi: 'पे', te: 'పే', kn: 'ಪೇ', ml: 'പേ' },
    { en: 'Po', ta: 'போ', hi: 'पो', te: 'పో', kn: 'ಪೋ', ml: 'പോ' },
    { en: 'Ra', ta: 'ரா', hi: 'रा', te: 'రా', kn: 'ರಾ', ml: 'രാ' },
    { en: 'Ree', ta: 'ரீ', hi: 'री', te: 'రీ', kn: 'ರೀ', ml: 'രീ' }
  ],
  // 14. Swati
  [
    { en: 'Ru', ta: 'ரு', hi: 'रू', te: 'రూ', kn: 'ರೂ', ml: 'രൂ' },
    { en: 'Ray', ta: 'ரே', hi: 'रे', te: 'రే', kn: 'ರೇ', ml: 'രേ' },
    { en: 'Ro', ta: 'ரோ', hi: 'रो', te: 'రో', kn: 'ರೋ', ml: 'ರೋ' },
    { en: 'Tha', ta: 'தா', hi: 'ता', te: 'తా', kn: 'ತಾ', ml: 'താ' }
  ],
  // 15. Vishakha
  [
    { en: 'Thee', ta: 'தீ', hi: 'ती', te: 'తీ', kn: 'ತೀ', ml: 'തീ' },
    { en: 'Thoo', ta: 'தூ', hi: 'तू', te: 'తూ', kn: 'తూ', ml: 'തൂ' },
    { en: 'Thay', ta: 'தே', hi: 'ते', te: 'తే', kn: 'ತೇ', ml: 'തേ' },
    { en: 'Tho', ta: 'தோ', hi: 'तो', te: 'తో', kn: 'ತೋ', ml: 'തോ' }
  ],
  // 16. Anuradha
  [
    { en: 'Na', ta: 'ந', hi: 'ना', te: 'నా', kn: 'ನಾ', ml: 'നാ' },
    { en: 'Nee', ta: 'நீ', hi: 'नी', te: 'నీ', kn: 'ನೀ', ml: 'നീ' },
    { en: 'Noo', ta: 'நூ', hi: 'नू', te: 'నూ', kn: 'ನೂ', ml: 'നൂ' },
    { en: 'Nay', ta: 'நே', hi: 'ने', te: 'నే', kn: 'ನೇ', ml: 'നേ' }
  ],
  // 17. Jyeshtha
  [
    { en: 'No', ta: 'நோ', hi: 'नो', te: 'నో', kn: 'ನೋ', ml: 'നോ' },
    { en: 'Ya', ta: 'ய', hi: 'या', te: 'యా', kn: 'ಯಾ', ml: 'യാ' },
    { en: 'Yee', ta: 'யீ', hi: 'यी', te: 'యీ', kn: 'ಯೀ', ml: 'യീ' },
    { en: 'Yoo', ta: 'யூ', hi: 'यू', te: 'యూ', kn: 'ಯೂ', ml: 'യൂ' }
  ],
  // 18. Mula
  [
    { en: 'Ye', ta: 'யே', hi: 'ये', te: 'యే', kn: 'ಯೇ', ml: 'ಯೇ' },
    { en: 'Yo', ta: 'யோ', hi: 'यो', te: 'యో', kn: 'ಯೋ', ml: 'യോ' },
    { en: 'Bha', ta: 'பா', hi: 'भा', te: 'భా', kn: 'ಭಾ', ml: 'ഭാ' },
    { en: 'Bhee', ta: 'பீ', hi: 'भी', te: 'భీ', kn: 'ಭೀ', ml: 'ഭീ' }
  ],
  // 19. Purva Ashadha
  [
    { en: 'Bhoo', ta: 'பூ', hi: 'भू', te: 'భూ', kn: 'ಭೂ', ml: 'ഭൂ' },
    { en: 'Dha', ta: 'தா', hi: 'धा', te: 'ధా', kn: 'ಧಾ', ml: 'ധാ' },
    { en: 'Pha', ta: 'ப', hi: 'फा', te: 'ఫా', kn: 'ಫಾ', ml: 'ഫാ' },
    { en: 'Dha', ta: 'டா', hi: 'ढा', te: 'ఢా', kn: 'ಢಾ', ml: 'ഢാ' }
  ],
  // 20. Uttara Ashadha
  [
    { en: 'Bhe', ta: 'பே', hi: 'भे', te: 'భే', kn: 'ಭೇ', ml: 'ഭേ' },
    { en: 'Bho', ta: 'போ', hi: 'भो', te: 'భో', kn: 'ಭೋ', ml: 'ഭോ' },
    { en: 'Ja', ta: 'ஜ', hi: 'जा', te: 'జా', kn: 'ಜಾ', ml: 'ജാ' },
    { en: 'Jee', ta: 'ஜீ', hi: 'जी', te: 'జీ', kn: 'ಜೀ', ml: 'ജീ' }
  ],
  // 21. Shravana
  [
    { en: 'Khee / Ju', ta: 'ஜு', hi: 'खी', te: 'జు', kn: 'ಖೀ', ml: 'ഖീ' },
    { en: 'Khoo / Je', ta: 'ஜே', hi: 'खू', te: 'జే', kn: 'ಖೂ', ml: 'ഖൂ' },
    { en: 'Khay / Jo', ta: 'ஜோ', hi: 'खे', te: 'జో', kn: 'ಖೇ', ml: 'ഖേ' },
    { en: 'Kho / Gha', ta: 'க', hi: 'खो', te: 'ఘ', kn: 'ಖೋ', ml: 'ഘ' }
  ],
  // 22. Dhanishta
  [
    { en: 'Ga', ta: 'கா', hi: 'गा', te: 'గా', kn: 'ಗಾ', ml: 'ഗാ' },
    { en: 'Gee', ta: 'கீ', hi: 'गी', te: 'గీ', kn: 'ಗೀ', ml: 'ഗീ' },
    { en: 'Goo', ta: 'கூ', hi: 'गू', te: 'గూ', kn: 'ಗೂ', ml: 'ഗൂ' },
    { en: 'Gay', ta: 'கே', hi: 'गे', te: 'గే', kn: 'ಗೇ', ml: 'ഗേ' }
  ],
  // 23. Shatabhisha
  [
    { en: 'Go', ta: 'கோ', hi: 'गो', te: 'గో', kn: 'ಗೋ', ml: 'ಗೋ' },
    { en: 'Sa', ta: 'ஸ', hi: 'सा', te: 'సా', kn: 'ಸಾ', ml: 'സാ' },
    { en: 'See', ta: 'ஸீ', hi: 'सी', te: 'సీ', kn: 'ಸೀ', ml: 'സീ' },
    { en: 'Soo', ta: 'ஸூ', hi: 'सू', te: 'సూ', kn: 'ಸೂ', ml: 'സൂ' }
  ],
  // 24. Purva Bhadrapada
  [
    { en: 'Say', ta: 'ஸே', hi: 'से', te: 'సే', kn: 'ಸೇ', ml: 'సే' },
    { en: 'So', ta: 'ஸோ', hi: 'सो', te: 'సో', kn: 'ಸೋ', ml: 'സോ' },
    { en: 'Dha', ta: 'த', hi: 'दा', te: 'దా', kn: 'ದಾ', ml: 'ദാ' },
    { en: 'Dhee', ta: 'தீ', hi: 'दी', te: 'దీ', kn: 'ದೀ', ml: 'ദീ' }
  ],
  // 25. Uttara Bhadrapada
  [
    { en: 'Doo', ta: 'தூ', hi: 'दू', te: 'దూ', kn: 'ದೂ', ml: 'ദൂ' },
    { en: 'Tha', ta: 'ச', hi: 'थ', te: 'థ', kn: 'ಥ', ml: 'ഥ' },
    { en: 'Jha', ta: 'ஞ', hi: 'झ', te: 'ఝ', kn: 'ಝ', ml: 'ഝ' },
    { en: 'Na / Gna', ta: 'ஞ', hi: 'ञ', te: 'ఞ', kn: 'ಞ', ml: 'ഞ' }
  ],
  // 26. Revati
  [
    { en: 'De', ta: 'தே', hi: 'दे', te: 'దే', kn: 'ದೇ', ml: 'ദേ' },
    { en: 'Do', ta: 'தோ', hi: 'दो', te: 'దో', kn: 'ದೋ', ml: 'ദോ' },
    { en: 'Cha', ta: 'ச', hi: 'चा', te: 'చా', kn: 'ಚಾ', ml: 'ചാ' },
    { en: 'Chee', ta: 'சீ', hi: 'ची', te: 'చీ', kn: 'ಚೀ', ml: 'ചീ' }
  ]
];

// Helper to format DMS cleanly from exact arcminutes
const formatDMS = (totalArcminutes) => {
  const deg = Math.floor(totalArcminutes / 60);
  const min = Math.round(totalArcminutes % 60);
  return `${deg}° ${String(min).padStart(2, '0')}' 00"`;
};

// Helper for Varna translation
const getVarna = (navamsaRasiId) => {
  // Fire signs (0, 4, 8) -> Kshatriya
  // Earth signs (1, 5, 9) -> Vaishya
  // Air signs (2, 6, 10) -> Shudra
  // Water signs (3, 7, 11) -> Brahmin
  const elementIndex = navamsaRasiId % 4;
  if (elementIndex === 0) {
    return { name: 'Kshatriya', nameTa: 'க்ஷத்திரியர்', nameHi: 'क्षत्रिय', nameTe: 'క్షత్రియ', nameKn: 'ಕ್ಷತ್ರಿಯ', nameMl: 'ക്ഷത്രിയ' };
  }
  if (elementIndex === 1) {
    return { name: 'Vaishya', nameTa: 'வைசியர்', nameHi: 'वैश्य', nameTe: 'వైశ్య', nameKn: 'ವೈಶ್ಯ', nameMl: 'വൈശ്യ' };
  }
  if (elementIndex === 2) {
    return { name: 'Shudra', nameTa: 'சூத்திரர்', nameHi: 'शूद्र', nameTe: 'శూద్ర', nameKn: 'ಶೂದ್ರ', nameMl: 'ശൂദ്ര' };
  }
  return { name: 'Brahmin', nameTa: 'பிராமணர்', nameHi: 'ब्राह्मण', nameTe: 'బ్రాహ్మణ', nameKn: 'ಬ್ರಾಹ್ಮಣ', nameMl: 'ബ്രാഹ്മണ' };
};

// Helper for Pada labels
const PADA_LABELS = {
  1: { name: 'Pada 1', nameTa: '1-ஆம் பாதம்', nameHi: 'पद 1', nameTe: 'పాదం 1', nameKn: 'ಪಾದ 1', nameMl: 'പാദം 1' },
  2: { name: 'Pada 2', nameTa: '2-ஆம் பாதம்', nameHi: 'पद 2', nameTe: 'పాదం 2', nameKn: 'ಪಾದ 2', nameMl: 'പാദം 2' },
  3: { name: 'Pada 3', nameTa: '3-ஆம் பாதம்', nameHi: 'पद 3', nameTe: 'పాదం 3', nameKn: 'ಪಾದ 3', nameMl: 'പാദം 3' },
  4: { name: 'Pada 4', nameTa: '4-ஆம் பாதம்', nameHi: 'पद 4', nameTe: 'పాదం 4', nameKn: 'ಪಾದ 4', nameMl: 'പാദം 4' }
};

/**
 * Generate the complete 108 Nakshatra Padas dataset
 */
export const NAKSHATRA_PADAS_DATA = Array.from({ length: 108 }, (_, idx) => {
  const padaNumber = idx + 1;
  const nakshatraId = Math.floor(idx / 4);
  const nakshatra = NAKSHATRAS_META[nakshatraId];
  const pada = (idx % 4) + 1;
  const padaLabel = PADA_LABELS[pada];

  // 1 Pada = 3° 20' = 200 arcminutes
  const startArcminutes = idx * 200;
  const endArcminutes = (idx + 1) * 200;
  const startDegree = startArcminutes / 60;
  const endDegree = endArcminutes / 60;
  const startDMS = formatDMS(startArcminutes);
  const endDMS = formatDMS(endArcminutes);

  // Position in 360°
  const positionDegreeDisplay = `${startDMS.replace(' 00"', '')} - ${endDMS.replace(' 00"', '')}`;

  // Rasi calculations (Each Rasi = 9 Padas = 30° = 1800 arcminutes)
  const rasiId = Math.floor(idx / 9);
  const rasi = RASIS_META[rasiId];
  const rasiStartArcminutes = (idx % 9) * 200;
  const rasiEndArcminutes = ((idx % 9) + 1) * 200;
  const rasiStartDegree = rasiStartArcminutes / 60;
  const rasiEndDegree = rasiEndArcminutes / 60;
  const rasiStartDMS = formatDMS(rasiStartArcminutes);
  const rasiEndDMS = formatDMS(rasiEndArcminutes);
  const rasiDegreeDisplay = `${rasiStartDMS.replace(' 00"', '')} - ${rasiEndDMS.replace(' 00"', '')}`;

  // Navamsha (Pada Lord / Padam Athipathi)
  // Continuous 108 Navamsha cycle: Navamsha Rasi ID = idx % 12
  const navamsaRasiId = idx % 12;
  const navamsaRasi = RASIS_META[navamsaRasiId];

  // Athipathis
  const rasiAthipathi = PLANETS_MAP[rasi.lord];
  const nakshatraAthipathi = PLANETS_MAP[nakshatra.lord];
  const padamAthipathi = PLANETS_MAP[navamsaRasi.lord];

  // Nama Akshara
  const akshara = NAKSHATRA_AKSHARAS[nakshatraId][pada - 1];

  // Pada Multilingual Name
  const padaName = {
    name: `${nakshatra.name} Pada ${pada}`,
    nameTa: `${nakshatra.nameTa} ${pada}-ஆம் பாதம்`,
    nameHi: `${nakshatra.nameHi} पद ${pada}`,
    nameTe: `${nakshatra.nameTe} పాదం ${pada}`,
    nameKn: `${nakshatra.nameKn} ಪಾದ ${pada}`,
    nameMl: `${nakshatra.nameMl} പാദം ${pada}`
  };

  return {
    padaNumber,
    totalPadaIndex: idx,

    // Nakshatra Info
    nakshatraId,
    nakshatraOrder: nakshatra.order,
    nakshatraName: {
      name: nakshatra.name,
      nameTa: nakshatra.nameTa,
      nameHi: nakshatra.nameHi,
      nameTe: nakshatra.nameTe,
      nameKn: nakshatra.nameKn,
      nameMl: nakshatra.nameMl
    },

    // Pada Info
    pada,
    padaLabel,
    padaName,

    // Degree Spans
    padamDegree: 3.3333333333333335,
    padamSpan: "3° 20'",

    // 360° Zodiac Wheel Boundaries
    startDegree,
    endDegree,
    startDMS,
    endDMS,
    positionDegreeDisplay,

    // 30° Rasi Boundaries
    rasiId,
    rasiOrder: rasi.order,
    rasiName: {
      name: rasi.name,
      nameTa: rasi.nameTa,
      nameHi: rasi.nameHi,
      nameTe: rasi.nameTe,
      nameKn: rasi.nameKn,
      nameMl: rasi.nameMl
    },
    rasiStartDegree,
    rasiEndDegree,
    rasiStartDMS,
    rasiEndDMS,
    rasiDegreeDisplay,

    // Ruling Athipathis
    rasiAthipathi,
    nakshatraAthipathi,
    padamAthipathi,

    // Navamsha Rasi
    navamsaRasiId,
    navamsaRasiName: {
      name: navamsaRasi.name,
      nameTa: navamsaRasi.nameTa,
      nameHi: navamsaRasi.nameHi,
      nameTe: navamsaRasi.nameTe,
      nameKn: navamsaRasi.nameKn,
      nameMl: navamsaRasi.nameMl
    },

    // Birth Syllable
    akshara,

    // Astrological Attributes
    varna: getVarna(navamsaRasiId),
    gana: nakshatra.gana,
    yoni: nakshatra.yoni,
    animal: nakshatra.animal,
    bird: nakshatra.bird,
    tree: nakshatra.tree,
    deity: nakshatra.deity
  };
});

export default NAKSHATRA_PADAS_DATA;
