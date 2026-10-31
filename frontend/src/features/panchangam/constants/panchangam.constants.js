// Default city preference (Dindigul)
export const DEFAULT_CITY = {
  name: 'Dindigul',
  nameTa: 'திண்டுக்கல்',
  lat: 10.3673,
  lng: 77.9803,
  names: {
    en: 'Dindigul',
    ta: 'திண்டுக்கல்',
    hi: 'डिंडीगुल',
    te: 'దిండిగల్',
    kn: 'ದಿಂಡಿಗಲ್',
    ml: 'ദിണ്ടുക്കൽ'
  }
};

export const PRESET_CITIES = [
  { name: 'Dindigul', nameTa: 'திண்டுக்கல்', lat: 10.3673, lng: 77.9803 },
  { name: 'Chennai', nameTa: 'சென்னை', lat: 13.0827, lng: 80.2707 },
  { name: 'Madurai', nameTa: 'மதுரை', lat: 9.9252, lng: 78.1198 },
  { name: 'Coimbatore', nameTa: 'கோயம்புத்தூர்', lat: 11.0168, lng: 76.9558 },
  { name: 'Tiruchirappalli', nameTa: 'திருச்சிராப்பள்ளி', lat: 10.7905, lng: 78.7047 },
  { name: 'Salem', nameTa: 'சேலம்', lat: 11.6643, lng: 78.1460 },
  { name: 'Tirunelveli', nameTa: 'திருநெல்வேலி', lat: 8.7139, lng: 77.7567 },
  { name: 'Thanjavur', nameTa: 'தஞ்சாவூர்', lat: 10.7870, lng: 79.1378 },
  { name: 'Vellore', nameTa: 'வேலூர்', lat: 12.9165, lng: 79.1325 },
  { name: 'Erode', nameTa: 'ஈரோடு', lat: 11.3410, lng: 77.7172 },
  { name: 'Puducherry', nameTa: 'புதுச்சேரி', lat: 11.9416, lng: 79.8083 },
  { name: 'Bengaluru', nameTa: 'பெங்களூரு', lat: 12.9716, lng: 77.5946 },
  { name: 'Mumbai', nameTa: 'மும்பை', lat: 19.0760, lng: 72.8777 },
  { name: 'New Delhi', nameTa: 'புது தில்லி', lat: 28.6139, lng: 77.2090 },
  { name: 'Singapore', nameTa: 'சிங்கப்பூர்', lat: 1.3521, lng: 103.8198 },
  { name: 'London', nameTa: 'லண்டன்', lat: 51.5074, lng: -0.1278 }
];

export const PANCHANGAM_CITY_STORAGE_KEY = 'jothidam_panchangam_city';

// Long-term storage helper: defaults to Dindigul for first-time user, otherwise recalls user's selected city
export const getSavedCity = () => {
  if (typeof window === 'undefined') return DEFAULT_CITY;
  try {
    const saved = localStorage.getItem(PANCHANGAM_CITY_STORAGE_KEY) || localStorage.getItem('jothidam_user_city');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && parsed.name && typeof parsed.lat === 'number' && typeof parsed.lng === 'number') {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Failed to read saved city preference:', e);
  }
  return DEFAULT_CITY;
};

// Store selected city long-term in localStorage for subsequent visits
export const saveCityPreference = (city) => {
  if (typeof window === 'undefined' || !city || !city.name) return;
  try {
    const toSave = {
      name: city.name,
      nameTa: city.nameTa || city.name,
      lat: Number(city.lat),
      lng: Number(city.lng)
    };
    localStorage.setItem(PANCHANGAM_CITY_STORAGE_KEY, JSON.stringify(toSave));
    localStorage.setItem('jothidam_user_city', JSON.stringify(toSave));
  } catch (e) {
    console.warn('Failed to save city preference:', e);
  }
};
