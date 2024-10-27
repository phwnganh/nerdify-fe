import React, { useState, useMemo } from "react";
import { Table, Tag, Input, Select, Button, Space, Modal, Typography } from "antd";
import { StopOutlined, EyeOutlined } from "@ant-design/icons";
import moment from "moment"; // For date formatting

const { Option } = Select;
const { Text, Title } = Typography;

const TableUser = ({ userData }) => {
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
        details: user, // Store full user data for modal
      })),
    [userData],
  );

  const [data, setData] = useState(formattedData);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isBanConfirmVisible, setIsBanConfirmVisible] = useState(false);
  const [userToBan, setUserToBan] = useState(null);

  // Show user details in a modal
  const showUserDetails = (user) => {
    setSelectedUser(user);
    setIsDetailsVisible(true);
  };

  // Confirm ban user action
  const confirmBanUser = (user) => {
    setUserToBan(user);
    setIsBanConfirmVisible(true);
  };

  const handleBanUser = () => {
    const newData = data.map((item) => (item.key === userToBan.key ? { ...item, accountStatus: "Ngừng hoạt động" } : item));
    setData(newData);
    setIsBanConfirmVisible(false);
  };

  // Table columns configuration
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
          <Button type="text" icon={<StopOutlined />} onClick={() => confirmBanUser(record)} />
        </Space>
      ),
    },
  ];

  return (
    <div>
      {/* Filters Section */}
      <Space style={{ marginBottom: 16, width: "100%", display: "flex", gap: "10px", alignItems: "center", justifyContent: "space-between" }} direction="horizontal" size="large" align="start">
        <Input.Search placeholder="Tìm kiếm bằng tên hoặc email" style={{ width: 300 }} />
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <label style={{ whiteSpace: "nowrap" }}>Vai trò</label>
          <Select defaultValue="Tất cả" style={{ width: 120 }}>
            <Option value="all">Tất cả</Option>
            <Option value="admin">Admin</Option>
            <Option value="contentManager">Content Manager</Option>
            <Option value="instructor">Instructor</Option>
            <Option value="accountant">Accountant</Option>
            <Option value="learner">Learner</Option>
          </Select>
        </div>
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
          <label style={{ whiteSpace: "nowrap" }}>Ngày tạo</label>
          <Select defaultValue="Mới nhất" style={{ width: 120 }}>
            <Option value="newest">Mới nhất</Option>
            <Option value="oldest">Cũ nhất</Option>
          </Select>
        </div>
      </Space>

      {/* User Table */}
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 10 }} footer={() => `Tổng số ${data.length} bản ghi`} />

      {/* User Details Modal */}
      <Modal
        title="Thông Tin Người Dùng"
        open={isDetailsVisible} // Use `open` instead of `visible`
        onCancel={() => setIsDetailsVisible(false)}
        footer={null}
      >
        {selectedUser && (
          <div>
            <p>Tên: {selectedUser.fullName}</p>
            <p>Email: {selectedUser.email}</p>
            <p>Vai trò: {selectedUser.role}</p>
            <p>Trạng thái: {selectedUser.status}</p>
            <p>Ngày tạo: {moment(selectedUser.createdAt).format("DD/MM/YYYY")}</p>
            {selectedUser.accountType?.type === "Premium" && (
              <>
                <p>Ngày bắt đầu gói Premium: {moment(selectedUser.accountType.startDate).format("DD/MM/YYYY")}</p>
                <p>Ngày kết thúc gói Premium: {moment(selectedUser.accountType.endDate).format("DD/MM/YYYY")}</p>
              </>
            )}
          </div>
        )}
      </Modal>

      <Modal
        title="Xác Nhận Cấm Người Dùng"
        open={isBanConfirmVisible} // Use `open` instead of `visible`
        onOk={handleBanUser}
        onCancel={() => setIsBanConfirmVisible(false)}
      >
        <p>Bạn có chắc muốn cấm người dùng này không?</p>
      </Modal>
    </div>
  );
};

export default TableUser;
