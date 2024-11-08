// src/components/Table/TableUser.js

import React, { useState, useMemo, useEffect } from "react";
import { Table, Tag, Input, Select, Button, Space, Modal, message } from "antd";
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
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [sortedInfo, setSortedInfo] = useState({});
  const [filteredInfo, setFilteredInfo] = useState({});

  useEffect(() => {
    let filtered = [...formattedData];
    if (search) {
      filtered = filtered.filter((user) => user.name.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase()));
    }
    if (role !== "all") {
      filtered = filtered.filter((user) => user.role === role);
    }
    setData(filtered);
  }, [search, role, formattedData]);

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
    {
      title: "#",
      dataIndex: "key",
      key: "key",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Tên tài khoản",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
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
      sorter: (a, b) => {
        const dateA = moment(a.dateCreated, "DD/MM/YYYY");
        const dateB = moment(b.dateCreated, "DD/MM/YYYY");
        return dateA - dateB;
      },
      sortOrder: sortedInfo.columnKey === "dateCreated" && sortedInfo.order,
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
      filters: [
        { text: "Có", value: "Có" },
        { text: "Không", value: "Không" },
      ],
      filteredValue: filteredInfo.paymentStatus || null,
      onFilter: (value, record) => record.paymentStatus === value,
      render: (status) => <span style={{ fontWeight: "bold", color: status === "Có" ? "green" : "red" }}>{status}</span>,
    },
    {
      title: "Trạng thái tài khoản",
      dataIndex: "accountStatus",
      key: "accountStatus",
      filters: [
        { text: "Đang hoạt động", value: "Đang hoạt động" },
        { text: "Ngừng hoạt động", value: "Ngừng hoạt động" },
      ],
      filteredValue: filteredInfo.accountStatus || null,
      onFilter: (value, record) => record.accountStatus === value,
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
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 10 }}
        onChange={(pagination, filters, sorter) => {
          setSortedInfo(sorter);
          setFilteredInfo(filters);
        }}
      />
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
