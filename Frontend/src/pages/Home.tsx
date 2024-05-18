import { useEffect } from "react";
import useAuthContext from "../hooks/useAuthContext";
import toast from "react-hot-toast";
import Spinner from "../components/ui/Spinner";
import axios from "axios";

export default function Home() {
  const { user, sendEmailVerificationLink, status, loading } = useAuthContext();

  console.log(import.meta.env.VITE_SERPAPI_KEY);

  useEffect(() => {
    if (status) {
      toast.success(status);
    }
    const fetchData = async () => {
      try {
        const result = await axios.get("http://localhost:8000/api/fetch-data");
        console.log(result.data); // Output should be: { message: "This is a test response" }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [status]);

  return (
    <>
      {!user?.email_verified_at && (
        <div className="p-4 emailconfirm flex items-center gap-x-10">
          <p className="text-sm font-bold emailconfirm">
            Please verify your email address.
          </p>
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
      <h1 className="text-lg italic py-6">
        Hello, <strong className="not-italic">{user?.name}</strong>!
      </h1>
      <p>{import.meta.env.VITE_SERPAPI_KEY}</p>
    </>
  );
}
