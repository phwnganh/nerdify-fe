// TableUser.js
import React, { useState } from "react";
import { Table, Tag, Input, Select, Button, Space } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const { Option } = Select;

const TableUser = ({ userData }) => {
  const [data, setData] = useState([
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
  ]);
  console.log(userData);

  // Columns configuration
  const columns = [
    {
      title: "#",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Tên tài khoản",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Ngày tạo (dd/mm/yyyy)",
      dataIndex: "dateCreated",
      key: "dateCreated",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Tài khoản trả phí",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (status) => (
        <span
          style={{
            fontWeight: "bold",
            color: status === "Có" ? "green" : "red",
          }}
        >
          {status}
        </span>
      ),
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
      render: (_, record) => <Button type="text" icon={<DeleteOutlined />} onClick={() => handleDelete(record.key)} />,
    },
  ];

  // Delete handler
  const handleDelete = (key) => {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* Filters Section */}

      <Space style={{ marginBottom: 16, width: "100%" }} direction="horizontal" size="large" align="start">
        <Input.Search placeholder="Tìm kiếm bằng tên hoặc email" style={{ width: 300 }} />
      </Space>

      <Space
        style={{
          marginBottom: 16,
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        size="large"
      >
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <Select defaultValue="Tất cả" style={{ width: 120 }}>
            <Option value="all">Tất cả</Option>
            <Option value="admin">Admin</Option>
            <Option value="contentManager">Content Manager</Option>
            <Option value="instructor">Instructor</Option>
            <Option value="accountant">Accountant</Option>
            <Option value="learner">Learner</Option>
          </Select>
          <label style={{ whiteSpace: "nowrap" }}>Vai trò</label>
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <Select defaultValue="Tất cả" style={{ width: 120 }}>
            <Option value="all">Tất cả</Option>
            <Option value="yes">Có</Option>
            <Option value="no">Không</Option>
          </Select>
          <label style={{ whiteSpace: "nowrap" }}>Tài khoản trả phí</label>
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <Select defaultValue="Tất cả" style={{ width: 120 }}>
            <Option value="all">Tất cả</Option>
            <Option value="active">Đang hoạt động</Option>
            <Option value="inactive">Ngừng hoạt động</Option>
          </Select>
          <label style={{ whiteSpace: "nowrap" }}>Trạng thái tài khoản</label>
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <Select defaultValue="Mới nhất" style={{ width: 120 }}>
            <Option value="newest">Mới nhất</Option>
            <Option value="oldest">Cũ nhất</Option>
          </Select>
          <label style={{ whiteSpace: "nowrap" }}>Ngày tạo</label>
        </div>
      </Space>

      {/* User Table */}
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 10 }} footer={() => "Tổng số 100 bản ghi"} />
    </div>
  );
};

export default TableUser;
