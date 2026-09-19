import React, { useState } from 'react';

/**
 * Enterprise Vedic-Themed Error Boundary Fallback Screen
 * Provides actionable recovery (Reset, Reload, Navigate Home),
 * with development diagnostics and production privacy scrubbing.
 */
export default function ErrorBoundaryFallback({
  error,
  resetErrorBoundary,
  title = 'Something unexpected occurred',
  subtitle = 'எதிர்பாராத பிழை ஏற்பட்டுள்ளது. மீண்டும் முயற்சி செய்யவும்.'
}) {
  const [showDetails, setShowDetails] = useState(false);
  const isDev = import.meta.env?.DEV ?? true;

  const handleReload = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="portal-error-fallback-wrapper" style={{
      minHeight: '400px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      fontFamily: 'inherit'
    }}>
      <div className="portal-error-card" style={{
        maxWidth: '560px',
        width: '100%',
        backgroundColor: 'var(--bg-surface, #1e150b)',
        border: '1px solid var(--border-color, rgba(245, 158, 11, 0.25))',
        borderRadius: '16px',
        padding: '36px 28px',
        textAlign: 'center',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.45)'
      }}>
        {/* Spiritual Om Icon / Glyphs */}
        <div style={{
          width: '68px',
          height: '68px',
          margin: '0 auto 20px',
          borderRadius: '50%',
          backgroundColor: 'rgba(239, 68, 68, 0.12)',
          border: '1.5px solid rgba(239, 68, 68, 0.35)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '32px'
        }}>
          🕉️
        </div>

        <h3 style={{
          fontSize: '22px',
          fontWeight: '700',
          color: 'var(--text-primary, #fef3c7)',
          margin: '0 0 8px 0'
        }}>
          {title}
        </h3>

        <p style={{
          fontSize: '14px',
          color: 'var(--text-secondary, #d97706)',
          marginBottom: '16px',
          lineHeight: '1.5'
        }}>
          {subtitle}
        </p>

        <p style={{
          fontSize: '13px',
          color: 'var(--text-muted, #a8a29e)',
          marginBottom: '28px',
          lineHeight: '1.6'
        }}>
          An issue occurred while processing astrological data or rendering this section.
          You can try refreshing the view or returning to the homepage.
        </p>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          justifyContent: 'center',
          marginBottom: '20px'
        }}>
          {resetErrorBoundary && (
            <button
              type="button"
              onClick={resetErrorBoundary}
              style={{
                padding: '10px 20px',
                borderRadius: '8px',
                backgroundColor: '#f59e0b',
                color: '#100b05',
                fontWeight: '600',
                fontSize: '14px',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              Try Again
            </button>
          )}

          <button
            type="button"
            onClick={handleReload}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              backgroundColor: 'rgba(245, 158, 11, 0.15)',
              color: '#fbbf24',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              fontWeight: '600',
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            Reload Page
          </button>

          <button
            type="button"
            onClick={handleGoHome}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              backgroundColor: 'transparent',
              color: '#a8a29e',
              border: '1px solid rgba(168, 162, 158, 0.25)',
              fontWeight: '500',
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            Home / முகப்பு
          </button>
        </div>

        {/* Developer Diagnostics (Hidden in Production) */}
        {isDev && error && (
          <div style={{ textAlign: 'left', marginTop: '20px' }}>
            <button
              type="button"
              onClick={() => setShowDetails(!showDetails)}
              style={{
                background: 'none',
                border: 'none',
                color: '#94a3b8',
                fontSize: '12px',
                cursor: 'pointer',
                textDecoration: 'underline',
                padding: 0
              }}
            >
              {showDetails ? 'Hide Technical Diagnostics ▲' : 'Show Technical Diagnostics ▼'}
            </button>

            {showDetails && (
              <div style={{
                marginTop: '10px',
                padding: '12px',
                backgroundColor: '#0f172a',
                borderRadius: '6px',
                border: '1px solid #334155',
                fontSize: '11px',
                color: '#f87171',
                fontFamily: 'monospace',
                overflowX: 'auto',
                maxHeight: '180px'
              }}>
                <div style={{ fontWeight: 'bold', marginBottom: '6px' }}>
                  {error.toString()}
                </div>
                {error.stack && (
                  <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                    {error.stack}
                  </pre>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
