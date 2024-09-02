import React from "react";
import { authService } from "../services";
import Navbar from "../components/Header";
import { Divider } from "antd";
import Footer from "../components/Footer";
import LearnerHeader from "../components/Header/LearnerHeader";

export const LearnerLayout = ({ children }) => {
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
    },
  };

  return (
    <div style={styles.container}>
      <LearnerHeader />
      <div style={styles.content}>{children}</div>
      <Divider style={{ margin: 0 }} />
      <Footer />
    </div>
  );
};

export default LearnerLayout;
