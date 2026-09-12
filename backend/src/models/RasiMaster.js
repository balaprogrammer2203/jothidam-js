import mongoose from 'mongoose';

const rasiMasterSchema = new mongoose.Schema({
  rasiId: {
    type: Number,
    required: true,
    unique: true,
    min: 0,
    max: 11,
    index: true
  },
  order: {
    type: Number,
    required: true,
    min: 1,
    max: 12
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
  element: {
    name: { type: String, required: true },
    nameTa: { type: String, required: true },
    nameHi: { type: String, default: '' },
    nameTe: { type: String, default: '' },
    nameKn: { type: String, default: '' },
    nameMl: { type: String, default: '' }
  },
  mobility: {
    name: { type: String, required: true },
    nameTa: { type: String, required: true },
    nameHi: { type: String, default: '' },
    nameTe: { type: String, default: '' },
    nameKn: { type: String, default: '' },
    nameMl: { type: String, default: '' }
  },
  gender: {
    name: { type: String, required: true },
    nameTa: { type: String, required: true },
    nameHi: { type: String, default: '' },
    nameTe: { type: String, default: '' },
    nameKn: { type: String, default: '' },
    nameMl: { type: String, default: '' }
  },
  symbol: {
    name: { type: String },
    nameTa: { type: String },
    nameHi: { type: String },
    nameTe: { type: String },
    nameKn: { type: String },
    nameMl: { type: String }
  },
  direction: {
    name: { type: String },
    nameTa: { type: String },
    nameHi: { type: String },
    nameTe: { type: String },
    nameKn: { type: String },
    nameMl: { type: String }
  },
  bodyPart: {
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
  }
}, {
  timestamps: true
});

export default mongoose.models.RasiMaster || mongoose.model('RasiMaster', rasiMasterSchema);
