import HoroscopeProfile from '../models/HoroscopeProfile.js';
import PlanetMaster from '../models/PlanetMaster.js';
import RasiMaster from '../models/RasiMaster.js';
import NakshatraMaster from '../models/NakshatraMaster.js';
import TithiMaster from '../models/TithiMaster.js';
import YogaMaster from '../models/YogaMaster.js';
import KaranaMaster from '../models/KaranaMaster.js';
import KalachakramMaster from '../models/KalachakramMaster.js';
import { TamilYearMaster, TamilMonthMaster } from '../models/TamilCalendarMaster.js';
import KPHoraryMaster from '../models/KPHoraryMaster.js';
import NakshatraPadaMaster from '../models/NakshatraPadaMaster.js';
import KadikaraPrasannamMaster from '../models/KadikaraPrasannamMaster.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

// Central Registry of all DB Models / Collections (including User management)
export const MODEL_REGISTRY = {
  users: {
    model: User,
    name: 'User Management',
    nameTa: 'பயனர்கள்',
    searchFields: ['username', 'fullName', 'email', 'role', 'preferredLanguage'],
    defaultSort: { createdAt: -1 }
  },
  horoscopeprofiles: {
    model: HoroscopeProfile,
    name: 'Horoscope Profiles',
    nameTa: 'ஜாதகங்கள்',
    searchFields: [
      'personDetails.fullName',
      'personDetails.dob',
      'personDetails.genderTa',
      'location.placeName',
      'location.formattedAddress',
      'birthAstrology.maandi.rasiName',
      'birthAstrology.maandi.rasiNameTa',
      'birthAstrology.maandi.nakshatraName',
      'birthAstrology.maandi.nakshatraNameTa'
    ],
    defaultSort: { createdAt: -1 }
  },
  planets: {
    model: PlanetMaster,
    name: 'Planets Master (Navagrahas)',
    nameTa: 'கிரகங்கள்',
    searchFields: ['name', 'nameTa', 'nameHi', 'nameTe', 'nameKn', 'nameMl', 'shortName', 'shortNameTa'],
    defaultSort: { planetId: 1 }
  },
  rasis: {
    model: RasiMaster,
    name: 'Rasis Master (12 Zodiacs)',
    nameTa: 'ராசிகள்',
    searchFields: ['name', 'nameTa', 'nameHi', 'nameTe', 'nameKn', 'nameMl', 'sanskritName'],
    defaultSort: { rasiId: 1 }
  },
  nakshatras: {
    model: NakshatraMaster,
    name: 'Nakshatras Master (27 Stars)',
    nameTa: 'நட்சத்திரங்கள்',
    searchFields: ['name', 'nameTa', 'nameHi', 'nameTe', 'nameKn', 'nameMl', 'sanskritName', 'deity.nameTa'],
    defaultSort: { nakshatraId: 1 }
  },
  'nakshatra-padas': {
    model: NakshatraPadaMaster,
    name: 'Nakshatra Padas Master (108 Padas)',
    nameTa: '108 நட்சத்திர பாதங்கள்',
    searchFields: [
      'padaNumber',
      'nakshatraName.name', 'nakshatraName.nameTa', 'nakshatraName.nameHi',
      'rasiName.name', 'rasiName.nameTa',
      'padamAthipathi.name', 'padamAthipathi.nameTa',
      'akshara.en', 'akshara.ta', 'akshara.hi'
    ],
    defaultSort: { padaNumber: 1 }
  },
  tithis: {
    model: TithiMaster,
    name: 'Tithis Master (30 Tithis)',
    nameTa: 'திதிகள்',
    searchFields: ['name', 'nameTa', 'nameHi', 'nameTe', 'nameKn', 'nameMl', 'paksha', 'pakshaTa'],
    defaultSort: { tithiId: 1 }
  },
  yogas: {
    model: YogaMaster,
    name: 'Yogas Master (27 Yogas)',
    nameTa: 'யோகங்கள்',
    searchFields: ['name', 'nameTa', 'nameHi', 'nameTe', 'nameKn', 'nameMl', 'nature', 'natureTa'],
    defaultSort: { yogaId: 1 }
  },
  karanas: {
    model: KaranaMaster,
    name: 'Karanas Master (11 Karanas)',
    nameTa: 'கரணங்கள்',
    searchFields: ['name', 'nameTa', 'nameHi', 'nameTe', 'nameKn', 'nameMl', 'type', 'typeTa'],
    defaultSort: { karanaId: 1 }
  },
  kalachakram: {
    model: KalachakramMaster,
    name: 'Kalachakram Master (360°)',
    nameTa: 'காலசக்கரம் 360°',
    searchFields: ['degreeDisplay', 'rasiName', 'rasiNameTa', 'nakshatraName', 'nakshatraNameTa'],
    defaultSort: { degree: 1 }
  },
  'tamil-years': {
    model: TamilYearMaster,
    name: 'Vedic/Tamil Years (60 Years)',
    nameTa: 'தமிழ் ஆண்டுகள்',
    searchFields: ['name', 'nameTa', 'nameHi', 'nameTe', 'nameKn', 'nameMl'],
    defaultSort: { yearId: 1 }
  },
  'tamil-months': {
    model: TamilMonthMaster,
    name: 'Vedic/Tamil Months (12 Months)',
    nameTa: 'தமிழ் மாதங்கள்',
    searchFields: ['name', 'nameTa', 'nameHi', 'nameTe', 'nameKn', 'nameMl', 'seasonTa'],
    defaultSort: { monthId: 1 }
  },
  'kp-horary': {
    model: KPHoraryMaster,
    name: 'KP Horary Numbers (1-249 Table)',
    nameTa: 'KP ஹோரரி எண்கள் (1-249)',
    searchFields: [
      'number',
      'sign.en', 'sign.ta', 'sign.hi', 'sign.te', 'sign.kn', 'sign.ml',
      'signLord.en', 'signLord.ta', 'signLord.hi', 'signLord.te', 'signLord.kn', 'signLord.ml',
      'star.en', 'star.ta', 'star.hi', 'star.te', 'star.kn', 'star.ml',
      'starLord.en', 'starLord.ta', 'starLord.hi', 'starLord.te', 'starLord.kn', 'starLord.ml',
      'subLordName',
      'subLord.en', 'subLord.ta', 'subLord.hi', 'subLord.te', 'subLord.kn', 'subLord.ml',
      'startDMS', 'endDMS', 'rasiStartDMS', 'rasiEndDMS', 'spanFormatted'
    ],
    defaultSort: { number: 1 }
  },
  'kadikara-prasannam': {
    model: KadikaraPrasannamMaster,
    name: 'Kadikara Prasannam (Clock Horary Master)',
    nameTa: 'கடிகார பிரசன்னம்',
    searchFields: [
      'key', 'category', 'bhava', 'ratingType',
      'title.en', 'title.ta', 'title.hi', 'title.te', 'title.kn', 'title.ml',
      'status.en', 'status.ta', 'status.hi', 'status.te', 'status.kn', 'status.ml',
      'desc.en', 'desc.ta', 'desc.hi', 'desc.te', 'desc.kn', 'desc.ml'
    ],
    defaultSort: { order: 1, bhava: 1 }
  },
  kadikara_prasannam: {
    model: KadikaraPrasannamMaster,
    name: 'Kadikara Prasannam (Clock Horary Master)',
    nameTa: 'கடிகார பிரசன்னம்',
    searchFields: [
      'key', 'category', 'bhava', 'ratingType',
      'title.en', 'title.ta', 'title.hi', 'title.te', 'title.kn', 'title.ml',
      'status.en', 'status.ta', 'status.hi', 'status.te', 'status.kn', 'status.ml',
      'desc.en', 'desc.ta', 'desc.hi', 'desc.te', 'desc.kn', 'desc.ml'
    ],
    defaultSort: { order: 1, bhava: 1 }
  }
};

/**
 * Get system summary statistics & document counts across all collections
 */
export const getAdminStats = async (req, res) => {
  try {
    const clientLang = req.headers['accept-language'] || req.query.lang || 'en';
    const stats = {};
    const tableKeys = Object.keys(MODEL_REGISTRY);

    await Promise.all(
      tableKeys.map(async (key) => {
        const item = MODEL_REGISTRY[key];
        try {
          const count = await item.model.countDocuments();
          stats[key] = {
            key,
            name: clientLang === 'ta' ? (item.nameTa || item.name) : item.name,
            count
          };
        } catch (e) {
          stats[key] = {
            key,
            name: clientLang === 'ta' ? (item.nameTa || item.name) : item.name,
            count: 0
          };
        }
      })
    );

    res.status(200).json({
      success: true,
      data: stats,
      totalCollections: tableKeys.length
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * Generic Read Paginated Records with search & sorting
 */
export const getTableRecords = async (req, res) => {
  try {
    const { table } = req.params;
    const tableConfig = MODEL_REGISTRY[table];

    if (!tableConfig) {
      return res.status(404).json({
        success: false,
        error: `Table '${table}' not found in registry.`
      });
    }

    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 15));
    const skip = (page - 1) * limit;
    const search = (req.query.search || '').trim();
    const sortBy = req.query.sortBy || Object.keys(tableConfig.defaultSort)[0];
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : req.query.sortOrder === 'desc' ? -1 : (tableConfig.defaultSort[sortBy] ?? 1);

    let filter = {};
    if (search) {
      const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(escapeRegex(search), 'i');
      const isNumeric = !isNaN(Number(search)) && search !== '';
      const searchNum = Number(search);

      const numericFieldNames = new Set([
        'number',
        'planetId',
        'rasiId',
        'nakshatraId',
        'tithiId',
        'yogaId',
        'karanaId',
        'yearId',
        'monthId',
        'degree',
        'order',
        'pada',
        'padaNumber',
        'totalPadaIndex',
        'bhava',
        'percentage'
      ]);

      const orConditions = [];

      for (const field of tableConfig.searchFields) {
        if (numericFieldNames.has(field)) {
          if (isNumeric) {
            orConditions.push({ [field]: searchNum });
          }
        } else {
          orConditions.push({ [field]: regex });
        }
      }

      if (orConditions.length > 0) {
        filter.$or = orConditions;
      } else {
        filter.$or = [{ _id: null }];
      }
    }

    const sortOption = { [sortBy]: sortOrder };
    const query = tableConfig.model.find(filter).sort(sortOption).skip(skip).limit(limit);
    if (table === 'users') {
      query.select('-password');
    }

    const [records, totalRecords] = await Promise.all([
      query.lean(),
      tableConfig.model.countDocuments(filter)
    ]);

    res.status(200).json({
      success: true,
      table,
      tableName: tableConfig.name,
      page,
      limit,
      totalPages: Math.ceil(totalRecords / limit),
      totalRecords,
      data: records
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * Get Single Record by ID
 */
export const getTableRecordById = async (req, res) => {
  try {
    const { table, id } = req.params;
    const tableConfig = MODEL_REGISTRY[table];

    if (!tableConfig) {
      return res.status(404).json({ success: false, error: `Table '${table}' not found.` });
    }

    const query = tableConfig.model.findById(id);
    if (table === 'users') {
      query.select('-password');
    }
    const record = await query.lean();
    if (!record) {
      return res.status(404).json({ success: false, error: `Record with ID '${id}' not found.` });
    }

    res.status(200).json({ success: true, data: record });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * Create New Record
 */
export const createTableRecord = async (req, res) => {
  try {
    const { table } = req.params;
    const tableConfig = MODEL_REGISTRY[table];

    if (!tableConfig) {
      return res.status(404).json({ success: false, error: `Table '${table}' not found.` });
    }

    if (table === 'users') {
      if (!req.body.password || req.body.password.trim().length < 6) {
        return res.status(400).json({
          success: false,
          error: 'Password is required and must be at least 6 characters long (கடவுச்சொல் குறைந்தது 6 எழுத்துக்கள் இருக்க வேண்டும்).'
        });
      }
    }

    const newRecord = new tableConfig.model(req.body);
    await newRecord.save();

    const responseData = newRecord.toObject();
    if (table === 'users') {
      delete responseData.password;
    }

    res.status(201).json({
      success: true,
      message: `Record created successfully in '${tableConfig.name}'.`,
      data: responseData
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        error: `A record with duplicate unique key already exists. (${JSON.stringify(error.keyValue)})`
      });
    }
    res.status(400).json({ success: false, error: error.message });
  }
};

/**
 * Update Existing Record
 */
export const updateTableRecord = async (req, res) => {
  try {
    const { table, id } = req.params;
    const tableConfig = MODEL_REGISTRY[table];

    if (!tableConfig) {
      return res.status(404).json({ success: false, error: `Table '${table}' not found.` });
    }

    const updatePayload = { ...req.body };
    if (table === 'users') {
      if (updatePayload.password && updatePayload.password.trim() !== '') {
        if (updatePayload.password.trim().length < 6) {
          return res.status(400).json({
            success: false,
            error: 'Password must be at least 6 characters long (கடவுச்சொல் குறைந்தது 6 எழுத்துக்கள் இருக்க வேண்டும்).'
          });
        }
        const salt = await bcrypt.genSalt(10);
        updatePayload.password = await bcrypt.hash(updatePayload.password.trim(), salt);
      } else {
        delete updatePayload.password;
      }
    }

    const updatedRecord = await tableConfig.model.findByIdAndUpdate(
      id,
      { $set: updatePayload },
      { new: true, runValidators: true }
    ).select(table === 'users' ? '-password' : '');

    if (!updatedRecord) {
      return res.status(404).json({ success: false, error: `Record with ID '${id}' not found.` });
    }

    res.status(200).json({
      success: true,
      message: `Record updated successfully in '${tableConfig.name}'.`,
      data: updatedRecord
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        error: `A record with duplicate unique key already exists. (${JSON.stringify(error.keyValue)})`
      });
    }
    res.status(400).json({ success: false, error: error.message });
  }
};

/**
 * Delete Record
 */
export const deleteTableRecord = async (req, res) => {
  try {
    const { table, id } = req.params;
    const tableConfig = MODEL_REGISTRY[table];

    if (!tableConfig) {
      return res.status(404).json({ success: false, error: `Table '${table}' not found.` });
    }

    const deletedRecord = await tableConfig.model.findByIdAndDelete(id);

    if (!deletedRecord) {
      return res.status(404).json({ success: false, error: `Record with ID '${id}' not found.` });
    }

    res.status(200).json({
      success: true,
      message: `Record deleted successfully from '${tableConfig.name}'.`,
      id
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
