import { Navigate } from "react-router-dom";
import { CLIENT_URI, ROLES } from "../constants";
import SpinCustom from "../components/Spinning/SpinningCustom";
import { useAuth } from "../hooks";

export const AdminGuard = ({ children }) => {
  const { isInitialized, isAuthenticated, user } = useAuth();

  if (!isInitialized) {
    return <SpinCustom size="large"></SpinCustom>;
  }

  if (isAuthenticated) {
    if (user?.role === ROLES.ADMIN_ROLE) {
      return <>{children}</>;
    }
    return <Navigate to={CLIENT_URI.ADMIN_DASHBOARD} replace />;

  }

  return <Navigate to={CLIENT_URI.LOGIN} replace />;
};

export default AdminGuard;
