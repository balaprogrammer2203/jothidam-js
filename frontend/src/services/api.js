import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
});

export const generateKundali = (data) => API.post('/astrology/generate-chart', data);
export const calculateKadikaraPrasannamApi = (data) => API.post('/astrology/kadikara-prasannam/calculate', data);
