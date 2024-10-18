import React, { useState } from "react";
import HoverableCard from "../../../components/Card/HoverableCard";
import CustomLineChart from "../../../components/Chart/CustomLineChart";
import { BellOutlined } from "@ant-design/icons";

const AccountantDashboard = () => {
  const doanhThu = [
    {
      id: 1,
      title: "Doanh thu tháng này",
      value: "1,000,000,000 VND",
      icon: <BellOutlined />,
    },
    {
      id: 2,
      title: "Doanh thu trong năm",
      value: "1,000,000,000 VND",
      icon: <BellOutlined />,
    },
  ];

  const taiKhoanDangKyGoi = [
    {
      id: 1,
      title: "Tài khoản đăng ký gói 6 tháng",
      value: "100",
      icon: <BellOutlined />,
    },
    {
      id: 2,
      title: "Tài khoản đăng ký gói 12 tháng",
      value: "100",
      icon: <BellOutlined />,
    },
  ];

  const dataChart = [
    { month: "Tháng 7", "Gói 6 tháng": 10, "Gói 12 tháng": 5 },
    { month: "Tháng 8", "Gói 6 tháng": 15, "Gói 12 tháng": 7 },
    { month: "Tháng 9", "Gói 6 tháng": 14, "Gói 12 tháng": 6 },
    { month: "Tháng 10", "Gói 6 tháng": 14, "Gói 12 tháng": 6 },
    { month: "Tháng 11", "Gói 6 tháng": 12, "Gói 12 tháng": 5 },
    { month: "Tháng 12", "Gói 6 tháng": 13, "Gói 12 tháng": 5 },
    { month: "Tháng 1", "Gói 6 tháng": 11, "Gói 12 tháng": 4 },
  ];

  return (
    <div style={{ padding: "20px" }}>
      {/* User Information */}
      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <span style={{ fontWeight: "bold", fontSize: "1rem" }}>Xin chào, Đoàn Thành Chung 🎉</span>
        <span style={{ fontSize: "0.9rem", color: "#666" }}>Tài khoản quyền: Accountant - Ngày tạo: 10/01/2025</span>
      </div>

      {/* Revenue and Subscription Cards */}
      <div style={{ marginTop: "20px" }}>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          {doanhThu.map((item) => (
            <HoverableCard key={item.id} item={item} />
          ))}
          {taiKhoanDangKyGoi.map((item) => (
            <HoverableCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* Charts */}
      <div>
        <CustomLineChart />
      </div>
    </div>
  );
};

export default AccountantDashboard;
