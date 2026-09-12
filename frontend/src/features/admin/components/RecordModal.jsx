import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// Helpers to get and set nested object properties
function getNestedValue(obj, path) {
  if (!obj || !path) return '';
  const parts = path.split('.');
  let curr = obj;
  for (const p of parts) {
    if (curr === undefined || curr === null) return '';
    curr = curr[p];
  }
  return curr !== undefined && curr !== null ? curr : '';
}

function setNestedValue(obj, path, value) {
  const parts = path.split('.');
  let curr = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    if (!curr[part] || typeof curr[part] !== 'object') {
      curr[part] = {};
    }
    curr = curr[part];
  }
  curr[parts[parts.length - 1]] = value;
}

export default function RecordModal({
  isOpen,
  mode = 'create', // 'create' | 'edit'
  tableConfig,
  initialData = null,
  isSubmitting = false,
  onClose,
  onSubmit
}) {
  const { t, i18n } = useTranslation(['admin', 'common', 'auth']);
  const currentLang = i18n.language || 'en';

  const [formData, setFormData] = useState({});
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState(null);
  const [showPasswordMap, setShowPasswordMap] = useState({});
  const [useJsonMode, setUseJsonMode] = useState(false);
  const [jsonText, setJsonText] = useState('');
  const [jsonError, setJsonError] = useState(null);

  const isEdit = mode === 'edit';
  const isUsersTable = tableConfig?.key === 'users';

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        const cloned = JSON.parse(JSON.stringify(initialData));
        // For users edit, keep password field blank initially so existing password isn't exposed or prefilled
        if (isUsersTable) {
          cloned.password = '';
        }
        setFormData(cloned);
        setJsonText(JSON.stringify(cloned, null, 2));
      } else {
        setFormData({});
        setJsonText('{\n  \n}');
      }
      setFieldErrors({});
      setFormError(null);
      setJsonError(null);
      setShowPasswordMap({});
      setUseJsonMode(false);
    }
  }, [isOpen, initialData, isUsersTable]);

  if (!isOpen) return null;

  const toggleShowPassword = (fieldName) => {
    setShowPasswordMap((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName]
    }));
  };

  // Validate a single field
  const validateField = (fieldName, val, fieldConfig) => {
    const isRequired = fieldConfig?.required;
    const minLength = fieldConfig?.minLength || (fieldConfig?.type === 'password' ? 6 : 0);

    // Password field validation
    if (fieldConfig?.type === 'password' || fieldName === 'password') {
      const trimmed = typeof val === 'string' ? val.trim() : '';

      // In create mode: Password is mandatory with min. 6 chars
      if (!isEdit) {
        if (!trimmed) {
          return t('auth:validation.passwordRequired', 'Password is required and must be at least 6 characters.');
        }
        if (trimmed.length < 6) {
          return currentLang === 'ta'
            ? `கடவுச்சொல் குறைந்தது 6 எழுத்துக்கள் இருக்க வேண்டும் (தற்போது: ${trimmed.length} எழுத்துக்கள்).`
            : `Password must be at least 6 characters long (currently ${trimmed.length} characters).`;
        }
      }

      // In edit mode: Password is optional. If provided, must be min. 6 chars
      if (isEdit && trimmed.length > 0) {
        if (trimmed.length < 6) {
          return currentLang === 'ta'
            ? `கடவுச்சொல் குறைந்தது 6 எழுத்துக்கள் இருக்க வேண்டும் (தற்போது: ${trimmed.length} எழுத்துக்கள்).`
            : `Password must be at least 6 characters long (currently ${trimmed.length} characters).`;
        }
      }
      return null;
    }

    // Required check
    if (isRequired && (val === undefined || val === null || (typeof val === 'string' && val.trim() === ''))) {
      return currentLang === 'ta'
        ? `${fieldConfig.label || fieldName} அவசியமான புலம்.`
        : `${fieldConfig.label || fieldName} is required.`;
    }

    // Min length check
    if (minLength && typeof val === 'string' && val.trim().length > 0 && val.trim().length < minLength) {
      return currentLang === 'ta'
        ? `குறைந்தது ${minLength} எழுத்துக்கள் தேவை.`
        : `Minimum ${minLength} characters required.`;
    }

    // Email format check
    if (fieldConfig?.type === 'email' && typeof val === 'string' && val.trim().length > 0) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(val.trim())) {
        return t('auth:validation.invalidEmail', 'Please enter a valid email address.');
      }
    }

    return null;
  };

  const handleFieldChange = (path, value, type, fieldConfig) => {
    const newFormData = JSON.parse(JSON.stringify(formData));
    let parsedValue = value;
    if (type === 'number') {
      parsedValue = value === '' ? '' : Number(value);
    }
    setNestedValue(newFormData, path, parsedValue);
    setFormData(newFormData);
    setJsonText(JSON.stringify(newFormData, null, 2));

    // Live validation on change
    const err = validateField(path, parsedValue, fieldConfig);
    setFieldErrors((prev) => {
      const updated = { ...prev };
      if (err) {
        updated[path] = err;
      } else {
        delete updated[path];
      }
      return updated;
    });

    if (formError) {
      setFormError(null);
    }
  };

  const handleFieldBlur = (path, fieldConfig) => {
    const val = getNestedValue(formData, path);
    const err = validateField(path, val, fieldConfig);
    setFieldErrors((prev) => {
      const updated = { ...prev };
      if (err) {
        updated[path] = err;
      } else {
        delete updated[path];
      }
      return updated;
    });
  };

  const handleJsonChange = (val) => {
    setJsonText(val);
    try {
      const parsed = JSON.parse(val);
      setFormData(parsed);
      setJsonError(null);
    } catch (err) {
      setJsonError(err.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (useJsonMode) {
      try {
        const parsed = JSON.parse(jsonText);
        // If users edit and password is empty string, remove it
        if (isUsersTable && isEdit && (!parsed.password || parsed.password.trim() === '')) {
          delete parsed.password;
        }
        onSubmit(parsed);
      } catch (err) {
        setJsonError('Invalid JSON format: ' + err.message);
      }
      return;
    }

    // Form Mode: Comprehensive validation across all fields
    const errors = {};
    for (const field of tableConfig.formFields || []) {
      const val = getNestedValue(formData, field.name);
      const err = validateField(field.name, val, field);
      if (err) {
        errors[field.name] = err;
      }
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setFormError(
        currentLang === 'ta'
          ? 'படிவத்தில் பிழைகள் உள்ளன. சரியான தகவல்களை உள்ளிடவும்.'
          : 'Please correct the errors highlighted below before submitting.'
      );
      return;
    }

    // Prepare payload
    const payload = JSON.parse(JSON.stringify(formData));

    // If editing users and password was not touched/empty, omit password so it does not overwrite
    if (isUsersTable && isEdit) {
      const rawPass = getNestedValue(payload, 'password');
      if (!rawPass || typeof rawPass !== 'string' || rawPass.trim() === '') {
        delete payload.password;
      } else {
        payload.password = rawPass.trim();
      }
    }

    onSubmit(payload);
  };

  const tableName = tableConfig.displayName || tableConfig.nameTa || tableConfig.name;
  const isLargeModal =
    tableConfig?.modalSize === 'large' ||
    (tableConfig?.formFields && tableConfig.formFields.length > 8) ||
    tableConfig?.key === 'kadikara-prasannam';

  const title = isEdit
    ? `${t('admin:table.editRecord', 'Edit Record')} (${tableName})`
    : `${t('admin:table.addRecord', 'Add New Record')} (${tableName})`;

  return (
    <div className="admin-modal-overlay">
      <div className={`admin-modal-box ${isLargeModal ? 'large-modal' : ''}`}>
        {/* Header */}
        <div className="admin-modal-header" style={{ borderLeftColor: tableConfig.color }}>
          <div className="modal-title-group">
            <h3 className="modal-title">{title}</h3>
            <span className="modal-subtitle">{tableConfig.key}</span>
          </div>

          <div className="modal-header-actions">
            <button
              type="button"
              className={`mode-toggle-btn ${useJsonMode ? 'active' : ''}`}
              onClick={() => setUseJsonMode(!useJsonMode)}
            >
              {useJsonMode ? '📝 Form Mode' : '{ } JSON Mode'}
            </button>

            <button type="button" className="modal-close-btn" onClick={onClose}>
              &times;
            </button>
          </div>
        </div>

        {/* Global Error Banner */}
        {formError && (
          <div className="modal-error-banner">
            <span className="error-banner-icon">⚠️</span>
            <span className="error-banner-text">{formError}</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="admin-modal-form">
          <div className="admin-modal-body">
            {useJsonMode ? (
              <div className="json-editor-container">
                <label className="json-editor-label">Direct JSON Payload Editor:</label>
                <textarea
                  className={`json-textarea ${jsonError ? 'has-error' : ''}`}
                  value={jsonText}
                  onChange={(e) => handleJsonChange(e.target.value)}
                  rows={14}
                  spellCheck={false}
                />
                {jsonError && <span className="json-error-text">❌ {jsonError}</span>}
              </div>
            ) : (
              <div className="form-fields-grid">
                {tableConfig.formFields?.map((field) => {
                  const val = getNestedValue(formData, field.name);
                  const isPasswordField = field.type === 'password' || field.name === 'password';
                  const isVisible = showPasswordMap[field.name];
                  const hasError = !!fieldErrors[field.name];
                  const errorMessage = fieldErrors[field.name];
                  const isRequired = !isEdit && isPasswordField ? true : field.required;
                  const isFullWidth =
                    field.type === 'textarea' ||
                    field.fullWidth ||
                    (field.name && (field.name.startsWith('desc.') || field.name.startsWith('answer.')));

                  // Resolve placeholder & hint based on current language & mode
                  let placeholder =
                    currentLang === 'ta'
                      ? field.placeholderTa || field.placeholder || `உள்ளிடவும் ${field.label}...`
                      : field.placeholderEn || field.placeholder || `Enter ${field.label}...`;

                  if (isPasswordField && isEdit) {
                    placeholder =
                      currentLang === 'ta'
                        ? '•••••••• (மாற்ற விரும்பினால் மட்டும் உள்ளிடவும்)'
                        : '•••••••• (Leave blank to keep existing password)';
                  }

                  const hintText =
                    currentLang === 'ta'
                      ? field.hintTa || field.hint
                      : field.hintEn || field.hint;

                  return (
                    <div
                      key={field.name}
                      className={`admin-form-field ${isFullWidth ? 'full-width' : ''} ${hasError ? 'field-invalid' : ''}`}
                    >
                      <label className="admin-field-label">
                        {field.label}
                        {isRequired && <span className="req-star">*</span>}
                      </label>

                      {field.type === 'select' ? (
                        <select
                          className={`admin-form-input ${hasError ? 'has-error' : ''}`}
                          value={val !== undefined ? String(val) : ''}
                          onChange={(e) =>
                            handleFieldChange(field.name, e.target.value, field.type, field)
                          }
                          onBlur={() => handleFieldBlur(field.name, field)}
                          required={isRequired}
                        >
                          <option value="">-- {t('common:buttons.filter', 'Select')} --</option>
                          {field.options?.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      ) : isPasswordField ? (
                        <div className="password-input-wrapper">
                          <input
                            type={isVisible ? 'text' : 'password'}
                            className={`admin-form-input password-input ${hasError ? 'has-error' : ''}`}
                            value={val !== undefined ? val : ''}
                            onChange={(e) =>
                              handleFieldChange(field.name, e.target.value, 'password', field)
                            }
                            onBlur={() => handleFieldBlur(field.name, field)}
                            placeholder={placeholder}
                            autoComplete="new-password"
                          />
                          <button
                            type="button"
                            className="password-toggle-btn"
                            onClick={() => toggleShowPassword(field.name)}
                            title={isVisible ? 'Hide password' : 'Show password'}
                            tabIndex={-1}
                          >
                            {isVisible ? '🙈' : '👁️'}
                          </button>
                        </div>
                      ) : field.type === 'textarea' ? (
                        <textarea
                          rows={field.rows || 3}
                          className={`admin-form-input admin-form-textarea ${hasError ? 'has-error' : ''}`}
                          value={val !== undefined ? val : ''}
                          onChange={(e) =>
                            handleFieldChange(field.name, e.target.value, 'textarea', field)
                          }
                          onBlur={() => handleFieldBlur(field.name, field)}
                          placeholder={placeholder}
                          required={isRequired}
                        />
                      ) : (
                        <input
                          type={field.type || 'text'}
                          step={field.step || 'any'}
                          className={`admin-form-input ${hasError ? 'has-error' : ''}`}
                          value={val !== undefined ? val : ''}
                          onChange={(e) =>
                            handleFieldChange(field.name, e.target.value, field.type, field)
                          }
                          onBlur={() => handleFieldBlur(field.name, field)}
                          placeholder={placeholder}
                          required={isRequired}
                        />
                      )}

                      {/* Field Error Message */}
                      {hasError && (
                        <span className="field-error-msg">
                          ⚠️ {errorMessage}
                        </span>
                      )}

                      {/* Field Helper Hint */}
                      {!hasError && hintText && (
                        <span className="field-hint-text">
                          💡 {hintText}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="admin-modal-footer">
            <button
              type="button"
              className="admin-modal-btn cancel-btn"
              onClick={onClose}
              disabled={isSubmitting}
            >
              {t('common:buttons.cancel', 'Cancel')}
            </button>

            <button
              type="submit"
              className="admin-modal-btn save-btn"
              disabled={isSubmitting || (useJsonMode && !!jsonError)}
            >
              {isSubmitting
                ? t('common:buttons.saving', 'Saving...')
                : isEdit
                ? `💾 ${t('common:buttons.submit', 'Update')}`
                : `➕ ${t('common:buttons.create', 'Create')}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
