import React from "react";
import { Layout } from "antd";
// Import Sidebar and Header
import AdminSidebar from "../components/Sidebar/AdminSideBar/SidebarItems";
import AdminHeader from "../components/Header/AdminHeader";

const { Content } = Layout;

export const AdminLayout = ({ children }) => {
  const styles = {
    container: {
      display: "flex",
      minHeight: "100vh",
    },
    content: {
      padding: "20px",
    },
    layout: {
      flex: 1,
      backgroundColor: "#f0f2f5",
    },
  };

  return (
    <div style={styles.container}>
      <AdminSidebar />
      <Layout style={styles.layout}>
        <AdminHeader />
        <Content style={styles.content}>{children}</Content>
      </Layout>
    </div>
  );
};

export default AdminLayout;
