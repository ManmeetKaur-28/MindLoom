import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiItem } from "../components/index";
import { useParams } from "react-router-dom";

function QuestionsPage() {
  const { quizId } = useParams();
  const [quizInfo, setQuizInfo] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    const getQuizInfo = async () => {
      try {
        const response = await axios.get(`/api/v1/quiz/all/${quizId}`);
        setQuizInfo(response.data.data);
      } catch (error) {
        setError(error.response?.data?.message || "Unable to fetch quiz info");
      }
    };
    getQuizInfo();
  }, [quizId]);

  return (
    <div className="min-h-screen px-6 py-10 font-poppins bg-linear-to-br from-gray-950 via-indigo-950 to-black text-gray-200">
      {error === "" && Object.keys(quizInfo).length > 0 ? (
        <div className="w-[95%] md:w-[80%] lg:w-[65%] mx-auto space-y-8">
          {/* Quiz Summary Card */}
          <div className="bg-gray-900/80 backdrop-blur-md border border-indigo-400/40 rounded-3xl shadow-lg shadow-indigo-600/20 hover:shadow-indigo-500/40 transition-all duration-300 p-6 text-white">
            <div className="flex flex-col gap-2">
              <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4 items-start">
                {/* LEFT SIDE */}
                <div className="flex flex-col gap-2">
                  <h3
                    className="text-3xl font-bold bg-linear-to-r from-pink-400 to-indigo-400 bg-clip-text text-transparent tracking-wide"
                    style={{ fontFamily: "Delius, cursive" }}
                  >
                    {quizInfo.title}
                  </h3>

                  {quizInfo.description && (
                    <p className="text-sm text-gray-300 wrap-break-word">
                      {quizInfo.description}
                    </p>
                  )}

                  {/* Difficulty */}
                  <span
                    className={`text-sm font-semibold ${
                      quizInfo.difficulty === "hard"
                        ? "text-red-400"
                        : quizInfo.difficulty === "medium"
                        ? "text-yellow-400"
                        : "text-green-400"
                    }`}
                  >
                    {quizInfo.difficulty}
                  </span>
                </div>

                {/* RIGHT SIDE */}
                <div className="flex flex-col gap-2 justify-center">
                  <span
                    className={`text-xs text-center font-semibold px-3 py-1 rounded-full ${
                      quizInfo.mode === "live"
                        ? "bg-red-600 text-white shadow-[0_0_10px_rgba(255,0,0,0.6)]"
                        : "bg-green-600 text-white shadow-[0_0_10px_rgba(0,255,0,0.6)]"
                    } whitespace-nowrap`}
                  >
                    {quizInfo.mode === "async" ? "SELF PACED" : "LIVE"}
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-indigo-500/40 my-3"></div>

              {/* Info */}
              <div className="text-sm text-gray-300 space-y-2">
                <p>
                  <span className="text-indigo-400 font-medium">
                    {quizInfo.domain}
                  </span>{" "}
                  | {quizInfo.totalQuestions} Questions | {quizInfo.duration}{" "}
                  Minutes
                </p>
                <p>
                  Created At:{" "}
                  <span className="text-indigo-300 font-semibold">
                    {new Date(quizInfo.createdAt).toLocaleString()}
                  </span>
                </p>
                <p>
                  Deadline:{" "}
                  <span className="text-indigo-300 font-semibold">
                    {new Date(quizInfo.deadline).toLocaleString()}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Questions List */}
          <div>
            <ul className="space-y-4">
              {quizInfo.allQuestions.map((item, idx) => (
                <li key={idx}>
                  <AiItem {...item} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="text-red-500 bg-gray-800/90 text-lg text-center w-fit rounded-xl mx-auto px-4 py-2 shadow-md shadow-red-500/30">
          {error}
        </div>
      )}
    </div>
  );
}

export default QuestionsPage;
