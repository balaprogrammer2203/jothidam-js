import React, { useMemo } from 'react';
import { JAMAKKOL_RASIS } from '../../../utils/jamakkol.utils';

// Classical Tamil Nakshatra names matching reference screenshots
const NAKSHATRAS_TAMIL = [
  'அஸ்வினி',       // 0
  'பரணி',          // 1
  'கார்த்திகை',    // 2
  'ரோகிணி',        // 3
  'மிருகசீரிடம்',  // 4
  'திருவாதிரை',    // 5
  'புனர்பூசம்',    // 6
  'பூசம்',          // 7
  'ஆயில்யம்',       // 8
  'மகம்',           // 9
  'பூரம்',          // 10
  'உத்திரம்',       // 11
  'அஸ்தம்',         // 12 (Matches screenshot: அஸ்தம்)
  'சித்திரை',      // 13
  'சுவாதி',         // 14
  'விசாகம்',        // 15
  'அனுஷம்',        // 16
  'கேட்டை',        // 17
  'மூலம்',          // 18
  'பூராடம்',        // 19
  'உத்திராடம்',     // 20
  'திருவோணம்',      // 21
  'அவிட்டம்',       // 22
  'சதயம்',          // 23
  'பூரட்டாதி',      // 24
  'உத்திரட்டாதி',   // 25
  'ரேவதி'           // 26
];

const NAKSHATRAS_EN = [
  'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra',
  'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni',
  'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha',
  'Moola', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha',
  'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
];

// Anti-clockwise order of the 8 outer boxes starting from Pisces (top-left)
const JAMA_OUTER_BOX_KEYS = [
  'topLeft',      // Pisces
  'leftCenter',   // Capricorn
  'bottomLeft',   // Sagittarius
  'bottomCenter', // Libra
  'bottomRight',  // Virgo
  'rightCenter',  // Cancer
  'topRight',     // Gemini
  'topCenter'     // Aries
];

// Standard Gochara planet order
const GOCHARA_KEYS_ORDER = ['sun', 'moon', 'mars', 'mercury', 'jupiter', 'venus', 'saturn', 'rahu', 'ketu'];

const GOCHARA_DISPLAY_NAMES = {
  sun: { en: 'Sun', ta: 'சூரியன்' },
  moon: { en: 'Moon', ta: 'சந்திரன்' },
  mars: { en: 'Mars', ta: 'செவ்வாய்' },
  mercury: { en: 'Mercury', ta: 'புதன்' },
  jupiter: { en: 'Jupiter', ta: 'குரு' },
  venus: { en: 'Venus', ta: 'சுக்கிரன்' },
  saturn: { en: 'Saturn', ta: 'சனி' },
  rahu: { en: 'Rahu', ta: 'ராகு' },
  ketu: { en: 'Ketu', ta: 'கேது' }
};

const JAMA_DISPLAY_NAMES = {
  jupiter: { en: 'Jupiter', ta: 'குரு' },
  mercury: { en: 'Mercury', ta: 'புதன்' },
  venus: { en: 'Venus', ta: 'சுக்கிரன்' },
  saturn: { en: 'Saturn', ta: 'சனி' },
  moon: { en: 'Moon', ta: 'சந்திரன்' },
  snake: { en: 'Snake', ta: 'பாம்பு' },
  rahu: { en: 'Snake', ta: 'பாம்பு' },
  sun: { en: 'Sun', ta: 'சூரியன்' },
  mars: { en: 'Mars', ta: 'செவ்வாய்' }
};

// Helper: Normalize key
function normalizeKey(str) {
  if (!str) return '';
  const clean = String(str).replace(/[^a-zA-Z]/g, '').toLowerCase();
  if (clean.includes('sun')) return 'sun';
  if (clean.includes('moon')) return 'moon';
  if (clean.includes('mars')) return 'mars';
  if (clean.includes('mercury')) return 'mercury';
  if (clean.includes('jupiter')) return 'jupiter';
  if (clean.includes('venus')) return 'venus';
  if (clean.includes('saturn')) return 'saturn';
  if (clean.includes('rahu')) return 'rahu';
  if (clean.includes('ketu')) return 'ketu';
  if (clean.includes('snake')) return 'snake';
  return clean;
}

// Calculate Nakshatra and Pada from total longitude (0 - 360)
function calculateStarPada(totalLong, lang = 'ta') {
  const norm = ((totalLong % 360) + 360) % 360;
  const starIdx = Math.floor(norm / (360 / 27));
  const rem = norm % (360 / 27);
  const pada = Math.min(4, Math.max(1, Math.floor(rem / (360 / 108)) + 1));
  const starName = lang === 'ta'
    ? (NAKSHATRAS_TAMIL[starIdx] || NAKSHATRAS_TAMIL[0])
    : (NAKSHATRAS_EN[starIdx] || NAKSHATRAS_EN[0]);
  return `${starName} - ${pada}`;
}

// Format degrees and minutes: e.g. "12° 06'"
function formatDegMin(deg) {
  if (deg === undefined || deg === null || isNaN(deg)) return "00° 00'";
  const norm = ((deg % 30) + 30) % 30;
  const d = Math.floor(norm);
  const m = Math.floor((norm - d) * 60);
  return `${d}° ${String(m).padStart(2, '0')}'`;
}

// Classical Exaltation Signs (உச்ச ராசிகள்)
const EXALTATIONS = {
  sun: 0,     // Aries
  moon: 1,    // Taurus
  mars: 9,    // Capricorn
  mercury: 5, // Virgo
  jupiter: 3, // Cancer
  venus: 11,  // Pisces
  saturn: 6,  // Libra
  rahu: 1,    // Taurus
  ketu: 7,    // Scorpio
  snake: 1
};

// Classical Debilitation Signs (நீச ராசிகள்)
const DEBILITATIONS = {
  sun: 6,     // Libra
  moon: 7,    // Scorpio
  mars: 3,    // Cancer
  mercury: 11,// Pisces
  jupiter: 9, // Capricorn
  venus: 5,   // Virgo
  saturn: 0,  // Aries
  rahu: 7,    // Scorpio
  ketu: 1,    // Taurus
  snake: 7
};

// Classical Own Signs (ஆட்சி ராசிகள்)
const OWN_SIGNS = {
  sun: [4],
  moon: [3],
  mars: [0, 7],
  mercury: [2, 5],
  jupiter: [8, 11],
  venus: [1, 6],
  saturn: [9, 10]
};

// Calculate Dignity (நிலைகள்: ஆட்சி, உச்சம், நீசம்)
function calculateDignity(planetRaw, signIndex, lang = 'ta') {
  if (!planetRaw || signIndex === undefined || signIndex === null || signIndex < 0) return '-';
  const isTa = lang === 'ta';
  const key = normalizeKey(planetRaw);

  if (key === 'ascendant' || key === 'lagna') return '-';

  const lookupKey = key === 'rahu' ? 'snake' : key;

  // Exaltation (உச்சம்)
  if (EXALTATIONS[lookupKey] === signIndex || EXALTATIONS[key] === signIndex) {
    return isTa ? 'உச்சம்' : 'Exalted';
  }
  // Debilitation (நீசம்)
  if (DEBILITATIONS[lookupKey] === signIndex || DEBILITATIONS[key] === signIndex) {
    return isTa ? 'நீசம்' : 'Debilitated';
  }
  // Moolatrikona (மூலத்திரிகோணம்) for Sun in Leo (matches jamakkolprasannam.com)
  if (key === 'sun' && signIndex === 4) {
    return isTa ? 'மூலத்திரிகோணம்' : 'Moolatrikona';
  }
  // Own sign (ஆட்சி)
  if (OWN_SIGNS[key] && OWN_SIGNS[key].includes(signIndex)) {
    return isTa ? 'ஆட்சி' : 'Own';
  }

  return '-';
}

// Get localized Rasi name
function getRasi(signIndex, lang = 'ta') {
  if (signIndex === undefined || signIndex === null || signIndex < 0 || signIndex > 11) return '-';
  const r = JAMAKKOL_RASIS[signIndex];
  if (!r) return '-';
  return r[lang] || r.ta || r.en || `Rasi ${signIndex + 1}`;
}

/**
 * JamakolPositionsAndSphutasTables
 * Displays:
 * 1. கோச்சார கிரக நிலைகள் (Gochara Planetary Positions)
 * 2. ஜாம கிரக நிலைகள் (Jama Planetary Positions)
 * 3. பிரசன்ன ஸ்புடங்கள் (Prasanna Sphutas)
 */
export default function JamakolPositionsAndSphutasTables({ chartData, lang = 'ta' }) {
  const isTa = lang === 'ta';

  const tables = useMemo(() => {
    if (!chartData) return { gocharaRows: [], jamaRows: [], sphutasRows: [] };

    const rasiGrid = chartData.rasiGrid || [];
    const jamaPlanets = chartData.jamaPlanets || {};
    const pillars = chartData.pillars || {};
    const subPlanets = chartData.subPlanets || {};
    const outerBoxes = chartData.outerBoxes || {};

    // =========================================================
    // 1. கோச்சார கிரக நிலைகள் (Gochara Planetary Positions)
    // =========================================================
    const gocharaRows = [];

    // Row 1: Ascendant (லக்னம்)
    let lagnaSign = chartData.lagnaRasiIndex !== undefined ? chartData.lagnaRasiIndex : (chartData.lagna?.rasiIndex ?? 9);
    let lagnaDeg = 20.0;
    if (chartData.lagna?.degreeInRasi !== undefined) {
      lagnaDeg = chartData.lagna.degreeInRasi;
    } else if (chartData.lagna?.formattedDegree) {
      const match = String(chartData.lagna.formattedDegree).match(/(\d+)(?:°|\s)(\d+)?/);
      if (match) lagnaDeg = parseInt(match[1], 10) + (match[2] ? parseInt(match[2], 10) / 60 : 0);
    }
    const lagnaTotal = (lagnaSign * 30 + lagnaDeg) % 360;

    gocharaRows.push({
      label: 'Ascendant',
      isRetro: false,
      signName: getRasi(lagnaSign, lang),
      degreeStr: formatDegMin(lagnaDeg),
      starPada: calculateStarPada(lagnaTotal, lang),
      dignityStr: '-'
    });

    // Collect all Gochara planets from rasiGrid
    const gocharaFound = {};
    for (let s = 0; s < 12; s++) {
      const cell = rasiGrid[s] || [];
      for (const p of cell) {
        if (p.isSubPlanet || p.isSpecialPrasannam || p.isLagna) continue;
        const key = normalizeKey(p.name);
        if (key && !gocharaFound[key]) {
          let degInRasi = 15;
          if (p.degreeInRasi !== undefined) {
            degInRasi = p.degreeInRasi;
          } else if (p.formattedDegree) {
            const match = String(p.formattedDegree).match(/(\d+)(?:°|\s)(\d+)?/);
            if (match) degInRasi = parseInt(match[1], 10) + (match[2] ? parseInt(match[2], 10) / 60 : 0);
          }
          const isRetro = Boolean(
            p.isRetrograde ||
            p.symbol?.includes('*') ||
            key === 'rahu' ||
            key === 'ketu'
          );
          gocharaFound[key] = {
            signIndex: s,
            degreeInRasi: degInRasi,
            totalLong: (s * 30 + degInRasi) % 360,
            isRetro
          };
        }
      }
    }

    // Add Gochara planets in standard order
    GOCHARA_KEYS_ORDER.forEach((key) => {
      const found = gocharaFound[key];
      const displayName = isTa ? GOCHARA_DISPLAY_NAMES[key]?.ta : GOCHARA_DISPLAY_NAMES[key]?.en;
      if (found) {
        gocharaRows.push({
          label: displayName || key,
          isRetro: found.isRetro,
          signName: getRasi(found.signIndex, lang),
          degreeStr: formatDegMin(found.degreeInRasi),
          starPada: calculateStarPada(found.totalLong, lang),
          dignityStr: calculateDignity(key, found.signIndex, lang)
        });
      } else {
        // Fallback placeholder if not present
        const isRetro = key === 'rahu' || key === 'ketu';
        gocharaRows.push({
          label: displayName || key,
          isRetro,
          signName: '-',
          degreeStr: '-',
          starPada: '-',
          dignityStr: '-'
        });
      }
    });

    // =========================================================
    // 2. ஜாம கிரக நிலைகள் (Jama Planetary Positions)
    // Order: Anti-clockwise around the 8 outer boxes from Pisces (top-left)
    // (topLeft: Pisces, leftCenter: Capricorn, bottomLeft: Sagittarius, bottomCenter: Libra,
    //  bottomRight: Virgo, rightCenter: Cancer, topRight: Gemini, topCenter: Aries)
    // =========================================================
    const jamaRows = [];
    const jamaList = Object.values(jamaPlanets || {});

    JAMA_OUTER_BOX_KEYS.forEach((boxKey) => {
      let jp = outerBoxes[boxKey];
      if (!jp) {
        jp = jamaList.find((p) => p.boxKey === boxKey);
      }
      if (!jp) {
        const fallbackIdx = JAMA_OUTER_BOX_KEYS.indexOf(boxKey);
        const fallbackBoxSigns = [11, 9, 8, 6, 5, 3, 2, 0];
        const sIdx = fallbackBoxSigns[fallbackIdx];
        jp = jamaList.find((p) => p.boxSignIndex === sIdx || p.signIndex === sIdx);
      }

      if (jp) {
        const key = normalizeKey(jp.name || jp.key);
        const baseName = isTa
          ? (JAMA_DISPLAY_NAMES[key]?.ta || jp.nameTa || jp.name)
          : (JAMA_DISPLAY_NAMES[key]?.en || jp.nameEn || jp.name);

        const fullLabel = isTa ? `ஜாம ${baseName}` : `Jama ${baseName}`;
        const actualSign = jp.signIndex !== undefined ? jp.signIndex : 0;

        let degInRasi = jp.degreeInRasi !== undefined ? jp.degreeInRasi : 15;
        if (jp.degree !== undefined) {
          degInRasi = ((jp.degree % 30) + 30) % 30;
        }

        const totalLong = jp.degree !== undefined ? jp.degree : (actualSign * 30 + degInRasi);

        jamaRows.push({
          label: fullLabel,
          signName: getRasi(actualSign, lang),
          degreeStr: formatDegMin(degInRasi),
          starPada: calculateStarPada(totalLong, lang),
          dignityStr: calculateDignity(key, actualSign, lang)
        });
      }
    });

    // =========================================================
    // 3. பிரசன்ன ஸ்புடங்கள் (Prasanna Sphutas)
    // Rows: Udhayam, Aarudam, Kavippu, Maandi, Yamakandam, Rahu Kaalam, Mrityu
    // =========================================================
    const sphutasRows = [];

    const sphutaDefs = [
      {
        key: 'Udhayam',
        data: pillars.udhayam
      },
      {
        key: 'Aarudam',
        data: pillars.aarudam
      },
      {
        key: 'Kavippu',
        data: pillars.kavippu
      },
      {
        key: 'Maandi',
        data: subPlanets.maandi
      },
      {
        key: 'Yamakandam',
        data: subPlanets.yamakandam
      },
      {
        key: 'Rahu Kaalam',
        data: subPlanets.rahukalam
      },
      {
        key: 'Mrityu',
        data: subPlanets.mrityu
      }
    ];

    sphutaDefs.forEach((item) => {
      const d = item.data || {};
      const signIdx = d.signIndex !== undefined ? d.signIndex : (d.rasiIndex !== undefined ? d.rasiIndex : 0);

      let degInRasi = 0;
      if (d.degreeInRasi !== undefined) {
        degInRasi = d.degreeInRasi;
      } else if (d.formattedDegree) {
        const match = String(d.formattedDegree).match(/(\d+)(?:°|\s)(\d+)?/);
        if (match) degInRasi = parseInt(match[1], 10) + (match[2] ? parseInt(match[2], 10) / 60 : 0);
      }

      const totalLong = (signIdx * 30 + degInRasi) % 360;

      sphutasRows.push({
        label: item.key,
        signName: getRasi(signIdx, lang),
        degreeStr: formatDegMin(degInRasi),
        starPada: calculateStarPada(totalLong, lang)
      });
    });

    return { gocharaRows, jamaRows, sphutasRows };
  }, [chartData, lang, isTa]);

  if (!chartData) return null;

  return (
    <div className="jk-positions-sphutas-section">
      {/* ========================================================
          Card 1: கோச்சார கிரக நிலைகள் (Gochara Planetary Positions)
          ======================================================== */}
      <div className="jk-status-card">
        <h3 className="jk-status-card-title">
          {isTa ? 'கோச்சார கிரக நிலைகள்' : 'Gochara Planetary Positions'}
        </h3>
        <div className="jk-status-table-wrap">
          <table className="jk-status-table">
            <thead>
              <tr>
                <th>{isTa ? 'கிரகம் / புள்ளி' : 'Planet / Point'}</th>
                <th>{isTa ? 'ராசி' : 'Rasi Sign'}</th>
                <th>{isTa ? 'பாகை' : 'Degree'}</th>
                <th>{isTa ? 'நட்சத்திரம் - பாதம்' : 'Nakshatra - Pada'}</th>
                <th>{isTa ? 'நிலைகள்' : 'Dignity'}</th>
              </tr>
            </thead>
            <tbody>
              {tables.gocharaRows.map((row, idx) => (
                <tr key={idx}>
                  <td className="jk-cell-planet-title">
                    <span>{row.label}</span>
                    {row.isRetro && (
                      <span className="jk-retro-tag">
                        {isTa ? ' (வ)' : ' (R)'}
                      </span>
                    )}
                  </td>
                  <td className="jk-cell-sign">{row.signName}</td>
                  <td className="jk-cell-degree">{row.degreeStr}</td>
                  <td className="jk-cell-star">{row.starPada}</td>
                  <td className="jk-cell-dignity">
                    {row.dignityStr === '-' ? (
                      <span className="jk-dignity-dash">-</span>
                    ) : (
                      <span className="jk-dignity-text">{row.dignityStr}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================
          Card 2: ஜாம கிரக நிலைகள் (Jama Planetary Positions)
          ======================================================== */}
      <div className="jk-status-card">
        <h3 className="jk-status-card-title">
          {isTa ? 'ஜாம கிரக நிலைகள்' : 'Jama Planetary Positions'}
        </h3>
        <div className="jk-status-table-wrap">
          <table className="jk-status-table">
            <thead>
              <tr>
                <th>{isTa ? 'கிரகம் / புள்ளி' : 'Planet / Point'}</th>
                <th>{isTa ? 'ராசி' : 'Rasi Sign'}</th>
                <th>{isTa ? 'பாகை' : 'Degree'}</th>
                <th>{isTa ? 'நட்சத்திரம் - பாதம்' : 'Nakshatra - Pada'}</th>
                <th>{isTa ? 'நிலைகள்' : 'Dignity'}</th>
              </tr>
            </thead>
            <tbody>
              {tables.jamaRows.map((row, idx) => (
                <tr key={idx}>
                  <td className="jk-cell-planet-title">{row.label}</td>
                  <td className="jk-cell-sign">{row.signName}</td>
                  <td className="jk-cell-degree">{row.degreeStr}</td>
                  <td className="jk-cell-star">{row.starPada}</td>
                  <td className="jk-cell-dignity">
                    {row.dignityStr === '-' ? (
                      <span className="jk-dignity-dash">-</span>
                    ) : (
                      <span className="jk-dignity-text">{row.dignityStr}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================
          Card 3: பிரசன்ன ஸ்புடங்கள் (Prasanna Sphutas)
          ======================================================== */}
      <div className="jk-status-card">
        <h3 className="jk-status-card-title">
          {isTa ? 'பிரசன்ன ஸ்புடங்கள்' : 'Prasanna Sphutas'}
        </h3>
        <div className="jk-status-table-wrap">
          <table className="jk-status-table">
            <thead>
              <tr>
                <th>{isTa ? 'கிரகம் / புள்ளி' : 'Planet / Point'}</th>
                <th>{isTa ? 'ராசி' : 'Rasi Sign'}</th>
                <th>{isTa ? 'பாகை' : 'Degree'}</th>
                <th>{isTa ? 'நட்சத்திரம் - பாதம்' : 'Nakshatra - Pada'}</th>
              </tr>
            </thead>
            <tbody>
              {tables.sphutasRows.map((row, idx) => (
                <tr key={idx}>
                  <td className="jk-cell-planet-title">{row.label}</td>
                  <td className="jk-cell-sign">{row.signName}</td>
                  <td className="jk-cell-degree">{row.degreeStr}</td>
                  <td className="jk-cell-star">{row.starPada}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
