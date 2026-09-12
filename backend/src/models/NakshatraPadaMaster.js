import mongoose from 'mongoose';

const multilingualStringSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  nameTa: { type: String, required: true, trim: true },
  nameHi: { type: String, default: '', trim: true },
  nameTe: { type: String, default: '', trim: true },
  nameKn: { type: String, default: '', trim: true },
  nameMl: { type: String, default: '', trim: true }
}, { _id: false });

const athipathiSchema = new mongoose.Schema({
  planetId: { type: Number, required: true },
  name: { type: String, required: true, trim: true },
  nameTa: { type: String, required: true, trim: true },
  nameHi: { type: String, default: '', trim: true },
  nameTe: { type: String, default: '', trim: true },
  nameKn: { type: String, default: '', trim: true },
  nameMl: { type: String, default: '', trim: true }
}, { _id: false });

const aksharaSchema = new mongoose.Schema({
  en: { type: String, required: true, trim: true },
  ta: { type: String, required: true, trim: true },
  hi: { type: String, default: '', trim: true },
  te: { type: String, default: '', trim: true },
  kn: { type: String, default: '', trim: true },
  ml: { type: String, default: '', trim: true }
}, { _id: false });

const nakshatraPadaMasterSchema = new mongoose.Schema({
  // 1. Pada Identification
  padaNumber: {
    type: Number,
    required: true,
    unique: true,
    min: 1,
    max: 108,
    index: true
  },
  totalPadaIndex: {
    type: Number,
    required: true,
    min: 0,
    max: 107
  },

  // 2. Nakshatra Details (27 Nakshatras)
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

  // 3. Pada (Quarter 1 to 4)
  pada: {
    type: Number,
    required: true,
    min: 1,
    max: 4,
    index: true
  },
  padaLabel: {
    type: multilingualStringSchema,
    required: true
  },
  padaName: {
    type: multilingualStringSchema,
    required: true
  },

  // 4. Padam Span & Degree Measurements
  padamDegree: {
    type: Number,
    required: true,
    default: 3.3333333333333335 // 3° 20' = 200 arcminutes
  },
  padamSpan: {
    type: String,
    required: true,
    default: "3° 20'"
  },

  // 5. Position in 360° Zodiac Wheel
  startDegree: {
    type: Number,
    required: true,
    min: 0,
    max: 360
  },
  endDegree: {
    type: Number,
    required: true,
    min: 0,
    max: 360
  },
  startDMS: {
    type: String,
    required: true
  },
  endDMS: {
    type: String,
    required: true
  },
  positionDegreeDisplay: {
    type: String,
    required: true
  },

  // 6. Rasi (Zodiac Sign) Details
  rasiId: {
    type: Number,
    required: true,
    min: 0,
    max: 11,
    index: true
  },
  rasiOrder: {
    type: Number,
    required: true,
    min: 1,
    max: 12
  },
  rasiName: {
    type: multilingualStringSchema,
    required: true
  },

  // 7. Degree Span within the 30° Rasi
  rasiStartDegree: {
    type: Number,
    required: true,
    min: 0,
    max: 30
  },
  rasiEndDegree: {
    type: Number,
    required: true,
    min: 0,
    max: 30
  },
  rasiStartDMS: {
    type: String,
    required: true
  },
  rasiEndDMS: {
    type: String,
    required: true
  },
  rasiDegreeDisplay: {
    type: String,
    required: true
  },

  // 8. Athipathis (Lords / Rulers with 6 Languages)
  // 8a. Rasi Athipathi (Sign Lord)
  rasiAthipathi: {
    type: athipathiSchema,
    required: true
  },

  // 8b. Natachathira Athipathi (Vimshottari Nakshatra Lord)
  nakshatraAthipathi: {
    type: athipathiSchema,
    required: true
  },

  // 8c. Padam Athipathi (Navamsha Pada Lord)
  padamAthipathi: {
    type: athipathiSchema,
    required: true
  },

  // 9. Navamsha Rasi Details
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

  // 10. Astrological Sound Syllables (Nama Akshara) in 6 Languages
  akshara: {
    type: aksharaSchema,
    required: true
  },

  // 11. Additional Vedic Attributes in 6 Languages
  varna: multilingualStringSchema,
  gana: multilingualStringSchema,
  yoni: multilingualStringSchema,
  animal: multilingualStringSchema,
  bird: multilingualStringSchema,
  tree: multilingualStringSchema,
  deity: multilingualStringSchema
}, {
  timestamps: true,
  collection: 'nakshatra_pada_masters'
});

nakshatraPadaMasterSchema.index({ rasiId: 1, pada: 1 });
nakshatraPadaMasterSchema.index({ nakshatraId: 1, pada: 1 });

export const NakshatraPadaMaster = mongoose.models.NakshatraPadaMaster || mongoose.model('NakshatraPadaMaster', nakshatraPadaMasterSchema);
export default NakshatraPadaMaster;
