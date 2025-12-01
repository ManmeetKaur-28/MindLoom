import React, { useEffect, useState } from "react";
import { Button} from "../index";
import { Input } from "../index";
import { useForm, useFormContext } from "react-hook-form";
function ManualCreate() {
  const { register, getValues, watch, setValue, handleSubmit, reset } =
    useFormContext();
  const [currQuestion, setCurrQuestion] = useState(1);
  const [allQuestions, setAllQuestions] = useState([
    {
      qid: 1,
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
      explanation: "",
      time_limit_seconds: 10,
    },
  ]);
  const watchedOptions = watch(["option1", "option2", "option3", "option4"]);
  const questionsCount = allQuestions.length;
  useEffect(() => {
    setValue("allQuestions", allQuestions);
    setValue("currQuestion", currQuestion);
    setValue("totalQuestions", questionsCount);
  }, [allQuestions, setValue, currQuestion]);
  // const [options, setOptions] = useState(["", "", "", ""]);
  // const [correctAnswer, setCorrectAnswer] = useState("");

  // const handleOptionChange = (index, value) => {
  //   const newOptions = [...options];
  //   newOptions[index] = value;
  //   setOptions(newOptions);

  //   // reset correct answer if it’s no longer in options
  //   if (!newOptions.includes(correctAnswer)) {
  //     setCorrectAnswer("");
  //   }
  // };
  useEffect(() => {
    register("allQuestions");
    register("currQuestion");
  }, [register]);

  const getQuestionInfo = (index) => {
    saveCurrentQuestion();
    setCurrQuestion(index + 1);
  };

  const goNext = () => {
    saveCurrentQuestion();
    setCurrQuestion((prev) => prev + 1);
  };

  const addNewQuestion = () => {
    saveCurrentQuestion();
    setCurrQuestion(questionsCount + 1);
    setAllQuestions((prev) => [
      ...prev,
      {
        qid: questionsCount + 1,
        question: "",
        options: ["", "", "", ""],
        correctAnswer: "",
        explanation: "",
        time_limit_seconds: 10,
      },
    ]);
  };

  useEffect(() => {
    const q = allQuestions[currQuestion - 1];
    const currentValues = getValues();
    if (q) {
      reset({
        ...currentValues,
        question: q.question,
        explanation: q.explanation,
        time_limit_seconds: q.time_limit_seconds,
        option1: q.options[0],
        option2: q.options[1],
        option3: q.options[2],
        option4: q.options[3],
      });
    }
  }, [currQuestion, reset]);

  const saveCurrentQuestion = () => {
    const data = getValues();
    setAllQuestions((prev) =>
      prev.map((q) =>
        q.qid == currQuestion
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
      )
    );
  };
  const deleteQuestion = () => {
    setAllQuestions((prev) =>
      prev
        .filter((item) => item.qid != currQuestion)
        .map((item, index) => ({
          ...item,
          qid: index + 1,
        }))
    );

    if (currQuestion == 1) setCurrQuestion((prev) => prev + 1);
    else setCurrQuestion((prev) => prev - 1);
  };
  console.log(getValues());
  return (
    <div>
      <div className="bg-indigo-950/40 p-5 rounded-2xl border border-indigo-800 shadow-sm space-y-3">
        {/* Question */}
        <Input
          label="Question"
          placeholder="Enter your question"
          {...register("question", { required: true })}
        />

        {/* Options */}
        <div className="flex flex-col mt-5 w-full max-w-md mx-auto ">
          <label className="text-white font-semibold tracking-wide px-3 ">
            Options
          </label>
          <div className="flex flex-col gap-2 mt-1">
            {[0, 1, 2, 3].map((i) => (
              <Input
                key={i}
                type="text"
                placeholder={`Option ${i + 1}`}
                {...register(`option${i + 1}`, { required: true })}
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
            {...register("correctAnswer", { required: true })}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-white/10 text-gray-100 placeholder-gray-400 
                border border-indigo-400/60 focus:border-indigo-500 focus:ring-2 
                focus:ring-indigo-400/70 outline-none transition-all duration-200"
          >
            <option value="">Select correct answer</option>
            {watchedOptions
              .filter((opt) => opt && opt.trim() != "")
              .map((opt, i) => (
                <option value={opt} key={i}>
                  {opt}
                </option>
              ))}
          </select>
        </div>

        {/* Explanation */}
        <Input
          label="Explanation"
          placeholder="Enter explanation for the correct answer"
          {...register("explanation")}
        />

        {/* Time Limit */}
        <Input
          label="Time Limit (seconds)"
          type="number"
          placeholder="e.g. 30"
          min="5"
          {...register("time_limit_seconds", { required: true })}
        />
        <div className="flex justify-center">
          {questionsCount > 1 && (
            <Button children="Delete" className="" onClick={deleteQuestion} />
          )}{" "}
          {currQuestion != questionsCount && (
            <Button children="Next" className="" onClick={goNext} />
          )}
          <Button children="Add New" className="" onClick={addNewQuestion} />
        </div>
      </div>

      <ul className="flex flex-wrap my-4">
        {Array.from({ length: questionsCount }, (_, i) => (
          <button
            key={i}
            onClick={() => getQuestionInfo(i)}
            className={`${
              currQuestion == i + 1
                ? "bg-indigo-100 text-indigo-950 border-indigo-950  "
                : "bg-indigo-950 text-white border-indigo-900 hover:border-indigo-950 hover:bg-indigo-100 hover:text-indigo-950"
            } w-9 py-2 mx-1 border-3 rounded-2xl mt-2 transition`}
          >
            {i + 1}
          </button>
        ))}
      </ul>
    </div>
  );
}

export default ManualCreate;
