import { Outlet } from "react-router-dom";
import ViewLevelDetail from "../pages/LearnersPage/LevelDetailPage";
import { LandingPage } from "../pages/GuestsPage/LandingPage";
import { HomePage } from "../pages/LearnersPage/HomePage";
import ModalRequireToLogin from "../pages/GuestsPage/ModalRequireToLogin";
import ReadingExercises from "../pages/LearnersPage/DetailExercises/ReadingExercises";
import ListeningExercise from "../pages/LearnersPage/DetailExercises/ListeningExercises";
import { CLIENT_URI } from "../constants";
import { AdminGuard, GuestGuard, LearnerGuard } from "../guards";
import { AdminLayout, GuestLayout, LearnerLayout } from "../layouts";
import { LoginPage, RegisterPage, VerifyEmailPage } from "../pages/GuestsPage";
import FlashCard from "../pages/LearnersPage/FlashCard";
import CreateFlashCard from "../pages/LearnersPage/FlashCard/create-flash-card";

export const routes = [
  // Guest urls
  {
    element: (
      <GuestGuard>
        <GuestLayout>
          <Outlet />
        </GuestLayout>
      </GuestGuard>
    ),
    children: [
      {
        path: CLIENT_URI.LANDING_PAGE,
        element: <LandingPage />,
      },
      {
        path: CLIENT_URI.LEVEL_DETAIL,
        element: <ListeningExercise />,
      },
      {
        path: CLIENT_URI.LOGIN,
        element: <LoginPage />,
      },
      {
        path: CLIENT_URI.REGISTER,
        element: <RegisterPage />,
      },
      {
        path: CLIENT_URI.VERIFY_EMAIL,
        element: <VerifyEmailPage />,
      },

      {
        path: CLIENT_URI.FLASH_CARD,
        element: <FlashCard />,
      },
      {
        path: CLIENT_URI.CREATE_FLASH_CARD,
        element: <CreateFlashCard />,
      },
      {
        path: CLIENT_URI.HOME_PAGE,
        element: <HomePage />,
      },
    ],
  },

  // Learner urls
  {
    element: (
      <LearnerGuard>
        <LearnerLayout>
          <Outlet />
        </LearnerLayout>
      </LearnerGuard>
    ),
    children: [
      {
        path: CLIENT_URI.HOME_PAGE,
        element: <HomePage />,
      },
    ],
  },

  // Admin urls
  {
    element: (
      <AdminGuard>
        <AdminLayout>
          <Outlet />
        </AdminLayout>
      </AdminGuard>
    ),
    children: [],
  },
];

export default routes;
