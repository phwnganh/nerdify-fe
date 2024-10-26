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

// Styles
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    marginTop: "100px",
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "1fr minmax(auto, 1200px) 1fr",
    width: "100%",
    padding: "20px",
    boxSizing: "border-box",
  },
  column: {},
  content: {
    flex: 1,
    width: "100%",
  },
};

export default AdminLayout;
