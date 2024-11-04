import React, { useState, useEffect } from "react";
import { Table, Tag, Input, Select, Button, Space, Modal, Descriptions, message } from "antd";
import { EyeOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { getAllTransactions, updateTransaction } from "../../services/AccountantService";

const { Option } = Select;
const { confirm } = Modal;

const TableTransaction = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [dateFilter, setDateFilter] = useState("newest");
  const [packageFilter, setPackageFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchTransactions = async () => {
    try {
      const result = await getAllTransactions();
      const formattedData = result.data.map((item, index) => ({
        key: index + 1,
        transactionId: item._id, // Correctly use _id here
        transactionNumber: index + 1,
        transactionDate: item.createdAt || item.startDate,
        packageName: item.packageId.packageName,
        totalPrice: item.totalPrice,
        processingContent: item.processingContent,
        evidence: item.evidence,
        // Include other necessary fields if needed
      }));
      setData(formattedData);
      setFilteredData(formattedData);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    let filtered = [...data];

    // Filter by date
    if (dateFilter === "oldest") {
      filtered.sort((a, b) => new Date(a.transactionDate) - new Date(b.transactionDate));
    } else {
      filtered.sort((a, b) => new Date(b.transactionDate) - new Date(a.transactionDate));
    }

    // Filter by package
    if (packageFilter !== "all") {
      filtered = filtered.filter((item) => item.packageName.includes(packageFilter));
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((item) => item.processingContent === statusFilter);
    }

    setFilteredData(filtered);
  }, [dateFilter, packageFilter, statusFilter, data]);

  const showConfirmationDialog = (newStatus) => {
    confirm({
      title: `Bạn có chắc chắn muốn ${newStatus === "completed" ? "phê duyệt" : "từ chối"} giao dịch này không?`,
      icon: <ExclamationCircleOutlined />,
      content: `Thao tác này sẽ ${newStatus === "completed" ? "chấp nhận" : "từ chối"} giao dịch.`,
      okText: "Xác nhận",
      cancelText: "Hủy",
      onOk() {
        handleStatusChange(newStatus);
      },
    });
  };

  const handleStatusChange = async (newStatus) => {
    if (!selectedTransaction || !selectedTransaction.transactionId) {
      message.error("Không tìm thấy ID giao dịch.");
      return;
    }

    try {
      // Immediately update the UI for optimistic feedback
      const updatedData = data.map((item) => {
        if (item.transactionId === selectedTransaction.transactionId) {
          return {
            ...item,
            processingContent: newStatus, // Update the status in the UI
          };
        }
        return item;
      });

      setData(updatedData);

      // Call the update API with the correct transaction ID (_id)
      await updateTransaction(selectedTransaction.transactionId, {
        processingContent: newStatus,
      });

      message.success(`Trạng thái giao dịch đã được cập nhật thành công.`);
    } catch (error) {
      console.error("Error updating transaction:", error);
      message.error("Đã xảy ra lỗi khi cập nhật trạng thái giao dịch.");

      // Revert the UI update in case of an error
      const revertedData = data.map((item) => {
        if (item.transactionId === selectedTransaction.transactionId) {
          return {
            ...item,
            processingContent: selectedTransaction.processingContent, // Revert to original status
          };
        }
        return item;
      });

      setData(revertedData);
    } finally {
      setIsDetailModalVisible(false);
    }
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
      render: (text) => <p style={{ color: "blue", cursor: "pointer", fontWeight: "600" }}>Giao dịch số {text}</p>,
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
          <Select value={dateFilter} onChange={setDateFilter} style={{ width: 120 }}>
            <Option value="newest">Mới nhất</Option>
            <Option value="oldest">Cũ nhất</Option>
          </Select>
          <label style={{ whiteSpace: "nowrap" }}>Gói đăng ký</label>
          <Select value={packageFilter} onChange={setPackageFilter} style={{ width: 150 }}>
            <Option value="all">Tất cả</Option>
            <Option value="6 tháng">6 tháng</Option>
            <Option value="12 tháng">12 tháng</Option>
          </Select>
          <label style={{ whiteSpace: "nowrap" }}>Trạng thái</label>
          <Select value={statusFilter} onChange={setStatusFilter} style={{ width: 150 }}>
            <Option value="all">Tất cả</Option>
            <Option value="completed">Chấp nhận</Option>
            <Option value="pending">Đang chờ</Option>
            <Option value="failed">Từ chối</Option>
          </Select>
        </div>
      </Space>
      <Table columns={columns} dataSource={filteredData} loading={loading} pagination={{ pageSize: 10 }} footer={() => `Tổng số ${filteredData.length} bản ghi`} />
      {/* Detail Modal */}
      <Modal
        title="Chi tiết giao dịch"
        open={isDetailModalVisible}
        onCancel={() => setIsDetailModalVisible(false)}
        footer={
          selectedTransaction && selectedTransaction.processingContent === "pending"
            ? [
                <Button key="reject" onClick={() => showConfirmationDialog("failed")}>
                  Từ chối
                </Button>,
                <Button key="approve" type="primary" onClick={() => showConfirmationDialog("completed")}>
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
