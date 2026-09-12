import React from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from './providers/AuthContext';

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const { user, isAuthenticated, loading, role, logout } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="auth-loading-screen">
        <div className="spinner"></div>
        <p>அங்கீகாரம் சரிபார்க்கப்படுகிறது (Verifying authentication)...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return (
      <div className="access-denied-container">
        <div className="access-denied-card">
          <div className="denied-icon">🚫</div>
          <h2 className="denied-title">அணுகல் அனுமதி இல்லை (Access Denied)</h2>
          <p className="denied-desc">
            இந்தப் பக்கத்தை அணுக உங்கள் கணக்கிற்கு ({user?.username} - <strong>{role?.toUpperCase()}</strong>) உரிய அனுமதி இல்லை.
          </p>
          <p className="denied-role-info">
            தேவையான பயனர் நிலை (Required Role): <strong>{allowedRoles.map(r => r.toUpperCase()).join(' அல்லது ')}</strong>
          </p>

          <div className="denied-actions">
            <Link to="/" className="admin-modal-btn cancel-btn" style={{ textDecoration: 'none' }}>
              முகப்புக்குச் செல்க (Home)
            </Link>
            <button
              type="button"
              onClick={logout}
              className="admin-modal-btn danger-btn"
            >
              வேறு கணக்கில் நுழைய (Switch Account)
            </button>
          </div>
        </div>
      </div>
    );
  }

  return children;
}
