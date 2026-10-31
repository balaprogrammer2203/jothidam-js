import React, { useState, useEffect } from 'react';

/**
 * PanchangHoraiTable
 * Displays Section 4.6: 24-Hour Planetary Horai (ஹோரை அட்டவணை)
 * in a modern tile view with two tabs: Day (12 hrs) & Night (12 hrs),
 * matching the Gowri Panchangam two-tab functionality.
 */
export default React.memo(function PanchangHoraiTable({ data, isTa }) {
  if (!data || !data.horaiSchedule) return null;

  // Auto-initialize to 'night' if current hora is in night slot (horas 13-24), else 'day'
  const [horaiTab, setHoraiTab] = useState(() => {
    if (data.horaiSchedule.some((h) => h.isCurrent && h.horaNumber >= 13)) {
      return 'night';
    }
    return 'day';
  });

  // Keep in sync if date/time changes
  useEffect(() => {
    if (data?.horaiSchedule?.some((h) => h.isCurrent && h.horaNumber >= 13)) {
      setHoraiTab('night');
    } else if (data?.horaiSchedule?.some((h) => h.isCurrent && h.horaNumber <= 12)) {
      setHoraiTab('day');
    }
  }, [data]);

  const filteredList = (data.horaiSchedule || []).filter((h) => {
    if (horaiTab === 'night') return h.horaNumber >= 13 && h.horaNumber <= 24;
    return h.horaNumber >= 1 && h.horaNumber <= 12; // 'day'
  });

  return (
    <div className="dp-card-table-wrapper dp-horai-card-wrapper">
      <div className="dp-table-header-row">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '22px' }}>🪐</span>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800 }}>
            {isTa ? 'ஹோரை அட்டவணை' : 'Horai Table'}{' '}
            <span className="dp-gowri-tab-hint">
              ({horaiTab === 'day' ? (isTa ? 'பகல் 12 மணி' : 'Day 12 hrs') : (isTa ? 'இரவு 12 மணி' : 'Night 12 hrs')})
            </span>
          </h3>
        </div>

        <div className="dp-tab-pills">
          <button
            type="button"
            className={`dp-tab-pill ${horaiTab === 'day' ? 'active' : ''}`}
            onClick={() => setHoraiTab('day')}
          >
            ☀️ {isTa ? 'பகல் (12 மணி)' : 'Day (12 hrs)'}
          </button>
          <button
            type="button"
            className={`dp-tab-pill ${horaiTab === 'night' ? 'active' : ''}`}
            onClick={() => setHoraiTab('night')}
          >
            🌙 {isTa ? 'இரவு (12 மணி)' : 'Night (12 hrs)'}
          </button>
        </div>
      </div>

      <div className="dp-gowri-tiles-grid dp-horai-tiles-grid">
        {filteredList.map((h) => {
          const lord = isTa ? (h.lordTa || h.lord) : (h.lordKey || h.en || h.lord);
          const nature = isTa ? (h.natureTa || h.nature) : (h.natureEn || h.nature);
          const suitable = isTa ? (h.suitableTa || h.suitable) : (h.suitableEn || h.suitable);

          // Classification for styling matching Gowri
          const natureType = h.isAuspicious
            ? 'auspicious'
            : (h.natureTa === 'மத்திமம்' || h.natureEn === 'Moderate' || h.lordKey === 'Sun')
            ? 'moderate'
            : 'inauspicious';

          return (
            <div
              key={h.horaNumber}
              className={`dp-gowri-tile is-${natureType} ${h.isCurrent ? 'is-current-gowri is-current-horai' : ''}`}
            >
              {/* Tile Top Header: # + Live / Nature badges */}
              <div className="dp-gtile-header">
                <span className="dp-gtile-seq">#{h.horaNumber}</span>
                <div className="dp-gtile-badges">
                  {h.isCurrent && (
                    <span className="dp-live-indicator">{isTa ? 'இப்போது' : 'Live'}</span>
                  )}
                  <span className={`dp-pill-tag ${natureType}`}>
                    {nature}
                  </span>
                </div>
              </div>

              {/* Tile Body: Horai Lord & Time Slot */}
              <div className="dp-gtile-body">
                <div className="dp-gtile-name">
                  {lord}
                </div>
                <div className="dp-gtile-time">
                  <span className="dp-gtile-clock">⏱</span> {h.timeSlot}
                </div>
              </div>

              {/* Tile Footer: Suitable deeds / உகந்த செயல்கள் */}
              <div className="dp-gtile-desc" title={suitable}>
                {suitable}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});
