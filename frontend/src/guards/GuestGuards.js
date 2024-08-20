import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks";
import { CLIENT_URI, ROLES } from "../constants";

export const GuestGuard = ({ children }) => {
  const { isInitialized, isAuthenticated, user } = useAuth();

  if (!isInitialized) {
    return <>loading...</>;
  }

  if (isAuthenticated) {
    if (user?.role === ROLES.LEARNER_ROLE) {
      return <Navigate to={CLIENT_URI.HOME_PAGE} replace />;
    }
    return <Navigate to={CLIENT_URI.HOME_PAGE} replace />;
  }

  return <>{children}</>;
};

export default GuestGuard;
