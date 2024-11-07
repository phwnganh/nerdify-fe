//path : src/pages/AdminPage/Dashboard/index.js

import React, { useEffect, useState } from "react";
import UserInfo from "../../../components/Header/AdminHeader/UserInfo";
import HoverableCard from "../../../components/Card/HoverableCard";
import { Card, Row, Col, Button } from "antd";
import { getStatistics, getAllUsers } from "../../../services/AdminService";
import { BellOutlined, VerticalAlignBottomOutlined } from "@ant-design/icons";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import * as XLSX from "xlsx";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [statistics, setStatistics] = useState(null);
  const [users, setUsers] = useState([]);

  const fetchStatistics = async () => {
    try {
      const result = await getStatistics();
      setStatistics(result.data);
      console.log("Statistics:", result.data);
    } catch (error) {
      console.error("Error fetching statistics:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const result = await getAllUsers();
      setUsers(result.data);
      console.log("Users:", result.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchStatistics();
    fetchUsers();
  }, []);

  const exportToXLSX = () => {
    const rowTitles = ["ID", "Email", "Họ tên", "Ngày sinh", "Giới tính", "Số điện thoại", "Loại tài khoản", "Ngày tạo", "Ngày cập nhật"];
    const rowTitleNameFromData = ["id", "email", "fullName", "dateOfBirth", "gender", "phoneNumber", "accountType.type", "createdAt", "updatedAt"];

    const formatDate = (dateString) => {
      if (!dateString) return ""; // Return empty if no date
      const date = new Date(dateString);
      return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} ${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    };

    const formattedData = users.map((user) => {
      const dataRow = {};
      rowTitleNameFromData.forEach((key, index) => {
        const keys = key.split(".");
        let value = keys.reduce((acc, k) => (acc && acc[k] ? acc[k] : ""), user);

        if (key === "createdAt" || key === "updatedAt") {
          value = formatDate(value);
        }

        dataRow[rowTitles[index]] = value || "";
      });

      return dataRow;
    });

    const worksheet = XLSX.utils.json_to_sheet(formattedData, { header: rowTitles });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Accounts");
    XLSX.writeFile(workbook, "Danh_sach_tai_khoan.xlsx");
  };

  if (loading) return <p>Loading...</p>;
  if (!statistics) return <p>No data available</p>;

  // Prepare dynamic hoverable card data from statistics
  const hoverableCardData = [
    { id: 1, title: "Tổng số học viên trong hệ thống", value: statistics.totalUsers, icon: <BellOutlined /> },
    { id: 2, title: "Tổng số học viên mới trong tháng", value: statistics.formattedMonthsData[0].newUsers, icon: <BellOutlined /> },
    { id: 3, title: "Tổng số học viên trả phí trong hệ thống", value: statistics.totalPremiumUsers, icon: <BellOutlined /> },
    { id: 4, title: "Tổng số học viên miễn phí trong hệ thống", value: statistics.totalFreemiumUsers, icon: <BellOutlined /> },
  ];

  const convertMonthToVietnamese = (monthString) => {
    const monthMapping = {
      January: "T1",
      February: "T2",
      March: "T3",
      April: "T4",
      May: "T5",
      June: "T6",
      July: "T7",
      August: "T8",
      September: "T9",
      October: "T10",
      November: "T11",
      December: "T12",
    };
    const [monthName, year] = monthString.split(" ");
    const vietnameseMonth = monthMapping[monthName];
    return `${vietnameseMonth}/${year}`;
  };

  const barChartData = statistics.formattedMonthsData.map((item) => ({
    month: convertMonthToVietnamese(item.month),
    newUsers: item.newUsers,
  }));

  const pieChartData = [
    { name: "Học viên trả phí", value: statistics.totalPremiumUsers },
    { name: "Học viên miễn phí", value: statistics.totalFreemiumUsers },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: " space-between", alignItems: "center", marginBottom: "20px" }}>
        <UserInfo />
        <div>
          <Button
            type="primary"
            style={{
              backgroundColor: "green",
            }}
            icon={<VerticalAlignBottomOutlined />}
            onClick={exportToXLSX}
          >
            Xuất thông tin
          </Button>
        </div>
      </div>

      <div style={{ marginTop: "20px" }}>
        <Row gutter={[20, 20]}>
          {hoverableCardData.map((item) => (
            <Col xs={24} sm={12} md={6} key={item.id}>
              <HoverableCard item={item} />
            </Col>
          ))}
        </Row>
      </div>

      <div style={{ marginTop: "20px" }}>
        <Row gutter={16}>
          <Col xs={24} sm={24} md={18}>
            <Card style={{ marginBottom: "20px" }} title="Số lượng học viên mới theo tháng">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barChartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => `${value} học viên`} />
                  <Bar dataKey="newUsers" name="Học viên mới" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={6}>
            <Card title="Tỷ lệ học viên trả phí và miễn phí">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={pieChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}>
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? "#0088FE" : "#00C49F"} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [`${value} học viên`, `${name}`]} />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Dashboard;
