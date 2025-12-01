import React from "react";

function AiItem({
  question,
  options,
  correctAnswer,
  id,
  explanation,
  time_limit_seconds,
}) {
  return (
    <div className="bg-indigo-950/50 p-5 rounded-2xl border border-indigo-800 shadow-sm my-5">
      {/* Question */}
      <div className="text-lg font-medium p-3 bg-indigo-900/70 text-white rounded-xl mb-3">
        Q.{id} {question}
      </div>

      {/* Options */}
      <ul className="flex flex-col gap-2">
        {options.map((option) => (
          <li
            key={option}
            className={`py-2 px-3 rounded-xl cursor-pointer text-sm transition-all duration-200
              ${
                option === correctAnswer
                  ? "bg-green-300/80 text-gray-900 hover:bg-green-400/80"
                  : "bg-indigo-300/70 text-gray-900 hover:bg-indigo-400/80"
              }`}
          >
            {option}
          </li>
        ))}
      </ul>

      {/* Explanation and Time */}
      <div className="mt-4 bg-indigo-900/30 text-gray-200 rounded-xl p-3 text-sm leading-relaxed">
        <p>
          <span className="font-semibold text-white">Explanation:</span>{" "}
          <span className="text-gray-300">{explanation}</span>
        </p>
        <p className="mt-1">
          <span className="font-semibold text-white">Time Limit:</span>{" "}
          <span className="text-gray-300">{time_limit_seconds} s</span>
        </p>
      </div>
    </div>
  );
}

export default AiItem;
