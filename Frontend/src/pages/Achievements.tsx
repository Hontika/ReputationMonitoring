import AchievementContainer from "../components/ui/AchievementContainer";

export default function Achievements() {
  return (
    <div>
      <h1 className="text-lg italic">Achievements</h1>
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
