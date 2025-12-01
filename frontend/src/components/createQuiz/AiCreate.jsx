import React, { useEffect, useState } from "react";
import { Button, Input, AiItem } from "../index";
import { set, useForm, useFormContext } from "react-hook-form";
import axios from "axios";
function AiCreate() {
  const { handleSubmit, register, setValue } = useFormContext();
  const [generate, setGenerate] = useState("Generate");
  const [quizData, setQuizData] = useState([]);

  useEffect(() => {
    setValue("allQuestions", quizData);
  }, [quizData]);

  const generateAi = async (data, e) => {
    e.preventDefault();
    setQuizData([]);
    try {
      setGenerate("Generating.....");
      const response = await axios.post("/api/v1/generate-quiz", data, {
        headers: { "Content-Type": "application/json" },
      });
      setGenerate("Regenerate");
      const createdQuiz = response.data.data;
      setQuizData(createdQuiz);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <form className="flex flex-col justify-center ">
        <Input
          label="Number of Questions "
          type="number"
          min="1"
          max="30"
          placeholder="e.g. 10"
          {...register("totalQuestions", { required: true })}
        />
        <Input
          label="Topic/Instruction for AI "
          placeholder="e.g. Create questions about React Hooks, focusing on useEffect and useState"
          {...register("instructions")}
        />
        <div>
          <ul>
            {quizData.length > 0 &&
              quizData.map((item) => (
                <li id={item.id}>
                  <AiItem {...item} />
                </li>
              ))}
          </ul>
        </div>

        {generate == "Generating....." && (
          <span class=" mx-auto mt-4 animate-spin h-8 w-8 border-2 border-white border-t-transparent rounded-full"></span>
        )}

        <div className="flex flex-col justify-center mx-auto">
          <Button
            children={generate}
            type="submit"
            bgColor="bg-blue-700 hover:bg-blue-600"
            textColor="text-white"
            className="px-6 py-2 rounded-xl font-semibold shadow-[0_0_15px_rgba(59,130,246,0.25)] transition-all duration-200 active:scale-95 disabled:cursor-not-allowed"
            disabled={generate == "Generating....." ? true : false}
            onClick={handleSubmit(generateAi)}
          />
        </div>
      </form>
    </div>
  );
}

export default AiCreate;
