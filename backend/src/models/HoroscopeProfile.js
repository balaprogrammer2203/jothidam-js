import mongoose from 'mongoose';

const athipathiSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nameTa: { type: String, required: true },
  planetId: { type: Number }
}, { _id: false });

const planetEntrySchema = new mongoose.Schema({
  planetId: { type: Number },
  name: { type: String, required: true },
  nameTa: { type: String, required: true },
  shortName: { type: String },
  shortNameTa: { type: String },
  longitude: { type: Number, required: true },
  speed: { type: Number, default: 0 },
  isRetrograde: { type: Boolean, default: false },
  
  // Rasi (D1) details
  rasiId: { type: Number, required: true, min: 0, max: 11 },
  rasiName: { type: String },
  rasiNameTa: { type: String, required: true },
  degreeInRasi: { type: Number, required: true },
  formattedDegree: { type: String, required: true },
  rasiAthipathi: athipathiSchema,
  rasiGender: { type: String },
  rasiGenderTa: { type: String },
  rasiDirection: { type: String },
  rasiDirectionTa: { type: String },
  rasiMobility: { type: String },
  rasiMobilityTa: { type: String },
  rasiBhavaOrderId: { type: Number, min: 1, max: 12 }, // 1 to 12 from Lagna

  // Nakshatra details
  nakshatraId: { type: Number, required: true, min: 0, max: 26 },
  nakshatraName: { type: String },
  nakshatraNameTa: { type: String, required: true },
  pada: { type: Number, required: true, min: 1, max: 4 },
  nakshatraAthipathi: athipathiSchema,

  // Navamsa (D9) details
  navamsaRasiId: { type: Number, required: true, min: 0, max: 11 },
  navamsaRasiName: { type: String },
  navamsaRasiNameTa: { type: String },
  navamsaBhavaOrderId: { type: Number, min: 1, max: 12 }, // 1 to 12 from Navamsa Lagna
  padamAthipathi: athipathiSchema,

  // Maandi specific calculation details
  maandiDetails: {
    isDayBirth: { type: Boolean },
    ghatiUsed: { type: Number },
    maandiJd: { type: Number }
  }
}, { _id: false });

const horoscopeProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    index: true
  },
  personDetails: {
    fullName: { type: String, required: true, trim: true, index: true },
    gender: { type: String, enum: ['male', 'female', 'other'], required: true },
    genderTa: { type: String },
    dob: { type: String, required: true }, // YYYY-MM-DD
    tob: { type: String, required: true }, // HH:MM:SS
    birthYear: { type: Number },
    birthMonth: { type: Number },
    birthDay: { type: Number },
    birthHour: { type: String },
    birthMinute: { type: String },
    birthSecond: { type: String },
    birthAmPm: { type: String },
    timeZone: { type: String, default: 'Asia/Kolkata' },
    gmt: { type: String, default: '+05:30' },
    dstType: { type: String, default: 'Standard Time (No DST)' },
    dstTypeTa: { type: String },
    dst: { type: String, default: '+00:00' }
  },
  location: {
    placeName: { type: String, required: true, index: true },
    placeId: { type: String },
    formattedAddress: { type: String },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    dms: {
      latDeg: { type: String },
      latMin: { type: String },
      latSec: { type: String },
      latDir: { type: String },
      lngDeg: { type: String },
      lngMin: { type: String },
      lngSec: { type: String },
      lngDir: { type: String }
    },
    geoPoint: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: { type: [Number], required: true } // [longitude, latitude]
    }
  },
  chartPreferences: {
    chartType: { type: String, enum: ['south', 'north'], default: 'south' }
  },
  astronomicalDetails: {
    juldayUtc: { type: Number, required: true },
    ayanamsaType: { type: String, default: 'Lahiri (Chitra Paksha)' },
    ayanamsaMode: { type: String, default: 'lahiri' },
    ayanamsaNameTa: { type: String },
    ayanamsa: { type: Number, required: true },
    ascendantLongitude: { type: Number, required: true },
    ascendantRasiId: { type: Number, required: true, min: 0, max: 11 },
    ascendantNavamsaRasiId: { type: Number, required: true, min: 0, max: 11 }
  },
  birthAstrology: {
    lagna: {
      planetId: { type: Number, default: -1 },
      name: { type: String, default: 'Lagna' },
      nameTa: { type: String, default: 'லக்னம்' },
      shortName: { type: String, default: 'Lagna' },
      shortNameTa: { type: String, default: 'ல' },
      longitude: Number,
      rasiId: Number,
      rasiName: String,
      rasiNameTa: String,
      degreeInRasi: Number,
      formattedDegree: String,
      nakshatraId: Number,
      nakshatraName: String,
      nakshatraNameTa: String,
      pada: Number,
      rasiAthipathi: athipathiSchema,
      nakshatraAthipathi: athipathiSchema,
      navamsaRasiId: Number,
      navamsaRasiName: String,
      navamsaRasiNameTa: String,
      bhavaOrderId: { type: Number, default: 1 },
      padamAthipathi: athipathiSchema
    },
    janmaRasi: {
      rasiId: Number,
      name: String,
      nameTa: String,
      athipathi: athipathiSchema
    },
    janmaNakshatra: {
      nakshatraId: Number,
      name: String,
      nameTa: String,
      pada: Number,
      athipathi: athipathiSchema
    },
    maandi: {
      planetId: { type: Number, default: 10 },
      name: { type: String, default: 'Maandi' },
      nameTa: { type: String, default: 'மாந்தி' },
      shortName: { type: String, default: 'Maa' },
      shortNameTa: { type: String, default: 'மா' },
      longitude: Number,
      speed: { type: Number, default: 0 },
      isRetrograde: { type: Boolean, default: false },
      rasiId: Number,
      rasiName: String,
      rasiNameTa: String,
      degreeInRasi: Number,
      formattedDegree: String,
      nakshatraId: Number,
      nakshatraName: String,
      nakshatraNameTa: String,
      pada: Number,
      rasiAthipathi: athipathiSchema,
      nakshatraAthipathi: athipathiSchema,
      navamsaRasiId: Number,
      navamsaRasiName: String,
      navamsaRasiNameTa: String,
      bhavaOrderId: Number,
      padamAthipathi: athipathiSchema,
      maandiDetails: {
        isDayBirth: Boolean,
        ghatiUsed: Number,
        maandiJd: Number
      }
    }
  },
  planets: [planetEntrySchema],
  chartGrids: {
    rasiGrid: [[planetEntrySchema]],
    navamsaGrid: [[planetEntrySchema]]
  },
  basicDetails: {
    type: mongoose.Schema.Types.Mixed
  },
  maandiDetails: {
    type: mongoose.Schema.Types.Mixed
  },
  status: {
    type: String,
    enum: ['active', 'archived'],
    default: 'active'
  }
}, {
  timestamps: true,
  collection: 'horoscopeprofiles'
});

horoscopeProfileSchema.index({ "location.geoPoint": "2dsphere" });
horoscopeProfileSchema.index({ "personDetails.dob": 1, "personDetails.tob": 1 });
horoscopeProfileSchema.index({
  "personDetails.fullName": 1,
  "personDetails.dob": 1,
  "personDetails.tob": 1,
  "location.placeName": 1
});

export default mongoose.model('HoroscopeProfile', horoscopeProfileSchema);
