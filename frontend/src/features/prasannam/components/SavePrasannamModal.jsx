import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../../../styles/authModal.css';

export default function SavePrasannamModal({
  isOpen,
  onClose,
  onSave,
  prasannamType = 'jamakkol',
  defaultTitle = '',
  defaultClient = '',
  defaultCategory = 'General',
  dateTime = '',
  location = {}
}) {
  const { t, i18n } = useTranslation(['common']);
  const currentLang = i18n.language || 'ta';

  const [title, setTitle] = useState(defaultTitle || (prasannamType === 'jamakkol' ? 'ஜாமக்கோள் பிரசன்ன கேள்வி' : 'கடிகார பிரசன்ன கேள்வி'));
  const [clientName, setClientName] = useState(defaultClient || '');
  const [category, setCategory] = useState(defaultCategory || 'General');
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const CATEGORIES = [
    { id: 'General', labelTa: 'பொதுவான கேள்வி', labelEn: 'General Query' },
    { id: 'Career', labelTa: 'தொழில் & வேலைவாய்ப்பு', labelEn: 'Career & Business' },
    { id: 'Marriage', labelTa: 'திருமணம் & குடும்பம்', labelEn: 'Marriage & Family' },
    { id: 'Health', labelTa: 'ஆரோக்கியம் & உடல்நலம்', labelEn: 'Health & Wellness' },
    { id: 'Finance', labelTa: 'தனம் & வரவு-செலவு', labelEn: 'Finance & Wealth' },
    { id: 'Property', labelTa: 'சொத்து & பூமி', labelEn: 'Property & Real Estate' },
    { id: 'Travel', labelTa: 'பயணம் & வெளிநாடு', labelEn: 'Travel & Foreign' },
    { id: 'Lost_Items', labelTa: 'காணாமல் போன பொருள்', labelEn: 'Lost Articles' },
    { id: 'Legal', labelTa: 'வழக்கு & போட்டி', labelEn: 'Legal & Disputes' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError(currentLang === 'ta' ? 'கேள்வி அல்லது தலைப்பு கட்டாயமாகும்' : 'Query Title is required');
      return;
    }

    setSaving(true);
    setError('');
    try {
      await onSave({
        title: title.trim(),
        clientName: clientName.trim(),
        queryCategory: category,
        notes: notes.trim()
      });
      onClose();
    } catch (err) {
      setError(err.message || (currentLang === 'ta' ? 'சேமிக்க முடியவில்லை' : 'Failed to save prasannam'));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="auth-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="auth-modal-dialog" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="auth-modal-close-btn" onClick={onClose} aria-label="Close">
          ✕
        </button>

        <div className="auth-modal-header">
          <div className="auth-modal-icon-badge">
            <span>{prasannamType === 'jamakkol' ? '🧭' : '⏰'}</span>
          </div>
          <h3 className="auth-modal-title">
            {currentLang === 'ta'
              ? (prasannamType === 'jamakkol' ? 'ஜாமக்கோள் பிரசன்னத்தை சேமிக்கவும்' : 'கடிகார பிரசன்னத்தை சேமிக்கவும்')
              : (prasannamType === 'jamakkol' ? 'Save Jamakkol Prasannam' : 'Save Kadikara Prasannam')}
          </h3>
          <p className="auth-modal-subtitle">
            {dateTime && <span>📅 {dateTime} • 📍 {location.placeName || 'Chennai'}</span>}
          </p>
        </div>

        {error && (
          <div className="auth-modal-alert error">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-modal-form">
          <div className="auth-modal-input-group">
            <label className="auth-modal-label">
              {currentLang === 'ta' ? 'கேள்வி / தலைப்பு (Query Title) *' : 'Query Title / Topic *'}
            </label>
            <input
              type="text"
              className="auth-modal-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={currentLang === 'ta' ? 'எ.கா: புதிய தொழில் தொடங்கலாமா?' : 'e.g. Can I start a new venture?'}
              required
              autoFocus
            />
          </div>

          <div className="auth-modal-input-group">
            <label className="auth-modal-label">
              {currentLang === 'ta' ? 'கேட்பவர் பெயர் (Querent Name)' : 'Querent / Client Name'}
            </label>
            <input
              type="text"
              className="auth-modal-input"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder={currentLang === 'ta' ? 'எ.கா: சுப்பிரமணியன்' : 'e.g. Subramanian'}
            />
          </div>

          <div className="auth-modal-input-group">
            <label className="auth-modal-label">
              {currentLang === 'ta' ? 'கேள்வி வகை (Category)' : 'Query Category'}
            </label>
            <select
              className="auth-modal-input"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {currentLang === 'ta' ? c.labelTa : c.labelEn}
                </option>
              ))}
            </select>
          </div>

          <div className="auth-modal-input-group">
            <label className="auth-modal-label">
              {currentLang === 'ta' ? 'குறிப்புகள் (Astrological Notes)' : 'Personal Astrological Notes'}
            </label>
            <textarea
              className="auth-modal-input"
              rows="3"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={currentLang === 'ta' ? 'கிரக நிலைகள் அல்லது காரிய பலன் பற்றிய உங்கள் குறிப்பு...' : 'Notes on planetary verdict or advice given...'}
            />
          </div>

          <button type="submit" className="auth-modal-submit-btn" disabled={saving}>
            {saving
              ? (currentLang === 'ta' ? 'சேமிக்கப்படுகிறது...' : 'Saving to Account...')
              : (currentLang === 'ta' ? 'கணக்கில் சேமிக்கவும்' : 'Save to My Account')}
          </button>
        </form>
      </div>
    </div>
  );
}
