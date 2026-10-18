import React from 'react';
import { JAMAKKOL_RASIS } from '../../../utils/jamakkol.utils';

// Classical Rasi Rays (12 Signs: Aries to Pisces)
// மேஷம்: 7, ரிஷபம்: 8, மிதுனம்: 5, கடகம்: 3, சிம்மம்: 7, கன்னி: 11,
// துலாம்: 2, விருச்சிகம்: 4, தனுசு: 6, மகரம்: 8, கும்பம்: 8, மீனம்: 27
const GENERAL_RASI_RAYS = [
  { id: 0, rays: 7 },
  { id: 1, rays: 8 },
  { id: 2, rays: 5 },
  { id: 3, rays: 3 },
  { id: 4, rays: 7 },
  { id: 5, rays: 11 },
  { id: 6, rays: 2 },
  { id: 7, rays: 4 },
  { id: 8, rays: 6 },
  { id: 9, rays: 8 },
  { id: 10, rays: 8 },
  { id: 11, rays: 27 }
];

// Classical General Planetary Rays (Jamakkol & Navagrahas)
// சூரியன்: 30, சந்திரன்: 21, செவ்வாய்: 8, புதன்: 9, குரு: 10, சுக்கிரன்: 12, சனி: 5, ராகு/பாம்பு: 4, கேது: 4
const GENERAL_PLANET_RAYS = [
  {
    key: 'Sun',
    rays: 30,
    names: { ta: 'சூரியன்', en: 'Sun', hi: 'सूर्य', te: 'సూర్యుడు', kn: 'ಸೂರ್ಯ', ml: 'സൂര്യൻ' },
    shortCodes: { ta: 'சூரி', en: 'Su', hi: 'सूर्य', te: 'సూర్య', kn: 'ಸೂರ್ಯ', ml: 'സൂര്യ' }
  },
  {
    key: 'Moon',
    rays: 21,
    isTimingPlanet: true,
    names: { ta: 'சந்திரன்', en: 'Moon', hi: 'चंद्र', te: 'చంద్రుడు', kn: 'ಚಂದ್ರ', ml: 'ചന്ദ്രൻ' },
    shortCodes: { ta: 'சந்', en: 'Mo', hi: 'चंद्र', te: 'చంద్ర', kn: 'ಚಂದ್ರ', ml: 'ചന്ദ്ര' }
  },
  {
    key: 'Mars',
    rays: 8,
    names: { ta: 'செவ்வாய்', en: 'Mars', hi: 'मंगल', te: 'కుజుడు', kn: 'ಮಂಗಳ', ml: 'ചൊവ്വ' },
    shortCodes: { ta: 'செவ்', en: 'Ma', hi: 'मंग', te: 'కుజ', kn: 'ಮಂ', ml: 'ചൊ' }
  },
  {
    key: 'Mercury',
    rays: 9,
    names: { ta: 'புதன்', en: 'Mercury', hi: 'बुध', te: 'బుధుడు', kn: 'ಬುಧ', ml: 'ബുധൻ' },
    shortCodes: { ta: 'புத', en: 'Me', hi: 'बुध', te: 'బుధ', kn: 'ಬುಧ', ml: 'ബുധ' }
  },
  {
    key: 'Jupiter',
    rays: 10,
    names: { ta: 'குரு', en: 'Jupiter', hi: 'गुरु', te: 'గురువు', kn: 'ಗುರು', ml: 'വ്യാഴം' },
    shortCodes: { ta: 'குரு', en: 'Ju', hi: 'गुरु', te: 'గురు', kn: 'ಗುರು', ml: 'വ്യാ' }
  },
  {
    key: 'Venus',
    rays: 12,
    names: { ta: 'சுக்கிரன்', en: 'Venus', hi: 'शुक्र', te: 'శుక్రుడు', kn: 'ಶುಕ್ರ', ml: 'ശുക്രൻ' },
    shortCodes: { ta: 'சுக்', en: 'Ve', hi: 'शुक्र', te: 'శుక్ర', kn: 'ಶುಕ್ರ', ml: 'ശു' }
  },
  {
    key: 'Saturn',
    rays: 5,
    names: { ta: 'சனி', en: 'Saturn', hi: 'शनि', te: 'శని', kn: 'ಶನಿ', ml: 'ശനി' },
    shortCodes: { ta: 'சனி', en: 'Sa', hi: 'शनि', te: 'శని', kn: 'ಶನಿ', ml: 'ശനി' }
  },
  {
    key: 'Rahu',
    rays: 4,
    names: { ta: 'பாம்பு (ராகு)', en: 'Rahu (Snake)', hi: 'राहु (सर्प)', te: 'రాహు (పాము)', kn: 'ರಾಹು', ml: 'രാഹു' },
    shortCodes: { ta: 'பாம்பு', en: 'Ra/Sn', hi: 'राहु', te: 'రాహు', kn: 'ರಾಹು', ml: 'രാ' }
  },
  {
    key: 'Ketu',
    rays: 4,
    names: { ta: 'கேது', en: 'Ketu', hi: 'केतु', te: 'కేతువు', kn: 'ಕೇತು', ml: 'കേതു' },
    shortCodes: { ta: 'கேது', en: 'Ke', hi: 'केतु', te: 'కేతు', kn: 'ಕೇತು', ml: 'കേ' }
  }
];

const UI_TEXT = {
  ta: {
    cardTitle: 'பொது ராசி கதிர் & கிரக கதிர்',
    cardBadge: 'பாரம்பரிய கதிர் எண்கள்',
    rasiTableTitle: 'பொது ராசி கதிர்கள் (General Rasi Rays)',
    planetTableTitle: 'பொது கிரக கதிர்கள் (General Planet Rays)',
    colNo: '#',
    colRasi: 'ராசி',
    colLord: 'அதிபதி',
    colPlanet: 'கிரகம்',
    colCode: 'குறியீடு',
    colRays: 'கதிர்',
    totalText: 'மொத்த கதிர்கள்',
    raysUnit: 'கதிர்கள்',
    infoTitle: 'கதிர்களின் முக்கியத்துவம் (Significance of Rays):',
    infoPoint1: 'சம்பவ கால நிர்ணயம்: சந்திரனின் 21 கதிர்களைக் கொண்டு காரியம் எப்போது நிறைவேறும் என்பதைக் கணக்கிடலாம்.',
    infoPoint2: 'ஆற்றல் அளவீடு: ராசிகள் மற்றும் கிரகங்களின் இயற்கை கதிர்கள் அவற்றின் பலத்தையும் கதிர்வீச்சு ஆற்றலையும் குறிக்கின்றன.',
    udhayamBadge: 'உதயம்',
    aarudamBadge: 'ஆரூடம்',
    kavippuBadge: 'கவிப்பு',
    timingBadge: 'கால நிர்ணயம்'
  },
  en: {
    cardTitle: 'General Rasi & Planet Rays',
    cardBadge: 'Classical Ray Values',
    rasiTableTitle: 'General Rasi Rays (12 Signs)',
    planetTableTitle: 'General Planet Rays (9 Grahas)',
    colNo: '#',
    colRasi: 'Sign',
    colLord: 'Lord',
    colPlanet: 'Planet',
    colCode: 'Code',
    colRays: 'Rays',
    totalText: 'Total Rays',
    raysUnit: 'Rays',
    infoTitle: 'Significance of Planetary & Rasi Rays:',
    infoPoint1: 'Sambhava Kala Nirnayam: The Moon\'s 21 rays are classically used to forecast the precise time of fruition.',
    infoPoint2: 'Potency & Radiation: General ray numbers indicate functional potency and horary radiation of signs and planets.',
    udhayamBadge: 'Udhayam',
    aarudamBadge: 'Aarudam',
    kavippuBadge: 'Kavippu',
    timingBadge: 'Timing'
  },
  hi: {
    cardTitle: 'सामान्य राशि एवं ग्रह किरणें',
    cardBadge: 'शास्त्रीय प्रश्न किरण मान',
    rasiTableTitle: 'सामान्य राशि किरणें (12 राशियां)',
    planetTableTitle: 'सामान्य ग्रह किरणें (9 ग्रह)',
    colNo: '#',
    colRasi: 'राशि',
    colLord: 'स्वामी',
    colPlanet: 'ग्रह',
    colCode: 'संकेत',
    colRays: 'किरण',
    totalText: 'कुल किरणें',
    raysUnit: 'किरणें',
    infoTitle: 'किरणों का महत्व:',
    infoPoint1: 'घटना काल निर्धारण: चंद्र की 21 किरणों से कार्य सिद्धि के समय का सटीक अनुमान लगाया जाता है।',
    infoPoint2: 'ऊर्जा और शक्ति: राशि और ग्रह किरणें उनकी आंतरिक क्षमता को दर्शाती हैं।',
    udhayamBadge: 'उदय',
    aarudamBadge: 'आरूढ़',
    kavippuBadge: 'कविप्पु',
    timingBadge: 'काल'
  },
  te: {
    cardTitle: 'సాధారణ రాశి & గ్రహ కిరణాలు',
    cardBadge: 'శాస్త్రీయ ప్రశ్న కిరణ విలువలు',
    rasiTableTitle: 'సాధారణ రాశి కిరణాలు (12 రాశులు)',
    planetTableTitle: 'సాధారణ గ్రహ కిరణాలు (9 గ్రహాలు)',
    colNo: '#',
    colRasi: 'రాశి',
    colLord: 'అధిపతి',
    colPlanet: 'గ్రహం',
    colCode: 'సంకేతం',
    colRays: 'కిరణాలు',
    totalText: 'మొత్తం కిరణాలు',
    raysUnit: 'కిరణాలు',
    infoTitle: 'కిరణాల ప్రాముఖ్యత:',
    infoPoint1: 'సంభవ కాల నిర్ణయం: చంద్రుని 21 కిరణాలతో కార్యం ఎప్పుడు నెరవేరుతుందో నిర్ణయిస్తారు.',
    infoPoint2: 'రాశి మరియు గ్రహ కిరణాలు వాటి అంతర్గత బలాన్ని సూచిస్తాయి.',
    udhayamBadge: 'ఉదయం',
    aarudamBadge: 'ఆరూఢం',
    kavippuBadge: 'కవిప్పు',
    timingBadge: 'కాలం'
  },
  kn: {
    cardTitle: 'ಸಾಮಾನ್ಯ ರಾಶಿ ಮತ್ತು ಗ್ರಹ ಕಿರಣಗಳು',
    cardBadge: 'ಶಾಸ್ತ್ರೀಯ ಪ್ರಶ್ನ ಕಿರಣ ಮೌಲ್ಯಗಳು',
    rasiTableTitle: 'ಸಾಮಾನ್ಯ ರಾಶಿ ಕಿರಣಗಳು (12 ರಾಶಿಗಳು)',
    planetTableTitle: 'ಸಾಮಾನ್ಯ ಗ್ರಹ ಕಿರಣಗಳು (9 ಗ್ರಹಗಳು)',
    colNo: '#',
    colRasi: 'ರಾಶಿ',
    colLord: 'ಅಧಿಪತಿ',
    colPlanet: 'ಗ್ರಹ',
    colCode: 'ಸಂಕೇತ',
    colRays: 'ಕಿರಣಗಳು',
    totalText: 'ಒಟ್ಟು ಕಿರಣಗಳು',
    raysUnit: 'ಕಿರಣಗಳು',
    infoTitle: 'ಕಿರಣಗಳ ಪ್ರಾಮುಖ್ಯತೆ:',
    infoPoint1: 'ಸಂಭವ ಕಾಲ ನಿರ್ಣಯ: ಚಂದ್ರನ 21 ಕಿರಣಗಳಿಂದ ಕಾರ್ಯ ಸಿದ್ಧಿಯ ಸಮಯವನ್ನು ನಿರ್ಧರಿಸಲಾಗುತ್ತದೆ.',
    infoPoint2: 'ರಾಶಿ ಮತ್ತು ಗ್ರಹ ಕಿರಣಗಳು ಅವುಗಳ ಆಂತರಿಕ ಶಕ್ತಿಯನ್ನು ಪ್ರತಿನಿಧಿಸುತ್ತವೆ.',
    udhayamBadge: 'ಉದಯ',
    aarudamBadge: 'ಆರೂಢ',
    kavippuBadge: 'ಕವಿಪ್ಪು',
    timingBadge: 'ಕಾಲ'
  },
  ml: {
    cardTitle: 'പൊതു രാശി & ഗ്രഹ കിരണങ്ങൾ',
    cardBadge: 'ശാസ്ത്രീയ പ്രശ്ന കിരണ മൂല്യങ്ങൾ',
    rasiTableTitle: 'പൊതു രാശി കിരണങ്ങൾ (12 രാശികൾ)',
    planetTableTitle: 'പൊതു ഗ്രഹ കിരണങ്ങൾ (9 ഗ്രഹങ്ങൾ)',
    colNo: '#',
    colRasi: 'രാശി',
    colLord: 'അധിപതി',
    colPlanet: 'ഗ്രഹം',
    colCode: 'സൂചിക',
    colRays: 'കിരണങ്ങൾ',
    totalText: 'ആകെ കിരണങ്ങൾ',
    raysUnit: 'കിരണങ്ങൾ',
    infoTitle: 'കിരണങ്ങളുടെ പ്രാധാന്യം:',
    infoPoint1: 'സംഭവ കാല നിർണ്ണയം: ചന്ദ്രന്റെ 21 കിരണങ്ങൾ ഉപയോഗിച്ച് കാര്യം എപ്പോൾ നടക്കുമെന്ന് കണക്കാക്കുന്നു.',
    infoPoint2: 'രാശികളുടെയും ഗ്രഹങ്ങളുടെയും കിരണങ്ങൾ അവയുടെ അന്തർലീനമായ ശക്തിയെ കാണിക്കുന്നു.',
    udhayamBadge: 'ഉദയം',
    aarudamBadge: 'ആരൂഢം',
    kavippuBadge: 'കവിപ്പ്',
    timingBadge: 'കാലം'
  }
};

/**
 * JamakolGeneralRaysCard
 * Displays General Rasi Kathir and Giraha Kathir in table format in a box container
 * Positioned right below the 3 Pillars banner (Udhayam, Aarudam, Kavippu).
 */
export default function JamakolGeneralRaysCard({ chartData, lang = 'ta' }) {
  const safeLang = (lang || 'ta').split('-')[0].toLowerCase();
  const text = UI_TEXT[safeLang] || UI_TEXT.ta;

  // Total sums
  const totalRasiRays = GENERAL_RASI_RAYS.reduce((acc, r) => acc + r.rays, 0); // 96
  const totalPlanetRays = GENERAL_PLANET_RAYS.reduce((acc, p) => acc + p.rays, 0); // 103

  // Current prasannam house identifiers
  const pillars = chartData?.pillars || {};
  const udhayamSign = pillars.udhayam?.signIndex !== undefined ? pillars.udhayam.signIndex : (chartData?.udhayam?.signIndex ?? -1);
  const aarudamSign = pillars.aarudam?.signIndex !== undefined ? pillars.aarudam.signIndex : (chartData?.aarudam?.signIndex ?? -1);
  const kavippuSign = pillars.kavippu?.signIndex !== undefined ? pillars.kavippu.signIndex : (chartData?.kavippu?.signIndex ?? -1);

  return (
    <div className="jk-general-rays-card" aria-label={text.cardTitle}>
      {/* Card Header */}
      <div className="jk-general-rays-header">
        <div className="jk-general-rays-title-group">
          <span className="jk-general-rays-icon">✨</span>
          <h3 className="jk-general-rays-title">{text.cardTitle}</h3>
        </div>
        <span className="jk-general-rays-badge">{text.cardBadge}</span>
      </div>

      {/* Dual Table Grid */}
      <div className="jk-general-rays-grid">
        {/* Table 1: General Rasi Kathir */}
        <div className="jk-general-rays-col">
          <div className="jk-general-rays-table-header">
            <h4 className="jk-general-rays-table-title">
              <span>♈</span> {text.rasiTableTitle}
            </h4>
            <span className="jk-general-rays-count-badge">
              {totalRasiRays} {text.raysUnit}
            </span>
          </div>

          <div className="jk-general-rays-table-wrap">
            <table className="jk-general-rays-table">
              <thead>
                <tr>
                  <th style={{ width: '36px' }}>{text.colNo}</th>
                  <th>{text.colRasi}</th>
                  <th>{text.colLord}</th>
                  <th style={{ width: '80px', textAlign: 'center' }}>{text.colRays}</th>
                </tr>
              </thead>
              <tbody>
                {GENERAL_RASI_RAYS.map((item, index) => {
                  const rasiMeta = JAMAKKOL_RASIS[item.id] || {};
                  const rasiName = rasiMeta[safeLang] || rasiMeta.ta || rasiMeta.en || '';
                  const lordName = safeLang === 'ta' ? (rasiMeta.lordTa || rasiMeta.lord) : (rasiMeta.lord || rasiMeta.lordTa || '');

                  const isUdhayam = item.id === udhayamSign;
                  const isAarudam = item.id === aarudamSign;
                  const isKavippu = item.id === kavippuSign;

                  return (
                    <tr
                      key={item.id}
                      className={isUdhayam ? 'row-udhayam' : isAarudam ? 'row-aarudam' : isKavippu ? 'row-kavippu' : ''}
                    >
                      <td className="jk-col-num">{index + 1}</td>
                      <td className="jk-col-name">
                        <span className="jk-name-main">{rasiName}</span>
                        {isUdhayam && <span className="jk-tag-pill tag-ud">{text.udhayamBadge}</span>}
                        {isAarudam && <span className="jk-tag-pill tag-ar">{text.aarudamBadge}</span>}
                        {isKavippu && <span className="jk-tag-pill tag-kv">{text.kavippuBadge}</span>}
                      </td>
                      <td className="jk-col-lord">{lordName}</td>
                      <td className="jk-col-ray">
                        <span className="jk-ray-pill">{item.rays}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3" className="jk-total-label">{text.totalText}</td>
                  <td className="jk-total-val">
                    <span className="jk-ray-pill-total">{totalRasiRays}</span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Table 2: General Giraha Kathir */}
        <div className="jk-general-rays-col">
          <div className="jk-general-rays-table-header">
            <h4 className="jk-general-rays-table-title">
              <span>🪐</span> {text.planetTableTitle}
            </h4>
            <span className="jk-general-rays-count-badge">
              {totalPlanetRays} {text.raysUnit}
            </span>
          </div>

          <div className="jk-general-rays-table-wrap">
            <table className="jk-general-rays-table">
              <thead>
                <tr>
                  <th style={{ width: '36px' }}>{text.colNo}</th>
                  <th>{text.colPlanet}</th>
                  <th>{text.colCode}</th>
                  <th style={{ width: '80px', textAlign: 'center' }}>{text.colRays}</th>
                </tr>
              </thead>
              <tbody>
                {GENERAL_PLANET_RAYS.map((planet, index) => {
                  const pName = planet.names[safeLang] || planet.names.ta || planet.names.en;
                  const pCode = planet.shortCodes[safeLang] || planet.shortCodes.ta || planet.shortCodes.en;

                  return (
                    <tr
                      key={planet.key}
                      className={planet.isTimingPlanet ? 'row-timing' : ''}
                    >
                      <td className="jk-col-num">{index + 1}</td>
                      <td className="jk-col-name">
                        <span className="jk-name-main">{pName}</span>
                        {planet.isTimingPlanet && (
                          <span className="jk-tag-pill tag-time">{text.timingBadge}</span>
                        )}
                      </td>
                      <td className="jk-col-code">{pCode}</td>
                      <td className="jk-col-ray">
                        <span className={`jk-ray-pill ${planet.isTimingPlanet ? 'ray-time' : ''}`}>
                          {planet.rays}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3" className="jk-total-label">{text.totalText}</td>
                  <td className="jk-total-val">
                    <span className="jk-ray-pill-total">{totalPlanetRays}</span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Quick Informational Box */}
          <div className="jk-general-rays-note">
            <div className="jk-note-title">
              <span>💡</span> <strong>{text.infoTitle}</strong>
            </div>
            <ul className="jk-note-list">
              <li>{text.infoPoint1}</li>
              <li>{text.infoPoint2}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
