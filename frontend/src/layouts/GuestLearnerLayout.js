import { Divider } from "antd";
import Navbar from "../components/Header";
import LearnerHeader from "../components/Header/LearnerHeader";
import { ROLES } from "../constants";
import Footer from "../components/Footer";

export const GuestLearnerLayout = ({ children, role }) => {
  const HeaderComponent = role === ROLES.LEARNER_ROLE ? <LearnerHeader /> : <Navbar />;
  return (
    <>
      <div style={{ minHeight: "100vh", width: "100%" }}>
        {HeaderComponent}
        <div style={styles.container}>
          <div style={styles.gridContainer}>
            <div style={styles.column}></div>
            <div style={styles.content}>{children}</div>
            <div style={styles.column}></div>
          </div>
          <Divider style={{ marginBottom: 5 }} />
          <Footer />
        </div>
      </div>
    </>
  );
};

// Styles (giữ nguyên)
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
