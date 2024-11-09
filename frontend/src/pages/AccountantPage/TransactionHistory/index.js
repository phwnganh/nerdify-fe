import React, { useState, useEffect } from "react";
import UserInfo from "../../../components/Header/AccountantHeader/UserInfo";
import HoverableCard from "../../../components/Card/HoverableCard";
import { BellOutlined } from "@ant-design/icons";
import TableTransaction from "../../../components/Table/TableTransaction";
import { getAllTransactions } from "../../../services/AccountantService";

const TransactionHistory = () => {
  const [stats, setStats] = useState({
    totalTransactions: 0,
    totalRevenue: 0,
    statusCounts: {
      pending: 0,
      completed: 0,
      failed: 0,
      others: 0,
    },
  });

  useEffect(() => {
    fetchAndCalculateStats();
  }, []);

  const fetchAndCalculateStats = async () => {
    try {
      const result = await getAllTransactions();
      console.log("API response:", result);

      const transactions = result.data; // Access all transactions directly

      // Calculate total number of transactions and total revenue
      const totalTransactions = transactions.length;
      const totalRevenue = transactions.reduce((sum, transaction) => {
        return sum + (transaction.totalPrice || 0);
      }, 0);

      // Calculate number of transactions by status
      const statusCounts = transactions.reduce(
        (acc, transaction) => {
          switch (transaction.processingContent) {
            case "pending":
              acc.pending += 1;
              break;
            case "completed":
              acc.completed += 1;
              break;
            case "failed":
              acc.failed += 1;
              break;
            default:
              acc.others += 1;
              break;
          }
          return acc;
        },
        { pending: 0, completed: 0, failed: 0, others: 0 },
      );

      setStats({
        totalTransactions,
        totalRevenue,
        statusCounts,
      });
    } catch (error) {
      console.error("Error fetching and calculating statistics:", error);
    }
  };

  const leftCards = [
    {
      id: 1,
      title: "Tổng số giao dịch",
      value: `${stats.totalTransactions} giao dịch`,
      icon: <BellOutlined />,
    },
    {
      id: 2,
      title: "Tổng doanh thu",
      value: `${stats.totalRevenue.toLocaleString("vi-VN")} VND`,
      icon: <BellOutlined />,
    },
  ];

  const rightCards = [
    {
      id: 3,
      title: "Giao dịch đang chờ duyệt",
      value: `${stats.statusCounts.pending} giao dịch`,
      icon: <BellOutlined />,
      color: "gold", // Color for pending status
    },
    {
      id: 4,
      title: "Giao dịch đã chấp nhận",
      value: `${stats.statusCounts.completed} giao dịch`,
      icon: <BellOutlined />,
      color: "green", // Color for completed status
    },
    {
      id: 5,
      title: "Giao dịch bị từ chối",
      value: `${stats.statusCounts.failed} giao dịch`,
      icon: <BellOutlined />,
      color: "red", // Color for failed status
    },
  ];

  return (
    <>
      <div>
        <UserInfo />
        <div style={{ marginTop: "20px", display: "grid", gridTemplateColumns: "1fr 2fr", gap: "10px" }}>
          {/* Left side */}
          <div style={{ display: "grid", gap: "20px" }}>
            {leftCards.map((item) => (
              <HoverableCard key={item.id} item={item} />
            ))}
          </div>

          {/* Right side */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              justifyContent: "space-around",
              height: "50%",
              alignSelf: "start",
            }}
          >
            {rightCards.map((item) => (
              <HoverableCard key={item.id} item={item} style={{ borderColor: item.color, flex: "1 1 200px" }} />
            ))}
          </div>
        </div>

        <div style={{ paddingTop: "20px" }}>
          <TableTransaction />
        </div>
      </div>
    </>
  );
};

export default TransactionHistory;
