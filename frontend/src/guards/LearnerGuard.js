import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks";
import { CLIENT_URI, ROLES } from "../constants";
import LoadingSpin from "../components/Spinning";

export const LearnerGuard = ({ children }) => {
  const { isInitialized, isAuthenticated, user } = useAuth();

  if (!isInitialized) {
    return <LoadingSpin/>;
  }

  if (isAuthenticated) {
    console.log("User is authenticated, role:", user?.role);
    if (user?.role === ROLES.LEARNER_ROLE) {
      return <>{children}</>;
    }
    return <Navigate to={CLIENT_URI.COURSE_PAGE} replace />;
  }

  return <Navigate to={CLIENT_URI.LOGIN} replace />;
};

export default LearnerGuard;
