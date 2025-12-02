import React, { useState, useCallback, useEffect } from "react";
import { Leaderboard, QuestionCard } from "../index";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  answerQuestion,
  changeQuestion,
  resetQuiz,
  setQuestions,
} from "../../features/quizSlice.js";
import axios from "axios";
import { BASE_URL } from "../../import.js";

function Quiz() {
  const dispatch = useDispatch();
  const { quizId } = useParams();
  const navigate = useNavigate();

  const [quizInfo, setQuizInfo] = useState({});
  const [disableOptions, setDisableOptions] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [timeUntilStart, setTimeUntilStart] = useState(1);
  const [error, setError] = useState("");

  const { current, allQuestions, quizEnded, score, answersData } = useSelector(
    (state) => state.quiz
  );

  useEffect(() => {
    setError("");
    const getQuestions = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/quiz/${quizId}`);
        setQuizInfo({
          deadline: new Date(response.data.data.deadline),
          title: response.data.data.title,
          totalQuestions: response.data.data.totalQuestions,
          duration: response.data.data.duration,
          domain: response.data.data.domain,
          mode: response.data.data.mode,
        });
        dispatch(setQuestions(response.data.data.allQuestions));
      } catch (error) {
        console.log(error);
        setError(error.response.data.message);
      }
    };
    getQuestions();
  }, [dispatch, quizId]);

  useEffect(() => {
    if (allQuestions.length > 0) {
      const limit = allQuestions[current].time_limit_seconds;
      setRemainingTime(limit);
    }
  }, [allQuestions, current]);

  useEffect(() => {
    if (quizInfo.deadline) {
      const interval = setInterval(() => {
        const now = new Date();
        const diffms = quizInfo.deadline - now;
        if (diffms > 0) {
          setTimeUntilStart(diffms);
        } else {
          setTimeUntilStart(0);
          clearInterval(interval);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [quizInfo.deadline]);

  useEffect(() => {
    if (
      remainingTime > 0 &&
      (quizInfo.mode !== "live" || timeUntilStart === 0)
    ) {
      const interval = setInterval(() => {
        setRemainingTime((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [remainingTime, timeUntilStart, quizInfo.mode]);

  useEffect(() => {
    if (allQuestions.length > 0 && remainingTime === 0) {
      dispatch(changeQuestion());
      if (quizInfo.mode === "live") setDisableOptions(false);
    }
  }, [remainingTime, allQuestions.length, quizInfo.mode, dispatch]);

  useEffect(() => {
    if (quizEnded) {
      const saveResult = async () => {
        try {
          await axios.post(`${BASE_URL}/api/v1/result/${quizId}`, {
            score,
            answersData,
            totalQuestions: quizInfo.totalQuestions,
          });
          dispatch(resetQuiz());
          navigate(`/result/${quizId}`);
        } catch (error) {
          console.log(error);
        }
      };
      saveResult();
    }
  }, [
    quizEnded,
    dispatch,
    navigate,
    quizId,
    score,
    answersData,
    quizInfo.totalQuestions,
  ]);

  const handleAnswer = async (selectedAnswer = "") => {
    dispatch(answerQuestion(selectedAnswer));
    if (quizInfo.mode === "live") setDisableOptions(true);
    if (quizInfo.mode === "async") dispatch(changeQuestion());

    if (selectedAnswer === allQuestions[current].correctAnswer) {
      try {
        const delta = 10;
        await axios.post(
          `${BASE_URL}/api/v1/leaderboard/${quizId}/increment`,
          { delta },
          { withCredentials: true }
        );
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  if (allQuestions.length === 0 && error === "") {
    return (
      <div className="text-center text-indigo-300 font-semibold mt-10">
        Loading…
      </div>
    );
  }

  if (
    allQuestions.length > 0 &&
    quizInfo.mode === "live" &&
    timeUntilStart > 0
  ) {
    return (
      <div className="w-full  mx-auto px-4  py-6">
        <div
          className="flex flex-col md:flex-row justify-between items-start md:items-center 
                     bg-linear-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl 
                     border border-indigo-500/30 shadow-[0_0_15px_rgba(124,58,241,0.5)] 
                     rounded-3xl p-6 mb-6 text-white"
        >
          <div className="space-y-1">
            <h1
              className="text-4xl font-bold bg-linear-to-r from-pink-400 to-indigo-400 
                         bg-clip-text text-transparent tracking-wide"
              style={{ fontFamily: "Delius, cursive" }}
            >
              {quizInfo.title}
            </h1>
            <p className="text-sm text-gray-400 italic">{quizInfo.domain}</p>
          </div>
        </div>
        <div className="text-center mt-4">
          <h2
            className="text-2xl font-bold bg-linear-to-r from-indigo-400 to-indigo-800 
                       bg-clip-text text-transparent tracking-wide"
            style={{ fontFamily: "Delius, cursive" }}
          >
            Time left for quiz to begin
          </h2>
          <p className="text-indigo-300 mt-2 text-lg font-medium">
            {formatTime(timeUntilStart)}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6">
      {error ? (
        <div className="text-lg text-center bg-black/70 rounded-xl text-red-500 p-4">
          {error}
        </div>
      ) : (
        <div className="flex flex-col">
          {/* Quiz Header */}
          <div
            className="flex flex-col md:flex-row justify-between items-start md:items-center 
                       bg-linear-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl 
                       border border-indigo-500/30 shadow-[0_0_15px_rgba(124,58,241,0.5)] 
                       rounded-3xl p-6 mb-6 text-white"
          >
            <div className="space-y-1">
              <h1
                className="text-4xl font-bold bg-linear-to-r from-pink-400 to-indigo-400 
                           bg-clip-text text-transparent tracking-wide"
                style={{ fontFamily: "Delius, cursive" }}
              >
                {quizInfo.title}
              </h1>
              <p className="text-sm text-gray-400 italic">{quizInfo.domain}</p>
            </div>
            <div className="flex flex-col items-start md:items-end gap-1 mt-4 md:mt-0">
              <span className="text-sm font-medium text-cyan-300">
                ⏱ Time: {remainingTime} seconds
              </span>
              <span className="text-sm font-medium text-indigo-400">
                🔢 Progress: {current + 1}/{quizInfo.totalQuestions}
              </span>
            </div>
          </div>
          {/* Quiz Body */}+
          <div className="flex flex-row justify-center flex-wrap gap-4">
            <div className="flex-1 w-full lg:max-w-3/5">
              <QuestionCard
                {...allQuestions[current]}
                handleAnswer={handleAnswer}
                disableOptions={disableOptions}
              />
            </div>

            <div
              className={`lg:w-2/5 w-full ${
                quizInfo.mode === "live" ? "block" : "hidden"
              }`}
              style={{ display: quizInfo.mode === "live" ? "block" : "none" }}
            >
              <Leaderboard final={false} limit={10} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Quiz;
