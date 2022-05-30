import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

export const API_URL = 'https://localhost:7201';
export const API_PRODUCTS_URL = `${API_URL}/products`;
export const API_SALESPERSONS_URL = `${API_URL}/salespersons`;
export const API_REMUNERATIONS_URL = `${API_URL}/remunerations`;
export const API_REMUNERATIONS_MONTHLY_REPORT_URL = `${API_REMUNERATIONS_URL}/monthly-report`;
export const API_SALES_URL = `${API_URL}/sales`;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
