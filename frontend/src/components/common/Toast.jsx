import React, { useState, useEffect, useRef } from 'react';

export default function Toast({ message, onClose, duration = 5000 }) {
  const [isExiting, setIsExiting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);
  const remainingTimeRef = useRef(duration);
  const startTimeRef = useRef(null);

  const parsed = typeof message === 'string'
    ? { type: 'info', text: message }
    : message;

  const type = parsed?.type || 'info';
  const text = parsed?.text || '';
  const title = parsed?.title || (
    type === 'success' ? 'Success' :
    type === 'error' ? 'Error' :
    type === 'warning' ? 'Warning' : 'Notice'
  );
  const toastDuration = parsed?.duration || duration;

  useEffect(() => {
    if (!message) return;

    setIsExiting(false);
    remainingTimeRef.current = toastDuration;
    startTimeRef.current = Date.now();

    timerRef.current = setTimeout(() => {
      handleClose();
    }, toastDuration);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [message, toastDuration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      if (onClose) onClose();
    }, 280);
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      const elapsed = Date.now() - (startTimeRef.current || Date.now());
      remainingTimeRef.current = Math.max(400, remainingTimeRef.current - elapsed);
    }
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    startTimeRef.current = Date.now();
    timerRef.current = setTimeout(() => {
      handleClose();
    }, remainingTimeRef.current);
  };

  if (!message || !text) return null;

  const iconMap = {
    success: (
      <svg className="toast-type-svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6L9 17l-5-5" />
      </svg>
    ),
    error: (
      <svg className="toast-type-svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" />
        <line x1="9" y1="9" x2="15" y2="15" />
      </svg>
    ),
    warning: (
      <svg className="toast-type-svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    info: (
      <svg className="toast-type-svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    )
  };

  return (
    <div
      className={`enterprise-toast-container ${isExiting ? 'toast-exit' : 'toast-enter'}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="alert"
    >
      <div className={`enterprise-toast-card toast-${type}`}>
        {/* Left Icon Badge */}
        <div className="toast-icon-wrapper">
          {iconMap[type] || iconMap.info}
        </div>

        {/* Content */}
        <div className="toast-content-wrapper">
          <div className="toast-title-row">
            <span className="toast-title-text">{title}</span>
            <span className="toast-time-hint">5s</span>
          </div>
          <p className="toast-message-text">{text}</p>
        </div>

        {/* Close Button */}
        {onClose && (
          <button
            type="button"
            className="toast-dismiss-btn"
            onClick={handleClose}
            title="Dismiss notification"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}

        {/* 5-second Animated Progress Bar */}
        <div
          className={`toast-progress-bar ${isPaused ? 'paused' : ''}`}
          style={{ animationDuration: `${toastDuration}ms` }}
        />
      </div>
    </div>
  );
}
