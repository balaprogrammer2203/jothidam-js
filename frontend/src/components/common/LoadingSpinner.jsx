import React from 'react';

/**
 * Reusable Micro Loading Spinner
 */
export default function LoadingSpinner({ size = 20, color = '#f59e0b', className = '' }) {
  return (
    <span
      className={`portal-loading-spinner ${className}`}
      style={{
        display: 'inline-block',
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        border: `2px solid ${color}33`,
        borderTopColor: color,
        animation: 'portalSpinnerRotate 0.8s linear infinite',
        verticalAlign: 'middle'
      }}
    >
      <style>{`
        @keyframes portalSpinnerRotate {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </span>
  );
}
