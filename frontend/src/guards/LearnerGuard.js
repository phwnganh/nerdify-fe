import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks";
import { CLIENT_URI, ROLES } from "../constants";

export const LearnerGuard = ({ children }) => {
  const { isInitialized, isAuthenticated, user } = useAuth();

  if (!isInitialized) {
    return <>loading...</>;
  }

  if (isAuthenticated) {
    if (user?.role === ROLES.LEARNER_ROLE) {
      return <>{children}</>;
    }
    return <Navigate to={CLIENT_URI.DASHBOARD} replace />;
  }

  return <Navigate to={CLIENT_URI.LOGIN} replace />;
};

export default LearnerGuard;
