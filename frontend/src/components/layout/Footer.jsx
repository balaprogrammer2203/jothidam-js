import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SUPPORTED_LANGUAGES } from '../../i18n/languages';

export default function Footer() {
  const { t, i18n } = useTranslation('common');
  const currentLang = i18n.language || 'ta';

  const handleLangChange = (code) => {
    i18n.changeLanguage(code);
    localStorage.setItem('jothidam_locale', code);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="prokerala-footer-wrapper">
      <div className="footer-top-container">
        <div className="footer-columns-grid">
          {/* Column 1: About Platform */}
          <div className="footer-col about-col">
            <div className="footer-brand-header">
              <span className="footer-om-icon">🕉️</span>
              <span className="footer-brand-title">Jothidam Portal</span>
            </div>
            <p className="footer-about-p">
              {t('common:footer.aboutText', 'High-precision Vedic astrology horoscope calculations, astronomical planetary ephemeris, and traditional Panchangam master reference data.')}
            </p>
            <div className="footer-badges-strip">
              <span className="footer-tech-badge">⚡ Swiss Ephemeris</span>
              <span className="footer-tech-badge">🛰️ Lahiri Ayanamsa</span>
              <span className="footer-tech-badge">🌐 Multi-Language</span>
            </div>
          </div>

          {/* Column 2: Astrology Master Tables */}
          <div className="footer-col">
            <h4 className="footer-col-title">{currentLang === 'ta' ? 'ஜோதிட அட்டவணைகள்' : 'Astrology Tables'}</h4>
            <ul className="footer-links-list">
              <li><Link to="/">📄 {currentLang === 'ta' ? 'ஜாதகம் கணிப்பு (Horoscope)' : 'Horoscope Calculator'}</Link></li>
              <li><Link to="/rasis">♈ {currentLang === 'ta' ? '12 ராசிகள் அட்டவணை' : '12 Zodiac Signs (Rasis)'}</Link></li>
              <li><Link to="/nakshatras">✨ {currentLang === 'ta' ? '27 நட்சத்திரங்கள் அட்டவணை' : '27 Vedic Nakshatras'}</Link></li>
              <li><Link to="/nakshatra-padas">🧭 {currentLang === 'ta' ? '108 நட்சத்திர பாதங்கள் (மண்டலம்)' : '108 Nakshatra Padas (Mandalam)'}</Link></li>
              <li><Link to="/planets">🪐 {currentLang === 'ta' ? 'நவக்கிரகங்கள் அட்டவணை' : '9 Navagrahas & Lords'}</Link></li>
              <li><Link to="/kp-horary">🔮 {currentLang === 'ta' ? 'KP ஹோரரி எண்கள் (1-249)' : 'KP Horary Numbers (1-249)'}</Link></li>
              <li><Link to="/kalachakram">🎡 {currentLang === 'ta' ? 'காலச்சக்கரம் 360°' : '360° Kalachakram Wheel'}</Link></li>
              <li><Link to="/kadikara-prasannam">🕰️ {currentLang === 'ta' ? 'கடிகார பிரசன்னம்' : 'Kadikara Prasannam'}</Link></li>
              <li><Link to="/saved">⭐ {currentLang === 'ta' ? 'சேமிக்கப்பட்ட ஜாதகங்கள்' : 'Saved Horoscope Profiles'}</Link></li>
            </ul>
          </div>

          {/* Column 3: Panchangam & Calendar Tables */}
          <div className="footer-col">
            <h4 className="footer-col-title">{currentLang === 'ta' ? 'பஞ்சாங்கம் & காலண்டர்' : 'Panchangam & Calendar'}</h4>
            <ul className="footer-links-list">
              <li><Link to="/tithis">🌕 {currentLang === 'ta' ? '30 திதிகள் அட்டவணை' : '30 Lunar Tithis'}</Link></li>
              <li><Link to="/yogas">🌀 {currentLang === 'ta' ? '27 நித்திய யோகங்கள்' : '27 Nithya Yogas'}</Link></li>
              <li><Link to="/karanas">⏳ {currentLang === 'ta' ? '11 கரணங்கள் அட்டவணை' : '11 Vedic Karanas'}</Link></li>
              <li><Link to="/tamil-calendar">📆 {currentLang === 'ta' ? '60 தமிழ் வருடங்கள் & மாதங்கள்' : 'Tamil Calendar (60 Years)'}</Link></li>
              <li><Link to="/admin">⚙️ {currentLang === 'ta' ? 'நிர்வாகப் பலகை (Admin)' : 'Master Tables Administration'}</Link></li>
            </ul>
          </div>

          {/* Column 4: Languages & Admin */}
          <div className="footer-col">
            <h4 className="footer-col-title">{t('common:footer.languages', 'Languages')}</h4>
            <div className="footer-lang-pills">
              {SUPPORTED_LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => handleLangChange(lang.code)}
                  className={`footer-lang-btn ${i18n.language === lang.code ? 'active' : ''}`}
                >
                  <span className="lang-flag">{lang.flag}</span>
                  <span className="lang-name">{lang.nativeName}</span>
                </button>
              ))}
            </div>

            <div className="footer-admin-link-box">
              <Link to="/admin" className="footer-admin-link">
                ⚙️ {t('common:nav.admin', 'Admin Management Panel')} →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Strip */}
      <div className="footer-bottom-bar">
        <div className="footer-bottom-inner">
          <p className="copyright-text">
            {t('common:footer.copyright', `© ${new Date().getFullYear()} Jothidam Portal. All rights reserved.`)} • {t('common:footer.tagline', 'Enterprise Precision Vedic Ephemeris & Kundli Engine')}
          </p>
        </div>
      </div>
    </footer>
  );
}
