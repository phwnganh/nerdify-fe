import React from "react";
import Navbar from "../components/Header";
import Footer from "../components/Footer";
import { Divider } from "antd";

export const AdminContentLayout = ({ children }) => {
  return (
    <>
      {/* Main Container */}
      <div style={{ minHeight: "100vh", width: "100%" }}>
        {/* Fixed Navbar */}
        <Navbar />
        {/* Content Area */}
        <div style={styles.container}>
          <div style={styles.gridContainer}>
            {/* Left Column (spacer) */}
            <div style={styles.column}></div>
            {/* Middle Column (content) */}
            <div style={styles.content}>{children}</div>
            {/* Right Column (spacer) */}
            <div style={styles.column}></div>
          </div>
          <Divider style={{ marginBottom: 5 }} />
          <Footer />
        </div>
      </div>
    </>
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
  column: {

  },
  content: {
    flex: 1,
    width: "100%",
  },
};

export default AdminContentLayout;