import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks";
import { CLIENT_URI, ROLES } from "../constants";
import LoadingSpin from "../components/Spinning";
import STORAGE, { getStorage } from "../library/storage";

export const GuestLearnerGuard = ({ children }) => {
  const userInfo = getStorage(STORAGE.USER_INFO);

  // Parse the user info from localStorage
  // const user = userInfo ? JSON.parse(userInfo) : null;

  if (userInfo?.role === ROLES.ADMIN_ROLE) {
    return <Navigate to={CLIENT_URI.DASHBOARD} replace />;
  }
  return <>{children}</>;
};

export default GuestLearnerGuard;
