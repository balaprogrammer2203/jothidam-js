import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ScrollToTopButton from '../common/ScrollToTopButton';
import AstrologyRightSidebar from '../../features/horoscope/components/RightSidebar/AstrologyRightSidebar';

/**
 * Enterprise Layout Component
 * Orchestrates two core portal body layouts:
 * - Layout 1 (Standard Left-Right): Left content + Right common sticky sidebar (for all menu link pages)
 * - Layout 2 (Top-Bottom): Top full-width application + Bottom multi-column sidebar (for /nakshatra-padas)
 * - Admin Layout: Standalone wrapper for /admin routes
 * - Plain Layout: Full-width unconstrained layout for 404 / error pages
 */
export default function Layout({ children }) {
  const location = useLocation();
  const pathname = location.pathname;
  const isAdminRoute = pathname.startsWith('/admin');

  // Dedicated Admin Panel and Admin Login Layout without frontend headers/footers
  if (isAdminRoute) {
    return <div className="admin-app-wrapper">{children}</div>;
  }

  // Layout selection:
  // - Top-Bottom: specifically for /nakshatra-padas (full-width interactive wheel & table at top, bottom common sidebar)
  // - Plain: for 404 or standalone unstyled routes
  // - Left-Right: standard 2-column layout for all other menu link pages
  const isTopBottomPage = pathname === '/nakshatra-padas';
  const isPlainPage = pathname === '/404' || pathname === '/not-found';

  return (
    <div className="page-wrapper">
      <Header />

      {isPlainPage ? (
        /* Standalone / 404 Fallback Layout */
        <main className="main-content-area layout-mode-plain">
          {children}
        </main>
      ) : isTopBottomPage ? (
        /* Layout 2: Top-Bottom Content in Body Part (Nakshatra 108 Padas Page) */
        <main className="main-content-area layout-mode-top-bottom">
          <div className="layout-top-body-content">
            {children}
          </div>
          <div className="layout-bottom-sidebar-section">
            <div className="prokerala-layout-container">
              <AstrologyRightSidebar layout="bottom" />
            </div>
          </div>
        </main>
      ) : (
        /* Layout 1: Left-Right Content in Body Part (Standard for all other menu link pages) */
        <main className="main-content-area layout-mode-left-right">
          <div className="prokerala-layout-container">
            <div className="prokerala-main-grid">
              <section className="prokerala-content-col">
                {children}
              </section>
              <AstrologyRightSidebar layout="sidebar" />
            </div>
          </div>
        </main>
      )}

      <Footer />
      <ScrollToTopButton />
    </div>
  );
}

