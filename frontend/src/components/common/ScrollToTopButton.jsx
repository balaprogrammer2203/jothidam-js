import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function ScrollToTopButton() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'en';
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      
      // Calculate scroll percentage
      if (docHeight > 0) {
        const progress = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
        setScrollProgress(progress);
      }

      // Show button once scrolled past 200px
      if (scrollTop > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const tooltips = {
    ta: 'மேலே செல்க',
    hi: 'ऊपर जाएं',
    te: 'పైకి వెళ్ళండి',
    kn: 'ಮೇಲಕ್ಕೆ ಹೋಗಿ',
    ml: 'മുകളിലേക്ക് പോകുക',
    en: 'Back to Top'
  };

  const tooltipText = tooltips[currentLang] || tooltips.en;

  return (
    <div className={`floating-scroll-top-wrapper ${isVisible ? 'visible' : 'hidden'}`}>
      <button
        type="button"
        onClick={scrollToTop}
        className="floating-scroll-top-btn"
        aria-label={tooltipText}
        title={tooltipText}
      >
        {/* Circular Progress SVG Background Ring */}
        <svg className="scroll-progress-ring" width="46" height="46" viewBox="0 0 46 46">
          <circle
            className="scroll-progress-track"
            cx="23"
            cy="23"
            r="20"
            strokeWidth="3"
          />
          <circle
            className="scroll-progress-indicator"
            cx="23"
            cy="23"
            r="20"
            strokeWidth="3"
            style={{
              strokeDasharray: 125.66,
              strokeDashoffset: 125.66 - (125.66 * scrollProgress) / 100
            }}
          />
        </svg>

        {/* Upward Chevron SVG Icon */}
        <span className="scroll-arrow-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </span>

        {/* Floating Tooltip Pill on Hover */}
        <span className="scroll-top-tooltip-label">
          {tooltipText}
        </span>
      </button>
    </div>
  );
}
