import React, { useState } from "react";
import { Input } from "../index";

function ManualItem() {
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);

    if (!newOptions.includes(correctAnswer)) {
      setCorrectAnswer("");
    }
  };

  return (
    <div className="bg-indigo-950/40 p-5 rounded-2xl border border-indigo-800 shadow-sm space-y-3">
      {/* Question */}
      <Input label="Question" placeholder="Enter your question" />

      {/* Options */}
      <div className="flex flex-col mt-5 w-full max-w-md mx-auto">
        <label className="text-white font-semibold tracking-wide px-3">
          Options
        </label>
        <div className="flex flex-col gap-2 mt-1">
          {options.map((opt, i) => (
            <Input
              key={i}
              type="text"
              value={opt}
              placeholder={`Option ${i + 1}`}
              onChange={(e) => handleOptionChange(i, e.target.value)}
            />
          ))}
        </div>
      </div>

      {/* Correct Answer */}
      <div className="flex flex-col space-y-2 w-full max-w-md mx-auto my-2">
        <label className="text-white font-semibold tracking-wide px-3">
          Correct Answer
        </label>
        <select
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
          className="w-full px-4 py-2 rounded-md bg-indigo-900 text-white
             border border-indigo-400/60 focus:border-indigo-500 focus:ring-2 
             focus:ring-indigo-400/70 outline-none transition-all duration-200"
          style={{
            backgroundColor: "#1e1b4b", // solid indigo-900 fallback
            color: "white",
          }}
        >
          <option value="">Select correct answer</option>
          {options
            .filter((opt) => opt.trim() !== "")
            .map((opt, i) => (
              <option key={i} value={opt}>
                {opt}
              </option>
            ))}
        </select>
      </div>

      {/* Explanation */}
      <Input
        label="Explanation"
        placeholder="Enter explanation for the correct answer"
      />

      {/* Time Limit */}
      <Input
        label="Time Limit (seconds)"
        type="number"
        placeholder="e.g. 30"
        min="5"
      />
    </div>
  );
}

export default ManualItem;
