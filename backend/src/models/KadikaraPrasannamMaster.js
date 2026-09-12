import mongoose from 'mongoose';

const multilingualStringSchema = new mongoose.Schema({
  en: { type: String, default: '' },
  ta: { type: String, default: '' },
  hi: { type: String, default: '' },
  te: { type: String, default: '' },
  kn: { type: String, default: '' },
  ml: { type: String, default: '' }
}, { _id: false });

const kadikaraPrasannamMasterSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    index: true // e.g. "bhava_1", "rule_1", "concept_synchronicity", "faq_1"
  },
  category: {
    type: String,
    required: true,
    enum: ['bhava', 'rule', 'concept', 'faq'],
    index: true
  },
  order: {
    type: Number,
    default: 1,
    index: true
  },
  // Specific to 12 Bhavas:
  bhava: {
    type: Number,
    min: 1,
    max: 12,
    index: true
  },
  ratingType: {
    type: String,
    enum: ['excellent', 'very-good', 'good', 'normal', 'delay', 'failure', 'hard', 'general'],
    default: 'general'
  },
  percentage: {
    type: Number,
    default: 50
  },
  badgeBg: {
    type: String,
    default: '#00c288'
  },
  badgeColor: {
    type: String,
    default: '#ffffff'
  },
  icon: {
    type: String,
    default: ''
  },
  // Multilingual text fields:
  title: multilingualStringSchema,
  status: multilingualStringSchema,
  desc: multilingualStringSchema,
  content: multilingualStringSchema,
  question: multilingualStringSchema,
  answer: multilingualStringSchema,
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
}, {
  timestamps: true,
  collection: 'kadikara_prasannam_masters'
});

export const KadikaraPrasannamMaster = mongoose.models.KadikaraPrasannamMaster || mongoose.model('KadikaraPrasannamMaster', kadikaraPrasannamMasterSchema);

export default KadikaraPrasannamMaster;
