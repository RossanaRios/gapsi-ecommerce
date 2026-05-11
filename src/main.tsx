// PWA: registra el service worker para soporte offline básico
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js');
  });
}

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import App from './App.tsx';
import './index.css';

const theme = createTheme({
  palette: {
    primary: { main: '#1a73e8' },
    background: { default: '#f8f9fa' },
  },
  typography: { fontFamily: 'Roboto, system-ui, sans-serif' },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
);
