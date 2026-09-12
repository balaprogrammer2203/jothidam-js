import React from 'react';
import QuickHoroscopeWidget from './widgets/QuickHoroscopeWidget';
import FeaturedArticlesWidget from './widgets/FeaturedArticlesWidget';
import AstrologyQuickLinksWidget from './widgets/AstrologyQuickLinksWidget';
import AuspiciousTimingsWidget from './widgets/AuspiciousTimingsWidget';

/**
 * Enterprise AstrologyRightSidebar Component
 * Supports dual layout modes:
 * - 'sidebar' (default): Vertical column for Left-Right layout
 * - 'bottom': Multi-column responsive horizontal grid for Top-Bottom layout
 */
export default function AstrologyRightSidebar({
  layout = 'sidebar',
  className = '',
  onQuickSubmit,
  showQuickHoroscope = true,
  showFeaturedArticles = true,
  showQuickLinks = true,
  showTimings = true,
  customWidgets = null,
  articles,
  links,
  timings
}) {
  const isBottomLayout = layout === 'bottom';
  const layoutClass = isBottomLayout ? 'layout-bottom' : 'layout-sidebar';

  return (
    <aside
      className={`prokerala-right-sidebar ${layoutClass} ${className}`.trim()}
      aria-label={isBottomLayout ? 'Astrology Resources & Quick Tools' : 'Astrology Sidebar'}
    >
      {/* 1. Quick Horoscope Mini-Form Calculator */}
      {showQuickHoroscope && (
        <QuickHoroscopeWidget onQuickSubmit={onQuickSubmit} />
      )}

      {/* 2. Featured Astrology Articles */}
      {showFeaturedArticles && (
        <FeaturedArticlesWidget articles={articles} />
      )}

      {/* 3. Cross-Portal Navigation Links */}
      {showQuickLinks && (
        <AstrologyQuickLinksWidget links={links} />
      )}

      {/* 4. Auspicious & Inauspicious Hours */}
      {showTimings && (
        <AuspiciousTimingsWidget timings={timings} />
      )}

      {/* Optional Injected Custom Widgets */}
      {customWidgets}
    </aside>
  );
}
