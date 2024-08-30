import { Outlet } from "react-router-dom";
import ViewLevelDetail from "../pages/LearnersPage/LevelDetailPage";
import { LandingPage } from "../pages/GuestsPage/LandingPage";
import { CLIENT_URI } from "../constants";
import { AdminGuard, GuestGuard, LearnerGuard } from "../guards";
import { AdminLayout, GuestLayout, LearnerLayout } from "../layouts";
import { LoginPage, RegisterPage, VerifyEmailPage } from "../pages/GuestsPage";
import FlashCard from "../pages/LearnersPage/FlashCard";
import CreateFlashCard from "../pages/LearnersPage/FlashCard/CreateFlashCard";
import ExerciseDetail from "../pages/LearnersPage/DetailExercises";
import FinalExam from "../pages/LearnersPage/FinalExam";
import { CoursePage } from "../pages/LearnersPage/CoursePage";

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
            path: CLIENT_URI.VERIFY_EMAIL,
            element: <VerifyEmailPage />,
          },
        
        ],
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
        path: CLIENT_URI.COURSE_PAGE,
        element: <CoursePage />,
      },
      {
        path: `${CLIENT_URI.LEVEL_DETAIL}/:courseId`,
        element: <ViewLevelDetail />,
      },
      {
        path: CLIENT_URI.FINAL_EXAM,
        element: <FinalExam />,
      },
      {
        path: `${CLIENT_URI.ONE_EXERCISE}/:exerciseType/:exerciseId`,
        element: <ExerciseDetail />,
      },
      {
        path: CLIENT_URI.FLASH_CARD,
        element: <FlashCard />,
      },
      {
        path: CLIENT_URI.CREATE_FLASH_CARD,
        element: <CreateFlashCard />,
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
