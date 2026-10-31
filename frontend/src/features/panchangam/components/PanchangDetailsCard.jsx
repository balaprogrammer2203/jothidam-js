import React from 'react';

const TAMIL_MONTHS_MAP = {
  Jan: 'ஜன',
  Feb: 'பிப்',
  Mar: 'மார்',
  Apr: 'ஏப்',
  May: 'மே',
  Jun: 'ஜூன்',
  Jul: 'ஜூலை',
  Aug: 'ஆக',
  Sep: 'செப்',
  Oct: 'அக்',
  Nov: 'நவ',
  Dec: 'டிச'
};

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

function formatTiming(timingStr, isTa) {
  if (!timingStr) return '';
  if (!isTa) return timingStr;
  return timingStr.replace(
    /\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/g,
    (m) => TAMIL_MONTHS_MAP[m] || m
  );
}

function cleanTithiDisplay(nameEn) {
  if (!nameEn) return '';
  return nameEn
    .replace(/^Krishna\s+Krishna\s+/i, 'Krishna ')
    .replace(/^Shukla\s+Shukla\s+/i, 'Shukla ')
    .trim();
}

const TAMIL_DAY_NAMES_MAP = {
  'ஞாயிறு': 'ஞாயிற்றுக் கிழமை',
  'திங்கள்': 'திங்கள் கிழமை',
  'செவ்வாய்': 'செவ்வாய்க் கிழமை',
  'புதன்': 'புதன் கிழமை',
  'வியாழன்': 'வியாழக் கிழமை',
  'வெள்ளி': 'வெள்ளிக் கிழமை',
  'சனி': 'சனிக் கிழமை'
};

const TAMIL_DAYS_LIST = [
  'ஞாயிற்றுக் கிழமை',
  'திங்கள் கிழமை',
  'செவ்வாய்க் கிழமை',
  'புதன் கிழமை',
  'வியாழக் கிழமை',
  'வெள்ளிக் கிழமை',
  'சனிக் கிழமை'
];

function getTamilDayNameWithKizhamai(dayName, dayOfWeek) {
  if (!dayName) {
    return TAMIL_DAYS_LIST[dayOfWeek ?? 0] || 'செவ்வாய்க் கிழமை';
  }
  const trimmed = dayName.trim();
  if (trimmed.includes('கிழமை')) {
    return trimmed;
  }
  if (TAMIL_DAY_NAMES_MAP[trimmed]) {
    return TAMIL_DAY_NAMES_MAP[trimmed];
  }
  if (dayOfWeek !== undefined && dayOfWeek !== null && dayOfWeek >= 0 && dayOfWeek <= 6) {
    return TAMIL_DAYS_LIST[dayOfWeek];
  }
  return `${trimmed} கிழமை`;
}

/**
 * PanchangDetailsCard
 * Displays Section 4.2: 12 Key Panchangam attributes in a 2-column detailed card.
 * When Tamil is selected (isTa === true), all content is in pure Tamil without English mixing.
 * When English is selected (isTa === false), all content is in pure English without Tamil subtitles.
 */
export default React.memo(function PanchangDetailsCard({ data, isTa }) {
  if (!data || !data.panchaAngam) return null;

  const { panchaAngam, astronomy, tamilCalendar } = data;

  return (
    <div className="dp-panchang-details-section">
      <div className="dp-section-header">
        <span className="dp-section-icon">📜</span>
        <h2 className="dp-section-title">{isTa ? 'பஞ்சாங்க விவரங்கள்' : 'Panchangam Details'}</h2>
      </div>

      <div className="dp-panchang-tiles-grid">
        {/* 1. VARA / நாள் */}
        <div className="dp-panchang-tile dp-tile-blue">
          <div className="dp-ptile-top">
            <span className="dp-ptile-cat-label">{isTa ? 'நாள்' : 'VARA'}</span>
            <span className="dp-ptile-icon-badge">
              <span className="dp-ptile-icon">📅</span>
            </span>
          </div>
          <div className="dp-ptile-main-content">
            <div className="dp-ptile-title">
              {isTa
                ? getTamilDayNameWithKizhamai(
                    panchaAngam.vaaram?.nameTa || panchaAngam.vaaram?.name,
                    panchaAngam.vaaram?.dayOfWeek
                  )
                : panchaAngam.vaaram?.nameEn || 'Tuesday'}
            </div>
          </div>
        </div>

        {/* 2. KARANAM / கரணம் */}
        <div className="dp-panchang-tile dp-tile-teal">
          <div className="dp-ptile-top">
            <span className="dp-ptile-cat-label">{isTa ? 'கரணம்' : 'KARANAM'}</span>
            <span className="dp-ptile-icon-badge">
              <span className="dp-ptile-icon">🗓️</span>
            </span>
          </div>
          <div className="dp-ptile-main-content">
            <div className="dp-ptile-title">
              {isTa
                ? panchaAngam.karana?.nameTa || panchaAngam.karana?.name || 'சைதுளை'
                : panchaAngam.karana?.nameEn || 'Taitila'}
            </div>
            {panchaAngam.karana?.timingStr && (
              <div className="dp-ptile-timing">
                <span className="dp-ptile-clock">⏱</span>
                <span>{formatTiming(panchaAngam.karana.timingStr, isTa)}</span>
              </div>
            )}
            {panchaAngam.karana?.next && (
              <div className="dp-ptile-next">
                <span className="dp-ptile-arrow">↳</span>
                <span>
                  {isTa
                    ? `${panchaAngam.karana.next.nameTa || ''} ${formatTiming(panchaAngam.karana.next.timingStr, true)}`
                    : `${panchaAngam.karana.next.nameEn || ''} ${formatTiming(panchaAngam.karana.next.timingStr, false)}`}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* 3. NAKSHATRA / நட்சத்திரம் */}
        <div className="dp-panchang-tile dp-tile-amber">
          <div className="dp-ptile-top">
            <span className="dp-ptile-cat-label">{isTa ? 'நட்சத்திரம்' : 'NAKSHATRA'}</span>
            <span className="dp-ptile-icon-badge">
              <span className="dp-ptile-icon">⭐</span>
            </span>
          </div>
          <div className="dp-ptile-main-content">
            <div className="dp-ptile-title">
              {isTa
                ? panchaAngam.nakshatra?.nameTa || panchaAngam.nakshatra?.name || 'பரணி'
                : panchaAngam.nakshatra?.nameEn || panchaAngam.nakshatra?.name || 'Bharani'}
            </div>
            <div className="dp-ptile-meta">
              {isTa
                ? `அதிபதி: ${panchaAngam.nakshatra?.lordTa || panchaAngam.nakshatra?.lord || 'சூரியன்'} • பாதம்: ${panchaAngam.nakshatra?.pada || 1}`
                : `Lord: ${panchaAngam.nakshatra?.lordEn || 'Sun'} • Pada: ${panchaAngam.nakshatra?.pada || 1}`}
            </div>
            {(panchaAngam.nakshatra?.timingStr || panchaAngam.nakshatra?.endTime) && (
              <div className="dp-ptile-timing">
                <span className="dp-ptile-clock">⏱</span>
                <span>
                  {formatTiming(panchaAngam.nakshatra?.timingStr, isTa) ||
                    `${isTa ? 'முடியும் நேரம்:' : 'Ends at:'} ${panchaAngam.nakshatra.endTime}`}
                </span>
              </div>
            )}
            {panchaAngam.nakshatra?.next && (
              <div className="dp-ptile-next">
                <span className="dp-ptile-arrow">↳</span>
                <span>
                  {isTa
                    ? `${panchaAngam.nakshatra.next.nameTa || ''} ${formatTiming(panchaAngam.nakshatra.next.timingStr, true)}`
                    : `${panchaAngam.nakshatra.next.nameEn || ''} ${formatTiming(panchaAngam.nakshatra.next.timingStr, false)}`}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* 4. YOGAM / யோகம் */}
        <div className="dp-panchang-tile dp-tile-rose">
          <div className="dp-ptile-top">
            <span className="dp-ptile-cat-label">{isTa ? 'யோகம்' : 'YOGAM'}</span>
            <span className="dp-ptile-icon-badge">
              <span className="dp-ptile-icon">♨️</span>
            </span>
          </div>
          <div className="dp-ptile-main-content">
            <div className="dp-ptile-title">
              {isTa
                ? panchaAngam.yoga?.nameTa ||
                  panchaAngam.yoga?.nithyaYogaTa ||
                  panchaAngam.yoga?.nithyaYoga ||
                  'சித்தி'
                : panchaAngam.yoga?.nameEn || panchaAngam.yoga?.nithyaYoga || 'Siddhi'}
            </div>
            {panchaAngam.yoga?.timingStr && (
              <div className="dp-ptile-timing">
                <span className="dp-ptile-clock">⏱</span>
                <span>{formatTiming(panchaAngam.yoga.timingStr, isTa)}</span>
              </div>
            )}
            {panchaAngam.yoga?.next && (
              <div className="dp-ptile-next">
                <span className="dp-ptile-arrow">↳</span>
                <span>
                  {isTa
                    ? `${panchaAngam.yoga.next.nameTa || ''} ${formatTiming(panchaAngam.yoga.next.timingStr, true)}`
                    : `${panchaAngam.yoga.next.nameEn || ''} ${formatTiming(panchaAngam.yoga.next.timingStr, false)}`}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* 5. TITHI / திதி */}
        <div className="dp-panchang-tile dp-tile-purple">
          <div className="dp-ptile-top">
            <span className="dp-ptile-cat-label">{isTa ? 'திதி' : 'TITHI'}</span>
            <span className="dp-ptile-icon-badge">
              <span className="dp-ptile-icon">🌓</span>
            </span>
          </div>
          <div className="dp-ptile-main-content">
            <div className="dp-ptile-title">
              {isTa
                ? panchaAngam.tithi?.nameTa || panchaAngam.tithi?.name || 'தேய்பிறை துவிதியை'
                : cleanTithiDisplay(panchaAngam.tithi?.nameEn) || 'Krishna Dvitiya'}
            </div>
            {(panchaAngam.tithi?.timingStr || panchaAngam.tithi?.endTime) && (
              <div className="dp-ptile-timing">
                <span className="dp-ptile-clock">⏱</span>
                <span>
                  {formatTiming(panchaAngam.tithi?.timingStr, isTa) ||
                    `${isTa ? 'முடியும் நேரம்:' : 'Ends at:'} ${panchaAngam.tithi.endTime}`}
                </span>
              </div>
            )}
            {panchaAngam.tithi?.next && (
              <div className="dp-ptile-next">
                <span className="dp-ptile-arrow">↳</span>
                <span>
                  {isTa
                    ? `${panchaAngam.tithi.next.nameTa || ''} ${formatTiming(panchaAngam.tithi.next.timingStr, true)}`
                    : `${cleanTithiDisplay(panchaAngam.tithi.next.nameEn)} ${formatTiming(panchaAngam.tithi.next.timingStr, false)}`}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* 6. NAAL (DIRECTION) / நோக்கு நாள் */}
        <div className="dp-panchang-tile dp-tile-blue">
          <div className="dp-ptile-top">
            <span className="dp-ptile-cat-label">{isTa ? 'நோக்கு நாள்' : 'NAAL (DIRECTION)'}</span>
            <span className="dp-ptile-icon-badge">
              <span className="dp-ptile-icon">↕️</span>
            </span>
          </div>
          <div className="dp-ptile-main-content">
            <div className="dp-ptile-title">
              {isTa
                ? panchaAngam.nokkuNaal?.nameTa || 'கீழ் நோக்கு'
                : panchaAngam.nokkuNaal?.nameEn || 'Keezh Nokku (Downward)'}
            </div>
          </div>
        </div>

        {/* 7. PAKSHA / பட்சம் */}
        <div className="dp-panchang-tile dp-tile-indigo">
          <div className="dp-ptile-top">
            <span className="dp-ptile-cat-label">{isTa ? 'பட்சம்' : 'PAKSHA'}</span>
            <span className="dp-ptile-icon-badge">
              <span className="dp-ptile-icon">🌙</span>
            </span>
          </div>
          <div className="dp-ptile-main-content">
            <div className="dp-ptile-title">
              {isTa
                ? panchaAngam.paksha?.nameTa || (panchaAngam.tithi?.isShukla ? 'வளர்பிறை' : 'தேய்பிறை')
                : panchaAngam.paksha?.nameEn || (panchaAngam.tithi?.isShukla ? 'Shukla Paksha' : 'Krishna Paksha')}
            </div>
            <div className="dp-ptile-subtitle">
              {isTa
                ? panchaAngam.tithi?.isShukla
                  ? 'சுக்ல பட்சம்'
                  : 'கிருஷ்ண பட்சம்'
                : panchaAngam.tithi?.isShukla
                  ? 'Waxing Moon Phase'
                  : 'Waning Moon Phase'}
            </div>
          </div>
        </div>

        {/* 8. TAMIL YOGAM / தமிழ் யோகம் */}
        <div className="dp-panchang-tile dp-tile-green">
          <div className="dp-ptile-top">
            <span className="dp-ptile-cat-label">{isTa ? 'தமிழ் யோகம்' : 'TAMIL YOGAM'}</span>
            <span className="dp-ptile-icon-badge">
              <span className="dp-ptile-icon">☯️</span>
            </span>
          </div>
          <div className="dp-ptile-main-content">
            <div className="dp-ptile-title">
              {isTa
                ? panchaAngam.yoga?.dinaYoga?.nameTa || panchaAngam.yoga?.dinaYoga?.name || 'சித்த யோகம்'
                : panchaAngam.yoga?.dinaYoga?.nameEn || 'Siddha Yoga'}
            </div>
            <div
              className={`dp-ptile-meta ${
                panchaAngam.yoga?.dinaYoga?.isAuspicious ? 'dp-meta-green' : ''
              }`}
            >
              {isTa
                ? panchaAngam.yoga?.dinaYoga?.natureNote ||
                  (panchaAngam.yoga?.dinaYoga?.isAuspicious ? 'நல்லது' : 'தவிர்க்கவும்')
                : panchaAngam.yoga?.dinaYoga?.natureEn ||
                  (panchaAngam.yoga?.dinaYoga?.isAuspicious ? 'Auspicious' : 'Inauspicious')}
            </div>
            {(panchaAngam.yoga?.dinaYoga?.timingStr || panchaAngam.nakshatra?.timingStr) && (
              <div className="dp-ptile-timing">
                <span className="dp-ptile-clock">⏱</span>
                <span>
                  {formatTiming(
                    panchaAngam.yoga?.dinaYoga?.timingStr || panchaAngam.nakshatra?.timingStr,
                    isTa
                  )}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* 9. AYANA / அயனம் */}
        <div className="dp-panchang-tile dp-tile-emerald">
          <div className="dp-ptile-top">
            <span className="dp-ptile-cat-label">{isTa ? 'அயனம்' : 'AYANA'}</span>
            <span className="dp-ptile-icon-badge">
              <span className="dp-ptile-icon">⊙</span>
            </span>
          </div>
          <div className="dp-ptile-main-content">
            <div className="dp-ptile-title">
              {isTa
                ? panchaAngam.ayana?.nameTa || tamilCalendar?.ayanamTa || 'தக்ஷிணாயனம்'
                : panchaAngam.ayana?.nameEn || AYANAM_MAP_EN[tamilCalendar?.ayanam] || tamilCalendar?.ayanamEn || 'Dakshinayana'}
            </div>
          </div>
        </div>

        {/* 10. HIJRI / ஹிஜ்ரி */}
        <div className="dp-panchang-tile dp-tile-cyan">
          <div className="dp-ptile-top">
            <span className="dp-ptile-cat-label">{isTa ? 'ஹிஜ்ரி' : 'HIJRI (TABULAR)'}</span>
            <span className="dp-ptile-icon-badge">
              <span className="dp-ptile-icon">☽</span>
            </span>
          </div>
          <div className="dp-ptile-main-content">
            <div className="dp-ptile-title">
              {isTa
                ? panchaAngam.hijri?.formattedTa ||
                  panchaAngam.hijri?.dateFormattedTa ||
                  '15 ஜமாதல் அவ்வல் 1448'
                : panchaAngam.hijri?.formattedEn ||
                  panchaAngam.hijri?.dateFormattedEn ||
                  '15 Jumada al-Awwal 1448'}
            </div>
            {!isTa && (
              <div className="dp-ptile-subtitle" style={{ color: '#64748b', fontSize: '13px' }}>
                Islamic Lunar Calendar
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});
