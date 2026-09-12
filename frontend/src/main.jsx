import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './i18n';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Suspense fallback={<div className="i18n-loading-screen"><div className="spinner"></div><p>Loading Language / மொழி ஏற்றப்படுகிறது...</p></div>}>
      <App />
    </Suspense>
  </React.StrictMode>,
);

