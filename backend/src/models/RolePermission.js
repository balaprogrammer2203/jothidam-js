import mongoose from 'mongoose';

const tableCrudSchema = new mongoose.Schema({
  read: { type: Boolean, default: true },
  create: { type: Boolean, default: true },
  update: { type: Boolean, default: true },
  delete: { type: Boolean, default: true }
}, { _id: false });

const rolePermissionSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
    unique: true,
    enum: ['superadmin', 'admin', 'user'],
    index: true
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
  canAccessAdmin: {
    type: Boolean,
    default: true
  },
  canManageUsers: {
    type: Boolean,
    default: false
  },
  canManagePermissions: {
    type: Boolean,
    default: false
  },
  tablePermissions: {
    horoscopeprofiles: { type: tableCrudSchema, default: () => ({ read: true, create: true, update: true, delete: true }) },
    planets: { type: tableCrudSchema, default: () => ({ read: true, create: true, update: true, delete: true }) },
    rasis: { type: tableCrudSchema, default: () => ({ read: true, create: true, update: true, delete: true }) },
    nakshatras: { type: tableCrudSchema, default: () => ({ read: true, create: true, update: true, delete: true }) },
    'nakshatra-padas': { type: tableCrudSchema, default: () => ({ read: true, create: true, update: true, delete: true }) },
    tithis: { type: tableCrudSchema, default: () => ({ read: true, create: true, update: true, delete: true }) },
    yogas: { type: tableCrudSchema, default: () => ({ read: true, create: true, update: true, delete: true }) },
    karanas: { type: tableCrudSchema, default: () => ({ read: true, create: true, update: true, delete: true }) },
    kalachakram: { type: tableCrudSchema, default: () => ({ read: true, create: true, update: true, delete: true }) },
    'tamil-years': { type: tableCrudSchema, default: () => ({ read: true, create: true, update: true, delete: true }) },
    'tamil-months': { type: tableCrudSchema, default: () => ({ read: true, create: true, update: true, delete: true }) },
    'kp-horary': { type: tableCrudSchema, default: () => ({ read: true, create: true, update: true, delete: true }) },
    'kadikara-prasannam': { type: tableCrudSchema, default: () => ({ read: true, create: true, update: true, delete: true }) },
    users: { type: tableCrudSchema, default: () => ({ read: true, create: true, update: true, delete: true }) }
  }
}, {
  timestamps: true,
  collection: 'role_permissions'
});

export const DEFAULT_ROLE_PERMISSIONS = {
  superadmin: {
    role: 'superadmin',
    name: 'Super Administrator',
    nameTa: 'முதன்மைக் கண்காணிப்பாளர்',
    nameHi: 'मुख्य व्यवस्थापक',
    nameTe: 'సూపర్ అడ్మినిస్ట్రేటర్',
    nameKn: 'ಮುಖ್ಯ ನಿರ್ವಾಹಕ',
    nameMl: 'സൂപ്പർ അഡ്മിനിസ്ട്രേറ്റർ',
    canAccessAdmin: true,
    canManageUsers: true,
    canManagePermissions: true,
    tablePermissions: {
      horoscopeprofiles: { read: true, create: true, update: true, delete: true },
      planets: { read: true, create: true, update: true, delete: true },
      rasis: { read: true, create: true, update: true, delete: true },
      nakshatras: { read: true, create: true, update: true, delete: true },
      'nakshatra-padas': { read: true, create: true, update: true, delete: true },
      tithis: { read: true, create: true, update: true, delete: true },
      yogas: { read: true, create: true, update: true, delete: true },
      karanas: { read: true, create: true, update: true, delete: true },
      kalachakram: { read: true, create: true, update: true, delete: true },
      'tamil-years': { read: true, create: true, update: true, delete: true },
      'tamil-months': { read: true, create: true, update: true, delete: true },
      'kp-horary': { read: true, create: true, update: true, delete: true },
      'kadikara-prasannam': { read: true, create: true, update: true, delete: true },
      users: { read: true, create: true, update: true, delete: true }
    }
  },
  admin: {
    role: 'admin',
    name: 'System Administrator',
    nameTa: 'நிர்வாகி',
    nameHi: 'व्यवस्थापक',
    nameTe: 'సిస్టమ్ అడ్మినిస్ట్రేటర్',
    nameKn: 'ವ್ಯವಸ್ಥಾಪಕ',
    nameMl: 'സിസ്റ്റം അഡ്മിനിസ്ട്രേറ്റർ',
    canAccessAdmin: true,
    canManageUsers: false,
    canManagePermissions: false,
    tablePermissions: {
      horoscopeprofiles: { read: true, create: true, update: true, delete: true },
      planets: { read: true, create: true, update: true, delete: false },
      rasis: { read: true, create: true, update: true, delete: false },
      nakshatras: { read: true, create: true, update: true, delete: false },
      'nakshatra-padas': { read: true, create: true, update: true, delete: false },
      tithis: { read: true, create: true, update: true, delete: false },
      yogas: { read: true, create: true, update: true, delete: false },
      karanas: { read: true, create: true, update: true, delete: false },
      kalachakram: { read: true, create: true, update: true, delete: false },
      'tamil-years': { read: true, create: true, update: true, delete: false },
      'tamil-months': { read: true, create: true, update: true, delete: false },
      'kp-horary': { read: true, create: true, update: true, delete: false },
      'kadikara-prasannam': { read: true, create: true, update: true, delete: false },
      users: { read: true, create: false, update: false, delete: false }
    }
  },
  user: {
    role: 'user',
    name: 'Standard User',
    nameTa: 'பயனர்',
    nameHi: 'सामान्य उपयोगकर्ता',
    nameTe: 'సాధారణ వినియోగదారు',
    nameKn: 'ಸಾಮಾನ್ಯ ಬಳಕೆದಾರ',
    nameMl: 'സാധാരണ ഉപയോക്താവ്',
    canAccessAdmin: false,
    canManageUsers: false,
    canManagePermissions: false,
    tablePermissions: {
      horoscopeprofiles: { read: true, create: true, update: false, delete: false },
      planets: { read: true, create: false, update: false, delete: false },
      rasis: { read: true, create: false, update: false, delete: false },
      nakshatras: { read: true, create: false, update: false, delete: false },
      'nakshatra-padas': { read: true, create: false, update: false, delete: false },
      tithis: { read: true, create: false, update: false, delete: false },
      yogas: { read: true, create: false, update: false, delete: false },
      karanas: { read: true, create: false, update: false, delete: false },
      kalachakram: { read: true, create: false, update: false, delete: false },
      'tamil-years': { read: true, create: false, update: false, delete: false },
      'tamil-months': { read: true, create: false, update: false, delete: false },
      'kp-horary': { read: true, create: false, update: false, delete: false },
      'kadikara-prasannam': { read: true, create: false, update: false, delete: false },
      users: { read: false, create: false, update: false, delete: false }
    }
  }
};

export default mongoose.models.RolePermission || mongoose.model('RolePermission', rolePermissionSchema);
