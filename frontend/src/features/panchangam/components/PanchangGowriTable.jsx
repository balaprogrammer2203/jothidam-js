import React from 'react';

/**
 * PanchangGowriTable
 * Displays Gowri Panchangam schedule in a modern tile view (4x2 grid)
 * with Day/Night tabs and active period highlighting, preserving all data.
 */
export default React.memo(function PanchangGowriTable({ data, gowriTab, setGowriTab, isTa }) {
  if (!data || !data.gowriPanchangamSchedule) return null;

  const scheduleList =
    gowriTab === 'day' ? data.gowriPanchangamSchedule.day : data.gowriPanchangamSchedule.night;

  return (
    <div className="dp-card-table-wrapper dp-gowri-card-wrapper">
      <div className="dp-table-header-row">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '22px' }}>👑</span>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800 }}>
            {isTa ? 'கௌரி பஞ்சாங்கம்' : 'Gowri Panchangam'}{' '}
            <span className="dp-gowri-tab-hint">
              ({gowriTab === 'day' ? (isTa ? 'பகல்' : 'Day') : (isTa ? 'இரவு' : 'Night')})
            </span>
          </h3>
        </div>

        <div className="dp-tab-pills">
          <button
            type="button"
            className={`dp-tab-pill ${gowriTab === 'day' ? 'active' : ''}`}
            onClick={() => setGowriTab('day')}
          >
            ☀️ {isTa ? 'பகல் கௌரி' : 'Day Gowri'}
          </button>
          <button
            type="button"
            className={`dp-tab-pill ${gowriTab === 'night' ? 'active' : ''}`}
            onClick={() => setGowriTab('night')}
          >
            🌙 {isTa ? 'இரவு கௌரி' : 'Night Gowri'}
          </button>
        </div>
      </div>

      <div className="dp-gowri-tiles-grid">
        {(scheduleList || []).map((g) => {
          const name = isTa ? (g.nameTa || g.name) : (g.key || g.name);
          const nature = isTa ? (g.natureTa || g.nature) : (g.natureEn || g.nature);
          const desc = isTa ? (g.descTa || g.desc) : (g.descEn || g.desc);

          // Classification for styling
          const natureType = g.isAuspicious
            ? 'auspicious'
            : g.key === 'Uthi'
            ? 'moderate'
            : 'inauspicious';

          return (
            <div
              key={g.segment}
              className={`dp-gowri-tile is-${natureType} ${g.isCurrent ? 'is-current-gowri' : ''}`}
            >
              {/* Tile Top Header: Segment # + Live / Nature badges */}
              <div className="dp-gtile-header">
                <span className="dp-gtile-seq">#{g.segment}</span>
                <div className="dp-gtile-badges">
                  {g.isCurrent && (
                    <span className="dp-live-indicator">{isTa ? 'இப்போது' : 'Live'}</span>
                  )}
                  <span className={`dp-pill-tag ${natureType}`}>
                    {nature}
                  </span>
                </div>
              </div>

              {/* Tile Body: Gowri Period Name & Time Slot */}
              <div className="dp-gtile-body">
                <div className="dp-gtile-name">
                  {name}
                </div>
                <div className="dp-gtile-time">
                  <span className="dp-gtile-clock">⏱</span> {g.timeSlot}
                </div>
              </div>

              {/* Tile Footer: Significance / Description */}
              <div className="dp-gtile-desc" title={desc}>
                {desc}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});
