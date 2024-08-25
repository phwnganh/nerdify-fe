import { Outlet } from "react-router-dom";
import ViewLevelDetail from "../pages/LearnersPage/LevelDetailPage";
import { LandingPage } from "../pages/GuestsPage/LandingPage";
import { HomePage } from "../pages/LearnersPage/HomePage";
import { CLIENT_URI } from "../constants";
import { AdminGuard, GuestGuard, LearnerGuard } from "../guards";
import { AdminLayout, GuestLayout, LearnerLayout } from "../layouts";
import { LoginPage, RegisterPage, VerifyEmailPage } from "../pages/GuestsPage";
import FlashCard from "../pages/LearnersPage/FlashCard/FlashcardDetail";
import CreateFlashCard from "../pages/LearnersPage/FlashCard/CreateFlashCard";
import ExerciseDetail from "../pages/LearnersPage/DetailExercises";
import FinalExam from "../pages/LearnersPage/FinalExam";
import FlashcardList from "../pages/LearnersPage/FlashCard";
import FlashCardDetail from "../pages/LearnersPage/FlashCard/FlashcardDetail";
import EditFlashCard from "../pages/LearnersPage/FlashCard/EditFlashCard";

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
        children: [
          {
            path: CLIENT_URI.LANDING_PAGE,
            // element: <LandingPage />,
            element: <LandingPage />,
          },
          {
            path: `${CLIENT_URI.ONE_EXERCISE}/:exerciseType/:exerciseId`,
            element: <ExerciseDetail />,
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
            path: `${CLIENT_URI.LEVEL_DETAIL}/:courseId`,
            element: <ViewLevelDetail />,
          },
          {
            path: CLIENT_URI.FINAL_EXAM,
            element: <FinalExam />,
          },
        ],
      },
      // {
      //   path: CLIENT_URI.LEVEL_DETAIL,
      //   element: <ViewLevelDetail />,
      // },
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
      // test giao diện
      {
        path: CLIENT_URI.FLASH_CARD,
        element: <FlashcardList />,
        // element: <ModalRequireToLogin />,
      },
      {
        path: CLIENT_URI.CREATE_FLASH_CARD,
        element: <CreateFlashCard />,
      },
      {
        path: `${CLIENT_URI.FLASH_CARD}/:flashcardId`,
        element: <FlashCardDetail />,
      },
      {
        path: `${CLIENT_URI.EDIT_FLASH_CARD}/:flashcardId`,
        element: <EditFlashCard />,
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
      // {
      //   path: `${CLIENT_URI.ONE_EXERCISE}/:exerciseId`,
      //   element: <ExerciseDetail />,
      // },
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
