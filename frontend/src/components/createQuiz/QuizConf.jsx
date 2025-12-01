import React from "react";
import { useFormContext } from "react-hook-form";
import { AiCreate, ManualCreate } from "..";

function QuizConf() {
  const { register, getValues } = useFormContext();
  return (
    <div className="max-w-3xl mx-auto bg-indigo-900/30 p-6 rounded-2xl shadow-md">
      {getValues("type") == "ai" ? (
        <div className="mb-6">
          <p className="font-medium text-lg mb-2 text-indigo-200">
            AI Configuration :
          </p>
          <AiCreate />
        </div>
      ) : (
        <div className="mb-6">
          <p className="font-medium text-lg mb-2 text-indigo-200">
            Manual Configuration :
          </p>
          <ManualCreate />
        </div>
      )}
    </div>
  );
}

export default QuizConf;
