import React, { useState, useEffect } from "react";
import { Table, Tag, Input, Select, Button, Space, Modal, Descriptions } from "antd";
import { EyeOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";

const { Option } = Select;

const TableTransaction = ({ tableData }) => {
  const [data, setData] = useState([]);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  useEffect(() => {
    const newData = tableData.map((item, index) => ({
      key: index + 1,
      transactionNumber: index + 1,
      transactionDate: item.createdAt || item.startDate,
      packageName: item.packageId.packageName,
      totalPrice: item.totalPrice,
      processingContent: item.processingContent,
      evidence: item.evidence,
      // Include other necessary fields
    }));
    setData(newData);
  }, [tableData]);

  const handleStatusChange = (newStatus) => {
    const updatedData = data.map((item) => {
      if (item.key === selectedTransaction.key) {
        return {
          ...item,
          processingContent: newStatus,
        };
      }
      return item;
    });
    setData(updatedData);
    setIsDetailModalVisible(false);
  };

  const columns = [
    {
      title: "#",
      dataIndex: "key",
      key: "key",
      width: 50,
      align: "center",
    },
    {
      title: "Giao dịch số",
      dataIndex: "transactionNumber",
      key: "transactionNumber",
      render: (text) => (
        <p
          style={{
            color: "blue",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Giao dịch số {text}
        </p>
      ),
    },
    {
      title: "Ngày giờ giao dịch",
      dataIndex: "transactionDate",
      key: "transactionDate",
      align: "center",
      render: (date) => <p>{new Date(date).toLocaleString("vi-VN")}</p>,
    },
    {
      title: "Gói đăng ký",
      dataIndex: "packageName",
      key: "packageName",
      align: "center",
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
      align: "center",
      render: (price) => <p>{price.toLocaleString("vi-VN")} VND</p>,
    },
    {
      title: "Trạng thái",
      dataIndex: "processingContent",
      key: "processingContent",
      align: "center",
      render: (status) => {
        let color;
        let displayText;
        switch (status) {
          case "completed":
            color = "green";
            displayText = "Chấp nhận";
            break;
          case "pending":
            color = "gold";
            displayText = "Đang chờ";
            break;
          case "failed":
            color = "red";
            displayText = "Từ chối";
            break;
          default:
            color = "gray";
            displayText = status;
        }
        return (
          <Tag color={color} style={{ fontWeight: "600" }}>
            {displayText}
          </Tag>
        );
      },
    },
    {
      title: "Ảnh chuyển khoản",
      dataIndex: "evidence",
      key: "evidence",
      align: "center",
      render: (_, record) => (
        <Button
          type="text"
          icon={<EyeOutlined />}
          key={`image-${record.key}`}
          onClick={() => {
            setSelectedTransaction(record);
            setIsImageModalVisible(true);
          }}
        />
      ),
    },
    {
      title: "Chi tiết giao dịch",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<EyeOutlined />}
            key={`view-${record.key}`}
            onClick={() => {
              setSelectedTransaction(record);
              setIsDetailModalVisible(true);
            }}
          />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Space
        style={{
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
        direction="horizontal"
        size="large"
      >
        <Input.Search placeholder="Tìm kiếm giao dịch" style={{ width: 300 }} />
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <label style={{ whiteSpace: "nowrap" }}>Ngày tạo</label>
          <Select defaultValue="Mới nhất" style={{ width: 120 }}>
            <Option value="newest">Mới nhất</Option>
            <Option value="oldest">Cũ nhất</Option>
          </Select>
        </div>
      </Space>
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 10 }} footer={() => `Tổng số ${data.length} bản ghi`} />
      {/* Detail Modal */}
      <Modal
        title="Chi tiết giao dịch"
        open={isDetailModalVisible}
        onCancel={() => setIsDetailModalVisible(false)}
        footer={
          selectedTransaction && selectedTransaction.processingContent === "pending"
            ? [
                <Button key="reject" onClick={() => handleStatusChange("failed")}>
                  Từ chối
                </Button>,
                <Button key="approve" type="primary" onClick={() => handleStatusChange("completed")}>
                  Phê duyệt
                </Button>,
              ]
            : null
        }
      >
        {selectedTransaction && (
          <Descriptions bordered>
            <Descriptions.Item label="Giao dịch số" span={3}>
              {selectedTransaction.transactionNumber}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày giờ giao dịch" span={3}>
              {new Date(selectedTransaction.transactionDate).toLocaleString("vi-VN")}
            </Descriptions.Item>
            <Descriptions.Item label="Gói đăng ký" span={3}>
              {selectedTransaction.packageName}
            </Descriptions.Item>
            <Descriptions.Item label="Tổng tiền" span={3}>
              {selectedTransaction.totalPrice.toLocaleString("vi-VN")} VND
            </Descriptions.Item>
            <Descriptions.Item label="Trạng thái" span={3}>
              {(() => {
                let color;
                let displayText;
                switch (selectedTransaction.processingContent) {
                  case "completed":
                    color = "green";
                    displayText = "Chấp nhận";
                    break;
                  case "pending":
                    color = "gold";
                    displayText = "Đang chờ";
                    break;
                  case "failed":
                    color = "red";
                    displayText = "Từ chối";
                    break;
                  default:
                    color = "gray";
                    displayText = selectedTransaction.processingContent;
                }
                return (
                  <Tag color={color} style={{ fontWeight: "600" }}>
                    {displayText}
                  </Tag>
                );
              })()}
            </Descriptions.Item>
            {/* Add more details if needed */}
          </Descriptions>
        )}
      </Modal>
      {/* Image Modal */}
      <Modal title="Ảnh chuyển khoản" open={isImageModalVisible} onCancel={() => setIsImageModalVisible(false)} footer={null}>
        {selectedTransaction && <img src={selectedTransaction.evidence} alt="Ảnh chuyển khoản" style={{ width: "100%" }} />}
      </Modal>
    </div>
  );
};

export default TableTransaction;
