import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks";
import { CLIENT_URI, ROLES } from "../constants";

export const AdminContentGuard = ({ children }) => {
  const { isInitialized, isAuthenticated, user } = useAuth();

  if (!isInitialized) {
    return <>loading...</>;
  }

  if (isAuthenticated) {
    if (user?.role === ROLES.CONTENT_MANAGER_ROLE) {
      return <Navigate to={CLIENT_URI.COURSE_PAGE} replace />;
    }
  }

  return <>{children}</>;
};

export default AdminContentGuard;