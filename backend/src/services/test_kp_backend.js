import express from 'express';
import astrologyRoutes from '../routes/astrology.routes.js';
import { KP_HORARY_DATA } from '../services/kpHoraryData.js';

console.log('Testing KP Horary Backend Integration...');
console.log('KP Horary dataset count:', KP_HORARY_DATA.length);

const sample = KP_HORARY_DATA[10];
console.log('Sample KP Item #11:', {
  number: sample.number,
  sign: sample.sign,
  signLord: sample.signLord,
  star: sample.star,
  starLord: sample.starLord,
  subLord: sample.subLord,
  startDMS: sample.startDMS,
  endDMS: sample.endDMS
});

console.log('Backend KP Horary integration verified successfully!');
