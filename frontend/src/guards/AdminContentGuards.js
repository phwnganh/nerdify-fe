import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks";
import { CLIENT_URI, ROLES } from "../constants";
import SpinCustom from "../components/Spin";

export const AdminContentGuard = ({ children }) => {
  const { isInitialized, isAuthenticated, user } = useAuth();

  if (!isInitialized) {
    return <SpinCustom size="large"></SpinCustom>;
  }

  if (isAuthenticated) {
    if (user?.role === ROLES.CONTENT_MANAGER_ROLE) {
      return <Navigate to={CLIENT_URI.DASHBOARD} replace />;
    }
  }

  return <>{children}</>;
};

export default AdminContentGuard;