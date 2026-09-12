import mongoose from 'mongoose';

const TithiMasterSchema = new mongoose.Schema({
  tithiId: {
    type: Number,
    required: true,
    unique: true,
    index: true,
    min: 0,
    max: 29
  },
  name: {
    type: String,
    required: true
  },
  nameTa: {
    type: String,
    required: true
  },
  nameHi: { type: String, default: '' },
  nameTe: { type: String, default: '' },
  nameKn: { type: String, default: '' },
  nameMl: { type: String, default: '' },

  paksha: {
    type: String,
    enum: ['Shukla', 'Krishna'],
    required: true
  },
  pakshaTa: {
    type: String,
    required: true
  },
  pakshaHi: { type: String, default: '' },
  pakshaTe: { type: String, default: '' },
  pakshaKn: { type: String, default: '' },
  pakshaMl: { type: String, default: '' },

  number: {
    type: Number,
    required: true // 1 to 15
  },
  startDegree: {
    type: Number,
    required: true
  },
  endDegree: {
    type: Number,
    required: true
  },
  deity: {
    name: { type: String, default: '' },
    nameTa: { type: String, default: '' },
    nameHi: { type: String, default: '' },
    nameTe: { type: String, default: '' },
    nameKn: { type: String, default: '' },
    nameMl: { type: String, default: '' }
  },
  lord: {
    name: { type: String, default: '' },
    nameTa: { type: String, default: '' },
    nameHi: { type: String, default: '' },
    nameTe: { type: String, default: '' },
    nameKn: { type: String, default: '' },
    nameMl: { type: String, default: '' }
  },
  category: {
    name: { type: String, default: '' }, // Nanda, Bhadra, Jaya, Rikta, Poorna
    nameTa: { type: String, default: '' },
    nameHi: { type: String, default: '' },
    nameTe: { type: String, default: '' },
    nameKn: { type: String, default: '' },
    nameMl: { type: String, default: '' }
  },
  descriptionTa: {
    type: String,
    default: ''
  }
}, {
  timestamps: true,
  collection: 'tithi_masters'
});

export default mongoose.models.TithiMaster || mongoose.model('TithiMaster', TithiMasterSchema);
