import React, { useState } from 'react';
import { useNavigate, useLocation, Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../app/providers/AuthContext';
import SEOHead from '../../../components/common/SEOHead';
import Breadcrumbs from '../../../components/common/Breadcrumbs';
import { ROUTES } from '../../../config/routes.config';
import '../../../styles/userLogin.css';

export default function UserLoginPage() {
  const { t, i18n } = useTranslation(['auth', 'common']);
  const currentLang = i18n.language || 'ta';
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { login, register, resetPassword, isAuthenticated, user } = useAuth();

  const initialMode = ['register', 'forgot'].includes(searchParams.get('mode'))
    ? searchParams.get('mode')
    : 'login';
  const [authMode, setAuthMode] = useState(initialMode);

  // Form states
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Register form state
  const [regFullName, setRegFullName] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regMobileNumber, setRegMobileNumber] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regLanguage, setRegLanguage] = useState(currentLang);
  const [showRegPassword, setShowRegPassword] = useState(false);

  // Forgot password form state
  const [forgotUsername, setForgotUsername] = useState('');
  const [forgotVerify, setForgotVerify] = useState('');
  const [forgotPassword, setForgotPassword] = useState('');
  const [forgotConfirm, setForgotConfirm] = useState('');

  // UI state
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const redirectTarget = location.state?.from?.pathname || ROUTES.ACCOUNT;

  // If already authenticated, show redirect / welcome state
  if (isAuthenticated && user) {
    return (
      <div className="user-login-page-container">
        <SEOHead
          title={currentLang === 'ta' ? 'பயனர் உள்நுழைவு | Jothidam Portal' : 'User Account | Jothidam Portal'}
          description="Access your personal Jothidam account to analyze saved horoscopes and prasannam charts."
        />
        <div className="user-login-card authenticated-state">
          <div className="auth-user-badge-large">
            <span>🕉️</span>
          </div>
          <h2>{currentLang === 'ta' ? 'நீங்கள் ஏற்கனவே உள்நுழைந்துள்ளீர்கள்!' : 'You are already signed in!'}</h2>
          <p className="auth-user-desc">
            {currentLang === 'ta'
              ? `வணக்கம் ${user.fullName || user.username}, உங்கள் கணக்கு தயாராக உள்ளது.`
              : `Welcome ${user.fullName || user.username}, your account is active.`}
          </p>
          <div className="auth-user-actions">
            <Link to={ROUTES.ACCOUNT} className="btn-user-primary">
              {currentLang === 'ta' ? 'எனது கணக்கிற்கு செல்க' : 'Go to My Account'} →
            </Link>
            <Link to={ROUTES.HOME} className="btn-user-secondary">
              {currentLang === 'ta' ? 'ஜாதக கணிப்பிற்கு செல்க' : 'Go to Horoscope Calculator'}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleSwitchMode = (newMode) => {
    setAuthMode(newMode);
    setErrorMessage('');
    setSuccessMessage('');
    if (newMode === 'login') {
      searchParams.delete('mode');
      setSearchParams(searchParams, { replace: true });
    } else {
      setSearchParams({ mode: newMode }, { replace: true });
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      setErrorMessage(currentLang === 'ta' ? 'பயனர்பெயர் மற்றும் கடவுச்சொல் உள்ளிடவும்' : 'Please enter username and password');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    try {
      await login(username.trim(), password);
      navigate(redirectTarget, { replace: true });
    } catch (err) {
      setErrorMessage(err.message || (currentLang === 'ta' ? 'தவறான பயனர்பெயர் அல்லது கடவுச்சொல்' : 'Invalid username or password'));
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoLogin = async () => {
    setUsername('user');
    setPassword('User@123');
    setLoading(true);
    setErrorMessage('');
    try {
      await login('user', 'User@123');
      navigate(redirectTarget, { replace: true });
    } catch (err) {
      setErrorMessage(err.message || 'Demo login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!regFullName.trim() || !regUsername.trim() || !regPassword) {
      setErrorMessage(currentLang === 'ta' ? 'அனைத்து கட்டாய விவரங்களையும் நிரப்பவும்' : 'Please fill all required fields');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setErrorMessage(currentLang === 'ta' ? 'கடவுச்சொற்கள் பொருந்தவில்லை' : 'Passwords do not match');
      return;
    }
    if (regPassword.length < 6) {
      setErrorMessage(currentLang === 'ta' ? 'கடவுச்சொல் குறைந்தது 6 எழுத்துகள் இருக்க வேண்டும்' : 'Password must be at least 6 characters');
      return;
    }

    const cleanMobile = regMobileNumber.trim().replace(/[\s\-()]/g, '');
    const normalizedMobile = cleanMobile.replace(/^(\+91|91|0)/, '');
    if (!cleanMobile) {
      setErrorMessage(currentLang === 'ta' ? 'மொபைல் எண் கட்டாயமாகும்' : 'Mobile number is required');
      return;
    }
    if (!/^[6-9]\d{9}$/.test(normalizedMobile)) {
      setErrorMessage(currentLang === 'ta' ? 'சரியான 10 இலக்க மொபைல் எண்ணை உள்ளிடவும் (எ.கா: 9876543210)' : 'Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    try {
      await register({
        fullName: regFullName.trim(),
        username: regUsername.trim(),
        email: regEmail.trim(),
        mobileNumber: normalizedMobile,
        password: regPassword,
        confirmPassword: regConfirmPassword,
        preferredLanguage: regLanguage
      });
      navigate(redirectTarget, { replace: true });
    } catch (err) {
      setErrorMessage(err.message || (currentLang === 'ta' ? 'பதிவு செய்வதில் பிழை' : 'Registration failed'));
    } finally {
      setLoading(false);
    }
  };

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    if (!forgotUsername.trim() || !forgotPassword) {
      setErrorMessage(currentLang === 'ta' ? 'பயனர்பெயர் மற்றும் புதிய கடவுச்சொல் உள்ளிடவும்' : 'Please fill all fields');
      return;
    }
    if (forgotPassword !== forgotConfirm) {
      setErrorMessage(currentLang === 'ta' ? 'கடவுச்சொற்கள் பொருந்தவில்லை' : 'Passwords do not match');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    try {
      await resetPassword({
        username: forgotUsername.trim(),
        verifyDetail: forgotVerify.trim(),
        newPassword: forgotPassword,
        confirmPassword: forgotConfirm
      });
      setSuccessMessage(currentLang === 'ta' ? 'கடவுச்சொல் மாற்றப்பட்டது! இப்போது உள்நுழையவும்.' : 'Password reset successfully! You can now login.');
      setTimeout(() => {
        handleSwitchMode('login');
        setUsername(forgotUsername);
        setPassword('');
        setSuccessMessage('');
      }, 1500);
    } catch (err) {
      setErrorMessage(err.message || 'Password reset failed');
    } finally {
      setLoading(false);
    }
  };

  const breadcrumbs = [
    { label: currentLang === 'ta' ? 'முகப்பு' : 'Home', link: ROUTES.HOME },
    { label: currentLang === 'ta' ? 'பயனர் உள்நுழைவு' : 'User Login', active: true }
  ];

  return (
    <div className="user-login-page-container">
      <SEOHead
        title={currentLang === 'ta' ? 'பயனர் உள்நுழைவு & பதிவு | Jothidam Portal' : 'User Login & Account Registration | Jothidam Portal'}
        description="Login to your Jothidam personal account to save birth charts and prasannam horary records."
      />

      <Breadcrumbs items={breadcrumbs} />

      <div className="user-login-main-wrapper">
        {/* Left Side: Spiritual Benefits Banner */}
        <div className="user-login-benefits-side">
          <div className="spiritual-banner-badge">
            <span className="badge-symbol">🕉️</span>
            <span>{currentLang === 'ta' ? 'ஜோதிட பயனர் கணக்கு' : 'Personal Astrology Portal'}</span>
          </div>

          <h1 className="benefits-title">
            {currentLang === 'ta'
              ? 'உங்கள் ஜாதகங்கள் மற்றும் பிரசன்னங்களை எப்போது வேண்டுமானாலும் கணக்கிட்டு சேமிக்கவும்'
              : 'Save, Review & Analyze Your Horoscopes and Prasannam Charts Anytime'}
          </h1>

          <p className="benefits-subtitle">
            {currentLang === 'ta'
              ? 'ஜோதிட ஆர்வலர்கள் மற்றும் ஜோதிடர்களுக்கான பிரத்யேக வசதிகள். உங்கள் கணக்கில் அனைத்தும் பாதுகாப்பாக சேமிக்கப்படும்.'
              : 'Dedicated astrology tools for practitioners and seekers. Free, accurate, and permanently stored in your account.'}
          </p>

          <div className="benefits-features-list">
            <div className="benefit-item">
              <div className="benefit-icon">📜</div>
              <div className="benefit-text">
                <h4>{currentLang === 'ta' ? 'வரம்பற்ற ஜாதக சேமிப்பு' : 'Unlimited Horoscope Profiles'}</h4>
                <p>{currentLang === 'ta' ? 'குடும்பத்தினர் மற்றும் வாடிக்கையாளர்களின் ஜாதகங்களை பெயருடன் சேமிக்கலாம்.' : 'Save horoscopes with full birth planetary positions and D1/D9 charts.'}</p>
              </div>
            </div>

            <div className="benefit-item">
              <div className="benefit-icon">🧭</div>
              <div className="benefit-text">
                <h4>{currentLang === 'ta' ? 'பிரசன்ன வரைபடங்கள் சேமிப்பு' : 'Saved Prasannam Divination'}</h4>
                <p>{currentLang === 'ta' ? 'ஜாமக்கோள் மற்றும் கடிகார பிரசன்ன கேள்விகள் மற்றும் முடிவுகளை சேமிக்கலாம்.' : 'Store Jamakkol and Kadikara horary questions, pillars, and time logs.'}</p>
              </div>
            </div>

            <div className="benefit-item">
              <div className="benefit-icon">🔍</div>
              <div className="benefit-text">
                <h4>{currentLang === 'ta' ? 'ஒரே கிளிக்கில் உடனடி ஆய்வு' : 'Instant Re-analysis'}</h4>
                <p>{currentLang === 'ta' ? 'சேமிக்கப்பட்ட பதிவுகளை மீண்டும் கணிப்பான் பக்கத்திற்கு கொண்டு சென்று ஆய்வு செய்யலாம்.' : 'Load saved charts directly into calculators for in-depth chart reading.'}</p>
              </div>
            </div>
          </div>

          <div className="guru-blessing-pill">
            <span>🙏</span>
            <span>குரு வாழ்க, குருவே துணை — Sri Upendra Achariyar System</span>
          </div>
        </div>

        {/* Right Side: Login & Register Card */}
        <div className="user-login-form-side">
          <div className="user-auth-card">
            {/* Header Tabs */}
            <div className="user-auth-tabs-header">
              <button
                type="button"
                className={`user-auth-tab ${authMode === 'login' ? 'active' : ''}`}
                onClick={() => handleSwitchMode('login')}
              >
                {currentLang === 'ta' ? 'உள்நுழைவு' : 'Sign In'}
              </button>
              <button
                type="button"
                className={`user-auth-tab ${authMode === 'register' ? 'active' : ''}`}
                onClick={() => handleSwitchMode('register')}
              >
                {currentLang === 'ta' ? 'புதிய பதிவு' : 'Create Account'}
              </button>
            </div>

            {/* Alerts */}
            {errorMessage && (
              <div className="auth-alert error">
                <span>⚠️</span>
                <span>{errorMessage}</span>
              </div>
            )}
            {successMessage && (
              <div className="auth-alert success">
                <span>✅</span>
                <span>{successMessage}</span>
              </div>
            )}

            {/* 1. LOGIN FORM */}
            {authMode === 'login' && (
              <form onSubmit={handleLoginSubmit} className="user-login-form">
                <div className="form-field-group">
                  <label className="field-label">
                    {currentLang === 'ta' ? 'பயனர்பெயர் (Username)' : 'Username'}
                  </label>
                  <input
                    type="text"
                    className="field-input"
                    placeholder={currentLang === 'ta' ? 'உங்கள் பயனர்பெயர் (எ.கா: user)' : 'Enter username'}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoFocus
                    required
                  />
                </div>

                <div className="form-field-group">
                  <div className="field-label-row">
                    <label className="field-label">
                      {currentLang === 'ta' ? 'கடவுச்சொல் (Password)' : 'Password'}
                    </label>
                    <button
                      type="button"
                      className="field-forgot-link"
                      onClick={() => handleSwitchMode('forgot')}
                    >
                      {currentLang === 'ta' ? 'கடவுச்சொல் மறந்துவிட்டதா?' : 'Forgot password?'}
                    </button>
                  </div>
                  <div className="password-input-wrapper">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="field-input"
                      placeholder={currentLang === 'ta' ? 'கடவுச்சொல் உள்ளிடவும்' : 'Enter password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle-btn"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? '👁️' : '🔒'}
                    </button>
                  </div>
                </div>

                <button type="submit" className="btn-auth-submit" disabled={loading}>
                  {loading
                    ? (currentLang === 'ta' ? 'உள்நுழைகிறது...' : 'Signing In...')
                    : (currentLang === 'ta' ? 'கணக்கில் உள்நுழைக' : 'Sign In to Account')}
                </button>

                {/* One-Click Demo User */}
                <div className="quick-demo-login-box">
                  <span className="demo-label">{currentLang === 'ta' ? 'விரைவு சோதனைக்கு:' : 'Quick Demo Access:'}</span>
                  <button
                    type="button"
                    className="btn-demo-pill"
                    onClick={handleQuickDemoLogin}
                    disabled={loading}
                  >
                    ⚡ {currentLang === 'ta' ? 'மாதிரி பயனர் உள்நுழைவு (user)' : 'Standard User (user)'}
                  </button>
                </div>
              </form>
            )}

            {/* 2. REGISTER FORM */}
            {authMode === 'register' && (
              <form onSubmit={handleRegisterSubmit} className="user-login-form">
                <div className="form-field-group">
                  <label className="field-label">
                    {currentLang === 'ta' ? 'முழு பெயர் (Full Name) *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    className="field-input"
                    placeholder={currentLang === 'ta' ? 'உங்கள் முழு பெயர் (எ.கா: ராமநாதன்)' : 'e.g. Ramanathan K'}
                    value={regFullName}
                    onChange={(e) => setRegFullName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-field-group">
                  <label className="field-label">
                    {currentLang === 'ta' ? 'பயனர்பெயர் (Username) *' : 'Username *'}
                  </label>
                  <input
                    type="text"
                    className="field-input"
                    placeholder={currentLang === 'ta' ? 'பயனர்பெயர் (எ.கா: raman2026)' : 'Choose a unique username'}
                    value={regUsername}
                    onChange={(e) => setRegUsername(e.target.value)}
                    required
                  />
                </div>

                <div className="form-field-group">
                  <label className="field-label">
                    {currentLang === 'ta' ? 'மின்னஞ்சல் (Email)' : 'Email (Optional)'}
                  </label>
                  <input
                    type="email"
                    className="field-input"
                    placeholder={currentLang === 'ta' ? 'மின்னஞ்சல் முகவரி' : 'user@example.com'}
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                  />
                </div>

                <div className="form-field-group">
                  <label className="field-label">
                    {currentLang === 'ta' ? 'மொபைல் எண் (Mobile Number) *' : 'Mobile Number *'}
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                      padding: '10px 12px',
                      background: 'var(--bg-tertiary, #f1f5f9)',
                      border: '1px solid var(--border-color, #cbd5e1)',
                      borderRadius: '8px',
                      fontSize: '0.88rem',
                      fontWeight: 600,
                      color: 'var(--text-secondary, #64748b)'
                    }}>
                      🇮🇳 +91
                    </span>
                    <input
                      type="tel"
                      className="field-input"
                      style={{ flex: 1 }}
                      placeholder={currentLang === 'ta' ? '10 இலக்க மொபைல் எண் (எ.கா: 9876543210)' : '10-digit Mobile Number'}
                      value={regMobileNumber}
                      maxLength={10}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                        setRegMobileNumber(val);
                        if (val && !/^[6-9]/.test(val)) {
                          setMobileError(currentLang === 'ta' ? 'எண் 6, 7, 8 அல்லது 9 இல் தொடங்க வேண்டும்' : 'Must start with 6, 7, 8, or 9');
                        } else if (val && val.length < 10) {
                          setMobileError(currentLang === 'ta' ? `${val.length}/10 இலக்கங்கள்` : `${val.length}/10 digits`);
                        } else {
                          setMobileError('');
                        }
                      }}
                      required
                    />
                  </div>
                  {mobileError && (
                    <span style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '4px', display: 'block' }}>
                      {mobileError}
                    </span>
                  )}
                </div>

                <div className="form-row-dual">
                  <div className="form-field-group half">
                    <label className="field-label">
                      {currentLang === 'ta' ? 'கடவுச்சொல் *' : 'Password *'}
                    </label>
                    <div className="password-input-wrapper">
                      <input
                        type={showRegPassword ? 'text' : 'password'}
                        className="field-input"
                        placeholder="Min 6 chars"
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="password-toggle-btn"
                        onClick={() => setShowRegPassword(!showRegPassword)}
                      >
                        {showRegPassword ? '👁️' : '🔒'}
                      </button>
                    </div>
                  </div>

                  <div className="form-field-group half">
                    <label className="field-label">
                      {currentLang === 'ta' ? 'உறுதி செய்க *' : 'Confirm *'}
                    </label>
                    <input
                      type={showRegPassword ? 'text' : 'password'}
                      className="field-input"
                      placeholder="Repeat pwd"
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="btn-auth-submit register" disabled={loading}>
                  {loading
                    ? (currentLang === 'ta' ? 'கணக்கு உருவாகிறது...' : 'Creating Account...')
                    : (currentLang === 'ta' ? 'இலவச கணக்கை உருவாக்கு' : 'Create Free Account')}
                </button>
              </form>
            )}

            {/* 3. FORGOT PASSWORD */}
            {authMode === 'forgot' && (
              <form onSubmit={handleForgotSubmit} className="user-login-form">
                <div className="form-field-group">
                  <label className="field-label">
                    {currentLang === 'ta' ? 'பயனர்பெயர் (Username) *' : 'Username *'}
                  </label>
                  <input
                    type="text"
                    className="field-input"
                    placeholder="Enter registered username"
                    value={forgotUsername}
                    onChange={(e) => setForgotUsername(e.target.value)}
                    required
                  />
                </div>

                <div className="form-field-group">
                  <label className="field-label">
                    {currentLang === 'ta' ? 'பதிவு செய்யப்பட்ட மின்னஞ்சல் அல்லது பெயர்' : 'Registered Email or Full Name'}
                  </label>
                  <input
                    type="text"
                    className="field-input"
                    placeholder="Email or Full Name"
                    value={forgotVerify}
                    onChange={(e) => setForgotVerify(e.target.value)}
                  />
                </div>

                <div className="form-field-group">
                  <label className="field-label">
                    {currentLang === 'ta' ? 'புதிய கடவுச்சொல் *' : 'New Password *'}
                  </label>
                  <input
                    type="password"
                    className="field-input"
                    placeholder="New password (min 6 characters)"
                    value={forgotPassword}
                    onChange={(e) => setForgotPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="form-field-group">
                  <label className="field-label">
                    {currentLang === 'ta' ? 'புதிய கடவுச்சொல்லை உறுதி செய்க *' : 'Confirm New Password *'}
                  </label>
                  <input
                    type="password"
                    className="field-input"
                    placeholder="Confirm new password"
                    value={forgotConfirm}
                    onChange={(e) => setForgotConfirm(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="btn-auth-submit" disabled={loading}>
                  {loading
                    ? (currentLang === 'ta' ? 'மாற்றப்படுகிறது...' : 'Updating...')
                    : (currentLang === 'ta' ? 'கடவுச்சொல்லை மாற்றுக' : 'Reset Password')}
                </button>

                <button
                  type="button"
                  className="btn-back-link"
                  onClick={() => handleSwitchMode('login')}
                >
                  ← {currentLang === 'ta' ? 'உள்நுழைவுக்கு திரும்புக' : 'Back to Sign In'}
                </button>
              </form>
            )}

            {/* Distinction / Footer Notice */}
            <div className="user-login-distinction-footer">
              <div className="distinction-note">
                <span>🛡️</span>
                <span>
                  {currentLang === 'ta'
                    ? 'இது பொது பயனர்களுக்கான உள்நுழைவு பக்கம்.'
                    : 'This is the portal login for individual users and astrologers.'}
                </span>
              </div>
              <div className="admin-portal-link-row">
                <span>{currentLang === 'ta' ? 'நிர்வாக அதிகாரியா?' : 'System Administrator?'}</span>
                <Link to={ROUTES.ADMIN.LOGIN} className="admin-redirect-link">
                  {currentLang === 'ta' ? 'நிர்வாகி உள்நுழைவு (Admin Login) →' : 'Access Admin Portal →'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
