import React, { useState, useEffect } from "react";
import { CreatedQuizzes } from "../index";
import axios from "axios";
import { Button } from "../index";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../import";

function Profile() {
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const getResponse = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/user`);
        setUserInfo(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getResponse();
  }, []);

  return (
    <div className="min-h-screen px-6 py-10 font-poppins  text-gray-200">
      {/* ---- PROFILE HEADER ---- */}
      <div
        className="flex flex-col justify-between md:flex-row items-start md:items-center 
                   bg-linear-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl 
                   border border-indigo-500/30 shadow-[0_0_25px_rgba(99,102,241,0.3)] 
                   rounded-3xl p-8 mb-12 transition-all duration-300 hover:shadow-indigo-500/40"
      >
        {/* LEFT SIDE */}
        <div className="space-y-2">
          <h1
            className="text-4xl font-bold  from-indigo-400 to-pink-400 bg-clip-text text-transparent bg-linear-to-r tracking-wide"
            style={{ fontFamily: "Delius, cursive" }}
          >
            Welcome back,{" "}
            <span className="text-pink-400">{userInfo.fullname} !</span>
          </h1>
          <p className="text-sm text-gray-400 italic">
            Ready to level up your quiz game?
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-wrap gap-6 mt-6 md:mt-0">
          {/* QUIZ STATS */}
          <div
            className="bg-indigo-900/30 px-6 py-4 text-center w-45 
                       border border-indigo-500/40 rounded-xl shadow-md backdrop-blur-md 
                       hover:shadow-lg hover:shadow-indigo-400/40 transition-all duration-300"
          >
            <h2
              className="text-indigo-300 font-semibold mb-2 text-lg"
              style={{ fontFamily: "Delius, cursive" }}
            >
              Quiz Stats
            </h2>
            <p className="text-gray-300">
              Total Quizzes: {userInfo.totalQuizzes}
            </p>
            <p className="text-gray-300">Quizzes Won: {userInfo.quizzesWon}</p>
          </div>

          {/* PERFORMANCE */}
          <div
            className="bg-indigo-900/30 px-6 py-4 text-center w-45 
                       border border-indigo-500/40 rounded-xl shadow-md backdrop-blur-md 
                       hover:shadow-lg hover:shadow-indigo-400/40 transition-all duration-300"
          >
            <h2
              className="text-indigo-300 font-semibold mb-2 text-lg"
              style={{ fontFamily: "Delius, cursive" }}
            >
              Performance
            </h2>
            <p className="text-gray-300">XP: {userInfo.xp}</p>
          </div>
        </div>
      </div>

      {/* ---- PREVIOUS QUIZZES ---- */}
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
            className="bg-indigo-600 hover:bg-purple-700 border border-indigo-400
                             hover:border-purple-500 text-white px-4 py-2 rounded-xl
                             transition-all duration-300 hover:scale-105 active:scale-95"
            onClick={() => navigate("/prev-quizzes")}
          >
            View All
          </Button>
        </div>
      </div>

      {/* ---- CREATED QUIZZES ---- */}
      <div>
        <CreatedQuizzes />
      </div>
    </div>
  );
}

export default Profile;
