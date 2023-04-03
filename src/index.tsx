import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/index.scss';
import reportWebVitals from './reportWebVitals';

import { TokenProvider } from './context/TokenContext';
import Root from './Root';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <TokenProvider>
      <Root />
    </TokenProvider>
  </React.StrictMode>
);

reportWebVitals();
