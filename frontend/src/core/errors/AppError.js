/**
 * Enterprise Application Error Hierarchy
 * Standardized error classes for predictable error handling across UI and API services.
 */

export class AppError extends Error {
  constructor(message, code = 'APP_ERROR', status = 500, details = null) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.status = status;
    this.details = details;
    this.timestamp = new Date().toISOString();
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export class HttpError extends AppError {
  constructor(message, status = 500, code = 'HTTP_ERROR', details = null) {
    super(message, code, status, details);
  }
}

export class AuthError extends AppError {
  constructor(message = 'Session expired or unauthenticated', status = 401, code = 'AUTH_UNAUTHORIZED') {
    super(message, code, status);
  }
}

export class ValidationError extends AppError {
  constructor(message = 'Invalid input data provided', details = null) {
    super(message, 'VALIDATION_ERROR', 422, details);
  }
}

export class NetworkError extends AppError {
  constructor(message = 'Network connection failure. Please check your internet connection.') {
    super(message, 'NETWORK_ERROR', 0);
  }
}

export default {
  AppError,
  HttpError,
  AuthError,
  ValidationError,
  NetworkError
};
