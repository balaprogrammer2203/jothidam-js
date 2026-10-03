import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../app/providers/AuthContext';
import accountService from '../services/account.service';
import SEOHead from '../../../components/common/SEOHead';
import Breadcrumbs from '../../../components/common/Breadcrumbs';
import Toast from '../../../components/common/Toast';
import { ROUTES } from '../../../config/routes.config';
import { formatIndianDate, formatTime12Hour } from '../../../utils/dateUtils';
import {
  getLocalizedGender,
  getLocalizedAyanamsa,
  getLocalizedNakshatra,
  getLocalizedPada
} from '../../../utils/astrologyLocalization';
import '../../../styles/myAccount.css';

export default function MyAccountPage() {
  const { t, i18n } = useTranslation(['saved', 'auth', 'common']);
  const currentLang = i18n.language || 'ta';
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, isAuthenticated, loading: authLoading, updateProfile, logout } = useAuth();

  // Active tab: 'horoscopes' | 'prasannam' | 'profile'
  const activeTabParam = searchParams.get('tab') || 'horoscopes';
  const [activeTab, setActiveTab] = useState(activeTabParam);

  // Saved Horoscopes state
  const [horoscopes, setHoroscopes] = useState([]);
  const [horoscopeLoading, setHoroscopeLoading] = useState(true);
  const [horoscopeSearch, setHoroscopeSearch] = useState('');

  // Saved Prasannams state
  const [prasannams, setPrasannams] = useState([]);
  const [prasannamLoading, setPrasannamLoading] = useState(true);
  const [prasannamSearch, setPrasannamSearch] = useState('');
  const [prasannamFilterType, setPrasannamFilterType] = useState('all');

  const [editFullName, setEditFullName] = useState(user?.fullName || '');
  const [editEmail, setEditEmail] = useState(user?.email || '');
  const [editMobileNumber, setEditMobileNumber] = useState(user?.mobileNumber || '');
  const [mobileError, setMobileError] = useState('');
  const [editLanguage, setEditLanguage] = useState(user?.preferredLanguage || currentLang);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileSaving, setProfileSaving] = useState(false);

  // Delete modal state
  const [deleteTarget, setDeleteTarget] = useState(null); // { type: 'horoscope' | 'prasannam', id: string, name: string }
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Toast state
  const [toast, setToast] = useState(null);

  // Redirect to user login if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login', { state: { from: { pathname: ROUTES.ACCOUNT } }, replace: true });
    }
  }, [authLoading, isAuthenticated, navigate]);

  // Sync tab with URL
  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    setSearchParams({ tab: newTab });
  };

  // Sync profile form when user object updates
  useEffect(() => {
    if (user) {
      setEditFullName(user.fullName || '');
      setEditEmail(user.email || '');
      setEditMobileNumber(user.mobileNumber || '');
      setEditLanguage(user.preferredLanguage || currentLang);
    }
  }, [user, currentLang]);

  // Fetch Horoscopes
  const fetchHoroscopes = async () => {
    setHoroscopeLoading(true);
    try {
      const data = await accountService.getMyHoroscopes();
      setHoroscopes(data);
    } catch (err) {
      console.warn('Error fetching user horoscopes:', err.message);
    } finally {
      setHoroscopeLoading(false);
    }
  };

  // Fetch Prasannams
  const fetchPrasannams = async () => {
    setPrasannamLoading(true);
    try {
      const data = await accountService.getMyPrasannams();
      setPrasannams(data);
    } catch (err) {
      console.warn('Error fetching user prasannams:', err.message);
    } finally {
      setPrasannamLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchHoroscopes();
      fetchPrasannams();
    }
  }, [isAuthenticated]);

  // Handle Profile Update
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    if (!editFullName.trim()) {
      setToast({ type: 'error', text: currentLang === 'ta' ? 'பெயர் கட்டாயமாகும்' : 'Full Name is required' });
      return;
    }

    if (newPassword && newPassword !== confirmPassword) {
      setToast({ type: 'error', text: currentLang === 'ta' ? 'புதிய கடவுச்சொற்கள் பொருந்தவில்லை' : 'New passwords do not match' });
      return;
    }

    let cleanMobile = '';
    if (editMobileNumber) {
      const rawMobile = editMobileNumber.trim().replace(/[\s\-()]/g, '');
      const normalizedMobile = rawMobile.replace(/^(\+91|91|0)/, '');
      if (!/^[6-9]\d{9}$/.test(normalizedMobile)) {
        setToast({
          type: 'error',
          text: currentLang === 'ta'
            ? 'சரியான 10 இலக்க மொபைல் எண்ணை உள்ளிடவும் (எ.கா: 9876543210)'
            : 'Please enter a valid 10-digit mobile number starting with 6-9'
        });
        return;
      }
      cleanMobile = normalizedMobile;
    }

    setProfileSaving(true);
    try {
      const payload = {
        fullName: editFullName.trim(),
        email: editEmail.trim(),
        mobileNumber: cleanMobile,
        preferredLanguage: editLanguage
      };
      if (newPassword) {
        payload.currentPassword = currentPassword;
        payload.newPassword = newPassword;
      }
      await updateProfile(payload);
      setToast({ type: 'success', text: currentLang === 'ta' ? 'சுயவிவரம் வெற்றிகரமாக புதுப்பிக்கப்பட்டது!' : 'Profile updated successfully!' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setToast({ type: 'error', text: err.message || (currentLang === 'ta' ? 'சுயவிவரத்தை புதுப்பிக்க முடியவில்லை' : 'Failed to update profile') });
    } finally {
      setProfileSaving(false);
    }
  };

  // Confirm and Execute Delete
  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    try {
      if (deleteTarget.type === 'horoscope') {
        await accountService.deleteHoroscope(deleteTarget.id);
        setHoroscopes((prev) => prev.filter((item) => (item._id || item.id) !== deleteTarget.id));
        setToast({ type: 'success', text: currentLang === 'ta' ? 'ஜாதகம் நீக்கப்பட்டது.' : 'Horoscope removed from your account.' });
      } else if (deleteTarget.type === 'prasannam') {
        await accountService.deletePrasannam(deleteTarget.id);
        setPrasannams((prev) => prev.filter((item) => (item._id || item.id) !== deleteTarget.id));
        setToast({ type: 'success', text: currentLang === 'ta' ? 'பிரசன்னம் நீக்கப்பட்டது.' : 'Prasannam chart removed from your account.' });
      }
      setDeleteTarget(null);
    } catch (err) {
      setToast({ type: 'error', text: err.message || 'Delete operation failed' });
    } finally {
      setDeleteLoading(false);
    }
  };

  // Filter Horoscopes
  const filteredHoroscopes = horoscopes.filter((p) => {
    const q = horoscopeSearch.toLowerCase();
    const name = p.personDetails?.fullName?.toLowerCase() || '';
    const place = p.location?.placeName?.toLowerCase() || '';
    const date = p.personDetails?.dob || '';
    return name.includes(q) || place.includes(q) || date.includes(q);
  });

  // Filter Prasannams
  const filteredPrasannams = prasannams.filter((p) => {
    const matchesType = prasannamFilterType === 'all' || p.prasannamType === prasannamFilterType;
    const q = prasannamSearch.toLowerCase();
    const title = p.title?.toLowerCase() || '';
    const client = p.clientName?.toLowerCase() || '';
    const category = p.queryCategory?.toLowerCase() || '';
    const matchesSearch = title.includes(q) || client.includes(q) || category.includes(q);
    return matchesType && matchesSearch;
  });

  const breadcrumbs = [
    { label: currentLang === 'ta' ? 'முகப்பு' : 'Home', link: ROUTES.HOME },
    { label: currentLang === 'ta' ? 'எனது கணக்கு' : 'My Account', active: true }
  ];

  if (authLoading) {
    return (
      <div className="my-account-loading-wrap">
        <div className="spinner"></div>
        <p>{currentLang === 'ta' ? 'கணக்கு விவரங்கள் ஏற்றப்படுகின்றன...' : 'Loading account...'}</p>
      </div>
    );
  }

  return (
    <div className="my-account-page-container">
      <SEOHead
        title={currentLang === 'ta' ? 'எனது கணக்கு | சேமிக்கப்பட்ட ஜாதகங்கள் & பிரசன்னம்' : 'My Account | Saved Horoscopes & Prasannam Charts'}
        description="Manage your saved horoscopes, prasannam divination records, profile details, and astrology preferences."
      />

      <Breadcrumbs items={breadcrumbs} />

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      {/* Account Hero Banner */}
      <div className="account-hero-card">
        <div className="account-hero-user-info">
          <div className="account-user-avatar">
            {user?.fullName?.charAt(0)?.toUpperCase() || user?.username?.charAt(0)?.toUpperCase() || '🕉️'}
          </div>
          <div className="account-user-meta">
            <div className="account-user-title-row">
              <h1 className="account-user-fullname">{user?.fullName || user?.username}</h1>
              <span className={`account-role-badge ${user?.role || 'user'}`}>
                {user?.role === 'superadmin' ? 'Superadmin' : user?.role === 'admin' ? 'Admin' : (currentLang === 'ta' ? 'ஜோதிட பயனர்' : 'Standard Member')}
              </span>
            </div>
            <p className="account-user-sub">
              <span>@{user?.username}</span>
              {user?.email && <span> • {user?.email}</span>}
              {user?.mobileNumber && <span> • 📱 +91 {user?.mobileNumber}</span>}
              <span> • {currentLang === 'ta' ? 'விருப்ப மொழி:' : 'Language:'} {user?.preferredLanguage?.toUpperCase() || 'TA'}</span>
            </p>
          </div>
        </div>

        {/* Quick Stats Badges */}
        <div className="account-hero-stats">
          <div className="hero-stat-pill" onClick={() => handleTabChange('horoscopes')}>
            <span className="stat-pill-icon">📜</span>
            <div className="stat-pill-data">
              <span className="stat-pill-val">{horoscopes.length}</span>
              <span className="stat-pill-lbl">{currentLang === 'ta' ? 'ஜாதகங்கள்' : 'Horoscopes'}</span>
            </div>
          </div>

          <div className="hero-stat-pill" onClick={() => handleTabChange('prasannam')}>
            <span className="stat-pill-icon">🧭</span>
            <div className="stat-pill-data">
              <span className="stat-pill-val">{prasannams.length}</span>
              <span className="stat-pill-lbl">{currentLang === 'ta' ? 'பிரசன்னங்கள்' : 'Prasannams'}</span>
            </div>
          </div>

          <button type="button" onClick={logout} className="account-logout-btn" title="Sign Out">
            <span>🚪</span>
            <span>{currentLang === 'ta' ? 'வெளியேறு' : 'Sign Out'}</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="account-tabs-nav">
        <button
          type="button"
          className={`account-tab-btn ${activeTab === 'horoscopes' ? 'active' : ''}`}
          onClick={() => handleTabChange('horoscopes')}
        >
          <span>📜</span>
          <span>{currentLang === 'ta' ? 'சேமிக்கப்பட்ட ஜாதகங்கள்' : 'Saved Horoscopes'}</span>
          <span className="tab-count-badge">{horoscopes.length}</span>
        </button>

        <button
          type="button"
          className={`account-tab-btn ${activeTab === 'prasannam' ? 'active' : ''}`}
          onClick={() => handleTabChange('prasannam')}
        >
          <span>🧭</span>
          <span>{currentLang === 'ta' ? 'பிரசன்ன வரைபடங்கள்' : 'Saved Prasannam'}</span>
          <span className="tab-count-badge">{prasannams.length}</span>
        </button>

        <button
          type="button"
          className={`account-tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => handleTabChange('profile')}
        >
          <span>⚙️</span>
          <span>{currentLang === 'ta' ? 'சுயவிவரம் & அமைப்புகள்' : 'Profile & Settings'}</span>
        </button>
      </div>

      {/* TAB 1: SAVED HOROSCOPES */}
      {activeTab === 'horoscopes' && (
        <div className="account-tab-content">
          <div className="tab-toolbar-row">
            <div className="tab-toolbar-title-group">
              <h3>{currentLang === 'ta' ? 'எனது சேமிக்கப்பட்ட ஜாதகங்கள்' : 'My Saved Horoscopes'}</h3>
              <p>{currentLang === 'ta' ? 'உங்கள் கணக்கில் சேமிக்கப்பட்ட பிறப்பு ஜாதகங்கள் மற்றும் கிரக நிலைகள்.' : 'Birth charts saved in your personal library for analysis and reference.'}</p>
            </div>

            <div className="tab-toolbar-actions">
              <div className="account-search-wrap">
                <span>🔍</span>
                <input
                  type="text"
                  placeholder={currentLang === 'ta' ? 'பெயர், இடம் அல்லது தேதி...' : 'Search name, place, date...'}
                  value={horoscopeSearch}
                  onChange={(e) => setHoroscopeSearch(e.target.value)}
                  className="account-search-input"
                />
              </div>

              <Link to={ROUTES.HOME} className="btn-accent-action">
                <span>➕</span>
                <span>{currentLang === 'ta' ? 'புதிய ஜாதகம் கணக்கிடு' : 'Calculate New Horoscope'}</span>
              </Link>
            </div>
          </div>

          {horoscopeLoading ? (
            <div className="tab-loading-state">
              <div className="spinner"></div>
              <p>{currentLang === 'ta' ? 'ஜாதகங்கள் ஏற்றப்படுகின்றன...' : 'Loading saved horoscopes...'}</p>
            </div>
          ) : filteredHoroscopes.length === 0 ? (
            <div className="tab-empty-state">
              <div className="empty-icon-glyph">📜</div>
              <h4>{currentLang === 'ta' ? 'சேமிக்கப்பட்ட ஜாதகங்கள் எதுவும் இல்லை' : 'No Saved Horoscopes Found'}</h4>
              <p>
                {horoscopeSearch
                  ? (currentLang === 'ta' ? 'தேடல் வார்த்தைக்கு பொருந்தும் ஜாதகம் கிடைக்கவில்லை.' : 'No profiles match your search criteria.')
                  : (currentLang === 'ta' ? 'ஜாதக கணிப்பான் பக்கத்தில் பிறப்பு விவரங்களை உள்ளிட்ட பிறகு "Save Horoscope" பொத்தானை அழுத்தவும்.' : 'Calculate any birth chart on the home page and click "Save Horoscope" to store it here.')}
              </p>
              <Link to={ROUTES.HOME} className="btn-empty-action">
                {currentLang === 'ta' ? 'ஜாதக கணிப்பிற்கு செல்க' : 'Go to Horoscope Calculator'} →
              </Link>
            </div>
          ) : (
            <div className="account-cards-grid">
              {filteredHoroscopes.map((profile) => {
                const nakId = profile.birthAstrology?.janmaNakshatra?.nakshatraId ?? profile.basicDetails?.nakshatraId;
                const starName = getLocalizedNakshatra(nakId, currentLang);
                const padaVal = profile.birthAstrology?.janmaNakshatra?.pada ?? profile.basicDetails?.pada;
                const padaStr = padaVal ? getLocalizedPada(padaVal, currentLang) : '';
                const starDisplay = starName ? `${starName}${padaStr}` : (profile.basicDetails?.nakshatraWithPada || '-');
                const rasiName = profile.birthAstrology?.janmaRasi?.nameTa || profile.birthAstrology?.janmaRasi?.name || profile.basicDetails?.rasi || '-';
                const lagnaName = profile.birthAstrology?.lagna?.nameTa || profile.birthAstrology?.lagna?.name || profile.basicDetails?.lagna || '-';

                return (
                  <div key={profile._id || profile.id} className="account-horoscope-card">
                    <div className="horoscope-card-top">
                      <div className="horoscope-avatar">
                        {profile.personDetails?.fullName?.charAt(0)?.toUpperCase() || '🕉️'}
                      </div>
                      <div className="horoscope-meta-head">
                        <h4 className="horoscope-person-name">{profile.personDetails?.fullName}</h4>
                        <div className="horoscope-badges-row">
                          <span className="horoscope-gender-pill">
                            {getLocalizedGender(profile.personDetails?.gender, currentLang)}
                          </span>
                          <span className="horoscope-chart-type-pill">
                            {profile.chartPreferences?.chartType === 'north' ? 'North Chart' : 'South Chart'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="horoscope-key-details">
                      <div className="horoscope-detail-cell">
                        <span className="cell-label">{currentLang === 'ta' ? 'பிறந்த தேதி' : 'Date of Birth'}</span>
                        <span className="cell-value">{formatIndianDate(profile.personDetails?.dob)}</span>
                      </div>
                      <div className="horoscope-detail-cell">
                        <span className="cell-label">{currentLang === 'ta' ? 'பிறந்த நேரம்' : 'Time of Birth'}</span>
                        <span className="cell-value">{formatTime12Hour(profile.personDetails?.tob)}</span>
                      </div>
                      <div className="horoscope-detail-cell full">
                        <span className="cell-label">{currentLang === 'ta' ? 'பிறந்த இடம்' : 'Place'}</span>
                        <span className="cell-value text-truncate">{profile.location?.placeName || profile.location?.formattedAddress || '-'}</span>
                      </div>
                      <div className="horoscope-detail-cell">
                        <span className="cell-label">{currentLang === 'ta' ? 'லக்னம்' : 'Lagna'}</span>
                        <span className="cell-value highlight">{lagnaName}</span>
                      </div>
                      <div className="horoscope-detail-cell">
                        <span className="cell-label">{currentLang === 'ta' ? 'ராசி & நட்சத்திரம்' : 'Rasi & Star'}</span>
                        <span className="cell-value highlight">{rasiName} • {starDisplay}</span>
                      </div>
                    </div>

                    <div className="horoscope-card-footer">
                      <Link
                        to={ROUTES.HOROSCOPE.savedDetailPath(profile._id || profile.id)}
                        className="btn-card-analyze"
                        title="View Complete Chart & Dasha Analysis"
                      >
                        <span>🔮</span>
                        <span>{currentLang === 'ta' ? 'ஆய்வு செய்' : 'View & Analyze'}</span>
                      </Link>

                      <button
                        type="button"
                        className="btn-card-delete"
                        onClick={() => setDeleteTarget({
                          type: 'horoscope',
                          id: profile._id || profile.id,
                          name: profile.personDetails?.fullName
                        })}
                        title="Delete Horoscope"
                      >
                        <span>🗑️</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: SAVED PRASANNAM CHARTS */}
      {activeTab === 'prasannam' && (
        <div className="account-tab-content">
          <div className="tab-toolbar-row">
            <div className="tab-toolbar-title-group">
              <h3>{currentLang === 'ta' ? 'எனது பிரசன்ன வரைபடங்கள்' : 'My Saved Prasannam Divinations'}</h3>
              <p>{currentLang === 'ta' ? 'ஜாமக்கோள் மற்றும் கடிகார பிரசன்ன கேள்விகள், தூண்கள் மற்றும் ஆரூட முடிவுகள்.' : 'Saved horary queries, 8 Jamams, clock positions, and sacred answers.'}</p>
            </div>

            <div className="tab-toolbar-actions">
              <div className="account-search-wrap">
                <span>🔍</span>
                <input
                  type="text"
                  placeholder={currentLang === 'ta' ? 'கேள்வி அல்லது வாடிக்கையாளர்...' : 'Search query, client, notes...'}
                  value={prasannamSearch}
                  onChange={(e) => setPrasannamSearch(e.target.value)}
                  className="account-search-input"
                />
              </div>

              <div className="prasannam-filter-tabs">
                <button
                  type="button"
                  className={`prasannam-filter-btn ${prasannamFilterType === 'all' ? 'active' : ''}`}
                  onClick={() => setPrasannamFilterType('all')}
                >
                  {currentLang === 'ta' ? 'அனைத்தும்' : 'All'}
                </button>
                <button
                  type="button"
                  className={`prasannam-filter-btn ${prasannamFilterType === 'jamakkol' ? 'active' : ''}`}
                  onClick={() => setPrasannamFilterType('jamakkol')}
                >
                  {currentLang === 'ta' ? 'ஜாமக்கோள்' : 'Jamakkol'}
                </button>
                <button
                  type="button"
                  className={`prasannam-filter-btn ${prasannamFilterType === 'kadikara' ? 'active' : ''}`}
                  onClick={() => setPrasannamFilterType('kadikara')}
                >
                  {currentLang === 'ta' ? 'கடிகாரம்' : 'Kadikara'}
                </button>
              </div>

              <Link to={ROUTES.PRASANNAM.JAMAKKOL} className="btn-accent-action">
                <span>🧭</span>
                <span>{currentLang === 'ta' ? 'ஜாமக்கோள் பிரசன்னம்' : 'Cast Jamakkol'}</span>
              </Link>
            </div>
          </div>

          {prasannamLoading ? (
            <div className="tab-loading-state">
              <div className="spinner"></div>
              <p>{currentLang === 'ta' ? 'பிரசன்னங்கள் ஏற்றப்படுகின்றன...' : 'Loading saved prasannams...'}</p>
            </div>
          ) : filteredPrasannams.length === 0 ? (
            <div className="tab-empty-state">
              <div className="empty-icon-glyph">🧭</div>
              <h4>{currentLang === 'ta' ? 'சேமிக்கப்பட்ட பிரசன்னங்கள் எதுவும் இல்லை' : 'No Saved Prasannam Charts'}</h4>
              <p>
                {prasannamSearch
                  ? (currentLang === 'ta' ? 'தேடலுக்குரிய பிரசன்ன பதிவுகள் இல்லை.' : 'No charts matched your search query.')
                  : (currentLang === 'ta' ? 'ஜாமக்கோள் அல்லது கடிகார பிரசன்ன பக்கத்தில் கணித்த பிறகு "Save Prasannam" மூலம் இங்கு சேமிக்கலாம்.' : 'Perform any Jamakkol or Kadikara horary divination and click "Save Prasannam" to log it here.')}
              </p>
              <div className="empty-prasannam-actions">
                <Link to={ROUTES.PRASANNAM.JAMAKKOL} className="btn-empty-action">
                  🧭 {currentLang === 'ta' ? 'ஜாமக்கோள் பிரசன்னம் கணக்கிடு' : 'Cast Jamakkol Prasannam'}
                </Link>
                <Link to={ROUTES.PRASANNAM.KADIKARA} className="btn-empty-action secondary">
                  ⏰ {currentLang === 'ta' ? 'கடிகார பிரசன்னம் கணக்கிடு' : 'Cast Kadikara Prasannam'}
                </Link>
              </div>
            </div>
          ) : (
            <div className="account-cards-grid">
              {filteredPrasannams.map((item) => {
                const isJamakkol = item.prasannamType === 'jamakkol';
                const isKadikara = item.prasannamType === 'kadikara';
                const summary = item.summary || {};
                const loc = item.location || {};

                return (
                  <div key={item._id || item.id} className="account-prasannam-card">
                    <div className="prasannam-card-header">
                      <span className={`prasannam-type-badge ${item.prasannamType}`}>
                        {isJamakkol ? '🧭 Jamakkol Prasannam' : isKadikara ? '⏰ Kadikara Prasannam' : '🎯 KP Horary'}
                      </span>
                      <span className="prasannam-date-time-tag">
                        {item.dateTime || formatIndianDate(item.createdAt)}
                      </span>
                    </div>

                    <h4 className="prasannam-query-title">{item.title}</h4>

                    {item.clientName && (
                      <div className="prasannam-client-line">
                        <span>👤</span>
                        <span>{currentLang === 'ta' ? 'கேட்பவர்:' : 'Client:'} <strong>{item.clientName}</strong></span>
                        {item.queryCategory && <span className="prasannam-category-tag">{item.queryCategory}</span>}
                      </div>
                    )}

                    {/* Summary Pillars based on Prasannam Type */}
                    <div className="prasannam-pillars-box">
                      {isJamakkol && (
                        <>
                          <div className="pillar-metric">
                            <span className="metric-label">{currentLang === 'ta' ? 'உதயம்' : 'Udhayam'}</span>
                            <span className="metric-val">{summary.udhayam || '-'}</span>
                          </div>
                          <div className="pillar-metric">
                            <span className="metric-label">{currentLang === 'ta' ? 'ஆரூடம்' : 'Aarudam'}</span>
                            <span className="metric-val">{summary.aarudam || '-'}</span>
                          </div>
                          <div className="pillar-metric">
                            <span className="metric-label">{currentLang === 'ta' ? 'கவிப்பு' : 'Kavippu'}</span>
                            <span className="metric-val obstacle">{summary.kavippu || '-'}</span>
                          </div>
                          <div className="pillar-metric">
                            <span className="metric-label">{currentLang === 'ta' ? 'ஜாம அதிபதி' : 'Jamam Lord'}</span>
                            <span className="metric-val highlight">{summary.jamamLord || '-'}</span>
                          </div>
                        </>
                      )}

                      {isKadikara && (
                        <>
                          <div className="pillar-metric">
                            <span className="metric-label">{currentLang === 'ta' ? 'பாவம்' : 'Bhava'}</span>
                            <span className="metric-val highlight">{summary.bhava ? `${summary.bhava}-ம் பாவம்` : 'General'}</span>
                          </div>
                          <div className="pillar-metric">
                            <span className="metric-label">{currentLang === 'ta' ? 'இடம்' : 'Place'}</span>
                            <span className="metric-val">{loc.placeName || 'Chennai'}</span>
                          </div>
                          {summary.verdict && (
                            <div className="pillar-metric full">
                              <span className="metric-label">{currentLang === 'ta' ? 'முடிவு' : 'Verdict'}</span>
                              <span className="metric-val">{summary.verdict}</span>
                            </div>
                          )}
                        </>
                      )}
                    </div>

                    {item.notes && (
                      <p className="prasannam-notes-snippet">
                        <span>📝</span>
                        <span>{item.notes}</span>
                      </p>
                    )}

                    <div className="prasannam-card-footer">
                      <Link
                        to={isJamakkol ? ROUTES.PRASANNAM.JAMAKKOL : ROUTES.PRASANNAM.KADIKARA}
                        className="btn-card-analyze"
                        title="Re-open Prasannam Chart"
                      >
                        <span>🧭</span>
                        <span>{currentLang === 'ta' ? 'பிரசன்னத்தை திறக்க' : 'Open Chart'}</span>
                      </Link>

                      <button
                        type="button"
                        className="btn-card-delete"
                        onClick={() => setDeleteTarget({
                          type: 'prasannam',
                          id: item._id || item.id,
                          name: item.title
                        })}
                        title="Delete Prasannam Chart"
                      >
                        <span>🗑️</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: PROFILE & SETTINGS */}
      {activeTab === 'profile' && (
        <div className="account-tab-content">
          <div className="tab-toolbar-row">
            <div className="tab-toolbar-title-group">
              <h3>{currentLang === 'ta' ? 'சுயவிவர அமைப்புகள்' : 'Profile & Security Settings'}</h3>
              <p>{currentLang === 'ta' ? 'உங்கள் பெயர், மின்னஞ்சல், கடவுச்சொல் மற்றும் விருப்ப மொழியை புதுப்பிக்கவும்.' : 'Update your personal details, preferred language, and account security.'}</p>
            </div>
          </div>

          <div className="profile-settings-card">
            <form onSubmit={handleProfileSubmit} className="profile-edit-form">
              <div className="profile-section-heading">
                <h4>{currentLang === 'ta' ? '1. அடிப்படை விவரங்கள்' : '1. Basic Account Information'}</h4>
              </div>

              <div className="profile-form-grid">
                <div className="form-field-group">
                  <label className="field-label">
                    {currentLang === 'ta' ? 'பயனர்பெயர் (Username)' : 'Username'}
                  </label>
                  <input
                    type="text"
                    className="field-input disabled"
                    value={user?.username || ''}
                    disabled
                  />
                  <span className="field-hint">{currentLang === 'ta' ? 'பயனர்பெயரை மாற்ற முடியாது.' : 'Username cannot be modified.'}</span>
                </div>

                <div className="form-field-group">
                  <label className="field-label">
                    {currentLang === 'ta' ? 'முழு பெயர் (Full Name) *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    className="field-input"
                    value={editFullName}
                    onChange={(e) => setEditFullName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-field-group">
                  <label className="field-label">
                    {currentLang === 'ta' ? 'மின்னஞ்சல் முகவரி (Email)' : 'Email Address'}
                  </label>
                  <input
                    type="email"
                    className="field-input"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    placeholder="user@example.com"
                  />
                </div>

                <div className="form-field-group">
                  <label className="field-label">
                    {currentLang === 'ta' ? 'மொபைல் எண் (Mobile Number)' : 'Mobile Number'}
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
                      value={editMobileNumber}
                      maxLength={10}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                        setEditMobileNumber(val);
                        if (val && !/^[6-9]/.test(val)) {
                          setMobileError(currentLang === 'ta' ? 'எண் 6, 7, 8 அல்லது 9 இல் தொடங்க வேண்டும்' : 'Must start with 6, 7, 8, or 9');
                        } else if (val && val.length < 10) {
                          setMobileError(currentLang === 'ta' ? `${val.length}/10 இலக்கங்கள்` : `${val.length}/10 digits`);
                        } else {
                          setMobileError('');
                        }
                      }}
                    />
                  </div>
                  {mobileError && (
                    <span style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '4px', display: 'block' }}>
                      {mobileError}
                    </span>
                  )}
                </div>

                <div className="form-field-group">
                  <label className="field-label">
                    {currentLang === 'ta' ? 'விருப்ப மொழி (Preferred Language)' : 'Preferred Language'}
                  </label>
                  <select
                    className="field-input"
                    value={editLanguage}
                    onChange={(e) => setEditLanguage(e.target.value)}
                  >
                    <option value="ta">தமிழ் (Tamil)</option>
                    <option value="en">English</option>
                    <option value="hi">हिन्दी (Hindi)</option>
                    <option value="te">తెలుగు (Telugu)</option>
                    <option value="kn">ಕನ್ನಡ (Kannada)</option>
                    <option value="ml">മലയാളം (Malayalam)</option>
                  </select>
                </div>
              </div>

              <div className="profile-section-heading" style={{ marginTop: '2rem' }}>
                <h4>{currentLang === 'ta' ? '2. கடவுச்சொல் மாற்றம் (விருப்பத்தேர்வு)' : '2. Change Password (Optional)'}</h4>
              </div>

              <div className="profile-form-grid">
                <div className="form-field-group">
                  <label className="field-label">
                    {currentLang === 'ta' ? 'தற்போதைய கடவுச்சொல்' : 'Current Password'}
                  </label>
                  <input
                    type="password"
                    className="field-input"
                    placeholder="Enter current password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>

                <div className="form-field-group">
                  <label className="field-label">
                    {currentLang === 'ta' ? 'புதிய கடவுச்சொல்' : 'New Password'}
                  </label>
                  <input
                    type="password"
                    className="field-input"
                    placeholder="Min 6 characters"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>

                <div className="form-field-group">
                  <label className="field-label">
                    {currentLang === 'ta' ? 'புதிய கடவுச்சொல்லை உறுதி செய்க' : 'Confirm New Password'}
                  </label>
                  <input
                    type="password"
                    className="field-input"
                    placeholder="Repeat new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="profile-form-actions">
                <button type="submit" className="btn-profile-save" disabled={profileSaving}>
                  {profileSaving ? (currentLang === 'ta' ? 'சேமிக்கப்படுகிறது...' : 'Saving Changes...') : (currentLang === 'ta' ? 'மாற்றங்களை சேமிக்கவும்' : 'Save Changes')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="delete-modal-overlay" onClick={() => setDeleteTarget(null)}>
          <div className="delete-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="delete-icon-badge">🗑️</div>
            <h4>{currentLang === 'ta' ? 'நீக்குவதை உறுதிப்படுத்தவும்' : 'Confirm Deletion'}</h4>
            <p>
              {currentLang === 'ta'
                ? `"${deleteTarget.name}" என்ற ${deleteTarget.type === 'horoscope' ? 'ஜாதகத்தை' : 'பிரசன்ன வரைபடத்தை'} உங்கள் கணக்கிலிருந்து நிரந்தரமாக நீக்க விரும்புகிறீர்களா?`
                : `Are you sure you want to delete "${deleteTarget.name}" from your saved records?`}
            </p>
            <div className="delete-modal-actions">
              <button
                type="button"
                className="btn-cancel"
                onClick={() => setDeleteTarget(null)}
                disabled={deleteLoading}
              >
                {currentLang === 'ta' ? 'ரத்து செய்' : 'Cancel'}
              </button>
              <button
                type="button"
                className="btn-confirm-delete"
                onClick={handleConfirmDelete}
                disabled={deleteLoading}
              >
                {deleteLoading ? (currentLang === 'ta' ? 'நீக்கப்படுகிறது...' : 'Deleting...') : (currentLang === 'ta' ? 'நீக்கு' : 'Yes, Delete')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
