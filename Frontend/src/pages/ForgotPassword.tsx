import { FormEvent, useEffect, useState } from 'react';
import Spinner from '../components/ui/Spinner';
import useAuthContext from '../hooks/useAuthContext';
import toast from 'react-hot-toast';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const { sendPasswordResetLink, loading, errors, status } = useAuthContext();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    sendPasswordResetLink({ email });
    setEmail('');
  };

  useEffect(() => {
    if (status) {
      toast.success(status);
    }
  }, [status]);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
          Forgot password?
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" method="POST" onSubmit={handleSubmit}>
          <div>
            <p className="text-sm my-1">
              Enter your registered email address, and we'll email you a link to
              reset your password.
            </p>
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
            <button
              type="submit"
              className="flex w-full justify-center px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm items-center gap-x-2 disabled:cursor-not-allowed"
              disabled={loading}
            >
              <Spinner loading={loading} />
              <span>Send link</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
