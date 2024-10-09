import React from "react";
import { Divider } from "antd";
import LearnerHeader from "../components/Header/LearnerHeader";
import Footer from "../components/Footer";

// LearnerLayout Component
export const LearnerLayout = ({ children }) => {
  return (
    <>
      {/* Main Container */}
      <div style={{ minHeight: "100vh", width: "100%", marginTop: '30px' }}>
        {/* Fixed LearnerHeader */}
        <LearnerHeader />
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
    margin: "0 auto",
    paddingTop: "80px",
    boxSizing: "border-box",
    overflowX: "hidden",
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

export default LearnerLayout;
