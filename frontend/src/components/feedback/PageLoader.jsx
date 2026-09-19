import React from 'react';

/**
 * Enterprise Route Loading Fallback
 * Lightweight and non-blocking placeholder for React.lazy route transitions.
 */
export default function PageLoader({ text = 'கணிக்கப்படுகிறது... / Loading Astrological Data...' }) {
  return (
    <div
      className="portal-page-loader-wrapper"
      role="status"
      aria-live="polite"
      style={{
        minHeight: '450px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 20px',
        textAlign: 'center'
      }}
    >
      <div
        className="portal-spinner-ring"
        style={{
          width: '54px',
          height: '54px',
          borderRadius: '50%',
          border: '3.5px solid rgba(245, 158, 11, 0.15)',
          borderTopColor: '#f59e0b',
          animation: 'portalSpin 0.9s cubic-bezier(0.4, 0, 0.2, 1) infinite',
          marginBottom: '20px'
        }}
      />
      <span
        style={{
          fontSize: '14px',
          color: 'var(--text-secondary, #d97706)',
          fontWeight: '500',
          letterSpacing: '0.02em'
        }}
      >
        {text}
      </span>

      <style>{`
        @keyframes portalSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
