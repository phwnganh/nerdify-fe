// //Doanh thu hệ thống
// import React from "react";

// const SystemRevenue = () => {
//   return <div>SystemRevenue</div>;
// };

// export default SystemRevenue;

import React, { useState, useEffect } from "react";
import HoverableCard from "../../../components/Card/HoverableCard";
import CustomLineChart from "../../../components/Chart/CustomLineChart";
import { BellOutlined } from "@ant-design/icons";
import UserInfo from "../../../components/Header/AccountantHeader/UserInfo";
import { Select } from "antd";
import { getAllTransactions } from "../../../services/AccountantService";

const { Option } = Select;

const SystemRevenue = () => {
  // State để lưu trữ giao dịch
  const [transactions, setTransactions] = useState([]);

  // State cho tùy chọn, năm và tháng
  const [selectedOption, setSelectedOption] = useState("option1"); // "option1" hoặc "option2"
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(null); // Chỉ dùng cho option2

  // State cho dữ liệu biểu đồ
  const [dataChart, setDataChart] = useState([]);

  // State cho dữ liệu thẻ thông tin
  const [doanhThu, setDoanhThu] = useState([]);
  const [taiKhoanDangKyGoi, setTaiKhoanDangKyGoi] = useState([]);

  useEffect(() => {
    const fetchAndProcessTransactions = async () => {
      try {
        const result = await getAllTransactions();
        const transactionsData = result.data;

        // Cập nhật state giao dịch
        setTransactions(transactionsData);

        // Xử lý dữ liệu cho biểu đồ
        processTransactionsForChart(transactionsData);

        // Xử lý dữ liệu cho thẻ thông tin
        processTransactionsForCards(transactionsData);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchAndProcessTransactions();
  }, [selectedOption, selectedYear, selectedMonth]);

  // Hàm xử lý dữ liệu cho biểu đồ
  const processTransactionsForChart = (transactionsData) => {
    let chartData = [];

    if (selectedOption === "option1") {
      // Option 1: Giao dịch theo tháng
      const monthlyData = Array.from({ length: 12 }, (_, i) => ({
        month: `Tháng ${i + 1}`,
        "Số giao dịch": 0,
      }));

      transactionsData.forEach((transaction) => {
        const transactionDate = new Date(transaction.createdAt || transaction.startDate);
        const transactionMonth = transactionDate.getMonth(); // 0 - 11
        const transactionYear = transactionDate.getFullYear();

        if (transactionYear === selectedYear) {
          monthlyData[transactionMonth]["Số giao dịch"] += 1;
        }
      });

      chartData = monthlyData;
    } else if (selectedOption === "option2") {
      // Option 2: Giao dịch theo ngày
      if (selectedMonth) {
        const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();

        const dailyData = Array.from({ length: daysInMonth }, (_, i) => ({
          day: `Ngày ${i + 1}`,
          "Số giao dịch": 0,
        }));

        transactionsData.forEach((transaction) => {
          const transactionDate = new Date(transaction.createdAt || transaction.startDate);
          const transactionDay = transactionDate.getDate(); // 1 - 31
          const transactionMonth = transactionDate.getMonth() + 1; // 1 - 12
          const transactionYear = transactionDate.getFullYear();

          if (transactionYear === selectedYear && transactionMonth === selectedMonth) {
            dailyData[transactionDay - 1]["Số giao dịch"] += 1;
          }
        });

        chartData = dailyData;
      } else {
        chartData = [];
      }
    }

    setDataChart(chartData);
  };

  // Hàm xử lý dữ liệu cho thẻ thông tin
  const processTransactionsForCards = (transactionsData) => {
    // Biến để tích lũy dữ liệu
    let totalRevenueThisMonth = 0;
    let totalRevenueThisYear = 0;
    let count6MonthPackage = 0;
    let count12MonthPackage = 0;

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth(); // 0 - 11
    const currentYear = currentDate.getFullYear();

    transactionsData.forEach((transaction) => {
      // Chỉ tính các giao dịch đã hoàn thành
      if (transaction.processingContent !== "completed") return;

      const transactionDate = new Date(transaction.createdAt || transaction.startDate);
      const transactionMonth = transactionDate.getMonth(); // 0 - 11
      const transactionYear = transactionDate.getFullYear();

      // Doanh thu trong tháng hiện tại
      if (transactionMonth === currentMonth && transactionYear === currentYear) {
        totalRevenueThisMonth += transaction.totalPrice;
      }

      // Doanh thu trong năm hiện tại
      if (transactionYear === currentYear) {
        totalRevenueThisYear += transaction.totalPrice;
      }

      // Đếm số tài khoản đăng ký gói
      const packageName = transaction.packageId.packageName;
      if (packageName.includes("6 tháng")) {
        count6MonthPackage += 1;
      } else if (packageName.includes("12 tháng")) {
        count12MonthPackage += 1;
      }
    });

    // Cập nhật state cho thẻ thông tin
    setDoanhThu([
      {
        id: 1,
        title: "Doanh thu tháng này",
        value: `${totalRevenueThisMonth.toLocaleString("vi-VN")} VND`,
        icon: <BellOutlined />,
      },
      {
        id: 2,
        title: "Doanh thu trong năm",
        value: `${totalRevenueThisYear.toLocaleString("vi-VN")} VND`,
        icon: <BellOutlined />,
      },
    ]);

    setTaiKhoanDangKyGoi([
      {
        id: 1,
        title: "Tài khoản đăng ký gói 6 tháng",
        value: `${count6MonthPackage}`,
        icon: <BellOutlined />,
      },
      {
        id: 2,
        title: "Tài khoản đăng ký gói 12 tháng",
        value: `${count12MonthPackage}`,
        icon: <BellOutlined />,
      },
    ]);
  };

  return (
    <div>
      <UserInfo />
      {/* Thêm phần chọn tùy chọn, năm và tháng */}
      <div style={{ marginTop: "20px" }}>
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <label>Chọn tùy chọn:</label>
          <Select value={selectedOption} onChange={setSelectedOption} style={{ width: 150 }}>
            <Option value="option1">Giao dịch theo tháng</Option>
            <Option value="option2">Giao dịch theo ngày</Option>
          </Select>
          <label>Chọn năm:</label>
          <Select value={selectedYear} onChange={setSelectedYear} style={{ width: 100 }}>
            {Array.from({ length: 5 }, (_, i) => {
              const year = new Date().getFullYear() - i;
              return (
                <Option key={year} value={year}>
                  {year}
                </Option>
              );
            })}
          </Select>
          {selectedOption === "option2" && (
            <>
              <label>Chọn tháng:</label>
              <Select value={selectedMonth} onChange={setSelectedMonth} style={{ width: 100 }}>
                {Array.from({ length: 12 }, (_, i) => (
                  <Option key={i + 1} value={i + 1}>
                    Tháng {i + 1}
                  </Option>
                ))}
              </Select>
            </>
          )}
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
      <div style={{ marginTop: "20px" }}>
        <CustomLineChart
          dataChart={dataChart}
          chartTitle={
            selectedOption === "option1" ? `Số lượng giao dịch trong năm ${selectedYear}` : selectedMonth ? `Số lượng giao dịch trong tháng ${selectedMonth}/${selectedYear}` : `Vui lòng chọn tháng`
          }
          dataKey={[{ dataKey: "Số giao dịch", color: "#fa8c16" }]}
          xAxisKey={selectedOption === "option1" ? "month" : "day"}
        />
      </div>
    </div>
  );
};

export default SystemRevenue;
