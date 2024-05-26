import { Outlet, Navigate } from 'react-router-dom';
import useAuthContext from '../../hooks/useAuthContext';
import Navbar from '../ui/Navbar';
import Spinner from '../ui/Spinner';

export default function GuestLayout() {
  const { user, sessionVerified } = useAuthContext();

  if (sessionVerified && !user) {
    return (
      <div className="w-full h-screen min-h-[300px] -mt-5 justify-center rounded-md text-2xl font-bold leading-9 tracking-tight text-gray-900 flex items-center gap-x-3 hover:cursor-progress pointer-events-none select-none">
        <div className="scale-150">
          <Spinner loading={true} />
        </div>
        <span>Authenticating...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="h-full py-10">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 content">
          <Outlet />
        </div>
      </div>
    </div>);
}
