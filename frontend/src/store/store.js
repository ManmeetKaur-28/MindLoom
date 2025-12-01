import { configureStore } from "@reduxjs/toolkit";
import quizReducer from "../features/quizSlice";
import authReducer from "../features/authSlice";
const store = configureStore({
  reducer: {
    quiz: quizReducer,
    auth: authReducer,
  },
});

export default store;
