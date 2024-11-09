import React from "react";
import SidebarCustom from "./SidebarCustom";
import { HomeOutlined, DollarCircleOutlined, HistoryOutlined, BarChartOutlined } from "@ant-design/icons";
import { CLIENT_URI } from "../../../constants/uri.constants";

// Sidebar items for Accountant's content
const menuItemsForAccountantContent = [
  { key: CLIENT_URI.SYSTEM_REVENUE, label: "Doanh Thu Hệ Thống", icon: <DollarCircleOutlined /> },
  { key: CLIENT_URI.TRANSACTION_HISTORY, label: "Quản Lý Giao Dịch", icon: <HistoryOutlined /> },
];

// Accountant Sidebar Component
const AccountantSidebar = () => {
  return <SidebarCustom menuItems={menuItemsForAccountantContent} />;
};

export default AccountantSidebar;
