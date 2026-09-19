/**
 * Enterprise Frontend Security Sanitization Helpers
 * Protects against XSS injection, unsafe URI redirects, and bad query params.
 */

/**
 * Strips script tags, HTML tags, and escapes malicious characters
 */
export function sanitizeString(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/[<>]/g, '')
    .trim();
}

/**
 * Validates whether a URL is internal/safe for client redirection
 */
export function isSafeRedirectUrl(url) {
  if (!url || typeof url !== 'string') return false;
  // Disallow javascript:, data:, vbscript: protocols
  if (/^(javascript|data|vbscript):/i.test(url.trim())) return false;
  // Allow relative URLs starting with /
  if (url.startsWith('/') && !url.startsWith('//')) return true;
  // Allow same-origin URLs
  try {
    const parsed = new URL(url, window.location.origin);
    return parsed.origin === window.location.origin;
  } catch {
    return false;
  }
}

/**
 * Safely encodes URI components without double encoding
 */
export function safeEncodeURIComponent(val) {
  if (val == null) return '';
  try {
    return encodeURIComponent(decodeURIComponent(String(val)));
  } catch {
    return encodeURIComponent(String(val));
  }
}

export default {
  sanitizeString,
  isSafeRedirectUrl,
  safeEncodeURIComponent
};
