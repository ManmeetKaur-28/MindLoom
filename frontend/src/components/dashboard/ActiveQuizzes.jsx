import React, { useEffect, useState } from "react";
import { ActiveQuizCard } from "../index";
import axios from "axios";
import { BASE_URL } from "../../import";

function ActiveQuizzes() {
  const [quizData, setQuizData] = useState([]);
  const [quizMode, setQuizMode] = useState("all");

  const liveQuizzes =
    quizData.length > 0
      ? quizData.filter((quiz) => quiz.quizId && quiz.quizId.mode === "live")
      : [];

  const asyncQuizzes =
    quizData.length > 0
      ? quizData.filter((quiz) => quiz.quizId && quiz.quizId.mode === "async")
      : [];

  useEffect(() => {
    const getActiveQuizzes = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/v1/user/active-quizzes`,
          { withCredentials: true }
        );
        setQuizData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getActiveQuizzes();
  }, []);

  return (
    <div className="bg-gray-900 backdrop-blur-md border border-indigo-400/40 rounded-3xl p-6 mt-10 shadow-lg shadow-indigo-600/20 hover:shadow-indigo-500/40 text-white font-poppins  mx-auto">
      {/* Section Header */}
      <div className="bg-indigo-950 text-white p-4 mb-6 rounded-2xl shadow-md w-full">
        <h3
          className="text-2xl font-bold text-indigo-300 mb-2 tracking-wide"
          style={{ fontFamily: "Delius, cursive" }}
        >
          Available Quizzes
        </h3>
        <p className="text-gray-300">
          Join live or go solo — complete quizzes your way before time runs out!
        </p>
      </div>

      {/* Mode Switcher - Left aligned */}
      <div className="flex justify-start mt-4">
        <div className="flex bg-indigo-300 p-1.5 rounded-3xl w-fit shadow-md">
          <button
            onClick={() => setQuizMode("all")}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ease-in-out ${
              quizMode === "all"
                ? "bg-white shadow text-black"
                : "text-gray-700 hover:text-black"
            }`}
          >
            All Quizzes
          </button>
          <button
            onClick={() => setQuizMode("live")}
            className={`flex items-center gap-1 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ease-in-out ${
              quizMode === "live"
                ? "bg-white shadow text-black"
                : "text-gray-700 hover:text-black"
            }`}
          >
            <span className="bg-red-600 w-2 h-2 rounded-xl mr-1"></span>
            Live
          </button>
          <button
            onClick={() => setQuizMode("async")}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ease-in-out ${
              quizMode === "async"
                ? "bg-white shadow text-black"
                : "text-gray-700 hover:text-black"
            }`}
          >
            Self Paced
          </button>
        </div>
      </div>

      {/* Quiz List */}
      {quizData.length > 0 ? (
        <ul className="mt-6 space-y-4">
          {(quizMode === "all"
            ? quizData
            : quizMode === "live"
            ? liveQuizzes
            : asyncQuizzes
          ).map((quiz) => (
            <li key={quiz.id}>
              <ActiveQuizCard {...quiz.quizId} status={quiz.status} />
            </li>
          ))}
        </ul>
      ) : (
        <h1
          className="text-xl text-indigo-300 text-center m-4 py-4 font-semibold"
          style={{ fontFamily: "Delius, cursive" }}
        >
          No Active Quizzes Yet!
        </h1>
      )}
    </div>
  );
}

export default ActiveQuizzes;
