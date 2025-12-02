import React, { useState, useEffect } from "react";
import { PrevQuizStats } from "../index";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../import";

function PrevQuizzes() {
  const [quizData, setQuizData] = useState([]);

  useEffect(() => {
    const getPrevQuizzes = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/v1/user/prev-quizzes`,
          { withCredentials: true }
        );
        setQuizData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPrevQuizzes();
  }, []);

  return (
    <div
      className="bg-gray-900 backdrop-blur-md border border-indigo-400/40 rounded-3xl 
                 py-6 mt-10 shadow-lg shadow-indigo-600/20 hover:shadow-indigo-500/40 
                 text-white font-poppins  mx-auto px-10 "
    >
      {/* Section Header */}
      <div className="border-b border-indigo-500/40 mb-8">
        <div
          className="bg-linear-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent font-bold text-2xl tracking-wide  
                   pb-1 mb-3 inline-block"
          style={{ fontFamily: "Delius, cursive" }}
        >
          Previously Attempted Quizzes
        </div>
      </div>

      {/* Quiz List */}
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {quizData.length > 0 ? (
          quizData.map((item) => (
            <li key={item.quizId}>
              <PrevQuizStats {...item} />
            </li>
          ))
        ) : (
          <p className="text-gray-400 italic col-span-2 text-center">
            No quizzes attempted yet.
          </p>
        )}
      </ul>
    </div>
  );
}

export default PrevQuizzes;
