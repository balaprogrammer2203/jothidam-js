import React from 'react';

/**
 * JamakolTimingSection
 * Sambhava Kala Nirnayam (Event Timing via Moon Rays)
 */
export default function JamakolTimingSection({ timing = {}, lang = 'ta' }) {
  const currentLang = lang;

  return (
    <div className="jk-timing-card">
      <div className="jk-timing-header">
        <span>⏳</span>
        <h3>
          {currentLang === 'ta'
            ? 'சம்பவ கால நிர்ணயம் (Event Timing via Moon Rays)'
            : 'Event Timing (Sambhava Kala Nirnayam)'}
        </h3>
      </div>
      <p style={{ margin: '0 0 1rem 0', fontSize: '0.88rem', color: '#78350f' }}>
        {currentLang === 'ta'
          ? 'சந்திரனின் 21 கதிர்கள் அடிப்படையில் ஆரூடம் மற்றும் உதயத்தின் இடைவெளி கொண்டு காரியம் எப்போது நிறைவேறும் என்பதைக் கணிக்கும் பாரம்பரிய முறை.'
          : "Classical temporal prognosis synthesized using the Moon's 21 Rays applied across the sign interval between Udhayam and Aarudam."}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
        <div style={{ background: '#ffffff', padding: '0.75rem', borderRadius: '8px', border: '1px solid #fed7aa' }}>
          <div style={{ fontSize: '0.75rem', color: '#9a3412', fontWeight: 600, textTransform: 'uppercase' }}>
            {currentLang === 'ta' ? 'உடனடி பலன்' : 'Immediate Window'}
          </div>
          <div style={{ fontSize: '1rem', fontWeight: 700, color: '#431407', marginTop: '0.2rem' }}>
            {currentLang === 'ta'
              ? (timing.immediate?.textTa || '231 நிமிடங்கள் (இன்றே உடனடி நிகழ்வு)')
              : (timing.immediate?.textEn || '231 minutes from query moment')}
          </div>
        </div>

        <div style={{ background: '#ffffff', padding: '0.75rem', borderRadius: '8px', border: '1px solid #fed7aa' }}>
          <div style={{ fontSize: '0.75rem', color: '#9a3412', fontWeight: 600, textTransform: 'uppercase' }}>
            {currentLang === 'ta' ? 'குறுகிய கால பலன்' : 'Short-Term Window'}
          </div>
          <div style={{ fontSize: '1rem', fontWeight: 700, color: '#431407', marginTop: '0.2rem' }}>
            {currentLang === 'ta'
              ? (timing.short?.textTa || '23 மணி நேரம், 1 நிமிடம்')
              : (timing.short?.textEn || '23 hours, 1 minute')}
          </div>
        </div>

        <div style={{ background: '#ffffff', padding: '0.75rem', borderRadius: '8px', border: '1px solid #fed7aa' }}>
          <div style={{ fontSize: '0.75rem', color: '#9a3412', fontWeight: 600, textTransform: 'uppercase' }}>
            {currentLang === 'ta' ? 'நடுத்தர கால பலன்' : 'Medium-Term Window'}
          </div>
          <div style={{ fontSize: '1rem', fontWeight: 700, color: '#431407', marginTop: '0.2rem' }}>
            {currentLang === 'ta'
              ? (timing.medium?.textTa || '23 நாட்கள், 1 மணி நேரம்')
              : (timing.medium?.textEn || '23 days, 1 hour')}
          </div>
        </div>
      </div>
    </div>
  );
}
