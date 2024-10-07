import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks";
import { CLIENT_URI, ROLES } from "../constants";
import LoadingSpin from "../components/Spinning";

export const GuestGuard = ({ children }) => {
  // const { isInitialized, isAuthenticated, user } = useAuth();

  // if (!isInitialized) {
  //   return <LoadingSpin />;
  // }
  // console.log(isInitialized, isAuthenticated);
  // if (isAuthenticated) {
  //   if (user?.role === ROLES.LEARNER_ROLE) {
  //     return <Navigate to={CLIENT_URI.COURSE_PAGE} replace />;
  //   }
  // }
  const user = localStorage.getItem("userInfo");
  if (user) {
    return <Navigate to={CLIENT_URI.COURSE_PAGE} replace />;
  }

  return <>{children}</>;
};

export default GuestGuard;
