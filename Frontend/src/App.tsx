import { Toaster, ToastBar, toast } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import WebFont from 'webfontloader';
import React, { useState, useEffect } from 'react';
import { GlobalStyles } from './theme/GlobalStyles';
import styled, { ThemeProvider } from "styled-components";
import { useTheme } from './theme/useTheme';
import AuthLayout from './components/layout/AuthLayout';
import GuestLayout from './components/layout/GuestLayout';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import QuickStart from './pages/QuickStart';
import Profile from './pages/Profile';
import { getFromLS } from './utils/storage';

import ErrorBoundary from './components/ErrorBoundary';

export default function App() {
  const { theme, themeLoaded, getFonts } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState(theme);

  const switchTheme = () => {
    setSelectedTheme(getFromLS('theme'));
  };

  useEffect(() => {
    setSelectedTheme(theme);
  }, [themeLoaded]);

  useEffect(() => {
    WebFont.load({
      google: {
        families: getFonts()
      }
    });
  });

  return (
    <>
      {
        themeLoaded && <ThemeProvider theme={selectedTheme}>
          <GlobalStyles />
          <Routes>
            <Route
              element={
                <ErrorBoundary>
                  <AuthLayout />
                </ErrorBoundary>
              }
            >
              <Route path="/" element={<Home />} />
              <Route path="/quickstart" element={<QuickStart />} />
              <Route path="/profile" element={<Profile switchTheme={switchTheme}/>} />
            </Route>
            <Route
              element={
                <ErrorBoundary>
                  <GuestLayout />
                </ErrorBoundary>
              }
            >
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/password-reset/:token" element={<ResetPassword />} />
            </Route>
          </Routes>
        </ThemeProvider>
      }
      <Toaster position="bottom-right" toastOptions={{ duration: 4000 }}>
        {(t) => (
          <ToastBar toast={t}>
            {({ icon, message }) => (
              <>
                {icon}
                {message}
                {t.type !== 'loading' && (
                  <button onClick={() => toast.dismiss(t.id)}>X</button>
                )}
              </>
            )}
          </ToastBar>
        )}
      </Toaster>
    </>
  );
}
