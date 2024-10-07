import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks";
import { CLIENT_URI, ROLES } from "../constants";
import LoadingSpin from "../components/Spinning";

export const GuestLearnerGuard = ({ children }) => {
  const userInfo = localStorage.getItem("userInfo");

  // Parse the user info from localStorage
  const user = userInfo ? JSON.parse(userInfo) : null;

  if (user?.role === ROLES.ADMIN_ROLE) {
    return <Navigate to={CLIENT_URI.DASHBOARD} replace />;
  }
  return <>{children}</>;
};

export default GuestLearnerGuard;
