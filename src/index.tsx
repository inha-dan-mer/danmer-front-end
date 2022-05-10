import React from 'react';
import { createRoot } from 'react-dom/client';
import '@/styles/reset.css';

import App from './App';
import { css, Global } from '@emotion/react';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Global
      styles={css`
        html {
          background-color: #272727;
        }
      `}
    />
    <App />
  </React.StrictMode>
);
