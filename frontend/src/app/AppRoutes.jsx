import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HoroscopeCalculatorPage from '../pages/HoroscopeCalculatorPage';
import SavedHoroscopesPage from '../pages/SavedHoroscopesPage';
import SavedHoroscopeDetailPage from '../pages/SavedHoroscopeDetailPage';
import RasisPage from '../pages/RasisPage';
import NakshatrasPage from '../pages/NakshatrasPage';
import NakshatraPadasPage from '../pages/NakshatraPadasPage';
import PlanetsPage from '../pages/PlanetsPage';
import KPHoraryPage from '../pages/KPHoraryPage';
import TithisPage from '../pages/TithisPage';
import YogasPage from '../pages/YogasPage';
import KaranasPage from '../pages/KaranasPage';
import KalachakramPage from '../pages/KalachakramPage';
import TamilCalendarPage from '../pages/TamilCalendarPage';
import KadikaraPrasannamPage from '../pages/KadikaraPrasannamPage';
import AdminPage from '../pages/AdminPage';
import AdminLoginPage from '../pages/AdminLoginPage';
import ProtectedRoute from './ProtectedRoute';
import NotFoundPage from '../pages/NotFoundPage';

export default function AppRoutes() {
  return (
    <Routes>
      {/* 1. Main Birth Chart Calculator */}
      <Route path="/" element={<HoroscopeCalculatorPage />} />

      {/* 2. Master Table Directory Pages */}
      <Route path="/rasis" element={<RasisPage />} />
      <Route path="/nakshatras" element={<NakshatrasPage />} />
      <Route path="/nakshatra-padas" element={<NakshatraPadasPage />} />
      <Route path="/planets" element={<PlanetsPage />} />
      <Route path="/kp-horary" element={<KPHoraryPage />} />
      <Route path="/tithis" element={<TithisPage />} />
      <Route path="/yogas" element={<YogasPage />} />
      <Route path="/karanas" element={<KaranasPage />} />
      <Route path="/kalachakram" element={<KalachakramPage />} />
      <Route path="/tamil-calendar" element={<TamilCalendarPage />} />

      {/* 2b. Prasannam Astrology Pages */}
      <Route path="/kadikara-prasannam" element={<KadikaraPrasannamPage />} />

      {/* 3. User Saved Horoscopes */}
      <Route path="/saved" element={<SavedHoroscopesPage />} />
      <Route path="/saved/:id" element={<SavedHoroscopeDetailPage />} />

      {/* 4. Admin Management Panel */}
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['superadmin', 'admin']}>
            <AdminPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/:table"
        element={
          <ProtectedRoute allowedRoles={['superadmin', 'admin']}>
            <AdminPage />
          </ProtectedRoute>
        }
      />

      {/* 5. Fallback 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
