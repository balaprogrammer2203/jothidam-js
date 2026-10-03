import mongoose from 'mongoose';

const prasannamProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  prasannamType: {
    type: String,
    enum: ['jamakkol', 'kadikara', 'kp_horary'],
    required: true,
    index: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  clientName: {
    type: String,
    trim: true,
    default: ''
  },
  queryCategory: {
    type: String,
    default: 'General'
  },
  dateTime: {
    type: String,
    required: true // YYYY-MM-DD HH:MM:SS
  },
  location: {
    placeName: { type: String, default: 'Chennai' },
    latitude: { type: Number, default: 13.0827 },
    longitude: { type: Number, default: 80.2707 },
    timezone: { type: String, default: 'Asia/Kolkata' },
    formattedAddress: { type: String, default: '' }
  },
  ayanamsa: {
    type: String,
    default: 'lahiri'
  },
  summary: {
    udhayam: { type: String },
    udhayamRasiId: { type: Number },
    aarudam: { type: String },
    aarudamRasiId: { type: Number },
    kavippu: { type: String },
    kavippuRasiId: { type: Number },
    jamamLord: { type: String },
    activeJamamNumber: { type: Number },
    dayLord: { type: String },
    bhava: { type: Number },
    horaryNumber: { type: Number },
    verdict: { type: String }
  },
  chartData: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  notes: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['active', 'archived'],
    default: 'active'
  }
}, {
  timestamps: true,
  collection: 'prasannamprofiles'
});

prasannamProfileSchema.index({ userId: 1, createdAt: -1 });
prasannamProfileSchema.index({ userId: 1, prasannamType: 1 });

export default mongoose.models.PrasannamProfile || mongoose.model('PrasannamProfile', prasannamProfileSchema);
