import mongoose from 'mongoose';

const athipathiSchema = new mongoose.Schema({
  planetId: { type: Number, required: true },
  name: { type: String, required: true },
  nameTa: { type: String, required: true },
  nameHi: { type: String, default: '' },
  nameTe: { type: String, default: '' },
  nameKn: { type: String, default: '' },
  nameMl: { type: String, default: '' }
}, { _id: false });

const kalachakramMasterSchema = new mongoose.Schema({
  degree: {
    type: Number,
    required: true,
    unique: true,
    min: 0,
    max: 359,
    index: true
  },
  degreeDisplay: {
    type: String,
    required: true // e.g. "0° - 1°"
  },
  startDegree: {
    type: Number,
    required: true
  },
  endDegree: {
    type: Number,
    required: true
  },
  
  // 1. Rasi (Zodiac Sign) Details
  rasiId: {
    type: Number,
    required: true,
    min: 0,
    max: 11,
    index: true
  },
  rasiName: {
    type: String,
    required: true
  },
  rasiNameTa: {
    type: String,
    required: true
  },
  rasiNameHi: { type: String, default: '' },
  rasiNameTe: { type: String, default: '' },
  rasiNameKn: { type: String, default: '' },
  rasiNameMl: { type: String, default: '' },
  degreeInRasi: {
    type: Number,
    required: true,
    min: 0,
    max: 29
  },
  rasiAthipathi: {
    type: athipathiSchema,
    required: true
  },

  // 2. Nakshatra (Star) Details
  nakshatraId: {
    type: Number,
    required: true,
    min: 0,
    max: 26,
    index: true
  },
  nakshatraName: {
    type: String,
    required: true
  },
  nakshatraNameTa: {
    type: String,
    required: true
  },
  nakshatraNameHi: { type: String, default: '' },
  nakshatraNameTe: { type: String, default: '' },
  nakshatraNameKn: { type: String, default: '' },
  nakshatraNameMl: { type: String, default: '' },
  nakshatraAthipathi: {
    type: athipathiSchema,
    required: true
  },

  // 3. Nakshatra Pada (1 to 4)
  pada: {
    type: Number,
    required: true,
    min: 1,
    max: 4
  },
  totalPadaIndex: {
    type: Number,
    required: true,
    min: 0,
    max: 107
  },

  // 4. Navamsa Rasi Details
  navamsaRasiId: {
    type: Number,
    required: true,
    min: 0,
    max: 11,
    index: true
  },
  navamsaRasiName: {
    type: String,
    required: true
  },
  navamsaRasiNameTa: {
    type: String,
    required: true
  },
  navamsaRasiNameHi: { type: String, default: '' },
  navamsaRasiNameTe: { type: String, default: '' },
  navamsaRasiNameKn: { type: String, default: '' },
  navamsaRasiNameMl: { type: String, default: '' },
  navamsaAthipathi: {
    type: athipathiSchema,
    required: true
  }
}, {
  timestamps: true
});

kalachakramMasterSchema.index({ rasiId: 1, pada: 1 });
kalachakramMasterSchema.index({ nakshatraId: 1, pada: 1 });

export default mongoose.model('KalachakramMaster', kalachakramMasterSchema);
