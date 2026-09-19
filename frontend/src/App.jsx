import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppProviders from './app/providers/AppProviders';
import ScrollToTop from './components/common/ScrollToTop';
import Layout from './components/layout/Layout';
import AppRoutes from './app/AppRoutes';
import './index.css';

export default function App() {
  return (
    <BrowserRouter>
      <AppProviders>
        <ScrollToTop />
        <Layout>
          <AppRoutes />
        </Layout>
      </AppProviders>
    </BrowserRouter>
  );
}