import React from 'react';

/**
 * PanchangChandrashtamamBanner
 * Displays Section 4.3: Chandrashtamam warning banner with Rasi name, affected stars, and caution note.
 */
export default React.memo(function PanchangChandrashtamamBanner({ data, isTa }) {
  if (!data || !data.chandrashtamam) return null;

  const { chandrashtamam } = data;

  const rasiName = isTa
    ? chandrashtamam.rasiNameTa || chandrashtamam.rasiName || ''
    : chandrashtamam.rasiNameEn || chandrashtamam.rasiName || '';

  const stars = isTa
    ? chandrashtamam.nakshatrasTa || chandrashtamam.nakshatras || []
    : chandrashtamam.nakshatrasEn || chandrashtamam.nakshatras || [];

  const note = isTa
    ? chandrashtamam.noteTa || chandrashtamam.note || ''
    : chandrashtamam.noteEn || chandrashtamam.note || '';

  return (
    <div className="dp-chandrashtamam-banner">
      <span className="dp-chandra-icon">⚠️</span>
      <div className="dp-chandra-content">
        <h3>
          {isTa ? 'இன்றைய சந்திராஷ்டமம்' : "Today's Chandrashtamam"}: {rasiName}{' '}
          {isTa ? 'ராசி' : 'Rasi'}
        </h3>
        <div className="dp-chandra-stars">
          {isTa ? 'நட்சத்திரங்கள்: ' : 'Nakshatras: '}
          {stars.join(' • ')}
        </div>
        <p className="dp-chandra-note">{note}</p>
      </div>
    </div>
  );
});
