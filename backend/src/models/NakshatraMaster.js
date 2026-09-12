import mongoose from 'mongoose';

const nakshatraRasiSpanSchema = new mongoose.Schema({
  rasiId: { type: Number, required: true, min: 0, max: 11 },
  rasiName: { type: String, required: true },
  rasiNameTa: { type: String, required: true },
  rasiNameHi: { type: String, default: '' },
  rasiNameTe: { type: String, default: '' },
  rasiNameKn: { type: String, default: '' },
  rasiNameMl: { type: String, default: '' },
  padas: [{ type: Number, min: 1, max: 4 }]
}, { _id: false });

const nakshatraMasterSchema = new mongoose.Schema({
  nakshatraId: {
    type: Number,
    required: true,
    unique: true,
    min: 0,
    max: 26,
    index: true
  },
  order: {
    type: Number,
    required: true,
    min: 1,
    max: 27
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  nameTa: {
    type: String,
    required: true,
    trim: true
  },
  nameHi: { type: String, trim: true, default: '' },
  nameTe: { type: String, trim: true, default: '' },
  nameKn: { type: String, trim: true, default: '' },
  nameMl: { type: String, trim: true, default: '' },

  sanskritName: {
    type: String,
    trim: true
  },
  athipathi: {
    planetId: { type: Number, required: true },
    name: { type: String, required: true },
    nameTa: { type: String, required: true },
    nameHi: { type: String, default: '' },
    nameTe: { type: String, default: '' },
    nameKn: { type: String, default: '' },
    nameMl: { type: String, default: '' }
  },
  deity: {
    name: { type: String, default: '' },
    nameTa: { type: String, default: '' },
    nameHi: { type: String, default: '' },
    nameTe: { type: String, default: '' },
    nameKn: { type: String, default: '' },
    nameMl: { type: String, default: '' }
  },
  gana: {
    name: { type: String, default: '' },
    nameTa: { type: String, default: '' },
    nameHi: { type: String, default: '' },
    nameTe: { type: String, default: '' },
    nameKn: { type: String, default: '' },
    nameMl: { type: String, default: '' }
  },
  yoni: {
    name: { type: String, default: '' },
    nameTa: { type: String, default: '' },
    nameHi: { type: String, default: '' },
    nameTe: { type: String, default: '' },
    nameKn: { type: String, default: '' },
    nameMl: { type: String, default: '' }
  },
  yoniGender: {
    name: { type: String, default: '' },
    nameTa: { type: String, default: '' },
    nameHi: { type: String, default: '' },
    nameTe: { type: String, default: '' },
    nameKn: { type: String, default: '' },
    nameMl: { type: String, default: '' }
  },
  animal: {
    name: { type: String, default: '' },
    nameTa: { type: String, default: '' },
    nameHi: { type: String, default: '' },
    nameTe: { type: String, default: '' },
    nameKn: { type: String, default: '' },
    nameMl: { type: String, default: '' }
  },
  bird: {
    name: { type: String, default: '' },
    nameTa: { type: String, default: '' },
    nameHi: { type: String, default: '' },
    nameTe: { type: String, default: '' },
    nameKn: { type: String, default: '' },
    nameMl: { type: String, default: '' }
  },
  tree: {
    name: { type: String, default: '' },
    nameTa: { type: String, default: '' },
    nameHi: { type: String, default: '' },
    nameTe: { type: String, default: '' },
    nameKn: { type: String, default: '' },
    nameMl: { type: String, default: '' }
  },
  startDegree: {
    type: Number,
    required: true
  },
  endDegree: {
    type: Number,
    required: true
  },
  rasis: [nakshatraRasiSpanSchema]
}, {
  timestamps: true
});

export default mongoose.models.NakshatraMaster || mongoose.model('NakshatraMaster', nakshatraMasterSchema);
