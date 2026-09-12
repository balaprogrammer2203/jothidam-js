import swisseph from 'sweph';

const swe = swisseph.default || swisseph;

const RASIS = [
  'மேஷம்', 'ரிஷபம்', 'மிதுனம்', 'கடகம்',
  'சிம்மம்', 'கன்னி', 'துலாம்', 'விருச்சிகம்',
  'தனுசு', 'மகரம்', 'கும்பம்', 'மீனம்'
];

const NAKSHATRAS = [
  'அஸ்வினி', 'பரணி', 'கார்த்திகை', 'ரோகிணி', 'மிருகசீரிஷம்', 'திருவாதிரை',
  'புனர்பூசம்', 'பூசம்', 'ஆயில்யம்', 'மகம்', 'பூரம்', 'உத்திரம்',
  'ஹஸ்தம்', 'சித்திரை', 'சுவாதி', 'விசாகம்', 'அனுஷம்', 'கேட்டை',
  'மூலம்', 'பூராடம்', 'உத்திராடம்', 'திருவோணம்', 'அவிட்டம்', 'சதயம்',
  'பூரட்டாதி', 'உத்திரட்டாதி', 'ரேவதி'
];

const PLANETS = [
  { id: swe.SE_SUN ?? 0, name: 'Sun', nameTa: 'சூரியன்' },
  { id: swe.SE_MOON ?? 1, name: 'Moon', nameTa: 'சந்திரன்' },
  { id: swe.SE_MARS ?? 4, name: 'Mars', nameTa: 'செவ்வாய்' },
  { id: swe.SE_MERCURY ?? 2, name: 'Mercury', nameTa: 'புதன்' },
  { id: swe.SE_JUPITER ?? 5, name: 'Jupiter', nameTa: 'குரு' },
  { id: swe.SE_VENUS ?? 3, name: 'Venus', nameTa: 'சுக்கிரன்' },
  { id: swe.SE_SATURN ?? 6, name: 'Saturn', nameTa: 'சனி' },
  { id: swe.SE_TRUE_NODE ?? 11, name: 'Rahu', nameTa: 'ராகு' },
];

const toRad = (d) => (d * Math.PI) / 180.0;
const toDeg = (r) => (r * 180.0) / Math.PI;

export const AYANAMSA_MODES = {
  lahiri: {
    key: 'lahiri',
    id: swe.SE_SIDM_LAHIRI ?? 1,
    name: 'Lahiri (Chitra Paksha)',
    nameTa: 'லாஹிரி (சித்ரபக்ஷம்)'
  },
  kp_old: {
    key: 'kp_old',
    id: swe.SE_SIDM_KRISHNAMURTI ?? 5,
    name: 'K.P. old',
    nameTa: 'கே.பி. பழையது'
  },
  kp_new: {
    key: 'kp_new',
    id: swe.SE_SIDM_KRISHNAMURTI_SENTHILATHIBAN ?? 45,
    name: 'KP New',
    nameTa: 'கே.பி. புதியது'
  },
  kp_newcomb: {
    key: 'kp_newcomb',
    id: swe.SE_SIDM_USER ?? 255,
    name: 'KP-Newcomb',
    nameTa: 'கே.பி. நியூகோம்ப்'
  },
  bv_raman: {
    key: 'bv_raman',
    id: swe.SE_SIDM_RAMAN ?? 3,
    name: 'B.V. Raman',
    nameTa: 'பி.வி. ராமன்'
  },
  khullar: {
    key: 'khullar',
    id: swe.SE_SIDM_USER ?? 255,
    name: 'Khullar Ayanamsa',
    nameTa: 'குல்லர் அயனாம்சம்'
  }
};

const AYANAMSA_LOOKUP_MAP = {
  'lahiri': 'lahiri',
  'lahiri (chitra paksha)': 'lahiri',
  'chitra paksha': 'lahiri',
  'chitrapaksha': 'lahiri',
  'kp_old': 'kp_old',
  'k.p. old': 'kp_old',
  'kp old': 'kp_old',
  'kp-old': 'kp_old',
  'kp_new': 'kp_new',
  'kp new': 'kp_new',
  'k.p. new': 'kp_new',
  'kp-new': 'kp_new',
  'kp_newcomb': 'kp_newcomb',
  'kp-newcomb': 'kp_newcomb',
  'kp newcomb': 'kp_newcomb',
  'kpnewcomb': 'kp_newcomb',
  'k.p. newcomb': 'kp_newcomb',
  'k.p.-newcomb': 'kp_newcomb',
  'bv_raman': 'bv_raman',
  'b.v. raman': 'bv_raman',
  'bv raman': 'bv_raman',
  'raman': 'bv_raman',
  'khullar': 'khullar',
  'khullar ayanamsa': 'khullar'
};

export function resolveAyanamsaKey(val) {
  if (!val) return 'lahiri';
  if (typeof val === 'number') {
    if (val === 1) return 'lahiri';
    if (val === 5) return 'kp_old';
    if (val === 45) return 'kp_new';
    if (val === 3) return 'bv_raman';
    if (val === 255) return 'khullar';
  }
  const clean = String(val).toLowerCase().trim();
  return AYANAMSA_LOOKUP_MAP[clean] || 'lahiri';
}

/**
 * Classical Vedic Parashara Navamsa (D9) calculation based on element triplicities
 * Fire (0, 4, 8)  -> Starts from Mesham (0)
 * Earth (1, 5, 9) -> Starts from Makaram (9)
 * Air (2, 6, 10)  -> Starts from Thulam (6)
 * Water (3, 7, 11)-> Starts from Katakam (3)
 */
export function getNavamsaRasiId(rasiId, degreeInRasi) {
  const ONE_NAVAMSA_DEG = 30.0 / 9.0; // 3° 20' = 3.33333333°
  const navamsaIndex = Math.min(Math.floor(degreeInRasi / ONE_NAVAMSA_DEG), 8);

  const element = rasiId % 4; // 0: Fire, 1: Earth, 2: Air, 3: Water
  let startingRasi = 0;

  if (element === 0) {
    startingRasi = 0; // Mesham
  } else if (element === 1) {
    startingRasi = 9; // Makaram
  } else if (element === 2) {
    startingRasi = 6; // Thulam
  } else {
    startingRasi = 3; // Katakam
  }

  return (startingRasi + navamsaIndex) % 12;
}

const isLeapYear = (y) => (y % 4 === 0 && y % 100 !== 0) || (y % 400 === 0);
const getDayOfYear = (y, m, d) => {
  const daysInMonths = [0, 31, isLeapYear(y) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let sum = 0;
  for (let i = 1; i < m; i++) sum += daysInMonths[i];
  return sum + d;
};

function parseOffsetToHours(offsetStr, defaultHours = 5.5) {
  if (!offsetStr || typeof offsetStr !== 'string') return defaultHours;
  const trimmed = offsetStr.trim();
  const sign = trimmed.startsWith('-') ? -1 : 1;
  const cleaned = trimmed.replace(/^[+-]/, '').trim();
  const parts = cleaned.split(':').map(Number);
  const hours = isNaN(parts[0]) ? 0 : parts[0];
  const mins = isNaN(parts[1]) ? 0 : parts[1];
  return sign * (hours + mins / 60.0);
}

export const calculateVedicChart = async ({ dob, tob, latitude, longitude, ayanamsa = 'lahiri', timezone = '+05:30', gmt = '+05:30', dst = '+00:00' }) => {
  const [year, month, day] = dob.split('-').map(Number);
  const [hour, minute, sec] = tob.split(':').map(Number);

  const latNum = parseFloat(latitude);
  const lngNum = parseFloat(longitude);

  // 1. Timezone & DST Offset: Local time to UTC decimal hours
  const tzOffsetStr = gmt || timezone || '+05:30';
  const tzOffsetHours = parseOffsetToHours(tzOffsetStr, 5.5);
  const dstOffsetHours = parseOffsetToHours(dst, 0.0);
  const totalOffsetHours = tzOffsetHours + dstOffsetHours;

  const utcDecimalHours = (hour + minute / 60.0 + (sec || 0) / 3600.0) - totalOffsetHours;

  const juldayFunc = swe.julday || swe.swe_julday;
  const setSidModeFunc = swe.set_sid_mode || swe.swe_set_sid_mode;
  const getAyanamsaFunc = swe.get_ayanamsa_ut || swe.swe_get_ayanamsa_ut;
  const calcUtFunc = swe.calc_ut || swe.swe_calc_ut;

  // 2. Julian Day UT
  const juldayUtc = juldayFunc(year, month, day, utcDecimalHours, swe.SE_GREG_CAL ?? 1);

  // 3. Resolve and Set Sidereal Ayanamsa Mode
  const ayanamsaKey = resolveAyanamsaKey(ayanamsa);
  const modeConfig = AYANAMSA_MODES[ayanamsaKey] || AYANAMSA_MODES.lahiri;

  let ayanamsaVal = 0;
  if (ayanamsaKey === 'kp_newcomb') {
    // KP-Newcomb: Simon Newcomb precession rate (50.2388475"/year) anchored dynamically from 291 AD zero epoch
    const doy = getDayOfYear(year, month, day);
    const yearFraction = year + (doy - 1 + utcDecimalHours / 24.0) / 365.25;
    const epoch291 = 291.2777778; // 291 AD zero ayanamsa epoch
    ayanamsaVal = (yearFraction - epoch291) * (50.2388475 / 3600.0);
    if (setSidModeFunc) {
      setSidModeFunc(swe.SE_SIDM_USER ?? 255, juldayUtc, ayanamsaVal);
    }
  } else if (ayanamsaKey === 'khullar') {
    const khullarAyanVal = (50.2388475 / 3600.0) * ((year - 292) + (261 / 365.0) + (((month - 1) * 30 + day) / 365.0));
    ayanamsaVal = khullarAyanVal;
    if (setSidModeFunc) {
      setSidModeFunc(swe.SE_SIDM_USER ?? 255, juldayUtc, khullarAyanVal);
    }
  } else if (setSidModeFunc) {
    setSidModeFunc(modeConfig.id, 0, 0);
    ayanamsaVal = getAyanamsaFunc ? getAyanamsaFunc(juldayUtc) : 0;
  }

  // 4. Exact Astronomical Sidereal Ascendant (Lagnam)
  const speedFlag = swe.SEFLG_SPEED ?? 256;

  let ascLongitude = 0;
  if (swe.houses) {
    try {
      const houseRes = swe.houses(juldayUtc, latNum, lngNum, 'P');
      if (houseRes && houseRes.data && houseRes.data.points) {
        ascLongitude = ((houseRes.data.points[0] - ayanamsaVal) + 360) % 360;
      }
    } catch (e) {
      console.warn('swe.houses failed, falling back:', e);
    }
  } else if (swe.houses_ex) {
    try {
      const siderealFlag = swe.SEFLG_SIDEREAL ?? (64 * 1024);
      const houseRes = swe.houses_ex(juldayUtc, siderealFlag, latNum, lngNum, 'P');
      if (houseRes && houseRes.data && houseRes.data.points) {
        ascLongitude = (houseRes.data.points[0] + 360) % 360;
      }
    } catch (e) {
      console.warn('swe.houses_ex failed, falling back:', e);
    }
  }

  // Fallback to manual formula if swe houses functions were unavailable
  if (!ascLongitude) {
    const T = (juldayUtc - 2451545.0) / 36525.0;
    let gmstHours = 24110.54841 + 8640184.812866 * T + 0.093104 * (T * T) - 0.0000062 * (T * T * T);
    gmstHours = ((gmstHours / 3600.0) % 24 + 24) % 24;

    const utHourFrac = ((utcDecimalHours % 24) + 24) % 24;
    const gmstNow = (gmstHours + utHourFrac * 1.00273790935) % 24;
    const ramc = ((gmstNow * 15.0 + lngNum) % 360 + 360) % 360;

    const eps = 23.4392911 - (46.8150 * T) / 3600.0;

    const sinRamc = Math.sin(toRad(ramc));
    const cosRamc = Math.cos(toRad(ramc));
    const sinEps = Math.sin(toRad(eps));
    const cosEps = Math.cos(toRad(eps));
    const tanLat = Math.tan(toRad(latNum));

    const y = cosRamc;
    const x = -(sinRamc * cosEps + tanLat * sinEps);

    let sayanaAsc = toDeg(Math.atan2(y, x));
    sayanaAsc = (sayanaAsc + 360) % 360;

    ascLongitude = (sayanaAsc - ayanamsaVal + 360) % 360;
  }

  const ONE_NAKSHATRA = 360 / 27; // 13° 20' = 13.33333333°
  const ONE_PADA = 360 / 108; // 3° 20' = 3.33333333°

  const ascRasiId = Math.floor(ascLongitude / 30);
  const ascDegreeInRasi = ascLongitude % 30;
  const ascNavamsaRasiId = getNavamsaRasiId(ascRasiId, ascDegreeInRasi);
  const ascNakshatraId = Math.floor(ascLongitude / ONE_NAKSHATRA);
  const ascNakshatraDeg = ascLongitude % ONE_NAKSHATRA;
  const ascPada = Math.floor(ascNakshatraDeg / ONE_PADA) + 1;

  const rasiPositions = [];

  // Lagna entry
  rasiPositions.push({
    name: 'Lagna',
    nameTa: 'லக்னம்',
    longitude: ascLongitude,
    speed: 0,
    isRetrograde: false,
    rasiId: ascRasiId,
    rasiNameTa: RASIS[ascRasiId],
    degreeInRasi: ascDegreeInRasi,
    nakshatraId: ascNakshatraId,
    nakshatraNameTa: NAKSHATRAS[ascNakshatraId],
    pada: ascPada,
    navamsaRasiId: ascNavamsaRasiId
  });

  // 5. Planetary Positions
  const isKpMode = ['kp_newcomb', 'kp_old', 'kp_new', 'khullar'].includes(ayanamsaKey);
  const rahuPlanetId = isKpMode ? (swe.SE_MEAN_NODE ?? 10) : (swe.SE_MEAN_NODE ?? 10);

  for (const planet of PLANETS) {
    const planetId = planet.name === 'Rahu' ? rahuPlanetId : planet.id;
    const body = calcUtFunc(juldayUtc, planetId, speedFlag);
    const tropLon = ((body.longitude ?? body.data?.[0] ?? 0) + 360) % 360;
    const longitudeVal = ((tropLon - ayanamsaVal) + 360) % 360;
    const speedVal = body.longitudeSpeed ?? body.data?.[3] ?? 0;
    const rasiId = Math.floor(longitudeVal / 30);
    const degreeInRasi = longitudeVal % 30;
    const navamsaRasiId = getNavamsaRasiId(rasiId, degreeInRasi);

    const nakshatraId = Math.floor(longitudeVal / ONE_NAKSHATRA);
    const nakshatraDeg = longitudeVal % ONE_NAKSHATRA;
    const pada = Math.floor(nakshatraDeg / ONE_PADA) + 1;

    rasiPositions.push({
      name: planet.name,
      nameTa: planet.nameTa,
      longitude: longitudeVal,
      speed: speedVal,
      isRetrograde: speedVal < 0,
      rasiId: rasiId,
      rasiNameTa: RASIS[rasiId],
      degreeInRasi: degreeInRasi,
      nakshatraId: nakshatraId,
      nakshatraNameTa: NAKSHATRAS[nakshatraId],
      pada: pada,
      navamsaRasiId: navamsaRasiId
    });
  }

  // 6. Ketu Calculation (180° opposite of Rahu)
  const rahuPos = rasiPositions.find(p => p.name === 'Rahu');
  const ketuLong = ((rahuPos?.longitude ?? 0) + 180) % 360;
  const ketuRasiId = Math.floor(ketuLong / 30);
  const ketuDegreeInRasi = ketuLong % 30;
  const ketuNavamsaRasiId = getNavamsaRasiId(ketuRasiId, ketuDegreeInRasi);

  const ketuNakshatraId = Math.floor(ketuLong / ONE_NAKSHATRA);
  const ketuNakshatraDeg = ketuLong % ONE_NAKSHATRA;
  const ketuPada = Math.floor(ketuNakshatraDeg / ONE_PADA) + 1;

  rasiPositions.push({
    name: 'Ketu',
    nameTa: 'கேது',
    longitude: ketuLong,
    speed: rahuPos ? rahuPos.speed : 0,
    isRetrograde: true,
    rasiId: ketuRasiId,
    rasiNameTa: RASIS[ketuRasiId],
    degreeInRasi: ketuDegreeInRasi,
    nakshatraId: ketuNakshatraId,
    nakshatraNameTa: NAKSHATRAS[ketuNakshatraId],
    pada: ketuPada,
    navamsaRasiId: ketuNavamsaRasiId
  });

  // 7. Maandi (மாந்தி) Calculation according to Thirukanitha Panchangam (Drik Ganita)
  // Classical Ghatis for Maandi:
  // Day Birth (பகல்): Sun: 26, Mon: 22, Tue: 18, Wed: 14, Thu: 10, Fri: 6, Sat: 2
  // Night Birth (இரவு): Sun: 10, Mon: 6, Tue: 2, Wed: 26, Thu: 22, Fri: 18, Sat: 14
  const MAANDI_DAY_GHATIS = [26, 22, 18, 14, 10, 6, 2];
  const MAANDI_NIGHT_GHATIS = [10, 6, 2, 26, 22, 18, 14];

  const getSunRiseAndSetJd = (y, m, d, lat, lng) => {
    const jdMidnightUtc = juldayFunc(y, m, d, 0, swe.SE_GREG_CAL ?? 1);
    let riseJd = null;
    let setJd = null;

    if (swe.rise_trans) {
      try {
        const sunId = swe.SE_SUN ?? swe.constants?.SE_SUN ?? 0;
        const flg = swe.SEFLG_SWIEPH ?? swe.constants?.SEFLG_SWIEPH ?? 2;
        const calcRise = swe.SE_CALC_RISE ?? swe.constants?.SE_CALC_RISE ?? 1;
        const calcSet = swe.SE_CALC_SET ?? swe.constants?.SE_CALC_SET ?? 2;

        const riseRes = swe.rise_trans(jdMidnightUtc, sunId, null, flg, calcRise, [lng, lat, 0], 0, 0);
        if (riseRes && riseRes.data) riseJd = riseRes.data;

        const setRes = swe.rise_trans(jdMidnightUtc, sunId, null, flg, calcSet, [lng, lat, 0], 0, 0);
        if (setRes && setRes.data) setJd = setRes.data;
      } catch (e) {
        console.warn('swe.rise_trans error, using astronomical fallback:', e);
      }
    }

    if (!riseJd || !setJd) {
      const approxRiseUtcHour = ((6.0 - totalOffsetHours) % 24 + 24) % 24;
      const approxSetUtcHour = ((18.0 - totalOffsetHours) % 24 + 24) % 24;
      riseJd = juldayFunc(y, m, d, approxRiseUtcHour, swe.SE_GREG_CAL ?? 1);
      setJd = juldayFunc(y, m, d, approxSetUtcHour, swe.SE_GREG_CAL ?? 1);
    }

    return { riseJd, setJd };
  };

  const { riseJd: todayRiseJd, setJd: todaySetJd } = getSunRiseAndSetJd(year, month, day, latNum, lngNum);
  const birthDateUtc = new Date(Date.UTC(year, month - 1, day));
  const calWeekday = birthDateUtc.getUTCDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat

  let maandiJd;
  let maandiIsDayBirth = true;
  let maandiGhatiUsed = 26;

  if (juldayUtc < todayRiseJd) {
    // Birth occurred before today's sunrise: Astrologically it belongs to yesterday's night!
    maandiIsDayBirth = false;
    const prevDate = new Date(birthDateUtc.getTime() - 86400000);
    const prevY = prevDate.getUTCFullYear();
    const prevM = prevDate.getUTCMonth() + 1;
    const prevD = prevDate.getUTCDate();
    const prevWeekday = prevDate.getUTCDay();

    const { setJd: prevSetJd } = getSunRiseAndSetJd(prevY, prevM, prevD, latNum, lngNum);
    const rathriPramana = todayRiseJd - prevSetJd;
    maandiGhatiUsed = MAANDI_NIGHT_GHATIS[prevWeekday];
    maandiJd = prevSetJd + (maandiGhatiUsed / 30.0) * rathriPramana;
  } else if (juldayUtc < todaySetJd) {
    // Birth occurred during the day (between sunrise and sunset)
    maandiIsDayBirth = true;
    const dinaPramana = todaySetJd - todayRiseJd;
    maandiGhatiUsed = MAANDI_DAY_GHATIS[calWeekday];
    maandiJd = todayRiseJd + (maandiGhatiUsed / 30.0) * dinaPramana;
  } else {
    // Birth occurred after today's sunset (night birth)
    maandiIsDayBirth = false;
    const nextDate = new Date(birthDateUtc.getTime() + 86400000);
    const nextY = nextDate.getUTCFullYear();
    const nextM = nextDate.getUTCMonth() + 1;
    const nextD = nextDate.getUTCDate();

    const { riseJd: nextRiseJd } = getSunRiseAndSetJd(nextY, nextM, nextD, latNum, lngNum);
    const rathriPramana = nextRiseJd - todaySetJd;
    maandiGhatiUsed = MAANDI_NIGHT_GHATIS[calWeekday];
    maandiJd = todaySetJd + (maandiGhatiUsed / 30.0) * rathriPramana;
  }

  // Calculate the Ascendant (Lagna) at Maandi's time -> This is Maandi's exact degree (மாந்தி ஸ்புடம்)
  let maandiAyanamsaVal = ayanamsaVal;
  if (ayanamsaKey === 'kp_newcomb' || ayanamsaKey === 'khullar') {
    maandiAyanamsaVal = ayanamsaVal;
  } else if (getAyanamsaFunc) {
    maandiAyanamsaVal = getAyanamsaFunc(maandiJd);
  }

  let maandiLongitude = 0;
  if (swe.houses) {
    try {
      const maandiHouseRes = swe.houses(maandiJd, latNum, lngNum, 'P');
      if (maandiHouseRes && maandiHouseRes.data && maandiHouseRes.data.points) {
        maandiLongitude = ((maandiHouseRes.data.points[0] - maandiAyanamsaVal) + 360) % 360;
      }
    } catch (e) {
      console.warn('swe.houses for Maandi failed, using fallback:', e);
    }
  }

  if (!maandiLongitude) {
    const T_m = (maandiJd - 2451545.0) / 36525.0;
    let gmst_m = 24110.54841 + 8640184.812866 * T_m + 0.093104 * (T_m * T_m) - 0.0000062 * (T_m * T_m * T_m);
    gmst_m = ((gmst_m / 3600.0) % 24 + 24) % 24;
    const maandiUtHourFrac = (((maandiJd + 0.5) % 1) * 24 + 24) % 24;
    const gmstNow_m = (gmst_m + maandiUtHourFrac * 1.00273790935) % 24;
    const ramc_m = ((gmstNow_m * 15.0 + lngNum) % 360 + 360) % 360;
    const eps_m = 23.4392911 - (46.8150 * T_m) / 3600.0;
    const y_m = Math.cos(toRad(ramc_m));
    const x_m = -(Math.sin(toRad(ramc_m)) * Math.cos(toRad(eps_m)) + Math.tan(toRad(latNum)) * Math.sin(toRad(eps_m)));
    let sayanaAsc_m = (toDeg(Math.atan2(y_m, x_m)) + 360) % 360;
    maandiLongitude = (sayanaAsc_m - maandiAyanamsaVal + 360) % 360;
  }

  const maandiRasiId = Math.floor(maandiLongitude / 30);
  const maandiDegreeInRasi = maandiLongitude % 30;
  const maandiNavamsaRasiId = getNavamsaRasiId(maandiRasiId, maandiDegreeInRasi);
  const maandiNakshatraId = Math.floor(maandiLongitude / ONE_NAKSHATRA);
  const maandiNakshatraDeg = maandiLongitude % ONE_NAKSHATRA;
  const maandiPada = Math.floor(maandiNakshatraDeg / ONE_PADA) + 1;

  rasiPositions.push({
    name: 'Maandi',
    nameTa: 'மாந்தி',
    longitude: maandiLongitude,
    speed: 0,
    isRetrograde: false,
    rasiId: maandiRasiId,
    rasiNameTa: RASIS[maandiRasiId],
    degreeInRasi: maandiDegreeInRasi,
    nakshatraId: maandiNakshatraId,
    nakshatraNameTa: NAKSHATRAS[maandiNakshatraId],
    pada: maandiPada,
    navamsaRasiId: maandiNavamsaRasiId,
    maandiDetails: {
      isDayBirth: maandiIsDayBirth,
      ghatiUsed: maandiGhatiUsed,
      maandiJd
    }
  });

  return {
    juldayUtc,
    ayanamsa: ayanamsaVal,
    ayanamsaKey,
    ayanamsaType: modeConfig.name,
    ayanamsaNameTa: modeConfig.nameTa,
    ascendantLongitude: ascLongitude,
    ascendantRasiId: ascRasiId,
    ascendantNavamsaRasiId: ascNavamsaRasiId,
    planets: rasiPositions
  };
};

export default {
  calculateVedicChart,
  getNavamsaRasiId,
  AYANAMSA_MODES,
  resolveAyanamsaKey
};