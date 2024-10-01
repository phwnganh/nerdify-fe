import React from "react";
import { Divider } from "antd";
import LearnerHeader from "../components/Header/LearnerHeader";
import Footer from "../components/Footer";

// LearnerLayout Component
export const LearnerLayout = ({ children }) => {
  return (
    <>
      {/* Main Container */}
      <div style={{ minHeight: "100vh", width: "100%" }}>
        {/* Fixed LearnerHeader */}
        <LearnerHeader />

        {/* Content Area */}
        <div style={styles.container}>
          <div style={styles.content}>{children}</div>

          {/* Divider and Footer */}
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
    maxWidth: "1200px",
    margin: "0 auto",
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

export default LearnerLayout;
