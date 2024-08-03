import { createBrowserRouter, Outlet } from "react-router-dom";
import LoginPage from "../pages/GuestsPage/Login";
import GuestLayout from "../layouts/GuestLayout";
import RegisterPage from "../pages/GuestsPage/Register";
import { LandingPage } from "../pages/GuestsPage/LandingPage";

const CLIENT_URI = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",

  // LEARNER
  COURSE_PHASE: "/course-phase",
  ALL_EXERCISES: "/all-exercises",
  ONE_EXERCISE: "/one-exercise",
  PROFILE: "/personal-profile",
};

export default CLIENT_URI;

export const router = createBrowserRouter([
  // Guest urls
  {
    children: [
      {
        path: CLIENT_URI.LOGIN,
        element: <LoginPage />,
      },
      {
        path: CLIENT_URI.REGISTER,
        element: <RegisterPage />,
      },
    ],
  },
  {
    element: (
      <GuestLayout>
        <Outlet />
      </GuestLayout>
    ),
    children: [
      {
        path: CLIENT_URI.HOME,
        element: <LandingPage />,
      },
    ],
  },

  // Learner urls

  // Admin urls
]);
