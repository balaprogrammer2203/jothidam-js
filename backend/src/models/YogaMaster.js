import mongoose from 'mongoose';

const YogaMasterSchema = new mongoose.Schema({
  yogaId: {
    type: Number,
    required: true,
    unique: true,
    index: true,
    min: 0,
    max: 26
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

  athipathi: {
    planetId: { type: Number, default: 0 },
    name: { type: String, default: '' },
    nameTa: { type: String, default: '' },
    nameHi: { type: String, default: '' },
    nameTe: { type: String, default: '' },
    nameKn: { type: String, default: '' },
    nameMl: { type: String, default: '' }
  },
  nature: {
    type: String,
    enum: ['Benefic', 'Malefic'],
    default: 'Benefic'
  },
  natureTa: {
    type: String,
    default: 'சுப யோகம்'
  },
  natureHi: {
    type: String,
    default: ''
  },
  natureTe: {
    type: String,
    default: ''
  },
  natureKn: {
    type: String,
    default: ''
  },
  natureMl: {
    type: String,
    default: ''
  },
  startDegree: {
    type: Number,
    required: true
  },
  endDegree: {
    type: Number,
    required: true
  },
  descriptionTa: {
    type: String,
    default: ''
  }
}, {
  timestamps: true,
  collection: 'yoga_masters'
});

export default mongoose.models.YogaMaster || mongoose.model('YogaMaster', YogaMasterSchema);
