import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import CLIENT_URI from ".";
import UserRole from "../hooks/userRole";
import ViewLevelDetail from "../pages/LearnersPage/LevelDetailPage";
import { LandingPage } from "../pages/GuestsPage/LandingPage";
import RegisterPage from "../pages/GuestsPage/Register";
import LoginPage from "../pages/GuestsPage/Login";
import GuestLayout from "../layouts/GuestLayout";
import { HomePage } from "../pages/LearnersPage/HomePage";
import ModalRequireToLogin from "../pages/GuestsPage/ModalRequireToLogin";
import ReadingExercises from "../pages/LearnersPage/DetailExercises/ReadingExercises";
import ListeningExercise from "../pages/LearnersPage/DetailExercises/ListeningExercises";
import WritingExercises from "../pages/LearnersPage/DetailExercises/WritingExercises";
import VocabularyExercises from "../pages/LearnersPage/DetailExercises/VocabularyExercises";
import GrammarExercises from "../pages/LearnersPage/DetailExercises/GrammarExercises";
import CheckpointQuiz from "../pages/LearnersPage/DetailExercises/CheckpointQuiz";

const LearnersRoute = ({children}) => {
      const role = UserRole();
      return role === "learner" ? children : <Navigate to={CLIENT_URI.LANDING_PAGE} />
    }
    
    const AdminRoute = ({children}) => {
      const role = UserRole();
      return role === "admin" ? children : <Navigate to={CLIENT_URI.LANDING_PAGE} />
    }
    
    const GuestRoute = ({children}) => {
      const role = UserRole();
      return !role ? children : <Navigate to={CLIENT_URI.LANDING_PAGE} />
    }
    
    export const router = createBrowserRouter([
      // Guest urls
      {
        element: (
          <GuestLayout>
            <Outlet />
          </GuestLayout>
        ),
        children: [
          {
            path: CLIENT_URI.LANDING_PAGE,
            // element: <LandingPage />,
            element: <LandingPage/>,
          },
          {
            path: CLIENT_URI.LEVEL_DETAIL,
            element: <CheckpointQuiz />,
          },
          {
            path: CLIENT_URI.LOGIN,
            element: (
                <LoginPage/>
            ),
          },
          {
            path: CLIENT_URI.REGISTER,
            element: (
                <RegisterPage/>
            ),
          },
        ],
      },
    
      // Learner urls
      {
        path: CLIENT_URI.ONE_EXERCISE,
        element: (
          <LearnersRoute>
            
          </LearnersRoute>
        )
      }
      // Admin urls
    ]);