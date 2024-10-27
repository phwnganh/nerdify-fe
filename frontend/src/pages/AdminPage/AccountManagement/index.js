import React from "react";
import TableUser from "../../../components/Table/TableUser";
import UserInfo from "../../../components/Header/AdminHeader/UserInfo";
import { UserOutlined, EyeOutlined } from "@ant-design/icons";
import HoverableCard from "../../../components/Card/HoverableCard";

const userData = [
  {
    _id: "66b0f2c8bed16f5c87fdf8a4",
    email: "anhlagaumeo203@gmail.com",
    fullName: "Đoàn Thành Chung",
    role: "admin",
    gender: "female",
    authProvider: "local",
    verificationToken: null,
    verificationStatus: true,
    createdAt: "2024-08-05T15:42:00.427Z",
    updatedAt: "2024-10-27T05:20:17.186Z",
    __v: 0,
    dateOfBirth: "2001-09-24",
    phone: "0123437345",
    accountType: {
      type: "Freemium",
      _id: "671dcd91dc03eab84bfcfc68",
    },
    status: "active",
  },
  {
    _id: "66ffa1ffb5e7b5895abd4ae0",
    email: "tuanthhe172693@fpt.edu.vn",
    fullName: "Tran Huy Tuan",
    role: "learner",
    authProvider: "local",
    verificationToken: null,
    verificationStatus: true,
    createdAt: "2024-10-04T08:06:23.397Z",
    updatedAt: "2024-10-27T05:20:17.186Z",
    __v: 0,
    accountType: {
      type: "Freemium",
      _id: "671dcd91dc03eab84bfcfc69",
    },
    passwordResetExpires: "2024-10-21T17:27:05.147Z",
    passwordResetToken: "d310bc41cd8730ba708fa14db2923e85efb11f86323943c56ae3ec2ff7fa25eeae3cf31ee2e2a37ada0e9755d2069d2be2b7e5b114ed8813244495b496ad3072",
    status: "active",
  },
  {
    status: "active",
    _id: "670014f1b2d60209c98e5a1b",
    email: "thientdhe163280@fpt.edu.vn",
    fullName: "Trinh Dai Thien (K16_HL)",
    role: "learner",
    avatar: "https://lh3.googleusercontent.com/a/ACg8ocJmfevutMvZD6BxKvIUcgsNBFA_II-3aR2sz_oiNE8kS46sbw=s96-c",
    authProvider: "google",
    verificationToken: null,
    verificationStatus: true,
    createdAt: "2024-10-04T16:16:49.980Z",
    updatedAt: "2024-10-27T05:20:17.186Z",
    __v: 0,
    accountType: {
      type: "Freemium",
      _id: "671dcd91dc03eab84bfcfc6a",
    },
  },
  {
    _id: "6717ba13217032d647da9360",
    email: "lanlearn2003@gmail.com",
    fullName: "Lan Thân",
    role: "learner",
    authProvider: "local",
    accountType: {
      type: "Premium",
      startDate: "2024-10-22T14:52:07.353Z",
      endDate: "2024-10-22T14:52:07.353Z",
      _id: "6717bc17217032d647da9367",
    },
    status: "active",
    verificationToken: null,
    verificationStatus: true,
    createdAt: "2024-10-22T14:43:31.357Z",
    updatedAt: "2024-10-22T14:52:07.354Z",
    __v: 0,
  },
];

// Dữ liệu thẻ thông tin
const cardInfo = [
  { id: 1, title: "Tổng số tài khoản", value: "100", icon: <UserOutlined /> },
  { id: 2, title: "Số tài khoản trả phí", value: "100", icon: <UserOutlined /> },
  { id: 3, title: "Số tài khoản miễn phí", value: "100", icon: <UserOutlined /> },
];

const AccountManagement = () => {
  return (
    <div style={{ padding: "20px" }}>
      <UserInfo />

      {/* Thẻ thông tin */}
      <div style={{ marginTop: "20px" }}>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          {cardInfo.map((item) => (
            <HoverableCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      <div style={{ marginTop: "20px" }}>
        <TableUser userData={userData} />
      </div>
    </div>
  );
};

export default AccountManagement;
