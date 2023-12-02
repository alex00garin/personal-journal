import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

window.addEventListener('error', (event) => {
  if (process.env.NODE_ENV === 'development') {
    window.addEventListener('error', (event) => {
      if (event.message.includes('ResizeObserver loop limit exceeded')) {
        event.stopImmediatePropagation();
      }
    });
  }
  
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
