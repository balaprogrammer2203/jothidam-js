/**
 * High precision Geographic Coordinates (Latitude / Longitude) Conversion Utilities
 * DMS (Degrees, Minutes, Seconds, Direction) <-> Decimal Degrees
 */

export function decimalToDms(decVal, type = 'lat') {
  if (decVal === undefined || decVal === null || decVal === '' || isNaN(Number(decVal))) {
    return {
      deg: type === 'lat' ? '013' : '080',
      min: '00',
      sec: '00',
      dir: type === 'lat' ? 'N' : 'E'
    };
  }

  const num = parseFloat(decVal);
  const isLat = type === 'lat';
  const defaultDir = isLat ? (num >= 0 ? 'N' : 'S') : (num >= 0 ? 'E' : 'W');
  const abs = Math.abs(num);

  const deg = Math.floor(abs);
  const minFloat = (abs - deg) * 60;
  const min = Math.floor(minFloat);
  const secFloat = (minFloat - min) * 60;
  const sec = Math.round(secFloat);

  const padDeg = String(deg).padStart(3, '0');
  const padMin = String(min).padStart(2, '0');
  const padSec = String(sec >= 60 ? 59 : sec).padStart(2, '0');

  return {
    deg: padDeg,
    min: padMin,
    sec: padSec,
    dir: defaultDir
  };
}

export function dmsToDecimal(deg, min, sec, dir) {
  const d = Math.abs(parseFloat(deg) || 0);
  const m = Math.abs(parseFloat(min) || 0);
  const s = Math.abs(parseFloat(sec) || 0);

  const decimal = d + m / 60.0 + s / 3600.0;
  const isNegative = dir === 'S' || dir === 'W';

  return isNegative ? -decimal : decimal;
}

export function formatDmsString(decVal, type = 'lat') {
  const dms = decimalToDms(decVal, type);
  return `${dms.deg}° ${dms.min}' ${dms.sec}" ${dms.dir}`;
}

export function formatDmsCompact(decVal, type = 'lat') {
  if (decVal === undefined || decVal === null || decVal === '' || isNaN(Number(decVal))) return '';
  const num = parseFloat(decVal);
  const isLat = type === 'lat';
  const defaultDir = isLat ? (num >= 0 ? 'N' : 'S') : (num >= 0 ? 'E' : 'W');
  const abs = Math.abs(num);

  const deg = Math.floor(abs);
  const minFloat = (abs - deg) * 60;
  const min = Math.floor(minFloat);
  const secFloat = (minFloat - min) * 60;
  const sec = Math.round(secFloat);

  const padMin = String(min).padStart(2, '0');
  const padSec = String(sec >= 60 ? 59 : sec).padStart(2, '0');

  return `${deg}°${padMin}'${padSec}"${defaultDir}`;
}

export function formatDmsShort(decVal, type = 'lat') {
  if (decVal === undefined || decVal === null || decVal === '' || isNaN(Number(decVal))) return '';
  const num = parseFloat(decVal);
  const isLat = type === 'lat';
  const defaultDir = isLat ? (num >= 0 ? 'N' : 'S') : (num >= 0 ? 'E' : 'W');
  const abs = Math.abs(num);

  const deg = Math.floor(abs);
  const minFloat = (abs - deg) * 60;
  const min = Math.floor(minFloat);
  const padMin = String(min).padStart(2, '0');

  return `${deg}°${padMin}'${defaultDir}`;
}
