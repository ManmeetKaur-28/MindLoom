import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
("react-router-dom");
import { Provider } from "react-redux";
import store from "./store/store";
import HomePage from "./pages/homePage";
import LoginPage from "./pages/loginPage";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import LeaderboardPage from "./pages/LeaderboardPage";
import DashboardPage from "./pages/DashboardPage";
import CreatePage from "./pages/CreatePage";
import PrevQuizzesPage from "./pages/PrevQuizzesPage";
import ResultPage from "./pages/ResultPage";
import RegisterPage from "./pages/RegisterPage";
import QuizPlayPage from "./pages/QuizPlayPage";
import QuestionsPage from "./pages/QuestionsPage";
import RegisterCodePage from "./pages/RegisterCodePage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/leaderboard/:quizId",
        element: <LeaderboardPage />,
      },
      { path: "/create", element: <CreatePage /> },
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/prev-quizzes",
        element: <PrevQuizzesPage />,
      },
      {
        path: "/result/:quizId",
        element: <ResultPage />,
      },
      {
        path: "/register",
        element: <RegisterCodePage />,
      },
      {
        path: "/register/:joinCode",
        element: <RegisterPage />,
      },
      {
        path: "/play/:quizId",
        element: <QuizPlayPage />,
      },
      {
        path: "/questions/:quizId",
        element: <QuestionsPage />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
