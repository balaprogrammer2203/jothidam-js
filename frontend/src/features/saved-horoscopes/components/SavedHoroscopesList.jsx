import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import savedProfilesService from '../services/savedProfiles.service';
import Toast from '../../../components/common/Toast';
import { formatIndianDate, formatTime12Hour } from '../../../utils/dateUtils';
import {
  getLocalizedGender,
  getLocalizedAyanamsa,
  getLocalizedNakshatra,
  getLocalizedPada
} from '../../../utils/astrologyLocalization';

export default function SavedHoroscopesList({ onSelectProfile }) {
  const { t, i18n } = useTranslation(['saved', 'common', 'horoscope']);
  const currentLang = i18n.language || 'ta';
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await savedProfilesService.getSavedHoroscopes();
      setProfiles(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filtered = profiles.filter((p) => {
    const q = searchTerm.toLowerCase();
    const name = p.personDetails?.fullName?.toLowerCase() || '';
    const place = p.location?.placeName?.toLowerCase() || '';
    const date = p.personDetails?.dob || '';
    return name.includes(q) || place.includes(q) || date.includes(q);
  });

  return (
    <div className="saved-horoscopes-container">
      <div className="saved-header-row">
        <div className="saved-header-text-box">
          <h3 className="saved-section-title">{t('saved:title', 'Saved Horoscopes')}</h3>
          <p className="saved-section-subtitle">
            {t('saved:subtitle', "All horoscope profiles stored in the MongoDB database.")}
          </p>
        </div>

        <button
          type="button"
          onClick={fetchProfiles}
          className="refresh-btn"
          disabled={loading}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 4 23 10 17 10"></polyline>
            <polyline points="1 20 1 14 7 14"></polyline>
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
          </svg>
          {t('common:buttons.refresh', 'Refresh')}
        </button>
      </div>

      {error && <Toast message={{ type: 'error', text: error }} onClose={() => setError(null)} />}

      <div className="saved-search-bar">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={t('saved:searchPlaceholder', 'Search by Name, Place or Date...')}
          className="saved-search-input"
        />
      </div>

      {loading ? (
        <div className="loading-box">
          <div className="spinner"></div>
          <p>{t('common:status.loading', 'Loading saved profiles...')}</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty-state-box">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="12" y1="18" x2="12" y2="12"></line>
            <line x1="9" y1="15" x2="15" y2="15"></line>
          </svg>
          <p>{t('saved:empty', 'No saved horoscopes found.')}</p>
        </div>
      ) : (
        <div className="saved-profiles-grid">
          {filtered.map((profile) => {
            const nakId = profile.birthAstrology?.janmaNakshatra?.nakshatraId ?? profile.basicDetails?.nakshatraId ?? profile.basicDetails?.nakshatraName;
            const starName = getLocalizedNakshatra(nakId, currentLang);
            const padaVal = profile.birthAstrology?.janmaNakshatra?.pada ?? profile.basicDetails?.pada;
            const padaStr = padaVal ? getLocalizedPada(padaVal, currentLang) : '';
            const starDisplay = starName ? `${starName}${padaStr}` : (profile.basicDetails?.nakshatraWithPada || '-');

            return (
              <div key={profile._id} className="saved-profile-card">
                <div className="profile-card-top">
                  <div className="profile-avatar">
                    {profile.personDetails?.fullName?.charAt(0) || '🕉️'}
                  </div>
                  <div className="profile-header-info">
                    <h4 className="profile-name">{profile.personDetails?.fullName}</h4>
                    <span className="profile-gender-badge">{getLocalizedGender(profile.personDetails?.gender, currentLang)}</span>
                  </div>
                </div>

                <div className="profile-details-list">
                  <div className="detail-item">
                    <span className="detail-lbl">{t('saved:dob', 'Date of Birth')}</span>
                    <span className="detail-val">{formatIndianDate(profile.personDetails?.dob)}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-lbl">{t('saved:tob', 'Time of Birth')}</span>
                    <span className="detail-val">{formatTime12Hour(profile.personDetails?.tob)}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-lbl">{t('saved:place', 'Birth Place')}</span>
                    <span className="detail-val text-truncate">{profile.location?.placeName || profile.location?.formattedAddress || '-'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-lbl">{t('saved:ayanamsa', 'Ayanamsa')}</span>
                    <span className="detail-val">{getLocalizedAyanamsa(profile.astronomicalDetails?.ayanamsaMode || profile.astronomicalDetails?.ayanamsaType, currentLang)}</span>
                  </div>
                  {starDisplay && starDisplay !== '-' && (
                    <div className="detail-item">
                      <span className="detail-lbl">{t('saved:star', 'Janma Star')}</span>
                      <span className="detail-val highlight-val">{starDisplay}</span>
                    </div>
                  )}
                </div>

                <div className="profile-card-actions">
                  <button
                    type="button"
                    onClick={() => {
                      if (onSelectProfile) {
                        onSelectProfile(profile);
                      } else {
                        navigate(`/saved/${profile._id}`);
                      }
                    }}
                    className="view-chart-btn"
                  >
                    {t('saved:viewChart', 'View Chart')} →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
