import mongoose from 'mongoose';

const TamilYearMasterSchema = new mongoose.Schema({
  yearId: {
    type: Number,
    required: true,
    unique: true,
    index: true,
    min: 0,
    max: 59
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
  meaningEn: { type: String, default: '' },
  meaningTa: { type: String, default: '' },
  meaningHi: { type: String, default: '' },
  meaningTe: { type: String, default: '' },
  meaningKn: { type: String, default: '' },
  meaningMl: { type: String, default: '' },
  order: {
    type: Number,
    required: true
  }
}, {
  timestamps: true,
  collection: 'tamil_year_masters'
});

const TamilMonthMasterSchema = new mongoose.Schema({
  monthId: {
    type: Number,
    required: true,
    unique: true,
    index: true,
    min: 0,
    max: 11
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
  rasiId: {
    type: Number,
    required: true
  },
  rasiName: {
    type: String,
    default: ''
  },
  rasiNameTa: {
    type: String,
    default: ''
  },
  rasiNameHi: {
    type: String,
    default: ''
  },
  rasiNameTe: {
    type: String,
    default: ''
  },
  rasiNameKn: {
    type: String,
    default: ''
  },
  rasiNameMl: {
    type: String,
    default: ''
  },
  seasonEn: {
    type: String,
    default: ''
  },
  seasonTa: {
    type: String,
    default: ''
  },
  seasonHi: {
    type: String,
    default: ''
  },
  seasonTe: {
    type: String,
    default: ''
  },
  seasonKn: {
    type: String,
    default: ''
  },
  seasonMl: {
    type: String,
    default: ''
  }
}, {
  timestamps: true,
  collection: 'tamil_month_masters'
});

export const TamilYearMaster = mongoose.models.TamilYearMaster || mongoose.model('TamilYearMaster', TamilYearMasterSchema);
export const TamilMonthMaster = mongoose.models.TamilMonthMaster || mongoose.model('TamilMonthMaster', TamilMonthMasterSchema);

export default {
  TamilYearMaster,
  TamilMonthMaster
};
