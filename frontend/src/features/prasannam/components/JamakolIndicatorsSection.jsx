import React, { useState, useMemo } from 'react';
import { generateJamakkolIndicators } from '../../../utils/jamakkol.utils';

/**
 * JamakolIndicatorsSection
 * Dynamic & Workable Prasannam Indicators & Verdict Section
 */
export default function JamakolIndicatorsSection({
  chartData,
  lang = 'ta',
  cityName = 'Chennai',
  onRefreshLiveTime
}) {
  const currentLang = lang;

  // Indicators filter, expander, and copy feedback state
  const [indicatorFilter, setIndicatorFilter] = useState('all'); // 'all' | 'positive' | 'negative'
  const [expandedIndicatorId, setExpandedIndicatorId] = useState(null);
  const [indicatorCopied, setIndicatorCopied] = useState(false);

  // Dynamic Indicators calculation synthesized from current chartData & currentLang
  const dynamicIndicators = useMemo(() => {
    if (!chartData) return [];
    return generateJamakkolIndicators(chartData, currentLang);
  }, [chartData, currentLang]);

  // Positive & caution (warning/negative) lists
  const positiveIndicators = useMemo(() => {
    return dynamicIndicators.filter((ind) => ind.type === 'positive');
  }, [dynamicIndicators]);

  const cautionIndicators = useMemo(() => {
    return dynamicIndicators.filter((ind) => ind.type === 'negative' || ind.type === 'warning');
  }, [dynamicIndicators]);

  // Filtered indicators based on active tab
  const filteredIndicators = useMemo(() => {
    if (indicatorFilter === 'positive') return positiveIndicators;
    if (indicatorFilter === 'negative') return cautionIndicators;
    return dynamicIndicators;
  }, [indicatorFilter, dynamicIndicators, positiveIndicators, cautionIndicators]);

  // Overall Prasannam Auspicious Score & Verdict
  const { scorePct, verdictTitle, verdictDesc, verdictColor, verdictBg } = useMemo(() => {
    if (!dynamicIndicators || dynamicIndicators.length === 0) {
      return { scorePct: 50, verdictTitle: '', verdictDesc: '', verdictColor: '#475569', verdictBg: '#f1f5f9' };
    }
    let totalScore = 0;
    let maxPossible = 0;
    dynamicIndicators.forEach((ind) => {
      const weight = Math.abs(ind.weight || 1);
      maxPossible += weight;
      if (ind.type === 'positive') totalScore += weight;
      else if (ind.type === 'warning') totalScore += weight * 0.4;
      else totalScore -= weight * 0.2;
    });
    const pct = Math.max(15, Math.min(95, Math.round((Math.max(0, totalScore) / (maxPossible || 1)) * 100)));

    let vTitle = '';
    let vDesc = '';
    let vColor = '#166534';
    let vBg = '#f0fdf4';

    if (pct >= 70) {
      vTitle = currentLang === 'ta' ? 'அனுகூலமான சாதகமான சூழல் (சுப பிரசன்னம்)' : 'Highly Favorable & Auspicious Chart';
      vDesc = currentLang === 'ta'
        ? 'உதயம் மற்றும் ஆருட நிலைகள் வலுவாக உள்ளன; திட்டமிட்ட காரியங்களை நம்பிக்கையுடன் துவங்கலாம்.'
        : 'Udhayam and Aarudam are well positioned; you can confidently proceed with your planned endeavor.';
      vColor = '#15803d';
      vBg = '#dcfce7';
    } else if (pct >= 45) {
      vTitle = currentLang === 'ta' ? 'மிதமான பலன் (முயற்சி மற்றும் விவேகம் தேவை)' : 'Moderate Outcome - Effort & Discretion Needed';
      vDesc = currentLang === 'ta'
        ? 'சில தாமதங்கள் மற்றும் ஆரம்ப இழுபறிகள் ஏற்படலாம். நிதானமாக ஆலோசித்து முடிவெடுப்பது நலம்.'
        : 'Some initial friction or obstacles may arise. Careful planning and patience are advised.';
      vColor = '#b45309';
      vBg = '#fef3c7';
    } else {
      vTitle = currentLang === 'ta' ? 'தடைகள் அதிகம் (எச்சரிக்கையுடனும் கவனத்துடனும் செயல்படவும்)' : 'Obstacles & Delays Forewarned';
      vDesc = currentLang === 'ta'
        ? 'கவிப்பு அல்லது அசுபக் கிரகங்களின் நேரடி தாக்கம் உள்ளது. முக்கிய ஒப்பந்தங்கள் மற்றும் புதிய முயற்சிகளை ஒத்திவைப்பது நலம்.'
        : 'Afflictions from Kavippu or malefic placements present. Defer high-stakes commitments.';
      vColor = '#b91c1c';
      vBg = '#fee2e2';
    }

    return { scorePct: pct, verdictTitle: vTitle, verdictDesc: vDesc, verdictColor: vColor, verdictBg: vBg };
  }, [dynamicIndicators, currentLang]);

  // Action: Copy Indicators & Findings to clipboard
  const handleCopyIndicators = () => {
    if (!dynamicIndicators || dynamicIndicators.length === 0) return;
    const header = currentLang === 'ta'
      ? `ஜாமக்கோள் பிரசன்னக் குறிப்புகள் (${chartData?.metadata?.displayDateTimeStr || ''} - ${cityName})`
      : `Jamakkol Prasannam Indicators (${chartData?.metadata?.displayDateTimeStr || ''} - ${cityName})`;

    const verdictLine = `${currentLang === 'ta' ? 'ஒட்டுமொத்த கணிப்பு' : 'Overall Verdict'}: ${scorePct}% - ${verdictTitle}`;

    const lines = dynamicIndicators.map((ind, i) => {
      return `${i + 1}. [${ind.symbol}] ${ind.title}\n   ${ind.desc}\n   (${currentLang === 'ta' ? 'காரணம்' : 'Cause'}: ${ind.rationale})`;
    });

    const fullText = `${header}\n${verdictLine}\n\n` + lines.join('\n\n');
    navigator.clipboard?.writeText(fullText).then(() => {
      setIndicatorCopied(true);
      setTimeout(() => setIndicatorCopied(false), 2500);
    }).catch(() => {});
  };

  // Action: Refresh for live current minute
  const handleRefreshIndicators = () => {
    if (typeof onRefreshLiveTime === 'function') {
      onRefreshLiveTime();
    }
  };

  return (
    <div className="jk-indicators-section">
      {/* Header with Title and Workable Actions */}
      <div className="jk-indicators-header">
        <div className="jk-ind-title-group">
          <span className="jk-ind-title-icon">🔍</span>
          <div>
            <h3 className="jk-ind-main-title">
              {currentLang === 'ta' ? 'பிரசன்னக் குறிப்புகள் & சுப/அசுப அறிகுறிகள்' : 'Prasannam Indicators & Observations'}
            </h3>
            <p className="jk-ind-subtitle">
              {currentLang === 'ta'
                ? 'உதயம், ஆருடம், கவிப்பு மற்றும் 8 ஜாமக் கிரகங்களின் தற்போதைய நிலையின் நேரடி ஜோதிட ஆய்வு.'
                : 'Live horary diagnosis synthesized from Udhayam, Aarudam, Kavippu, and Jama Graha dynamics.'}
            </p>
          </div>
        </div>

        <div className="jk-ind-actions">
          <button
            type="button"
            className="jk-ind-action-btn jk-btn-refresh"
            onClick={handleRefreshIndicators}
            title={currentLang === 'ta' ? 'தற்போதைய நேரத்திற்குப் புதுப்பி' : 'Refresh for current live time'}
          >
            <span className="jk-spin-icon">🔄</span>
            <span>{currentLang === 'ta' ? 'இப்போது புதுப்பி' : 'Refresh Now'}</span>
          </button>
          <button
            type="button"
            className={`jk-ind-action-btn jk-btn-copy ${indicatorCopied ? 'copied' : ''}`}
            onClick={handleCopyIndicators}
            title={currentLang === 'ta' ? 'குறிப்புகளை நகலெடு' : 'Copy indicators to clipboard'}
          >
            <span>{indicatorCopied ? '✓' : '📋'}</span>
            <span>
              {indicatorCopied
                ? (currentLang === 'ta' ? 'நகலெடுக்கப்பட்டது!' : 'Copied!')
                : (currentLang === 'ta' ? 'குறிப்புகளை நகலெடு' : 'Copy Notes')}
            </span>
          </button>
        </div>
      </div>

      {/* Verdict & Score Banner */}
      <div className="jk-verdict-banner" style={{ background: verdictBg, borderColor: verdictColor }}>
        <div className="jk-verdict-content">
          <div className="jk-verdict-score-box">
            <span className="jk-verdict-score-num" style={{ color: verdictColor }}>{scorePct}%</span>
            <span className="jk-verdict-score-lbl">{currentLang === 'ta' ? 'சாதக சதவீதம்' : 'Favorable Score'}</span>
          </div>
          <div className="jk-verdict-text-box">
            <div className="jk-verdict-headline" style={{ color: verdictColor }}>
              <span>{scorePct >= 70 ? '🌟' : scorePct >= 45 ? '⚖️' : '⚠️'}</span>
              <span>{verdictTitle}</span>
            </div>
            <p className="jk-verdict-desc">{verdictDesc}</p>
            {/* Progress bar */}
            <div className="jk-verdict-meter-track">
              <div
                className="jk-verdict-meter-fill"
                style={{
                  width: `${scorePct}%`,
                  background:
                    scorePct >= 70
                      ? 'linear-gradient(90deg, #22c55e, #16a34a)'
                      : scorePct >= 45
                      ? 'linear-gradient(90deg, #f59e0b, #d97706)'
                      : 'linear-gradient(90deg, #ef4444, #dc2626)'
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="jk-ind-filter-bar">
        <div className="jk-ind-tabs">
          <button
            type="button"
            className={`jk-ind-tab ${indicatorFilter === 'all' ? 'active' : ''}`}
            onClick={() => setIndicatorFilter('all')}
          >
            <span>{currentLang === 'ta' ? 'அனைத்தும்' : 'All'}</span>
            <span className="jk-ind-tab-badge">{dynamicIndicators.length}</span>
          </button>
          <button
            type="button"
            className={`jk-ind-tab tab-positive ${indicatorFilter === 'positive' ? 'active' : ''}`}
            onClick={() => setIndicatorFilter('positive')}
          >
            <span>✅ {currentLang === 'ta' ? 'சுப அறிகுறிகள்' : 'Auspicious'}</span>
            <span className="jk-ind-tab-badge positive">{positiveIndicators.length}</span>
          </button>
          <button
            type="button"
            className={`jk-ind-tab tab-caution ${indicatorFilter === 'negative' ? 'active' : ''}`}
            onClick={() => setIndicatorFilter('negative')}
          >
            <span>⚠️ {currentLang === 'ta' ? 'எச்சரிக்கைகள் & தடைகள்' : 'Cautions & Obstacles'}</span>
            <span className="jk-ind-tab-badge caution">{cautionIndicators.length}</span>
          </button>
        </div>
        <span className="jk-ind-hint">
          {currentLang === 'ta' ? 'காரணம் அறிய கார்டை கிளிக் செய்யவும்' : 'Click card to view astrological rationale'}
        </span>
      </div>

      {/* Dynamic Cards Grid */}
      <div className="jk-ind-cards-grid">
        {filteredIndicators.map((ind, i) => {
          const isExpanded = expandedIndicatorId === (ind.id || i);
          const isPos = ind.type === 'positive';
          const isWarn = ind.type === 'warning';
          const cardClass = isPos ? 'pos' : isWarn ? 'warn' : 'neg';

          return (
            <div
              key={ind.id || i}
              className={`jk-indicator-card ${cardClass} ${isExpanded ? 'expanded' : ''}`}
              onClick={() => setExpandedIndicatorId(isExpanded ? null : (ind.id || i))}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setExpandedIndicatorId(isExpanded ? null : (ind.id || i));
                }
              }}
            >
              <div className="jk-ind-card-main">
                <div className="jk-ind-icon-wrap">{ind.symbol}</div>
                <div className="jk-ind-body">
                  <div className="jk-ind-top-row">
                    <span className="jk-ind-category-tag">{ind.categoryLabel || ind.category}</span>
                    <span className="jk-ind-toggle-icon">
                      {isExpanded ? (currentLang === 'ta' ? '▲ சுருக்கு' : '▲ Less') : (currentLang === 'ta' ? '▼ காரணம்' : '▼ More')}
                    </span>
                  </div>
                  <div className="jk-ind-card-title">{ind.title}</div>
                  {isExpanded && (
                    <div className="jk-ind-expanded-content">
                      {ind.desc && <p className="jk-ind-expanded-desc">{ind.desc}</p>}
                      {ind.rationale && (
                        <div className="jk-ind-rationale-box">
                          <strong>{currentLang === 'ta' ? 'ஜோதிடக் காரணம்:' : 'Astrological Rationale:'}</strong>{' '}
                          <span>{ind.rationale}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
