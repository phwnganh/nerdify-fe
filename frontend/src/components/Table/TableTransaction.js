import React, { useState, useEffect } from "react";
import { Table, Tag, Input, Select, Button, Space } from "antd";
import { EyeOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";

const { Option } = Select;

const TableTransaction = ({ tableData }) => {
  //data mẫu
  //   const initialData = [
  //     {
  //       key: 1,
  //       accountName: "Hoàng Huy Linh",
  //       email: "linhnhha24@fe.edu.vn",
  //       transactionDate: "20/01/2025",
  //       registeredPackage: "1 tháng",
  //       accountStatus: "Đang hoạt động",
  //       totalRegisteredPackages: 3,
  //       totalAmountPaid: "100.000vnd",
  //     },
  //     {
  //       key: 2,
  //       accountName: "Đặng Tuấn Anh",
  //       email: "anhdth14@fe.edu.vn",
  //       transactionDate: "20/01/2025",
  //       registeredPackage: "1 tháng",
  //       accountStatus: "Đang hoạt động",
  //       totalRegisteredPackages: 3,
  //       totalAmountPaid: "100.000vnd",
  //     },
  //     {
  //       key: 3,
  //       accountName: "Sỹ Danh Tiến",
  //       email: "tiensdh12@fe.edu.vn",
  //       transactionDate: "20/01/2025",
  //       registeredPackage: "1 tháng",
  //       accountStatus: "Ngừng hoạt động",
  //       totalRegisteredPackages: 3,
  //       totalAmountPaid: "100.000vnd",
  //     },
  //     {
  //       key: 4,
  //       accountName: "Trần Thị Thủy",
  //       email: "thuythte15@fe.edu.vn",
  //       transactionDate: "20/01/2025",
  //       registeredPackage: "1 tháng",
  //       accountStatus: "Đang hoạt động",
  //       totalRegisteredPackages: 3,
  //       totalAmountPaid: "100.000vnd",
  //     },
  //     {
  //       key: 5,
  //       accountName: "Phạm Thị Tâm",
  //       email: "tampthe10@fe.edu.vn",
  //       transactionDate: "20/01/2025",
  //       registeredPackage: "1 tháng",
  //       accountStatus: "Đang hoạt động",
  //       totalRegisteredPackages: 3,
  //       totalAmountPaid: "100.000vnd",
  //     },
  //     {
  //       key: 6,
  //       accountName: "Hoàng Mẫn Nhi",
  //       email: "nhinhm8@fe.edu.vn",
  //       transactionDate: "20/01/2025",
  //       registeredPackage: "1 tháng",
  //       accountStatus: "Ngừng hoạt động",
  //       totalRegisteredPackages: 3,
  //       totalAmountPaid: "100.000vnd",
  //     },
  //     {
  //       key: 7,
  //       accountName: "Hoàng Mẫn Tiến",
  //       email: "tienhmhe9@fe.edu.vn",
  //       transactionDate: "20/01/2025",
  //       registeredPackage: "1 tháng",
  //       accountStatus: "Đang hoạt động",
  //       totalRegisteredPackages: 3,
  //       totalAmountPaid: "100.000vnd",
  //     },
  //     {
  //       key: 8,
  //       accountName: "Phạm Thị Nguyệt Huế",
  //       email: "huept4@fe.edu.vn",
  //       transactionDate: "20/01/2025",
  //       registeredPackage: "1 tháng",
  //       accountStatus: "Đang hoạt động",
  //       totalRegisteredPackages: 3,
  //       totalAmountPaid: "100.000vnd",
  //     },
  //     {
  //       key: 9,
  //       accountName: "Nguyễn Thị Thu Hằng",
  //       email: "hangnt12@fe.edu.vn",
  //       transactionDate: "20/01/2025",
  //       registeredPackage: "1 tháng",
  //       accountStatus: "Đang hoạt động",
  //       totalRegisteredPackages: 3,
  //       totalAmountPaid: "100.000vnd",
  //     },
  //     {
  //       key: 10,
  //       accountName: "Nguyễn Phương Thủy",
  //       email: "thuynp8@fe.edu.vn",
  //       transactionDate: "20/01/2025",
  //       registeredPackage: "6 tháng",
  //       accountStatus: "Đang hoạt động",
  //       totalRegisteredPackages: 1,
  //       totalAmountPaid: "600.000vnd",
  //     },
  //   ];

  const [data, setData] = useState([]);

  useEffect(() => {
    const newData = tableData.map((item, index) => ({
      ...item,
      key: item.key || index + 1,
    }));
    setData(newData);
  }, [tableData]);

  const columns = [
    { title: "#", dataIndex: "key", key: "key", width: 50, align: "center" },
    {
      title: "Tên tài khoản",
      dataIndex: "accountName",
      key: "accountName",
      render: (text) => <p>{text}</p>,
    },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Ngày giao dịch (dd/mm/yyyy)",
      dataIndex: "transactionDate",
      key: "transactionDate",
      align: "center",
    },
    {
      title: "Gói đăng ký",
      dataIndex: "registeredPackage",
      key: "registeredPackage",
      align: "center",
    },
    {
      title: "Trạng thái tài khoản",
      dataIndex: "accountStatus",
      key: "accountStatus",
      align: "center",
      render: (status) => <Tag color={status === "Đang hoạt động" ? "green" : "red"}>{status}</Tag>,
    },
    {
      title: "Tổng số gói đã đăng ký",
      dataIndex: "totalRegisteredPackages",
      key: "totalRegisteredPackages",
      align: "center",
    },
    {
      title: "Tổng tiền đã đóng",
      dataIndex: "totalAmountPaid",
      key: "totalAmountPaid",
      align: "center",
    },
    {
      title: "Chức năng",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <Button type="text" icon={<EyeOutlined />} key={`view-${record.key}`} />
          <Button type="text" icon={<DeleteOutlined />} key={`delete-${record.key}`} onClick={() => handleDelete(record.key)} />
          <Button type="text" icon={<EditOutlined />} key={`edit-${record.key}`} />
        </Space>
      ),
    },
  ];

  const handleDelete = (key) => {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
  };

  return (
    <div>
      <Space style={{ marginBottom: 16, display: "flex", justifyContent: "space-between", width: "100%" }} direction="horizontal" size="large">
        <Input.Search placeholder="Tìm kiếm bằng tên hoặc email" style={{ width: 300 }} />
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <label style={{ whiteSpace: "nowrap" }}>Ngày tạo</label>
          <Select defaultValue="Mới nhất" style={{ width: 120 }}>
            <Option value="newest">Mới nhất</Option>
            <Option value="oldest">Cũ nhất</Option>
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
        {/* <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <Select defaultValue="Tất cả" style={{ width: 120 }}>
            <Option value="all">Tất cả</Option>
            <Option value="yes">Có</Option>
            <Option value="no">Không</Option>
          </Select>
          <label style={{ whiteSpace: "nowrap" }}>Tài khoản trả phí</label>
        </div> */}

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <Select defaultValue="Tất cả" style={{ width: 120 }}>
            <Option value="all">Tất cả</Option>
            <Option value="active">Đang hoạt động</Option>
            <Option value="inactive">Ngừng hoạt động</Option>
          </Select>
          <label style={{ whiteSpace: "nowrap" }}>Trạng thái tài khoản</label>
        </div>

        {/* <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <Select defaultValue="Mới nhất" style={{ width: 120 }}>
            <Option value="newest">Mới nhất</Option>
            <Option value="oldest">Cũ nhất</Option>
          </Select>
          <label style={{ whiteSpace: "nowrap" }}>Ngày tạo</label>
        </div> */}
      </Space>

      <Table columns={columns} dataSource={data} pagination={{ pageSize: 10 }} footer={() => `Tổng số ${data.length} bản ghi`} />
    </div>
  );
};

export default TableTransaction;
