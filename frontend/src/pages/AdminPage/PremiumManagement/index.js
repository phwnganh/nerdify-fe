import React from "react";
import { BellOutlined } from "@ant-design/icons";
import UserInfo from "../../../components/Header/AdminHeader/UserInfo";
import HoverableCard from "../../../components/Card/HoverableCard";
import TablePremiumPack from "../../../components/Table/TablePremiumPack";

const PremiumManagement = () => {
  // Dữ liệu thẻ thông tin
  const hocVien = [
    { id: 1, title: "Số tài khoản trả phí", value: "100", icon: <BellOutlined /> },
    { id: 2, title: "Học viên đăng ký gói 6 tháng", value: "100", icon: <BellOutlined /> },
    { id: 3, title: "Học viên đăng ký gói 12 tháng", value: "100", icon: <BellOutlined /> },
    { id: 4, title: "Học viên đăng ký gói trọn đời", value: "100", icon: <BellOutlined /> },
  ];

  return (
    <div>
      <UserInfo />

      {/* Thẻ thông tin */}
      <div style={{ marginTop: "20px" }}>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          {hocVien.map((item) => (
            <HoverableCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* Premium control panel */}
      <div style={{ marginTop: "20px" }}>
        <TablePremiumPack />
      </div>
    </div>
  );
};

export default PremiumManagement;
