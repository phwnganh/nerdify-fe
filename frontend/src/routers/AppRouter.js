import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import CLIENT_URI from ".";
import UserRole from "../hooks/userRole";
import ViewLevelDetail from "../pages/LearnersPage/LevelDetailPage";
import { LandingPage } from "../pages/GuestsPage/LandingPage";
import RegisterPage from "../pages/GuestsPage/Register";
import LoginPage from "../pages/GuestsPage/Login";
import GuestLayout from "../layouts/GuestLayout";
import { HomePage } from "../pages/LearnersPage/HomePage";

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
        children: [
          {
            path: CLIENT_URI.LOGIN,
            element: (
              <GuestRoute>
                <LoginPage/>
              </GuestRoute>
            ),
          },
          {
            path: CLIENT_URI.REGISTER,
            element: (
              <GuestRoute>
                <RegisterPage/>
              </GuestRoute>
            ),
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
            path: CLIENT_URI.LANDING_PAGE,
            // element: <LandingPage />,
            element: <HomePage />,
          },
          {
            path: CLIENT_URI.COURSE_PHASE,
            element: <ViewLevelDetail />,
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