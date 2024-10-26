import React from "react";
import SidebarCustom from "./SidebarCustom";
import { HomeOutlined, DollarCircleOutlined, HistoryOutlined, BarChartOutlined } from "@ant-design/icons";
import { CLIENT_URI } from "../../../constants/uri.constants";

// Sidebar items for Accountant's content
const menuItemsForAdminContent = [
  { key: CLIENT_URI.ADMIN_DASHBOARD, label: "Bảng điều khiển", icon: <HomeOutlined /> },
  { key: CLIENT_URI.ACCOUNT_MANAGEMENT, label: "DS Tài khoản Hệ Thống", icon: <DollarCircleOutlined /> },
  { key: CLIENT_URI.PREMIUM_MANAGEMENT, label: "Quản Lý gói Premium", icon: <HistoryOutlined /> },
  { key: CLIENT_URI.FEEDBACK_MANAGEMENT, label: "DS báo cáo", icon: <BarChartOutlined /> },
];

// Accountant Sidebar Component
const AdminSidebar = () => {
  return <SidebarCustom menuItems={menuItemsForAdminContent} />;
};

export default AdminSidebar;
