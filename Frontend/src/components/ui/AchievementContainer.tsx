import Confetti from "react-confetti";
import { useState } from "react";

export default function AchievementContainer({
  goal,
  progress,
  description,
}: {
  goal: number;
  progress: number;
  description: string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const progressWidth = `${(progress / goal) * 100}%`;
  const isComplete = progress >= goal;

  return (
    <div
      className={`bg-gray-100 border ${
        isComplete ? "border-green-500" : "border-gray-300"
      }  p-5 rounded-lg shadow-md w-96 m-5`}
      onMouseEnter={() => isComplete && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <Confetti
          width={window.innerWidth} // Use window dimensions for larger spread
          height={window.innerHeight}
          numberOfPieces={400}
          recycle={false}
          tweenDuration={3000}
        />
      )}
      <div
        className={`text-lg font-semibold mb-2 ${
          isComplete ? "text-slate-400" : "text-slate-600"
        }`}
      >
        {description}
      </div>{" "}
      {/* Description displayed as a separate element */}
      <div className="bg-zinc-400 rounded-full overflow-hidden h-4 text-xs flex mb-2">
        <div
          style={{ width: progressWidth }}
          className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
            isComplete ? "bg-green-600" : "bg-green-500"
          }`}
        ></div>
      </div>
      <div
        className={`font-bold ${
          isComplete ? "text-slate-400" : "text-slate-600"
        }`}
      >
        Progress: {progress} / {goal}
        {isComplete && (
          <span className="ml-2 text-green-600 font-bold">Completed!</span>
        )}
      </div>
    </div>
  );
}
