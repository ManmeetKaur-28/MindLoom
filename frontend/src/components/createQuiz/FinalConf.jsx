import React, { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import axios from "axios";

function FinalConf({ isFinal }) {
  const { register, handleSubmit, watch, getValues } = useFormContext();
  const [error, setError] = useState("");
  const [quizUrl, setQuizUrl] = useState("");
  const data = watch();
  console.log(data);
  const ref = useRef();
  const copyLink = () => {
    navigator.clipboard.writeText(quizUrl);
    ref.current.select();
  };
  // const allQuestions = watch("allQuestions");
  // console.log(allQuestions);
  // console.log(getValues("allQuestions"));
  useEffect(() => {
    if (isFinal) {
      setError("");
      const getResponse = async () => {
        try {
          const response = await axios.post("/api/v1/quiz/add", data);
          console.log(response);
          const joinCode = response.data.data;
          setQuizUrl(`${import.meta.env.VITE_HOME_URL}/register/${joinCode}`);
        } catch (error) {
          console.log(error);
          ///-------------set error
          setError(error.message);
        }
      };
      getResponse();
    }
  }, [isFinal]);
 

  return (
    <div>
      {error && <span className="text-red text-center">{error}</span>}
      {quizUrl && (
        <div className="flex flex-col">
          <input
            ref={ref}
            className="bg-[#0B0E22] py-2 px-3 text-center rounded-2xl border-[#1b203b] border-2"
            value={quizUrl}
          />
          <button
            onClick={copyLink}
            className="bg-gray-300 my-3 w-fit mx-auto text-[#0B0E22] rounded-xl  border-3 border-[#0B0E22] py-2 px-3 hover:bg-[#0B0E22] hover:text-white transition ease-in-out"
          >
            Copy to clipboard
          </button>
        </div>
      )}
    </div>
  );
}

export default FinalConf;
