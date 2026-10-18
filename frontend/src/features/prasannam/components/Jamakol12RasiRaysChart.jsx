import React, { useState, useMemo } from 'react';
import { JAMAKKOL_RASIS } from '../../../utils/jamakkol.utils';

// Classical Base Rasi Rays (12 signs: Aries=0 to Pisces=11)
export const RASI_CLASSICAL_RAYS = [7, 8, 5, 3, 7, 11, 2, 4, 6, 8, 8, 27];

// Classical Base Planet Rays (Updated to exact user specification)
// Sun=5, Moon=21, Mars=8, Mercury=16, Jupiter=10, Venus=20, Saturn=4, Rahu=4, Ketu=4
export const PLANET_BASE_RAYS_TABLE = {
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
export const EXALTATION_SIGNS_MAP = {
  sun: 0,      // Aries
  moon: 1,     // Taurus
  mars: 9,     // Capricorn
  mercury: 5,  // Virgo
  jupiter: 3,  // Cancer
  venus: 11,   // Pisces
  saturn: 6,   // Libra
  rahu: 1,     // Taurus
  ketu: 7,     // Scorpio
  snake: 1
};

// Classical Debilitation Signs (நீச ராசிகள்)
export const DEBILITATION_SIGNS_MAP = {
  sun: 6,      // Libra
  moon: 7,     // Scorpio
  mars: 3,     // Cancer
  mercury: 11, // Pisces
  jupiter: 9,  // Capricorn
  venus: 5,    // Virgo
  saturn: 0,   // Aries
  rahu: 7,     // Scorpio
  ketu: 1,     // Taurus
  snake: 7
};

// Classical Own Signs (ஆட்சி ராசிகள்)
export const OWN_HOUSE_SIGNS_MAP = {
  sun: [4],       // Leo
  moon: [3],      // Cancer
  mars: [0, 7],   // Aries, Scorpio
  mercury: [2, 5],// Gemini, Virgo
  jupiter: [8, 11],// Sagittarius, Pisces
  venus: [1, 6],  // Taurus, Libra
  saturn: [9, 10] // Capricorn, Aquarius
};

// Classical Special & General Aspect Offsets (பார்வை இடைவெளிகள்)
export const PLANETARY_ASPECT_OFFSETS_MAP = {
  sun: [6],
  moon: [6],
  mars: [3, 6, 7],      // 4th, 7th, 8th
  mercury: [6],
  jupiter: [4, 6, 8],    // 5th, 7th, 9th
  venus: [6],
  saturn: [2, 6, 9],     // 3rd, 7th, 10th
  rahu: [4, 6, 8],       // 5th, 7th, 9th
  ketu: [4, 6, 8],       // 5th, 7th, 9th
  snake: [4, 6, 8]       // 5th, 7th, 9th
};

export const PLANET_DISPLAY_NAMES_6LANG = {
  sun: { ta: 'சூரியன்', en: 'Sun', hi: 'सूर्य', te: 'సూర్యుడు', kn: 'ಸೂರ್ಯ', ml: 'സൂര്യൻ', shortTa: 'சூரி', shortEn: 'Su' },
  moon: { ta: 'சந்திரன்', en: 'Moon', hi: 'चंद्र', te: 'చంద్రుడు', kn: 'ಚಂದ್ರ', ml: 'ചന്ദ്രൻ', shortTa: 'சந்', shortEn: 'Mo' },
  mars: { ta: 'செவ்வாய்', en: 'Mars', hi: 'मंगल', te: 'కుజుడు', kn: 'ಮಂಗಳ', ml: 'ചൊവ്വ', shortTa: 'செவ்', shortEn: 'Ma' },
  mercury: { ta: 'புதன்', en: 'Mercury', hi: 'बुध', te: 'బుధుడు', kn: 'ಬುಧ', ml: 'ಬುಧൻ', shortTa: 'புத', shortEn: 'Me' },
  jupiter: { ta: 'குரு', en: 'Jupiter', hi: 'गुरु', te: 'గురువు', kn: 'ಗುರು', ml: 'വ്യാഴം', shortTa: 'குரு', shortEn: 'Ju' },
  venus: { ta: 'சுக்கிரன்', en: 'Venus', hi: 'शुक्र', te: 'శుక్రుడు', kn: 'ಶುಕ್ರ', ml: 'ശുക്രൻ', shortTa: 'சுக்', shortEn: 'Ve' },
  saturn: { ta: 'சனி', en: 'Saturn', hi: 'शनि', te: 'శని', kn: 'ಶನಿ', ml: 'ശനി', shortTa: 'சனி', shortEn: 'Sa' },
  rahu: { ta: 'பாம்பு (ராகு)', en: 'Rahu', hi: 'राहु', te: 'రాహు', kn: 'ರಾಹು', ml: 'രാഹു', shortTa: 'பாம்பு', shortEn: 'Ra' },
  ketu: { ta: 'கேது', en: 'Ketu', hi: 'केतु', te: 'కేతువు', kn: 'ಕೇತು', ml: 'കേതു', shortTa: 'கேது', shortEn: 'Ke' },
  snake: { ta: 'பாம்பு (ராகு)', en: 'Rahu (Snake)', hi: 'राहु', te: 'రాహు', kn: 'ರಾಹು', ml: 'രാഹു', shortTa: 'பாம்பு', shortEn: 'Sn' }
};

export const JAMA_PREFIXES = {
  ta: 'ஜா.',
  en: 'Ja.',
  hi: 'जा.',
  te: 'జా.',
  kn: 'ಜಾ.',
  ml: 'ജാ.'
};

export function normalizeStandardPlanetKey(nameOrKey) {
  if (!nameOrKey) return '';
  const clean = String(nameOrKey).replace(/[^a-zA-Z]/g, '').toLowerCase();
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

/**
 * Calculate standing ray for a planet based on classical dignity:
 * - Exalted (உச்சம்): base * 3
 * - Own sign (ஆட்சி): base * 2
 * - Debilitated (நீசம்): base * 0 = 0
 * - Normal: base * 1
 */
export function calculatePlanetStandingRay(planetKey, signIndex, lang = 'ta') {
  const normKey = normalizeStandardPlanetKey(planetKey);
  const lookupKey = normKey === 'rahu' ? 'snake' : normKey;
  const baseRay = PLANET_BASE_RAYS_TABLE[lookupKey] || PLANET_BASE_RAYS_TABLE[normKey] || 4;

  const names = PLANET_DISPLAY_NAMES_6LANG[lookupKey] || PLANET_DISPLAY_NAMES_6LANG[normKey] || {
    ta: planetKey, en: planetKey, shortTa: planetKey, shortEn: planetKey
  };
  const isTa = lang === 'ta';
  const name = names[lang] || (isTa ? names.ta : names.en) || planetKey;
  const shortCode = isTa ? (names.shortTa || names.ta) : (names.shortEn || names.en);

  // 1. Exalted (உச்சம்): base * 3
  if (EXALTATION_SIGNS_MAP[lookupKey] === signIndex || EXALTATION_SIGNS_MAP[normKey] === signIndex) {
    return {
      planetKey: normKey,
      name,
      shortCode,
      signIndex,
      dignity: 'ucham',
      dignityLabel: isTa ? 'உச்சம்' : 'Exalted',
      multiplier: 3,
      baseRay,
      calculatedRay: baseRay * 3,
      formula: `${baseRay} × 3 = ${baseRay * 3}`
    };
  }

  // 2. Debilitated (நீசம்): base * 0 = 0
  if (DEBILITATION_SIGNS_MAP[lookupKey] === signIndex || DEBILITATION_SIGNS_MAP[normKey] === signIndex) {
    return {
      planetKey: normKey,
      name,
      shortCode,
      signIndex,
      dignity: 'neecham',
      dignityLabel: isTa ? 'நீசம்' : 'Debilitated',
      multiplier: 0,
      baseRay,
      calculatedRay: 0,
      formula: `${baseRay} × 0 = 0`
    };
  }

  // 3. Own sign (ஆட்சி): base * 2
  if (OWN_HOUSE_SIGNS_MAP[normKey] && OWN_HOUSE_SIGNS_MAP[normKey].includes(signIndex)) {
    return {
      planetKey: normKey,
      name,
      shortCode,
      signIndex,
      dignity: 'atchi',
      dignityLabel: isTa ? 'ஆட்சி' : 'Own',
      multiplier: 2,
      baseRay,
      calculatedRay: baseRay * 2,
      formula: `${baseRay} × 2 = ${baseRay * 2}`
    };
  }

  // 4. Normal: base * 1
  return {
    planetKey: normKey,
    name,
    shortCode,
    signIndex,
    dignity: 'normal',
    dignityLabel: isTa ? 'இயல்பு' : 'Normal',
    multiplier: 1,
    baseRay,
    calculatedRay: baseRay,
    formula: `${baseRay} × 1 = ${baseRay}`
  };
}

/**
 * Calculates the total rays for all 12 Rasis according to formula:
 * Total Rays = Rasi Base Ray + Standing Planet Rays + Aspect Planet Rays
 * Additional Rules:
 * - Exalted planet: ray x 3
 * - Own sign planet: ray x 2
 * - Debilitated planet: ray x 0
 * - Aspect planet: ray / 2
 * Jamakol planets are flagged with `isJama: true`
 */
export function calculate12RasiRays(chartData, includeJama = false, lang = 'ta') {
  if (!chartData) return [];

  const rasiGrid = chartData.rasiGrid || [];
  const jamaPlanets = chartData.jamaPlanets || {};
  const isTa = lang === 'ta';

  // 1. Gather all Gochara (Transit) planets
  const planetsList = [];
  rasiGrid.forEach((cell, s) => {
    (cell || []).forEach((p) => {
      if (p.isSubPlanet || p.isSpecialPrasannam || p.isLagna) return;
      const key = normalizeStandardPlanetKey(p.name);
      if (PLANET_BASE_RAYS_TABLE[key]) {
        planetsList.push({
          key,
          signIndex: s,
          isJama: false,
          raw: p
        });
      }
    });
  });

  // 2. Gather Jama planets if enabled
  if (includeJama) {
    Object.values(jamaPlanets || {}).forEach((jp) => {
      const key = normalizeStandardPlanetKey(jp.name || jp.key);
      const s = jp.signIndex !== undefined ? jp.signIndex : jp.sign;
      if (key && s !== undefined && s !== null && s >= 0 && s < 12) {
        planetsList.push({
          key: key === 'snake' ? 'rahu' : key,
          signIndex: s,
          isJama: true,
          raw: jp
        });
      }
    });
  }

  // Calculate standing rays for each gathered planet
  const enrichedPlanets = planetsList.map((p) => {
    const standingInfo = calculatePlanetStandingRay(p.key, p.signIndex, lang);
    return {
      ...p,
      ...standingInfo,
      isJama: !!p.isJama
    };
  });

  // 3. For each of the 12 Rasis:
  const result = [];
  for (let s = 0; s < 12; s++) {
    const rasiMeta = JAMAKKOL_RASIS[s] || {};
    const rasiName = rasiMeta[lang] || (isTa ? rasiMeta.ta : rasiMeta.en) || `Rasi ${s + 1}`;
    const lordName = isTa ? (rasiMeta.lordTa || rasiMeta.lord) : (rasiMeta.lord || rasiMeta.lordTa);
    const rasiRay = RASI_CLASSICAL_RAYS[s] || 0;

    // A. Planets inside this rasi box
    const insidePlanets = enrichedPlanets.filter((p) => p.signIndex === s);
    const insideRaysSum = insidePlanets.reduce((acc, p) => acc + p.calculatedRay, 0);

    // B. Planets aspecting this rasi box from other signs
    const aspectingPlanets = [];
    let aspectRaysSum = 0;

    enrichedPlanets.forEach((p) => {
      if (p.signIndex === s) return; // Must aspect from another sign
      const offsets = PLANETARY_ASPECT_OFFSETS_MAP[p.key] || [6];
      const aspectedSigns = offsets.map((off) => (p.signIndex + off) % 12);
      if (aspectedSigns.includes(s)) {
        // Rule: if பார்வை கிரக கதிர் / 2
        const aspectRay = p.calculatedRay / 2;
        aspectRaysSum += aspectRay;
        aspectingPlanets.push({
          ...p,
          sourceSign: p.signIndex,
          sourceRasiName: JAMAKKOL_RASIS[p.signIndex]?.[lang] || JAMAKKOL_RASIS[p.signIndex]?.ta || '',
          sourceCalculatedRay: p.calculatedRay,
          aspectRay,
          aspectFormula: `${p.calculatedRay} / 2 = ${aspectRay}`,
          isJama: !!p.isJama
        });
      }
    });

    const totalRays = Number((rasiRay + insideRaysSum + aspectRaysSum).toFixed(1));

    const breakdownText = isTa
      ? `ராசி: ${rasiRay} + நின்றவை: ${insideRaysSum} + பார்வை: ${aspectRaysSum} = ${totalRays}`
      : `Rasi: ${rasiRay} + Standing: ${insideRaysSum} + Aspect: ${aspectRaysSum} = ${totalRays}`;

    result.push({
      rasiId: s,
      rasiName,
      lordName,
      rasiRay,
      insidePlanets,
      insideRaysSum,
      aspectingPlanets,
      aspectRaysSum,
      totalRays,
      breakdownText
    });
  }

  return result;
}

const UI_TEXT = {
  ta: {
    cardTitle: 'ராசி வாரியான கணக்கிடப்பட்ட கதிர் சக்கரம்',
    cardBadge: '12 கட்ட கதிர் சக்கரம்',
    formulaShort: 'மொத்த கதிர் = ராசி கதிர் + நின்றவை + பார்வை',
    rule1: 'உச்சம் × 3',
    rule2: 'ஆட்சி × 2',
    rule3: 'நீசம் × 0',
    rule4: 'பார்வை ÷ 2',
    toggleTransit: 'கோச்சாரம்',
    toggleAll: 'அனைத்து (ஜாமம் உட்பட)',
    total12Signs: 'மொத்த கதிர்கள்',
    raysUnit: 'கதிர்',
    viewTableBtn: 'விரிவான அட்டவணை',
    hideTableBtn: 'அட்டவணையை மறை',
    centerTitle: 'கதிர் சக்கர விவரம்',
    udhayamBadge: 'உதயம்',
    aarudamBadge: 'ஆரூடம்',
    kavippuBadge: 'கவிப்பு',
    lblRasi: 'ராசி',
    lblStanding: 'நின்றவை',
    lblAspect: 'பார்வை',
    colRasi: 'ராசி',
    colBase: 'ராசி',
    colStanding: 'நின்ற கிரகம் (கதிர்)',
    colAspect: 'பார்வை கிரகம் (÷2)',
    colTotal: 'மொத்தம்'
  },
  en: {
    cardTitle: '12-Box Calculated Rasi Rays Chart',
    cardBadge: '12-Box Rays Chart',
    formulaShort: 'Total Rays = Rasi Ray + Standing + Aspect',
    rule1: 'Exalted × 3',
    rule2: 'Own × 2',
    rule3: 'Debilitated × 0',
    rule4: 'Aspect ÷ 2',
    toggleTransit: 'Transit',
    toggleAll: 'All (Incl. Jama)',
    total12Signs: 'Total Rays',
    raysUnit: 'Rays',
    viewTableBtn: 'Detailed Table',
    hideTableBtn: 'Hide Table',
    centerTitle: 'Rays Chakra Summary',
    udhayamBadge: 'Udhayam',
    aarudamBadge: 'Aarudam',
    kavippuBadge: 'Kavippu',
    lblRasi: 'Rasi',
    lblStanding: 'Standing',
    lblAspect: 'Aspect',
    colRasi: 'Sign',
    colBase: 'Sign',
    colStanding: 'Standing Planets (Ray)',
    colAspect: 'Aspecting Planets (÷2)',
    colTotal: 'Total'
  },
  hi: {
    cardTitle: '12 राशि गणना किरण चक्र',
    cardBadge: '12 भाव किरण चक्र',
    formulaShort: 'कुल किरण = राशि + स्थित + दृष्टि',
    rule1: 'उच्च × 3',
    rule2: 'स्वक्षेत्र × 2',
    rule3: 'नीच × 0',
    rule4: 'दृष्टि ÷ 2',
    toggleTransit: 'गोचर',
    toggleAll: 'सभी',
    total12Signs: 'कुल किरणें',
    raysUnit: 'किरण',
    viewTableBtn: 'विस्तृत तालिका',
    hideTableBtn: 'छिपाएं',
    centerTitle: 'किरण चक्र सारांश',
    udhayamBadge: 'उदय',
    aarudamBadge: 'आरूढ़',
    kavippuBadge: 'कविप्पु',
    lblRasi: 'राशि',
    lblStanding: 'स्थित',
    lblAspect: 'दृष्टि',
    colRasi: 'राशि',
    colBase: 'मूल',
    colStanding: 'स्थित ग्रह',
    colAspect: 'दृष्टि ग्रह',
    colTotal: 'कुल'
  },
  te: {
    cardTitle: '12 రాశుల గణిత కిరణ చక్రం',
    cardBadge: '12 గడుల కిరణ చక్రం',
    formulaShort: 'మొత్తం = రాశి + స్థితి + దృష్టి',
    rule1: 'ఉచ్ఛ × 3',
    rule2: 'స్వక్షేత్రం × 2',
    rule3: 'నీచ × 0',
    rule4: 'దృష్టి ÷ 2',
    toggleTransit: 'గోచారం',
    toggleAll: 'అన్ని',
    total12Signs: 'మొత్తం కిరణాలు',
    raysUnit: 'కిరణాలు',
    viewTableBtn: 'వివరణ పట్టిక',
    hideTableBtn: 'దాచు',
    centerTitle: 'కిరణ చక్ర సారాంశం',
    udhayamBadge: 'ఉదయం',
    aarudamBadge: 'ఆరూఢం',
    kavippuBadge: 'కవిప్పు',
    lblRasi: 'రాశి',
    lblStanding: 'స్థితి',
    lblAspect: 'దృష్టి',
    colRasi: 'రాశి',
    colBase: 'రాశి',
    colStanding: 'స్థితి గ్రహాలు',
    colAspect: 'దృష్టి గ్రహాలు',
    colTotal: 'మొత్తం'
  },
  kn: {
    cardTitle: '12 ರಾಶಿಗಳ ಗಣಿತ ಕಿರಣ ಚಕ್ರ',
    cardBadge: '12 ಮನೆಗಳ ಕಿರಣ ಚಕ್ರ',
    formulaShort: 'ಒಟ್ಟು = ರಾಶಿ + ಸ್ಥಿತ + ದೃಷ್ಟಿ',
    rule1: 'ಉಚ್ಚ × 3',
    rule2: 'ಸ್ವಕ್ಷೇತ್ರ × 2',
    rule3: 'ನೀಚ × 0',
    rule4: 'ದೃಷ್ಟಿ ÷ 2',
    toggleTransit: 'ಗೋಚಾರ',
    toggleAll: 'ಎಲ್ಲವೂ',
    total12Signs: 'ಒಟ್ಟು ಕಿರಣಗಳು',
    raysUnit: 'ಕಿರಣ',
    viewTableBtn: 'ವಿವರಣಾ ಪಟ್ಟಿ',
    hideTableBtn: 'ಮರೆಮಾಡಿ',
    centerTitle: 'ಕಿರಣ ಚಕ್ರ ಸಾರಾಂಶ',
    udhayamBadge: 'ಉದಯ',
    aarudamBadge: 'ಆರೂಢ',
    kavippuBadge: 'ಕವಿಪ್ಪು',
    lblRasi: 'ರಾಶಿ',
    lblStanding: 'ಸ್ಥಿತ',
    lblAspect: 'ದೃಷ್ಟಿ',
    colRasi: 'ರಾಶಿ',
    colBase: 'ರಾಶಿ',
    colStanding: 'ಸ್ಥಿತ ಗ್ರಹ',
    colAspect: 'ದೃಷ್ಟಿ ಗ್ರಹ',
    colTotal: 'ಒಟ್ಟು'
  },
  ml: {
    cardTitle: '12 രാശി കണക്കാക്കിയ കിരണ ചക്രം',
    cardBadge: '12 കള്ളികളുടെ കിരണ ചക്രം',
    formulaShort: 'ആകെ = രാശി + നിന്നത് + ദൃഷ്ടി',
    rule1: 'ഉച്ചം × 3',
    rule2: 'സ്വക്ഷേത്രം × 2',
    rule3: 'നീചം × 0',
    rule4: 'ദൃഷ്ടി ÷ 2',
    toggleTransit: 'ഗോചാരം',
    toggleAll: 'എല്ലാം',
    total12Signs: 'ആകെ കിരണങ്ങൾ',
    raysUnit: 'കിരണം',
    viewTableBtn: 'വിശദ പട്ടിക',
    hideTableBtn: 'മറയ്ക്കുക',
    centerTitle: 'കിരണ ചക്ര സംഗ്രഹം',
    udhayamBadge: 'ഉദയം',
    aarudamBadge: 'ആരൂഢം',
    kavippuBadge: 'കവിപ്പ്',
    lblRasi: 'രാശി',
    lblStanding: 'നിന്നത്',
    lblAspect: 'ദൃഷ്ടി',
    colRasi: 'രാശി',
    colBase: 'രാശി',
    colStanding: 'നിന്ന ഗ്രഹങ്ങൾ',
    colAspect: 'ദൃഷ്ടി ഗ്രഹങ്ങൾ',
    colTotal: 'ആകെ'
  }
};

/**
 * Jamakol12RasiRaysChart
 * Compact, standalone 12-box South Indian chart with vertical items layout inside each Rasi box.
 * Jamakkol planets are clearly differentiated with prefix "ஜா." (e.g. "ஜா.குரு").
 */
export default function Jamakol12RasiRaysChart({ chartData, lang = 'ta' }) {
  const [includeJama, setIncludeJama] = useState(false);
  const [showTable, setShowTable] = useState(false);

  const safeLang = (lang || 'ta').split('-')[0].toLowerCase();
  const text = UI_TEXT[safeLang] || UI_TEXT.ta;
  const jamaPrefix = JAMA_PREFIXES[safeLang] || 'ஜா.';

  // Calculate 12 Rasi rays
  const rasiRaysList = useMemo(() => {
    return calculate12RasiRays(chartData, includeJama, safeLang);
  }, [chartData, includeJama, safeLang]);

  // Pillar positions
  const pillars = chartData?.pillars || {};
  const udhayamSign = pillars.udhayam?.signIndex !== undefined ? pillars.udhayam.signIndex : (chartData?.udhayam?.signIndex ?? -1);
  const aarudamSign = pillars.aarudam?.signIndex !== undefined ? pillars.aarudam.signIndex : (chartData?.aarudam?.signIndex ?? -1);
  const kavippuSign = pillars.kavippu?.signIndex !== undefined ? pillars.kavippu.signIndex : (chartData?.kavippu?.signIndex ?? -1);

  // Overall total rays of all 12 signs
  const grandTotalRays = useMemo(() => {
    return Number(rasiRaysList.reduce((acc, r) => acc + r.totalRays, 0).toFixed(1));
  }, [rasiRaysList]);

  // Quick lookup by rasiId
  const rayMap = useMemo(() => {
    const map = {};
    rasiRaysList.forEach((r) => {
      map[r.rasiId] = r;
    });
    return map;
  }, [rasiRaysList]);

  // Helper to render an individual Rasi box with VERTICAL items layout
  const renderRasiBox = (rasiId) => {
    const data = rayMap[rasiId] || {
      rasiId,
      rasiName: JAMAKKOL_RASIS[rasiId]?.[safeLang] || JAMAKKOL_RASIS[rasiId]?.ta || `Rasi ${rasiId + 1}`,
      lordName: JAMAKKOL_RASIS[rasiId]?.lordTa || '',
      rasiRay: RASI_CLASSICAL_RAYS[rasiId] || 0,
      insidePlanets: [],
      insideRaysSum: 0,
      aspectingPlanets: [],
      aspectRaysSum: 0,
      totalRays: RASI_CLASSICAL_RAYS[rasiId] || 0,
      breakdownText: ''
    };

    const isUdhayam = rasiId === udhayamSign;
    const isAarudam = rasiId === aarudamSign;
    const isKavippu = rasiId === kavippuSign;

    return (
      <div
        key={rasiId}
        className={`jk-ray-cell rasi-${rasiId} ${isUdhayam ? 'cell-udhayam' : ''} ${isAarudam ? 'cell-aarudam' : ''} ${isKavippu ? 'cell-kavippu' : ''}`}
        title={`${data.rasiName} (${data.lordName}): ${data.breakdownText}`}
      >
        {/* Cell Header: Title & Lord on left, Total Rays badge on right */}
        <div className="jk-ray-cell-header">
          <div className="jk-ray-cell-title-wrap">
            <span className="jk-ray-cell-title">{data.rasiName}</span>
            <span className="jk-ray-cell-lord">({data.lordName})</span>
            {isUdhayam && <span className="jk-ray-tag tag-ud">{text.udhayamBadge}</span>}
            {isAarudam && <span className="jk-ray-tag tag-ar">{text.aarudamBadge}</span>}
            {isKavippu && <span className="jk-ray-tag tag-kv">{text.kavippuBadge}</span>}
          </div>

          <div className="jk-ray-cell-header-total" title={`${text.colTotal}: ${data.totalRays}`}>
            <span className="jk-ray-total-icon">☀️</span>
            <span className="jk-ray-total-num">{data.totalRays}</span>
          </div>
        </div>

        {/* Vertical Items List (Compact & Space-Saving) */}
        <div className="jk-ray-cell-vert-items">
          {/* Base Rasi Ray */}
          <div className="jk-vert-item item-rasi" title={`ராசி அடிப்படை கதிர்: ${data.rasiRay}`}>
            <span className="jk-v-label">{text.lblRasi}:</span>
            <span className="jk-v-val">{data.rasiRay}</span>
          </div>

          {/* Standing Planets (Vertical list with "ஜா." prefix for Jamakkol planets) */}
          {data.insidePlanets.map((p, idx) => {
            const prefix = p.isJama ? jamaPrefix : '';
            const displayName = `${prefix}${p.shortCode}`;
            const digShort = p.dignity === 'ucham' ? '(உச்ச)' : p.dignity === 'atchi' ? '(ஆட்சி)' : p.dignity === 'neecham' ? '(நீச)' : '';
            return (
              <div
                key={`in-${idx}`}
                className={`jk-vert-item item-standing dignity-${p.dignity} ${p.isJama ? 'is-jama' : ''}`}
                title={`${p.name} (${p.dignityLabel}): +${p.calculatedRay} கதிர் ${p.isJama ? '(ஜாம கிரகம்)' : '(கோச்சாரம்)'}`}
              >
                <span className="jk-v-label">
                  {displayName}{digShort}:
                </span>
                <span className="jk-v-val">+{p.calculatedRay}</span>
              </div>
            );
          })}

          {/* Aspecting Planets (Vertical list with "ஜா." prefix for Jamakkol planets) */}
          {data.aspectingPlanets.map((p, idx) => {
            const prefix = p.isJama ? jamaPrefix : '';
            const displayName = `👁️${prefix}${p.shortCode}`;
            return (
              <div
                key={`asp-${idx}`}
                className={`jk-vert-item item-aspect ${p.isJama ? 'is-jama' : ''}`}
                title={`${p.name} (${p.sourceRasiName} பார்வை): +${p.aspectRay} கதிர் ${p.isJama ? '(ஜாம கிரகம்)' : '(கோச்சாரம்)'}`}
              >
                <span className="jk-v-label">{displayName}:</span>
                <span className="jk-v-val">+{p.aspectRay}</span>
              </div>
            );
          })}

          {/* If no standing or aspecting planets */}
          {data.insidePlanets.length === 0 && data.aspectingPlanets.length === 0 && (
            <div className="jk-vert-item item-empty">
              <span className="jk-v-muted">-</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="jk-12rays-standalone-card" aria-label={text.cardTitle}>
      {/* Standalone Card Header */}
      <div className="jk-12rays-header">
        <div className="jk-12rays-title-group">
          <span className="jk-12rays-header-icon">✨</span>
          <div className="jk-12rays-title-col">
            <div className="jk-12rays-title-row">
              <h3 className="jk-12rays-title">{text.cardTitle}</h3>
              <span className="jk-12rays-badge">{text.cardBadge}</span>
            </div>
            <span className="jk-12rays-subtitle">{text.formulaShort}</span>
          </div>
        </div>

        <div className="jk-12rays-controls">
          {/* Compact Toggle: Transit vs All */}
          <div className="jk-rays-toggle-group">
            <button
              type="button"
              className={`jk-rays-toggle-btn ${!includeJama ? 'active' : ''}`}
              onClick={() => setIncludeJama(false)}
            >
              {text.toggleTransit}
            </button>
            <button
              type="button"
              className={`jk-rays-toggle-btn ${includeJama ? 'active' : ''}`}
              onClick={() => setIncludeJama(true)}
            >
              {text.toggleAll}
            </button>
          </div>

          {/* Compact Total Badge */}
          <div className="jk-12rays-total-badge">
            <span className="jk-12rays-total-label">{text.total12Signs}:</span>
            <span className="jk-12rays-total-val">{grandTotalRays} {text.raysUnit}</span>
          </div>
        </div>
      </div>

      {/* Ultra-compact Rules Indicator Strip */}
      <div className="jk-12rays-rules-strip">
        <span className="jk-rule-item rule-ucham">👑 {text.rule1}</span>
        <span className="jk-rule-sep">•</span>
        <span className="jk-rule-item rule-atchi">🏰 {text.rule2}</span>
        <span className="jk-rule-sep">•</span>
        <span className="jk-rule-item rule-neecham">🔻 {text.rule3}</span>
        <span className="jk-rule-sep">•</span>
        <span className="jk-rule-item rule-aspect">👁️ {text.rule4}</span>
      </div>

      {/* South Indian 4x4 Chart Grid with Vertical Items */}
      <div className="jk-12rays-chart-grid">
        {/* ROW 1: Pisces (11), Aries (0), Taurus (1), Gemini (2) */}
        {renderRasiBox(11)}
        {renderRasiBox(0)}
        {renderRasiBox(1)}
        {renderRasiBox(2)}

        {/* ROW 2: Aquarius (10), CENTER (2x2), Cancer (3) */}
        {renderRasiBox(10)}

        {/* Center 2x2 Summary Box (Compact) */}
        <div className="jk-12rays-center-box">
          <div className="jk-center-title-badge">
            <span>✨</span> {text.centerTitle}
          </div>

          <div className="jk-center-formula-chip">
            <strong>ராசி கதிர்</strong> + <strong>நின்றவை</strong> + <strong>பார்வை</strong>
          </div>

          <div className="jk-center-pillars-rays">
            {udhayamSign >= 0 && rayMap[udhayamSign] && (
              <div className="jk-center-pillar-item udhayam" title={`உதயம் (${rayMap[udhayamSign].rasiName}) கதிர்`}>
                <span className="jk-center-pillar-name">{text.udhayamBadge}:</span>
                <span className="jk-center-pillar-num">{rayMap[udhayamSign].totalRays}</span>
              </div>
            )}
            {aarudamSign >= 0 && rayMap[aarudamSign] && (
              <div className="jk-center-pillar-item aarudam" title={`ஆரூடம் (${rayMap[aarudamSign].rasiName}) கதிர்`}>
                <span className="jk-center-pillar-name">{text.aarudamBadge}:</span>
                <span className="jk-center-pillar-num">{rayMap[aarudamSign].totalRays}</span>
              </div>
            )}
            {kavippuSign >= 0 && rayMap[kavippuSign] && (
              <div className="jk-center-pillar-item kavippu" title={`கவிப்பு (${rayMap[kavippuSign].rasiName}) கதிர்`}>
                <span className="jk-center-pillar-name">{text.kavippuBadge}:</span>
                <span className="jk-center-pillar-num">{rayMap[kavippuSign].totalRays}</span>
              </div>
            )}
          </div>

          <button
            type="button"
            className="jk-btn-view-table"
            onClick={() => setShowTable(!showTable)}
          >
            <span>{showTable ? '▲' : '▼'}</span>
            <span>{showTable ? text.hideTableBtn : text.viewTableBtn}</span>
          </button>
        </div>

        {renderRasiBox(3)}

        {/* ROW 3: Capricorn (9), Leo (4) */}
        {renderRasiBox(9)}
        {renderRasiBox(4)}

        {/* ROW 4: Sagittarius (8), Scorpio (7), Libra (6), Virgo (5) */}
        {renderRasiBox(8)}
        {renderRasiBox(7)}
        {renderRasiBox(6)}
        {renderRasiBox(5)}
      </div>

      {/* Expandable Detailed Audit Breakdown Table */}
      {showTable && (
        <div className="jk-12rays-table-expand">
          <div className="jk-general-rays-table-wrap">
            <table className="jk-general-rays-table">
              <thead>
                <tr>
                  <th style={{ width: '36px' }}>#</th>
                  <th>{text.colRasi}</th>
                  <th style={{ textAlign: 'center', width: '70px' }}>{text.colBase}</th>
                  <th>{text.colStanding}</th>
                  <th>{text.colAspect}</th>
                  <th style={{ textAlign: 'center', width: '80px' }}>{text.colTotal}</th>
                </tr>
              </thead>
              <tbody>
                {rasiRaysList.map((item, idx) => {
                  const isUd = item.rasiId === udhayamSign;
                  const isAr = item.rasiId === aarudamSign;
                  const isKv = item.rasiId === kavippuSign;

                  return (
                    <tr
                      key={item.rasiId}
                      className={isUd ? 'row-udhayam' : isAr ? 'row-aarudam' : isKv ? 'row-kavippu' : ''}
                    >
                      <td className="jk-col-num">{idx + 1}</td>
                      <td className="jk-col-name">
                        <span className="jk-name-main">{item.rasiName}</span>
                        <span className="jk-col-lord">({item.lordName})</span>
                        {isUd && <span className="jk-tag-pill tag-ud">{text.udhayamBadge}</span>}
                        {isAr && <span className="jk-tag-pill tag-ar">{text.aarudamBadge}</span>}
                        {isKv && <span className="jk-tag-pill tag-kv">{text.kavippuBadge}</span>}
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <span className="jk-ray-pill">{item.rasiRay}</span>
                      </td>
                      <td>
                        {item.insidePlanets.length > 0 ? (
                          <div className="jk-table-planets-flow">
                            {item.insidePlanets.map((p, i) => {
                              const prefix = p.isJama ? jamaPrefix : '';
                              return (
                                <span key={i} className={`jk-mini-planet mini-standing dignity-${p.dignity} ${p.isJama ? 'is-jama' : ''}`}>
                                  {prefix}{p.shortCode} ({p.dignityLabel}): <strong>+{p.calculatedRay}</strong>
                                </span>
                              );
                            })}
                          </div>
                        ) : (
                          <span className="jk-empty-dash">-</span>
                        )}
                      </td>
                      <td>
                        {item.aspectingPlanets.length > 0 ? (
                          <div className="jk-table-planets-flow">
                            {item.aspectingPlanets.map((p, i) => {
                              const prefix = p.isJama ? jamaPrefix : '';
                              return (
                                <span key={i} className={`jk-mini-planet mini-aspect ${p.isJama ? 'is-jama' : ''}`}>
                                  👁️{prefix}{p.shortCode} ({p.sourceRasiName}): <strong>+{p.aspectRay}</strong>
                                </span>
                              );
                            })}
                          </div>
                        ) : (
                          <span className="jk-empty-dash">-</span>
                        )}
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <span className="jk-ray-pill-total">{item.totalRays}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="5" className="jk-total-label">{text.total12Signs}</td>
                  <td className="jk-total-val" style={{ textAlign: 'center' }}>
                    <span className="jk-ray-pill-total">{grandTotalRays}</span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
