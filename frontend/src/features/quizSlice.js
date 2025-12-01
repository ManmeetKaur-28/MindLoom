import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  score: 0,
  answersData: [],
  allQuestions: [],
  current: 0,
  quizEnded: false,
};
const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    resetQuiz: (state, action) => {
      state = initialState;
    },
    changeQuestion: (state, action) => {
      if (state.current + 1 < state.allQuestions.length) {
        state.current++;
      } else {
        state.quizEnded = true;
      }
    },
    answerQuestion: (state, action) => {
      const selectedAnswer = action.payload;
      const isCorrect =
        selectedAnswer == state.allQuestions[state.current].correctAnswer;
      if (isCorrect) state.score += 10;
      state.answersData.push({
        qid: state.current + 1,
        question: state.allQuestions[state.current].question,
        selectedAnswer,
        correctAnswer: state.allQuestions[state.current].correctAnswer,
        isCorrect,
      });
    },
    setQuestions: (state, action) => {
      state.allQuestions = action.payload;
      state.current = 0;
      state.score = 0;
      state.answersData = [];
    },
  },
});

export default quizSlice.reducer;
export const { setQuestions, resetQuiz, answerQuestion, changeQuestion } =
  quizSlice.actions;
