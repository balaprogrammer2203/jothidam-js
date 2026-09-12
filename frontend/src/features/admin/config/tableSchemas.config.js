export const TABLE_CONFIGS = [
  {
    key: 'users',
    name: 'User Management',
    nameEn: 'Users',
    nameTa: 'பயனர்கள்',
    nameHi: 'उपयोगकर्ता',
    nameTe: 'వినియోగదారులు',
    nameKn: 'ಬಳಕೆದಾರರು',
    nameMl: 'ഉപയോക്താക്കൾ',
    icon: 'Users',
    color: '#059669',
    primaryKey: '_id',
    columns: [
      { key: 'username', labelEn: 'Username', labelTa: 'பயனர்பெயர்', labelHi: 'उपयोगकर्ता नाम', labelTe: 'వాడుకరి పేరు', labelKn: 'ಬಳಕೆದಾರ ಹೆಸರು', labelMl: 'ഉപയോക്തൃനാമം', path: 'username', isHighlight: true },
      { key: 'fullName', labelEn: 'Full Name', labelTa: 'முழுப் பெயர்', labelHi: 'पूरा नाम', labelTe: 'పూర్తి పేరు', labelKn: 'ಪೂರ್ಣ ಹೆಸರು', labelMl: 'പൂർണ്ണ പേര്', path: 'fullName' },
      { key: 'role', labelEn: 'Role', labelTa: 'பயனர் நிலை', labelHi: 'भूमिका', labelTe: 'పాత్ర', labelKn: 'ಪಾತ್ರ', labelMl: 'റോൾ', path: 'role', format: (val) => val?.toUpperCase() },
      { key: 'email', labelEn: 'Email', labelTa: 'மின்னஞ்சல்', labelHi: 'ईमेल', labelTe: 'ఇమెయిల్', labelKn: 'ಇಮೇಲ್', labelMl: 'ഇമെയിൽ', path: 'email' },
      { key: 'preferredLanguage', labelEn: 'Language', labelTa: 'மொழி', labelHi: 'भाषा', labelTe: 'భాష', labelKn: 'ಭಾಷೆ', labelMl: 'ഭാഷ', path: 'preferredLanguage', format: (val) => val?.toUpperCase() || 'EN' },
      { key: 'lastLogin', labelEn: 'Last Login', labelTa: 'கடைசி உள்நுழைவு', labelHi: 'अंतिम लॉगिन', labelTe: 'చివరి లాగిన్', labelKn: 'ಕೊನೆಯ ಲಾಗಿನ್', labelMl: 'അവസാന ലോഗിൻ', path: 'lastLogin', format: (val) => {
        if (!val) return 'Never';
        const d = new Date(val);
        return isNaN(d.getTime()) ? 'Never' : d.toLocaleString();
      }}
    ],
    formFields: [
      { name: 'username', labelEn: 'Username', labelTa: 'பயனர்பெயர்', type: 'text', required: true, minLength: 3 },
      {
        name: 'password',
        labelEn: 'Password',
        labelTa: 'கடவுச்சொல்',
        type: 'password',
        minLength: 6,
        required: false,
        placeholderEn: '•••••••• (Min. 6 characters)',
        placeholderTa: '•••••••• (குறைந்தது 6 எழுத்துக்கள்)',
        hintEn: 'Min. 6 characters. Leave blank to keep existing password when editing.',
        hintTa: 'குறைந்தது 6 எழுத்துக்கள். மாற்ற விரும்பவில்லை எனில் காலியாக விடவும்.'
      },
      { name: 'fullName', labelEn: 'Full Name', labelTa: 'முழுப் பெயர்', type: 'text', required: true },
      { name: 'email', labelEn: 'Email', labelTa: 'மின்னஞ்சல்', type: 'email' },
      { name: 'role', labelEn: 'Role', labelTa: 'பயனர் நிலை', type: 'select', options: ['superadmin', 'admin', 'user'], required: true },
      { name: 'preferredLanguage', labelEn: 'Preferred Language', labelTa: 'விருப்பமான மொழி', type: 'select', options: ['en', 'ta', 'hi', 'te', 'kn', 'ml'] },
      { name: 'isActive', labelEn: 'Active Status', labelTa: 'செயலில் உள்ளதா?', type: 'select', options: ['true', 'false'] }
    ]
  },
  {
    key: 'horoscopeprofiles',
    name: 'Horoscope Profiles',
    nameEn: 'Horoscope Profiles',
    nameTa: 'ஜாதகங்கள்',
    nameHi: 'सहेजी गई कुंडलियाँ',
    nameTe: 'జాతక ప్రొఫైల్స్',
    nameKn: 'ಜಾತಕ ಪ್ರೊಫೈಲ್‌ಗಳು',
    nameMl: 'ജാതകങ്ങൾ',
    icon: 'UserCheck',
    color: '#8b5cf6',
    primaryKey: '_id',
    columns: [
      { key: 'fullName', labelEn: 'Full Name', labelTa: 'முழுப் பெயர்', labelHi: 'पूरा नाम', labelTe: 'పూర్తి పేరు', labelKn: 'ಪೂರ್ಣ ಹೆಸರು', labelMl: 'പൂർണ്ണ പേര്', path: 'personDetails.fullName', isHighlight: true },
      { key: 'gender', labelEn: 'Gender', labelTa: 'பாலினம்', labelHi: 'लिंग', labelTe: 'లింగం', labelKn: 'ಲಿಂಗ', labelMl: 'ലിംഗം', path: 'personDetails.gender', format: (val) => val?.toUpperCase() },
      { key: 'dob', labelEn: 'Date of Birth', labelTa: 'பிறந்த தேதி', labelHi: 'जन्म तिथि', labelTe: 'పుట్టిన తేదీ', labelKn: 'ಹುಟ್ಟಿದ ದಿನಾಂಕ', labelMl: 'ജനന തീയതി', path: 'personDetails.dob' },
      { key: 'tob', labelEn: 'Time of Birth', labelTa: 'பிறந்த நேரம்', labelHi: 'जन्म समय', labelTe: 'పుట్టిన సమయం', labelKn: 'ಹುಟ್ಟಿದ ಸಮಯ', labelMl: 'ജനന സമയം', path: 'personDetails.tob' },
      { key: 'place', labelEn: 'Birth Place', labelTa: 'பிறந்த இடம்', labelHi: 'जन्म स्थान', labelTe: 'పుట్టిన స్థలం', labelKn: 'ಹುಟ್ಟಿದ ಸ್ಥಳ', labelMl: 'ജനന സ്ഥലം', path: 'location.placeName' },
      { key: 'ayanamsa', labelEn: 'Ayanamsa', labelTa: 'அயனாம்சம்', labelHi: 'अयनांश', labelTe: 'అయనాంశ', labelKn: 'ಅಯನಾಂಶ', labelMl: 'അയനാംശം', path: 'astronomicalDetails.ayanamsaType' },
      { key: 'createdAt', labelEn: 'Created Date', labelTa: 'சேமிக்கப்பட்ட நாள்', labelHi: 'सृजन तिथि', labelTe: 'సృష్టించిన తేదీ', labelKn: 'ರಚಿಸಿದ ದಿನಾಂಕ', labelMl: 'സൃഷ്ടിച്ച തീയതി', path: 'createdAt', format: (val) => val ? new Date(val).toLocaleDateString() : '-' }
    ],
    formFields: [
      { name: 'personDetails.fullName', labelEn: 'Full Name', labelTa: 'முழுப் பெயர்', type: 'text', required: true },
      { name: 'personDetails.gender', labelEn: 'Gender', labelTa: 'பாலினம்', type: 'select', options: ['male', 'female', 'other'], required: true },
      { name: 'personDetails.dob', labelEn: 'Date of Birth (YYYY-MM-DD)', labelTa: 'பிறந்த தேதி', type: 'text', required: true },
      { name: 'personDetails.tob', labelEn: 'Time of Birth (HH:MM:SS)', labelTa: 'பிறந்த நேரம்', type: 'text', required: true },
      { name: 'location.placeName', labelEn: 'Place Name', labelTa: 'பிறந்த இடம்', type: 'text', required: true },
      { name: 'location.formattedAddress', labelEn: 'Formatted Address', labelTa: 'முழு முகவரி', type: 'text' },
      { name: 'location.latitude', labelEn: 'Latitude', labelTa: 'அட்சரேகை', type: 'number', step: '0.0001' },
      { name: 'location.longitude', labelEn: 'Longitude', labelTa: 'தீர்க்கரேகை', type: 'number', step: '0.0001' }
    ]
  },
  {
    key: 'planets',
    name: 'Planets Master (Navagrahas)',
    nameEn: 'Navagrahas (Planets)',
    nameTa: 'கிரகங்கள்',
    nameHi: 'नवग्रह तालिका',
    nameTe: 'నవగ్రహాలు',
    nameKn: 'ನವಗ್ರಹಗಳು',
    nameMl: 'നവഗ്രഹങ്ങൾ',
    icon: 'Sun',
    color: '#ea580c',
    primaryKey: 'planetId',
    columns: [
      { key: 'planetId', labelEn: 'ID', labelTa: 'எண்', path: 'planetId' },
      { key: 'name', labelEn: 'English Name', labelTa: 'ஆங்கிலப் பெயர்', path: 'name' },
      { key: 'nameTa', labelEn: 'Tamil Name', labelTa: 'தமிழ் பெயர்', path: 'nameTa', isHighlight: true },
      { key: 'ownRasis', labelEn: 'Own Sign (ஆட்சி)', labelTa: 'ஆட்சி ராசி', path: 'ownRasis', format: (val) => Array.isArray(val) ? val.map(r => r.nameTa || r.name).join(', ') : '-' },
      { key: 'exaltationRasi', labelEn: 'Exaltation (உச்சம்)', labelTa: 'உச்ச ராசி', path: 'exaltationRasi', format: (val) => val ? `${val.nameTa || val.name} (${val.degree || ''}°)` : '-' },
      { key: 'debilitationRasi', labelEn: 'Debilitation (நீசம்)', labelTa: 'நீச ராசி', path: 'debilitationRasi', format: (val) => val ? `${val.nameTa || val.name} (${val.degree || ''}°)` : '-' },
      { key: 'gemstone', labelEn: 'Gemstone', labelTa: 'ரத்தினம்', path: 'gemstone', format: (val) => val?.nameTa || val?.name || '-' },
      { key: 'metal', labelEn: 'Metal', labelTa: 'உலோகம்', path: 'metal', format: (val) => val?.nameTa || val?.name || '-' },
      { key: 'grain', labelEn: 'Sacred Grain', labelTa: 'தானியம்', path: 'grain', format: (val) => val?.nameTa || val?.name || '-' }
    ],
    formFields: [
      { name: 'planetId', labelEn: 'Planet ID (0-9)', labelTa: 'கிரக எண்', type: 'number', required: true },
      { name: 'name', labelEn: 'Name (English)', labelTa: 'பெயர் (English)', type: 'text', required: true },
      { name: 'nameTa', labelEn: 'Name (Tamil)', labelTa: 'பெயர் (Tamil)', type: 'text', required: true },
      { name: 'nameHi', labelEn: 'Name (Hindi)', labelTa: 'பெயர் (Hindi)', type: 'text' },
      { name: 'nameTe', labelEn: 'Name (Telugu)', labelTa: 'பெயர் (Telugu)', type: 'text' },
      { name: 'nameKn', labelEn: 'Name (Kannada)', labelTa: 'பெயர் (Kannada)', type: 'text' },
      { name: 'nameMl', labelEn: 'Name (Malayalam)', labelTa: 'பெயர் (Malayalam)', type: 'text' },
      { name: 'shortName', labelEn: 'Short Code (EN)', labelTa: 'குறியீடு (EN)', type: 'text', required: true },
      { name: 'shortNameTa', labelEn: 'Short Code (TA)', labelTa: 'குறியீடு (TA)', type: 'text', required: true },
      { name: 'gemstone.name', labelEn: 'Gemstone (EN)', labelTa: 'ரத்தினம் (EN)', type: 'text' },
      { name: 'gemstone.nameTa', labelEn: 'Gemstone (TA)', labelTa: 'ரத்தினம் (TA)', type: 'text' },
      { name: 'metal.name', labelEn: 'Metal (EN)', labelTa: 'உலோகம் (EN)', type: 'text' },
      { name: 'metal.nameTa', labelEn: 'Metal (TA)', labelTa: 'உலோகம் (TA)', type: 'text' },
      { name: 'grain.name', labelEn: 'Grain (EN)', labelTa: 'தானியம் (EN)', type: 'text' },
      { name: 'grain.nameTa', labelEn: 'Grain (TA)', labelTa: 'தானியம் (TA)', type: 'text' },
      { name: 'friends.name', labelEn: 'Friends (EN)', labelTa: 'நட்பு (EN)', type: 'text' },
      { name: 'friends.nameTa', labelEn: 'Friends (TA)', labelTa: 'நட்பு (TA)', type: 'text' },
      { name: 'enemies.name', labelEn: 'Enemies (EN)', labelTa: 'பகை (EN)', type: 'text' },
      { name: 'enemies.nameTa', labelEn: 'Enemies (TA)', labelTa: 'பகை (TA)', type: 'text' }
    ]
  },
  {
    key: 'rasis',
    name: 'Rasis Master (12 Zodiacs)',
    nameEn: 'Zodiac Signs (Rasis)',
    nameTa: 'ராசிகள்',
    nameHi: '12 राशियाँ',
    nameTe: '12 రాశులు',
    nameKn: '12 ರಾಶಿಗಳು',
    nameMl: '12 രാശികൾ',
    icon: 'Compass',
    color: '#0284c7',
    primaryKey: 'rasiId',
    columns: [
      { key: 'rasiId', labelEn: 'ID', labelTa: 'எண்', path: 'rasiId' },
      { key: 'order', labelEn: 'Order (1-12)', labelTa: 'வரிசை', path: 'order' },
      { key: 'name', labelEn: 'English Name', labelTa: 'ஆங்கிலப் பெயர்', path: 'name' },
      { key: 'nameTa', labelEn: 'Tamil Name', labelTa: 'தமிழ் பெயர்', path: 'nameTa', isHighlight: true },
      { key: 'nameHi', labelEn: 'Hindi Name', labelTa: 'இந்தி பெயர்', path: 'nameHi' },
      { key: 'nameTe', labelEn: 'Telugu Name', labelTa: 'தெலுங்கு பெயர்', path: 'nameTe' },
      { key: 'nameKn', labelEn: 'Kannada Name', labelTa: 'கன்னட பெயர்', path: 'nameKn' },
      { key: 'nameMl', labelEn: 'Malayalam Name', labelTa: 'மலையாள பெயர்', path: 'nameMl' }
    ],
    formFields: [
      { name: 'rasiId', labelEn: 'Rasi ID (0-11)', labelTa: 'ராசி எண்', type: 'number', required: true },
      { name: 'order', labelEn: 'Order (1-12)', labelTa: 'வரிசை', type: 'number', required: true },
      { name: 'name', labelEn: 'Name (English)', labelTa: 'பெயர் (English)', type: 'text', required: true },
      { name: 'nameTa', labelEn: 'Name (Tamil)', labelTa: 'பெயர் (Tamil)', type: 'text', required: true },
      { name: 'nameHi', labelEn: 'Name (Hindi)', labelTa: 'பெயர் (Hindi)', type: 'text' },
      { name: 'nameTe', labelEn: 'Name (Telugu)', labelTa: 'பெயர் (Telugu)', type: 'text' },
      { name: 'nameKn', labelEn: 'Name (Kannada)', labelTa: 'பெயர் (Kannada)', type: 'text' },
      { name: 'nameMl', labelEn: 'Name (Malayalam)', labelTa: 'பெயர் (Malayalam)', type: 'text' },
      { name: 'startDegree', labelEn: 'Start Degree (0-330)', labelTa: 'தொடக்க பாகை', type: 'number', required: true },
      { name: 'endDegree', labelEn: 'End Degree (30-360)', labelTa: 'முடிவு பாகை', type: 'number', required: true }
    ]
  },
  {
    key: 'nakshatras',
    name: 'Nakshatras Master (27 Stars)',
    nameEn: 'Nakshatras (27 Stars)',
    nameTa: 'நட்சத்திரங்கள்',
    nameHi: '27 नक्षत्र',
    nameTe: '27 నక్షత్రాలు',
    nameKn: '27 ನಕ್ಷತ್ರಗಳು',
    nameMl: '27 നക്ഷത്രങ്ങൾ',
    icon: 'Sparkles',
    color: '#10b981',
    primaryKey: 'nakshatraId',
    columns: [
      { key: 'nakshatraId', labelEn: 'ID', labelTa: 'எண்', path: 'nakshatraId' },
      { key: 'order', labelEn: 'Order (1-27)', labelTa: 'வரிசை', path: 'order' },
      { key: 'name', labelEn: 'English Name', labelTa: 'ஆங்கிலப் பெயர்', path: 'name' },
      { key: 'nameTa', labelEn: 'Tamil Name', labelTa: 'தமிழ் பெயர்', path: 'nameTa', isHighlight: true },
      { key: 'nameHi', labelEn: 'Hindi Name', labelTa: 'இந்தி பெயர்', path: 'nameHi' },
      { key: 'nameTe', labelEn: 'Telugu Name', labelTa: 'தெலுங்கு பெயர்', path: 'nameTe' },
      { key: 'nameKn', labelEn: 'Kannada Name', labelTa: 'கன்னட பெயர்', path: 'nameKn' },
      { key: 'nameMl', labelEn: 'Malayalam Name', labelTa: 'மலையாள பெயர்', path: 'nameMl' }
    ],
    formFields: [
      { name: 'nakshatraId', labelEn: 'Nakshatra ID (0-26)', labelTa: 'நட்சத்திர எண்', type: 'number', required: true },
      { name: 'order', labelEn: 'Order (1-27)', labelTa: 'வரிசை', type: 'number', required: true },
      { name: 'name', labelEn: 'Name (English)', labelTa: 'பெயர் (English)', type: 'text', required: true },
      { name: 'nameTa', labelEn: 'Name (Tamil)', labelTa: 'பெயர் (Tamil)', type: 'text', required: true },
      { name: 'nameHi', labelEn: 'Name (Hindi)', labelTa: 'பெயர் (Hindi)', type: 'text' },
      { name: 'nameTe', labelEn: 'Name (Telugu)', labelTa: 'பெயர் (Telugu)', type: 'text' },
      { name: 'nameKn', labelEn: 'Name (Kannada)', labelTa: 'பெயர் (Kannada)', type: 'text' },
      { name: 'nameMl', labelEn: 'Name (Malayalam)', labelTa: 'பெயர் (Malayalam)', type: 'text' }
    ]
  },
  {
    key: 'nakshatra-padas',
    name: 'Nakshatra Padas Master (108 Padas)',
    nameEn: '108 Nakshatra Padas',
    nameTa: '108 நட்சத்திர பாதங்கள்',
    nameHi: '108 नक्षत्र पद',
    nameTe: '108 నక్షత్ర పాదాలు',
    nameKn: '108 ನಕ್ಷತ್ರ ಪಾದಗಳು',
    nameMl: '108 നക്ഷത്ര പാദങ്ങൾ',
    icon: 'Compass',
    color: '#6366f1',
    primaryKey: 'padaNumber',
    columns: [
      { key: 'padaNumber', labelEn: 'Pada #', labelTa: 'பாத எண்', path: 'padaNumber', isHighlight: true },
      { key: 'padaNameTa', labelEn: 'Pada (Tamil)', labelTa: 'பாதம் (தமிழ்)', path: 'padaName.nameTa', isHighlight: true },
      { key: 'padaName', labelEn: 'Pada (English)', labelTa: 'பாதம் (ஆங்கிலம்)', path: 'padaName.name' },
      { key: 'rasiNameTa', labelEn: 'Rasi', labelTa: 'ராசி', path: 'rasiName.nameTa' },
      { key: 'positionDegreeDisplay', labelEn: '360° Span', labelTa: '360° எல்லை', path: 'positionDegreeDisplay' },
      { key: 'rasiDegreeDisplay', labelEn: 'In Rasi Span', labelTa: 'ராசிக்குள் எல்லை', path: 'rasiDegreeDisplay' },
      { key: 'rasiAthipathi', labelEn: 'Rasi Lord', labelTa: 'ராசி அதிபதி', path: 'rasiAthipathi.nameTa' },
      { key: 'nakshatraAthipathi', labelEn: 'Star Lord', labelTa: 'நட்சத்திர அதிபதி', path: 'nakshatraAthipathi.nameTa' },
      { key: 'padamAthipathi', labelEn: 'Pada Lord', labelTa: 'பாத அதிபதி', path: 'padamAthipathi.nameTa' },
      { key: 'aksharaTa', labelEn: 'Akshara', labelTa: 'அக்ஷரம்', path: 'akshara.ta' }
    ],
    formFields: [
      { name: 'padaNumber', labelEn: 'Pada Number (1-108)', labelTa: 'பாத எண் (1-108)', type: 'number', required: true },
      { name: 'startDMS', labelEn: '360° Start DMS', labelTa: 'தொடக்க பாகை (DMS)', type: 'text', required: true },
      { name: 'endDMS', labelEn: '360° End DMS', labelTa: 'முடிவு பாகை (DMS)', type: 'text', required: true },
      { name: 'rasiStartDMS', labelEn: 'Rasi Start DMS', labelTa: 'ராசி தொடக்க பாகை', type: 'text', required: true },
      { name: 'rasiEndDMS', labelEn: 'Rasi End DMS', labelTa: 'ராசி முடிவு பாகை', type: 'text', required: true }
    ]
  },
  {
    key: 'tithis',
    name: 'Tithis Master (30 Tithis)',
    nameEn: 'Tithis (30 Lunar Days)',
    nameTa: 'திதிகள்',
    nameHi: '30 तिथियाँ',
    nameTe: '30 తిథులు',
    nameKn: '30 ತಿಥಿಗಳು',
    nameMl: '30 തിഥികൾ',
    icon: 'Moon',
    color: '#d97706',
    primaryKey: 'tithiId',
    columns: [
      { key: 'tithiId', labelEn: 'ID', labelTa: 'எண்', path: 'tithiId' },
      { key: 'name', labelEn: 'English Name', labelTa: 'ஆங்கிலப் பெயர்', path: 'name' },
      { key: 'nameTa', labelEn: 'Tamil Name', labelTa: 'தமிழ் பெயர்', path: 'nameTa', isHighlight: true },
      { key: 'nameHi', labelEn: 'Hindi Name', labelTa: 'இந்தி பெயர்', path: 'nameHi' },
      { key: 'nameTe', labelEn: 'Telugu Name', labelTa: 'தெலுங்கு பெயர்', path: 'nameTe' },
      { key: 'nameKn', labelEn: 'Kannada Name', labelTa: 'கன்னட பெயர்', path: 'nameKn' },
      { key: 'nameMl', labelEn: 'Malayalam Name', labelTa: 'மலையாள பெயர்', path: 'nameMl' },
      { key: 'paksha', labelEn: 'Paksha', labelTa: 'பட்சம்', path: 'paksha' },
      { key: 'number', labelEn: 'Day Number (1-15)', labelTa: 'திதி எண்', path: 'number' }
    ],
    formFields: [
      { name: 'tithiId', labelEn: 'Tithi ID (0-29)', labelTa: 'திதி எண்', type: 'number', required: true },
      { name: 'name', labelEn: 'Name (English)', labelTa: 'பெயர் (English)', type: 'text', required: true },
      { name: 'nameTa', labelEn: 'Name (Tamil)', labelTa: 'பெயர் (Tamil)', type: 'text', required: true },
      { name: 'nameHi', labelEn: 'Name (Hindi)', labelTa: 'பெயர் (Hindi)', type: 'text' },
      { name: 'nameTe', labelEn: 'Name (Telugu)', labelTa: 'பெயர் (Telugu)', type: 'text' },
      { name: 'nameKn', labelEn: 'Name (Kannada)', labelTa: 'பெயர் (Kannada)', type: 'text' },
      { name: 'nameMl', labelEn: 'Name (Malayalam)', labelTa: 'பெயர் (Malayalam)', type: 'text' },
      { name: 'paksha', labelEn: 'Paksha', labelTa: 'பட்சம்', type: 'select', options: ['Shukla', 'Krishna'], required: true },
      { name: 'number', labelEn: 'Number (1-15)', labelTa: 'எண்', type: 'number', required: true }
    ]
  },
  {
    key: 'yogas',
    name: 'Yogas Master (27 Yogas)',
    nameEn: 'Nithya Yogas (27 Yogas)',
    nameTa: 'யோகங்கள்',
    nameHi: '27 नित्य योग',
    nameTe: '27 నిత్య యోగాలు',
    nameKn: '27 ನಿತ್ಯ ಯೋಗಗಳು',
    nameMl: '27 നിത്യ യോഗങ്ങൾ',
    icon: 'Activity',
    color: '#059669',
    primaryKey: 'yogaId',
    columns: [
      { key: 'yogaId', labelEn: 'ID', labelTa: 'எண்', path: 'yogaId' },
      { key: 'name', labelEn: 'English Name', labelTa: 'ஆங்கிலப் பெயர்', path: 'name' },
      { key: 'nameTa', labelEn: 'Tamil Name', labelTa: 'தமிழ் பெயர்', path: 'nameTa', isHighlight: true },
      { key: 'nameHi', labelEn: 'Hindi Name', labelTa: 'இந்தி பெயர்', path: 'nameHi' },
      { key: 'nameTe', labelEn: 'Telugu Name', labelTa: 'தெலுங்கு பெயர்', path: 'nameTe' },
      { key: 'nameKn', labelEn: 'Kannada Name', labelTa: 'கன்னட பெயர்', path: 'nameKn' },
      { key: 'nameMl', labelEn: 'Malayalam Name', labelTa: 'மலையாள பெயர்', path: 'nameMl' },
      { key: 'nature', labelEn: 'Nature', labelTa: 'தன்மை', path: 'nature' }
    ],
    formFields: [
      { name: 'yogaId', labelEn: 'Yoga ID (0-26)', labelTa: 'யோகம் எண்', type: 'number', required: true },
      { name: 'name', labelEn: 'Name (English)', labelTa: 'பெயர் (English)', type: 'text', required: true },
      { name: 'nameTa', labelEn: 'Name (Tamil)', labelTa: 'பெயர் (Tamil)', type: 'text', required: true },
      { name: 'nameHi', labelEn: 'Name (Hindi)', labelTa: 'பெயர் (Hindi)', type: 'text' },
      { name: 'nameTe', labelEn: 'Name (Telugu)', labelTa: 'பெயர் (Telugu)', type: 'text' },
      { name: 'nameKn', labelEn: 'Name (Kannada)', labelTa: 'பெயர் (Kannada)', type: 'text' },
      { name: 'nameMl', labelEn: 'Name (Malayalam)', labelTa: 'பெயர் (Malayalam)', type: 'text' },
      { name: 'nature', labelEn: 'Nature', labelTa: 'தன்மை', type: 'select', options: ['Benefic', 'Malefic'] }
    ]
  },
  {
    key: 'karanas',
    name: 'Karanas Master (11 Karanas)',
    nameEn: 'Karanas (11 Karanas)',
    nameTa: 'கரணங்கள்',
    nameHi: '11 करण',
    nameTe: '11 కరణాలు',
    nameKn: '11 ಕರಣಗಳು',
    nameMl: '11 കരണങ്ങൾ',
    icon: 'Layers',
    color: '#6366f1',
    primaryKey: 'karanaId',
    columns: [
      { key: 'karanaId', labelEn: 'ID', labelTa: 'எண்', path: 'karanaId' },
      { key: 'name', labelEn: 'English Name', labelTa: 'ஆங்கிலப் பெயர்', path: 'name' },
      { key: 'nameTa', labelEn: 'Tamil Name', labelTa: 'தமிழ் பெயர்', path: 'nameTa', isHighlight: true },
      { key: 'nameHi', labelEn: 'Hindi Name', labelTa: 'இந்தி பெயர்', path: 'nameHi' },
      { key: 'nameTe', labelEn: 'Telugu Name', labelTa: 'தெலுங்கு பெயர்', path: 'nameTe' },
      { key: 'nameKn', labelEn: 'Kannada Name', labelTa: 'கன்னட பெயர்', path: 'nameKn' },
      { key: 'nameMl', labelEn: 'Malayalam Name', labelTa: 'மலையாள பெயர்', path: 'nameMl' },
      { key: 'type', labelEn: 'Type', labelTa: 'வகை', path: 'type' }
    ],
    formFields: [
      { name: 'karanaId', labelEn: 'Karana ID (0-10)', labelTa: 'கரணம் எண்', type: 'number', required: true },
      { name: 'name', labelEn: 'Name (English)', labelTa: 'பெயர் (English)', type: 'text', required: true },
      { name: 'nameTa', labelEn: 'Name (Tamil)', labelTa: 'பெயர் (Tamil)', type: 'text', required: true },
      { name: 'nameHi', labelEn: 'Name (Hindi)', labelTa: 'பெயர் (Hindi)', type: 'text' },
      { name: 'nameTe', labelEn: 'Name (Telugu)', labelTa: 'பெயர் (Telugu)', type: 'text' },
      { name: 'nameKn', labelEn: 'Name (Kannada)', labelTa: 'பெயர் (Kannada)', type: 'text' },
      { name: 'nameMl', labelEn: 'Name (Malayalam)', labelTa: 'பெயர் (Malayalam)', type: 'text' },
      { name: 'type', labelEn: 'Type', labelTa: 'வகை', type: 'select', options: ['Chara', 'Sthira'], required: true }
    ]
  },
  {
    key: 'kalachakram',
    name: 'Kalachakram Master (360°)',
    nameEn: 'Kalachakram 360°',
    nameTa: 'காலசக்கரம் 360°',
    nameHi: 'कालचक्र 360°',
    nameTe: 'కాలచక్రం 360°',
    nameKn: 'ಕಾಲಚಕ್ರ 360°',
    nameMl: 'കാലചക്രം 360°',
    icon: 'Target',
    color: '#dc2626',
    primaryKey: 'degree',
    columns: [
      { key: 'degree', labelEn: 'Degree', labelTa: 'பாகை', path: 'degree' },
      { key: 'degreeDisplay', labelEn: 'Degree Range', labelTa: 'பாகை வரம்பு', path: 'degreeDisplay', isHighlight: true },
      { key: 'rasi', labelEn: 'Rasi', labelTa: 'ராசி', path: 'rasiName' },
      { key: 'rasiTa', labelEn: 'Rasi (Tamil)', labelTa: 'ராசி (தமிழ்)', path: 'rasiNameTa' },
      { key: 'nakshatra', labelEn: 'Star', labelTa: 'நட்சத்திரம்', path: 'nakshatraName' },
      { key: 'nakshatraTa', labelEn: 'Star (Tamil)', labelTa: 'நட்சத்திரம் (தமிழ்)', path: 'nakshatraNameTa' },
      { key: 'pada', labelEn: 'Pada', labelTa: 'பாதம்', path: 'pada' },
      { key: 'navamsa', labelEn: 'Navamsa', labelTa: 'நவாம்சம்', path: 'navamsaRasiName' },
      { key: 'navamsaTa', labelEn: 'Navamsa (Tamil)', labelTa: 'நவாம்சம் (தமிழ்)', path: 'navamsaRasiNameTa' }
    ],
    formFields: [
      { name: 'degree', labelEn: 'Degree (0-359)', labelTa: 'பாகை', type: 'number', required: true },
      { name: 'degreeDisplay', labelEn: 'Range Display (0° - 1°)', labelTa: 'வரம்பு காட்சி', type: 'text', required: true },
      { name: 'rasiId', labelEn: 'Rasi ID (0-11)', labelTa: 'ராசி எண்', type: 'number', required: true },
      { name: 'rasiName', labelEn: 'Rasi Name (EN)', labelTa: 'ராசி பெயர் (EN)', type: 'text', required: true },
      { name: 'rasiNameTa', labelEn: 'Rasi Name (TA)', labelTa: 'ராசி பெயர் (தமிழ்)', type: 'text' },
      { name: 'nakshatraId', labelEn: 'Nakshatra ID (0-26)', labelTa: 'நட்சத்திர எண்', type: 'number', required: true },
      { name: 'nakshatraName', labelEn: 'Nakshatra Name (EN)', labelTa: 'நட்சத்திர பெயர் (EN)', type: 'text', required: true },
      { name: 'nakshatraNameTa', labelEn: 'Nakshatra Name (TA)', labelTa: 'நட்சத்திர பெயர் (தமிழ்)', type: 'text' },
      { name: 'pada', labelEn: 'Pada (1-4)', labelTa: 'பாதம்', type: 'number', required: true }
    ]
  },
  {
    key: 'tamil-years',
    name: 'Vedic/Tamil Years (60 Years)',
    nameEn: '60 Samvatsaras (Years)',
    nameTa: 'தமிழ் ஆண்டுகள்',
    nameHi: '60 संवत्सर',
    nameTe: '60 సంవత్సరాలు',
    nameKn: '60 ಸಂವತ್ಸರಗಳು',
    nameMl: '60 സംവത്സരങ്ങൾ',
    icon: 'Calendar',
    color: '#0891b2',
    primaryKey: 'yearId',
    columns: [
      { key: 'yearId', labelEn: 'ID', labelTa: 'எண்', path: 'yearId' },
      { key: 'order', labelEn: 'Order (1-60)', labelTa: 'வரிசை', path: 'order' },
      { key: 'name', labelEn: 'English Name', labelTa: 'ஆங்கிலப் பெயர்', path: 'name' },
      { key: 'nameTa', labelEn: 'Tamil Name', labelTa: 'தமிழ் பெயர்', path: 'nameTa', isHighlight: true },
      { key: 'nameHi', labelEn: 'Hindi Name', labelTa: 'இந்தி பெயர்', path: 'nameHi' },
      { key: 'nameTe', labelEn: 'Telugu Name', labelTa: 'தெலுங்கு பெயர்', path: 'nameTe' },
      { key: 'nameKn', labelEn: 'Kannada Name', labelTa: 'கன்னட பெயர்', path: 'nameKn' },
      { key: 'nameMl', labelEn: 'Malayalam Name', labelTa: 'மலையாள பெயர்', path: 'nameMl' }
    ],
    formFields: [
      { name: 'yearId', labelEn: 'Year ID (0-59)', labelTa: 'ஆண்டு எண்', type: 'number', required: true },
      { name: 'order', labelEn: 'Order (1-60)', labelTa: 'வரிசை', type: 'number', required: true },
      { name: 'name', labelEn: 'Year Name (English)', labelTa: 'ஆண்டு பெயர் (English)', type: 'text', required: true },
      { name: 'nameTa', labelEn: 'Year Name (Tamil)', labelTa: 'ஆண்டு பெயர் (Tamil)', type: 'text', required: true },
      { name: 'nameHi', labelEn: 'Year Name (Hindi)', labelTa: 'ஆண்டு பெயர் (Hindi)', type: 'text' },
      { name: 'nameTe', labelEn: 'Year Name (Telugu)', labelTa: 'ஆண்டு பெயர் (Telugu)', type: 'text' },
      { name: 'nameKn', labelEn: 'Year Name (Kannada)', labelTa: 'ஆண்டு பெயர் (Kannada)', type: 'text' },
      { name: 'nameMl', labelEn: 'Year Name (Malayalam)', labelTa: 'ஆண்டு பெயர் (Malayalam)', type: 'text' }
    ]
  },
  {
    key: 'tamil-months',
    name: 'Vedic/Tamil Months (12 Months)',
    nameEn: '12 Solar Months',
    nameTa: 'தமிழ் மாதங்கள்',
    nameHi: '12 सौर मास',
    nameTe: '12 సౌర మాసాలు',
    nameKn: '12 ಸೌರ ಮಾಸಗಳು',
    nameMl: '12 സൗര മാസങ്ങൾ',
    icon: 'SunMedium',
    color: '#e11d48',
    primaryKey: 'monthId',
    columns: [
      { key: 'monthId', labelEn: 'ID', labelTa: 'எண்', path: 'monthId' },
      { key: 'name', labelEn: 'English Name', labelTa: 'ஆங்கிலப் பெயர்', path: 'name' },
      { key: 'nameTa', labelEn: 'Tamil Name', labelTa: 'தமிழ் பெயர்', path: 'nameTa', isHighlight: true },
      { key: 'nameHi', labelEn: 'Hindi Name', labelTa: 'இந்தி பெயர்', path: 'nameHi' },
      { key: 'nameTe', labelEn: 'Telugu Name', labelTa: 'தெலுங்கு பெயர்', path: 'nameTe' },
      { key: 'nameKn', labelEn: 'Kannada Name', labelTa: 'கன்னட பெயர்', path: 'nameKn' },
      { key: 'nameMl', labelEn: 'Malayalam Name', labelTa: 'மலையாள பெயர்', path: 'nameMl' },
      { key: 'rasiId', labelEn: 'Rasi ID', labelTa: 'ராசி எண்', path: 'rasiId' }
    ],
    formFields: [
      { name: 'monthId', labelEn: 'Month ID (0-11)', labelTa: 'மாத எண்', type: 'number', required: true },
      { name: 'name', labelEn: 'Month Name (English)', labelTa: 'மாத பெயர் (English)', type: 'text', required: true },
      { name: 'nameTa', labelEn: 'Month Name (Tamil)', labelTa: 'மாத பெயர் (Tamil)', type: 'text', required: true },
      { name: 'nameHi', labelEn: 'Month Name (Hindi)', labelTa: 'மாத பெயர் (Hindi)', type: 'text' },
      { name: 'nameTe', labelEn: 'Month Name (Telugu)', labelTa: 'மாத பெயர் (Telugu)', type: 'text' },
      { name: 'nameKn', labelEn: 'Month Name (Kannada)', labelTa: 'மாத பெயர் (Kannada)', type: 'text' },
      { name: 'nameMl', labelEn: 'Month Name (Malayalam)', labelTa: 'மாத பெயர் (Malayalam)', type: 'text' },
      { name: 'rasiId', labelEn: 'Rasi ID (0-11)', labelTa: 'ராசி எண்', type: 'number', required: true }
    ]
  },
  {
    key: 'kp-horary',
    name: 'KP Horary Master (1-249 Sub-Lords)',
    nameEn: 'KP Horary (1-249 Table)',
    nameTa: 'கே.பி பிரசன்ன அட்டவணை (1-249)',
    nameHi: 'केपी होरेरी तालिका (1-249)',
    nameTe: 'కేపీ హోరరీ పట్టిక (1-249)',
    nameKn: 'ಕೆಪಿ ಹೋರರಿ ಕೋಷ್ಟಕ (1-249)',
    nameMl: 'കെപി ഹോററി പട്ടിക (1-249)',
    icon: 'Hash',
    color: '#d97706',
    primaryKey: '_id',
    columns: [
      {
        key: 'number',
        labelEn: 'KP #',
        labelTa: 'பிரசன்ன எண்',
        labelHi: 'होरेरी सं.',
        labelTe: 'హోరరీ సంఖ్య',
        labelKn: 'ಹೋರರಿ ಸಂಖ್ಯೆ',
        labelMl: 'ഹോററി നമ്പർ',
        path: 'number',
        isHighlight: true
      },
      {
        key: 'sign',
        labelEn: 'Sign (Rasi)',
        labelTa: 'ராசி (Sign)',
        labelHi: 'राशि',
        labelTe: 'రాశి',
        labelKn: 'ರಾಶಿ',
        labelMl: 'രാശി',
        path: 'sign.en',
        format: (val, row) => (row?.sign?.ta ? `${row.sign?.en || val} (${row.sign.ta})` : (row?.sign?.en || val || '-'))
      },
      {
        key: 'signLord',
        labelEn: 'Sign Lord',
        labelTa: 'ராசி அதிபதி',
        labelHi: 'राशी स्वामी',
        labelTe: 'రాశ్యాధిపతి',
        labelKn: 'ರಾಶ್ಯಾಧಿಪತಿ',
        labelMl: 'രാശ്യാധിപൻ',
        path: 'signLord.en',
        format: (val, row) => (row?.signLord?.ta ? `${row.signLord?.en || val} (${row.signLord.ta})` : (row?.signLord?.en || val || '-'))
      },
      {
        key: 'star',
        labelEn: 'Star (Nakshatra)',
        labelTa: 'நட்சத்திரம் (Star)',
        labelHi: 'नक्षत्र',
        labelTe: 'నక్షత్రం',
        labelKn: 'ನಕ್ಷತ್ರ',
        labelMl: 'നക്ഷത്രം',
        path: 'star.en',
        format: (val, row) => (row?.star?.ta ? `${row.star?.en || val} (${row.star.ta})` : (row?.star?.en || val || '-'))
      },
      {
        key: 'starLord',
        labelEn: 'Star Lord',
        labelTa: 'நட்சத்திர அதிபதி',
        labelHi: 'नक्षत्र स्वामी',
        labelTe: 'నక్షత్రాధిపతి',
        labelKn: 'ನಕ್ಷತ್ರಾಧಿಪತಿ',
        labelMl: 'നಕ್ಷത്രാധിപൻ',
        path: 'starLord.en',
        format: (val, row) => (row?.starLord?.ta ? `${row.starLord?.en || val} (${row.starLord.ta})` : (row?.starLord?.en || val || '-'))
      },
      {
        key: 'subLord',
        labelEn: 'Sub Lord',
        labelTa: 'உப அதிபதி (Sub Lord)',
        labelHi: 'उप स्वामी',
        labelTe: 'ఉప ప్రభువు',
        labelKn: 'ಉಪ ಅಧಿಪತಿ',
        labelMl: 'ഉപ നാഥൻ',
        path: 'subLordName',
        isHighlight: true,
        format: (val, row) => (row?.subLord?.ta ? `${row.subLord?.en || row.subLordName || val} (${row.subLord.ta})` : (row?.subLordName || row?.subLord?.en || val || '-'))
      },
      {
        key: 'rasiDMS',
        labelEn: 'Sign DMS Range',
        labelTa: 'ராசி பாகை வரம்பு',
        labelHi: 'राशि अंश विस्तार',
        labelTe: 'రాశి పరిధి',
        labelKn: 'ರಾಶಿ ವ್ಯಾಪ್ತಿ',
        labelMl: 'ರಾಶಿ ಪರಿಧಿ',
        path: 'rasiStartDMS',
        format: (val, row) => (row?.rasiStartDMS && row?.rasiEndDMS ? `${row.rasiStartDMS} - ${row.rasiEndDMS}` : '-')
      },
      {
        key: 'spanFormatted',
        labelEn: 'Span',
        labelTa: 'அளவு (Span)',
        labelHi: 'विस्तार',
        labelTe: 'విస్తృతి',
        labelKn: 'ವಿಸ್ತಾರ',
        labelMl: 'വ്യാപ്തി',
        path: 'spanFormatted'
      }
    ],
    formFields: [
      { name: 'number', labelEn: 'KP Horary Number (1-249)', labelTa: 'ஹோரரி எண் (1-249)', type: 'number', required: true },
      { name: 'rasiId', labelEn: 'Rasi ID (0-11)', labelTa: 'ராசி எண் (0-11)', type: 'number', required: true },
      { name: 'sign.en', labelEn: 'Sign Name (English)', labelTa: 'ராசி பெயர் (English)', type: 'text', required: true },
      { name: 'sign.ta', labelEn: 'Sign Name (Tamil)', labelTa: 'ராசி பெயர் (தமிழ்)', type: 'text', required: true },
      { name: 'signLord.en', labelEn: 'Sign Lord (English)', labelTa: 'ராசி அதிபதி (English)', type: 'text', required: true },
      { name: 'signLord.ta', labelEn: 'Sign Lord (Tamil)', labelTa: 'ராசி அதிபதி (தமிழ்)', type: 'text', required: true },
      { name: 'nakshatraId', labelEn: 'Nakshatra ID (1-27)', labelTa: 'நட்சத்திர எண் (1-27)', type: 'number', required: true },
      { name: 'star.en', labelEn: 'Star Name (English)', labelTa: 'நட்சத்திரம் (English)', type: 'text', required: true },
      { name: 'star.ta', labelEn: 'Star Name (Tamil)', labelTa: 'நட்சத்திரம் (தமிழ்)', type: 'text', required: true },
      { name: 'starLord.en', labelEn: 'Star Lord (English)', labelTa: 'நட்சத்திர அதிபதி (English)', type: 'text', required: true },
      { name: 'starLord.ta', labelEn: 'Star Lord (Tamil)', labelTa: 'நட்சத்திர அதிபதி (தமிழ்)', type: 'text', required: true },
      { name: 'subLordName', labelEn: 'Sub Lord Name (English)', labelTa: 'உப அதிபதி பெயர் (English)', type: 'text', required: true },
      { name: 'subLord.en', labelEn: 'Sub Lord (English)', labelTa: 'உப அதிபதி (English)', type: 'text', required: true },
      { name: 'subLord.ta', labelEn: 'Sub Lord (Tamil)', labelTa: 'உப அதிபதி (தமிழ்)', type: 'text', required: true },
      { name: 'startDegree', labelEn: 'Start Degree (0-360)', labelTa: 'தொடக்க பாகை (0-360)', type: 'number', step: '0.0001', required: true },
      { name: 'endDegree', labelEn: 'End Degree (0-360)', labelTa: 'முடிவு பாகை (0-360)', type: 'number', step: '0.0001', required: true },
      { name: 'startDMS', labelEn: 'Start DMS (Zodiac)', labelTa: 'தொடக்க DMS (ராசி மண்டலம்)', type: 'text', required: true },
      { name: 'endDMS', labelEn: 'End DMS (Zodiac)', labelTa: 'முடிவு DMS (ராசி மண்டலம்)', type: 'text', required: true },
      { name: 'rasiStartDMS', labelEn: 'Rasi Start DMS', labelTa: 'ராசி தொடக்க DMS', type: 'text', required: true },
      { name: 'rasiEndDMS', labelEn: 'Rasi End DMS', labelTa: 'ராசி முடிவு DMS', type: 'text', required: true },
      { name: 'spanFormatted', labelEn: 'Arc Span Formatted', labelTa: 'பாகை அளவு', type: 'text', required: true }
    ]
  },
  {
    key: 'kadikara-prasannam',
    name: 'Kadikara Prasannam (Clock Horary Master)',
    nameEn: 'Kadikara Prasannam',
    nameTa: 'கடிகார பிரசன்னம்',
    nameHi: 'घड़ी प्रश्न ज्योतिष',
    nameTe: 'గడికార ప్రసన్నం',
    nameKn: 'ಗಡಿಯಾರ ಪ್ರಸನ್ನ',
    nameMl: 'ഘടികാര പ്രസന്നം',
    icon: 'Clock',
    color: '#9333ea',
    primaryKey: '_id',
    modalSize: 'large',
    columns: [
      {
        key: 'key',
        labelEn: 'Identifier Key',
        labelTa: 'அடையாளக் குறியீடு',
        labelHi: 'पहचान कुंजी',
        labelTe: 'గుర్తింపు కీ',
        labelKn: 'ಗುರುತಿನ ಕೀ',
        labelMl: 'ഐഡന്റിഫയർ കീ',
        path: 'key',
        isHighlight: true
      },
      {
        key: 'category',
        labelEn: 'Category',
        labelTa: 'பிரிவு',
        labelHi: 'श्रेणी',
        labelTe: 'వర్గం',
        labelKn: 'ವರ್ಗ',
        labelMl: 'വിഭാഗം',
        path: 'category',
        format: (val) => (val ? String(val).toUpperCase() : '-')
      },
      {
        key: 'order',
        labelEn: 'Order / Bhava',
        labelTa: 'வரிசை / பாவம்',
        labelHi: 'क्रम / भाव',
        labelTe: 'క్రమం / భావము',
        labelKn: 'ಕ್ರಮ / ಭಾವ',
        labelMl: 'ക്രമം / ഭാവം',
        path: 'order',
        format: (val, row) => (row?.bhava ? `Bhava ${row.bhava} (#${val})` : `#${val}`)
      },
      {
        key: 'title',
        labelEn: 'Title / Subject',
        labelTa: 'தலைப்பு / விவரம்',
        labelHi: 'शीर्षक / विषय',
        labelTe: 'శీర్షిక / విషయం',
        labelKn: 'ಶೀರ್ಷಿಕೆ / ವಿಷಯ',
        labelMl: 'തലക്കെട്ട് / വിഷയം',
        path: 'title',
        format: (val, row) => {
          return row?.title?.ta || row?.title?.en || row?.question?.ta || row?.question?.en || row?.key || '-';
        }
      },
      {
        key: 'ratingType',
        labelEn: 'Rating Type',
        labelTa: 'பலன் வகை',
        labelHi: 'फलादेश प्रकार',
        labelTe: 'ఫలిత రకం',
        labelKn: 'ಫಲಿತಾಂಶ ಪ್ರಕಾರ',
        labelMl: 'ಫಲ ತരം',
        path: 'ratingType',
        format: (val) => (val ? String(val).toUpperCase() : 'GENERAL')
      },
      {
        key: 'percentage',
        labelEn: 'Success Rate',
        labelTa: 'வெற்றி விகிதம்',
        labelHi: 'सफलता दर',
        labelTe: 'విజయ శాతం',
        labelKn: 'ಯಶಸ್ಸಿನ ಪ್ರಮಾಣ',
        labelMl: 'വിജയ നിരക്ക്',
        path: 'percentage',
        format: (val) => (val !== undefined && val !== null ? `${val}%` : '-')
      },
      {
        key: 'status',
        labelEn: 'Status Term',
        labelTa: 'காரிய நிலை',
        labelHi: 'स्थिति',
        labelTe: 'స్థితి',
        labelKn: 'ಸ್ಥಿತಿ',
        labelMl: 'സ്ഥിതി',
        path: 'status',
        format: (val, row) => (row?.status?.ta ? `${row.status.ta} (${row.status.en || ''})` : (row?.status?.en || '-'))
      }
    ],
    formFields: [
      { name: 'key', labelEn: 'Key Code (e.g. bhava_1, rule_1, faq_1)', labelTa: 'குறியீட்டுப் பெயர்', type: 'text', required: true },
      { name: 'category', labelEn: 'Category', labelTa: 'பிரிவு', type: 'select', options: ['bhava', 'rule', 'concept', 'faq'], required: true },
      { name: 'order', labelEn: 'Display Order', labelTa: 'காட்சி வரிசை', type: 'number', required: true },
      { name: 'bhava', labelEn: 'Bhava House Number (1-12, for Bhavas)', labelTa: 'பாவக எண் (1-12)', type: 'number' },
      { name: 'ratingType', labelEn: 'Rating Type', labelTa: 'பலன் வகை', type: 'select', options: ['excellent', 'very-good', 'good', 'normal', 'delay', 'failure', 'hard', 'general'] },
      { name: 'percentage', labelEn: 'Success Percentage (0-100)', labelTa: 'வெற்றி சதவீதம் (0-100)', type: 'number' },
      { name: 'badgeBg', labelEn: 'Badge Background Color (Hex)', labelTa: 'வண்ணக் குறியீடு (Hex)', type: 'text' },
      { name: 'badgeColor', labelEn: 'Badge Text Color (Hex)', labelTa: 'எழுத்து நிறம் (Hex)', type: 'text' },
      { name: 'title.en', labelEn: 'Title (English)', labelTa: 'தலைப்பு (English)', type: 'text' },
      { name: 'title.ta', labelEn: 'Title (Tamil)', labelTa: 'தலைப்பு (தமிழ்)', type: 'text' },
      { name: 'title.hi', labelEn: 'Title (Hindi)', labelTa: 'शीर्षक (हिन्दी)', type: 'text' },
      { name: 'title.te', labelEn: 'Title (Telugu)', labelTa: 'శీర్షిక (తెలుగు)', type: 'text' },
      { name: 'title.kn', labelEn: 'Title (Kannada)', labelTa: 'ಶೀರ್ಷಿಕೆ (ಕನ್ನಡ)', type: 'text' },
      { name: 'title.ml', labelEn: 'Title (Malayalam)', labelTa: 'തലക്കെട്ട് (മലയാളം)', type: 'text' },
      { name: 'status.en', labelEn: 'Status (English)', labelTa: 'நிலை (English)', type: 'text' },
      { name: 'status.ta', labelEn: 'Status (Tamil)', labelTa: 'நிலை (தமிழ்)', type: 'text' },
      { name: 'status.hi', labelEn: 'Status (Hindi)', labelTa: 'स्थिति (हिन्दी)', type: 'text' },
      { name: 'status.te', labelEn: 'Status (Telugu)', labelTa: 'స్థితి (తెలుగు)', type: 'text' },
      { name: 'status.kn', labelEn: 'Status (Kannada)', labelTa: 'ಸ್ಥಿತಿ (ಕನ್ನಡ)', type: 'text' },
      { name: 'status.ml', labelEn: 'Status (Malayalam)', labelTa: 'സ്ഥിതി (മലയാളം)', type: 'text' },
      { name: 'desc.en', labelEn: 'Description (English)', labelTa: 'விளக்கம் (English)', type: 'textarea' },
      { name: 'desc.ta', labelEn: 'Description (Tamil)', labelTa: 'விளக்கம் (தமிழ்)', type: 'textarea' },
      { name: 'desc.hi', labelEn: 'Description (Hindi)', labelTa: 'विवरण (हिन्दी)', type: 'textarea' },
      { name: 'desc.te', labelEn: 'Description (Telugu)', labelTa: 'వివరణ (తెలుగు)', type: 'textarea' },
      { name: 'desc.kn', labelEn: 'Description (Kannada)', labelTa: 'ವಿವರಣೆ (ಕನ್ನಡ)', type: 'textarea' },
      { name: 'desc.ml', labelEn: 'Description (Malayalam)', labelTa: 'വിവരണം (മലയാളം)', type: 'textarea' },
      { name: 'question.en', labelEn: 'FAQ Question (English)', labelTa: 'கேள்வி (English)', type: 'text' },
      { name: 'question.ta', labelEn: 'FAQ Question (Tamil)', labelTa: 'கேள்வி (தமிழ்)', type: 'text' },
      { name: 'answer.en', labelEn: 'FAQ Answer (English)', labelTa: 'பதில் (English)', type: 'textarea' },
      { name: 'answer.ta', labelEn: 'FAQ Answer (Tamil)', labelTa: 'பதில் (தமிழ்)', type: 'textarea' }
    ]
  }
];

export const getTableConfig = (key, lang = 'en') => {
  const config = TABLE_CONFIGS.find((c) => c.key === key) || TABLE_CONFIGS[0];
  const langKey = `name${lang.charAt(0).toUpperCase() + lang.slice(1)}`;
  
  let localizedName = config.nameEn || config.name;
  if (lang === 'ta') localizedName = config.nameTa || config.nameEn || config.name;
  else if (lang === 'hi') localizedName = config.nameHi || config.nameEn || config.name;
  else if (lang === 'te') localizedName = config.nameTe || config.nameEn || config.name;
  else if (lang === 'kn') localizedName = config.nameKn || config.nameEn || config.name;
  else if (lang === 'ml') localizedName = config.nameMl || config.nameEn || config.name;
  else if (lang === 'en') localizedName = config.nameEn || config.name;

  const localizedColumns = (config.columns || []).map((col) => {
    const colLabel = lang === 'ta' ? (col.labelTa || col.labelEn || col.label)
      : lang === 'hi' ? (col.labelHi || col.labelEn || col.label)
      : lang === 'te' ? (col.labelTe || col.labelEn || col.label)
      : lang === 'kn' ? (col.labelKn || col.labelEn || col.label)
      : lang === 'ml' ? (col.labelMl || col.labelEn || col.label)
      : (col.labelEn || col.label);
    return { ...col, label: colLabel };
  });

  const localizedFormFields = (config.formFields || []).map((field) => {
    const fieldLabel = lang === 'ta' ? (field.labelTa || field.labelEn || field.label)
      : (field.labelEn || field.label);
    return { ...field, label: fieldLabel };
  });

  return {
    ...config,
    displayName: localizedName,
    columns: localizedColumns,
    formFields: localizedFormFields
  };
};
