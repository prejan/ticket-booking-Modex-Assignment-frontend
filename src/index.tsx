import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ShowProvider } from './context/ShowContext';
import './styles/app.css';

const root = createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <ShowProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ShowProvider>
  </React.StrictMode>
);
