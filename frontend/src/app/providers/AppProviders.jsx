import React from 'react';
import ErrorBoundary from '../ErrorBoundary';
import { ThemeProvider } from './ThemeContext';
import { AuthProvider } from './AuthContext';

/**
 * Enterprise Provider Composer
 * Consolidates all root contexts into a single maintainable hierarchy.
 */
export default function AppProviders({ children }) {
  return (
    <ErrorBoundary name="RootApplicationBoundary">
      <ThemeProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
