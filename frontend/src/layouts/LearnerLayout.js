import React from "react";
import { authService } from "../services";

export const LearnerLayout = ({ children }) => {
  const onLogout = () => {
    authService.logout();
    window.location.reload();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <button onClick={() => onLogout()}>Logout</button>
      {children}
    </div>
  );
};

export default LearnerLayout;
