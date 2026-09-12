import mongoose from 'mongoose';

const multilingualStringSchema = new mongoose.Schema({
  en: { type: String, required: true },
  ta: { type: String, required: true },
  hi: { type: String, default: '' },
  te: { type: String, default: '' },
  kn: { type: String, default: '' },
  ml: { type: String, default: '' }
}, { _id: false });

const kpHoraryMasterSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
    unique: true,
    min: 1,
    max: 249,
    index: true
  },
  rasiId: {
    type: Number,
    required: true,
    min: 0,
    max: 11,
    index: true
  },
  sign: multilingualStringSchema,
  signLord: multilingualStringSchema,
  nakshatraId: {
    type: Number,
    required: true,
    min: 1,
    max: 27,
    index: true
  },
  star: multilingualStringSchema,
  starLord: multilingualStringSchema,
  subLord: multilingualStringSchema,
  subLordName: {
    type: String,
    required: true,
    index: true
  },
  startDegree: {
    type: Number,
    required: true
  },
  endDegree: {
    type: Number,
    required: true
  },
  startDMS: {
    type: String,
    required: true
  },
  endDMS: {
    type: String,
    required: true
  },
  rasiStartDMS: {
    type: String,
    required: true
  },
  rasiEndDMS: {
    type: String,
    required: true
  },
  spanFormatted: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  collection: 'kp_horary_masters'
});

export const KPHoraryMaster = mongoose.models.KPHoraryMaster || mongoose.model('KPHoraryMaster', kpHoraryMasterSchema);

export default KPHoraryMaster;
