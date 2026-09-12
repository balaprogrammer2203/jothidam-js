import React from 'react';
import { useTranslation } from 'react-i18next';
import { formatDmsString } from '../../../../utils/coordinateUtils';

export default function LocationInfoBanner({
  fullName,
  formattedAddress,
  latitude,
  longitude,
  gmt,
  dst,
  timezone,
  ayanamsaName,
  ayanamsaType,
  ayanamsa
}) {
  const { t } = useTranslation('horoscope');

  const ayanamsaLabel = ayanamsaName || ayanamsaType || 'Lahiri';
  const displayAyanamsa = typeof ayanamsa === 'number' ? ayanamsa.toFixed(4) : ayanamsa;

  const latDms = latitude !== undefined && latitude !== null && latitude !== '' ? formatDmsString(latitude, 'lat') : null;
  const lngDms = longitude !== undefined && longitude !== null && longitude !== '' ? formatDmsString(longitude, 'lng') : null;
  const gmtDisplay = gmt || timezone || '+05:30';
  const dstDisplay = dst || '+05:30';

  return (
    <div className="chart-meta-infobar">
      {fullName && (
        <div className="meta-infobar-item">
          <span className="meta-infobar-icon">👤</span>
          <span className="meta-infobar-label">{t('form.name', 'Name')}:</span>
          <span className="meta-infobar-value font-bold">{fullName}</span>
        </div>
      )}

      <div className="meta-infobar-item">
        <span className="meta-infobar-icon">📍</span>
        <span className="meta-infobar-label">{t('form.birthPlace', 'Birth Place')}:</span>
        <span className="meta-infobar-value">{formattedAddress || 'Selected Place'}</span>
        {latDms && lngDms && (
          <span className="meta-infobar-coord-badge" title={`Decimal: ${Number(latitude).toFixed(4)}°, ${Number(longitude).toFixed(4)}°`}>
            Lat: {latDms} | Long: {lngDms}
          </span>
        )}
      </div>

      <div className="meta-infobar-item">
        <span className="meta-infobar-icon">🌐</span>
        <span className="meta-infobar-label">GMT / DST:</span>
        <span className="meta-infobar-value">
          GMT: <strong>{gmtDisplay}</strong> | DST: <strong>{dstDisplay}</strong>
        </span>
      </div>

      <div className="meta-infobar-item">
        <span className="meta-infobar-icon">🌌</span>
        <span className="meta-infobar-label">{t('form.ayanamsa', 'Ayanamsa')}:</span>
        <span className="meta-infobar-value">
          {ayanamsaLabel} {displayAyanamsa ? `(${displayAyanamsa}°)` : ''}
        </span>
      </div>
    </div>
  );
}
