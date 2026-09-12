import { Router } from 'express';
import { 
  generateSouthIndianChart, 
  handlePlaceAutocomplete,
  saveUserHoroscope,
  getUserHoroscopes,
  getUserHoroscopeById,
  getMasterRasis,
  getMasterNakshatras,
  getMasterNakshatraPadas,
  getNakshatraPadaByNumber,
  getMasterPlanets,
  getKalachakramMaster,
  getKalachakramByDegree,
  getTithiMaster,
  getYogaMaster,
  getKaranaMaster,
  getTamilYearMaster,
  getTamilMonthMaster,
  getMasterAyanamsas,
  getMasterKPHorary,
  getKPHoraryByNumber,
  getMasterKadikaraPrasannam,
  getKadikaraBhavaByNumber,
  calculateKadikaraPrasannamBE,
  getNavigationMenu
} from '../controllers/astrology.controller.js';

const router = Router();

// Place autocomplete & chart calculation
router.get('/places', handlePlaceAutocomplete);
router.post('/generate-chart', generateSouthIndianChart);

// Kadikara Prasannam Full Calculation & Planetary Chart Engine
router.post('/kadikara-prasannam/calculate', calculateKadikaraPrasannamBE);

// User Horoscope Profile Management (CRUD)
router.post('/save-horoscope', saveUserHoroscope);
router.get('/horoscopes', getUserHoroscopes);
router.get('/horoscopes/:id', getUserHoroscopeById);

// Dynamic Jothidam Portal Mega Menu Navigation Taxonomy
router.get('/navigation', getNavigationMenu);

// Master Reference Tables (12 Rasis, 27 Nakshatras, 9 Grahas with Athipathi, Supported Ayanamsas)
router.get('/master/ayanamsas', getMasterAyanamsas);
router.get('/master/rasis', getMasterRasis);
router.get('/master/nakshatras', getMasterNakshatras);
router.get('/master/nakshatra-padas', getMasterNakshatraPadas);
router.get('/master/nakshatra-padas/:number', getNakshatraPadaByNumber);
router.get('/master/planets', getMasterPlanets);

// KP Horary Numbers 1-249 Master Table
router.get('/master/kp-horary', getMasterKPHorary);
router.get('/master/kp-horary/:number', getKPHoraryByNumber);

// Kalachakram 360 Degrees Master Table (0 to 359 degrees)
router.get('/master/kalachakram', getKalachakramMaster);
router.get('/master/kalachakram/:degree', getKalachakramByDegree);

// Panchangam Master Tables (30 Tithis, 27 Yogas, 11 Karanas, 60 Tamil Years, 12 Tamil Months)
router.get('/master/tithis', getTithiMaster);
router.get('/master/yogas', getYogaMaster);
router.get('/master/karanas', getKaranaMaster);
router.get('/master/tamil-years', getTamilYearMaster);
router.get('/master/tamil-months', getTamilMonthMaster);

// Kadikara Prasannam Master Table (12 Bhavas, Sacred Rules, Concept & FAQs in 6 Languages)
router.get('/master/kadikara-prasannam', getMasterKadikaraPrasannam);
router.get('/master/kadikara-prasannam/bhavas/:bhava', getKadikaraBhavaByNumber);

export default router;
