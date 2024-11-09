import { Navigate } from "react-router-dom";
import { CLIENT_URI, ROLES } from "../constants";
import SpinCustom from "../components/Spin";
import { useAuth } from "../hooks";

export const AccountantGuard = ({ children }) => {
  const { isInitialized, isAuthenticated, user } = useAuth();

  if (!isInitialized) {
    return <SpinCustom size="large"></SpinCustom>;
  }

  if (isAuthenticated) {
    if (user?.role === ROLES.ACCOUNTANT_ROLE) {
      return <>{children}</>;
    }
    return <Navigate to={CLIENT_URI.ACCOUNTANT_DASHBOARD} replace />;
  }

  return <Navigate to={CLIENT_URI.LOGIN} replace />;
};

export default AccountantGuard;
