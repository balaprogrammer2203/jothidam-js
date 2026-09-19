import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../app/providers/AuthContext';
import LanguageSelector from '../../../components/common/LanguageSelector';
import { isSafeRedirectUrl } from '../../../core/security/sanitizer';
import { ROUTES } from '../../../config/routes.config';

export default function AdminLoginPage() {
  const { t, i18n } = useTranslation(['auth', 'common', 'admin']);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { login, register, resetPassword, isAuthenticated, user, logout } = useAuth();

  // Mode: 'login' | 'register' | 'forgot'
  const initialMode = ['register', 'forgot'].includes(searchParams.get('mode'))
    ? searchParams.get('mode')
    : 'login';
  const [authMode, setAuthMode] = useState(initialMode);

  // Login form state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Register form state
  const [regFullName, setRegFullName] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regLanguage, setRegLanguage] = useState(i18n.language || 'ta');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [showRegConfirmPassword, setShowRegConfirmPassword] = useState(false);

  // Forgot / Reset password state
  const [forgotUsername, setForgotUsername] = useState('');
  const [forgotVerifyDetail, setForgotVerifyDetail] = useState('');
  const [forgotNewPassword, setForgotNewPassword] = useState('');
  const [forgotConfirmPassword, setForgotConfirmPassword] = useState('');
  const [showForgotNewPassword, setShowForgotNewPassword] = useState(false);
  const [showForgotConfirmPassword, setShowForgotConfirmPassword] = useState(false);

  // UI state
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedDemoRole, setSelectedDemoRole] = useState(null);

  const from = location.state?.from?.pathname || '/admin';

  // Sync mode changes with URL search params
  const handleSwitchMode = (newMode) => {
    setAuthMode(newMode);
    setErrorMessage('');
    setSuccessMessage('');
    setSelectedDemoRole(null);
    if (newMode === 'login') {
      searchParams.delete('mode');
      setSearchParams(searchParams, { replace: true });
    } else {
      setSearchParams({ mode: newMode }, { replace: true });
    }
  };

  const DEMO_ROLES = [
    {
      role: 'superadmin',
      label: t('admin:permissions.roles.superadmin', 'Super Administrator'),
      badge: 'SUPERADMIN',
      icon: '👑',
      badgeClass: 'superadmin-badge',
      cardClass: 'demo-card-superadmin',
      username: 'superadmin',
      pass: 'Admin@123',
      desc: t('auth:demoRoleSuperadminDesc', 'Full RBAC & CRUD Privileges')
    },
    {
      role: 'admin',
      label: t('admin:permissions.roles.admin', 'System Administrator'),
      badge: 'ADMIN',
      icon: '🛡️',
      badgeClass: 'admin-badge',
      cardClass: 'demo-card-admin',
      username: 'admin',
      pass: 'Admin@123',
      desc: t('auth:demoRoleAdminDesc', 'Master Tables & Data Editor')
    },
    {
      role: 'user',
      label: t('admin:permissions.roles.user', 'Standard User'),
      badge: 'USER',
      icon: '👤',
      badgeClass: 'user-badge',
      cardClass: 'demo-card-user',
      username: 'user',
      pass: 'User@123',
      desc: t('auth:demoRoleUserDesc', 'View & Horoscope Calculation')
    }
  ];

  // 1. Handle Login Submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setLoading(true);

    try {
      await login(username, password);
      navigate(from, { replace: true });
    } catch (err) {
      setErrorMessage(err.message || t('auth:invalidCredentials', 'Login failed.'));
    } finally {
      setLoading(false);
    }
  };

  // 2. Handle Register Submit
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!regFullName.trim() || !regUsername.trim() || !regPassword) {
      setErrorMessage(t('auth:requiredFields', 'Please fill in all required fields.'));
      return;
    }

    if (regPassword.length < 6) {
      setErrorMessage(t('auth:passwordTooShort', 'Password must be at least 6 characters long.'));
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setErrorMessage(t('auth:passwordMismatch', 'Passwords do not match. Please re-enter carefully.'));
      return;
    }

    setLoading(true);

    try {
      const data = await register({
        fullName: regFullName.trim(),
        username: regUsername.trim(),
        email: regEmail.trim(),
        password: regPassword,
        confirmPassword: regConfirmPassword,
        preferredLanguage: regLanguage
      });

      setSuccessMessage(t('auth:registerSuccess', 'Account created successfully! Redirecting...'));
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 1000);
    } catch (err) {
      setErrorMessage(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // 3. Handle Reset / Forgot Password Submit
  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!forgotUsername.trim() || !forgotNewPassword) {
      setErrorMessage(t('auth:requiredFields', 'Please fill in all required fields.'));
      return;
    }

    if (forgotNewPassword.length < 6) {
      setErrorMessage(t('auth:passwordTooShort', 'Password must be at least 6 characters long.'));
      return;
    }

    if (forgotNewPassword !== forgotConfirmPassword) {
      setErrorMessage(t('auth:passwordMismatch', 'Passwords do not match. Please re-enter carefully.'));
      return;
    }

    setLoading(true);

    try {
      const res = await resetPassword({
        username: forgotUsername.trim(),
        verifyDetail: forgotVerifyDetail.trim(),
        newPassword: forgotNewPassword,
        confirmPassword: forgotConfirmPassword
      });

      setSuccessMessage(res.message || t('auth:resetSuccess', 'Password reset successfully! You can now sign in.'));
      // Pre-fill login username
      setUsername(forgotUsername.trim());
      setPassword('');
      // Switch to login mode after a brief moment
      setTimeout(() => {
        handleSwitchMode('login');
      }, 1500);
    } catch (err) {
      setErrorMessage(err.message || 'Password reset failed. Please check your details.');
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = (demo) => {
    if (authMode !== 'login') {
      setAuthMode('login');
    }
    setUsername(demo.username);
    setPassword(demo.pass);
    setSelectedDemoRole(demo.role);
    setErrorMessage('');
    setSuccessMessage('');
  };

  return (
    <div className="admin-login-page">
      <div className="login-backdrop-glow"></div>

      <div className="login-container-box">
        {/* Top Navbar in Login Box */}
        <div className="login-top-bar">
          <Link to="/" className="login-back-link">
            ← {t('common:nav.home', 'Home')}
          </Link>
          <LanguageSelector variant="compact" />
        </div>

        {/* Header Branding */}
        <div className="login-header">
          <div className="login-logo-circle">
            <span className="login-om-symbol">🕉️</span>
          </div>
          <h2 className="login-title">
            {authMode === 'register' && t('auth:registerTitle', 'Create New Account')}
            {authMode === 'forgot' && t('auth:forgotPasswordTitle', 'Reset Password')}
            {authMode === 'login' && t('auth:loginTitle', 'Admin Authentication')}
          </h2>
          <span className="login-subtitle">
            {authMode === 'register' && t('auth:registerSubtitle', 'Register to access Vedic Astrology Calculations & Reports')}
            {authMode === 'forgot' && t('auth:forgotPasswordSubtitle', 'Enter your username and verification details to set a new password')}
            {authMode === 'login' && t('auth:loginSubtitle', 'Access the Vedic Astrology Administration Panel')}
          </span>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="auth-mode-tabs" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={authMode === 'login'}
            className={`auth-mode-tab-btn ${authMode === 'login' ? 'active' : ''}`}
            onClick={() => handleSwitchMode('login')}
            title={t('auth:signInTab', 'Sign In')}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <polyline points="10 17 15 12 10 7" />
              <line x1="15" y1="12" x2="3" y2="12" />
            </svg>
            <span>{t('auth:signInTab', 'Sign In')}</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={authMode === 'register'}
            className={`auth-mode-tab-btn ${authMode === 'register' ? 'active' : ''}`}
            onClick={() => handleSwitchMode('register')}
            title={t('auth:registerTab', 'Register')}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="8.5" cy="7" r="4" />
              <line x1="20" y1="8" x2="20" y2="14" />
              <line x1="23" y1="11" x2="17" y2="11" />
            </svg>
            <span>{t('auth:registerTab', 'Register')}</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={authMode === 'forgot'}
            className={`auth-mode-tab-btn ${authMode === 'forgot' ? 'active' : ''}`}
            onClick={() => handleSwitchMode('forgot')}
            title={t('auth:forgotTab', 'Reset Password')}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 9.9-1" />
            </svg>
            <span>{t('auth:forgotTab', 'Reset Password')}</span>
          </button>
        </div>

        {/* Already Logged-in Status Banner */}
        {isAuthenticated && user && (
          <div className="already-logged-in-banner">
            <div className="logged-in-info">
              <span className="logged-in-dot"></span>
              <span>
                Signed in as <strong>{user.fullName || user.username}</strong> ({user.role?.toUpperCase()})
              </span>
            </div>
            <div className="banner-actions">
              <Link to="/admin" className="banner-continue-link">
                Go to Admin →
              </Link>
              <button type="button" onClick={logout} className="banner-logout-link">
                {t('common:nav.logout', 'Logout')}
              </button>
            </div>
          </div>
        )}

        {/* Error Notification Alert */}
        {errorMessage && (
          <div className="login-error-alert">
            <svg
              className="error-alert-icon"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Success Notification Alert */}
        {successMessage && (
          <div className="login-success-alert">
            <svg
              className="success-alert-icon"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <span>{successMessage}</span>
          </div>
        )}

        {/* =========================================================
            VIEW 1: SIGN IN FORM
           ========================================================= */}
        {authMode === 'login' && (
          <>
            <form onSubmit={handleLoginSubmit} className="login-form">
              <div className="login-form-group">
                <label className="login-form-label">
                  {t('auth:username', 'Username')} <span className="req-star">*</span>
                </label>
                <div className="login-input-wrapper">
                  <span className="login-input-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    className="login-form-input"
                    placeholder={t('auth:usernamePlaceholder', 'Enter admin username...')}
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      setSelectedDemoRole(null);
                    }}
                    required
                    autoComplete="username"
                  />
                </div>
              </div>

              <div className="login-form-group">
                <div className="login-label-with-action">
                  <label className="login-form-label">
                    {t('auth:password', 'Password')} <span className="req-star">*</span>
                  </label>
                  <button
                    type="button"
                    className="forgot-password-trigger-link"
                    onClick={() => handleSwitchMode('forgot')}
                  >
                    {t('auth:forgotPasswordLink', 'Forgot Password?')}
                  </button>
                </div>
                <div className="login-input-wrapper">
                  <span className="login-input-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="login-form-input password-input"
                    placeholder={t('auth:passwordPlaceholder', 'Enter password...')}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setSelectedDemoRole(null);
                    }}
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="toggle-password-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="login-submit-btn"
                disabled={loading}
              >
                {loading ? (
                  <span className="btn-loading-content">
                    <span className="mini-spinner"></span>
                    <span>{t('auth:loggingIn', 'Signing In...')}</span>
                  </span>
                ) : (
                  <span>{t('auth:loginButton', 'Sign In')} →</span>
                )}
              </button>
            </form>

            {/* Quick Link to Register */}
            <div className="auth-switch-cta-box">
              <span className="auth-switch-text">{t('auth:dontHaveAccount', "Don't have an account?")}</span>
              <button
                type="button"
                className="auth-switch-btn-link"
                onClick={() => handleSwitchMode('register')}
              >
                {t('auth:registerHere', 'Register New User')} →
              </button>
            </div>

            {/* Modern Interactive Quick Demo Roles List */}
            <div className="demo-accounts-section">
              <div className="demo-section-header-box">
                <span className="demo-section-title">
                  ⚡ {t('auth:demoTitle', 'Quick Demo Accounts')}
                </span>
                <span className="demo-section-sub">
                  {t('auth:demoSubtitle', 'Click any role below to autofill credentials')}
                </span>
              </div>

              <div className="demo-roles-list">
                {DEMO_ROLES.map((demo) => {
                  const isSelected = selectedDemoRole === demo.role;
                  return (
                    <button
                      key={demo.role}
                      type="button"
                      onClick={() => handleFillDemo(demo)}
                      className={`demo-role-row-btn ${demo.cardClass} ${isSelected ? 'active-selected' : ''}`}
                      title={`${t('auth:demoFill', 'Autofill')} ${demo.label}`}
                    >
                      <div className="demo-role-row-left">
                        <div className={`demo-role-icon-box ${demo.badgeClass}`}>
                          <span>{demo.icon}</span>
                        </div>
                        <div className="demo-role-row-info">
                          <div className="demo-role-row-headline">
                            <span className="demo-role-title">{demo.label}</span>
                            <span className={`demo-role-badge ${demo.badgeClass}`}>{demo.badge}</span>
                          </div>
                          <div className="demo-role-row-creds">
                            <span className="demo-cred-label">{t('auth:username', 'Username')}:</span>
                            <code>{demo.username}</code>
                            <span className="demo-cred-dot">•</span>
                            <span className="demo-cred-hint">{demo.desc}</span>
                          </div>
                        </div>
                      </div>
                      <div className="demo-role-row-right">
                        {isSelected ? (
                          <span className="demo-applied-tag">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            {t('auth:demoApplied', 'Applied')}
                          </span>
                        ) : (
                          <span className="demo-fill-btn-tag">
                            {t('auth:demoFill', 'Autofill')} ⚡
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* =========================================================
            VIEW 2: REGISTER NEW USER FORM
           ========================================================= */}
        {authMode === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="login-form register-form">
            <div className="login-form-group">
              <label className="login-form-label">
                {t('auth:fullName', 'Full Name')} <span className="req-star">*</span>
              </label>
              <div className="login-input-wrapper">
                <span className="login-input-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </span>
                <input
                  type="text"
                  className="login-form-input"
                  placeholder={t('auth:fullNamePlaceholder', 'Enter your full name...')}
                  value={regFullName}
                  onChange={(e) => setRegFullName(e.target.value)}
                  required
                  autoComplete="name"
                />
              </div>
            </div>

            <div className="login-form-group">
              <label className="login-form-label">
                {t('auth:username', 'Username')} <span className="req-star">*</span>
              </label>
              <div className="login-input-wrapper">
                <span className="login-input-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" />
                  </svg>
                </span>
                <input
                  type="text"
                  className="login-form-input"
                  placeholder={t('auth:usernamePlaceholder', 'Enter desired username...')}
                  value={regUsername}
                  onChange={(e) => setRegUsername(e.target.value)}
                  required
                  autoComplete="username"
                />
              </div>
            </div>

            <div className="login-form-group">
              <label className="login-form-label">
                {t('auth:email', 'Email Address (Optional)')}
              </label>
              <div className="login-input-wrapper">
                <span className="login-input-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </span>
                <input
                  type="email"
                  className="login-form-input"
                  placeholder={t('auth:emailPlaceholder', 'Enter email address...')}
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="login-form-group">
              <label className="login-form-label">
                {t('auth:preferredLanguage', 'Preferred Language')}
              </label>
              <div className="login-input-wrapper">
                <span className="login-input-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </span>
                <select
                  className="login-form-input login-select-input"
                  value={regLanguage}
                  onChange={(e) => setRegLanguage(e.target.value)}
                >
                  <option value="ta">தமிழ் (Tamil)</option>
                  <option value="en">English</option>
                  <option value="te">తెలుగు (Telugu)</option>
                  <option value="kn">ಕನ್ನಡ (Kannada)</option>
                  <option value="ml">മലയാളം (Malayalam)</option>
                  <option value="hi">हिन्दी (Hindi)</option>
                </select>
              </div>
            </div>

            <div className="login-form-group">
              <label className="login-form-label">
                {t('auth:password', 'Password')} <span className="req-star">*</span>
              </label>
              <div className="login-input-wrapper">
                <span className="login-input-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <input
                  type={showRegPassword ? 'text' : 'password'}
                  className="login-form-input password-input"
                  placeholder={t('auth:passwordPlaceholder', 'Minimum 6 characters...')}
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="toggle-password-btn"
                  onClick={() => setShowRegPassword(!showRegPassword)}
                  title={showRegPassword ? 'Hide password' : 'Show password'}
                >
                  {showRegPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="login-form-group">
              <label className="login-form-label">
                {t('auth:confirmPassword', 'Confirm Password')} <span className="req-star">*</span>
              </label>
              <div className="login-input-wrapper">
                <span className="login-input-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <input
                  type={showRegConfirmPassword ? 'text' : 'password'}
                  className="login-form-input password-input"
                  placeholder={t('auth:confirmPasswordPlaceholder', 'Re-enter password...')}
                  value={regConfirmPassword}
                  onChange={(e) => setRegConfirmPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="toggle-password-btn"
                  onClick={() => setShowRegConfirmPassword(!showRegConfirmPassword)}
                  title={showRegConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showRegConfirmPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="login-submit-btn"
              disabled={loading}
            >
              {loading ? (
                <span className="btn-loading-content">
                  <span className="mini-spinner"></span>
                  <span>{t('auth:registering', 'Creating Account...')}</span>
                </span>
              ) : (
                <span>{t('auth:registerButton', 'Create Account')} ✨</span>
              )}
            </button>

            {/* Back to Sign In Link */}
            <div className="auth-switch-cta-box">
              <span className="auth-switch-text">{t('auth:alreadyHaveAccount', 'Already have an account?')}</span>
              <button
                type="button"
                className="auth-switch-btn-link"
                onClick={() => handleSwitchMode('login')}
              >
                ← {t('auth:signInHere', 'Sign In')}
              </button>
            </div>
          </form>
        )}

        {/* =========================================================
            VIEW 3: FORGOT / RESET PASSWORD FORM
           ========================================================= */}
        {authMode === 'forgot' && (
          <form onSubmit={handleResetPasswordSubmit} className="login-form forgot-form">
            <div className="login-form-group">
              <label className="login-form-label">
                {t('auth:username', 'Username')} <span className="req-star">*</span>
              </label>
              <div className="login-input-wrapper">
                <span className="login-input-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </span>
                <input
                  type="text"
                  className="login-form-input"
                  placeholder={t('auth:usernamePlaceholder', 'Enter your registered username...')}
                  value={forgotUsername}
                  onChange={(e) => setForgotUsername(e.target.value)}
                  required
                  autoComplete="username"
                />
              </div>
            </div>

            <div className="login-form-group">
              <label className="login-form-label">
                {t('auth:verifyIdentity', 'Verification Detail (Email or Full Name)')}
              </label>
              <div className="login-input-wrapper">
                <span className="login-input-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </span>
                <input
                  type="text"
                  className="login-form-input"
                  placeholder={t('auth:verifyIdentityPlaceholder', 'Enter registered email or full name...')}
                  value={forgotVerifyDetail}
                  onChange={(e) => setForgotVerifyDetail(e.target.value)}
                />
              </div>
            </div>

            <div className="login-form-group">
              <label className="login-form-label">
                {t('auth:newPassword', 'New Password')} <span className="req-star">*</span>
              </label>
              <div className="login-input-wrapper">
                <span className="login-input-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <input
                  type={showForgotNewPassword ? 'text' : 'password'}
                  className="login-form-input password-input"
                  placeholder={t('auth:newPasswordPlaceholder', 'Enter new password (min. 6 chars)...')}
                  value={forgotNewPassword}
                  onChange={(e) => setForgotNewPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="toggle-password-btn"
                  onClick={() => setShowForgotNewPassword(!showForgotNewPassword)}
                  title={showForgotNewPassword ? 'Hide password' : 'Show password'}
                >
                  {showForgotNewPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="login-form-group">
              <label className="login-form-label">
                {t('auth:confirmNewPassword', 'Confirm New Password')} <span className="req-star">*</span>
              </label>
              <div className="login-input-wrapper">
                <span className="login-input-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <input
                  type={showForgotConfirmPassword ? 'text' : 'password'}
                  className="login-form-input password-input"
                  placeholder={t('auth:confirmNewPasswordPlaceholder', 'Re-enter new password...')}
                  value={forgotConfirmPassword}
                  onChange={(e) => setForgotConfirmPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="toggle-password-btn"
                  onClick={() => setShowForgotConfirmPassword(!showForgotConfirmPassword)}
                  title={showForgotConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showForgotConfirmPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="login-submit-btn"
              disabled={loading}
            >
              {loading ? (
                <span className="btn-loading-content">
                  <span className="mini-spinner"></span>
                  <span>{t('auth:resettingPassword', 'Updating Password...')}</span>
                </span>
              ) : (
                <span>{t('auth:resetPasswordButton', 'Reset Password')} 🔑</span>
              )}
            </button>

            {/* Back to Sign In Link */}
            <div className="auth-switch-cta-box">
              <button
                type="button"
                className="auth-switch-btn-link"
                onClick={() => handleSwitchMode('login')}
              >
                ← {t('auth:backToLogin', 'Back to Sign In')}
              </button>
            </div>
          </form>
        )}

        {/* Footer Navigation */}
        <div className="login-footer-nav">
          <Link to="/" className="login-home-link">
            ← {t('common:nav.home', 'Back to Public Horoscope Calculator')}
          </Link>
        </div>
      </div>
    </div>
  );
}
