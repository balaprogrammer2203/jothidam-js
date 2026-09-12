import mongoose from 'mongoose';

const KaranaMasterSchema = new mongoose.Schema({
  karanaId: {
    type: Number,
    required: true,
    unique: true,
    index: true,
    min: 0,
    max: 10
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

  type: {
    type: String,
    enum: ['Chara', 'Sthira'],
    required: true
  },
  typeTa: {
    type: String,
    required: true
  },
  typeHi: { type: String, default: '' },
  typeTe: { type: String, default: '' },
  typeKn: { type: String, default: '' },
  typeMl: { type: String, default: '' },

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
  descriptionTa: {
    type: String,
    default: ''
  }
}, {
  timestamps: true,
  collection: 'karana_masters'
});

export default mongoose.models.KaranaMaster || mongoose.model('KaranaMaster', KaranaMasterSchema);
