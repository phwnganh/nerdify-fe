import { createBrowserRouter, Outlet } from "react-router-dom";
import LoginPage from "../pages/GuestsPage/Login";
import GuestLayout from "../layouts/GuestLayout";
import RegisterPage from "../pages/GuestsPage/Register";
import { LandingPage } from "../pages/GuestsPage/LandingPage";
import ViewLevelDetail from "../pages/LearnersPage/LevelDetailPage";
import { HomePage } from "../pages/LearnersPage/HomePage";
import UserRole from "../hooks/userRole";

const CLIENT_URI = {
  LANDING_PAGE: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",

  // LEARNER
  LEVEL_DETAIL: "/level-detail",
  ONE_EXERCISE: "/one-exercise",
  PROFILE: "/personal-profile",
};

export default CLIENT_URI;


