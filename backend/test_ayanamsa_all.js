import swisseph from 'sweph';

const swe = swisseph.default || swisseph;

const isLeapYear = (y) => (y % 4 === 0 && y % 100 !== 0) || (y % 400 === 0);
const getDayOfYear = (y, m, d) => {
  const daysInMonths = [0, 31, isLeapYear(y) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let sum = 0;
  for (let i = 1; i < m; i++) sum += daysInMonths[i];
  return sum + d;
};

const AYANAMSA_MODES = {
  lahiri: { key: 'lahiri', id: 1, name: 'Lahiri (Chitra Paksha)', nameTa: 'லாஹிரி (சித்ரபக்ஷம்)' },
  kp_old: { key: 'kp_old', id: 5, name: 'K.P. old', nameTa: 'கே.பி. பழையது' },
  kp_new: { key: 'kp_new', id: 45, name: 'KP New', nameTa: 'கே.பி. புதியது' },
  kp_newcomb: { key: 'kp_newcomb', id: 255, name: 'KP-Newcomb', nameTa: 'கே.பி. நியூகோம்ப்' },
  bv_raman: { key: 'bv_raman', id: 3, name: 'B.V. Raman', nameTa: 'பி.வி. ராமன்' },
  khullar: { key: 'khullar', id: 255, name: 'Khullar Ayanamsa', nameTa: 'குல்லர் அயனாம்சம்' }
};

function fmtDMS(deg) {
  const inRasi = deg % 30;
  const d = Math.floor(inRasi);
  const rem = (inRasi - d) * 60;
  const m = Math.floor(rem);
  const s = Math.round((rem - m) * 60);
  return `${String(d).padStart(2, '0')}° ${String(m).padStart(2, '0')}' ${String(s).padStart(2, '0')}"`;
}

function testAll() {
  const dob = '2026-08-24';
  const tob = '22:14:34';
  const latitude = 13.0;
  const longitude = 80.25;

  const [year, month, day] = dob.split('-').map(Number);
  const [hour, minute, sec] = tob.split(':').map(Number);

  const istOffset = 5.5;
  const utcDecimalHours = (hour + minute / 60.0 + (sec || 0) / 3600.0) - istOffset;
  const juldayUtc = swe.julday(year, month, day, utcDecimalHours, 1);

  for (const [key, mode] of Object.entries(AYANAMSA_MODES)) {
    let ayanVal = 0;
    if (key === 'kp_newcomb') {
      const doy = getDayOfYear(year, month, day);
      const yearFraction = year + (doy - 1 + utcDecimalHours / 24.0) / 365.25;
      const epoch291 = 291.2777778;
      ayanVal = (yearFraction - epoch291) * (50.2388475 / 3600.0);
    } else if (key === 'khullar') {
      const khullarAyanVal = (50.2388475 / 3600.0) * ((year - 292) + (261 / 365.0) + (((month - 1) * 30 + day) / 365.0));
      ayanVal = khullarAyanVal;
    } else {
      swe.set_sid_mode(mode.id, 0, 0);
      ayanVal = swe.get_ayanamsa_ut(juldayUtc);
    }

    const d = Math.floor(ayanVal);
    const rem = (ayanVal - d) * 60;
    const m = Math.floor(rem);
    const s = Math.round((rem - m) * 60);

    console.log(`\nMode [${key}] -> Ayanamsa: ${d}° ${String(m).padStart(2, '0')}' ${String(s).padStart(2, '0')}" (${ayanVal.toFixed(4)}°)`);

    // Lagna
    const houseRes = swe.houses(juldayUtc, latitude, longitude, 'P');
    const sayanaAsc = houseRes.data.points[0];
    const ascLongitude = ((sayanaAsc - ayanVal) + 360) % 360;
    console.log(`  Lagna: ${fmtDMS(ascLongitude)} (Rasi: ${Math.floor(ascLongitude / 30)})`);

    // Sun & Moon
    const sunBody = swe.calc_ut(juldayUtc, 0, 256);
    const sunLon = (((sunBody.longitude ?? sunBody.data[0]) - ayanVal) + 360) % 360;
    console.log(`  Sun:   ${fmtDMS(sunLon)} (Rasi: ${Math.floor(sunLon / 30)})`);

    const moonBody = swe.calc_ut(juldayUtc, 1, 256);
    const moonLon = (((moonBody.longitude ?? moonBody.data[0]) - ayanVal) + 360) % 360;
    console.log(`  Moon:  ${fmtDMS(moonLon)} (Rasi: ${Math.floor(moonLon / 30)})`);
  }
}

testAll();
