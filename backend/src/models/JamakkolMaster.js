import mongoose from 'mongoose';

const multilingualStringSchema = new mongoose.Schema({
  en: { type: String, default: '' },
  ta: { type: String, default: '' },
  hi: { type: String, default: '' },
  te: { type: String, default: '' },
  kn: { type: String, default: '' },
  ml: { type: String, default: '' }
}, { _id: false });

const jamakkolMasterSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    index: true // e.g. "rule_udhaya_kavippu", "question_marriage", "pillar_udhayam", "faq_1"
  },
  category: {
    type: String,
    required: true,
    enum: ['rule', 'question', 'pillar', 'concept', 'faq', 'ray'],
    index: true
  },
  domain: {
    type: String,
    default: 'general',
    index: true // 'marriage', 'career', 'health', 'finance', 'lost_items', 'litigation', 'general'
  },
  order: {
    type: Number,
    default: 1,
    index: true
  },
  ratingType: {
    type: String,
    enum: ['positive', 'negative', 'neutral', 'caution', 'warning', 'excellent', 'general'],
    default: 'general'
  },
  percentage: {
    type: Number,
    default: 50
  },
  badgeBg: {
    type: String,
    default: '#994d10'
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
  collection: 'jamakkol_masters'
});

export const JamakkolMaster = mongoose.models.JamakkolMaster || mongoose.model('JamakkolMaster', jamakkolMasterSchema);

export default JamakkolMaster;
