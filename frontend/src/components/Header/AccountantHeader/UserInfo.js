import React, { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../../hooks";
import SpinCustom from "../../Spin";

const UserInfo = () => {
  const { isInitialized, isAuthenticated, user } = useAuth();

  if (!isInitialized) {
    return <SpinCustom size="large"></SpinCustom>;
  }

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <span style={{ fontWeight: "bold", fontSize: "1rem" }}>Xin chào, {user?.fullName} 🎉</span>
        <span style={{ fontSize: "0.9rem", color: "#666" }}>Tài khoản quyền: {user?.role} - Ngày tạo: 10/01/2025</span>
      </div>
    </>
  );
};

export default UserInfo;
