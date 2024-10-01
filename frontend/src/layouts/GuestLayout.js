import React from "react";
import Navbar from "../components/Header";
import Footer from "../components/Footer";
import { Divider } from "antd";

export const GuestLayout = ({ children }) => {
  return (
    <div style={styles.container}>
      <Navbar />
      <div style={styles.content}>{children}</div>
      <Divider style={{ margin: 0 }} />
      <Footer />
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    marginTop: "100px"
  },
  content: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    // paddingLeft: "20px",
    // paddingRight: "20px",
  },
};

export default GuestLayout;
