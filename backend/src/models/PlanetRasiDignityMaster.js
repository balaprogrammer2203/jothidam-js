import mongoose from 'mongoose';

const planetDignityItemSchema = new mongoose.Schema({
  planetId: { type: Number, required: true },
  name: { type: String, required: true },
  nameTa: { type: String, required: true },
  nameHi: { type: String, default: '' },
  nameTe: { type: String, default: '' },
  nameKn: { type: String, default: '' },
  nameMl: { type: String, default: '' },
  status: {
    type: String,
    required: true,
    enum: ['atchi', 'ucham', 'neecham', 'natpu', 'pagai', 'samam']
  },
  statusTa: { type: String, required: true },
  statusEn: { type: String, required: true },
  statusHi: { type: String, default: '' },
  statusTe: { type: String, default: '' },
  statusKn: { type: String, default: '' },
  statusMl: { type: String, default: '' }
}, { _id: false });

const planetRasiDignityMasterSchema = new mongoose.Schema({
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
  rasiName: {
    type: String,
    required: true,
    trim: true
  },
  rasiNameTa: {
    type: String,
    required: true,
    trim: true
  },
  rasiNameHi: { type: String, trim: true, default: '' },
  rasiNameTe: { type: String, trim: true, default: '' },
  rasiNameKn: { type: String, trim: true, default: '' },
  rasiNameMl: { type: String, trim: true, default: '' },
  athipathiName: { type: String, default: '' },
  athipathiNameTa: { type: String, default: '' },
  planets: [planetDignityItemSchema]
}, {
  timestamps: true
});

export default mongoose.models.PlanetRasiDignityMaster || mongoose.model('PlanetRasiDignityMaster', planetRasiDignityMasterSchema);
