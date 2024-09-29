// import React from "react";
// import { Divider } from "antd";
// import LearnerHeader from "../components/Header/LearnerHeader";
// import Footer from "../components/Footer";

// // LearnerLayout Component
// export const LearnerLayout = ({ children }) => {
//   return (
//     <>
//       {/* Main Container */}
//       <div style={{ minHeight: "100vh", width: "100%" }}>
//         {/* Fixed LearnerHeader */}
//         <LearnerHeader />

//         {/* Content Area */}
//         <div style={styles.container}>
//           <div style={styles.content}>{children}</div>

//           {/* Divider and Footer */}
//           <Divider style={{ marginBottom: 5 }} />
//           <Footer />
//         </div>
//       </div>
//     </>
//   );
// };

// // Styles
// const styles = {
//   container: {
//     display: "flex",
//     flexDirection: "column",
//     minHeight: "100vh",
//     width: "100%",
//     paddingTop: "80px",
//     boxSizing: "border-box",
//     overflowX: "hidden",
//   },
//   content: {
//     flex: 1,
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     width: "100%",
//   },
// };

// export default LearnerLayout;

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
    width: "100%", // Chiều rộng container luôn là 100% màn hình
    maxWidth: "1200px", // Đặt maxWidth cố định cho container (ví dụ: 1200px)
    margin: "0 auto", // Căn giữa container nếu có không gian trống
    paddingTop: "80px", // Đảm bảo không gian cho header cố định
    boxSizing: "border-box", // Đảm bảo padding không ảnh hưởng đến kích thước tổng
    overflowX: "hidden", // Ngăn chặn cuộn ngang
  },
  content: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%", // Nội dung sẽ chiếm toàn bộ chiều rộng của container
  },
};

export default LearnerLayout;
