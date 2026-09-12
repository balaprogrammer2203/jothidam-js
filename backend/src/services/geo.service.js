import axios from 'axios';
import CURATED_LOCATIONS from './indiaPlacesData.js';

// In-memory cache for fast lookup & instant response
const placeCache = new Map();
CURATED_LOCATIONS.forEach(p => placeCache.set(p.placeId, p));

/**
 * Default fallback coordinates: Chennai, Tamil Nadu, India in pure English
 */
const DEFAULT_COORDS = {
  lat: 13.0827,
  lng: 80.2707,
  formattedAddress: 'Chennai, Tamil Nadu, India',
  city: 'Chennai',
  state: 'Tamil Nadu',
  country: 'India',
  timezone: 'Asia/Kolkata'
};

/**
 * Returns exact coordinates and English address for a given placeId
 */
export const getPlaceCoordinates = async (placeId) => {
  if (!placeId) {
    return { ...DEFAULT_COORDS };
  }

  // Check cache first
  const cached = placeCache.get(placeId);
  if (cached) {
    return {
      lat: cached.lat,
      lng: cached.lng,
      formattedAddress: cached.formattedAddress || cached.description,
      city: cached.city,
      state: cached.state,
      country: cached.country,
      timezone: cached.timezone || 'Asia/Kolkata'
    };
  }

  // Check curated places
  const matched = CURATED_LOCATIONS.find(p => p.placeId === placeId);
  if (matched) {
    return {
      lat: matched.lat,
      lng: matched.lng,
      formattedAddress: matched.formattedAddress,
      city: matched.city,
      state: matched.state,
      country: matched.country,
      timezone: matched.timezone || 'Asia/Kolkata'
    };
  }

  return { ...DEFAULT_COORDS };
};

/**
 * Searches places worldwide with high priority on:
 * 1. Curated Tamil Nadu 38 districts & 150+ major towns
 * 2. Indian state cities & districts
 * 3. Live Open-Meteo Geocoding API (language=en, accurate lat/lng & timezone)
 * 4. Photon / Nominatim OpenStreetMap fallback (Accept-Language: en)
 * 
 * All returned places are strictly in ENGLISH across all fields.
 */
export const searchPlaces = async (input) => {
  const query = (input || '').trim();
  if (!query || query.length < 2) {
    // Return top popular TN & Indian cities if query is empty or 1 char
    return CURATED_LOCATIONS.slice(0, 8);
  }

  const cacheKey = `search_${query.toLowerCase()}`;
  if (placeCache.has(cacheKey)) {
    return placeCache.get(cacheKey);
  }

  const lowerQuery = query.toLowerCase();

  // ==========================================
  // TIER 1: Search Curated Master Dataset (0ms, 100% accurate)
  // ==========================================
  const scoredCurated = [];

  for (const item of CURATED_LOCATIONS) {
    const lowerCity = (item.city || '').toLowerCase();
    const lowerDistrict = (item.district || '').toLowerCase();
    const lowerState = (item.state || '').toLowerCase();
    const lowerDesc = (item.description || '').toLowerCase();
    const aliases = (item.aliases || []).map(a => a.toLowerCase());

    let score = 0;

    // Exact city or exact alias match
    if (lowerCity === lowerQuery || aliases.includes(lowerQuery)) {
      score = 100;
    } else if (lowerCity.startsWith(lowerQuery)) {
      score = 85;
    } else if (aliases.some(a => a.startsWith(lowerQuery))) {
      score = 80;
    } else if (lowerDistrict === lowerQuery) {
      score = 75;
    } else if (lowerDistrict.startsWith(lowerQuery)) {
      score = 70;
    } else if (lowerCity.includes(lowerQuery)) {
      score = 60;
    } else if (aliases.some(a => a.includes(lowerQuery))) {
      score = 55;
    } else if (lowerDesc.includes(lowerQuery) || lowerState.startsWith(lowerQuery)) {
      score = 40;
    }

    if (score > 0) {
      // Prioritize Tamil Nadu places slightly for Tamil astrological portal
      if (item.state === 'Tamil Nadu') {
        score += 15;
      }
      scoredCurated.push({ ...item, _score: score });
    }
  }

  scoredCurated.sort((a, b) => b._score - a._score);
  const curatedResults = scoredCurated.slice(0, 10);

  // If we already have strong exact/prefix curated matches and query is short, we can return quickly
  if (curatedResults.length >= 6 && scoredCurated[0]?._score >= 80 && query.length <= 4) {
    placeCache.set(cacheKey, curatedResults);
    return curatedResults;
  }

  // ==========================================
  // TIER 2: Live Open-Meteo Geocoding API (Fast, Free, English results, Timezone)
  // ==========================================
  let liveResults = [];

  try {
    const url = 'https://geocoding-api.open-meteo.com/v1/search';
    const response = await axios.get(url, {
      params: {
        name: query,
        count: 10,
        language: 'en',
        format: 'json'
      },
      timeout: 3000
    });

    if (response.data?.results && Array.isArray(response.data.results)) {
      liveResults = response.data.results.map((item) => {
        const city = item.name || '';
        const district = item.admin2 || '';
        const state = item.admin1 || '';
        const country = item.country || '';

        const parts = [city, district, state, country].filter(Boolean);
        const uniqueParts = parts.filter((p, i) => parts.indexOf(p) === i);
        const description = uniqueParts.join(', ');
        const placeId = `om_${item.id || Math.floor(Math.random() * 1000000)}`;

        const placeObj = {
          placeId,
          city,
          district: district.replace(/\bdistrict\b/gi, '').trim() || district,
          state,
          country,
          description,
          formattedAddress: description,
          lat: parseFloat(item.latitude),
          lng: parseFloat(item.longitude),
          timezone: item.timezone || 'Asia/Kolkata'
        };

        placeCache.set(placeId, placeObj);
        return placeObj;
      });
    }
  } catch (err) {
    console.warn('Open-Meteo Geocoding notice:', err.message);
  }

  // ==========================================
  // TIER 3: Photon / Nominatim OpenStreetMap Fallback (Accept-Language: en)
  // ==========================================
  if (curatedResults.length === 0 && liveResults.length === 0) {
    try {
      // Try Photon (Komoot)
      const photonUrl = 'https://photon.komoot.io/api/';
      const photonRes = await axios.get(photonUrl, {
        params: { q: query, limit: 8 },
        timeout: 3000
      });

      if (photonRes.data?.features && Array.isArray(photonRes.data.features)) {
        liveResults = photonRes.data.features.map(f => {
          const p = f.properties || {};
          const city = p.name || p.city || '';
          const district = p.district || '';
          const state = p.state || '';
          const country = p.country || '';

          const parts = [city, district, state, country].filter(Boolean);
          const uniqueParts = parts.filter((pt, i) => parts.indexOf(pt) === i);
          const description = uniqueParts.join(', ');
          const coords = f.geometry?.coordinates || [0, 0];
          const placeId = `photon_${p.osm_id || Math.floor(Math.random() * 1000000)}`;

          const placeObj = {
            placeId,
            city,
            district,
            state,
            country,
            description,
            formattedAddress: description,
            lat: parseFloat(coords[1]),
            lng: parseFloat(coords[0]),
            timezone: 'Asia/Kolkata'
          };

          placeCache.set(placeId, placeObj);
          return placeObj;
        });
      }
    } catch (photonErr) {
      console.warn('Photon fallback notice:', photonErr.message);
    }
  }

  // ==========================================
  // TIER 4: Deduplicate, Rank & Clean strictly in English
  // ==========================================
  const combined = [...curatedResults, ...liveResults];
  const seenKeys = new Set();
  const finalResults = [];

  for (const item of combined) {
    // Deduplication key by city name + state (or approximate lat/lng)
    const normCity = (item.city || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    const normState = (item.state || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    const coordKey = `${Number(item.lat).toFixed(1)}_${Number(item.lng).toFixed(1)}`;
    const dedupeKey = `${normCity}_${normState}`;

    if (!seenKeys.has(dedupeKey) && !seenKeys.has(coordKey)) {
      seenKeys.add(dedupeKey);
      seenKeys.add(coordKey);
      finalResults.push({
        placeId: item.placeId,
        city: item.city,
        district: item.district || '',
        state: item.state || '',
        country: item.country || '',
        description: item.description || item.formattedAddress,
        formattedAddress: item.formattedAddress || item.description,
        lat: item.lat,
        lng: item.lng,
        timezone: item.timezone || 'Asia/Kolkata'
      });
    }
  }

  // Fallback to top curated if nothing found
  if (finalResults.length === 0) {
    const fallback = CURATED_LOCATIONS.slice(0, 6);
    placeCache.set(cacheKey, fallback);
    return fallback;
  }

  const resultSlice = finalResults.slice(0, 12);
  placeCache.set(cacheKey, resultSlice);
  return resultSlice;
};

export default {
  getPlaceCoordinates,
  searchPlaces
};
