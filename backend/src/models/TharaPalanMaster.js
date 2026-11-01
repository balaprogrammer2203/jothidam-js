import mongoose from 'mongoose';

const multilingualStringSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  nameTa: { type: String, required: true, trim: true },
  nameHi: { type: String, default: '', trim: true },
  nameTe: { type: String, default: '', trim: true },
  nameKn: { type: String, default: '', trim: true },
  nameMl: { type: String, default: '', trim: true }
}, { _id: false });

const tharaPalanMasterSchema = new mongoose.Schema({
  order: {
    type: Number,
    required: true,
    unique: true,
    min: 1,
    max: 27,
    index: true // Count value 1 to 27
  },
  taraNumber: {
    type: Number,
    required: true,
    min: 1,
    max: 9,
    index: true // 1: Janma to 9: Parama Mitra
  },
  cycle: {
    type: Number,
    required: true,
    min: 1,
    max: 3 // 1: Prathama, 2: Dvitiya, 3: Tritiya
  },
  cycleName: {
    type: multilingualStringSchema,
    required: true
  },
  key: {
    type: String,
    required: true,
    trim: true,
    index: true // e.g. "janma", "sampat", "vipat", "kshema", "pratyak", "sadhana", "naidhana", "mitra", "parama_mitra"
  },
  taraName: {
    type: multilingualStringSchema,
    required: true
  },
  status: {
    type: multilingualStringSchema,
    required: true // e.g. Auspicious (சுபம்), Inauspicious (அசுபம்), Moderate (மிதம்)
  },
  palan: {
    type: multilingualStringSchema,
    required: true // Description / Result of this Tara
  },
  ratingType: {
    type: String,
    enum: ['good', 'bad', 'moderate'],
    default: 'good'
  },
  isAuspicious: {
    type: Boolean,
    default: true
  },
  badgeBg: {
    type: String,
    default: '#dcfce7'
  },
  badgeColor: {
    type: String,
    default: '#15803d'
  }
}, {
  timestamps: true,
  collection: 'thara_palan_masters'
});

export const TharaPalanMaster = mongoose.models.TharaPalanMaster || mongoose.model('TharaPalanMaster', tharaPalanMasterSchema);

export default TharaPalanMaster;

