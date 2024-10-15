import { Navigate } from "react-router-dom";
import { CLIENT_URI, ROLES } from "../constants";
import LoadingSpin from "../components/Spinning";
import STORAGE, { getStorage } from "../library/storage";

export const AccountantGuard = ({ children }) => {
  const userInfo = getStorage(STORAGE.USER_INFO);

  // Check if user information exists in storage
  if (userInfo) {
    // Verify if the role matches 'accountant'
    if (userInfo?.role === ROLES.ACCOUNTANT_ROLE) {
      return <>{children}</>;
    }
    // If the role is not 'accountant', redirect to a relevant page
    return <Navigate to={CLIENT_URI.HOME_PAGE} replace />;
  }

  // If user is not authenticated, redirect to the login page
  return <Navigate to={CLIENT_URI.LOGIN} replace />;
};

export default AccountantGuard;
