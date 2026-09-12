# Enterprise Jothidam Portal (MERN Stack + Swiss Ephemeris)

Full-featured Vedic Astrology web portal built with React, Node.js, Express, MongoDB, Swiss Ephemeris (`sweph`), and Google Places Integration.

## Features
- **Swiss Ephemeris Calculation Engine (`sweph`)**:
  - Lahiri Ayanamsa computation
  - Accurate Ascendant (Lagnam) calculation using Julian Day & Geographical coordinates
  - Planetary longitude, retrograde status, Rasi, Nakshatra, Pada & Navamsa Rasi mapping
- **Enterprise MongoDB Schema**:
  - `HoroscopeProfile` with 2dsphere GeoJSON spatial indexing and structured astronomical sub-documents
- **Google Places Autocomplete & Geocoding**:
  - Dynamic city suggestion in Tamil & exact lat/lng resolution
- **Interactive South Indian Chart Layout**:
  - 12-Rasi CSS Grid adhering to Vedic South Indian tradition

## Quick Start

### 1. Install dependencies
```bash
npm install
cd backend && npm install
cd ../frontend && npm install
cd ..
```

### 2. Configure Backend Environment
Update `backend/.env` with your API keys:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/jothidam_db
CLIENT_URL=http://localhost:5173
GOOGLE_PLACES_API_KEY=YOUR_GOOGLE_PLACES_API_KEY_HERE
```

### 3. Run Concurrently
```bash
npm run dev
```
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
