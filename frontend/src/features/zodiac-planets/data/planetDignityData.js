/**
 * Classical Planetary Dignities (ஆட்சி, உச்சம், நீசம், நட்பு, பகை, சமம்) Master Data
 * Sourced directly from classical Upendra / Tamil Jyotish texts and the reference chart:
 * "உச்ச - நீச - சத்துரு - மித்துரு ராசிகள்"
 */

export const DIGNITY_STATUS_CONFIG = {
  atchi: {
    key: 'atchi',
    nameTa: 'ஆட்சி',
    nameEn: 'Own',
    shortTa: 'ஆட்சி',
    color: '#d97706',
    textColor: '#78350f',
    bg: '#fef3c7',
    borderColor: '#fde68a',
    badgeClass: 'badge-atchi',
    priority: 2
  },
  ucham: {
    key: 'ucham',
    nameTa: 'உச்சம்',
    nameEn: 'Exalted',
    shortTa: 'உச்சம்',
    color: '#059669',
    textColor: '#064e3b',
    bg: '#ecfdf5',
    borderColor: '#a7f3d0',
    badgeClass: 'badge-ucham',
    priority: 1
  },
  neecham: {
    key: 'neecham',
    nameTa: 'நீசம்',
    nameEn: 'Debilitated',
    shortTa: 'நீசம்',
    color: '#dc2626',
    textColor: '#7f1d1d',
    bg: '#fef2f2',
    borderColor: '#fecaca',
    badgeClass: 'badge-neecham',
    priority: 5
  },
  natpu: {
    key: 'natpu',
    nameTa: 'நட்பு',
    nameEn: 'Friend',
    shortTa: 'நட்பு',
    color: '#0284c7',
    textColor: '#0c4a6e',
    bg: '#f0f9ff',
    borderColor: '#bae6fd',
    badgeClass: 'badge-natpu',
    priority: 3
  },
  pagai: {
    key: 'pagai',
    nameTa: 'பகை',
    nameEn: 'Enemy',
    shortTa: 'பகை',
    color: '#ea580c',
    textColor: '#7c2d12',
    bg: '#fff7ed',
    borderColor: '#fed7aa',
    badgeClass: 'badge-pagai',
    priority: 4
  },
  samam: {
    key: 'samam',
    nameTa: 'சமம்',
    nameEn: 'Neutral',
    shortTa: 'சமம்',
    color: '#64748b',
    textColor: '#1e293b',
    bg: '#f8fafc',
    borderColor: '#e2e8f0',
    badgeClass: 'badge-samam',
    priority: 6
  }
};

export const TATKALIKA_RULES_DATA = {
  titleTa: 'தற்கால சத்துரு-மித்துரு கிரகம் & பஞ்சதா மைத்ரி விளக்கம்',
  titleEn: 'Temporal Planetary Friendship (Tatkalika Mitra-Satru) & Compound Relationship (Panchadha Maitri)',
  titleHi: 'तात्कालिक मित्रता एवं पंचधा मैत्री',
  titleTe: 'తాత్కాలిక మైత్రి మరియు పంచధా మైత్రి',
  titleKn: 'ತಾತ್ಕಾಲಿಕ ಮೈತ್ರಿ ಮತ್ತು ಪಂಚಧಾ ಮೈತ್ರಿ',
  titleMl: 'താത്കാലിക സൗഹൃദവും പഞ്ചധാ മൈത്രിയും',
  rulePrincipleTa: 'ஒரு கிரகம் இருக்கிற ராசியிலிருந்து 2, 3, 4, 10, 11, 12-ஆம் ராசிகளில் இருக்கிற கிரகங்கள் அக்கிரகத்துக்குத் தற்கால மித்துரரென்றும்; 1, 5, 6, 7, 8, 9-ல் இருக்கும் கிரகங்கள் தற்கால சத்துருவென்றும் அறிய வேண்டும்.',
  rulePrincipleEn: 'From the sign where a planet is posited, planets situated in the 2nd, 3rd, 4th, 10th, 11th, and 12th houses act as its Temporal Friends (தற்கால மித்துரு). Planets situated in the 1st, 5th, 6th, 7th, 8th, and 9th houses act as its Temporal Enemies (தற்கால சத்துரு).',
  friendlyHouses: [2, 3, 4, 10, 11, 12],
  enemyHouses: [1, 5, 6, 7, 8, 9],
  compoundTable: [
    {
      naturalTa: 'நைசர்கிக மித்துரு (இயற்கை நட்பு)',
      temporalTa: 'தற்கால மித்துரு (நட்பு)',
      compoundTa: 'அதி மித்துரு (மிகச் சிறந்த நண்பர்)',
      naturalEn: 'Natural Friend',
      temporalEn: 'Temporal Friend',
      compoundEn: 'Adhi Mitra (Great Friend)',
      statusType: 'adhi_natpu',
      color: '#059669',
      badge: '⭐⭐'
    },
    {
      naturalTa: 'நைசர்கிக மித்துரு (இயற்கை நட்பு)',
      temporalTa: 'தற்கால சத்துரு (பகை)',
      compoundTa: 'சமம் (நடுநிலை)',
      naturalEn: 'Natural Friend',
      temporalEn: 'Temporal Enemy',
      compoundEn: 'Sama (Neutral)',
      statusType: 'samam',
      color: '#475569',
      badge: '⚪'
    },
    {
      naturalTa: 'நைசர்கிக சமம் (இயற்கை சமம்)',
      temporalTa: 'தற்கால மித்துரு (நட்பு)',
      compoundTa: 'மித்துரு (நண்பர்)',
      naturalEn: 'Natural Neutral',
      temporalEn: 'Temporal Friend',
      compoundEn: 'Mitra (Friend)',
      statusType: 'natpu',
      color: '#0284c7',
      badge: '⭐'
    },
    {
      naturalTa: 'நைசர்கிக சமம் (இயற்கை சமம்)',
      temporalTa: 'தற்கால சத்துரு (பகை)',
      compoundTa: 'சத்துரு (பகைவர்)',
      naturalEn: 'Natural Neutral',
      temporalEn: 'Temporal Enemy',
      compoundEn: 'Satru (Enemy)',
      statusType: 'pagai',
      color: '#ea580c',
      badge: '⚠️'
    },
    {
      naturalTa: 'நைசர்கிக சத்துரு (இயற்கை பகை)',
      temporalTa: 'தற்கால மித்துரு (நட்பு)',
      compoundTa: 'சமம் (நடுநிலை)',
      naturalEn: 'Natural Enemy',
      temporalEn: 'Temporal Friend',
      compoundEn: 'Sama (Neutral)',
      statusType: 'samam',
      color: '#475569',
      badge: '⚪'
    },
    {
      naturalTa: 'நைசர்கிக சத்துரு (இயற்கை பகை)',
      temporalTa: 'தற்கால சத்துரு (பகை)',
      compoundTa: 'அதி சத்துரு (கொடும் பகைவர்)',
      naturalEn: 'Natural Enemy',
      temporalEn: 'Temporal Enemy',
      compoundEn: 'Adhi Satru (Bitter Enemy)',
      statusType: 'adhi_pagai',
      color: '#dc2626',
      badge: '❌'
    }
  ],
  classicalExampleTa: 'உதாரணம்: சூரியன் கடக ராசியிலிருக்க, அவ்வீட்டுக்குரிய சந்திரன் [சூரியனுக்கு நைசர்கத்தில் மித்துரனாயிருந்தும்] தற்கால சூரியனிருந்த ராசிக்கு 6-வது இடமாகிய தனுசுவிலிருப்பாரேயானால் அந்தச் சூரியன் சமக்கிரகமாகின்றது. இப்படியே அதிமித்துரன், அதி சத்துரு முதலியவைகளைக் கண்டு பலன்களைத் துல்லியமாக நிர்ணயிக்க வேண்டும்.',
  classicalExampleEn: 'Example: When Sun is in Cancer, Moon (who is naturally a friend to Sun) placed in Sagittarius (which is the 6th house from Cancer, hence a temporal enemy) becomes a Neutral planet (Sama). In this manner, analyze Adhi Mitra, Adhi Satru, etc., to accurately pronounce predictions.'
};

export const PLANET_RASI_DIGNITIES_DATA = [
  // 0: Mesham (மேஷம் / Aries) - Mars Own Sign
  {
    rasiId: 0,
    order: 1,
    rasiName: 'Aries',
    rasiNameTa: 'மேஷம்',
    rasiNameHi: 'मेष',
    rasiNameTe: 'మేషం',
    rasiNameKn: 'ಮೇಷ',
    rasiNameMl: 'മേടം',
    athipathiName: 'Mars',
    athipathiNameTa: 'செவ்வாய்',
    planets: [
      { planetId: 0, name: 'Sun', nameTa: 'சூரியன்', status: 'ucham', statusTa: 'உச்சம்', statusEn: 'Exalted' },
      { planetId: 1, name: 'Moon', nameTa: 'சந்திரன்', status: 'samam', statusTa: 'சமம்', statusEn: 'Neutral' },
      { planetId: 2, name: 'Mars', nameTa: 'செவ்வாய்', status: 'atchi', statusTa: 'ஆட்சி', statusEn: 'Own' },
      { planetId: 3, name: 'Mercury', nameTa: 'புதன்', status: 'samam', statusTa: 'சமம்', statusEn: 'Neutral' },
      { planetId: 4, name: 'Jupiter', nameTa: 'குரு', status: 'natpu', statusTa: 'நட்பு', statusEn: 'Friend' },
      { planetId: 5, name: 'Venus', nameTa: 'சுக்கிரன்', status: 'samam', statusTa: 'சமம்', statusEn: 'Neutral' },
      { planetId: 6, name: 'Saturn', nameTa: 'சனி', status: 'neecham', statusTa: 'நீசம்', statusEn: 'Debilitated' },
      { planetId: 7, name: 'Rahu', nameTa: 'ராகு', status: 'pagai', statusTa: 'பகை', statusEn: 'Enemy' },
      { planetId: 8, name: 'Ketu', nameTa: 'கேது', status: 'pagai', statusTa: 'பகை', statusEn: 'Enemy' }
    ]
  },

  // 1: Rishabam (ரிஷபம் / Taurus) - Venus Own Sign
  {
    rasiId: 1,
    order: 2,
    rasiName: 'Taurus',
    rasiNameTa: 'ரிஷபம்',
    rasiNameHi: 'वृषभ',
    rasiNameTe: 'వృషభం',
    rasiNameKn: 'ವೃಷಭ',
    rasiNameMl: 'ഇടവം',
    athipathiName: 'Venus',
    athipathiNameTa: 'சுக்கிரன்',
    planets: [
      { planetId: 0, name: 'Sun', nameTa: 'சூரியன்', status: 'pagai', statusTa: 'பகை', statusEn: 'Enemy' },
      { planetId: 1, name: 'Moon', nameTa: 'சந்திரன்', status: 'ucham', statusTa: 'உச்சம்', statusEn: 'Exalted' },
      { planetId: 2, name: 'Mars', nameTa: 'செவ்வாய்', status: 'samam', statusTa: 'சமம்', statusEn: 'Neutral' },
      { planetId: 3, name: 'Mercury', nameTa: 'புதன்', status: 'natpu', statusTa: 'நட்பு', statusEn: 'Friend' },
      { planetId: 4, name: 'Jupiter', nameTa: 'குரு', status: 'pagai', statusTa: 'பகை', statusEn: 'Enemy' },
      { planetId: 5, name: 'Venus', nameTa: 'சுக்கிரன்', status: 'atchi', statusTa: 'ஆட்சி', statusEn: 'Own' },
      { planetId: 6, name: 'Saturn', nameTa: 'சனி', status: 'natpu', statusTa: 'நட்பு', statusEn: 'Friend' },
      { planetId: 7, name: 'Rahu', nameTa: 'ராகு', status: 'neecham', statusTa: 'நீசம்', statusEn: 'Debilitated' },
      { planetId: 8, name: 'Ketu', nameTa: 'கேது', status: 'neecham', statusTa: 'நீசம்', statusEn: 'Debilitated' }
    ]
  },

  // 2: Mithunam (மிதுனம் / Gemini) - Mercury Own Sign
  {
    rasiId: 2,
    order: 3,
    rasiName: 'Gemini',
    rasiNameTa: 'மிதுனம்',
    rasiNameHi: 'मिथुन',
    rasiNameTe: 'మిథునం',
    rasiNameKn: 'ಮಿಥುನ',
    rasiNameMl: 'മിഥുനം',
    athipathiName: 'Mercury',
    athipathiNameTa: 'புதன்',
    planets: [
      { planetId: 0, name: 'Sun', nameTa: 'சூரியன்', status: 'samam', statusTa: 'சமம்', statusEn: 'Neutral' },
      { planetId: 1, name: 'Moon', nameTa: 'சந்திரன்', status: 'natpu', statusTa: 'நட்பு', statusEn: 'Friend' },
      { planetId: 2, name: 'Mars', nameTa: 'செவ்வாய்', status: 'pagai', statusTa: 'பகை', statusEn: 'Enemy' },
      { planetId: 3, name: 'Mercury', nameTa: 'புதன்', status: 'atchi', statusTa: 'ஆட்சி', statusEn: 'Own' },
      { planetId: 4, name: 'Jupiter', nameTa: 'குரு', status: 'pagai', statusTa: 'பகை', statusEn: 'Enemy' },
      { planetId: 5, name: 'Venus', nameTa: 'சுக்கிரன்', status: 'natpu', statusTa: 'நட்பு', statusEn: 'Friend' },
      { planetId: 6, name: 'Saturn', nameTa: 'சனி', status: 'natpu', statusTa: 'நட்பு', statusEn: 'Friend' },
      { planetId: 7, name: 'Rahu', nameTa: 'ராகு', status: 'natpu', statusTa: 'நட்பு', statusEn: 'Friend' },
      { planetId: 8, name: 'Ketu', nameTa: 'கேது', status: 'natpu', statusTa: 'நட்பு', statusEn: 'Friend' }
    ]
  },

  // 3: Kadakam (கடகம் / Cancer) - Moon Own Sign
  {
    rasiId: 3,
    order: 4,
    rasiName: 'Cancer',
    rasiNameTa: 'கடகம்',
    rasiNameHi: 'कर्क',
    rasiNameTe: 'కర్కాటకం',
    rasiNameKn: 'ಕರ್ಕಾಟಕ',
    rasiNameMl: 'കർക്കിടകം',
    athipathiName: 'Moon',
    athipathiNameTa: 'சந்திரன்',
    planets: [
      { planetId: 0, name: 'Sun', nameTa: 'சூரியன்', status: 'samam', statusTa: 'சமம்', statusEn: 'Neutral' },
      { planetId: 1, name: 'Moon', nameTa: 'சந்திரன்', status: 'atchi', statusTa: 'ஆட்சி', statusEn: 'Own' },
      { planetId: 2, name: 'Mars', nameTa: 'செவ்வாய்', status: 'neecham', statusTa: 'நீசம்', statusEn: 'Debilitated' },
      { planetId: 3, name: 'Mercury', nameTa: 'புதன்', status: 'pagai', statusTa: 'பகை', statusEn: 'Enemy' },
      { planetId: 4, name: 'Jupiter', nameTa: 'குரு', status: 'ucham', statusTa: 'உச்சம்', statusEn: 'Exalted' },
      { planetId: 5, name: 'Venus', nameTa: 'சுக்கிரன்', status: 'pagai', statusTa: 'பகை', statusEn: 'Enemy' },
      { planetId: 6, name: 'Saturn', nameTa: 'சனி', status: 'pagai', statusTa: 'பகை', statusEn: 'Enemy' },
      { planetId: 7, name: 'Rahu', nameTa: 'ராகு', status: 'pagai', statusTa: 'பகை', statusEn: 'Enemy' },
      { planetId: 8, name: 'Ketu', nameTa: 'கேது', status: 'pagai', statusTa: 'பகை', statusEn: 'Enemy' }
    ]
  },

  // 4: Simmam (சிம்மம் / Leo) - Sun Own Sign
  {
    rasiId: 4,
    order: 5,
    rasiName: 'Leo',
    rasiNameTa: 'சிம்மம்',
    rasiNameHi: 'सिंह',
    rasiNameTe: 'సింహం',
    rasiNameKn: 'ಸಿಂಹ',
    rasiNameMl: 'ചിങ്ങം',
    athipathiName: 'Sun',
    athipathiNameTa: 'சூரியன்',
    planets: [
      { planetId: 0, name: 'Sun', nameTa: 'சூரியன்', status: 'atchi', statusTa: 'ஆட்சி', statusEn: 'Own' },
      { planetId: 1, name: 'Moon', nameTa: 'சந்திரன்', status: 'natpu', statusTa: 'நட்பு', statusEn: 'Friend' },
      { planetId: 2, name: 'Mars', nameTa: 'செவ்வாய்', status: 'natpu', statusTa: 'நட்பு', statusEn: 'Friend' },
      { planetId: 3, name: 'Mercury', nameTa: 'புதன்', status: 'natpu', statusTa: 'நட்பு', statusEn: 'Friend' },
      { planetId: 4, name: 'Jupiter', nameTa: 'குரு', status: 'natpu', statusTa: 'நட்பு', statusEn: 'Friend' },
      { planetId: 5, name: 'Venus', nameTa: 'சுக்கிரன்', status: 'pagai', statusTa: 'பகை', statusEn: 'Enemy' },
      { planetId: 6, name: 'Saturn', nameTa: 'சனி', status: 'pagai', statusTa: 'பகை', statusEn: 'Enemy' },
      { planetId: 7, name: 'Rahu', nameTa: 'ராகு', status: 'pagai', statusTa: 'பகை', statusEn: 'Enemy' },
      { planetId: 8, name: 'Ketu', nameTa: 'கேது', status: 'pagai', statusTa: 'பகை', statusEn: 'Enemy' }
    ]
  },

  // 5: Kanni (கன்னி / Virgo) - Mercury Own & Exalted Sign
  {
    rasiId: 5,
    order: 6,
    rasiName: 'Virgo',
    rasiNameTa: 'கன்னி',
    rasiNameHi: 'कन्या',
    rasiNameTe: 'కన్య',
    rasiNameKn: 'ಕನ್ಯಾ',
    rasiNameMl: 'കന്നി',
    athipathiName: 'Mercury',
    athipathiNameTa: 'புதன்',
    planets: [
      { planetId: 0, name: 'Sun', nameTa: 'சூரியன்', status: 'samam', statusTa: 'சமம்', statusEn: 'Neutral' },
      { planetId: 1, name: 'Moon', nameTa: 'சந்திரன்', status: 'natpu', statusTa: 'நட்பு', statusEn: 'Friend' },
      { planetId: 2, name: 'Mars', nameTa: 'செவ்வாய்', status: 'pagai', statusTa: 'பகை', statusEn: 'Enemy' },
      { planetId: 3, name: 'Mercury', nameTa: 'புதன்', status: 'ucham', statusTa: 'உச்சம்', statusEn: 'Exalted' },
      { planetId: 4, name: 'Jupiter', nameTa: 'குரு', status: 'pagai', statusTa: 'பகை', statusEn: 'Enemy' },
      { planetId: 5, name: 'Venus', nameTa: 'சுக்கிரன்', status: 'neecham', statusTa: 'நீசம்', statusEn: 'Debilitated' },
      { planetId: 6, name: 'Saturn', nameTa: 'சனி', status: 'natpu', statusTa: 'நட்பு', statusEn: 'Friend' },
      { planetId: 7, name: 'Rahu', nameTa: 'ராகு', status: 'natpu', statusTa: 'நட்பு', statusEn: 'Friend' },
      { planetId: 8, name: 'Ketu', nameTa: 'கேது', status: 'natpu', statusTa: 'நட்பு', statusEn: 'Friend' }
    ]
  },

  // 6: Thulam (துலாம் / Libra) - Venus Own Sign
  {
    rasiId: 6,
    order: 7,
    rasiName: 'Libra',
    rasiNameTa: 'துலாம்',
    rasiNameHi: 'तुला',
    rasiNameTe: 'తుల',
    rasiNameKn: 'ತುಲಾ',
    rasiNameMl: 'തുലാം',
    athipathiName: 'Venus',
    athipathiNameTa: 'சுக்கிரன்',
    planets: [
      { planetId: 0, name: 'Sun', nameTa: 'சூரியன்', status: 'neecham', statusTa: 'நீசம்', statusEn: 'Debilitated' },
      { planetId: 1, name: 'Moon', nameTa: 'சந்திரன்', status: 'samam', statusTa: 'சமம்', statusEn: 'Neutral' },
      { planetId: 2, name: 'Mars', nameTa: 'செவ்வாய்', status: 'samam', statusTa: 'சமம்', statusEn: 'Neutral' },
      { planetId: 3, name: 'Mercury', nameTa: 'புதன்', status: 'natpu', statusTa: 'நட்பு', statusEn: 'Friend' },
      { planetId: 4, name: 'Jupiter', nameTa: 'குரு', status: 'pagai', statusTa: 'பகை', statusEn: 'Enemy' },
      { planetId: 5, name: 'Venus', nameTa: 'சுக்கிரன்', status: 'atchi', statusTa: 'ஆட்சி', statusEn: 'Own' },
      { planetId: 6, name: 'Saturn', nameTa: 'சனி', status: 'ucham', statusTa: 'உச்சம்', statusEn: 'Exalted' },
      { planetId: 7, name: 'Rahu', nameTa: 'ராகு', status: 'natpu', statusTa: 'நட்பு', statusEn: 'Friend' },
      { planetId: 8, name: 'Ketu', nameTa: 'கேது', status: 'natpu', statusTa: 'நட்பு', statusEn: 'Friend' }
    ]
  },

  // 7: Vrichigam (விருச்சிகம் / Scorpio) - Mars Own Sign
  {
    rasiId: 7,
    order: 8,
    rasiName: 'Scorpio',
    rasiNameTa: 'விருச்சிகம்',
    rasiNameHi: 'वृश्चिक',
    rasiNameTe: 'వృశ్చికం',
    rasiNameKn: 'ವೃಶ್ಚಿಕ',
    rasiNameMl: 'വൃശ്ചികം',
    athipathiName: 'Mars',
    athipathiNameTa: 'செவ்வாய்',
    planets: [
      { planetId: 0, name: 'Sun', nameTa: 'சூரியன்', status: 'natpu', statusTa: 'நட்பு', statusEn: 'Friend' },
      { planetId: 1, name: 'Moon', nameTa: 'சந்திரன்', status: 'neecham', statusTa: 'நீசம்', statusEn: 'Debilitated' },
      { planetId: 2, name: 'Mars', nameTa: 'செவ்வாய்', status: 'atchi', statusTa: 'ஆட்சி', statusEn: 'Own' },
      { planetId: 3, name: 'Mercury', nameTa: 'புதன்', status: 'samam', statusTa: 'சமம்', statusEn: 'Neutral' },
      { planetId: 4, name: 'Jupiter', nameTa: 'குரு', status: 'natpu', statusTa: 'நட்பு', statusEn: 'Friend' },
      { planetId: 5, name: 'Venus', nameTa: 'சுக்கிரன்', status: 'samam', statusTa: 'சமம்', statusEn: 'Neutral' },
      { planetId: 6, name: 'Saturn', nameTa: 'சனி', status: 'pagai', statusTa: 'பகை', statusEn: 'Enemy' },
      { planetId: 7, name: 'Rahu', nameTa: 'ராகு', status: 'ucham', statusTa: 'உச்சம்', statusEn: 'Exalted' },
      { planetId: 8, name: 'Ketu', nameTa: 'கேது', status: 'ucham', statusTa: 'உச்சம்', statusEn: 'Exalted' }
    ]
  },

  // 8: Dhanusu (தனுசு / Sagittarius) - Jupiter Own Sign
  {
    rasiId: 8,
    order: 9,
    rasiName: 'Sagittarius',
    rasiNameTa: 'தனுசு',
    rasiNameHi: 'धनु',
    rasiNameTe: 'ధనుస్సు',
    rasiNameKn: 'ಧನುಸ್ಸು',
    rasiNameMl: 'ധനു',
    athipathiName: 'Jupiter',
    athipathiNameTa: 'குரு',
    planets: [
      { planetId: 0, name: 'Sun', nameTa: 'சூரியன்', status: 'natpu', statusTa: 'நட்பு', statusEn: 'Friend' },
      { planetId: 1, name: 'Moon', nameTa: 'சந்திரன்', status: 'samam', statusTa: 'சமம்', statusEn: 'Neutral' },
      { planetId: 2, name: 'Mars', nameTa: 'செவ்வாய்', status: 'natpu', statusTa: 'நட்பு', statusEn: 'Friend' },
      { planetId: 3, name: 'Mercury', nameTa: 'புதன்', status: 'samam', statusTa: 'சமம்', statusEn: 'Neutral' },
      { planetId: 4, name: 'Jupiter', nameTa: 'குரு', status: 'atchi', statusTa: 'ஆட்சி', statusEn: 'Own' },
      { planetId: 5, name: 'Venus', nameTa: 'சுக்கிரன்', status: 'natpu', statusTa: 'நட்பு', statusEn: 'Friend' },
      { planetId: 6, name: 'Saturn', nameTa: 'சனி', status: 'samam', statusTa: 'சமம்', statusEn: 'Neutral' },
      { planetId: 7, name: 'Rahu', nameTa: 'ராகு', status: 'natpu', statusTa: 'நட்பு', statusEn: 'Friend' },
      { planetId: 8, name: 'Ketu', nameTa: 'கேது', status: 'natpu', statusTa: 'நட்பு', statusEn: 'Friend' }
    ]
  },

  // 9: Makaram (மகரம் / Capricorn) - Saturn Own Sign
  {
    rasiId: 9,
    order: 10,
    rasiName: 'Capricorn',
    rasiNameTa: 'மகரம்',
    rasiNameHi: 'मकर',
    rasiNameTe: 'మకరం',
    rasiNameKn: 'ಮಕರ',
    rasiNameMl: 'മകരം',
    athipathiName: 'Saturn',
    athipathiNameTa: 'சனி',
    planets: [
      { planetId: 0, name: 'Sun', nameTa: 'சூரியன்', status: 'pagai', statusTa: 'பகை', statusEn: 'Enemy' },
      { planetId: 1, name: 'Moon', nameTa: 'சந்திரன்', status: 'samam', statusTa: 'சமம்', statusEn: 'Neutral' },
      { planetId: 2, name: 'Mars', nameTa: 'செவ்வாய்', status: 'ucham', statusTa: 'உச்சம்', statusEn: 'Exalted' },
      { planetId: 3, name: 'Mercury', nameTa: 'புதன்', status: 'samam', statusTa: 'சமம்', statusEn: 'Neutral' },
      { planetId: 4, name: 'Jupiter', nameTa: 'குரு', status: 'neecham', statusTa: 'நீசம்', statusEn: 'Debilitated' },
      { planetId: 5, name: 'Venus', nameTa: 'சுக்கிரன்', status: 'natpu', statusTa: 'நட்பு', statusEn: 'Friend' },
      { planetId: 6, name: 'Saturn', nameTa: 'சனி', status: 'atchi', statusTa: 'ஆட்சி', statusEn: 'Own' },
      { planetId: 7, name: 'Rahu', nameTa: 'ராகு', status: 'natpu', statusTa: 'நட்பு', statusEn: 'Friend' },
      { planetId: 8, name: 'Ketu', nameTa: 'கேது', status: 'natpu', statusTa: 'நட்பு', statusEn: 'Friend' }
    ]
  },

  // 10: Kumbam (கும்பம் / Aquarius) - Saturn Own Sign
  {
    rasiId: 10,
    order: 11,
    rasiName: 'Aquarius',
    rasiNameTa: 'கும்பம்',
    rasiNameHi: 'कुंभ',
    rasiNameTe: 'కుంభం',
    rasiNameKn: 'ಕುಂಭ',
    rasiNameMl: 'കുംഭം',
    athipathiName: 'Saturn',
    athipathiNameTa: 'சனி',
    planets: [
      { planetId: 0, name: 'Sun', nameTa: 'சூரியன்', status: 'pagai', statusTa: 'பகை', statusEn: 'Enemy' },
      { planetId: 1, name: 'Moon', nameTa: 'சந்திரன்', status: 'samam', statusTa: 'சமம்', statusEn: 'Neutral' },
      { planetId: 2, name: 'Mars', nameTa: 'செவ்வாய்', status: 'samam', statusTa: 'சமம்', statusEn: 'Neutral' },
      { planetId: 3, name: 'Mercury', nameTa: 'புதன்', status: 'samam', statusTa: 'சமம்', statusEn: 'Neutral' },
      { planetId: 4, name: 'Jupiter', nameTa: 'குரு', status: 'samam', statusTa: 'சமம்', statusEn: 'Neutral' },
      { planetId: 5, name: 'Venus', nameTa: 'சுக்கிரன்', status: 'natpu', statusTa: 'நட்பு', statusEn: 'Friend' },
      { planetId: 6, name: 'Saturn', nameTa: 'சனி', status: 'atchi', statusTa: 'ஆட்சி', statusEn: 'Own' },
      { planetId: 7, name: 'Rahu', nameTa: 'ராகு', status: 'pagai', statusTa: 'பகை', statusEn: 'Enemy' },
      { planetId: 8, name: 'Ketu', nameTa: 'கேது', status: 'pagai', statusTa: 'பகை', statusEn: 'Enemy' }
    ]
  },

  // 11: Meenam (மீனம் / Pisces) - Jupiter Own Sign
  {
    rasiId: 11,
    order: 12,
    rasiName: 'Pisces',
    rasiNameTa: 'மீனம்',
    rasiNameHi: 'मीन',
    rasiNameTe: 'మీనం',
    rasiNameKn: 'ಮೀನ',
    rasiNameMl: 'മീനം',
    athipathiName: 'Jupiter',
    athipathiNameTa: 'குரு',
    planets: [
      { planetId: 0, name: 'Sun', nameTa: 'சூரியன்', status: 'natpu', statusTa: 'நட்பு', statusEn: 'Friend' },
      { planetId: 1, name: 'Moon', nameTa: 'சந்திரன்', status: 'samam', statusTa: 'சமம்', statusEn: 'Neutral' },
      { planetId: 2, name: 'Mars', nameTa: 'செவ்வாய்', status: 'natpu', statusTa: 'நட்பு', statusEn: 'Friend' },
      { planetId: 3, name: 'Mercury', nameTa: 'புதன்', status: 'neecham', statusTa: 'நீசம்', statusEn: 'Debilitated' },
      { planetId: 4, name: 'Jupiter', nameTa: 'குரு', status: 'atchi', statusTa: 'ஆட்சி', statusEn: 'Own' },
      { planetId: 5, name: 'Venus', nameTa: 'சுக்கிரன்', status: 'ucham', statusTa: 'உச்சம்', statusEn: 'Exalted' },
      { planetId: 6, name: 'Saturn', nameTa: 'சனி', status: 'samam', statusTa: 'சமம்', statusEn: 'Neutral' },
      { planetId: 7, name: 'Rahu', nameTa: 'ராகு', status: 'natpu', statusTa: 'நட்பு', statusEn: 'Friend' },
      { planetId: 8, name: 'Ketu', nameTa: 'கேது', status: 'natpu', statusTa: 'நட்பு', statusEn: 'Friend' }
    ]
  }
];

export const PLANETS_LIST = [
  { id: 0, key: 'Sun', nameTa: 'சூரியன்', nameEn: 'Sun', shortTa: 'சூரி', symbol: '☉', color: '#ea580c' },
  { id: 1, key: 'Moon', nameTa: 'சந்திரன்', nameEn: 'Moon', shortTa: 'சந்', symbol: '☽', color: '#0284c7' },
  { id: 2, key: 'Mars', nameTa: 'செவ்வாய்', nameEn: 'Mars', shortTa: 'செவ்', symbol: '♂', color: '#dc2626' },
  { id: 3, key: 'Mercury', nameTa: 'புதன்', nameEn: 'Mercury', shortTa: 'புதன்', symbol: '☿', color: '#059669' },
  { id: 4, key: 'Jupiter', nameTa: 'குரு', nameEn: 'Jupiter', shortTa: 'குரு', symbol: '♃', color: '#d97706' },
  { id: 5, key: 'Venus', nameTa: 'சுக்கிரன்', nameEn: 'Venus', shortTa: 'சுக்', symbol: '♀', color: '#db2777' },
  { id: 6, key: 'Saturn', nameTa: 'சனி', nameEn: 'Saturn', shortTa: 'சனி', symbol: '♄', color: '#475569' },
  { id: 7, key: 'Rahu', nameTa: 'ராகு', nameEn: 'Rahu', shortTa: 'ராகு', symbol: '☊', color: '#6b21a8' },
  { id: 8, key: 'Ketu', nameTa: 'கேது', nameEn: 'Ketu', shortTa: 'கேது', symbol: '☋', color: '#991b1b' }
];

export const SOUTH_INDIAN_DIGNITY_CHART_ORDER = [
  // Row 1
  { rasiId: 11, gridArea: '1 / 1' }, // Pisces (மீனம்)
  { rasiId: 0,  gridArea: '1 / 2' }, // Aries (மேஷம்)
  { rasiId: 1,  gridArea: '1 / 3' }, // Taurus (ரிஷபம்)
  { rasiId: 2,  gridArea: '1 / 4' }, // Gemini (மிதுனம்)

  // Row 2
  { rasiId: 10, gridArea: '2 / 1' }, // Aquarius (கும்பம்)
  // Center spans 2/2 to 4/4
  { rasiId: 3,  gridArea: '2 / 4' }, // Cancer (கடகம்)

  // Row 3
  { rasiId: 9,  gridArea: '3 / 1' }, // Capricorn (மகரம்)
  { rasiId: 4,  gridArea: '3 / 4' }, // Leo (சிம்மம்)

  // Row 4
  { rasiId: 8,  gridArea: '4 / 1' }, // Sagittarius (தனுசு)
  { rasiId: 7,  gridArea: '4 / 2' }, // Scorpio (விருச்சிகம்)
  { rasiId: 6,  gridArea: '4 / 3' }, // Libra (துலாம்)
  { rasiId: 5,  gridArea: '4 / 4' }  // Virgo (கன்னி)
];
