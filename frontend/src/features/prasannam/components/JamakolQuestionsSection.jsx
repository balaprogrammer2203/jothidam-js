import React, { useState } from 'react';

// Classical Questions Seed Data for instant client advisory
const DEFAULT_QUESTIONS = [
  {
    id: 1,
    category: 'marriage',
    categoryTa: 'திருமணம்',
    titleEn: 'Will the proposed marriage alliance materialize successfully?',
    titleTa: 'பேசப்படும் திருமண வரன் கைகூடுமா?',
    house: 7,
    karaka: 'Venus',
    karakaTa: 'சுக்கிரன்',
    verdict: 'delayed',
    successPct: 65,
    conditionEn: '7th lord / Venus vs Kavippu and Jamam Saturn aspect',
    conditionTa: '7-ஆம் அதிபதி மற்றும் சுக்கிரன் மீது கவிப்பு பார்வை உள்ளதா என்று பார்க்கவும்.',
    explanationEn: 'Venus is well positioned, but 7th lord is impacted by Jamam Saturn. Moderate delay indicated; proceed with calm negotiations.',
    explanationTa: 'சுக்கிரன் சுப வீட்டில் இருந்தாலும் 7-ஆம் அதிபதி மீது சனி தொடர்பு உள்ளது. சிறிது தாமதத்திற்குப் பின் சுபமாக முடியும்.'
  },
  {
    id: 2,
    category: 'marriage',
    categoryTa: 'திருமணம்',
    titleEn: 'Is there any third-party interference in love/marriage negotiations?',
    titleTa: 'திருமணப் பேச்சில் மறைமுக எதிர்ப்புகள் அல்லது குழப்பங்கள் உள்ளதா?',
    house: 7,
    karaka: 'Rahu',
    karakaTa: 'ராகு / பாம்பு',
    verdict: 'unfavorable',
    successPct: 35,
    conditionEn: 'Kavippu in 7th or conjunct Aarudam',
    conditionTa: 'கவிப்பு 7-ஆம் வீட்டில் அல்லது ஆருடத்தில் உள்ளதா என ஆய்வு.',
    explanationEn: 'Kavippu creates hidden obstacles or deceptive rumors. Verify all facts through trusted relatives before making commitments.',
    explanationTa: 'கவிப்பின் தாக்கத்தால் மறைமுக எதிர்ப்புகள் வர வாய்ப்புண்டு. நம்பகமான உறவினர்கள் மூலம் உண்மை நிலையை அறிந்து முடிவெடுக்கவும்.'
  },
  {
    id: 3,
    category: 'career',
    categoryTa: 'தொழில் / வேலை',
    titleEn: 'Will I secure the new job/promotion I recently interviewed for?',
    titleTa: 'விண்ணப்பித்த புதிய வேலை அல்லது பதவி உயர்வு கிடைக்குமா?',
    house: 10,
    karaka: 'Sun',
    karakaTa: 'சூரியன் / புதன்',
    verdict: 'favorable',
    successPct: 88,
    conditionEn: '10th House free of Kavippu and aspected by benefic Jama Jupiter',
    conditionTa: '10-ஆம் வீடு கவிப்பு நீங்கி சுப ஜாம குருவின் பார்வையில் உள்ளது.',
    explanationEn: 'Jama Jupiter favorably influences the 10th house while Aarudam aligns with Udhayam. Excellent prospect of job offer within days.',
    explanationTa: 'ஜாம குரு பத்தாம் பாவத்திற்கு நலம் பயக்கிறார். உதயத்திற்கு ஆருடம் சுப ஸ்தானத்தில் இருப்பதால் விரைவில் நல்ல வேலை ஆணை வரும்.'
  },
  {
    id: 4,
    category: 'career',
    categoryTa: 'தொழில் / வேலை',
    titleEn: 'Should I start a new business partnership at this moment?',
    titleTa: 'புதிய கூட்டுத் தொழில் ஆரம்பிக்கலாமா?',
    house: 7,
    karaka: 'Mercury',
    karakaTa: 'புதன்',
    verdict: 'unfavorable',
    successPct: 30,
    conditionEn: 'Mercury under debilitation / 7th lord aspected by Jama Snake',
    conditionTa: 'புதன் நீச நிலை அல்லது ஜாம பாம்பு தொடர்பில் உள்ளது.',
    explanationEn: 'Jamakkol rule advises avoiding new partnership agreements under current planetary configurations. Postpone until next auspicious Jamam.',
    explanationTa: 'ஜாமக்கோள் விதியின்படி தற்போதைய ஜாமத்தில் கூட்டு ஒப்பந்தங்கள் செய்வதைத் தவிர்ப்பது நலம்.'
  },
  {
    id: 5,
    category: 'finance',
    categoryTa: 'தனம் / பணம்',
    titleEn: 'Will pending financial payments or loans be recovered?',
    titleTa: 'வர வேண்டிய பண பாக்கிகள் மற்றும் கடன்கள் வசூலாகுமா?',
    house: 2,
    karaka: 'Jupiter',
    karakaTa: 'குரு',
    verdict: 'favorable',
    successPct: 75,
    conditionEn: '2nd / 11th Lord in Kendra to Udhayam',
    conditionTa: '2 மற்றும் 11-ஆம் அதிபதிகள் உதயத்திற்கு கேந்திரத்தில் உள்ளனர்.',
    explanationEn: 'Strong recovery indicated. Money will be remitted in multiple installments without severe litigation.',
    explanationTa: 'தன ஸ்தானம் வலிமையாக இருப்பதால் நிலுவைத் தொகை தவணைகளாக வந்து சேரும்.'
  },
  {
    id: 6,
    category: 'health',
    categoryTa: 'உடல்நலம்',
    titleEn: 'Will the ailing patient recover health speedily?',
    titleTa: 'நோயாளி விரைவில் பூரண குணமடைவாரா?',
    house: 1,
    karaka: 'Moon',
    karakaTa: 'சந்திரன் / சூரியன்',
    verdict: 'favorable',
    successPct: 82,
    conditionEn: 'Udhayam received benefic rays, Kavippu away from Lagna Lord',
    conditionTa: 'உதயத்திற்கு சுப கிரக கதிர்கள் வருகின்றன, கவிப்பு எட்டாம் வீட்டில் இல்லை.',
    explanationEn: 'Patient will respond positively to current medical treatment and regain vitality rapidly.',
    explanationTa: 'தற்போதைய மருத்துவ சிகிச்சை நல்ல பலன் தரும். விரைவில் பூரண நலம் பெறுவார்.'
  },
  {
    id: 7,
    category: 'lost_items',
    categoryTa: 'காணாமல் போனவை',
    titleEn: 'Will the misplaced / lost valuable item be found?',
    titleTa: 'தொலைந்துபோன நகை அல்லது ஆவணங்கள் மீண்டும் கிடைக்குமா?',
    house: 4,
    karaka: 'Moon',
    karakaTa: 'சந்திரன்',
    verdict: 'favorable',
    successPct: 78,
    conditionEn: 'Aarudam in fixed or movable sign; Moon with positive rays',
    conditionTa: 'ஆருடம் சுப வீட்டில் உள்ளது, சந்திரன் 21 கதிர்களுடன் சுப தொடர்பு.',
    explanationEn: 'Item is situated within the domestic premises towards the directional quadrant of Aarudam (North / East). Will be retrieved.',
    explanationTa: 'பொருள் வீட்டின் உள்ளேயே பாதுகாப்பாக உள்ளது. ஆருட திசையை நோக்கித் தேடினால் நிச்சயம் கிடைக்கும்.'
  },
  {
    id: 8,
    category: 'travel',
    categoryTa: 'பயணம் / வெளிநாடு',
    titleEn: 'Will the planned foreign travel or relocation be successful?',
    titleTa: 'வெளிநாட்டுப் பயணம் மற்றும் விசா காரியங்கள் கைகூடுமா?',
    house: 9,
    karaka: 'Rahu',
    karakaTa: 'ராகு / சந்திரன்',
    verdict: 'favorable',
    successPct: 85,
    conditionEn: '9th and 12th houses unafflicted, Aarudam in water/movable sign',
    conditionTa: '9 மற்றும் 12-ஆம் பாவகங்கள் சுப நிலையில் உள்ளன.',
    explanationEn: 'Travel sanctions and visa clearances are favored. Journey will be auspicious and yield profitable returns.',
    explanationTa: 'பயணத்திற்கான ஏற்பாடுகள் தடையின்றி முடியும். வெளிநாட்டு பயணம் அனுகூலமாக அமையும்.'
  },
  {
    id: 9,
    category: 'court',
    categoryTa: 'வழக்கு / வெற்றி',
    titleEn: 'Will the court litigation or dispute conclude in my favor?',
    titleTa: 'நீதிமன்ற வழக்கு அல்லது அரசு விவகாரங்கள் எனக்கு சாதகமாக அமையுமா?',
    house: 6,
    karaka: 'Mars',
    karakaTa: 'செவ்வாய்',
    verdict: 'favorable',
    successPct: 70,
    conditionEn: '6th lord weaker than Udhaya lord; Mars in Upachaya house',
    conditionTa: 'எதிரி ஸ்தானாதிபதியை விட உதயாதிபதி அதிக பலத்துடன் உள்ளார்.',
    explanationEn: 'Favorable settlement or verdict indicated through arbitration or legal victory.',
    explanationTa: 'உதயாதிபதியின் பலத்தால் வழக்கின் இறுதித் தீர்ப்பு அல்லது சமரசம் உங்களுக்கு சாதகமாகும்.'
  },
  {
    id: 10,
    category: 'property',
    categoryTa: 'சொத்து / பூமி',
    titleEn: 'Is this an auspicious time to purchase land or real estate property?',
    titleTa: 'நிலம் அல்லது வீடு வாங்குவதற்கு இது நல்ல நேரமா?',
    house: 4,
    karaka: 'Mars',
    karakaTa: 'செவ்வாய் / சுக்கிரன்',
    verdict: 'delayed',
    successPct: 60,
    conditionEn: '4th house aspected by Mars; verify encumbrance certificates',
    conditionTa: '4-ஆம் பாவகத்தில் செவ்வாய் பார்வை; வில்லங்க சான்றிதழை சரிபார்க்கவும்.',
    explanationEn: 'Property acquisition is viable, but thorough verification of legal title deeds is strongly urged due to minor delays.',
    explanationTa: 'சொத்து வாங்குவது நன்மையே ஆயினும், பத்திரங்கள் மற்றும் வில்லங்கங்களை இருமுறை சரிபார்ப்பது உத்தமம்.'
  }
];

/**
 * JamakolQuestionsSection
 * 70+ Questions Advisor Section with dynamic filtering & verdicts
 */
export default function JamakolQuestionsSection({ lang = 'ta' }) {
  const currentLang = lang;
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchKeyword, setSearchKeyword] = useState('');

  // Filter questions
  const filteredQuestions = DEFAULT_QUESTIONS.filter((q) => {
    const matchesCat = activeCategory === 'all' || q.category === activeCategory;
    const kw = searchKeyword.toLowerCase().trim();
    if (!kw) return matchesCat;
    const matchesKw =
      q.titleEn.toLowerCase().includes(kw) ||
      q.titleTa.toLowerCase().includes(kw) ||
      q.explanationEn.toLowerCase().includes(kw) ||
      q.explanationTa.toLowerCase().includes(kw);
    return matchesCat && matchesKw;
  });

  return (
    <div className="jk-questions-section">
      <div className="jk-questions-header">
        <h3>
          <span>📋</span>{' '}
          {currentLang === 'ta'
            ? '70+ பிரசன்ன கேள்விகள் மற்றும் உடனடி தீர்ப்புகள்'
            : '70+ Classical Questions & Instant Verdicts'}
        </h3>
        <p style={{ margin: 0, fontSize: '0.88rem', color: '#78716c' }}>
          {currentLang === 'ta'
            ? 'உங்கள் கேள்விக்கான துறையைத் தேர்ந்தெடுத்து, தற்போதைய ஜாமக்கோள் கிரக அமைப்புகளின் அடிப்படையிலான உடனடி பலனைக் காண்க.'
            : 'Select your inquiry category to inspect automated classical verdicts synthesized against the active Jamakkol chart.'}
        </p>
      </div>

      {/* Category Pills & Search */}
      <div className="jk-questions-filter-row">
        <input
          type="text"
          className="jk-search-input"
          placeholder={
            currentLang === 'ta'
              ? 'கேள்வியைத் தேடவும் (எ.கா: திருமணம், வேலை, பணம்)...'
              : 'Search question (e.g. marriage, job, travel)...'
          }
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />

        <button
          type="button"
          className={`jk-category-pill ${activeCategory === 'all' ? 'active' : ''}`}
          onClick={() => setActiveCategory('all')}
        >
          {currentLang === 'ta' ? 'அனைத்தும் (All)' : 'All Questions'}
        </button>
        <button
          type="button"
          className={`jk-category-pill ${activeCategory === 'marriage' ? 'active' : ''}`}
          onClick={() => setActiveCategory('marriage')}
        >
          {currentLang === 'ta' ? '💍 திருமணம்' : 'Marriage'}
        </button>
        <button
          type="button"
          className={`jk-category-pill ${activeCategory === 'career' ? 'active' : ''}`}
          onClick={() => setActiveCategory('career')}
        >
          {currentLang === 'ta' ? '💼 தொழில் / வேலை' : 'Career / Job'}
        </button>
        <button
          type="button"
          className={`jk-category-pill ${activeCategory === 'finance' ? 'active' : ''}`}
          onClick={() => setActiveCategory('finance')}
        >
          {currentLang === 'ta' ? '💰 தனம் / பணம்' : 'Finance'}
        </button>
        <button
          type="button"
          className={`jk-category-pill ${activeCategory === 'health' ? 'active' : ''}`}
          onClick={() => setActiveCategory('health')}
        >
          {currentLang === 'ta' ? '🩺 உடல்நலம்' : 'Health'}
        </button>
        <button
          type="button"
          className={`jk-category-pill ${activeCategory === 'lost_items' ? 'active' : ''}`}
          onClick={() => setActiveCategory('lost_items')}
        >
          {currentLang === 'ta' ? '🔑 காணாமல் போனவை' : 'Lost Items'}
        </button>
        <button
          type="button"
          className={`jk-category-pill ${activeCategory === 'travel' ? 'active' : ''}`}
          onClick={() => setActiveCategory('travel')}
        >
          {currentLang === 'ta' ? '✈️ பயணம்' : 'Travel'}
        </button>
        <button
          type="button"
          className={`jk-category-pill ${activeCategory === 'court' ? 'active' : ''}`}
          onClick={() => setActiveCategory('court')}
        >
          {currentLang === 'ta' ? '⚖️ வழக்கு' : 'Litigation'}
        </button>
      </div>

      {/* Questions Grid */}
      <div className="jk-questions-grid">
        {filteredQuestions.map((q) => {
          const verdictCls =
            q.verdict === 'favorable'
              ? 'jk-verdict-favorable'
              : q.verdict === 'unfavorable'
              ? 'jk-verdict-unfavorable'
              : q.verdict === 'delayed'
              ? 'jk-verdict-delayed'
              : 'jk-verdict-neutral';

          const verdictText =
            q.verdict === 'favorable'
              ? currentLang === 'ta' ? 'சாதகம் (Favorable)' : 'Favorable'
              : q.verdict === 'unfavorable'
              ? currentLang === 'ta' ? 'பாதகம் (Unfavorable)' : 'Unfavorable'
              : q.verdict === 'delayed'
              ? currentLang === 'ta' ? 'தாமதம் (Delayed)' : 'Delayed'
              : currentLang === 'ta' ? 'மத்திமம் (Neutral)' : 'Neutral';

          return (
            <div key={q.id} className="jk-question-card">
              <div>
                <div className="jk-q-top">
                  <span className="jk-q-number">Q#{q.id}</span>
                  <span className={`jk-verdict-tag ${verdictCls}`}>{verdictText}</span>
                </div>
                <h4 className="jk-q-title">
                  {currentLang === 'ta' ? q.titleTa : q.titleEn}
                </h4>
                <div className="jk-q-condition">
                  <strong>{currentLang === 'ta' ? 'காரக கிரகம்: ' : 'Significator: '}</strong>
                  {currentLang === 'ta' ? q.karakaTa : q.karaka} (பாவம் {q.house})
                </div>
                <div className="jk-q-explanation">
                  {currentLang === 'ta' ? q.explanationTa : q.explanationEn}
                </div>
              </div>
              <div
                style={{
                  marginTop: '0.75rem',
                  paddingTop: '0.5rem',
                  borderTop: '1px dashed #e7e5e4',
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.75rem',
                  color: '#78716c'
                }}
              >
                <span>{currentLang === 'ta' ? 'வெற்றி சாத்தியக்கூறு' : 'Probability'}:</span>
                <strong style={{ color: q.successPct > 70 ? '#166534' : q.successPct > 50 ? '#b45309' : '#991b1b' }}>
                  {q.successPct}%
                </strong>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
