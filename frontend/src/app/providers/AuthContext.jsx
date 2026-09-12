import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../../features/auth/services/auth.service';
import i18n from '../../i18n';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('jothidam_auth_token') || null);
  const [loading, setLoading] = useState(true);

  // Initialize session on mount
  useEffect(() => {
    const initAuth = async () => {
      const savedToken = localStorage.getItem('jothidam_auth_token');
      if (savedToken) {
        try {
          const userData = await authService.getMe();
          setUser(userData);
          if (userData?.preferredLanguage && !localStorage.getItem('jothidam_locale')) {
            i18n.changeLanguage(userData.preferredLanguage);
          }
        } catch (err) {
          console.warn('Session expired or invalid:', err.message);
          localStorage.removeItem('jothidam_auth_token');
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (username, password) => {
    const data = await authService.login(username, password);
    if (data.token && data.user) {
      localStorage.setItem('jothidam_auth_token', data.token);
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
      localStorage.setItem('jothidam_auth_token', data.token);
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

  const logout = () => {
    localStorage.removeItem('jothidam_auth_token');
    setToken(null);
    setUser(null);
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
