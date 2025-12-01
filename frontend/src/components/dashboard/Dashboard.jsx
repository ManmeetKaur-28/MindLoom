import React, { useRef } from "react";
import { ActiveQuizzes, Button, PrevQuizzes } from "../index";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const ref = useRef(null);

  const scrollToQuizzes = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen   text-white font-poppins">
      {/* Hero Card */}
      <div
        className="relative bg-linear-to-br from-indigo-700 via-indigo-800 to-indigo-900
                   w-3/4 md:w-2/3 lg:w-1/2 mx-auto text-center text-white
                   p-10 my-10 rounded-3xl shadow-[0_0_25px_rgba(99,102,241,0.6)]
                   backdrop-blur-md transition-all duration-500
                   hover:shadow-[0_0_30px_rgba(99,102,241,0.8)]"
      >
        <h1
          className="text-3xl md:text-4xl font-bold text-indigo-300 mb-6 tracking-wide"
          style={{ fontFamily: "Delius, cursive" }}
        >
          Welcome back, Champ 👋
        </h1>

        <p className="text-gray-300 mb-8 text-lg relative z-10">
          🌱 Ready to continue your learning journey and challenge your skills?
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-6 flex-wrap relative z-10">
          <Button
            bgColor="bg-cyan-500"
            className="hover:bg-cyan-600 border-cyan-400 hover:border-cyan-500
                       shadow-[0_0_25px_rgba(34,211,238,0.5)]
                       hover:shadow-[0_0_35px_rgba(34,211,238,0.6)]
                       text-white hover:scale-105 active:scale-95
                       transition-all duration-300"
            onClick={() => navigate("/create")}
          >
            🚀 Create Quiz
          </Button>

          <Button
            className="bg-violet-500 hover:bg-violet-600 border-violet-400 hover:border-violet-500
                       shadow-[0_0_25px_rgba(139,92,246,0.5)]
                       hover:shadow-[0_0_35px_rgba(139,92,246,0.6)]
                       text-white hover:scale-105 active:scale-95
                       transition-all duration-300"
            onClick={scrollToQuizzes}
          >
            📚 Browse Quizzes
          </Button>
        </div>
      </div>

      {/* Previously Attempted Quizzes */}
      <div className="flex bg-gray-800/70 text-white justify-between py-4 px-7 rounded-2xl shadow-md">
        <div className="flex flex-col justify-evenly">
          <h2
            className="text-xl font-semibold text-indigo-300"
            style={{ fontFamily: "Delius, cursive" }}
          >
            Previously Attempted Quizzes
          </h2>
          <p className="text-gray-400">
            Your recent quiz history and performance
          </p>
        </div>
        <div>
          <Button
            className="bg-purple-600 hover:bg-purple-700 border border-purple-400
                       hover:border-purple-500 text-white px-4 py-2 rounded-xl
                       transition-all duration-300 hover:scale-105 active:scale-95"
            onClick={() => navigate("/prev-quizzes")}
          >
            View All
          </Button>
        </div>
      </div>

      {/* Active Quizzes Section */}
      <div ref={ref} className="mt-10">
        <ActiveQuizzes />
      </div>
    </div>
  );
}

export default Dashboard;
