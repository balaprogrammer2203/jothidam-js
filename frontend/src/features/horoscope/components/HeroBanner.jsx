import React from 'react';
import { useTranslation } from 'react-i18next';

export default function HeroBanner({ chartType = 'south', onSelectChartType }) {
  const { t } = useTranslation(['horoscope', 'common']);

  const shareOn = (platform) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(t('horoscope:title', 'Vedic Astrology Birth Chart Calculator'));
    let shareUrl = '';
    switch (platform) {
      case 'twitter': shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`; break;
      case 'facebook': shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`; break;
      case 'linkedin': shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`; break;
      case 'pinterest': shareUrl = `https://pinterest.com/pin/create/button/?url=${url}&description=${text}`; break;
      case 'whatsapp': shareUrl = `https://api.whatsapp.com/send?text=${text}%20${url}`; break;
      case 'email': shareUrl = `mailto:?subject=${text}&body=${url}`; break;
      default: break;
    }
    if (shareUrl) window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="prokerala-hero-section">
      {/* 1. H1 Title */}
      <h1 className="prokerala-page-title">
        {t('horoscope:title', 'Birth Chart - Free Online Astrology Birth Chart')}
      </h1>

      {/* 2. Social Share Icons Row */}
      <div className="prokerala-social-share-row">
        <button type="button" onClick={() => shareOn('twitter')} className="social-btn social-twitter" title="Share on Twitter">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
        </button>
        <button type="button" onClick={() => shareOn('facebook')} className="social-btn social-facebook" title="Share on Facebook">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
        </button>
        <button type="button" onClick={() => shareOn('linkedin')} className="social-btn social-linkedin" title="Share on LinkedIn">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1-2 2 2 2 0 0 1 2-2z"></path></svg>
        </button>
        <button type="button" onClick={() => shareOn('pinterest')} className="social-btn social-pinterest" title="Share on Pinterest">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0a12 12 0 0 0-4.37 23.18c-.05-.98-.1-2.48.02-3.55.11-.97.74-6.3.74-6.3a4.2 4.2 0 0 1-.36-1.78c0-1.68.97-2.93 2.18-2.93 1.03 0 1.53.77 1.53 1.7 0 1.03-.66 2.58-1 4-.28 1.22.61 2.21 1.82 2.21 2.18 0 3.86-2.3 3.86-5.63 0-2.94-2.12-5-5.13-5-3.5 0-5.55 2.62-5.55 5.33 0 1.05.4 2.18.9 2.8a.4.4 0 0 1 .09.38c-.1.43-.33 1.34-.38 1.53-.06.26-.2.32-.47.19-1.75-.82-2.85-3.37-2.85-5.43 0-4.42 3.21-8.48 9.27-8.48 4.87 0 8.65 3.47 8.65 8.1 0 4.83-3.05 8.73-7.28 8.73-1.42 0-2.76-.74-3.22-1.61l-.88 3.34c-.32 1.22-1.18 2.76-1.76 3.69A12 12 0 1 0 12 0z"></path></svg>
        </button>
        <button type="button" onClick={() => shareOn('whatsapp')} className="social-btn social-whatsapp" title="Share on WhatsApp">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.52 3.48A11.93 11.93 0 0 0 12.06 0C5.46 0 .09 5.37.09 11.97c0 2.11.55 4.17 1.6 5.99L0 24l6.22-1.63a11.96 11.96 0 0 0 5.84 1.51h.01c6.6 0 11.97-5.37 11.97-11.97 0-3.2-1.25-6.21-3.52-8.43zM12.07 21.87h-.01a9.92 9.92 0 0 1-5.06-1.39l-.36-.21-3.76.99 1-3.66-.24-.38a9.93 9.93 0 0 1-1.52-5.25c0-5.48 4.46-9.94 9.95-9.94 2.66 0 5.15 1.03 7.03 2.91a9.88 9.88 0 0 1 2.91 7.03c0 5.48-4.47 9.9-9.95 9.9zm5.45-7.44c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.5s1.07 2.9 1.22 3.1c.15.2 2.11 3.22 5.11 4.52.71.31 1.27.5 1.7.64.72.23 1.37.2 1.88.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z"></path></svg>
        </button>
        <button type="button" onClick={() => shareOn('email')} className="social-btn social-email" title="Share via Email">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path></svg>
        </button>
      </div>

      {/* 3. Hero Visual Card */}
      <div className="prokerala-hero-banner-card">
        <div className="hero-banner-left">
          {/* Traditional South Indian Kattam Natal Chart Graphic */}
          <div className="south-chart-kattam-mockup">
            <svg viewBox="0 0 200 200" className="south-kattam-svg">
              {/* Outer Border */}
              <rect x="6" y="6" width="188" height="188" fill="#fffdfa" stroke="#8c7853" strokeWidth="2.5" rx="4" />
              
              {/* Inner Center Cutout (ராசி RASI) */}
              <rect x="53" y="53" width="94" height="94" fill="#fef9ee" stroke="#8c7853" strokeWidth="1.8" />
              <text x="100" y="93" textAnchor="middle" fill="#8c7853" fontSize="13" fontWeight="800" fontFamily="sans-serif">ராசி</text>
              <text x="100" y="111" textAnchor="middle" fill="#b45309" fontSize="10" fontWeight="700" fontFamily="sans-serif">RASI</text>

              {/* Vertical Grid Dividing Lines */}
              <line x1="53" y1="6" x2="53" y2="53" stroke="#8c7853" strokeWidth="1.5" />
              <line x1="100" y1="6" x2="100" y2="53" stroke="#8c7853" strokeWidth="1.5" />
              <line x1="147" y1="6" x2="147" y2="53" stroke="#8c7853" strokeWidth="1.5" />

              <line x1="53" y1="147" x2="53" y2="194" stroke="#8c7853" strokeWidth="1.5" />
              <line x1="100" y1="147" x2="100" y2="194" stroke="#8c7853" strokeWidth="1.5" />
              <line x1="147" y1="147" x2="147" y2="194" stroke="#8c7853" strokeWidth="1.5" />

              {/* Horizontal Grid Dividing Lines */}
              <line x1="6" y1="53" x2="53" y2="53" stroke="#8c7853" strokeWidth="1.5" />
              <line x1="147" y1="53" x2="194" y2="53" stroke="#8c7853" strokeWidth="1.5" />
              <line x1="6" y1="100" x2="53" y2="100" stroke="#8c7853" strokeWidth="1.5" />
              <line x1="147" y1="100" x2="194" y2="100" stroke="#8c7853" strokeWidth="1.5" />
              <line x1="6" y1="147" x2="53" y2="147" stroke="#8c7853" strokeWidth="1.5" />
              <line x1="147" y1="147" x2="194" y2="147" stroke="#8c7853" strokeWidth="1.5" />

              {/* 12 House Labels & Sample Planetary Layout (Clockwise from Pisces) */}
              {/* 12. Pisces (Top-Left) */}
              <text x="29.5" y="32" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#78350f">மீனம்</text>

              {/* 1. Aries (Top-Mid-Left) */}
              <text x="76.5" y="25" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#78350f">மேஷம்</text>
              <text x="76.5" y="42" textAnchor="middle" fontSize="9.5" fontWeight="800" fill="#b91c1c">லக்</text>

              {/* 2. Taurus (Top-Mid-Right) */}
              <text x="123.5" y="25" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#78350f">ரிஷபம்</text>
              <text x="123.5" y="42" textAnchor="middle" fontSize="9" fontWeight="700" fill="#78350f">சூரி</text>

              {/* 3. Gemini (Top-Right) */}
              <text x="170.5" y="25" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#78350f">மிதுனம்</text>
              <text x="170.5" y="42" textAnchor="middle" fontSize="9" fontWeight="700" fill="#78350f">புதன்</text>

              {/* 4. Cancer (Right-Mid-Top) */}
              <text x="170.5" y="72" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#78350f">கடகம்</text>
              <text x="170.5" y="88" textAnchor="middle" fontSize="9" fontWeight="700" fill="#78350f">சுக்</text>

              {/* 5. Leo (Right-Mid-Bottom) */}
              <text x="170.5" y="118" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#78350f">சிம்மம்</text>
              <text x="170.5" y="134" textAnchor="middle" fontSize="9" fontWeight="700" fill="#78350f">செவ்</text>

              {/* 6. Virgo (Bottom-Right) */}
              <text x="170.5" y="165" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#78350f">கன்னி</text>
              <text x="170.5" y="181" textAnchor="middle" fontSize="9" fontWeight="700" fill="#78350f">சந்</text>

              {/* 7. Libra (Bottom-Mid-Right) */}
              <text x="123.5" y="165" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#78350f">துலாம்</text>
              <text x="123.5" y="181" textAnchor="middle" fontSize="9" fontWeight="700" fill="#78350f">குரு</text>

              {/* 8. Scorpio (Bottom-Mid-Left) */}
              <text x="76.5" y="165" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#78350f">விருச்</text>
              <text x="76.5" y="181" textAnchor="middle" fontSize="9" fontWeight="700" fill="#78350f">சனி</text>

              {/* 9. Sagittarius (Bottom-Left) */}
              <text x="29.5" y="165" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#78350f">தனுசு</text>
              <text x="29.5" y="181" textAnchor="middle" fontSize="9" fontWeight="700" fill="#78350f">ராகு</text>

              {/* 10. Capricorn (Left-Mid-Bottom) */}
              <text x="29.5" y="118" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#78350f">மகரம்</text>
              <text x="29.5" y="134" textAnchor="middle" fontSize="9" fontWeight="700" fill="#78350f">கேது</text>

              {/* 11. Aquarius (Left-Mid-Top) */}
              <text x="29.5" y="72" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#78350f">கும்பம்</text>
              <text x="29.5" y="88" textAnchor="middle" fontSize="9" fontWeight="700" fill="#78350f">மாந்தி</text>
            </svg>
          </div>
        </div>

        <div className="hero-banner-right">
          <span className="hero-art-title">
            {t('horoscope:hero.title', 'Birth Chart')}
          </span>
          <p className="hero-art-subtitle">
            {t('horoscope:hero.subtitle', 'Get your birth chart based on your birth date')}
          </p>

          <div className="chart-style-options">
            <button
              type="button"
              className={`chart-style-pill ${chartType === 'south' ? 'active' : ''}`}
              onClick={() => onSelectChartType && onSelectChartType('south')}
            >
              {t('horoscope:hero.southIndian', t('horoscope:form.southIndian', 'South Indian'))}
            </button>
            <span className="style-sep">•</span>
            <button
              type="button"
              className={`chart-style-pill ${chartType === 'north' ? 'active' : ''}`}
              onClick={() => onSelectChartType && onSelectChartType('north')}
            >
              {t('horoscope:hero.northIndian', t('horoscope:form.northIndian', 'North Indian'))}
            </button>
          </div>
        </div>
      </div>

      {/* 4. Descriptive Explanatory Text */}
      <div className="prokerala-intro-text-block">
        <p>
          {t('horoscope:intro.p1', "Astrology Birth chart or the Natal Chart is an astrological chart which shows the position of the sun, the moon and other planets at the exact time of a person's birth at a particular place on earth. To draw an accurate birth chart or rasi chart, one has to know his date of birth, exact time of birth and also the place of birth.")}
        </p>
        <p className="intro-tropical-link">
          <a href="#panchangam-section">
            {t('horoscope:intro.p2', 'For Tropical Zodiac & High-Precision Vedic Ephemeris, generate your Birth Chart below')} →
          </a>
        </p>
      </div>
    </div>
  );
}
