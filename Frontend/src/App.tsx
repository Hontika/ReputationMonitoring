import { Toaster, ToastBar, toast } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import AuthLayout from './components/layout/AuthLayout';
import GuestLayout from './components/layout/GuestLayout';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import QuickStart from './pages/QuickStart';
import Profile from './pages/Profile';

import ErrorBoundary from './components/ErrorBoundary';

export default function App() {
  return (
    <>
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
          <Route path="/profile" element={<Profile />} />
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
