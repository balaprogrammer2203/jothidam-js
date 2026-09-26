import apiClient from './apiClient';
import { API_ENDPOINTS } from '../config/api.config';
import { RASIS_6LANG, NAKSHATRAS_6LANG, PLANETS_6LANG } from '../utils/astrologyLocalization';
import { PLANET_RASI_DIGNITIES_DATA, TATKALIKA_RULES_DATA } from '../features/zodiac-planets/data/planetDignityData';

// Robust local fallback datasets in case backend server is unreachable
export const FALLBACK_RASIS = [
  { rasiId: 0, name: 'Aries', nameTa: 'மேஷம்', athipathi: { name: 'Mars', nameTa: 'செவ்வாய்' }, element: { nameEn: 'Fire', nameTa: 'நெருப்பு' }, mobility: { nameEn: 'Movable', nameTa: 'சரம்' }, gender: { nameEn: 'Male', nameTa: 'ஆண்' }, direction: { nameEn: 'East', nameTa: 'கிழக்கு' }, bodyPart: { nameEn: 'Head', nameTa: 'தலை' } },
  { rasiId: 1, name: 'Taurus', nameTa: 'ரிஷபம்', athipathi: { name: 'Venus', nameTa: 'சுக்கிரன்' }, element: { nameEn: 'Earth', nameTa: 'நிலம்' }, mobility: { nameEn: 'Fixed', nameTa: 'ஸ்திரம்' }, gender: { nameEn: 'Female', nameTa: 'பெண்' }, direction: { nameEn: 'South', nameTa: 'தெற்கு' }, bodyPart: { nameEn: 'Face, Neck', nameTa: 'முகம், கழுத்து' } },
  { rasiId: 2, name: 'Gemini', nameTa: 'மிதுனம்', athipathi: { name: 'Mercury', nameTa: 'புதன்' }, element: { nameEn: 'Air', nameTa: 'காற்று' }, mobility: { nameEn: 'Dual', nameTa: 'உபயம்' }, gender: { nameEn: 'Male', nameTa: 'ஆண்' }, direction: { nameEn: 'West', nameTa: 'மேற்கு' }, bodyPart: { nameEn: 'Shoulders, Arms', nameTa: 'தோள்கள், கைகள்' } },
  { rasiId: 3, name: 'Cancer', nameTa: 'கடகம்', athipathi: { name: 'Moon', nameTa: 'சந்திரன்' }, element: { nameEn: 'Water', nameTa: 'நீர்' }, mobility: { nameEn: 'Movable', nameTa: 'சரம்' }, gender: { nameEn: 'Female', nameTa: 'பெண்' }, direction: { nameEn: 'North', nameTa: 'வடக்கு' }, bodyPart: { nameEn: 'Chest, Heart', nameTa: 'மார்பு, இதயம்' } },
  { rasiId: 4, name: 'Leo', nameTa: 'சிம்மம்', athipathi: { name: 'Sun', nameTa: 'சூரியன்' }, element: { nameEn: 'Fire', nameTa: 'நெருப்பு' }, mobility: { nameEn: 'Fixed', nameTa: 'ஸ்திரம்' }, gender: { nameEn: 'Male', nameTa: 'ஆண்' }, direction: { nameEn: 'East', nameTa: 'கிழக்கு' }, bodyPart: { nameEn: 'Upper Abdomen', nameTa: 'மேல் வயிறு' } },
  { rasiId: 5, name: 'Virgo', nameTa: 'கன்னி', athipathi: { name: 'Mercury', nameTa: 'புதன்' }, element: { nameEn: 'Earth', nameTa: 'நிலம்' }, mobility: { nameEn: 'Dual', nameTa: 'உபயம்' }, gender: { nameEn: 'Female', nameTa: 'பெண்' }, direction: { nameEn: 'South', nameTa: 'தெற்கு' }, bodyPart: { nameEn: 'Digestive System', nameTa: 'செரிமான உறுப்புகள்' } },
  { rasiId: 6, name: 'Libra', nameTa: 'துலாம்', athipathi: { name: 'Venus', nameTa: 'சுக்கிரன்' }, element: { nameEn: 'Air', nameTa: 'காற்று' }, mobility: { nameEn: 'Movable', nameTa: 'சரம்' }, gender: { nameEn: 'Male', nameTa: 'ஆண்' }, direction: { nameEn: 'West', nameTa: 'மேற்கு' }, bodyPart: { nameEn: 'Lower Abdomen, Kidneys', nameTa: 'கீழ் வயிறு, சிறுநீரகம்' } },
  { rasiId: 7, name: 'Scorpio', nameTa: 'விருச்சிகம்', athipathi: { name: 'Mars', nameTa: 'செவ்வாய்' }, element: { nameEn: 'Water', nameTa: 'நீர்' }, mobility: { nameEn: 'Fixed', nameTa: 'ஸ்திரம்' }, gender: { nameEn: 'Female', nameTa: 'பெண்' }, direction: { nameEn: 'North', nameTa: 'வடக்கு' }, bodyPart: { nameEn: 'Reproductive Organs', nameTa: 'இனப்பெருக்க உறுப்புகள்' } },
  { rasiId: 8, name: 'Sagittarius', nameTa: 'தனுசு', athipathi: { name: 'Jupiter', nameTa: 'குரு' }, element: { nameEn: 'Fire', nameTa: 'நெருப்பு' }, mobility: { nameEn: 'Dual', nameTa: 'உபயம்' }, gender: { nameEn: 'Male', nameTa: 'ஆண்' }, direction: { nameEn: 'East', nameTa: 'கிழக்கு' }, bodyPart: { nameEn: 'Thighs, Hips', nameTa: 'தொடைகள், இடுப்பு' } },
  { rasiId: 9, name: 'Capricorn', nameTa: 'மகரம்', athipathi: { name: 'Saturn', nameTa: 'சனி' }, element: { nameEn: 'Earth', nameTa: 'நிலம்' }, mobility: { nameEn: 'Movable', nameTa: 'சரம்' }, gender: { nameEn: 'Female', nameTa: 'பெண்' }, direction: { nameEn: 'South', nameTa: 'தெற்கு' }, bodyPart: { nameEn: 'Knees, Joints', nameTa: 'முழங்கால்கள், மூட்டுகள்' } },
  { rasiId: 10, name: 'Aquarius', nameTa: 'கும்பம்', athipathi: { name: 'Saturn', nameTa: 'சனி' }, element: { nameEn: 'Air', nameTa: 'காற்று' }, mobility: { nameEn: 'Fixed', nameTa: 'ஸ்திரம்' }, gender: { nameEn: 'Male', nameTa: 'ஆண்' }, direction: { nameEn: 'West', nameTa: 'மேற்கு' }, bodyPart: { nameEn: 'Calves, Ankles', nameTa: 'கணுக்கால், கால்கள்' } },
  { rasiId: 11, name: 'Pisces', nameTa: 'மீனம்', athipathi: { name: 'Jupiter', nameTa: 'குரு' }, element: { nameEn: 'Water', nameTa: 'நீர்' }, mobility: { nameEn: 'Dual', nameTa: 'உபயம்' }, gender: { nameEn: 'Female', nameTa: 'பெண்' }, direction: { nameEn: 'North', nameTa: 'வடக்கு' }, bodyPart: { nameEn: 'Feet, Toes', nameTa: 'பாதங்கள், விரல்கள்' } }
];

export const FALLBACK_PLANETS = [
  { planetId: 0, name: 'Sun', nameTa: 'சூரியன்', shortName: 'Sun', shortNameTa: 'சூ', nature: 'Malefic (Natural)', natureTa: 'பாவ கிரகம் (இயற்கை)', ownSign: 'Leo', ownSignTa: 'சிம்மம்', exaltationSign: 'Aries', exaltationSignTa: 'மேஷம்', exaltationDegree: 10, debilitationSign: 'Libra', debilitationSignTa: 'துலாம்', debilitationDegree: 10, gemstone: 'Ruby (மாணிக்கம்)', gemstoneTa: 'மாணிக்கம்', metal: 'Copper (செம்பு)', metalTa: 'செம்பு', day: 'Sunday', dayTa: 'ஞாயிறு', grain: 'Wheat (கோதுமை)', grainTa: 'கோதுமை', friends: 'Moon, Mars, Jupiter', friendsTa: 'சந்திரன், செவ்வாய், குரு', enemies: 'Venus, Saturn, Rahu, Ketu', enemiesTa: 'சுக்கிரன், சனி, ராகு, கேது' },
  { planetId: 1, name: 'Moon', nameTa: 'சந்திரன்', shortName: 'Mon', shortNameTa: 'சந்', nature: 'Benefic (Natural)', natureTa: 'சுப கிரகம் (இயற்கை)', ownSign: 'Cancer', ownSignTa: 'கடகம்', exaltationSign: 'Taurus', exaltationSignTa: 'ரிஷபம்', exaltationDegree: 3, debilitationSign: 'Scorpio', debilitationSignTa: 'விருச்சிகம்', debilitationDegree: 3, gemstone: 'Pearl (முத்து)', gemstoneTa: 'முத்து', metal: 'Silver (வெள்ளி)', metalTa: 'வெள்ளி', day: 'Monday', dayTa: 'திங்கள்', grain: 'Paddy (நெல்)', grainTa: 'நெல்', friends: 'Sun, Mercury', friendsTa: 'சூரியன், புதன்', enemies: 'Rahu, Ketu', enemiesTa: 'ராகு, கேது' },
  { planetId: 2, name: 'Mercury', nameTa: 'புதன்', shortName: 'Mer', shortNameTa: 'பு', nature: 'Benefic (Adaptable)', natureTa: 'சுப கிரகம் (சேர்க்கைக்கேற்ப)', ownSign: 'Gemini, Virgo', ownSignTa: 'மிதுனம், கன்னி', exaltationSign: 'Virgo', exaltationSignTa: 'கன்னி', exaltationDegree: 15, debilitationSign: 'Pisces', debilitationSignTa: 'மீனம்', debilitationDegree: 15, gemstone: 'Emerald (மரகதம்)', gemstoneTa: 'மரகதம்', metal: 'Brass (பித்தளை)', metalTa: 'பித்தளை', day: 'Wednesday', dayTa: 'புதன்', grain: 'Moong Dal (பச்சைப்பயறு)', grainTa: 'பச்சைப்பயறு', friends: 'Sun, Venus', friendsTa: 'சூரியன், சுக்கிரன்', enemies: 'Moon', enemiesTa: 'சந்திரன்' },
  { planetId: 3, name: 'Venus', nameTa: 'சுக்கிரன்', shortName: 'Ven', shortNameTa: 'சுக்', nature: 'Benefic (Natural)', natureTa: 'சுப கிரகம் (இயற்கை)', ownSign: 'Taurus, Libra', ownSignTa: 'ரிஷபம், துலாம்', exaltationSign: 'Pisces', exaltationSignTa: 'மீனம்', exaltationDegree: 27, debilitationSign: 'Virgo', debilitationSignTa: 'கன்னி', debilitationDegree: 27, gemstone: 'Diamond (வைரம்)', gemstoneTa: 'வைரம்', metal: 'Silver/Platinum (வெள்ளி)', metalTa: 'வெள்ளி', day: 'Friday', dayTa: 'வெள்ளி', grain: 'White Chana (மொச்சை)', grainTa: 'மொச்சை', friends: 'Mercury, Saturn, Rahu', friendsTa: 'புதன், சனி, ராகு', enemies: 'Sun, Moon', enemiesTa: 'சூரியன், சந்திரன்' },
  { planetId: 4, name: 'Mars', nameTa: 'செவ்வாய்', shortName: 'Mar', shortNameTa: 'செவ்', nature: 'Malefic (Natural)', natureTa: 'பாவ கிரகம் (இயற்கை)', ownSign: 'Aries, Scorpio', ownSignTa: 'மேஷம், விருச்சிகம்', exaltationSign: 'Capricorn', exaltationSignTa: 'மகரம்', exaltationDegree: 28, debilitationSign: 'Cancer', debilitationSignTa: 'கடகம்', debilitationDegree: 28, gemstone: 'Red Coral (பவளம்)', gemstoneTa: 'பவளம்', metal: 'Copper (செம்பு)', metalTa: 'செம்பு', day: 'Tuesday', dayTa: 'செவ்வாய்', grain: 'Toor Dal (துவரை)', grainTa: 'துவரை', friends: 'Sun, Moon, Jupiter', friendsTa: 'சூரியன், சந்திரன், குரு', enemies: 'Mercury, Rahu', enemiesTa: 'புதன், ராகு' },
  { planetId: 5, name: 'Jupiter', nameTa: 'குரு', shortName: 'Jup', shortNameTa: 'குரு', nature: 'Benefic (Supreme)', natureTa: 'சுப கிரகம் (முழு சுபர்)', ownSign: 'Sagittarius, Pisces', ownSignTa: 'தனுசு, மீனம்', exaltationSign: 'Cancer', exaltationSignTa: 'கடகம்', exaltationDegree: 5, debilitationSign: 'Capricorn', debilitationSignTa: 'மகரம்', debilitationDegree: 5, gemstone: 'Yellow Sapphire (புஷ்பராகம்)', gemstoneTa: 'புஷ்பராகம்', metal: 'Gold (தங்கம்)', metalTa: 'தங்கம்', day: 'Thursday', dayTa: 'வியாழன்', grain: 'Chana (கொண்டைக்கடலை)', grainTa: 'கொண்டைக்கடலை', friends: 'Sun, Moon, Mars', friendsTa: 'சூரியன், சந்திரன், செவ்வாய்', enemies: 'Mercury, Venus', enemiesTa: 'புதன், சுக்கிரன்' },
  { planetId: 6, name: 'Saturn', nameTa: 'சனி', shortName: 'Sat', shortNameTa: 'சனி', nature: 'Malefic (Natural)', natureTa: 'பாவ கிரகம் (இயற்கை)', ownSign: 'Capricorn, Aquarius', ownSignTa: 'மகரம், கும்பம்', exaltationSign: 'Libra', exaltationSignTa: 'துலாம்', exaltationDegree: 20, debilitationSign: 'Aries', debilitationSignTa: 'மேஷம்', debilitationDegree: 20, gemstone: 'Blue Sapphire (நீலம்)', gemstoneTa: 'நீலம்', metal: 'Iron (இரும்பு)', metalTa: 'இரும்பு', day: 'Saturday', dayTa: 'சனி', grain: 'Sesame (எள்)', grainTa: 'எள்', friends: 'Mercury, Venus, Rahu', friendsTa: 'புதன், சுக்கிரன், ராகு', enemies: 'Sun, Moon, Mars', enemiesTa: 'சூரியன், சந்திரன், செவ்வாய்' },
  { planetId: 7, name: 'Rahu', nameTa: 'ராகு', shortName: 'Rah', shortNameTa: 'ரா', nature: 'Shadow Planet (Chaya Graha)', natureTa: 'சாயா கிரகம் (நிழல் கிரகம்)', ownSign: 'Aquarius (Co-ruler)', ownSignTa: 'கும்பம்', exaltationSign: 'Taurus/Gemini', exaltationSignTa: 'ரிஷபம்/மிதுனம்', exaltationDegree: 20, debilitationSign: 'Scorpio/Sagittarius', debilitationSignTa: 'விருச்சிகம்/தனுசு', debilitationDegree: 20, gemstone: 'Hessonite (கோமேதகம்)', gemstoneTa: 'கோமேதகம்', metal: 'Lead (ஈயம்)', metalTa: 'ஈயம்', day: 'Saturday (Rahu Kalam)', dayTa: 'சனி', grain: 'Black Urad (உளுந்து)', grainTa: 'உளுந்து', friends: 'Venus, Saturn, Mercury', friendsTa: 'சுக்கிரன், சனி, புதன்', enemies: 'Sun, Moon, Mars', enemiesTa: 'சூரியன், சந்திரன், செவ்வாய்' },
  { planetId: 8, name: 'Ketu', nameTa: 'கேது', shortName: 'Ket', shortNameTa: 'கே', nature: 'Moksha Karaka (Shadow)', natureTa: 'மோக்ஷ காரகன் (சாயா கிரகம்)', ownSign: 'Scorpio (Co-ruler)', ownSignTa: 'விருச்சிகம்', exaltationSign: 'Scorpio/Sagittarius', exaltationSignTa: 'விருச்சிகம்/தனுசு', exaltationDegree: 20, debilitationSign: 'Taurus/Gemini', debilitationSignTa: 'ரிஷபம்/மிதுனம்', debilitationDegree: 20, gemstone: "Cat's Eye (வைடூரியம்)", gemstoneTa: 'வைடூரியம்', metal: 'Lead/Pewter (ஈயம்)', metalTa: 'ஈயம்', day: 'Tuesday (Ketu)', dayTa: 'செவ்வாய்', grain: 'Horse Gram (கொள்ளு)', grainTa: 'கொள்ளு', friends: 'Mars, Venus, Saturn', friendsTa: 'செவ்வாய், சுக்கிரன், சனி', enemies: 'Sun, Moon', enemiesTa: 'சூரியன், சந்திரன்' }
];

export const masterDataService = {
  async getRasis() {
    try {
      const res = await apiClient.get(API_ENDPOINTS.MASTER_RASIS);
      if (res.data?.data && res.data.data.length > 0) return res.data.data;
    } catch {
      // ignore
    }
    return FALLBACK_RASIS;
  },

  async getNakshatras() {
    try {
      const res = await apiClient.get(API_ENDPOINTS.MASTER_NAKSHATRAS);
      if (res.data?.data && res.data.data.length > 0) return res.data.data;
    } catch {
      // ignore
    }
    // Fallback list of 27 nakshatras
    const nakNames = [
      ['Ashwini', 'அசுவினி', 'Ketu', 'கேது', 'Deva', 'Horse', 'குதிரை', 'Etti', 'எட்டி'],
      ['Bharani', 'பரணி', 'Venus', 'சுக்கிரன்', 'Manushya', 'Elephant', 'யானை', 'Nelli', 'நெல்லி'],
      ['Krittika', 'கார்த்திகை', 'Sun', 'சூரியன்', 'Rakshasa', 'Goat', 'ஆடு', 'Athi', 'அத்தி'],
      ['Rohini', 'ரோகிணி', 'Moon', 'சந்திரன்', 'Manushya', 'Serpent', 'பாம்பு', 'Naval', 'நாவல்'],
      ['Mrigashira', 'மிருகசீரிஷம்', 'Mars', 'செவ்வாய்', 'Deva', 'Serpent', 'பாம்பு', 'Karungali', 'கருங்காலி'],
      ['Ardra', 'திருவாதிரை', 'Rahu', 'ராகு', 'Manushya', 'Dog', 'நாய்', 'Semmaram', 'செம்மரம்'],
      ['Punarvasu', 'புனர்பூசம்', 'Jupiter', 'குரு', 'Deva', 'Cat', 'பூனை', 'Mullilavu', 'மூங்கில்'],
      ['Pushya', 'பூசம்', 'Saturn', 'சனி', 'Deva', 'Goat', 'ஆடு', 'Arasu', 'அரசு'],
      ['Ashlesha', 'ஆயில்யம்', 'Mercury', 'புதன்', 'Rakshasa', 'Cat', 'பூனை', 'Punnai', 'புன்னை'],
      ['Magha', 'மகம்', 'Ketu', 'கேது', 'Rakshasa', 'Rat', 'எலி', 'Aal', 'ஆல்'],
      ['Purva Phalguni', 'பூரம்', 'Venus', 'சுக்கிரன்', 'Manushya', 'Rat', 'எலி', 'Palasu', 'பலாசு'],
      ['Uttara Phalguni', 'உத்திரம்', 'Sun', 'சூரியன்', 'Manushya', 'Cow', 'பசு', 'Arali', 'அலரி'],
      ['Hasta', 'அஸ்தம்', 'Moon', 'சந்திரன்', 'Deva', 'Buffalo', 'எருமை', 'Athi', 'அத்தி'],
      ['Chitra', 'சித்திரை', 'Mars', 'செவ்வாய்', 'Rakshasa', 'Tiger', 'புலி', 'Vilvam', 'வில்வம்'],
      ['Svati', 'சுவாதி', 'Rahu', 'ராகு', 'Deva', 'Buffalo', 'எருமை', 'Marudham', 'மருதம்'],
      ['Vishakha', 'விசாகம்', 'Jupiter', 'குரு', 'Rakshasa', 'Tiger', 'புலி', 'Vilamaram', 'விளா'],
      ['Anuradha', 'அனுஷம்', 'Saturn', 'சனி', 'Deva', 'Deer', 'மான்', 'Magizham', 'மகிழம்'],
      ['Jyeshtha', 'கேட்டை', 'Mercury', 'புதன்', 'Rakshasa', 'Deer', 'மான்', 'Parai', 'பராய்'],
      ['Mula', 'மூலம்', 'Ketu', 'கேது', 'Rakshasa', 'Dog', 'நாய்', 'Maramaram', 'மராமரம்'],
      ['Purva Ashadha', 'பூராடம்', 'Venus', 'சுக்கிரன்', 'Manushya', 'Monkey', 'குரங்கு', 'Vanji', 'வஞ்சி'],
      ['Uttara Ashadha', 'உத்திராடம்', 'Sun', 'சூரியன்', 'Manushya', 'Mongoose', 'கீரி', 'Pala', 'பலா'],
      ['Shravana', 'திருவோணம்', 'Moon', 'சந்திரன்', 'Deva', 'Monkey', 'குரங்கு', 'Erukku', 'எருக்கு'],
      ['Dhanishta', 'அவிட்டம்', 'Mars', 'செவ்வாய்', 'Rakshasa', 'Lion', 'சிங்கம்', 'Vanni', 'வன்னி'],
      ['Shatabhisha', 'சதயம்', 'Rahu', 'ராகு', 'Rakshasa', 'Horse', 'குதிரை', 'Kadambu', 'கடம்பு'],
      ['Purva Bhadrapada', 'பூரட்டாதி', 'Jupiter', 'குரு', 'Manushya', 'Lion', 'சிங்கம்', 'Thembi', 'தேமா'],
      ['Uttara Bhadrapada', 'உத்திரட்டாதி', 'Saturn', 'சனி', 'Manushya', 'Cow', 'பசு', 'Neem', 'வேம்பு'],
      ['Revati', 'ரேவதி', 'Mercury', 'புதன்', 'Deva', 'Elephant', 'யானை', 'Iluppai', 'இலுப்பை']
    ];
    return nakNames.map((n, i) => ({
      nakshatraId: i + 1,
      name: n[0],
      nameTa: n[1],
      athipathi: { name: n[2], nameTa: n[3] },
      gana: n[4],
      animal: n[5],
      animalTa: n[6],
      tree: n[7],
      treeTa: n[8]
    }));
  },

  async getPlanets() {
    try {
      const res = await apiClient.get(API_ENDPOINTS.MASTER_PLANETS);
      if (res.data?.data && res.data.data.length > 0) return res.data.data;
    } catch {
      // ignore
    }
    return FALLBACK_PLANETS;
  },

  async getTithis() {
    try {
      const res = await apiClient.get(API_ENDPOINTS.MASTER_TITHIS);
      if (res.data?.data && res.data.data.length > 0) return res.data.data;
    } catch {
      // ignore
    }
    const tithiNames = [
      ['Prathama', 'பிரதமை', 'Agni', 'அக்னி', 'Sun', 'சூரியன்'],
      ['Dvitiya', 'துவிதியை', 'Brahma', 'பிரம்மா', 'Moon', 'சந்திரன்'],
      ['Tritiya', 'திருதியை', 'Gauri', 'கௌரி', 'Mars', 'செவ்வாய்'],
      ['Chaturthi', 'சதுர்த்தி', 'Ganesha', 'விநாயகர்', 'Mercury', 'புதன்'],
      ['Panchami', 'பஞ்சமி', 'Naga', 'நாகர்', 'Jupiter', 'குரு'],
      ['Shashthi', 'சஷ்டி', 'Kartikeya', 'முருகன்', 'Venus', 'சுக்கிரன்'],
      ['Saptami', 'சப்தமி', 'Surya', 'சூரியன்', 'Saturn', 'சனி'],
      ['Ashtami', 'அஷ்டமி', 'Shiva/Rudra', 'ருத்திரன்', 'Rahu', 'ராகு'],
      ['Navami', 'நவமி', 'Durga', 'துர்க்கை', 'Sun', 'சூரியன்'],
      ['Dashami', 'தசமி', 'Yama/Dharma', 'எமன்', 'Moon', 'சந்திரன்'],
      ['Ekadashi', 'ஏகாதசி', 'Vishnu', 'விஷ்ணு', 'Mars', 'செவ்வாய்'],
      ['Dvadashi', 'துவாதசி', 'Vishnu', 'விஷ்ணு', 'Mercury', 'புதன்'],
      ['Trayodashi', 'திரயோதசி', 'Kamadeva/Shiva', 'சிவன்', 'Jupiter', 'குரு'],
      ['Chaturdashi', 'சதுர்த்தசி', 'Kali/Shiva', 'காளி', 'Venus', 'சுக்கிரன்'],
      ['Purnima', 'பௌர்ணமி', 'Moon', 'சந்திரன்', 'Saturn', 'சனி'],
      ['Amavasya', 'அமாவாசை', 'Pitrus', 'பித்ருக்கள்', 'Rahu', 'ராகு']
    ];

    const allTithis = [];
    // Shukla (1 to 15)
    tithiNames.slice(0, 15).forEach((t, i) => {
      allTithis.push({
        tithiId: i + 1,
        name: `Shukla ${t[0]}`,
        nameTa: `சுக்ல ${t[1]} (வளர்பிறை)`,
        paksha: 'Shukla',
        pakshaTa: 'சுக்ல பக்ஷம் (வளர்பிறை)',
        deity: t[2],
        deityTa: t[3],
        lord: t[4],
        lordTa: t[5],
        nature: 'Auspicious'
      });
    });
    // Krishna (16 to 30)
    tithiNames.slice(0, 14).forEach((t, i) => {
      allTithis.push({
        tithiId: i + 16,
        name: `Krishna ${t[0]}`,
        nameTa: `கிருஷ்ண ${t[1]} (தேய்பிறை)`,
        paksha: 'Krishna',
        pakshaTa: 'கிருஷ்ண பக்ஷம் (தேய்பிறை)',
        deity: t[2],
        deityTa: t[3],
        lord: t[4],
        lordTa: t[5],
        nature: i >= 10 ? 'Spiritual / Pitru Puja' : 'Regular'
      });
    });
    allTithis.push({
      tithiId: 30,
      name: 'Amavasya',
      nameTa: 'அமாவாசை (தேய்பிறை நிறைவு)',
      paksha: 'Krishna',
      pakshaTa: 'கிருஷ்ண பக்ஷம்',
      deity: 'Pitrus',
      deityTa: 'பித்ருக்கள்',
      lord: 'Rahu',
      lordTa: 'ராகு',
      nature: 'Pitru Tarpanam / Meditation'
    });

    return allTithis;
  },

  async getYogas() {
    try {
      const res = await apiClient.get(API_ENDPOINTS.MASTER_YOGAS);
      if (res.data?.data && res.data.data.length > 0) return res.data.data;
    } catch {
      // ignore
    }
    const yogaList = [
      ['Vishkambha', 'விஷ்கம்பம்', 'Inauspicious', 'அசுபம்', 'Yama', 'எமன்'],
      ['Priti', 'பிரீதி', 'Auspicious', 'சுபம்', 'Vishnu', 'விஷ்ணு'],
      ['Ayushman', 'ஆயுஷ்மான்', 'Auspicious', 'சுபம்', 'Chandra', 'சந்திரன்'],
      ['Saubhagya', 'சௌபாக்யம்', 'Auspicious', 'சுபம்', 'Brahma', 'பிரம்மா'],
      ['Shobhana', 'சோபனம்', 'Auspicious', 'சுபம்', 'Brihaspati', 'குரு'],
      ['Atiganda', 'அதிகண்டம்', 'Inauspicious', 'அசுபம்', 'Chandra', 'சந்திரன்'],
      ['Sukarma', 'சுகர்மம்', 'Auspicious', 'சுபம்', 'Indra', 'இந்திரன்'],
      ['Dhriti', 'திருதி', 'Auspicious', 'சுபம்', 'Jala', 'வருணன்'],
      ['Shula', 'சூலம்', 'Inauspicious', 'அசுபம்', 'Sarpa', 'நாகர்'],
      ['Ganda', 'கண்டம்', 'Inauspicious', 'அசுபம்', 'Agni', 'அக்னி'],
      ['Vriddhi', 'விருத்தி', 'Auspicious', 'சுபம்', 'Surya', 'சூரியன்'],
      ['Dhruva', 'துருவம்', 'Auspicious', 'சுபம்', 'Bhumi', 'பூமாதேவி'],
      ['Vyaghata', 'வியாகாதம்', 'Inauspicious', 'அசுபம்', 'Vayu', 'வாயு'],
      ['Harshana', 'ஹர்ஷணம்', 'Auspicious', 'சுபம்', 'Bhaga', 'பகன்'],
      ['Vajra', 'வஜ்ரம்', 'Inauspicious', 'அசுபம்', 'Varuna', 'வருணன்'],
      ['Siddhi', 'சித்தி', 'Auspicious', 'சுபம்', 'Ganesha', 'விநாயகர்'],
      ['Vyatipata', 'வியதிபாதம்', 'Inauspicious', 'அசுபம்', 'Rudra', 'ருத்திரன்'],
      ['Variyan', 'வரியான்', 'Auspicious', 'சுபம்', 'Kubera', 'குபேரன்'],
      ['Parigha', 'பரிகம்', 'Inauspicious', 'அசுபம்', 'Vishwakarma', 'விஸ்வகர்மா'],
      ['Shiva', 'சிவம்', 'Auspicious', 'சுபம்', 'Shiva', 'சிவன்'],
      ['Siddha', 'சித்தம்', 'Auspicious', 'சுபம்', 'Kartikeya', 'முருகன்'],
      ['Sadhya', 'சாத்தியம்', 'Auspicious', 'சுபம்', 'Savitr', 'சாவித்ரி'],
      ['Shubha', 'சுபம்', 'Auspicious', 'சுபம்', 'Lakshmi', 'லட்சுமி'],
      ['Shukla', 'சுக்லம்', 'Auspicious', 'சுபம்', 'Parvati', 'பார்வதி'],
      ['Brahma', 'பிரம்மம்', 'Auspicious', 'சுபம்', 'Ashvins', 'அஸ்வினி தேவர்கள்'],
      ['Indra', 'இந்திரம்', 'Auspicious', 'சுபம்', 'Pitrus', 'பித்ருக்கள்'],
      ['Vaidhriti', 'வைதிருதி', 'Inauspicious', 'அசுபம்', 'Diti', 'திதி']
    ];
    return yogaList.map((y, i) => ({
      yogaId: i + 1,
      name: y[0],
      nameTa: y[1],
      nature: y[2],
      natureTa: y[3],
      deity: y[4],
      deityTa: y[5]
    }));
  },

  async getKaranas() {
    try {
      const res = await apiClient.get(API_ENDPOINTS.MASTER_KARANAS);
      if (res.data?.data && res.data.data.length > 0) return res.data.data;
    } catch {
      // ignore
    }
    const karanaList = [
      ['Bava', 'பவம்', 'Movable', 'சரம்', 'Sun', 'சூரியன்', 'Indra', 'இந்திரன்', 'Lion', 'சிங்கம்'],
      ['Balava', 'பாலவம்', 'Movable', 'சரம்', 'Moon', 'சந்திரன்', 'Brahma', 'பிரம்மா', 'Leopard', 'சிறுத்தை'],
      ['Kaulava', 'கௌலவம்', 'Movable', 'சரம்', 'Mars', 'செவ்வாய்', 'Mitra', 'மித்ரன்', 'Boar', 'பன்றி'],
      ['Taitila', 'சைதுளை', 'Movable', 'சரம்', 'Mercury', 'புதன்', 'Aryaman', 'அரியமான்', 'Donkey', 'கழுதை'],
      ['Garija', 'கரசை', 'Movable', 'சரம்', 'Jupiter', 'குரு', 'Bhumi', 'பூமாதேவி', 'Elephant', 'யானை'],
      ['Vanija', 'வணிசை', 'Movable', 'சரம்', 'Venus', 'சுக்கிரன்', 'Shri', 'மகாலட்சுமி', 'Bull', 'காளை'],
      ['Vishti (Bhadra)', 'பத்திரை (விஷ்டி)', 'Movable', 'சரம்', 'Saturn', 'சனி', 'Yama', 'எமன்', 'Dog', 'நாய்'],
      ['Shakuni', 'சகுனி', 'Fixed', 'ஸ்திரம்', 'Rahu', 'ராகு', 'Kali', 'காளி', 'Bird', 'பறவை'],
      ['Chatushpada', 'சதுஷ்பாதம்', 'Fixed', 'ஸ்திரம்', 'Ketu', 'கேது', 'Rudra', 'ருத்திரன்', 'Four-legged animal', 'நால்Security'],
      ['Naga', 'நாகவம்', 'Fixed', 'ஸ்திரம்', 'Rahu', 'ராகு', 'Naga', 'நாகர்', 'Serpent', 'பாம்பு'],
      ['Kintughna', 'கிமிஸ்துக்கினம்', 'Fixed', 'ஸ்திரம்', 'Ketu', 'கேது', 'Vayu', 'வாயு', 'Worm', 'புழு']
    ];
    return karanaList.map((k, i) => ({
      karanaId: i + 1,
      name: k[0],
      nameTa: k[1],
      type: k[2],
      typeTa: k[3],
      ruler: k[4],
      rulerTa: k[5],
      deity: k[6],
      deityTa: k[7],
      symbol: k[8],
      symbolTa: k[9]
    }));
  },

  async getKalachakram() {
    try {
      const res = await apiClient.get(API_ENDPOINTS.MASTER_KALACHAKRAM);
      if (res.data?.data && res.data.data.length > 0) return res.data.data;
    } catch {
      // ignore
    }

    const rasiLords = [4, 3, 2, 1, 0, 2, 3, 4, 5, 6, 6, 5];
    const nakLords = [8, 3, 0, 1, 4, 7, 5, 6, 2]; // Vimshottari cycle of 9 planets for 27 nakshatras

    return Array.from({ length: 360 }, (_, deg) => {
      const rasiId = Math.floor(deg / 30);
      const degreeInRasi = deg % 30;
      const nakshatraId = Math.floor(deg / (360 / 27));
      const totalPadaIndex = Math.floor(deg / (360 / 108));
      const pada = (totalPadaIndex % 4) + 1;
      const navamsaRasiId = totalPadaIndex % 12;

      const rasiObj = RASIS_6LANG[rasiId] || {};
      const nakObj = NAKSHATRAS_6LANG[nakshatraId] || {};
      const navamsaObj = RASIS_6LANG[navamsaRasiId] || {};

      const rasiLordId = rasiLords[rasiId];
      const starLordId = nakLords[nakshatraId % 9];
      const navamsaLordId = rasiLords[navamsaRasiId];

      const rasiLordObj = PLANETS_6LANG[rasiLordId] || {};
      const starLordObj = PLANETS_6LANG[starLordId] || {};
      const navamsaLordObj = PLANETS_6LANG[navamsaLordId] || {};

      return {
        degree: deg,
        degreeDisplay: `${deg}° - ${deg + 1}°`,
        startDegree: deg,
        endDegree: deg + 1,
        rasiId,
        rasiName: rasiObj.en || 'Aries',
        rasiNameTa: rasiObj.ta || 'மேஷம்',
        rasiNameHi: rasiObj.hi || 'मेष',
        rasiNameTe: rasiObj.te || 'మేషం',
        rasiNameKn: rasiObj.kn || 'ಮೇಷ',
        rasiNameMl: rasiObj.ml || 'മേടം',
        degreeInRasi,
        rasiAthipathi: {
          planetId: rasiLordId,
          name: rasiLordObj.en || '',
          nameTa: rasiLordObj.ta || '',
          nameHi: rasiLordObj.hi || '',
          nameTe: rasiLordObj.te || '',
          nameKn: rasiLordObj.kn || '',
          nameMl: rasiLordObj.ml || ''
        },
        nakshatraId,
        nakshatraName: nakObj.en || '',
        nakshatraNameTa: nakObj.ta || '',
        nakshatraNameHi: nakObj.hi || '',
        nakshatraNameTe: nakObj.te || '',
        nakshatraNameKn: nakObj.kn || '',
        nakshatraNameMl: nakObj.ml || '',
        nakshatraAthipathi: {
          planetId: starLordId,
          name: starLordObj.en || '',
          nameTa: starLordObj.ta || '',
          nameHi: starLordObj.hi || '',
          nameTe: starLordObj.te || '',
          nameKn: starLordObj.kn || '',
          nameMl: starLordObj.ml || ''
        },
        pada,
        totalPadaIndex,
        navamsaRasiId,
        navamsaRasiName: navamsaObj.en || '',
        navamsaRasiNameTa: navamsaObj.ta || '',
        navamsaRasiNameHi: navamsaObj.hi || '',
        navamsaRasiNameTe: navamsaObj.te || '',
        navamsaRasiNameKn: navamsaObj.kn || '',
        navamsaRasiNameMl: navamsaObj.ml || '',
        navamsaAthipathi: {
          planetId: navamsaLordId,
          name: navamsaLordObj.en || '',
          nameTa: navamsaLordObj.ta || '',
          nameHi: navamsaLordObj.hi || '',
          nameTe: navamsaLordObj.te || '',
          nameKn: navamsaLordObj.kn || '',
          nameMl: navamsaLordObj.ml || ''
        }
      };
    });
  },

  async getTamilYears() {
    try {
      const res = await apiClient.get(API_ENDPOINTS.MASTER_TAMIL_YEARS);
      if (res.data?.data && res.data.data.length > 0) return res.data.data;
    } catch {
      // ignore
    }
    const yearNames = [
      ['Prabhava', 'பிரபவ'], ['Vibhava', 'விபவ'], ['Shukla', 'சுக்கில'], ['Pramoduta', 'பிரமோதூத'], ['Prajotpatti', 'பிரசோற்பத்தி'],
      ['Angirasa', 'ஆங்கீரச'], ['Srimukha', 'ஸ்ரீமுக'], ['Bhava', 'பவ'], ['Yuva', 'யுவ'], ['Dhatri', 'தாது'],
      ['Ishvara', 'ஈஸ்வர'], ['Bahudhanya', 'வெகுதானிய'], ['Pramathi', 'பிரமாதி'], ['Vikrama', 'விக்ரம'], ['Vrisha', 'விஷு'],
      ['Chitrabhanu', 'சித்திரபானு'], ['Subhanu', 'சுபானு'], ['Tarana', 'தாரண'], ['Parthiva', 'பார்த்திப'], ['Vyaya', 'விய'],
      ['Sarvajit', 'சர்வசித்து'], ['Sarvadhari', 'சர்வதாரி'], ['Virodhi', 'विरोதி'], ['Vikrita', 'விக்ருதி'], ['Khara', 'கர'],
      ['Nandana', 'நந்தன'], ['Vijaya', 'விஜய'], ['Jaya', 'ஜய'], ['Manmatha', 'மன்மத'], ['Durmukhi', 'துர்முகி'],
      ['Hevilambi', 'ஹேவிளம்பி'], ['Vilambi', 'விளம்பி'], ['Vikari', 'விகாரி'], ['Sharvari', 'சார்வரி'], ['Plava', 'பிலவ'],
      ['Shubhakrit', 'சுபகிருது'], ['Shobhakrit', 'சோபகிருது'], ['Krodhi', 'குரோதி'], ['Vishvavasu', 'விசுவாவசு'], ['Parabhava', 'பராபவ'],
      ['Plavanga', 'பிலவங்க'], ['Kilaka', 'கீலக'], ['Saumya', 'சௌமிய'], ['Sadharana', 'சாதாரண'], ['Virodhikrit', 'விரோதிகிருது'],
      ['Paridhavi', 'பரிதாபி'], ['Pramadicha', 'பிரமாதீச'], ['Ananda', 'ஆனந்த'], ['Rakshasa', 'ராட்சச'], ['Nala', 'நள'],
      ['Pingala', 'பிங்கள'], ['Kalayukti', 'காளயுக்தி'], ['Siddharthi', 'சித்தார்த்தி'], ['Raudra', 'ரௌத்திரி'], ['Durmati', 'துர்மதி'],
      ['Dundubhi', 'துந்துபி'], ['Rudhirodgari', 'ருத்ரோத்காரி'], ['Raktakshi', 'ரக்தாட்சி'], ['Krodhana', 'குரோதன'], ['Kshaya', 'அட்சய']
    ];
    return yearNames.map((y, i) => ({
      yearId: i + 1,
      name: y[0],
      nameTa: y[1]
    }));
  },

  async getTamilMonths() {
    try {
      const res = await apiClient.get(API_ENDPOINTS.MASTER_TAMIL_MONTHS);
      if (res.data?.data && res.data.data.length > 0) return res.data.data;
    } catch {
      // ignore
    }
    const months = [
      ['Chithirai', 'சித்திரை', 'Aries (மேஷம்)', 'Vasantha (வசந்த காலம்)'],
      ['Vaikasi', 'வைகாசி', 'Taurus (ரிஷபம்)', 'Vasantha (வசந்த காலம்)'],
      ['Aani', 'ஆனி', 'Gemini (மிதுனம்)', 'Greeshma (கோடை காலம்)'],
      ['Aadi', 'ஆடி', 'Cancer (கடகம்)', 'Greeshma (கோடை காலம்)'],
      ['Avani', 'ஆவணி', 'Leo (சிம்மம்)', 'Varsha (மழைக்காலம்)'],
      ['Purattasi', 'புரட்டாசி', 'Virgo (கன்னி)', 'Varsha (மழைக்காலம்)'],
      ['Aippasi', 'ஐப்பசி', 'Libra (துலாம்)', 'Sharad (இலையுதிர் காலம்)'],
      ['Karthigai', 'கார்த்திகை', 'Scorpio (விருச்சிகம்)', 'Sharad (இலையுதிர் காலம்)'],
      ['Margazhi', 'மார்கழி', 'Sagittarius (தனுசு)', 'Hemanta (முன்பனிக் காலம்)'],
      ['Thai', 'தை', 'Capricorn (மகரம்)', 'Hemanta (முன்பனிக் காலம்)'],
      ['Maasi', 'மாசி', 'Aquarius (கும்பம்)', 'Shishira (பின்பனிக் காலம்)'],
      ['Panguni', 'பங்குனி', 'Pisces (மீனம்)', 'Shishira (பின்பனிக் காலம்)']
    ];
    return months.map((m, i) => ({
      monthId: i + 1,
      name: m[0],
      nameTa: m[1],
      rasiName: m[2],
      rasiNameTa: m[2],
      season: m[3],
      seasonTa: m[3]
    }));
  },

  async getKPHorary(params = {}) {
    try {
      const res = await apiClient.get(API_ENDPOINTS.MASTER_KP_HORARY, { params });
      if (res.data?.data && res.data.data.length > 0) return res.data.data;
    } catch {
      // ignore
    }

    // Fallback algorithmic generation for 249 KP Horary Numbers with 6 languages
    const PLANET_YEARS = { Ketu: 7, Venus: 20, Sun: 6, Moon: 10, Mars: 7, Rahu: 18, Jupiter: 16, Saturn: 19, Mercury: 17 };
    const PLANET_ORDER = ['Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury'];
    const PLANETS_6LANG = {
      Ketu: { en: 'Ketu', ta: 'கேது', hi: 'केतु', te: 'కేతువు', kn: 'ಕೇತು', ml: 'കേതു' },
      Venus: { en: 'Venus', ta: 'சுக்கிரன்', hi: 'शुक्र', te: 'శుక్రుడు', kn: 'ಶುಕ್ರ', ml: 'ശുക്രൻ' },
      Sun: { en: 'Sun', ta: 'சூரியன்', hi: 'सूर्य', te: 'సూర్యుడు', kn: 'ಸೂರ್ಯ', ml: 'സൂര്യൻ' },
      Moon: { en: 'Moon', ta: 'சந்திரன்', hi: 'चन्द्र', te: 'చంద్రుడు', kn: 'ಚಂದ್ರ', ml: 'ചന്ദ്രൻ' },
      Mars: { en: 'Mars', ta: 'செவ்வாய்', hi: 'मंगल', te: 'కుజుడు', kn: 'ಮಂಗಳ', ml: 'ചൊവ്വ' },
      Rahu: { en: 'Rahu', ta: 'ராகு', hi: 'राहु', te: 'రాహువు', kn: 'ರಾಹು', ml: 'രാഹു' },
      Jupiter: { en: 'Jupiter', ta: 'குரு', hi: 'गुरु', te: 'గురువు', kn: 'ಗುರು', ml: 'വ്യാഴം' },
      Saturn: { en: 'Saturn', ta: 'சனி', hi: 'शनि', te: 'శని', kn: 'ಶನಿ', ml: 'ശനി' },
      Mercury: { en: 'Mercury', ta: 'புதன்', hi: 'बुध', te: 'బుధుడు', kn: 'ಬುಧ', ml: 'ബുಧൻ' }
    };
    const RASIS_6LANG = [
      { rasiId: 0, lord: 'Mars', en: 'Aries', ta: 'மேஷம்', hi: 'मेष', te: 'మేషం', kn: 'ಮೇಷ', ml: 'മേടം' },
      { rasiId: 1, lord: 'Venus', en: 'Taurus', ta: 'ரிஷபம்', hi: 'वृषभ', te: 'వృషభం', kn: 'ವೃಷಭ', ml: 'இடവം' },
      { rasiId: 2, lord: 'Mercury', en: 'Gemini', ta: 'மிதுனம்', hi: 'मिथुन', te: 'మిథునం', kn: 'ಮಿಥುನ', ml: 'മിഥുനം' },
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
    const NAKS_6LANG = [
      { id: 1, lord: 'Ketu', en: 'Ashwini', ta: 'அசுவினி', hi: 'अश्विनी', te: 'అశ్విని', kn: 'ಅಶ್ವಿನಿ', ml: 'അശ്വതി' },
      { id: 2, lord: 'Venus', en: 'Bharani', ta: 'பரணி', hi: 'भरणी', te: 'భరణి', kn: 'ಭರಣಿ', ml: 'ഭരണി' },
      { id: 3, lord: 'Sun', en: 'Krittika', ta: 'கார்த்திகை', hi: 'कृत्तिका', te: 'కృత్తిక', kn: 'ಕೃತ್ತಿಕಾ', ml: 'കാർത്തിക' },
      { id: 4, lord: 'Moon', en: 'Rohini', ta: 'ரோகிணி', hi: 'रोहिणी', te: 'రోహిణి', kn: 'ರೋಹಿಣಿ', ml: 'രോಹಿണി' },
      { id: 5, lord: 'Mars', en: 'Mrigashira', ta: 'மிருகசீரிஷம்', hi: 'मृगशिरा', te: 'మృగశిర', kn: 'ಮೃಗಶಿರಾ', ml: 'മകയിരം' },
      { id: 6, lord: 'Rahu', en: 'Ardra', ta: 'திருவாதிரை', hi: 'आर्द्रा', te: 'ఆర్ద్ర', kn: 'ಆರ್ದ್ರಾ', ml: 'തിരുവാതിര' },
      { id: 7, lord: 'Jupiter', en: 'Punarvasu', ta: 'புனர்பூசம்', hi: 'पुनर्वसु', te: 'పునర్వసు', kn: 'ಪುನರ್ವಸು', ml: 'പുണർതം' },
      { id: 8, lord: 'Saturn', en: 'Pushya', ta: 'பூசம்', hi: 'पुष्य', te: 'పుష్యమి', kn: 'ಪುಷ್ಯ', ml: 'പൂയം' },
      { id: 9, lord: 'Mercury', en: 'Ashlesha', ta: 'ஆயில்யம்', hi: 'आश्लेषा', te: 'ఆశ్లేష', kn: 'ಆಶ್ಲೇಷಾ', ml: 'ആയില്യം' },
      { id: 10, lord: 'Ketu', en: 'Magha', ta: 'மகம்', hi: 'मघा', te: 'మఖ', kn: 'ಮಖಾ', ml: 'ಮകം' },
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
      { id: 23, lord: 'Mars', en: 'Dhanishta', ta: 'அவிட்டம்', hi: 'धनिष्ठा', te: 'ధనిష్ఠ', kn: 'ಧನಿಷ್ಠಾ', ml: 'அவிட்டம்' },
      { id: 24, lord: 'Rahu', en: 'Shatabhisha', ta: 'சதயம்', hi: 'शतभिषा', te: 'శతభిషం', kn: 'ಶತಭಿಷಾ', ml: 'ചതയം' },
      { id: 25, lord: 'Jupiter', en: 'Purva Bhadrapada', ta: 'பூரட்டாதி', hi: 'पूर्वभाद्रपद', te: 'పూర్వాభాద్ర', kn: 'ಪೂರ್ವಾಭಾದ್ರಪದ', ml: 'പൂരുരുട്ടാതി' },
      { id: 26, lord: 'Saturn', en: 'Uttara Bhadrapada', ta: 'உத்திரட்டாதி', hi: 'उत्तरभाद्रपद', te: 'ఉత్తరాభాద్ర', kn: 'ಉತ್ತರಾಭಾದ್ರಪದ', ml: 'ഉത്രട്ടാതി' },
      { id: 27, lord: 'Mercury', en: 'Revati', ta: 'ரேவதி', hi: 'रेवती', te: 'రేవతి', kn: 'ರೇವತಿ', ml: 'രേവതി' }
    ];

    const fmtDMS = (totSec) => {
      const r = Math.round(totSec);
      const d = Math.floor(r / 3600);
      const rem = r % 3600;
      const m = Math.floor(rem / 60);
      const s = rem % 60;
      return `${String(d).padStart(2, '0')}° ${String(m).padStart(2, '0')}' ${String(s).padStart(2, '0')}"`;
    };

    const list = [];
    let curSec = 0;
    let num = 1;

    for (let nakIdx = 0; nakIdx < 27; nakIdx++) {
      const nak = NAKS_6LANG[nakIdx];
      const startIdx = PLANET_ORDER.indexOf(nak.lord);
      for (let subIdx = 0; subIdx < 9; subIdx++) {
        const curPl = PLANET_ORDER[(startIdx + subIdx) % 9];
        const spanSec = PLANET_YEARS[curPl] * 400;
        const subEndSec = curSec + spanSec;
        const sSign = Math.floor(curSec / (30 * 3600));
        const eSign = Math.floor((subEndSec - 1) / (30 * 3600));

        if (sSign !== eSign && eSign < 12) {
          const bSec = eSign * 30 * 3600;
          const r1 = RASIS_6LANG[sSign];
          list.push({
            number: num++,
            rasiId: sSign,
            sign: r1,
            signLord: PLANETS_6LANG[r1.lord],
            nakshatraId: nak.id,
            star: nak,
            starLord: PLANETS_6LANG[nak.lord],
            subLord: PLANETS_6LANG[curPl],
            subLordName: curPl,
            startDegree: curSec / 3600,
            endDegree: bSec / 3600,
            startDMS: fmtDMS(curSec),
            endDMS: fmtDMS(bSec),
            rasiStartDMS: fmtDMS(curSec % (30 * 3600)),
            rasiEndDMS: '30° 00\' 00"',
            spanFormatted: fmtDMS(bSec - curSec)
          });
          const r2 = RASIS_6LANG[eSign];
          list.push({
            number: num++,
            rasiId: eSign,
            sign: r2,
            signLord: PLANETS_6LANG[r2.lord],
            nakshatraId: nak.id,
            star: nak,
            starLord: PLANETS_6LANG[nak.lord],
            subLord: PLANETS_6LANG[curPl],
            subLordName: curPl,
            startDegree: bSec / 3600,
            endDegree: subEndSec / 3600,
            startDMS: fmtDMS(bSec),
            endDMS: fmtDMS(subEndSec),
            rasiStartDMS: '00° 00\' 00"',
            rasiEndDMS: fmtDMS(subEndSec % (30 * 3600)),
            spanFormatted: fmtDMS(subEndSec - bSec)
          });
        } else {
          const r = RASIS_6LANG[sSign];
          list.push({
            number: num++,
            rasiId: sSign,
            sign: r,
            signLord: PLANETS_6LANG[r.lord],
            nakshatraId: nak.id,
            star: nak,
            starLord: PLANETS_6LANG[nak.lord],
            subLord: PLANETS_6LANG[curPl],
            subLordName: curPl,
            startDegree: curSec / 3600,
            endDegree: subEndSec / 3600,
            startDMS: fmtDMS(curSec),
            endDMS: fmtDMS(subEndSec),
            rasiStartDMS: fmtDMS(curSec % (30 * 3600)),
            rasiEndDMS: fmtDMS(subEndSec % (30 * 3600)),
            spanFormatted: fmtDMS(spanSec)
          });
        }
        curSec = subEndSec;
      }
    }
    return list;
  },

  async getNakshatraPadas(params = {}) {
    try {
      const res = await apiClient.get(API_ENDPOINTS.MASTER_NAKSHATRA_PADAS, { params });
      if (res.data?.data && res.data.data.length > 0) return res.data.data;
    } catch {
      // ignore
    }
    return [];
  },

  async getNakshatraPadaByNumber(number) {
    try {
      const res = await apiClient.get(API_ENDPOINTS.MASTER_NAKSHATRA_PADA_BY_NUM(number));
      if (res.data?.data) return res.data.data;
    } catch {
      // ignore
    }
    return null;
  },

  async getKadikaraPrasannamMaster(params = {}) {
    try {
      const res = await apiClient.get(API_ENDPOINTS.MASTER_KADIKARA_PRASANNAM, { params });
      if (res.data?.data) return res.data.data;
    } catch {
      // ignore
    }
    return null;
  },

  async getKadikaraBhavaByNumber(bhava) {
    try {
      const res = await apiClient.get(API_ENDPOINTS.MASTER_KADIKARA_BHAVA_BY_NUM(bhava));
      if (res.data?.data) return res.data.data;
    } catch {
      // ignore
    }
    return null;
  },

  async getPlanetDignities(params = {}) {
    try {
      const res = await apiClient.get(API_ENDPOINTS.MASTER_PLANET_DIGNITIES, { params });
      if (res.data?.data && res.data.data.length > 0) {
        return {
          data: res.data.data,
          rules: res.data.rules || TATKALIKA_RULES_DATA
        };
      }
    } catch {
      // ignore
    }
    return {
      data: PLANET_RASI_DIGNITIES_DATA,
      rules: TATKALIKA_RULES_DATA
    };
  }
};

export default masterDataService;
