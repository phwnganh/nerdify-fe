import { Navigate } from "react-router-dom";
import { CLIENT_URI, ROLES } from "../constants";
import LoadingSpin from "../components/Spinning";

export const LearnerGuard = ({ children }) => {
  const userInfo = localStorage.getItem("userInfo");

  // Parse the user info from localStorage
  const user = userInfo ? JSON.parse(userInfo) : null;

  if (user) {
    // Check if the role is 'learner'
    if (user?.role === ROLES.LEARNER_ROLE) {
      return <>{children}</>;
    }
    return <Navigate to={CLIENT_URI.COURSE_PAGE} replace />;
  }

  // If not authenticated, redirect to login page
  return <Navigate to={CLIENT_URI.LOGIN} replace />;
};

export default LearnerGuard;
