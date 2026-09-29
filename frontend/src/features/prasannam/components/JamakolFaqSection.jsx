import React, { useState } from 'react';

const FAQ_ITEMS = [
  {
    id: 'faq1',
    qEn: 'Who originated the Jamakkol Prasannam system?',
    qTa: 'ஜாமக்கோள் பிரசன்ன முறையை உருவாக்கியவர் யார்?',
    aEn: 'The system was codified by the revered Tamil astrological sage Sri Upendra Achariyar. It synthesizes instantaneous planetary transits with fixed 8 Jamam diurnal divisions for infallible day-to-day horary predictions.',
    aTa: 'இம்முறையை ஸ்ரீ உபேந்திர ஆச்சாரியார் அருளிச்செய்தார். பகல் 8 ஜாமங்கள், இரவு 8 ஜாமங்கள் என பிரித்து, கோச்சார கிரகங்களுடன் 8 ஜாமக் கிரகங்களை இணைத்து மிகத் துல்லியமாக பலன் சொல்லும் முறை இதுவாகும்.'
  },
  {
    id: 'faq2',
    qEn: 'Why are the 4 fixed signs (Taurus, Leo, Scorpio, Aquarius) excluded from outer Jama Grahas?',
    qTa: 'ஜாமக் கிரகங்கள் சுழற்சியில் 4 ஸ்திர ராசிகள் (ரிஷபம், சிம்மம், விருச்சிகம், கும்பம்) சேர்க்கப்படாதது ஏன்?',
    aEn: 'Classical Jamakkol assigns outer rotating grahas exclusively to the 4 cardinal (Chara) and 4 dual (Dwiswabhava) signs. Fixed (Sthira) signs represent immutable permanence and are preserved as the fixed cardinal pivots.',
    aTa: 'ஜாமக் கிரகங்கள் சரம் மற்றும் உபய ராசிகளான 8 வீடுகளில் மட்டுமே வலம் வருகின்றன. ஸ்திர ராசிகள் நிலைத்தன்மை கொண்டவையாக இருப்பதால் அவை சுழற்சியில் சேர்க்கப்படாமல் உள்வட்டக் கோச்சாரத்திற்கு மட்டுமே பயன்படுத்தப்படுகின்றன.'
  },
  {
    id: 'faq3',
    qEn: 'What is the significance of Kavippu (கவிப்பு)?',
    qTa: 'கவிப்பு என்பதன் முக்கியத்துவம் என்ன?',
    aEn: 'Kavippu literally translates to an invisible covering or eclipse shroud. Any planet, house, or significator falling under the degree of Kavippu suffers temporary paralysis or hidden obstacles. Never inaugurate discussions when the querent significator is in Kavippu.',
    aTa: 'கவிப்பு என்பது இருள் அல்லது கவிந்து மூடுவது ஆகும். எந்த ஒரு கிரகமோ அல்லது பாவகமோ கவிப்பில் சிக்கினால் அந்த காரியம் தற்காலிக முடக்கத்தை அல்லது மறைமுகத் தடையைச் சந்திக்கும். பேசப்போகும் காரக கிரகம் கவிப்பில் இருக்கும்போது உடன்படிக்கைகள் செய்யக்கூடாது.'
  },
  {
    id: 'faq4',
    qEn: 'How does the Sambhava Kala Nirnayam determine timing?',
    qTa: 'சம்பவ கால நிர்ணயம் எவ்வாறு கணக்கிடப்படுகிறது?',
    aEn: "Timing is derived using the Moon's 21 Ray Matrix multiplied across the house distance between Udhayam and Aarudam. Depending on whether signs are movable, fixed, or dual, the units resolve into minutes, hours, days, or months.",
    aTa: 'சந்திரனின் 21 கதிர்களைக் கொண்டு உதயம் முதல் ஆருடம் வரையிலான இடைவெளியைப் பெருக்கி, அது சரம், ஸ்திரம், உபய ராசிகளுக்கு ஏற்ப நிமிடங்கள், மணி நேரங்கள், நாட்கள் அல்லது மாதங்களாக பலன் தரும் காலத்தை அறியலாம்.'
  }
];

/**
 * JamakolFaqSection
 * Classical Principles & FAQs Accordion
 */
export default function JamakolFaqSection({ lang = 'ta' }) {
  const currentLang = lang;
  const [activeFaq, setActiveFaq] = useState(null);

  return (
    <div className="jk-faq-section">
      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#431407', margin: '0 0 1rem 0' }}>
        <span>📖</span>{' '}
        {currentLang === 'ta'
          ? 'ஜாமக்கோள் பிரசன்ன சாஸ்திர ரகசியங்கள்'
          : 'Classical Jamakkol Principles & FAQs'}
      </h3>

      {FAQ_ITEMS.map((item) => {
        const isOpen = activeFaq === item.id;
        return (
          <div key={item.id} className="jk-faq-item">
            <button
              type="button"
              className="jk-faq-btn"
              onClick={() => setActiveFaq(isOpen ? null : item.id)}
            >
              <span>{currentLang === 'ta' ? item.qTa : item.qEn}</span>
              <span style={{ fontSize: '1.2rem', color: '#b45309' }}>{isOpen ? '−' : '+'}</span>
            </button>
            {isOpen && (
              <div className="jk-faq-ans">
                {currentLang === 'ta' ? item.aTa : item.aEn}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
