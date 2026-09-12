import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../common/LanguageSelector';
import ThemeToggle from '../common/ThemeToggle';
import { useAuth } from '../../app/providers/AuthContext';
import { PORTAL_NAVIGATION_TREE } from '../../config/navigation.config';

export default function Header() {
  const { t, i18n } = useTranslation(['common', 'auth']);
  const currentLang = i18n.language || 'ta';
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();

  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpandedCat, setMobileExpandedCat] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const navRef = useRef(null);
  const hoverTimeoutRef = useRef(null);

  // Close dropdown on route changes
  useEffect(() => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const handleMouseEnter = (catId) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setActiveDropdown(catId);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/?search=${encodeURIComponent(searchQuery.trim())}#birth-details-form`;
    }
  };

  const getLangProp = (obj, defaultEn = '') => {
    if (!obj) return defaultEn || '';
    if (typeof obj === 'string') return obj;
    return obj[currentLang] || obj.en || obj.ta || defaultEn || '';
  };

  return (
    <header className="jothidam-portal-header-wrapper" ref={navRef}>
      {/* =========================================================================
          TIER 1: Top Header Bar (Brand Logo & Utilities: Search, Theme, Lang, User)
          ========================================================================= */}
      <div className="portal-nav-top-bar">
        <div className="portal-nav-inner">
          {/* Left: Brand Logo & Mobile Toggle */}
          <div className="portal-brand-section">
            <button
              type="button"
              className={`portal-mobile-toggle-btn ${mobileMenuOpen ? 'is-active' : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Toggle Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              )}
            </button>

            <Link to="/" className="portal-brand-logo-link">
              <div className="portal-logo-badge">
                <span className="portal-logo-glyph">🕉️</span>
              </div>
              <div className="portal-logo-text-wrap">
                <span className="portal-brand-title">Jothidam</span>
                <span className="portal-brand-sub">Portal</span>
              </div>
            </Link>
          </div>

          {/* Center: Guru Mantra Spiritual Banner ("குரு வாழ்க, குருவே துணை") */}
          <div className="portal-header-center-area">
            <div className="portal-guru-mantra-pill" title="குரு வாழ்க, குருவே துணை">
              <span className="guru-om-badge">ॐ</span>
              <span className="guru-mantra-text">குரு வாழ்க, குருவே துணை</span>
              <span className="guru-pranam-icon">🙏</span>
            </div>
          </div>

          {/* Right Utilities: Search + Theme Toggle + Language Selector + User Menu */}
          <div className="portal-utilities-section">
            {/* Search Box */}
            <form onSubmit={handleSearchSubmit} className="header-search-form">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={currentLang === 'ta' ? 'ஜாதகம், ராசி, KP தேடுக...' : 'Search Kundli, KP, Rasis...'}
                className="header-search-input"
              />
              <button type="submit" className="header-search-btn" title="Search">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </button>
            </form>

            {/* Astrotalk-Style Dark/Light Theme Toggle Button */}
            <ThemeToggle />

            {/* Language Selector */}
            <LanguageSelector variant="compact" />

            {/* User Profile / Admin Login */}
            {isAuthenticated && user ? (
              <div className="header-user-menu">
                <Link to="/admin" className="header-user-btn" title={user.fullName}>
                  <span className="user-avatar-tiny">{user.username?.charAt(0).toUpperCase()}</span>
                  <span className="user-name-label">{user.fullName?.split(' ')[0] || user.username}</span>
                </Link>
                <button type="button" onClick={logout} className="header-logout-tiny-btn" title={t('common:nav.logout', 'Logout')}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                </button>
              </div>
            ) : (
              <Link to="/admin/login" className="header-login-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span>{t('common:nav.login', 'Login')}</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* =========================================================================
          TIER 2: Full-Width Menu Navigation Bar (New Line with Dropdowns)
          ========================================================================= */}
      <div className="portal-nav-menu-bar">
        <div className="portal-menu-inner">
          <nav className="portal-main-menu-nav">
            <ul className="portal-categories-list">
              {PORTAL_NAVIGATION_TREE.map((category) => {
                const isOpen = activeDropdown === category.id;
                const titleText = getLangProp(category.title);

                return (
                  <li
                    key={category.id}
                    className={`portal-category-item ${isOpen ? 'active-dropdown' : ''}`}
                    onMouseEnter={() => handleMouseEnter(category.id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      type="button"
                      className="portal-category-btn"
                      onClick={() => setActiveDropdown(isOpen ? null : category.id)}
                      aria-expanded={isOpen}
                    >
                      <span className="portal-category-icon">{category.icon}</span>
                      <span className="portal-category-label">{titleText}</span>
                      <span className={`portal-chevron-arrow ${isOpen ? 'open' : ''}`}>▾</span>
                    </button>

                    {/* Multi-Column Mega Dropdown Menu */}
                    {isOpen && (
                      <>
                        <div
                          className="portal-dropdown-backdrop"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveDropdown(null);
                          }}
                          aria-hidden="true"
                        />
                        <div className="portal-mega-dropdown-menu">
                          <div className="portal-dropdown-header-mobile">
                            <div className="portal-dropdown-header-info">
                              <span className="dropdown-cat-icon">{category.icon}</span>
                              <span className="dropdown-cat-name">{titleText}</span>
                            </div>
                            <button
                              type="button"
                              className="portal-dropdown-close-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveDropdown(null);
                              }}
                              aria-label="Close"
                            >
                              ✕
                            </button>
                          </div>
                          <div className="portal-mega-menu-inner">
                          <div className={`portal-columns-grid cols-${category.columns.length}`}>
                            {category.columns.map((col, colIdx) => (
                              <div key={colIdx} className="portal-menu-column">
                                {col.heading && (
                                  <div className="portal-col-heading">
                                    {getLangProp(col.heading)}
                                  </div>
                                )}
                                <div className="portal-items-list">
                                  {col.items.map((item) => (
                                    <Link
                                      key={item.id}
                                      to={item.path}
                                      className="portal-menu-item-row"
                                      onClick={() => setActiveDropdown(null)}
                                    >
                                      <div className="portal-item-icon-box">
                                        {item.icon}
                                      </div>
                                      <div className="portal-item-text-col">
                                        <div className="portal-item-title-row">
                                          <span className="portal-item-title">
                                            {getLangProp(item.title)}
                                          </span>
                                          {item.badge && (
                                            <span className="portal-badge-pill">
                                              {item.badge}
                                            </span>
                                          )}
                                        </div>
                                        {item.desc && (
                                          <span className="portal-item-desc">
                                            {getLangProp(item.desc)}
                                          </span>
                                        )}
                                      </div>
                                      <span className="portal-item-arrow">→</span>
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>

      {/* =========================================================================
          Mobile Responsive Accordion Drawer
          ========================================================================= */}
      {mobileMenuOpen && (
        <div className="portal-mobile-drawer">
          <div className="portal-mobile-drawer-inner">
            <div className="portal-mobile-drawer-header">
              <div className="drawer-header-title">
                <span className="drawer-header-icon">🧭</span>
                <span className="drawer-header-text">
                  {currentLang === 'ta' ? 'முதன்மை வழிசெலுத்தல்' : 'Navigation Menu'}
                </span>
              </div>
              <button
                type="button"
                className="drawer-close-icon-btn"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="portal-mobile-categories">
              {PORTAL_NAVIGATION_TREE.map((category) => {
                const isExpanded = mobileExpandedCat === category.id;
                const titleText = getLangProp(category.title);

                return (
                  <div key={category.id} className="portal-mobile-category-group">
                    <button
                      type="button"
                      className="portal-mobile-cat-header-btn"
                      onClick={() => setMobileExpandedCat(isExpanded ? null : category.id)}
                    >
                      <span className="portal-mobile-cat-icon">{category.icon}</span>
                      <span className="portal-mobile-cat-title">{titleText}</span>
                      <span className={`portal-mobile-cat-arrow ${isExpanded ? 'rotated' : ''}`}>▾</span>
                    </button>

                    {isExpanded && (
                      <div className="portal-mobile-subitems-container">
                        {category.columns.map((col, cIdx) => (
                          <div key={cIdx} className="portal-mobile-col-section">
                            {col.items.map((item) => (
                              <Link
                                key={item.id}
                                to={item.path}
                                className="portal-mobile-subitem-link"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                <span className="portal-mobile-sub-icon">{item.icon}</span>
                                <span className="portal-mobile-sub-title">{getLangProp(item.title)}</span>
                                <span className="portal-mobile-sub-arrow">→</span>
                              </Link>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
