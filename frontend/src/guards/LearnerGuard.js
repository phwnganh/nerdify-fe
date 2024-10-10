import { Navigate } from "react-router-dom";
import { CLIENT_URI, ROLES } from "../constants";
import LoadingSpin from "../components/Spinning";
import STORAGE, { getStorage } from "../library/storage";

export const LearnerGuard = ({ children }) => {
  const userInfo = getStorage(STORAGE.USER_INFO);

  // Parse the user info from localStorage
  // const user = userInfo ? JSON.parse(userInfo) : null;

  if (userInfo) {
    // Check if the role is 'learner'
    if (userInfo?.role === ROLES.LEARNER_ROLE) {
      return <>{children}</>;
    }
    return <Navigate to={CLIENT_URI.COURSE_PAGE} replace />;
  }

  // If not authenticated, redirect to login page
  return <Navigate to={CLIENT_URI.LOGIN} replace />;
};

export default LearnerGuard;
