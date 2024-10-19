import React, { useEffect, useMemo, useState } from "react";
import { Layout } from "antd";
import { useLocation } from "react-router-dom";
import { CLIENT_URI } from "../../../constants/uri.constants";
import { BASE_SERVER } from "../../../constants";
import STORAGE, { getStorage } from "../../../library/storage";

const UserInfo = () => {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const userId = getStorage(STORAGE.USER_ID);
  useEffect(() => {
    fetch(`${BASE_SERVER}/users/${userId}`)
      .then((res) => res.json())
      .then((res) => {
        setUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

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
