// Danh sách giao dịch trong hệ thống
import React from "react";
import UserInfo from "../../../components/Header/accountantHeader/UserInfo";
import HoverableCard from "../../../components/Card/HoverableCard";
import { BellOutlined } from "@ant-design/icons";

const TransactionHistory = () => {
  // Dữ liệu thẻ thông tin
  const doanhThu = [
    { id: 1, title: "Tổng số giao dịch tháng này", value: "35 giao dịch", icon: <BellOutlined /> },
    { id: 2, title: "Doanh thu trong tháng", value: "1,000,000 VND", icon: <BellOutlined /> },
  ];

  return (
    <>
      <div style={{ padding: "20px" }}>
        <UserInfo />

        {/* Thẻ thông tin */}
        <div style={{ marginTop: "20px" }}>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            {doanhThu.map((item) => (
              <HoverableCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionHistory;
