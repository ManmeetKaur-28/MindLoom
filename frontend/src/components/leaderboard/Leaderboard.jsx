import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_BACKEND_URL);

function Leaderboard({ final, limit }) {
  const { quizId } = useParams();
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    if (final === false) {
      socket.on("leaderboardUpdate", (data) => {
        if (quizId === data.quizId) {
          setLeaderboard(data.leaderboard);
        }
      });

      return () => {
        socket.off("leaderboardUpdate");
      };
    }
  }, [quizId, final]);

  useEffect(() => {
    const initialSetup = async () => {
      try {
        await axios.post(
          `/api/v1/leaderboard/${quizId}/score`,
          { score: 0, limit },
          { withCredentials: true }
        );
      } catch (error) {
        console.log(error);
      }
    };
    if (final === false) {
      initialSetup();
    }
  }, [quizId, final, limit]);

  useEffect(() => {
    const getFinalLeaderboard = async () => {
      try {
        const res = await axios.get(`/api/v1/leaderboard/${quizId}`);
        setLeaderboard(res.data.data);
      } catch (error) {
        console.log(error);
        setLeaderboard([]);
      }
    };
    if (final === true) {
      getFinalLeaderboard();
    }
  }, [quizId, final]);

  const getRankStyle = (rank) => {
    switch (rank) {
      case 1:
        return "bg-[#6D28f4] text-white font-semibold shadow-md";
      case 2:
        return "bg-[#7C3AE3] text-white font-medium shadow-md";
      case 3:
        return "bg-[#8B5CF6] text-white font-medium shadow-md";
      default:
        return "bg-gray-800 text-gray-200";
    }
  };

  return (
    <div className="w-full bg-gray-900/80 backdrop-blur-md p-6 rounded-3xl border border-indigo-500/40 text-white font-poppins shadow-lg shadow-indigo-600/20 hover:shadow-indigo-500/40 transition-all duration-300">
      <h2
        className="text-4xl font-bold mb-6 text-center bg-linear-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent tracking-wide"
        style={{ fontFamily: "Delius, cursive" }}
      >
        Leaderboard
      </h2>

      {leaderboard.length > 0 ? (
        <ul className="space-y-3">
          {leaderboard.map((item) => (
            <li
              key={item.userId}
              className={`px-4 py-2 rounded-xl flex justify-between items-center text-sm ${getRankStyle(
                item.rank
              )}`}
            >
              <span className="w-1/6 text-center font-bold">#{item.rank}</span>
              <span className="w-3/6 text-center truncate">
                {item.fullname}
              </span>
              <span className="w-2/6 text-right font-semibold">
                {item.score}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center mt-4">
          <p className="text-sm text-gray-400 italic">Waiting for scores...</p>
          <p className="text-sm text-gray-300 mt-3">
            <span className="text-indigo-400 font-medium">Important:</span>{" "}
            Leaderboard is visible only after the quiz deadline!
          </p>
        </div>
      )}
    </div>
  );
}

export default Leaderboard;
