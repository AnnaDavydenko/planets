import React from 'react'
import ReactDOM from 'react-dom/client'
import theme from './theme';
import App from './App.jsx';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@emotion/react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);