import React from "react";
import SidebarCustom from "./SidebarCustom";
import {
    HomeOutlined,
    BookOutlined,
    FormOutlined,
    FileTextOutlined,
    FileOutlined,
    CommentOutlined,
  } from "@ant-design/icons";
import { CLIENT_URI } from "../../constants/uri.constants";

const menuItemsForAdminContent = [
    { key: CLIENT_URI.DASHBOARD, label: "Trang Chủ", icon: <HomeOutlined /> },
    { key: CLIENT_URI.TABLE_EXERCISE, label: "Bài tập", icon: <BookOutlined /> },
    { key: CLIENT_URI.COURSE_PAGE, label: "Câu hỏi", icon: <FormOutlined /> },
    { key: CLIENT_URI.COURSE_PAGE, label: "Blog / Bài Viết", icon: <FileTextOutlined /> },
    { key: CLIENT_URI.COURSE_PAGE, label: "Flashcard Công Khai", icon: <FileOutlined /> },
    { key: CLIENT_URI.COURSE_PAGE, label: "Feedback / Báo Cáo", icon: <CommentOutlined /> },
  ];

const menuItemsForAdmin = [
  { key: CLIENT_URI.COURSE_PAGE, label: "Trang Chủ", icon: <HomeOutlined /> },
];

export function AdminContentSidebar() {
  return (
    <div>
      <SidebarCustom menuItems={menuItemsForAdminContent} />
    </div>
  );
}
export function AdminSidebar() {
    return (
      <div>
        <SidebarCustom menuItems={menuItemsForAdmin} />
      </div>
    );
  }
