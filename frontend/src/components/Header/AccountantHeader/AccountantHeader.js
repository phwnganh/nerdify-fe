import React, { useEffect, useState, useMemo } from "react";
import { Layout } from "antd";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../../hooks"; // Use the same hook for authentication
import SpinCustom from "../../Spinning/SpinningCustom"; // Custom loading spinner
import { CLIENT_URI } from "../../../constants/uri.constants";

const { Header } = Layout;

const AccountantHeader = () => {
  const { isInitialized, user } = useAuth(); // Use the same hook to get user data
  const location = useLocation();

  // Map routes to their respective labels
  const routeLabels = useMemo(
    () => ({
      [CLIENT_URI.ACCOUNTANT_DASHBOARD]: "Trang Chủ",
      [CLIENT_URI.SYSTEM_REVENUE]: "Doanh Thu Hệ Thống",
      [CLIENT_URI.TRANSACTION_HISTORY]: "Lịch Sử Giao Dịch",
      [CLIENT_URI.USER_STATISTICS]: "Thống Kê Người Dùng",
    }),
    [],
  );

  // Determine the current title based on the path
  const currentTitle = routeLabels[location.pathname] || "Thống Kê Tài Chính";

  // Inline styles for the header
  const styles = {
    header: {
      height: "80px",
      background: "#fff",
      padding: "0 20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottom: "1px solid #e8e8e8", // Optional: bottom border for separation
    },
  };

  // Display a loading spinner while the auth is initializing
  if (!isInitialized) {
    return <SpinCustom size="large" />;
  }

  return (
    <Header style={styles.header}>
      <h2 style={{ margin: 0 }}>{currentTitle}</h2> {/* Dynamic Header Title */}
      <div>
        <span>Xin chào, {user?.fullName} 🎉</span> {/* User Greeting */}
      </div>
    </Header>
  );
};

export default AccountantHeader;
