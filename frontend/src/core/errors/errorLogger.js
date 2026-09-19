/**
 * Enterprise Client-Side Error Logger
 * Scrubs sensitive authentication tokens and passes formatted diagnostics.
 */

const SENSITIVE_KEYS = ['password', 'token', 'authorization', 'bearer', 'secret', 'credentials'];

function scrubSensitiveData(obj) {
  if (!obj || typeof obj !== 'object') return obj;

  if (Array.isArray(obj)) {
    return obj.map((item) => scrubSensitiveData(item));
  }

  const cleaned = {};
  for (const [key, value] of Object.entries(obj)) {
    const lowerKey = key.toLowerCase();
    if (SENSITIVE_KEYS.some((s) => lowerKey.includes(s))) {
      cleaned[key] = '[REDACTED]';
    } else if (typeof value === 'object' && value !== null) {
      cleaned[key] = scrubSensitiveData(value);
    } else {
      cleaned[key] = value;
    }
  }
  return cleaned;
}

export const errorLogger = {
  error(error, errorInfo = null, context = {}) {
    const isDev = import.meta.env?.DEV ?? true;
    const sanitizedContext = scrubSensitiveData(context);

    const logPayload = {
      name: error?.name || 'Error',
      message: error?.message || 'Unknown error occurred',
      stack: isDev ? error?.stack : undefined,
      componentStack: isDev ? errorInfo?.componentStack : undefined,
      context: sanitizedContext,
      url: window.location.href,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString()
    };

    if (isDev) {
      console.group(`🚨 [Application Error]: ${logPayload.message}`);
      console.error('Error Details:', error);
      if (errorInfo) console.error('Component Stack:', errorInfo.componentStack);
      if (Object.keys(sanitizedContext).length > 0) console.info('Context:', sanitizedContext);
      console.groupEnd();
    } else {
      // In production, suppress verbose logs to protect privacy and internal structure
      console.error(`[Application Error]: ${logPayload.message}`);
      // In future: send to remote logging service (e.g. Sentry, Datadog)
    }

    return logPayload;
  },

  warn(message, details = null) {
    if (import.meta.env?.DEV) {
      console.warn(`⚠️ [Application Warning]: ${message}`, details);
    }
  }
};

export default errorLogger;
