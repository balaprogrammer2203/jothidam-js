import mongoose from 'mongoose';

const planetMasterSchema = new mongoose.Schema({
  planetId: {
    type: Number,
    required: true,
    unique: true,
    index: true
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

  shortName: {
    type: String,
    required: true
  },
  shortNameTa: {
    type: String,
    required: true
  },
  shortNameHi: { type: String, default: '' },
  shortNameTe: { type: String, default: '' },
  shortNameKn: { type: String, default: '' },
  shortNameMl: { type: String, default: '' },

  sanskritName: {
    type: String,
    trim: true
  },
  nature: {
    name: { type: String },
    nameTa: { type: String },
    nameHi: { type: String },
    nameTe: { type: String },
    nameKn: { type: String },
    nameMl: { type: String }
  },
  gender: {
    name: { type: String },
    nameTa: { type: String },
    nameHi: { type: String },
    nameTe: { type: String },
    nameKn: { type: String },
    nameMl: { type: String }
  },
  color: {
    name: { type: String, default: '' },
    nameTa: { type: String, default: '' },
    nameHi: { type: String, default: '' },
    nameTe: { type: String, default: '' },
    nameKn: { type: String, default: '' },
    nameMl: { type: String, default: '' }
  },
  gemstone: {
    name: { type: String, default: '' },
    nameTa: { type: String, default: '' },
    nameHi: { type: String, default: '' },
    nameTe: { type: String, default: '' },
    nameKn: { type: String, default: '' },
    nameMl: { type: String, default: '' }
  },
  dayOfWeek: {
    name: { type: String, default: '' },
    nameTa: { type: String, default: '' },
    nameHi: { type: String, default: '' },
    nameTe: { type: String, default: '' },
    nameKn: { type: String, default: '' },
    nameMl: { type: String, default: '' }
  },
  metal: {
    name: { type: String, default: '' },
    nameTa: { type: String, default: '' },
    nameHi: { type: String, default: '' },
    nameTe: { type: String, default: '' },
    nameKn: { type: String, default: '' },
    nameMl: { type: String, default: '' }
  },
  grain: {
    name: { type: String, default: '' },
    nameTa: { type: String, default: '' },
    nameHi: { type: String, default: '' },
    nameTe: { type: String, default: '' },
    nameKn: { type: String, default: '' },
    nameMl: { type: String, default: '' }
  },
  friends: {
    name: { type: String, default: '' },
    nameTa: { type: String, default: '' },
    nameHi: { type: String, default: '' },
    nameTe: { type: String, default: '' },
    nameKn: { type: String, default: '' },
    nameMl: { type: String, default: '' }
  },
  enemies: {
    name: { type: String, default: '' },
    nameTa: { type: String, default: '' },
    nameHi: { type: String, default: '' },
    nameTe: { type: String, default: '' },
    nameKn: { type: String, default: '' },
    nameMl: { type: String, default: '' }
  },
  ownRasis: [{
    rasiId: Number,
    name: String,
    nameTa: String,
    nameHi: String,
    nameTe: String,
    nameKn: String,
    nameMl: String
  }],
  exaltationRasi: {
    rasiId: Number,
    name: String,
    nameTa: String,
    nameHi: String,
    nameTe: String,
    nameKn: String,
    nameMl: String,
    degree: Number
  },
  debilitationRasi: {
    rasiId: Number,
    name: String,
    nameTa: String,
    nameHi: String,
    nameTe: String,
    nameKn: String,
    nameMl: String,
    degree: Number
  }
}, {
  timestamps: true
});

export default mongoose.models.PlanetMaster || mongoose.model('PlanetMaster', planetMasterSchema);
