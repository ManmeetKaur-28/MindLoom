import React from "react";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";

function PrevQuizStats({
  quizId,
  title,
  difficulty,
  rank,
  domain,
  attemptedDate,
  score,
  totalScore,
  correctQuestions,
  totalQuestions,
}) {
  const xp = Math.round((score / totalScore) * 100);
  const attemptDate = new Date(attemptedDate);
  const navigate = useNavigate();

  return (
    <div
      className="bg-gray-800/80 backdrop-blur-md border border-indigo-400/40 rounded-3xl 
                 shadow-lg shadow-indigo-600/20 hover:shadow-indigo-500/40 transition-all duration-300 
                 p-6 text-white font-poppins w-full h-full"
    >
      {/* Header */}
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <h3
              className="text-xl font-bold text-indigo-300 wrap-break-word"
              style={{ fontFamily: "Delius, cursive" }}
            >
              {title}
            </h3>
            <p className="text-sm text-gray-300">
              Score: {score}/{totalScore}
            </p>
            <span
              className={`text-sm font-semibold ${
                difficulty.toLowerCase() === "hard"
                  ? "text-red-400"
                  : difficulty.toLowerCase() === "medium"
                  ? "text-yellow-400"
                  : "text-green-400"
              }`}
            >
              {difficulty}
            </span>
          </div>
          <span
            className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-600 text-white 
                       shadow-[0_0_10px_rgba(79,70,229,0.6)] whitespace-nowrap"
          >
            Rank #{rank === 0 ? "NIL" : rank}
          </span>
        </div>

        {/* Divider */}
        <div className="h-px bg-indigo-500/40 my-3"></div>

        {/* Info */}
        <div className="text-sm text-gray-300 space-y-1">
          <p>
            <span className="text-indigo-400 font-medium">{domain}</span> |{" "}
            {totalQuestions} Questions | Accuracy: {correctQuestions}/
            {totalQuestions}
          </p>
          <p>
            Attempted:{" "}
            <span className="text-indigo-300 font-semibold">
              {attemptDate.toLocaleString()}
            </span>
          </p>
        </div>

        {/* XP */}
        <div className="mt-3 text-sm text-gray-400">
          <span className="font-medium text-indigo-400">XP Earned: {xp}%</span>
        </div>

        {/* Performance Bar */}
        <div className="mt-2">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Performance</span>
            <span>{xp}%</span>
          </div>
          <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
            <div
              className="bg-linear-to-r from-indigo-500 to-indigo-300 h-2 rounded-full transition-all duration-500"
              style={{ width: `${xp}%` }}
            ></div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex justify-center flex-wrap ">
          <Button
            className="text-sm"
            onClick={() => navigate(`/result/${quizId}`)}
          >
            Performance
          </Button>
          <Button
            className="text-sm"
            onClick={() => navigate(`/leaderboard/${quizId}`)}
          >
            Leaderboard
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PrevQuizStats;
