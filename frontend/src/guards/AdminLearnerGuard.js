import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks";
import { CLIENT_URI, ROLES } from "../constants";
import LoadingSpin from "../components/Spinning";

export const AdminLearnerGuard = ({ children }) => {
  const { isInitialized, isAuthenticated, user } = useAuth();

  if (!isInitialized) {
    return <LoadingSpin />;
  }

  if (isAuthenticated) {
    if (user?.role === ROLES.ADMIN_ROLE || user?.role === ROLES.LEARNER_ROLE) {
      return <>{children}</>;
    }
    return <Navigate to={CLIENT_URI.DASHBOARD} replace />;
  }

  return <Navigate to={CLIENT_URI.LOGIN} replace />;
};

export default AdminLearnerGuard;
