import HoroscopeProfile from '../models/HoroscopeProfile.js';
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
import { KP_HORARY_DATA } from '../services/kpHoraryData.js';
import { NAKSHATRA_PADAS_DATA } from '../services/nakshatraPadaData.js';
import { KADIKARA_PRASANNAM_MASTER_DATA } from '../services/kadikaraData.js';
import { calculateVedicChart, AYANAMSA_MODES } from '../services/ephemeris.service.js';
import { getPlaceCoordinates, searchPlaces } from '../services/geo.service.js';
import { calculateBasicHoroscopeDetails } from '../services/panchangam.service.js';
import { 
  RASIS_DATA, 
  NAKSHATRAS_DATA, 
  PLANETS_DATA, 
  KALACHAKRAM_DATA,
  TITHIS_DATA,
  YOGAS_DATA,
  KARANAS_DATA,
  TAMIL_YEARS_DATA,
  TAMIL_MONTHS_DATA,
  getRasiDetails, 
  getNakshatraDetails, 
  getPlanetDetails,
  getDegreeKalachakram
} from '../services/masterData.service.js';

export const handlePlaceAutocomplete = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.json([]);
    const places = await searchPlaces(query);
    res.json(places);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const generateSouthIndianChart = async (req, res) => {
  try {
    const { fullName, gender, dob, tob, placeId, manualCoords, latitude: reqLat, longitude: reqLng, placeName: reqPlaceName, formattedAddress: reqFormattedAddress, ayanamsa, timezone, gmt, dst } = req.body;

    let latitude, longitude, formattedAddress, placeName;

    if (reqLat !== undefined && reqLng !== undefined && reqLat !== '' && reqLng !== '' && !isNaN(Number(reqLat)) && !isNaN(Number(reqLng))) {
      latitude = parseFloat(reqLat);
      longitude = parseFloat(reqLng);
      placeName = reqPlaceName || (reqFormattedAddress ? reqFormattedAddress.split(',')[0] : 'Selected Place');
      formattedAddress = reqFormattedAddress || placeName;
    } else if (placeId) {
      const geo = await getPlaceCoordinates(placeId);
      latitude = geo.lat;
      longitude = geo.lng;
      formattedAddress = geo.formattedAddress;
      placeName = formattedAddress.split(',')[0];
    } else if (manualCoords) {
      latitude = manualCoords.lat;
      longitude = manualCoords.lng;
      placeName = manualCoords.name || 'Chennai';
      formattedAddress = placeName;
    } else {
      latitude = 13.0827;
      longitude = 80.2707;
      placeName = 'Chennai';
      formattedAddress = 'Chennai, Tamil Nadu, India';
    }

    const gmtVal = gmt || timezone || '+05:30';
    const dstVal = dst || '+00:00';

    const calcResult = await calculateVedicChart({ dob, tob, latitude, longitude, ayanamsa, gmt: gmtVal, dst: dstVal });

    // Initialize 12 house arrays
    const rasiGrid = Array.from({ length: 12 }, () => []);
    const navamsaGrid = Array.from({ length: 12 }, () => []);

    const ascRasiId = calcResult.ascendantRasiId;
    const ascNavamsaRasiId = calcResult.ascendantNavamsaRasiId ?? calcResult.planets.find(p => p.name === 'Lagna')?.navamsaRasiId ?? 0;

    const enrichedPlanets = calcResult.planets.map(p => {
      const deg = Math.floor(p.degreeInRasi);
      const min = Math.floor((p.degreeInRasi - deg) * 60);
      const formattedDegree = `${deg}°${min < 10 ? '0' : ''}${min}'`;

      const rasiInfo = getRasiDetails(p.rasiId);
      const navamsaRasiInfo = getRasiDetails(p.navamsaRasiId);
      const nakshatraInfo = getNakshatraDetails(p.nakshatraId);
      const planetMasterInfo = getPlanetDetails(p.name);
      const nakshatraLordPlanet = getPlanetDetails(nakshatraInfo?.athipathi?.name);

      const rasiBhavaOrderId = ((p.rasiId - ascRasiId + 12) % 12) + 1;
      const navamsaBhavaOrderId = ((p.navamsaRasiId - ascNavamsaRasiId + 12) % 12) + 1;

      const planetObj = {
        planetId: planetMasterInfo?.planetId ?? (p.name === 'Lagna' ? -1 : (p.name === 'Maandi' ? 10 : 0)),
        name: p.name,
        nameTa: p.name === 'Lagna' ? 'லக்னம்' : (p.name === 'Maandi' ? 'மாந்தி' : (planetMasterInfo?.nameTa || p.nameTa || p.name)),
        nameHi: planetMasterInfo?.nameHi || p.name,
        nameTe: planetMasterInfo?.nameTe || p.name,
        nameKn: planetMasterInfo?.nameKn || p.name,
        nameMl: planetMasterInfo?.nameMl || p.name,
        shortName: p.name === 'Lagna' ? 'Lagna' : (planetMasterInfo?.shortName || (p.name === 'Maandi' ? 'Maa' : p.name)),
        shortNameTa: p.name === 'Lagna' ? 'ல' : (planetMasterInfo?.shortNameTa || (p.name === 'Maandi' ? 'மா' : p.nameTa || '')),
        longitude: p.longitude,
        speed: p.speed,
        isRetrograde: p.isRetrograde,
        
        // Rasi details
        rasiId: p.rasiId,
        rasiName: rasiInfo?.name || '',
        rasiNameTa: rasiInfo?.nameTa || p.rasiNameTa || '',
        rasiNameHi: rasiInfo?.nameHi || '',
        rasiNameTe: rasiInfo?.nameTe || '',
        rasiNameKn: rasiInfo?.nameKn || '',
        rasiNameMl: rasiInfo?.nameMl || '',
        degreeInRasi: p.degreeInRasi,
        rawDegree: p.degreeInRasi,
        degree: formattedDegree,
        formattedDegree,
        rasiAthipathi: {
          name: rasiInfo?.athipathi?.name || '',
          nameTa: rasiInfo?.athipathi?.nameTa || '',
          nameHi: rasiInfo?.athipathi?.nameHi || '',
          nameTe: rasiInfo?.athipathi?.nameTe || '',
          nameKn: rasiInfo?.athipathi?.nameKn || '',
          nameMl: rasiInfo?.athipathi?.nameMl || '',
          planetId: rasiInfo?.athipathi?.planetId
        },
        rasiGender: rasiInfo?.gender?.name || '',
        rasiGenderTa: rasiInfo?.gender?.nameTa || '',
        rasiDirection: rasiInfo?.direction?.name || '',
        rasiDirectionTa: rasiInfo?.direction?.nameTa || '',
        rasiMobility: rasiInfo?.mobility?.name || '',
        rasiMobilityTa: rasiInfo?.mobility?.nameTa || '',
        rasiBhavaOrderId,

        // Nakshatra details
        nakshatraId: p.nakshatraId,
        nakshatraName: nakshatraInfo?.name || '',
        nakshatraNameTa: nakshatraInfo?.nameTa || p.nakshatraNameTa || '',
        nakshatraNameHi: nakshatraInfo?.nameHi || '',
        nakshatraNameTe: nakshatraInfo?.nameTe || '',
        nakshatraNameKn: nakshatraInfo?.nameKn || '',
        nakshatraNameMl: nakshatraInfo?.nameMl || '',
        pada: p.pada,
        nakshatraAthipathi: {
          name: nakshatraInfo?.athipathi?.name || '',
          nameTa: nakshatraLordPlanet?.nameTa || nakshatraInfo?.athipathi?.nameTa || '',
          nameHi: nakshatraLordPlanet?.nameHi || '',
          nameTe: nakshatraLordPlanet?.nameTe || '',
          nameKn: nakshatraLordPlanet?.nameKn || '',
          nameMl: nakshatraLordPlanet?.nameMl || '',
          planetId: nakshatraInfo?.athipathi?.planetId
        },
        natchAthipathi: {
          name: nakshatraInfo?.athipathi?.name || '',
          nameTa: nakshatraLordPlanet?.nameTa || nakshatraInfo?.athipathi?.nameTa || '',
          nameHi: nakshatraLordPlanet?.nameHi || '',
          nameTe: nakshatraLordPlanet?.nameTe || '',
          nameKn: nakshatraLordPlanet?.nameKn || '',
          nameMl: nakshatraLordPlanet?.nameMl || '',
          planetId: nakshatraInfo?.athipathi?.planetId
        },

        // Navamsa details
        navamsaRasiId: p.navamsaRasiId,
        navamsaRasiName: navamsaRasiInfo?.name || '',
        navamsaRasiNameTa: navamsaRasiInfo?.nameTa || '',
        navamsaBhavaOrderId,
        padamAthipathi: {
          name: navamsaRasiInfo?.athipathi?.name || '',
          nameTa: navamsaRasiInfo?.athipathi?.nameTa || '',
          nameHi: navamsaRasiInfo?.athipathi?.nameHi || '',
          nameTe: navamsaRasiInfo?.athipathi?.nameTe || '',
          nameKn: navamsaRasiInfo?.athipathi?.nameKn || '',
          nameMl: navamsaRasiInfo?.athipathi?.nameMl || '',
          planetId: navamsaRasiInfo?.athipathi?.planetId
        },
        natchPadaAthipathi: {
          name: navamsaRasiInfo?.athipathi?.name || '',
          nameTa: navamsaRasiInfo?.athipathi?.nameTa || '',
          nameHi: navamsaRasiInfo?.athipathi?.nameHi || '',
          nameTe: navamsaRasiInfo?.athipathi?.nameTe || '',
          nameKn: navamsaRasiInfo?.athipathi?.nameKn || '',
          nameMl: navamsaRasiInfo?.athipathi?.nameMl || '',
          planetId: navamsaRasiInfo?.athipathi?.planetId
        },
        ...(p.maandiDetails ? { maandiDetails: p.maandiDetails } : {})
      };

      // 1. Rasi Grid (D1)
      rasiGrid[p.rasiId].push(planetObj);

      // 2. Navamsa Grid (D9)
      navamsaGrid[p.navamsaRasiId].push(planetObj);

      return planetObj;
    });

    // Generate 12 houses metadata with constituent nakshatras and padas
    const rasiHouses = RASIS_DATA.map(r => {
      const padasForRasi = NAKSHATRA_PADAS_DATA.slice(r.rasiId * 9, (r.rasiId + 1) * 9);
      // Group padas by nakshatra
      const starGroups = [];
      padasForRasi.forEach(item => {
        let grp = starGroups.find(g => g.nakshatraId === item.nakshatraId);
        if (!grp) {
          grp = {
            nakshatraId: item.nakshatraId,
            name: item.nakshatraName?.name || '',
            nameTa: item.nakshatraName?.nameTa || '',
            nameHi: item.nakshatraName?.nameHi || '',
            nameTe: item.nakshatraName?.nameTe || '',
            nameKn: item.nakshatraName?.nameKn || '',
            nameMl: item.nakshatraName?.nameMl || '',
            nakshatraAthipathi: item.nakshatraAthipathi,
            padas: []
          };
          starGroups.push(grp);
        }
        grp.padas.push({
          pada: item.pada,
          padaNumber: item.padaNumber,
          padaName: item.padaName,
          padamAthipathi: item.padamAthipathi,
          natchPadaAthipathi: item.padamAthipathi,
          navamsaRasiId: item.navamsaRasiId,
          navamsaRasiName: item.navamsaRasiName
        });
      });

      return {
        rasiId: r.rasiId,
        name: r.name,
        nameTa: r.nameTa,
        nameHi: r.nameHi,
        nameTe: r.nameTe,
        nameKn: r.nameKn,
        nameMl: r.nameMl,
        rasiAthipathi: r.athipathi,
        element: r.element,
        mobility: r.mobility,
        nakshatras: starGroups
      };
    });

    // Sort inner array of objects in each house by rawDegree (ascending)
    rasiGrid.forEach(house => {
      house.sort((a, b) => a.degreeInRasi - b.degreeInRasi);
    });

    const moonPlanet = enrichedPlanets.find(p => p.name === 'Moon');
    const lagnaPlanet = enrichedPlanets.find(p => p.name === 'Lagna');
    const maandiPlanet = enrichedPlanets.find(p => p.name === 'Maandi' || p.name === 'Mandi');
    const sunPlanet = enrichedPlanets.find(p => p.name === 'Sun');
    const clientLang = req.headers['accept-language'] || req.query.lang || 'ta';
    const basicDetails = calculateBasicHoroscopeDetails({
      dob,
      tob,
      sunLongitude: sunPlanet ? sunPlanet.longitude : 125.899,
      moonLongitude: moonPlanet ? moonPlanet.longitude : 250.01,
      ascendantRasiId: ascRasiId,
      latitude,
      longitude,
      lang: clientLang
    });

    return res.status(200).json({
      success: true,
      chartData: {
        rasiGrid,
        navamsaGrid,
        rasiHouses,
        planets: enrichedPlanets,
        ascendantRasiId: ascRasiId,
        ascendantNavamsaRasiId: ascNavamsaRasiId,
        lagnaDetails: lagnaPlanet,
        maandiDetails: maandiPlanet?.maandiDetails || calcResult.planets.find(p => p.name === 'Maandi')?.maandiDetails || null,
        maandiPlanet: maandiPlanet || null,
        latitude: parseFloat(latitude.toFixed(4)),
        longitude: parseFloat(longitude.toFixed(4)),
        placeName,
        formattedAddress,
        timezone: gmtVal,
        gmt: gmtVal,
        dst: dstVal,
        ayanamsa: calcResult.ayanamsa.toFixed(4),
        ayanamsaType: calcResult.ayanamsaType,
        ayanamsaName: calcResult.ayanamsaType,
        ayanamsaKey: calcResult.ayanamsaKey,
        ayanamsaNameTa: calcResult.ayanamsaNameTa,
        moonNakshatra: moonPlanet ? moonPlanet.nakshatraNameTa : '',
        moonNakshatraEn: moonPlanet ? moonPlanet.nakshatraName : 'Moola',
        moonNakshatraAthipathi: moonPlanet?.nakshatraAthipathi || { name: 'Ketu', nameTa: 'கேது' },
        moonRasiAthipathi: moonPlanet?.rasiAthipathi || { name: 'Jupiter', nameTa: 'குரு' },
        basicDetails,
        dob,
        tob
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * Save complete User Horoscope Profile to MongoDB
 */
export const saveUserHoroscope = async (req, res) => {
  try {
    const { 
      fullName, 
      gender, 
      dob, 
      tob, 
      birthYear,
      birthMonth,
      birthDay,
      birthHour,
      birthMinute,
      birthSecond,
      birthAmPm,
      placeName, 
      placeId, 
      formattedAddress, 
      latitude, 
      longitude, 
      latDeg,
      latMin,
      latSec,
      latDir,
      lngDeg,
      lngMin,
      lngSec,
      lngDir,
      timezone,
      gmt,
      dstType,
      dst,
      ayanamsa,
      chartType,
      chartData 
    } = req.body;

    const cleanName = (fullName || '').trim();
    const cleanDob = (dob || '').trim();
    const cleanTob = (tob || '').trim();
    const rawPlace = (formattedAddress || placeName || 'Chennai').trim();
    const cleanPlaceName = (placeName || rawPlace.split(',')[0] || 'Chennai').trim();

    if (!cleanName || !cleanDob || !cleanTob) {
      return res.status(400).json({ 
        success: false, 
        error: 'பெயர், பிறந்த தேதி மற்றும் பிறந்த நேரம் ஆகியவை கட்டாயமாகும் (Full name, Date of birth, and Time of birth are required).' 
      });
    }

    // Condition Check: Name, Date of Birth, Time of Birth, and Birth Place must not already exist
    const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const existingProfile = await HoroscopeProfile.findOne({
      "personDetails.fullName": { $regex: new RegExp(`^${escapeRegex(cleanName)}$`, 'i') },
      "personDetails.dob": cleanDob,
      "personDetails.tob": cleanTob,
      $or: [
        { "location.placeName": { $regex: new RegExp(`^${escapeRegex(cleanPlaceName)}$`, 'i') } },
        { "location.formattedAddress": { $regex: new RegExp(`^${escapeRegex(rawPlace)}$`, 'i') } }
      ]
    });

    if (existingProfile) {
      return res.status(409).json({
        success: false,
        error: `இப்பெயர் (${cleanName}), பிறந்த தேதி (${cleanDob}), நேரம் (${cleanTob}) மற்றும் பிறந்த இடத்துடன் (${cleanPlaceName}) கூடிய ஜாதகம் ஏற்கனவே சேமிக்கப்பட்டுள்ளது! (Profile already exists with ID: ${existingProfile._id})`,
        isDuplicate: true,
        profileId: existingProfile._id
      });
    }

    const lat = parseFloat(latitude) || 13.0827;
    const lng = parseFloat(longitude) || 80.2707;

    // Helper to calculate DMS if not provided
    const toDms = (val, isLat) => {
      const abs = Math.abs(val);
      const d = Math.floor(abs);
      const mFloat = (abs - d) * 60;
      const m = Math.floor(mFloat);
      const s = Math.round((mFloat - m) * 60);
      const dir = isLat ? (val >= 0 ? 'N' : 'S') : (val >= 0 ? 'E' : 'W');
      return {
        deg: String(d).padStart(3, '0'),
        min: String(m).padStart(2, '0'),
        sec: String(s >= 60 ? 59 : s).padStart(2, '0'),
        dir
      };
    };

    const latDmsObj = (latDeg !== undefined && latDeg !== '')
      ? { deg: String(latDeg).padStart(3, '0'), min: String(latMin || '00').padStart(2, '0'), sec: String(latSec || '00').padStart(2, '0'), dir: (latDir === 'S' || latDir === 'தெற்கு') ? 'S' : 'N' }
      : toDms(lat, true);

    const lngDmsObj = (lngDeg !== undefined && lngDeg !== '')
      ? { deg: String(lngDeg).padStart(3, '0'), min: String(lngMin || '00').padStart(2, '0'), sec: String(lngSec || '00').padStart(2, '0'), dir: (lngDir === 'W' || lngDir === 'மேற்கு') ? 'W' : 'E' }
      : toDms(lng, false);

    // Build or reuse chart data
    const selectedAyanamsaKey = ayanamsa || 'lahiri';
    const ayanamsaMeta = AYANAMSA_MODES[selectedAyanamsaKey] || AYANAMSA_MODES.lahiri;

    const gmtVal = gmt || timezone || '+05:30';
    const dstVal = dst || '+00:00';

    const calcResult = await calculateVedicChart({ 
      dob: cleanDob, 
      tob: cleanTob, 
      latitude: lat, 
      longitude: lng, 
      ayanamsa: selectedAyanamsaKey,
      gmt: gmtVal,
      dst: dstVal
    });

    const ascRasiId = calcResult.ascendantRasiId;
    const ascNavamsaRasiId = calcResult.ascendantNavamsaRasiId ?? calcResult.planets.find(p => p.name === 'Lagna')?.navamsaRasiId ?? 0;

    const rasiGrid = Array.from({ length: 12 }, () => []);
    const navamsaGrid = Array.from({ length: 12 }, () => []);

    // Maintain dual language (English and authentic Tamil *Ta) data across all planet, sign, star, and lordship fields
    const enrichedPlanets = calcResult.planets.map(p => {
      const deg = Math.floor(p.degreeInRasi);
      const min = Math.floor((p.degreeInRasi - deg) * 60);
      const formattedDegree = `${deg}°${min < 10 ? '0' : ''}${min}'`;

      const rasiInfo = getRasiDetails(p.rasiId);
      const navamsaRasiInfo = getRasiDetails(p.navamsaRasiId);
      const nakshatraInfo = getNakshatraDetails(p.nakshatraId);
      const planetMasterInfo = getPlanetDetails(p.name);

      const rasiBhavaOrderId = ((p.rasiId - ascRasiId + 12) % 12) + 1;
      const navamsaBhavaOrderId = ((p.navamsaRasiId - ascNavamsaRasiId + 12) % 12) + 1;

      const planetObj = {
        planetId: planetMasterInfo?.planetId ?? (p.name === 'Lagna' ? -1 : (p.name === 'Maandi' ? 10 : 0)),
        name: p.name,
        nameTa: p.name === 'Lagna' ? 'லக்னம்' : (p.name === 'Maandi' ? 'மாந்தி' : (planetMasterInfo?.nameTa || p.nameTa || p.name)),
        shortName: p.name === 'Lagna' ? 'Lagna' : (planetMasterInfo?.shortName || (p.name === 'Maandi' ? 'Maa' : p.name)),
        shortNameTa: p.name === 'Lagna' ? 'ல' : (planetMasterInfo?.shortNameTa || (p.name === 'Maandi' ? 'மா' : p.nameTa || '')),
        longitude: p.longitude,
        speed: p.speed,
        isRetrograde: p.isRetrograde,
        
        rasiId: p.rasiId,
        rasiName: rasiInfo?.name || '',
        rasiNameTa: rasiInfo?.nameTa || p.rasiNameTa || '',
        degreeInRasi: p.degreeInRasi,
        rawDegree: p.degreeInRasi,
        degree: formattedDegree,
        formattedDegree,
        rasiAthipathi: {
          name: rasiInfo?.athipathi?.name || '',
          nameTa: rasiInfo?.athipathi?.nameTa || '',
          planetId: rasiInfo?.athipathi?.planetId
        },
        rasiGender: rasiInfo?.gender?.name || '',
        rasiGenderTa: rasiInfo?.gender?.nameTa || '',
        rasiDirection: rasiInfo?.direction?.name || '',
        rasiDirectionTa: rasiInfo?.direction?.nameTa || '',
        rasiMobility: rasiInfo?.mobility?.name || '',
        rasiMobilityTa: rasiInfo?.mobility?.nameTa || '',
        rasiBhavaOrderId,

        nakshatraId: p.nakshatraId,
        nakshatraName: nakshatraInfo?.name || '',
        nakshatraNameTa: nakshatraInfo?.nameTa || p.nakshatraNameTa || '',
        pada: p.pada,
        nakshatraAthipathi: {
          name: nakshatraInfo?.athipathi?.name || '',
          nameTa: nakshatraInfo?.athipathi?.nameTa || '',
          planetId: nakshatraInfo?.athipathi?.planetId
        },

        navamsaRasiId: p.navamsaRasiId,
        navamsaRasiName: navamsaRasiInfo?.name || '',
        navamsaRasiNameTa: navamsaRasiInfo?.nameTa || '',
        navamsaBhavaOrderId,
        padamAthipathi: {
          name: navamsaRasiInfo?.athipathi?.name || '',
          nameTa: navamsaRasiInfo?.athipathi?.nameTa || '',
          planetId: navamsaRasiInfo?.athipathi?.planetId
        },
        ...(p.maandiDetails || (p.name === 'Maandi' && (req.body.maandiDetails || req.body.maandi?.maandiDetails))
          ? { maandiDetails: p.maandiDetails || req.body.maandiDetails || req.body.maandi?.maandiDetails }
          : {})
      };

      rasiGrid[p.rasiId].push(planetObj);
      navamsaGrid[p.navamsaRasiId].push(planetObj);
      return planetObj;
    });

    rasiGrid.forEach(house => house.sort((a, b) => a.degreeInRasi - b.degreeInRasi));

    const moonPlanet = enrichedPlanets.find(p => p.name === 'Moon');
    const lagnaPlanet = enrichedPlanets.find(p => p.name === 'Lagna');
    const maandiPlanet = enrichedPlanets.find(p => p.name === 'Maandi' || p.name === 'Mandi');
    const lagnaRasiInfo = getRasiDetails(ascRasiId);
    const lagnaNavamsaRasiInfo = getRasiDetails(ascNavamsaRasiId);
    const lagnaNakshatraInfo = lagnaPlanet ? getNakshatraDetails(lagnaPlanet.nakshatraId) : null;
    const moonRasiInfo = moonPlanet ? getRasiDetails(moonPlanet.rasiId) : null;
    const moonNakshatraInfo = moonPlanet ? getNakshatraDetails(moonPlanet.nakshatraId) : null;
    const maandiRasiInfo = maandiPlanet ? getRasiDetails(maandiPlanet.rasiId) : null;
    const maandiNavamsaRasiInfo = maandiPlanet ? getRasiDetails(maandiPlanet.navamsaRasiId) : null;
    const maandiNakshatraInfo = maandiPlanet ? getNakshatraDetails(maandiPlanet.nakshatraId) : null;
    const rawMaandiDetails = maandiPlanet?.maandiDetails 
      || calcResult.planets.find(p => p.name === 'Maandi')?.maandiDetails 
      || req.body.maandiDetails 
      || req.body.maandi?.maandiDetails 
      || null;

    const sunPlanet = enrichedPlanets.find(p => p.name === 'Sun');
    // Save both English and Tamil language data for dual language maintenance in DB
    const basicDetailsEn = calculateBasicHoroscopeDetails({
      dob: cleanDob,
      tob: cleanTob,
      sunLongitude: sunPlanet ? sunPlanet.longitude : 125.899,
      moonLongitude: moonPlanet ? moonPlanet.longitude : 250.01,
      ascendantRasiId: ascRasiId,
      latitude: lat,
      longitude: lng,
      lang: 'en'
    });

    const basicDetailsTa = calculateBasicHoroscopeDetails({
      dob: cleanDob,
      tob: cleanTob,
      sunLongitude: sunPlanet ? sunPlanet.longitude : 125.899,
      moonLongitude: moonPlanet ? moonPlanet.longitude : 250.01,
      ascendantRasiId: ascRasiId,
      latitude: lat,
      longitude: lng,
      lang: 'ta'
    });

    const basicDetails = {
      ...basicDetailsEn,
      vaaramTa: basicDetailsTa.vaaram,
      tithiTa: basicDetailsTa.tithi,
      yogamTa: basicDetailsTa.yogam,
      karanamTa: basicDetailsTa.karanam,
      nakshatraNameTa: basicDetailsTa.nakshatraName,
      nakshatraWithPadaTa: basicDetailsTa.nakshatraWithPada,
      nakshatraLordTa: basicDetailsTa.nakshatraLord,
      nakshatraDeityTa: basicDetailsTa.nakshatraDeity,
      animalTa: basicDetailsTa.animal,
      birdTa: basicDetailsTa.bird,
      treeTa: basicDetailsTa.tree,
      ganaTa: basicDetailsTa.gana,
      yoniGenderTa: basicDetailsTa.yoniGender,
      rasiTa: basicDetailsTa.rasi,
      rasiLordTa: basicDetailsTa.rasiLord,
      lagnaTa: basicDetailsTa.lagna,
      lagnaLordTa: basicDetailsTa.lagnaLord,
      tamilYearNameTa: basicDetailsTa.tamilYearName,
      tamilMonthNameTa: basicDetailsTa.tamilMonthName
    };

    // Parse date and time subcomponents if not passed directly
    const [yStr, mStr, dStr] = cleanDob.split('-');
    const [hStr, minStr, sStr] = cleanTob.split(':');

    // Enforce English gender
    let englishGender = 'male';
    if (gender) {
      const g = String(gender).toLowerCase();
      if (g.includes('fem') || g === 'female' || g === 'பெண்' || g === 'महिला' || g === 'స్త్రీ' || g === 'ಮಹಿಳೆ' || g === 'സ്ത്രീ') {
        englishGender = 'female';
      } else if (g.includes('oth') || g === 'other' || g === 'மற்றவை' || g === 'अन्य' || g === 'ఇతర' || g === 'ಇತರ' || g === 'മറ്റുള്ളവ') {
        englishGender = 'other';
      } else {
        englishGender = 'male';
      }
    }

    // Enforce English DST Type
    const DST_MAP = {
      standard: 'Standard Time (No DST)',
      daylight_saving: 'Daylight Saving Time [DST] (+1 hr)',
      double_daylight_saving: 'Double Daylight Saving Time (+2 hrs)'
    };
    let englishDstType = DST_MAP[dstType];
    if (!englishDstType) {
      const dt = String(dstType || '').toLowerCase();
      if (dt.includes('double') || dt.includes('இரட்டை') || dt.includes('डबल') || dt.includes('డబుల్') || dt.includes('ಡಬಲ್') || dt.includes('ഡബിൾ')) {
        englishDstType = 'Double Daylight Saving Time (+2 hrs)';
      } else if (dt.includes('daylight') || dt.includes('dst') || dt.includes('கோடை') || dt.includes('डेलाइट') || dt.includes('డేలైట్') || dt.includes('ಡೇಲೈಟ್') || dt.includes('ഡേലൈറ്റ്')) {
        englishDstType = 'Daylight Saving Time [DST] (+1 hr)';
      } else {
        englishDstType = 'Standard Time (No DST)';
      }
    }

    const rawAmPm = String(birthAmPm || (parseInt(hStr, 10) >= 12 ? 'pm' : 'am')).toLowerCase();
    const englishBirthAmPm = rawAmPm.includes('p') ? 'pm' : 'am';
    const englishChartType = chartType === 'north' ? 'north' : 'south';

    const newProfile = new HoroscopeProfile({
      personDetails: {
        fullName: cleanName,
        gender: englishGender,
        genderTa: englishGender === 'male' ? 'ஆண்' : (englishGender === 'female' ? 'பெண்' : 'மற்றவை'),
        dob: cleanDob,
        tob: cleanTob,
        birthYear: birthYear ? Number(birthYear) : parseInt(yStr, 10),
        birthMonth: birthMonth ? Number(birthMonth) : parseInt(mStr, 10),
        birthDay: birthDay ? Number(birthDay) : parseInt(dStr, 10),
        birthHour: birthHour ? String(birthHour) : hStr,
        birthMinute: birthMinute ? String(birthMinute) : minStr,
        birthSecond: birthSecond ? String(birthSecond) : (sStr || '00'),
        birthAmPm: englishBirthAmPm,
        timeZone: timezone || 'Asia/Kolkata',
        gmt: gmt || '+05:30',
        dstType: englishDstType,
        dstTypeTa: englishDstType.includes('Double') ? 'இரட்டை கோடைக்கால சேமிப்பு நேரம் (+2 மணி)' : (englishDstType.includes('Daylight') ? 'கோடைக்கால சேமிப்பு நேரம் [DST] (+1 மணி)' : 'நிலையான நேரம் (DST இல்லை)'),
        dst: dst || '+00:00'
      },
      location: {
        placeName: cleanPlaceName,
        placeId: placeId || '',
        formattedAddress: rawPlace,
        latitude: lat,
        longitude: lng,
        dms: {
          latDeg: latDmsObj.deg,
          latMin: latDmsObj.min,
          latSec: latDmsObj.sec,
          latDir: latDmsObj.dir === 'S' ? 'S' : 'N',
          lngDeg: lngDmsObj.deg,
          lngMin: lngDmsObj.min,
          lngSec: lngDmsObj.sec,
          lngDir: lngDmsObj.dir === 'W' ? 'W' : 'E'
        },
        geoPoint: {
          type: 'Point',
          coordinates: [lng, lat]
        }
      },
      chartPreferences: {
        chartType: englishChartType
      },
      astronomicalDetails: {
        juldayUtc: calcResult.juldayUtc,
        ayanamsaType: ayanamsaMeta?.name || calcResult.ayanamsaType || 'Lahiri (Chitra Paksha)',
        ayanamsaMode: selectedAyanamsaKey,
        ayanamsaNameTa: ayanamsaMeta?.nameTa || calcResult.ayanamsaNameTa || 'சித்திர பக்ச லஹிரி',
        ayanamsa: calcResult.ayanamsa,
        ascendantLongitude: calcResult.ascendantLongitude,
        ascendantRasiId: ascRasiId,
        ascendantNavamsaRasiId: ascNavamsaRasiId
      },
      birthAstrology: {
        lagna: {
          planetId: -1,
          name: 'Lagna',
          nameTa: 'லக்னம்',
          shortName: 'Lagna',
          shortNameTa: 'ல',
          longitude: calcResult.ascendantLongitude,
          rasiId: ascRasiId,
          rasiName: lagnaRasiInfo?.name || '',
          rasiNameTa: lagnaRasiInfo?.nameTa || '',
          degreeInRasi: lagnaPlanet?.degreeInRasi || 0,
          formattedDegree: lagnaPlanet?.formattedDegree || '',
          nakshatraId: lagnaPlanet?.nakshatraId || 0,
          nakshatraName: lagnaNakshatraInfo?.name || lagnaPlanet?.nakshatraName || '',
          nakshatraNameTa: lagnaNakshatraInfo?.nameTa || lagnaPlanet?.nakshatraNameTa || '',
          pada: lagnaPlanet?.pada || 1,
          rasiAthipathi: {
            name: lagnaRasiInfo?.athipathi?.name || '',
            nameTa: lagnaRasiInfo?.athipathi?.nameTa || '',
            planetId: lagnaRasiInfo?.athipathi?.planetId
          },
          nakshatraAthipathi: {
            name: lagnaNakshatraInfo?.athipathi?.name || lagnaPlanet?.nakshatraAthipathi?.name || '',
            nameTa: lagnaNakshatraInfo?.athipathi?.nameTa || lagnaPlanet?.nakshatraAthipathi?.nameTa || '',
            planetId: lagnaNakshatraInfo?.athipathi?.planetId ?? lagnaPlanet?.nakshatraAthipathi?.planetId
          },
          navamsaRasiId: ascNavamsaRasiId,
          navamsaRasiName: lagnaNavamsaRasiInfo?.name || lagnaPlanet?.navamsaRasiName || '',
          navamsaRasiNameTa: lagnaNavamsaRasiInfo?.nameTa || '',
          bhavaOrderId: 1,
          padamAthipathi: {
            name: lagnaNavamsaRasiInfo?.athipathi?.name || lagnaPlanet?.padamAthipathi?.name || '',
            nameTa: lagnaNavamsaRasiInfo?.athipathi?.nameTa || lagnaPlanet?.padamAthipathi?.nameTa || '',
            planetId: lagnaNavamsaRasiInfo?.athipathi?.planetId ?? lagnaPlanet?.padamAthipathi?.planetId
          }
        },
        janmaRasi: {
          rasiId: moonPlanet?.rasiId || 0,
          name: moonRasiInfo?.name || '',
          nameTa: moonRasiInfo?.nameTa || '',
          athipathi: {
            name: moonRasiInfo?.athipathi?.name || '',
            nameTa: moonRasiInfo?.athipathi?.nameTa || '',
            planetId: moonRasiInfo?.athipathi?.planetId
          }
        },
        janmaNakshatra: {
          nakshatraId: moonPlanet?.nakshatraId || 0,
          name: moonNakshatraInfo?.name || '',
          nameTa: moonNakshatraInfo?.nameTa || '',
          pada: moonPlanet?.pada || 1,
          athipathi: {
            name: moonNakshatraInfo?.athipathi?.name || '',
            nameTa: moonNakshatraInfo?.athipathi?.nameTa || '',
            planetId: moonNakshatraInfo?.athipathi?.planetId
          }
        },
        maandi: maandiPlanet ? {
          planetId: 10,
          name: 'Maandi',
          nameTa: 'மாந்தி',
          shortName: 'Maa',
          shortNameTa: 'மா',
          longitude: maandiPlanet.longitude,
          speed: maandiPlanet.speed || 0,
          isRetrograde: maandiPlanet.isRetrograde || false,
          rasiId: maandiPlanet.rasiId,
          rasiName: maandiRasiInfo?.name || '',
          rasiNameTa: maandiRasiInfo?.nameTa || '',
          degreeInRasi: maandiPlanet.degreeInRasi,
          formattedDegree: maandiPlanet.formattedDegree,
          nakshatraId: maandiPlanet.nakshatraId,
          nakshatraName: maandiNakshatraInfo?.name || '',
          nakshatraNameTa: maandiNakshatraInfo?.nameTa || '',
          pada: maandiPlanet.pada,
          rasiAthipathi: {
            name: maandiRasiInfo?.athipathi?.name || '',
            nameTa: maandiRasiInfo?.athipathi?.nameTa || '',
            planetId: maandiRasiInfo?.athipathi?.planetId
          },
          nakshatraAthipathi: {
            name: maandiNakshatraInfo?.athipathi?.name || '',
            nameTa: maandiNakshatraInfo?.athipathi?.nameTa || '',
            planetId: maandiNakshatraInfo?.athipathi?.planetId
          },
          navamsaRasiId: maandiPlanet.navamsaRasiId,
          navamsaRasiName: maandiNavamsaRasiInfo?.name || '',
          navamsaRasiNameTa: maandiNavamsaRasiInfo?.nameTa || '',
          bhavaOrderId: maandiPlanet.rasiBhavaOrderId,
          padamAthipathi: {
            name: maandiNavamsaRasiInfo?.athipathi?.name || '',
            nameTa: maandiNavamsaRasiInfo?.athipathi?.nameTa || '',
            planetId: maandiNavamsaRasiInfo?.athipathi?.planetId
          },
          maandiDetails: rawMaandiDetails
        } : null
      },
      planets: enrichedPlanets,
      chartGrids: {
        rasiGrid,
        navamsaGrid
      },
      basicDetails,
      maandiDetails: rawMaandiDetails
    });

    const savedProfile = await newProfile.save();
    return res.status(201).json({
      success: true,
      message: 'Horoscope saved successfully into horoscopeprofiles table.',
      profileId: savedProfile._id,
      data: savedProfile
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * Get all saved user horoscope profiles
 */
export const getUserHoroscopes = async (req, res) => {
  try {
    const profiles = await HoroscopeProfile.find({ status: 'active' })
      .sort({ createdAt: -1 })
      .limit(50);
    return res.status(200).json({ success: true, count: profiles.length, data: profiles });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * Get specific saved horoscope profile by ID
 */
export const getUserHoroscopeById = async (req, res) => {
  try {
    const profile = await HoroscopeProfile.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ success: false, error: 'Horoscope profile not found.' });
    }
    return res.status(200).json({ success: true, data: profile });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * Master Data Endpoint: 12 Rasis with Athipathi in English and Tamil
 */
export const getMasterRasis = async (req, res) => {
  try {
    let rasis;
    try {
      rasis = await RasiMaster.find().sort({ rasiId: 1 });
    } catch {
      rasis = null;
    }
    if (!rasis || rasis.length === 0) {
      rasis = RASIS_DATA;
    }
    return res.status(200).json({ success: true, count: rasis.length, data: rasis });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * Master Data Endpoint: 27 Nakshatras with Athipathi in English and Tamil
 */
export const getMasterNakshatras = async (req, res) => {
  try {
    let nakshatras;
    try {
      nakshatras = await NakshatraMaster.find().sort({ nakshatraId: 1 });
    } catch {
      nakshatras = null;
    }
    if (!nakshatras || nakshatras.length === 0) {
      nakshatras = NAKSHATRAS_DATA;
    }
    return res.status(200).json({ success: true, count: nakshatras.length, data: nakshatras });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * Master Data Endpoint: 9 Planets in English and Tamil
 */
export const getMasterPlanets = async (req, res) => {
  try {
    let planets;
    try {
      planets = await PlanetMaster.find().sort({ planetId: 1 });
    } catch {
      planets = null;
    }
    if (!planets || planets.length === 0) {
      planets = PLANETS_DATA;
    }
    return res.status(200).json({ success: true, count: planets.length, data: planets });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * Master Data Endpoint: Kalachakram 360 Degrees Master Table
 * Supports query params: rasiId, nakshatraId, pada, startDegree, endDegree
 */
export const getKalachakramMaster = async (req, res) => {
  try {
    const { rasiId, nakshatraId, pada, from, to } = req.query;

    const filter = {};
    if (rasiId !== undefined) filter.rasiId = Number(rasiId);
    if (nakshatraId !== undefined) filter.nakshatraId = Number(nakshatraId);
    if (pada !== undefined) filter.pada = Number(pada);
    if (from !== undefined || to !== undefined) {
      filter.degree = {};
      if (from !== undefined) filter.degree.$gte = Number(from);
      if (to !== undefined) filter.degree.$lte = Number(to);
    }

    let records;
    try {
      records = await KalachakramMaster.find(filter).sort({ degree: 1 });
    } catch {
      records = null;
    }

    if (!records || records.length === 0) {
      records = KALACHAKRAM_DATA.filter(item => {
        if (rasiId !== undefined && item.rasiId !== Number(rasiId)) return false;
        if (nakshatraId !== undefined && item.nakshatraId !== Number(nakshatraId)) return false;
        if (pada !== undefined && item.pada !== Number(pada)) return false;
        if (from !== undefined && item.degree < Number(from)) return false;
        if (to !== undefined && item.degree > Number(to)) return false;
        return true;
      });
    }

    return res.status(200).json({
      success: true,
      count: records.length,
      data: records
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * Master Data Endpoint: Single Degree Kalachakram (0 to 359)
 */
export const getKalachakramByDegree = async (req, res) => {
  try {
    const degree = Number(req.params.degree);
    if (isNaN(degree) || degree < 0 || degree > 359) {
      return res.status(400).json({ success: false, error: 'Degree must be an integer between 0 and 359.' });
    }

    let record;
    try {
      record = await KalachakramMaster.findOne({ degree });
    } catch {
      record = null;
    }

    if (!record) {
      record = getDegreeKalachakram(degree);
    }

    if (!record) {
      return res.status(404).json({ success: false, error: 'Degree not found in Kalachakram.' });
    }

    return res.status(200).json({ success: true, data: record });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * Master Data Endpoint: 30 Tithis
 */
export const getTithiMaster = async (req, res) => {
  try {
    let records;
    try {
      records = await TithiMaster.find().sort({ tithiId: 1 });
    } catch {
      records = null;
    }
    if (!records || records.length === 0) records = TITHIS_DATA;
    return res.status(200).json({ success: true, count: records.length, data: records });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * Master Data Endpoint: 27 Nithya Yogas
 */
export const getYogaMaster = async (req, res) => {
  try {
    let records;
    try {
      records = await YogaMaster.find().sort({ yogaId: 1 });
    } catch {
      records = null;
    }
    if (!records || records.length === 0) records = YOGAS_DATA;
    return res.status(200).json({ success: true, count: records.length, data: records });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * Master Data Endpoint: 11 Karanas
 */
export const getKaranaMaster = async (req, res) => {
  try {
    let records;
    try {
      records = await KaranaMaster.find().sort({ karanaId: 1 });
    } catch {
      records = null;
    }
    if (!records || records.length === 0) records = KARANAS_DATA;
    return res.status(200).json({ success: true, count: records.length, data: records });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * Master Data Endpoint: 60 Tamil Years
 */
export const getTamilYearMaster = async (req, res) => {
  try {
    let records;
    try {
      records = await TamilYearMaster.find().sort({ yearId: 1 });
    } catch {
      records = null;
    }
    if (!records || records.length === 0) records = TAMIL_YEARS_DATA;
    return res.status(200).json({ success: true, count: records.length, data: records });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * Master Data Endpoint: 12 Tamil Months
 */
export const getTamilMonthMaster = async (req, res) => {
  try {
    let records;
    try {
      records = await TamilMonthMaster.find().sort({ monthId: 1 });
    } catch {
      records = null;
    }
    if (!records || records.length === 0) records = TAMIL_MONTHS_DATA;
    return res.status(200).json({ success: true, count: records.length, data: records });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * Master Data Endpoint: Supported Ayanamsa Modes
 */
export const getMasterAyanamsas = async (req, res) => {
  try {
    const list = Object.values(AYANAMSA_MODES).map(m => ({
      key: m.key,
      name: m.name,
      nameTa: m.nameTa
    }));
    return res.status(200).json({ success: true, count: list.length, data: list });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * Master Data Endpoint: KP Horary Numbers 1-249 Table with 6 languages
 */
export const getMasterKPHorary = async (req, res) => {
  try {
    const { rasiId, nakshatraId, subLord, number } = req.query;
    let records;
    try {
      const query = {};
      if (rasiId !== undefined && rasiId !== 'all') query.rasiId = Number(rasiId);
      if (nakshatraId !== undefined && nakshatraId !== 'all') query.nakshatraId = Number(nakshatraId);
      if (subLord && subLord !== 'all') query.subLordName = subLord;
      if (number) query.number = Number(number);

      records = await KPHoraryMaster.find(query).sort({ number: 1 });
    } catch {
      records = null;
    }

    if (!records || records.length === 0) {
      records = KP_HORARY_DATA;
      if (rasiId !== undefined && rasiId !== 'all') {
        records = records.filter(item => item.rasiId === Number(rasiId));
      }
      if (nakshatraId !== undefined && nakshatraId !== 'all') {
        records = records.filter(item => item.nakshatraId === Number(nakshatraId));
      }
      if (subLord && subLord !== 'all') {
        records = records.filter(item => item.subLordName.toLowerCase() === subLord.toLowerCase());
      }
      if (number) {
        records = records.filter(item => item.number === Number(number));
      }
    }

    return res.status(200).json({ success: true, count: records.length, data: records });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * Master Data Endpoint: Specific KP Horary Number (1-249)
 */
export const getKPHoraryByNumber = async (req, res) => {
  try {
    const num = Number(req.params.number);
    if (!num || num < 1 || num > 249) {
      return res.status(400).json({ success: false, error: 'Invalid KP Horary number. Must be between 1 and 249.' });
    }

    let record;
    try {
      record = await KPHoraryMaster.findOne({ number: num });
    } catch {
      record = null;
    }

    if (!record) {
      record = KP_HORARY_DATA.find(item => item.number === num);
    }

    if (!record) {
      return res.status(404).json({ success: false, error: `KP Horary Number ${num} not found.` });
    }

    return res.status(200).json({ success: true, data: record });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * Master Data Endpoint: Kadikara Prasannam (12 Bhavas, Sacred Rules, Concept & FAQs) in 6 languages
 */
export const getMasterKadikaraPrasannam = async (req, res) => {
  try {
    const { category, bhava } = req.query;
    let records;
    try {
      const filter = {};
      if (category) filter.category = category;
      if (bhava) filter.bhava = Number(bhava);
      records = await KadikaraPrasannamMaster.find(filter).sort({ category: 1, order: 1, bhava: 1 });
    } catch {
      records = null;
    }

    if (!records || records.length === 0) {
      records = KADIKARA_PRASANNAM_MASTER_DATA;
      if (category) records = records.filter(r => r.category === category);
      if (bhava) records = records.filter(r => r.bhava === Number(bhava));
    }

    // Grouping by category for convenient frontend consumption
    const bhavas = records.filter(r => r.category === 'bhava');
    const rules = records.filter(r => r.category === 'rule');
    const concepts = records.filter(r => r.category === 'concept');
    const faqs = records.filter(r => r.category === 'faq');

    return res.status(200).json({
      success: true,
      count: records.length,
      data: {
        all: records,
        bhavas,
        rules,
        concepts,
        faqs
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * Master Data Endpoint: Specific Kadikara Prasannam Bhava (1 to 12)
 */
export const getKadikaraBhavaByNumber = async (req, res) => {
  try {
    const bhavaNum = Number(req.params.bhava);
    if (!bhavaNum || bhavaNum < 1 || bhavaNum > 12) {
      return res.status(400).json({ success: false, error: 'Invalid Bhava number. Must be between 1 and 12.' });
    }

    let record;
    try {
      record = await KadikaraPrasannamMaster.findOne({ category: 'bhava', bhava: bhavaNum });
    } catch {
      record = null;
    }

    if (!record) {
      record = KADIKARA_PRASANNAM_MASTER_DATA.find(r => r.category === 'bhava' && r.bhava === bhavaNum);
    }

    if (!record) {
      return res.status(404).json({ success: false, error: `Bhava ${bhavaNum} not found in Kadikara Prasannam.` });
    }

    return res.status(200).json({ success: true, data: record });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * Full Backend Calculation Engine for Kadikara Prasannam (Clock Horary)
 * Returns Udhayam, Aarudam, Bhava predictions, and real-time Ephemeris planetary grid
 * with complete Raasi, Raasi Athipathi, Nakshatra, Nakshatra Athipathi, Pada, and Pada Athipathi
 */
export const calculateKadikaraPrasannamBE = async (req, res) => {
  try {
    const {
      date,
      hour,
      minute,
      ampm = 'AM',
      calculationMode = 'runningHour',
      placeName = 'Chennai',
      latitude = 13.0827,
      longitude = 80.2707,
      ayanamsa = 'lahiri',
      lang = 'ta'
    } = req.body;

    const parsedHour = parseInt(hour, 10) || 12;
    const parsedMinute = Math.max(0, Math.min(59, parseInt(minute, 10) || 0));

    let h24 = parsedHour;
    if (String(ampm).toUpperCase() === 'PM' && parsedHour < 12) {
      h24 += 12;
    } else if (String(ampm).toUpperCase() === 'AM' && parsedHour === 12) {
      h24 = 0;
    }

    const h12 = (parsedHour % 12) || 12;
    const pad = (n) => String(n).padStart(2, '0');
    const tobFormatted = `${pad(h24)}:${pad(parsedMinute)}:00`;

    // 1. Aarudam (Minute: every 5 min = 1 Rasi)
    const aarudamIndex = Math.min(11, Math.floor(parsedMinute / 5));

    // 2. Udhayam (Hour)
    let udhayamIndex = 0;
    if (calculationMode === 'runningHour') {
      const hourMod12 = (h24 % 12);
      if (parsedMinute > 0) {
        udhayamIndex = hourMod12 % 12;
      } else {
        udhayamIndex = (hourMod12 - 1 + 12) % 12;
      }
    } else {
      udhayamIndex = (h12 - 1) % 12;
    }

    // 3. Distance calculation
    const udhayamToAarudam = ((aarudamIndex - udhayamIndex + 12) % 12) + 1;
    const aarudamToUdhayam = ((udhayamIndex - aarudamIndex + 12) % 12) + 1;

    // 4. Bhava prediction lookup from master data
    let bhavaRecord = null;
    try {
      bhavaRecord = await KadikaraPrasannamMaster.findOne({ category: 'bhava', bhava: udhayamToAarudam });
    } catch {
      bhavaRecord = null;
    }
    if (!bhavaRecord) {
      bhavaRecord = KADIKARA_PRASANNAM_MASTER_DATA.find(r => r.category === 'bhava' && r.bhava === udhayamToAarudam);
    }

    const udhayamRasi = RASIS_DATA[udhayamIndex];
    const aarudamRasi = RASIS_DATA[aarudamIndex];

    // 5. Calculate real dynamic Ephemeris chart
    const latNum = parseFloat(latitude) || 13.0827;
    const lngNum = parseFloat(longitude) || 80.2707;
    const calcResult = await calculateVedicChart({
      dob: date || new Date().toISOString().split('T')[0],
      tob: tobFormatted,
      latitude: latNum,
      longitude: lngNum,
      ayanamsa
    });

    const rasiGrid = Array.from({ length: 12 }, () => []);
    const navamsaGrid = Array.from({ length: 12 }, () => []);

    const enrichedPlanets = calcResult.planets.map(p => {
      const deg = Math.floor(p.degreeInRasi);
      const min = Math.floor((p.degreeInRasi - deg) * 60);
      const formattedDegree = `${deg}°${min < 10 ? '0' : ''}${min}'`;

      const rasiInfo = getRasiDetails(p.rasiId);
      const navamsaRasiInfo = getRasiDetails(p.navamsaRasiId);
      const nakshatraInfo = getNakshatraDetails(p.nakshatraId);
      const planetMasterInfo = getPlanetDetails(p.name);
      const nakshatraLordPlanet = getPlanetDetails(nakshatraInfo?.athipathi?.name);

      const planetObj = {
        planetId: planetMasterInfo?.planetId ?? (p.name === 'Lagna' ? -1 : (p.name === 'Maandi' ? 10 : 0)),
        name: p.name,
        nameTa: p.name === 'Lagna' ? 'லக்னம்' : (p.name === 'Maandi' ? 'மாந்தி' : (planetMasterInfo?.nameTa || p.nameTa || p.name)),
        nameHi: planetMasterInfo?.nameHi || p.name,
        nameTe: planetMasterInfo?.nameTe || p.name,
        nameKn: planetMasterInfo?.nameKn || p.name,
        nameMl: planetMasterInfo?.nameMl || p.name,
        shortName: p.name === 'Lagna' ? 'Lagna' : (planetMasterInfo?.shortName || (p.name === 'Maandi' ? 'Maa' : p.name)),
        shortNameTa: p.name === 'Lagna' ? 'ல' : (planetMasterInfo?.shortNameTa || (p.name === 'Maandi' ? 'மா' : p.nameTa || '')),
        longitude: p.longitude,
        speed: p.speed,
        isRetrograde: p.isRetrograde,

        // Raasi Details
        rasiId: p.rasiId,
        rasiName: rasiInfo?.name || '',
        rasiNameTa: rasiInfo?.nameTa || '',
        rasiNameHi: rasiInfo?.nameHi || '',
        rasiNameTe: rasiInfo?.nameTe || '',
        rasiNameKn: rasiInfo?.nameKn || '',
        rasiNameMl: rasiInfo?.nameMl || '',
        degreeInRasi: p.degreeInRasi,
        rawDegree: p.degreeInRasi,
        degree: formattedDegree,
        formattedDegree,

        // Raasi Athipathi (Multilingual)
        rasiAthipathi: {
          name: rasiInfo?.athipathi?.name || '',
          nameTa: rasiInfo?.athipathi?.nameTa || '',
          nameHi: rasiInfo?.athipathi?.nameHi || '',
          nameTe: rasiInfo?.athipathi?.nameTe || '',
          nameKn: rasiInfo?.athipathi?.nameKn || '',
          nameMl: rasiInfo?.athipathi?.nameMl || '',
          planetId: rasiInfo?.athipathi?.planetId
        },

        // Natchathiram Details (Multilingual)
        nakshatraId: p.nakshatraId,
        nakshatraName: nakshatraInfo?.name || '',
        nakshatraNameTa: nakshatraInfo?.nameTa || '',
        nakshatraNameHi: nakshatraInfo?.nameHi || '',
        nakshatraNameTe: nakshatraInfo?.nameTe || '',
        nakshatraNameKn: nakshatraInfo?.nameKn || '',
        nakshatraNameMl: nakshatraInfo?.nameMl || '',

        // Natchathiram Athipathi (Multilingual)
        nakshatraAthipathi: {
          name: nakshatraInfo?.athipathi?.name || '',
          nameTa: nakshatraLordPlanet?.nameTa || nakshatraInfo?.athipathi?.nameTa || '',
          nameHi: nakshatraLordPlanet?.nameHi || '',
          nameTe: nakshatraLordPlanet?.nameTe || '',
          nameKn: nakshatraLordPlanet?.nameKn || '',
          nameMl: nakshatraLordPlanet?.nameMl || '',
          planetId: nakshatraInfo?.athipathi?.planetId
        },
        natchAthipathi: {
          name: nakshatraInfo?.athipathi?.name || '',
          nameTa: nakshatraLordPlanet?.nameTa || nakshatraInfo?.athipathi?.nameTa || '',
          nameHi: nakshatraLordPlanet?.nameHi || '',
          nameTe: nakshatraLordPlanet?.nameTe || '',
          nameKn: nakshatraLordPlanet?.nameKn || '',
          nameMl: nakshatraLordPlanet?.nameMl || '',
          planetId: nakshatraInfo?.athipathi?.planetId
        },

        // Natchathira Padam (1 to 4)
        pada: p.pada,
        padaNumber: (p.nakshatraId * 4) + p.pada,

        // Natch Pada Athipathi (Navamsa Lord) (Multilingual)
        navamsaRasiId: p.navamsaRasiId,
        navamsaRasiName: navamsaRasiInfo?.name || '',
        navamsaRasiNameTa: navamsaRasiInfo?.nameTa || '',
        padamAthipathi: {
          name: navamsaRasiInfo?.athipathi?.name || '',
          nameTa: navamsaRasiInfo?.athipathi?.nameTa || '',
          nameHi: navamsaRasiInfo?.athipathi?.nameHi || '',
          nameTe: navamsaRasiInfo?.athipathi?.nameTe || '',
          nameKn: navamsaRasiInfo?.athipathi?.nameKn || '',
          nameMl: navamsaRasiInfo?.athipathi?.nameMl || '',
          planetId: navamsaRasiInfo?.athipathi?.planetId
        },
        natchPadaAthipathi: {
          name: navamsaRasiInfo?.athipathi?.name || '',
          nameTa: navamsaRasiInfo?.athipathi?.nameTa || '',
          nameHi: navamsaRasiInfo?.athipathi?.nameHi || '',
          nameTe: navamsaRasiInfo?.athipathi?.nameTe || '',
          nameKn: navamsaRasiInfo?.athipathi?.nameKn || '',
          nameMl: navamsaRasiInfo?.athipathi?.nameMl || '',
          planetId: navamsaRasiInfo?.athipathi?.planetId
        },
        ...(p.maandiDetails ? { maandiDetails: p.maandiDetails } : {})
      };

      rasiGrid[p.rasiId].push(planetObj);
      navamsaGrid[p.navamsaRasiId].push(planetObj);

      return planetObj;
    });

    // 12 houses metadata with constituent nakshatras and padas
    const rasiHouses = RASIS_DATA.map(r => {
      const padasForRasi = NAKSHATRA_PADAS_DATA.slice(r.rasiId * 9, (r.rasiId + 1) * 9);
      const starGroups = [];
      padasForRasi.forEach(item => {
        let grp = starGroups.find(g => g.nakshatraId === item.nakshatraId);
        if (!grp) {
          grp = {
            nakshatraId: item.nakshatraId,
            name: item.nakshatraName?.name || '',
            nameTa: item.nakshatraName?.nameTa || '',
            nameHi: item.nakshatraName?.nameHi || '',
            nameTe: item.nakshatraName?.nameTe || '',
            nameKn: item.nakshatraName?.nameKn || '',
            nameMl: item.nakshatraName?.nameMl || '',
            nakshatraAthipathi: item.nakshatraAthipathi,
            padas: []
          };
          starGroups.push(grp);
        }
        grp.padas.push({
          pada: item.pada,
          padaNumber: item.padaNumber,
          padaName: item.padaName,
          padamAthipathi: item.padamAthipathi,
          natchPadaAthipathi: item.padamAthipathi,
          navamsaRasiId: item.navamsaRasiId,
          navamsaRasiName: item.navamsaRasiName
        });
      });

      return {
        rasiId: r.rasiId,
        name: r.name,
        nameTa: r.nameTa,
        nameHi: r.nameHi,
        nameTe: r.nameTe,
        nameKn: r.nameKn,
        nameMl: r.nameMl,
        rasiAthipathi: r.athipathi,
        element: r.element,
        mobility: r.mobility,
        nakshatras: starGroups
      };
    });

    rasiGrid.forEach(house => {
      house.sort((a, b) => a.degreeInRasi - b.degreeInRasi);
    });

    // Degree calculations for Udhayam & Aarudam (30° per Rasi)
    // Udhayam (Hour hand: 30° across 60 min -> 0.5° or 30' per min)
    const udhayamDegreeInRasi = Number(((parsedMinute / 60) * 30).toFixed(4));
    const uDeg = Math.floor(udhayamDegreeInRasi);
    const uMin = Math.round((udhayamDegreeInRasi - uDeg) * 60);
    const udhayamFormattedDegree = `${uDeg}°${String(uMin).padStart(2, '0')}'`;

    // Aarudam (Minute hand: 30° across 5 min -> 6° per min)
    const minuteInRasi = parsedMinute % 5;
    const aarudamDegreeInRasi = Number(((minuteInRasi / 5) * 30).toFixed(4));
    const aDeg = Math.floor(aarudamDegreeInRasi);
    const aMin = Math.round((aarudamDegreeInRasi - aDeg) * 60);
    const aarudamFormattedDegree = `${aDeg}°${String(aMin).padStart(2, '0')}'`;

    const calculationResult = {
      udhayamIndex,
      aarudamIndex,
      udhayamDegreeInRasi,
      aarudamDegreeInRasi,
      udhayamFormattedDegree,
      aarudamFormattedDegree,
      udhayamRasi,
      aarudamRasi,
      udhayamToAarudam,
      aarudamToUdhayam,
      prediction: bhavaRecord || {
        bhava: udhayamToAarudam,
        status: { en: 'Good', ta: 'சாதகம்' },
        percentage: 75
      },
      date: date || new Date().toISOString().split('T')[0],
      hour: parsedHour,
      minute: parsedMinute,
      ampm: String(ampm).toUpperCase(),
      placeName,
      latitude: latNum,
      longitude: lngNum,
      ayanamsa
    };

    return res.status(200).json({
      success: true,
      data: {
        calculationResult,
        chartData: {
          rasiGrid,
          navamsaGrid,
          rasiHouses,
          planets: enrichedPlanets
        },
        rasiGrid,
        rasiHouses
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * Master Data Endpoint: 108 Nakshatra Padas (with 6 languages, degree spans & lords)
 */
export const getMasterNakshatraPadas = async (req, res) => {
  try {
    const { rasiId, nakshatraId, pada, number, search } = req.query;
    let records;
    try {
      const query = {};
      if (rasiId !== undefined && rasiId !== 'all') query.rasiId = Number(rasiId);
      if (nakshatraId !== undefined && nakshatraId !== 'all') query.nakshatraId = Number(nakshatraId);
      if (pada !== undefined && pada !== 'all') query.pada = Number(pada);
      if (number) query.padaNumber = Number(number);

      if (search && search.trim()) {
        const regex = new RegExp(search.trim(), 'i');
        query.$or = [
          { 'nakshatraName.name': regex },
          { 'nakshatraName.nameTa': regex },
          { 'rasiName.name': regex },
          { 'rasiName.nameTa': regex },
          { 'padaName.name': regex },
          { 'padaName.nameTa': regex },
          { 'akshara.en': regex },
          { 'akshara.ta': regex }
        ];
      }

      records = await NakshatraPadaMaster.find(query).sort({ padaNumber: 1 });
    } catch {
      records = null;
    }

    if (!records || records.length === 0) {
      records = NAKSHATRA_PADAS_DATA;
      if (rasiId !== undefined && rasiId !== 'all') {
        records = records.filter(item => item.rasiId === Number(rasiId));
      }
      if (nakshatraId !== undefined && nakshatraId !== 'all') {
        records = records.filter(item => item.nakshatraId === Number(nakshatraId));
      }
      if (pada !== undefined && pada !== 'all') {
        records = records.filter(item => item.pada === Number(pada));
      }
      if (number) {
        records = records.filter(item => item.padaNumber === Number(number));
      }
      if (search && search.trim()) {
        const s = search.trim().toLowerCase();
        records = records.filter(item =>
          item.nakshatraName?.name?.toLowerCase().includes(s) ||
          item.nakshatraName?.nameTa?.includes(s) ||
          item.rasiName?.name?.toLowerCase().includes(s) ||
          item.rasiName?.nameTa?.includes(s) ||
          item.akshara?.en?.toLowerCase().includes(s) ||
          item.akshara?.ta?.includes(s)
        );
      }
    }

    return res.status(200).json({ success: true, count: records.length, data: records });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * Master Data Endpoint: Specific Nakshatra Pada by Pada Number (1-108)
 */
export const getNakshatraPadaByNumber = async (req, res) => {
  try {
    const num = Number(req.params.number);
    if (!num || num < 1 || num > 108) {
      return res.status(400).json({ success: false, error: 'Invalid Pada number. Must be between 1 and 108.' });
    }

    let record;
    try {
      record = await NakshatraPadaMaster.findOne({ padaNumber: num });
    } catch {
      record = null;
    }

    if (!record) {
      record = NAKSHATRA_PADAS_DATA.find(item => item.padaNumber === num);
    }

    if (!record) {
      return res.status(404).json({ success: false, error: `Nakshatra Pada Number ${num} not found.` });
    }

    return res.status(200).json({ success: true, data: record });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * Jothidam Portal Main & Sub-Category Navigation Taxonomy
 */
export const getNavigationMenu = async (req, res) => {
  try {
    const menu = [
      {
        id: 'horoscopes',
        title: { en: 'Horoscope', ta: 'ஜாதகம்', hi: 'कुंडली', te: 'జాతకం', kn: 'ಜಾತಕ', ml: 'ജാതകം' },
        icon: '🕉️',
        hasDropdown: true,
        columns: [
          [
            { title: { en: 'Birth Chart Calculator', ta: 'ஜாதகக் கணிப்பு (D1 & D9)' }, desc: 'Vedic Kundli with Rasi & Navamsa charts', path: '/', badge: 'Popular' },
            { title: { en: 'South / North Indian Style', ta: 'தெற்கு / வடக்கு இந்திய வரைபடம்' }, desc: 'Dynamic chart styling toggle', path: '/' },
            { title: { en: 'Saved Horoscope Profiles', ta: 'சேமிக்கப்பட்ட ஜாதகங்கள்' }, desc: 'Saved kundli profile archives', path: '/saved' }
          ]
        ]
      },
      {
        id: 'zodiac_grahas',
        title: { en: 'Zodiac & Planets', ta: 'ராசிகள் & கிரகங்கள்', hi: 'राशि और ग्रह', te: 'రాశులు & గ్రహాలు', kn: 'ರಾಶಿಗಳು & ಗ್ರಹಗಳು', ml: 'രാശികളും ഗ്രഹങ്ങളും' },
        icon: '🪐',
        hasDropdown: true,
        columns: [
          [
            { title: { en: '12 Zodiac Signs (Rasis)', ta: '12 ராசிகள் முழு அட்டவணை' }, desc: 'Elements, ruling lords, and traits', path: '/rasis' },
            { title: { en: '27 Vedic Nakshatras', ta: '27 நட்சத்திரங்கள் & பாதங்கள்' }, desc: '108 Padas, deities, and ganas', path: '/nakshatras' },
            { title: { en: '108 Nakshatra Padas', ta: '108 நட்சத்திர பாதங்கள்' }, desc: 'Degree spans, Rasi/Pada Lords & Aksharas', path: '/nakshatra-padas', badge: '108 Master' }
          ],
          [
            { title: { en: '9 Navagrahas & Lords', ta: 'நவக்கிரகங்கள் & அதிபதிகள்' }, desc: 'Exaltation, debilitation & relations', path: '/planets' },
            { title: { en: '360° Kalachakram Wheel', ta: 'காலச்சக்கரம் 360° பாகை' }, desc: 'Degree-by-degree zodiac lookup', path: '/kalachakram' }
          ]
        ]
      },
      {
        id: 'kp_astrology',
        title: { en: 'KP Astrology', ta: 'KP ஜோதிடம்', hi: 'केपी ज्योतिष', te: 'కేపీ జ్యోతిష్యం', kn: 'ಕೆಪಿ ಜ್ಯೋತಿಷ್ಯ', ml: 'കെ.പി ജ്യോതിഷം' },
        icon: '🔮',
        hasDropdown: true,
        columns: [
          [
            { title: { en: 'KP Horary Numbers 1-249', ta: 'KP ஹோரரி 1-249 அட்டவணை' }, desc: 'Sub-Lord divisions with exact limits', path: '/kp-horary', badge: 'KP Master' },
            { title: { en: 'Sub-Lord Longitudes (DMS)', ta: 'உப அதிபதி பாகை எல்லைகள்' }, desc: 'Exact degree, minute, second spans', path: '/kp-horary' },
            { title: { en: 'Sign Boundary Divisions', ta: 'ராசி எல்லைப் பிரிவுகள்' }, desc: 'KP sign split boundary points', path: '/kp-horary' }
          ]
        ]
      },
      {
        id: 'panchangam',
        title: { en: 'Panchangam', ta: 'பஞ்சாங்கம்', hi: 'पंचांग', te: 'పంచాంగం', kn: 'ಪಂಚಾಂಗ', ml: 'പഞ്ചാംഗം' },
        icon: '🌕',
        hasDropdown: true,
        columns: [
          [
            { title: { en: '30 Lunar Tithis', ta: '30 திதிகள் அட்டவணை' }, desc: 'Shukla & Krishna paksha deities', path: '/tithis' },
            { title: { en: '27 Nithya Yogas', ta: '27 நித்திய யோகங்கள்' }, desc: 'Auspicious & inauspicious yogas', path: '/yogas' }
          ],
          [
            { title: { en: '11 Vedic Karanas', ta: '11 கரணங்கள் அட்டவணை' }, desc: '7 Movable and 4 Fixed karanas', path: '/karanas' },
            { title: { en: 'Tamil Calendar (60 Years)', ta: '60 தமிழ் வருடங்கள் & மாதங்கள்' }, desc: '60 cycle years and solar months', path: '/tamil-calendar' }
          ]
        ]
      },
      {
        id: 'admin',
        title: { en: 'Admin', ta: 'நிர்வாகம்', hi: 'प्रशासन', te: 'పరిపాలన', kn: 'ಆಡಳಿತ', ml: 'ഭരണവിഭാഗം' },
        icon: '⚙️',
        hasDropdown: true,
        columns: [
          [
            { title: { en: 'Master Tables Administration', ta: 'அட்டவணைகள் நிர்வாகம்' }, desc: 'Manage 11 master data collections', path: '/admin' },
            { title: { en: 'Admin Login', ta: 'நிர்வாக நுழைவு (Login)' }, desc: 'Secure credentials authorization', path: '/admin/login' }
          ]
        ]
      }
    ];

    return res.status(200).json({ success: true, data: menu });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * Enterprise Dynamic XML Sitemap Endpoint for Search Engine Bots
 */
export const getSitemapXml = async (req, res) => {
  try {
    const baseUrl = process.env.CLIENT_URL || 'https://jothidam.portal';
    const pages = [
      { path: '/', priority: '1.0', changefreq: 'daily' },
      { path: '/kp-horary', priority: '0.9', changefreq: 'weekly' },
      { path: '/rasis', priority: '0.8', changefreq: 'monthly' },
      { path: '/nakshatras', priority: '0.8', changefreq: 'monthly' },
      { path: '/planets', priority: '0.8', changefreq: 'monthly' },
      { path: '/kalachakram', priority: '0.8', changefreq: 'monthly' },
      { path: '/tithis', priority: '0.7', changefreq: 'monthly' },
      { path: '/yogas', priority: '0.7', changefreq: 'monthly' },
      { path: '/karanas', priority: '0.7', changefreq: 'monthly' },
      { path: '/tamil-calendar', priority: '0.7', changefreq: 'monthly' },
      { path: '/saved', priority: '0.6', changefreq: 'daily' }
    ];

    const languages = ['ta', 'en', 'hi', 'te', 'kn', 'ml'];
    const today = new Date().toISOString().split('T')[0];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;

    pages.forEach((p) => {
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}${p.path}</loc>\n`;
      xml += `    <lastmod>${today}</lastmod>\n`;
      xml += `    <changefreq>${p.changefreq}</changefreq>\n`;
      xml += `    <priority>${p.priority}</priority>\n`;
      languages.forEach((lng) => {
        xml += `    <xhtml:link rel="alternate" hreflang="${lng}" href="${baseUrl}${p.path}${p.path.includes('?') ? '&' : '?'}lng=${lng}" />\n`;
      });
      xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}${p.path}" />\n`;
      xml += `  </url>\n`;
    });

    xml += `</urlset>`;

    res.header('Content-Type', 'application/xml');
    res.send(xml);
  } catch (error) {
    res.status(500).send('Error generating sitemap');
  }
};

/**
 * Enterprise Robots.txt Endpoint
 */
export const getRobotsTxt = async (req, res) => {
  const baseUrl = process.env.CLIENT_URL || 'https://jothidam.portal';
  const robots = `User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /admin/\nDisallow: /api/\nCrawl-delay: 1\nSitemap: ${baseUrl}/sitemap.xml\n`;
  res.header('Content-Type', 'text/plain');
  res.send(robots);
};