import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../common/Button";

function Register() {
  const navigate = useNavigate();
  const { joinCode } = useParams();
  const [quizInfo, setQuizInfo] = useState({});
  const [error, setError] = useState("");
  const [registered, setRegistered] = useState(false);
  const showDashboard =
    error === "User has already registered for the quiz !" || registered;

  useEffect(() => {
    const getQuizPreview = async () => {
      try {
        const quizPreview = await axios.get(`/api/v1/quiz/preview/${joinCode}`);
        setQuizInfo(quizPreview.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getQuizPreview();
  }, [joinCode]);

  const deadline = new Date(quizInfo.deadline);

  const registerForQuiz = async () => {
    setError("");
    try {
      const response = await axios.post(`/api/v1/quiz/join/${joinCode}`);
      setRegistered(true);
      console.log(response);
    } catch (error) {
      if (
        error.response?.data?.message ===
        "User has already registered for the quiz !"
      ) {
        setRegistered(true);
      }
      setError(error.response?.data?.message || "Something went wrong");
    }
  };

  if (Object.keys(quizInfo).length === 0) {
    return (
      <div className="text-red-400 text-center text-lg font-semibold mt-10">
        INVALID QUIZ CODE
      </div>
    );
  }

  return (
    <div className="min-h-screen  text-white font-poppins px-6 py-10">
      <div className="bg-indigo-900/30 backdrop-blur-md border border-indigo-400/40 rounded-3xl shadow-lg shadow-indigo-600/20 hover:shadow-indigo-500/40 transition-all duration-300 p-6 w-[95%] md:w-[70%] lg:w-[55%] mx-auto">
        {/* Header Section */}
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <h3
              className="text-2xl font-bold text-indigo-300 tracking-wide"
              style={{ fontFamily: "Delius, cursive" }}
            >
              {quizInfo.title}
            </h3>
            <p className="text-sm text-gray-300">{quizInfo.description}</p>
            <span
              className={`text-sm font-semibold mt-1 ${
                quizInfo.difficulty === "Hard"
                  ? "text-red-400"
                  : quizInfo.difficulty === "Medium"
                  ? "text-yellow-400"
                  : "text-green-400"
              }`}
            >
              {quizInfo.difficulty}
            </span>
          </div>

          <span
            className={`text-xs font-semibold px-4 py-1 rounded-full ${
              quizInfo.mode === "live"
                ? "bg-red-600 text-white shadow-[0_0_10px_rgba(255,0,0,0.6)]"
                : "bg-green-600 text-white shadow-[0_0_10px_rgba(0,255,0,0.6)]"
            }`}
          >
            {quizInfo.mode === "async" ? "SELF PACED" : "LIVE"}
          </span>
        </div>

        {/* Divider */}
        <div className="h-px bg-indigo-500/40 my-4"></div>

        {/* Quiz Info */}
        <div className="flex flex-wrap justify-between text-sm text-gray-300">
          <p>
            <span className="text-indigo-400 font-medium">
              {quizInfo.domain}
            </span>{" "}
            | {quizInfo.totalQuestions} Questions | {quizInfo.duration} Minutes
          </p>
          <p>
            {quizInfo.mode === "live" ? "At" : "Due"}:{" "}
            <span className="text-indigo-300 font-semibold">
              {deadline.toLocaleString()}
            </span>
          </p>
        </div>

        {/* Participants */}
        <div className="mt-3 text-sm text-gray-400">
          <span className="font-medium text-indigo-400">
            {quizInfo.participants}
          </span>{" "}
          participants
        </div>
      </div>

      {/* Action Section */}
      {deadline > new Date() ? (
        <div className="flex flex-col justify-center items-center mt-6">
          <div className="w-fit text-center font-bold">
            <button
              disabled={registered}
              onClick={registerForQuiz}
              className={`px-6 py-2 rounded-xl border border-green-500 shadow-md shadow-green-500/30 
                bg-gray-700/70 text-green-400 font-semibold 
                transition-all duration-200 ease-in-out 
                hover:bg-green-600 hover:text-white 
                active:scale-95 active:shadow-inner disabled:cursor-not-allowed`}
            >
              {registered ? "REGISTERED !" : "REGISTER NOW !"}
            </button>
          </div>

          {error && (
            <div className="text-red-600 border-2 border-red-600 rounded-xl bg-gray-200/90 p-2 my-4 text-center w-fit mx-auto transition-opacity duration-500 ease-in-out opacity-100">
              {error}
            </div>
          )}

          {showDashboard && (
            <div className="my-4">
              <button
                onClick={() => navigate("/dashboard")}
                className="px-6 py-2 rounded-xl border border-gray-300 
                  bg-indigo-700 text-white font-semibold 
                  shadow-md shadow-indigo-400/50 
                  transition-all duration-200 ease-in-out 
                  hover:bg-indigo-600 hover:shadow-lg 
                  active:scale-95 active:shadow-inner"
              >
                GO TO DASHBOARD
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="w-fit mx-auto mt-6 text-center text-red-400 font-bold bg-gray-800/70 border border-red-500 rounded-xl p-4 shadow-md shadow-red-500/30">
          THE DEADLINE FOR THE QUIZ HAS PASSED
        </div>
      )}
    </div>
  );
}

export default Register;
