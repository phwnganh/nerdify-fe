// Importing components from react-router-dom
import { Outlet } from "react-router-dom";

// Importing Pages for Guests
import { LandingPage } from "../pages/GuestsPage/LandingPage";
import BlogPage from "../pages/LearnersPage/BlogPage";
import BlogDetails from "../pages/LearnersPage/BlogDetails";
import { CLIENT_URI } from "../constants";
import { ForgotPasswordPage, LoginPage, RegisterPage, ResetPasswordPage, VerifyEmailPage } from "../pages/GuestsPage";

// Importing Guards for route protection
import { AdminContentGuard, AdminGuard, GuestGuard, GuestLearnerGuard, LearnerGuard, AccountantGuard } from "../guards";

// Importing Layouts for different user roles
import { AdminLayout, GuestLayout, LearnerLayout, GuestLearnerLayout, AccountantLayout } from "../layouts";

// Importing Pages for Learners
import ViewLevelDetail from "../pages/LearnersPage/LevelDetailPage";
import CreateFlashCard from "../pages/LearnersPage/FlashCard/CreateFlashCard";
import ExerciseDetail from "../pages/LearnersPage/DetailExercises";
import FinalExam from "../pages/LearnersPage/FinalExam";
import Flashcard from "../pages/LearnersPage/FlashCard";
import CoursePage from "../pages/LearnersPage/CoursePage";
import FlashcardDetail from "../pages/LearnersPage/FlashCard/FlashcardDetail";
import EditFlashCard from "../pages/LearnersPage/FlashCard/EditFlashCard";
import ViewPersonalProfile from "../pages/LearnersPage/PersonalProfile";
import EditPersonalProfile from "../pages/LearnersPage/PersonalProfile/EditPersonalProfile";
import ViewResultsDetail from "../pages/LearnersPage/ViewResultsDetail";
import { TestFlashCard } from "../pages/LearnersPage/FlashCard/TestFlashCard";
import MySubscription from "../pages/LearnersPage/MySubscription";
import ManageSubscription from "../pages/LearnersPage/MySubscription/ManageSubscription";
import { PremiumPage } from "../pages/LearnersPage/PremiumPage";
import ChangePassword from "../pages/LearnersPage/PersonalProfile/ChangePassword";
import Payment from "../pages/LearnersPage/Payment";
import BillInfo from "../pages/LearnersPage/Payment/BillInfo";
import LearningProgress from "../pages/LearnersPage/LearningProgress";
import TakeATrophy from "../pages/LearnersPage/FinalExam/TakeATrophy";
import AdminContentLayout from "../layouts/AdminContentLayout";
import ManageFlashcard from "../pages/LearnersPage/PersonalProfile/ManageFlashcard";
import ManageFolder from "../pages/LearnersPage/PersonalProfile/ManageFolder";
import FlashcardList from "../pages/LearnersPage/FlashCard/FlashCardList";
import ConfirmPayment from "../pages/LearnersPage/Payment/ConfirmPayment";
import AccountantDashboard from "../pages/AccountantPage/Dashboard";
import SystemRevenue from "../pages/AccountantPage/SystemRevenue";
import TransactionHistory from "../pages/AccountantPage/TransactionHistory";
import UserStatistics from "../pages/AccountantPage/UserStatistics";
import Exercise from "../pages/ContentManager/Exercise";
import { Upload } from "antd";
import ViewTransactionHistoryList from "../pages/LearnersPage/PersonalProfile/TransactionHistory";
import ViewResultsPractice from "../pages/LearnersPage/PersonalProfile/ResultsPractice";

//admin
import Dashboard from "../pages/AdminPage/Dashboard";
import FeedbackManagement from "../pages/AdminPage/FeedbackManagement";
import PremiumManagement from "../pages/AdminPage/PremiumManagement";
import AccountManagement from "../pages/AdminPage/AccountManagement";
import PaymentSuccess from "../pages/LearnersPage/Payment/SuccessPayment";
import FlashcardsInFolder from "../pages/LearnersPage/PersonalProfile/ManageFolder/ViewFlashcardInFolder";

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
            path: CLIENT_URI.FORGOT_PASSWORD,
            element: <ForgotPasswordPage />,
          },
          {
            path: CLIENT_URI.RESET_PASSWORD,
            element: <ResetPasswordPage />,
          },

          {
            path: CLIENT_URI.TROPHY,
            element: <TakeATrophy />,
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
        path: `${CLIENT_URI.ONE_EXERCISE}/:exerciseType/:exerciseId`,
        element: <ExerciseDetail />,
      },
      {
        path: `${CLIENT_URI.FINAL_EXAM}/:examId`,
        element: <FinalExam />,
      },
      {
        path: CLIENT_URI.FLASH_CARD,
        element: <Flashcard />,
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
        path: CLIENT_URI.TROPHY,
        element: <TakeATrophy />,
      },
      {
        path: `${CLIENT_URI.EDIT_PROFILE}`,
        element: <EditPersonalProfile />,
      },
      {
        path: CLIENT_URI.BLOG_STUDY,
        element: <BlogPage />,
      },
      {
        path: `${CLIENT_URI.BLOG_STUDY}/:blogId`,
        element: <BlogDetails />,
      },
      {
        path: CLIENT_URI.MANAGE_FLASHCARD,
        element: <ManageFlashcard />,
      },
      {
        path: CLIENT_URI.MANAGE_FOLDER,
        element: <ManageFolder />,
      },
      {
        path: CLIENT_URI.CHANGE_PASSWORD,
        element: <ChangePassword />,
      },
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
        path: `${CLIENT_URI.RESULT_DETAIL}/:exerciseType/:submissionId`,
        element: <ViewResultsDetail />,
      },
      {
        path: CLIENT_URI.MY_SUBSCRIPTION,
        element: <MySubscription />,
      },
      {
        path: CLIENT_URI.MANAGE_SUBSCRIPTION,
        element: <ManageSubscription />,
      },
      {
        path: CLIENT_URI.PREMIUM,
        element: <PremiumPage />,
      },
      {
        path: `${CLIENT_URI.PAYMENT}/:transactionId`,
        element: <Payment />,
      },
      {
        path: `${CLIENT_URI.BILLINFO}/:transactionId`,
        element: <BillInfo />,
      },
      {
        path: `${CLIENT_URI.CONFIRM_PAYMENT}/:transactionId`,
        element: <ConfirmPayment />,
      },
      {
        path: `${CLIENT_URI.SUCCESS_PAYMENT}/:transactionId`,
        element: <PaymentSuccess />,
      },
      {
        path: CLIENT_URI.LEARNING_PROGRESS,
        element: <LearningProgress />,
      },

      {
        path: CLIENT_URI.MANAGE_FLASHCARD,
        element: <ManageFlashcard />,
      },
      {
        path: CLIENT_URI.MANAGE_FOLDER,
        element: <ManageFolder />,
      },
      {
        path: `${CLIENT_URI.VIEW_FLASHCARDS_IN_FOLDER}/:folderId`,
        element: <FlashcardsInFolder />,
      },
      {
        path: CLIENT_URI.CHANGE_PASSWORD,
        element: <ChangePassword />,
      },
      {
        path: CLIENT_URI.MY_TRANSACTION_HISTORY,
        element: <ViewTransactionHistoryList />,
      },
      {
        path: CLIENT_URI.RESULTS_PRACTICE,
        element: <ViewResultsPractice />,
      },
      {
        path: `${CLIENT_URI.RESULT_DETAIL}/:exerciseType/:submissionId`,
        element: <ViewResultsDetail />,
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
    children: [
      {
        path: CLIENT_URI.ADMIN_DASHBOARD,
        element: <Dashboard />,
      },
      {
        path: CLIENT_URI.ACCOUNT_MANAGEMENT,
        element: <AccountManagement />,
      },
      {
        path: CLIENT_URI.PREMIUM_MANAGEMENT,
        element: <PremiumManagement />,
      },
      {
        path: CLIENT_URI.FEEDBACK_MANAGEMENT,
        element: <FeedbackManagement />,
      },
    ],
  },
  // Admin content
  {
    element: (
      <AdminContentGuard>
        <AdminContentLayout>
          <Outlet />
        </AdminContentLayout>
      </AdminContentGuard>
    ),
    children: [
      {
        path: CLIENT_URI.DASHBOARD,
      },
      {
        path: `${CLIENT_URI.TABLE_EXERCISE}`,
        element: <Exercise />,
      },
      {
        path: `/upload`,
        element: <Upload />,
      },
    ],
  },
  // Accountant urls
  {
    element: (
      <AccountantGuard>
        <AccountantLayout>
          <Outlet />
        </AccountantLayout>
      </AccountantGuard>
    ),
    children: [
      {
        path: CLIENT_URI.ACCOUNTANT_DASHBOARD,
        element: <AccountantDashboard />,
      },
      {
        path: CLIENT_URI.SYSTEM_REVENUE,
        element: <SystemRevenue />,
      },
      {
        path: CLIENT_URI.TRANSACTION_HISTORY,
        element: <TransactionHistory />,
      },
      {
        path: CLIENT_URI.USER_STATISTICS,
        element: <UserStatistics />,
      },
    ],
  },
];

export default routes;
