import React from 'react';
import ReactDOM from 'react-dom/client';

// Self-hosted webfonts (no third-party font CDN, no layout-shifting request).
import '@fontsource/anton';
import '@fontsource-variable/archivo/wdth.css';
import '@fontsource-variable/inter';
import '@fontsource/space-mono/400.css';
import '@fontsource/space-mono/700.css';

import './index.css';
import App from './App';

const container = document.getElementById('root');

if (container) {
  ReactDOM.createRoot(container).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}

/** Safety net: if React never boots the static poster stays visible (see index.html). */
window.setTimeout(() => {
  document.getElementById('boot-veil')?.setAttribute('data-fallback-hidden', 'true');
}, 6000);
