import React from 'react';

/**
 * PanchangHeroBanner
 * Displays the page title, devotional subtitle, and actions (Copy summary, Print PDF).
 */
export default React.memo(function PanchangHeroBanner({ isTa, copiedToast, onCopySummary }) {
  return (
    <div className="dp-hero-banner">
      <div className="dp-hero-content">
        <div className="dp-hero-om-badge">🕉️</div>
        <div className="dp-hero-title-group">
          <h1 id="page-title">{isTa ? 'இன்றைய திருக்கணித பஞ்சாங்கம்' : 'Daily Thirukanitha Panchangam'}</h1>
          <p>
            {isTa
              ? 'துல்லியமான திருக்கணித முறை தினசரி பஞ்சாங்கம்: திதி, நட்சத்திரம், யோகம், கரணம், நல்ல நேரம், ராகு காலம், சந்திராஷ்டமம் & 24 மணி நேர ஹோரை அட்டவணை.'
              : 'Authentic Thirukanitha (Drik Ganita) Daily Panchangam: Tithi, Nakshatram, Yogam, Karanam, Auspicious Muhurtham, Rahu Kalam, Chandrashtamam & 24-hr Hora table.'}
          </p>
        </div>
      </div>

      <div className="dp-hero-actions">
        <button
          type="button"
          className="dp-action-btn"
          onClick={onCopySummary}
          title={isTa ? 'பஞ்சாங்கம் விவரங்களை நகலெடு' : 'Copy summary'}
        >
          <span>{copiedToast ? '✅' : '📋'}</span>
          <span>{copiedToast ? (isTa ? 'நகலெடுக்கப்பட்டது!' : 'Copied!') : (isTa ? 'பஞ்சாங்கம் நகலெடு' : 'Copy')}</span>
        </button>

        <button
          type="button"
          className="dp-action-btn"
          onClick={() => window.print()}
          title={isTa ? 'பக்கத்தை அச்சிடு' : 'Print page'}
        >
          <span>🖨️</span>
          <span>{isTa ? 'அச்சு / PDF' : 'Print / PDF'}</span>
        </button>
      </div>
    </div>
  );
});
