import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Button, FinalConf, QuizConf, InitialConf } from "../index";
import { useNavigate } from "react-router-dom";

function CreateQuiz() {
  const methods = useForm({
    mode: "onChange",
    shouldUnregister: false,
    defaultValues: {
      allQuestions: [],
    },
  });

  const { trigger, getValues, setValue } = methods;
  const [pageState, setPageState] = useState(0);
  const navigate = useNavigate();

  const handleNext = async () => {
    const isValid = await trigger([
      "type",
      "title",
      "domain",
      "difficulty",
      "duration",
      "deadline",
      "mode",
    ]);
    if (isValid) {
      setPageState((prev) => prev + 1);
    } else {
      alert("Please fill all required fields before moving next");
    }
  };

  const handleFinalize = () => {
    const type = getValues("type");
    if (type === "manual") {
      const data = getValues();
      const updatedQuestions = getValues("allQuestions").map((q) =>
        q.qid === data.currQuestion
          ? {
              ...q,
              question: data.question,
              explanation: data.explanation,
              time_limit_seconds: Number(data.time_limit_seconds),
              correctAnswer: data.correctAnswer,
              options: [
                data.option1 || "",
                data.option2 || "",
                data.option3 || "",
                data.option4 || "",
              ],
            }
          : q
      );
      setValue("allQuestions", updatedQuestions);

      const allQuestions = getValues("allQuestions");
      const isComplete = allQuestions.every((q) => {
        return (
          q.question?.trim() &&
          q.correctAnswer?.trim() &&
          q.explanation?.trim() &&
          q.time_limit_seconds > 0 &&
          Array.isArray(q.options) &&
          q.options.length === 4 &&
          q.options.every((option) => option?.trim())
        );
      });

      if (!isComplete) {
        alert("All fields must be filled before finalizing the quiz");
        return;
      }
    }

    setPageState((prev) => prev + 1);
  };

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen bg-linear-to-b from-gray-950 to-indigo-950 text-white px-8 py-10 font-poppins">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1
            className="text-4xl font-semibold mb-2 bg-linear-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent"
            style={{ fontFamily: "Delius, cursive" }}
          >
            Create New Quiz
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Create quizzes manually or generate them using AI. Share with your
            audience and track their performance effortlessly.
          </p>
        </div>

        {/* Form Container */}
        <div className="max-w-3xl mx-auto bg-indigo-900/30 p-6 rounded-2xl shadow-md">
          <div className="mb-6 border-b border-indigo-700 pb-3">
            <h3
              className="text-2xl font-semibold text-indigo-300"
              style={{ fontFamily: "Delius, cursive" }}
            >
              Quiz Settings
            </h3>
            <p className="text-gray-400 text-sm mt-1">
              Configure your quiz parameters
            </p>
          </div>

          {/* Page Sections */}
          <div>
            {pageState === 0 && <InitialConf />}
            {pageState === 1 && <QuizConf />}
            {pageState === 2 && <FinalConf isFinal />}
          </div>

          {/* Navigation Buttons */}
          <div className="mt-6 flex justify-center">
            {pageState === 0 && <Button onClick={handleNext}>Next</Button>}
            {pageState === 1 && (
              <div className="flex justify-around w-fit mx-auto">
                <Button onClick={() => setPageState((prev) => prev - 1)}>
                  Go Back
                </Button>
                <Button onClick={handleFinalize}>Finalize</Button>
              </div>
            )}
            {pageState === 2 && (
              <Button onClick={() => navigate("/profile")}>Done</Button>
            )}
          </div>
        </div>
      </div>
    </FormProvider>
  );
}

export default CreateQuiz;
