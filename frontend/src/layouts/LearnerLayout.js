import React from "react";
import { Divider } from "antd";
import LearnerHeader from "../components/Header/LearnerHeader";
import Footer from "../components/Footer";

// LearnerLayout Component
export const LearnerLayout = ({ children }) => {
  // Styles
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
    },
    content: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      paddingTop: "80px",
    },
  };

  return (
    <div style={styles.container}>
      {/* Fixed LearnerHeader */}
      <LearnerHeader />

      {/* Main Content */}
      <div style={styles.content}>{children}</div>

      {/* Divider and Footer */}
      <Divider style={{ margin: 0 }} />
      <Footer />
    </div>
  );
};

export default LearnerLayout;
