import { Outlet } from "react-router-dom";
import ViewLevelDetail from "../pages/LearnersPage/LevelDetailPage";
import { LandingPage } from "../pages/GuestsPage/LandingPage";
import { CLIENT_URI } from "../constants";
import { AdminGuard, GuestGuard, LearnerGuard } from "../guards";
import { AdminLayout, GuestLayout, LearnerLayout } from "../layouts";
import { ForgotPasswordPage, LoginPage, RegisterPage, ResetPasswordPage, VerifyEmailPage } from "../pages/GuestsPage";
import CreateFlashCard from "../pages/LearnersPage/FlashCard/CreateFlashCard";
import ExerciseDetail from "../pages/LearnersPage/DetailExercises";
import FinalExam from "../pages/LearnersPage/FinalExam";
import FlashcardList from "../pages/LearnersPage/FlashCard";
import CoursePage from "../pages/LearnersPage/CoursePage";
import FlashcardDetail from "../pages/LearnersPage/FlashCard/FlashcardDetail";
import EditFlashCard from "../pages/LearnersPage/FlashCard/EditFlashCard";
import ViewPersonalProfile from "../pages/LearnersPage/PersonalProfile";
import EditPersonalProfile from "../pages/LearnersPage/PersonalProfile/EditPersonalProfile";
import ViewResultsDetail from "../pages/LearnersPage/ViewResultsDetail";
import { TestFlashCard } from "../pages/LearnersPage/FlashCard/TestFlashCard";
import { PremiumPage } from "../pages/LearnersPage/PremiumPage";

import Payment from "../pages/LearnersPage/Payment";
import BillInfo from "../pages/LearnersPage/Payment/BillInfo";
import LearningProgress from "../pages/LearnersPage/LearningProgress";
import TakeATrophy from "../pages/LearnersPage/FinalExam/TakeATrophy";
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
            element: <LandingPage />,
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
            path: CLIENT_URI.FLASH_CARD,
            element: <FlashcardList />,
          },
          {
            path: `${CLIENT_URI.FLASH_CARD}/:flashcardId`,
            element: <FlashcardDetail />,
          },
          {
            path: CLIENT_URI.CREATE_FLASH_CARD,
            element: <CreateFlashCard />,
          },
          {
            path: `${CLIENT_URI.EDIT_FLASH_CARD}/:flashcardId`,
            element: <EditFlashCard />,
          },
          {
            path: `${CLIENT_URI.TEST_FLASH_CARD}/:flashcardId/:numberOfCard`,
            element: <TestFlashCard />,
          },
          {
            path: `${CLIENT_URI.LEVEL_DETAIL}/:courseId`,
            element: <ViewLevelDetail />,
          },
          {
            path: `${CLIENT_URI.ONE_EXERCISE}/:exerciseType/:exerciseId`,
            element: <ExerciseDetail />,
          },
          {
            path: `${CLIENT_URI.FINAL_EXAM}/:examId`,
            element: <FinalExam />,
          },
          {
            path: CLIENT_URI.FORGOT_PASSWORD,
            element: <ForgotPasswordPage />,
          },
          {
            path: CLIENT_URI.RESET_PASSWORD,
            element: <ResetPasswordPage />,
          },
          {
            path: CLIENT_URI.LEARNING_PROGRESS,
            element: <LearningProgress />,
          },
          {
            path: CLIENT_URI.TROPHY,
            element: <TakeATrophy />,
          },
          {
            path: CLIENT_URI.PREMIUM,
            element: <PremiumPage />,
          },
        ],
      },
      // {
      //   path: CLIENT_URI.LEVEL_DETAIL,
      //   element: <ViewLevelDetail />,
      // },
      {
        path: CLIENT_URI.LANDING_PAGE,
        element: <LandingPage />,
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
      // test giao diện

      {
        path: `${CLIENT_URI.PAYMENT}/:transactionId`,
        element: <Payment />,
      },
      {
        path: `${CLIENT_URI.BILLINFO}/:transactionId`,
        element: <BillInfo />,
      },
      {
        path: CLIENT_URI.EDIT_PROFILE,
        element: <EditPersonalProfile/>
      }
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
        path: CLIENT_URI.COURSE_PAGE,
        element: <CoursePage />,
      },
      // {
      //   path: `${CLIENT_URI.LEVEL_DETAIL}/:courseId`,
      //   element: <ViewLevelDetail />,
      // },
      // {
      //   path: CLIENT_URI.FINAL_EXAM,
      //   element: <FinalExam />,
      // },
      // {
      //   path: `${CLIENT_URI.ONE_EXERCISE}/:exerciseType/:exerciseId`,
      //   element: <ExerciseDetail />,
      // },
      // {
      //   path: CLIENT_URI.CREATE_FLASH_CARD,
      //   element: <CreateFlashCard />,
      // },
      {
        path: CLIENT_URI.FLASH_CARD,
        element: <FlashcardList />,
      },
      {
        path: `${CLIENT_URI.FLASH_CARD}/:flashcardId`,
        element: <FlashcardDetail />,
      },
      // {
      //   path: `${CLIENT_URI.EDIT_FLASH_CARD}/:flashcardId`,
      //   element: <EditFlashCard />,
      // },
      {
        path: CLIENT_URI.CREATE_FLASH_CARD,
        element: <CreateFlashCard />,
      },
      // {
      //   path: `${CLIENT_URI.TEST_FLASH_CARD}/:flashcardId/:numberOfCard`,
      //   element: <TestFlashCard />,
      // },
      {
        path: `${CLIENT_URI.PROFILE}`,
        element: <ViewPersonalProfile />,
      },
      {
        path: CLIENT_URI.EDIT_PROFILE,
        element: <EditPersonalProfile />,
      },
      {
        path: `${CLIENT_URI.RESULT_DETAIL}/:exerciseType/:submissionId`,
        element: <ViewResultsDetail />,
      },
      // {
      //   path: CLIENT_URI.PREMIUM,
      //   element: <PremiumPage />,
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
