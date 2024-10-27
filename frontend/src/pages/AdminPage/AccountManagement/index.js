import React from "react";
import TableUser from "../../../components/Table/TableUser";
import UserInfo from "../../../components/Header/AdminHeader/UserInfo";

const userData = [
  {
    key: "1",
    name: "Hoàng Huy Linh",
    email: "linhhhhh24@fe.edu.vn",
    dateCreated: "20/01/2025",
    role: "Admin",
    paymentStatus: "Không",
    accountStatus: "Đang hoạt động",
  },
  {
    key: "2",
    name: "Đặng Tuấn Anh",
    email: "anhdth14@fe.edu.vn",
    dateCreated: "20/01/2025",
    role: "Admin",
    paymentStatus: "Không",
    accountStatus: "Đang hoạt động",
  },
  {
    key: "3",
    name: "Sỹ Danh Tiến",
    email: "tiensdc12@fe.edu.vn",
    dateCreated: "20/01/2025",
    role: "Content Manager",
    paymentStatus: "Không",
    accountStatus: "Ngừng hoạt động",
  },
];

const AccountManagement = () => {
  return (
    <div style={{ padding: "20px" }}>
      <UserInfo />

      <div style={{ marginTop: "20px" }}>
        <TableUser userData={userData} />
      </div>
    </div>
  );
};

export default AccountManagement;
