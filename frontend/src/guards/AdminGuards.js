import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks";
import { CLIENT_URI, ROLES } from "../constants";
import SpinCustom from "../components/Spin";

export const AdminGuard = ({ children }) => {
  const { isInitialized, isAuthenticated, user } = useAuth();

  if (!isInitialized) {
    return <SpinCustom size="large"></SpinCustom>;
  }

  if (isAuthenticated) {
    if (user?.role === ROLES.ADMIN_ROLE) {
      return <>{children}</>;
    }
    return <Navigate to={CLIENT_URI.DASHBOARD} replace />;
  }

  return <Navigate to={CLIENT_URI.LOGIN} replace />;
};

export default AdminGuard;
