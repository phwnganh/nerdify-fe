import { Navigate } from "react-router-dom";
import { CLIENT_URI, ROLES } from "../constants";
import LoadingSpin from "../components/Spinning";
import STORAGE, { getStorage } from "../library/storage";

export const AccountantGuard = ({ children }) => {
  const userInfo = getStorage(STORAGE.USER_INFO);
  // console.log("userInfo", userInfo);

  if (userInfo) {
    if (userInfo?.role === "accountant") {
      return <>{children}</>;
    }
    return <Navigate to={CLIENT_URI.ACCOUNTANT_DASHBOARD} replace />;
  }

  return <Navigate to={CLIENT_URI.LOGIN} replace />;
};

export default AccountantGuard;
