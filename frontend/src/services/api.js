import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
});

export const generateKundali = (data) => API.post('/astrology/generate-chart', data);
export const calculateKadikaraPrasannamApi = (data) => API.post('/astrology/kadikara-prasannam/calculate', data);
export const calculateJamakolPrasannamApi = (data) => API.post('/astrology/jamakkol-prasannam/calculate', data);
export const getMasterJamakolPrasannamApi = (lang) => API.get(`/astrology/master/jamakkol-prasannam${lang ? `?lang=${lang}` : ''}`);
export const getPlanetDignitiesMasterApi = (params) => API.get('/astrology/master/planet-dignities', { params });
