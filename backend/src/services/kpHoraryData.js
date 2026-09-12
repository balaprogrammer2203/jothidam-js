/**
 * KP Horary Numbers 1-249 Master Dataset (Krishnamurti Paddhati)
 * 6 Languages: English (en), Tamil (ta), Hindi (hi), Telugu (te), Kannada (kn), Malayalam (ml)
 */

const VIMSHOTTARI_YEARS = {
  Ketu: 7,
  Venus: 20,
  Sun: 6,
  Moon: 10,
  Mars: 7,
  Rahu: 18,
  Jupiter: 16,
  Saturn: 19,
  Mercury: 17
};

const PLANET_ORDER = ['Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury'];

const MULTILINGUAL_PLANETS = {
  Ketu: { en: 'Ketu', ta: 'கேது', hi: 'केतु', te: 'కేతువు', kn: 'ಕೇತು', ml: 'കേതു' },
  Venus: { en: 'Venus', ta: 'சுக்கிரன்', hi: 'शुक्र', te: 'శుక్రుడు', kn: 'ಶುಕ್ರ', ml: 'ശുക്രൻ' },
  Sun: { en: 'Sun', ta: 'சூரியன்', hi: 'सूर्य', te: 'సూర్యుడు', kn: 'ಸೂರ್ಯ', ml: 'സൂര്യൻ' },
  Moon: { en: 'Moon', ta: 'சந்திரன்', hi: 'चन्द्र', te: 'చంద్రుడు', kn: 'ಚಂದ್ರ', ml: 'ചന്ദ്രൻ' },
  Mars: { en: 'Mars', ta: 'செவ்வாய்', hi: 'मंगल', te: 'కుజుడు', kn: 'ಮಂಗಳ', ml: 'ചൊവ്വ' },
  Rahu: { en: 'Rahu', ta: 'ராகு', hi: 'राहु', te: 'రాహువు', kn: 'ರಾಹು', ml: 'രാഹു' },
  Jupiter: { en: 'Jupiter', ta: 'குரு', hi: 'गुरु', te: 'గురువు', kn: 'ಗುರು', ml: 'വ്യാഴം' },
  Saturn: { en: 'Saturn', ta: 'சனி', hi: 'शनि', te: 'శని', kn: 'ಶನಿ', ml: 'ശനി' },
  Mercury: { en: 'Mercury', ta: 'புதன்', hi: 'बुध', te: 'బుధుడు', kn: 'ಬುಧ', ml: 'ബുധൻ' }
};

const MULTILINGUAL_RASIS = [
  { rasiId: 0, lord: 'Mars', en: 'Aries', ta: 'மேஷம்', hi: 'मेष', te: 'మేషం', kn: 'ಮೇಷ', ml: 'മേടം' },
  { rasiId: 1, lord: 'Venus', en: 'Taurus', ta: 'ரிஷபம்', hi: 'वृषभ', te: 'వృషభం', kn: 'ವೃಷಭ', ml: 'ഇടവം' },
  { rasiId: 2, lord: 'Mercury', en: 'Gemini', ta: 'மிதுனம்', hi: 'मिथुन', te: 'మిథునం', kn: 'ಮಿಥುನ', ml: 'ಮಿಥುನಂ' },
  { rasiId: 3, lord: 'Moon', en: 'Cancer', ta: 'கடகம்', hi: 'कर्क', te: 'కర్కాటకం', kn: 'ಕರ್ಕಾಟಕ', ml: 'കർക്കടകം' },
  { rasiId: 4, lord: 'Sun', en: 'Leo', ta: 'சிம்மம்', hi: 'सिंह', te: 'సింహం', kn: 'ಸಿಂಹ', ml: 'ചിങ്ങം' },
  { rasiId: 5, lord: 'Mercury', en: 'Virgo', ta: 'கன்னி', hi: 'कन्या', te: 'కన్య', kn: 'ಕನ್ಯಾ', ml: 'കന്നി' },
  { rasiId: 6, lord: 'Venus', en: 'Libra', ta: 'துலாம்', hi: 'तुला', te: 'తుల', kn: 'ತುಲಾ', ml: 'തുലാം' },
  { rasiId: 7, lord: 'Mars', en: 'Scorpio', ta: 'விருச்சிகம்', hi: 'वृश्चिक', te: 'వృశ్చికం', kn: 'ವೃಶ್ಚಿಕ', ml: 'വൃശ്ചികം' },
  { rasiId: 8, lord: 'Jupiter', en: 'Sagittarius', ta: 'தனுசு', hi: 'धनु', te: 'ధనుస్సు', kn: 'ಧನುಸ್ಸು', ml: 'ധനു' },
  { rasiId: 9, lord: 'Saturn', en: 'Capricorn', ta: 'மகரம்', hi: 'मकर', te: 'మకరం', kn: 'ಮಕರ', ml: 'മകരം' },
  { rasiId: 10, lord: 'Saturn', en: 'Aquarius', ta: 'கும்பம்', hi: 'कुम्भ', te: 'కుంభం', kn: 'ಕುಂಭ', ml: 'കുംഭം' },
  { rasiId: 11, lord: 'Jupiter', en: 'Pisces', ta: 'மீனம்', hi: 'मीन', te: 'మీనం', kn: 'ಮೀನ', ml: 'മീനം' }
];

const MULTILINGUAL_NAKSHATRAS = [
  { id: 1, lord: 'Ketu', en: 'Ashwini', ta: 'அசுவினி', hi: 'अश्विनी', te: 'అశ్విని', kn: 'ಅಶ್ವಿನಿ', ml: 'അശ്വതി' },
  { id: 2, lord: 'Venus', en: 'Bharani', ta: 'பரணி', hi: 'भरणी', te: 'భరణి', kn: 'ಭರಣಿ', ml: 'ഭരണി' },
  { id: 3, lord: 'Sun', en: 'Krittika', ta: 'கார்த்திகை', hi: 'कृत्तिका', te: 'కృత్తిక', kn: 'ಕೃತ್ತಿಕಾ', ml: 'കാർത്തിക' },
  { id: 4, lord: 'Moon', en: 'Rohini', ta: 'ரோகிணி', hi: 'रोहिणी', te: 'రోహిణి', kn: 'ರೋಹಿಣಿ', ml: 'രോഹിണി' },
  { id: 5, lord: 'Mars', en: 'Mrigashira', ta: 'மிருகசீரிஷம்', hi: 'मृगशिरा', te: 'మృగశిర', kn: 'ಮೃಗಶಿರಾ', ml: 'മകയിരം' },
  { id: 6, lord: 'Rahu', en: 'Ardra', ta: 'திருவாதிரை', hi: 'आर्द्रा', te: 'ఆర్ద్ర', kn: 'ಆರ್ದ್ರಾ', ml: 'തിരുവാതിര' },
  { id: 7, lord: 'Jupiter', en: 'Punarvasu', ta: 'புனர்பூசம்', hi: 'पुनर्वसु', te: 'పునర్వసు', kn: 'ಪುನರ್ವಸು', ml: 'പുണർതം' },
  { id: 8, lord: 'Saturn', en: 'Pushya', ta: 'பூசம்', hi: 'पुष्य', te: 'పుష్యమి', kn: 'ಪುಷ್ಯ', ml: 'പൂയം' },
  { id: 9, lord: 'Mercury', en: 'Ashlesha', ta: 'ஆயில்யம்', hi: 'आश्लेषा', te: 'ఆశ్లేష', kn: 'ಆಶ್ಲೇಷಾ', ml: 'ആയില്യം' },
  { id: 10, lord: 'Ketu', en: 'Magha', ta: 'மகம்', hi: 'मघा', te: 'మఖ', kn: 'ಮಖಾ', ml: 'മകം' },
  { id: 11, lord: 'Venus', en: 'Purva Phalguni', ta: 'பூரம்', hi: 'पूर्वाफाल्गुनी', te: 'పూర్వ ఫల్గుణి', kn: 'ಪೂರ್ವಾಫಲ್ಗುಣಿ', ml: 'പൂരം' },
  { id: 12, lord: 'Sun', en: 'Uttara Phalguni', ta: 'உத்திரம்', hi: 'उत्तराफाल्गुनी', te: 'ఉత్తర ఫల్గుణి', kn: 'ಉತ್ತರಾಫಲ್ಗುಣಿ', ml: 'ഉത്രം' },
  { id: 13, lord: 'Moon', en: 'Hasta', ta: 'அஸ்தம்', hi: 'हस्त', te: 'హస్త', kn: 'ಹಸ್ತ', ml: 'അത്തം' },
  { id: 14, lord: 'Mars', en: 'Chitra', ta: 'சித்திரை', hi: 'चित्रा', te: 'చిత్త', kn: 'ಚಿತ್ರಾ', ml: 'ചിത്തിര' },
  { id: 15, lord: 'Rahu', en: 'Swati', ta: 'சுவாதி', hi: 'स्वाति', te: 'స్వాతి', kn: 'ಸ್ವಾತಿ', ml: 'ചോതി' },
  { id: 16, lord: 'Jupiter', en: 'Vishakha', ta: 'விசாகம்', hi: 'विशाखा', te: 'విశాఖ', kn: 'ವಿಶಾಖಾ', ml: 'വിശാഖം' },
  { id: 17, lord: 'Saturn', en: 'Anuradha', ta: 'அனுஷம்', hi: 'अनुराधा', te: 'అనూరాధ', kn: 'ಅನುರಾಧಾ', ml: 'അനിഴം' },
  { id: 18, lord: 'Mercury', en: 'Jyeshtha', ta: 'கேட்டை', hi: 'ज्येष्ठा', te: 'జ్యేష్ఠ', kn: 'ಜ್ಯೇಷ್ಠಾ', ml: 'തൃക്കേട്ട' },
  { id: 19, lord: 'Ketu', en: 'Mula', ta: 'மூலம்', hi: 'मूल', te: 'మూల', kn: 'ಮೂಲ', ml: 'മൂലം' },
  { id: 20, lord: 'Venus', en: 'Purva Ashadha', ta: 'பூராடம்', hi: 'पूर्वाषाढ़ा', te: 'పూర్వాషాఢ', kn: 'ಪೂರ್ವಾಷಾಢ', ml: 'പൂരാടം' },
  { id: 21, lord: 'Sun', en: 'Uttara Ashadha', ta: 'உத்திராடம்', hi: 'उत्तराषाढ़ा', te: 'ఉత్తరాషాఢ', kn: 'ಉತ್ತರಾಷಾಢ', ml: 'ഉത്രാടം' },
  { id: 22, lord: 'Moon', en: 'Shravana', ta: 'திருவோணம்', hi: 'श्रवण', te: 'శ్రవణం', kn: 'ಶ್ರವಣ', ml: 'തിരുവോണം' },
  { id: 23, lord: 'Mars', en: 'Dhanishta', ta: 'அவிட்டம்', hi: 'धनिष्ठा', te: 'ధనిష్ఠ', kn: 'ಧನಿಷ್ಠಾ', ml: 'അവിട്ടം' },
  { id: 24, lord: 'Rahu', en: 'Shatabhisha', ta: 'சதயம்', hi: 'शतभिषा', te: 'శతభిషం', kn: 'ಶತಭಿಷಾ', ml: 'ചതയം' },
  { id: 25, lord: 'Jupiter', en: 'Purva Bhadrapada', ta: 'பூரட்டாதி', hi: 'पूर्वभाद्रपद', te: 'పూర్వాభాద్ర', kn: 'ಪೂರ್ವಾಭಾದ್ರಪದ', ml: 'പൂരുരുട്ടാതി' },
  { id: 26, lord: 'Saturn', en: 'Uttara Bhadrapada', ta: 'உத்திரட்டாதி', hi: 'उत्तरभाद्रपद', te: 'ఉత్తరాభాద్ర', kn: 'ಉತ್ತರಾಭಾದ್ರಪದ', ml: 'ഉത്രട്ടാതി' },
  { id: 27, lord: 'Mercury', en: 'Revati', ta: 'ரேவதி', hi: 'रेवती', te: 'రేవతి', kn: 'ರೇವತಿ', ml: 'രേവതി' }
];

function formatDMS(totalSeconds) {
  const roundSec = Math.round(totalSeconds);
  const deg = Math.floor(roundSec / 3600);
  const rem = roundSec % 3600;
  const min = Math.floor(rem / 60);
  const sec = rem % 60;
  return `${String(deg).padStart(2, '0')}° ${String(min).padStart(2, '0')}' ${String(sec).padStart(2, '0')}"`;
}

function formatRasiDMS(totalSeconds) {
  const degInRasiSec = totalSeconds % (30 * 3600);
  return formatDMS(degInRasiSec);
}

export function generateKPHorary249List() {
  const list = [];
  let currentSecond = 0;
  let horaryNumber = 1;

  for (let nakIdx = 0; nakIdx < 27; nakIdx++) {
    const nak = MULTILINGUAL_NAKSHATRAS[nakIdx];
    const nakLord = nak.lord;
    const startPlanetIdx = PLANET_ORDER.indexOf(nakLord);

    for (let subIdx = 0; subIdx < 9; subIdx++) {
      const currentPlanet = PLANET_ORDER[(startPlanetIdx + subIdx) % 9];
      const years = VIMSHOTTARI_YEARS[currentPlanet];
      
      // Total span in seconds for this sub: (years / 120) * 800 minutes * 60 seconds
      // = years * 400 seconds
      const subSpanSeconds = years * 400;
      const subEndSecond = currentSecond + subSpanSeconds;

      const currentSignId = Math.floor(currentSecond / (30 * 3600));
      const endSignId = Math.floor((subEndSecond - 1) / (30 * 3600));

      if (currentSignId !== endSignId && endSignId < 12) {
        // This sub crosses a sign boundary at endSignId * 30 * 3600
        const boundarySecond = endSignId * 30 * 3600;

        // Part 1: in currentSignId ending at 30° 00' 00"
        const rasi1 = MULTILINGUAL_RASIS[currentSignId];
        list.push({
          number: horaryNumber++,
          rasiId: currentSignId,
          sign: {
            en: rasi1.en, ta: rasi1.ta, hi: rasi1.hi, te: rasi1.te, kn: rasi1.kn, ml: rasi1.ml
          },
          signLord: MULTILINGUAL_PLANETS[rasi1.lord],
          nakshatraId: nak.id,
          star: {
            en: nak.en, ta: nak.ta, hi: nak.hi, te: nak.te, kn: nak.kn, ml: nak.ml
          },
          starLord: MULTILINGUAL_PLANETS[nak.lord],
          subLord: MULTILINGUAL_PLANETS[currentPlanet],
          subLordName: currentPlanet,
          startDegree: currentSecond / 3600,
          endDegree: boundarySecond / 3600,
          startDMS: formatDMS(currentSecond),
          endDMS: formatDMS(boundarySecond),
          rasiStartDMS: formatRasiDMS(currentSecond),
          rasiEndDMS: '30° 00\' 00"',
          spanFormatted: formatDMS(boundarySecond - currentSecond)
        });

        // Part 2: in endSignId starting at 00° 00' 00"
        const rasi2 = MULTILINGUAL_RASIS[endSignId];
        list.push({
          number: horaryNumber++,
          rasiId: endSignId,
          sign: {
            en: rasi2.en, ta: rasi2.ta, hi: rasi2.hi, te: rasi2.te, kn: rasi2.kn, ml: rasi2.ml
          },
          signLord: MULTILINGUAL_PLANETS[rasi2.lord],
          nakshatraId: nak.id,
          star: {
            en: nak.en, ta: nak.ta, hi: nak.hi, te: nak.te, kn: nak.kn, ml: nak.ml
          },
          starLord: MULTILINGUAL_PLANETS[nak.lord],
          subLord: MULTILINGUAL_PLANETS[currentPlanet],
          subLordName: currentPlanet,
          startDegree: boundarySecond / 3600,
          endDegree: subEndSecond / 3600,
          startDMS: formatDMS(boundarySecond),
          endDMS: formatDMS(subEndSecond),
          rasiStartDMS: '00° 00\' 00"',
          rasiEndDMS: formatRasiDMS(subEndSecond),
          spanFormatted: formatDMS(subEndSecond - boundarySecond)
        });
      } else {
        // Normal sub without sign boundary split
        const rasi = MULTILINGUAL_RASIS[currentSignId];
        list.push({
          number: horaryNumber++,
          rasiId: currentSignId,
          sign: {
            en: rasi.en, ta: rasi.ta, hi: rasi.hi, te: rasi.te, kn: rasi.kn, ml: rasi.ml
          },
          signLord: MULTILINGUAL_PLANETS[rasi.lord],
          nakshatraId: nak.id,
          star: {
            en: nak.en, ta: nak.ta, hi: nak.hi, te: nak.te, kn: nak.kn, ml: nak.ml
          },
          starLord: MULTILINGUAL_PLANETS[nak.lord],
          subLord: MULTILINGUAL_PLANETS[currentPlanet],
          subLordName: currentPlanet,
          startDegree: currentSecond / 3600,
          endDegree: subEndSecond / 3600,
          startDMS: formatDMS(currentSecond),
          endDMS: formatDMS(subEndSecond),
          rasiStartDMS: formatRasiDMS(currentSecond),
          rasiEndDMS: formatRasiDMS(subEndSecond),
          spanFormatted: formatDMS(subSpanSeconds)
        });
      }

      currentSecond = subEndSecond;
    }
  }

  return list;
}

export const KP_HORARY_DATA = generateKPHorary249List();

export default KP_HORARY_DATA;
