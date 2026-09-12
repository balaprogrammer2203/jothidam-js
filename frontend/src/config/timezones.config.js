/**
 * Comprehensive IANA Timezones Registry with Categorized Groups and Standard GMT Offsets
 */

export const TIMEZONE_GROUPS = [
  {
    group: 'Common',
    groupTa: 'முக்கிய நேர மண்டலங்கள் (Common)',
    zones: [
      { id: 'Asia/Kolkata', label: 'Asia/Kolkata', offset: '+05:30', desc: 'India Standard Time (IST)' },
      { id: 'Asia/Dubai', label: 'Asia/Dubai', offset: '+04:00', desc: 'Gulf Standard Time (GST - UAE/Dubai)' },
      { id: 'Asia/Singapore', label: 'Asia/Singapore', offset: '+08:00', desc: 'Singapore Standard Time (SGT)' },
      { id: 'Europe/London', label: 'Europe/London', offset: '+00:00', desc: 'Greenwich Mean Time (GMT / BST)' },
      { id: 'America/New_York', label: 'America/New_York', offset: '-05:00', desc: 'Eastern Time (EST / EDT)' },
      { id: 'Asia/Kuala_Lumpur', label: 'Asia/Kuala_Lumpur', offset: '+08:00', desc: 'Malaysia Time (MYT)' },
      { id: 'Australia/Sydney', label: 'Australia/Sydney', offset: '+10:00', desc: 'Australian Eastern Time (AEST)' }
    ]
  },
  {
    group: 'Asia',
    groupTa: 'ஆசியா (Asia)',
    zones: [
      { id: 'Asia/Aden', label: 'Asia/Aden', offset: '+03:00' },
      { id: 'Asia/Almaty', label: 'Asia/Almaty', offset: '+05:00' },
      { id: 'Asia/Amman', label: 'Asia/Amman', offset: '+03:00' },
      { id: 'Asia/Anadyr', label: 'Asia/Anadyr', offset: '+12:00' },
      { id: 'Asia/Aqtau', label: 'Asia/Aqtau', offset: '+05:00' },
      { id: 'Asia/Aqtobe', label: 'Asia/Aqtobe', offset: '+05:00' },
      { id: 'Asia/Ashgabat', label: 'Asia/Ashgabat', offset: '+05:00' },
      { id: 'Asia/Baghdad', label: 'Asia/Baghdad', offset: '+03:00' },
      { id: 'Asia/Bahrain', label: 'Asia/Bahrain', offset: '+03:00' },
      { id: 'Asia/Baku', label: 'Asia/Baku', offset: '+04:00' },
      { id: 'Asia/Bangkok', label: 'Asia/Bangkok', offset: '+07:00' },
      { id: 'Asia/Beirut', label: 'Asia/Beirut', offset: '+02:00' },
      { id: 'Asia/Bishkek', label: 'Asia/Bishkek', offset: '+06:00' },
      { id: 'Asia/Brunei', label: 'Asia/Brunei', offset: '+08:00' },
      { id: 'Asia/Colombo', label: 'Asia/Colombo', offset: '+05:30' },
      { id: 'Asia/Damascus', label: 'Asia/Damascus', offset: '+03:00' },
      { id: 'Asia/Dhaka', label: 'Asia/Dhaka', offset: '+06:00' },
      { id: 'Asia/Dili', label: 'Asia/Dili', offset: '+09:00' },
      { id: 'Asia/Dubai', label: 'Asia/Dubai', offset: '+04:00' },
      { id: 'Asia/Dushanbe', label: 'Asia/Dushanbe', offset: '+05:00' },
      { id: 'Asia/Gaza', label: 'Asia/Gaza', offset: '+02:00' },
      { id: 'Asia/Hong_Kong', label: 'Asia/Hong_Kong', offset: '+08:00' },
      { id: 'Asia/Hovd', label: 'Asia/Hovd', offset: '+07:00' },
      { id: 'Asia/Irkutsk', label: 'Asia/Irkutsk', offset: '+08:00' },
      { id: 'Asia/Jakarta', label: 'Asia/Jakarta', offset: '+07:00' },
      { id: 'Asia/Jayapura', label: 'Asia/Jayapura', offset: '+09:00' },
      { id: 'Asia/Jerusalem', label: 'Asia/Jerusalem', offset: '+02:00' },
      { id: 'Asia/Kabul', label: 'Asia/Kabul', offset: '+04:30' },
      { id: 'Asia/Kamchatka', label: 'Asia/Kamchatka', offset: '+12:00' },
      { id: 'Asia/Karachi', label: 'Asia/Karachi', offset: '+05:00' },
      { id: 'Asia/Kathmandu', label: 'Asia/Kathmandu', offset: '+05:45' },
      { id: 'Asia/Khandyga', label: 'Asia/Khandyga', offset: '+09:00' },
      { id: 'Asia/Kolkata', label: 'Asia/Kolkata', offset: '+05:30' },
      { id: 'Asia/Krasnoyarsk', label: 'Asia/Krasnoyarsk', offset: '+07:00' },
      { id: 'Asia/Kuala_Lumpur', label: 'Asia/Kuala_Lumpur', offset: '+08:00' },
      { id: 'Asia/Kuching', label: 'Asia/Kuching', offset: '+08:00' },
      { id: 'Asia/Kuwait', label: 'Asia/Kuwait', offset: '+03:00' },
      { id: 'Asia/Macau', label: 'Asia/Macau', offset: '+08:00' },
      { id: 'Asia/Magadan', label: 'Asia/Magadan', offset: '+11:00' },
      { id: 'Asia/Makassar', label: 'Asia/Makassar', offset: '+08:00' },
      { id: 'Asia/Manila', label: 'Asia/Manila', offset: '+08:00' },
      { id: 'Asia/Muscat', label: 'Asia/Muscat', offset: '+04:00' },
      { id: 'Asia/Nicosia', label: 'Asia/Nicosia', offset: '+02:00' },
      { id: 'Asia/Novokuznetsk', label: 'Asia/Novokuznetsk', offset: '+07:00' },
      { id: 'Asia/Novosibirsk', label: 'Asia/Novosibirsk', offset: '+07:00' },
      { id: 'Asia/Omsk', label: 'Asia/Omsk', offset: '+06:00' },
      { id: 'Asia/Oral', label: 'Asia/Oral', offset: '+05:00' },
      { id: 'Asia/Phnom_Penh', label: 'Asia/Phnom_Penh', offset: '+07:00' },
      { id: 'Asia/Pontianak', label: 'Asia/Pontianak', offset: '+07:00' },
      { id: 'Asia/Pyongyang', label: 'Asia/Pyongyang', offset: '+09:00' },
      { id: 'Asia/Qatar', label: 'Asia/Qatar', offset: '+03:00' },
      { id: 'Asia/Qostanay', label: 'Asia/Qostanay', offset: '+05:00' },
      { id: 'Asia/Qyzylorda', label: 'Asia/Qyzylorda', offset: '+05:00' },
      { id: 'Asia/Riyadh', label: 'Asia/Riyadh', offset: '+03:00' },
      { id: 'Asia/Sakhalin', label: 'Asia/Sakhalin', offset: '+11:00' },
      { id: 'Asia/Samarkand', label: 'Asia/Samarkand', offset: '+05:00' },
      { id: 'Asia/Seoul', label: 'Asia/Seoul', offset: '+09:00' },
      { id: 'Asia/Shanghai', label: 'Asia/Shanghai', offset: '+08:00' },
      { id: 'Asia/Singapore', label: 'Asia/Singapore', offset: '+08:00' },
      { id: 'Asia/Srednekolymsk', label: 'Asia/Srednekolymsk', offset: '+11:00' },
      { id: 'Asia/Taipei', label: 'Asia/Taipei', offset: '+08:00' },
      { id: 'Asia/Tashkent', label: 'Asia/Tashkent', offset: '+05:00' },
      { id: 'Asia/Tbilisi', label: 'Asia/Tbilisi', offset: '+04:00' },
      { id: 'Asia/Tehran', label: 'Asia/Tehran', offset: '+03:30' },
      { id: 'Asia/Thimphu', label: 'Asia/Thimphu', offset: '+06:00' },
      { id: 'Asia/Tokyo', label: 'Asia/Tokyo', offset: '+09:00' },
      { id: 'Asia/Tomsk', label: 'Asia/Tomsk', offset: '+07:00' },
      { id: 'Asia/Ulaanbaatar', label: 'Asia/Ulaanbaatar', offset: '+08:00' },
      { id: 'Asia/Urumqi', label: 'Asia/Urumqi', offset: '+06:00' },
      { id: 'Asia/Ust-Nera', label: 'Asia/Ust-Nera', offset: '+10:00' },
      { id: 'Asia/Vientiane', label: 'Asia/Vientiane', offset: '+07:00' },
      { id: 'Asia/Vladivostok', label: 'Asia/Vladivostok', offset: '+10:00' },
      { id: 'Asia/Yakutsk', label: 'Asia/Yakutsk', offset: '+09:00' },
      { id: 'Asia/Yangon', label: 'Asia/Yangon', offset: '+06:30' },
      { id: 'Asia/Yekaterinburg', label: 'Asia/Yekaterinburg', offset: '+05:00' },
      { id: 'Asia/Yerevan', label: 'Asia/Yerevan', offset: '+04:00' }
    ]
  },
  {
    group: 'Europe',
    groupTa: 'ஐரோப்பா (Europe)',
    zones: [
      { id: 'Europe/Amsterdam', label: 'Europe/Amsterdam', offset: '+01:00' },
      { id: 'Europe/Andorra', label: 'Europe/Andorra', offset: '+01:00' },
      { id: 'Europe/Athens', label: 'Europe/Athens', offset: '+02:00' },
      { id: 'Europe/Belgrade', label: 'Europe/Belgrade', offset: '+01:00' },
      { id: 'Europe/Berlin', label: 'Europe/Berlin', offset: '+01:00' },
      { id: 'Europe/Brussels', label: 'Europe/Brussels', offset: '+01:00' },
      { id: 'Europe/Bucharest', label: 'Europe/Bucharest', offset: '+02:00' },
      { id: 'Europe/Budapest', label: 'Europe/Budapest', offset: '+01:00' },
      { id: 'Europe/Copenhagen', label: 'Europe/Copenhagen', offset: '+01:00' },
      { id: 'Europe/Dublin', label: 'Europe/Dublin', offset: '+00:00' },
      { id: 'Europe/Gibraltar', label: 'Europe/Gibraltar', offset: '+01:00' },
      { id: 'Europe/Helsinki', label: 'Europe/Helsinki', offset: '+02:00' },
      { id: 'Europe/Istanbul', label: 'Europe/Istanbul', offset: '+03:00' },
      { id: 'Europe/Kyiv', label: 'Europe/Kyiv', offset: '+02:00' },
      { id: 'Europe/Lisbon', label: 'Europe/Lisbon', offset: '+00:00' },
      { id: 'Europe/London', label: 'Europe/London', offset: '+00:00' },
      { id: 'Europe/Luxembourg', label: 'Europe/Luxembourg', offset: '+01:00' },
      { id: 'Europe/Madrid', label: 'Europe/Madrid', offset: '+01:00' },
      { id: 'Europe/Malta', label: 'Europe/Malta', offset: '+01:00' },
      { id: 'Europe/Minsk', label: 'Europe/Minsk', offset: '+03:00' },
      { id: 'Europe/Monaco', label: 'Europe/Monaco', offset: '+01:00' },
      { id: 'Europe/Moscow', label: 'Europe/Moscow', offset: '+03:00' },
      { id: 'Europe/Oslo', label: 'Europe/Oslo', offset: '+01:00' },
      { id: 'Europe/Paris', label: 'Europe/Paris', offset: '+01:00' },
      { id: 'Europe/Prague', label: 'Europe/Prague', offset: '+01:00' },
      { id: 'Europe/Riga', label: 'Europe/Riga', offset: '+02:00' },
      { id: 'Europe/Rome', label: 'Europe/Rome', offset: '+01:00' },
      { id: 'Europe/Samara', label: 'Europe/Samara', offset: '+04:00' },
      { id: 'Europe/Sofia', label: 'Europe/Sofia', offset: '+02:00' },
      { id: 'Europe/Stockholm', label: 'Europe/Stockholm', offset: '+01:00' },
      { id: 'Europe/Tallinn', label: 'Europe/Tallinn', offset: '+02:00' },
      { id: 'Europe/Vienna', label: 'Europe/Vienna', offset: '+01:00' },
      { id: 'Europe/Vilnius', label: 'Europe/Vilnius', offset: '+02:00' },
      { id: 'Europe/Warsaw', label: 'Europe/Warsaw', offset: '+01:00' },
      { id: 'Europe/Zurich', label: 'Europe/Zurich', offset: '+01:00' }
    ]
  },
  {
    group: 'America',
    groupTa: 'அமெரிக்கா (America)',
    zones: [
      { id: 'America/Anchorage', label: 'America/Anchorage', offset: '-09:00' },
      { id: 'America/Barbados', label: 'America/Barbados', offset: '-04:00' },
      { id: 'America/Bogota', label: 'America/Bogota', offset: '-05:00' },
      { id: 'America/Buenos_Aires', label: 'America/Buenos_Aires', offset: '-03:00' },
      { id: 'America/Cancun', label: 'America/Cancun', offset: '-05:00' },
      { id: 'America/Caracas', label: 'America/Caracas', offset: '-04:00' },
      { id: 'America/Cayenne', label: 'America/Cayenne', offset: '-03:00' },
      { id: 'America/Chicago', label: 'America/Chicago', offset: '-06:00' },
      { id: 'America/Costa_Rica', label: 'America/Costa_Rica', offset: '-06:00' },
      { id: 'America/Denver', label: 'America/Denver', offset: '-07:00' },
      { id: 'America/Detroit', label: 'America/Detroit', offset: '-05:00' },
      { id: 'America/Edmonton', label: 'America/Edmonton', offset: '-07:00' },
      { id: 'America/Guatemala', label: 'America/Guatemala', offset: '-06:00' },
      { id: 'America/Halifax', label: 'America/Halifax', offset: '-04:00' },
      { id: 'America/Havana', label: 'America/Havana', offset: '-05:00' },
      { id: 'America/Jamaica', label: 'America/Jamaica', offset: '-05:00' },
      { id: 'America/Lima', label: 'America/Lima', offset: '-05:00' },
      { id: 'America/Los_Angeles', label: 'America/Los_Angeles', offset: '-08:00' },
      { id: 'America/Manaus', label: 'America/Manaus', offset: '-04:00' },
      { id: 'America/Mexico_City', label: 'America/Mexico_City', offset: '-06:00' },
      { id: 'America/Montevideo', label: 'America/Montevideo', offset: '-03:00' },
      { id: 'America/New_York', label: 'America/New_York', offset: '-05:00' },
      { id: 'America/Panama', label: 'America/Panama', offset: '-05:00' },
      { id: 'America/Phoenix', label: 'America/Phoenix', offset: '-07:00' },
      { id: 'America/Santiago', label: 'America/Santiago', offset: '-04:00' },
      { id: 'America/Santo_Domingo', label: 'America/Santo_Domingo', offset: '-04:00' },
      { id: 'America/Sao_Paulo', label: 'America/Sao_Paulo', offset: '-03:00' },
      { id: 'America/St_Johns', label: 'America/St_Johns', offset: '-03:30' },
      { id: 'America/Tijuana', label: 'America/Tijuana', offset: '-08:00' },
      { id: 'America/Toronto', label: 'America/Toronto', offset: '-05:00' },
      { id: 'America/Vancouver', label: 'America/Vancouver', offset: '-08:00' },
      { id: 'America/Winnipeg', label: 'America/Winnipeg', offset: '-06:00' }
    ]
  },
  {
    group: 'Australia & Pacific',
    groupTa: 'ஆஸ்திரேலியா & பசிபிக் (Australia & Pacific)',
    zones: [
      { id: 'Australia/Adelaide', label: 'Australia/Adelaide', offset: '+09:30' },
      { id: 'Australia/Brisbane', label: 'Australia/Brisbane', offset: '+10:00' },
      { id: 'Australia/Darwin', label: 'Australia/Darwin', offset: '+09:30' },
      { id: 'Australia/Hobart', label: 'Australia/Hobart', offset: '+10:00' },
      { id: 'Australia/Melbourne', label: 'Australia/Melbourne', offset: '+10:00' },
      { id: 'Australia/Perth', label: 'Australia/Perth', offset: '+08:00' },
      { id: 'Australia/Sydney', label: 'Australia/Sydney', offset: '+10:00' },
      { id: 'Pacific/Auckland', label: 'Pacific/Auckland', offset: '+12:00' },
      { id: 'Pacific/Chatham', label: 'Pacific/Chatham', offset: '+12:45' },
      { id: 'Pacific/Fiji', label: 'Pacific/Fiji', offset: '+12:00' },
      { id: 'Pacific/Guam', label: 'Pacific/Guam', offset: '+10:00' },
      { id: 'Pacific/Honolulu', label: 'Pacific/Honolulu', offset: '-10:00' },
      { id: 'Pacific/Noumea', label: 'Pacific/Noumea', offset: '+11:00' },
      { id: 'Pacific/Pago_Pago', label: 'Pacific/Pago_Pago', offset: '-11:00' },
      { id: 'Pacific/Port_Moresby', label: 'Pacific/Port_Moresby', offset: '+10:00' },
      { id: 'Pacific/Rarotonga', label: 'Pacific/Rarotonga', offset: '-10:00' },
      { id: 'Pacific/Tahiti', label: 'Pacific/Tahiti', offset: '-10:00' },
      { id: 'Pacific/Tongatapu', label: 'Pacific/Tongatapu', offset: '+13:00' }
    ]
  },
  {
    group: 'Africa',
    groupTa: 'ஆப்பிரிக்கா (Africa)',
    zones: [
      { id: 'Africa/Abidjan', label: 'Africa/Abidjan', offset: '+00:00' },
      { id: 'Africa/Accra', label: 'Africa/Accra', offset: '+00:00' },
      { id: 'Africa/Addis_Ababa', label: 'Africa/Addis_Ababa', offset: '+03:00' },
      { id: 'Africa/Algiers', label: 'Africa/Algiers', offset: '+01:00' },
      { id: 'Africa/Cairo', label: 'Africa/Cairo', offset: '+02:00' },
      { id: 'Africa/Casablanca', label: 'Africa/Casablanca', offset: '+01:00' },
      { id: 'Africa/Dar_es_Salaam', label: 'Africa/Dar_es_Salaam', offset: '+03:00' },
      { id: 'Africa/Johannesburg', label: 'Africa/Johannesburg', offset: '+02:00' },
      { id: 'Africa/Lagos', label: 'Africa/Lagos', offset: '+01:00' },
      { id: 'Africa/Nairobi', label: 'Africa/Nairobi', offset: '+03:00' },
      { id: 'Africa/Tripoli', label: 'Africa/Tripoli', offset: '+02:00' },
      { id: 'Africa/Tunis', label: 'Africa/Tunis', offset: '+01:00' }
    ]
  }
];

/**
 * Quick lookup map from IANA timezone ID to GMT offset string
 */
export const TIMEZONE_OFFSET_MAP = {};
TIMEZONE_GROUPS.forEach((group) => {
  group.zones.forEach((zone) => {
    if (!TIMEZONE_OFFSET_MAP[zone.id]) {
      TIMEZONE_OFFSET_MAP[zone.id] = zone.offset;
    }
  });
});

/**
 * Get GMT offset for a given timezone ID (defaults to +05:30)
 */
export function getGmtOffsetForTimezone(tzId) {
  if (!tzId) return '+05:30';
  return TIMEZONE_OFFSET_MAP[tzId] || '+05:30';
}

/**
 * DST (Daylight Saving Time Correction) Options matching screenshot
 */
export const DST_OPTIONS = [
  {
    id: 'standard',
    offset: '+00:00',
    offsetHours: 0,
    label: {
      ta: 'நிலையான நேரம்',
      en: 'Standard Time (No DST)',
      hi: 'मानक समय (Standard Time)',
      te: 'ప్రామాణిక సమయం (Standard Time)',
      kn: 'ಪ್ರಮಾಣಿತ ಸಮಯ (Standard Time)',
      ml: 'സാധാരണ സമയം (Standard Time)'
    }
  },
  {
    id: 'daylight_saving',
    offset: '+01:00',
    offsetHours: 1,
    label: {
      ta: 'கோடைக்கால நேரம் [பகலொளி சேமிப்பு]',
      en: 'Daylight Saving Time [DST] (+1 hr)',
      hi: 'डेलाइट सेविंग टाइम [DST] (+1 hr)',
      te: 'డేలైట్ సేవింగ్ టైమ్ [DST] (+1 hr)',
      kn: 'ಡೇಲೈಟ್ ಸೇವಿಂಗ್ ಟೈಮ್ [DST] (+1 hr)',
      ml: 'ഡേലൈറ്റ് സേവിംഗ് ടൈം [DST] (+1 hr)'
    }
  },
  {
    id: 'double_daylight_saving',
    offset: '+02:00',
    offsetHours: 2,
    label: {
      ta: 'இரட்டை கோடைக்கால நேரம்',
      en: 'Double Daylight Saving Time (+2 hrs)',
      hi: 'डबल डेलाइट सेविंग टाइम (+2 hrs)',
      te: 'డబుల్ డేలైట్ సేవింగ్ టైమ్ (+2 hrs)',
      kn: 'ಡಬಲ್ ಡೇಲೈಟ್ ಸೇವಿಂಗ್ ಟೈಮ್ (+2 hrs)',
      ml: 'ഡബിൾ ഡേലൈറ്റ് സേവിംഗ് ടൈം (+2 hrs)'
    }
  },
  {
    id: 'war_time',
    offset: '+01:00',
    offsetHours: 1,
    label: {
      ta: 'போர்க்கால நேரம்',
      en: 'War Time (+1 hr)',
      hi: 'युद्ध समय (War Time)',
      te: 'యుద్ధ సమయం (War Time)',
      kn: 'ಯುದ್ಧ ಸಮಯ (War Time)',
      ml: 'യുദ്ധകാല സമയം (War Time)'
    }
  }
];
