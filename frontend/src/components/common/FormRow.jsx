import React from 'react';
import Badge from './Badge';

export default function FormRow({
  label,
  icon,
  badgeColor = 'purple',
  isRelative = false,
  error,
  children
}) {
  return (
    <div className={`epanchang-row ${error ? 'has-error' : ''}`}>
      <div className="epanchang-label-col">
        <Badge color={badgeColor} icon={icon} />
        <span className="label-text">{label}</span>
      </div>

      <div className={`epanchang-input-col ${isRelative ? 'relative-col' : ''}`}>
        {children}
        {error && (
          <div className="field-inline-error">
            <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
}
