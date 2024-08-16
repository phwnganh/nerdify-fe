import React from "react";

export const AdminLayout = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      {children}
    </div>
  );
};

export default AdminLayout;
