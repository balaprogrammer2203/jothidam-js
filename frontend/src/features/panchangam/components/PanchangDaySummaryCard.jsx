import React from 'react';

const RASI_MAP_EN = {
  'மேஷம்': 'Aries',
  'ரிஷபம்': 'Taurus',
  'மிதுனம்': 'Gemini',
  'கடகம்': 'Cancer',
  'சிம்மம்': 'Leo',
  'கன்னி': 'Virgo',
  'துலாம்': 'Libra',
  'விருச்சிகம்': 'Scorpio',
  'தனுசு': 'Sagittarius',
  'மகரம்': 'Capricorn',
  'கும்பம்': 'Aquarius',
  'மீனம்': 'Pisces'
};

const AYANAM_MAP_EN = {
  'தட்சிணாயனம்': 'Dakshinayana',
  'தக்ஷிணாயனம்': 'Dakshinayana',
  'உத்தராயணம்': 'Uttarayana'
};

const RUTHU_MAP_EN = {
  'வசந்த ருது': 'Vasanta Ritu (Spring)',
  'கிரீஷ்ம ருது': 'Grishma Ritu (Summer)',
  'வர்ஷ ருது': 'Varsha Ritu (Monsoon)',
  'சரத் ருது': 'Sharad Ritu (Autumn)',
  'ஹேமந்த ருது': 'Hemanta Ritu (Pre-Winter)',
  'சிசிர ருது': 'Shishira Ritu (Winter)'
};

const TAMIL_MONTHS_MAP = {
  'சித்திரை': 'Chithirai',
  'வைகாசி': 'Vaikasi',
  'ஆனி': 'Aani',
  'ஆடி': 'Aadi',
  'ஆவணி': 'Aavani',
  'புரட்டாசி': 'Purattasi',
  'ஐப்பசி': 'Aippasi',
  'கார்த்திகை': 'Karthigai',
  'மார்கழி': 'Margazhi',
  'தை': 'Thai',
  'மாசி': 'Maasi',
  'பங்குனி': 'Panguni'
};

function formatTamilDateEn(rawTamilDate) {
  if (!rawTamilDate) return '';
  let str = rawTamilDate;
  Object.keys(TAMIL_MONTHS_MAP).forEach((taM) => {
    str = str.replace(taM, TAMIL_MONTHS_MAP[taM]);
  });
  return str;
}

function formatDurationEn(rawDur) {
  if (!rawDur) return '';
  return rawDur
    .replace(/\s*மணி\s*/g, ' hrs ')
    .replace(/\s*நிமிடம்\s*/g, ' mins')
    .trim();
}

/**
 * PanchangDaySummaryCard
 * Displays Section 4.1: Date summaries (Gregorian & Tamil), Ayana, Ritu,
 * Place/Time coordinates, and the 8-tile astronomical grid (Sunrise, Sunset, Moonrise, etc.)
 */
export default React.memo(function PanchangDaySummaryCard({ data, isTa }) {
  if (!data) return null;

  const gregorianDateFormatted = new Date(data.meta.date + 'T00:00:00').toLocaleDateString(
    isTa ? 'ta-IN' : 'en-US',
    {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
  );

  // Tamil Date
  const tamilDate = isTa
    ? data.tamilCalendar?.tamilDateTa || data.tamilCalendar?.tamilDate || ''
    : data.tamilCalendar?.tamilDateEn || formatTamilDateEn(data.tamilCalendar?.tamilDate);

  // Ayanam
  const ayanam = isTa
    ? data.tamilCalendar?.ayanamTa || data.tamilCalendar?.ayanam || ''
    : data.tamilCalendar?.ayanamEn || AYANAM_MAP_EN[data.tamilCalendar?.ayanam] || data.tamilCalendar?.ayanam || 'Dakshinayana';

  // Ruthu
  const ruthu = isTa
    ? data.tamilCalendar?.ruthuTa || data.tamilCalendar?.ruthu || ''
    : data.tamilCalendar?.ruthuEn || RUTHU_MAP_EN[data.tamilCalendar?.ruthu] || data.tamilCalendar?.ruthu || 'Sharad Ritu';

  // Sun Sign & Moon Sign
  const sunRasi = isTa
    ? data.astronomy?.sunSign?.rasiNameTa || data.astronomy?.sunSign?.rasiName || 'துலாம்'
    : data.astronomy?.sunSign?.rasiNameEn || RASI_MAP_EN[data.astronomy?.sunSign?.rasiName] || data.astronomy?.sunSign?.rasiName || 'Libra';

  const moonRasi = isTa
    ? data.astronomy?.moonSign?.rasiNameTa || data.astronomy?.moonSign?.rasiName || 'மேஷம்'
    : data.astronomy?.moonSign?.rasiNameEn || RASI_MAP_EN[data.astronomy?.moonSign?.rasiName] || data.astronomy?.moonSign?.rasiName || 'Aries';

  // Day & Night Duration
  const dayDuration = isTa
    ? data.astronomy?.dayDurationTa || data.astronomy?.dayDuration || ''
    : data.astronomy?.dayDurationEn || formatDurationEn(data.astronomy?.dayDuration);

  const nightDuration = isTa
    ? data.astronomy?.nightDurationTa || data.astronomy?.nightDuration || ''
    : data.astronomy?.nightDurationEn || formatDurationEn(data.astronomy?.nightDuration);

  return (
    <div className="dp-today-summary-card">
      <div className="dp-summary-top-row">
        <div className="dp-date-block">
          <div className="dp-gregorian-date">{gregorianDateFormatted}</div>
          <div className="dp-tamil-date-badge">{tamilDate}</div>
          <div className="dp-sub-ayanam-tag">
            <span style={{ color: '#38bdf8', fontWeight: 700 }}>
              {isTa ? 'முறை: திருக்கணிதம்' : 'System: Thirukanitham (Drik)'}
            </span>
            <span className="bullet">•</span>
            <span>{ayanam}</span>
            <span className="bullet">•</span>
            <span>{ruthu}</span>
          </div>
        </div>

        <div className="dp-location-time-badge">
          <span className="dp-loc-city">📍 {data.meta.placeName}</span>
          <span className="dp-loc-time">⏱️ {data.meta.time}</span>
          <span style={{ fontSize: '12px', color: '#fde047', fontWeight: 600 }}>
            {data.meta.latitude.toFixed(4)}° {data.meta.latitude >= 0 ? 'N' : 'S'}, {data.meta.longitude.toFixed(4)}° {data.meta.longitude >= 0 ? 'E' : 'W'}
          </span>
        </div>
      </div>

      {/* Sun & Moon Timings Grid */}
      <div className="dp-astro-timings-grid">
        <div className="dp-astro-timing-item">
          <span className="dp-astro-icon">🌅</span>
          <div className="dp-astro-info">
            <span className="dp-astro-label">{isTa ? 'சூரிய உதயம்' : 'Sunrise'}</span>
            <span className="dp-astro-val">{data.astronomy.sunrise}</span>
          </div>
        </div>

        <div className="dp-astro-timing-item">
          <span className="dp-astro-icon">🌇</span>
          <div className="dp-astro-info">
            <span className="dp-astro-label">{isTa ? 'சூரிய அஸ்தமனம்' : 'Sunset'}</span>
            <span className="dp-astro-val">{data.astronomy.sunset}</span>
          </div>
        </div>

        <div className="dp-astro-timing-item">
          <span className="dp-astro-icon">🌕</span>
          <div className="dp-astro-info">
            <span className="dp-astro-label">{isTa ? 'சந்திர உதயம்' : 'Moonrise'}</span>
            <span className="dp-astro-val">{data.astronomy.moonrise}</span>
          </div>
        </div>

        <div className="dp-astro-timing-item">
          <span className="dp-astro-icon">🌑</span>
          <div className="dp-astro-info">
            <span className="dp-astro-label">{isTa ? 'சந்திர அஸ்தமனம்' : 'Moonset'}</span>
            <span className="dp-astro-val">{data.astronomy.moonset}</span>
          </div>
        </div>

        <div className="dp-astro-timing-item">
          <span className="dp-astro-icon">☀️</span>
          <div className="dp-astro-info">
            <span className="dp-astro-label">{isTa ? 'சூரிய ராசி' : 'Sun Sign'}</span>
            <span className="dp-astro-val">
              <span>{sunRasi}</span>
              <span className="dp-astro-degree">({data.astronomy.sunSign.degree})</span>
            </span>
          </div>
        </div>

        <div className="dp-astro-timing-item">
          <span className="dp-astro-icon">🌙</span>
          <div className="dp-astro-info">
            <span className="dp-astro-label">{isTa ? 'சந்திர ராசி' : 'Moon Sign'}</span>
            <span className="dp-astro-val">
              <span>{moonRasi}</span>
              <span className="dp-astro-degree">({data.astronomy.moonSign.degree})</span>
            </span>
          </div>
        </div>

        <div className="dp-astro-timing-item">
          <span className="dp-astro-icon">⏳</span>
          <div className="dp-astro-info">
            <span className="dp-astro-label">{isTa ? 'பகல் அளவு' : 'Day Length'}</span>
            <span className="dp-astro-val">{dayDuration}</span>
          </div>
        </div>

        <div className="dp-astro-timing-item">
          <span className="dp-astro-icon">🌌</span>
          <div className="dp-astro-info">
            <span className="dp-astro-label">{isTa ? 'இரவு அளவு' : 'Night Length'}</span>
            <span className="dp-astro-val">{nightDuration}</span>
          </div>
        </div>
      </div>
    </div>
  );
});
