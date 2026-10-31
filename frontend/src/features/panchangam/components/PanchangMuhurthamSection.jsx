import React from 'react';

/**
 * PanchangMuhurthamSection
 * Dedicated section for Subha Muhurtham (சுப முகூர்த்தம்) details.
 * Displays:
 * 1. Today's Muhurtham status (Auspicious celebration card with Lagna timings if today is Muhurtham,
 *    or clear non-muhurtham status with next upcoming muhurtham date).
 * 2. Current Month's Subha Muhurtham Dates list with day, tamil date, tithi, nakshatra,
 *    and exact auspicious Lagna time slots.
 */
export default React.memo(function PanchangMuhurthamSection({
  data,
  currentDate,
  onSelectDate,
  isTa
}) {
  if (!data || !data.muhurthamAndTimings) return null;

  const { muhurthamAndTimings } = data;
  const subhaInfo = muhurthamAndTimings.subhaMuhurthamInfo || {};
  const isMuhurthamToday = !!subhaInfo.isMuhurthamDay;

  // Month list of Muhurtham dates
  const monthlyDates =
    data.monthlyMuhurthamDates ||
    muhurthamAndTimings.monthlyMuhurthamDates ||
    subhaInfo.monthlyMuhurthamDates ||
    [];

  // Current viewed month and year info
  const dateStr = currentDate || data.meta?.date || '';
  const dateParts = dateStr.split('-');
  const curYear = dateParts[0] || '';
  const curMonthNum = parseInt(dateParts[1], 10);

  const monthNamesTa = [
    'ஜனவரி', 'பிப்ரவரி', 'மார்ச்', 'ஏப்ரல்', 'மே', 'ஜூன்',
    'ஜூலை', 'ஆகஸ்ட்', 'செப்டம்பர்', 'அக்டோபர்', 'நவம்பர்', 'டிசம்பர்'
  ];
  const monthNamesEn = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const currentMonthName = !isNaN(curMonthNum) && curMonthNum >= 1 && curMonthNum <= 12
    ? (isTa ? monthNamesTa[curMonthNum - 1] : monthNamesEn[curMonthNum - 1])
    : '';

  // Today's details
  const todayMuhurthamType = isTa
    ? subhaInfo.muhurthamType || (subhaInfo.isValarpirai ? 'வளர்பிறை முகூர்த்தம்' : 'தேய்பிறை முகூர்த்தம்')
    : subhaInfo.muhurthamTypeEn || (subhaInfo.isValarpirai ? 'Valarpirai Muhurtham' : 'Theipirai Muhurtham');

  const todayTimings = isTa
    ? (subhaInfo.timingsTa && subhaInfo.timingsTa.length > 0 ? subhaInfo.timingsTa : subhaInfo.timings || [])
    : (subhaInfo.timingsEn && subhaInfo.timingsEn.length > 0 ? subhaInfo.timingsEn : subhaInfo.timings || []);

  const nextDateFormatted = isTa
    ? (subhaInfo.nextMuhurthamDateTa || subhaInfo.nextMuhurthamDate)
    : (subhaInfo.nextMuhurthamDateEn || subhaInfo.nextMuhurthamDate);

  // Find next upcoming date target
  const nextDateObj = !isMuhurthamToday && dateStr
    ? monthlyDates.find((m) => m.date > dateStr)
    : null;
  const nextDateTarget = subhaInfo.nextMuhurthamDateIso || (nextDateObj ? nextDateObj.date : null);

  return (
    <div className="dp-muhurtham-section-container">
      {/* 1. SECTION HEADER */}
      <div className="dp-section-header">
        <span className="dp-section-icon">💍</span>
        <div className="dp-section-title-wrap">
          <h2 className="dp-section-title">
            {isTa ? 'சுப முகூர்த்த விவரங்கள்' : 'Subha Muhurtham Details'}
          </h2>
          <span className="dp-section-subtitle">
            {currentMonthName} {curYear}
          </span>
        </div>
      </div>

      {/* 2. TODAY MUHURTHAM STATUS HERO CARD */}
      {isMuhurthamToday ? (
        <div className="dp-muhurtham-today-card is-muhurtham">
          <div className="dp-muhurtham-today-header">
            <div className="dp-muhurtham-badge-group">
              <span className="dp-muhurtham-status-badge success">
                ✨ {isTa ? 'இன்று சுப முகூர்த்த நாள்!' : 'Today is Subha Muhurtham Day!'}
              </span>
              {todayMuhurthamType && (
                <span className="dp-muhurtham-type-pill">
                  {todayMuhurthamType}
                </span>
              )}
            </div>
            <div className="dp-muhurtham-today-tamil">
              🪷 {isTa
                ? (data.tamilCalendar?.tamilDateTa || data.tamilCalendar?.tamilDate)
                : (data.tamilCalendar?.tamilDateEn || data.tamilCalendar?.tamilDate)}
            </div>
          </div>

          <div className="dp-muhurtham-timings-block">
            <div className="dp-muhurtham-timings-title">
              <span>⏰</span>
              <span>
                {isTa
                  ? 'இன்றைய சுப முகூர்த்த நேரங்கள் (லக்னம் விபரம்):'
                  : "Today's Auspicious Muhurtham Timings (Lagna Windows):"}
              </span>
            </div>
            <div className="dp-muhurtham-slots-grid">
              {todayTimings.length > 0 ? (
                todayTimings.map((slot, idx) => (
                  <div key={idx} className="dp-muhurtham-slot-item">
                    <span className="dp-slot-icon">🌟</span>
                    <span className="dp-slot-text">{slot}</span>
                  </div>
                ))
              ) : (
                <div className="dp-muhurtham-slot-item">
                  <span className="dp-slot-text">
                    {subhaInfo.text || (isTa ? 'சுப முகூர்த்த நேரம்' : 'Auspicious Muhurtham Timing')}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="dp-muhurtham-today-card not-muhurtham">
          <div className="dp-muhurtham-non-flex">
            <div className="dp-muhurtham-non-info">
              <div className="dp-muhurtham-status-badge muted">
                ℹ️ {isTa ? 'இன்று முகூர்த்த நாள் அல்ல' : 'Not a Muhurtham Day Today'}
              </div>
              <p className="dp-muhurtham-non-desc">
                {isTa
                  ? 'இன்றைய தினம் சாஸ்திர ரீதியான திருமண சுப முகூர்த்த அமைப்பில் அமையவில்லை.'
                  : 'Today does not meet the classical Vivaha Muhurtham criteria.'}
              </p>
            </div>

            {nextDateFormatted && (
              <div className="dp-muhurtham-next-box">
                <span className="dp-next-lbl">
                  {isTa ? 'அடுத்த சுப முகூர்த்த நாள்:' : 'Next Auspicious Muhurtham:'}
                </span>
                <span className="dp-next-val">{nextDateFormatted}</span>
                {nextDateTarget && onSelectDate && (
                  <button
                    type="button"
                    className="dp-next-btn"
                    onClick={() => onSelectDate(nextDateTarget)}
                    title={isTa ? 'அந்த நாளின் பஞ்சாங்கம் காண்க' : 'View this date'}
                  >
                    {isTa ? 'பஞ்சாங்கம் காண்க ➔' : 'View Details ➔'}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. CURRENT MONTH'S MUHURTHAM DATES LIST */}
      <div className="dp-card-table-wrapper dp-muhurtham-month-wrapper">
        <div className="dp-table-header-row">
          <div className="dp-month-table-title-wrap">
            <span style={{ fontSize: '20px' }}>📅</span>
            <div>
              <h3 className="dp-month-table-title">
                {isTa
                  ? `${currentMonthName} ${curYear} - சுப முகூர்த்த நாட்கள்`
                  : `${currentMonthName} ${curYear} - Subha Muhurtham Dates`}
              </h3>
              <span className="dp-month-count-badge">
                {monthlyDates.length > 0
                  ? isTa
                    ? `மொத்தம் ${monthlyDates.length} நாட்கள்`
                    : `${monthlyDates.length} Days`
                  : isTa
                    ? 'முகூர்த்த நாட்கள் இல்லை'
                    : 'No Muhurtham Days'}
              </span>
            </div>
          </div>
        </div>

        {monthlyDates.length > 0 ? (
          <div className="dp-muhurtham-tiles-grid">
            {monthlyDates.map((item, idx) => {
              const isRowToday = item.date === dateStr;
              const itemTimings = isTa
                ? (item.timingsTa || item.timings)
                : (item.timingsEn || item.timings);

              return (
                <div
                  key={item.date || idx}
                  className={`dp-muhurtham-tile ${isRowToday ? 'is-current-tile' : ''}`}
                >
                  {/* TILE TOP HEADER: Date Badge Pill & Muhurtham Type */}
                  <div className="dp-tile-top-bar">
                    <div className="dp-tile-date-badge">
                      <span className="dp-tile-badge-icon">📅</span>
                      <span className="dp-tile-badge-date">
                        {isTa ? item.formattedDateTa : item.formattedDateEn}
                      </span>
                      <span className="dp-tile-badge-day">
                        ({isTa ? item.dayNameTa : item.dayNameEn})
                      </span>
                      {isRowToday && (
                        <span className="dp-today-tag">
                          {isTa ? 'இன்று' : 'Today'}
                        </span>
                      )}
                    </div>

                    <span
                      className={`dp-type-pill ${
                        item.isValarpirai ? 'type-valarpirai' : 'type-theipirai'
                      }`}
                    >
                      {isTa ? item.muhurthamTypeTa : item.muhurthamTypeEn}
                    </span>
                  </div>

                  {/* TILE MAIN CONTENT */}
                  <div className="dp-tile-body">
                    {/* Tamil Date & Tithi / Nakshatra */}
                    <div className="dp-tile-meta-grid">
                      <div className="dp-tile-meta-item">
                        <span className="dp-tile-meta-lbl">
                          🪷 {isTa ? 'தமிழ் தேதி:' : 'Tamil Date:'}
                        </span>
                        <span className="dp-tile-tamil-val">
                          {isTa ? item.tamilDateTa : item.tamilDateEn}
                        </span>
                      </div>

                      <div className="dp-tile-meta-item">
                        <span className="dp-tile-meta-lbl">
                          🌕 {isTa ? 'திதி:' : 'Tithi:'}
                        </span>
                        <span className="dp-tile-tithi-val">
                          {isTa ? item.tithiNameTa : item.tithiNameEn}
                        </span>
                      </div>

                      <div className="dp-tile-meta-item dp-tile-meta-span">
                        <span className="dp-tile-meta-lbl">
                          ✨ {isTa ? 'நட்சத்திரம்:' : 'Star:'}
                        </span>
                        <span className="dp-tile-nak-val">
                          {isTa ? item.nakshatraNameTa : item.nakshatraNameEn}
                        </span>
                      </div>
                    </div>

                    {/* Auspicious Timings & Lagna Box */}
                    <div className="dp-tile-timings-box">
                      <div className="dp-tile-timings-header">
                        <span className="dp-tile-timings-icon">⏰</span>
                        <span className="dp-tile-timings-label">
                          {isTa
                            ? 'சுப முகூர்த்த நேரம் & லக்னம்:'
                            : 'Auspicious Muhurtham & Lagna:'}
                        </span>
                      </div>
                      <div className="dp-tile-slots-list">
                        {Array.isArray(itemTimings) && itemTimings.length > 0 ? (
                          itemTimings.map((tSlot, sIdx) => (
                            <div key={sIdx} className="dp-tile-slot-item">
                              <span className="dp-tile-slot-icon">🌟</span>
                              <span className="dp-tile-slot-text">{tSlot}</span>
                            </div>
                          ))
                        ) : (
                          <div className="dp-tile-slot-item">
                            <span className="dp-tile-slot-icon">🌟</span>
                            <span className="dp-tile-slot-text">
                              {item.timingsSummary || '-'}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* TILE FOOTER ACTION BUTTON */}
                  {onSelectDate && (
                    <div className="dp-tile-footer">
                      <button
                        type="button"
                        className={`dp-tile-action-btn ${isRowToday ? 'is-current' : ''}`}
                        onClick={() => onSelectDate(item.date)}
                        disabled={isRowToday}
                        title={
                          isRowToday
                            ? isTa
                              ? 'தற்போது பார்க்கப்படுகிறது'
                              : 'Currently Viewing'
                            : isTa
                              ? 'இந்த நாளின் பஞ்சாங்கம் காண்க'
                              : 'View panchangam'
                        }
                      >
                        {isRowToday
                          ? isTa
                            ? '✓ தற்போது பார்க்கப்படுகிறது'
                            : '✓ Currently Viewing'
                          : isTa
                            ? 'பஞ்சாங்கம் காண்க ➔'
                            : 'View Panchangam ➔'}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="dp-empty-muhurtham-box">
            <span style={{ fontSize: '28px' }}>🌸</span>
            <p>
              {isTa
                ? `${currentMonthName} ${curYear} மாதத்தில் திருமண சுப முகூர்த்த நாட்கள் எதுவும் இல்லை.`
                : `No Subha Muhurtham dates found for ${currentMonthName} ${curYear}.`}
            </p>
            <span className="dp-empty-note">
              {isTa
                ? '(ஆடி, புரட்டாசி, மார்கழி போன்ற மாதங்களில் சுப முகூர்த்தங்கள் தவிர்க்கப்படலாம்)'
                : '(Months such as Aadi, Purattasi, Margazhi typically do not observe vivaha muhurthams)'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
});

