import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "../index";
function InitialConf() {
  const { register, getValues, watch } = useFormContext();

  return (
    <div className="max-w-3xl mx-auto bg-indigo-900/30 p-6 rounded-2xl shadow-md">
      {/* Quiz Creation Mode */}
      <div className="mb-6">
        <p className="font-medium text-lg mb-2 text-indigo-200">
          Quiz Creation Type :
        </p>
        <div className="flex gap-6 text-gray-300">
          <label
            htmlFor="ai"
            className={`cursor-pointer px-4 py-2 rounded-lg transition ${
              getValues.type == "ai"
                ? "bg-indigo-600 text-white"
                : "hover:bg-indigo-800/40"
            }`}
          >
            <input
              {...register("type", { required: true })}
              id="ai"
              type="radio"
              name="type"
              value="ai"
              className="mr-2 accent-indigo-500"
            />
            AI Generated
          </label>
          <label
            htmlFor="manual"
            className={`cursor-pointer px-4 py-2 rounded-lg transition ${
              getValues.type == "manual"
                ? "bg-indigo-600 text-white"
                : "hover:bg-indigo-800/40"
            }`}
          >
            <input
              {...register("type", { required: true })}
              id="manual"
              type="radio"
              name="type"
              value="manual"
              className="mr-2 accent-indigo-500"
            />
            Manual Creation
          </label>
        </div>
      </div>

      {/* Form Section */}
      <form className="space-y-5">
        <Input
          label="Quiz Title"
          placeholder="e.g. Advanced React Patterns"
          {...register("title", { required: true })}
        />
        <Input
          label="Domain"
          placeholder="e.g. Computer Science"
          {...register("domain", { required: true })}
        />

        {/* Difficulty */}
        <div className="flex flex-col space-y-2 w-full max-w-md mx-auto my-2">
          <label
            htmlFor="difficulty"
            className="text-white font-semibold tracking-wide px-3"
          >
            Difficulty
          </label>
          <select
            {...register("difficulty", { required: true })}
            name="difficulty"
            id="difficulty"
            className="p-2  border-indigo-400/60 focus:ring-2 focus:ring-indigo-500 w-full px-4 py-2 rounded-md bg-white/10 text-gray-100 placeholder-gray-400 
           border 
            outline-none transition-all duration-200"
          >
            <option value="easy" className="bg-indigo-900/80 text-white">
              Easy
            </option>
            <option value="medium" className="bg-indigo-900/80 text-white">
              Medium
            </option>
            <option value="hard" className="bg-indigo-900/80 text-white">
              Hard
            </option>
          </select>
        </div>

        <Input
          label="Description (Optional)"
          placeholder="Describe what this quiz covers"
          {...register("description")}
        />

        {/* Quiz Type */}
        <div className="flex flex-col space-y-2 w-full max-w-md mx-auto my-2">
          <p className="text-white font-semibold tracking-wide px-3">
            Quiz Mode :
          </p>
          <div className="flex gap-6 text-gray-300">
            <label
              htmlFor="live"
              className="cursor-pointer px-4 py-2 rounded-lg hover:bg-indigo-800/40 transition"
            >
              <input
                {...register("mode", { required: true })}
                id="live"
                type="radio"
                name="mode"
                value="live"
                className="mr-2 accent-indigo-500"
              />
              Live Quiz
            </label>
            <label
              htmlFor="async"
              className="cursor-pointer px-4 py-2 rounded-lg hover:bg-indigo-800/40 transition"
            >
              <input
                {...register("mode", { required: true })}
                id="async"
                type="radio"
                name="mode"
                value="async"
                className="mr-2 accent-indigo-500"
              />
              Async Quiz
            </label>
          </div>
        </div>

        <Input
          type="datetime-local"
          label="Deadline"
          {...register("deadline", { required: true })}
        />

        <Input
          type="number"
          label="Duration (minutes)"
          placeholder="e.g. 10"
          min="1"
          max="30"
          {...register("duration", { required: true })}
        />

        {/* AI or Manual Form */}
        {/* {isManual ? <ManualCreate /> : <AiCreate getValues={getValues} />} */}
      </form>
    </div>
  );
}

export default InitialConf;
