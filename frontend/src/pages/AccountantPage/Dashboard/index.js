import React from "react";
import HoverableCard from "../../../components/Card/HoverableCard";
import CustomLineChart from "../../../components/Chart/CustomLineChart";
import { BellOutlined } from "@ant-design/icons";
import UserInfo from "../../../components/Header/AccountantHeader/UserInfo";

const AccountantDashboard = () => {
  // Dữ liệu thẻ thông tin
  const doanhThu = [
    { id: 1, title: "Doanh thu tháng này", value: "1,000,000,000 VND", icon: <BellOutlined /> },
    { id: 2, title: "Doanh thu trong năm", value: "1,000,000,000 VND", icon: <BellOutlined /> },
  ];

  const taiKhoanDangKyGoi = [
    { id: 1, title: "Tài khoản đăng ký gói 6 tháng", value: "100", icon: <BellOutlined /> },
    { id: 2, title: "Tài khoản đăng ký gói 12 tháng", value: "100", icon: <BellOutlined /> },
  ];

  // Dữ liệu biểu đồ
  const dataChart = [
    { month: "Tháng 7", "Gói 6 tháng": 10, "Gói 12 tháng": 5 },
    { month: "Tháng 8", "Gói 6 tháng": 15, "Gói 12 tháng": 7 },
    { month: "Tháng 9", "Gói 6 tháng": 14, "Gói 12 tháng": 6 },
  ];

  const chartTitle = "Lượng học viên mới đăng ký gói Premium trong tháng";

  const dataKey = [
    { dataKey: "Gói 6 tháng", color: "#fa8c16" },
    { dataKey: "Gói 12 tháng", color: "#722ed1" },
  ];

  // Số liệu mới thêm
  const hocVienTraPhiThangNay = 20;
  const tongHocVienTraPhiThang = 200;
  const tiLeHocVien = (hocVienTraPhiThangNay / tongHocVienTraPhiThang) * 100;

  return (
    <div style={{ padding: "20px" }}>
      <UserInfo />

      {/* Thông tin học viên trả phí */}
      <div style={{ marginTop: "20px", display: "flex", gap: "40px" }}>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ margin: 0 }}>
            {hocVienTraPhiThangNay}/{tongHocVienTraPhiThang}
          </h2>
          <p>Học viên trả phí mới tháng này</p>
        </div>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ margin: 0 }}>{tiLeHocVien.toFixed(0)}%</h2>
          <p>Tổng số học viên mới trả phí trong tháng</p>
        </div>
      </div>

      {/* Thẻ thông tin */}
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

      {/* Biểu đồ */}
      <div>
        <CustomLineChart dataChart={dataChart} chartTitle={chartTitle} dataKey={dataKey} />
      </div>
    </div>
  );
};

export default AccountantDashboard;
