import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks";
import { CLIENT_URI, ROLES } from "../constants";

export const AdminGuard = ({ children }) => {
  const { isInitialized, isAuthenticated, user } = useAuth();

  if (!isInitialized) {
    return <>loading...</>;
  }

  if (isAuthenticated) {
    if (user?.role === ROLES.ADMIN_ROLE) {
      return <>{children}</>;
    }
    return <Navigate to={CLIENT_URI.HOME_PAGE} replace />;
  }

  return <Navigate to={CLIENT_URI.LOGIN} replace />;
};

export default AdminGuard;
