import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import { dbWorkerClient } from './workers/dbWorkerClient';
import './index.css';

const results = await Promise.allSettled([dbWorkerClient.initialize()]);
results.forEach((result, index) => {
  if (result.status === 'rejected') {
    console.error(
      `[Main] Worker initialization ${index} failed:`,
      result.reason,
    );
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
