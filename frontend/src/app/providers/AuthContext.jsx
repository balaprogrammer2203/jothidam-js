import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import authService from '../../features/auth/services/auth.service';
import { safeLocalStorage } from '../../core/security/storage';
import i18n from '../../i18n';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => safeLocalStorage.getItem('jothidam_auth_token', null));
  const [loading, setLoading] = useState(true);

  const logout = useCallback(() => {
    safeLocalStorage.removeItem('jothidam_auth_token');
    safeLocalStorage.removeItem('jothidam_auth_user');
    setToken(null);
    setUser(null);
  }, []);

  // Listen to global 401 session expiry event dispatched by core/apiClient
  useEffect(() => {
    const handleAuthExpired = () => {
      logout();
    };

    window.addEventListener('jothidam:auth-expired', handleAuthExpired);
    return () => {
      window.removeEventListener('jothidam:auth-expired', handleAuthExpired);
    };
  }, [logout]);

  // Initialize session on mount
  useEffect(() => {
    let isMounted = true;

    const initAuth = async () => {
      const savedToken = safeLocalStorage.getItem('jothidam_auth_token');
      if (savedToken) {
        try {
          const userData = await authService.getMe();
          if (isMounted) {
            setUser(userData);
            if (userData?.preferredLanguage && !safeLocalStorage.getItem('jothidam_locale')) {
              i18n.changeLanguage(userData.preferredLanguage);
            }
          }
        } catch (err) {
          console.warn('Session expired or invalid:', err.message);
          if (isMounted) {
            logout();
          }
        }
      }
      if (isMounted) {
        setLoading(false);
      }
    };

    initAuth();

    return () => {
      isMounted = false;
    };
  }, [logout]);

  const login = async (username, password) => {
    const data = await authService.login(username, password);
    if (data.token && data.user) {
      safeLocalStorage.setItem('jothidam_auth_token', data.token);
      setToken(data.token);
      setUser(data.user);
      if (data.user.preferredLanguage) {
        i18n.changeLanguage(data.user.preferredLanguage);
      }
    }
    return data;
  };

  const register = async (userData) => {
    const data = await authService.register(userData);
    if (data.token && data.user) {
      safeLocalStorage.setItem('jothidam_auth_token', data.token);
      setToken(data.token);
      setUser(data.user);
      if (data.user.preferredLanguage) {
        i18n.changeLanguage(data.user.preferredLanguage);
      }
    }
    return data;
  };

  const resetPassword = async (resetData) => {
    return await authService.resetPassword(resetData);
  };

  const hasRole = (...allowedRoles) => {
    if (!user || !user.role) return false;
    return allowedRoles.includes(user.role);
  };

  const value = {
    user,
    token,
    role: user?.role || null,
    isAuthenticated: !!user,
    loading,
    login,
    register,
    resetPassword,
    logout,
    hasRole
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
