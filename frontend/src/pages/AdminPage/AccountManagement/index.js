// // Initial path: src/pages/AccountManagement/index.js

// import React, { useEffect, useState } from "react";
// import { getAllUsers } from "../../../services/AdminService";
// import TableUser from "../../../components/Table/TableUser";
// import UserInfo from "../../../components/Header/AdminHeader/UserInfo";
// import { UserOutlined } from "@ant-design/icons";
// import HoverableCard from "../../../components/Card/HoverableCard";

// const AccountManagement = () => {
//   const [userData, setUserData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch all users when component mounts
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const result = await getAllUsers();
//         setUserData(result.data);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   const cardInfo = [
//     {
//       id: 1,
//       title: "Tổng số tài khoản",
//       value: userData.length,
//       icon: <UserOutlined />,
//     },
//     {
//       id: 2,
//       title: "Số tài khoản trả phí",
//       value: userData.filter((user) => user.accountType.type === "Premium").length,
//       icon: <UserOutlined />,
//     },
//     {
//       id: 3,
//       title: "Số tài khoản miễn phí",
//       value: userData.filter((user) => user.accountType.type === "Freemium").length,
//       icon: <UserOutlined />,
//     },
//   ];

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div style={{ padding: "20px" }}>
//       <UserInfo />
//       <div style={{ marginTop: "20px" }}>
//         <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
//           {cardInfo.map((item) => (
//             <HoverableCard key={item.id} item={item} />
//           ))}
//         </div>
//       </div>
//       <div style={{ marginTop: "20px" }}>
//         <TableUser userData={userData} />
//       </div>
//     </div>
//   );
// };

// export default AccountManagement;

// src/pages/AccountManagement/index.js

import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../../services/AdminService";
import TableUser from "../../../components/Table/TableUser";
import UserInfo from "../../../components/Header/AdminHeader/UserInfo";
import { UserOutlined } from "@ant-design/icons";
import HoverableCard from "../../../components/Card/HoverableCard";
import { Button } from "antd"; // Import Ant Design Button
import ModalCreateAccount from "../../../components/Modal/ModalCreateAccount"; // Import Create Account Modal

const AccountManagement = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility

  // Fetch all users when component mounts
  const fetchUsers = async () => {
    try {
      const result = await getAllUsers();
      setUserData(result.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const cardInfo = [
    {
      id: 1,
      title: "Tổng số tài khoản",
      value: userData.length,
      icon: <UserOutlined />,
    },
    {
      id: 2,
      title: "Số tài khoản trả phí",
      value: userData.filter((user) => user.accountType.type === "Premium").length,
      icon: <UserOutlined />,
    },
    {
      id: 3,
      title: "Số tài khoản miễn phí",
      value: userData.filter((user) => user.accountType.type === "Freemium").length,
      icon: <UserOutlined />,
    },
  ];

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    fetchUsers(); // Refresh user data after creating an account
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <UserInfo />
      <div style={{ marginTop: "20px" }}>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          {cardInfo.map((item) => (
            <HoverableCard key={item.id} item={item} />
          ))}
        </div>
      </div>
      <div style={{ marginTop: "20px" }}>
        <Button
          type="primary"
          onClick={showModal}
          style={{
            marginBottom: "20px",
            backgroundColor: "#ffa751",
            borderColor: "#ffa751",
          }}
        >
          Tạo tài khoản hệ thống
        </Button>
        <TableUser userData={userData} refreshUsers={fetchUsers} />
      </div>
      <ModalCreateAccount isVisible={isModalVisible} onClose={handleCloseModal} />
    </div>
  );
};

export default AccountManagement;
