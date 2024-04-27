import { useEffect } from 'react';
import useAuthContext from '../hooks/useAuthContext';
import toast from 'react-hot-toast';
import Spinner from '../components/ui/Spinner';

export default function Home() {
  const { user, sendEmailVerificationLink, status, loading } = useAuthContext();

  useEffect(() => {
    if (status) {
      toast.success(status);
    }
  }, [status]);

  return (
    <>
      <h1 className="text-lg italic">
        Hello, <strong className="not-italic">{user?.name}</strong>!
      </h1>

      {!user?.email_verified_at && (
        <div className="my-10 p-4 emailconfirm flex items-center gap-x-10">
          <p className="text-sm font-bold emailconfirm">Please verify your email address.</p>
          <button
            className="emailconfirmbtn py-1.5 px-4 text-lg flex items-center gap-x-2 disabled:cursor-not-allowed"
            onClick={sendEmailVerificationLink}
            disabled={loading}
          >
            {loading && <Spinner loading={loading} />}
            <span>Verify</span>
          </button>
        </div>
      )}
    </>
  );
}
