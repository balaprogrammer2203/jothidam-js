import React from 'react';

/**
 * PanchangTimingsGrid
 * Displays Section 4.4: Auspicious vs Inauspicious periods comparison grid.
 */
export default React.memo(function PanchangTimingsGrid({ data, isTa }) {
  if (!data || !data.muhurthamAndTimings) return null;

  const { muhurthamAndTimings } = data;

  const soolamDirection = isTa
    ? muhurthamAndTimings.soolam?.directionTa || muhurthamAndTimings.soolam?.direction || 'வடக்கு'
    : muhurthamAndTimings.soolam?.directionEn || muhurthamAndTimings.soolam?.direction || 'North';

  const soolamPariharam = isTa
    ? muhurthamAndTimings.soolam?.pariharamTa || muhurthamAndTimings.soolam?.pariharam || 'பால்'
    : muhurthamAndTimings.soolam?.pariharamEn || muhurthamAndTimings.soolam?.pariharam || 'Milk';

  return (
    <div>
      <div className="dp-section-header">
        <span className="dp-section-icon">⏰</span>
        <h2 className="dp-section-title">{isTa ? 'சுப & அசுப நேரங்கள்' : 'Auspicious & Inauspicious Timings'}</h2>
      </div>

      <div className="dp-timings-grid">
        {/* Auspicious Timings Box */}
        <div className="dp-timing-box auspicious-box">
          <h3 className="dp-timing-box-title">
            <span>🌸</span>
            <span>{isTa ? 'சுப நேரங்கள்' : 'Auspicious Periods'}</span>
          </h3>
          <div className="dp-timing-list">
            <div className="dp-timing-row">
              <span className="dp-timing-row-label">🌟 {isTa ? 'காலை நல்ல நேரம்' : 'Morning Nalla Neram'}</span>
              <span className="dp-timing-row-val">{muhurthamAndTimings.nallaNeram.morning}</span>
            </div>

            <div className="dp-timing-row">
              <span className="dp-timing-row-label">🌟 {isTa ? 'மாலை நல்ல நேரம்' : 'Evening Nalla Neram'}</span>
              <span className="dp-timing-row-val">{muhurthamAndTimings.nallaNeram.evening}</span>
            </div>

            <div className="dp-timing-row">
              <span className="dp-timing-row-label">🌺 {isTa ? 'காலை கௌரி நல்ல நேரம்' : 'Morning Gowri Nalla Neram'}</span>
              <span className="dp-timing-row-val">{muhurthamAndTimings.gowriNallaNeram.morning}</span>
            </div>

            <div className="dp-timing-row">
              <span className="dp-timing-row-label">🌺 {isTa ? 'மாலை கௌரி நல்ல நேரம்' : 'Evening Gowri Nalla Neram'}</span>
              <span className="dp-timing-row-val">{muhurthamAndTimings.gowriNallaNeram.evening}</span>
            </div>

            <div className="dp-timing-row">
              <span className="dp-timing-row-label">🌅 {isTa ? 'பிரம்ம முகூர்த்தம்' : 'Brahma Muhurtham'}</span>
              <span className="dp-timing-row-val">{muhurthamAndTimings.brahmaMuhurtham}</span>
            </div>

            <div className="dp-timing-row">
              <span className="dp-timing-row-label">☀️ {isTa ? 'அபிஜித் முகூர்த்தம்' : 'Abhijit Muhurtham'}</span>
              <span className="dp-timing-row-val">{muhurthamAndTimings.abhijitMuhurtham}</span>
            </div>
          </div>
        </div>

        {/* Inauspicious Timings Box */}
        <div className="dp-timing-box inauspicious-box">
          <h3 className="dp-timing-box-title">
            <span>⚡</span>
            <span>{isTa ? 'அசுப நேரங்கள்' : 'Inauspicious Periods'}</span>
          </h3>
          <div className="dp-timing-list">
            <div className="dp-timing-row">
              <span className="dp-timing-row-label">⚠️ {isTa ? 'ராகு காலம்' : 'Rahu Kalam'}</span>
              <span className="dp-timing-row-val">{muhurthamAndTimings.rahuKalam}</span>
            </div>

            <div className="dp-timing-row">
              <span className="dp-timing-row-label">⚠️ {isTa ? 'எமகண்டம்' : 'Yamakandam'}</span>
              <span className="dp-timing-row-val">{muhurthamAndTimings.yamakandam}</span>
            </div>

            <div className="dp-timing-row">
              <span className="dp-timing-row-label">⚠️ {isTa ? 'குளிகை' : 'Gulika Kalam'}</span>
              <span className="dp-timing-row-val">{muhurthamAndTimings.kuligai}</span>
            </div>

            <div className="dp-timing-row">
              <span className="dp-timing-row-label">⚡ {isTa ? 'துர்முஹூர்த்தம்' : 'Durmuhurtham'}</span>
              <div className="dp-timing-row-val-group">
                {Array.isArray(muhurthamAndTimings.durmuhurtham) ? (
                  muhurthamAndTimings.durmuhurtham.map((period, idx) => (
                    <span key={idx} className="dp-timing-period">
                      {period}
                    </span>
                  ))
                ) : (
                  <span className="dp-timing-period">{muhurthamAndTimings.durmuhurtham}</span>
                )}
              </div>
            </div>

            {muhurthamAndTimings.tyajyam && (
              <div className="dp-timing-row">
                <span className="dp-timing-row-label">⚡ {isTa ? 'தியாஜ்யம்' : 'Tyajyam'}</span>
                <div className="dp-timing-row-val-group">
                  {Array.isArray(muhurthamAndTimings.tyajyam) ? (
                    muhurthamAndTimings.tyajyam.map((period, idx) => (
                      <span key={idx} className="dp-timing-period">
                        {period}
                      </span>
                    ))
                  ) : (
                    <span className="dp-timing-period">{muhurthamAndTimings.tyajyam}</span>
                  )}
                </div>
              </div>
            )}

            <div className="dp-timing-row">
              <span className="dp-timing-row-label">🧭 {isTa ? 'திசைச் சூலம்' : 'Disha Soolam'}</span>
              <span className="dp-timing-row-val">{soolamDirection}</span>
            </div>

            <div className="dp-timing-row">
              <span className="dp-timing-row-label">🍯 {isTa ? 'சூலப் பரிகாரம்' : 'Remedy (Pariharam)'}</span>
              <span className="dp-timing-row-val" style={{ color: '#0284c7' }}>
                {soolamPariharam}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
