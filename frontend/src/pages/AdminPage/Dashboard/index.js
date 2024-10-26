import React from "react";
import UserInfo from "../../../components/Header/AdminHeader/UserInfo";
import HoverableCard from "../../../components/Card/HoverableCard";
import CustomLineChart from "../../../components/Chart/CustomLineChart";
import CustomPieChart from "../../../components/Chart/CustomPieChart"; // Import the Pie Chart
import { BellOutlined } from "@ant-design/icons";
import { Row, Col } from "antd";

const Dashboard = () => {
  const hoverableCardData = [
    { id: 1, title: "Tổng số học viên trong hệ thống", value: 1200, icon: <BellOutlined /> },
    { id: 2, title: "Tổng số học viên mới trong tháng", value: 150, icon: <BellOutlined /> },
    { id: 3, title: "Tổng số học viên trả phí trong tháng", value: 80, icon: <BellOutlined /> },
    { id: 4, title: "Tổng số học viên miễn phí trong tháng", value: 70, icon: <BellOutlined /> },
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

  const dataKey = [
    { dataKey: "Gói 6 tháng", color: "#fa8c16" },
    { dataKey: "Gói 12 tháng", color: "#722ed1" },
  ];

  const pieData01 = [
    { name: "Học viên trả phí", value: 2400, fill: "#52c41a" }, // Green color
    { name: "Học viên miễn phí", value: 4567, fill: "#d9d9d9" }, // Light gray color
  ];

  return (
    <div style={{ padding: "20px" }}>
      <UserInfo />

      {/* Hoverable Cards Section */}
      <div style={{ marginTop: "20px" }}>
        <Row gutter={[20, 20]}>
          {hoverableCardData.map((item) => (
            <Col xs={24} sm={12} md={6} key={item.id}>
              {/* 6 columns on large screens */}
              <HoverableCard item={item} />
            </Col>
          ))}
        </Row>
      </div>

      {/* Charts Section */}
      <div style={{ marginTop: "20px" }}>
        <Row gutter={[20, 20]}>
          {/* Line Chart - Takes 3/4 of the screen */}
          <Col xs={24} md={18}>
            <CustomLineChart dataChart={dataChart} chartTitle="Lượng học viên mới đăng ký gói Premium trong tháng" dataKey={dataKey} />
          </Col>

          {/* Pie Chart - Takes 1/4 of the screen */}
          <Col xs={24} md={6}>
            <CustomPieChart data01={pieData01} chartTitle="Phân tích nhóm học viên" />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Dashboard;
