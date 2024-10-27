import { Col, Dropdown, Menu, Row, Select, Space } from "antd";
import InputCustom from "../../../../components/Input";
import { EyeOutlined, SearchOutlined } from "@ant-design/icons";
import { TextCustom } from "../../../../components/Typography";
import { Option } from "antd/es/mentions";
import Sidebar from "../../../../components/Sidebar/learnerSideBar";
import ButtonCustom from "../../../../components/Button";
import TableCustom from "../../../../components/Table/TableCustom";
import { useEffect, useState } from "react";
import { historyTransaction } from "../../../../services/LearnerService";
import moment from "moment";
import TransactionDetailModal from "./ModalToViewTransactionDetail";
export default function ViewTransactionHistoryList() {
  const [transactions, setTransactions] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const showTransactionDetailModal = transaction => {
    setSelectedTransaction(transaction);
    setIsModalVisible(true);
  }

  const handleCancelModal = () => {
    setIsModalVisible(false);
  }
  const transactionColumns = [
    {
      title: "Thông tin gói",
      dataIndex: "packageId",
      key: "packageName",
      render: packageId => `Gói Premium ${packageId?.packageName}`
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "startDate",
      key: "startDate",
      render: (startDate) => moment(startDate).format("DD-MM-YYYY"),
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "endDate",
      key: "endDate",
      render: (endDate) => moment(endDate).format("DD-MM-YYYY"),
    },
    {
      title: "Discount",
      dataIndex: "packageId",
      key: "discount",
      render: packageId => `${packageId?.discount}%`
    },
    {
      title: "Tổng",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (totalPrice) => `${totalPrice.toLocaleString('vi-VN')} VNĐ`,
    }, {
      title: "Chức năng",
      dataIndex: "action",
      render: (_, record) => (
        <Space>
          <EyeOutlined style={{ fontSize: "18px", cursor: "pointer", }} onClick={() => showTransactionDetailModal(record)}></EyeOutlined>
        </Space>
      )
    }
  ]
  useEffect(() => {
    try {
      historyTransaction().then((res) => {
        console.log("transaction list: ", res.data);
        
        setTransactions(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div style={{ display: "flex", width: "100%", minHeight: "100vh" }}>
      {/* Sidebar Component */}
      <Sidebar />

      {/* Main Content */}
      <div style={{ flex: 1, padding: "20px" }}>
        {/* Title */}
        <TextCustom strong style={{ fontSize: "24px", marginBottom: "20px" }}>
          Xem Lịch Sử Giao Dịch
        </TextCustom>

        {/* Search Bar and Dropdown */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", marginTop: "20px" }}>
          {/* Search Input */}
          <InputCustom placeholder="Tìm kiếm bằng tiêu đề" style={{ width: 300 }} prefix={<SearchOutlined />} />

          {/* Dropdown for Sorting */}
          <Select
            style={{ width: 200 }}
            defaultValue="newest"
            onChange={(value) => console.log("Selected:", value)} // Add sorting logic here
          >
            <Option value="newest">Ngày Giao Dịch Mới nhất</Option>
            <Option value="oldest">Ngày Giao Dịch Cũ nhất</Option>
          </Select>
        </div>

        {/* Table for Transaction History */}
        <div>
          <TableCustom dataSource={transactions} columns={transactionColumns} rowKey="id"/>
        </div>
        <TransactionDetailModal visible={isModalVisible} onClose={handleCancelModal} transaction={selectedTransaction}></TransactionDetailModal>
      </div>
    </div>
  );
}
