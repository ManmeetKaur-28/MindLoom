import React, { useState } from "react";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";

function CreatedQuizzesStats({
  _id,
  title,
  description,
  difficulty,
  domain,
  deadline,
  totalQuestions,
  duration,
  participants,
  mode,
  joinCode,
}) {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const quizDeadline = new Date(deadline);
  const url = `${import.meta.env.VITE_HOME_URL}/register/${joinCode}`;

  const copyQuizUrl = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="bg-gray-800/80 backdrop-blur-md border border-indigo-400/40 rounded-3xl 
                 shadow-lg shadow-indigo-600/20 hover:shadow-indigo-500/40 transition-all duration-300 
                 p-6 text-white font-poppins w-full h-full"
    >
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <h3
              className="text-xl font-bold text-indigo-300 wrap-break-word"
              style={{ fontFamily: "Delius, cursive" }}
            >
              {title}
            </h3>
            {description && (
              <p className="text-sm text-gray-300 wrap-break-word">{description}</p>
            )}
            <span
              className={`text-sm font-semibold ${
                difficulty?.toLowerCase() === "hard"
                  ? "text-red-400"
                  : difficulty?.toLowerCase() === "medium"
                  ? "text-yellow-400"
                  : "text-green-400"
              }`}
            >
              {difficulty}
            </span>
          </div>

          <div className="flex flex-col gap-2 items-end">
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full ${
                mode === "live"
                  ? "bg-red-600 text-white shadow-[0_0_10px_rgba(255,0,0,0.6)]"
                  : "bg-green-600 text-white shadow-[0_0_10px_rgba(0,255,0,0.6)]"
              } whitespace-nowrap`}
            >
              {mode === "async" ? "SELF PACED" : "LIVE"}
            </span>
            <button
              onClick={copyQuizUrl}
              className={`text-xs font-semibold px-3 py-1 rounded-full border transition-all duration-300 ${
                copied
                  ? "bg-blue-600 text-white border-blue-700 shadow-[0_0_10px_rgba(0,0,255,0.6)]"
                  : "bg-indigo-500/30 text-indigo-200 border-indigo-600 hover:bg-indigo-600 hover:text-white"
              }`}
            >
              {copied ? "Copied!" : "Copy Link"}
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-indigo-500/40 my-3"></div>

        {/* Info */}
        <div className="text-sm text-gray-300 space-y-1">
          <p>
            <span className="text-indigo-400 font-medium">{domain}</span> |{" "}
            {totalQuestions} Questions | {duration} Minutes
          </p>
          <p>
            Due:{" "}
            <span className="text-indigo-300 font-semibold">
              {quizDeadline.toLocaleString()}
            </span>
          </p>
        </div>

        {/* Participants */}
        <div className="mt-3 text-sm text-gray-400">
          <span className="font-medium text-indigo-400">{participants}</span>{" "}
          participants
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex justify-center flex-wrap gap-3">
          <Button onClick={() => navigate(`/questions/${_id}`)}>
            Questions
          </Button>
          <Button onClick={() => navigate(`/leaderboard/${_id}`)}>
            Leaderboard
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CreatedQuizzesStats;
