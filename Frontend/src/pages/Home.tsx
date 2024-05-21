import { useEffect, useState } from "react";
import useAuthContext from "../hooks/useAuthContext";
import toast from "react-hot-toast";
import Spinner from "../components/ui/Spinner";
import axios from "axios";
import Graph from "../components/ui/Graph";

export default function Home() {
  const { user, sendEmailVerificationLink, status, loading } = useAuthContext();
  const [reviews, setReviews] = useState<{ date: string; rating: number }[]>(
    []
  );

  console.log(import.meta.env.VITE_SERPAPI_KEY);
  console.log(user?.companyName);

  useEffect(() => {
    if (status) {
      toast.success(status);
    }

    const mockReviews = [
      { date: "2023-05-01", rating: 4 },
      { date: "2023-05-02", rating: 5 },
      { date: "2023-05-03", rating: 3 },
      { date: "2023-05-04", rating: 4 },
      { date: "2023-05-05", rating: 2 },
    ];

    // Set the mock reviews data
    setReviews(mockReviews);

    const fetchData = async () => {
      try {
        const result = await axios.get(
          `http://localhost:8000/api/fetch-reviews`,
          {
            params: { companyName: user?.companyName },
          }
        );
        console.log(result.data); // Output should be the data from SerpAPI
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    if (user?.companyName) {
      fetchData();
    }
  }, [status, user?.companyName]);

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
      <div className="flex flex-wrap gap-4">
        {reviews.length > 0 && (
          <div className="w-2/5">
            <Graph reviews={reviews} />
          </div>
        )}
        {reviews.length > 0 && (
          <div className="w-2/5">
            <Graph reviews={reviews} />
          </div>
        )}
      </div>
    </>
  );
}
