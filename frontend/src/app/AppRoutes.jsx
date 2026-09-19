import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import { ROUTES, LEGACY_ROUTE_REDIRECTS } from '../config/routes.config';
import ProtectedRoute from './ProtectedRoute';
import ErrorBoundary from './ErrorBoundary';
import PageLoader from '../components/feedback/PageLoader';

// Dynamic route-level code splitting using React.lazy
const HoroscopeCalculatorPage = lazy(() => import('../features/horoscope/pages/HoroscopeCalculatorPage'));
const KadikaraPrasannamPage = lazy(() => import('../features/prasannam/pages/KadikaraPrasannamPage'));
const KPHoraryPage = lazy(() => import('../features/kp-astrology/pages/KPHoraryPage'));
const RasisPage = lazy(() => import('../features/zodiac-planets/pages/RasisPage'));
const NakshatrasPage = lazy(() => import('../features/zodiac-planets/pages/NakshatrasPage'));
const NakshatraPadasPage = lazy(() => import('../features/zodiac-planets/pages/NakshatraPadasPage'));
const PlanetsPage = lazy(() => import('../features/zodiac-planets/pages/PlanetsPage'));
const KalachakramPage = lazy(() => import('../features/zodiac-planets/pages/KalachakramPage'));
const TithisPage = lazy(() => import('../features/panchangam/pages/TithisPage'));
const YogasPage = lazy(() => import('../features/panchangam/pages/YogasPage'));
const KaranasPage = lazy(() => import('../features/panchangam/pages/KaranasPage'));
const TamilCalendarPage = lazy(() => import('../features/panchangam/pages/TamilCalendarPage'));
const SavedHoroscopesPage = lazy(() => import('../features/saved-horoscopes/pages/SavedHoroscopesPage'));
const SavedHoroscopeDetailPage = lazy(() => import('../features/saved-horoscopes/pages/SavedHoroscopeDetailPage'));
const AdminPage = lazy(() => import('../features/admin/pages/AdminPage'));
const AdminLoginPage = lazy(() => import('../features/auth/pages/AdminLoginPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

// Backward compatibility dynamic redirect for /saved/:id
function LegacySavedDetailRedirect() {
  const { id } = useParams();
  if (!id || id === ':id') {
    return <Navigate to={ROUTES.HOROSCOPE.SAVED} replace />;
  }
  return <Navigate to={ROUTES.HOROSCOPE.savedDetailPath(id)} replace />;
}

// Route guard to prevent literal ':id' or missing ID from reaching detail page
function SavedHoroscopeDetailGuard() {
  const { id } = useParams();
  if (!id || id === ':id') {
    return <Navigate to={ROUTES.HOROSCOPE.SAVED} replace />;
  }
  return <SavedHoroscopeDetailPage />;
}

export default function AppRoutes() {
  return (
    <ErrorBoundary name="RouteLevelBoundary">
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* =========================================================================
              1. MAIN HOROSCOPE & KUNDLI CALCULATOR
              ========================================================================= */}
          <Route path={ROUTES.HOME} element={<HoroscopeCalculatorPage />} />
          <Route path={ROUTES.HOROSCOPE.SAVED} element={<SavedHoroscopesPage />} />
          <Route path={ROUTES.HOROSCOPE.SAVED_DETAIL} element={<SavedHoroscopeDetailGuard />} />

          {/* =========================================================================
              2. HORARY PRASANNAM
              ========================================================================= */}
          <Route path={ROUTES.PRASANNAM.KADIKARA} element={<KadikaraPrasannamPage />} />

          {/* =========================================================================
              3. ZODIAC SIGNS & PLANETARY EPHEMERIS
              ========================================================================= */}
          <Route path={ROUTES.ZODIAC.RASIS} element={<RasisPage />} />
          <Route path={ROUTES.ZODIAC.NAKSHATRAS} element={<NakshatrasPage />} />
          <Route path={ROUTES.ZODIAC.NAKSHATRA_PADAS} element={<NakshatraPadasPage />} />
          <Route path={ROUTES.ZODIAC.PLANETS} element={<PlanetsPage />} />
          <Route path={ROUTES.ZODIAC.KALACHAKRAM} element={<KalachakramPage />} />

          {/* =========================================================================
              4. KRISHNAMURTI PADDHATI (KP) ASTROLOGY
              ========================================================================= */}
          <Route path={ROUTES.KP_ASTROLOGY.HORARY} element={<KPHoraryPage />} />

          {/* =========================================================================
              5. VEDIC PANCHANGAM ALMANAC
              ========================================================================= */}
          <Route path={ROUTES.PANCHANGAM.TITHIS} element={<TithisPage />} />
          <Route path={ROUTES.PANCHANGAM.YOGAS} element={<YogasPage />} />
          <Route path={ROUTES.PANCHANGAM.KARANAS} element={<KaranasPage />} />
          <Route path={ROUTES.PANCHANGAM.TAMIL_CALENDAR} element={<TamilCalendarPage />} />

          {/* =========================================================================
              6. ADMIN MANAGEMENT PANEL & AUTHENTICATION
              ========================================================================= */}
          <Route path={ROUTES.ADMIN.LOGIN} element={<AdminLoginPage />} />
          <Route
            path={ROUTES.ADMIN.DASHBOARD}
            element={
              <ProtectedRoute allowedRoles={['superadmin', 'admin']}>
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.ADMIN.TABLE}
            element={
              <ProtectedRoute allowedRoles={['superadmin', 'admin']}>
                <AdminPage />
              </ProtectedRoute>
            }
          />

          {/* =========================================================================
              7. BACKWARD-COMPATIBLE ROUTE REDIRECTS (Zero breaking changes)
              ========================================================================= */}
          <Route path="/saved/:id" element={<LegacySavedDetailRedirect />} />
          {LEGACY_ROUTE_REDIRECTS.map((rule) => (
            <Route
              key={rule.from}
              path={rule.from}
              element={<Navigate to={rule.to} replace />}
            />
          ))}

          {/* =========================================================================
              8. 404 NOT FOUND FALLBACK
              ========================================================================= */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}
