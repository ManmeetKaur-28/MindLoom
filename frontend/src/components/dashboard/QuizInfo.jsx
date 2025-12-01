import React, { useState } from "react";

function QuizInfo(props) {
  const [copied, setCopied] = useState(false);
  const deadline = new Date(props.deadline);
  const url = `${import.meta.env.VITE_HOME_URL}/register/${props.joinCode}`;
  const copyQuizUrl = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  return (
    <div className="bg-gray-800/80 backdrop-blur-md border border-indigo-400/40 rounded-3xl shadow-lg shadow-indigo-600/20 hover:shadow-indigo-500/40 transition-all duration-300 p-6 text-white font-poppins  h-full">
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4 items-start">
          {/* LEFT SIDE */}
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold text-indigo-300 wrap-break-word">
              {props.title}
            </h3>

            {props.description && (
              <p className="text-sm text-gray-300 wrap-break-word">
                {props.description}
              </p>
            )}

            <span
              className={`text-sm font-semibold ${
                props.difficulty === "Hard"
                  ? "text-red-400"
                  : props.difficulty === "Medium"
                  ? "text-yellow-400"
                  : "text-green-400"
              }`}
            >
              {props.difficulty}
            </span>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col  gap-2 justify-center">
            <span
              className={`text-xs text-center font-semibold px-3 py-1 rounded-full ${
                props.mode === "live"
                  ? "bg-red-600 text-white shadow-[0_0_10px_rgba(255,0,0,0.6)]"
                  : "bg-green-600 text-white shadow-[0_0_10px_rgba(0,255,0,0.6)]"
              } whitespace-nowrap`}
            >
              {props.mode === "async" ? "SELF PACED" : "LIVE"}
            </span>

            <button
              onClick={copyQuizUrl}
              className={`text-xs font-semibold px-3 py-1 rounded-full border transition-all duration-300 ${
                copied
                  ? "bg-blue-600 text-white border-blue-700 shadow-[0_0_10px_rgba(0,0,255,0.6)] "
                  : "bg-indigo-500/30 text-indigo-200 border-indigo-600 hover:bg-indigo-600 hover:text-white"
              }`}
            >
              {copied ? "Copied      " : "Copy to Clipboard"}
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-indigo-500/40 my-3"></div>

        {/* Info */}
        <div className="text-sm text-gray-300 space-y-1">
          <p>
            <span className="text-indigo-400 font-medium">{props.domain}</span>{" "}
            | {props.totalQuestions} Questions | {props.duration} Minutes
          </p>
          <p>
            Due:{" "}
            <span className="text-indigo-300 font-semibold">
              {deadline.toLocaleString()}
            </span>
          </p>
        </div>

        {/* Participants */}
        <div className="mt-3 text-sm text-gray-400">
          <span className="font-medium text-indigo-400">
            {props.participants}
          </span>{" "}
          participants
        </div>
      </div>
    </div>
  );
}

export default QuizInfo;
