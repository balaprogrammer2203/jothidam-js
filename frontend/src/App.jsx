import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './app/providers/AuthContext';
import { ThemeProvider } from './app/providers/ThemeContext';
import ScrollToTop from './components/common/ScrollToTop';
import Layout from './components/layout/Layout';
import AppRoutes from './app/AppRoutes';
import './index.css';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <ScrollToTop />
          <Layout>
            <AppRoutes />
          </Layout>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}