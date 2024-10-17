import React from "react";
import SidebarCustom from "./SidebarCustom";
import { HomeOutlined, DollarCircleOutlined, HistoryOutlined, BarChartOutlined } from "@ant-design/icons";
import { CLIENT_URI } from "../../../constants/uri.constants";

// Sidebar items for Accountant's content
const menuItemsForAccountantContent = [
  { key: CLIENT_URI.ACCOUNTANT_DASHBOARD, label: "Trang Chủ", icon: <HomeOutlined /> },
  { key: CLIENT_URI.SYSTEM_REVENUE, label: "Doanh Thu Hệ Thống", icon: <DollarCircleOutlined /> },
  { key: CLIENT_URI.TRANSACTION_HISTORY, label: "Lịch Sử Giao Dịch", icon: <HistoryOutlined /> },
  { key: CLIENT_URI.USER_STATISTICS, label: "Thống Kê Người Dùng", icon: <BarChartOutlined /> },
];

// Accountant Sidebar Component
export function AccountantSidebar() {
  return (
    <div>
      <SidebarCustom menuItems={menuItemsForAccountantContent} />
    </div>
  );
}
