// Danh sách giao dịch trong hệ thống
import React from "react";
import UserInfo from "../../../components/Header/AccountantHeader/UserInfo";
import HoverableCard from "../../../components/Card/HoverableCard";
import { BellOutlined } from "@ant-design/icons";
import TableTransaction from "../../../components/Table/TableTransaction";

const TransactionHistory = () => {
  // Dữ liệu thẻ thông tin
  const doanhThu = [
    { id: 1, title: "Tổng số giao dịch tháng này", value: "35 giao dịch", icon: <BellOutlined /> },
    { id: 2, title: "Doanh thu trong tháng", value: "1,000,000 VND", icon: <BellOutlined /> },
  ];
  const tableData = [
    {
      id: 1,
      accountName: "Hoàng Huy Linh",
      email: "linhnhha24@fe.edu.vn",
      transactionDate: "20/01/2025",
      registeredPackage: "1 tháng",
      accountStatus: "Đang hoạt động",
      totalRegisteredPackages: 3,
      totalAmountPaid: "100.000vnd",
    },
    {
      id: 2,
      accountName: "Đặng Tuấn Anh",
      email: "anhdth14@fe.edu.vn",
      transactionDate: "20/01/2025",
      registeredPackage: "1 tháng",
      accountStatus: "Đang hoạt động",
      totalRegisteredPackages: 3,
      totalAmountPaid: "100.000vnd",
    },
    {
      id: 3,
      accountName: "Sỹ Danh Tiến",
      email: "tiensdh12@fe.edu.vn",
      transactionDate: "20/01/2025",
      registeredPackage: "1 tháng",
      accountStatus: "Ngừng hoạt động",
      totalRegisteredPackages: 3,
      totalAmountPaid: "100.000vnd",
    },
    {
      id: 4,
      accountName: "Trần Thị Thủy",
      email: "thuythte15@fe.edu.vn",
      transactionDate: "20/01/2025",
      registeredPackage: "1 tháng",
      accountStatus: "Đang hoạt động",
      totalRegisteredPackages: 3,
      totalAmountPaid: "100.000vnd",
    },
    {
      id: 5,
      accountName: "Phạm Thị Tâm",
      email: "tampthe10@fe.edu.vn",
      transactionDate: "20/01/2025",
      registeredPackage: "1 tháng",
      accountStatus: "Đang hoạt động",
      totalRegisteredPackages: 3,
      totalAmountPaid: "100.000vnd",
    },
    {
      id: 6,
      accountName: "Hoàng Mẫn Nhi",
      email: "nhinhm8@fe.edu.vn",
      transactionDate: "20/01/2025",
      registeredPackage: "1 tháng",
      accountStatus: "Ngừng hoạt động",
      totalRegisteredPackages: 3,
      totalAmountPaid: "100.000vnd",
    },
    {
      id: 7,
      accountName: "Hoàng Mẫn Tiến",
      email: "tienhmhe9@fe.edu.vn",
      transactionDate: "20/01/2025",
      registeredPackage: "1 tháng",
      accountStatus: "Đang hoạt động",
      totalRegisteredPackages: 3,
      totalAmountPaid: "100.000vnd",
    },
    {
      id: 8,
      accountName: "Phạm Thị Nguyệt Huế",
      email: "huept4@fe.edu.vn",
      transactionDate: "20/01/2025",
      registeredPackage: "1 tháng",
      accountStatus: "Đang hoạt động",
      totalRegisteredPackages: 3,
      totalAmountPaid: "100.000vnd",
    },
    {
      id: 9,
      accountName: "Nguyễn Thị Thu Hằng",
      email: "hangnt12@fe.edu.vn",
      transactionDate: "20/01/2025",
      registeredPackage: "1 tháng",
      accountStatus: "Đang hoạt động",
      totalRegisteredPackages: 3,
      totalAmountPaid: "100.000vnd",
    },
    {
      id: 10,
      accountName: "Nguyễn Phương Thủy",
      email: "thuynp8@fe.edu.vn",
      transactionDate: "20/01/2025",
      registeredPackage: "6 tháng",
      accountStatus: "Đang hoạt động",
      totalRegisteredPackages: 1,
      totalAmountPaid: "600.000vnd",
    },
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

        {/* Bảng thông tin giao dịch */}
        <div
          style={{
            marginTop: "20px",
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 0 1px rgba(0, 0, 0, 0.1)",
            width: "100%",
            height: "500px",
            overflow: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <style>
            {`
      /* Hide scrollbar for Chrome, Safari and Opera */
      div::-webkit-scrollbar {
        display: none;
      }
    `}
          </style>
          {/* Your content goes here */}
          <TableTransaction tableData={tableData} />
        </div>
      </div>
    </>
  );
};

export default TransactionHistory;
