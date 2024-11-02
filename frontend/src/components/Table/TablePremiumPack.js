import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, InputNumber, Popconfirm, Space, message } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";

// Initial Data
const initialPackages2 = [
  {
    discount: 0,
    _id: "66fd74d06d8c890efb023393",
    packageName: "6 tháng",
    price: 299000,
    duration: 6,
  },
  {
    discount: 10,
    _id: "66fd750e6d8c890efb023394",
    packageName: "12 tháng",
    price: 499000,
    duration: 12,
  },
  {
    _id: "67235c5e616e068d900a3848",
    packageName: "Basic Package",
    price: 100,
    duration: 30,
    benefits: "Access to basic features",
    discount: 0,
    createdAt: "2024-10-31T10:30:54.242Z",
    updatedAt: "2024-10-31T10:30:54.242Z",
    __v: 0,
  },
];

const TablePremiumPack = () => {
  const [packages, setPackages] = useState(initialPackages2);
  const [isPackageModalOpen, setIsPackageModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [form] = Form.useForm();

  // Handle adding or editing packages
  const handlePackageSubmit = (values) => {
    const { price, duration, discount } = values;
    const totalPrice = price * duration * (1 - (discount || 0) / 100);
    const newPackageData = { ...values, totalPrice };

    if (editingPackage) {
      setPackages((prev) => prev.map((pkg) => (pkg._id === editingPackage._id ? { ...pkg, ...newPackageData } : pkg)));
    } else {
      if (packages.length >= 5) {
        message.warning("Tối đa chỉ được thêm 5 gói.");
        return;
      }
      const newPackage = {
        _id: `${packages.length + 1}`,
        ...newPackageData,
      };
      setPackages((prev) => [...prev, newPackage]);
    }
    setIsPackageModalOpen(false);
    form.resetFields();
    setEditingPackage(null);
  };

  // Delete package
  const handleDeletePackage = (key) => {
    setPackages((prev) => prev.filter((pkg) => pkg._id !== key));
  };

  // Open modal to edit package
  const handleEditPackage = (pkg) => {
    setEditingPackage(pkg);
    form.setFieldsValue({
      packageName: pkg.packageName,
      price: pkg.price,
      duration: pkg.duration,
      discount: pkg.discount || 0,
    });
    setIsPackageModalOpen(true);
  };

  // Show package details
  const handleViewPackage = (pkg) => {
    setSelectedPackage(pkg);
    setIsDetailModalOpen(true);
  };

  // Table columns
  const columns = [
    {
      title: "Tên Gói",
      dataIndex: "packageName",
      key: "packageName",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Giá (VND)",
      dataIndex: "price",
      key: "price",
      render: (price) => <span>{price.toLocaleString()} VND</span>,
    },
    {
      title: "Thời gian (tháng)",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Giảm Giá (%)",
      dataIndex: "discount",
      key: "discount",
      render: (discount) => (discount ? `${discount}%` : <span>Không có discount</span>),
    },
    {
      title: "Tổng Giá (VND)",
      key: "totalPrice",
      render: (_, pkg) => <span>{(pkg.price * pkg.duration * (1 - (pkg.discount || 0) / 100)).toLocaleString()} VND</span>,
    },
    {
      title: "Hành Động",
      key: "actions",
      render: (_, pkg) => (
        <Space size="small">
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => handleViewPackage(pkg)}
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "4px",
              padding: "4px",
              width: "32px",
              height: "32px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEditPackage(pkg)}
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "4px",
              padding: "4px",
              width: "32px",
              height: "32px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
          <Popconfirm title="Bạn có chắc muốn xóa gói này?" onConfirm={() => handleDeletePackage(pkg._id)}>
            <Button
              type="link"
              icon={<DeleteOutlined />}
              danger
              style={{
                border: "1px solid #d9d9d9",
                borderRadius: "4px",
                padding: "4px",
                width: "32px",
                height: "32px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button
          style={{ backgroundColor: "#4CAF50", color: "white" }}
          onClick={() => {
            setEditingPackage(null);
            form.resetFields();
            setIsPackageModalOpen(true);
          }}
          disabled={packages.length >= 5}
        >
          Thêm Gói Mới
        </Button>
      </Space>
      <Table dataSource={packages} columns={columns} pagination={false} rowKey="_id" bordered />
      <Modal title={editingPackage ? "Chỉnh Sửa Gói" : "Thêm Gói Mới"} open={isPackageModalOpen} onCancel={() => setIsPackageModalOpen(false)} footer={null}>
        <Form form={form} layout="vertical" onFinish={handlePackageSubmit}>
          <Form.Item name="packageName" label="Tên Gói" rules={[{ required: true, message: "Vui lòng nhập tên gói!" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Giá (VND)" rules={[{ required: true, message: "Vui lòng nhập giá!" }]}>
            <InputNumber style={{ width: "100%" }} min={0} />
          </Form.Item>
          <Form.Item name="duration" label="Số tháng" rules={[{ required: true, message: "Vui lòng nhập số tháng!" }]}>
            <InputNumber style={{ width: "100%" }} min={1} />
          </Form.Item>
          <Form.Item name="discount" label="Giảm Giá (%)" rules={[{ type: "number", min: 0, max: 100, message: "Giảm giá phải nằm trong khoảng 0-100%" }]}>
            <InputNumber style={{ width: "100%" }} min={0} max={100} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingPackage ? "Lưu" : "Thêm"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal title="Chi Tiết Gói" open={isDetailModalOpen} onCancel={() => setIsDetailModalOpen(false)} footer={null}>
        {selectedPackage && (
          <Table
            dataSource={[
              { key: "1", label: "Tên Gói", value: selectedPackage.packageName },
              { key: "2", label: "Giá", value: `${selectedPackage.price.toLocaleString()} VND` },
              { key: "3", label: "Thời gian", value: `${selectedPackage.duration} tháng` },
              { key: "4", label: "Giảm Giá", value: selectedPackage.discount ? `${selectedPackage.discount}%` : "Không có discount" },
              { key: "5", label: "Tổng Giá", value: `${(selectedPackage.price * selectedPackage.duration * (1 - (selectedPackage.discount || 0) / 100)).toLocaleString()} VND` },
              { key: "6", label: "Lợi Ích", value: selectedPackage.benefits || "Không có" },
            ]}
            columns={[
              { title: "", dataIndex: "label", key: "label", render: (text) => <strong>{text}</strong> },
              { title: "", dataIndex: "value", key: "value" },
            ]}
            pagination={false}
            showHeader={false}
            bordered
          />
        )}
      </Modal>
    </div>
  );
};

export default TablePremiumPack;
