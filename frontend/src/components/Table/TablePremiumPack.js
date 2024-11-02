// File: src/components/Table/TablePremiumPack.js

import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, InputNumber, Popconfirm, Space, message } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";

const TablePremiumPack = ({ packages, addPackage, updatePackage, deletePackage }) => {
  const [isPackageModalOpen, setIsPackageModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [form] = Form.useForm();

  // Custom validator for price input
  const validatePrice = (_, value) => {
    if (!value || value < 1000 || !/^\d+$/.test(value)) {
      return Promise.reject(new Error("Giá tiền phải lớn hơn hoặc bằng 1000 và chỉ chứa số hợp lệ."));
    }
    return Promise.resolve();
  };

  // Handle adding or editing packages
  const handlePackageSubmit = async (values) => {
    const { price, duration } = values;
    const discount = values.discount ?? 0;
    const benefits = values.benefits || "Không có";
    const totalPrice = price * duration * (1 - discount / 100);
    const newPackageData = {
      ...values,
      discount,
      benefits,
      totalPrice,
    };
    if (editingPackage) {
      // Update existing package
      try {
        await updatePackage(editingPackage._id, newPackageData);
        message.success("Gói đã được cập nhật thành công!");
      } catch (error) {
        console.error("Error updating package:", error);
        message.error("Đã xảy ra lỗi khi cập nhật gói.");
      }
    } else {
      if (packages.length >= 15) {
        message.warning("Tối đa chỉ được thêm 15 gói.");
        return;
      }
      try {
        await addPackage(newPackageData);
        message.success("Gói mới đã được tạo thành công!");
      } catch (error) {
        console.error("Error adding package:", error);
        message.error("Đã xảy ra lỗi khi thêm gói.");
      }
    }
    setIsPackageModalOpen(false);
    form.resetFields();
    setEditingPackage(null);
  };

  // Delete package
  const handleDeletePackage = async (packageId) => {
    try {
      await deletePackage(packageId);
      message.success("Gói đã được xóa thành công!");
    } catch (error) {
      console.error("Error deleting package:", error);
      message.error("Đã xảy ra lỗi khi xóa gói.");
    }
  };

  // Open modal to edit package
  const handleEditPackage = (pkg) => {
    setEditingPackage(pkg);
    form.setFieldsValue({
      packageName: pkg.packageName,
      price: pkg.price,
      duration: pkg.duration,
      discount: pkg.discount || 0,
      benefits: pkg.benefits || "Không có",
    });
    setIsPackageModalOpen(true);
  };

  // Show package details
  const handleViewPackage = (pkg) => {
    setSelectedPackage(pkg);
    setIsDetailModalOpen(true);
  };

  // Ensure each package has a unique 'key' property
  const packagesWithKeys = packages.map((pkg, index) => ({
    ...pkg,
    key: pkg._id || index,
  }));

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
      render: (price) => (price ? <span>{price.toLocaleString()} VND</span> : "N/A"),
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
      render: (_, pkg) => <span>{pkg.price ? (pkg.price * pkg.duration * (1 - (pkg.discount || 0) / 100)).toLocaleString() : "N/A"} VND</span>,
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
          disabled={packages.length >= 15}
        >
          Thêm Gói Mới
        </Button>
      </Space>
      <Table dataSource={packagesWithKeys} columns={columns} pagination={false} rowKey="key" bordered />
      <Modal title={editingPackage ? "Chỉnh Sửa Gói" : "Thêm Gói Mới"} open={isPackageModalOpen} onCancel={() => setIsPackageModalOpen(false)} footer={null}>
        <Form form={form} layout="vertical" onFinish={handlePackageSubmit}>
          <Form.Item name="packageName" label="Tên Gói" rules={[{ required: true, message: "Vui lòng nhập tên gói!" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Giá (VND)" rules={[{ required: true, validator: validatePrice }]}>
            <InputNumber style={{ width: "100%" }} min={1000} />
          </Form.Item>
          <Form.Item name="duration" label="Số tháng" rules={[{ required: true, message: "Vui lòng nhập số tháng!" }]}>
            <InputNumber style={{ width: "100%" }} min={1} />
          </Form.Item>
          <Form.Item name="benefits" label="Lợi Ích">
            <Input.TextArea placeholder="Nhập lợi ích của gói" />
          </Form.Item>
          <Form.Item
            name="discount"
            label="Giảm Giá (%)"
            rules={[
              {
                type: "number",
                min: 0,
                max: 100,
                message: "Giảm giá phải nằm trong khoảng 0-100%",
              },
            ]}
          >
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
              {
                key: "1",
                label: "Tên Gói",
                value: selectedPackage.packageName,
              },
              {
                key: "2",
                label: "Giá",
                value: `${selectedPackage.price ? selectedPackage.price.toLocaleString() : "N/A"} VND`,
              },
              {
                key: "3",
                label: "Thời gian",
                value: `${selectedPackage.duration} tháng`,
              },
              {
                key: "4",
                label: "Giảm Giá",
                value: selectedPackage.discount ? `${selectedPackage.discount}%` : "Không có discount",
              },
              {
                key: "5",
                label: "Tổng Giá",
                value: `${selectedPackage.price ? (selectedPackage.price * selectedPackage.duration * (1 - (selectedPackage.discount || 0) / 100)).toLocaleString() : "N/A"} VND`,
              },
              {
                key: "6",
                label: "Lợi Ích",
                value: selectedPackage.benefits || "Không có",
              },
            ]}
            columns={[
              {
                title: "",
                dataIndex: "label",
                key: "label",
                render: (text) => <strong>{text}</strong>,
              },
              {
                title: "",
                dataIndex: "value",
                key: "value",
              },
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
