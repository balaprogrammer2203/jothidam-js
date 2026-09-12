/**
 * Date and Time Formatting Utilities
 * Standard Indian Formats (DD-MM-YYYY) and 12-Hour Time with AM/PM
 */

/**
 * Converts date string (e.g. ISO 'YYYY-MM-DD') into Indian Date Format ('DD-MM-YYYY')
 * @param {string} dateStr - Date string like '2026-09-02'
 * @returns {string} - '02-09-2026'
 */
export function formatIndianDate(dateStr) {
  if (!dateStr) return '-';
  if (typeof dateStr !== 'string') return String(dateStr);

  const trimmed = dateStr.trim();
  // Handle ISO format YYYY-MM-DD
  const parts = trimmed.split(/[-/]/);
  if (parts.length === 3) {
    if (parts[0].length === 4) {
      const [y, m, d] = parts;
      return `${String(d).padStart(2, '0')}-${String(m).padStart(2, '0')}-${y}`;
    }
    // If already in DD-MM-YYYY or DD/MM/YYYY
    if (parts[2].length === 4) {
      const [d, m, y] = parts;
      return `${String(d).padStart(2, '0')}-${String(m).padStart(2, '0')}-${y}`;
    }
  }

  // Fallback for JS Date parseable strings
  const parsed = new Date(trimmed);
  if (!isNaN(parsed.getTime())) {
    const d = String(parsed.getDate()).padStart(2, '0');
    const m = String(parsed.getMonth() + 1).padStart(2, '0');
    const y = parsed.getFullYear();
    return `${d}-${m}-${y}`;
  }

  return trimmed;
}

/**
 * Converts 24-hour time ('HH:MM:SS' or 'HH:MM') into 12-hour time with AM/PM
 * e.g. '11:29:57' -> '11:29:57 AM'
 * e.g. '16:45:00' -> '04:45:00 PM'
 * e.g. '00:15:30' -> '12:15:30 AM'
 * @param {string} timeStr - Time string
 * @returns {string} - Formatted time with AM/PM
 */
export function formatTime12Hour(timeStr) {
  if (!timeStr) return '-';
  if (typeof timeStr !== 'string') return String(timeStr);

  const trimmed = timeStr.trim();
  // If already contains am or pm
  if (/am|pm/i.test(trimmed)) {
    return trimmed.toUpperCase();
  }

  const parts = trimmed.split(':');
  if (parts.length >= 2) {
    const rawH = parseInt(parts[0], 10);
    if (isNaN(rawH)) return trimmed;

    const ampm = rawH >= 12 ? 'PM' : 'AM';
    const h12 = rawH % 12 || 12;
    const pad = (n) => String(n).padStart(2, '0');
    const m = parts[1];
    const s = parts[2];

    if (s !== undefined && s !== '') {
      return `${pad(h12)}:${pad(m)}:${pad(s)} ${ampm}`;
    }
    return `${pad(h12)}:${pad(m)} ${ampm}`;
  }

  return trimmed;
}
