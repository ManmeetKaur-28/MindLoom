import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { login, logout } from "../../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../import";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    const checkAuthLogin = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/v1/user/checkLogin`);
        if (res) {
          dispatch(login());
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.log(error.message);
        dispatch(logout());
      }
    };
    checkAuthLogin();
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900/50 via-indigo-950/50 to-black/50 text-white font-poppins">
      {/* Hero Section */}
      <header className="flex flex-col items-center justify-center text-center py-20 px-6">
        <h1
          className="text-4xl md:text-6xl font-extrabold mb-5 bg-linear-to-r  from-indigo-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg tracking-wide"
          style={{ fontFamily: "Delius, cursive" }}
        >
          MindLoom : AI Quiz Hub
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl">
          The smarter way to create, host, and play quizzes. Whether you’re
          competing live or taking your time, MindLoom makes learning fun and
          engaging.
        </p>
        <button
          onClick={() => {
            if (isLoggedIn) {
              navigate("/dashboard");
            } else {
              navigate("/login");
            }
          }}
          className="mt-8 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 border border-indigo-400 
                     shadow-[0_0_15px_rgba(99,102,241,0.6)] font-semibold transition-all duration-300 active:scale-95"
        >
          Get Started
        </button>
      </header>

      {/* Features Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2
          className="text-3xl font-bold text-center text-indigo-300 mb-12 tracking-wide"
          style={{ fontFamily: "Delius, cursive" }}
        >
          Why Choose MindLoom?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-gray-800/70 border border-indigo-500/30 rounded-2xl p-6 shadow-lg hover:shadow-indigo-500/40 transition-all">
            <h3
              className="text-xl font-semibold text-indigo-300 mb-3"
              style={{ fontFamily: "Delius, cursive" }}
            >
              ✍️ Effortless Quiz Creation
            </h3>
            <p className="text-gray-400">
              Build quizzes in minutes. Write your own questions or let AI
              generate them for you.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-gray-800/70 border border-cyan-500/30 rounded-2xl p-6 shadow-lg hover:shadow-cyan-500/40 transition-all">
            <h3
              className="text-xl font-semibold text-cyan-300 mb-3"
              style={{ fontFamily: "Delius, cursive" }}
            >
              ⚡ Live Competitions
            </h3>
            <p className="text-gray-400">
              Host real-time quizzes where scores update instantly after each
              question. Perfect for group challenges.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-gray-800/70 border border-green-500/30 rounded-2xl p-6 shadow-lg hover:shadow-green-500/40 transition-all">
            <h3
              className="text-xl font-semibold text-green-300 mb-3"
              style={{ fontFamily: "Delius, cursive" }}
            >
              ⏳ Play Anytime
            </h3>
            <p className="text-gray-400">
              Take quizzes at your own pace before the deadline. Results and
              rankings are revealed once everyone is done.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-gray-800/70 border border-yellow-500/30 rounded-2xl p-6 shadow-lg hover:shadow-yellow-500/40 transition-all">
            <h3
              className="text-xl font-semibold text-yellow-300 mb-3"
              style={{ fontFamily: "Delius, cursive" }}
            >
              📊 Clear Leaderboards
            </h3>
            <p className="text-gray-400">
              Every quiz comes with its own scoreboard so you can see exactly
              where you stand.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="bg-gray-800/70 border border-pink-500/30 rounded-2xl p-6 shadow-lg hover:shadow-pink-500/40 transition-all">
            <h3
              className="text-xl font-semibold text-pink-300 mb-3"
              style={{ fontFamily: "Delius, cursive" }}
            >
              🎨 Modern Experience
            </h3>
            <p className="text-gray-400">
              A sleek, polished design with smooth effects that make learning
              feel exciting and fresh.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="bg-gray-800/70 border border-red-500/30 rounded-2xl p-6 shadow-lg hover:shadow-red-500/40 transition-all">
            <h3
              className="text-xl font-semibold text-red-300 mb-3"
              style={{ fontFamily: "Delius, cursive" }}
            >
              🚀 Reliable Performance
            </h3>
            <p className="text-gray-400">
              Fast updates, smooth gameplay, and a platform built to handle
              quizzes of any size.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
