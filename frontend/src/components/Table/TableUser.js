// //initial path of the snippet: src/components/Table/TableUser.js
// import React, { useState, useMemo, useEffect } from "react";
// import { Table, Tag, Input, Select, Button, Space, Modal, Typography } from "antd";
// import { StopOutlined, EyeOutlined } from "@ant-design/icons";
// import moment from "moment";

// const { Option } = Select;

// const TableUser = ({ userData }) => {
//   const formattedData = useMemo(
//     () =>
//       userData.map((user) => ({
//         key: user._id,
//         name: user.fullName,
//         email: user.email,
//         dateCreated: moment(user.createdAt).format("DD/MM/YYYY"),
//         role: user.role,
//         paymentStatus: user.accountType?.type === "Freemium" ? "Không" : "Có",
//         accountStatus: user.status === "active" ? "Đang hoạt động" : "Ngừng hoạt động",
//         details: user,
//       })),
//     [userData],
//   );

//   const [data, setData] = useState(formattedData);
//   const [search, setSearch] = useState("");
//   const [role, setRole] = useState("all");
//   const [paymentStatus, setPaymentStatus] = useState("all");
//   const [accountStatus, setAccountStatus] = useState("all");
//   const [creationOrder, setCreationOrder] = useState("newest");

//   const [isDetailsVisible, setIsDetailsVisible] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [isBanConfirmVisible, setIsBanConfirmVisible] = useState(false);
//   const [userToBan, setUserToBan] = useState(null);

//   // Filter and sort the data based on the selected filters
//   useEffect(() => {
//     let filtered = [...formattedData];

//     // Search filter
//     if (search) {
//       filtered = filtered.filter((user) => user.name.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase()));
//     }

//     // Role filter
//     if (role !== "all") {
//       filtered = filtered.filter((user) => user.role === role);
//     }

//     // Payment status filter
//     if (paymentStatus !== "all") {
//       filtered = filtered.filter((user) => (paymentStatus === "yes" && user.paymentStatus === "Có") || (paymentStatus === "no" && user.paymentStatus === "Không"));
//     }

//     // Account status filter
//     if (accountStatus !== "all") {
//       filtered = filtered.filter((user) => (accountStatus === "active" && user.accountStatus === "Đang hoạt động") || (accountStatus === "inactive" && user.accountStatus === "Ngừng hoạt động"));
//     }

//     // Sort by creation date
//     filtered.sort((a, b) => {
//       const dateA = moment(a.dateCreated, "DD/MM/YYYY");
//       const dateB = moment(b.dateCreated, "DD/MM/YYYY");
//       return creationOrder === "newest" ? dateB - dateA : dateA - dateB;
//     });

//     setData(filtered);
//   }, [search, role, paymentStatus, accountStatus, creationOrder, formattedData]);

//   const showUserDetails = (user) => {
//     setSelectedUser(user);
//     setIsDetailsVisible(true);
//   };

//   const confirmBanUser = (user) => {
//     setUserToBan(user);
//     setIsBanConfirmVisible(true);
//   };

//   const handleBanUser = () => {
//     const updatedData = data.map((user) => (user.key === userToBan.key ? { ...user, accountStatus: "Ngừng hoạt động" } : user));
//     setData(updatedData);
//     setIsBanConfirmVisible(false);
//   };

//   // const columns = [
//   //   {
//   //     title: "#",
//   //     dataIndex: "key",
//   //     key: "key",
//   //     render: (_, __, index) => index + 1,
//   //   },
//   //   {
//   //     title: "Tên tài khoản",
//   //     dataIndex: "name",
//   //     key: "name",
//   //     render: (text) => <a>{text}</a>,
//   //   },
//   //   {
//   //     title: "Email",
//   //     dataIndex: "email",
//   //     key: "email",
//   //   },
//   //   {
//   //     title: "Ngày tạo (dd/mm/yyyy)",
//   //     dataIndex: "dateCreated",
//   //     key: "dateCreated",
//   //   },
//   //   {
//   //     title: "Vai trò",
//   //     dataIndex: "role",
//   //     key: "role",
//   //   },
//   //   {
//   //     title: "Tài khoản trả phí",
//   //     dataIndex: "paymentStatus",
//   //     key: "paymentStatus",
//   //     render: (status) => <span style={{ fontWeight: "bold", color: status === "Có" ? "green" : "red" }}>{status}</span>,
//   //   },
//   //   {
//   //     title: "Trạng thái tài khoản",
//   //     dataIndex: "accountStatus",
//   //     key: "accountStatus",
//   //     render: (status) => <Tag color={status === "Đang hoạt động" ? "green" : "red"}>{status}</Tag>,
//   //   },
//   //   {
//   //     title: "Chức năng",
//   //     key: "action",
//   //     render: (_, record) => (
//   //       <Space size="middle">
//   //         <Button type="text" icon={<EyeOutlined />} onClick={() => showUserDetails(record.details)} />
//   //         <Button type="text" icon={<StopOutlined />} onClick={() => confirmBanUser(record)} />
//   //       </Space>
//   //     ),
//   //   },
//   // ];

//   const columns = [
//     { title: "#", dataIndex: "key", key: "key", render: (_, __, index) => index + 1 },
//     { title: "Tên tài khoản", dataIndex: "name", key: "name", render: (text) => <a>{text}</a> },
//     { title: "Email", dataIndex: "email", key: "email" },
//     { title: "Ngày tạo (dd/mm/yyyy)", dataIndex: "dateCreated", key: "dateCreated" },
//     { title: "Vai trò", dataIndex: "role", key: "role" },
//     {
//       title: "Tài khoản trả phí",
//       dataIndex: "paymentStatus",
//       key: "paymentStatus",
//       render: (status) => <span style={{ fontWeight: "bold", color: status === "Có" ? "green" : "red" }}>{status}</span>,
//     },
//     {
//       title: "Trạng thái tài khoản",
//       dataIndex: "accountStatus",
//       key: "accountStatus",
//       render: (status) => <Tag color={status === "Đang hoạt động" ? "green" : "red"}>{status}</Tag>,
//     },
//     {
//       title: "Chức năng",
//       key: "action",
//       render: (_, record) => (
//         <Space size="middle">
//           <Button type="text" icon={<EyeOutlined />} onClick={() => showUserDetails(record.details)} />
//           {record.accountStatus !== "Ngừng hoạt động" && <Button type="text" icon={<StopOutlined />} onClick={() => confirmBanUser(record)} />}
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <div>
//       <Space
//         style={{
//           marginBottom: 16,
//           width: "100%",
//           display: "flex",
//           gap: "10px",
//           alignItems: "center",
//           justifyContent: "space-between",
//         }}
//       >
//         <Input.Search placeholder="Tìm kiếm bằng tên hoặc email" style={{ width: 300 }} onSearch={(value) => setSearch(value)} />
//         <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
//           <label>Vai trò</label>
//           <Select defaultValue="all" onChange={setRole} style={{ width: 120 }}>
//             <Option value="all">Tất cả</Option>
//             <Option value="admin">Admin</Option>
//             <Option value="contentManager">Content Manager</Option>
//             <Option value="instructor">Instructor</Option>
//             <Option value="accountant">Accountant</Option>
//             <Option value="learner">Learner</Option>
//           </Select>
//         </div>
//       </Space>

//       <Space
//         style={{
//           marginBottom: 16,
//           width: "100%",
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//         }}
//       >
//         <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
//           <Select defaultValue="all" onChange={setPaymentStatus} style={{ width: 120 }}>
//             <Option value="all">Tất cả</Option>
//             <Option value="yes">Có</Option>
//             <Option value="no">Không</Option>
//           </Select>
//           <label>Tài khoản trả phí</label>
//         </div>

//         <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
//           <Select defaultValue="all" onChange={setAccountStatus} style={{ width: 120 }}>
//             <Option value="all">Tất cả</Option>
//             <Option value="active">Đang hoạt động</Option>
//             <Option value="inactive">Ngừng hoạt động</Option>
//           </Select>
//           <label>Trạng thái tài khoản</label>
//         </div>

//         <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
//           <label>Ngày tạo</label>
//           <Select defaultValue="newest" onChange={setCreationOrder} style={{ width: 120 }}>
//             <Option value="newest">Mới nhất</Option>
//             <Option value="oldest">Cũ nhất</Option>
//           </Select>
//         </div>
//       </Space>

//       <Table columns={columns} dataSource={data} pagination={{ pageSize: 10 }} footer={() => `Tổng số ${data.length} bản ghi`} />

//       <Modal title="Thông Tin Người Dùng" open={isDetailsVisible} onCancel={() => setIsDetailsVisible(false)} footer={null}>
//         {selectedUser && (
//           <div>
//             <p>Tên: {selectedUser.fullName}</p>
//             <p>Email: {selectedUser.email}</p>
//             <p>Vai trò: {selectedUser.role}</p>
//             <p>Trạng thái: {selectedUser.status}</p>
//             <p>Ngày tạo: {moment(selectedUser.createdAt).format("DD/MM/YYYY")}</p>
//           </div>
//         )}
//       </Modal>

//       <Modal title="Xác Nhận Cấm Người Dùng" open={isBanConfirmVisible} onOk={handleBanUser} onCancel={() => setIsBanConfirmVisible(false)}>
//         <p>Bạn có chắc muốn cấm người dùng này không?</p>
//       </Modal>
//     </div>
//   );
// };

// export default TableUser;

// src/components/Table/TableUser.js

import React, { useState, useMemo, useEffect } from "react";
import { Table, Tag, Input, Select, Button, Space, Modal, Typography, message } from "antd";
import { StopOutlined, EyeOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import moment from "moment";
import { banUser } from "../../services/AdminService";
const { Option } = Select;
const { confirm } = Modal;

const TableUser = ({ userData, refreshUsers }) => {
  const formattedData = useMemo(
    () =>
      userData.map((user) => ({
        key: user._id,
        name: user.fullName,
        email: user.email,
        dateCreated: moment(user.createdAt).format("DD/MM/YYYY"),
        role: user.role,
        paymentStatus: user.accountType?.type === "Freemium" ? "Không" : "Có",
        accountStatus: user.status === "active" ? "Đang hoạt động" : "Ngừng hoạt động",
        details: user,
      })),
    [userData],
  );

  const [data, setData] = useState(formattedData);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("all");
  const [paymentStatus, setPaymentStatus] = useState("all");
  const [accountStatus, setAccountStatus] = useState("all");
  const [creationOrder, setCreationOrder] = useState("newest");
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isBanConfirmVisible, setIsBanConfirmVisible] = useState(false);
  const [userToBan, setUserToBan] = useState(null);

  useEffect(() => {
    let filtered = [...formattedData];
    if (search) {
      filtered = filtered.filter((user) => user.name.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase()));
    }
    if (role !== "all") {
      filtered = filtered.filter((user) => user.role === role);
    }
    if (paymentStatus !== "all") {
      filtered = filtered.filter((user) => (paymentStatus === "yes" && user.paymentStatus === "Có") || (paymentStatus === "no" && user.paymentStatus === "Không"));
    }
    if (accountStatus !== "all") {
      filtered = filtered.filter((user) => (accountStatus === "active" && user.accountStatus === "Đang hoạt động") || (accountStatus === "inactive" && user.accountStatus === "Ngừng hoạt động"));
    }
    filtered.sort((a, b) => {
      const dateA = moment(a.dateCreated, "DD/MM/YYYY");
      const dateB = moment(b.dateCreated, "DD/MM/YYYY");
      return creationOrder === "newest" ? dateB - dateA : dateA - dateB;
    });
    setData(filtered);
  }, [search, role, paymentStatus, accountStatus, creationOrder, formattedData]);

  const showUserDetails = (user) => {
    setSelectedUser(user);
    setIsDetailsVisible(true);
  };

  const confirmBanUser = (user) => {
    confirm({
      title: `Xác nhận cấm người dùng ${user.name}?`,
      icon: <ExclamationCircleOutlined />,
      content: "Bạn có chắc chắn muốn cấm người dùng này?",
      okText: "Xác nhận",
      cancelText: "Hủy bỏ",
      onOk: () => handleBanUser(user.key),
    });
  };

  const handleBanUser = async (userId) => {
    try {
      await banUser(userId);
      message.success("Cấm người dùng thành công!");
      refreshUsers();
    } catch (error) {
      console.error("Error banning user:", error);
      message.error("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  const columns = [
    { title: "#", dataIndex: "key", key: "key", render: (_, __, index) => index + 1 },
    { title: "Tên tài khoản", dataIndex: "name", key: "name", render: (text) => <a>{text}</a> },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Ngày tạo (dd/mm/yyyy)", dataIndex: "dateCreated", key: "dateCreated" },
    { title: "Vai trò", dataIndex: "role", key: "role" },
    {
      title: "Tài khoản trả phí",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (status) => <span style={{ fontWeight: "bold", color: status === "Có" ? "green" : "red" }}>{status}</span>,
    },
    {
      title: "Trạng thái tài khoản",
      dataIndex: "accountStatus",
      key: "accountStatus",
      render: (status) => <Tag color={status === "Đang hoạt động" ? "green" : "red"}>{status}</Tag>,
    },
    {
      title: "Chức năng",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="text" icon={<EyeOutlined />} onClick={() => showUserDetails(record.details)} />
          {record.accountStatus === "Đang hoạt động" && <Button type="text" icon={<StopOutlined />} danger onClick={() => confirmBanUser(record)} />}
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Space
        style={{
          marginBottom: 16,
          width: "100%",
          display: "flex",
          gap: "10px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Input.Search placeholder="Tìm kiếm bằng tên hoặc email" style={{ width: 300 }} onSearch={(value) => setSearch(value)} />
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <label>Vai trò</label>
          <Select defaultValue="all" onChange={setRole} style={{ width: 120 }}>
            <Option value="all">Tất cả</Option>
            <Option value="admin">Admin</Option>
            <Option value="contentManager">Content Manager</Option>
            <Option value="instructor">Instructor</Option>
            <Option value="accountant">Accountant</Option>
            <Option value="learner">Learner</Option>
          </Select>
        </div>
      </Space>
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 10 }} />
      <Modal title="Thông Tin Người Dùng" open={isDetailsVisible} onCancel={() => setIsDetailsVisible(false)} footer={null}>
        {selectedUser && (
          <div>
            <p>Tên: {selectedUser.fullName}</p>
            <p>Email: {selectedUser.email}</p>
            <p>Vai trò: {selectedUser.role}</p>
            <p>Trạng thái: {selectedUser.status}</p>
            <p>Ngày tạo: {moment(selectedUser.createdAt).format("DD/MM/YYYY")}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default TableUser;
