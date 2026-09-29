import React, { useMemo } from 'react';
import { JAMAKKOL_RASIS } from '../../../utils/jamakkol.utils';

// Classical Rasi Rays (12 Signs: Aries to Pisces)
// மேஷம்: 7, ரிஷபம்: 8, மிதுனம்: 5, கடகம்: 3, சிம்மம்: 7, கன்னி: 11,
// துலாம்: 2, விருச்சிகம்: 4, தனுசு: 6, மகரம்: 8, கும்பம்: 8, மீனம்: 27
const RASI_RAYS = [7, 8, 5, 3, 7, 11, 2, 4, 6, 8, 8, 27];

// Classical Base Planet Rays
// Sun: 5, Moon: 21, Mars: 8, Mercury: 16, Jupiter: 10, Venus: 20, Saturn: 4, Rahu: 4, Ketu: 4
const BASE_PLANET_RAYS = {
  sun: 5,
  moon: 21,
  mars: 8,
  mercury: 16,
  jupiter: 10,
  venus: 20,
  saturn: 4,
  rahu: 4,
  ketu: 4,
  snake: 4
};

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

// Short names for occupying planets
const SHORT_NAMES_TA = {
  sun: 'சூரியன்',
  moon: 'சந்திரன்',
  mars: 'செவ்வாய்',
  mercury: 'புதன்',
  jupiter: 'குரு',
  venus: 'சுக்கிரன்',
  saturn: 'சனி',
  rahu: 'ராகு',
  ketu: 'கேது',
  snake: 'பாம்பு'
};

const SHORT_NAMES_EN = {
  sun: 'Sun',
  moon: 'Moon',
  mars: 'Mars',
  mercury: 'Mercury',
  jupiter: 'Jupiter',
  venus: 'Venus',
  saturn: 'Saturn',
  rahu: 'Rahu',
  ketu: 'Ketu',
  snake: 'Snake'
};

// Standard Gochara keys order (9 planets)
const GOCHARA_KEYS_ORDER = ['sun', 'moon', 'mars', 'mercury', 'jupiter', 'venus', 'saturn', 'rahu', 'ketu'];

// Standard Jama keys order (8 planets)
const JAMA_KEYS_ORDER = ['sun', 'moon', 'mars', 'mercury', 'jupiter', 'venus', 'saturn', 'snake'];

// Helper to normalize planet key
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

// Get localized Rasi name
function getRasi(signIndex, lang = 'ta') {
  if (signIndex === undefined || signIndex === null || signIndex < 0 || signIndex > 11) return '-';
  const r = JAMAKKOL_RASIS[signIndex];
  if (!r) return '-';
  return r[lang] || r.ta || r.en || `Rasi ${signIndex + 1}`;
}

// Classical Dignity (நிலை: உச்சம், ஆட்சி, நீசம், -)
function getDignity(key, signIndex, lang = 'ta') {
  if (!key || signIndex === undefined || signIndex === null || signIndex < 0) return '-';
  const isTa = lang === 'ta';
  const lookupKey = key === 'rahu' ? 'snake' : key;

  // Exaltation (உச்சம்)
  if (EXALTATIONS[lookupKey] === signIndex || EXALTATIONS[key] === signIndex) {
    return isTa ? 'உச்சம்' : 'Exalted';
  }
  // Debilitation (நீசம்)
  if (DEBILITATIONS[lookupKey] === signIndex || DEBILITATIONS[key] === signIndex) {
    return isTa ? 'நீசம்' : 'Debilitated';
  }
  // Own sign (ஆட்சி)
  if (OWN_SIGNS[key] && OWN_SIGNS[key].includes(signIndex)) {
    return isTa ? 'ஆட்சி' : 'Own';
  }

  return '-';
}

// Classical Planet Ray Calculation:
// - Exalted (உச்சம்): base * 3
// - Own sign (ஆட்சி): base * 2
// - Debilitated (நீசம்): base / 2
// - Other: base
function calculatePlanetRay(key, signIndex) {
  if (!key) return 0;
  const lookupKey = key === 'rahu' ? 'snake' : key;
  const base = BASE_PLANET_RAYS[lookupKey] || BASE_PLANET_RAYS[key] || 4;

  if (EXALTATIONS[lookupKey] === signIndex || EXALTATIONS[key] === signIndex) {
    return base * 3;
  }
  if (OWN_SIGNS[key] && OWN_SIGNS[key].includes(signIndex)) {
    return base * 2;
  }
  if (DEBILITATIONS[lookupKey] === signIndex || DEBILITATIONS[key] === signIndex) {
    return base / 2;
  }
  return base;
}

/**
 * JamakolRaysTable
 * Displays "தற்போதைய பிரசன்னத்தின் ராசி மற்றும் கிரக கதிர்கள்"
 * (Current Prasannam's Rasi and Planetary Rays)
 * Exactly matches jamakkolprasannam.com reference table.
 */
export default function JamakolRaysTable({ chartData, lang = 'ta' }) {
  const isTa = lang === 'ta';

  const rows = useMemo(() => {
    if (!chartData) return [];

    const rasiGrid = chartData.rasiGrid || [];
    const jamaPlanets = chartData.jamaPlanets || {};
    const pillars = chartData.pillars || {};

    // 1. Gather all Gochara planets by normalized key
    const gocharaPlacements = {};
    for (let s = 0; s < 12; s++) {
      const cell = rasiGrid[s] || [];
      for (const p of cell) {
        if (p.isSubPlanet || p.isSpecialPrasannam || p.isLagna) continue;
        const key = normalizeKey(p.name);
        if (key && gocharaPlacements[key] === undefined) {
          gocharaPlacements[key] = {
            signIndex: s,
            raw: p
          };
        }
      }
    }

    // 2. Gather all Jama planets by normalized key
    const jamaPlacements = {};
    const jamaList = Object.values(jamaPlanets || {});
    for (const jp of jamaList) {
      const key = normalizeKey(jp.name || jp.key);
      const s = jp.signIndex !== undefined ? jp.signIndex : jp.sign;
      if (key && s !== undefined && s !== null) {
        jamaPlacements[key] = {
          signIndex: s,
          raw: jp
        };
      }
    }

    // Helper to find occupying planets in any sign and calculate total planet ray
    const getOccupantsInfo = (signIndex) => {
      const occupants = [];
      let totalRay = 0;

      // Check Gochara planets in this sign
      GOCHARA_KEYS_ORDER.forEach((key) => {
        const g = gocharaPlacements[key];
        if (g && g.signIndex === signIndex) {
          const name = isTa ? SHORT_NAMES_TA[key] : SHORT_NAMES_EN[key];
          const prefix = isTa ? 'கோ.' : 'Tr.';
          occupants.push(`${prefix}${name}`);
          totalRay += calculatePlanetRay(key, signIndex);
        }
      });

      // Check Jama planets in this sign
      JAMA_KEYS_ORDER.forEach((key) => {
        const jp = jamaPlacements[key] || (key === 'snake' ? jamaPlacements['rahu'] : null);
        if (jp && jp.signIndex === signIndex) {
          const name = isTa
            ? (key === 'snake' || key === 'rahu' ? 'ராகு' : SHORT_NAMES_TA[key])
            : (key === 'snake' || key === 'rahu' ? 'Rahu' : SHORT_NAMES_EN[key]);
          const prefix = isTa ? 'ஜா.' : 'Jama.';
          occupants.push(`${prefix}${name}`);
          totalRay += calculatePlanetRay(key, signIndex);
        }
      });

      return {
        text: occupants.length > 0 ? occupants.join(', ') : '-',
        ray: totalRay
      };
    };

    const result = [];

    // -------------------------------------------------------------
    // Rows 1-3: Highlights (உதயம், ஆருடம், உதயத்தின் 10ம் இடம்)
    // -------------------------------------------------------------
    const udhayamSign = pillars.udhayam?.signIndex !== undefined
      ? pillars.udhayam.signIndex
      : (pillars.udhayam?.rasiIndex ?? 2);

    const aarudamSign = pillars.aarudam?.signIndex !== undefined
      ? pillars.aarudam.signIndex
      : (pillars.aarudam?.rasiIndex ?? 11);

    const tenthSign = (udhayamSign + 9) % 12;

    const highlightPoints = [
      {
        label: isTa ? 'உதயம்' : 'Udhayam',
        signIndex: udhayamSign
      },
      {
        label: isTa ? 'ஆருடம்' : 'Aarudam',
        signIndex: aarudamSign
      },
      {
        label: isTa ? 'உதயத்தின் 10ம் இடம்' : '10th from Udhayam',
        signIndex: tenthSign
      }
    ];

    highlightPoints.forEach((pt) => {
      const occ = getOccupantsInfo(pt.signIndex);
      result.push({
        isHighlight: true,
        label: pt.label,
        signName: getRasi(pt.signIndex, lang),
        status: occ.text,
        planetRay: occ.ray,
        rasiRay: RASI_RAYS[pt.signIndex] || 0
      });
    });

    // -------------------------------------------------------------
    // Rows 4-12: Gochara Planets (கோச்சாரம் - சூரியன் .. கேது)
    // -------------------------------------------------------------
    GOCHARA_KEYS_ORDER.forEach((key) => {
      const g = gocharaPlacements[key];
      const signIndex = g ? g.signIndex : 0;
      const baseName = isTa ? SHORT_NAMES_TA[key] : SHORT_NAMES_EN[key];
      const label = isTa ? `கோச்சாரம் - ${baseName}` : `Transit - ${baseName}`;
      const dignity = getDignity(key, signIndex, lang);
      const planetRay = calculatePlanetRay(key, signIndex);
      const rasiRay = RASI_RAYS[signIndex] || 0;

      result.push({
        isHighlight: false,
        label,
        signName: getRasi(signIndex, lang),
        status: dignity,
        planetRay,
        rasiRay
      });
    });

    // -------------------------------------------------------------
    // Rows 13-20: Jama Planets (ஜாமம் - சூரியன் .. ராகு)
    // -------------------------------------------------------------
    JAMA_KEYS_ORDER.forEach((key) => {
      const jp = jamaPlacements[key] || (key === 'snake' ? jamaPlacements['rahu'] : null);
      const signIndex = jp ? jp.signIndex : 0;
      const displayKey = (key === 'snake' || key === 'rahu') ? 'rahu' : key;
      const baseName = isTa
        ? (displayKey === 'rahu' ? 'ராகு' : SHORT_NAMES_TA[displayKey])
        : (displayKey === 'rahu' ? 'Rahu' : SHORT_NAMES_EN[displayKey]);
      const label = isTa ? `ஜாமம் - ${baseName}` : `Jama - ${baseName}`;
      const dignity = getDignity(displayKey, signIndex, lang);
      const planetRay = calculatePlanetRay(displayKey, signIndex);
      const rasiRay = RASI_RAYS[signIndex] || 0;

      result.push({
        isHighlight: false,
        label,
        signName: getRasi(signIndex, lang),
        status: dignity,
        planetRay,
        rasiRay
      });
    });

    return result;
  }, [chartData, lang, isTa]);

  if (!chartData || rows.length === 0) return null;

  return (
    <div className="jk-rays-section">
      <div className="jk-status-card">
        <h3 className="jk-status-card-title">
          {isTa ? 'தற்போதைய பிரசன்னத்தின் ராசி மற்றும் கிரக கதிர்கள்' : "Current Prasannam's Rasi and Planetary Rays"}
        </h3>
        <div className="jk-status-table-wrap">
          <table className="jk-status-table">
            <thead>
              <tr>
                <th>{isTa ? 'கிரகம்' : 'Planet'}</th>
                <th>{isTa ? 'ராசி' : 'Sign'}</th>
                <th>
                  {isTa ? (
                    <>
                      நிலை /<br />நின்ற கிரகம்
                    </>
                  ) : (
                    <>
                      Status /<br />Occupying Planet
                    </>
                  )}
                </th>
                <th>{isTa ? 'கிரக கதிர்' : 'Planet Ray'}</th>
                <th>{isTa ? 'ராசி கதிர்' : 'Rasi Ray'}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr
                  key={idx}
                  className={row.isHighlight ? 'jk-ray-highlight-row' : ''}
                >
                  <td className="jk-cell-planet-title">
                    <strong>{row.label}</strong>
                  </td>
                  <td className="jk-cell-sign">
                    {row.signName}
                  </td>
                  <td className="jk-cell-dignity">
                    {row.status === '-' ? (
                      <span className="jk-dignity-dash">-</span>
                    ) : (
                      <span
                        className={
                          row.isHighlight
                            ? 'jk-ray-occ-text'
                            : row.status === 'நீசம்' || row.status === 'Debilitated'
                            ? 'jk-dignity-debilitated'
                            : row.status === 'உச்சம்' || row.status === 'Exalted'
                            ? 'jk-dignity-exalted'
                            : row.status === 'ஆட்சி' || row.status === 'Own'
                            ? 'jk-dignity-own'
                            : 'jk-dignity-text'
                        }
                      >
                        {row.status}
                      </span>
                    )}
                  </td>
                  <td className="jk-cell-ray-number">
                    <strong>{row.planetRay}</strong>
                  </td>
                  <td className="jk-cell-ray-number">
                    <strong>{row.rasiRay}</strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
