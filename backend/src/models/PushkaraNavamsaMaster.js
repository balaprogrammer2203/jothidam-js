import mongoose from 'mongoose';

const multilingualStringSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  nameTa: { type: String, required: true, trim: true },
  nameHi: { type: String, default: '', trim: true },
  nameTe: { type: String, default: '', trim: true },
  nameKn: { type: String, default: '', trim: true },
  nameMl: { type: String, default: '', trim: true }
}, { _id: false });

const pushkaraNavamsaMasterSchema = new mongoose.Schema({
  order: {
    type: Number,
    required: true,
    unique: true,
    min: 1,
    max: 24,
    index: true
  },
  nakshatraId: {
    type: Number,
    required: true,
    min: 0,
    max: 26,
    index: true
  },
  nakshatraOrder: {
    type: Number,
    required: true,
    min: 1,
    max: 27
  },
  nakshatraName: {
    type: multilingualStringSchema,
    required: true
  },
  nakshatraLord: {
    planetId: { type: Number, required: true },
    name: { type: String, required: true, trim: true },
    nameTa: { type: String, required: true, trim: true }
  },
  pada: {
    type: Number,
    required: true,
    min: 1,
    max: 4
  },
  padaLabelTa: {
    type: String,
    required: true
  },
  padaLabelEn: {
    type: String,
    required: true
  },
  rasiId: {
    type: Number,
    required: true,
    min: 0,
    max: 11
  },
  rasiName: {
    name: { type: String, required: true, trim: true },
    nameTa: { type: String, required: true, trim: true }
  },
  rasiLord: {
    name: { type: String, required: true, trim: true },
    nameTa: { type: String, required: true, trim: true }
  },
  navamsaRasiId: {
    type: Number,
    required: true,
    min: 0,
    max: 11,
    index: true
  },
  navamsaRasiName: {
    type: multilingualStringSchema,
    required: true
  },
  navamsaLord: {
    planetId: { type: Number, required: true },
    name: { type: String, required: true, trim: true },
    nameTa: { type: String, required: true, trim: true }
  },
  isVargottama: {
    type: Boolean,
    default: false
  },
  inRasiSpan: {
    type: String,
    required: true
  },
  zodiacSpan360: {
    type: String,
    required: true
  },
  element: {
    en: { type: String, default: 'Fire' },
    ta: { type: String, default: 'நெருப்பு' }
  },
  significance: {
    en: { type: String, default: '' },
    ta: { type: String, default: '' }
  }
}, {
  timestamps: true
});

export default mongoose.models.PushkaraNavamsaMaster || mongoose.model('PushkaraNavamsaMaster', pushkaraNavamsaMasterSchema);

