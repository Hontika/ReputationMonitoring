import { ReactNode, createContext, useEffect, useState } from 'react';
import axios from '../lib/axios';
import { useNavigate, Navigate } from 'react-router-dom';
import toast from 'react-hot-toast'

type AuthProviderProps = {
  children: ReactNode;
};

type User = {
  name?: string;
  email?: string;
  twitter?: string;
  reddit?: string;
  companyName?: string;
  img?: string;
  created_at?: string;
  id?: string;
  updated_at?: string;
  email_verified_at?: string;
};

type Errors = {
  name?: string[];
  twitter?: string[];
  reddit?: string[];
  companyName?: string[];
  email?: string[];
  password?: string[];
};

type LoginParams = { email: string; password: string };

type RegisterParams = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

type NewPasswordParams = {
  email: string | number;
  token: string | undefined;
  password: string;
  password_confirmation: string;
};

type UpdateProfileParams = {
  name?: string;
  email?: string;
};

export interface AuthContextValues {
  csrf: () => void;
  errors: Errors;
  user: User | null;
  login: (data: LoginParams) => void;
  register: (data: RegisterParams) => void;
  logout: () => void;
  incrementGraph: () => void;
  incrementSearches: () => void;
  incrementInfluencer: () => void;
  loading: boolean;
  sessionVerified: boolean;
  status: string | null;
  setStatus: React.Dispatch<React.SetStateAction<string | null>>;
  sendPasswordResetLink: (data: { email: string }) => void;
  newPassword: (data: NewPasswordParams) => void;
  sendEmailVerificationLink: () => void;
  updateProfile: (data: UpdateProfileParams) => void;
}

export const AuthContext = createContext<AuthContextValues>(
  {} as AuthContextValues
);

const SESSION_NAME = 'session-verified';

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<string | null>(null);
  const navigate = useNavigate();

  const sessionData = window.localStorage.getItem(SESSION_NAME);
  const initialSessionVerified = sessionData ? JSON.parse(sessionData) : false;
  const [sessionVerified, setSessionVerified] = useState(
    initialSessionVerified
  );
  const csrf = () => axios.get('/sanctum/csrf-cookie');

  const getUser = async () => {
    try {
      const { data } = await axios.get('/api/user');
      setUser(data);
      setSessionVerified(true);
      window.localStorage.setItem(SESSION_NAME, 'true');
    } catch (e) {
      console.warn('Error ', e);
    }
  };

  const login = async ({ ...data }) => {
    setErrors({});
    setLoading(true);
    try {
      await csrf();
      await axios.post('/login', data);
      await getUser();
      navigate('/');
    } catch (e) {
      if (typeof e === 'object' && e !== null && 'response' in e) {
        console.warn((e as { response: { data: unknown } }).response.data);
        setErrors(
          (e as { response: { data: { errors: [] } } }).response.data.errors
        );
      } else {
        console.warn(e);
      }
    } finally {
      setTimeout(() => setLoading(false), 2000);
    }
  };

  const register = async ({ ...data }) => {
    setErrors({});
    setLoading(true);
    try {
      await csrf();
      await axios.post('/register', data);
      await getUser();
      navigate('/');
    } catch (e) {
      if (typeof e === 'object' && e !== null && 'response' in e) {
        console.warn((e as { response: { data: unknown } }).response.data);
        setErrors(
          (e as { response: { data: { errors: [] } } }).response.data.errors
        );
      } else {
        console.warn(e);
      }
    } finally {
      setTimeout(() => setLoading(false), 2000);
    }
  };

  const sendPasswordResetLink = async ({ ...data }) => {
    setErrors({});
    setLoading(true);
    setStatus(null);
    try {
      await csrf();
      const response = await axios.post('/forgot-password', data);
      setStatus(response.data?.status);
    } catch (e) {
      if (typeof e === 'object' && e !== null && 'response' in e) {
        console.warn((e as { response: { data: unknown } }).response.data);
        setErrors(
          (e as { response: { data: { errors: [] } } }).response.data.errors
        );
      } else {
        console.warn(e);
      }
    } finally {
      setTimeout(() => setLoading(false), 2000);
    }
  };

  const newPassword = async ({ ...data }) => {
    setErrors({});
    setLoading(true);
    setStatus(null);
    try {
      await csrf();
      const response = await axios.post('/reset-password', data);
      setStatus(response.data?.status);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (e) {
      if (typeof e === 'object' && e !== null && 'response' in e) {
        console.warn((e as { response: { data: unknown } }).response.data);
        setErrors(
          (e as { response: { data: { errors: [] } } }).response.data.errors
        );
      } else {
        console.warn(e);
      }
    } finally {
      setTimeout(() => setLoading(false), 2000);
    }
  };

  const sendEmailVerificationLink = async () => {
    setErrors({});
    setLoading(true);
    setStatus(null);
    try {
      await csrf();
      const response = await axios.post('/email/verification-notification');
      setStatus(response.data?.status);
    } catch (e) {
      if (typeof e === 'object' && e !== null && 'response' in e) {
        console.warn((e as { response: { data: unknown } }).response.data);
        setErrors(
          (e as { response: { data: { errors: [] } } }).response.data.errors
        );
      } else {
        console.warn(e);
      }
    } finally {
      setTimeout(() => setLoading(false), 2000);
    }
  };

  const updateProfile = async (data: UpdateProfileParams) => {
    setErrors({});
    setLoading(true);
    try {
      await csrf();
      const response = await axios.post('/api/user/profile', data);
      setUser(response.data);
      toast.success('Profile updated!');
    } catch (e) {
      if (typeof e === 'object' && e !== null && 'response' in e) {
        console.warn((e as { response: { data: unknown } }).response.data);
        setErrors((e as { response: { data: { errors: [] } } }).response.data.errors);
        toast.error('Error while updating profile!');
      } else {
        console.warn(e);
      }
    } finally {
      setLoading(false);
    }
  };

  const incrementGraph = async () => {
    setErrors({});
    setLoading(true);
    try {
      await csrf();
      const response = await axios.post('/api/increment-graph-interactions');
    } catch (e) {
      if (typeof e === 'object' && e !== null && 'response' in e) {
        console.warn((e as { response: { data: unknown } }).response.data);
        setErrors((e as { response: { data: { errors: [] } } }).response.data.errors);
        toast.error("Error while increasing KPI!");
      } else {
        console.warn(e);
      }
    } finally {
      setLoading(false);
    }
  };

  const incrementSearches = async () => {
    setErrors({});
    setLoading(true);
    try {
      await csrf();
      const response = await axios.post('/api/increment-searches');
    } catch (e) {
      if (typeof e === 'object' && e !== null && 'response' in e) {
        console.warn((e as { response: { data: unknown } }).response.data);
        setErrors((e as { response: { data: { errors: [] } } }).response.data.errors);
        toast.error("Error while increasing KPI!");
      } else {
        console.warn(e);
      }
    } finally {
      setLoading(false);
    }
  };

  const incrementInfluencer = async () => {
    setErrors({});
    setLoading(true);
    try {
      await csrf();
      const response = await axios.post('/api/increment-influencer-interactions');
    } catch (e) {
      if (typeof e === 'object' && e !== null && 'response' in e) {
        console.warn((e as { response: { data: unknown } }).response.data);
        setErrors((e as { response: { data: { errors: [] } } }).response.data.errors);
        toast.error("Error while increasing KPI!");
      } else {
        console.warn(e);
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setSessionVerified(false);
      await axios.post('/logout');
      setUser(null);
      window.localStorage.removeItem(SESSION_NAME);
    } catch (e) {
      console.warn(e);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await getUser();
      } catch (e) {
        console.warn(e);
      } finally {
        setLoading(false);
        setSessionVerified(false);
      }
    };

    if (!user) {
      fetchUser();
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        csrf,
        errors,
        user,
        login,
        register,
        logout,
        updateProfile,
        incrementGraph,
        incrementSearches,
        incrementInfluencer,
        loading,
        status,
        sessionVerified,
        setStatus,
        sendPasswordResetLink,
        newPassword,
        sendEmailVerificationLink,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
