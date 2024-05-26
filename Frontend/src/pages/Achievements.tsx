import AchievementContainer from "../components/ui/AchievementContainer";
import useAuthContext from "../hooks/useAuthContext";

export default function Achievements() {
  const { user, sendEmailVerificationLink, status, loading } = useAuthContext();
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
      <h1 className="text-lg italic py-6">Achievements</h1>
      <AchievementContainer
        goal={100}
        progress={32}
        description="Achieve 100 5 star ratings on Google Reviews"
      />
      <AchievementContainer
        goal={100}
        progress={100}
        description="Achieve 10 5 star ratings on Google Reviews"
      />
    </div>
  );
}
