// AccountantHeader.js
import React, { useEffect, useMemo, useState } from "react";
import { Layout } from "antd";
import { useLocation } from "react-router-dom";
import { CLIENT_URI } from "../../../constants/uri.constants";
import { BASE_SERVER } from "../../../constants";
import STORAGE, { getStorage } from "../../../library/storage";

const { Header } = Layout;

const AccountantHeader = () => {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const userId = getStorage(STORAGE.USER_ID);

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

  useEffect(() => {
    fetch(`${BASE_SERVER}/users/${userId}`).then(res => res.json()).then(res => {
      setUser(res);
    }).catch(err => {
      console.log(err);
    })
  }, [userId])

  // Determine the current title based on the path
  const currentTitle = routeLabels[location.pathname] || "Thống Kê Tài Chính";

  const styles = {
    header: {
      background: "#fff",
      padding: "0 20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottom: "1px solid #e8e8e8", // Optional: bottom border for separation
    },
  };

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
