import React from "react";
import Navbar from "../components/Header";
import Footer from "../components/Footer";
import { Divider } from "antd";

export const GuestLayout = ({ children }) => {
  return (
    <>
      {/* Main Container */}
      <div style={{ minHeight: "100vh", width: "100%" }}>
        {/* Fixed Navbar */}
        <Navbar />

        {/* Content Area */}
        <div style={styles.container}>
          <div style={styles.content}>{children}</div>
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
    width: "100%",
    paddingTop: "80px",
    boxSizing: "border-box",
    overflowX: "hidden",
  },
  content: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
};

export default GuestLayout;
