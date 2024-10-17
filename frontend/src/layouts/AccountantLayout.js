import React from "react";
import { Layout } from "antd";
// Import Sidebar and Header
import AccountantSidebar from "../components/Sidebar/AccountantSideBar/SidebarItems";
import AccountantHeader from "../components/Header/accountantHeader";

const { Content } = Layout;

export const AccountantLayout = ({ children }) => {
  const styles = {
    container: {
      display: "flex",
      minHeight: "100vh",
    },
    content: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px", // Padding for content spacing
    },
    layout: {
      flex: 1,

      backgroundColor: "#f0f2f5", // Optional: background color for content area
    },
  };

  return (
    <div style={styles.container}>
      <AccountantSidebar />
      <Layout style={styles.layout}>
        <AccountantHeader />
        <Content style={styles.content}>{children}</Content>
      </Layout>
    </div>
  );
};

export default AccountantLayout;
