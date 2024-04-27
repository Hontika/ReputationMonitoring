import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../components/ui/Spinner';
import useAuthContext from '../hooks/useAuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, errors, loading } = useAuthContext();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" method="POST" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className={`block w-full border-0 py-1.5 px-2 shadow-sm sm:text-sm sm:leading-6 ${
                  errors.email && 'ring-red-500'
                }`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {errors.email && (
              <span className="text-red-400 text-sm">{errors.email[0]}</span>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6"
              >
                Password
              </label>
              <div className="text-sm">
                <Link
                  to={'/forgot-password'}
                  className="font-semibold"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                className={`block w-full border-0 py-1.5 px-2 shadow-sm sm:text-sm sm:leading-6 ${
                  errors.password && 'ring-red-500'
                }`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {errors.password && (
              <span className="text-red-400 text-sm">{errors.password[0]}</span>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm items-center gap-x-2 disabled:cursor-not-allowed"
              disabled={loading}
            >
              <Spinner loading={loading} />
              <span>Sign in</span>
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm">
          Don't have an account?{' '}
          <Link
            to={'/register'}
            className="font-semibold leading-6"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
