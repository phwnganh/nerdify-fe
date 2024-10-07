import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks";
import { CLIENT_URI, ROLES } from "../constants";
import LoadingSpin from "../components/Spinning";
import STORAGE, { getStorage } from "../library/storage";

export const AdminGuard = ({ children }) => {
  const userInfo = getStorage(STORAGE.USER_INFO);

  // Parse the user info from localStorage
  // const user = userInfo ? JSON.parse(userInfo) : null;

  if (userInfo) {
    // Check if the role is 'learner'
    if (userInfo?.role === ROLES.ADMIN_ROLE) {
      return <>{children}</>;
    }
    return <Navigate to={CLIENT_URI.DASHBOARD} replace />;
  }

  // If not authenticated, redirect to login page
  return <Navigate to={CLIENT_URI.LOGIN} replace />;
};

export default AdminGuard;
