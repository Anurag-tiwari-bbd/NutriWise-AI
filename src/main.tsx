import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Latest Version Protection: Actively unregister any stale/rogue ServiceWorkers and clear localhost caches
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    for (const registration of registrations) {
      registration.unregister().then((success) => {
        if (success) {
          console.info('[NutriWise Engine] Successfully unregistered legacy ServiceWorker on localhost.');
        }
      });
    }
  }).catch(() => {});
}

// Version & Build Integrity Diagnostic Watermark
console.info(
  `%c NutriWise AI %c v${typeof __APP_VERSION__ !== 'undefined' ? __APP_VERSION__ : '1.0.0'} %c Built: ${typeof __BUILD_TIMESTAMP__ !== 'undefined' ? __BUILD_TIMESTAMP__ : 'Live Dev'} `,
  'background:#059669;color:#fff;font-weight:bold;padding:2px 6px;border-radius:4px 0 0 4px;',
  'background:#10b981;color:#fff;font-weight:bold;padding:2px 6px;',
  'background:#0B1220;color:#94a3b8;padding:2px 6px;border-radius:0 4px 4px 0;'
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
