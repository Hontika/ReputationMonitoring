import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter as Router } from 'react-router-dom';
import './assets/index.css';
import { AuthProvider } from './context/AuthContext.tsx';
import * as themes from './theme/schema.json';
import { setToLS } from './utils/storage';


setToLS('all-themes', themes.default)
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
