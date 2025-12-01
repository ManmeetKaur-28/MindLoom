import React from "react";
import { Button } from "../index";
import { useNavigate } from "react-router-dom";

function ActiveQuizCard(props) {
  const isLive = props.mode === "live";
  const navigate = useNavigate();
  const deadline = new Date(props.deadline);

  return (
    <div
      className="bg-white/80 backdrop-blur-md border border-indigo-200 rounded-2xl shadow-md 
                 hover:shadow-lg hover:shadow-indigo-300/40 transition-all duration-300 ease-in-out 
                 p-4 flex flex-col gap-3 mx-auto w-full"
    >
      {/* Title + Button */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col">
          <h3
            className="text-lg font-semibold text-indigo-900"
            style={{ fontFamily: "Delius, cursive" }}
          >
            {props.title}
          </h3>
          <span
            className={`text-sm font-medium ${
              props.difficulty === "Hard"
                ? "text-red-500"
                : props.difficulty === "Medium"
                ? "text-yellow-500"
                : "text-green-500"
            }`}
          >
            {props.difficulty}
          </span>
        </div>

        <div className="w-fit">
          {props.status === "pending" ? (
            <Button
              bgColor={
                isLive
                  ? "bg-violet-500 hover:bg-violet-600 border-violet-400 hover:border-violet-500 shadow-[0_0_15px_rgba(139,92,246,0.5)]"
                  : "bg-cyan-500 hover:bg-cyan-600 border-cyan-400 hover:border-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.5)]"
              }
              className="w-fit"
              onClick={() => navigate(`/play/${props._id}`)}
            >
              {isLive ? "Join Live" : "Start Quiz"}
            </Button>
          ) : (
            <span
              className="bg-green-500 inline-block text-white px-3 py-1 rounded-lg 
                         border border-green-400 shadow-[0_0_15px_rgba(34,197,94,0.5)] m-2"
            >
              Completed
            </span>
          )}
        </div>
      </div>

      {/* Live Tag */}
      {isLive && (
        <span className="text-sm text-white bg-red-600 rounded-full px-3 py-0.5 w-fit">
          Live
        </span>
      )}

      {/* Category | Questions | Duration */}
      <div>
        <p className="text-gray-700 text-sm">
          {`${props.domain} | ${props.totalQuestions} Questions | ${props.duration} Minutes`}
        </p>
      </div>

      {/* Participants and Time */}
      <div className="flex flex-wrap justify-between text-gray-600 text-sm">
        <span>{props.participants} participants</span>
        <span>
          {isLive ? "At " : "Due "}
          <span className="text-indigo-600 font-medium">
            {deadline.toLocaleString()}
          </span>
        </span>
      </div>
    </div>
  );
}

export default ActiveQuizCard;
