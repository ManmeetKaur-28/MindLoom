import React, { useState, useEffect } from "react";

function QuestionCard({ question, options, handleAnswer, disableOptions }) {
  const [selectedAnswer, setSelectedAnswer] = useState("");

  useEffect(() => {
    if (!disableOptions) setSelectedAnswer("");
  }, [disableOptions]);

  return (
    <div className="bg-indigo-900/60 p-6 rounded-3xl border border-indigo-500/40 shadow-lg shadow-indigo-600/20 hover:shadow-indigo-500/40 transition-all duration-300 text-white font-poppins">
      {/* Question */}
      <div
        className="text-xl font-bold mb-4 bg-linear-to-r from-pink-400 to-indigo-400 bg-clip-text text-transparent tracking-wide text-center"
        style={{ fontFamily: "Delius, cursive" }}
      >
        {question}
      </div>

      {/* Options */}
      <ul className="flex flex-col gap-4">
        {options.map((option) => {
          const isSelected = selectedAnswer === option;
          return (
            <li
              key={option}
              onClick={() => {
                if (!disableOptions) {
                  setSelectedAnswer(option);
                  handleAnswer(option);
                }
              }}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
    ${
      selectedAnswer === option
        ? "bg-indigo-700 text-white shadow-md shadow-indigo-500"
        : disableOptions
        ? "cursor-not-allowed bg-gray-800 text-gray-400"
        : "bg-indigo-500/30 text-indigo-200 hover:bg-indigo-600 hover:text-white cursor-pointer"
    }`}
            >
              {option}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default QuestionCard;
