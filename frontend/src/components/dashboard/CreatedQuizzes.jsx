import React, { useState, useEffect } from "react";
import { CreatedQuizzesStats } from "../index";
import axios from "axios";
import { BASE_URL } from "../../import";

function CreatedQuizzes() {
  const [quizInfo, setQuizInfo] = useState([]);

  useEffect(() => {
    const getCreatedQuizzes = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/v1/user/created-quizzes`,
          { withCredentials: true }
        );
        setQuizInfo(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCreatedQuizzes();
  }, []);

  return (
    <div
      className="bg-gray-900/50 border border-indigo-400/40 rounded-3xl 
                 py-6 mt-10 shadow-lg shadow-indigo-600/20 hover:shadow-indigo-500/40 
                 text-white font-poppins  mx-auto px-10"
    >
      {/* Section Header */}
      <div
        className="text-indigo-300 font-bold text-2xl tracking-wide border-b border-indigo-500/40 
                   pb-2 mb-6"
        style={{ fontFamily: "Delius, cursive" }}
      >
        Created Quizzes
      </div>

      {/* Quiz List */}
      <ul className="grid grid-cols-1 md:grid lg:grid-cols-3 gap-8">
        {quizInfo.length > 0 ? (
          quizInfo.map((quiz) => (
            <li key={quiz._id}>
              <CreatedQuizzesStats {...quiz} />
            </li>
          ))
        ) : (
          <p className="text-gray-400 italic col-span-2 text-center">
            No quizzes created yet.
          </p>
        )}
      </ul>
    </div>
  );
}

export default CreatedQuizzes;
