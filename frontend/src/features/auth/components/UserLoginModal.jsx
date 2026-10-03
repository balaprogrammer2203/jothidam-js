import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../app/providers/AuthContext';
import '../../../styles/authModal.css';

export default function UserLoginModal({
  isOpen,
  onClose,
  onSuccess,
  title,
  subtitle
}) {
  const { t, i18n } = useTranslation(['auth', 'common']);
  const currentLang = i18n.language || 'ta';
  const { login, register, resetPassword } = useAuth();

  const [mode, setMode] = useState('login'); // 'login' | 'register' | 'forgot'
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Login inputs
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Register inputs
  const [regFullName, setRegFullName] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regMobileNumber, setRegMobileNumber] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regLanguage, setRegLanguage] = useState(currentLang);
  const [showRegPassword, setShowRegPassword] = useState(false);

  // Forgot password inputs
  const [forgotUsername, setForgotUsername] = useState('');
  const [forgotVerify, setForgotVerify] = useState('');
  const [forgotPassword, setForgotPassword] = useState('');
  const [forgotConfirm, setForgotConfirm] = useState('');

  if (!isOpen) return null;

  const handleClose = () => {
    setErrorMessage('');
    setSuccessMessage('');
    onClose?.();
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
      const res = await login(username.trim(), password);
      setSuccessMessage(currentLang === 'ta' ? 'உள்நுழைவு வெற்றிகரமானது!' : 'Login successful!');
      setTimeout(() => {
        onSuccess?.(res?.user);
        handleClose();
      }, 500);
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
      const res = await login('user', 'User@123');
      setSuccessMessage(currentLang === 'ta' ? 'மாதிரி பயனர் உள்நுழைவு வெற்றிகரமானது!' : 'Demo user login successful!');
      setTimeout(() => {
        onSuccess?.(res?.user);
        handleClose();
      }, 500);
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
      const res = await register({
        fullName: regFullName.trim(),
        username: regUsername.trim(),
        email: regEmail.trim(),
        mobileNumber: normalizedMobile,
        password: regPassword,
        confirmPassword: regConfirmPassword,
        preferredLanguage: regLanguage
      });
      setSuccessMessage(currentLang === 'ta' ? 'கணக்கு வெற்றிகரமாக உருவாக்கப்பட்டது!' : 'Account registered successfully!');
      setTimeout(() => {
        onSuccess?.(res?.user);
        handleClose();
      }, 600);
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
        setMode('login');
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

  return (
    <div className="auth-modal-overlay" onClick={handleClose} role="dialog" aria-modal="true">
      <div className="auth-modal-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Modal Close Button */}
        <button type="button" className="auth-modal-close-btn" onClick={handleClose} aria-label="Close">
          ✕
        </button>

        {/* Modal Header */}
        <div className="auth-modal-header">
          <div className="auth-modal-icon-badge">
            <span>🕉️</span>
          </div>
          <h3 className="auth-modal-title">
            {title || (mode === 'login'
              ? (currentLang === 'ta' ? 'ஜாதகத்தை சேமிக்க உள்நுழையவும்' : 'Sign In to Save Horoscope')
              : mode === 'register'
              ? (currentLang === 'ta' ? 'இலவச கணக்கை உருவாக்கவும்' : 'Create Free Account')
              : (currentLang === 'ta' ? 'கடவுச்சொல்லை மீட்டமைக்கவும்' : 'Reset Password'))}
          </h3>
          <p className="auth-modal-subtitle">
            {subtitle || (currentLang === 'ta'
              ? 'உங்கள் கணக்கில் ஜாதகங்கள் மற்றும் பிரசன்ன வரைபடங்களை பாதுகாப்பாக சேமித்து எப்போது வேண்டுமானாலும் பார்க்கவும்.'
              : 'Save horoscopes and prasannam charts securely to your account for future reference and analysis.')}
          </p>
        </div>

        {/* Alerts */}
        {errorMessage && (
          <div className="auth-modal-alert error">
            <span>⚠️</span>
            <span>{errorMessage}</span>
          </div>
        )}
        {successMessage && (
          <div className="auth-modal-alert success">
            <span>✅</span>
            <span>{successMessage}</span>
          </div>
        )}

        {/* Tabs */}
        <div className="auth-modal-tabs">
          <button
            type="button"
            className={`auth-modal-tab ${mode === 'login' ? 'active' : ''}`}
            onClick={() => { setMode('login'); setErrorMessage(''); setSuccessMessage(''); }}
          >
            {currentLang === 'ta' ? 'உள்நுழைவு (Sign In)' : 'Sign In'}
          </button>
          <button
            type="button"
            className={`auth-modal-tab ${mode === 'register' ? 'active' : ''}`}
            onClick={() => { setMode('register'); setErrorMessage(''); setSuccessMessage(''); }}
          >
            {currentLang === 'ta' ? 'புதிய பதிவு (Register)' : 'New Register'}
          </button>
        </div>

        {/* 1. LOGIN FORM */}
        {mode === 'login' && (
          <form onSubmit={handleLoginSubmit} className="auth-modal-form">
            <div className="auth-modal-input-group">
              <label className="auth-modal-label">
                {currentLang === 'ta' ? 'பயனர்பெயர் (Username)' : 'Username'}
              </label>
              <input
                type="text"
                className="auth-modal-input"
                placeholder={currentLang === 'ta' ? 'உங்கள் பயனர்பெயர் (எ.கா: user)' : 'Enter username (e.g. user)'}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoFocus
                required
              />
            </div>

            <div className="auth-modal-input-group">
              <div className="auth-modal-label-row">
                <label className="auth-modal-label">
                  {currentLang === 'ta' ? 'கடவுச்சொல் (Password)' : 'Password'}
                </label>
                <button
                  type="button"
                  className="auth-modal-forgot-link"
                  onClick={() => { setMode('forgot'); setErrorMessage(''); setSuccessMessage(''); }}
                >
                  {currentLang === 'ta' ? 'மறந்துவிட்டதா?' : 'Forgot password?'}
                </button>
              </div>
              <div className="auth-modal-password-wrap">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="auth-modal-input"
                  placeholder={currentLang === 'ta' ? 'கடவுச்சொல் உள்ளிடவும்' : 'Enter password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="auth-modal-pwd-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '👁️' : '🔒'}
                </button>
              </div>
            </div>

            <button type="submit" className="auth-modal-submit-btn" disabled={loading}>
              {loading ? (currentLang === 'ta' ? 'உள்நுழைகிறது...' : 'Signing In...') : (currentLang === 'ta' ? 'உள்நுழைந்து சேமிக்கவும்' : 'Sign In & Save')}
            </button>

            {/* Quick Demo Login Option */}
            <div className="auth-modal-demo-row">
              <span className="auth-modal-demo-text">
                {currentLang === 'ta' ? 'சோதனை செய்ய:' : 'Quick Test:'}
              </span>
              <button
                type="button"
                className="auth-modal-demo-pill"
                onClick={handleQuickDemoLogin}
                disabled={loading}
              >
                ⚡ {currentLang === 'ta' ? 'மாதிரி பயனர் உள்நுழைவு (user)' : 'One-Click Demo User'}
              </button>
            </div>
          </form>
        )}

        {/* 2. REGISTER FORM */}
        {mode === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="auth-modal-form">
            <div className="auth-modal-input-group">
              <label className="auth-modal-label">
                {currentLang === 'ta' ? 'முழு பெயர் (Full Name) *' : 'Full Name *'}
              </label>
              <input
                type="text"
                className="auth-modal-input"
                placeholder={currentLang === 'ta' ? 'உங்கள் முழு பெயர் (எ.கா: ராமநாதன்)' : 'e.g. Ramanathan'}
                value={regFullName}
                onChange={(e) => setRegFullName(e.target.value)}
                required
              />
            </div>

            <div className="auth-modal-input-group">
              <label className="auth-modal-label">
                {currentLang === 'ta' ? 'பயனர்பெயர் (Username) *' : 'Username *'}
              </label>
              <input
                type="text"
                className="auth-modal-input"
                placeholder={currentLang === 'ta' ? 'பயனர்பெயர் (எ.கா: raman2026)' : 'Choose username'}
                value={regUsername}
                onChange={(e) => setRegUsername(e.target.value)}
                required
              />
            </div>

            <div className="auth-modal-input-group">
              <label className="auth-modal-label">
                {currentLang === 'ta' ? 'மின்னஞ்சல் (Email)' : 'Email (Optional)'}
              </label>
              <input
                type="email"
                className="auth-modal-input"
                placeholder={currentLang === 'ta' ? 'மின்னஞ்சல் முகவரி' : 'yourname@example.com'}
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
              />
            </div>

            <div className="auth-modal-input-group">
              <label className="auth-modal-label">
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
                  className="auth-modal-input"
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

            <div className="auth-modal-form-row">
              <div className="auth-modal-input-group half">
                <label className="auth-modal-label">
                  {currentLang === 'ta' ? 'கடவுச்சொல் *' : 'Password *'}
                </label>
                <div className="auth-modal-password-wrap">
                  <input
                    type={showRegPassword ? 'text' : 'password'}
                    className="auth-modal-input"
                    placeholder="Min 6 chars"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="auth-modal-pwd-toggle"
                    onClick={() => setShowRegPassword(!showRegPassword)}
                  >
                    {showRegPassword ? '👁️' : '🔒'}
                  </button>
                </div>
              </div>

              <div className="auth-modal-input-group half">
                <label className="auth-modal-label">
                  {currentLang === 'ta' ? 'உறுதி செய்க *' : 'Confirm *'}
                </label>
                <input
                  type={showRegPassword ? 'text' : 'password'}
                  className="auth-modal-input"
                  placeholder="Repeat pwd"
                  value={regConfirmPassword}
                  onChange={(e) => setRegConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="auth-modal-submit-btn register" disabled={loading}>
              {loading ? (currentLang === 'ta' ? 'பதிவாகிறது...' : 'Creating Account...') : (currentLang === 'ta' ? 'கணக்கு உருவாக்கி சேமிக்கவும்' : 'Register & Save')}
            </button>
          </form>
        )}

        {/* 3. FORGOT PASSWORD FORM */}
        {mode === 'forgot' && (
          <form onSubmit={handleForgotSubmit} className="auth-modal-form">
            <div className="auth-modal-input-group">
              <label className="auth-modal-label">
                {currentLang === 'ta' ? 'பயனர்பெயர் (Username) *' : 'Username *'}
              </label>
              <input
                type="text"
                className="auth-modal-input"
                placeholder="Enter username"
                value={forgotUsername}
                onChange={(e) => setForgotUsername(e.target.value)}
                required
              />
            </div>

            <div className="auth-modal-input-group">
              <label className="auth-modal-label">
                {currentLang === 'ta' ? 'சரிபார்ப்பு மின்னஞ்சல் அல்லது பெயர்' : 'Email or Full Name Verification'}
              </label>
              <input
                type="text"
                className="auth-modal-input"
                placeholder="Registered email or name"
                value={forgotVerify}
                onChange={(e) => setForgotVerify(e.target.value)}
              />
            </div>

            <div className="auth-modal-input-group">
              <label className="auth-modal-label">
                {currentLang === 'ta' ? 'புதிய கடவுச்சொல் *' : 'New Password *'}
              </label>
              <input
                type="password"
                className="auth-modal-input"
                placeholder="New password (min 6 chars)"
                value={forgotPassword}
                onChange={(e) => setForgotPassword(e.target.value)}
                required
              />
            </div>

            <div className="auth-modal-input-group">
              <label className="auth-modal-label">
                {currentLang === 'ta' ? 'புதிய கடவுச்சொல்லை உறுதி செய்க *' : 'Confirm New Password *'}
              </label>
              <input
                type="password"
                className="auth-modal-input"
                placeholder="Confirm new password"
                value={forgotConfirm}
                onChange={(e) => setForgotConfirm(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="auth-modal-submit-btn" disabled={loading}>
              {loading ? (currentLang === 'ta' ? 'மாற்றப்படுகிறது...' : 'Resetting...') : (currentLang === 'ta' ? 'கடவுச்சொல்லை மாற்று' : 'Update Password')}
            </button>

            <button
              type="button"
              className="auth-modal-back-btn"
              onClick={() => { setMode('login'); setErrorMessage(''); }}
            >
              ← {currentLang === 'ta' ? 'உள்நுழைவுக்கு திரும்புக' : 'Back to Sign In'}
            </button>
          </form>
        )}

        {/* Modal Footer */}
        <div className="auth-modal-footer">
          <p className="auth-modal-footer-note">
            <span>🛡️</span>
            <span>
              {currentLang === 'ta'
                ? 'உங்கள் தகவல்கள் மற்றும் ஜாதக குறிப்புகள் பாதுகாப்பாக குறியாக்கம் செய்யப்பட்டுள்ளன.'
                : 'Your charts and personal data are strictly private and encrypted.'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
