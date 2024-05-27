import AchievementContainer from "../components/ui/AchievementContainer";
import useAuthContext from "../hooks/useAuthContext";
import Spinner from "../components/ui/Spinner";
import axios from "axios";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";

interface Achievement {
  id?: number;
  user_id: number;
  type: string;
  goal?: number;
  progress?: number;
  new_members?: boolean;
}

export default function Achievements() {
  const { user, sendEmailVerificationLink, addAchievement, status, loading } =
    useAuthContext();
  const [achievements, setAchievements] = useState<any[]>([]);
  const [newAchievement, setNewAchievement] = useState<Achievement>({
    user_id: user.id,
    type: "",
  });
  const [goalError, setGoalError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/achievements/")
      .then((response) => setAchievements(response.data))
      .catch((error) => console.error(error));
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewAchievement({ ...newAchievement, [name]: value });

    // Validate goal for Google Reviews
    if (name === "goal" && newAchievement.type === "google_reviews") {
      const goalValue = parseFloat(value);
      if (goalValue < 1.0 || goalValue > 5.0) {
        setGoalError("Goal must be between 1.0 and 5.0");
      } else {
        setGoalError(null);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      newAchievement.type === "google_reviews" &&
      (newAchievement.goal! < 1.0 || newAchievement.goal! > 5.0)
    ) {
      setGoalError("Goal must be between 1.0 and 5.0");
      return;
    }
    try {
      await addAchievement(newAchievement);
      setAchievements([...achievements, newAchievement]);
      setNewAchievement({ user_id: user?.id, type: "" });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (status) {
      toast.success(status);
    }
  }, [status]);

  console.log(achievements);

  return (
    <div>
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
      <div className="flex flex-col md:flex-row w-full gap-4">
        <div className="w-full md:w-1/3">
          <h1 className="text-lg italic py-6">Create a new goal</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Type
              </label>
              <select
                name="type"
                value={newAchievement.type}
                onChange={handleInputChange}
                className="block w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="">Select type</option>
                <option value="google_reviews">Google Reviews</option>
                <option value="subreddit_members">Subreddit Members</option>
              </select>
            </div>
            {newAchievement.type === "google_reviews" && (
              <div>
                <p className="text-sm italic text-gray-600">
                  Set a goal for maintaining a specific average star rating on
                  Google Reviews.
                </p>
                <label className="block text-sm font-medium text-gray-700">
                  Goal
                </label>
                <input
                  type="number"
                  name="goal"
                  value={newAchievement.goal || ""}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  min="1.0"
                  max="5.0"
                  step="0.1"
                />
                {goalError && (
                  <p className="text-sm text-red-600">{goalError}</p>
                )}
              </div>
            )}
            {newAchievement.type === "subreddit_members" && (
              <div>
                <p className="text-sm italic text-gray-600">
                  Track if your subreddit page has gained new members in the
                  last 24 hours.
                </p>
              </div>
            )}
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 hover:bg-blue-600"
              >
                Add Achievement
              </button>
            </div>
          </form>
        </div>
        <div className="w-full md:w-2/3">
          <h1 className="text-lg italic py-6">Achievements</h1>
          {achievements.length > 0 ? (
            achievements.map((achievement, index) => (
              <AchievementContainer
                key={index}
                goal={achievement.goal}
                progress={achievement.progress}
                description={achievement.description}
              />
            ))
          ) : (
            <p>No achievements are available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
