import React, { useMemo } from 'react';
import { JAMAKKOL_RASIS } from '../../../utils/jamakkol.utils';

// Localized planet names dictionary
const PLANET_DISPLAY_NAMES = {
  sun: { en: 'Sun', ta: 'சூரியன்', hi: 'सूर्य', te: 'సూర్యుడు', kn: 'ಸೂರ್ಯ', ml: 'സൂര്യൻ' },
  moon: { en: 'Moon', ta: 'சந்திரன்', hi: 'चंद्र', te: 'చంద్రుడు', kn: 'ಚಂದ್ರ', ml: 'ചന്ദ്രൻ' },
  mars: { en: 'Mars', ta: 'செவ்வாய்', hi: 'मंगल', te: 'కుజుడు', kn: 'ಮಂಗಳ', ml: 'ചൊവ്വ' },
  mercury: { en: 'Mercury', ta: 'புதன்', hi: 'बुध', te: 'బుధుడు', kn: 'ಬುಧ', ml: 'ബുಧன்' },
  jupiter: { en: 'Jupiter', ta: 'குரு', hi: 'गुरु', te: 'గురుడు', kn: 'ಗುರು', ml: 'വ്യാഴം' },
  venus: { en: 'Venus', ta: 'சுக்கிரன்', hi: 'शुक्र', te: 'శుక్రుడు', kn: 'ಶುಕ್ರ', ml: 'ശുക്രൻ' },
  saturn: { en: 'Saturn', ta: 'சனி', hi: 'शनि', te: 'శని', kn: 'ಶನಿ', ml: 'ശനി' },
  rahu: { en: 'Rahu', ta: 'ராகு', hi: 'राहु', te: 'రాహువు', kn: 'ರಾಹು', ml: 'രാഹു' },
  ketu: { en: 'Ketu', ta: 'கேது', hi: 'केतु', te: 'కేతువు', kn: 'ಕೇತು', ml: 'കേതു' },
  snake: { en: 'Snake', ta: 'பாம்பு', hi: 'सर्प', te: 'పాము', kn: 'ಹಾವು', ml: 'പാമ്പ്' }
};

// Sign Lords map (0: Aries .. 11: Pisces)
const SIGN_LORDS = [
  'mars',    // 0: Aries
  'venus',   // 1: Taurus
  'mercury', // 2: Gemini
  'moon',    // 3: Cancer
  'sun',     // 4: Leo
  'mercury', // 5: Virgo
  'venus',   // 6: Libra
  'mars',    // 7: Scorpio
  'jupiter', // 8: Sagittarius
  'saturn',  // 9: Capricorn
  'saturn',  // 10: Aquarius
  'jupiter'  // 11: Pisces
];

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

// Helper: Normalize planet name to standard key
function normalizePlanetKey(name) {
  if (!name) return '';
  const clean = String(name).replace(/[^a-zA-Z]/g, '').toLowerCase();
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

// Helper: Get localized planet display name
function getPlanetName(rawName, lang = 'ta') {
  const key = normalizePlanetKey(rawName);
  const entry = PLANET_DISPLAY_NAMES[key];
  if (!entry) return rawName || '-';
  return entry[lang] || entry.ta || entry.en || rawName;
}

// Helper: Get localized Rasi sign name
function getRasiName(signIndex, lang = 'ta') {
  if (signIndex === undefined || signIndex === null || signIndex < 0 || signIndex > 11) return '-';
  const r = JAMAKKOL_RASIS[signIndex];
  if (!r) return '-';
  return r[lang] || r.ta || r.en || `Rasi ${signIndex + 1}`;
}

// Calculate dignities (ஆட்சி / உச்சம் / நீசம் / வக்ரம் / திக்பலம்)
function calculateDignity(planetRaw, signIndex, isRetrograde = false, udhayamSignIndex = null, lang = 'ta') {
  const isTa = lang === 'ta';
  const key = normalizePlanetKey(planetRaw);
  if (!key || signIndex === undefined || signIndex === null) return '-';

  const dignities = [];

  // Exaltation (உச்சம்)
  if (EXALTATIONS[key] === signIndex) {
    dignities.push(isTa ? 'உச்சம்' : 'Exalted');
  }
  // Debilitation (நீசம்)
  else if (DEBILITATIONS[key] === signIndex) {
    dignities.push(isTa ? 'நீசம்' : 'Debilitated');
  }
  // Moolatrikona (மூலத்திரிகோணம்) for Sun in Leo
  else if (key === 'sun' && signIndex === 4) {
    dignities.push(isTa ? 'மூலத்திரிகோணம்' : 'Moolatrikona');
  }
  // Own sign (ஆட்சி)
  else if (OWN_SIGNS[key] && OWN_SIGNS[key].includes(signIndex)) {
    dignities.push(isTa ? 'ஆட்சி' : 'Own');
  }

  // Digbala (திக்பலம்) relative to Udhayam:
  // 1st house (Udhayam): Jupiter (குரு), Mercury (புதன்)
  // 4th house from Udhayam: Moon (சந்திரன்), Venus (சுக்கிரன்)
  // 7th house from Udhayam: Saturn (சனி)
  // 10th house from Udhayam: Sun (சூரியன்), Mars (செவ்வாய்)
  if (udhayamSignIndex !== null && udhayamSignIndex !== undefined) {
    const houseFromUdhayam = ((signIndex - udhayamSignIndex + 12) % 12) + 1;
    if (houseFromUdhayam === 1 && ['jupiter', 'mercury'].includes(key)) {
      dignities.push(isTa ? 'திக்பலம்' : 'Digbala');
    } else if (houseFromUdhayam === 4 && ['moon', 'venus'].includes(key)) {
      dignities.push(isTa ? 'திக்பலம்' : 'Digbala');
    } else if (houseFromUdhayam === 7 && key === 'saturn') {
      dignities.push(isTa ? 'திக்பலம்' : 'Digbala');
    } else if (houseFromUdhayam === 10 && ['sun', 'mars'].includes(key)) {
      dignities.push(isTa ? 'திக்பலம்' : 'Digbala');
    }
  }

  // Retrograde (வக்ரம்)
  if (isRetrograde) {
    dignities.push(isTa ? 'வக்ரம்' : 'Retrograde');
  }

  return dignities.length > 0 ? dignities.join(', ') : '-';
}

/**
 * JamakolPlanetaryStatusTables
 * Displays:
 * Table 1: உதயம், ஆரூடம், கவிப்பு வீடுகளில் நின்ற கிரகங்களின் நிலை
 * Table 2: உதய, ஆரூட, கவிப்பு அதிபதிகளின் நிலை
 */
export default function JamakolPlanetaryStatusTables({ chartData, lang = 'ta' }) {
  const isTa = lang === 'ta';

  const tableData = useMemo(() => {
    if (!chartData) return { table1Rows: [], table2Rows: [] };

    const pillars = chartData.pillars || {};
    const udhayam = pillars.udhayam || {};
    const aarudam = pillars.aarudam || {};
    const kavippu = pillars.kavippu || {};
    const rasiGrid = chartData.rasiGrid || [];
    const jamaPlanets = chartData.jamaPlanets || {};

    const udhayamSign = udhayam.signIndex !== undefined ? udhayam.signIndex : 3;
    const aarudamSign = aarudam.signIndex !== undefined ? aarudam.signIndex : 7;
    const kavippuSign = kavippu.signIndex !== undefined ? kavippu.signIndex : 9;

    // Helper to find Gochara placement of a planet
    const findGochara = (targetKey) => {
      const cleanTarget = normalizePlanetKey(targetKey);
      for (let s = 0; s < 12; s++) {
        const cell = rasiGrid[s] || [];
        for (const p of cell) {
          if (p.isSubPlanet || p.isSpecialPrasannam || p.isLagna) continue;
          const pKey = normalizePlanetKey(p.name);
          if (pKey === cleanTarget) {
            return {
              signIndex: s,
              isRetrograde: Boolean(p.isRetrograde || p.symbol?.includes('*')),
              raw: p
            };
          }
        }
      }
      return null;
    };

    // Helper to find Jama placement of a planet
    const findJama = (targetKey) => {
      const cleanTarget = normalizePlanetKey(targetKey);
      const list = Object.values(jamaPlanets || {});
      for (const jp of list) {
        const jpKey = normalizePlanetKey(jp.name || jp.key);
        if (jpKey === cleanTarget) {
          const s = jp.signIndex !== undefined ? jp.signIndex : jp.sign;
          return {
            signIndex: s,
            isRetrograde: false,
            raw: jp
          };
        }
      }
      return null;
    };

    // -------------------------------------------------------------
    // Table 1: Planets in Udhayam, Aarudam, Kavippu signs
    // -------------------------------------------------------------
    const pillarList = [
      {
        key: 'udhayam',
        signIndex: udhayamSign,
        label: isTa ? `உதயம் (${getRasiName(udhayamSign, lang)})` : `Udhayam (${getRasiName(udhayamSign, lang)})`
      },
      {
        key: 'aarudam',
        signIndex: aarudamSign,
        label: isTa ? `ஆரூடம் (${getRasiName(aarudamSign, lang)})` : `Aarudam (${getRasiName(aarudamSign, lang)})`
      },
      {
        key: 'kavippu',
        signIndex: kavippuSign,
        label: isTa ? `கவிப்பு (${getRasiName(kavippuSign, lang)})` : `Kavippu (${getRasiName(kavippuSign, lang)})`
      }
    ];

    const table1Rows = [];

    pillarList.forEach((pillar) => {
      const s = pillar.signIndex;

      // 1. Gochara planets in this sign
      const gocharaInSign = (rasiGrid[s] || []).filter(
        (p) => !p.isSubPlanet && !p.isSpecialPrasannam && !p.isLagna
      );

      // 2. Jama planets in this sign
      const jamaInSign = Object.values(jamaPlanets || {}).filter(
        (jp) => (jp.signIndex !== undefined ? jp.signIndex : jp.sign) === s
      );

      if (gocharaInSign.length === 0 && jamaInSign.length === 0) {
        table1Rows.push({
          pillarText: pillar.label,
          planetText: '-',
          typeText: '-',
          dignityText: '-'
        });
      } else {
        // Gochara planets first
        gocharaInSign.forEach((gp) => {
          const isRetro = Boolean(gp.isRetrograde || gp.symbol?.includes('*'));
          const dig = calculateDignity(gp.name, s, isRetro, udhayamSign, lang);
          table1Rows.push({
            pillarText: pillar.label,
            planetText: getPlanetName(gp.name, lang),
            typeText: isTa ? 'கோச்சாரம்' : 'Transit',
            dignityText: dig
          });
        });

        // Jama planets second
        jamaInSign.forEach((jp) => {
          const dig = calculateDignity(jp.name || jp.key, s, false, udhayamSign, lang);
          table1Rows.push({
            pillarText: pillar.label,
            planetText: getPlanetName(jp.name || jp.key, lang),
            typeText: isTa ? 'ஜாமம்' : 'Jamam',
            dignityText: dig
          });
        });
      }
    });

    // -------------------------------------------------------------
    // Table 2: Status of Udhayam, Aarudam, Kavippu Sign Lords
    // -------------------------------------------------------------
    const table2Rows = [];

    const lordTargets = [
      {
        titleTa: 'உதயம் அதிபதி',
        titleEn: 'Udhayam Lord',
        signIndex: udhayamSign
      },
      {
        titleTa: 'ஆரூடம் அதிபதி',
        titleEn: 'Aarudam Lord',
        signIndex: aarudamSign
      },
      {
        titleTa: 'கவிப்பு அதிபதி',
        titleEn: 'Kavippu Lord',
        signIndex: kavippuSign
      }
    ];

    lordTargets.forEach((t) => {
      const lordPlanetKey = SIGN_LORDS[t.signIndex] || 'mars';
      const lordDisplayName = getPlanetName(lordPlanetKey, lang);
      const rowTitle = isTa ? t.titleTa : t.titleEn;

      // 1. Gochara row
      const gPos = findGochara(lordPlanetKey);
      const gSign = gPos ? gPos.signIndex : null;
      const gSignName = gSign !== null ? getRasiName(gSign, lang) : '-';
      const gDig = gSign !== null ? calculateDignity(lordPlanetKey, gSign, gPos?.isRetrograde, udhayamSign, lang) : '-';

      table2Rows.push({
        lordTitle: rowTitle,
        planetName: lordDisplayName,
        signName: gSignName,
        typeText: isTa ? 'கோச்சாரம்' : 'Transit',
        dignityText: gDig
      });

      // 2. Jama row
      const jPos = findJama(lordPlanetKey);
      const jSign = jPos ? jPos.signIndex : null;
      const jSignName = jSign !== null ? getRasiName(jSign, lang) : '-';
      const jDig = jSign !== null ? calculateDignity(lordPlanetKey, jSign, false, udhayamSign, lang) : '-';

      table2Rows.push({
        lordTitle: rowTitle,
        planetName: lordDisplayName,
        signName: jSignName,
        typeText: isTa ? 'ஜாமம்' : 'Jamam',
        dignityText: jDig
      });
    });

    // =============================================================
    // Special Notes (சிறப்புக் குறிப்புகள்)
    // Matches exact reference software & screenshots:
    // 1. கோச்சார கிரக பரிவர்த்தனை (Transit Planets in Parivarthana)
    // 2. ஜாம கிரக பரிவர்த்தனை (Jama Planets in Parivarthana)
    // 3. இந்த ஜாமத்தில் உச்சமடைந்த ஜாம கிரகங்கள் (Jama Planets Exalted in this Jamam)
    // 4. இந்த ஜாமத்தில் நீசமடைந்த ஜாம கிரகங்கள் (Jama Planets Debilitated in this Jamam)
    // =============================================================

    const PHYSICAL_PLANETS = ['sun', 'moon', 'mars', 'mercury', 'jupiter', 'venus', 'saturn'];

    // Helper: Find mutual receptions (Parivartana) among given planetary placements { planetKey: signIndex }
    const findParivartanaPairs = (placements) => {
      const pairs = [];
      const checked = new Set();

      PHYSICAL_PLANETS.forEach((pA) => {
        const signA = placements[pA];
        if (signA === undefined) return;
        const lordA = SIGN_LORDS[signA];

        if (lordA && lordA !== pA && PHYSICAL_PLANETS.includes(lordA)) {
          const signB = placements[lordA];
          if (signB !== undefined) {
            const lordB = SIGN_LORDS[signB];
            if (lordB === pA) {
              const pairKey = [pA, lordA].sort().join('_');
              if (!checked.has(pairKey)) {
                checked.add(pairKey);
                const nameA = getPlanetName(pA, lang);
                const nameB = getPlanetName(lordA, lang);
                pairs.push(`${nameA} & ${nameB}`);
              }
            }
          }
        }
      });
      return pairs;
    };

    // A. Gochara Parivartana (Transit Planets)
    const gocharaPlacements = {};
    for (let s = 0; s < 12; s++) {
      const cell = rasiGrid[s] || [];
      for (const p of cell) {
        if (p.isSubPlanet || p.isSpecialPrasannam || p.isLagna) continue;
        const pKey = normalizePlanetKey(p.name);
        if (PHYSICAL_PLANETS.includes(pKey) && gocharaPlacements[pKey] === undefined) {
          gocharaPlacements[pKey] = s;
        }
      }
    }
    const gocharaPairs = findParivartanaPairs(gocharaPlacements);
    const gocharaParivartanaText = gocharaPairs.length > 0 ? gocharaPairs.join(', ') : null;

    // B. Jama Parivartana (Jama Planets in mutual reception)
    const jamaPlacements = {};
    const jamaList = Object.values(jamaPlanets || {});
    jamaList.forEach((jp) => {
      const key = normalizePlanetKey(jp.name || jp.key);
      const s = jp.signIndex !== undefined ? jp.signIndex : jp.sign;
      if (s !== undefined && s !== null && s >= 0 && PHYSICAL_PLANETS.includes(key)) {
        jamaPlacements[key] = s;
      }
    });
    const jamaPairs = findParivartanaPairs(jamaPlacements);
    const jamaParivartanaText = jamaPairs.length > 0 ? jamaPairs.join(', ') : null;

    // C. Jama Exalted & Debilitated Planets in this Jamam
    const exaltedJama = [];
    const debilitatedJama = [];

    jamaList.forEach((jp) => {
      const key = normalizePlanetKey(jp.name || jp.key);
      const s = jp.signIndex !== undefined ? jp.signIndex : jp.sign;
      if (s === undefined || s === null || s < 0) return;

      const lookupKey = key === 'rahu' ? 'snake' : key;
      if (EXALTATIONS[lookupKey] === s || EXALTATIONS[key] === s) {
        const name = getPlanetName(key, lang);
        if (!exaltedJama.includes(name)) exaltedJama.push(name);
      } else if (DEBILITATIONS[lookupKey] === s || DEBILITATIONS[key] === s) {
        const name = getPlanetName(key, lang);
        if (!debilitatedJama.includes(name)) debilitatedJama.push(name);
      }
    });

    const exaltedJamaText = exaltedJama.length > 0 ? exaltedJama.join(', ') : null;
    const debilitatedJamaText = debilitatedJama.length > 0 ? debilitatedJama.join(', ') : null;

    const specialNotes = {
      gocharaParivartana: gocharaParivartanaText,
      jamaParivartana: jamaParivartanaText,
      exaltedJama: exaltedJamaText,
      debilitatedJama: debilitatedJamaText,
      hasAnyNotes: Boolean(gocharaParivartanaText || jamaParivartanaText || exaltedJamaText || debilitatedJamaText)
    };

    return { table1Rows, table2Rows, specialNotes };
  }, [chartData, lang, isTa]);

  if (!chartData) return null;

  return (
    <div className="jk-planetary-status-section">
      {/* ========================================================
          Card 1: உதயம், ஆரூடம், கவிப்பு வீடுகளில் நின்ற கிரகங்களின் நிலை
          ======================================================== */}
      <div className="jk-status-card">
        <h3 className="jk-status-card-title">
          {isTa
            ? 'உதயம், ஆரூடம், கவிப்பு வீடுகளில் நின்ற கிரகங்களின் நிலை'
            : 'Status of Planets in Udhayam, Aarudam, Kavippu Signs'}
        </h3>
        <div className="jk-status-table-wrap">
          <table className="jk-status-table jk-table-t1">
            <thead>
              <tr>
                <th>{isTa ? 'புள்ளி' : 'Point / Pillar'}</th>
                <th>{isTa ? 'கிரகம்' : 'Planet'}</th>
                <th>{isTa ? 'கோச்சாரம் / ஜாமம்' : 'Transit / Jamam'}</th>
                <th>{isTa ? 'நிலைகள் (ஆட்சி/உச்சம்/வக்ரம்...)' : 'Dignity (Own/Exalted/Retro...)'}</th>
              </tr>
            </thead>
            <tbody>
              {tableData.table1Rows.map((row, idx) => {
                const isDash = row.dignityText === '-';
                return (
                  <tr key={idx}>
                    <td className="jk-cell-pillar">{row.pillarText}</td>
                    <td className="jk-cell-planet">{row.planetText}</td>
                    <td className="jk-cell-type">{row.typeText}</td>
                    <td className={`jk-cell-dignity-t1 ${isDash ? 'dash' : ''}`}>
                      {row.dignityText}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================
          Card 2: உதய, ஆரூட, கவிப்பு அதிபதிகளின் நிலை
          ======================================================== */}
      <div className="jk-status-card">
        <h3 className="jk-status-card-title">
          {isTa
            ? 'உதய, ஆரூட, கவிப்பு அதிபதிகளின் நிலை'
            : 'Status of Udhayam, Aarudam, Kavippu Sign Lords'}
        </h3>
        <div className="jk-status-table-wrap">
          <table className="jk-status-table jk-table-t2">
            <thead>
              <tr>
                <th>{isTa ? 'அதிபதி' : 'Sign Lord'}</th>
                <th>{isTa ? 'கிரகம்' : 'Planet'}</th>
                <th>{isTa ? 'நின்ற ராசி' : 'Posited Sign'}</th>
                <th>{isTa ? 'கோச்சாரம் / ஜாமம்' : 'Transit / Jamam'}</th>
                <th>{isTa ? 'நிலைகள்' : 'Status'}</th>
              </tr>
            </thead>
            <tbody>
              {tableData.table2Rows.map((row, idx) => {
                const isDash = row.dignityText === '-';
                return (
                  <tr key={idx}>
                    <td className="jk-cell-pillar">{row.lordTitle}</td>
                    <td className="jk-cell-planet">{row.planetName}</td>
                    <td className="jk-cell-sign">{row.signName}</td>
                    <td className="jk-cell-type">{row.typeText}</td>
                    <td className={`jk-cell-dignity-t2 ${isDash ? 'dash' : ''}`}>
                      {row.dignityText}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* ========================================================
            ★ சிறப்புக் குறிப்புகள் (Special Notes Callout)
            Matches exact reference screenshot & jamakkolprasannam.com:
            • ⇄ கோச்சார கிரக பரிவர்த்தனை: செவ்வாய் & சந்திரன்
            • ⇄ ஜாம கிரக பரிவர்த்தனை: செவ்வாய் & சந்திரன்
            • ↑ இந்த ஜாமத்தில் உச்சமடைந்த ஜாம கிரகங்கள்: ...
            • ↓ இந்த ஜாமத்தில் நீசமடைந்த ஜாம கிரகங்கள்: ...
            ======================================================== */}
        {tableData.specialNotes?.hasAnyNotes && (
          <div className="jk-special-notes-box">
            <div className="jk-special-notes-title">
              <span className="jk-special-notes-star">★</span> {isTa ? 'சிறப்புக் குறிப்புகள்' : 'Special Observations'}
            </div>
            <div className="jk-special-notes-list">
              {tableData.specialNotes?.gocharaParivartana && (
                <div className="jk-note-item jk-note-parivartana">
                  <span className="jk-note-bullet">•</span>
                  <span className="jk-note-icon">⇄</span>
                  <span className="jk-note-text">
                    <b>{isTa ? 'கோச்சார கிரக பரிவர்த்தனை: ' : 'Transit Planets in Parivarthana: '}</b>
                    {tableData.specialNotes.gocharaParivartana}
                  </span>
                </div>
              )}
              {tableData.specialNotes?.jamaParivartana && (
                <div className="jk-note-item jk-note-parivartana">
                  <span className="jk-note-bullet">•</span>
                  <span className="jk-note-icon">⇄</span>
                  <span className="jk-note-text">
                    <b>{isTa ? 'ஜாம கிரக பரிவர்த்தனை: ' : 'Jama Planets in Parivarthana: '}</b>
                    {tableData.specialNotes.jamaParivartana}
                  </span>
                </div>
              )}
              {tableData.specialNotes?.exaltedJama && (
                <div className="jk-note-item jk-note-exalted">
                  <span className="jk-note-bullet">•</span>
                  <span className="jk-note-icon">↑</span>
                  <span className="jk-note-text">
                    <b>{isTa ? 'இந்த ஜாமத்தில் உச்சமடைந்த ஜாம கிரகங்கள்: ' : 'Jama Planets Exalted in this Jamam: '}</b>
                    {tableData.specialNotes.exaltedJama}
                  </span>
                </div>
              )}
              {tableData.specialNotes?.debilitatedJama && (
                <div className="jk-note-item jk-note-debilitated">
                  <span className="jk-note-bullet">•</span>
                  <span className="jk-note-icon">↓</span>
                  <span className="jk-note-text">
                    <b>{isTa ? 'இந்த ஜாமத்தில் நீசமடைந்த ஜாம கிரகங்கள்: ' : 'Jama Planets Debilitated in this Jamam: '}</b>
                    {tableData.specialNotes.debilitatedJama}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
